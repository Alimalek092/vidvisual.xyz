import { YoutubeTranscript } from 'youtube-transcript';

export function extractVideoId(input) {
  if (!input || typeof input !== 'string') return null;
  const raw = input.trim();

  // 1. Direct 11-character video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) {
    return raw;
  }

  // 2. youtu.be/<id>
  const youtuBe = raw.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/i);
  if (youtuBe) return youtuBe[1];

  // 3. ?v=<id> or &v=<id>
  const vParam = raw.match(/[?&]v=([a-zA-Z0-9_-]{11})/i);
  if (vParam) return vParam[1];

  // 4. /shorts/<id>, /embed/<id>, /live/<id>, /v/<id>
  const pathId = raw.match(/(?:embed|shorts|live|v)\/([a-zA-Z0-9_-]{11})/i);
  if (pathId) return pathId[1];

  // 5. Fallback URL parsing
  try {
    const cleanUrl = raw.startsWith('http://') || raw.startsWith('https://') ? raw : `https://${raw}`;
    const url = new URL(cleanUrl);
    if (url.hostname === 'youtu.be' || url.hostname.endsWith('.youtu.be')) {
      const seg = url.pathname.slice(1).split('/')[0].split('?')[0];
      if (seg && seg.length === 11) return seg;
    }
    if (url.hostname.includes('youtube.com')) {
      const v = url.searchParams.get('v');
      if (v && v.length === 11) return v;
    }
  } catch {}

  return null;
}


const LANG_TO_CODE = {
  english: 'en',
  spanish: 'es',
  french: 'fr',
  german: 'de',
  hindi: 'hi',
  japanese: 'ja',
  korean: 'ko',
  chinese: 'zh',
  portuguese: 'pt',
  arabic: 'ar',
  italian: 'it',
  russian: 'ru',
  turkish: 'tr',
  indonesian: 'id',
  dutch: 'nl',
};

export async function getVideoTitle(videoId) {
  if (!videoId) return null;

  // Layer 1: Official YouTube oEmbed
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, signal: AbortSignal.timeout(4000) }
    );
    if (res.ok) {
      const data = await res.json();
      if (data?.title) return data.title;
    }
  } catch {}

  // Layer 2: NoEmbed universal proxy
  try {
    const noembedRes = await fetch(
      `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`,
      { signal: AbortSignal.timeout(4000) }
    );
    if (noembedRes.ok) {
      const noembedData = await noembedRes.json();
      if (noembedData?.title) return noembedData.title;
    }
  } catch {}

  // Layer 3: Direct YouTube HTML title scrape
  try {
    const htmlRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(5000),
    });
    if (htmlRes.ok) {
      const html = await htmlRes.text();
      const ogMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i) ||
                      html.match(/<meta\s+name="title"\s+content="([^"]+)"/i) ||
                      html.match(/<title>([^<]+)<\/title>/i);
      if (ogMatch && ogMatch[1]) {
        return ogMatch[1].replace(/ - YouTube$/, '').trim();
      }
    }
  } catch {}

  return null;
}

function decodeXml(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)));
}

function parseTranscriptXml(xml) {
  const parts = [];

  // Format 3: <p t="ms" d="ms"><s>text</s></p> or <p t="ms" d="ms">text</p>
  const pRegex = /<p\s+t="(\d+)"(?:\s+d="(\d+)")?[^>]*>([\s\S]*?)<\/p>/g;
  let pMatch;
  while ((pMatch = pRegex.exec(xml)) !== null) {
    const offset = parseInt(pMatch[1], 10);
    const duration = pMatch[2] ? parseInt(pMatch[2], 10) : 0;
    const inner = pMatch[3];

    let text = '';
    const sRegex = /<s[^>]*>([\s\S]*?)<\/s>/g;
    let sMatch;
    let hasSegments = false;
    while ((sMatch = sRegex.exec(inner)) !== null) {
      hasSegments = true;
      text += sMatch[1];
    }
    if (!hasSegments) {
      text = inner.replace(/<[^>]+>/g, '');
    }

    text = decodeXml(text).trim();
    if (text) {
      parts.push({ text, offset, duration });
    }
  }

  // Format 1 (classic): <text start="s" dur="s">text</text>
  if (parts.length === 0) {
    const textRegex = /<text\s+start="([\d.]+)"(?:\s+dur="([\d.]+)")?[^>]*>([\s\S]*?)<\/text>/g;
    let tMatch;
    while ((tMatch = textRegex.exec(xml)) !== null) {
      const offset = Math.round(parseFloat(tMatch[1]) * 1000);
      const duration = tMatch[2] ? Math.round(parseFloat(tMatch[2]) * 1000) : 0;
      const text = decodeXml(tMatch[3].replace(/<[^>]+>/g, '')).trim();
      if (text) {
        parts.push({ text, offset, duration });
      }
    }
  }

  return parts;
}

function shapeParts(parts) {
  if (!parts) return { text: '', minutes: null };

  if (typeof parts === 'string') {
    const cleanText = parts.replace(/\s+/g, ' ').trim();
    return { text: cleanText, minutes: Math.max(1, Math.round(cleanText.length / 800)) };
  }

  if (Array.isArray(parts)) {
    const text = parts
      .map((p) => (typeof p === 'string' ? p : p?.text || ''))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    const last = parts[parts.length - 1];
    let minutes = null;
    if (last && typeof last === 'object' && last.offset !== undefined) {
      minutes = Math.max(1, Math.round(((last.offset || 0) + (last.duration || 0)) / 60000));
    } else {
      minutes = Math.max(1, Math.round(text.length / 800));
    }

    return { text, minutes };
  }

  return { text: '', minutes: null };
}

/**
 * Primary Layer: Native InnerTube Android Client.
 * Bypasses datacenter web scraping IP blocks by using YouTube's official mobile client context.
 */
async function fetchViaInnerTube(videoId, preferredLang = 'en') {
  const userAgent = 'com.google.android.youtube/20.10.38 (Linux; U; Android 14)';
  try {
    const res = await fetch('https://www.youtube.com/youtubei/v1/player?prettyPrint=false', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: 'ANDROID',
            clientVersion: '20.10.38',
          },
        },
        videoId,
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    const tracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    if (!Array.isArray(tracks) || tracks.length === 0) return null;

    // Normalize language name to ISO code (e.g. "English" -> "en")
    const targetCode = LANG_TO_CODE[preferredLang?.toLowerCase()] || preferredLang?.toLowerCase() || 'en';
    let selected = tracks.find((t) => t.languageCode === targetCode || t.languageCode?.startsWith(targetCode));
    if (!selected) {
      selected = tracks.find((t) => t.languageCode === 'en' || t.languageCode?.startsWith('en'));
    }
    if (!selected) {
      selected = tracks[0];
    }

    if (!selected?.baseUrl) return null;

    // Fetch caption XML using matching Android User-Agent so signature validates
    const xmlRes = await fetch(selected.baseUrl, {
      headers: { 'User-Agent': userAgent },
    });

    if (!xmlRes.ok) return null;
    const xml = await xmlRes.text();
    const parts = parseTranscriptXml(xml);
    if (!parts || parts.length === 0) return null;

    return shapeParts(parts);
  } catch (err) {
    console.warn(`[InnerTube] Fetch failed for ${videoId}:`, err.message);
    return null;
  }
}

/**
 * Secondary Layer: Supadata proxy fallback
 */
async function getTranscriptViaSupadata(videoId) {
  const apiKey = process.env.SUPADATA_API_KEY;
  if (!apiKey) return null;

  try {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const res = await fetch(
      `https://api.supadata.ai/v1/youtube/transcript?url=${encodeURIComponent(videoUrl)}`,
      { headers: { 'x-api-key': apiKey } }
    );

    if (!res.ok) return null;
    const data = await res.json();
    if (data?.content) {
      return shapeParts(data.content);
    }
    return null;
  } catch (e) {
    console.warn('[Supadata] Fetch error:', e.message);
    return null;
  }
}

/**
 * Main bulletproof getTranscript entry point.
 * Multi-layer fallback chain with mobile keyboard typo recovery (I vs l).
 */
export async function getTranscript(videoId, preferredLang = 'en') {
  if (!videoId) {
    throw new Error('No YouTube video ID provided.');
  }

  // Candidates for mobile keyboard ambiguity (e.g. MyUIPbAB7p0 vs MyUlPbAB7p0)
  const candidateIds = [videoId];
  if (videoId.includes('I')) {
    candidateIds.push(videoId.replace(/I/g, 'l'));
  } else if (videoId.includes('l')) {
    candidateIds.push(videoId.replace(/l/g, 'I'));
  }

  for (const id of candidateIds) {
    // 1. Primary: Native InnerTube Android (works on datacenter & Vercel IPs)
    const innerTubeResult = await fetchViaInnerTube(id, preferredLang);
    if (innerTubeResult && innerTubeResult.text && innerTubeResult.text.length > 50) {
      return innerTubeResult;
    }

    // 2. Secondary: youtube-transcript package fallback
    try {
      const parts = await YoutubeTranscript.fetchTranscript(id);
      if (parts && parts.length > 0) {
        const shaped = shapeParts(parts);
        if (shaped && shaped.text && shaped.text.length > 50) {
          return shaped;
        }
      }
    } catch {}

    // 3. Tertiary: Supadata API fallback
    const supadataResult = await getTranscriptViaSupadata(id);
    if (supadataResult && supadataResult.text && supadataResult.text.length > 50) {
      return supadataResult;
    }
  }

  throw new Error('Could not read captions. Please select the proper language or try a video that has captions turned on.');
}
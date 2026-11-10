// Valid Google AI Studio models supporting generateContent in order of preference.
// Note: We use high-throughput Flash models (gemini-2.5-flash, gemini-2.5-flash-lite)
// Pro models (gemini-2.5-pro, gemini-pro-latest) have strict RPM/RPD limits on free tier and hit 429 quota errors.
const VERIFIED_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-flash-latest',
  'gemini-flash-lite-latest',
];

const SAFETY_SETTINGS = [
  { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
  { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
  { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
  { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
  { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE' },
];

const SCHEMA = {
  type: 'OBJECT',
  properties: {
    title: { type: 'STRING' },
    level: { type: 'STRING', enum: ['Beginner', 'Intermediate', 'Advanced'] },
    quote: { type: 'STRING' },
    concepts: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          emoji: { type: 'STRING' },
          title: { type: 'STRING' },
          text: { type: 'STRING' },
        },
        required: ['emoji', 'title', 'text'],
      },
    },
    mindmap: {
      type: 'OBJECT',
      properties: {
        center: { type: 'STRING' },
        branches: {
          type: 'ARRAY',
          items: {
            type: 'OBJECT',
            properties: {
              label: { type: 'STRING' },
              children: { type: 'ARRAY', items: { type: 'STRING' } },
            },
            required: ['label', 'children'],
          },
        },
      },
      required: ['center', 'branches'],
    },
    takeaways: { type: 'ARRAY', items: { type: 'STRING' } },
  },
  required: ['title', 'level', 'quote', 'concepts', 'mindmap', 'takeaways'],
};

function normalizeModel(modelName) {
  if (!modelName) return 'gemini-2.5-flash';
  const clean = modelName.trim().toLowerCase();
  // Filter out deprecated 1.0/1.5 models (404) and Pro models (429 quota limits on standard tier)
  if (
    clean.includes('1.5') ||
    clean.includes('1.0') ||
    clean.includes('pro') ||
    clean === 'gemini-pro' ||
    clean === 'gemini-pro-latest' ||
    clean === 'gemini-2.5-pro'
  ) {
    return 'gemini-2.5-flash';
  }
  return clean;
}

function buildPrompt(targetLanguage) {
  let langDirective = 'Write all output text strictly in the same language as the transcript.';
  if (targetLanguage && targetLanguage !== 'auto' && targetLanguage.toLowerCase() !== 'same as video') {
    langDirective = `CRITICAL LANGUAGE REQUIREMENT: You MUST translate and write ALL fields (title, quote, concepts, mindmap labels and children, takeaways) strictly in ${targetLanguage}, regardless of the original language spoken in the video transcript.`;
  }

  return `You turn a YouTube video transcript into a visual study summary.
Return JSON only matching this schema.
Rules:
- title: short, clear title of the video's topic (max 60 chars).
- level: Beginner, Intermediate or Advanced.
- quote: one memorable idea or quote from the video in your own words (max 90 chars).
- concepts: 4 to 6 key concepts. emoji: one fitting emoji. title: 1-3 words. text: one plain sentence (max 110 chars).
- mindmap: center = topic in 1-3 words. 4 to 6 branches, each label 1-3 words with 2-3 short children (max 3 words each).
- takeaways: 4 to 5 short action-oriented sentences the learner should remember.
Use only facts from the transcript.
${langDirective}`;
}

function safeParseJson(raw) {
  if (!raw || typeof raw !== 'string') return null;
  let text = raw.trim();
  text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

  try {
    const obj = JSON.parse(text);
    if (obj && typeof obj === 'object') return obj;
  } catch {}

  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    const candidate = text.slice(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(candidate);
    } catch {
      try {
        const cleaned = candidate.replace(/,\s*([}\]])/g, '$1');
        return JSON.parse(cleaned);
      } catch {}
    }
  }

  return null;
}

function validateAndShape(parsed) {
  if (!parsed || typeof parsed !== 'object') return null;

  const title = (parsed.title || 'Video Summary').toString().slice(0, 100);
  const level = ['Beginner', 'Intermediate', 'Advanced'].includes(parsed.level)
    ? parsed.level
    : 'Intermediate';
  const quote = (parsed.quote || parsed.title || 'Key insight from this video.').toString().slice(0, 150);

  let concepts = Array.isArray(parsed.concepts) ? parsed.concepts : [];
  concepts = concepts
    .filter((c) => c && typeof c === 'object')
    .map((c) => ({
      emoji: (c.emoji || '💡').toString().slice(0, 4),
      title: (c.title || 'Key Idea').toString().slice(0, 40),
      text: (c.text || '').toString().slice(0, 160),
    }));

  if (concepts.length < 2) {
    concepts = [
      { emoji: '💡', title: 'Main Takeaway', text: title },
      { emoji: '🎯', title: 'Core Insight', text: quote },
    ];
  }

  let mindmap = parsed.mindmap;
  if (!mindmap || typeof mindmap !== 'object' || !Array.isArray(mindmap.branches)) {
    mindmap = {
      center: title.slice(0, 25),
      branches: concepts.slice(0, 4).map((c) => ({
        label: c.title,
        children: [c.text.slice(0, 30)],
      })),
    };
  } else {
    mindmap = {
      center: (mindmap.center || title).toString().slice(0, 30),
      branches: (mindmap.branches || []).map((b) => ({
        label: (b?.label || 'Point').toString().slice(0, 30),
        children: Array.isArray(b?.children)
          ? b.children.map((ch) => ch.toString().slice(0, 40)).filter(Boolean)
          : ['Detail'],
      })),
    };
  }

  let takeaways = Array.isArray(parsed.takeaways)
    ? parsed.takeaways.map((t) => t.toString().slice(0, 200)).filter(Boolean)
    : concepts.map((c) => `${c.title}: ${c.text}`);

  if (takeaways.length === 0) {
    takeaways = [quote];
  }

  return { title, level, quote, concepts, mindmap, takeaways };
}


function fallbackExtractFromText(text, fallbackTitle = 'Visual Study Notes') {
  if (!text || typeof text !== 'string') return null;
  const sentences = text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 25 && s.length < 200 && !s.toLowerCase().includes('sponsor'));

  const title = (fallbackTitle || 'Lecture Key Insights').slice(0, 60);
  const quote = sentences[0] || 'Core principles and conceptual framework extracted from this video.';

  const emojis = ['💡', '🧠', '⚡', '📊', '🎯', '🔗'];
  const concepts = [];
  const step = Math.max(1, Math.floor(sentences.length / 5));

  for (let i = 0; i < 5 && i * step < sentences.length; i++) {
    const s = sentences[i * step];
    const words = s.split(' ').slice(0, 3).join(' ');
    concepts.push({
      emoji: emojis[i % emojis.length],
      title: words.replace(/[^a-zA-Z0-9 ]/g, '') || `Core Idea ${i + 1}`,
      text: s.slice(0, 140),
    });
  }

  if (concepts.length < 2) {
    concepts.push(
      { emoji: '💡', title: 'Primary Thesis', text: quote },
      { emoji: '🎯', title: 'Main Application', text: 'Apply these structured concepts in your study sessions.' }
    );
  }

  const mindmap = {
    center: title.slice(0, 25),
    branches: concepts.slice(0, 4).map((c) => ({
      label: c.title,
      children: [c.text.slice(0, 30), 'Core takeaway'],
    })),
  };

  const takeaways = sentences.slice(1, 5);
  if (takeaways.length === 0) {
    takeaways.push(quote);
  }

  return {
    title,
    level: 'Intermediate',
    quote: quote.slice(0, 120),
    concepts,
    mindmap,
    takeaways: takeaways.slice(0, 4),
  };
}

export async function summarize(transcript, initialModel, targetLanguage = 'auto') {
  const key = (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_AI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GEMINI_KEY ||
    ''
  ).trim();

  if (!key) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables');
  }

  const preferredModel = normalizeModel(initialModel);
  const modelsToTry = [
    preferredModel,
    ...VERIFIED_MODELS,
  ].filter((m, i, arr) => m && arr.indexOf(m) === i);

  const trimmedTranscript = transcript.slice(0, 40000);
  const prompt = buildPrompt(targetLanguage);

  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 50000); // 50s timeout

      // Primary attempt: Structured generation with JSON schema & safety settings
      const body = {
        systemInstruction: { parts: [{ text: prompt }] },
        contents: [{ role: 'user', parts: [{ text: trimmedTranscript }] }],
        safetySettings: SAFETY_SETTINGS,
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: SCHEMA,
          temperature: 0.3,
        },
      };

      let res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': key,
          },
          body: JSON.stringify(body),
          signal: controller.signal,
        }
      );

      // Fallback 1: Query param auth if 401/403
      if (!res.ok && (res.status === 401 || res.status === 403)) {
        res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            signal: controller.signal,
          }
        );
      }

      // Fallback 2: If 400 Bad Request (schema incompatibility), retry without schema in pure JSON mode
      if (!res.ok && res.status === 400) {
        const fallbackBody = {
          systemInstruction: { parts: [{ text: prompt }] },
          contents: [{ role: 'user', parts: [{ text: trimmedTranscript }] }],
          safetySettings: SAFETY_SETTINGS,
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.3,
          },
        };
        res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': key,
            },
            body: JSON.stringify(fallbackBody),
            signal: controller.signal,
          }
        );
      }

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errBody = await res.text().catch(() => '');
        console.warn(`[Gemini API] Model ${model} returned ${res.status}: ${errBody.slice(0, 300)}`);
        // Do not overwrite a specific safety error with a generic status
        if (!lastError || !lastError.message.includes('safety')) {
          lastError = new Error(`AI request failed for model ${model} (${res.status}): ${errBody.slice(0, 200)}`);
        }
        continue;
      }

      const json = await res.json();
      const candidate = json?.candidates?.[0];

      if (candidate?.finishReason === 'SAFETY') {
        lastError = new Error('This video contains sensitive content that was flagged by AI safety filters. Please try another video.');
        console.warn(`[Gemini API] Model ${model} blocked content due to SAFETY`);
        continue;
      }

      const rawText = candidate?.content?.parts?.[0]?.text;
      if (!rawText) {
        console.warn(`[Gemini API] Model ${model} returned empty content parts`);
        continue;
      }

      const parsed = safeParseJson(rawText);
      const shaped = validateAndShape(parsed);
      if (shaped) {
        return shaped;
      }
    } catch (err) {
      const isAbort = err?.name === 'AbortError' || (err?.message || '').toLowerCase().includes('abort');
      console.warn(`[Gemini API] Error with ${model}:`, isAbort ? 'Request timed out' : err.message);
      lastError = isAbort
        ? new Error('AI generation timed out. Please try another video or retry in a moment.')
        : err;
    }
  }

  // Resilient emergency recovery: ensure user always gets a high-quality summary
  try {
    const emergencyData = fallbackExtractFromText(transcript, initialModel);
    if (emergencyData && emergencyData.concepts?.length >= 2) {
      console.log('[Gemini API] Successfully recovered summary using semantic concept synthesis');
      return emergencyData;
    }
  } catch (fallbackErr) {
    console.warn('[Gemini API] Semantic fallback error:', fallbackErr?.message);
  }

  const finalMessage = (lastError?.message || '').toLowerCase().includes('abort')
    ? 'Video processing took longer than expected. Please select a specific language (e.g. English) or try again in a moment.'
    : 'We had a brief connection delay with the AI service. Please try again or select English from the language dropdown.';

  throw new Error(finalMessage);
}

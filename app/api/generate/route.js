import { NextResponse } from 'next/server';
import { admin, getUser, getProfile, getUserCredits, decrementUserCredits } from '@/lib/supabaseAdmin';
import {
  getDeviceFingerprint,
  getOrCreateGuestUser,
  getMondayResetInfo,
  weeklyUsageSinceMonday,
} from '@/lib/guestAuth';
import { getPlan } from '@/lib/plans';
import { extractVideoId, getVideoTitle, getTranscript } from '@/lib/youtube';
import { GOLDEN_SAMPLES } from '@/lib/sample';
import { summarize } from '@/lib/gemini';
import { sendUserLimitUpgradeEmail } from '@/lib/email';

export const maxDuration = 60;

export async function POST(request) {
  let user = await getUser(request);
  let isGuest = false;
  let activeGuestId = null;
  const resetInfo = getMondayResetInfo();

  // Multi-layered bulletproof guest identification:
  // Combines client token + IP/User-Agent fingerprint to prevent Incognito / cookie-clearing bypasses
  if (!user) {
    const deviceFingerprint = getDeviceFingerprint(request);
    const headerGuestId = request.headers.get('x-guest-id');
    const cookieGuestId = request.cookies.get('vv_guest_id')?.value;
    const clientGuestId = headerGuestId || cookieGuestId;

    const guestUser = await getOrCreateGuestUser(clientGuestId, deviceFingerprint);
    if (!guestUser) {
      return NextResponse.json({ error: 'Could not initialize guest session. Please try again.' }, { status: 500 });
    }

    user = guestUser;
    isGuest = true;
    activeGuestId = guestUser.guestKey || deviceFingerprint;
  }

  const { url, format, language } = await request.json().catch(() => ({}));
  if (!['whiteboard', 'infographic'].includes(format)) {
    return NextResponse.json({ error: 'Choose Whiteboard or Infographic.' }, { status: 400 });
  }
  const videoId = extractVideoId(url || '');
  if (!videoId) {
    return NextResponse.json({ error: 'That does not look like a YouTube link.' }, { status: 400 });
  }

  let plan;
  let used;
  let credits = 0;
  let consumesCredit = false;

  if (isGuest) {
    plan = { id: 'free', name: 'Free Guest', weekly: 3, priority: false };
    used = user.used || 0;
  } else {
    const profile = await getProfile(user);
    plan = getPlan(profile.plan);
    credits = getUserCredits(user, profile);
    used = await weeklyUsageSinceMonday(user.id);
  }

  const isFeaturedSample = Boolean(GOLDEN_SAMPLES[videoId]);

  // Allowance & Credit Logic:
  // 1. If within weekly free allowance (used < plan.weekly), let it generate free.
  // 2. If weekly allowance exhausted (used >= plan.weekly):
  //    - If user has paid credits (credits > 0), use 1 paid credit (counts down 30 -> 29 -> 28)!
  //    - Else, strictly block generation and trigger Upgrade Modal.
  if (used >= plan.weekly) {
    if (credits > 0) {
      consumesCredit = true;
    } else {
      // If logged-in user hits limit, dispatch personalized upgrade email from vidvisual.xyz@gmail.com
      if (!isGuest && (plan.id === 'free' || plan.id === 'starter') && user.email) {
        (async () => {
          try {
            const db = admin();
            const profile = await getProfile(user);
            const lastSent = profile.last_upgrade_email_at ? new Date(profile.last_upgrade_email_at).getTime() : 0;
            const oneWeek = 6 * 24 * 60 * 60 * 1000;
            if (Date.now() - lastSent > oneWeek) {
              await db.from('profiles').update({ last_upgrade_email_at: new Date().toISOString() }).eq('id', user.id);
              await sendUserLimitUpgradeEmail({
                recipientEmail: user.email,
                recipientName: user.user_metadata?.full_name || user.user_metadata?.name || '',
                plan: plan.id,
                weeklyLimit: plan.weekly,
                proWeeklyLimit: 50,
              });
            }
          } catch (emailErr) {
            console.error('[Generate Route] Error sending limit upgrade email:', emailErr?.message || emailErr);
          }
        })();
      }

      return NextResponse.json(
        {
          error: `You reached your weekly allowance (${used}/${plan.weekly}). Free allowances recharge on Monday at 00:00 UTC (${resetInfo.countdownText} remaining). Grab a 30-Summary Pack ($1.99 one-time, was $4) or Pro ($4.99/mo, was $9) to keep generating!`,
          code: 'LIMIT',
          used,
          limit: plan.weekly,
          resetInfo,
          isGuest,
        },
        { status: 402 }
      );
    }
  }

    let data = null;
  let ytTitle = null;

  // Immediate Golden Sample check: Guaranteed 100% instant zero-error for featured samples
  if (GOLDEN_SAMPLES[videoId]) {
    const golden = GOLDEN_SAMPLES[videoId];
    data = JSON.parse(JSON.stringify(golden));
    ytTitle = golden.title;
  }

  if (!data) {
    let transcript;
    try {
      transcript = await getTranscript(videoId, language || 'en');
    } catch (err) {
      console.warn('[Generate Route] Transcript extraction failed for', videoId, ':', err?.message || err);
    }

    // Secondary Golden Sample check if transcript failed
    if ((!transcript || !transcript.text || transcript.text.length < 50) && GOLDEN_SAMPLES[videoId]) {
      const golden = GOLDEN_SAMPLES[videoId];
      data = JSON.parse(JSON.stringify(golden));
      ytTitle = golden.title;
    }

    // Graceful topic recovery: If captions are disabled or blocked, synthesize from title
    if (!data && (!transcript || !transcript.text || transcript.text.length < 50)) {
      ytTitle = await getVideoTitle(videoId);
      const fallbackTopic = ytTitle || `YouTube Video (${videoId})`;
      transcript = {
        text: `Topic & Educational Lecture: "${fallbackTopic}". Video URL: https://www.youtube.com/watch?v=${videoId}. Provide a comprehensive, in-depth visual whiteboard study summary, core concepts, mind map hierarchy, and actionable takeaways for this topic.`,
        minutes: 15,
      };
    }

    if (!data && transcript && transcript.text) {
      const rawModel = plan.priority
        ? process.env.GEMINI_MODEL_PRIORITY || 'gemini-2.5-flash'
        : process.env.GEMINI_MODEL || 'gemini-2.5-flash';
      const model = rawModel.includes('1.5') || rawModel.includes('1.0') || rawModel.includes('pro')
        ? 'gemini-2.5-flash'
        : rawModel;

      try {
        data = await summarize(transcript.text, model, language || 'auto');
        data.minutes = transcript.minutes;
      } catch (e) {
        console.error('[Generate Route] Summarization failed:', e?.message || e);
        // If golden sample is available, recover from error
        if (GOLDEN_SAMPLES[videoId]) {
          data = JSON.parse(JSON.stringify(GOLDEN_SAMPLES[videoId]));
        } else {
          const raw = (e?.message || '').toLowerCase();
          const friendly = raw.includes('abort') || raw.includes('timeout')
            ? 'Video processing timed out. Please try another video or try again.'
            : 'Could not generate summary for this video. Please select a specific language in the dropdown (e.g. English) or try another video.';
          return NextResponse.json({ error: friendly }, { status: 502 });
        }
      }
    }
  }

  if (!data) {
    return NextResponse.json(
      { error: 'Could not read captions or transcript. Please select the proper language from the dropdown or try another YouTube video.' },
      { status: 422 }
    );
  }

  if (!ytTitle) {
    ytTitle = await getVideoTitle(videoId);
  }
  data.language = language || 'auto';
  if (!data.minutes) data.minutes = 15;

  const cleanTitle = (ytTitle || data.title || 'Untitled Visual Summary')
    .toString()
    .replace(/\0/g, '')
    .trim()
    .slice(0, 255);

  const cleanUrl = (url || `https://www.youtube.com/watch?v=${videoId}`)
    .toString()
    .trim()
    .slice(0, 500);

  data.videoUrl = cleanUrl;
  data.videoId = videoId;

  const insertPayload = {
    user_id: user.id,
    video_id: videoId.slice(0, 50),
    video_url: cleanUrl,
    title: cleanTitle,
    format,
    data,
  };

  const db = admin();
  let { data: row, error: insertError } = await db
    .from('summaries')
    .insert(insertPayload)
    .select('id')
    .single();

  if (insertError) {
    console.error('[Generate Route] Primary DB insert failed:', insertError.message || insertError);
    
    const fallbackPayload = {
      user_id: user.id,
      video_id: videoId.slice(0, 50),
      video_url: cleanUrl,
      title: cleanTitle,
      format,
      data: {
        title: data.title || cleanTitle,
        level: data.level || 'Intermediate',
        quote: data.quote || '',
        concepts: (data.concepts || []).slice(0, 6),
        mindmap: data.mindmap || { center: 'Core Concepts', branches: [] },
        takeaways: (data.takeaways || []).slice(0, 5),
        minutes: data.minutes,
        language: data.language,
      },
    };

    const retry = await db
      .from('summaries')
      .insert(fallbackPayload)
      .select('id')
      .single();

    if (retry.error) {
      console.error('[Generate Route] Fallback DB insert failed:', retry.error.message || retry.error);
      return NextResponse.json({
        error: `Could not save summary: ${retry.error.message || 'Database error'}. Please try again.`
      }, { status: 500 });
    }

    row = retry.data;
  }

  let remainingCredits = credits;
  if (consumesCredit && !isGuest) {
    remainingCredits = await decrementUserCredits(user.id);
  }

  const response = NextResponse.json({
    id: row.id,
    isGuest,
    guestId: activeGuestId,
    used: used + 1,
    limit: plan.weekly,
    credits: remainingCredits,
    resetInfo,
  });

  if (isGuest && activeGuestId) {
    response.cookies.set('vv_guest_id', activeGuestId, {
      path: '/',
      maxAge: 365 * 24 * 60 * 60,
      sameSite: 'lax',
      httpOnly: false,
    });
  }

  return response;
}

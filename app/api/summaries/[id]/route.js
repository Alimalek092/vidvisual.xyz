import { NextResponse } from 'next/server';
import { admin, getUser, getProfile } from '@/lib/supabaseAdmin';
import { getOrCreateGuestUser } from '@/lib/guestAuth';
import { GOLDEN_SAMPLES } from '@/lib/sample';

export async function GET(request, { params }) {
  try {
    const id = params?.id;
    if (!id) {
      return NextResponse.json({ error: 'Summary ID is required.' }, { status: 400 });
    }

    // Layer 1: Check golden sample cache first (guaranteed instant hit)
    if (GOLDEN_SAMPLES && GOLDEN_SAMPLES[id]) {
      const sampleData = GOLDEN_SAMPLES[id];
      return NextResponse.json({
        summary: {
          id,
          video_id: id,
          video_url: `https://www.youtube.com/watch?v=${id}`,
          title: sampleData.title,
          format: 'whiteboard',
          data: sampleData,
          created_at: new Date().toISOString(),
        },
        plan: 'free',
        isGuest: true,
        isShared: true,
      });
    }

    const db = admin();
    let user = null;
    let isGuest = false;

    try {
      user = await getUser(request);
    } catch {}

    if (!user) {
      const guestId = request.headers.get('x-guest-id') || request.cookies.get('vv_guest_id')?.value;
      if (guestId) {
        try {
          user = await getOrCreateGuestUser(guestId);
          isGuest = true;
        } catch {}
      }
    }

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    // Fetch summary by id (or video_id if not a UUID)
    let summaryData = null;

    if (isUuid) {
      let query = db.from('summaries').select('*').eq('id', id);
      if (user && !isGuest) {
        query = query.eq('user_id', user.id);
      }
      const { data } = await query.maybeSingle();
      summaryData = data;

      // Fallback: Check shared link if not found under current user
      if (!summaryData) {
        const { data: shared } = await db.from('summaries').select('*').eq('id', id).maybeSingle();
        summaryData = shared;
      }
    } else {
      // Query by video_id
      const { data: byVideoId } = await db
        .from('summaries')
        .select('*')
        .eq('video_id', id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      summaryData = byVideoId;
    }

    if (!summaryData) {
      // Check if ID matches any golden sample alias
      const matchedSample = Object.entries(GOLDEN_SAMPLES || {}).find(
        ([k, v]) => k === id || v.title?.toLowerCase().includes(id.toLowerCase())
      );
      if (matchedSample) {
        const sampleData = matchedSample[1];
        return NextResponse.json({
          summary: {
            id,
            video_id: matchedSample[0],
            video_url: `https://www.youtube.com/watch?v=${matchedSample[0]}`,
            title: sampleData.title,
            format: 'whiteboard',
            data: sampleData,
            created_at: new Date().toISOString(),
          },
          plan: 'free',
          isGuest: true,
          isShared: true,
        });
      }

      return NextResponse.json({ error: 'Summary not found. Please try generating it again.' }, { status: 404 });
    }

    let plan = 'free';
    if (!isGuest && user) {
      try {
        const profile = await getProfile(user);
        plan = profile?.plan || 'free';
      } catch {}
    }

    return NextResponse.json({
      summary: summaryData,
      plan,
      isGuest,
      guestUsed: isGuest ? user?.used : undefined,
      guestLimit: isGuest ? user?.limit : undefined,
    });
  } catch (err) {
    console.error('[API Summaries ID] Unhandled error:', err?.message || err);
    return NextResponse.json(
      { error: 'Could not load summary. Please refresh the page.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await getUser(request);
    if (!user) return NextResponse.json({ error: 'Please log in.' }, { status: 401 });
    await admin().from('summaries').delete().eq('id', params.id).eq('user_id', user.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete summary.' }, { status: 500 });
  }
}

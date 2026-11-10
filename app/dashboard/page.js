'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase, authFetch } from '@/lib/supabaseClient';
import { getPlan } from '@/lib/plans';
import Pricing from '@/components/Pricing';
import SupportModal from '@/components/SupportModal';
import UpgradeModal from '@/components/UpgradeModal';

export default function Dashboard() {
  const router = useRouter();
  const [me, setMe] = useState(null);
  const [items, setItems] = useState(null);
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('whiteboard');
  const [language, setLanguage] = useState('auto');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [upgrading, setUpgrading] = useState('');
  const [showSupport, setShowSupport] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [limitResetInfo, setLimitResetInfo] = useState(null);

  const [successMsg, setSuccessMsg] = useState('');

  const load = useCallback(async () => {
    const { data } = await supabase().auth.getSession();
    if (!data.session) return router.replace('/login');

    // Claim any guest summaries created before logging in
    if (typeof window !== 'undefined') {
      const guestId = localStorage.getItem('vv_guest_id');
      if (guestId) {
        await authFetch('/api/guest/claim', {
          method: 'POST',
          body: JSON.stringify({ guestId }),
        }).catch(() => {});
        localStorage.removeItem('vv_guest_id');
      }
    }

    const [a, b] = await Promise.all([authFetch('/api/me'), authFetch('/api/summaries')]);
    if (a.ok) setMe(await a.json());
    if (b.ok) setItems((await b.json()).items);
  }, [router]);

  useEffect(() => {
    load();
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('checkout') === 'success') {
        setSuccessMsg('🎉 Payment successful! Your subscription is now active.');
        window.history.replaceState({}, '', '/dashboard');
      }
    }
  }, [load]);

  async function generate(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const res = await authFetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ url, format, language }),
      });
      const json = await res.json().catch(() => ({}));
      setBusy(false);
      if (!res.ok) {
        if (json.code === 'LIMIT') {
          if (json.resetInfo) setLimitResetInfo(json.resetInfo);
          setShowUpgradeModal(true);
          return setError(json.error || 'You reached your weekly limit. Free allowances recharge on every Monday of every week.');
        }
        return setError(json.error || 'Something went wrong. Please try again.');
      }
      router.push(`/summary/${json.id}`);
    } catch (err) {
      setBusy(false);
      const raw = (err?.message || '').toLowerCase();
      if (raw.includes('abort') || raw.includes('timeout')) {
        setError('Video processing took longer than expected. Please try another video or try again.');
      } else {
        setError(err?.message || 'Network error. Please try again.');
      }
    }
  }

  async function upgrade(plan, gateway = 'polar') {
    setError('');
    setUpgrading(plan);
    try {
      const res = await authFetch('/api/billing/checkout', { method: 'POST', body: JSON.stringify({ plan, gateway }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      if (json.url) {
        window.location.href = json.url;
        return;
      }
      throw new Error('Could not start checkout.');
    } catch (e) {
      setError(e.message || 'Could not start checkout.');
    }
    setUpgrading('');
  }

  async function remove(id) {
    await authFetch(`/api/summaries/${id}`, { method: 'DELETE' });
    setItems((list) => list.filter((x) => x.id !== id));
  }

  async function logout() {
    await supabase().auth.signOut();
    router.replace('/');
  }

  const left = me ? Math.max(0, me.limit - me.used) : null;

  return (
    <>
      <nav className="nav">
        <Link href="/" className="brand vv-hand"><img src="/logo.png" alt="vidvisual" className="brand-icon" width="32" height="32" /><span>vidvisual</span></Link>
        <div className="nav-links">
          {me ? <span className="chip">{getPlan(me.plan).name}</span> : null}{me?.credits > 0 ? <span className="chip" style={{ background: "#fef3c7", color: "#92400e", borderColor: "#f59e0b", fontWeight: 700, marginLeft: "6px" }}>⚡ {me.credits} credits</span> : null}
          <a href="#plans" className="link">Plans</a>
          <Link href="/" className="link">Landing Page</Link>
          <button className="link" onClick={() => setShowSupport(true)}>Support</button>
          <button className="link" onClick={logout}>Log out</button>
        </div>
      </nav>

      <SupportModal open={showSupport} onClose={() => setShowSupport(false)} />
      <UpgradeModal
        open={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        used={me?.used || 3}
        limit={me?.limit || 3}
        resetInfo={limitResetInfo}
      />

      <main className="dash">
        <h1 className="vv-hand">Make a visual</h1>
        <form className="gen" onSubmit={generate}>
          <input
            type="url" required placeholder="https://www.youtube.com/watch?v=…"
            value={url} onChange={(e) => setUrl(e.target.value)} aria-label="YouTube link"
          />
          <div className="seg" role="radiogroup" aria-label="Format">
            {[['whiteboard', 'Whiteboard'], ['infographic', 'Infographic']].map(([v, l]) => (
              <button type="button" key={v} role="radio" aria-checked={format === v}
                className={format === v ? 'on' : ''} onClick={() => setFormat(v)}>{l}</button>
            ))}
          </div>
          <select
            className="lang-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Summary Language"
            title="Choose summary language"
          >
            <option value="auto">🌐 Auto (Same as video)</option>
            <option value="English">🇺🇸 English</option>
            <option value="Spanish">🇪🇸 Spanish (Español)</option>
            <option value="French">🇫🇷 French (Français)</option>
            <option value="German">🇩🇪 German (Deutsch)</option>
            <option value="Italian">🇮🇹 Italian (Italiano)</option>
            <option value="Portuguese">🇵🇹 Portuguese (Português)</option>
            <option value="Arabic">🇸🇦 Arabic (العربية)</option>
            <option value="Hindi">🇮🇳 Hindi (हिन्दी)</option>
            <option value="Japanese">🇯🇵 Japanese (日本語)</option>
            <option value="Korean">🇰🇷 Korean (한국어)</option>
            <option value="Chinese">🇨🇳 Chinese (中文)</option>
            <option value="Russian">🇷🇺 Russian (Русский)</option>
            <option value="Turkish">🇹🇷 Turkish (Türkçe)</option>
            <option value="Indonesian">🇮🇩 Indonesian (Bahasa)</option>
            <option value="Dutch">🇳🇱 Dutch (Nederlands)</option>
          </select>
          <button className="btn btn-primary" disabled={busy}>{busy ? 'Reading the video…' : 'Generate visual'}</button>
        </form>
        {me ? (
          <div className="usage">
            <div className="bar"><i style={{ width: `${Math.min(100, (me.used / me.limit) * 100)}%` }} /></div>
            <span>{left} of {me.limit} summaries left this week</span>
          </div>
        ) : null}
        {successMsg ? <p className="msg msg-ok" role="status">{successMsg}</p> : null}
        {error ? (
          <div
            className="msg msg-error"
            role="alert"
            style={{
              background: error.toLowerCase().includes('limit') ? 'rgba(239, 68, 68, 0.08)' : 'rgba(43, 89, 224, 0.06)',
              border: error.toLowerCase().includes('limit') ? '2px solid #ef4444' : '2px solid var(--blue)',
              borderRadius: '14px',
              padding: '16px 18px',
            }}
          >
            {error.toLowerCase().includes('limit') ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '1.2rem' }}>🔴</span>
                <strong style={{ color: '#dc2626', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  Weekly Free Limit Reached
                </strong>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '1.2rem' }}>💡</span>
                <strong style={{ color: 'var(--blue)', fontSize: '1rem', fontWeight: 700 }}>
                  Helpful Tip for this Video
                </strong>
              </div>
            )}
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.45, color: error.toLowerCase().includes('limit') ? '#991b1b' : 'var(--ink)', fontWeight: error.toLowerCase().includes('limit') ? 600 : undefined }}>
              {error}
            </p>
            {error.toLowerCase().includes('limit') ? (
              <div style={{ marginTop: '12px' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowUpgradeModal(true)}
                  style={{ padding: '10px 20px', fontSize: '0.92rem', fontWeight: 800 }}
                >
                  ⚡ Upgrade to Pro to Continue ($9/mo) &rarr;
                </button>
              </div>
            ) : (
              <div style={{ marginTop: '10px' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '8px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setLanguage('English');
                      setError('');
                    }}
                    className="btn btn-sm"
                    style={{ fontSize: '0.78rem', padding: '5px 12px', background: 'var(--paper)', border: '1.5px solid var(--ink)', cursor: 'pointer' }}
                  >
                    🇺🇸 Try in English
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUrl('https://www.youtube.com/watch?v=LG53Vxum0as');
                      setError('');
                    }}
                    className="btn btn-sm"
                    style={{ fontSize: '0.78rem', padding: '5px 12px', background: 'var(--paper)', border: '1.5px solid var(--ink)', cursor: 'pointer' }}
                  >
                    🎙️ Test Huberman Sample
                  </button>
                </div>
                <p className="small" style={{ margin: 0, color: 'var(--ink-soft)' }}>
                  Questions or issues? Email support anytime at{' '}
                  <a href="mailto:vidvisual.xyz@gmail.com" style={{ textDecoration: 'underline', fontWeight: 600 }}>
                    vidvisual.xyz@gmail.com
                  </a>
                </p>
              </div>
            )}
          </div>
        ): null}

        <section id="plans" className="upgrade">
          <h2 className="vv-hand">Unlock more visual summaries</h2>
          <p className="muted" style={{ marginBottom: '8px', fontSize: '0.95rem' }}>
            {me && me.plan === 'free'
              ? `You're on the Free plan (${left} of ${me.limit} left this week). Upgrade to generate up to 200 summaries per week with HD exports, PDF downloads, and zero watermarks.`
              : 'Choose the plan that fits your learning workflow. All plans include instant AI summaries, visual mind maps, and a personal cloud library.'}
          </p>
          <Pricing current={me?.plan} onSelect={upgrade} busy={upgrading} />
        </section>

        <h2 className="vv-hand lib-title">Your library</h2>
        {items === null ? <p className="muted">Loading…</p> : items.length === 0 ? (
          <p className="muted">Nothing here yet. Paste a YouTube link above to make your first visual.</p>
        ) : (
          <ul className="library">
            {items.map((it) => (
              <li key={it.id}>
                <Link href={`/summary/${it.id}`}>
                  <img src={`https://i.ytimg.com/vi/${it.video_id}/mqdefault.jpg`} alt="" loading="lazy" />
                  <strong>{it.title}</strong>
                  <span className="muted small">{it.format === 'whiteboard' ? 'Whiteboard' : 'Infographic'} · {new Date(it.created_at).toLocaleDateString()}</span>
                </Link>
                <button className="link small" onClick={() => remove(it.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}

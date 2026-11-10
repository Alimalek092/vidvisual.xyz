'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase, authFetch } from '@/lib/supabaseClient';
import { getPlan } from '@/lib/plans';
import Visual, { THEMES } from '@/components/Visual';
import { GOLDEN_SAMPLES } from '@/lib/sample';
import SupportModal from '@/components/SupportModal';
import UpgradeModal from '@/components/UpgradeModal';

function download(dataUrl, name) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = name;
  a.click();
}

export default function SummaryPage({ params }) {
  const router = useRouter();
  const ref = useRef(null);
  const [state, setState] = useState({ loading: true });
  const [theme, setTheme] = useState('marker');
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [showSupport, setShowSupport] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: sessionData } = await supabase().auth.getSession();
      const guestId = typeof window !== 'undefined' ? localStorage.getItem('vv_guest_id') : null;

      const headers = {};
      if (guestId) headers['x-guest-id'] = guestId;

      try {
        // Direct client-side Golden Sample fallback
        if (GOLDEN_SAMPLES && GOLDEN_SAMPLES[params.id]) {
          const sampleData = GOLDEN_SAMPLES[params.id];
          return setState({
            summary: {
              id: params.id,
              video_id: params.id,
              video_url: `https://www.youtube.com/watch?v=${params.id}`,
              title: sampleData.title,
              format: 'whiteboard',
              data: sampleData,
            },
            plan: getPlan('free'),
            isGuest: !sessionData?.session,
          });
        }

        const res = sessionData?.session
          ? await authFetch(`/api/summaries/${params.id}`)
          : await fetch(`/api/summaries/${params.id}`, { headers });

        const json = await res.json().catch(() => null);

        if (!res.ok || !json) {
          // Check local guest history if API is temporarily unavailable
          if (typeof window !== 'undefined') {
            try {
              const history = JSON.parse(localStorage.getItem('vv_guest_history') || '[]');
              const matched = history.find((h) => h.id === params.id);
              if (matched && matched.data) {
                return setState({
                  summary: matched,
                  plan: getPlan('free'),
                  isGuest: true,
                });
              }
            } catch {}
          }
          return setState({
            error: json?.error || 'Could not load visual notes. Please try refreshing.',
            isGuest: !sessionData?.session,
          });
        }

        if (!json.summary) {
          return setState({
            error: 'Could not find this visual summary. Please try generating it again.',
            isGuest: !sessionData?.session,
          });
        }

        setState({
          summary: json.summary,
          plan: getPlan(json.plan),
          isGuest: !sessionData?.session || json.isGuest,
          guestUsed: json.guestUsed,
          guestLimit: json.guestLimit || 3,
        });
      } catch (err) {
        setState({
          error: 'Connection interrupted while loading notes. Please refresh the page.',
          isGuest: !sessionData?.session,
        });
      }
    })();
  }, [params.id]);

  if (state.loading) return <main className="dash"><p className="muted">Loading visual notes…</p></main>;
  if (state.error) return (
    <main className="dash" style={{ maxWidth: '640px', margin: '48px auto', padding: '0 16px' }}>
      <div
        className="msg msg-error"
        style={{
          borderRadius: '16px',
          padding: '22px 24px',
          background: 'rgba(43, 89, 224, 0.06)',
          border: '2px solid var(--blue)',
          color: 'var(--ink)',
          boxShadow: '4px 4px 0 var(--ink)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span style={{ fontSize: '1.4rem' }}>💡</span>
          <h2 className="vv-hand" style={{ margin: 0, fontSize: '1.45rem' }}>
            Could not open visual notes
          </h2>
        </div>
        <p style={{ margin: '0 0 16px', color: 'var(--ink-soft)', fontSize: '0.92rem', lineHeight: 1.5 }}>
          {state.error}
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn btn-primary btn-sm"
            style={{ cursor: 'pointer' }}
          >
            🔄 Refresh Notes
          </button>
          <Link
            href={state.isGuest ? '/' : '/dashboard'}
            className="btn btn-sm"
            style={{ background: 'var(--paper)', border: '1.5px solid var(--ink)', textDecoration: 'none' }}
          >
            {state.isGuest ? '🏠 Back to Generator' : '📚 Back to Library'}
          </Link>
        </div>
      </div>
    </main>
  );

  const { summary, plan, isGuest } = state;
  const base = summary.title.replace(/[^\w]+/g, '-').slice(0, 40) || 'visual';

  async function exportAs(kind) {
    setError('');
    setBusy(kind);
    try {
      const lib = await import('html-to-image');
      const bg = document.documentElement.dataset.theme === 'dark' ? '#0f172a' : '#ffffff';
      const node = ref.current;
      if (!node) throw new Error('Visual element not found');

      const TARGET_WIDTH = 1200;
      const actualWidth = node.offsetWidth || TARGET_WIDTH;
      const scale = TARGET_WIDTH / actualWidth;
      const targetHeight = Math.round(node.offsetHeight * scale);

      const exportOptions = {
        backgroundColor: bg,
        width: TARGET_WIDTH,
        height: targetHeight,
        style: {
          width: `${TARGET_WIDTH}px`,
          maxWidth: `${TARGET_WIDTH}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          margin: '0',
        },
      };

      if (kind === 'jpg') {
        const dataUrl = await lib.toJpeg(node, {
          ...exportOptions,
          quality: 0.95,
          pixelRatio: 3,
        });
        download(dataUrl, `${base}.jpg`);
      } else if (kind === 'png') {
        if (!plan.hdPng) {
          setShowUpgradeModal(true);
          setBusy('');
          return;
        }
        const dataUrl = await lib.toPng(node, {
          ...exportOptions,
          pixelRatio: 4,
        });
        download(dataUrl, `${base}-hd.png`);
      } else if (kind === 'pdf') {
        if (!plan.pdf) {
          setShowUpgradeModal(true);
          setBusy('');
          return;
        }
        const { jsPDF } = await import('jspdf');
        const dataUrl = await lib.toPng(node, {
          ...exportOptions,
          pixelRatio: 3,
        });
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [TARGET_WIDTH, targetHeight],
          hotfixes: ['px_scaling'],
        });
        pdf.addImage(dataUrl, 'PNG', 0, 0, TARGET_WIDTH, targetHeight, undefined, 'FAST');
        pdf.save(`${base}.pdf`);
      }
    } catch (err) {
      console.error('[Export Error]:', err);
      setError('Could not create the download. Please try again.');
    }
    setBusy('');
  }

  return (
    <>
      <UpgradeModal
        open={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        used={state.guestUsed || 3}
        limit={state.guestLimit || 3}
      />

      <nav className="nav">
        <Link href={isGuest ? '/' : '/dashboard'} className="brand vv-hand">
          <img src="/logo.png" alt="vidvisual" className="brand-icon" width="32" height="32" />
          <span>vidvisual</span>
        </Link>
        <div className="nav-links">
          {isGuest ? (
            <>
              <Link href="/" className="link">⚡ Make Another</Link>
              <Link href="/login" className="link">Log in</Link>
              <Link href="/register" className="btn btn-primary btn-sm">Sign up Free</Link>
            </>
          ) : (
            <>
              <button className="link" onClick={() => setShowSupport(true)}>Support</button>
              <Link href="/dashboard">Back to library</Link>
            </>
          )}
        </div>
      </nav>

      <SupportModal open={showSupport} onClose={() => setShowSupport(false)} />
      <UpgradeModal open={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} reason="export" />

      <main className="dash">
        {/* Guest Progress Notice */}
        {isGuest ? (
          <div style={{ background: 'var(--paper)', border: '2px solid var(--blue)', borderRadius: '12px', padding: '12px 18px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--ink)' }}>
              ✨ <strong>Guest Summary Created!</strong> (3 free summaries/week • Recharges on every Monday of every week). Create a free account to save your library permanently.
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link href="/register" className="btn btn-primary btn-sm" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
                Save My Notes Free &rarr;
              </Link>
            </div>
          </div>
        ) : null}

        <h1 className="vv-hand small-h">{summary.title}</h1>
        <div className="toolbar">
          <button className="btn" disabled={!!busy} onClick={() => exportAs('jpg')}>
            {busy === 'jpg' ? 'Preparing…' : 'Download JPG'}
          </button>
          <button
            className="btn"
            disabled={!!busy}
            onClick={() => exportAs('png')}
            title={plan.hdPng ? 'High definition PNG' : 'Upgrade to Pro for HD watermark-free PNG'}
          >
            {plan.hdPng ? (busy === 'png' ? 'Preparing…' : 'Download HD PNG') : 'HD PNG · Pro 🔒'}
          </button>
          <button
            className="btn"
            disabled={!!busy}
            onClick={() => exportAs('pdf')}
            title={plan.pdf ? 'Printable vector PDF' : 'Upgrade to Unlimited for PDF exports'}
          >
            {plan.pdf ? (busy === 'pdf' ? 'Preparing…' : 'Download PDF') : 'PDF · Unlimited 🔒'}
          </button>
          <button
            className="btn"
            onClick={() => {
              const text = `Just turned "${summary.title}" into visual whiteboard notes in 20s with @vidvisual! 🧠⚡\n\nTurn any YouTube video into visual mind maps:`;
              const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://www.vidvisual.xyz')}`;
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
            title="Share this visual note on X (Twitter)"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <span>𝕏 Share</span>
          </button>
          <span className="spacer" />
          {plan.themes ? (
            <label className="theme">
              Theme
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                {Object.entries(THEMES).map(([k, v]) => (
                  <option key={k} value={k}>{v.name}</option>
                ))}
              </select>
            </label>
          ) : (
            <span className="muted small">Custom themes come with Unlimited</span>
          )}
        </div>
        {error ? (
          <div className="msg msg-error" role="alert">
            <p style={{ margin: 0 }}>{error}</p>
            <p className="small" style={{ margin: '6px 0 0' }}>
              Having trouble? Contact support at{' '}
              <a href="mailto:vidvisual.xyz@gmail.com" style={{ textDecoration: 'underline', fontWeight: 600 }}>
                vidvisual.xyz@gmail.com
              </a>
            </p>
          </div>
        ) : null}
        <div className="stage">
          <Visual ref={ref} data={summary.data} format={summary.format} theme={theme} watermark={plan.watermark} />
        </div>
      </main>
    </>
  );
}

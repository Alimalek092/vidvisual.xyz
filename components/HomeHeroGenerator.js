'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase, authFetch } from '@/lib/supabaseClient';
import UpgradeModal from '@/components/UpgradeModal';

export default function HomeHeroGenerator() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('whiteboard');
  const [language, setLanguage] = useState('auto');
  const [busy, setBusy] = useState(false);
  const [stepText, setStepText] = useState('');
  const [error, setError] = useState('');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [limitData, setLimitData] = useState({ used: 3, limit: 3, resetInfo: null });
  const [hasHitLimit, setHasHitLimit] = useState(false);

  // Ensure persistent guest ID exists in localStorage and cookie
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let gid = localStorage.getItem('vv_guest_id');
      if (!gid) {
        gid = crypto.randomUUID();
        localStorage.setItem('vv_guest_id', gid);
      }
      // Ensure cookie is synced for server-side read
      document.cookie = `vv_guest_id=${gid}; path=/; max-age=31536000; SameSite=Lax`;

      // Check if user previously hit limit this week
      const storedLimit = localStorage.getItem('vv_limit_hit');
      if (storedLimit) {
        setHasHitLimit(true);
      }
    }
  }, []);

  async function handleGenerate(e) {
    e.preventDefault();
    if (!url.trim()) return;

    if (hasHitLimit) {
      setShowUpgradeModal(true);
      return;
    }

    setError('');
    setBusy(true);
    setStepText('🔍 Reading video transcript & captions…');

    const stepTimer1 = setTimeout(() => {
      setStepText('🧠 AI synthesizing core concepts & study notes…');
    }, 4500);

    const stepTimer2 = setTimeout(() => {
      setStepText('🎨 Building whiteboard concept cards & mind map…');
    }, 9500);

    try {
      const { data: sessionData } = await supabase().auth.getSession();
      const guestId = typeof window !== 'undefined' ? localStorage.getItem('vv_guest_id') : null;

      const headers = { 'Content-Type': 'application/json' };
      if (guestId) headers['x-guest-id'] = guestId;

      const res = sessionData?.session
        ? await authFetch('/api/generate', {
            method: 'POST',
            body: JSON.stringify({ url, format, language }),
          })
        : await fetch('/api/generate', {
            method: 'POST',
            headers,
            body: JSON.stringify({ url, format, language }),
          });

      const json = await res.json().catch(() => ({}));

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      if (!res.ok) {
        setBusy(false);
        if (json.code === 'LIMIT') {
          setLimitData({
            used: json.used || 3,
            limit: json.limit || 3,
            resetInfo: json.resetInfo || null,
          });
          setHasHitLimit(true);
          if (typeof window !== 'undefined') {
            localStorage.setItem('vv_limit_hit', 'true');
          }
          setShowUpgradeModal(true);
          return;
        }
        setError(json.error || 'Failed to generate visual summary. Please try another video.');
        return;
      }

      // Record in local history if guest
      if (json.isGuest && typeof window !== 'undefined') {
        try {
          const history = JSON.parse(localStorage.getItem('vv_guest_history') || '[]');
          history.unshift({ id: json.id, url, format, createdAt: new Date().toISOString() });
          localStorage.setItem('vv_guest_history', JSON.stringify(history.slice(0, 10)));
        } catch {}
      }

      setStepText('✅ Complete! Opening visual summary…');
      router.push(`/summary/${json.id}`);
    } catch (err) {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setBusy(false);
      const raw = (err?.message || '').toLowerCase();
      if (raw.includes('abort') || raw.includes('timeout')) {
        setError('Video processing took longer than expected. Please try another video or try again.');
      } else {
        setError(err?.message || 'Network error. Please try again.');
      }
    }
  }

  return (
    <>
      <UpgradeModal
        open={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        used={limitData.used}
        limit={limitData.limit}
        resetInfo={limitData.resetInfo}
      />

      <div className="hero-generator-box" style={{ background: 'var(--paper)', border: '3px solid var(--ink)', borderRadius: '18px', padding: '24px 22px', boxShadow: '6px 6px 0 var(--ink)', marginTop: '20px' }}>
        
        {/* Persistent Psychological Red Alert Banner if limit is reached */}
        {hasHitLimit ? (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.08)',
              border: '2px solid #ef4444',
              borderRadius: '12px',
              padding: '12px 14px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🔴</span>
                <strong style={{ color: '#dc2626', fontSize: '0.92rem' }}>
                  You just reached your limit of this week.
                </strong>
              </div>
              <p style={{ margin: '3px 0 0', fontSize: '0.82rem', color: '#991b1b', lineHeight: 1.4 }}>
                Free allowances recharge on every Monday of every week. If you want to generate more summaries, buy pro version now.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowUpgradeModal(true)}
              style={{ padding: '8px 16px', fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap' }}
            >
              ⚡ Upgrade to Pro ($4.99/mo, was $9)
            </button>
          </div>
        ) : null}

        <form onSubmit={handleGenerate} style={{ display: 'grid', gap: '14px' }}>
          
          {/* URL Input */}
          <div style={{ position: 'relative' }}>
            <input
              type="url"
              required
              placeholder="Paste any YouTube video or podcast URL…"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={busy}
              aria-label="YouTube video URL"
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: '1rem',
                borderRadius: '12px',
                border: '2px solid var(--ink)',
                background: 'var(--board)',
                color: 'var(--ink)',
                boxSizing: 'border-box',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
            {/* Quick Sample Video Chips */}
            <div className="quick-samples-row" aria-label="Quick Sample Videos">
              <span style={{ fontWeight: 600 }}>Try sample:</span>
              <button
                type="button"
                className="quick-sample-chip"
                onClick={() => setUrl('https://www.youtube.com/watch?v=UF8uR6Z6KLc')}
                disabled={busy}
              >
                🍎 Steve Jobs (Stanford Speech)
              </button>
              <button
                type="button"
                className="quick-sample-chip"
                onClick={() => setUrl('https://www.youtube.com/watch?v=LG53Vxum0as')}
                disabled={busy}
              >
                🎙️ Huberman (Focus &amp; Brain)
              </button>
              <button
                type="button"
                className="quick-sample-chip"
                onClick={() => setUrl('https://www.youtube.com/watch?v=5eW6Eagr9XA')}
                disabled={busy}
              >
                🔬 Veritasium (Master Any Skill)
              </button>
              <button
                type="button"
                className="quick-sample-chip"
                onClick={() => setUrl('https://www.youtube.com/watch?v=WUvTyaaNkzM')}
                disabled={busy}
              >
                📐 3Blue1Brown (Calculus)
              </button>
            </div>
          </div>

          {/* Options Row: Format & Language */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div className="seg" role="radiogroup" aria-label="Summary Format" style={{ margin: 0, flex: 1, minWidth: '220px' }}>
              <button
                type="button"
                role="radio"
                aria-checked={format === 'whiteboard'}
                className={format === 'whiteboard' ? 'on' : ''}
                onClick={() => setFormat('whiteboard')}
                disabled={busy}
                style={{ fontSize: '0.88rem' }}
              >
                ✏️ Whiteboard
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={format === 'infographic'}
                className={format === 'infographic' ? 'on' : ''}
                onClick={() => setFormat('infographic')}
                disabled={busy}
                style={{ fontSize: '0.88rem' }}
              >
                📊 Infographic
              </button>
            </div>

            <select
              className="lang-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={busy}
              aria-label="Summary Language"
              style={{ padding: '9px 14px', borderRadius: '10px', border: '2px solid var(--ink)', background: 'var(--board)', color: 'var(--ink)', fontSize: '0.88rem', fontWeight: 600, minWidth: '160px', flex: 1 }}
            >
              <option value="auto">🌐 Auto (Same as video)</option>
              <option value="English">🇺🇸 English</option>
              <option value="Spanish">🇪🇸 Spanish (Español)</option>
              <option value="French">🇫🇷 French (Français)</option>
              <option value="German">🇩🇪 German (Deutsch)</option>
              <option value="Hindi">🇮🇳 Hindi (हिन्दी)</option>
              <option value="Japanese">🇯🇵 Japanese (日本語)</option>
              <option value="Korean">🇰🇷 Korean (한국어)</option>
              <option value="Chinese">🇨🇳 Chinese (中文)</option>
              <option value="Portuguese">🇵🇹 Portuguese (Português)</option>
              <option value="Arabic">🇸🇦 Arabic (العربية)</option>
              <option value="Italian">🇮🇹 Italian (Italiano)</option>
              <option value="Russian">🇷🇺 Russian (Русский)</option>
            </select>
          </div>

          {/* Action Button */}
          <button
            type={hasHitLimit ? "button" : "submit"}
            onClick={(e) => {
              if (hasHitLimit) {
                e.preventDefault();
                setShowUpgradeModal(true);
              }
            }}
            className="btn btn-primary btn-lg"
            disabled={busy}
            style={{ width: '100%', fontSize: '1.08rem', padding: '14px 24px', fontWeight: 700, cursor: busy ? 'wait' : 'pointer' }}
          >
            {busy ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span className="spinner" style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                <span>{stepText || 'Synthesizing with AI…'}</span>
              </span>
            ) : hasHitLimit ? (
              '⚡ Limit Reached — Upgrade to Pro for Instant Access'
            ) : (
              '⚡ Generate Visual Summary Free (No Login Needed)'
            )}
          </button>
        </form>


        {/* Error message */}
        {error ? (
          <div
            className="msg msg-error"
            role="alert"
            style={{
              marginTop: '16px',
              fontSize: '0.9rem',
              borderRadius: '14px',
              padding: '14px 18px',
              border: error.toLowerCase().includes('limit') ? '2px solid #ef4444' : '2px solid var(--blue)',
              background: error.toLowerCase().includes('limit') ? 'rgba(239, 68, 68, 0.08)' : 'rgba(43, 89, 224, 0.06)',
              color: 'var(--ink)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{error.toLowerCase().includes('limit') ? '🔴' : '💡'}</span>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 6px', fontWeight: 700, fontSize: '0.94rem' }}>
                  {error.toLowerCase().includes('limit') ? 'Weekly Free Allowance' : 'Helpful Tip for this Video'}
                </p>
                <p style={{ margin: '0 0 10px', fontSize: '0.86rem', color: 'var(--ink)', lineHeight: 1.5 }}>
                  {error}
                </p>
                {!error.toLowerCase().includes('limit') ? (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage('English');
                        setError('');
                      }}
                      className="btn btn-sm"
                      style={{ fontSize: '0.78rem', padding: '5px 12px', background: 'var(--paper)', border: '1.5px solid var(--ink)', cursor: 'pointer' }}
                    >
                      🇺🇸 Set Language to English
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
                      🎙️ Test Verified Sample
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        {/* Trust & Guarantee Strip */}
        <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
          <span>✨ <strong>3 free summaries every week</strong></span>
          <span>⚡ Under 20s turnaround</span>
          <span>🔒 Zero card or login required</span>
        </div>
      </div>
    </>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

function calculateMondayReset() {
  const now = new Date();
  const day = now.getUTCDay(); // 0 is Sun, 1 is Mon...
  const diffToNextMonday = ((7 - day + 1) % 7) || 7;

  const nextMonday = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + diffToNextMonday,
    0, 0, 0, 0
  ));

  const options = { weekday: 'long', month: 'short', day: 'numeric', timeZone: 'UTC' };
  const formattedDate = nextMonday.toLocaleDateString('en-US', options);

  const msRemaining = nextMonday.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.floor(msRemaining / (24 * 60 * 60 * 1000)));
  const hoursRemaining = Math.max(0, Math.floor((msRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)));

  const countdownText = daysRemaining > 0
    ? `${daysRemaining} day${daysRemaining > 1 ? 's' : ''} and ${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''}`
    : `${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''}`;

  return { formattedDate, countdownText, daysRemaining, hoursRemaining };
}

export default function UpgradeModal({
  open,
  onClose,
  used = 3,
  limit = 3,
  resetInfo: serverResetInfo,
  reason = 'limit',
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const [email, setEmail] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [clientReset, setClientReset] = useState(null);
  const [busyPlan, setBusyPlan] = useState('');
  const [gateway, setGateway] = useState('polar'); // 'polar' | 'dodo'

  useEffect(() => {
    setClientReset(calculateMondayReset());
    const interval = setInterval(() => {
      setClientReset(calculateMondayReset());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (open && typeof document !== 'undefined') {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  if (!open || !mounted || typeof document === 'undefined') return null;

  const resetData = serverResetInfo || clientReset || calculateMondayReset();

  async function handleCheckout(plan) {
    setBusyPlan(plan);
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, gateway }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      // If 401 (unauthorized) and no direct link, fallback to register with plan
      window.location.href = `/register?plan=${plan}&gateway=${gateway}`;
    } catch {
      window.location.href = `/register?plan=${plan}&gateway=${gateway}`;
    } finally {
      setBusyPlan('');
    }
  }

  async function handleSendRecallEmail(e) {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setSendingEmail(true);

    try {
      const res = await fetch('/api/email/recall-limit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send recall email');
      setEmailSent(true);
    } catch (err) {
      setEmailError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSendingEmail(false);
    }
  }

  const isExportReason = reason === 'export';

  return createPortal(
    <div
      className="modal-backdrop"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.72)',
        backdropFilter: 'blur(7px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--paper)',
          border: '3px solid var(--ink)',
          borderRadius: '22px',
          maxWidth: '840px',
          width: '100%',
          maxHeight: '94vh',
          overflowY: 'auto',
          padding: '28px 24px',
          boxShadow: '10px 10px 0 var(--ink)',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '14px',
            right: '16px',
            background: 'var(--board)',
            border: '2px solid var(--ink)',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
            cursor: 'pointer',
            color: 'var(--ink)',
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          &times;
        </button>

        {/* Top Context Alert */}
        {isExportReason ? (
          <div
            style={{
              background: 'rgba(37, 99, 235, 0.08)',
              border: '2px solid var(--blue)',
              borderRadius: '14px',
              padding: '14px 16px',
              marginBottom: '18px',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '1.2rem' }}>📄</span>
              <strong style={{ color: 'var(--blue)', fontSize: '1rem', fontWeight: 800 }}>
                HD Watermark-Free PDF &amp; PNG Export
              </strong>
            </div>
            <p style={{ margin: 0, color: 'var(--ink)', fontSize: '0.9rem', lineHeight: 1.45 }}>
              Free accounts include standard web preview. Unlock clean, unwatermarked high-res PDFs for Notion, GoodNotes, or printing with our limited-time $1.99 Starter Pass (was $4) or Pro ($4.99/mo).
            </p>
          </div>
        ) : (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.08)',
              border: '2px solid #ef4444',
              borderRadius: '14px',
              padding: '14px 16px',
              marginBottom: '18px',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '1.2rem', animation: 'pulse 1.5s infinite' }}>🔴</span>
              <strong style={{ color: '#dc2626', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                You reached your free weekly limit ({used}/{limit})
              </strong>
            </div>
            <p style={{ margin: '0 0 6px', color: '#b91c1c', fontSize: '0.92rem', lineHeight: 1.45, fontWeight: 600 }}>
              Free allowances recharge on Monday at 00:00 UTC.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1px solid #fca5a5', padding: '3px 10px', borderRadius: '8px', fontSize: '0.82rem', color: '#991b1b', fontWeight: 700 }}>
              <span>⏳ Next recharge:</span>
              <span>{resetData.countdownText}</span>
              <span>({resetData.formattedDate})</span>
            </div>
            <p style={{ margin: '8px 0 0', color: '#7f1d1d', fontSize: '0.88rem', fontWeight: 600 }}>
              👉 Want to generate more right now? Grab the limited-time $1.99 pass (was $4) or upgrade to Pro ($4.99/mo) below!
            </p>
          </div>
        )}

        {/* Modal Headline & Urgency Banner */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(245, 158, 11, 0.12))',
              border: '1.5px dashed #ef4444',
              borderRadius: '999px',
              padding: '5px 14px',
              fontSize: '0.82rem',
              fontWeight: 800,
              color: '#dc2626',
              marginBottom: '10px',
            }}
          >
            <span>🔥 LIMITED-TIME DISCOUNT: Slashed up to 50% for early users!</span>
          </div>
          <h2 className="vv-hand" style={{ fontSize: '2rem', margin: '0 0 8px', lineHeight: 1.2, color: 'var(--ink)' }}>
            Choose the option that fits your study flow
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: '0.92rem', margin: 0, lineHeight: 1.5 }}>
            No hidden fees. Instant access to visual notes, mind maps, and watermark-free PDF exports.
          </p>
        </div>

        {/* 🇮🇳 Payment Gateway Switcher (Polar vs. UPI / Dodo) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
          <div
            style={{
              background: 'var(--board)',
              border: '2px solid var(--ink)',
              borderRadius: '999px',
              padding: '3px',
              display: 'inline-flex',
              gap: '4px',
              width: '100%',
              maxWidth: '420px',
            }}
          >
            <button
              type="button"
              onClick={() => setGateway('polar')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '999px',
                border: 'none',
                background: gateway === 'polar' ? 'var(--blue)' : 'transparent',
                color: gateway === 'polar' ? '#fff' : 'var(--ink)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              💳 Card / Global
            </button>
            <button
              type="button"
              onClick={() => setGateway('dodo')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '999px',
                border: 'none',
                background: gateway === 'dodo' ? '#16a34a' : 'transparent',
                color: gateway === 'dodo' ? '#fff' : 'var(--ink)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              🇮🇳 Pay with UPI
            </button>
          </div>
        </div>

        {/* 3 High-Psychology Options Grid: $1.99 Starter vs $4.99/mo Pro vs $12.99/mo Unlimited */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px', marginBottom: '18px' }}>
          {/* Card 1: $1.99 30-Summary Pack (One-Time) */}
          <div
            style={{
              background: 'var(--board)',
              border: '2.5px solid #f59e0b',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '3px 3px 0 #f59e0b',
              position: 'relative',
            }}
          >
            <div>
              <div style={{ display: 'inline-block', background: '#f59e0b', color: '#1e293b', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', textTransform: 'uppercase', marginBottom: '6px' }}>
                ⚡ ONE-TIME • 50% OFF
              </div>
              <h3 style={{ margin: '0 0 4px', fontSize: '1.2rem', color: 'var(--ink)', fontWeight: 800 }}>
                30-Summary Pack
              </h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', marginBottom: '8px' }}>
                Prepaid pack of 30 summaries — counts down as you use them.
              </div>

              {/* Price with Red Cut & Strikethrough Anchor */}
              <div style={{ margin: '4px 0 10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                  <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', fontSize: '1.1rem', fontWeight: 800, color: 'var(--ink-soft)' }}>
                    <span>$4</span>
                    <svg style={{ position: 'absolute', top: '50%', left: '-3px', right: '-3px', width: 'calc(100% + 6px)', height: '16px', transform: 'translateY(-50%)', pointerEvents: 'none' }} viewBox="0 0 100 20" preserveAspectRatio="none">
                      <line x1="0" y1="18" x2="100" y2="2" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span style={{ background: '#d97706', color: '#fff', fontSize: '0.72rem', fontWeight: 900, padding: '2px 7px', borderRadius: '6px', letterSpacing: '0.04em' }}>
                    50% OFF
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#d97706' }}>Now only</span>
                  <span style={{ fontSize: '2.1rem', fontWeight: 900, color: '#d97706', lineHeight: 1 }}>$1.99</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', fontWeight: 600 }}>/one-time</span>
                </div>
                <div style={{ fontSize: '0.76rem', color: '#16a34a', fontWeight: 700, marginTop: '3px' }}>
                  Just ~$0.06 / summary • Never expires
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'grid', gap: '6px', fontSize: '0.82rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--green)', fontWeight: 900 }}>✓</span>
                  <span><strong>30 summaries</strong> (counts down)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--green)', fontWeight: 900 }}>✓</span>
                  <span><strong>HD PDF &amp; PNG</strong> (No watermark)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--green)', fontWeight: 900 }}>✓</span>
                  <span><strong>Zero recurring charges</strong></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--green)', fontWeight: 900 }}>✓</span>
                  <span>Instant activation</span>
                </li>
              </ul>
            </div>
            <button
              className="btn btn-wide"
              style={{
                background: gateway === 'dodo' ? '#16a34a' : '#f59e0b',
                borderColor: gateway === 'dodo' ? '#15803d' : '#d97706',
                color: gateway === 'dodo' ? '#fff' : '#1e293b',
                fontWeight: 800,
                fontSize: '0.9rem',
                padding: '11px 12px',
                width: '100%',
                cursor: 'pointer',
              }}
              disabled={busyPlan === 'starter'}
              onClick={() => handleCheckout('starter')}
            >
              {busyPlan === 'starter'
                ? 'Opening checkout…'
                : gateway === 'dodo'
                ? '⚡ Pay $1.99 via UPI'
                : '⚡ Get 30 Summaries ($1.99)'}
            </button>
          </div>

          {/* Card 2: $4.99/mo Pro (Was $9) */}
          <div
            style={{
              background: 'var(--board)',
              border: '2.5px solid var(--blue)',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '4px 4px 0 var(--blue)',
              position: 'relative',
            }}
          >
            <div>
              <div style={{ display: 'inline-block', background: 'var(--blue)', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', textTransform: 'uppercase', marginBottom: '6px' }}>
                ⭐ MOST POPULAR • 45% OFF
              </div>
              <h3 style={{ margin: '0 0 4px', fontSize: '1.2rem', color: 'var(--ink)', fontWeight: 800 }}>
                vidvisual Pro
              </h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', marginBottom: '8px' }}>
                For students, creators &amp; lifelong learners
              </div>

              {/* Price with Red Cut & Strikethrough Anchor */}
              <div style={{ margin: '4px 0 10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                  <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', fontSize: '1.1rem', fontWeight: 800, color: 'var(--ink-soft)' }}>
                    <span>$9</span>
                    <svg style={{ position: 'absolute', top: '50%', left: '-3px', right: '-3px', width: 'calc(100% + 6px)', height: '16px', transform: 'translateY(-50%)', pointerEvents: 'none' }} viewBox="0 0 100 20" preserveAspectRatio="none">
                      <line x1="0" y1="18" x2="100" y2="2" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span style={{ background: 'var(--blue)', color: '#fff', fontSize: '0.72rem', fontWeight: 900, padding: '2px 7px', borderRadius: '6px', letterSpacing: '0.04em' }}>
                    SAVE 45%
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--blue)' }}>Now only</span>
                  <span style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--blue)', lineHeight: 1 }}>$4.99</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', fontWeight: 600 }}>/month</span>
                </div>
                <div style={{ fontSize: '0.76rem', color: '#16a34a', fontWeight: 700, marginTop: '3px' }}>
                  Less than $1.25/week • 50 summaries/wk
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'grid', gap: '6px', fontSize: '0.82rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--green)', fontWeight: 900 }}>✓</span>
                  <span><strong>50 summaries / week</strong></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--green)', fontWeight: 900 }}>✓</span>
                  <span><strong>Ultra-HD Vector PDF &amp; PNG</strong></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--green)', fontWeight: 900 }}>✓</span>
                  <span><strong>Priority High-Speed AI Engine</strong></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--green)', fontWeight: 900 }}>✓</span>
                  <span>Cancel anytime in 1 click</span>
                </li>
              </ul>
            </div>
            <button
              className="btn btn-primary btn-wide"
              style={{
                fontWeight: 800,
                fontSize: '0.9rem',
                padding: '11px 12px',
                width: '100%',
                cursor: 'pointer',
                background: gateway === 'dodo' ? '#16a34a' : undefined,
                borderColor: gateway === 'dodo' ? '#15803d' : undefined,
              }}
              disabled={busyPlan === 'pro'}
              onClick={() => handleCheckout('pro')}
            >
              {busyPlan === 'pro'
                ? 'Opening checkout…'
                : gateway === 'dodo'
                ? 'Upgrade via UPI ($4.99/mo) →'
                : 'Upgrade to Pro ($4.99/mo) →'}
            </button>
          </div>

          {/* Card 3: $12.99/mo Unlimited (Was $19) */}
          <div
            style={{
              background: 'var(--board)',
              border: '2.5px solid var(--green)',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '3px 3px 0 var(--green)',
              position: 'relative',
            }}
          >
            <div>
              <div style={{ display: 'inline-block', background: 'var(--green)', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', textTransform: 'uppercase', marginBottom: '6px' }}>
                👑 BEST VALUE • SAVE $6
              </div>
              <h3 style={{ margin: '0 0 4px', fontSize: '1.2rem', color: 'var(--ink)', fontWeight: 800 }}>
                Unlimited
              </h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', marginBottom: '8px' }}>
                For researchers, power learners &amp; teams
              </div>

              {/* Price with Red Cut & Strikethrough Anchor */}
              <div style={{ margin: '4px 0 10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                  <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', fontSize: '1.1rem', fontWeight: 800, color: 'var(--ink-soft)' }}>
                    <span>$19</span>
                    <svg style={{ position: 'absolute', top: '50%', left: '-3px', right: '-3px', width: 'calc(100% + 6px)', height: '16px', transform: 'translateY(-50%)', pointerEvents: 'none' }} viewBox="0 0 100 20" preserveAspectRatio="none">
                      <line x1="0" y1="18" x2="100" y2="2" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span style={{ background: 'var(--green)', color: '#fff', fontSize: '0.72rem', fontWeight: 900, padding: '2px 7px', borderRadius: '6px', letterSpacing: '0.04em' }}>
                    SAVE 32%
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--green)' }}>Now only</span>
                  <span style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--green)', lineHeight: 1 }}>$12.99</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', fontWeight: 600 }}>/month</span>
                </div>
                <div style={{ fontSize: '0.76rem', color: '#16a34a', fontWeight: 700, marginTop: '3px' }}>
                  200 summaries/week • Custom themes
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'grid', gap: '6px', fontSize: '0.82rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--green)', fontWeight: 900 }}>✓</span>
                  <span><strong>200 summaries / week</strong></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--green)', fontWeight: 900 }}>✓</span>
                  <span><strong>Everything in Pro included</strong></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--green)', fontWeight: 900 }}>✓</span>
                  <span><strong>Custom Visual Color Themes</strong></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--green)', fontWeight: 900 }}>✓</span>
                  <span>VIP Priority processing</span>
                </li>
              </ul>
            </div>
            <button
              className="btn btn-wide"
              style={{
                fontWeight: 800,
                fontSize: '0.9rem',
                padding: '11px 12px',
                width: '100%',
                cursor: 'pointer',
                background: 'var(--green)',
                borderColor: '#15803d',
                color: '#fff',
              }}
              disabled={busyPlan === 'unlimited'}
              onClick={() => handleCheckout('unlimited')}
            >
              {busyPlan === 'unlimited'
                ? 'Opening checkout…'
                : gateway === 'dodo'
                ? 'Get Unlimited via UPI ($12.99) →'
                : 'Go Unlimited ($12.99/mo) →'}
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '16px', fontSize: '0.8rem', color: 'var(--ink-soft)' }}>
          ⚡ {gateway === 'dodo' ? 'Instant UPI & QR Payment via Dodo Payments' : 'Secure payment via Polar (Cards, Apple Pay)'} • Instant access • Questions or help? Email <a href="mailto:vidvisual.xyz@gmail.com" style={{ textDecoration: 'underline', fontWeight: 600 }}>vidvisual.xyz@gmail.com</a>
        </div>

        {/* Monday Recall Email Box */}
        {!isExportReason && (
          <div style={{ borderTop: '2px dashed var(--border)', paddingTop: '16px' }}>
            {emailSent ? (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '2px solid var(--green)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  textAlign: 'center',
                  color: 'var(--ink)',
                }}
              >
                <div style={{ fontSize: '1rem', marginBottom: '4px' }}>✅ <strong>You&apos;re all set!</strong></div>
                <div style={{ fontSize: '0.84rem', color: 'var(--ink-soft)' }}>
                  We&apos;ll notify <strong>{email}</strong> the second your free allowance resets on Monday.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendRecallEmail} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
                  Prefer to wait for Monday&apos;s free recharge?
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', marginBottom: '10px' }}>
                  Drop your email and we&apos;ll ping you the second your 3 free summaries reset:
                </div>
                <div style={{ display: 'flex', gap: '8px', maxWidth: '380px', margin: '0 auto' }}>
                  <input
                    type="email"
                    required
                    placeholder="student@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '2px solid var(--ink)',
                      fontSize: '0.85rem',
                      background: 'var(--board)',
                      color: 'var(--ink)',
                    }}
                  />
                  <button
                    type="submit"
                    className="btn"
                    disabled={sendingEmail}
                    style={{
                      padding: '8px 14px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {sendingEmail ? 'Saving…' : 'Remind me'}
                  </button>
                </div>
                {emailError && (
                  <p style={{ color: '#dc2626', fontSize: '0.78rem', margin: '6px 0 0', fontWeight: 600 }}>
                    {emailError}
                  </p>
                )}
              </form>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

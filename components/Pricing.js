'use client';
import { useState } from 'react';
import Link from 'next/link';
import { PLANS, PLAN_ORDER } from '@/lib/plans';

export default function Pricing({ current, onSelect, busy, href = '/register' }) {
  const [gateway, setGateway] = useState('polar'); // 'polar' | 'dodo'

  return (
    <>
      {/* High-Converting Limited-Time Offer Urgency Banner */}
      <div style={{ textAlign: 'center', marginBottom: '18px' }}>
        <div className="pricing-urgency-banner">
          <span className="pricing-urgency-flame">🔥</span>
          <span>
            <strong>LIMITED-TIME DISCOUNT:</strong> Slashed up to 50% for early learners! Lock in grandfathered pricing before it ends.
          </span>
        </div>
      </div>

      {/* 🇮🇳 International Cards vs. UPI / Indian Payment Switch */}
      <div
        className="payment-gateway-switcher"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto 24px',
          maxWidth: '520px',
        }}
      >
        <div
          style={{
            background: 'var(--paper)',
            border: '2px solid var(--ink)',
            borderRadius: '999px',
            padding: '4px',
            display: 'inline-flex',
            gap: '4px',
            boxShadow: '3px 3px 0 var(--ink)',
            width: '100%',
          }}
        >
          <button
            type="button"
            onClick={() => setGateway('polar')}
            style={{
              flex: 1,
              padding: '9px 16px',
              borderRadius: '999px',
              border: 'none',
              background: gateway === 'polar' ? 'var(--blue)' : 'transparent',
              color: gateway === 'polar' ? '#fff' : 'var(--ink)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <span>💳 Card / Global</span>
            <span style={{ fontSize: '0.74rem', opacity: 0.9 }}>(Polar)</span>
          </button>

          <button
            type="button"
            onClick={() => setGateway('dodo')}
            style={{
              flex: 1,
              padding: '9px 16px',
              borderRadius: '999px',
              border: 'none',
              background: gateway === 'dodo' ? '#16a34a' : 'transparent',
              color: gateway === 'dodo' ? '#fff' : 'var(--ink)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <span>🇮🇳 Pay with UPI</span>
            <span style={{ fontSize: '0.74rem', opacity: 0.9 }}>(Dodo)</span>
          </button>
        </div>
      </div>

      <div className="plans">
        {PLAN_ORDER.map((id) => {
          const p = PLANS[id];
          const isCurrent = current === id;
          const label = isCurrent
            ? 'Your current plan'
            : id === 'free'
            ? 'Get started free'
            : id === 'starter'
            ? (gateway === 'dodo' ? '⚡ Pay $1.99 via UPI' : '⚡ Get 30 Summaries ($1.99) →')
            : id === 'pro'
            ? (gateway === 'dodo' ? 'Upgrade via UPI ($4.99/mo) →' : 'Upgrade to Pro ($4.99/mo) →')
            : (gateway === 'dodo' ? 'Get Unlimited via UPI ($12.99/mo) →' : 'Go Unlimited ($12.99/mo) →');

          const priceSpan = id === 'free'
            ? '/forever'
            : p.isOneTime
            ? '/one-time'
            : '/month';

          return (
            <div
              key={id}
              className={`plan${p.popular ? ' plan-hot' : ''}${id === 'unlimited' ? ' plan-value' : ''}${id === 'starter' ? ' plan-starter' : ''}`}
              style={id === 'starter' ? { borderColor: '#f59e0b' } : undefined}
            >
              {p.popular ? <span className="plan-tag">Most popular</span> : null}
              {id === 'unlimited' ? <span className="plan-tag plan-tag-value">Best value</span> : null}
              {p.badge && !p.popular && id !== 'unlimited' ? (
                <span className="plan-tag" style={{ background: '#f59e0b', color: '#1e293b' }}>
                  {p.badge}
                </span>
              ) : null}

              <h3>{p.name}</h3>

              {/* Psychological Price Presentation */}
              <div className="plan-price-block">
                {p.originalPrice ? (
                  <div className="plan-anchor-row">
                    <span className="plan-original-price" aria-label={`Originally $${p.originalPrice}`}>
                      <span className="plan-strike-text">${p.originalPrice % 1 === 0 ? p.originalPrice : p.originalPrice.toFixed(2)}</span>
                      <svg className="plan-red-cut" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
                        <line x1="0" y1="18" x2="100" y2="2" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
                      </svg>
                    </span>
                    {p.savePercent ? (
                      <span className={`plan-save-chip ${id === 'starter' ? 'chip-amber' : id === 'pro' ? 'chip-blue' : 'chip-green'}`}>
                        {p.savePercent}% OFF
                      </span>
                    ) : null}
                  </div>
                ) : null}

                <div className="plan-current-row">
                  {p.originalPrice ? (
                    <span className="plan-now-prefix" style={id === 'starter' ? { color: '#d97706' } : id === 'pro' ? { color: 'var(--blue)' } : { color: 'var(--green)' }}>
                      Now only
                    </span>
                  ) : null}
                  <strong className="plan-current-amount" style={id === 'starter' ? { color: '#d97706' } : id === 'pro' ? { color: 'var(--blue)' } : id === 'unlimited' ? { color: 'var(--green)' } : undefined}>
                    ${p.price}
                  </strong>
                  <span className="plan-period">{priceSpan}</span>
                </div>

                {p.unitPrice ? (
                  <div className="plan-unit-sub" style={id === 'free' ? { color: 'var(--ink-soft)' } : undefined}>
                    {p.unitPrice}
                  </div>
                ) : null}
              </div>

              <ul>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              {onSelect ? (
                <button
                  className={p.popular ? 'btn btn-primary btn-wide' : id === 'starter' ? 'btn btn-primary btn-wide' : 'btn btn-wide'}
                  style={
                    gateway === 'dodo' && id !== 'free'
                      ? { background: '#16a34a', borderColor: '#15803d', color: '#fff' }
                      : id === 'starter'
                      ? { background: '#f59e0b', borderColor: '#d97706', color: '#1e293b' }
                      : id === 'unlimited'
                      ? { background: 'var(--green)', borderColor: '#15803d', color: '#fff' }
                      : undefined
                  }
                  disabled={isCurrent || busy || id === 'free'}
                  onClick={() => onSelect(id, gateway)}
                >
                  {busy === id ? 'Opening checkout…' : label}
                </button>
              ) : (
                <Link
                  className={p.popular ? 'btn btn-primary btn-wide' : id === 'starter' ? 'btn btn-primary btn-wide' : 'btn btn-wide'}
                  style={
                    gateway === 'dodo' && id !== 'free'
                      ? { background: '#16a34a', borderColor: '#15803d', color: '#fff' }
                      : id === 'starter'
                      ? { background: '#f59e0b', borderColor: '#d97706', color: '#1e293b' }
                      : id === 'unlimited'
                      ? { background: 'var(--green)', borderColor: '#15803d', color: '#fff' }
                      : undefined
                  }
                  href={`${href}${href.includes('?') ? '&' : '?'}plan=${id}&gateway=${gateway}`}
                >
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
        <span>🛡️ <strong>100% Risk-Free Guarantee</strong></span>
        <span>⚡ <strong>Instant Delivery &amp; PDF Access</strong></span>
        <span>🔄 <strong>1-Click Cancel Anytime</strong></span>
        <span>💳 <strong>Encrypted Checkout (Cards &amp; UPI)</strong></span>
      </div>

      <p className="pricing-help muted small" style={{ textAlign: 'center', marginTop: '16px' }}>
        ⚡ {gateway === 'dodo' ? 'Instant UPI & Indian payment via Dodo Payments' : 'Secure global payment via Polar (Cards, Apple Pay)'} • Instant delivery • Questions or feedback? Email us at{' '}
        <a href="mailto:vidvisual.xyz@gmail.com" style={{ textDecoration: 'underline', fontWeight: 600 }}>
          vidvisual.xyz@gmail.com
        </a>
      </p>
    </>
  );
}

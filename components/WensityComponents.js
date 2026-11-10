'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * 1. TextHighlight — Wensity text-highlight component
 * Sweeps an organic marker highlighter band behind key text.
 */
export function TextHighlight({
  children,
  color = 'var(--blue)',
  opacity = 0.22,
  delay = 0.2,
  className = '',
}) {
  return (
    <span
      className={`wensity-highlight ${className}`}
      style={{
        '--hl-color': color,
        '--hl-opacity': opacity,
        '--hl-delay': `${delay}s`,
      }}
    >
      <span className="wensity-highlight-content">{children}</span>
      <span className="wensity-highlight-band" aria-hidden="true" />
    </span>
  );
}

/**
 * 2. OrbitGlowButton — Wensity cool-button component
 * Dual-layer orbital neon glow that soft-spins around the edge of a button.
 */
export function OrbitGlowButton({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
  size = 'lg',
  disabled = false,
}) {
  const content = (
    <span className="wensity-orbit-inner">
      <span className="wensity-orbit-glow" aria-hidden="true" />
      <span className="wensity-orbit-content">{children}</span>
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`wensity-orbit-btn wensity-orbit-${variant} wensity-orbit-${size} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`wensity-orbit-btn wensity-orbit-${variant} wensity-orbit-${size} ${className}`}
    >
      {content}
    </button>
  );
}

/**
 * 3. MorphingBlob — Wensity blob-animation component
 * Pure CSS GPU-accelerated morphing organic gradient blob.
 */
export function MorphingBlob({
  size = 340,
  colors = ['#2b59e0', '#7a5af8', '#23996b'],
  opacity = 0.16,
  className = '',
  blur = 60,
}) {
  return (
    <div
      className={`wensity-morphing-blob-wrap ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        filter: `blur(${blur}px)`,
        opacity,
      }}
      aria-hidden="true"
    >
      <div
        className="wensity-morphing-blob"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${colors[0]} 0%, ${colors[1]} 55%, ${colors[2] || 'transparent'} 100%)`,
        }}
      />
    </div>
  );
}

/**
 * 4. WensityKbd — Wensity kbd shortcut primitive
 */
export function WensityKbd({ children, className = '' }) {
  return (
    <kbd className={`wensity-kbd ${className}`}>
      {children}
    </kbd>
  );
}

/**
 * 5. WensityLiveStatus — Wensity status indicator & engine latency tag
 */
export function WensityLiveStatus({ latency = '20s', model = 'Gemini 2.5 Flash' }) {
  return (
    <div className="wensity-status-pill" role="status" aria-label="System status">
      <span className="wensity-status-dot" />
      <span className="wensity-status-text">
        <strong style={{ color: 'var(--green)' }}>Live AI Engine</strong> · {model} · {latency} distillation speed
      </span>
    </div>
  );
}

/**
 * 6. WensityAudioWaveform — Visual audio waveform showing 4-hour podcast compression
 */
export function WensityAudioWaveform() {
  const bars = [28, 45, 75, 92, 60, 85, 40, 95, 80, 55, 70, 90, 65, 35, 85, 100, 75, 50, 80, 60];
  return (
    <div className="wensity-waveform" aria-hidden="true">
      {bars.map((height, i) => (
        <span
          key={i}
          className="wensity-waveform-bar"
          style={{
            height: `${height}%`,
            animationDelay: `${(i * 0.12).toFixed(2)}s`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * 7. WensityComparisonMatrix — Interactive comparison table (Wensity Data Table / Card pattern)
 * Directly contrasts VidVisual against NoteGPT, Eightify, and ChatGPT
 */
export function WensityComparisonMatrix() {
  const [activeRow, setActiveRow] = useState(null);

  const features = [
    {
      name: 'Visual Whiteboard Cards',
      desc: 'Spatial concept cards arranged in non-linear conceptual layouts',
      vidvisual: { check: true, text: 'Instant whiteboard cards' },
      notegpt: { check: false, text: 'Only text bullet points' },
      eightify: { check: false, text: 'Only text summaries' },
      chatgpt: { check: false, text: 'Walls of linear text' },
    },
    {
      name: 'Interactive Relational Mind Maps',
      desc: 'Interactive visual node graphs revealing how arguments connect',
      vidvisual: { check: true, text: 'Full interactive SVG map' },
      notegpt: { check: false, text: 'None' },
      eightify: { check: false, text: 'None' },
      chatgpt: { check: false, text: 'None (requires plugins)' },
    },
    {
      name: 'Watch Time Saved',
      desc: 'Percentage of video timeline you can skip while retaining knowledge',
      vidvisual: { check: true, text: '90% saved (20s avg)' },
      notegpt: { check: false, text: '50% (must read bullet walls)' },
      eightify: { check: false, text: '60% (limited highlights)' },
      chatgpt: { check: false, text: 'Variable (copy/paste required)' },
    },
    {
      name: 'Dual-Coding Memory Retention',
      desc: 'Scientifically proven cognitive retention with spatial cards',
      vidvisual: { check: true, text: '65% higher retention' },
      notegpt: { check: false, text: 'Standard text fatigue' },
      eightify: { check: false, text: 'Standard text fatigue' },
      chatgpt: { check: false, text: 'Standard text fatigue' },
    },
    {
      name: 'Long-Form Video & Podcast Engine',
      desc: 'Capable of parsing 2 to 4 hour deep dive lectures & podcasts',
      vidvisual: { check: true, text: 'Up to 4+ hours supported' },
      notegpt: { check: true, text: 'Supported' },
      eightify: { check: false, text: 'Truncates long videos' },
      chatgpt: { check: false, text: 'Token limits cut off video' },
    },
    {
      name: 'Free Weekly Allowance',
      desc: 'Completely free allowance recharged every Monday, zero card needed',
      vidvisual: { check: true, text: '3 summaries/week forever' },
      notegpt: { check: false, text: 'Strict paywall' },
      eightify: { check: false, text: '3 total trials only' },
      chatgpt: { check: false, text: 'Requires Plus ($20/mo)' },
    },
  ];

  return (
    <div className="wensity-matrix-wrap" aria-label="Feature Comparison Matrix">
      <div className="wensity-matrix-head">
        <span className="wensity-matrix-title">Feature / Capability</span>
        <span className="wensity-matrix-brand">
          <span className="wensity-brand-tag">✨ Recommended</span>
          vidvisual
        </span>
        <span className="wensity-matrix-col">NoteGPT</span>
        <span className="wensity-matrix-col">Eightify</span>
        <span className="wensity-matrix-col">ChatGPT</span>
      </div>

      <div className="wensity-matrix-body">
        {features.map((f, i) => (
          <div
            key={f.name}
            className={`wensity-matrix-row ${activeRow === i ? 'is-active' : ''}`}
            onMouseEnter={() => setActiveRow(i)}
            onMouseLeave={() => setActiveRow(null)}
          >
            <div className="wensity-matrix-cell wensity-cell-feature">
              <strong>{f.name}</strong>
              <small>{f.desc}</small>
            </div>

            <div className="wensity-matrix-cell wensity-cell-vidvisual">
              <span className="wensity-icon-check">✓</span>
              <span>{f.vidvisual.text}</span>
            </div>

            <div className="wensity-matrix-cell wensity-cell-other">
              {f.notegpt.check ? (
                <span className="wensity-icon-check-other">✓</span>
              ) : (
                <span className="wensity-icon-cross">✕</span>
              )}
              <span>{f.notegpt.text}</span>
            </div>

            <div className="wensity-matrix-cell wensity-cell-other">
              {f.eightify.check ? (
                <span className="wensity-icon-check-other">✓</span>
              ) : (
                <span className="wensity-icon-cross">✕</span>
              )}
              <span>{f.eightify.text}</span>
            </div>

            <div className="wensity-matrix-cell wensity-cell-other">
              {f.chatgpt.check ? (
                <span className="wensity-icon-check-other">✓</span>
              ) : (
                <span className="wensity-icon-cross">✕</span>
              )}
              <span>{f.chatgpt.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 8. WensityInteractiveStudyTabs — Interactive preview switcher for Visual Formats
 */
export function WensityInteractiveStudyTabs({ activeFormat, onSelectFormat }) {
  const formats = [
    { id: 'whiteboard', label: '✏️ Spatial Whiteboard Cards', badge: 'Most Popular' },
    { id: 'mindmap', label: '🌐 Interconnected Mind Map', badge: 'Spatial Graph' },
    { id: 'infographic', label: '📊 Executive Infographic', badge: 'High Yield' },
  ];

  return (
    <div className="wensity-study-tabs" role="tablist" aria-label="Visual format switcher">
      {formats.map((fmt) => {
        const isSelected = activeFormat === fmt.id;
        return (
          <button
            key={fmt.id}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={`wensity-study-tab ${isSelected ? 'is-selected' : ''}`}
            onClick={() => onSelectFormat && onSelectFormat(fmt.id)}
          >
            <span className="wensity-tab-label">{fmt.label}</span>
            {fmt.badge && <span className="wensity-tab-badge">{fmt.badge}</span>}
          </button>
        );
      })}
    </div>
  );
}

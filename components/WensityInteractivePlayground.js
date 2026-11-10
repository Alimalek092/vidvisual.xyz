'use client';
import React, { useState } from 'react';
import Visual, { THEMES } from '@/components/Visual';
import { SAMPLE } from '@/lib/sample';

export default function WensityInteractivePlayground() {
  const [format, setFormat] = useState('whiteboard');
  const [theme, setTheme] = useState('marker');

  const formats = [
    { id: 'whiteboard', label: '✏️ Whiteboard Cards', tag: 'Dual-Coding', desc: 'Spatial cards arranged by semantic hierarchy' },
    { id: 'infographic', label: '📊 Infographic Sheet', tag: 'High-Yield', desc: 'One-page visual summary with core quotes' },
  ];

  const themes = [
    { id: 'marker', name: 'Marker', color: '#2b59e0', bg: '#fbfcfb' },
    { id: 'ocean', name: 'Ocean', color: '#0e7490', bg: '#f1f8fb' },
    { id: 'forest', name: 'Forest', color: '#2f7d4f', bg: '#f5f8f1' },
    { id: 'sunset', name: 'Sunset', color: '#e4572e', bg: '#fff6ef' },
  ];

  return (
    <div className="wensity-playground-wrap" aria-label="Interactive Visual Format Playground">
      {/* Playground Header & Controls */}
      <div className="wensity-playground-toolbar">
        <div className="wensity-playground-formats" role="tablist" aria-label="Select visual format">
          {formats.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={format === f.id}
              className={`wensity-format-btn ${format === f.id ? 'is-active' : ''}`}
              onClick={() => setFormat(f.id)}
            >
              <span className="wensity-format-btn-label">{f.label}</span>
              <span className="wensity-format-btn-tag">{f.tag}</span>
            </button>
          ))}
        </div>

        {/* Theme Palette Switcher */}
        <div className="wensity-theme-switcher" aria-label="Select visual color theme">
          <span className="wensity-theme-switcher-label">Palette:</span>
          {themes.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`wensity-theme-btn ${theme === t.id ? 'is-active' : ''}`}
              onClick={() => setTheme(t.id)}
              title={`${t.name} Palette`}
              style={{ '--theme-dot-color': t.color }}
            >
              <span className="wensity-theme-dot" />
              <span className="wensity-theme-name">{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Format Description Pill */}
      <div className="wensity-playground-meta">
        <span className="wensity-meta-pill">
          💡 <strong>Tip:</strong> {formats.find((f) => f.id === format)?.desc}
        </span>
      </div>

      {/* Visual Canvas Stage */}
      <div className="wensity-playground-stage">
        <Visual data={SAMPLE} format={format} theme={theme} />
      </div>

      {/* Playground Footer Info */}
      <div className="wensity-playground-foot">
        <div className="wensity-foot-badge">
          <span>⚡ <strong>Dual-Coding Engine:</strong> Every video generates all formats automatically in ~20s</span>
        </div>
      </div>
    </div>
  );
}

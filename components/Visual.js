'use client';
import { forwardRef, useEffect, useState } from 'react';

export const THEMES = {
  marker: { name: 'Marker', bg: '#FBFCFB', ink: '#16233B', colors: ['#2B59E0', '#E2483D', '#23996B', '#E59A00', '#7A5AF8'], dark: { bg: '#0f172a', ink: '#e5eefb', colors: ['#7aa2ff', '#ff7b72', '#59d39b', '#fbbf24', '#b794ff'] } },
  ocean: { name: 'Ocean', bg: '#F1F8FB', ink: '#0B2B3A', colors: ['#0E7490', '#2563EB', '#0891B2', '#4F46E5', '#0284C7'], dark: { bg: '#0b1f2a', ink: '#dff6ff', colors: ['#7dd3fc', '#60a5fa', '#38bdf8', '#a78bfa', '#67e8f9'] } },
  forest: { name: 'Forest', bg: '#F5F8F1', ink: '#22301F', colors: ['#2F7D4F', '#8A6D3B', '#C0562F', '#4C7A3A', '#6B5B3E'], dark: { bg: '#17271f', ink: '#eaf6ea', colors: ['#6dd39f', '#d4a373', '#ff9d7a', '#7bbf76', '#c7af72'] } },
  sunset: { name: 'Sunset', bg: '#FFF6EF', ink: '#3A1D14', colors: ['#E4572E', '#E59A00', '#D64E8A', '#7A5AF8', '#F26B38'], dark: { bg: '#2a1a16', ink: '#fbe9d8', colors: ['#ff906c', '#fbbf24', '#ff8bbb', '#c4b5fd', '#ffb27a'] } },
};

const clip = (s, n) => {
  s = String(s || '');
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
};

function wrap(text, max) {
  const words = String(text || '').split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max) {
      if (line) lines.push(line);
      line = w;
    } else line = (line + ' ' + w).trim();
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function parseTimeToSeconds(timeStr) {
  if (!timeStr) return 0;
  const parts = String(timeStr).replace(/[^0-9:]/g, '').split(':').map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0] || 0;
}

function MindMap({ map, colors, ink, dark }) {
  const W = 900, H = 560, cx = W / 2, cy = H / 2;
  const branches = (map?.branches || []).slice(0, 6);
  const n = branches.length || 1;
  const surface = dark ? '#0f172a' : '#ffffff';
  const nodes = branches.map((b, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const kids = (b.children || []).slice(0, 3).map((k, j, arr) => {
      const ka = a + (j - (arr.length - 1) / 2) * 0.4;
      return { label: clip(k, 20), x: cx + Math.cos(ka) * 340, y: cy + Math.sin(ka) * 250 };
    });
    return { label: clip(b.label, 18), x: cx + Math.cos(a) * 185, y: cy + Math.sin(a) * 165, kids, color: colors[i % colors.length] };
  });

  // Balanced center node calculation - prevents awkward truncation
  const centerText = String(map?.center || 'Core Topic').trim();
  const centerLines = wrap(centerText, 14);
  const maxLen = Math.max(...centerLines.map((l) => l.length), 6);
  const rx = Math.max(92, Math.min(145, maxLen * 7.2 + 24));
  const ry = centerLines.length > 1 ? 52 : 46;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="vv-svg" role="img" aria-label="Mind map">
      {nodes.map((b, i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2={b.x} y2={b.y} stroke={b.color} strokeWidth="4" strokeLinecap="round" />
          {b.kids.map((k, j) => (
            <line key={j} x1={b.x} y1={b.y} x2={k.x} y2={k.y} stroke={b.color} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 7" />
          ))}
        </g>
      ))}
      {nodes.map((b, i) => (
        <g key={'n' + i}>
          {b.kids.map((k, j) => {
            const w = k.label.length * 7.4 + 20;
            return (
              <g key={j}>
                <rect x={k.x - w / 2} y={k.y - 14} width={w} height="28" rx="14" fill={surface} stroke={b.color} strokeWidth="2" />
                <text x={k.x} y={k.y + 5} textAnchor="middle" fontSize="14" fill={ink}>{k.label}</text>
              </g>
            );
          })}
          <rect x={b.x - (b.label.length * 4.6 + 16)} y={b.y - 19} width={b.label.length * 9.2 + 32} height="38" rx="19" fill={b.color} />
          <text x={b.x} y={b.y + 6} textAnchor="middle" fontSize="17" fontWeight="700" fill="#fff">{b.label}</text>
        </g>
      ))}

      {/* Dynamic Center Node without truncation */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={ink} />
      {centerLines.map((line, idx) => (
        <text
          key={idx}
          x={cx}
          y={cy + (idx - (centerLines.length - 1) / 2) * 24 + 8}
          textAnchor="middle"
          fontSize={centerLines.length > 1 ? '22' : '28'}
          fill={dark ? '#0f172a' : '#fff'}
          className="vv-hand"
        >
          {line}
        </text>
      ))}
    </svg>
  );
}

function Hub({ concepts, title, colors, ink, dark }) {
  const W = 900, H = 520, cx = W / 2, cy = H / 2;
  const items = (concepts || []).slice(0, 6);
  const n = items.length || 1;
  const lines = wrap(title, 16);
  const surface = dark ? '#0f172a' : '#ffffff';
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="vv-svg" role="img" aria-label="Knowledge map">
      {items.map((c, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
        const x = cx + Math.cos(a) * 320, y = cy + Math.sin(a) * 195;
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={colors[i % colors.length]} strokeWidth="4" strokeLinecap="round" />;
      })}
      {items.map((c, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
        const x = cx + Math.cos(a) * 320, y = cy + Math.sin(a) * 195;
        const col = colors[i % colors.length];
        const label = clip(c.title, 18);
        const w = label.length * 9 + 64;
        return (
          <g key={i}>
            <rect x={x - w / 2} y={y - 24} width={w} height="48" rx="24" fill={surface} stroke={col} strokeWidth="3" />
            <text x={x - w / 2 + 26} y={y + 8} fontSize="22" textAnchor="middle">{c.emoji}</text>
            <text x={x - w / 2 + 46} y={y + 6} fontSize="16" fontWeight="700" fill={ink}>{label}</text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="86" fill={ink} />
      {lines.map((l, i) => (
        <text key={i} x={cx} y={cy + (i - (lines.length - 1) / 2) * 26 + 8} textAnchor="middle" fontSize="24" fill={dark ? '#0f172a' : '#fff'} className="vv-hand">{l}</text>
      ))}
    </svg>
  );
}

const Visual = forwardRef(function Visual({ data, format = 'whiteboard', theme = 'marker', watermark = false, videoUrl }, ref) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const syncTheme = () => setDark(document.documentElement.dataset.theme === 'dark');
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const palette = THEMES[theme] || THEMES.marker;
  const t = dark ? (palette.dark || palette) : palette;
  const cols = t.colors;
  const panel = dark ? '#111827' : '#ffffff';
  const quote = dark ? 'rgba(229,238,251,.8)' : '#55627a';

  // Resolved original source video link for traceable notes
  const finalVideoUrl = videoUrl || data?.videoUrl || data?.url || null;

  return (
    <div ref={ref} className={`vv vv-${format}`} style={{ background: t.bg, color: t.ink }}>
      <header className="vv-head">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
          <h2 className="vv-hand vv-title" style={{ margin: 0, flex: '1 1 280px' }}>{data.title}</h2>
          {finalVideoUrl ? (
            <a
              href={finalVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="vv-source-link"
              title="Open original video on YouTube"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '999px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1.5px solid #ef4444',
                color: '#dc2626',
                fontSize: '0.82rem',
                fontWeight: 700,
                textDecoration: 'none',
                marginTop: '4px',
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{ fontSize: '0.85rem' }}>▶</span>
              <span>Watch on YouTube</span>
              <span style={{ fontSize: '0.75rem' }}>↗</span>
            </a>
          ) : null}
        </div>

        <div className="vv-meta" style={{ marginTop: '8px' }}>
          <span style={{ background: cols[2] }}>{data.level}</span>
          {data.minutes ? <span style={{ background: cols[0] }}>{data.minutes} min video</span> : null}
        </div>
        <p className="vv-quote" style={{ borderColor: cols[1], color: quote }}>{data.quote}</p>
      </header>

      {format === 'whiteboard' ? (
        <>
          <div className="vv-cards">
            {(data.concepts || []).slice(0, 6).map((c, i) => {
              const timestampsList = c.timestamps || (c.timestamp ? [c.timestamp] : []);
              return (
                <div key={i} className="vv-card" style={{ borderColor: cols[i % cols.length], background: panel }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div className="vv-emoji">{c.emoji}</div>
                    {timestampsList.length > 0 ? (
                      <div className="vv-card-timestamps" style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {timestampsList.map((ts, idx) => {
                          const sec = parseTimeToSeconds(ts);
                          const tsLink = finalVideoUrl ? `${finalVideoUrl.split('&t=')[0]}&t=${sec}s` : null;
                          return tsLink ? (
                            <a
                              key={idx}
                              href={tsLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="vv-timestamp-chip"
                              title={`Jump to ${ts} in YouTube video`}
                            >
                              ⏱️ {ts} ↗
                            </a>
                          ) : (
                            <span key={idx} className="vv-timestamp-chip">⏱️ {ts}</span>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                  <h3 style={{ color: cols[i % cols.length] }}>{c.title}</h3>
                  <p style={{ color: dark ? '#dfeafc' : undefined }}>{c.text}</p>
                </div>
              );
            })}
          </div>
          <MindMap map={data.mindmap} colors={cols} ink={t.ink} dark={dark} />
        </>
      ) : (
        <>
          <Hub concepts={data.concepts} title={data.mindmap?.center || data.title} colors={cols} ink={t.ink} dark={dark} />
          <ul className="vv-takeaways">
            {(data.takeaways || []).map((x, i) => {
              const match = String(x).match(/^\[([0-9:]+)\]\s*(.*)$/);
              if (match && finalVideoUrl) {
                const ts = match[1];
                const text = match[2];
                const sec = parseTimeToSeconds(ts);
                const tsLink = `${finalVideoUrl.split('&t=')[0]}&t=${sec}s`;
                return (
                  <li key={i} style={{ borderColor: cols[i % cols.length], background: panel, color: t.ink, display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <a
                      href={tsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="vv-timestamp-chip"
                      title={`Jump to ${ts} in YouTube video`}
                      style={{ flexShrink: 0, marginTop: '2px' }}
                    >
                      ⏱️ {ts} ↗
                    </a>
                    <span>{text}</span>
                  </li>
                );
              }
              return (
                <li key={i} style={{ borderColor: cols[i % cols.length], background: panel, color: t.ink }}>{x}</li>
              );
            })}
          </ul>
        </>
      )}

      <footer className="vv-foot">
        <span className="vv-hand brand-inline">
          <img src="/logo.png" alt="" className="brand-icon-sm" width="20" height="20" /> vidvisual
        </span>
        {finalVideoUrl ? (
          <span className="vv-foot-source muted" style={{ fontSize: '0.78rem', opacity: 0.85 }}>
            Source: {finalVideoUrl.replace(/^https?:\/\/(www\.)?/, '')}
          </span>
        ) : null}
        {watermark ? <span>Made with vidvisual · vidvisual.xyz</span> : null}
      </footer>
    </div>
  );
});

export default Visual;

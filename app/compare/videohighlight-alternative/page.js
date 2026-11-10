import Link from 'next/link';
import Visual from '@/components/Visual';
import HomeHeroGenerator from '@/components/HomeHeroGenerator';
import { SAMPLE } from '@/lib/sample';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'Best Video Highlight Alternative for Visual Notes & Mind Maps (2026)',
  description:
    'Looking for the best Video Highlight alternative? vidvisual turns YouTube videos, lectures, and podcasts into whiteboard concept cards and visual mind maps in 20 seconds. 100% free with no login required.',
  alternates: {
    canonical: `${SITE_URL}/compare/videohighlight-alternative`,
  },
  openGraph: {
    title: 'Best Video Highlight Alternative for Visual Notes & Mind Maps (2026)',
    description:
      'Why settle for linear timestamps? vidvisual turns long YouTube videos into whiteboard concept cards and visual mind maps in under 20 seconds.',
    url: `${SITE_URL}/compare/videohighlight-alternative`,
    siteName: 'vidvisual',
    type: 'article',
    images: [`${SITE_URL}/og-image.jpg?v=3`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Video Highlight Alternative · vidvisual',
    description:
      'Convert YouTube lectures and podcasts into spatial whiteboard concept cards and mind maps in 20s.',
    images: [`${SITE_URL}/og-image.jpg?v=3`],
  },
};

const FAQ_VIDEOHIGHLIGHT = [
  [
    'Why is vidvisual the best Video Highlight alternative?',
    'While Video Highlight focuses heavily on timestamped transcript scrubbing, reading thousands of words of transcript text still consumes 15 to 25 minutes of your time. vidvisual converts video content into spatial whiteboard concept cards and an interconnected vector mind map in 20 seconds, boosting memory retention by 65% and saving 90% of your time.',
  ],
  [
    'Is vidvisual free to use compared to Video Highlight?',
    'Yes! vidvisual gives every visitor 3 free visual summaries every week with no credit card or account registration required. Paid plans start at just $1.99 one-time (was $4) or $4.99/month (was $9) for power users.',
  ],
  [
    'Can I export notes to Notion, Obsidian, and GoodNotes?',
    'Yes. vidvisual lets you export crisp HD PNGs and vector PDF documents ready to drop directly into Notion, Obsidian, GoodNotes, Notability, and Apple Notes.',
  ],
  [
    'Does vidvisual support long podcasts and STEM lectures?',
    'Yes! vidvisual is engineered to compress 2-to-4-hour university lectures (MIT, Stanford) and podcasts (Huberman Lab, Lex Fridman) into structured visual study sheets.',
  ],
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_VIDEOHIGHLIGHT.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Compare', item: `${SITE_URL}/compare` },
    { '@type': 'ListItem', position: 3, name: 'Video Highlight Alternative', item: `${SITE_URL}/compare/videohighlight-alternative` },
  ],
};

const comparisonTable = [
  { feature: 'Core Output Format', vidvisual: 'Whiteboard Concept Cards & Mind Maps', videohighlight: 'Text Transcripts & Timestamps' },
  { feature: 'Turnaround Speed', vidvisual: 'Sub-20 seconds', videohighlight: '30 to 60 seconds' },
  { feature: 'Review Time per Hour Video', vidvisual: '< 60 seconds', videohighlight: '10 to 15 minutes of reading' },
  { feature: 'Memory Retention', vidvisual: '65% higher (Dual-Coding Theory)', videohighlight: 'Standard text retention' },
  { feature: 'No-Login Free Summaries', vidvisual: '3 free summaries/week (zero friction)', videohighlight: 'Sign-in required' },
  { feature: 'Vector PDF & HD PNG Exports', vidvisual: 'Full vector PDF & HD PNG export', videohighlight: 'Markdown & text exports' },
  { feature: 'Multi-Language Support', vidvisual: '16+ global languages', videohighlight: 'Limited translation' },
];

export default function VideoHighlightAlternativePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav className="nav">
        <Link href="/" className="brand vv-hand">
          <img src="/logo.png" alt="vidvisual" className="brand-icon" width="32" height="32" />
          <span>vidvisual</span>
        </Link>
        <div className="nav-links">
          <Link href="/youtube-video-summarizer">Summarizer</Link>
          <Link href="/video-visual-summarizer">Visual Summarizer</Link>
          <Link href="/youtube-to-mind-map">Mind Maps</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/login">Log in</Link>
          <Link href="/register" className="btn btn-primary btn-sm">Try it Free</Link>
        </div>
      </nav>

      <div className="breadcrumb-nav">
        <Link href="/">Home</Link>
        <span>&rsaquo;</span>
        <Link href="/compare">Compare</Link>
        <span>&rsaquo;</span>
        <span>Video Highlight Alternative</span>
      </div>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(43, 89, 224, 0.1)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--blue)' }}>
            <span>⚡ The #1 Video Highlight Alternative</span>
            <span>·</span>
            <span>Visual Concept Cards</span>
          </div>
          <h1 className="vv-hand">The Best Video Highlight Alternative for Visual Learners</h1>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.45', color: 'var(--ink-soft)', margin: '0 0 18px', maxWidth: '520px' }}>Avoid transcript reading fatigue. Get scannable visual concept cards and vector mind maps instead.</p>
          <HomeHeroGenerator />
          <div style={{ marginTop: '12px' }}>
            <a href="#matrix" className="link small">See feature comparison &darr;</a>
          </div>
        </div>
        <div className="hero-demo">
          <Visual data={SAMPLE} format="whiteboard" />
        </div>
      </header>

      {/* Stats Strip */}
      <section className="stats-strip" aria-label="Performance Benchmarks">
        <div className="stat-pill">
          <span className="stat-pill-num">20 Sec</span>
          <span className="stat-pill-label">Average turnaround speed</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">65% Higher</span>
          <span className="stat-pill-label">Retention using spatial concept cards</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">16+ Langs</span>
          <span className="stat-pill-label">Instant foreign lecture translation</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">100% Free</span>
          <span className="stat-pill-label">3 summaries/week with zero card needed</span>
        </div>
      </section>

      {/* AEO: Direct Answer Block */}
      <section className="answer-box" aria-label="AI Answer Overview">
        <span className="answer-badge">AI Answer Overview</span>
        <h2>Why do students &amp; researchers choose vidvisual over Video Highlight?</h2>
        <p>
          While Video Highlight is built around transcript reading and timestamped quotes, users often experience reading fatigue when digesting 1-to-3-hour lectures.
          <strong> vidvisual</strong> translates video transcripts into spatial whiteboard concept cards and interactive node maps in 20 seconds.
          Visual diagrams allow learners to understand core arguments in under 60 seconds with 65% higher long-term retention.
        </p>
      </section>

      {/* Feature Comparison Matrix */}
      <section className="section" id="matrix" aria-label="Feature Comparison Matrix">
        <h2 className="vv-hand">vidvisual vs Video Highlight: Side-by-Side Comparison</h2>
        <p className="section-sub">See how spatial visual summaries compare to transcript-heavy note-taking.</p>
        <div className="table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>vidvisual</th>
                <th>Video Highlight</th>
              </tr>
            </thead>
            <tbody>
              {comparisonTable.map((row) => (
                <tr key={row.feature}>
                  <td><strong>{row.feature}</strong></td>
                  <td><span className="check">✓</span> {row.vidvisual}</td>
                  <td>{row.videohighlight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <h2 className="vv-hand">Frequently Asked Questions</h2>
        {FAQ_VIDEOHIGHLIGHT.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      {/* Footer */}
      <footer className="site-foot">
        <span className="vv-hand brand-inline">
          <img src="/logo.png" alt="" className="brand-icon-sm" width="22" height="22" /> vidvisual
        </span>
        <div className="foot-links">
          <Link href="/">Home</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/youtube-video-summarizer">Video Summarizer</Link>
          <Link href="/video-visual-summarizer">Visual Summarizer</Link>
          <Link href="/youtube-video-mind-map-generator">Mind Maps</Link>
          <Link href="/compare/notegpt-alternative">NoteGPT Alternative</Link>
          <Link href="/compare/eightify-alternative">Eightify Alternative</Link>
          <a href="mailto:vidvisual.xyz@gmail.com">Support</a>
        </div>
        <span className="muted small">&copy; {new Date().getFullYear()} vidvisual</span>
      </footer>
    </>
  );
}

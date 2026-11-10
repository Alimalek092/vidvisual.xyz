import Link from 'next/link';
import Visual from '@/components/Visual';
import HomeHeroGenerator from '@/components/HomeHeroGenerator';
import { SAMPLE } from '@/lib/sample';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'Best BibiGPT Alternative for Visual Video Summaries (2026) | vidvisual',
  description:
    'Looking for the best BibiGPT alternative? vidvisual turns long YouTube videos into whiteboard concept cards, mind maps, and PDF notes in under 20s. 100% free with no login required.',
  alternates: {
    canonical: `${SITE_URL}/compare/bibigpt-alternative`,
  },
  openGraph: {
    title: 'Best BibiGPT Alternative for Visual Video Summaries (2026)',
    description:
      'Transform YouTube videos into spatial whiteboard cards and interactive mind maps in 20s. The top visual alternative to BibiGPT.',
    url: `${SITE_URL}/compare/bibigpt-alternative`,
    siteName: 'vidvisual',
    type: 'article',
    images: [`${SITE_URL}/og-image.jpg?v=3`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best BibiGPT Alternative · vidvisual',
    description:
      'Convert YouTube lectures and podcasts into spatial whiteboard concept cards and mind maps in 20s.',
    images: [`${SITE_URL}/og-image.jpg?v=3`],
  },
};

const FAQ_BIBIGPT = [
  [
    'Why is vidvisual considered the best BibiGPT alternative?',
    'While BibiGPT offers multi-platform audio/video transcription, vidvisual specializes in cognitive visual learning. Instead of simple text dumps, vidvisual automatically structures video content into color-coded whiteboard concept cards and an interconnected vector mind map that boosts retention by 65% in under 20 seconds.',
  ],
  [
    'Is vidvisual free to use compared to BibiGPT?',
    'Yes! vidvisual gives every user 3 full visual summaries every week with zero credit card or registration required. Paid plans start at just $1.99 one-time (was $4) or $4.99/month (was $9) with HD PNG and vector PDF exports.',
  ],
  [
    'Can I translate international videos like BibiGPT does?',
    'Yes! vidvisual natively translates and summarizes videos across 16+ global languages including English, Spanish, Hindi, French, German, Japanese, Korean, and Chinese.',
  ],
  [
    'Can I export summaries to Notion or GoodNotes?',
    'Yes. You can export your visual notes as high-resolution PNG, vector PDF, or JPG documents formatted for Notion, Obsidian, GoodNotes, and printing.',
  ],
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_BIBIGPT.map(([q, a]) => ({
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
    { '@type': 'ListItem', position: 3, name: 'BibiGPT Alternative', item: `${SITE_URL}/compare/bibigpt-alternative` },
  ],
};

const comparisonTable = [
  { feature: 'Core Output Format', vidvisual: 'Whiteboard Concept Cards & Mind Maps', bibigpt: 'Text Summaries & Outlines' },
  { feature: 'Processing Turnaround', vidvisual: 'Sub-20 seconds', bibigpt: '30 to 60 seconds' },
  { feature: 'Visual Dual-Coding', vidvisual: 'Spatial cards + SVG node mind map', bibigpt: 'Linear text formatting' },
  { feature: 'Free Tier with No Login', vidvisual: '3 free summaries/week (Instant)', bibigpt: 'Sign-in / credits required' },
  { feature: 'High-Res Vector Exports', vidvisual: 'Vector PDF & HD PNG (300 DPI)', bibigpt: 'Markdown & text exports' },
  { feature: 'Supported Languages', vidvisual: '16+ global languages', bibigpt: 'Multi-language supported' },
];

export default function BibiGptAlternativePage() {
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
        <span>BibiGPT Alternative</span>
      </div>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(43, 89, 224, 0.1)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--blue)' }}>
            <span>⚡ The #1 BibiGPT Alternative</span>
            <span>·</span>
            <span>Visual Concept Cards</span>
          </div>
          <h1 className="vv-hand">The Best BibiGPT Alternative for Visual Learners</h1>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.45', color: 'var(--ink-soft)', margin: '0 0 18px', maxWidth: '520px' }}>Get clean vector mind maps and spatial whiteboard cards without complicated token setups.</p>
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
        <h2>Why do visual learners switch from BibiGPT to vidvisual?</h2>
        <p>
          While BibiGPT generates text transcripts and summaries, <strong>vidvisual</strong> is built on cognitive dual-coding science.
          It arranges core ideas into visual whiteboard concept cards and an interconnected vector node map.
          This visual architecture prevents reading fatigue and boosts information retention by up to 65% when learning from complex videos.
        </p>
      </section>

      {/* Feature Comparison Matrix */}
      <section className="section" id="matrix" aria-label="Feature Comparison Matrix">
        <h2 className="vv-hand">vidvisual vs BibiGPT: Side-by-Side Comparison</h2>
        <p className="section-sub">See how visual whiteboard notes compare to text transcription summaries.</p>
        <div className="table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>vidvisual</th>
                <th>BibiGPT</th>
              </tr>
            </thead>
            <tbody>
              {comparisonTable.map((row) => (
                <tr key={row.feature}>
                  <td><strong>{row.feature}</strong></td>
                  <td><span className="check">✓</span> {row.vidvisual}</td>
                  <td>{row.bibigpt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <h2 className="vv-hand">Frequently Asked Questions</h2>
        {FAQ_BIBIGPT.map(([q, a]) => (
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
          <Link href="/compare/videohighlight-alternative">Video Highlight Alternative</Link>
          <a href="mailto:vidvisual.xyz@gmail.com">Support</a>
        </div>
        <span className="muted small">&copy; {new Date().getFullYear()} vidvisual</span>
      </footer>
    </>
  );
}

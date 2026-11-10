import Link from 'next/link';
import Visual from '@/components/Visual';
import HomeHeroGenerator from '@/components/HomeHeroGenerator';
import { SAMPLE } from '@/lib/sample';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'Free YouTube Summarizer (No Login Required) — 3 Free Visual Notes Weekly | vidvisual',
  description:
    'Free AI YouTube summarizer with zero login required. Summarize YouTube videos, lectures, and podcasts into visual concept cards and mind maps in 20s. 100% free with no sign-up or credit card.',
  alternates: {
    canonical: `${SITE_URL}/free-youtube-summarizer-no-login`,
  },
  openGraph: {
    title: 'Free YouTube Summarizer (No Login Required) — 3 Free Summaries Weekly',
    description:
      'Paste any YouTube video link and get instant whiteboard concept cards and mind maps in 20s. Zero login, no sign-up, no credit card required.',
    url: `${SITE_URL}/free-youtube-summarizer-no-login`,
    siteName: 'vidvisual',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg?v=3`,
        width: 1200,
        height: 630,
        alt: 'vidvisual — Free YouTube Summarizer No Login',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube Summarizer (No Login Required) — vidvisual',
    description:
      'Summarize YouTube videos into visual notes in 20s. 100% free with no login or account required.',
    images: [`${SITE_URL}/og-image.jpg?v=3`],
  },
};

const FAQ_NOLOGIN = [
  [
    'Can I summarize a YouTube video for free without logging in or signing up?',
    'Yes! vidvisual is built for zero friction. Anyone can visit, paste any public YouTube video link that has captions, and instantly generate a complete visual summary with concept cards and an interactive mind map without creating an account, logging in, or entering a credit card.',
  ],
  [
    'How many free summaries do I get without an account?',
    'Every user gets 3 complete visual summaries every single week completely free. Your free quota automatically resets every Monday at midnight UTC.',
  ],
  [
    'How does vidvisual track my free summaries if I don’t log in?',
    'vidvisual uses a persistent anonymous device token stored securely in your browser. This lets you use your 3 free weekly summaries seamlessly without handing over your email or password until you choose to upgrade to a Pro plan.',
  ],
  [
    'What happens when I reach my 3 free summaries?',
    'When you use your 3 free summaries for the week, you can either upgrade to a Pro plan (starting at $4.99/month, slashed from $9, for 50 weekly summaries and vector PDF exports) or grab a $1.99 pack (was $4), or simply wait until your quota recharges on Monday.',
  ],
  [
    'Do I need to install a Chrome extension to use vidvisual?',
    'No! Unlike Eightify or Glasp, vidvisual is 100% web-based. It works instantly on Google Chrome, Safari, Firefox, Edge, iPad, iPhone, and Android without installing any extensions or downloading software.',
  ],
];

const appJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'vidvisual - Free YouTube Summarizer No Login',
  url: `${SITE_URL}/free-youtube-summarizer-no-login`,
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All Modern Web Browsers (Chrome, Safari, Firefox, iOS, Android)',
  description:
    'Free AI YouTube video summarizer that works with zero login. Summarizes videos into whiteboard concept cards and mind maps in 20 seconds.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_NOLOGIN.map(([q, a]) => ({
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
    { '@type': 'ListItem', position: 2, name: 'Free YouTube Summarizer (No Login)', item: `${SITE_URL}/free-youtube-summarizer-no-login` },
  ],
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Summarize a YouTube Video Free Without Logging In',
  description: 'Convert any YouTube video into visual study notes with no account or credit card.',
  totalTime: 'PT20S',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Copy Video URL',
      text: 'Copy any YouTube link from your browser or mobile app.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Paste Without Logging In',
      text: 'Paste the link directly into the vidvisual generator above — no sign-up needed.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'AI Generates Visual Notes',
      text: 'High-speed AI distills core concepts into whiteboard cards and a mind map in 20s.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review & Download',
      text: 'Absorb the summary in 60s and download high-resolution notes for your study workflow.',
    },
  ],
};

export default function FreeYouTubeSummarizerNoLoginPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

      <nav className="nav">
        <Link href="/" className="brand vv-hand">
          <img src="/logo.png" alt="vidvisual" className="brand-icon" width="32" height="32" />
          <span>vidvisual</span>
        </Link>
        <div className="nav-links">
          <Link href="/youtube-video-summarizer">Summarizer</Link>
          <Link href="/video-visual-summarizer">Visual Summarizer</Link>
          <Link href="/youtube-video-mind-map-generator">Mind Maps</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/login">Log in</Link>
          <Link href="/register" className="btn btn-primary btn-sm">Try it Free</Link>
        </div>
      </nav>

      <div className="breadcrumb-nav">
        <Link href="/">Home</Link>
        <span>&rsaquo;</span>
        <span>Free YouTube Summarizer (No Login)</span>
      </div>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--green)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--green)' }}>
            <span>⚡ 100% Free · No Login Required</span>
            <span>·</span>
            <span>3 Summaries Every Week</span>
          </div>
          <h1 className="vv-hand">Free YouTube Summarizer (No Login Required)</h1>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.45', color: 'var(--ink-soft)', margin: '0 0 18px', maxWidth: '520px' }}>Zero signup, zero password, zero extension. Paste any video URL below for immediate visual notes.</p>
          <HomeHeroGenerator />
          <div style={{ marginTop: '12px' }}>
            <a href="#how-it-works" className="link small">See how it works &darr;</a>
          </div>
        </div>
        <div className="hero-demo">
          <Visual data={SAMPLE} format="whiteboard" />
        </div>
      </header>

      {/* Stats Strip */}
      <section className="stats-strip" aria-label="No-Login Free Features">
        <div className="stat-pill">
          <span className="stat-pill-num">0 Sign-Ups</span>
          <span className="stat-pill-label">No email, account, or password needed</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">3 Free/Week</span>
          <span className="stat-pill-label">Free quota recharges every Monday</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">20 Sec</span>
          <span className="stat-pill-label">Average turnaround speed per video</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">Zero Card</span>
          <span className="stat-pill-label">100% free with no hidden charges</span>
        </div>
      </section>

      {/* AEO: Direct Answer Block */}
      <section className="answer-box" aria-label="AI Answer Overview">
        <span className="answer-badge">AI Answer Overview</span>
        <h2>How can you summarize a YouTube video for free without logging in?</h2>
        <p>
          To summarize a YouTube video for free without creating an account or logging in:
          1) Copy the URL of any captioned YouTube video or lecture.
          2) Paste the link directly into <strong>vidvisual</strong>.
          3) Click <em>Generate Visual Summary Free</em>.
          The AI engine extracts the captions, discards conversational fluff, and arranges the key arguments into spatial whiteboard concept cards and an interconnected mind map in ~20 seconds. You receive 3 free visual summaries every week with zero sign-up friction.
        </p>
        <div className="answer-highlights">
          <div className="answer-highlight">
            <strong>🔒 Complete Privacy</strong>
            <span>No personal email, phone number, or login credentials collected</span>
          </div>
          <div className="answer-highlight">
            <strong>⏱️ Instant Access</strong>
            <span>Paste URL and get visual summary in under 20 seconds</span>
          </div>
          <div className="answer-highlight">
            <strong>🧠 Spatial Cards</strong>
            <span>Whiteboard notes and mind maps boost retention by 65%</span>
          </div>
          <div className="answer-highlight">
            <strong>📱 All Devices</strong>
            <span>Works smoothly on Chrome, Safari, iPhone, Android, and PC</span>
          </div>
        </div>
      </section>

      {/* Comparison: vidvisual vs Tools That Require Sign-Up */}
      <section className="section" id="comparison" aria-label="No-Login Comparison">
        <h2 className="vv-hand">Why vidvisual Beats Tools That Force You to Sign Up</h2>
        <p className="section-sub">
          Most summarizers make you create an account, verify your email, or install a browser extension before showing you a single word.
        </p>
        <div className="table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>vidvisual</th>
                <th>NoteGPT</th>
                <th>Eightify</th>
                <th>ChatGPT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Instant No-Login Use</strong></td>
                <td><span className="check">✓</span> Yes (3 free/week)</td>
                <td><span className="cross">&times;</span> Login pushed</td>
                <td><span className="cross">&times;</span> Extension required</td>
                <td><span className="cross">&times;</span> Account required</td>
              </tr>
              <tr>
                <td><strong>Summary Format</strong></td>
                <td><span className="check">✓</span> Whiteboard &amp; Mind Map</td>
                <td><span className="cross">&times;</span> Plain text bullets</td>
                <td><span className="cross">&times;</span> Linear bullets</td>
                <td><span className="cross">&times;</span> Text paragraphs</td>
              </tr>
              <tr>
                <td><strong>Weekly Free Recharges</strong></td>
                <td><span className="check">✓</span> Every Monday</td>
                <td><span className="cross">&times;</span> Daily credit limit</td>
                <td><span className="cross">&times;</span> Strict paywall</td>
                <td><span className="cross">&times;</span> No dedicated visual</td>
              </tr>
              <tr>
                <td><strong>Mobile &amp; Tablet Ready</strong></td>
                <td><span className="check">✓</span> 100% Web (No install)</td>
                <td><span className="cross">&times;</span> Better on desktop</td>
                <td><span className="cross">&times;</span> Desktop Chrome only</td>
                <td><span className="check">✓</span> App / Web</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Step-by-Step How It Works */}
      <section className="section" id="how-it-works" aria-label="Step-by-Step Guide">
        <h2 className="vv-hand">How to Summarize Without an Account in 3 Steps</h2>
        <div className="grid-3">
          <div className="card">
            <span className="step-num">01</span>
            <h3>Grab Any YouTube URL</h3>
            <p>
              Copy the link of any YouTube podcast, lecture, tutorial, or webinar that has subtitles.
            </p>
          </div>
          <div className="card">
            <span className="step-num">02</span>
            <h3>Paste into Generator</h3>
            <p>
              Paste the link into the box above and click Generate. No email or login is required.
            </p>
          </div>
          <div className="card">
            <span className="step-num">03</span>
            <h3>Absorb &amp; Download</h3>
            <p>
              Review your visual concept cards, explore the mind map, and export study notes in 20 seconds.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <h2 className="vv-hand">Frequently Asked Questions</h2>
        {FAQ_NOLOGIN.map(([q, a]) => (
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
          <Link href="/free-youtube-summarizer-no-login">Free No Login</Link>
          <Link href="/video-visual-summarizer">Visual Summarizer</Link>
          <Link href="/youtube-video-mind-map-generator">Mind Maps</Link>
          <Link href="/whiteboard-summary">Whiteboard</Link>
          <Link href="/youtube-transcript-summarizer">Transcript Summarizer</Link>
          <Link href="/compare/notegpt-alternative">NoteGPT Alternative</Link>
          <a href="mailto:vidvisual.xyz@gmail.com">Support</a>
        </div>
        <span className="muted small">&copy; {new Date().getFullYear()} vidvisual</span>
      </footer>
    </>
  );
}

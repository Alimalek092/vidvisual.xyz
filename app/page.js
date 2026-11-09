import { IconBolt, IconBrain, IconNotes, IconRefresh, IconMic, IconGrad, IconBriefcase, IconUsers, IconBook, IconClock, IconHandshake, IconFolder } from '@/components/Icons';
import SlidingTopicTicker from '@/components/SlidingTopicTicker';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import Visual from '@/components/Visual';
import Pricing from '@/components/Pricing';
import HomeHeroGenerator from '@/components/HomeHeroGenerator';
import { SAMPLE } from '@/lib/sample';
import { PLANS } from '@/lib/plans';

const FAQ = [
  ['Can vidvisual turn a 4-hour podcast or lecture into visual notes?', 'Yes! vidvisual is specifically built to compress long-form content. Paste any 2-to-4-hour podcast (like Lex Fridman, Huberman Lab, or Joe Rogan) or multi-hour university lecture, and our AI extracts the core arguments, concept relationships, and actionable takeaways into a visual whiteboard summary in around 20 seconds.'],
  ['How much watch time do I save using vidvisual?', 'Users save up to 90% to 95% of their watch time. Instead of spending 180 to 240 minutes scrubbing through video timelines, you can understand the complete conceptual hierarchy and main key points in under 60 seconds.'],
  ['How does vidvisual extract the main key points from long YouTube videos?', 'vidvisual parses the full transcript using Google Gemini 2.5 Flash with structured semantic schema distillation. It automatically filters out conversational filler, sponsor segments, and banter, extracting essential definitions and arranging ideas into spatial whiteboard concept cards and an interconnected mind map.'],
  ['How is vidvisual different from ChatGPT, NoteGPT, or Eightify?', 'Standard AI summarizers and Chrome extensions only spit out dense walls of linear bullet points that cause cognitive fatigue. vidvisual is built on cognitive Dual-Coding Theory: it converts linear speech into spatial whiteboard concept cards and relational mind maps, which are scientifically proven to boost memory retention by 65% compared to plain text skims.'],
  ['How does vidvisual prevent AI hallucinations and inaccurate summaries?', 'Unlike generic chatbots that summarize from memory or web approximations, vidvisual grounds all extraction strictly in the actual timestamped transcript of the video. It extracts direct quotes, verifies factual thesis statements against the captions, and organizes only verified claims into concept cards.'],
  ['Is vidvisual free to use?', 'Yes. The Free plan gives you 3 visual summaries every week with no credit card required. Paid plans unlock 50 to 200 summaries per week, HD downloads without a watermark, and vector PDF exports.'],
  ['Which YouTube videos work with vidvisual?', 'Any YouTube video that has captions turned on works — lectures, tutorials, podcasts, interviews, conference talks, and technical walkthroughs. If a video has captions, vidvisual can summarize it in seconds.'],
  ['What formats can I download my visual summary in?', 'Free plans download a standard JPG. Pro accounts export crisp HD PNG images with no watermark, and Unlimited accounts support vector PDF exports ready for GoodNotes, Notion, and printing.'],
  ['Can I use vidvisual to study university lectures and exams?', 'Yes. Thousands of students use vidvisual to convert 60-to-120-minute recorded lectures into high-yield whiteboard study sheets, visual mind maps, and bulleted takeaways before exams.'],
  ['Is my generated data and account private?', 'Yes. All visual summaries are saved securely to your personal private library and are only accessible by your account. We never sell your data or share your private library.'],
  ['Can I cancel my subscription anytime?', 'Yes. You can upgrade, downgrade, or cancel your subscription at any time directly from your dashboard with zero lock-in contracts.'],
  ['What if I have an issue or payment question?', 'If you experience any issues, payment questions, or need assistance with your account, please email our support team directly at vidvisual.xyz@gmail.com and we will resolve it within 24 hours.'],
];

const VALUE_PROPS = [
  { emoji: '⚡', accent: 'blue', title: 'Save 90% of watch time', text: 'Skip scrubbing through a 2-4 hour video for the 3 ideas that matter. Turn hours of conversation into a scannable visual in under 20 seconds.' },
  { emoji: '🧠', accent: 'violet', title: 'Remember 65% more', text: 'Visual, spatial summaries are proven by cognitive science to be significantly easier for your brain to retain than a linear page of text.' },
  { emoji: '📝', accent: 'green', title: 'Extract main key points', text: 'Every summary distills core thesis statements, structured concept cards, and actionable takeaway bullets you can study and reference anytime.' },
  { emoji: '🔁', accent: 'amber', title: 'Build a visual knowledge base', text: 'Every visual you generate is saved to your account, so your personal library of podcasts, lectures, and tutorials keeps growing.' },
];

const AUDIENCES = [
  { emoji: '🎙️', accent: 'blue', title: 'Podcast listeners', text: 'Turn 3-4 hour podcasts (Huberman Lab, Lex Fridman, All-In, Joe Rogan) into concise whiteboard notes and mind maps in 20 seconds.' },
  { emoji: '🎓', accent: 'green', title: 'Students & academics', text: 'Convert university lecture recordings, MIT OpenCourseWare, and exam review sessions into visual study sheets you can revise from in 60 seconds.' },
  { emoji: '💼', accent: 'amber', title: 'Founders & professionals', text: 'Compress long industry keynotes, tech tutorials, and market webinars into a 1-page visual summary you can share with colleagues.' },
  { emoji: '👥', accent: 'violet', title: 'Lifelong visual learners', text: 'Build a permanent visual library of everything you have learned on YouTube, from science and coding to history and business.' },
];

const STEPS = [
  { num: '1', title: 'Paste any YouTube link', text: 'Copy the URL of any YouTube video, podcast, lecture, or tutorial that has captions turned on.' },
  { num: '2', title: 'AI distills the key points in 20s', text: 'vidvisual uses Gemini 2.5 Flash to parse the transcript, extract essential concepts, and calculate topical relationships.' },
  { num: '3', title: 'Explore your visual whiteboard', text: 'Review spatial concept cards, navigate the interactive mind map, and absorb the high-yield takeaway list.' },
  { num: '4', title: 'Export, save, and remember', text: 'Your visual is stored in your private cloud library. Download as high-res JPG, HD PNG, or vector PDF with one click.' },
];

const USES = [
  { emoji: '📚', accent: 'blue', title: 'Study for exams in 60s', text: 'Turn a 90-minute lecture recording into high-yield revision notes you will actually remember on test day.' },
  { emoji: '⏱️', accent: 'green', title: 'Binge podcasts at 10x speed', text: 'Grasp the core insights of a 3-hour podcast in 2 minutes without listening at distorted 3x audio speed.' },
  { emoji: '🤝', accent: 'amber', title: 'Share visual briefings', text: 'Send your team a one-page infographic instead of asking them to sit through an hour-long recorded meeting.' },
  { emoji: '🗂️', accent: 'violet', title: 'Build your second brain', text: 'Curate a searchable visual library of every valuable idea, concept, and technique you discover on YouTube.' },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Turn a YouTube Video into a Visual Summary in 20 Seconds',
  description: 'Convert any YouTube video, podcast, or lecture into an interactive whiteboard visual and mind map using AI.',
  totalTime: 'PT20S',
  step: STEPS.map((s, idx) => ({
    '@type': 'HowToStep',
    position: idx + 1,
    name: s.title,
    text: s.text,
  })),
};

const appJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'vidvisual',
  url: 'https://www.vidvisual.xyz',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All Modern Web Browsers (Chrome, Safari, Firefox, Edge)',
  description:
    'vidvisual is a free AI YouTube video summarizer that turns long boring YouTube videos, podcasts, and lectures into interactive whiteboard concept cards and visual mind maps in under 20 seconds.',
  featureList: [
    '20-second AI YouTube transcript summarization',
    'Interactive vector mind map generator',
    'Whiteboard concept cards breakdown',
    'High-resolution JPG, HD PNG, and PDF exports',
    'Multi-language caption support',
    'Long-form video and podcast compression',
    'Personal private visual library',
  ],
  offers: Object.values(PLANS).map((p) => ({
    '@type': 'Offer',
    name: p.name,
    price: String(p.price),
    priceCurrency: 'USD',
  })),
};


function getCardIcon(key) {
  const map = {
    bolt: IconBolt,
    brain: IconBrain,
    notes: IconNotes,
    refresh: IconRefresh,
    mic: IconMic,
    grad: IconGrad,
    briefcase: IconBriefcase,
    users: IconUsers,
    book: IconBook,
    clock: IconClock,
    handshake: IconHandshake,
    folder: IconFolder,
  };
  const Comp = map[key];
  return Comp ? <Comp style={{ width: 24, height: 24 }} /> : null;
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

      <nav className="nav">
        <BrandLogo />
        <div className="nav-links">
          <a href="#formats">Format</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="#support">Support</a>
          <Link href="/login">Log in</Link>
          <Link href="/register" className="btn btn-primary btn-sm">Sign up free</Link>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(43, 89, 224, 0.1)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--blue)', flexWrap: 'wrap' }}>
            <span><span className="status-indicator-dot" />⚡ Under 20 Seconds</span>
            <span>·</span>
            <span>🌐 16+ Languages</span>
            <span>·</span>
            <span>100% Free Forever</span>
          </div>
          <h1 className="vv-hand">Turn Any YouTube Video into Visual Notes in Under 20s — in Any Language</h1>
          <p>
            Stop wasting hours on long videos. Get instant visual whiteboard cards & mind maps in 20 seconds — and save 90% of watch time.
          </p>
          <HomeHeroGenerator />
        </div>
        <div className="hero-demo">
          <Visual data={SAMPLE} format="whiteboard" />
        </div>
      </header>

      {/* Silicon Valley SaaS Stats Strip */}
      <section className="stats-strip" aria-label="Key Product Benchmarks">
        <div className="stat-pill">
          <span className="stat-pill-num">20 Sec</span>
          <span className="stat-pill-label">Average AI distillation speed</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">90% Saved</span>
          <span className="stat-pill-label">Watch time saved on long boring videos</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">65% Higher</span>
          <span className="stat-pill-label">Knowledge retention with spatial visual cards</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">100% Free</span>
          <span className="stat-pill-label">3 summaries every week, zero card needed</span>
        </div>
      </section>

      {/* Smooth Sliding Channels & Topics Marquee */}
      <SlidingTopicTicker />

      {/* Long-Form Video & Lecture Compression Showcase */}
      <section id="podcast-showcase" className="podcast-showcase" aria-label="Long-Form Video Compression Showcase">
        <div className="podcast-showcase-copy">
          <span className="answer-badge" style={{ marginBottom: '10px' }}>Long-Form Compression Engine</span>
          <h2 className="vv-hand">Turn Very Long Videos, Lectures &amp; Podcasts into Main Key Points</h2>
          <p>
            Nobody has hours to sit through rambling YouTube videos, dense college lectures, or multi-hour podcast conversations just to find the core ideas that matter.
            vidvisual analyzes the complete video transcript, strips away conversational filler, sponsor segments, and repetitive tangents, and distills the main key points into an easy-to-understand visual whiteboard summary you can absorb in under a minute.
          </p>
          <Link href="/youtube-podcast-summarizer" className="btn btn-primary btn-sm">Explore Podcast Summarizer &rarr;</Link>
        </div>
        <div className="podcast-timeline">
          <div className="podcast-timeline-item">
            <div className="podcast-timeline-left">
              <span className="podcast-timeline-icon">🎙️</span>
              <div>
                <div className="podcast-timeline-title">Deep Technical Podcasts (4+ Hours)</div>
                <div className="podcast-timeline-meta">AI Architecture &amp; Engineering Systems</div>
              </div>
            </div>
            <span className="podcast-timeline-speed">20s &rarr; 5 Concept Cards</span>
          </div>
          <div className="podcast-timeline-item">
            <div className="podcast-timeline-left">
              <span className="podcast-timeline-icon">🧬</span>
              <div>
                <div className="podcast-timeline-title">Science &amp; Health Episodes (3+ Hours)</div>
                <div className="podcast-timeline-meta">Protocols, Evidence &amp; Action Steps</div>
              </div>
            </div>
            <span className="podcast-timeline-speed">18s &rarr; 6 Key Notes</span>
          </div>
          <div className="podcast-timeline-item">
            <div className="podcast-timeline-left">
              <span className="podcast-timeline-icon">🏛️</span>
              <div>
                <div className="podcast-timeline-title">University Lectures &amp; Seminars (2 Hours)</div>
                <div className="podcast-timeline-meta">Core Academic Concepts &amp; Formulas</div>
              </div>
            </div>
            <span className="podcast-timeline-speed">15s &rarr; Connected Mind Map</span>
          </div>
        </div>
      </section>

      {/* AEO: Direct Answer Block for AI Overviews & Search Snippets */}
      <section className="answer-box" aria-label="Quick Overview">
        <span className="answer-badge">Quick Overview</span>
        <h2>What is vidvisual?</h2>
        <p>
          <strong>vidvisual</strong> is a free AI-powered YouTube video summarizer and visual note-taking app.
          It automatically turns long video lectures, podcasts, tutorials, and interviews into scannable whiteboard concept cards,
          knowledge maps, and colorful infographics in under 20 seconds.
          Built for students, researchers, and professionals who want to learn faster and boost memory retention by up to 65%.
        </p>
        <div className="answer-highlights">
          <div className="answer-highlight">
            <strong>⏱️ Speed</strong>
            <span>Generates complete visual notes in ~20 seconds</span>
          </div>
          <div className="answer-highlight">
            <strong>🧠 Formats</strong>
            <span>Whiteboard concept cards, Infographic &amp; Mind Map</span>
          </div>
          <div className="answer-highlight">
            <strong>💳 Pricing</strong>
            <span>Free forever: 3 summaries/week, no credit card required</span>
          </div>
          <div className="answer-highlight">
            <strong>📥 Exports</strong>
            <span>Download as JPG, HD PNG, or vector PDF</span>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="vv-hand">Why visual summaries work better than watching twice</h2>
        <p className="section-lead">
          Your brain holds onto a well-organized visual far longer than a video you watched once at 2x speed.
          vidvisual is built around that idea: instead of leaving you with a pile of scattered notes, it gives
          you a structured, memorable picture of what the video actually said.
        </p>
        <div className="card-grid">
          {VALUE_PROPS.map((v) => (
            <div key={v.title} className={`info-card accent-${v.accent}`}>
              <span className="card-emoji">{v.emoji}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="formats" className="section">
        <h2 className="vv-hand">One video, two ways to remember it</h2>
        <p className="section-lead">
          Every summary comes in two formats, so you can pick whatever fits the moment — deep study or a
          quick scan.
        </p>
        <div className="formats">
          <div>
            <h3>Whiteboard</h3>
            <p>Concept cards for each big idea, plus a mind map that shows how they connect. Best for studying a topic in depth.</p>
          </div>
          <div>
            <h3>Infographic</h3>
            <p>A single knowledge map with the key takeaways underneath. Best for a quick review before an exam or a meeting.</p>
          </div>
        </div>
        <div className="format-demo">
          <Visual data={SAMPLE} format="infographic" theme="ocean" />
        </div>
      </section>

      <section className="section">
        <h2 className="vv-hand">Built for how you actually learn</h2>
        <p className="section-lead">Whoever you are, if you learn from YouTube, vidvisual turns that time into something you keep.</p>
        <div className="card-grid">
          {AUDIENCES.map((a) => (
            <div key={a.title} className={`info-card accent-${a.accent}`}>
              <span className="card-emoji">{a.emoji}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AEO & SEO: Structured Comparison Table */}
      <section className="section">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span className="answer-badge" style={{ marginBottom: '8px' }}>Battle-Tested Comparison</span>
          <h2 className="vv-hand" style={{ fontSize: 'clamp(2rem, 3.8vw, 2.7rem)', margin: '0 0 10px' }}>vidvisual vs. Generic AI Summarizers</h2>
          <p className="section-lead" style={{ margin: '0 auto', maxWidth: '640px' }}>
            Why spatial concept maps and whiteboard cards outperform linear ChatGPT text walls and Chrome extensions.
          </p>
        </div>
        <div className="comparison-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Capability</th>
                <th className="highlight-col">vidvisual</th>
                <th>NoteGPT / Eightify</th>
                <th>ChatGPT / Chrome Plugins</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Learning Architecture</strong></td>
                <td className="highlight-col">Interactive Whiteboard &amp; Mind Map</td>
                <td>Linear text list &amp; timestamps</td>
                <td>Raw wall of text bullets</td>
              </tr>
              <tr>
                <td><strong>Memory Retention (Paivio Dual-Coding)</strong></td>
                <td className="highlight-col"><span className="comparison-badge-yes">Up to 65% Higher Recall</span></td>
                <td>Low (Skimmed bullet fatigue)</td>
                <td>Low (Passive reading)</td>
              </tr>
              <tr>
                <td><strong>Long-Form Handling (3-4h Podcasts)</strong></td>
                <td className="highlight-col">Distills to 5-6 core concepts in ~20s</td>
                <td>Truncates or runs out of tokens</td>
                <td>Often hits context limits</td>
              </tr>
              <tr>
                <td><strong>Hallucination Defense</strong></td>
                <td className="highlight-col"><span className="comparison-badge-yes">100% Grounded in Captions</span></td>
                <td>Occasional hallucinations</td>
                <td>Frequent speculative fill-in</td>
              </tr>
              <tr>
                <td><strong>Vector &amp; Image Exports</strong></td>
                <td className="highlight-col">JPG, HD PNG, Vector PDF</td>
                <td>Copy text or basic markdown</td>
                <td>Copy plain text only</td>
              </tr>
              <tr>
                <td><strong>Note App Workflows</strong></td>
                <td className="highlight-col">Ready for Notion, Obsidian, GoodNotes</td>
                <td>Manual reformatting needed</td>
                <td>Manual reformatting needed</td>
              </tr>
              <tr>
                <td><strong>Free Weekly Quota</strong></td>
                <td className="highlight-col"><span className="comparison-badge-yes">3 Free Forever (No Card)</span></td>
                <td>Aggressive 1-video trial</td>
                <td>Requires paid Plus plan</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="how-it-works" className="section how">
        <h2 className="vv-hand">How it works</h2>
        <p className="section-lead">From link to visual summary in four simple steps — no editing, no formatting, no extra apps.</p>
        <div className="steps-detailed">
          {STEPS.map((s) => (
            <div key={s.num} className="step-detailed">
              <div className="step-num vv-hand">{s.num}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="vv-hand">What you can do with your visual</h2>
        <p className="section-lead">A vidvisual summary is not just a picture — it is something you can actually use afterward.</p>
        <div className="card-grid">
          {USES.map((u) => (
            <div key={u.title} className={`info-card accent-${u.accent}`}>
              <span className="card-emoji">{u.emoji}</span>
              <h3>{u.title}</h3>
              <p>{u.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="section pricing-section">
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <span className="answer-badge" style={{ marginBottom: '10px' }}>💎 Pricing</span>
          <h2 className="vv-hand" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', marginBottom: '12px' }}>Start free. Upgrade only when you need more.</h2>
          <p className="section-lead" style={{ maxWidth: '580px', margin: '0 auto 8px', fontSize: '1.1rem' }}>
            Built for students, researchers, and visual learners who want structured notes in 20 seconds. No credit card required to start.
          </p>
          <div className="pricing-trust" style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '16px', marginBottom: '8px' }}>
            <span className="pricing-trust-item">✅ No credit card required</span>
            <span className="pricing-trust-item">🔄 Cancel anytime</span>
            <span className="pricing-trust-item">📧 24h email support</span>
          </div>
        </div>
        <Pricing />
        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <Link href="/register" className="btn btn-primary btn-lg" style={{ fontSize: '1.15rem', padding: '16px 36px' }}>Start summarizing free — no card needed</Link>
          <p className="muted small" style={{ marginTop: '14px' }}>Free plan includes 3 summaries per week, forever. Upgrade or downgrade anytime from your dashboard.</p>
        </div>
      </section>

      <section id="faq" className="section faq">
        <h2 className="vv-hand">Questions</h2>
        {FAQ.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
      <section className="section final">
        <h2 className="vv-hand">Stop forgetting what you watch.</h2>
        <Link href="/register" className="btn btn-primary btn-lg">Get started free</Link>
      </section>

      {/* Footer SEO Programmatic Pillar Hubs */}
      <section className="footer-pillars" aria-label="Explore vidvisual Tools & Guides">
        <div className="footer-pillar-col">
          <h4>AI Summarization Hubs</h4>
          <ul>
            <li><Link href="/youtube-video-summarizer">YouTube Video Summarizer (AI)</Link></li>
            <li><Link href="/free-youtube-summarizer-no-login">Free YouTube Summarizer (No Login)</Link></li>
            <li><Link href="/free-ai-video-summarizer">Free AI Video Summarizer</Link></li>
            <li><Link href="/video-visual-summarizer">Video Visual Summarizer</Link></li>
            <li><Link href="/multilingual-youtube-summarizer">Multilingual YouTube Summarizer</Link></li>
            <li><Link href="/youtube-transcript-summarizer">YouTube Transcript Summarizer</Link></li>
            <li><Link href="/youtube-to-pdf">YouTube to PDF Converter</Link></li>
            <li><Link href="/youtube-to-anki-flashcards">YouTube to Anki Flashcards</Link></li>
          </ul>
        </div>
        <div className="footer-pillar-col">
          <h4>Visual Learning Tools</h4>
          <ul>
            <li><Link href="/youtube-video-mind-map-generator">YouTube Mind Map Generator</Link></li>
            <li><Link href="/youtube-to-mind-map">YouTube to Mind Map</Link></li>
            <li><Link href="/whiteboard-summary">Whiteboard Video Summarizer</Link></li>
            <li><Link href="/video-to-infographic">Video to Infographic AI</Link></li>
            <li><Link href="/youtube-to-notes">YouTube to Study Notes</Link></li>
          </ul>
        </div>
        <div className="footer-pillar-col">
          <h4>Compare &amp; Alternatives</h4>
          <ul>
            <li><Link href="/compare">All Competitor Comparisons</Link></li>
            <li><Link href="/compare/notegpt-alternative">NoteGPT Alternative (Visual)</Link></li>
            <li><Link href="/compare/eightify-alternative">Eightify Alternative (Free Web)</Link></li>
            <li><Link href="/compare/bibigpt-alternative">BibiGPT Alternative</Link></li>
            <li><Link href="/compare/glasp-alternative">Glasp Alternative</Link></li>
            <li><Link href="/compare/summarize-tech-alternative">Summarize.tech Alternative</Link></li>
            <li><Link href="/compare/videohighlight-alternative">Video Highlight Alternative</Link></li>
            <li><Link href="/summarize-huberman-lab-podcast">Huberman Lab Summarizer</Link></li>
          </ul>
        </div>
        <div className="footer-pillar-col">
          <h4>Resources &amp; Support</h4>
          <ul>
            <li><Link href="/blog">Blog &amp; Knowledge Hub</Link></li>
            <li><Link href="/login">Dashboard Login</Link></li>
            <li><Link href="/register">Sign Up Free (3/week)</Link></li>
            <li><a href="mailto:vidvisual.xyz@gmail.com">Contact Developer Support</a></li>
          </ul>
        </div>
      </section>

      <footer className="site-foot">
        <span className="vv-hand brand-inline"><img src="/logo.png" alt="" className="brand-icon-sm" width="22" height="22" /> vidvisual</span>
        <div className="foot-badges">
          <a
            href="https://tinylaunch.com"
            target="_blank"
            rel="noopener"
            className="launch-badge tinylaunch-badge"
            title="Featured on TinyLaunch"
          >
            <img
              src="https://tinylaunch.com/tinylaunch_badge_featured_on.svg"
              alt="TinyLaunch Badge"
              width="202"
              height="61"
              style={{ width: '202px', height: 'auto' }}
            />
          </a>
          <a
            href="https://vibecodinglist.com/projects/vidvisual-turn-long-youtube-videos-into-beautiful?utm_source=vcl_badge&utm_medium=builder_site&utm_campaign=listed_badge&utm_content=vidvisual-turn-long-youtube-videos-into-beautiful"
            target="_blank"
            rel="noopener"
            className="launch-badge vcl-badge"
            title="Featured on VibeCodingList"
          >
            <img
              src="https://vibecodinglist.com/assets/embed-widget/featured-on-badge-light.png"
              alt="Featured on VibeCodingList"
              width="200"
              height="51"
              className="vcl-badge-light"
              style={{ width: '200px', height: 'auto' }}
            />
            <img
              src="https://vibecodinglist.com/assets/embed-widget/featured-on-badge-dark.png"
              alt="Featured on VibeCodingList"
              width="200"
              height="51"
              className="vcl-badge-dark"
              style={{ width: '200px', height: 'auto' }}
            />
          </a>
        </div>
        <div id="support" className="foot-support">
          <a href="mailto:vidvisual.xyz@gmail.com?subject=Vid%20Visual%20Support%20Request">vidvisual.xyz@gmail.com</a>
        </div>
        <span className="muted small">© {new Date().getFullYear()} vidvisual</span>
      </footer>
    </>
  );
}
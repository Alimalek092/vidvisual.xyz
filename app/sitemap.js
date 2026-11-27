const SITE_URL = 'https://www.vidvisual.xyz';

export default function sitemap() {
  const currentDate = new Date().toISOString().split('T')[0];

  const routes = [
    // 1. Root Homepage
    { path: '', priority: 1.0, changeFrequency: 'daily' },

    // 2. High-Intent Visual & Free Summarizer Landing Hubs
    { path: '/free-youtube-summarizer-no-login', priority: 1.0, changeFrequency: 'daily' },
    { path: '/free-ai-video-summarizer', priority: 1.0, changeFrequency: 'daily' },
    { path: '/video-visual-summarizer', priority: 1.0, changeFrequency: 'daily' },
    { path: '/youtube-video-mind-map-generator', priority: 1.0, changeFrequency: 'daily' },
    { path: '/youtube-video-summarizer', priority: 1.0, changeFrequency: 'daily' },
    { path: '/youtube-transcript-summarizer', priority: 0.95, changeFrequency: 'daily' },
    { path: '/whiteboard-summary', priority: 0.95, changeFrequency: 'daily' },
    { path: '/multilingual-youtube-summarizer', priority: 0.95, changeFrequency: 'daily' },
    { path: '/youtube-to-notes', priority: 0.95, changeFrequency: 'daily' },
    { path: '/youtube-to-mind-map', priority: 0.95, changeFrequency: 'daily' },
    { path: '/video-to-infographic', priority: 0.95, changeFrequency: 'daily' },
    { path: '/youtube-lecture-summarizer', priority: 0.95, changeFrequency: 'daily' },
    { path: '/youtube-podcast-summarizer', priority: 0.95, changeFrequency: 'daily' },
    { path: '/youtube-to-pdf', priority: 0.95, changeFrequency: 'daily' },
    { path: '/youtube-to-anki-flashcards', priority: 0.95, changeFrequency: 'daily' },
    { path: '/summarize-huberman-lab-podcast', priority: 0.95, changeFrequency: 'daily' },

    // 3. Competitor Comparison Hubs
    { path: '/compare', priority: 0.95, changeFrequency: 'daily' },
    { path: '/compare/notegpt-alternative', priority: 0.95, changeFrequency: 'daily' },
    { path: '/compare/eightify-alternative', priority: 0.95, changeFrequency: 'daily' },
    { path: '/compare/videohighlight-alternative', priority: 0.95, changeFrequency: 'daily' },
    { path: '/compare/bibigpt-alternative', priority: 0.95, changeFrequency: 'daily' },
    { path: '/compare/glasp-alternative', priority: 0.95, changeFrequency: 'daily' },
    { path: '/compare/summarize-tech-alternative', priority: 0.95, changeFrequency: 'daily' },

    // 4. Knowledge Hub & Editorial Guides
    { path: '/blog', priority: 0.90, changeFrequency: 'daily' },
    { path: '/blog/how-to-summarize-youtube-videos-ai', priority: 0.90, changeFrequency: 'weekly' },
    { path: '/blog/best-ai-youtube-summarizers', priority: 0.90, changeFrequency: 'weekly' },
    { path: '/blog/youtube-lecture-to-study-notes', priority: 0.90, changeFrequency: 'weekly' },

    // 5. User Onboarding & Auth
    { path: '/register', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/login', priority: 0.60, changeFrequency: 'monthly' },

    // 6. Legal
    { path: '/privacy', priority: 0.50, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.50, changeFrequency: 'yearly' },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: currentDate,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

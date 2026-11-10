import './globals.css';
// [SAFETY SWITCH]: Comment out or remove the import below to instantly disable all sliding motion & UI enhancements
import './motion-enhancements.css';
import './premium-ui.css';
import './wensity-ui.css';

import ThemeToggle from '@/components/ThemeToggle';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const SITE_URL = 'https://www.vidvisual.xyz';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Free AI YouTube Video Summarizer in Any Language (16+) · vidvisual',
    template: '%s · vidvisual',
  },
  description:
    'Free AI YouTube video summarizer. Turn long YouTube videos, podcasts, and university lectures into whiteboard concept cards and visual mind maps — in 16+ languages in 20 seconds. Save 90% of watch time.',
  applicationName: 'vidvisual',
  authors: [{ name: 'vidvisual Team' }],
  creator: 'vidvisual',
  publisher: 'vidvisual',
  category: 'Education & Productivity Tools',
  alternates: {
    canonical: 'https://www.vidvisual.xyz',
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=2' },
      { url: '/icon.png?v=2', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=2', sizes: '180x180' },
    ],
  },
  openGraph: {
    title: 'vidvisual — Turn Long YouTube Videos into Beautiful Whiteboard Summaries in 20 Seconds',
    description:
      'Turn long, boring YouTube videos, podcasts, and lectures into scannable whiteboard visuals, concept cards, and mind maps in under 20 seconds. Save 90% of watch time.',
    url: 'https://www.vidvisual.xyz',
    siteName: 'vidvisual',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.vidvisual.xyz/og-image.jpg?v=3',
        width: 1200,
        height: 630,
        alt: 'vidvisual — Turn YouTube Videos into Whiteboard Mind Maps',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vidvisual',
    creator: '@Ali_Mlk092',
    title: 'vidvisual — Turn Long YouTube Videos into Beautiful Whiteboard Summaries in 20 Seconds',
    description:
      'Turn long, boring YouTube videos, podcasts, and lectures into scannable whiteboard visuals, concept cards, and mind maps in under 20 seconds. Save 90% of watch time.',
    images: ['https://www.vidvisual.xyz/twitter-image.jpg?v=3'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'vidvisual',
  alternateName: ['vidvisual.xyz', 'vidvisual AI'],
  url: 'https://www.vidvisual.xyz',
  logo: 'https://www.vidvisual.xyz/logo.png',
  sameAs: [
    'https://x.com/vidvisual',
    'https://x.com/Ali_Mlk092',
    'https://github.com/Alimalek092/Vidvisual.xyz',
  ],
  description:
    'AI-powered YouTube video summarizer that turns long YouTube videos, podcasts, and lectures into whiteboard concept cards and visual mind maps.',
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'vidvisual',
  alternateName: ['vidvisual.xyz', 'vidvisual AI'],
  url: 'https://www.vidvisual.xyz',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.vidvisual.xyz/?url={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'vidvisual',
  url: 'https://www.vidvisual.xyz',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All Modern Web Browsers',
  description:
    'Turn long boring YouTube videos, multi-hour podcasts, and university lectures into scannable whiteboard notes and visual mind maps in under 20 seconds. Save 90% of watch time.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free tier with 3 visual summaries every week forever',
  },
  featureList: [
    'Whiteboard visual concept cards',
    'Spatial relational mind maps',
    '15 supported output languages',
    'Instant generation without mandatory login',
    'Key takeaways with actionable insights',
    'Exportable visual notes (HD PNG and PDF)'
  ],
  screenshot: 'https://www.vidvisual.xyz/og-image.jpg',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat+Brush&family=Figtree:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" href="/icon.png?v=2" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" sizes="180x180" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <meta property="og:image" content="https://www.vidvisual.xyz/og-image.jpg?v=3" />
        <meta property="og:image:secure_url" content="https://www.vidvisual.xyz/og-image.jpg?v=3" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="vidvisual — Turn YouTube Videos into Whiteboard Mind Maps" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vidvisual" />
        <meta name="twitter:creator" content="@Ali_Mlk092" />
        <meta name="twitter:title" content="vidvisual — Turn Long YouTube Videos into Beautiful Whiteboard Summaries in 20 Seconds" />
        <meta name="twitter:description" content="Turn long, boring YouTube videos, podcasts, and lectures into scannable whiteboard visuals, concept cards, and mind maps in under 20 seconds." />
        <meta name="twitter:image" content="https://www.vidvisual.xyz/twitter-image.jpg?v=3" />
        <meta name="twitter:image:src" content="https://www.vidvisual.xyz/twitter-image.jpg?v=3" />
        <meta name="twitter:image:alt" content="vidvisual — AI YouTube Video Summarizer &amp; Mind Maps" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
        />
      </head>
      <body>
        <div className="top-bar">
          <ThemeToggle />
        </div>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
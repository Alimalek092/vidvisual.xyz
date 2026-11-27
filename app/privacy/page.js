import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';

export const metadata = {
  title: 'Privacy Policy · vidvisual',
  description: 'Privacy Policy for vidvisual — how we collect, use, and protect your personal data.',
  alternates: { canonical: 'https://www.vidvisual.xyz/privacy' },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'November 27, 2026';

export default function PrivacyPage() {
  return (
    <>
      <nav className="nav">
        <BrandLogo />
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/login">Log in</Link>
          <Link href="/register" className="btn btn-primary btn-sm">Sign up free</Link>
        </div>
      </nav>

      <main className="legal-page">
        <div className="legal-hero">
          <span className="answer-badge">Privacy Policy</span>
          <h1 className="vv-hand">Your privacy matters</h1>
          <p className="legal-updated">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="legal-body">

          <section className="legal-section">
            <h2>1. What we collect</h2>
            <p>When you use vidvisual, we may collect:</p>
            <ul>
              <li><strong>Account information</strong> — your email address when you register.</li>
              <li><strong>Usage data</strong> — YouTube video URLs you submit, generated visual summaries, and format/language preferences, stored in your private library.</li>
              <li><strong>Guest data</strong> — if you use the tool without registering, a temporary guest ID is stored locally in your browser and summaries are linked to it for the current week only.</li>
              <li><strong>Payment data</strong> — processed securely by Polar or Dodo Payments. We never store your card details.</li>
              <li><strong>Analytics</strong> — anonymised page-view and event data via Vercel Analytics and Speed Insights to understand how the product is used.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>2. How we use your data</h2>
            <ul>
              <li>To provide and improve the vidvisual service.</li>
              <li>To save your generated visual summaries to your personal private library.</li>
              <li>To manage your subscription and send transactional emails (plan receipts, limit notifications).</li>
              <li>To detect and prevent abuse or misuse of the free tier.</li>
            </ul>
            <p>We do <strong>not</strong> sell your data to third parties. We do not use your summaries to train AI models.</p>
          </section>

          <section className="legal-section">
            <h2>3. Cookies and local storage</h2>
            <p>vidvisual uses:</p>
            <ul>
              <li><strong>Session cookies</strong> from Supabase Auth for secure login.</li>
              <li><strong>LocalStorage</strong> to persist your guest ID, summary history, and UI preferences (theme, language) between sessions.</li>
            </ul>
            <p>No third-party advertising or tracking cookies are set.</p>
          </section>

          <section className="legal-section">
            <h2>4. Data storage and security</h2>
            <p>All user data is stored in Supabase (hosted on AWS). Access is restricted by row-level security so only you can read your own summaries. Data is encrypted in transit (HTTPS/TLS) and at rest.</p>
          </section>

          <section className="legal-section">
            <h2>5. Third-party services</h2>
            <p>vidvisual integrates with:</p>
            <ul>
              <li><strong>Google Gemini API</strong> — video transcripts are sent to Google&rsquo;s API for processing. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&rsquo;s Privacy Policy</a>.</li>
              <li><strong>Polar / Dodo Payments</strong> — for subscription billing.</li>
              <li><strong>Vercel</strong> — for hosting and analytics.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>6. Data retention</h2>
            <p>Your account data and summaries are retained as long as your account is active. Guest data (browser-local only) expires after 7 days or is cleared when browser storage is cleared. You can request deletion of your account and all associated data at any time by emailing us.</p>
          </section>

          <section className="legal-section">
            <h2>7. Your rights</h2>
            <p>Depending on your location, you may have the right to access, correct, or delete your personal data, or to object to its processing. To exercise any of these rights, email us at <a href="mailto:vidvisual.xyz@gmail.com">vidvisual.xyz@gmail.com</a> and we will respond within 30 days.</p>
          </section>

          <section className="legal-section">
            <h2>8. Children&rsquo;s privacy</h2>
            <p>vidvisual is not directed at children under 13. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.</p>
          </section>

          <section className="legal-section">
            <h2>9. Changes to this policy</h2>
            <p>We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent revision. Continued use of vidvisual after changes constitutes your acceptance of the updated policy.</p>
          </section>

          <section className="legal-section">
            <h2>10. Contact</h2>
            <p>Questions or concerns? Email us at <a href="mailto:vidvisual.xyz@gmail.com">vidvisual.xyz@gmail.com</a>. We typically respond within 24 hours.</p>
          </section>

        </div>

        <div className="legal-footer-links">
          <Link href="/terms">Terms of Service →</Link>
          <span>·</span>
          <Link href="/">Back to Home</Link>
        </div>
      </main>

      <footer className="site-foot">
        <span className="vv-hand brand-inline"><img src="/logo.png" alt="" className="brand-icon-sm" width="22" height="22" /> vidvisual</span>
        <div className="foot-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="mailto:vidvisual.xyz@gmail.com">Contact</a>
        </div>
        <span className="muted small">© {new Date().getFullYear()} vidvisual</span>
      </footer>
    </>
  );
}

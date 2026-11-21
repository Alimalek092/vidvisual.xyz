'use client';
// Original Auth: Email, Password & Google OAuth
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthForm({ mode }) {
  const router = useRouter();
  const isRegister = mode === 'register';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError('');
    setNotice('');
    setLoading(true);
    const auth = supabase().auth;
    const { data, error: err } = isRegister
      ? await auth.signUp({ email, password })
      : await auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) return setError(err.message);
    if (isRegister && !data.session) return setNotice('Check your email and click the confirmation link, then log in.');
    // Preserve plan/gateway query params for direct checkout after login
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const plan = urlParams.get('plan');
    const gw = urlParams.get('gateway');
    const dashUrl = plan ? `/dashboard?plan=${plan}${gw ? `&gateway=${gw}` : ''}` : '/dashboard';
    router.push(dashUrl);
  }

  async function google() {
    setError('');
    const { error: err } = await supabase().auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: (() => {
          const p = new URLSearchParams(window.location.search);
          const plan = p.get('plan');
          const gw = p.get('gateway');
          return plan
            ? `${window.location.origin}/dashboard?plan=${plan}${gw ? `&gateway=${gw}` : ''}`
            : `${window.location.origin}/dashboard`;
        })(),
      },
    });
    if (err) setError(err.message);
  }

  return (
    <main className="auth">
      <Link href="/" className="brand vv-hand"><img src="/logo.png" alt="vidvisual" className="brand-icon" width="32" height="32" /><span>vidvisual</span></Link>
      <h1 className="vv-hand">{isRegister ? 'Create your free account' : 'Welcome back'}</h1>
      <p className="muted">{isRegister ? '3 summaries a week, free forever.' : 'Log in to see your library.'}</p>
      <button type="button" className="btn btn-wide" onClick={google}>Continue with Google</button>
      <p className="divider"><span>or use email</span></p>
      <form onSubmit={submit}>
        <label>Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </label>
        <label>Password
          <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={isRegister ? 'new-password' : 'current-password'} />
        </label>
        {error ? (
          <div className="msg msg-error" role="alert">
            <p style={{ margin: 0 }}>{error}</p>
            <p className="small" style={{ margin: '6px 0 0' }}>
              Having trouble? Contact support at{' '}
              <a href="mailto:vidvisual.xyz@gmail.com" style={{ textDecoration: 'underline', fontWeight: 600 }}>
                vidvisual.xyz@gmail.com
              </a>
            </p>
          </div>
        ) : null}
        {notice ? <p className="msg msg-ok">{notice}</p> : null}
        <button className="btn btn-primary btn-wide" disabled={loading}>
          {loading ? 'Please wait…' : isRegister ? 'Create account' : 'Log in'}
        </button>
      </form>
      <p className="muted small">
        {isRegister ? 'Already have an account? ' : 'New here? '}
        <Link href={isRegister ? '/login' : '/register'}>{isRegister ? 'Log in' : 'Create an account'}</Link>
      </p>
    </main>
  );
}

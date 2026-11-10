import nodemailer from 'nodemailer';

const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'vidvisual.xyz@gmail.com';

/**
 * Sends an email notification to the SaaS owner whenever someone buys
 * a paid plan (Pro, Unlimited, Team).
 */
export async function sendAdminPurchaseNotification({
  customerEmail,
  customerName,
  plan,
  amount = '',
  currency = 'USD',
  orderId = '',
  eventType = '',
}) {
  const normalizedPlan = (plan || 'Premium').toUpperCase();
  const displayName = customerName || (customerEmail ? customerEmail.split('@')[0] : 'New Customer');
  const displayEmail = customerEmail || 'Not provided';
  const displayAmount = amount || 'Standard pricing';
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'UTC',
    dateStyle: 'full',
    timeStyle: 'medium',
  }) + ' UTC';

  const subject = `🎉 New Sale! ${displayName} just bought vidvisual ${normalizedPlan}`;

  const textContent = `
New Premium Purchase on vidvisual!
===================================
Plan: ${normalizedPlan}
Customer Name: ${displayName}
Customer Gmail / Email: ${displayEmail}
Amount Paid: ${displayAmount}
Date & Time: ${timestamp}
Order / Reference ID: ${orderId || 'N/A'}
Trigger Event: ${eventType || 'Payment Success'}

View in Polar Dashboard: https://dashboard.polar.sh
View in Supabase: https://supabase.com/dashboard
`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New vidvisual Premium Sale</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b1329; margin: 0; padding: 32px 16px; color: #ffffff; }
    .container { max-width: 580px; margin: 0 auto; background: #111c38; border-radius: 16px; border: 1px solid #1e294b; overflow: hidden; box-shadow: 0 12px 36px rgba(0,0,0,0.4); }
    .header { background: linear-gradient(135deg, #0f1f4d 0%, #050d24 100%); padding: 32px 28px; text-align: center; border-bottom: 1px solid #233363; }
    .badge { display: inline-block; background: #00f2fe; color: #050d24; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; padding: 4px 12px; border-radius: 999px; margin-bottom: 12px; }
    .title { font-size: 24px; font-weight: 800; color: #ffffff; margin: 0 0 8px; }
    .subtitle { font-size: 14px; color: #94a3b8; margin: 0; }
    .body { padding: 32px 28px; }
    .hero-stat { background: #0b152d; border-radius: 12px; padding: 20px; border: 1px solid #1e2c56; margin-bottom: 24px; text-align: center; }
    .hero-stat-label { font-size: 12px; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700; margin-bottom: 4px; }
    .hero-stat-value { font-size: 32px; font-weight: 900; color: #4ade80; margin: 0; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
    .info-table td { padding: 12px 14px; font-size: 14px; border-bottom: 1px solid #1b284e; }
    .info-table td.label { width: 40%; color: #94a3b8; font-weight: 500; }
    .info-table td.val { color: #f8fafc; font-weight: 600; text-align: right; }
    .highlight-email { color: #38bdf8 !important; text-decoration: underline; }
    .highlight-plan { display: inline-block; background: #4f46e5; color: #ffffff; padding: 2px 10px; border-radius: 6px; font-weight: 700; }
    .btn-container { text-align: center; margin: 28px 0 12px; }
    .btn { display: inline-block; background: #2563eb; color: #ffffff; font-weight: 700; font-size: 14px; text-decoration: none; padding: 12px 28px; border-radius: 10px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4); }
    .footer { background: #091024; padding: 20px 28px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #172445; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">vidvisual • Instant Payment Alert</span>
      <h1 class="title">New Premium Customer!</h1>
      <p class="subtitle">A customer just upgraded on <a href="https://vidvisual.xyz" style="color: #38bdf8; text-decoration: none; font-weight: 600;">vidvisual</a></p>
    </div>
    <div class="body">
      <div class="hero-stat">
        <div class="hero-stat-label">Plan Upgraded</div>
        <div class="hero-stat-value"><span class="highlight-plan">${normalizedPlan}</span></div>
      </div>
      <table class="info-table">
        <tr>
          <td class="label">Customer Name</td>
          <td class="val">${displayName}</td>
        </tr>
        <tr>
          <td class="label">Customer Gmail / Email</td>
          <td class="val"><a href="mailto:${displayEmail}" class="highlight-email">${displayEmail}</a></td>
        </tr>
        <tr>
          <td class="label">Amount Paid</td>
          <td class="val" style="color: #4ade80;">${displayAmount}</td>
        </tr>
        <tr>
          <td class="label">Time (UTC)</td>
          <td class="val" style="font-size: 13px;">${timestamp}</td>
        </tr>
        <tr>
          <td class="label">Reference / Order ID</td>
          <td class="val" style="font-family: monospace; font-size: 12px; color: #94a3b8;">${orderId || 'N/A'}</td>
        </tr>
      </table>
      <div class="btn-container">
        <a href="https://dashboard.polar.sh" class="btn" target="_blank">Open Polar Dashboard &rarr;</a>
      </div>
    </div>
    <div class="footer">
      This notification was automatically dispatched to <strong>${ADMIN_EMAIL}</strong> by vidvisual payment systems.
    </div>
  </div>
</body>
</html>
`;

  // 1. Try Gmail SMTP / Google App Password (via Nodemailer)
  const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
  const smtpUser = process.env.SMTP_USER || 'vidvisual.xyz@gmail.com';

  if (gmailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: gmailPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"vidvisual Billing" <${smtpUser}>`,
        to: ADMIN_EMAIL,
        subject,
        text: textContent,
        html: htmlContent,
      });

      console.log('[Email Alert] Purchase notification sent via Gmail SMTP:', info.messageId);
      return { success: true, provider: 'gmail-smtp', messageId: info.messageId };
    } catch (err) {
      console.error('[Email Alert] Gmail SMTP error:', err.message);
    }
  }

  // 2. Try Resend API if RESEND_API_KEY is configured
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'vidvisual <onboarding@resend.dev>',
          to: [ADMIN_EMAIL],
          subject,
          text: textContent,
          html: htmlContent,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        console.log('[Email Alert] Purchase notification sent via Resend API:', json.id);
        return { success: true, provider: 'resend', messageId: json.id };
      } else {
        console.error('[Email Alert] Resend API error response:', json);
      }
    } catch (err) {
      console.error('[Email Alert] Resend API fetch error:', err.message);
    }
  }

  // 3. Fallback / Log notification if no email service key is set yet
  console.warn('[Email Alert] Notice: To receive live emails at ' + ADMIN_EMAIL + ', set GMAIL_APP_PASSWORD (recommended) or RESEND_API_KEY in your Vercel Environment Variables.');
  console.log('[Email Alert] Sale Details Captured:', {
    displayName,
    displayEmail,
    plan: normalizedPlan,
    amount: displayAmount,
    timestamp,
    orderId,
  });

  return { success: false, reason: 'No email credentials configured' };
}

/**
 * Sends a high-converting, value-first personalized email to a user when they hit
 * their summary limit, inviting them to upgrade to Pro.
 * Sent from: vidvisual.xyz@gmail.com
 */
export async function sendUserLimitUpgradeEmail({
  recipientEmail,
  recipientName = '',
  plan = 'free',
  weeklyLimit = 3,
  proWeeklyLimit = 50,
}) {
  if (!recipientEmail || !recipientEmail.includes('@')) {
    return { success: false, reason: 'Invalid recipient email' };
  }

  const cleanEmail = recipientEmail.trim();
  const derivedName = recipientName || cleanEmail.split('@')[0].replace(/[._0-9+-]+/g, ' ').trim();
  const capitalizedName = derivedName
    ? derivedName.charAt(0).toUpperCase() + derivedName.slice(1)
    : 'there';

  const multiplier = Math.round(proWeeklyLimit / weeklyLimit) || 16;
  const subject = `You've maxed out your free visual summaries for this week ⚡ (${multiplier}x unlocked inside)`;

  const textContent = `
Hi ${capitalizedName},

You've officially used all ${weeklyLimit} of your free visual summaries on vidvisual for this week!

That means you've successfully saved roughly 3 to 6 hours of manual video watch time and turned dense videos into clear, structured concept cards and mind maps.

Why hit a pause on your learning?
With vidvisual Pro, your weekly limit jumps from ${weeklyLimit} to ${proWeeklyLimit} summaries per week (${multiplier}x more). That's enough to summarize entire YouTube playlists, multi-hour podcast series, or deep university lecture courses every single week.

What Pro gives you:
• 50 visual summaries every week (${multiplier}x more than Free)
• HD watermark-free PNG downloads (crisp visual cards for your second brain)
• Priority High-Speed AI processing (skip any queue, instant visual cards)
• Full cloud library access (keep all your knowledge safely organized)
• Slashed from $9 to only $4.99/month (45% OFF) — less than the price of a single coffee.

Upgrade your account in 30 seconds:
https://www.vidvisual.xyz/dashboard#plans

Your free summaries recharge on every Monday of every week automatically at 00:00 UTC, so there's zero pressure. But if you have more videos, lectures, or podcasts queued up right now, Pro lets you keep going without missing a beat.

If you ever have any questions, feedback, or need help with a summary, feel free to reply directly to this email. I read every message.

Best,
Ali Malek
Founder, vidvisual
vidvisual.xyz@gmail.com | https://www.vidvisual.xyz
`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You hit your vidvisual limit this week</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7f6; margin: 0; padding: 32px 16px; color: #16233b; line-height: 1.6; }
    .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 18px; border: 3px solid #16233b; overflow: hidden; box-shadow: 6px 6px 0 #16233b; }
    .header { background: linear-gradient(135deg, #2b59e0 0%, #7a5af8 100%); padding: 32px 28px; text-align: center; color: #ffffff; }
    .header-logo { display: inline-flex; align-items: center; gap: 8px; font-size: 26px; font-weight: 800; font-family: 'Caveat Brush', 'Comic Sans MS', cursive, sans-serif; margin-bottom: 6px; }
    .badge { display: inline-block; background: rgba(255,255,255,0.22); color: #ffffff; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 4px 14px; border-radius: 999px; margin-bottom: 10px; }
    .header h1 { font-size: 24px; font-weight: 800; margin: 0 0 6px; }
    .header p { font-size: 14px; margin: 0; opacity: 0.9; }
    .body { padding: 32px 28px; }
    .metric-box { background: #eef4ff; border-radius: 14px; padding: 18px 20px; border: 2px solid #2b59e0; margin-bottom: 24px; text-align: center; }
    .metric-num { font-size: 34px; font-weight: 900; color: #2b59e0; line-height: 1; margin-bottom: 6px; }
    .metric-label { font-size: 13px; color: #55627a; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; }
    .features-list { margin: 24px 0; padding: 0; list-style: none; }
    .feature-item { display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: 1px dashed #d9e0e6; font-size: 15px; color: #16233b; }
    .feature-item:last-child { border-bottom: none; }
    .feature-icon { font-size: 18px; flex-shrink: 0; line-height: 1.4; }
    .cta-container { text-align: center; margin: 32px 0 24px; }
    .cta-btn { display: inline-block; background: #2b59e0; color: #ffffff !important; font-weight: 800; font-size: 16px; text-decoration: none; padding: 14px 34px; border-radius: 999px; border: 2px solid #16233b; box-shadow: 4px 4px 0 #16233b; }
    .cta-sub { font-size: 12px; color: #55627a; margin-top: 10px; }
    .founder-note { background: #fafbfc; border-left: 4px solid #2b59e0; border-radius: 8px; padding: 14px 18px; margin-top: 26px; font-size: 14px; color: #55627a; }
    .footer { background: #f4f7f6; padding: 22px 28px; text-align: center; font-size: 12px; color: #55627a; border-top: 2px dashed #d9e0e6; }
    .footer a { color: #2b59e0; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">Weekly Learning Milestone</div>
      <div class="header-logo">⚡ vidvisual</div>
      <h1>You hit your free summary limit!</h1>
      <p>You&apos;ve used all ${weeklyLimit} of your free visual notes for this week.</p>
    </div>
    <div class="body">
      <p style="font-size: 16px; margin-top: 0;">Hey ${capitalizedName} 👋,</p>
      <p style="font-size: 15px; color: #55627a;">
        You just reached your weekly limit on <strong>vidvisual</strong>. That means you&apos;ve successfully converted dense, long YouTube videos into visual whiteboard concept cards and mind maps.
      </p>

      <div class="metric-box">
        <div class="metric-num">${multiplier}x More Summaries</div>
        <div class="metric-label">Upgrade from ${weeklyLimit} to ${proWeeklyLimit} summaries every single week</div>
      </div>

      <p style="font-size: 15px; color: #16233b; font-weight: 600;">
        Here is what unlocks instantly when you switch to <strong>Pro</strong>:
      </p>

      <div class="features-list">
        <div class="feature-item">
          <span class="feature-icon">🚀</span>
          <div><strong>50 summaries/week</strong> — Summarize entire podcast libraries, courses, or weekly tech tutorials without running out.</div>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🖼️</span>
          <div><strong>HD Watermark-Free PNGs</strong> — Clean, beautiful concept cards ready for your Notion workspace, GoodNotes, or Obsidian.</div>
        </div>
        <div class="feature-item">
          <span class="feature-icon">⚡</span>
          <div><strong>Priority High-Speed AI Processing</strong> — Skip any generation queue with direct high-priority AI processing.</div>
        </div>
        <div class="feature-item">
          <span class="feature-icon">📚</span>
          <div><strong>Permanent Cloud Library</strong> — Revisit, study, and organize all your past visual summaries anytime.</div>
        </div>
      </div>

      <div class="cta-container">
        <a href="https://www.vidvisual.xyz/dashboard#plans" class="cta-btn" target="_blank">Upgrade to Pro (Only $4.99/mo, was $9) &rarr;</a>
        <div class="cta-sub">Cancel anytime with 1 click • No hidden fees • 24/7 support</div>
      </div>

      <div class="founder-note">
        <strong>No rush at all:</strong> Free allowances recharge on every Monday of every week automatically at 00:00 UTC. But if you have exams, podcast backlogs, or lecture notes waiting right now, Pro lets you keep studying without pause. Have any questions? Just hit reply to this email!
      </div>
    </div>
    <div class="footer">
      Sent with ❤️ by <strong>Ali Malek</strong> • Founder at <a href="https://www.vidvisual.xyz">vidvisual.xyz</a><br>
      Direct support &amp; inquiries: <a href="mailto:vidvisual.xyz@gmail.com">vidvisual.xyz@gmail.com</a>
    </div>
  </div>
</body>
</html>
`;

  // 1. Try Gmail SMTP / Google App Password (via Nodemailer)
  const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
  const smtpUser = process.env.SMTP_USER || 'vidvisual.xyz@gmail.com';

  if (gmailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: gmailPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"Ali from vidvisual" <${smtpUser}>`,
        to: cleanEmail,
        replyTo: smtpUser,
        subject,
        text: textContent,
        html: htmlContent,
      });

      console.log(`[Limit Upgrade Email] Successfully sent to ${cleanEmail} via Gmail SMTP:`, info.messageId);
      return { success: true, provider: 'gmail-smtp', messageId: info.messageId };
    } catch (err) {
      console.error('[Limit Upgrade Email] Gmail SMTP error:', err.message);
    }
  }

  // 2. Try Resend API if RESEND_API_KEY is configured
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'Ali from vidvisual <onboarding@resend.dev>',
          to: [cleanEmail],
          reply_to: smtpUser,
          subject,
          text: textContent,
          html: htmlContent,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        console.log(`[Limit Upgrade Email] Successfully sent to ${cleanEmail} via Resend API:`, json.id);
        return { success: true, provider: 'resend', messageId: json.id };
      } else {
        console.error('[Limit Upgrade Email] Resend API error response:', json);
      }
    } catch (err) {
      console.error('[Limit Upgrade Email] Resend API fetch error:', err.message);
    }
  }

  // 3. Fallback: Log email contents if no credentials are configured yet
  console.warn(`[Limit Upgrade Email] Would have sent upgrade email to ${cleanEmail}, but neither GMAIL_APP_PASSWORD nor RESEND_API_KEY is configured in Vercel.`);
  console.log(`[Limit Upgrade Email Preview for ${cleanEmail}]:`, { subject, capitalizedName, multiplier });

  return { success: false, reason: 'No email credentials configured' };
}


'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function SupportModal({ open, onClose }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && open) onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open || !mounted || typeof document === 'undefined') return null;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText('vidvisual.xyz@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  return createPortal(
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-modal-title"
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 id="support-modal-title" className="vv-hand">Need any support?</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close support dialog">✕</button>
        </div>

        <p className="modal-desc">
          Facing an issue with your account, payment, or video summary? Have a doubt or question? Contact us directly:
        </p>

        <div className="support-box">
          <span className="support-box-label">Direct Support Email</span>
          <a
            href="mailto:vidvisual.xyz@gmail.com?subject=Vid%20Visual%20Support%20Request"
            className="support-box-email"
          >
            vidvisual.xyz@gmail.com
          </a>
        </div>

        <div className="modal-actions">
          <a
            href="mailto:vidvisual.xyz@gmail.com?subject=Vid%20Visual%20Support%20Request"
            className="btn btn-primary"
          >
            ✉️ Email directly
          </a>
          <button type="button" className="btn" onClick={copyEmail}>
            {copied ? '✓ Copied!' : '📋 Copy email'}
          </button>
        </div>

        <p className="muted small modal-footnote">
          We typically reply within 24 hours. For payment or billing queries, please include your registered email.
        </p>
      </div>
    </div>,
    document.body
  );
}

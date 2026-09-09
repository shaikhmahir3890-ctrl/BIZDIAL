'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShowConsent(false);
    // Ideally, initialize tracking scripts here if needed
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="cookie-consent">
      <div className="container cookie-container">
        <div className="cookie-content">
          <h3 className="cookie-title">🍪 Cookie Consent</h3>
          <p className="cookie-text">
            We use necessary cookies to make our site work. We&apos;d also like to set optional analytics cookies to help us improve it. We won&apos;t set optional cookies unless you enable them. For more detailed information, see our{' '}
            <Link href="/cookies" className="cookie-link">
              Cookie Policy
            </Link>.
          </p>
        </div>
        <div className="cookie-actions">
          <button onClick={handleDecline} className="btn btn-outline">
            Decline All
          </button>
          <button onClick={handleAccept} className="btn btn-primary">
            Accept All
          </button>
        </div>
      </div>
      <style jsx>{`
        .cookie-consent {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: var(--bg-card);
          border-top: var(--border-brutal);
          padding: var(--spacing-md) 0;
          z-index: 9999;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
        }
        .cookie-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-xl);
          flex-wrap: wrap;
        }
        .cookie-content {
          flex: 1;
          min-width: 300px;
        }
        .cookie-title {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-xs);
        }
        .cookie-text {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .cookie-link {
          color: var(--primary-color);
          font-weight: 700;
          text-decoration: underline;
        }
        .cookie-actions {
          display: flex;
          gap: var(--spacing-sm);
        }
        @media (max-width: 768px) {
          .cookie-container {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-md);
          }
          .cookie-actions {
            width: 100%;
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
}

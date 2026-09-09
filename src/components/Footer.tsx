'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [consentGiven, setConsentGiven] = useState(false);
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) {
      alert("Please consent to the processing of your data to submit the form.");
      return;
    }
    alert("Thank you! Your message has been sent.");
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col">
            <h3 className="footer-logo">Biz<span className="logo-accent">Dial</span></h3>
            <p className="footer-desc">
              Your trusted local business directory. Find, review, and connect with the best services around you.
            </p>
            <div className="business-details">
              <p><strong>BizDial Inc.</strong></p>
              <p>123 Directory Lane, Suite 400</p>
              <p>New York, NY 10001, USA</p>
              <p>Email: contact@bizdial.example.com</p>
              <p>Registration No: 123456789</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/search">Search</Link></li>
              <li><Link href="/">Categories</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="footer-col">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/cookies">Cookie Policy</Link></li>
              <li><Link href="/refunds">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="footer-col">
            <h4 className="footer-title">Contact Us</h4>
            <form onSubmit={handleContactSubmit} className="contact-form">
              <div className="input-group">
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Your Email" 
                  className="input-field"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea 
                  id="message" 
                  placeholder="Your Message" 
                  className="input-field" 
                  rows={2}
                  required
                ></textarea>
              </div>
              <div className="consent-group">
                <input 
                  type="checkbox" 
                  id="consent" 
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  required
                />
                <label htmlFor="consent">
                  I consent to the processing of my data to receive a response as outlined in the <Link href="/privacy" className="inline-link">Privacy Policy</Link>.
                </label>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Send Message</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BizDial Inc. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: var(--bg-card);
          border-top: var(--border-brutal);
          padding: var(--spacing-2xl) 0 var(--spacing-md);
          margin-top: auto;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-xl);
          margin-bottom: var(--spacing-2xl);
        }
        .footer-logo {
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--text-primary);
          text-transform: uppercase;
          margin-bottom: var(--spacing-sm);
        }
        .logo-accent {
          color: var(--bg-card);
          background-color: var(--primary-color);
          padding: 0 4px;
          margin-left: 2px;
          display: inline-block;
          transform: rotate(-2deg);
        }
        .footer-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: var(--spacing-md);
        }
        .business-details p {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.6;
        }
        .footer-title {
          font-size: 1.1rem;
          font-weight: 800;
          margin-bottom: var(--spacing-md);
          text-transform: uppercase;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }
        .footer-links a {
          color: var(--text-secondary);
          font-weight: 600;
          transition: color var(--transition-fast);
        }
        .footer-links a:hover {
          color: var(--primary-color);
          text-decoration: underline;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        .consent-group {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-xs);
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .consent-group input[type="checkbox"] {
          margin-top: 3px;
        }
        .inline-link {
          color: var(--primary-color);
          text-decoration: underline;
        }
        .btn-block {
          width: 100%;
        }
        .footer-bottom {
          padding-top: var(--spacing-md);
          border-top: 2px solid var(--border-light);
          text-align: center;
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
        }
      `}</style>
    </footer>
  );
}

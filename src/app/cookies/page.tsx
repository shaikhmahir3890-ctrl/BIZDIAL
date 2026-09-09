import React from 'react';

export default function CookiePolicy() {
  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
      <h1 className="section-title">Cookie Policy</h1>
      <p style={{ marginBottom: '1rem' }}>Last Updated: {new Date().toLocaleDateString()}</p>
      
      <div className="content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>1. What Are Cookies</h2>
          <p>Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used to make websites work or work more efficiently, as well as to provide reporting information.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>2. How We Use Cookies</h2>
          <p>We use cookies to:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginTop: '0.5rem' }}>
            <li>Remember your preferences (e.g., language or theme settings).</li>
            <li>Understand how you use our site so we can improve it (analytics).</li>
            <li>Ensure the website functions securely and correctly (essential cookies).</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>3. Types of Cookies We Use</h2>
          <p><strong>Essential Cookies:</strong> Required for the basic operation of our site. You cannot opt out of these.</p>
          <p><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site. These are optional and require your consent.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>4. Managing Your Cookies</h2>
          <p>You can adjust your cookie preferences at any time by using our cookie consent banner or modifying your browser settings to block or delete cookies.</p>
        </section>
      </div>
    </div>
  );
}

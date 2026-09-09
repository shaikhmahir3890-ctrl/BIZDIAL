import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
      <h1 className="section-title">Privacy Policy</h1>
      <p style={{ marginBottom: '1rem' }}>Last Updated: {new Date().toLocaleDateString()}</p>
      
      <div className="content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>1. Introduction</h2>
          <p>Welcome to BizDial. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>2. Data We Collect</h2>
          <p>We only collect data that is strictly necessary for the operation of our services. This may include:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginTop: '0.5rem' }}>
            <li>Contact data (such as email address) if you voluntarily use our contact forms.</li>
            <li>Usage data (how you interact with our website), if you consent to cookies.</li>
            <li>Technical data (IP address, browser type) for security and functional purposes.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>3. How We Use Your Data</h2>
          <p>We use your data only to provide and improve our services, communicate with you, and ensure legal and security compliance. We do not sell your personal data to third parties.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>4. Your Legal Rights</h2>
          <p>Depending on your location, you may have rights under data protection laws (e.g., GDPR, CCPA) in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, or to object to processing. To exercise these rights, please contact us.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>5. Contact Us</h2>
          <p>If you have any questions about this privacy policy or our privacy practices, please contact our Data Privacy Manager at legal@bizdial.example.com.</p>
        </section>
      </div>
    </div>
  );
}

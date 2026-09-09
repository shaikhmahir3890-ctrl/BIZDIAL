import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
      <h1 className="section-title">Terms and Conditions</h1>
      <p style={{ marginBottom: '1rem' }}>Last Updated: {new Date().toLocaleDateString()}</p>
      
      <div className="content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>1. Agreement to Terms</h2>
          <p>By accessing or using our website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on BizDial&apos;s website for personal, non-commercial transitory viewing only.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>3. Disclaimer</h2>
          <p>The materials on BizDial&apos;s website are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>4. Limitations</h2>
          <p>In no event shall BizDial or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>
        </section>
      </div>
    </div>
  );
}

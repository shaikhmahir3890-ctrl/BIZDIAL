import React from 'react';

export default function RefundPolicy() {
  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
      <h1 className="section-title">Refund Policy</h1>
      <p style={{ marginBottom: '1rem' }}>Last Updated: {new Date().toLocaleDateString()}</p>
      
      <div className="content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>1. General Policy</h2>
          <p>We want you to be completely satisfied with our services. If you are not satisfied, we offer a refund policy subject to the terms below.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>2. Eligibility for Refunds</h2>
          <p>You may be eligible for a refund if:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginTop: '0.5rem' }}>
            <li>You request the refund within 14 days of your initial purchase.</li>
            <li>The service was not provided as described.</li>
            <li>You have experienced technical issues that we are unable to resolve.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>3. Non-Refundable Items</h2>
          <p>Certain services or promotional items may be marked as non-refundable. Any such conditions will be clearly stated at the time of purchase.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>4. Requesting a Refund</h2>
          <p>To request a refund, please contact our support team at billing@bizdial.example.com with your order details and reason for the request. We will review and process valid requests within 5-7 business days.</p>
        </section>
      </div>
    </div>
  );
}

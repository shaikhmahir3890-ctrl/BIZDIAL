"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup functionality
    alert(`Account created for ${name}!`);
    window.location.href = '/';
  };

  return (
    <div className="auth-page container animate-fade-in" style={{ padding: 'var(--spacing-2xl) var(--spacing-md)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="auth-card" style={{ maxWidth: '450px', width: '100%', backgroundColor: 'var(--bg-card)', padding: 'var(--spacing-xl)', border: 'var(--border-brutal)', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-xs)' }}>Join BizDial</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Create an account to review and save businesses.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          <div className="input-group">
            <label htmlFor="name" style={{ fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase' }}>Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email" style={{ fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase' }}>Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" style={{ fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase' }}>Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--spacing-sm)', padding: 'var(--spacing-md)' }}>
            Create Account
          </button>
        </form>

        <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center', fontSize: '0.95rem' }}>
          <p>
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'var(--primary-color)', fontWeight: 800, textDecoration: 'underline' }}>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

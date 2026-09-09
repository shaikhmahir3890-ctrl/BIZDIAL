"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';

export default function LoginPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login functionality
    alert(`Logged in with ${email}`);
    window.location.href = '/';
  };

  return (
    <div className="auth-page container animate-fade-in" style={{ padding: 'var(--spacing-2xl) var(--spacing-md)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="auth-card" style={{ maxWidth: '450px', width: '100%', backgroundColor: 'var(--bg-card)', padding: 'var(--spacing-xl)', border: 'var(--border-brutal)', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-xs)' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Enter your details to access your account.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
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
            <label htmlFor="password" style={{ fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              Password
              <a href="#" style={{ color: 'var(--primary-color)', textDecoration: 'underline', textTransform: 'none', fontWeight: 600 }}>Forgot?</a>
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--spacing-sm)', padding: 'var(--spacing-md)' }}>
            Sign In
          </button>
        </form>

        <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center', fontSize: '0.95rem' }}>
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/signup" style={{ color: 'var(--primary-color)', fontWeight: 800, textDecoration: 'underline' }}>
              {t('signUp')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

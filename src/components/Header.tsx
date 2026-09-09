'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLanguage, Language } from '@/lib/i18n';
import { useTheme } from 'next-themes';

export default function Header() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('New York');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}&loc=${encodeURIComponent(location)}`;
    }
  };

  return (
    <header className="header">
      <div className="container header-container flex-between">
        <Link href="/" className="logo">
          Biz<span className="logo-accent">Dial</span>
        </Link>

        <form onSubmit={handleSearch} className="search-bar">
          <div className="search-input-group">
            <span className="search-icon" aria-hidden="true">📍</span>
            <label htmlFor="location" className="sr-only" style={{position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0}}>City or Location</label>
            <input
              id="location"
              type="text"
              placeholder={t('cityPlaceholder')}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="search-input loc-input"
            />
          </div>
          <div className="search-divider"></div>
          <div className="search-input-group flex-1">
            <span className="search-icon" aria-hidden="true">🔍</span>
            <label htmlFor="search" className="sr-only" style={{position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0}}>Search for businesses or services</label>
            <input
              id="search"
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <button type="submit" className="btn btn-primary search-btn">
            {t('searchBtn')}
          </button>
        </form>

        <div className="header-actions">
          {mounted && (
            <button 
              className="btn btn-icon" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          )}
          
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="lang-select"
            aria-label="Select Language"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
          </select>

          <Link href="/" className="btn btn-outline" aria-label="Go to Home Page">Home</Link>
          <Link href="/login" className="btn btn-outline" aria-label="Log In to your account">{t('logIn')}</Link>
          <Link href="/signup" className="btn btn-primary" aria-label="Sign Up for a new account">{t('signUp')}</Link>
        </div>
      </div>
      
    </header>
  );
}

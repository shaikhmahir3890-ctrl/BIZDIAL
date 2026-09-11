"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchCategories, fetchBusinesses, Business } from '@/lib/api';
import { useLanguage } from '@/lib/i18n';

// Card hover accent colors for variety
const accentColors = [
  '#ff6b2b', '#4361ee', '#06d6a0', '#ffd166',
  '#ef476f', '#4cc9f0', '#9d4edd', '#ff9f1c',
  '#2ec4b6', '#e71d36', '#3a86ff', '#8338ec',
  '#fb5607', '#06d6a0', '#ff006e', '#118ab2'
];

export default function Home() {
  const { t } = useLanguage();
  
  const [categories, setCategories] = useState<any[]>([]);
  const [mockBusinesses, setMockBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [cats, bizs] = await Promise.all([
        fetchCategories(),
        fetchBusinesses()
      ]);
      setCategories(cats);
      setMockBusinesses(bizs);
    };
    loadData();
  }, []);

  // Display 16 featured businesses (1 per category)
  const featuredBusinesses = useMemo(() => 
    mockBusinesses.filter((biz, index, self) => 
      self.findIndex(b => b.category === biz.category) === index
    ).slice(0, 16),
  [mockBusinesses]);

  // Track active preview image for each business card (defaulting to index 0)
  const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});

  const handleThumbSelect = (bizId: string, imgIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndices(prev => ({ ...prev, [bizId]: imgIndex }));
  };

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <h1 className="hero-title">{t('heroTitle')}</h1>
          <p className="hero-subtitle">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Popular Categories - JustDial Reference Layout & Rich Hover */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">{t('popularCategories')}</h2>
          <div className="categories-grid">
            {categories.map((cat, i) => {
              const accent = accentColors[i % accentColors.length];
              return (
                <Link
                  href={`/search?cat=${cat.id}`}
                  key={cat.id}
                  className="category-card"
                  id={`cat-${cat.id}`}
                >
                  <div
                    className="category-icon-box"
                    style={{
                      '--hover-bg': `${accent}18`,
                    } as React.CSSProperties}
                  >
                    <span className="category-emoji">{cat.icon}</span>
                  </div>
                  <span className="category-name">{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Stats Strip */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card" style={{ backgroundColor: '#ff6b2b' }}>
              <span className="stat-number">10K+</span>
              <span className="stat-label">Businesses</span>
            </div>
            <div className="stat-card" style={{ backgroundColor: '#4361ee' }}>
              <span className="stat-number">50K+</span>
              <span className="stat-label">Verified Reviews</span>
            </div>
            <div className="stat-card" style={{ backgroundColor: '#06d6a0' }}>
              <span className="stat-number">100+</span>
              <span className="stat-label">Cities Covered</span>
            </div>
            <div className="stat-card" style={{ backgroundColor: '#ffd166', color: '#1a1a2e' }}>
              <span className="stat-number">4.8★</span>
              <span className="stat-label">Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Businesses with Multi-Image Gallery Previews */}
      <section className="featured-section">
        <div className="container">
          <div className="featured-header">
            <div>
              <h2 className="section-title" style={{ marginBottom: '8px' }}>
                {t('featuredBusinesses')}
              </h2>
              <p className="featured-subtitle">
                Explore top-rated verified local spots with real photos and community reviews
              </p>
            </div>
            <Link href="/search" className="btn btn-outline">
              View All Businesses →
            </Link>
          </div>

          <div className="business-grid">
            {featuredBusinesses.map((biz) => {
              const imagesList = biz.images && biz.images.length > 0 ? biz.images : [biz.image];
              const activeIndex = activeImageIndices[biz.id] ?? 0;
              const currentImage = imagesList[activeIndex] || biz.image;

              return (
                <div key={biz.id} className="business-card" id={`biz-${biz.id}`}>
                  {/* Hero Image Container */}
                  <Link href={`/business/${biz.id}`} className="business-image-container" aria-label={`View details for ${biz.name}`}>
                    <div className="business-image" role="img" aria-label={`${biz.name} main image`}>
                      <Image 
                        src={currentImage} 
                        alt={`${biz.name} main image`} 
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="business-image-overlay">
                      <span className="view-badge">View Details →</span>
                    </div>
                    {biz.openNow && <span className="badge-open">{t('openNow')}</span>}
                    <span className="badge-photo-count">
                      📷 {imagesList.length} Photos
                    </span>
                  </Link>

                  {/* Thumbnail Previews Strip */}
                  <div className="business-thumbnails-strip">
                    {imagesList.map((thumbUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`business-thumb-btn ${idx === activeIndex ? 'active' : ''}`}
                        onClick={(e) => handleThumbSelect(biz.id, idx, e)}
                        title={`View photo ${idx + 1}`}
                        aria-label={`View photo ${idx + 1} of ${biz.name}`}
                      >
                        <Image 
                          src={thumbUrl} 
                          alt={`${biz.name} preview ${idx + 1}`} 
                          width={60} 
                          height={40} 
                          style={{ objectFit: 'cover' }}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Card Content */}
                  <div className="business-content">
                    <span className="business-cat-pill">{biz.category}</span>
                    <Link href={`/business/${biz.id}`}>
                      <h3 className="business-name">{biz.name}</h3>
                    </Link>

                    <div className="business-rating-row">
                      <span className="business-rating">
                        <span className="star">⭐</span> {biz.rating}
                      </span>
                      <span className="reviews-badge">
                        ({biz.reviewsCount} {t('reviews')})
                      </span>
                    </div>

                    <p className="business-address">
                      <span>📍</span> {biz.address}
                    </p>

                    <p className="business-desc">
                      {biz.description}
                    </p>

                    <div className="business-card-footer">
                      <span className="business-phone">📞 {biz.phone}</span>
                      <Link href={`/business/${biz.id}`} className="explore-link" aria-label={`Explore ${biz.name}`}>
                        Explore →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

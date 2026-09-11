"use client";

import { use, useState, useEffect } from 'react';
import { fetchBusinessById, Business } from '@/lib/api';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/lib/i18n';

export default function BusinessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { t } = useLanguage();
  
  const [business, setBusiness] = useState<Business | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const biz = await fetchBusinessById(resolvedParams.id);
      if (biz) {
        setBusiness(biz);
        const imagesList = biz.images && biz.images.length > 0 ? biz.images : [biz.image];
        setSelectedImage(imagesList[0]);
      }
      setLoading(false);
    };
    loadData();
  }, [resolvedParams.id]);

  if (loading) {
    return <div className="container mt-8"><p>Loading business details...</p></div>;
  }

  if (!business) {
    notFound();
  }

  const imagesList = business.images && business.images.length > 0 ? business.images : [business.image];

  return (
    <div className="business-page animate-fade-in">
      {/* Hero with interactive active photo */}
      <div className="business-hero" role="img" aria-label={`${business.name} featured image`} style={{ backgroundImage: `url(${selectedImage})` }}>
        <div className="hero-overlay">
          <div className="container hero-content">
            <span className="tag">{business.category}</span>
            <h1 className="business-title">{business.name}</h1>
            <div className="business-meta">
              <span className="rating">
                <span className="star">⭐</span> {business.rating} ({business.reviewsCount} {t('reviews')})
              </span>
              <span className="status">
                {business.openNow ? (
                  <span className="text-accent">{t('openNow')}</span>
                ) : (
                  <span className="text-error">{t('closed')}</span>
                )}
              </span>
              <span className="badge-photo-count" style={{ position: 'static' }}>
                📷 {imagesList.length} Photos
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container page-layout">
        <main className="main-content">
          {/* Photo Gallery Section */}
          <section className="section gallery-section">
            <h2 className="section-title">Photo Gallery ({imagesList.length})</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '12px', fontSize: '0.95rem' }}>
              Click any photo to view in main banner
            </p>
            <div className="gallery-grid">
              {imagesList.map((imgUrl, index) => (
                <div
                  key={index}
                  className={`gallery-thumb-wrap ${selectedImage === imgUrl ? 'active' : ''}`}
                  onClick={() => setSelectedImage(imgUrl)}
                  title={`Click to view photo ${index + 1}`}
                  style={{
                    borderWidth: selectedImage === imgUrl ? '4px' : '3px',
                    borderColor: selectedImage === imgUrl ? 'var(--primary-color)' : 'var(--border-light)'
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgUrl} alt={`${business.name} view ${index + 1}`} />
                </div>
              ))}
            </div>
          </section>

          {/* About Section */}
          <section className="section about-section">
            <h2 className="section-title">{t('aboutBusiness')}</h2>
            <p className="description">{business.description}</p>
          </section>

          {/* Reviews Section */}
          <section className="section reviews-section">
            <div className="reviews-header flex-between">
              <h2 className="section-title">{t('reviews')}</h2>
              <button className="btn btn-outline">{t('writeReview')}</button>
            </div>
            
            <div className="reviews-list">
              {business.reviews && business.reviews.length > 0 ? (
                business.reviews.map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-meta">
                      <div className="reviewer-avatar">
                        {review.author.charAt(0)}
                      </div>
                      <div className="reviewer-info">
                        <span className="reviewer-name">{review.author}</span>
                        <span className="review-date">{review.date}</span>
                      </div>
                    </div>
                    <div className="review-rating">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="star">
                          {i < review.rating ? '⭐' : '☆'}
                        </span>
                      ))}
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))
              ) : (
               <p>{t('noReviewsYet')}</p>
              )}
            </div>
          </section>
        </main>

        {/* Sidebar Info */}
        <aside className="sidebar">
          <div className="contact-card">
            <h3 className="card-title">{t('contactInfo')}</h3>
            <ul className="contact-list">
              <li>
                <span className="icon">📍</span>
                <span>{business.address}</span>
              </li>
              <li>
                <span className="icon">📞</span>
                <span>{business.phone}</span>
              </li>
              <li>
                <span className="icon" aria-hidden="true">🌐</span>
                <a href={`http://${business.website}`} target="_blank" rel="noopener noreferrer" className="link" aria-label={`Visit ${business.name} website`}>
                  {business.website}
                </a>
              </li>
            </ul>
            <div className="action-buttons">
              <button className="btn btn-primary btn-block">{t('callNow')}</button>
              <button className="btn btn-outline btn-block">{t('getDirections')}</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

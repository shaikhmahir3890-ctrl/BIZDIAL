"use client";

import { use } from 'react';
import { searchBusinesses, getBusinessesByCategory } from '@/lib/mock-data';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useLanguage } from '@/lib/i18n';

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string; loc?: string }>;
}) {
  const resolvedParams = use(searchParams);
  const { t } = useLanguage();
  const query = resolvedParams.q || '';
  const categoryId = resolvedParams.cat || '';
  const location = resolvedParams.loc || 'Any Location';

  if (!query && !categoryId) {
    redirect('/');
  }

  let results = [];
  let title = '';

  if (categoryId) {
    results = getBusinessesByCategory(categoryId);
    // Find category name to display in title
    title = `Category: ${categoryId}`;
  } else if (query) {
    results = searchBusinesses(query);
    title = `Results for "${query}" in ${location}`;
  }

  return (
    <div className="search-page container animate-fade-in">
      <div className="search-header">
        <h1 className="search-title">{title}</h1>
        <p className="search-meta">{t('foundBusinesses', results.length)}</p>
      </div>

      <div className="search-content">
        <aside className="filters">
          <h3 className="filter-title">{t('filters')}</h3>
          
          <div className="filter-group">
            <h4 className="filter-subtitle">{t('sortBy')}</h4>
            <label className="filter-label">
              <input type="radio" name="sort" defaultChecked /> {t('relevancy')}
            </label>
            <label className="filter-label">
              <input type="radio" name="sort" /> {t('highestRated')}
            </label>
            <label className="filter-label">
              <input type="radio" name="sort" /> {t('mostReviewed')}
            </label>
          </div>

          <div className="filter-group">
            <h4 className="filter-subtitle">{t('status')}</h4>
            <label className="filter-label">
              <input type="checkbox" /> {t('openNow')}
            </label>
          </div>
        </aside>

        <main className="results-list">
          {results.length > 0 ? (
            results.map((biz) => (
              <Link href={`/business/${biz.id}`} key={biz.id} className="result-card">
                <div className="result-image" style={{ backgroundImage: `url(${biz.image})` }}>
                  {biz.openNow && <span className="badge-open">{t('openNow')}</span>}
                </div>
                <div className="result-details">
                  <h2 className="result-name">{biz.name}</h2>
                  <div className="result-rating">
                    <span className="star">⭐</span> {biz.rating} <span className="reviews-count">({biz.reviewsCount} {t('reviews')})</span>
                  </div>
                  <p className="result-address">📍 {biz.address}</p>
                  <p className="result-desc">{biz.description}</p>
                  <div className="result-tags">
                    <span className="tag">{biz.category}</span>
                  </div>
                </div>
                <div className="result-actions">
                  <button className="btn btn-primary btn-block">{t('contact')}</button>
                  <button className="btn btn-outline btn-block">{t('viewProfile')}</button>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-results">
              <h2>{t('noBusinessesFound')}</h2>
              <p>{t('tryAdjusting')}</p>
              <Link href="/" className="btn btn-primary mt-4">{t('goBackHome')}</Link>
            </div>
          )}
        </main>
      </div>

    </div>
  );
}

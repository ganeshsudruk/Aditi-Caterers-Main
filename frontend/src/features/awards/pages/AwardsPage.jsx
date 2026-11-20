import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

import '../styles/awards.css';

import AwardsHero from '../components/AwardsHero';
import AwardsIntroduction from '../components/AwardsIntroduction';
import AwardsGrid from '../components/AwardsGrid';
import AwardImageLightbox from '../components/AwardImageLightbox';
import AwardsCTA from '../components/AwardsCTA';

export default function AwardsPage() {
  const { language, t } = useLanguage();

  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState(null); // null = closed

  // Set document title
  useEffect(() => {
    document.title = t.awardsPage?.metaTitle || 'Awards & Recognition | Aditi Caterers';
  }, [language, t]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Fetch published awards from API
  const fetchAwards = useCallback(() => {
    setLoading(true);
    setError(false);

    fetch('/api/awards')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // Support both { awards: [] } and [] response shapes
        const list = Array.isArray(data) ? data : (data.awards || data.data || []);
        // Sort by displayOrder ascending
        list.sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
        setAwards(list);
      })
      .catch(() => {
        try {
          const stored = localStorage.getItem('aditi_admin_awards');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const published = parsed
                .filter((a) => a.status === 'published')
                .map((a) => ({
                  ...a,
                  year: a.awardYear || (a.awardDate ? new Date(a.awardDate).getFullYear() : a.year),
                  organization: a.issuingOrganization || a.organization,
                }))
                .sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
              setAwards(published);
              return;
            }
          }
        } catch {
          // ignore
        }
        setError(true);
        setAwards([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchAwards();
  }, [fetchAwards]);

  // Lightbox handlers
  const openLightbox = useCallback((award) => {
    const idx = awards.findIndex(
      (a) => (a._id || a.id) === (award._id || award.id)
    );
    if (idx !== -1) setLightboxIndex(idx);
  }, [awards]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goToPrev = useCallback(() => {
    setLightboxIndex((i) => (i > 0 ? i - 1 : i));
  }, []);

  const goToNext = useCallback(() => {
    setLightboxIndex((i) => (i < awards.length - 1 ? i + 1 : i));
  }, [awards.length]);

  const errorText = t.awardsPage?.error || {};

  return (
    <>
      {/* 1. Hero */}
      <AwardsHero />

      {/* 2. Introduction */}
      <AwardsIntroduction />

      {/* 3. Awards Gallery or Error State */}
      {error ? (
        <section className="py-5" style={{ backgroundColor: 'var(--ac-bg-light, #fdf8f0)' }}>
          <div className="container-xl py-4 text-center">
            <i
              className="bi bi-exclamation-triangle-fill mb-3 d-block"
              style={{ fontSize: '3rem', color: 'var(--ac-maroon, #641e2b)', opacity: 0.5 }}
              aria-hidden="true"
            />
            <h2 className="h4 fw-bold text-muted mb-2">
              {errorText.heading || (language === 'mr' ? 'पुरस्कार लोड करता आले नाहीत' : 'Could Not Load Awards')}
            </h2>
            <p className="text-muted mb-4" style={{ maxWidth: '480px', margin: '0 auto 1.5rem' }}>
              {errorText.description || (language === 'mr'
                ? 'सध्या पुरस्कारांची माहिती लोड करता आली नाही. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.'
                : "We couldn't load the awards right now. Please try again later.")}
            </p>
            <button
              type="button"
              className="btn rounded-pill px-4 py-2 fw-semibold text-white"
              style={{ backgroundColor: 'var(--ac-maroon, #641e2b)' }}
              onClick={fetchAwards}
            >
              <i className="bi bi-arrow-clockwise me-2" aria-hidden="true" />
              {errorText.retry || (language === 'mr' ? 'पुन्हा प्रयत्न करा' : 'Try Again')}
            </button>
          </div>
        </section>
      ) : (
        <AwardsGrid
          awards={awards}
          loading={loading}
          onViewAward={openLightbox}
        />
      )}

      {/* 4. CTA */}
      <AwardsCTA />

      {/* 5. Lightbox — only awards with images are lightbox-viewable */}
      {lightboxIndex !== null && awards.length > 0 && (
        <AwardImageLightbox
          awards={awards.filter((a) => a.image?.url)}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
        />
      )}
    </>
  );
}

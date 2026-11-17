import { useEffect, useCallback } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function AwardImageLightbox({ awards, currentIndex, onClose, onPrev, onNext }) {
  const { language, t } = useLanguage();
  const lbText = t.awardsPage?.lightbox || {};
  const cardText = t.awardsPage?.card || {};

  const award = awards[currentIndex];
  if (!award) return null;

  const title = award.title?.[language] || award.title?.en || '';
  const imgAlt = award.image?.alt?.[language] || award.image?.alt?.en || title;
  const closeLabel = lbText.close || (language === 'mr' ? 'बंद करा' : 'Close');
  const prevLabel = lbText.prev || (language === 'mr' ? 'मागील पुरस्कार' : 'Previous award');
  const nextLabel = lbText.next || (language === 'mr' ? 'पुढील पुरस्कार' : 'Next award');
  const yearLabel = cardText.year || (language === 'mr' ? 'वर्ष' : 'Year');
  const orgLabel = cardText.organization || (language === 'mr' ? 'पुरस्कारदाता' : 'Awarded by');

  // Keyboard navigation
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < awards.length - 1;

  return (
    <div
      className="ac-lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${language === 'mr' ? 'पुरस्कार छायाचित्र दर्शक' : 'Award image viewer'}: ${title}`}
    >
      {/* Close Button */}
      <button
        type="button"
        className="ac-lightbox-close"
        onClick={onClose}
        aria-label={closeLabel}
      >
        <i className="bi bi-x-lg" />
      </button>

      {/* Prev Button */}
      {hasPrev && (
        <button
          type="button"
          className="ac-lightbox-nav prev"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label={prevLabel}
        >
          <i className="bi bi-chevron-left" />
        </button>
      )}

      {/* Image Container */}
      <div
        className="ac-lightbox-container"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={award.image?.url}
          alt={imgAlt}
          className="ac-lightbox-img"
        />

        {/* Caption */}
        <div className="ac-lightbox-caption">
          <p className="fw-bold mb-1 fs-6">{title}</p>
          <div className="d-flex justify-content-center gap-3 small text-white-50 flex-wrap">
            {award.year && (
              <span><i className="bi bi-calendar3 me-1" />{yearLabel}: {award.year}</span>
            )}
            {award.organization && (
              <span><i className="bi bi-award me-1" />{orgLabel}: {award.organization}</span>
            )}
          </div>
          <p className="small text-white-50 mt-1">
            {currentIndex + 1} / {awards.length}
          </p>
        </div>
      </div>

      {/* Next Button */}
      {hasNext && (
        <button
          type="button"
          className="ac-lightbox-nav next"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label={nextLabel}
        >
          <i className="bi bi-chevron-right" />
        </button>
      )}
    </div>
  );
}

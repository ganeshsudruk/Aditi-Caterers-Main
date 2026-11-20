import { useEffect, useCallback } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function GalleryLightbox({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  categoryMap = {},
}) {
  const { language, t } = useLanguage();
  const lbText = t.galleryPage?.lightbox || {};

  const item = items[currentIndex];

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (!item) return;

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [item, handleKeyDown]);

  if (!item) return null;

  const title = item.title?.[language] || item.title?.en || '';
  const caption = item.caption?.[language] || item.caption?.en || '';
  const altText = item.image?.alt?.[language] || item.image?.alt?.en || title;
  const categoryName = categoryMap[item.category] || '';

  const closeLabel = lbText.close || (language === 'mr' ? 'बंद करा' : 'Close');
  const prevLabel = lbText.prev || (language === 'mr' ? 'मागील' : 'Previous');
  const nextLabel = lbText.next || (language === 'mr' ? 'पुढील' : 'Next');
  const ofText = lbText.of || (language === 'mr' ? 'पैकी' : 'of');

  const hasPrev = items.length > 1;
  const hasNext = items.length > 1;

  return (
    <div
      className="ac-gallery-lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${language === 'mr' ? 'छायाचित्र दर्शक' : 'Photo Viewer'}: ${title}`}
    >
      {/* Close Button */}
      <button
        type="button"
        className="ac-gallery-lightbox-close"
        onClick={onClose}
        aria-label={closeLabel}
        title={closeLabel}
      >
        <i className="bi bi-x-lg" />
      </button>

      {/* Prev Button */}
      {hasPrev && (
        <button
          type="button"
          className="ac-gallery-lightbox-nav prev"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label={prevLabel}
          title={prevLabel}
        >
          <i className="bi bi-chevron-left" />
        </button>
      )}

      {/* Main Image Container */}
      <div
        className="ac-gallery-lightbox-container"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.image?.url}
          alt={altText}
          className="ac-gallery-lightbox-img"
        />

        {/* Caption & Metadata */}
        <div className="ac-gallery-lightbox-caption">
          <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap mb-1">
            {categoryName && (
              <span className="badge bg-danger bg-opacity-75 px-3 py-1 rounded-pill small">
                {categoryName}
              </span>
            )}
            {item.location && (
              <span className="badge bg-dark bg-opacity-75 px-3 py-1 rounded-pill small">
                <i className="bi bi-geo-alt-fill me-1" />
                {item.location}
              </span>
            )}
          </div>

          <h4 className="fw-bold fs-5 mb-1">{title}</h4>
          {caption && <p className="small text-white-50 mb-1">{caption}</p>}
          <span className="small text-white-50">
            {currentIndex + 1} {ofText} {items.length}
          </span>
        </div>
      </div>

      {/* Next Button */}
      {hasNext && (
        <button
          type="button"
          className="ac-gallery-lightbox-nav next"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label={nextLabel}
          title={nextLabel}
        >
          <i className="bi bi-chevron-right" />
        </button>
      )}
    </div>
  );
}

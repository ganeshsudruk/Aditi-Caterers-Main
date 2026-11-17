import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function ServiceDetailGallery({ service }) {
  const { language } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(null);

  if (!service || !service.gallery || service.gallery.length === 0) {
    return null;
  }

  const items = service.gallery;
  const openLightbox = (idx) => setActiveIdx(idx);
  const closeLightbox = () => setActiveIdx(null);

  const showNext = useCallback(() => {
    setActiveIdx((prev) => (prev === null ? null : (prev + 1) % items.length));
  }, [items.length]);

  const showPrev = useCallback(() => {
    setActiveIdx((prev) => (prev === null ? null : (prev - 1 + items.length) % items.length));
  }, [items.length]);

  useEffect(() => {
    if (activeIdx === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx, showNext, showPrev]);

  return (
    <section className="py-5 ac-bg-light" aria-label="Service Visual Gallery">
      <div className="container-xl py-3">
        {/* Section Heading */}
        <SectionHeading
          tag={language === 'mr' ? 'छायाचित्रे' : 'Event Moments'}
          title={language === 'mr' ? 'या सेवेतील काही खास क्षण' : 'Moments from This Service'}
          centered={true}
        />

        {/* Gallery Grid */}
        <div className="row g-3 g-md-4 mt-2 justify-content-center">
          {items.map((item, idx) => {
            const caption = item.caption?.[language] || item.caption?.en;

            return (
              <div key={idx} className="col-12 col-sm-6 col-lg-4">
                <div
                  className="ac-gallery-card shadow-sm"
                  onClick={() => openLightbox(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox(idx)}
                  aria-label={`View ${caption}`}
                >
                  <img
                    src={item.url}
                    alt={caption}
                    loading="lazy"
                  />
                  <div className="ac-gallery-overlay">
                    <h3 className="h6 text-white mb-0 fw-semibold text-truncate">
                      {caption}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeIdx !== null && (
        <div className="ac-lightbox-backdrop" onClick={closeLightbox}>
          <div className="ac-lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="ac-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close image viewer"
            >
              <i className="bi bi-x-lg" />
            </button>

            {items.length > 1 && (
              <button
                type="button"
                className="ac-lightbox-nav prev"
                onClick={showPrev}
                aria-label="Previous image"
              >
                <i className="bi bi-chevron-left" />
              </button>
            )}

            <img
              src={items[activeIdx].url}
              alt={items[activeIdx].caption?.[language] || items[activeIdx].caption?.en}
              className="ac-lightbox-img"
            />

            {items.length > 1 && (
              <button
                type="button"
                className="ac-lightbox-nav next"
                onClick={showNext}
                aria-label="Next image"
              >
                <i className="bi bi-chevron-right" />
              </button>
            )}

            <div className="text-white mt-3 fs-6 fw-semibold">
              {items[activeIdx].caption?.[language] || items[activeIdx].caption?.en}
            </div>
            <div className="text-white-50 small">
              {activeIdx + 1} / {items.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

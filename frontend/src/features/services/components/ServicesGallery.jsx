import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';
import { defaultServicesGallery } from '../../../services/serviceService';

export default function ServicesGallery({ items = defaultServicesGallery }) {
  const { language, t } = useLanguage();
  const galleryText = t.servicesPage.gallery;
  const [activeIdx, setActiveIdx] = useState(null);

  const openLightbox = (idx) => setActiveIdx(idx);
  const closeLightbox = () => setActiveIdx(null);

  const showNext = useCallback(() => {
    setActiveIdx((prev) => (prev === null ? null : (prev + 1) % items.length));
  }, [items.length]);

  const showPrev = useCallback(() => {
    setActiveIdx((prev) => (prev === null ? null : (prev - 1 + items.length) % items.length));
  }, [items.length]);

  // Keyboard navigation
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
    <section className="py-5 ac-bg-light" id="services-gallery" aria-label="Services Food and Event Gallery">
      <div className="container-xl py-4">
        {/* Section Heading */}
        <SectionHeading
          tag={galleryText.tag}
          title={galleryText.heading}
          description={galleryText.description}
          centered={true}
        />

        {/* Gallery Grid */}
        <div className="row g-3 g-md-4 mt-2">
          {items.map((item, idx) => {
            const caption = item.caption?.[language] || item.caption?.en;
            const category = item.category?.[language] || item.category?.en;

            return (
              <div key={item.id || idx} className="col-12 col-sm-6 col-lg-4">
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
                    {category && (
                      <span className="badge bg-gold text-dark align-self-start mb-2 px-2 py-1 small fw-bold">
                        {category}
                      </span>
                    )}
                    <h3 className="h6 text-white mb-0 fw-semibold text-truncate">
                      {caption}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Gallery Link */}
        <div className="text-center mt-5">
          <Link
            to="/gallery"
            className="btn ac-btn-outline-maroon px-4 py-2 rounded-pill fw-semibold d-inline-flex align-items-center gap-2"
          >
            <span>{galleryText.viewAllBtn}</span>
            <i className="bi bi-arrow-right" />
          </Link>
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

            <button
              type="button"
              className="ac-lightbox-nav prev"
              onClick={showPrev}
              aria-label="Previous image"
            >
              <i className="bi bi-chevron-left" />
            </button>

            <img
              src={items[activeIdx].url}
              alt={items[activeIdx].caption?.[language] || items[activeIdx].caption?.en}
              className="ac-lightbox-img"
            />

            <button
              type="button"
              className="ac-lightbox-nav next"
              onClick={showNext}
              aria-label="Next image"
            >
              <i className="bi bi-chevron-right" />
            </button>

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

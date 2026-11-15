import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function AboutGallery({ gallery = [] }) {
  const { t, language } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const gal = t.aboutPage.gallery;

  const isOpen = lightboxIndex !== null && gallery[lightboxIndex];
  const activeItem = isOpen ? gallery[lightboxIndex] : null;

  const getTitle = (item) =>
    (language === 'mr' ? item?.title_mr : item?.title_en) || item?.title || '';

  const getCategory = (item) =>
    (language === 'mr' ? item?.category_mr : item?.category_en) || item?.category || '';

  const handleClose = useCallback(() => setLightboxIndex(null), []);

  const handlePrev = useCallback((e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
  }, [gallery.length]);

  const handleNext = useCallback((e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
  }, [gallery.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose, handlePrev, handleNext]);

  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="ac-about-gallery py-5 bg-white" aria-label="Moments from Our Catering Services">
      <div className="container-xl py-4">
        
        {/* Section Heading */}
        <SectionHeading
          tag={gal.tag}
          title={gal.heading}
          description={gal.description}
        />

        {/* Gallery Grid */}
        <div className="row g-4 mt-2">
          {gallery.map((item, index) => {
            const itemTitle = getTitle(item);
            const itemCategory = getCategory(item);

            return (
              <div key={item.id || index} className="col-lg-4 col-md-6">
                <div
                  className="ac-about-gallery-item position-relative overflow-hidden rounded-4 shadow-sm cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() => setLightboxIndex(index)}
                  onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(index)}
                  aria-label={`Open ${itemTitle}`}
                >
                  <img
                    src={item.image}
                    alt={itemTitle}
                    className="w-100 h-100 object-fit-cover ac-about-gallery-img transition"
                    loading="lazy"
                  />
                  <div className="ac-about-gallery-overlay position-absolute inset-0 d-flex flex-column justify-content-end p-4 text-white">
                    <span className="badge bg-gold text-dark align-self-start mb-2 px-2 py-1 rounded small">
                      {itemCategory}
                    </span>
                    <h3 className="h6 fw-bold mb-1 text-white">
                      {itemTitle}
                    </h3>
                    <small className="text-white-80 d-flex align-items-center gap-1">
                      <i className="bi bi-arrows-fullscreen" />
                      <span>{language === 'mr' ? 'मोठे पाहण्यासाठी क्लिक करा' : 'Click to enlarge'}</span>
                    </small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Gallery CTA */}
        <div className="text-center mt-5">
          <Link
            to="/gallery"
            className="btn ac-btn-outline-primary px-4 py-2 d-inline-flex align-items-center gap-2"
          >
            <i className="bi bi-images" />
            <span>{gal.viewAllBtn}</span>
          </Link>
        </div>

      </div>

      {/* Lightbox Modal */}
      {isOpen && activeItem && (
        <div
          className="ac-lightbox-backdrop position-fixed inset-0 d-flex align-items-center justify-content-center z-3"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={getTitle(activeItem)}
        >
          <button
            type="button"
            className="btn btn-dark btn-sm rounded-circle position-absolute top-0 end-0 m-4 p-2 ac-lightbox-btn"
            onClick={handleClose}
            aria-label="Close"
          >
            <i className="bi bi-x-lg fs-5" />
          </button>

          <button
            type="button"
            className="btn btn-dark btn-sm rounded-circle position-absolute start-0 top-50 translate-middle-y ms-3 p-3 ac-lightbox-btn"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <i className="bi bi-chevron-left fs-4" />
          </button>

          <div
            className="ac-lightbox-content position-relative p-2 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeItem.image}
              alt={getTitle(activeItem)}
              className="img-fluid rounded-3 shadow-lg ac-lightbox-main-img"
            />
            <div className="mt-3 text-white">
              <span className="badge bg-gold text-dark mb-1">{getCategory(activeItem)}</span>
              <h4 className="h6 text-white mb-0">{getTitle(activeItem)}</h4>
              <small className="text-white-50">
                {lightboxIndex + 1} / {gallery.length}
              </small>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-dark btn-sm rounded-circle position-absolute end-0 top-50 translate-middle-y me-3 p-3 ac-lightbox-btn"
            onClick={handleNext}
            aria-label="Next"
          >
            <i className="bi bi-chevron-right fs-4" />
          </button>
        </div>
      )}
    </section>
  );
}

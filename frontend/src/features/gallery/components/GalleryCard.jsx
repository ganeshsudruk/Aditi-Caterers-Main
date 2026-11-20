import { useLanguage } from '../../../context/LanguageContext';

export default function GalleryCard({ item, onClick, categoryName }) {
  const { language, t } = useLanguage();
  const cardText = t.galleryPage?.card || {};

  const title = item.title?.[language] || item.title?.en || '';
  const caption = item.caption?.[language] || item.caption?.en || '';
  const altText = item.image?.alt?.[language] || item.image?.alt?.en || title;
  const viewPhotoLabel = cardText.viewPhoto || (language === 'mr' ? 'फोटो पहा' : 'View Photo');

  return (
    <div className="col-12 col-sm-6 col-lg-4 d-flex">
      <article className="ac-gallery-card w-100">
        {/* Image Container with Zoom overlay */}
        <div
          className="ac-gallery-img-container"
          onClick={onClick}
          role="button"
          tabIndex={0}
          aria-label={`${viewPhotoLabel}: ${title}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick();
            }
          }}
        >
          {categoryName && (
            <span className="ac-gallery-tag">{categoryName}</span>
          )}

          {item.isFeatured && (
            <span className="ac-gallery-featured-badge">
              <i className="bi bi-star-fill me-1" aria-hidden="true" />
              {language === 'mr' ? 'खास' : 'Featured'}
            </span>
          )}

          <img
            src={item.image?.url}
            alt={altText}
            className="ac-gallery-img"
            loading="lazy"
          />

          <div className="ac-gallery-overlay" aria-hidden="true">
            <span className="ac-gallery-zoom-btn">
              <i className="bi bi-arrows-fullscreen" />
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="ac-gallery-card-body">
          <h3 className="ac-gallery-card-title">{title}</h3>
          {caption && <p className="ac-gallery-card-caption">{caption}</p>}

          <div className="ac-gallery-card-footer">
            {item.location && (
              <span className="d-inline-flex align-items-center gap-1">
                <i className="bi bi-geo-alt-fill text-danger" aria-hidden="true" />
                <span>{item.location}</span>
              </span>
            )}

            <button
              type="button"
              className="ac-gallery-view-link ms-auto"
              onClick={onClick}
              aria-label={`${viewPhotoLabel}: ${title}`}
            >
              <span>{viewPhotoLabel}</span>
              <i className="bi bi-arrow-right" aria-hidden="true" />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

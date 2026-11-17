import { useLanguage } from '../../../context/LanguageContext';

export default function AwardCard({ award, onView }) {
  const { language, t } = useLanguage();
  const cardText = t.awardsPage?.card || {};
  const galleryText = t.awardsPage?.gallery || {};

  const title = award.title?.[language] || award.title?.en || '';
  const description = award.description?.[language] || award.description?.en || '';
  const imgAlt = award.image?.alt?.[language] || award.image?.alt?.en || title;
  const imgUrl = award.image?.url || null;

  const viewLabel = galleryText.viewAward || (language === 'mr' ? 'पुरस्कार पहा' : 'View Award');
  const yearLabel = cardText.year || (language === 'mr' ? 'वर्ष' : 'Year');
  const orgLabel = cardText.organization || (language === 'mr' ? 'पुरस्कारदाता' : 'Awarded by');

  return (
    <div className="col-12 col-md-6 col-lg-4 d-flex">
      <article className="ac-award-card w-100 shadow-sm">
        {/* Image */}
        <div
          className="ac-award-img-wrapper"
          onClick={() => onView(award)}
          role="button"
          tabIndex={0}
          aria-label={`${language === 'mr' ? 'मोठे पाहा:' : 'View larger:'} ${title}`}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onView(award); }}
        >
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={imgAlt}
              loading="lazy"
            />
          ) : (
            <div className="ac-award-img-placeholder">
              <i className="bi bi-trophy-fill mb-2" style={{ fontSize: '3rem' }} />
              <span className="small">{title}</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="ac-award-card-body">
          {/* Year Badge */}
          {award.year && (
            <span className="ac-award-year-badge">
              <i className="bi bi-calendar3" aria-hidden="true" />
              <span>{yearLabel}: {award.year}</span>
            </span>
          )}

          {/* Organization */}
          {award.organization && (
            <p className="ac-award-org">
              <i className="bi bi-award me-1" aria-hidden="true" />
              {orgLabel}: <strong>{award.organization}</strong>
            </p>
          )}

          {/* Title */}
          <h3 className="ac-award-title">{title}</h3>

          {/* Description */}
          {description && (
            <p className="ac-award-desc">{description}</p>
          )}

          {/* View Award Button */}
          {imgUrl && (
            <button
              type="button"
              className="ac-award-view-btn"
              onClick={() => onView(award)}
              aria-label={`${viewLabel}: ${title}`}
            >
              <i className="bi bi-eye" aria-hidden="true" />
              {viewLabel}
            </button>
          )}
        </div>
      </article>
    </div>
  );
}

import { useState } from 'react';
import { REVIEW_EVENT_TYPES, REVIEW_SOURCES } from '../../../services/reviewAdminService';

function renderStars(rating) {
  if (!rating) return null;
  return (
    <div className="d-flex align-items-center gap-1 text-warning mb-2" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <i key={star} className={`bi ${star <= rating ? 'bi-star-fill' : 'bi-star'} fs-6`} />
      ))}
      <span className="ms-1 text-dark fw-bold small">({rating}.0)</span>
    </div>
  );
}

export default function ReviewPreviewModal({ isOpen, review, onClose }) {
  const [langMode, setLangMode] = useState('original'); // 'original' | 'en' | 'mr'

  if (!isOpen || !review) return null;

  // Resolve display name according to permission
  let publicName = review.customerDisplayName || 'Valued Customer';
  if (review.consent?.displayNamePermission === 'first_name_only' && publicName) {
    publicName = publicName.split(' ')[0] + '...';
  } else if (review.consent?.displayNamePermission === 'anonymous') {
    publicName = 'Satisfied Customer (Anonymous)';
  }

  // Resolve text based on preview language
  let displayText = review.reviewText?.original || '';
  if (langMode === 'en' && review.reviewText?.en) {
    displayText = review.reviewText.en;
  } else if (langMode === 'mr' && review.reviewText?.mr) {
    displayText = review.reviewText.mr;
  }

  const eventObj = REVIEW_EVENT_TYPES.find((e) => e.id === review.eventType);
  const sourceObj = REVIEW_SOURCES.find((s) => s.id === review.source);

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} style={{ zIndex: 1050 }}></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="review-preview-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow rounded-4 overflow-hidden">
            {/* Header */}
            <div className="modal-header border-bottom px-4 py-3 bg-light">
              <div>
                <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2" id="review-preview-title">
                  <i className="bi bi-eye-fill" style={{ color: '#641e2b' }}></i>
                  Public Testimonial Card Preview
                </h5>
                <p className="text-muted small mb-0 mt-1">
                  Previewing presentation exactly as website visitors see it.
                </p>
              </div>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close preview"></button>
            </div>

            {/* Language Toggle */}
            <div className="px-4 pt-3 pb-0 d-flex gap-2">
              <button
                type="button"
                className={`btn btn-sm ${langMode === 'original' ? 'btn-dark' : 'btn-outline-dark'}`}
                onClick={() => setLangMode('original')}
              >
                Original ({review.reviewText?.originalLanguage?.toUpperCase() || 'MR'})
              </button>
              {review.reviewText?.en && (
                <button
                  type="button"
                  className={`btn btn-sm ${langMode === 'en' ? 'btn-dark' : 'btn-outline-dark'}`}
                  onClick={() => setLangMode('en')}
                >
                  English Translation
                </button>
              )}
              {review.reviewText?.mr && (
                <button
                  type="button"
                  className={`btn btn-sm ${langMode === 'mr' ? 'btn-dark' : 'btn-outline-dark'}`}
                  onClick={() => setLangMode('mr')}
                >
                  मराठी अनुवाद
                </button>
              )}
            </div>

            {/* Preview Body */}
            <div className="modal-body px-4 py-4">
              {/* Card Simulator */}
              <div
                className="p-4 rounded-4 border shadow-sm mx-auto bg-white"
                style={{ maxWidth: '540px', backgroundColor: '#fff', borderTop: '4px solid #641e2b' }}
              >
                {/* Rating */}
                {review.rating ? (
                  renderStars(review.rating)
                ) : (
                  <div className="badge bg-light text-muted border mb-2 small">No Star Rating Supplied</div>
                )}

                {/* Review Quote */}
                <p className="text-dark mb-4 fst-italic" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
                  "{displayText}"
                </p>

                {/* Customer Info */}
                <div className="d-flex align-items-center justify-content-between pt-3 border-top border-light-subtle">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                      style={{ width: '44px', height: '44px', backgroundColor: '#641e2b', fontSize: '1.1rem' }}
                    >
                      {publicName.charAt(0)}
                    </div>
                    <div>
                      <h6 className="fw-bold text-dark mb-0">{publicName}</h6>
                      <small className="text-muted">
                        {eventObj?.en || 'Catering Client'}
                        {review.eventDate ? ` · ${new Date(review.eventDate).getFullYear()}` : ''}
                      </small>
                    </div>
                  </div>

                  {review.isFeatured && (
                    <span className="badge bg-danger-subtle text-danger border border-danger-subtle">
                      ⭐ Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Status & Privacy Notes */}
              <div className="mt-4 pt-3 border-top">
                <div className="row g-2 small text-muted">
                  <div className="col-sm-4">
                    <strong>Status:</strong>{' '}
                    <span className="text-capitalize fw-semibold text-dark">{review.status}</span>
                  </div>
                  <div className="col-sm-4">
                    <strong>Consent:</strong>{' '}
                    {review.consent?.granted ? (
                      <span className="text-success fw-semibold">Granted (Permitted)</span>
                    ) : (
                      <span className="text-danger fw-semibold">Not Granted</span>
                    )}
                  </div>
                  <div className="col-sm-4">
                    <strong>Source:</strong>{' '}
                    <span className="text-dark">{sourceObj?.en || review.source}</span>
                  </div>
                </div>

                {review.status !== 'published' && (
                  <div className="alert alert-warning border mt-3 rounded-3 small p-2 mb-0">
                    <i className="bi bi-exclamation-triangle-fill me-1"></i>
                    This review is currently <strong>{review.status}</strong> and is not shown on the live public website.
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer border-top px-4 py-3 bg-light">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                Close Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

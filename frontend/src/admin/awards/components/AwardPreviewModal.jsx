import { useState } from 'react';
import { AWARD_CATEGORIES } from '../../../services/awardAdminService';

export default function AwardPreviewModal({ isOpen, award, onClose }) {
  const [previewLang, setPreviewLang] = useState('en');

  if (!isOpen || !award) return null;

  const lang = previewLang;
  const title = award.title?.[lang] || award.title?.en || 'Untitled';
  const description = award.description?.[lang] || award.description?.en || '';
  const imageUrl = award.image?.url || '';

  const categoryObj = AWARD_CATEGORIES.find((c) => c.id === award.category);
  const categoryLabel = categoryObj?.[lang] || categoryObj?.en || award.category || '—';

  const yearStr = award.awardYear
    ? String(award.awardYear)
    : award.awardDate
    ? new Date(award.awardDate).getFullYear()
    : null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published': return <span className="badge bg-success">Published</span>;
      case 'draft': return <span className="badge bg-warning text-dark">Draft</span>;
      case 'unpublished': return <span className="badge bg-info text-dark">Unpublished</span>;
      case 'archived': return <span className="badge bg-secondary">Archived</span>;
      default: return null;
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} style={{ zIndex: 1050 }}></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="award-preview-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow rounded-4 overflow-hidden">
            {/* Header */}
            <div className="modal-header border-bottom px-4 py-3 bg-light">
              <div>
                <h5
                  className="modal-title fw-bold text-dark d-flex align-items-center gap-2"
                  id="award-preview-title"
                >
                  <i className="bi bi-eye-fill" style={{ color: '#641e2b' }}></i>
                  Public Website Award Preview
                </h5>
                <p className="text-muted small mb-0 mt-1">
                  Admin Preview Mode — Previewing award presentation exactly as visitors will see it.
                </p>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close preview"
              ></button>
            </div>

            {/* Language Toggle */}
            <div className="px-4 pt-3 pb-0 d-flex gap-2">
              <button
                type="button"
                className={`btn btn-sm ${previewLang === 'en' ? 'btn-dark' : 'btn-outline-dark'}`}
                onClick={() => setPreviewLang('en')}
              >
                Preview English
              </button>
              <button
                type="button"
                className={`btn btn-sm ${previewLang === 'mr' ? 'btn-dark' : 'btn-outline-dark'}`}
                onClick={() => setPreviewLang('mr')}
              >
                Preview Marathi
              </button>
            </div>

            {/* Preview Body */}
            <div className="modal-body px-4 py-4">
              <div className="row g-4 align-items-start">
                {/* Image */}
                <div className="col-12 col-md-5">
                  <div
                    className="rounded-4 overflow-hidden bg-light border shadow-sm d-flex align-items-center justify-content-center"
                    style={{ minHeight: '200px', maxHeight: '280px' }}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={title}
                        className="w-100 object-fit-contain"
                        style={{ maxHeight: '280px' }}
                      />
                    ) : (
                      <div className="text-center text-muted py-5">
                        <i className="bi bi-trophy fs-1 d-block mb-2 text-warning"></i>
                        <span className="small">No image uploaded</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="col-12 col-md-7">
                  <div className="mb-2 d-flex align-items-center gap-2 flex-wrap">
                    {getStatusBadge(award.status)}
                    {award.isFeatured && (
                      <span className="badge bg-danger-subtle text-danger border border-danger-subtle">
                        ⭐ Featured
                      </span>
                    )}
                  </div>

                  <div className="mb-2">
                    <span
                      className="badge bg-primary-subtle text-primary border border-primary-subtle"
                      style={{ fontSize: '0.75rem' }}
                    >
                      {categoryLabel}
                    </span>
                  </div>

                  <h4 className="fw-bold text-dark mb-2">{title}</h4>

                  {description && (
                    <p className="text-muted small mb-3" style={{ lineHeight: 1.6 }}>
                      {description}
                    </p>
                  )}

                  <div className="border-top pt-3">
                    <div className="row g-2">
                      {award.issuingOrganization && (
                        <div className="col-12">
                          <div className="text-muted small">Issued By</div>
                          <div className="fw-semibold">{award.issuingOrganization}</div>
                        </div>
                      )}
                      {yearStr && (
                        <div className="col-6">
                          <div className="text-muted small">Year</div>
                          <div className="fw-semibold">{yearStr}</div>
                        </div>
                      )}
                      {award.recipient && (
                        <div className="col-6">
                          <div className="text-muted small">Recipient</div>
                          <div className="fw-semibold">{award.recipient}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {award.status !== 'published' && (
                    <div className="alert alert-warning border mt-3 rounded-3 small p-2 mb-0">
                      <i className="bi bi-exclamation-triangle-fill me-1"></i>
                      This award is <strong>{award.status}</strong> and not visible on the public website.
                    </div>
                  )}
                </div>
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

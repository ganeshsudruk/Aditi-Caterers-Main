import { useState } from 'react';
import { defaultGalleryCategories } from '../../../services/galleryService';

export default function GalleryPreviewModal({ isOpen, photo, onClose }) {
  const [previewLang, setPreviewLang] = useState('en');

  if (!isOpen || !photo) return null;

  const lang = previewLang;
  const title = photo.title?.[lang] || photo.title?.en || 'Untitled';
  const altText = photo.altText?.[lang] || photo.altText?.en || title;
  const imageUrl = photo.image?.url || '';

  const categoryObj = defaultGalleryCategories.find((c) => c.id === photo.category);
  const categoryName =
    categoryObj?.name?.[lang] || categoryObj?.name?.en || photo.category || 'Other';

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <span className="badge bg-success">Published</span>;
      case 'draft':
        return <span className="badge bg-warning text-dark">Draft</span>;
      case 'unpublished':
        return <span className="badge bg-info text-dark">Unpublished</span>;
      case 'archived':
        return <span className="badge bg-secondary">Archived</span>;
      default:
        return <span className="badge bg-light text-dark">{status}</span>;
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} style={{ zIndex: 1050 }}></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="gallery-preview-title"
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
                  id="gallery-preview-title"
                >
                  <i className="bi bi-eye-fill" style={{ color: '#641e2b' }}></i>
                  Public Website Photo Preview
                </h5>
                <p className="text-muted small mb-0 mt-1">
                  Admin Preview Mode — Previewing photograph presentation exactly as visitors will
                  see it.
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
                {/* Photo Preview */}
                <div className="col-12 col-md-7">
                  <div
                    className="rounded-4 overflow-hidden bg-light border shadow-sm d-flex align-items-center justify-content-center"
                    style={{ minHeight: '240px', maxHeight: '340px' }}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={altText}
                        className="w-100 object-fit-cover"
                        style={{ maxHeight: '340px' }}
                      />
                    ) : (
                      <div className="text-center text-muted py-5">
                        <i className="bi bi-image fs-1 d-block mb-2"></i>
                        <span className="small">No Image URL set</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info Panel */}
                <div className="col-12 col-md-5">
                  {/* Status */}
                  <div className="mb-3">{getStatusBadge(photo.status)}</div>

                  {/* Category Badge */}
                  <div className="mb-2">
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                      {categoryObj?.icon && <i className={`bi ${categoryObj.icon} me-1`}></i>}
                      {categoryName}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="fw-bold text-dark mb-2">
                    {title}
                    {photo.isFeatured && (
                      <span
                        className="badge bg-danger-subtle text-danger ms-2"
                        style={{ fontSize: '0.65rem', verticalAlign: 'middle' }}
                      >
                        ⭐ Featured
                      </span>
                    )}
                  </h4>

                  {/* Alt Text */}
                  <p className="text-muted small mb-3">
                    <strong>Alt:</strong> {altText}
                  </p>

                  {/* Metadata */}
                  <div className="border-top pt-3">
                    <div className="row g-2 text-sm">
                      <div className="col-6">
                        <div className="text-muted small">Display Order</div>
                        <div className="fw-semibold">{photo.displayOrder || '—'}</div>
                      </div>
                      <div className="col-6">
                        <div className="text-muted small">Event Type</div>
                        <div className="fw-semibold text-capitalize">{photo.eventType || '—'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Website Card Preview hint */}
                  <div className="alert alert-light border mt-4 rounded-3 small p-2 mb-0">
                    <i className="bi bi-info-circle me-1 text-primary"></i>
                    This photo {photo.status === 'published' ? 'is live' : 'will appear'} in the
                    public gallery under <strong>{categoryName}</strong>.
                  </div>
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

import { useState } from 'react';

export default function ServicePreviewModal({ service, isOpen, onClose }) {
  const [lang, setLang] = useState('en');

  if (!isOpen || !service) return null;

  const name = (lang === 'mr' ? service.name?.mr : service.name?.en) || service.name?.en || 'Untitled Service';
  const shortDesc = (lang === 'mr' ? service.shortDescription?.mr : service.shortDescription?.en) || service.shortDescription?.en || '';
  const fullDesc = (lang === 'mr' ? service.description?.mr : service.description?.en) || service.description?.en || '';
  const highlights = (lang === 'mr' ? service.highlights?.mr : service.highlights?.en) || service.highlights?.en || [];

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} style={{ zIndex: 1050 }}></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="preview-modal-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow rounded-4 overflow-hidden">
            {/* Header with preview badge & language toggles */}
            <div className="modal-header border-bottom px-4 py-3 bg-light">
              <div>
                <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2 mb-0" id="preview-modal-title">
                  <i className="bi bi-display text-primary"></i>
                  <span>Public Website Service Preview</span>
                </h5>
                <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle small mt-1">
                  Admin Preview Mode — Not publicly published
                </span>
              </div>

              <div className="d-flex align-items-center gap-2">
                <div className="btn-group btn-group-sm" role="group" aria-label="Preview language">
                  <button
                    type="button"
                    className={`btn ${lang === 'en' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    style={lang === 'en' ? { backgroundColor: '#641e2b', borderColor: '#641e2b' } : {}}
                    onClick={() => setLang('en')}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    className={`btn ${lang === 'mr' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    style={lang === 'mr' ? { backgroundColor: '#641e2b', borderColor: '#641e2b' } : {}}
                    onClick={() => setLang('mr')}
                  >
                    मराठी
                  </button>
                </div>

                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                  aria-label="Close modal"
                ></button>
              </div>
            </div>

            {/* Modal Body Preview simulating website look */}
            <div className="modal-body px-4 py-4 bg-light-subtle">
              {/* Card Simulation */}
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 bg-white">
                <div className="row g-0">
                  <div className="col-md-5">
                    {service.image?.url ? (
                      <img
                        src={service.image.url}
                        alt={service.image?.alt?.[lang] || name}
                        className="img-fluid h-100 w-100 object-fit-cover"
                        style={{ minHeight: '220px' }}
                      />
                    ) : (
                      <div className="h-100 bg-light d-flex align-items-center justify-content-center text-muted p-5">
                        <i className="bi bi-image fs-1"></i>
                      </div>
                    )}
                  </div>
                  <div className="col-md-7">
                    <div className="card-body p-4 d-flex flex-column h-100 justify-content-between">
                      <div>
                        <div className="badge bg-maroon-subtle text-maroon mb-2" style={{ backgroundColor: '#f8e9eb', color: '#641e2b' }}>
                          Aditi Caterers Service
                        </div>
                        <h3 className="h4 fw-bold text-dark mb-2">{name}</h3>
                        <p className="text-muted small mb-3">{shortDesc || 'No short description provided.'}</p>
                      </div>

                      <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                        <span className="small text-muted">
                          <i className="bi bi-clock-history me-1"></i> Order #{service.displayOrder}
                        </span>
                        <button type="button" className="btn btn-sm btn-outline-dark disabled" tabIndex="-1">
                          Enquire For This Event <i className="bi bi-arrow-right ms-1"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Description Preview */}
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <h4 className="h5 fw-bold text-dark mb-2 border-bottom pb-2">
                  <i className="bi bi-card-text me-2" style={{ color: '#641e2b' }}></i>
                  {lang === 'mr' ? 'सेवेची सविस्तर माहिती' : 'Full Service Overview'}
                </h4>
                <p className="text-dark small lh-base mb-3">
                  {fullDesc || 'No detailed description entered for this language.'}
                </p>

                {highlights && highlights.length > 0 && (
                  <div>
                    <h5 className="h6 fw-bold text-dark mb-2">
                      {lang === 'mr' ? 'प्रमुख वैशिष्ट्ये / व्यवस्था' : 'Event Requirements & Inclusions'}
                    </h5>
                    <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                      {highlights.map((h, i) => (
                        <li key={i} className="small d-flex align-items-start gap-2">
                          <i className="bi bi-check-circle-fill text-success mt-1"></i>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer border-top px-4 py-3 bg-light">
              <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
                Close Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

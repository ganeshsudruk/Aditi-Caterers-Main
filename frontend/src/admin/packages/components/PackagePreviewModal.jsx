import { useState } from 'react';

export default function PackagePreviewModal({ pkg, isOpen, onClose }) {
  const [lang, setLang] = useState('en');

  if (!isOpen || !pkg) return null;

  const name = (lang === 'mr' ? pkg.name?.mr : pkg.name?.en) || pkg.name?.en || 'Untitled Package';
  const shortDesc = (lang === 'mr' ? pkg.shortDescription?.mr : pkg.shortDescription?.en) || pkg.shortDescription?.en || '';
  const fullDesc = (lang === 'mr' ? pkg.description?.mr : pkg.description?.en) || pkg.description?.en || '';
  const priceNotes = (lang === 'mr' ? pkg.price?.notes?.mr : pkg.price?.notes?.en) || pkg.price?.notes?.en || '';
  const inclusions = (lang === 'mr' ? pkg.inclusions?.mr : pkg.inclusions?.en) || pkg.inclusions?.en || [];
  const exclusions = (lang === 'mr' ? pkg.exclusions?.mr : pkg.exclusions?.en) || pkg.exclusions?.en || [];

  const priceStr =
    pkg.price?.amount > 0 ? `₹${Number(pkg.price.amount).toLocaleString('en-IN')}` : 'Enquire for Price';
  const basisStr =
    pkg.price?.pricingBasis === 'per_person' ? 'Per Person Rate' : `Fixed for ${pkg.guestCount?.fixed || 100} guests`;

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} style={{ zIndex: 1050 }}></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="pkg-preview-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow rounded-4 overflow-hidden">
            <div className="modal-header border-bottom px-4 py-3 bg-light">
              <div>
                <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2 mb-0" id="pkg-preview-title">
                  <i className="bi bi-display text-primary"></i>
                  <span>Public Package Preview</span>
                </h5>
                <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle small mt-1">
                  Admin Preview Mode — Simulates public website view
                </span>
              </div>

              <div className="d-flex align-items-center gap-2">
                <div className="btn-group btn-group-sm" role="group">
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

            <div className="modal-body px-4 py-4 bg-light-subtle">
              {/* Package Card Simulation */}
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-3">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="badge bg-maroon-subtle text-maroon" style={{ backgroundColor: '#f8e9eb', color: '#641e2b' }}>
                          Catering Package
                        </span>
                        {pkg.featured && (
                          <span className="badge bg-warning-subtle text-warning-emphasis border border-warning">
                            Popular
                          </span>
                        )}
                      </div>
                      <h3 className="h4 fw-bold text-dark mb-1">{name}</h3>
                      <p className="text-muted small mb-0">{shortDesc}</p>
                    </div>

                    <div className="text-end">
                      <div className="h4 fw-bold text-dark mb-0">{priceStr}</div>
                      <div className="text-muted small">{basisStr}</div>
                    </div>
                  </div>

                  <p className="small text-dark lh-base border-top pt-3 mb-3">
                    {fullDesc || 'No full description provided.'}
                  </p>

                  {priceNotes && (
                    <div className="alert alert-light border small text-muted mb-3">
                      <i className="bi bi-info-circle me-1"></i> {priceNotes}
                    </div>
                  )}

                  <div className="row g-3">
                    {inclusions.length > 0 && (
                      <div className="col-md-6">
                        <span className="small fw-bold text-dark d-block mb-1">
                          <i className="bi bi-check-circle-fill text-success me-1"></i>
                          {lang === 'mr' ? 'समाविष्ट बाबी:' : 'Inclusions:'}
                        </span>
                        <ul className="list-unstyled mb-0 d-flex flex-column gap-1">
                          {inclusions.map((inc, i) => (
                            <li key={i} className="small text-muted d-flex align-items-center gap-1">
                              <i className="bi bi-check text-success"></i> {inc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {exclusions.length > 0 && (
                      <div className="col-md-6">
                        <span className="small fw-bold text-dark d-block mb-1">
                          <i className="bi bi-x-circle-fill text-danger me-1"></i>
                          {lang === 'mr' ? 'वगळलेल्या बाबी:' : 'Exclusions:'}
                        </span>
                        <ul className="list-unstyled mb-0 d-flex flex-column gap-1">
                          {exclusions.map((exc, i) => (
                            <li key={i} className="small text-muted d-flex align-items-center gap-1">
                              <i className="bi bi-dash text-danger"></i> {exc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
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

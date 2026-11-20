import { useState } from 'react';

export default function MenuItemPreviewModal({ item, isOpen, onClose }) {
  const [lang, setLang] = useState('en');

  if (!isOpen || !item) return null;

  const name = (lang === 'mr' ? item.name?.mr : item.name?.en) || item.name?.en || 'Untitled Dish';
  const desc = (lang === 'mr' ? item.description?.mr : item.description?.en) || item.description?.en || '';
  const ingredients = (lang === 'mr' ? item.ingredients?.mr : item.ingredients?.en) || item.ingredients?.en || [];

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} style={{ zIndex: 1050 }}></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="menu-preview-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow rounded-4 overflow-hidden">
            {/* Header */}
            <div className="modal-header border-bottom px-4 py-3 bg-light">
              <div>
                <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2 mb-0" id="menu-preview-title">
                  <i className="bi bi-display text-primary"></i>
                  <span>Public Menu Item Preview</span>
                </h5>
                <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle small mt-1">
                  Admin Preview Mode — Simulates live food menu view
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

            {/* Body */}
            <div className="modal-body px-4 py-4 bg-light-subtle">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-3">
                <div className="row g-0">
                  <div className="col-md-5">
                    {item.image?.url ? (
                      <img
                        src={item.image.url}
                        alt={item.image?.alt?.[lang] || name}
                        className="img-fluid h-100 w-100 object-fit-cover"
                        style={{ minHeight: '200px' }}
                      />
                    ) : (
                      <div className="h-100 bg-light d-flex align-items-center justify-content-center text-muted p-5">
                        <i className="bi bi-cup-hot fs-1"></i>
                      </div>
                    )}
                  </div>
                  <div className="col-md-7">
                    <div className="card-body p-4 d-flex flex-column h-100 justify-content-between">
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <span className="badge bg-light text-dark border">
                            {item.categoryName?.en || item.categoryId}
                          </span>
                          {item.foodType === 'veg' ? (
                            <span className="badge bg-success-subtle text-success border border-success-subtle">
                              Pure Veg
                            </span>
                          ) : (
                            <span className="badge bg-danger-subtle text-danger border border-danger-subtle">
                              Non-Veg
                            </span>
                          )}
                          {item.featured && (
                            <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle">
                              Special
                            </span>
                          )}
                        </div>

                        <h3 className="h5 fw-bold text-dark mb-2">{name}</h3>
                        <p className="text-muted small mb-3">{desc || 'No description provided.'}</p>
                      </div>

                      {ingredients && ingredients.length > 0 && (
                        <div className="pt-2 border-top">
                          <span className="small fw-semibold text-dark d-block mb-1">
                            {lang === 'mr' ? 'प्रमुख साहित्य:' : 'Key Ingredients:'}
                          </span>
                          <div className="d-flex flex-wrap gap-1">
                            {ingredients.map((ing, i) => (
                              <span key={i} className="badge bg-light text-secondary border small">
                                {ing}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
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

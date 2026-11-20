import { useState, useEffect } from 'react';
import { generateSlug } from '../../../services/serviceAdminService';

export default function ServiceModal({
  isOpen,
  initialData = null,
  onClose,
  onSave,
}) {
  const isEdit = !!initialData?.id;

  const [activeTab, setActiveTab] = useState('en'); // 'en', 'mr', 'settings'

  const [formData, setFormData] = useState({
    nameEn: '',
    nameMr: '',
    shortDescEn: '',
    shortDescMr: '',
    fullDescEn: '',
    fullDescMr: '',
    highlightsEn: [''],
    highlightsMr: [''],
    imageUrl: '',
    imageAltEn: '',
    imageAltMr: '',
    displayOrder: 1,
    status: 'draft',
    slug: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        nameEn: initialData.name?.en || '',
        nameMr: initialData.name?.mr || '',
        shortDescEn: initialData.shortDescription?.en || '',
        shortDescMr: initialData.shortDescription?.mr || '',
        fullDescEn: initialData.description?.en || '',
        fullDescMr: initialData.description?.mr || '',
        highlightsEn:
          initialData.highlights?.en && initialData.highlights.en.length > 0
            ? initialData.highlights.en
            : [''],
        highlightsMr:
          initialData.highlights?.mr && initialData.highlights.mr.length > 0
            ? initialData.highlights.mr
            : [''],
        imageUrl: initialData.image?.url || '',
        imageAltEn: initialData.image?.alt?.en || '',
        imageAltMr: initialData.image?.alt?.mr || '',
        displayOrder: initialData.displayOrder || 1,
        status: initialData.status || 'draft',
        slug: initialData.slug || '',
      });
    } else {
      setFormData({
        nameEn: '',
        nameMr: '',
        shortDescEn: '',
        shortDescMr: '',
        fullDescEn: '',
        fullDescMr: '',
        highlightsEn: [''],
        highlightsMr: [''],
        imageUrl: '',
        imageAltEn: '',
        imageAltMr: '',
        displayOrder: 1,
        status: 'draft',
        slug: '',
      });
    }
    setActiveTab('en');
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleTextChange = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'nameEn' && !isEdit && !prev.slug) {
        next.slug = generateSlug(value);
      }
      return next;
    });

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Highlights handlers
  const handleHighlightChange = (lang, index, value) => {
    const key = lang === 'en' ? 'highlightsEn' : 'highlightsMr';
    const list = [...formData[key]];
    list[index] = value;
    setFormData((prev) => ({ ...prev, [key]: list }));
  };

  const handleAddHighlight = (lang) => {
    const key = lang === 'en' ? 'highlightsEn' : 'highlightsMr';
    setFormData((prev) => ({ ...prev, [key]: [...prev[key], ''] }));
  };

  const handleRemoveHighlight = (lang, index) => {
    const key = lang === 'en' ? 'highlightsEn' : 'highlightsMr';
    const list = formData[key].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [key]: list.length > 0 ? list : [''] }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.nameEn.trim()) {
      errs.nameEn = 'English Service Name is required.';
    }

    if (formData.status === 'published' && !formData.nameMr.trim()) {
      errs.nameMr = 'Marathi Service Name is required before publishing.';
    }

    if (!formData.displayOrder || isNaN(formData.displayOrder) || formData.displayOrder < 1) {
      errs.displayOrder = 'Display order must be a positive integer.';
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      if (errs.nameEn) setActiveTab('en');
      else if (errs.nameMr) setActiveTab('mr');
      else if (errs.displayOrder) setActiveTab('settings');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: {
          en: formData.nameEn.trim(),
          mr: formData.nameMr.trim(),
        },
        shortDescription: {
          en: formData.shortDescEn.trim(),
          mr: formData.shortDescMr.trim(),
        },
        description: {
          en: formData.fullDescEn.trim(),
          mr: formData.fullDescMr.trim(),
        },
        highlights: {
          en: formData.highlightsEn.map((h) => h.trim()).filter(Boolean),
          mr: formData.highlightsMr.map((h) => h.trim()).filter(Boolean),
        },
        image: {
          url: formData.imageUrl.trim(),
          alt: {
            en: formData.imageAltEn.trim() || formData.nameEn.trim(),
            mr: formData.imageAltMr.trim() || formData.nameMr.trim(),
          },
        },
        displayOrder: parseInt(formData.displayOrder, 10),
        status: formData.status,
        slug: formData.slug || generateSlug(formData.nameEn),
      };

      await onSave(payload, isEdit ? initialData.id : null);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} style={{ zIndex: 1050 }}></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="service-modal-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow rounded-4">
            <div className="modal-header border-bottom px-4 py-3 bg-light rounded-top-4">
              <h5 className="modal-title fw-bold text-dark" id="service-modal-title">
                <i
                  className={`bi ${isEdit ? 'bi-pencil-square' : 'bi-plus-circle-fill'} me-2`}
                  style={{ color: '#641e2b' }}
                ></i>
                {isEdit ? 'Edit Catering Service' : 'Add New Catering Service'}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close modal"
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body px-4 py-3">
                {/* Tabs */}
                <ul className="nav nav-pills nav-fill mb-4 p-1 bg-light rounded-3">
                  <li className="nav-item">
                    <button
                      type="button"
                      className={`nav-link small fw-semibold ${activeTab === 'en' ? 'active' : ''}`}
                      style={activeTab === 'en' ? { backgroundColor: '#641e2b' } : {}}
                      onClick={() => setActiveTab('en')}
                    >
                      <i className="bi bi-translate me-1"></i> English Content
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className={`nav-link small fw-semibold ${activeTab === 'mr' ? 'active' : ''}`}
                      style={activeTab === 'mr' ? { backgroundColor: '#641e2b' } : {}}
                      onClick={() => setActiveTab('mr')}
                    >
                      <i className="bi bi-flag-fill me-1"></i> मराठी माहिती (Marathi)
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className={`nav-link small fw-semibold ${activeTab === 'settings' ? 'active' : ''}`}
                      style={activeTab === 'settings' ? { backgroundColor: '#641e2b' } : {}}
                      onClick={() => setActiveTab('settings')}
                    >
                      <i className="bi bi-sliders me-1"></i> Image & Settings
                    </button>
                  </li>
                </ul>

                {/* Tab: English Content */}
                {activeTab === 'en' && (
                  <div className="d-flex flex-column gap-3">
                    <div>
                      <label className="form-label fw-semibold small text-dark">
                        Service Name (English) <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.nameEn ? 'is-invalid' : ''}`}
                        placeholder="e.g. Wedding Catering"
                        value={formData.nameEn}
                        onChange={(e) => handleTextChange('nameEn', e.target.value)}
                      />
                      {errors.nameEn && <div className="invalid-feedback">{errors.nameEn}</div>}
                    </div>

                    <div>
                      <label className="form-label fw-semibold small text-dark">
                        Short Description (English)
                      </label>
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="Brief summary shown on service cards..."
                        value={formData.shortDescEn}
                        onChange={(e) => handleTextChange('shortDescEn', e.target.value)}
                      ></textarea>
                    </div>

                    <div>
                      <label className="form-label fw-semibold small text-dark">
                        Full Detailed Description (English)
                      </label>
                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Detailed service overview, menu highlights, and hospitality commitments..."
                        value={formData.fullDescEn}
                        onChange={(e) => handleTextChange('fullDescEn', e.target.value)}
                      ></textarea>
                    </div>

                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label fw-semibold small text-dark mb-0">
                          Highlights / Key Inclusions (English)
                        </label>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary py-0"
                          onClick={() => handleAddHighlight('en')}
                        >
                          <i className="bi bi-plus-lg me-1"></i> Add Item
                        </button>
                      </div>
                      {formData.highlightsEn.map((item, idx) => (
                        <div key={idx} className="input-group input-group-sm mb-2">
                          <span className="input-group-text bg-light">{idx + 1}</span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. 50 to 1000+ guests capacity"
                            value={item}
                            onChange={(e) => handleHighlightChange('en', idx, e.target.value)}
                          />
                          {formData.highlightsEn.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => handleRemoveHighlight('en', idx)}
                              title="Remove item"
                            >
                              <i className="bi bi-x-lg"></i>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: Marathi Content */}
                {activeTab === 'mr' && (
                  <div className="d-flex flex-column gap-3">
                    <div>
                      <label className="form-label fw-semibold small text-dark">
                        सेवेचे नाव (मराठी) {formData.status === 'published' && <span className="text-danger">*</span>}
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.nameMr ? 'is-invalid' : ''}`}
                        placeholder="उदा. लग्न समारंभ केटरिंग"
                        value={formData.nameMr}
                        onChange={(e) => handleTextChange('nameMr', e.target.value)}
                      />
                      {errors.nameMr && <div className="invalid-feedback">{errors.nameMr}</div>}
                    </div>

                    <div>
                      <label className="form-label fw-semibold small text-dark">
                        संक्षिप्त माहिती (मराठी)
                      </label>
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="सेवा कार्डवर दाखवण्यासाठी संक्षिप्त माहिती..."
                        value={formData.shortDescMr}
                        onChange={(e) => handleTextChange('shortDescMr', e.target.value)}
                      ></textarea>
                    </div>

                    <div>
                      <label className="form-label fw-semibold small text-dark">
                        सविस्तर माहिती (मराठी)
                      </label>
                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="सेवेची सविस्तर माहिती, खाद्यपदार्थांची पद्धत आणि वैशिष्ट्ये..."
                        value={formData.fullDescMr}
                        onChange={(e) => handleTextChange('fullDescMr', e.target.value)}
                      ></textarea>
                    </div>

                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label fw-semibold small text-dark mb-0">
                          प्रमुख वैशिष्ट्ये (मराठी)
                        </label>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary py-0"
                          onClick={() => handleAddHighlight('mr')}
                        >
                          <i className="bi bi-plus-lg me-1"></i> नवीन जोडा
                        </button>
                      </div>
                      {formData.highlightsMr.map((item, idx) => (
                        <div key={idx} className="input-group input-group-sm mb-2">
                          <span className="input-group-text bg-light">{idx + 1}</span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="उदा. ५० ते १०००+ पाहुण्यांची क्षमता"
                            value={item}
                            onChange={(e) => handleHighlightChange('mr', idx, e.target.value)}
                          />
                          {formData.highlightsMr.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => handleRemoveHighlight('mr', idx)}
                              title="काढून टाका"
                            >
                              <i className="bi bi-x-lg"></i>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: Media & Settings */}
                {activeTab === 'settings' && (
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold small text-dark">
                        Service Image URL (Optional)
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        placeholder="https://images.unsplash.com/..."
                        value={formData.imageUrl}
                        onChange={(e) => handleTextChange('imageUrl', e.target.value)}
                      />
                      <div className="form-text small">
                        Provide a genuine, owner-approved photograph URL of the catering setup.
                      </div>
                    </div>

                    {formData.imageUrl && (
                      <div className="col-12">
                        <div className="card bg-light p-2 text-center" style={{ maxHeight: '160px' }}>
                          <img
                            src={formData.imageUrl}
                            alt="Image preview"
                            className="img-fluid rounded mx-auto object-fit-cover"
                            style={{ maxHeight: '140px' }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-dark">
                        Display Order <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        className={`form-control ${errors.displayOrder ? 'is-invalid' : ''}`}
                        value={formData.displayOrder}
                        onChange={(e) => handleTextChange('displayOrder', e.target.value)}
                      />
                      {errors.displayOrder && (
                        <div className="invalid-feedback">{errors.displayOrder}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-dark">
                        Initial Service Status
                      </label>
                      <select
                        className="form-select"
                        value={formData.status}
                        onChange={(e) => handleTextChange('status', e.target.value)}
                      >
                        <option value="draft">Draft (Private)</option>
                        <option value="published">Published (Public)</option>
                        <option value="unpublished">Unpublished (Hidden)</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold small text-dark">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.slug}
                        onChange={(e) => handleTextChange('slug', e.target.value)}
                      />
                      <div className="form-text small">
                        Used for routing on public service details page (e.g. <code>wedding</code>).
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer border-top px-4 py-3 bg-light rounded-bottom-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={onClose}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: '#641e2b', borderColor: '#641e2b' }}
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : isEdit ? 'Update Service' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

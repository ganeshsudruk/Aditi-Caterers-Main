import { useState, useEffect } from 'react';
import { defaultGalleryCategories } from '../../../services/galleryService';

const EMPTY_FORM = {
  titleEn: '',
  titleMr: '',
  altEn: '',
  altMr: '',
  imageUrl: '',
  category: 'wedding',
  eventType: '',
  displayOrder: '',
  isFeatured: false,
  status: 'draft',
};

export default function GalleryModal({ isOpen, initialData, onClose, onSave }) {
  const [activeTab, setActiveTab] = useState('english');
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const isEdit = !!initialData;

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm({
          titleEn: initialData.title?.en || '',
          titleMr: initialData.title?.mr || '',
          altEn: initialData.altText?.en || '',
          altMr: initialData.altText?.mr || '',
          imageUrl: initialData.image?.url || '',
          category: initialData.category || 'wedding',
          eventType: initialData.eventType || '',
          displayOrder: initialData.displayOrder !== undefined ? String(initialData.displayOrder) : '',
          isFeatured: !!initialData.isFeatured,
          status: initialData.status || 'draft',
        });
      } else {
        setForm(EMPTY_FORM);
      }
      setActiveTab('english');
      setErrors({});
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!form.titleEn.trim()) errs.titleEn = 'English title / caption is required.';
    if (!form.imageUrl.trim()) errs.imageUrl = 'Image URL is required.';
    return errs;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      if (errs.titleEn) setActiveTab('english');
      else if (errs.imageUrl) setActiveTab('settings');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: { en: form.titleEn.trim(), mr: form.titleMr.trim() },
        altText: {
          en: form.altEn.trim() || form.titleEn.trim(),
          mr: form.altMr.trim() || form.titleMr.trim(),
        },
        image: { url: form.imageUrl.trim() },
        category: form.category,
        eventType: form.eventType.trim() || form.category,
        displayOrder: form.displayOrder ? parseInt(form.displayOrder, 10) : undefined,
        isFeatured: form.isFeatured,
        status: form.status,
      };
      await onSave(payload, isEdit ? initialData.id : null);
      onClose();
    } catch (err) {
      console.error('Error saving gallery photo:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} style={{ zIndex: 1050 }}></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="gallery-modal-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
          <div className="modal-content border-0 shadow rounded-4">
            {/* Header */}
            <div className="modal-header border-bottom px-4 py-3 bg-light rounded-top-4">
              <h5
                className="modal-title fw-bold text-dark d-flex align-items-center gap-2"
                id="gallery-modal-title"
              >
                <i className="bi bi-images" style={{ color: '#641e2b' }}></i>
                {isEdit ? 'Edit Gallery Photo' : 'Upload Gallery Photo'}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close modal"
              ></button>
            </div>

            {/* Tabs */}
            <div className="px-4 pt-3 border-bottom">
              <ul className="nav nav-tabs border-0 gap-1">
                {[
                  { id: 'english', label: 'English Caption', icon: 'bi-translate' },
                  { id: 'marathi', label: 'मराठी माहिती (Marathi)', icon: 'bi-type' },
                  { id: 'settings', label: 'Image & Settings', icon: 'bi-gear-fill' },
                ].map((tab) => (
                  <li key={tab.id} className="nav-item">
                    <button
                      type="button"
                      className={`nav-link border-0 pb-2 px-3 ${activeTab === tab.id ? 'active fw-semibold' : 'text-muted'}`}
                      onClick={() => setActiveTab(tab.id)}
                      style={
                        activeTab === tab.id
                          ? { borderBottom: '2px solid #641e2b', color: '#641e2b' }
                          : {}
                      }
                    >
                      <i className={`bi ${tab.icon} me-1`}></i>
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit}>
              <div className="modal-body px-4 py-4">
                {/* Tab: English Caption */}
                {activeTab === 'english' && (
                  <div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Title / Caption (English) <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.titleEn ? 'is-invalid' : ''}`}
                        placeholder="e.g. Grand Wedding Dining Setup"
                        value={form.titleEn}
                        onChange={(e) => handleChange('titleEn', e.target.value)}
                        maxLength={120}
                      />
                      {errors.titleEn && (
                        <div className="invalid-feedback">{errors.titleEn}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Alt Text (English Description)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Describe the photo for accessibility (screen readers, SEO)"
                        value={form.altEn}
                        onChange={(e) => handleChange('altEn', e.target.value)}
                        maxLength={200}
                      />
                      <div className="form-text text-muted">
                        If left blank, the English title will be used as alt text.
                      </div>
                    </div>

                    {/* Image preview */}
                    {form.imageUrl && (
                      <div className="mt-3">
                        <label className="form-label fw-semibold small text-muted">Photo Preview</label>
                        <div
                          className="rounded-3 overflow-hidden border bg-light"
                          style={{ maxHeight: '200px' }}
                        >
                          <img
                            src={form.imageUrl}
                            alt={form.altEn || form.titleEn || 'Gallery preview'}
                            className="w-100 object-fit-cover"
                            style={{ maxHeight: '200px' }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Marathi */}
                {activeTab === 'marathi' && (
                  <div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">शीर्षक / कॅप्शन (मराठी)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="उदा. भव्य लग्न जेवण मांडणी"
                        value={form.titleMr}
                        onChange={(e) => handleChange('titleMr', e.target.value)}
                        maxLength={120}
                        lang="mr"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Alt मजकूर (मराठी वर्णन)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="सुलभता आणि SEO साठी फोटोचे मराठी वर्णन"
                        value={form.altMr}
                        onChange={(e) => handleChange('altMr', e.target.value)}
                        maxLength={200}
                        lang="mr"
                      />
                      <div className="form-text text-muted">
                        रिकामे ठेवल्यास मराठी शीर्षक alt मजकूर म्हणून वापरला जाईल.
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Settings */}
                {activeTab === 'settings' && (
                  <div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Image URL <span className="text-danger">*</span>
                      </label>
                      <input
                        type="url"
                        className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
                        placeholder="https://images.unsplash.com/..."
                        value={form.imageUrl}
                        onChange={(e) => handleChange('imageUrl', e.target.value)}
                      />
                      {errors.imageUrl && (
                        <div className="invalid-feedback">{errors.imageUrl}</div>
                      )}
                    </div>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Gallery Category</label>
                        <select
                          className="form-select"
                          value={form.category}
                          onChange={(e) => handleChange('category', e.target.value)}
                        >
                          {defaultGalleryCategories
                            .filter((c) => c.id !== 'all')
                            .map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name?.en}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Event Type</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Wedding, Birthday, Corporate"
                          value={form.eventType}
                          onChange={(e) => handleChange('eventType', e.target.value)}
                          maxLength={80}
                        />
                        <div className="form-text text-muted">
                          Defaults to the selected category if left blank.
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Display Order</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="e.g. 1, 2, 3..."
                          value={form.displayOrder}
                          onChange={(e) => handleChange('displayOrder', e.target.value)}
                          min={1}
                        />
                        <div className="form-text text-muted">
                          Leave blank to append at the end.
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Status</label>
                        <select
                          className="form-select"
                          value={form.status}
                          onChange={(e) => handleChange('status', e.target.value)}
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="unpublished">Unpublished</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>

                      <div className="col-12">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="gallery-featured"
                            checked={form.isFeatured}
                            onChange={(e) => handleChange('isFeatured', e.target.checked)}
                          />
                          <label className="form-check-label fw-semibold" htmlFor="gallery-featured">
                            Highlight as Featured Event Photograph
                          </label>
                          <div className="form-text text-muted">
                            Featured photos appear prominently in gallery highlights and banners.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="modal-footer border-top px-4 py-3 bg-light rounded-bottom-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={onClose}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn text-white d-flex align-items-center gap-2"
                  style={{ backgroundColor: '#641e2b', borderColor: '#641e2b' }}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle-fill"></i>
                      Save Photo
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

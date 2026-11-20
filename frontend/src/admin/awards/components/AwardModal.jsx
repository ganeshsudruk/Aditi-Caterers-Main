import { useState, useEffect } from 'react';
import { AWARD_CATEGORIES } from '../../../services/awardAdminService';

const CURRENT_YEAR = new Date().getFullYear();

const EMPTY_FORM = {
  titleEn: '',
  titleMr: '',
  descEn: '',
  descMr: '',
  imageUrl: '',
  issuingOrganization: '',
  awardDate: '',
  awardYear: '',
  category: 'other_recognition',
  recipient: 'Aditi Caterers',
  displayOrder: '',
  isFeatured: false,
  status: 'draft',
};

export default function AwardModal({ isOpen, initialData, onClose, onSave }) {
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
          descEn: initialData.description?.en || '',
          descMr: initialData.description?.mr || '',
          imageUrl: initialData.image?.url || '',
          issuingOrganization: initialData.issuingOrganization || '',
          awardDate: initialData.awardDate
            ? new Date(initialData.awardDate).toISOString().split('T')[0]
            : '',
          awardYear: initialData.awardYear ? String(initialData.awardYear) : '',
          category: initialData.category || 'other_recognition',
          recipient: initialData.recipient || 'Aditi Caterers',
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
    if (!form.titleEn.trim()) errs.titleEn = 'English award title is required.';
    if (form.awardYear && (isNaN(form.awardYear) || Number(form.awardYear) < 1900 || Number(form.awardYear) > CURRENT_YEAR + 1)) {
      errs.awardYear = `Please enter a valid year between 1900 and ${CURRENT_YEAR + 1}.`;
    }
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
      else if (errs.awardYear) setActiveTab('details');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: { en: form.titleEn.trim(), mr: form.titleMr.trim() },
        description: { en: form.descEn.trim(), mr: form.descMr.trim() },
        image: { url: form.imageUrl.trim() },
        issuingOrganization: form.issuingOrganization.trim(),
        awardDate: form.awardDate || null,
        awardYear: form.awardYear ? parseInt(form.awardYear, 10) : null,
        category: form.category,
        recipient: form.recipient.trim(),
        displayOrder: form.displayOrder ? parseInt(form.displayOrder, 10) : undefined,
        isFeatured: form.isFeatured,
        status: form.status,
      };
      await onSave(payload, isEdit ? (initialData.id || initialData._id) : null);
      onClose();
    } catch (err) {
      console.error('Error saving award:', err);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'english', label: 'English Content', icon: 'bi-translate' },
    { id: 'marathi', label: 'मराठी माहिती (Marathi)', icon: 'bi-type' },
    { id: 'details', label: 'Award Details', icon: 'bi-trophy-fill' },
    { id: 'settings', label: 'Settings', icon: 'bi-gear-fill' },
  ];

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} style={{ zIndex: 1050 }}></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="award-modal-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
          <div className="modal-content border-0 shadow rounded-4">
            {/* Header */}
            <div className="modal-header border-bottom px-4 py-3 bg-light rounded-top-4">
              <h5
                className="modal-title fw-bold text-dark d-flex align-items-center gap-2"
                id="award-modal-title"
              >
                <i className="bi bi-trophy-fill" style={{ color: '#641e2b' }}></i>
                {isEdit ? 'Edit Award' : 'Add New Award'}
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
              <ul className="nav nav-tabs border-0 gap-1 flex-nowrap overflow-auto">
                {tabs.map((tab) => (
                  <li key={tab.id} className="nav-item flex-shrink-0">
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

            <form onSubmit={handleSubmit}>
              <div className="modal-body px-4 py-4">
                {/* Tab: English */}
                {activeTab === 'english' && (
                  <div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Award Title (English) <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.titleEn ? 'is-invalid' : ''}`}
                        placeholder="e.g. Best Catering Service Award"
                        value={form.titleEn}
                        onChange={(e) => handleChange('titleEn', e.target.value)}
                        maxLength={150}
                      />
                      {errors.titleEn && <div className="invalid-feedback">{errors.titleEn}</div>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Description (English)</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder="Describe the award and achievement details..."
                        value={form.descEn}
                        onChange={(e) => handleChange('descEn', e.target.value)}
                        maxLength={2000}
                      />
                      <div className="form-text text-muted">
                        Only include verified, approved details. {form.descEn.length}/2000 characters.
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Marathi */}
                {activeTab === 'marathi' && (
                  <div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">पुरस्कार शीर्षक (मराठी)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="उदा. सर्वोत्तम केटरिंग सेवा पुरस्कार"
                        value={form.titleMr}
                        onChange={(e) => handleChange('titleMr', e.target.value)}
                        maxLength={150}
                        lang="mr"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">वर्णन (मराठी)</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder="पुरस्कार आणि यशाचे तपशील..."
                        value={form.descMr}
                        onChange={(e) => handleChange('descMr', e.target.value)}
                        maxLength={2000}
                        lang="mr"
                      />
                      <div className="form-text text-muted">
                        {form.descMr.length}/2000 characters.
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Award Details */}
                {activeTab === 'details' && (
                  <div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Award / Certificate Image URL</label>
                      <input
                        type="url"
                        className="form-control"
                        placeholder="https://example.com/award-certificate.jpg"
                        value={form.imageUrl}
                        onChange={(e) => handleChange('imageUrl', e.target.value)}
                      />
                      <div className="form-text text-muted">
                        Paste a URL for the award trophy photo or certificate image.
                      </div>
                      {form.imageUrl && (
                        <div className="mt-2">
                          <div
                            className="border rounded-3 overflow-hidden bg-light d-inline-block"
                            style={{ maxWidth: '200px', maxHeight: '140px' }}
                          >
                            <img
                              src={form.imageUrl}
                              alt="Award preview"
                              className="d-block object-fit-contain"
                              style={{ maxWidth: '200px', maxHeight: '140px' }}
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="row g-3">
                      <div className="col-md-12">
                        <label className="form-label fw-semibold">Issuing Organization</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Maharashtra Tourism Board"
                          value={form.issuingOrganization}
                          onChange={(e) => handleChange('issuingOrganization', e.target.value)}
                          maxLength={200}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Award Year</label>
                        <input
                          type="number"
                          className={`form-control ${errors.awardYear ? 'is-invalid' : ''}`}
                          placeholder={`e.g. ${CURRENT_YEAR}`}
                          value={form.awardYear}
                          onChange={(e) => handleChange('awardYear', e.target.value)}
                          min={1900}
                          max={CURRENT_YEAR + 1}
                        />
                        {errors.awardYear && (
                          <div className="invalid-feedback">{errors.awardYear}</div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Award Date (if known)</label>
                        <input
                          type="date"
                          className="form-control"
                          value={form.awardDate}
                          onChange={(e) => handleChange('awardDate', e.target.value)}
                          max={new Date().toISOString().split('T')[0]}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Category</label>
                        <select
                          className="form-select"
                          value={form.category}
                          onChange={(e) => handleChange('category', e.target.value)}
                        >
                          {AWARD_CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.en}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Recipient / Business Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Aditi Caterers"
                          value={form.recipient}
                          onChange={(e) => handleChange('recipient', e.target.value)}
                          maxLength={150}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Settings */}
                {activeTab === 'settings' && (
                  <div>
                    <div className="row g-3">
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
                            id="award-featured"
                            checked={form.isFeatured}
                            onChange={(e) => handleChange('isFeatured', e.target.checked)}
                          />
                          <label className="form-check-label fw-semibold" htmlFor="award-featured">
                            Highlight as Featured Award
                          </label>
                          <div className="form-text text-muted">
                            Featured awards appear prominently on the homepage awards section.
                            Only published featured awards are shown publicly.
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
                      Save Award
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

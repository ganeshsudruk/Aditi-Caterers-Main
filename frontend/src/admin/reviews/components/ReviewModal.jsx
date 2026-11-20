import { useState, useEffect } from 'react';
import {
  REVIEW_SOURCES,
  REVIEW_EVENT_TYPES,
  DISPLAY_NAME_PERMISSIONS,
} from '../../../services/reviewAdminService';

const EMPTY_FORM = {
  customerDisplayName: '',
  displayNamePermission: 'full_name',
  originalText: '',
  originalLanguage: 'mr',
  textEn: '',
  textMr: '',
  rating: '5',
  eventType: 'wedding',
  eventDate: '',
  reviewDate: new Date().toISOString().split('T')[0],
  source: 'whatsapp',
  sourceReference: '',
  consentGranted: true,
  consentEvidence: '',
  isFeatured: false,
  displayOrder: '',
  status: 'pending',
  internalNotes: '',
};

export default function ReviewModal({ isOpen, initialData, onClose, onSave }) {
  const [activeTab, setActiveTab] = useState('review');
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const isEdit = !!initialData;

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm({
          customerDisplayName: initialData.customerDisplayName || '',
          displayNamePermission: initialData.consent?.displayNamePermission || 'full_name',
          originalText: initialData.reviewText?.original || '',
          originalLanguage: initialData.reviewText?.originalLanguage || 'mr',
          textEn: initialData.reviewText?.en || '',
          textMr: initialData.reviewText?.mr || '',
          rating: initialData.rating !== null && initialData.rating !== undefined ? String(initialData.rating) : '',
          eventType: initialData.eventType || '',
          eventDate: initialData.eventDate ? new Date(initialData.eventDate).toISOString().split('T')[0] : '',
          reviewDate: initialData.reviewDate ? new Date(initialData.reviewDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          source: initialData.source || 'whatsapp',
          sourceReference: initialData.sourceReference || '',
          consentGranted: Boolean(initialData.consent?.granted),
          consentEvidence: initialData.consent?.evidenceReference || '',
          isFeatured: Boolean(initialData.isFeatured),
          displayOrder: initialData.displayOrder !== undefined ? String(initialData.displayOrder) : '',
          status: initialData.status || 'pending',
          internalNotes: initialData.internalNotes || '',
        });
      } else {
        setForm(EMPTY_FORM);
      }
      setActiveTab('review');
      setErrors({});
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!form.originalText.trim()) {
      errs.originalText = 'Original review text is required.';
    }
    if (form.status === 'published' && !form.consentGranted) {
      errs.consentGranted = 'Customer consent is required to publish this review.';
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
      if (errs.originalText) setActiveTab('review');
      else if (errs.consentGranted) setActiveTab('consent');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        customerDisplayName: form.customerDisplayName.trim(),
        reviewText: {
          original: form.originalText.trim(),
          originalLanguage: form.originalLanguage,
          en: form.textEn.trim(),
          mr: form.textMr.trim(),
        },
        rating: form.rating ? parseInt(form.rating, 10) : null,
        eventType: form.eventType.trim(),
        eventDate: form.eventDate || null,
        reviewDate: form.reviewDate || new Date().toISOString().split('T')[0],
        source: form.source,
        sourceReference: form.sourceReference.trim(),
        consent: {
          granted: form.consentGranted,
          grantedAt: form.consentGranted ? new Date() : null,
          displayNamePermission: form.displayNamePermission,
          evidenceReference: form.consentEvidence.trim(),
        },
        isFeatured: form.isFeatured,
        displayOrder: form.displayOrder ? parseInt(form.displayOrder, 10) : undefined,
        status: form.status,
        internalNotes: form.internalNotes.trim(),
      };

      await onSave(payload, isEdit ? (initialData.id || initialData._id) : null);
      onClose();
    } catch (err) {
      console.error('Error saving review:', err);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'review', label: 'Review & Text', icon: 'bi-chat-quote-fill' },
    { id: 'translations', label: 'Translations (EN/MR)', icon: 'bi-translate' },
    { id: 'consent', label: 'Consent & Privacy', icon: 'bi-shield-check' },
    { id: 'metadata', label: 'Event & Settings', icon: 'bi-gear-fill' },
  ];

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} style={{ zIndex: 1050 }}></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="review-modal-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
          <div className="modal-content border-0 shadow rounded-4">
            {/* Header */}
            <div className="modal-header border-bottom px-4 py-3 bg-light rounded-top-4">
              <h5
                className="modal-title fw-bold text-dark d-flex align-items-center gap-2"
                id="review-modal-title"
              >
                <i className="bi bi-chat-quote-fill" style={{ color: '#641e2b' }}></i>
                {isEdit ? 'Edit Customer Review' : 'Add Genuine Customer Review'}
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
                {/* Tab: Review & Text */}
                {activeTab === 'review' && (
                  <div>
                    <div className="row g-3 mb-3">
                      <div className="col-md-7">
                        <label className="form-label fw-semibold">Customer Display Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Rahul Deshmukh"
                          value={form.customerDisplayName}
                          onChange={(e) => handleChange('customerDisplayName', e.target.value)}
                          maxLength={120}
                        />
                        <div className="form-text text-muted">
                          Approved name to display publicly according to customer consent.
                        </div>
                      </div>

                      <div className="col-md-5">
                        <label className="form-label fw-semibold">Original Language</label>
                        <select
                          className="form-select"
                          value={form.originalLanguage}
                          onChange={(e) => handleChange('originalLanguage', e.target.value)}
                        >
                          <option value="mr">Marathi (मराठी)</option>
                          <option value="en">English</option>
                          <option value="hi">Hindi (हिंदी)</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Original Review Text <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className={`form-control ${errors.originalText ? 'is-invalid' : ''}`}
                        rows={5}
                        placeholder="Paste the genuine, unaltered customer feedback as received..."
                        value={form.originalText}
                        onChange={(e) => handleChange('originalText', e.target.value)}
                        maxLength={2500}
                      />
                      {errors.originalText && (
                        <div className="invalid-feedback">{errors.originalText}</div>
                      )}
                      <div className="form-text text-muted">
                        Preserve original words and meaning without embellishment. {form.originalText.length}/2500 characters.
                      </div>
                    </div>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Rating (1 to 5 Stars)</label>
                        <select
                          className="form-select"
                          value={form.rating}
                          onChange={(e) => handleChange('rating', e.target.value)}
                        >
                          <option value="">No Rating Provided (Unrated)</option>
                          <option value="5">★★★★★ (5 Stars - Excellent)</option>
                          <option value="4">★★★★☆ (4 Stars - Very Good)</option>
                          <option value="3">★★★☆☆ (3 Stars - Average)</option>
                          <option value="2">★★☆☆☆ (2 Stars - Below Average)</option>
                          <option value="1">★☆☆☆☆ (1 Star - Poor)</option>
                        </select>
                        <div className="form-text text-muted">
                          Only select a rating if the customer explicitly provided one.
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Feedback Date</label>
                        <input
                          type="date"
                          className="form-control"
                          value={form.reviewDate}
                          onChange={(e) => handleChange('reviewDate', e.target.value)}
                          max={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Translations */}
                {activeTab === 'translations' && (
                  <div>
                    <div className="alert alert-light border rounded-3 p-3 mb-3 small">
                      <i className="bi bi-info-circle me-1 text-primary"></i>
                      Optional approved translations allow customer reviews to display smoothly in English and Marathi on the website while keeping the original intact.
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">English Translation (Approved)</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder="Accurate English translation of the customer review..."
                        value={form.textEn}
                        onChange={(e) => handleChange('textEn', e.target.value)}
                        maxLength={2500}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">मराठी अनुवाद (Marathi Translation)</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder="ग्राहकाच्या अभिप्रायाचा अस्सल मराठी अनुवाद..."
                        value={form.textMr}
                        onChange={(e) => handleChange('textMr', e.target.value)}
                        maxLength={2500}
                        lang="mr"
                      />
                    </div>
                  </div>
                )}

                {/* Tab: Consent & Privacy */}
                {activeTab === 'consent' && (
                  <div>
                    <div className="card border-0 bg-light rounded-3 p-3 mb-3">
                      <div className="form-check form-switch mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="review-consent"
                          checked={form.consentGranted}
                          onChange={(e) => handleChange('consentGranted', e.target.checked)}
                        />
                        <label className="form-check-label fw-bold text-dark" htmlFor="review-consent">
                          Customer Consent Granted for Public Display
                        </label>
                      </div>
                      <p className="text-muted small mb-0">
                        Public website publication requires confirmed, documented customer permission. Without consent, this review must remain private.
                      </p>
                      {errors.consentGranted && (
                        <div className="text-danger small mt-2 fw-semibold">
                          <i className="bi bi-exclamation-triangle-fill me-1"></i>
                          {errors.consentGranted}
                        </div>
                      )}
                    </div>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Display Name Permission</label>
                        <select
                          className="form-select"
                          value={form.displayNamePermission}
                          onChange={(e) => handleChange('displayNamePermission', e.target.value)}
                        >
                          {DISPLAY_NAME_PERMISSIONS.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.en}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Consent Evidence Reference</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. WhatsApp message on 20 Jan 2024 / Form #402"
                          value={form.consentEvidence}
                          onChange={(e) => handleChange('consentEvidence', e.target.value)}
                          maxLength={300}
                        />
                        <div className="form-text text-muted">
                          Private admin reference only; never shown publicly.
                        </div>
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-semibold">Internal Notes (Admin-only)</label>
                        <textarea
                          className="form-control"
                          rows={2}
                          placeholder="Private admin observations, follow-up actions, booking reference..."
                          value={form.internalNotes}
                          onChange={(e) => handleChange('internalNotes', e.target.value)}
                          maxLength={1500}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Event & Settings */}
                {activeTab === 'metadata' && (
                  <div>
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Event Type</label>
                        <select
                          className="form-select"
                          value={form.eventType}
                          onChange={(e) => handleChange('eventType', e.target.value)}
                        >
                          <option value="">Select Event Type (Optional)</option>
                          {REVIEW_EVENT_TYPES.map((ev) => (
                            <option key={ev.id} value={ev.id}>
                              {ev.en}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Event Date (if known)</label>
                        <input
                          type="date"
                          className="form-control"
                          value={form.eventDate}
                          onChange={(e) => handleChange('eventDate', e.target.value)}
                          max={new Date().toISOString().split('T')[0]}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Feedback Source</label>
                        <select
                          className="form-select"
                          value={form.source}
                          onChange={(e) => handleChange('source', e.target.value)}
                        >
                          {REVIEW_SOURCES.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.en}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Source Reference</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Booking #BK-912, Phone Call"
                          value={form.sourceReference}
                          onChange={(e) => handleChange('sourceReference', e.target.value)}
                          maxLength={200}
                        />
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
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Workflow Status</label>
                        <select
                          className="form-select"
                          value={form.status}
                          onChange={(e) => handleChange('status', e.target.value)}
                        >
                          <option value="pending">Pending (Awaiting Review)</option>
                          <option value="approved">Approved (Ready for Publish)</option>
                          <option value="published">Published (Live on Website)</option>
                          <option value="rejected">Rejected</option>
                          <option value="unpublished">Unpublished (Hidden)</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>

                      <div className="col-12">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="review-featured"
                            checked={form.isFeatured}
                            onChange={(e) => handleChange('isFeatured', e.target.checked)}
                          />
                          <label className="form-check-label fw-semibold" htmlFor="review-featured">
                            Highlight as Featured Testimonial on Homepage
                          </label>
                          <div className="form-text text-muted">
                            Only approved, consented, and published reviews can appear publicly.
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
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle-fill"></i>
                      Save Review
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

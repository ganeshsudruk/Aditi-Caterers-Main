import { useState } from 'react';
import { ENQUIRY_STATUSES } from '../../../services/dashboardService';

export default function EnquiryDetailModal({ enquiry, onClose, onStatusUpdated }) {
  const [status, setStatus] = useState(enquiry?.status || 'new');
  const [internalNotes, setInternalNotes] = useState(enquiry?.internalNotes || '');
  const [saving, setSaving] = useState(false);

  if (!enquiry) return null;

  const handleSave = async () => {
    setSaving(true);
    try {
      await onStatusUpdated(enquiry.enquiryNumber, status, internalNotes);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const currentStatusObj = ENQUIRY_STATUSES[status] || ENQUIRY_STATUSES.new;

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} style={{ zIndex: 1050 }}></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="enquiry-modal-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4 border-0 shadow">
            {/* Header */}
            <div className="modal-header border-bottom px-4 pt-4 pb-3">
              <div>
                <span className="small text-muted text-uppercase fw-semibold">
                  Reference: {enquiry.enquiryNumber || 'N/A'}
                </span>
                <h3 className="modal-title h5 fw-bold text-dark mb-0" id="enquiry-modal-title">
                  {enquiry.fullName} &bull; {enquiry.eventType}
                </h3>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close details modal"
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body px-4 py-3">
              <div className="row g-3 mb-4">
                {/* Left col: Customer & Event info */}
                <div className="col-md-6">
                  <h4 className="h6 fw-bold text-dark mb-2 border-bottom pb-1">Customer Information</h4>
                  <div className="small mb-1">
                    <span className="text-muted">Full Name:</span> <strong className="text-dark">{enquiry.fullName}</strong>
                  </div>
                  <div className="small mb-1">
                    <span className="text-muted">Mobile:</span>{' '}
                    <a href={`tel:${enquiry.mobile}`} className="text-decoration-none fw-semibold">
                      {enquiry.mobile}
                    </a>
                  </div>
                  {enquiry.email && (
                    <div className="small mb-1">
                      <span className="text-muted">Email:</span>{' '}
                      <a href={`mailto:${enquiry.email}`} className="text-decoration-none">
                        {enquiry.email}
                      </a>
                    </div>
                  )}
                  {enquiry.preferredContactMethod && (
                    <div className="small mb-1">
                      <span className="text-muted">Preferred Contact:</span>{' '}
                      <span className="text-capitalize">{enquiry.preferredContactMethod}</span>
                    </div>
                  )}
                </div>

                {/* Right col: Event Details */}
                <div className="col-md-6">
                  <h4 className="h6 fw-bold text-dark mb-2 border-bottom pb-1">Event Details</h4>
                  <div className="small mb-1">
                    <span className="text-muted">Event Type:</span>{' '}
                    <span className="badge bg-light text-dark border text-capitalize">
                      {enquiry.eventType === 'other' ? enquiry.otherEventType || 'Other' : enquiry.eventType}
                    </span>
                  </div>
                  <div className="small mb-1">
                    <span className="text-muted">Event Date:</span>{' '}
                    <strong>{enquiry.dateNotDecided ? 'Date not decided yet' : enquiry.eventDate || 'N/A'}</strong>
                  </div>
                  <div className="small mb-1">
                    <span className="text-muted">Guest Count:</span> <strong>{enquiry.guestCount}</strong>
                  </div>
                  <div className="small mb-1">
                    <span className="text-muted">Catering Type:</span>{' '}
                    <strong>
                      {enquiry.cateringType === 'with-material'
                        ? 'With Material'
                        : enquiry.cateringType === 'without-material'
                          ? 'Without Material'
                          : enquiry.cateringType}
                    </strong>
                  </div>
                  <div className="small mb-1">
                    <span className="text-muted">Location:</span> {enquiry.eventCity || 'N/A'}
                  </div>
                  {enquiry.venueAddress && (
                    <div className="small mb-1">
                      <span className="text-muted">Venue:</span> {enquiry.venueAddress}
                    </div>
                  )}
                  {enquiry.budgetRange && enquiry.budgetRange !== 'not-decided' && (
                    <div className="small mb-1">
                      <span className="text-muted">Budget Range:</span> {enquiry.budgetRange}
                    </div>
                  )}
                </div>
              </div>

              {/* Message / Requirements */}
              {enquiry.message && (
                <div className="mb-4">
                  <h4 className="h6 fw-bold text-dark mb-2 border-bottom pb-1">Customer Requirements / Message</h4>
                  <div className="p-3 bg-light rounded-3 small text-secondary">
                    {enquiry.message}
                  </div>
                </div>
              )}

              {/* Admin Status & Notes workflow */}
              <div className="p-3 border rounded-3 bg-light-subtle">
                <h4 className="h6 fw-bold text-dark mb-3">
                  <i className="bi bi-gear-fill me-1 text-maroon" aria-hidden="true"></i>
                  Manage Enquiry Status & Internal Notes
                </h4>

                <div className="row g-3">
                  <div className="col-md-5">
                    <label htmlFor="modal-status-select" className="form-label small fw-semibold">
                      Update Status:
                    </label>
                    <select
                      id="modal-status-select"
                      className="form-select form-select-sm"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {Object.values(ENQUIRY_STATUSES).map((st) => (
                        <option key={st.id} value={st.id}>
                          {st.label}
                        </option>
                      ))}
                    </select>
                    <div className="mt-2">
                      <span className={`badge ${currentStatusObj.badgeClass} small`}>
                        <i className={`bi ${currentStatusObj.icon} me-1`} aria-hidden="true"></i>
                        Status: {currentStatusObj.label}
                      </span>
                    </div>
                  </div>

                  <div className="col-md-7">
                    <label htmlFor="modal-notes" className="form-label small fw-semibold">
                      Internal Admin Notes (not visible to customer):
                    </label>
                    <textarea
                      id="modal-notes"
                      className="form-control form-control-sm"
                      rows="3"
                      placeholder="e.g. Called customer on 19 Nov, requested custom Puran Poli quote..."
                      value={internalNotes}
                      onChange={(e) => setInternalNotes(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer border-top px-4 py-3">
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onClose}>
                Close
              </button>
              <button
                type="button"
                className="btn btn-sm btn-maroon"
                style={{ backgroundColor: '#641e2b', color: '#fff' }}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

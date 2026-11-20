import React, { useState } from 'react';
import { useAdminLanguage } from '../../../context/useAdminLanguage';

const QuotationResponseModal = ({ show, quotation, onClose, onSave }) => {
  const { at } = useAdminLanguage();
  const qa = at.quotationAdmin || {};

  const [responseStatus, setResponseStatus] = useState('accepted');
  const [responseNotes, setResponseNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!show || !quotation) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError('');
      await onSave(quotation.id || quotation._id, {
        status: responseStatus,
        notes: responseNotes
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to record response');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content border-0 shadow">
          <div className="modal-header bg-light">
            <h5 className="modal-title fw-bold">
              <i className="bi bi-chat-square-text text-primary me-2"></i>
              {qa.recordResponse || 'Record Customer Response'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} disabled={submitting}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              <div className="mb-3 p-3 bg-light rounded border">
                <div className="fw-semibold text-dark">{quotation.quotationNumber}</div>
                <div className="small text-muted">Customer: {quotation.customer?.name} ({quotation.customer?.phone})</div>
                <div className="small text-muted">Total: ₹{(quotation.pricing?.grandTotal || 0).toLocaleString('en-IN')}</div>
              </div>

              {error && (
                <div className="alert alert-danger py-2 small" role="alert">
                  {error}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label small fw-semibold">Customer Response Status *</label>
                <div className="d-flex flex-column gap-2">
                  <div className="form-check p-2 border rounded">
                    <input
                      className="form-check-input ms-0 me-2"
                      type="radio"
                      name="responseStatus"
                      id="resp-accepted"
                      value="accepted"
                      checked={responseStatus === 'accepted'}
                      onChange={(e) => setResponseStatus(e.target.value)}
                    />
                    <label className="form-check-label fw-semibold text-success" htmlFor="resp-accepted">
                      <i className="bi bi-check-circle-fill me-1"></i>
                      Accepted (ग्राहक मान्य केले)
                    </label>
                    <div className="extra-small text-muted ps-4">
                      Customer has agreed to the quotation terms & pricing.
                    </div>
                  </div>

                  <div className="form-check p-2 border rounded">
                    <input
                      className="form-check-input ms-0 me-2"
                      type="radio"
                      name="responseStatus"
                      id="resp-revision"
                      value="revision_requested"
                      checked={responseStatus === 'revision_requested'}
                      onChange={(e) => setResponseStatus(e.target.value)}
                    />
                    <label className="form-check-label fw-semibold text-warning-emphasis" htmlFor="resp-revision">
                      <i className="bi bi-arrow-repeat me-1"></i>
                      Revision Requested (दुरुस्तीची विनंती)
                    </label>
                    <div className="extra-small text-muted ps-4">
                      Customer requested menu item, guest count, or pricing changes.
                    </div>
                  </div>

                  <div className="form-check p-2 border rounded">
                    <input
                      className="form-check-input ms-0 me-2"
                      type="radio"
                      name="responseStatus"
                      id="resp-rejected"
                      value="rejected"
                      checked={responseStatus === 'rejected'}
                      onChange={(e) => setResponseStatus(e.target.value)}
                    />
                    <label className="form-check-label fw-semibold text-danger" htmlFor="resp-rejected">
                      <i className="bi bi-x-circle-fill me-1"></i>
                      Rejected / Declined (नाकारले)
                    </label>
                    <div className="extra-small text-muted ps-4">
                      Customer chose another caterer or cancelled the event.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Customer Feedback / Notes</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Record customer discussion, specific requirements or reason for rejection..."
                  value={responseNotes}
                  onChange={(e) => setResponseNotes(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="modal-footer bg-light">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Saving...
                  </>
                ) : (
                  'Record Response'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuotationResponseModal;

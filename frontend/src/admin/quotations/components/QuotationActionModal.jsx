import React, { useState } from 'react';
import { useAdminLanguage } from '../../../context/useAdminLanguage';

const QuotationActionModal = ({
  show,
  actionType, // 'issue' | 'revision' | 'cancel' | 'delete'
  quotation,
  onClose,
  onConfirm
}) => {
  const { at } = useAdminLanguage();
  const qa = at.quotationAdmin || {};

  const [validUntilDate, setValidUntilDate] = useState(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [revisionNotes, setRevisionNotes] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!show || !quotation) return null;

  const handleConfirm = async () => {
    try {
      setSubmitting(true);
      setError('');

      if (actionType === 'issue') {
        await onConfirm(quotation.id || quotation._id, { validUntilDate });
      } else if (actionType === 'revision') {
        await onConfirm(quotation.id || quotation._id, { revisionNotes });
      } else if (actionType === 'cancel') {
        await onConfirm(quotation.id || quotation._id, cancelReason);
      } else if (actionType === 'delete') {
        await onConfirm(quotation.id || quotation._id);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const getTitle = () => {
    switch (actionType) {
      case 'issue':
        return qa.issueQuotation || 'Issue Quotation to Customer';
      case 'revision':
        return qa.createRevision || 'Create New Quotation Revision';
      case 'cancel':
        return qa.cancelQuotation || 'Cancel Quotation';
      case 'delete':
        return 'Delete Quotation';
      default:
        return 'Confirm Action';
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content border-0 shadow">
          <div className="modal-header bg-light">
            <h5 className="modal-title fw-bold">
              {actionType === 'delete' && <i className="bi bi-trash text-danger me-2"></i>}
              {actionType === 'issue' && <i className="bi bi-send-check text-success me-2"></i>}
              {actionType === 'revision' && <i className="bi bi-file-earmark-diff text-info me-2"></i>}
              {actionType === 'cancel' && <i className="bi bi-slash-circle text-secondary me-2"></i>}
              {getTitle()}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} disabled={submitting}></button>
          </div>

          <div className="modal-body p-4">
            <div className="p-3 bg-light rounded border mb-3">
              <div className="fw-semibold text-dark">{quotation.quotationNumber}</div>
              <div className="small text-muted">Customer: {quotation.customer?.name} ({quotation.customer?.phone})</div>
              <div className="small text-muted">Total: ₹{(quotation.pricing?.grandTotal || 0).toLocaleString('en-IN')}</div>
            </div>

            {error && (
              <div className="alert alert-danger py-2 small" role="alert">
                {error}
              </div>
            )}

            {/* ISSUE ACTION */}
            {actionType === 'issue' && (
              <div>
                <p className="small text-secondary mb-3">
                  Issuing this quotation locks direct edits and activates customer tracking. You can define the validity period below.
                </p>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Quotation Valid Until Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={validUntilDate}
                    onChange={(e) => setValidUntilDate(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* REVISION ACTION */}
            {actionType === 'revision' && (
              <div>
                <p className="small text-secondary mb-3">
                  Creating a revision will set this quotation ({quotation.quotationNumber}) as <strong>Superseded</strong> and create a new editable draft revision.
                </p>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Revision Notes / Change Reason</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="e.g. Added 50 guests and updated sweet selection as per customer request"
                    value={revisionNotes}
                    onChange={(e) => setRevisionNotes(e.target.value)}
                  ></textarea>
                </div>
              </div>
            )}

            {/* CANCEL ACTION */}
            {actionType === 'cancel' && (
              <div>
                <p className="small text-secondary mb-3">
                  Are you sure you want to cancel quotation <strong>{quotation.quotationNumber}</strong>?
                </p>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Cancellation Reason</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Reason for cancellation..."
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  ></textarea>
                </div>
              </div>
            )}

            {/* DELETE ACTION */}
            {actionType === 'delete' && (
              <div>
                <p className="text-danger small mb-0">
                  <i className="bi bi-exclamation-triangle-fill me-1"></i>
                  Are you sure you want to permanently delete quotation <strong>{quotation.quotationNumber}</strong>? This action cannot be undone.
                </p>
              </div>
            )}
          </div>

          <div className="modal-footer bg-light">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button
              type="button"
              className={`btn ${
                actionType === 'delete' ? 'btn-danger' : actionType === 'issue' ? 'btn-success' : 'btn-primary'
              }`}
              onClick={handleConfirm}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Processing...
                </>
              ) : (
                'Confirm'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationActionModal;

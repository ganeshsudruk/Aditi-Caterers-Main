export default function ReviewActionModal({
  isOpen,
  review,
  actionType,
  onClose,
  onConfirm,
  submitting,
}) {
  if (!isOpen || !review) return null;

  const name = review.customerDisplayName || 'this customer review';
  const hasConsent = Boolean(review.consent?.granted);

  const configs = {
    approve: {
      title: 'Approve Customer Review',
      icon: 'bi-check2-circle text-primary',
      desc: `Approve "${name}"? It will be marked as Approved and ready for publication once customer consent is verified.`,
      btnText: 'Yes, Approve Review',
      btnClass: 'btn-primary',
    },
    reject: {
      title: 'Reject Customer Review',
      icon: 'bi-x-circle text-danger',
      desc: `Reject feedback from "${name}"? It will be marked as Rejected and hidden from consideration.`,
      btnText: 'Yes, Reject Review',
      btnClass: 'btn-danger',
    },
    publish: {
      title: 'Publish Review to Website',
      icon: 'bi-check-circle-fill text-success',
      desc: hasConsent
        ? `Publish review from "${name}" to the public website? Visitors will be able to read this testimonial.`
        : `Cannot publish review from "${name}" because customer consent for public display has not been recorded. Please edit the review and verify consent first.`,
      btnText: 'Yes, Publish Review',
      btnClass: 'btn-success',
      disabled: !hasConsent,
    },
    unpublish: {
      title: 'Unpublish Customer Review',
      icon: 'bi-eye-slash-fill text-warning',
      desc: `Hide review from "${name}" from the public website? The feedback will remain safely preserved in the Admin Panel.`,
      btnText: 'Yes, Unpublish',
      btnClass: 'btn-warning',
    },
    archive: {
      title: 'Archive Customer Review',
      icon: 'bi-archive-fill text-danger',
      desc: `Archive feedback from "${name}"? It will be removed from active lists and the website, while retaining administrative records.`,
      btnText: 'Yes, Archive Review',
      btnClass: 'btn-danger',
    },
    restore: {
      title: 'Restore Customer Review',
      icon: 'bi-arrow-counterclockwise text-success',
      desc: `Restore review from "${name}" back to Pending status for administrative review?`,
      btnText: 'Yes, Restore to Pending',
      btnClass: 'btn-success',
    },
    delete: {
      title: 'Delete Customer Review Permanently',
      icon: 'bi-trash-fill text-danger',
      desc: `Are you sure you want to permanently delete review from "${name}"? This action cannot be undone.`,
      btnText: 'Yes, Delete Permanently',
      btnClass: 'btn-danger',
    },
  };

  const cfg = configs[actionType] || configs.publish;

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} style={{ zIndex: 1050 }}></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="review-action-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow rounded-4">
            <div className="modal-header border-bottom px-4 py-3 bg-light rounded-top-4">
              <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2" id="review-action-title">
                <i className={`bi ${cfg.icon}`}></i>
                <span>{cfg.title}</span>
              </h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close modal"></button>
            </div>

            <div className="modal-body px-4 py-4">
              {review.reviewText?.original && (
                <div className="card bg-light border-0 p-3 mb-3 rounded-3 small fst-italic text-muted">
                  "{review.reviewText.original}"
                </div>
              )}
              <p className={`mb-0 ${cfg.disabled ? 'text-danger fw-semibold' : 'text-dark'}`}>
                {cfg.desc}
              </p>
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
                type="button"
                className={`btn ${cfg.btnClass}`}
                onClick={onConfirm}
                disabled={submitting || cfg.disabled}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    Processing...
                  </>
                ) : (
                  cfg.btnText
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function CustomerArchiveModal({
  customer,
  isRestore = false,
  isOpen,
  onClose,
  onConfirm,
  submitting,
}) {
  if (!isOpen || !customer) return null;

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} style={{ zIndex: 1050 }}></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="archive-modal-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow rounded-4">
            <div className="modal-header border-bottom px-4 py-3 bg-light rounded-top-4">
              <h5 className="modal-title fw-bold text-dark" id="archive-modal-title">
                <i
                  className={`bi ${isRestore ? 'bi-arrow-counterclockwise text-success' : 'bi-archive-fill text-danger'} me-2`}
                ></i>
                {isRestore ? 'Restore Customer' : 'Archive Customer'}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close modal"
              ></button>
            </div>

            <div className="modal-body px-4 py-4">
              {isRestore ? (
                <p className="text-dark mb-0">
                  Are you sure you want to restore <strong>{customer.name}</strong> to the active customer list?
                </p>
              ) : (
                <>
                  <p className="text-dark mb-2">
                    Are you sure you want to archive <strong>{customer.name}</strong>?
                  </p>
                  <p className="text-muted small mb-0">
                    The customer will be hidden from the active list. All associated booking history and records will remain completely intact and accessible under the Archived filter.
                  </p>
                </>
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
                type="button"
                className={`btn ${isRestore ? 'btn-success' : 'btn-danger'}`}
                onClick={onConfirm}
                disabled={submitting}
              >
                {submitting ? 'Processing...' : isRestore ? 'Yes, Restore Customer' : 'Yes, Archive Customer'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

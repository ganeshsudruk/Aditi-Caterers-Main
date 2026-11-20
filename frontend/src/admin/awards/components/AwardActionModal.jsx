export default function AwardActionModal({
  isOpen,
  award,
  actionType,
  onClose,
  onConfirm,
  submitting,
}) {
  if (!isOpen || !award) return null;

  const name = award.title?.en || 'this award';

  const configs = {
    publish: {
      title: 'Publish Award',
      icon: 'bi-check-circle-fill text-success',
      desc: `Publish "${name}" to the public website? Visitors will be able to see this award and recognition.`,
      btnText: 'Yes, Publish Award',
      btnClass: 'btn-success',
    },
    unpublish: {
      title: 'Unpublish Award',
      icon: 'bi-eye-slash-fill text-warning',
      desc: `Hide "${name}" from the public website? The award record will remain saved in the Admin Panel.`,
      btnText: 'Yes, Unpublish',
      btnClass: 'btn-warning',
    },
    archive: {
      title: 'Archive Award',
      icon: 'bi-archive-fill text-danger',
      desc: `Are you sure you want to archive "${name}"? It will be removed from the active list and public website, while remaining available for administration.`,
      btnText: 'Yes, Archive Award',
      btnClass: 'btn-danger',
    },
    restore: {
      title: 'Restore Award',
      icon: 'bi-arrow-counterclockwise text-success',
      desc: `Restore "${name}" back to active awards as a Draft for further review?`,
      btnText: 'Yes, Restore as Draft',
      btnClass: 'btn-success',
    },
    delete: {
      title: 'Delete Award Permanently',
      icon: 'bi-trash-fill text-danger',
      desc: `Are you sure you want to permanently delete "${name}"? This action cannot be undone.`,
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
        aria-labelledby="award-action-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow rounded-4">
            <div className="modal-header border-bottom px-4 py-3 bg-light rounded-top-4">
              <h5
                className="modal-title fw-bold text-dark d-flex align-items-center gap-2"
                id="award-action-title"
              >
                <i className={`bi ${cfg.icon}`}></i>
                <span>{cfg.title}</span>
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close modal"
              ></button>
            </div>

            <div className="modal-body px-4 py-4">
              {award.image?.url && (
                <div className="mb-3 text-center">
                  <img
                    src={award.image.url}
                    alt={award.title?.en || 'Award'}
                    className="rounded-3 shadow-sm object-fit-cover"
                    style={{ maxHeight: '100px', maxWidth: '100%' }}
                  />
                </div>
              )}
              <p className="text-dark mb-0">{cfg.desc}</p>
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
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
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

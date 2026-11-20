export default function PackageActionModal({
  isOpen,
  pkg,
  actionType,
  onClose,
  onConfirm,
  submitting,
}) {
  if (!isOpen || !pkg) return null;

  const configs = {
    publish: {
      title: 'Publish Catering Package',
      icon: 'bi-check-circle-fill text-success',
      desc: `Make "${pkg.name?.en || 'this package'}" live on the website? Public visitors will be able to review its price, inclusions, and request it for booking enquiries.`,
      btnText: 'Yes, Publish Package',
      btnClass: 'btn-success',
    },
    unpublish: {
      title: 'Unpublish Catering Package',
      icon: 'bi-eye-slash-fill text-warning',
      desc: `Hide "${pkg.name?.en || 'this package'}" from the public website? The package will remain saved in the Admin Panel.`,
      btnText: 'Yes, Unpublish',
      btnClass: 'btn-warning',
    },
    archive: {
      title: 'Archive Catering Package',
      icon: 'bi-archive-fill text-danger',
      desc: `Are you sure you want to archive "${pkg.name?.en || 'this package'}"? It will be hidden from the active list and website, while preserving historical booking references intact.`,
      btnText: 'Yes, Archive Package',
      btnClass: 'btn-danger',
    },
    restore: {
      title: 'Restore Catering Package',
      icon: 'bi-arrow-counterclockwise text-success',
      desc: `Restore "${pkg.name?.en || 'this package'}" back to active packages as a Draft?`,
      btnText: 'Yes, Restore to Draft',
      btnClass: 'btn-success',
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
        aria-labelledby="pkg-action-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow rounded-4">
            <div className="modal-header border-bottom px-4 py-3 bg-light rounded-top-4">
              <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2" id="pkg-action-title">
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
                {submitting ? 'Processing...' : cfg.btnText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ServiceActionModal({
  isOpen,
  service,
  actionType, // 'publish', 'unpublish', 'archive', 'restore'
  onClose,
  onConfirm,
  submitting,
}) {
  if (!isOpen || !service) return null;

  const configs = {
    publish: {
      title: 'Publish Catering Service',
      icon: 'bi-check-circle-fill text-success',
      desc: `Are you sure you want to publish "${service.name?.en || 'this service'}"? It will become publicly visible to website visitors on the Services page and in enquiry selection.`,
      btnText: 'Yes, Publish Service',
      btnClass: 'btn-success',
    },
    unpublish: {
      title: 'Unpublish Catering Service',
      icon: 'bi-eye-slash-fill text-warning',
      desc: `Remove "${service.name?.en || 'this service'}" from public display? The service will be hidden from website visitors but preserved in the Admin Panel.`,
      btnText: 'Yes, Unpublish',
      btnClass: 'btn-warning',
    },
    archive: {
      title: 'Archive Catering Service',
      icon: 'bi-archive-fill text-danger',
      desc: `Are you sure you want to archive "${service.name?.en || 'this service'}"? It will be hidden from the active list and website, preserving past event and booking records intact.`,
      btnText: 'Yes, Archive Service',
      btnClass: 'btn-danger',
    },
    restore: {
      title: 'Restore Catering Service',
      icon: 'bi-arrow-counterclockwise text-success',
      desc: `Restore "${service.name?.en || 'this service'}" to active Draft status? You can review its content before publishing it live.`,
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
        aria-labelledby="service-action-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow rounded-4">
            <div className="modal-header border-bottom px-4 py-3 bg-light rounded-top-4">
              <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2" id="service-action-title">
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

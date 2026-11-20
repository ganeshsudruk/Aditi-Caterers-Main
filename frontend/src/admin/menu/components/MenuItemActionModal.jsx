export default function MenuItemActionModal({
  isOpen,
  item,
  actionType,
  onClose,
  onConfirm,
  submitting,
}) {
  if (!isOpen || !item) return null;

  const configs = {
    publish: {
      title: 'Publish Menu Item',
      icon: 'bi-check-circle-fill text-success',
      desc: `Make "${item.name?.en || 'this dish'}" live on the website food menu? Public visitors will be able to view details and select it for catering enquiries.`,
      btnText: 'Yes, Publish Dish',
      btnClass: 'btn-success',
    },
    unpublish: {
      title: 'Unpublish Menu Item',
      icon: 'bi-eye-slash-fill text-warning',
      desc: `Hide "${item.name?.en || 'this dish'}" from the public food menu? It will remain safely preserved in the Admin Panel.`,
      btnText: 'Yes, Unpublish',
      btnClass: 'btn-warning',
    },
    archive: {
      title: 'Archive Menu Item',
      icon: 'bi-archive-fill text-danger',
      desc: `Are you sure you want to archive "${item.name?.en || 'this dish'}"? It will be hidden from the active menu list and public site, while preserving past booking associations.`,
      btnText: 'Yes, Archive Dish',
      btnClass: 'btn-danger',
    },
    restore: {
      title: 'Restore Menu Item',
      icon: 'bi-arrow-counterclockwise text-success',
      desc: `Restore "${item.name?.en || 'this dish'}" back to active dishes as a Draft?`,
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
        aria-labelledby="item-action-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow rounded-4">
            <div className="modal-header border-bottom px-4 py-3 bg-light rounded-top-4">
              <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2" id="item-action-title">
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

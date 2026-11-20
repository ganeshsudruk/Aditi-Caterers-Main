export default function ServiceTable({
  services,
  onEdit,
  onPreview,
  onPublish,
  onUnpublish,
  onArchive,
  onRestore,
  onReorder,
}) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return (
          <span className="badge bg-success-subtle text-success border border-success-subtle">
            <i className="bi bi-check-circle-fill me-1"></i> Published
          </span>
        );
      case 'draft':
        return (
          <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle">
            <i className="bi bi-pencil-square me-1"></i> Draft
          </span>
        );
      case 'unpublished':
        return (
          <span className="badge bg-info-subtle text-info-emphasis border border-info-subtle">
            <i className="bi bi-eye-slash-fill me-1"></i> Unpublished
          </span>
        );
      case 'archived':
        return (
          <span className="badge bg-secondary-subtle text-secondary border">
            <i className="bi bi-archive-fill me-1"></i> Archived
          </span>
        );
      default:
        return <span className="badge bg-light text-dark border">{status}</span>;
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-4">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light border-bottom">
            <tr>
              <th scope="col" className="ps-4" style={{ width: '80px' }}>Order</th>
              <th scope="col" style={{ width: '70px' }}>Image</th>
              <th scope="col">Service Name</th>
              <th scope="col">Short Description</th>
              <th scope="col">Status</th>
              <th scope="col">Updated Date</th>
              <th scope="col" className="text-end pe-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s, index) => {
              const updatedStr = s.updatedAt
                ? new Date(s.updatedAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : '—';

              return (
                <tr key={s.id}>
                  {/* Order & Reorder arrows */}
                  <td className="ps-4">
                    <div className="d-flex align-items-center gap-1">
                      <span className="fw-bold text-dark me-1" style={{ width: '20px' }}>
                        {s.displayOrder}
                      </span>
                      <div className="btn-group-vertical btn-group-sm">
                        <button
                          type="button"
                          className="btn btn-outline-light text-secondary p-0"
                          style={{ fontSize: '0.65rem', lineHeight: 1 }}
                          onClick={() => onReorder(s.id, 'up')}
                          disabled={index === 0}
                          title="Move Up"
                          aria-label={`Move ${s.name?.en} up`}
                        >
                          <i className="bi bi-chevron-up"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-light text-secondary p-0"
                          style={{ fontSize: '0.65rem', lineHeight: 1 }}
                          onClick={() => onReorder(s.id, 'down')}
                          disabled={index === services.length - 1}
                          title="Move Down"
                          aria-label={`Move ${s.name?.en} down`}
                        >
                          <i className="bi bi-chevron-down"></i>
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Thumbnail */}
                  <td>
                    {s.image?.url ? (
                      <img
                        src={s.image.url}
                        alt={s.image?.alt?.en || s.name?.en}
                        className="rounded-3 object-fit-cover shadow-sm"
                        style={{ width: '48px', height: '48px' }}
                      />
                    ) : (
                      <div
                        className="rounded-3 bg-light border d-flex align-items-center justify-content-center text-muted"
                        style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}
                      >
                        <i className="bi bi-image"></i>
                      </div>
                    )}
                  </td>

                  {/* Service Names */}
                  <td>
                    <div className="fw-bold text-dark">{s.name?.en || 'Untitled Service'}</div>
                    <div className="text-muted small" style={{ fontSize: '0.8rem' }}>
                      {s.name?.mr ? s.name.mr : <span className="text-warning fst-italic">मराठी भाषांतर बाकी</span>}
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                      Slug: <code>{s.slug}</code>
                    </div>
                  </td>

                  {/* Short Description */}
                  <td>
                    <div
                      className="text-truncate small text-dark"
                      style={{ maxWidth: '280px' }}
                      title={s.shortDescription?.en}
                    >
                      {s.shortDescription?.en || s.shortDescription?.mr || '—'}
                    </div>
                  </td>

                  {/* Status */}
                  <td>{getStatusBadge(s.status)}</td>

                  {/* Updated */}
                  <td className="small text-muted">{updatedStr}</td>

                  {/* Actions */}
                  <td className="text-end pe-4">
                    <div className="btn-group btn-group-sm" role="group" aria-label="Service actions">
                      {/* Preview Button */}
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => onPreview(s)}
                        title="Preview Public View"
                        aria-label={`Preview ${s.name?.en}`}
                      >
                        <i className="bi bi-eye-fill"></i>
                      </button>

                      {/* Edit Button */}
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => onEdit(s)}
                        title="Edit Service Details"
                        aria-label={`Edit ${s.name?.en}`}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>

                      {/* Publish / Unpublish Toggle */}
                      {s.status === 'published' ? (
                        <button
                          type="button"
                          className="btn btn-outline-warning"
                          onClick={() => onUnpublish(s)}
                          title="Unpublish Service"
                          aria-label={`Unpublish ${s.name?.en}`}
                        >
                          <i className="bi bi-eye-slash-fill"></i>
                        </button>
                      ) : s.status !== 'archived' ? (
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          onClick={() => onPublish(s)}
                          title="Publish Service"
                          aria-label={`Publish ${s.name?.en}`}
                        >
                          <i className="bi bi-check-circle-fill"></i>
                        </button>
                      ) : null}

                      {/* Archive / Restore Button */}
                      {s.status === 'archived' ? (
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          onClick={() => onRestore(s)}
                          title="Restore to Draft"
                          aria-label={`Restore ${s.name?.en}`}
                        >
                          <i className="bi bi-arrow-counterclockwise"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => onArchive(s)}
                          title="Archive Service"
                          aria-label={`Archive ${s.name?.en}`}
                        >
                          <i className="bi bi-archive-fill"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

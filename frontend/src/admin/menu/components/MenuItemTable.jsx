export default function MenuItemTable({
  items,
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
            Published
          </span>
        );
      case 'draft':
        return (
          <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle">
            Draft
          </span>
        );
      case 'unpublished':
        return (
          <span className="badge bg-info-subtle text-info-emphasis border border-info-subtle">
            Unpublished
          </span>
        );
      case 'archived':
        return <span className="badge bg-secondary-subtle text-secondary border">Archived</span>;
      default:
        return <span className="badge bg-light text-dark border">{status}</span>;
    }
  };

  const getFoodTypeBadge = (type) => {
    if (type === 'non-veg') {
      return (
        <span className="badge bg-danger-subtle text-danger border border-danger-subtle d-inline-flex align-items-center gap-1">
          <i className="bi bi-circle-fill" style={{ fontSize: '0.5rem' }}></i> Non-Veg
        </span>
      );
    }
    if (type === 'jain') {
      return (
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle d-inline-flex align-items-center gap-1">
          <i className="bi bi-circle-fill" style={{ fontSize: '0.5rem' }}></i> Jain
        </span>
      );
    }
    return (
      <span className="badge bg-success-subtle text-success border border-success-subtle d-inline-flex align-items-center gap-1">
        <i className="bi bi-circle-fill" style={{ fontSize: '0.5rem' }}></i> Pure Veg
      </span>
    );
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-4">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light border-bottom">
            <tr>
              <th scope="col" className="ps-4" style={{ width: '80px' }}>Order</th>
              <th scope="col" style={{ width: '64px' }}>Image</th>
              <th scope="col">Dish Name</th>
              <th scope="col">Category</th>
              <th scope="col">Dietary</th>
              <th scope="col">Status</th>
              <th scope="col">Updated</th>
              <th scope="col" className="text-end pe-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i, index) => {
              const updatedStr = i.updatedAt
                ? new Date(i.updatedAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : '—';

              return (
                <tr key={i.id}>
                  {/* Order & Reorder */}
                  <td className="ps-4">
                    <div className="d-flex align-items-center gap-1">
                      <span className="fw-bold text-dark me-1" style={{ width: '20px' }}>
                        {i.displayOrder}
                      </span>
                      <div className="btn-group-vertical btn-group-sm">
                        <button
                          type="button"
                          className="btn btn-outline-light text-secondary p-0"
                          style={{ fontSize: '0.65rem', lineHeight: 1 }}
                          onClick={() => onReorder(i.id, 'up')}
                          disabled={index === 0}
                          title="Move Up"
                          aria-label={`Move ${i.name?.en} up`}
                        >
                          <i className="bi bi-chevron-up"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-light text-secondary p-0"
                          style={{ fontSize: '0.65rem', lineHeight: 1 }}
                          onClick={() => onReorder(i.id, 'down')}
                          disabled={index === items.length - 1}
                          title="Move Down"
                          aria-label={`Move ${i.name?.en} down`}
                        >
                          <i className="bi bi-chevron-down"></i>
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Thumbnail */}
                  <td>
                    {i.image?.url ? (
                      <img
                        src={i.image.url}
                        alt={i.image?.alt?.en || i.name?.en}
                        className="rounded-3 object-fit-cover shadow-sm"
                        style={{ width: '44px', height: '44px' }}
                      />
                    ) : (
                      <div
                        className="rounded-3 bg-light border d-flex align-items-center justify-content-center text-muted"
                        style={{ width: '44px', height: '44px', fontSize: '1.1rem' }}
                      >
                        <i className="bi bi-cup-hot"></i>
                      </div>
                    )}
                  </td>

                  {/* Dish Name */}
                  <td>
                    <div className="fw-bold text-dark d-flex align-items-center gap-1">
                      <span>{i.name?.en || 'Untitled Item'}</span>
                      {i.featured && (
                        <span className="badge bg-danger-subtle text-danger" style={{ fontSize: '0.65rem' }}>
                          Special
                        </span>
                      )}
                    </div>
                    <div className="text-muted small" style={{ fontSize: '0.8rem' }}>
                      {i.name?.mr || <span className="text-warning fst-italic">मराठी नाव बाकी</span>}
                    </div>
                  </td>

                  {/* Category */}
                  <td>
                    <span className="badge bg-light text-dark border">
                      {i.categoryName?.en || i.categoryId}
                    </span>
                  </td>

                  {/* Dietary */}
                  <td>{getFoodTypeBadge(i.foodType)}</td>

                  {/* Status */}
                  <td>{getStatusBadge(i.status)}</td>

                  {/* Updated */}
                  <td className="small text-muted">{updatedStr}</td>

                  {/* Actions */}
                  <td className="text-end pe-4">
                    <div className="btn-group btn-group-sm" role="group" aria-label="Item actions">
                      {/* Preview */}
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => onPreview(i)}
                        title="Preview Public Dish"
                        aria-label={`Preview ${i.name?.en}`}
                      >
                        <i className="bi bi-eye-fill"></i>
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => onEdit(i)}
                        title="Edit Dish"
                        aria-label={`Edit ${i.name?.en}`}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>

                      {/* Publish / Unpublish */}
                      {i.status === 'published' ? (
                        <button
                          type="button"
                          className="btn btn-outline-warning"
                          onClick={() => onUnpublish(i)}
                          title="Unpublish Dish"
                          aria-label={`Unpublish ${i.name?.en}`}
                        >
                          <i className="bi bi-eye-slash-fill"></i>
                        </button>
                      ) : i.status !== 'archived' ? (
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          onClick={() => onPublish(i)}
                          title="Publish Dish"
                          aria-label={`Publish ${i.name?.en}`}
                        >
                          <i className="bi bi-check-circle-fill"></i>
                        </button>
                      ) : null}

                      {/* Archive / Restore */}
                      {i.status === 'archived' ? (
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          onClick={() => onRestore(i)}
                          title="Restore Dish"
                          aria-label={`Restore ${i.name?.en}`}
                        >
                          <i className="bi bi-arrow-counterclockwise"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => onArchive(i)}
                          title="Archive Dish"
                          aria-label={`Archive ${i.name?.en}`}
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

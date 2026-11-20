export default function GalleryTable({
  photos,
  onEdit,
  onPreview,
  onPublish,
  onUnpublish,
  onArchive,
  onRestore,
  onDelete,
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

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-4">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light border-bottom">
            <tr>
              <th scope="col" className="ps-4" style={{ width: '80px' }}>Order</th>
              <th scope="col" style={{ width: '72px' }}>Thumbnail</th>
              <th scope="col">Title / Caption</th>
              <th scope="col">Category / Event</th>
              <th scope="col">Status</th>
              <th scope="col">Updated</th>
              <th scope="col" className="text-end pe-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {photos.map((photo, index) => {
              const updatedStr = photo.updatedAt
                ? new Date(photo.updatedAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : '—';

              return (
                <tr key={photo.id}>
                  {/* Order & Reorder */}
                  <td className="ps-4">
                    <div className="d-flex align-items-center gap-1">
                      <span className="fw-bold text-dark me-1" style={{ width: '24px' }}>
                        {photo.displayOrder}
                      </span>
                      <div className="btn-group-vertical btn-group-sm">
                        <button
                          type="button"
                          className="btn btn-outline-light text-secondary p-0"
                          style={{ fontSize: '0.65rem', lineHeight: 1 }}
                          onClick={() => onReorder(photo.id, 'up')}
                          disabled={index === 0}
                          title="Move Up"
                          aria-label={`Move ${photo.title?.en} up`}
                        >
                          <i className="bi bi-chevron-up"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-light text-secondary p-0"
                          style={{ fontSize: '0.65rem', lineHeight: 1 }}
                          onClick={() => onReorder(photo.id, 'down')}
                          disabled={index === photos.length - 1}
                          title="Move Down"
                          aria-label={`Move ${photo.title?.en} down`}
                        >
                          <i className="bi bi-chevron-down"></i>
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Thumbnail */}
                  <td>
                    {photo.image?.url ? (
                      <img
                        src={photo.image.url}
                        alt={photo.altText?.en || photo.title?.en}
                        className="rounded-3 object-fit-cover shadow-sm"
                        style={{ width: '56px', height: '44px' }}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="rounded-3 bg-light border d-flex align-items-center justify-content-center text-muted"
                        style={{ width: '56px', height: '44px', fontSize: '1.1rem' }}
                      >
                        <i className="bi bi-image"></i>
                      </div>
                    )}
                  </td>

                  {/* Title / Caption */}
                  <td>
                    <div className="fw-bold text-dark d-flex align-items-center gap-1">
                      <span>{photo.title?.en || 'Untitled Photo'}</span>
                      {photo.isFeatured && (
                        <span
                          className="badge bg-danger-subtle text-danger"
                          style={{ fontSize: '0.65rem' }}
                        >
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="text-muted small" style={{ fontSize: '0.8rem' }}>
                      {photo.title?.mr || (
                        <span className="text-warning fst-italic">मराठी शीर्षक बाकी</span>
                      )}
                    </div>
                  </td>

                  {/* Category / Event */}
                  <td>
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle text-capitalize">
                      {photo.category || '—'}
                    </span>
                    {photo.eventType && photo.eventType !== photo.category && (
                      <div className="text-muted small mt-1" style={{ fontSize: '0.75rem' }}>
                        {photo.eventType}
                      </div>
                    )}
                  </td>

                  {/* Status */}
                  <td>{getStatusBadge(photo.status)}</td>

                  {/* Updated */}
                  <td className="small text-muted">{updatedStr}</td>

                  {/* Actions */}
                  <td className="text-end pe-4">
                    <div className="btn-group btn-group-sm" role="group" aria-label="Photo actions">
                      {/* Preview */}
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => onPreview(photo)}
                        title="Preview Photo"
                        aria-label={`Preview ${photo.title?.en}`}
                      >
                        <i className="bi bi-eye-fill"></i>
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => onEdit(photo)}
                        title="Edit Photo"
                        aria-label={`Edit ${photo.title?.en}`}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>

                      {/* Publish / Unpublish */}
                      {photo.status === 'published' ? (
                        <button
                          type="button"
                          className="btn btn-outline-warning"
                          onClick={() => onUnpublish(photo)}
                          title="Unpublish Photo"
                          aria-label={`Unpublish ${photo.title?.en}`}
                        >
                          <i className="bi bi-eye-slash-fill"></i>
                        </button>
                      ) : photo.status !== 'archived' ? (
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          onClick={() => onPublish(photo)}
                          title="Publish Photo"
                          aria-label={`Publish ${photo.title?.en}`}
                        >
                          <i className="bi bi-check-circle-fill"></i>
                        </button>
                      ) : null}

                      {/* Archive / Restore */}
                      {photo.status === 'archived' ? (
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          onClick={() => onRestore(photo)}
                          title="Restore Photo"
                          aria-label={`Restore ${photo.title?.en}`}
                        >
                          <i className="bi bi-arrow-counterclockwise"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => onArchive(photo)}
                          title="Archive Photo"
                          aria-label={`Archive ${photo.title?.en}`}
                        >
                          <i className="bi bi-archive-fill"></i>
                        </button>
                      )}

                      {/* Delete Permanently — only for archived */}
                      {photo.status === 'archived' && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => onDelete(photo)}
                          title="Delete Permanently"
                          aria-label={`Permanently delete ${photo.title?.en}`}
                        >
                          <i className="bi bi-trash-fill"></i>
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

import { AWARD_CATEGORIES } from '../../../services/awardAdminService';

function getStatusBadge(status) {
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
}

export default function AwardTable({
  awards,
  onEdit,
  onPreview,
  onPublish,
  onUnpublish,
  onArchive,
  onRestore,
  onDelete,
  onReorder,
}) {
  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-4">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light border-bottom">
            <tr>
              <th scope="col" className="ps-4" style={{ width: '80px' }}>
                Order
              </th>
              <th scope="col" style={{ width: '72px' }}>
                Image
              </th>
              <th scope="col">Award Title</th>
              <th scope="col">Category</th>
              <th scope="col">Issued By</th>
              <th scope="col">Year</th>
              <th scope="col">Status</th>
              <th scope="col">Updated</th>
              <th scope="col" className="text-end pe-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {awards.map((award, index) => {
              const updatedStr = award.updatedAt
                ? new Date(award.updatedAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : '—';

              const categoryObj = AWARD_CATEGORIES.find((c) => c.id === award.category);
              const categoryLabel = categoryObj?.en || award.category || '—';

              const yearStr = award.awardYear
                ? String(award.awardYear)
                : award.awardDate
                ? new Date(award.awardDate).getFullYear()
                : '—';

              return (
                <tr key={award.id || award._id}>
                  {/* Order & Reorder */}
                  <td className="ps-4">
                    <div className="d-flex align-items-center gap-1">
                      <span className="fw-bold text-dark me-1" style={{ width: '24px' }}>
                        {award.displayOrder}
                      </span>
                      <div className="btn-group-vertical btn-group-sm">
                        <button
                          type="button"
                          className="btn btn-outline-light text-secondary p-0"
                          style={{ fontSize: '0.65rem', lineHeight: 1 }}
                          onClick={() => onReorder(award.id || award._id, 'up')}
                          disabled={index === 0}
                          title="Move Up"
                          aria-label={`Move ${award.title?.en} up`}
                        >
                          <i className="bi bi-chevron-up"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-light text-secondary p-0"
                          style={{ fontSize: '0.65rem', lineHeight: 1 }}
                          onClick={() => onReorder(award.id || award._id, 'down')}
                          disabled={index === awards.length - 1}
                          title="Move Down"
                          aria-label={`Move ${award.title?.en} down`}
                        >
                          <i className="bi bi-chevron-down"></i>
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Thumbnail */}
                  <td>
                    {award.image?.url ? (
                      <img
                        src={award.image.url}
                        alt={award.title?.en || 'Award'}
                        className="rounded-3 object-fit-cover shadow-sm"
                        style={{ width: '56px', height: '44px' }}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="rounded-3 bg-light border d-flex align-items-center justify-content-center text-muted"
                        style={{ width: '56px', height: '44px', fontSize: '1.1rem' }}
                      >
                        <i className="bi bi-trophy"></i>
                      </div>
                    )}
                  </td>

                  {/* Title */}
                  <td>
                    <div className="fw-bold text-dark d-flex align-items-center gap-1">
                      <span>{award.title?.en || 'Untitled Award'}</span>
                      {award.isFeatured && (
                        <span
                          className="badge bg-danger-subtle text-danger"
                          style={{ fontSize: '0.65rem' }}
                        >
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="text-muted small" style={{ fontSize: '0.8rem' }}>
                      {award.title?.mr || (
                        <span className="text-warning fst-italic">मराठी शीर्षक बाकी</span>
                      )}
                    </div>
                  </td>

                  {/* Category */}
                  <td>
                    <span
                      className="badge bg-primary-subtle text-primary border border-primary-subtle"
                      style={{ fontSize: '0.72rem' }}
                    >
                      {categoryLabel}
                    </span>
                  </td>

                  {/* Issuing Organization */}
                  <td>
                    <span className="small text-dark">
                      {award.issuingOrganization || (
                        <span className="text-muted fst-italic">—</span>
                      )}
                    </span>
                  </td>

                  {/* Year */}
                  <td className="small fw-semibold text-dark">{yearStr}</td>

                  {/* Status */}
                  <td>{getStatusBadge(award.status)}</td>

                  {/* Updated */}
                  <td className="small text-muted">{updatedStr}</td>

                  {/* Actions */}
                  <td className="text-end pe-4">
                    <div className="btn-group btn-group-sm" role="group" aria-label="Award actions">
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => onPreview(award)}
                        title="Preview Award"
                        aria-label={`Preview ${award.title?.en}`}
                      >
                        <i className="bi bi-eye-fill"></i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => onEdit(award)}
                        title="Edit Award"
                        aria-label={`Edit ${award.title?.en}`}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>

                      {award.status === 'published' ? (
                        <button
                          type="button"
                          className="btn btn-outline-warning"
                          onClick={() => onUnpublish(award)}
                          title="Unpublish Award"
                          aria-label={`Unpublish ${award.title?.en}`}
                        >
                          <i className="bi bi-eye-slash-fill"></i>
                        </button>
                      ) : award.status !== 'archived' ? (
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          onClick={() => onPublish(award)}
                          title="Publish Award"
                          aria-label={`Publish ${award.title?.en}`}
                        >
                          <i className="bi bi-check-circle-fill"></i>
                        </button>
                      ) : null}

                      {award.status === 'archived' ? (
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          onClick={() => onRestore(award)}
                          title="Restore Award"
                          aria-label={`Restore ${award.title?.en}`}
                        >
                          <i className="bi bi-arrow-counterclockwise"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => onArchive(award)}
                          title="Archive Award"
                          aria-label={`Archive ${award.title?.en}`}
                        >
                          <i className="bi bi-archive-fill"></i>
                        </button>
                      )}

                      {award.status === 'archived' && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => onDelete(award)}
                          title="Delete Permanently"
                          aria-label={`Permanently delete ${award.title?.en}`}
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

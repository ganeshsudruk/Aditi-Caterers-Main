import { REVIEW_SOURCES, REVIEW_EVENT_TYPES } from '../../../services/reviewAdminService';

function getStatusBadge(status) {
  switch (status) {
    case 'published':
      return (
        <span className="badge bg-success-subtle text-success border border-success-subtle">
          Published
        </span>
      );
    case 'approved':
      return (
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
          Approved
        </span>
      );
    case 'pending':
      return (
        <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle">
          Pending
        </span>
      );
    case 'rejected':
      return (
        <span className="badge bg-danger-subtle text-danger border border-danger-subtle">
          Rejected
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

function renderRatingStars(rating) {
  if (!rating) {
    return <span className="text-muted small fst-italic">Unrated</span>;
  }
  return (
    <div className="d-flex align-items-center gap-1 text-warning" title={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`bi ${star <= rating ? 'bi-star-fill' : 'bi-star'} small`}
          style={{ fontSize: '0.75rem' }}
        />
      ))}
    </div>
  );
}

export default function ReviewTable({
  reviews,
  onEdit,
  onPreview,
  onApprove,
  onReject,
  onPublish,
  onUnpublish,
  onArchive,
  onRestore,
  onDelete,
}) {
  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-4">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light border-bottom">
            <tr>
              <th scope="col" className="ps-4" style={{ width: '160px' }}>Customer</th>
              <th scope="col">Review Text</th>
              <th scope="col" style={{ width: '100px' }}>Rating</th>
              <th scope="col" style={{ width: '130px' }}>Event / Source</th>
              <th scope="col" style={{ width: '90px' }}>Consent</th>
              <th scope="col" style={{ width: '110px' }}>Status</th>
              <th scope="col" style={{ width: '100px' }}>Date</th>
              <th scope="col" className="text-end pe-4" style={{ width: '180px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((rev) => {
              const reviewDateStr = rev.reviewDate
                ? new Date(rev.reviewDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : '—';

              const sourceObj = REVIEW_SOURCES.find((s) => s.id === rev.source);
              const eventObj = REVIEW_EVENT_TYPES.find((e) => e.id === rev.eventType);

              const previewText = rev.reviewText?.original || rev.reviewText?.en || rev.reviewText?.mr || '';
              const hasTranslation = Boolean(rev.reviewText?.en || rev.reviewText?.mr);

              return (
                <tr key={rev.id || rev._id}>
                  {/* Customer Display Name */}
                  <td className="ps-4">
                    <div className="fw-bold text-dark d-flex align-items-center gap-1">
                      <span>{rev.customerDisplayName || 'Valued Customer'}</span>
                      {rev.isFeatured && (
                        <span className="badge bg-danger-subtle text-danger" style={{ fontSize: '0.62rem' }}>
                          Featured
                        </span>
                      )}
                    </div>
                    {rev.consent?.displayNamePermission && (
                      <div className="text-muted small" style={{ fontSize: '0.72rem' }}>
                        {rev.consent.displayNamePermission === 'first_name_only'
                          ? 'First Name'
                          : rev.consent.displayNamePermission === 'anonymous'
                          ? 'Anonymous'
                          : 'Full Name'}
                      </div>
                    )}
                  </td>

                  {/* Review Text Preview */}
                  <td>
                    <div
                      className="text-dark small text-truncate"
                      style={{ maxWidth: '320px' }}
                      title={previewText}
                    >
                      "{previewText}"
                    </div>
                    <div className="d-flex align-items-center gap-2 mt-1">
                      <span className="badge bg-light text-muted border text-uppercase" style={{ fontSize: '0.65rem' }}>
                        Lang: {rev.reviewText?.originalLanguage || 'mr'}
                      </span>
                      {hasTranslation && (
                        <span className="badge bg-info-subtle text-info border border-info-subtle" style={{ fontSize: '0.65rem' }}>
                          <i className="bi bi-translate me-1"></i>Translated
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Rating */}
                  <td>{renderRatingStars(rev.rating)}</td>

                  {/* Event & Source */}
                  <td>
                    {rev.eventType ? (
                      <span className="badge bg-light text-dark border mb-1 d-inline-block text-truncate" style={{ maxWidth: '120px', fontSize: '0.72rem' }}>
                        {eventObj?.en || rev.eventType}
                      </span>
                    ) : (
                      <div className="text-muted small">—</div>
                    )}
                    <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                      <i className="bi bi-chat-left-dots me-1"></i>
                      {sourceObj?.en || rev.source || 'Direct'}
                    </div>
                  </td>

                  {/* Consent */}
                  <td>
                    {rev.consent?.granted ? (
                      <span className="badge bg-success-subtle text-success border border-success-subtle" title="Customer consent granted for public display">
                        <i className="bi bi-check-circle-fill me-1"></i>Yes
                      </span>
                    ) : (
                      <span className="badge bg-secondary-subtle text-secondary border" title="No public display consent recorded">
                        <i className="bi bi-shield-lock me-1"></i>No
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td>{getStatusBadge(rev.status)}</td>

                  {/* Date */}
                  <td className="small text-muted">{reviewDateStr}</td>

                  {/* Actions */}
                  <td className="text-end pe-4">
                    <div className="btn-group btn-group-sm" role="group" aria-label="Review actions">
                      {/* Preview */}
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => onPreview(rev)}
                        title="Preview Public Presentation"
                        aria-label={`Preview review from ${rev.customerDisplayName}`}
                      >
                        <i className="bi bi-eye-fill"></i>
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => onEdit(rev)}
                        title="Edit Review Details"
                        aria-label={`Edit review from ${rev.customerDisplayName}`}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>

                      {/* Approve (if pending) */}
                      {rev.status === 'pending' && (
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => onApprove(rev)}
                          title="Approve Review"
                          aria-label={`Approve review from ${rev.customerDisplayName}`}
                        >
                          <i className="bi bi-check2-circle"></i>
                        </button>
                      )}

                      {/* Reject (if pending) */}
                      {rev.status === 'pending' && (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => onReject(rev)}
                          title="Reject Review"
                          aria-label={`Reject review from ${rev.customerDisplayName}`}
                        >
                          <i className="bi bi-x-circle"></i>
                        </button>
                      )}

                      {/* Publish / Unpublish */}
                      {rev.status === 'published' ? (
                        <button
                          type="button"
                          className="btn btn-outline-warning"
                          onClick={() => onUnpublish(rev)}
                          title="Unpublish Review"
                          aria-label={`Unpublish review from ${rev.customerDisplayName}`}
                        >
                          <i className="bi bi-eye-slash-fill"></i>
                        </button>
                      ) : rev.status !== 'archived' && rev.status !== 'rejected' ? (
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          onClick={() => onPublish(rev)}
                          title={rev.consent?.granted ? 'Publish Review' : 'Cannot publish without customer consent'}
                          aria-label={`Publish review from ${rev.customerDisplayName}`}
                          disabled={!rev.consent?.granted}
                        >
                          <i className="bi bi-check-circle-fill"></i>
                        </button>
                      ) : null}

                      {/* Archive / Restore */}
                      {rev.status === 'archived' || rev.status === 'rejected' ? (
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          onClick={() => onRestore(rev)}
                          title="Restore Review to Pending"
                          aria-label={`Restore review from ${rev.customerDisplayName}`}
                        >
                          <i className="bi bi-arrow-counterclockwise"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => onArchive(rev)}
                          title="Archive Review"
                          aria-label={`Archive review from ${rev.customerDisplayName}`}
                        >
                          <i className="bi bi-archive-fill"></i>
                        </button>
                      )}

                      {/* Delete (only for archived or rejected) */}
                      {(rev.status === 'archived' || rev.status === 'rejected') && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => onDelete(rev)}
                          title="Delete Permanently"
                          aria-label={`Permanently delete review from ${rev.customerDisplayName}`}
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

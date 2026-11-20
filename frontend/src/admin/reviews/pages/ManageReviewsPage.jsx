import { useState, useEffect } from 'react';
import {
  fetchAdminReviews,
  createReview,
  updateReview,
  approveReview,
  rejectReview,
  updateReviewStatus,
  deleteReview,
} from '../../../services/reviewAdminService';
import ReviewFilters from '../components/ReviewFilters';
import ReviewTable from '../components/ReviewTable';
import ReviewModal from '../components/ReviewModal';
import ReviewPreviewModal from '../components/ReviewPreviewModal';
import ReviewActionModal from '../components/ReviewActionModal';

const DEFAULT_FILTERS = {
  search: '',
  statusFilter: 'all',
  ratingFilter: 'all',
  eventTypeFilter: 'all',
  sourceFilter: 'all',
  featuredFilter: 'all',
  sortBy: 'newest',
  page: 1,
  limit: 10,
};

export default function ManageReviewsPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [data, setData] = useState({
    items: [],
    pagination: { total: 0, page: 1, limit: 10, totalPages: 1 },
    counts: { total: 0, pending: 0, approved: 0, published: 0, rejected: 0, unpublished: 0, archived: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Modals state
  const [modalState, setModalState] = useState({ isOpen: false, data: null });
  const [previewModal, setPreviewModal] = useState({ isOpen: false, review: null });
  const [actionModal, setActionModal] = useState({
    isOpen: false,
    review: null,
    actionType: 'approve',
  });
  const [submittingAction, setSubmittingAction] = useState(false);

  useEffect(() => {
    document.title = 'Review Management | Aditi Caterers Admin';
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchAdminReviews(filters)
      .then((result) => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [filters, refreshTrigger]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? value : 1,
    }));
  };

  const handleResetFilters = () => setFilters(DEFAULT_FILTERS);

  const handleSaveReview = async (payload, editId) => {
    if (editId) {
      await updateReview(editId, payload);
    } else {
      await createReview(payload);
    }
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleOpenEdit = (review) => setModalState({ isOpen: true, data: review });
  const handleOpenPreview = (review) => setPreviewModal({ isOpen: true, review });
  const handleOpenAction = (review, actionType) => setActionModal({ isOpen: true, review, actionType });

  const handleConfirmAction = async () => {
    if (!actionModal.review) return;
    setSubmittingAction(true);
    try {
      const { review, actionType } = actionModal;
      const targetId = review.id || review._id;

      if (actionType === 'delete') {
        await deleteReview(targetId);
      } else if (actionType === 'approve') {
        await approveReview(targetId);
      } else if (actionType === 'reject') {
        await rejectReview(targetId);
      } else {
        const statusMap = {
          publish: 'published',
          unpublish: 'unpublished',
          archive: 'archived',
          restore: 'pending',
        };
        await updateReviewStatus(targetId, statusMap[actionType] || 'pending');
      }

      setActionModal({ isOpen: false, review: null, actionType: 'approve' });
      setRefreshTrigger((prev) => prev + 1);
    } finally {
      setSubmittingAction(false);
    }
  };

  const pagination = data.pagination || { total: 0, page: 1, totalPages: 1 };
  const counts = data.counts || { total: 0, pending: 0, approved: 0, published: 0, rejected: 0, unpublished: 0, archived: 0 };
  const isFiltered =
    filters.search ||
    filters.statusFilter !== 'all' ||
    filters.ratingFilter !== 'all' ||
    filters.eventTypeFilter !== 'all' ||
    filters.sourceFilter !== 'all' ||
    filters.featuredFilter !== 'all';

  return (
    <div>
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1">
            <i className="bi bi-chat-quote-fill me-2" style={{ color: '#641e2b' }}></i>
            Review Management
          </h1>
          <p className="text-muted small mb-0">
            Review, approve, and manage authentic customer feedback and testimonials for the website.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          {!loading && (
            <div className="d-none d-md-flex gap-2 me-2">
              <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-3 py-2">
                {counts.pending} Pending Review
              </span>
              <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2">
                {counts.published} Published Live
              </span>
            </div>
          )}

          <button
            type="button"
            className="btn btn-primary d-flex align-items-center gap-2"
            style={{ backgroundColor: '#641e2b', borderColor: '#641e2b' }}
            onClick={() => setModalState({ isOpen: true, data: null })}
          >
            <i className="bi bi-plus-circle-fill"></i>
            <span>Add Review</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <ReviewFilters
        filters={filters}
        counts={counts}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Loading */}
      {loading ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
          <div className="spinner-border mx-auto mb-3" style={{ color: '#641e2b' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mb-0">Loading customer reviews...</p>
        </div>
      ) : data.items.length === 0 ? (
        /* Empty State */
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
          <div
            className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mx-auto mb-3"
            style={{ width: '64px', height: '64px' }}
          >
            <i className="bi bi-chat-square-quote text-muted fs-2"></i>
          </div>
          <h3 className="h5 fw-bold text-dark mb-2">
            {isFiltered ? 'No matching reviews found' : 'No customer reviews yet'}
          </h3>
          <p className="text-muted small mb-3">
            {isFiltered
              ? 'Try adjusting your search query or filter options.'
              : 'Add customer feedback received via WhatsApp, feedback forms, or calls.'}
          </p>
          {isFiltered && (
            <div>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={handleResetFilters}
              >
                <i className="bi bi-arrow-counterclockwise me-1"></i>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <p className="text-muted small mb-2">
            Total: <strong>{counts.total}</strong> reviews · Showing <strong>{data.items.length}</strong> on this page
          </p>

          <ReviewTable
            reviews={data.items}
            onEdit={handleOpenEdit}
            onPreview={handleOpenPreview}
            onApprove={(r) => handleOpenAction(r, 'approve')}
            onReject={(r) => handleOpenAction(r, 'reject')}
            onPublish={(r) => handleOpenAction(r, 'publish')}
            onUnpublish={(r) => handleOpenAction(r, 'unpublish')}
            onArchive={(r) => handleOpenAction(r, 'archive')}
            onRestore={(r) => handleOpenAction(r, 'restore')}
            onDelete={(r) => handleOpenAction(r, 'delete')}
          />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 mt-3">
              <span className="small text-muted">
                Showing page <strong>{pagination.page}</strong> of <strong>{pagination.totalPages}</strong> ({pagination.total} reviews)
              </span>

              <nav aria-label="Review pagination">
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${pagination.page <= 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handleFilterChange('page', pagination.page - 1)}
                      disabled={pagination.page <= 1}
                      aria-label="Previous page"
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                  </li>

                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <li
                      key={pageNum}
                      className={`page-item ${pageNum === pagination.page ? 'active' : ''}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handleFilterChange('page', pageNum)}
                        style={
                          pageNum === pagination.page
                            ? { backgroundColor: '#641e2b', borderColor: '#641e2b' }
                            : {}
                        }
                      >
                        {pageNum}
                      </button>
                    </li>
                  ))}

                  <li className={`page-item ${pagination.page >= pagination.totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handleFilterChange('page', pagination.page + 1)}
                      disabled={pagination.page >= pagination.totalPages}
                      aria-label="Next page"
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </>
      )}

      {/* Add / Edit Modal */}
      <ReviewModal
        isOpen={modalState.isOpen}
        initialData={modalState.data}
        onClose={() => setModalState({ isOpen: false, data: null })}
        onSave={handleSaveReview}
      />

      {/* Public Preview Modal */}
      <ReviewPreviewModal
        isOpen={previewModal.isOpen}
        review={previewModal.review}
        onClose={() => setPreviewModal({ isOpen: false, review: null })}
      />

      {/* Action Confirmation Modal */}
      <ReviewActionModal
        isOpen={actionModal.isOpen}
        review={actionModal.review}
        actionType={actionModal.actionType}
        submitting={submittingAction}
        onClose={() => setActionModal({ isOpen: false, review: null, actionType: 'approve' })}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}

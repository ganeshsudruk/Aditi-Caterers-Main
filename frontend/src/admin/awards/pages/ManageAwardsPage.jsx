import { useState, useEffect } from 'react';
import {
  fetchAdminAwards,
  createAward,
  updateAward,
  updateAwardStatus,
  reorderAward,
  deleteAward,
} from '../../../services/awardAdminService';
import AwardTable from '../components/AwardTable';
import AwardFilters from '../components/AwardFilters';
import AwardModal from '../components/AwardModal';
import AwardPreviewModal from '../components/AwardPreviewModal';
import AwardActionModal from '../components/AwardActionModal';

const DEFAULT_FILTERS = {
  search: '',
  statusFilter: 'all',
  categoryFilter: 'all',
  featuredFilter: 'all',
  sortBy: 'order_asc',
  page: 1,
  limit: 10,
};

export default function ManageAwardsPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [data, setData] = useState({
    items: [],
    pagination: { total: 0, page: 1, limit: 10, totalPages: 1 },
    counts: { total: 0, published: 0, draft: 0, unpublished: 0, archived: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [awardModal, setAwardModal] = useState({ isOpen: false, data: null });
  const [previewModal, setPreviewModal] = useState({ isOpen: false, award: null });
  const [actionModal, setActionModal] = useState({
    isOpen: false,
    award: null,
    actionType: 'publish',
  });
  const [submittingAction, setSubmittingAction] = useState(false);

  useEffect(() => {
    document.title = 'Awards Management | Aditi Caterers Admin';
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchAdminAwards(filters)
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

  const handleSaveAward = async (payload, editId) => {
    if (editId) {
      await updateAward(editId, payload);
    } else {
      await createAward(payload);
    }
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleOpenEdit = (award) => setAwardModal({ isOpen: true, data: award });
  const handleOpenPreview = (award) => setPreviewModal({ isOpen: true, award });
  const handleOpenAction = (award, actionType) =>
    setActionModal({ isOpen: true, award, actionType });

  const handleConfirmAction = async () => {
    if (!actionModal.award) return;
    setSubmittingAction(true);
    try {
      const { award, actionType } = actionModal;

      if (actionType === 'delete') {
        await deleteAward(award.id || award._id);
      } else {
        const statusMap = {
          publish: 'published',
          unpublish: 'unpublished',
          archive: 'archived',
          restore: 'draft',
        };
        await updateAwardStatus(award.id || award._id, statusMap[actionType]);
      }

      setActionModal({ isOpen: false, award: null, actionType: 'publish' });
      setRefreshTrigger((prev) => prev + 1);
    } finally {
      setSubmittingAction(false);
    }
  };

  const handleReorder = async (id, direction) => {
    await reorderAward(id, direction);
    setRefreshTrigger((prev) => prev + 1);
  };

  const pagination = data.pagination || { total: 0, page: 1, totalPages: 1 };
  const counts = data.counts || { total: 0, published: 0, draft: 0, unpublished: 0, archived: 0 };
  const isFiltered =
    filters.search ||
    filters.statusFilter !== 'all' ||
    filters.categoryFilter !== 'all' ||
    filters.featuredFilter !== 'all';

  return (
    <div>
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1">
            <i className="bi bi-trophy-fill me-2" style={{ color: '#641e2b' }}></i>
            Awards Management
          </h1>
          <p className="text-muted small mb-0">
            Manage business awards, recognitions, and certificates displayed on the website.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          {!loading && (
            <div className="d-none d-md-flex gap-2 me-2">
              <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2">
                {counts.published} Published
              </span>
              <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-3 py-2">
                {counts.draft} Drafts
              </span>
            </div>
          )}

          <button
            type="button"
            className="btn btn-primary d-flex align-items-center gap-2"
            style={{ backgroundColor: '#641e2b', borderColor: '#641e2b' }}
            onClick={() => setAwardModal({ isOpen: true, data: null })}
          >
            <i className="bi bi-plus-circle-fill"></i>
            <span>Add Award</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <AwardFilters
        filters={filters}
        counts={counts}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Loading */}
      {loading ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
          <div
            className="spinner-border mx-auto mb-3"
            style={{ color: '#641e2b' }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mb-0">Loading awards...</p>
        </div>
      ) : data.items.length === 0 ? (
        /* Empty / No Results State */
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
          <div
            className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mx-auto mb-3"
            style={{ width: '64px', height: '64px' }}
          >
            <i className="bi bi-trophy text-muted fs-2"></i>
          </div>
          <h3 className="h5 fw-bold text-dark mb-2">
            {isFiltered ? 'No matching awards found' : 'No awards yet'}
          </h3>
          <p className="text-muted small mb-3">
            {isFiltered
              ? 'Try adjusting your search keywords or filter options.'
              : 'Add your first award or recognition to showcase your achievements on the website.'}
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
            Total: <strong>{counts.total}</strong> awards · Showing{' '}
            <strong>{data.items.length}</strong> on this page
          </p>

          <AwardTable
            awards={data.items}
            onEdit={handleOpenEdit}
            onPreview={handleOpenPreview}
            onPublish={(a) => handleOpenAction(a, 'publish')}
            onUnpublish={(a) => handleOpenAction(a, 'unpublish')}
            onArchive={(a) => handleOpenAction(a, 'archive')}
            onRestore={(a) => handleOpenAction(a, 'restore')}
            onDelete={(a) => handleOpenAction(a, 'delete')}
            onReorder={handleReorder}
          />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 mt-3">
              <span className="small text-muted">
                Showing page <strong>{pagination.page}</strong> of{' '}
                <strong>{pagination.totalPages}</strong> ({pagination.total} awards)
              </span>

              <nav aria-label="Awards pagination">
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

                  <li
                    className={`page-item ${pagination.page >= pagination.totalPages ? 'disabled' : ''}`}
                  >
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

      {/* Add / Edit Award Modal */}
      <AwardModal
        isOpen={awardModal.isOpen}
        initialData={awardModal.data}
        onClose={() => setAwardModal({ isOpen: false, data: null })}
        onSave={handleSaveAward}
      />

      {/* Public Preview Modal */}
      <AwardPreviewModal
        isOpen={previewModal.isOpen}
        award={previewModal.award}
        onClose={() => setPreviewModal({ isOpen: false, award: null })}
      />

      {/* Action Modal */}
      <AwardActionModal
        isOpen={actionModal.isOpen}
        award={actionModal.award}
        actionType={actionModal.actionType}
        submitting={submittingAction}
        onClose={() => setActionModal({ isOpen: false, award: null, actionType: 'publish' })}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}

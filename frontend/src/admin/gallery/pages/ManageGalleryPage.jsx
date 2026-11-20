import { useState, useEffect } from 'react';
import {
  fetchAdminGallery,
  createGalleryItem,
  updateGalleryItem,
  updateGalleryStatus,
  reorderGalleryItem,
  deleteGalleryItem,
} from '../../../services/galleryAdminService';
import GalleryTable from '../components/GalleryTable';
import GalleryFilters from '../components/GalleryFilters';
import GalleryModal from '../components/GalleryModal';
import GalleryPreviewModal from '../components/GalleryPreviewModal';
import GalleryActionModal from '../components/GalleryActionModal';

const DEFAULT_FILTERS = {
  search: '',
  statusFilter: 'all',
  categoryFilter: 'all',
  featuredFilter: 'all',
  sortBy: 'order_asc',
  page: 1,
  limit: 10,
};

export default function ManageGalleryPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [data, setData] = useState({
    items: [],
    pagination: { total: 0, page: 1, limit: 10, totalPages: 1 },
    counts: { total: 0, published: 0, draft: 0, unpublished: 0, archived: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Modals state
  const [photoModal, setPhotoModal] = useState({ isOpen: false, data: null });
  const [previewModal, setPreviewModal] = useState({ isOpen: false, photo: null });
  const [actionModal, setActionModal] = useState({
    isOpen: false,
    photo: null,
    actionType: 'publish',
  });
  const [submittingAction, setSubmittingAction] = useState(false);

  useEffect(() => {
    document.title = 'Gallery Management | Aditi Caterers Admin';
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchAdminGallery(filters)
      .then((result) => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [filters, refreshTrigger]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? value : 1,
    }));
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleSavePhoto = async (payload, editId) => {
    if (editId) {
      await updateGalleryItem(editId, payload);
    } else {
      await createGalleryItem(payload);
    }
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleOpenEdit = (photo) => {
    setPhotoModal({ isOpen: true, data: photo });
  };

  const handleOpenPreview = (photo) => {
    setPreviewModal({ isOpen: true, photo });
  };

  const handleOpenAction = (photo, actionType) => {
    setActionModal({ isOpen: true, photo, actionType });
  };

  const handleConfirmAction = async () => {
    if (!actionModal.photo) return;
    setSubmittingAction(true);
    try {
      const { photo, actionType } = actionModal;

      if (actionType === 'delete') {
        await deleteGalleryItem(photo.id);
      } else {
        let targetStatus = 'draft';
        if (actionType === 'publish') targetStatus = 'published';
        else if (actionType === 'unpublish') targetStatus = 'unpublished';
        else if (actionType === 'archive') targetStatus = 'archived';
        else if (actionType === 'restore') targetStatus = 'draft';
        await updateGalleryStatus(photo.id, targetStatus);
      }

      setActionModal({ isOpen: false, photo: null, actionType: 'publish' });
      setRefreshTrigger((prev) => prev + 1);
    } finally {
      setSubmittingAction(false);
    }
  };

  const handleReorder = async (id, direction) => {
    await reorderGalleryItem(id, direction);
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
            <i className="bi bi-images me-2" style={{ color: '#641e2b' }}></i>
            Gallery Management
          </h1>
          <p className="text-muted small mb-0">
            Upload and manage event photos, food spreads, and catering arrangements displayed on the
            website.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          {/* Stats summary */}
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
            onClick={() => setPhotoModal({ isOpen: true, data: null })}
          >
            <i className="bi bi-plus-circle-fill"></i>
            <span>Add Photo</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <GalleryFilters
        filters={filters}
        counts={counts}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Loading State */}
      {loading ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
          <div
            className="spinner-border mx-auto mb-3"
            style={{ color: '#641e2b' }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mb-0">Loading gallery photos...</p>
        </div>
      ) : data.items.length === 0 ? (
        /* Empty / No Results State */
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
          <div
            className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mx-auto mb-3"
            style={{ width: '64px', height: '64px' }}
          >
            <i className="bi bi-images text-muted fs-2"></i>
          </div>
          <h3 className="h5 fw-bold text-dark mb-2">
            {isFiltered ? 'No matching photos found' : 'No gallery photos yet'}
          </h3>
          <p className="text-muted small mb-3">
            {isFiltered
              ? 'Try adjusting your search keywords or filter options.'
              : 'Upload your first event photograph to showcase your catering work on the website.'}
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
        /* Photo Table */
        <>
          {/* Total count */}
          <p className="text-muted small mb-2">
            Total: <strong>{counts.total}</strong> photos · Showing <strong>{data.items.length}</strong> on this page
          </p>

          <GalleryTable
            photos={data.items}
            onEdit={handleOpenEdit}
            onPreview={handleOpenPreview}
            onPublish={(p) => handleOpenAction(p, 'publish')}
            onUnpublish={(p) => handleOpenAction(p, 'unpublish')}
            onArchive={(p) => handleOpenAction(p, 'archive')}
            onRestore={(p) => handleOpenAction(p, 'restore')}
            onDelete={(p) => handleOpenAction(p, 'delete')}
            onReorder={handleReorder}
          />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 mt-3">
              <span className="small text-muted">
                Showing page <strong>{pagination.page}</strong> of{' '}
                <strong>{pagination.totalPages}</strong> ({pagination.total} photos)
              </span>

              <nav aria-label="Gallery pagination">
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

      {/* Add / Edit Photo Modal */}
      <GalleryModal
        isOpen={photoModal.isOpen}
        initialData={photoModal.data}
        onClose={() => setPhotoModal({ isOpen: false, data: null })}
        onSave={handleSavePhoto}
      />

      {/* Public Preview Modal */}
      <GalleryPreviewModal
        isOpen={previewModal.isOpen}
        photo={previewModal.photo}
        onClose={() => setPreviewModal({ isOpen: false, photo: null })}
      />

      {/* Action Modal (Publish / Unpublish / Archive / Restore / Delete) */}
      <GalleryActionModal
        isOpen={actionModal.isOpen}
        photo={actionModal.photo}
        actionType={actionModal.actionType}
        submitting={submittingAction}
        onClose={() => setActionModal({ isOpen: false, photo: null, actionType: 'publish' })}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}

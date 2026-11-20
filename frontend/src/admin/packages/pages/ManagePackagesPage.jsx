import { useState, useEffect } from 'react';
import {
  fetchAdminPackages,
  createPackage,
  updatePackage,
  updatePackageStatus,
  reorderPackage,
} from '../../../services/packageAdminService';
import PackageTable from '../components/PackageTable';
import PackageFilters from '../components/PackageFilters';
import PackageModal from '../components/PackageModal';
import PackagePreviewModal from '../components/PackagePreviewModal';
import PackageActionModal from '../components/PackageActionModal';

const DEFAULT_FILTERS = {
  search: '',
  statusFilter: 'all',
  serviceTypeFilter: 'all',
  sortBy: 'order_asc',
  page: 1,
  limit: 10,
};

export default function ManagePackagesPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [data, setData] = useState({
    items: [],
    pagination: { total: 0, page: 1, limit: 10, totalPages: 1 },
    counts: { total: 0, published: 0, draft: 0, unpublished: 0, archived: 0 },
  });
  const [loading, setLoading] = useState(true);

  // Modals state
  const [pkgModal, setPkgModal] = useState({ isOpen: false, data: null });
  const [previewModal, setPreviewModal] = useState({ isOpen: false, pkg: null });
  const [actionModal, setActionModal] = useState({
    isOpen: false,
    pkg: null,
    actionType: 'publish',
  });
  const [submittingAction, setSubmittingAction] = useState(false);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    document.title = 'Package Management | Aditi Caterers Admin';
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchAdminPackages(filters)
      .then((result) => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoading(false);
        }
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

  const handleSavePackage = async (payload, editId) => {
    if (editId) {
      await updatePackage(editId, payload);
    } else {
      await createPackage(payload);
    }
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleOpenEdit = (pkg) => {
    setPkgModal({ isOpen: true, data: pkg });
  };

  const handleOpenPreview = (pkg) => {
    setPreviewModal({ isOpen: true, pkg });
  };

  const handleOpenAction = (pkg, actionType) => {
    setActionModal({ isOpen: true, pkg, actionType });
  };

  const handleConfirmAction = async () => {
    if (!actionModal.pkg) return;
    setSubmittingAction(true);
    try {
      const { pkg, actionType } = actionModal;
      let targetStatus = 'draft';
      if (actionType === 'publish') targetStatus = 'published';
      else if (actionType === 'unpublish') targetStatus = 'unpublished';
      else if (actionType === 'archive') targetStatus = 'archived';
      else if (actionType === 'restore') targetStatus = 'draft';

      await updatePackageStatus(pkg.id, targetStatus);
      setActionModal({ isOpen: false, pkg: null, actionType: 'publish' });
      setRefreshTrigger((prev) => prev + 1);
    } finally {
      setSubmittingAction(false);
    }
  };

  const handleReorder = async (id, direction) => {
    await reorderPackage(id, direction);
    setRefreshTrigger((prev) => prev + 1);
  };

  const pagination = data.pagination || { total: 0, page: 1, totalPages: 1 };

  return (
    <div>
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1">
            <i className="bi bi-box-seam-fill me-2" style={{ color: '#641e2b' }}></i>
            Package Management
          </h1>
          <p className="text-muted small mb-0">
            Configure catering packages, guest capacities, pricing, inclusions, and menu choices.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-primary d-flex align-items-center gap-2"
            style={{ backgroundColor: '#641e2b', borderColor: '#641e2b' }}
            onClick={() => setPkgModal({ isOpen: true, data: null })}
          >
            <i className="bi bi-plus-circle-fill"></i>
            <span>Add Package</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <PackageFilters
        filters={filters}
        counts={data.counts || { total: 0, published: 0, draft: 0, unpublished: 0, archived: 0 }}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Loading State */}
      {loading ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
          <div className="spinner-border text-maroon mx-auto mb-3" style={{ color: '#641e2b' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mb-0">Loading catering packages...</p>
        </div>
      ) : data.items.length === 0 ? (
        /* Empty / No Results State */
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
          <div
            className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mx-auto mb-3"
            style={{ width: '64px', height: '64px' }}
          >
            <i className="bi bi-box-seam text-muted fs-2"></i>
          </div>
          <h3 className="h5 fw-bold text-dark mb-2">
            {filters.search || filters.statusFilter !== 'all' || filters.serviceTypeFilter !== 'all'
              ? 'No matching packages found'
              : 'No catering packages yet'}
          </h3>
          <p className="text-muted small mb-3">
            {filters.search || filters.statusFilter !== 'all' || filters.serviceTypeFilter !== 'all'
              ? 'Try modifying your search query or filter options.'
              : 'Create your first catering package to display options on the website.'}
          </p>
          {(filters.search || filters.statusFilter !== 'all' || filters.serviceTypeFilter !== 'all') && (
            <div>
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleResetFilters}>
                <i className="bi bi-arrow-counterclockwise me-1"></i> Reset Filters
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Table of Packages */
        <>
          <PackageTable
            packages={data.items}
            onEdit={handleOpenEdit}
            onPreview={handleOpenPreview}
            onPublish={(p) => handleOpenAction(p, 'publish')}
            onUnpublish={(p) => handleOpenAction(p, 'unpublish')}
            onArchive={(p) => handleOpenAction(p, 'archive')}
            onRestore={(p) => handleOpenAction(p, 'restore')}
            onReorder={handleReorder}
          />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 mt-3">
              <span className="small text-muted">
                Showing page <strong>{pagination.page}</strong> of <strong>{pagination.totalPages}</strong> ({pagination.total} packages)
              </span>

              <nav aria-label="Package pagination">
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

      {/* Add / Edit Package Modal */}
      <PackageModal
        isOpen={pkgModal.isOpen}
        initialData={pkgModal.data}
        onClose={() => setPkgModal({ isOpen: false, data: null })}
        onSave={handleSavePackage}
      />

      {/* Public Preview Modal */}
      <PackagePreviewModal
        isOpen={previewModal.isOpen}
        pkg={previewModal.pkg}
        onClose={() => setPreviewModal({ isOpen: false, pkg: null })}
      />

      {/* Action Modal (Publish / Unpublish / Archive / Restore) */}
      <PackageActionModal
        isOpen={actionModal.isOpen}
        pkg={actionModal.pkg}
        actionType={actionModal.actionType}
        submitting={submittingAction}
        onClose={() => setActionModal({ isOpen: false, pkg: null, actionType: 'publish' })}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}

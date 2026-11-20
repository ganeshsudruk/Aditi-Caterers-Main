import { useState, useEffect } from 'react';
import {
  fetchAdminServices,
  createService,
  updateService,
  updateServiceStatus,
  reorderService,
} from '../../../services/serviceAdminService';
import ServiceTable from '../components/ServiceTable';
import ServiceFilters from '../components/ServiceFilters';
import ServiceModal from '../components/ServiceModal';
import ServicePreviewModal from '../components/ServicePreviewModal';
import ServiceActionModal from '../components/ServiceActionModal';

const DEFAULT_FILTERS = {
  search: '',
  statusFilter: 'all',
  sortBy: 'order_asc',
  page: 1,
  limit: 10,
};

export default function ManageServicesPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [data, setData] = useState({
    items: [],
    pagination: { total: 0, page: 1, limit: 10, totalPages: 1 },
    counts: { total: 0, published: 0, draft: 0, unpublished: 0, archived: 0 },
  });
  const [loading, setLoading] = useState(true);

  // Modals state
  const [serviceModal, setServiceModal] = useState({ isOpen: false, data: null });
  const [previewModal, setPreviewModal] = useState({ isOpen: false, service: null });
  const [actionModal, setActionModal] = useState({
    isOpen: false,
    service: null,
    actionType: 'publish', // publish, unpublish, archive, restore
  });
  const [submittingAction, setSubmittingAction] = useState(false);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    document.title = 'Service Management | Aditi Caterers Admin';
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchAdminServices(filters)
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

  const handleSaveService = async (payload, editId) => {
    if (editId) {
      await updateService(editId, payload);
    } else {
      await createService(payload);
    }
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleOpenEdit = (service) => {
    setServiceModal({ isOpen: true, data: service });
  };

  const handleOpenPreview = (service) => {
    setPreviewModal({ isOpen: true, service });
  };

  const handleOpenAction = (service, actionType) => {
    setActionModal({ isOpen: true, service, actionType });
  };

  const handleConfirmAction = async () => {
    if (!actionModal.service) return;
    setSubmittingAction(true);
    try {
      const { service, actionType } = actionModal;
      let targetStatus = 'draft';
      if (actionType === 'publish') targetStatus = 'published';
      else if (actionType === 'unpublish') targetStatus = 'unpublished';
      else if (actionType === 'archive') targetStatus = 'archived';
      else if (actionType === 'restore') targetStatus = 'draft';

      await updateServiceStatus(service.id, targetStatus);
      setActionModal({ isOpen: false, service: null, actionType: 'publish' });
      setRefreshTrigger((prev) => prev + 1);
    } finally {
      setSubmittingAction(false);
    }
  };

  const handleReorder = async (id, direction) => {
    await reorderService(id, direction);
    setRefreshTrigger((prev) => prev + 1);
  };

  const pagination = data.pagination || { total: 0, page: 1, totalPages: 1 };

  return (
    <div>
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1">
            <i className="bi bi-briefcase-fill me-2" style={{ color: '#641e2b' }}></i>
            Service Management
          </h1>
          <p className="text-muted small mb-0">
            Manage catering services displayed on the public website without code changes.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-primary d-flex align-items-center gap-2"
            style={{ backgroundColor: '#641e2b', borderColor: '#641e2b' }}
            onClick={() => setServiceModal({ isOpen: true, data: null })}
          >
            <i className="bi bi-plus-circle-fill"></i>
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <ServiceFilters
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
          <p className="text-muted mb-0">Loading services...</p>
        </div>
      ) : data.items.length === 0 ? (
        /* Empty / No Results State */
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
          <div
            className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mx-auto mb-3"
            style={{ width: '64px', height: '64px' }}
          >
            <i className="bi bi-briefcase text-muted fs-2"></i>
          </div>
          <h3 className="h5 fw-bold text-dark mb-2">
            {filters.search || filters.statusFilter !== 'all'
              ? 'No matching services found'
              : 'No catering services yet'}
          </h3>
          <p className="text-muted small mb-3">
            {filters.search || filters.statusFilter !== 'all'
              ? 'Try modifying your search query or status filter.'
              : 'Add your first service to present it on the website.'}
          </p>
          {(filters.search || filters.statusFilter !== 'all') && (
            <div>
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleResetFilters}>
                <i className="bi bi-arrow-counterclockwise me-1"></i> Reset Filters
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Table of Services */
        <>
          <ServiceTable
            services={data.items}
            onEdit={handleOpenEdit}
            onPreview={handleOpenPreview}
            onPublish={(s) => handleOpenAction(s, 'publish')}
            onUnpublish={(s) => handleOpenAction(s, 'unpublish')}
            onArchive={(s) => handleOpenAction(s, 'archive')}
            onRestore={(s) => handleOpenAction(s, 'restore')}
            onReorder={handleReorder}
          />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 mt-3">
              <span className="small text-muted">
                Showing page <strong>{pagination.page}</strong> of <strong>{pagination.totalPages}</strong> ({pagination.total} services)
              </span>

              <nav aria-label="Service list pagination">
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

      {/* Add / Edit Service Modal */}
      <ServiceModal
        isOpen={serviceModal.isOpen}
        initialData={serviceModal.data}
        onClose={() => setServiceModal({ isOpen: false, data: null })}
        onSave={handleSaveService}
      />

      {/* Public Preview Modal */}
      <ServicePreviewModal
        isOpen={previewModal.isOpen}
        service={previewModal.service}
        onClose={() => setPreviewModal({ isOpen: false, service: null })}
      />

      {/* Action Confirmation Modal (Publish/Unpublish/Archive/Restore) */}
      <ServiceActionModal
        isOpen={actionModal.isOpen}
        service={actionModal.service}
        actionType={actionModal.actionType}
        submitting={submittingAction}
        onClose={() => setActionModal({ isOpen: false, service: null, actionType: 'publish' })}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}

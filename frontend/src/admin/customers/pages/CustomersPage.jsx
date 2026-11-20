import { useState, useEffect } from 'react';
import {
  fetchAdminCustomers,
  createCustomer,
  updateCustomer,
  archiveCustomer,
  restoreCustomer,
} from '../../../services/customerAdminService';
import { useAuth } from '../../../context/useAuth';
import CustomerTable from '../components/CustomerTable';
import CustomerFilters from '../components/CustomerFilters';
import CustomerModal from '../components/CustomerModal';
import CustomerArchiveModal from '../components/CustomerArchiveModal';

const DEFAULT_FILTERS = {
  search: '',
  bookingFilter: 'all',
  archiveFilter: 'active',
  sortBy: 'created_desc',
  page: 1,
  limit: 10,
};

export default function CustomersPage() {
  const { admin } = useAuth();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [data, setData] = useState({
    items: [],
    pagination: { total: 0, page: 1, limit: 10, totalPages: 1 },
    counts: { total: 0, active: 0, archived: 0 },
  });
  const [loading, setLoading] = useState(true);

  // Modals state
  const [modalState, setModalState] = useState({ isOpen: false, data: null });
  const [archiveModal, setArchiveModal] = useState({ isOpen: false, customer: null, isRestore: false });
  const [submittingAction, setSubmittingAction] = useState(false);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    document.title = 'Customer Management | Aditi Caterers Admin';
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchAdminCustomers(filters)
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

  const handleSaveCustomer = async (formData, editId) => {
    if (editId) {
      await updateCustomer(editId, formData, admin?.name || 'Administrator');
    } else {
      await createCustomer(formData, admin?.name || 'Administrator');
    }
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleOpenEdit = (customer) => {
    setModalState({ isOpen: true, data: customer });
  };

  const handleOpenArchive = (customer) => {
    setArchiveModal({ isOpen: true, customer, isRestore: false });
  };

  const handleOpenRestore = (customer) => {
    setArchiveModal({ isOpen: true, customer, isRestore: true });
  };

  const handleConfirmArchiveRestore = async () => {
    if (!archiveModal.customer) return;
    setSubmittingAction(true);
    try {
      if (archiveModal.isRestore) {
        await restoreCustomer(archiveModal.customer.id, admin?.name || 'Administrator');
      } else {
        await archiveCustomer(archiveModal.customer.id, admin?.name || 'Administrator');
      }
      setArchiveModal({ isOpen: false, customer: null, isRestore: false });
      setRefreshTrigger((prev) => prev + 1);
    } finally {
      setSubmittingAction(false);
    }
  };

  const pagination = data.pagination || { total: 0, page: 1, totalPages: 1 };

  return (
    <div>
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1">
            <i className="bi bi-people-fill me-2" style={{ color: '#641e2b' }}></i>
            Customers
          </h1>
          <p className="text-muted small mb-0">
            Manage customer profiles and view their booking history.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-primary d-flex align-items-center gap-2"
            style={{ backgroundColor: '#641e2b', borderColor: '#641e2b' }}
            onClick={() => setModalState({ isOpen: true, data: null })}
          >
            <i className="bi bi-person-plus-fill"></i>
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <CustomerFilters
        filters={filters}
        counts={data.counts || { total: 0, active: 0, archived: 0 }}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Loading State */}
      {loading ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
          <div className="spinner-border text-maroon mx-auto mb-3" style={{ color: '#641e2b' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mb-0">Loading customer records...</p>
        </div>
      ) : data.items.length === 0 ? (
        /* Empty / No Results State */
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
          <div
            className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mx-auto mb-3"
            style={{ width: '64px', height: '64px' }}
          >
            <i className="bi bi-people text-muted fs-2"></i>
          </div>
          <h3 className="h5 fw-bold text-dark mb-2">
            {filters.search || filters.bookingFilter !== 'all' || filters.archiveFilter !== 'active'
              ? 'No matching customers found'
              : 'No customer records yet'}
          </h3>
          <p className="text-muted small mb-3">
            {filters.search || filters.bookingFilter !== 'all' || filters.archiveFilter !== 'active'
              ? 'Try modifying your search term or filter settings.'
              : 'Customer records will be created automatically as enquiries arrive, or you can add one manually.'}
          </p>
          {(filters.search || filters.bookingFilter !== 'all' || filters.archiveFilter !== 'active') && (
            <div>
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleResetFilters}>
                <i className="bi bi-arrow-counterclockwise me-1"></i> Reset Filters
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Customer Table */
        <>
          <CustomerTable
            customers={data.items}
            onEdit={handleOpenEdit}
            onArchive={handleOpenArchive}
            onRestore={handleOpenRestore}
          />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 mt-3">
              <span className="small text-muted">
                Showing page <strong>{pagination.page}</strong> of <strong>{pagination.totalPages}</strong> ({pagination.total} total customers)
              </span>

              <nav aria-label="Customer list pagination">
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

      {/* Customer Add/Edit Modal */}
      <CustomerModal
        isOpen={modalState.isOpen}
        initialData={modalState.data}
        onClose={() => setModalState({ isOpen: false, data: null })}
        onSave={handleSaveCustomer}
      />

      {/* Archive / Restore Confirmation Modal */}
      <CustomerArchiveModal
        isOpen={archiveModal.isOpen}
        customer={archiveModal.customer}
        isRestore={archiveModal.isRestore}
        submitting={submittingAction}
        onClose={() => setArchiveModal({ isOpen: false, customer: null, isRestore: false })}
        onConfirm={handleConfirmArchiveRestore}
      />
    </div>
  );
}

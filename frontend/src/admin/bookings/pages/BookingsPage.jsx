import { useEffect, useState } from 'react';
import {
  fetchAdminBookings,
  createManualBooking,
  updateBookingStatus,
} from '../../../services/bookingAdminService';
import { useAuth } from '../../../context/useAuth';
import BookingTable from '../components/BookingTable';
import BookingFilters from '../components/BookingFilters';
import ManualBookingModal from '../components/ManualBookingModal';

const DEFAULT_FILTERS = {
  search: '',
  status: 'all',
  eventType: 'all',
  cateringType: 'all',
  sortBy: 'created_desc',
  page: 1,
  limit: 10,
};

export default function BookingsPage() {
  const { admin } = useAuth();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [data, setData] = useState({
    items: [],
    pagination: { total: 0, page: 1, limit: 10, totalPages: 1 },
  });
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [statusConfirmDialog, setStatusConfirmDialog] = useState(null); // { id, newStatus, reason }

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    document.title = 'Booking & Enquiry Management | Aditi Caterers Admin';
  }, []);

  // Fetch when filters or refreshTrigger change
  useEffect(() => {
    let isMounted = true;
    fetchAdminBookings(filters)
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
    setLoading(true);
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? value : 1, // Reset page to 1 on filter/search change
    }));
  };

  const handleResetFilters = () => {
    setLoading(true);
    setFilters(DEFAULT_FILTERS);
  };

  const handleCreateBooking = async (formData, adminName) => {
    await createManualBooking(formData, adminName);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleQuickStatusClick = (id, newStatus) => {
    // If setting to confirmed or cancelled, open confirmation dialog per requirement
    if (newStatus === 'confirmed' || newStatus === 'cancelled') {
      setStatusConfirmDialog({ id, newStatus, reason: '' });
    } else {
      executeStatusUpdate(id, newStatus, '');
    }
  };

  const executeStatusUpdate = async (id, newStatus, reason) => {
    await updateBookingStatus(id, newStatus, reason, admin?.name || 'Administrator');
    setStatusConfirmDialog(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  const pagination = data.pagination || { total: 0, page: 1, totalPages: 1 };

  return (
    <div>
      {/* Page Title & Top Actions */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h1 className="h3 fw-bold text-dark mb-0">Booking & Enquiry Management</h1>
            <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle">
              {pagination.total} Records
            </span>
          </div>
          <p className="text-muted small mb-0">
            Review customer website requests, track catering quotations, and manage confirmed bookings.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-sm btn-maroon d-flex align-items-center gap-2"
            style={{ backgroundColor: '#641e2b', color: '#fff' }}
            onClick={() => setShowCreateModal(true)}
            aria-label="Create new booking manually"
          >
            <i className="bi bi-plus-circle-fill" aria-hidden="true"></i>
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <BookingFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-maroon" role="status" style={{ color: '#641e2b' }}>
            <span className="visually-hidden">Loading bookings...</span>
          </div>
          <p className="text-muted small mt-2">Loading booking records...</p>
        </div>
      ) : (
        <>
          {/* Main Bookings Table */}
          <BookingTable
            bookings={data.items}
            onQuickStatusChange={handleQuickStatusClick}
          />

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 mt-3 pb-4">
              <span className="small text-muted">
                Showing page <strong>{pagination.page}</strong> of{' '}
                <strong>{pagination.totalPages}</strong> ({pagination.total} total bookings)
              </span>

              <nav aria-label="Bookings table pagination">
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${pagination.page <= 1 ? 'disabled' : ''}`}>
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => handleFilterChange('page', pagination.page - 1)}
                      disabled={pagination.page <= 1}
                      aria-label="Previous page"
                    >
                      <i className="bi bi-chevron-left" aria-hidden="true"></i>
                    </button>
                  </li>

                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                    <li
                      key={p}
                      className={`page-item ${pagination.page === p ? 'active' : ''}`}
                    >
                      <button
                        type="button"
                        className="page-link"
                        style={pagination.page === p ? { backgroundColor: '#641e2b', borderColor: '#641e2b' } : {}}
                        onClick={() => handleFilterChange('page', p)}
                      >
                        {p}
                      </button>
                    </li>
                  ))}

                  <li
                    className={`page-item ${
                      pagination.page >= pagination.totalPages ? 'disabled' : ''
                    }`}
                  >
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => handleFilterChange('page', pagination.page + 1)}
                      disabled={pagination.page >= pagination.totalPages}
                      aria-label="Next page"
                    >
                      <i className="bi bi-chevron-right" aria-hidden="true"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </>
      )}

      {/* Manual Booking Creation Modal */}
      {showCreateModal && (
        <ManualBookingModal
          onClose={() => setShowCreateModal(false)}
          onCreated={handleCreateBooking}
        />
      )}

      {/* Status Confirmation Modal for Confirmed / Cancelled */}
      {statusConfirmDialog && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1060 }}></div>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ zIndex: 1065 }}
            aria-modal="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 border-0 shadow">
                <div className="modal-header border-bottom px-4 pt-4 pb-2">
                  <h3 className="modal-title h6 fw-bold mb-0">
                    {statusConfirmDialog.newStatus === 'confirmed'
                      ? 'Confirm Booking?'
                      : 'Cancel Booking?'}
                  </h3>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setStatusConfirmDialog(null)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body px-4 py-3">
                  {statusConfirmDialog.newStatus === 'confirmed' ? (
                    <div>
                      <p className="small text-muted mb-2">
                        Marking this booking as <strong>Confirmed</strong> indicates that menu, pricing,
                        and terms have been finalized with the customer.
                      </p>
                      <div className="alert alert-info py-2 px-3 small mb-0">
                        <i className="bi bi-info-circle me-1" aria-hidden="true"></i>
                        Booking ID: <strong>{statusConfirmDialog.id}</strong>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="small text-muted mb-2">
                        Please provide a reason for cancelling booking{' '}
                        <strong>{statusConfirmDialog.id}</strong>:
                      </p>
                      <textarea
                        className="form-control form-control-sm"
                        rows="3"
                        placeholder="e.g. Customer postponed event, chosen alternate dates..."
                        value={statusConfirmDialog.reason}
                        onChange={(e) =>
                          setStatusConfirmDialog((prev) => ({
                            ...prev,
                            reason: e.target.value,
                          }))
                        }
                      ></textarea>
                    </div>
                  )}
                </div>
                <div className="modal-footer border-top px-4 py-3">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setStatusConfirmDialog(null)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${
                      statusConfirmDialog.newStatus === 'confirmed'
                        ? 'btn-success'
                        : 'btn-danger'
                    }`}
                    onClick={() =>
                      executeStatusUpdate(
                        statusConfirmDialog.id,
                        statusConfirmDialog.newStatus,
                        statusConfirmDialog.reason
                      )
                    }
                  >
                    {statusConfirmDialog.newStatus === 'confirmed'
                      ? 'Yes, Mark Confirmed'
                      : 'Yes, Cancel Booking'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  fetchCustomerById,
  updateCustomer,
  archiveCustomer,
  restoreCustomer,
  addCustomerNote,
} from '../../../services/customerAdminService';
import { BOOKING_STATUSES } from '../../../services/bookingAdminService';
import { useAuth } from '../../../context/useAuth';
import CustomerModal from '../components/CustomerModal';
import CustomerArchiveModal from '../components/CustomerArchiveModal';

export default function CustomerDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useAuth();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Note state
  const [noteText, setNoteText] = useState('');
  const [addingNote, setAddingNote] = useState(false);

  // Edit / Archive Modals
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [submittingAction, setSubmittingAction] = useState(false);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    let isMounted = true;
    document.title = `Customer ${id} | Aditi Caterers Admin`;

    fetchCustomerById(id)
      .then((data) => {
        if (isMounted) {
          setCustomer(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Unable to load customer profile.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, refreshTrigger]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    setAddingNote(true);
    try {
      await addCustomerNote(id, noteText, admin?.name || 'Administrator');
      setNoteText('');
      setRefreshTrigger((prev) => prev + 1);
    } finally {
      setAddingNote(false);
    }
  };

  const handleSaveCustomer = async (formData) => {
    await updateCustomer(id, formData, admin?.name || 'Administrator');
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleArchiveRestoreConfirm = async () => {
    setSubmittingAction(true);
    try {
      if (customer.isArchived) {
        await restoreCustomer(id, admin?.name || 'Administrator');
      } else {
        await archiveCustomer(id, admin?.name || 'Administrator');
      }
      setArchiveModalOpen(false);
      setRefreshTrigger((prev) => prev + 1);
    } finally {
      setSubmittingAction(false);
    }
  };

  if (loading) {
    return (
      <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
        <div className="spinner-border text-maroon mx-auto mb-3" style={{ color: '#641e2b' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mb-0">Loading customer profile...</p>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
        <div
          className="rounded-circle bg-danger-subtle d-inline-flex align-items-center justify-content-center mx-auto mb-3"
          style={{ width: '64px', height: '64px' }}
        >
          <i className="bi bi-person-x-fill text-danger fs-2"></i>
        </div>
        <h2 className="h4 fw-bold text-dark mb-2">Customer Not Found</h2>
        <p className="text-muted small mb-4">
          {error || 'The customer you are looking for does not exist or has been removed.'}
        </p>
        <div>
          <Link to="/admin/customers" className="btn btn-primary" style={{ backgroundColor: '#641e2b', borderColor: '#641e2b' }}>
            <i className="bi bi-arrow-left me-2"></i> Back to Customers
          </Link>
        </div>
      </div>
    );
  }

  const cleanPhone = customer.normalizedPhone || customer.phone?.replace(/\D/g, '');
  const waUrl = cleanPhone ? `https://wa.me/91${cleanPhone.slice(-10)}` : null;

  return (
    <div>
      {/* Navigation breadcrumb */}
      <div className="mb-3">
        <Link
          to="/admin/customers"
          className="text-decoration-none text-muted small d-inline-flex align-items-center gap-1"
        >
          <i className="bi bi-arrow-left"></i>
          <span>Back to All Customers</span>
        </Link>
      </div>

      {/* Top Banner / Customer Summary Bar */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
          <div className="d-flex align-items-center gap-3">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
              style={{
                width: '56px',
                height: '56px',
                backgroundColor: '#f8e9eb',
                color: '#641e2b',
                fontSize: '1.4rem',
              }}
            >
              {customer.name ? customer.name.charAt(0).toUpperCase() : 'C'}
            </div>
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <h1 className="h3 fw-bold text-dark mb-0">{customer.name}</h1>
                {customer.isArchived ? (
                  <span className="badge bg-secondary-subtle text-secondary border">Archived</span>
                ) : (
                  <span className="badge bg-success-subtle text-success border border-success-subtle">
                    Active
                  </span>
                )}
                <span className="badge bg-light text-secondary border">
                  ID: {customer.id}
                </span>
              </div>
              <p className="text-muted small mb-0">
                Created on{' '}
                {new Date(customer.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
                {customer.updatedAt && (
                  <> • Last updated {new Date(customer.updatedAt).toLocaleDateString('en-IN')}</>
                )}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex flex-wrap align-items-center gap-2">
            {customer.phone && (
              <a
                href={`tel:${customer.phone}`}
                className="btn btn-sm btn-outline-dark d-flex align-items-center gap-1"
              >
                <i className="bi bi-telephone-fill"></i>
                <span>Call Customer</span>
              </a>
            )}

            {waUrl && (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-success d-flex align-items-center gap-1"
              >
                <i className="bi bi-whatsapp"></i>
                <span>WhatsApp</span>
              </a>
            )}

            <button
              type="button"
              className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
              onClick={() => setEditModalOpen(true)}
            >
              <i className="bi bi-pencil-fill"></i>
              <span>Edit Details</span>
            </button>

            {customer.isArchived ? (
              <button
                type="button"
                className="btn btn-sm btn-outline-success d-flex align-items-center gap-1"
                onClick={() => setArchiveModalOpen(true)}
              >
                <i className="bi bi-arrow-counterclockwise"></i>
                <span>Restore</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                onClick={() => setArchiveModalOpen(true)}
              >
                <i className="bi bi-archive-fill"></i>
                <span>Archive</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Column: Contact Details + Linked Bookings */}
        <div className="col-lg-8">
          {/* Contact Details Card */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
            <h2 className="h5 fw-bold text-dark mb-3 border-bottom pb-2">
              <i className="bi bi-person-lines-fill me-2" style={{ color: '#641e2b' }}></i>
              Contact & Profile Details
            </h2>

            <div className="row g-3">
              <div className="col-sm-6">
                <span className="small text-muted d-block">Customer Name</span>
                <span className="fw-semibold text-dark">{customer.name}</span>
              </div>
              <div className="col-sm-6">
                <span className="small text-muted d-block">Phone Number</span>
                {customer.phone ? (
                  <a href={`tel:${customer.phone}`} className="fw-semibold text-dark text-decoration-none">
                    {customer.phone}
                  </a>
                ) : (
                  <span className="text-muted">—</span>
                )}
              </div>
              <div className="col-sm-6">
                <span className="small text-muted d-block">Email Address</span>
                {customer.email ? (
                  <a href={`mailto:${customer.email}`} className="text-decoration-none">
                    {customer.email}
                  </a>
                ) : (
                  <span className="text-muted">—</span>
                )}
              </div>
              <div className="col-sm-6">
                <span className="small text-muted d-block">Preferred Language</span>
                <span className="text-capitalize">
                  {customer.preferredLanguage === 'mr' ? 'Marathi (मराठी)' : 'English'}
                </span>
              </div>
              <div className="col-12">
                <span className="small text-muted d-block">Address / City</span>
                <span className="fw-medium text-dark">{customer.address || '—'}</span>
              </div>
            </div>
          </div>

          {/* Linked Bookings & Enquiries History */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
              <h2 className="h5 fw-bold text-dark mb-0">
                <i className="bi bi-calendar-check-fill me-2" style={{ color: '#641e2b' }}></i>
                Booking & Enquiry History
              </h2>
              <span className="badge bg-light text-dark border">
                {customer.bookings?.length || 0} Records
              </span>
            </div>

            {!customer.bookings || customer.bookings.length === 0 ? (
              <div className="text-center py-4">
                <i className="bi bi-calendar-x text-muted fs-2 d-block mb-2"></i>
                <p className="text-muted small mb-0">
                  No bookings or enquiries have been associated with this customer yet.
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Booking Ref</th>
                      <th scope="col">Event Type</th>
                      <th scope="col">Event Date</th>
                      <th scope="col">Guests</th>
                      <th scope="col">Catering</th>
                      <th scope="col">Status</th>
                      <th scope="col" className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.bookings.map((b) => {
                      const st = BOOKING_STATUSES[b.status] || {
                        label: { en: b.status },
                        badgeClass: 'bg-secondary-subtle text-secondary',
                      };
                      const formattedDate = b.event?.dateNotDecided
                        ? 'Date undecided'
                        : b.event?.date
                        ? new Date(b.event.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : '—';

                      return (
                        <tr key={b.id}>
                          <td>
                            <Link
                              to={`/admin/bookings/${b.id}`}
                              className="fw-bold text-decoration-none"
                              style={{ color: '#641e2b' }}
                            >
                              {b.id}
                            </Link>
                          </td>
                          <td className="text-capitalize small fw-medium text-dark">
                            {b.event?.type || 'Event'}
                          </td>
                          <td className="small">{formattedDate}</td>
                          <td className="small">{b.event?.guestCount || '—'}</td>
                          <td className="small">
                            {b.catering?.type === 'with-material'
                              ? 'With Material'
                              : 'Without Material'}
                          </td>
                          <td>
                            <span className={`badge ${st.badgeClass} small`}>
                              {st.label.en}
                            </span>
                          </td>
                          <td className="text-end">
                            <Link
                              to={`/admin/bookings/${b.id}`}
                              className="btn btn-sm btn-outline-dark"
                              title="View full booking"
                            >
                              <i className="bi bi-box-arrow-up-right me-1"></i> View
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Internal Customer Notes */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
            <h2 className="h5 fw-bold text-dark mb-1">
              <i className="bi bi-journal-text me-2" style={{ color: '#641e2b' }}></i>
              Internal Customer Notes
            </h2>
            <p className="text-muted small mb-3">
              Internal notes are private to staff and never visible to the customer.
            </p>

            <form onSubmit={handleAddNote} className="mb-4">
              <div className="mb-2">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Add an internal note about this customer..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  disabled={addingNote}
                  aria-label="Add internal customer note"
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-sm btn-primary w-100"
                style={{ backgroundColor: '#641e2b', borderColor: '#641e2b' }}
                disabled={addingNote || !noteText.trim()}
              >
                {addingNote ? 'Adding Note...' : 'Add Internal Note'}
              </button>
            </form>

            {/* Notes List */}
            {!customer.notes || customer.notes.length === 0 ? (
              <div className="text-center py-3 text-muted small">
                No internal notes recorded yet.
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {customer.notes.map((note) => (
                  <div key={note.id} className="p-3 bg-light rounded-3 border">
                    <p className="small text-dark mb-1">{note.message}</p>
                    <div className="d-flex justify-content-between align-items-center text-muted" style={{ fontSize: '0.75rem' }}>
                      <span>
                        <i className="bi bi-person-fill me-1"></i>
                        {note.author || 'Admin'}
                      </span>
                      <span>
                        {new Date(note.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <CustomerModal
        isOpen={editModalOpen}
        initialData={customer}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveCustomer}
      />

      {/* Archive / Restore Confirmation Modal */}
      <CustomerArchiveModal
        isOpen={archiveModalOpen}
        customer={customer}
        isRestore={!!customer.isArchived}
        submitting={submittingAction}
        onClose={() => setArchiveModalOpen(false)}
        onConfirm={handleArchiveRestoreConfirm}
      />
    </div>
  );
}

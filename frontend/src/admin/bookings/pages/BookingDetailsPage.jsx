import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  fetchBookingById,
  updateBookingStatus,
  updateBookingDetails,
  addInternalNote,
  addCommunicationLog,
  BOOKING_STATUSES,
} from '../../../services/bookingAdminService';
import { useAuth } from '../../../context/useAuth';

export default function BookingDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useAuth();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form states
  const [newNote, setNewNote] = useState('');
  const [addingNote, setAddingNote] = useState(false);

  const [commChannel, setCommChannel] = useState('Phone');
  const [commSummary, setCommSummary] = useState('');
  const [addingComm, setAddingComm] = useState(false);

  // Status Dialog
  const [statusDialog, setStatusDialog] = useState(null); // { newStatus, reason }

  // Quotation editing state
  const [quotationForm, setQuotationForm] = useState({
    status: 'Not Prepared',
    referenceNumber: '',
    amount: '',
    remarks: '',
  });
  const [editingQuotation, setEditingQuotation] = useState(false);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    let isMounted = true;
    document.title = `Booking ${id} | Aditi Caterers Admin`;

    fetchBookingById(id)
      .then((data) => {
        if (isMounted) {
          setBooking(data);
          setQuotationForm({
            status: data.quotation?.status || 'Not Prepared',
            referenceNumber: data.quotation?.referenceNumber || '',
            amount: data.quotation?.amount || '',
            remarks: data.quotation?.remarks || '',
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Unable to load booking details.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, refreshTrigger]);

  const reloadBooking = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setAddingNote(true);
    try {
      await addInternalNote(id, newNote, admin?.name || 'Administrator');
      setNewNote('');
      reloadBooking();
    } finally {
      setAddingNote(false);
    }
  };

  const handleAddCommunication = async (e) => {
    e.preventDefault();
    if (!commSummary.trim()) return;

    setAddingComm(true);
    try {
      await addCommunicationLog(
        id,
        { channel: commChannel, summary: commSummary },
        admin?.name || 'Administrator'
      );
      setCommSummary('');
      reloadBooking();
    } finally {
      setAddingComm(false);
    }
  };

  const handleStatusChangeClick = (newStatus) => {
    if (newStatus === 'confirmed' || newStatus === 'cancelled') {
      setStatusDialog({ newStatus, reason: '' });
    } else {
      executeStatusChange(newStatus, '');
    }
  };

  const executeStatusChange = async (newStatus, reason) => {
    await updateBookingStatus(id, newStatus, reason, admin?.name || 'Administrator');
    setStatusDialog(null);
    reloadBooking();
  };

  const handleSaveQuotation = async () => {
    await updateBookingDetails(
      id,
      {
        quotation: {
          ...booking.quotation,
          status: quotationForm.status,
          referenceNumber: quotationForm.referenceNumber.trim(),
          amount: parseFloat(quotationForm.amount) || 0,
          remarks: quotationForm.remarks.trim(),
          sentAt: quotationForm.status === 'Sent' ? new Date().toISOString() : booking.quotation?.sentAt,
        },
      },
      admin?.name || 'Administrator'
    );
    setEditingQuotation(false);
    reloadBooking();
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-maroon" role="status" style={{ color: '#641e2b' }}>
          <span className="visually-hidden">Loading booking...</span>
        </div>
        <p className="text-muted small mt-2">Loading booking details...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="card border-0 shadow-sm rounded-4 p-5 text-center my-4">
        <i className="bi bi-exclamation-triangle text-danger fs-1 mb-2"></i>
        <h2 className="h4 fw-bold text-dark mb-2">Booking Not Found</h2>
        <p className="text-muted small mb-3">{error || `No booking found with reference ${id}.`}</p>
        <div>
          <button
            type="button"
            className="btn btn-sm btn-outline-dark me-2"
            onClick={() => navigate('/admin/bookings')}
          >
            <i className="bi bi-arrow-left me-1"></i> Back to Bookings
          </button>
          <button type="button" className="btn btn-sm btn-maroon" onClick={reloadBooking}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  const statusCfg = BOOKING_STATUSES[booking.status] || BOOKING_STATUSES.pending_review;
  const cleanMobile = booking.customer?.mobile ? booking.customer.mobile.replace(/\D/g, '') : '';
  const waUrl = cleanMobile
    ? `https://wa.me/91${cleanMobile.slice(-10)}?text=${encodeURIComponent(
        `Hello ${booking.customer?.name || ''}, regarding your catering enquiry ${booking.id} with Aditi Caterers...`
      )}`
    : null;

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small mb-0">
          <li className="breadcrumb-item">
            <Link to="/admin/dashboard" className="text-decoration-none text-muted">
              Dashboard
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/admin/bookings" className="text-decoration-none text-muted">
              Bookings
            </Link>
          </li>
          <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
            {booking.id}
          </li>
        </ol>
      </nav>

      {/* Top Banner / Summary Bar */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <h1 className="h3 fw-bold text-dark mb-0">{booking.id}</h1>
              <span className={`badge ${statusCfg.badgeClass} d-inline-flex align-items-center gap-1`}>
                <i className={`bi ${statusCfg.icon}`} aria-hidden="true"></i>
                <span>{statusCfg.label.en}</span>
              </span>
              <span className="badge bg-light text-secondary border">
                Source: {booking.source || 'Website'}
              </span>
            </div>
            <p className="text-muted small mb-0">
              Submitted on{' '}
              {new Date(booking.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="d-flex flex-wrap align-items-center gap-2">
            <a
              href={`tel:${booking.customer?.mobile}`}
              className="btn btn-sm btn-outline-dark d-flex align-items-center gap-1"
            >
              <i className="bi bi-telephone-fill"></i>
              <span>Call Customer</span>
            </a>

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

            {/* Status Transition Dropdown */}
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-sm btn-maroon dropdown-toggle"
                style={{ backgroundColor: '#641e2b', color: '#fff' }}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-arrow-repeat me-1"></i> Change Status
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow">
                {Object.values(BOOKING_STATUSES).map((st) => (
                  <li key={st.id}>
                    <button
                      type="button"
                      className={`dropdown-item small d-flex align-items-center gap-2 ${
                        booking.status === st.id ? 'active' : ''
                      }`}
                      onClick={() => handleStatusChangeClick(st.id)}
                    >
                      <i className={`bi ${st.icon}`}></i>
                      <span>Mark as {st.label.en}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Column (Customer & Event Details + Catering) */}
        <div className="col-lg-8">
          {/* Customer & Event Info */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
            <h2 className="h5 fw-bold text-dark mb-3 border-bottom pb-2">
              <i className="bi bi-person-circle me-2 text-maroon" style={{ color: '#641e2b' }}></i>
              Customer & Event Information
            </h2>

            <div className="row g-3">
              <div className="col-sm-6">
                <span className="small text-muted d-block">Customer Name</span>
                <div className="d-flex align-items-center gap-2">
                  <span className="fw-semibold text-dark">{booking.customer?.name}</span>
                  <Link
                    to="/admin/customers"
                    className="badge bg-light text-primary border text-decoration-none"
                    title="View Customer Profiles"
                  >
                    <i className="bi bi-person-badge me-1"></i> Customer Directory
                  </Link>
                </div>
              </div>
              <div className="col-sm-6">
                <span className="small text-muted d-block">Mobile Number</span>
                <a href={`tel:${booking.customer?.mobile}`} className="fw-semibold text-dark text-decoration-none">
                  {booking.customer?.mobile}
                </a>
              </div>
              {booking.customer?.email && (
                <div className="col-sm-6">
                  <span className="small text-muted d-block">Email Address</span>
                  <a href={`mailto:${booking.customer.email}`} className="text-decoration-none">
                    {booking.customer.email}
                  </a>
                </div>
              )}
              <div className="col-sm-6">
                <span className="small text-muted d-block">Preferred Contact Method</span>
                <span className="text-capitalize">{booking.customer?.preferredContactMethod || 'Phone'}</span>
              </div>
              <div className="col-sm-6">
                <span className="small text-muted d-block">City / Location</span>
                <span className="fw-medium text-dark">{booking.event?.city || 'Not specified'}</span>
              </div>
              <div className="col-sm-6">
                <span className="small text-muted d-block">Event Type</span>
                <span className="badge bg-light text-dark border text-capitalize">
                  {booking.event?.type === 'other' ? booking.event?.otherType || 'Other' : booking.event?.type}
                </span>
              </div>
              <div className="col-sm-6">
                <span className="small text-muted d-block">Event Date</span>
                <span className="fw-semibold text-dark">
                  {booking.event?.dateNotDecided ? 'Date not decided yet' : booking.event?.date || 'N/A'}
                </span>
              </div>
              <div className="col-sm-6">
                <span className="small text-muted d-block">Time Slot</span>
                <span>{booking.event?.timeSlot || 'Lunch Banquet'}</span>
              </div>
              <div className="col-sm-6">
                <span className="small text-muted d-block">Guest Count</span>
                <span className="fw-bold text-dark fs-6">{booking.event?.guestCount} Guests</span>
              </div>
              {booking.event?.venueAddress && (
                <div className="col-12">
                  <span className="small text-muted d-block">Venue Address / Landmark</span>
                  <span className="text-dark">{booking.event.venueAddress}</span>
                </div>
              )}
            </div>
          </div>

          {/* Catering Requirements */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
            <h2 className="h5 fw-bold text-dark mb-3 border-bottom pb-2">
              <i className="bi bi-egg-fried me-2 text-maroon" style={{ color: '#641e2b' }}></i>
              Catering Requirements
            </h2>

            <div className="row g-3">
              <div className="col-sm-6">
                <span className="small text-muted d-block">Catering Service Type</span>
                <span className="badge bg-light text-dark border p-2 mt-1">
                  {booking.catering?.type === 'with-material'
                    ? 'With Material (साहित्यासह)'
                    : booking.catering?.type === 'without-material'
                      ? 'Without Material (साहित्याशिवाय)'
                      : booking.catering?.type || 'Not specified'}
                </span>
              </div>
              {booking.catering?.packageId && (
                <div className="col-sm-6">
                  <span className="small text-muted d-block">Selected Package</span>
                  <span className="fw-medium text-capitalize">{booking.catering.packageId}</span>
                </div>
              )}
              {booking.catering?.budgetRange && (
                <div className="col-sm-6">
                  <span className="small text-muted d-block">Estimated Budget</span>
                  <span>{booking.catering.budgetRange}</span>
                </div>
              )}
              {booking.catering?.selectedDishes && (
                <div className="col-12">
                  <span className="small text-muted d-block">Desired Dishes / Menu Items</span>
                  <div className="p-2 bg-light rounded small mt-1">{booking.catering.selectedDishes}</div>
                </div>
              )}
              {booking.catering?.specialDietary && (
                <div className="col-12">
                  <span className="small text-muted d-block">Special Dietary / Fasting Requirements</span>
                  <div className="p-2 bg-light rounded small mt-1 text-secondary">
                    {booking.catering.specialDietary}
                  </div>
                </div>
              )}
              {booking.event?.notes && (
                <div className="col-12">
                  <span className="small text-muted d-block">Customer Notes & Special Instructions</span>
                  <div className="p-3 bg-light rounded-3 small mt-1 text-dark">
                    {booking.event.notes}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quotation Tracking */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
              <h2 className="h5 fw-bold text-dark mb-0">
                <i className="bi bi-file-earmark-text me-2 text-maroon" style={{ color: '#641e2b' }}></i>
                Quotation Information
              </h2>
              {!editingQuotation && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setEditingQuotation(true)}
                >
                  <i className="bi bi-pencil me-1"></i> Edit Quotation
                </button>
              )}
            </div>

            {editingQuotation ? (
              <div className="p-3 bg-light rounded-3 mb-2">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label htmlFor="q-status" className="form-label small fw-semibold">
                      Quotation Status
                    </label>
                    <select
                      id="q-status"
                      className="form-select form-select-sm"
                      value={quotationForm.status}
                      onChange={(e) => setQuotationForm((prev) => ({ ...prev, status: e.target.value }))}
                    >
                      <option value="Not Prepared">Not Prepared</option>
                      <option value="Draft">Draft</option>
                      <option value="Sent">Sent to Customer</option>
                      <option value="Accepted">Accepted by Customer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="q-ref" className="form-label small fw-semibold">
                      Quotation Reference
                    </label>
                    <input
                      id="q-ref"
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. QT-2026-0042"
                      value={quotationForm.referenceNumber}
                      onChange={(e) =>
                        setQuotationForm((prev) => ({ ...prev, referenceNumber: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="q-amount" className="form-label small fw-semibold">
                      Quotation Amount (₹)
                    </label>
                    <input
                      id="q-amount"
                      type="number"
                      min="0"
                      className="form-control form-control-sm"
                      placeholder="e.g. 85000"
                      value={quotationForm.amount}
                      onChange={(e) =>
                        setQuotationForm((prev) => ({ ...prev, amount: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="q-remarks" className="form-label small fw-semibold">
                      Quotation Remarks / Notes
                    </label>
                    <input
                      id="q-remarks"
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. Sent via WhatsApp with menu brochure, includes serving staff..."
                      value={quotationForm.remarks}
                      onChange={(e) =>
                        setQuotationForm((prev) => ({ ...prev, remarks: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setEditingQuotation(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-maroon"
                    style={{ backgroundColor: '#641e2b', color: '#fff' }}
                    onClick={handleSaveQuotation}
                  >
                    Save Quotation
                  </button>
                </div>
              </div>
            ) : (
              <div className="row g-3">
                <div className="col-sm-4">
                  <span className="small text-muted d-block">Quotation Status</span>
                  <span className="badge bg-light text-dark border mt-1">
                    {booking.quotation?.status || 'Not Prepared'}
                  </span>
                </div>
                <div className="col-sm-4">
                  <span className="small text-muted d-block">Quotation Reference</span>
                  <span className="fw-semibold text-dark">
                    {booking.quotation?.referenceNumber || 'N/A'}
                  </span>
                </div>
                <div className="col-sm-4">
                  <span className="small text-muted d-block">Quotation Amount</span>
                  <span className="fw-bold text-success fs-6">
                    {booking.quotation?.amount
                      ? `₹${Number(booking.quotation.amount).toLocaleString('en-IN')}`
                      : 'Pending'}
                  </span>
                </div>
                {booking.quotation?.sentAt && (
                  <div className="col-sm-6">
                    <span className="small text-muted d-block">Sent Timestamp</span>
                    <span className="small text-muted">
                      {new Date(booking.quotation.sentAt).toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                {booking.quotation?.remarks && (
                  <div className="col-12">
                    <span className="small text-muted d-block">Remarks</span>
                    <span className="small text-secondary">{booking.quotation.remarks}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Internal Notes, Communication Log, Audit Timeline) */}
        <div className="col-lg-4">
          {/* Internal Notes */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
            <h3 className="h6 fw-bold text-dark mb-1">
              <i className="bi bi-sticky-fill me-1 text-warning"></i>
              Internal Admin Notes
            </h3>
            <p className="text-muted small mb-3" style={{ fontSize: '0.75rem' }}>
              Private notes visible only to administrators.
            </p>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="mb-3">
              <textarea
                className="form-control form-control-sm mb-2"
                rows="2"
                placeholder="Write an internal note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              ></textarea>
              <button
                type="submit"
                disabled={addingNote || !newNote.trim()}
                className="btn btn-sm btn-outline-dark w-100"
              >
                {addingNote ? 'Saving...' : 'Add Note'}
              </button>
            </form>

            {/* Notes List */}
            <div className="d-flex flex-column gap-2" style={{ maxHeight: '250px', overflowY: 'auto' }}>
              {booking.internalNotes && booking.internalNotes.length > 0 ? (
                booking.internalNotes.map((note) => (
                  <div key={note.id} className="p-2 bg-light rounded-3 small">
                    <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.7rem' }}>
                      <span className="fw-semibold">{note.author || 'Admin'}</span>
                      <span>
                        {new Date(note.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <div className="text-dark mt-1">{note.message}</div>
                  </div>
                ))
              ) : (
                <div className="text-muted small text-center py-2">No internal notes added yet.</div>
              )}
            </div>
          </div>

          {/* Communication Tracking */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
            <h3 className="h6 fw-bold text-dark mb-1">
              <i className="bi bi-chat-left-text-fill me-1 text-info"></i>
              Communication Log
            </h3>
            <p className="text-muted small mb-3" style={{ fontSize: '0.75rem' }}>
              Record customer calls and WhatsApp discussions.
            </p>

            {/* Quick Log Form */}
            <form onSubmit={handleAddCommunication} className="mb-3">
              <div className="input-group input-group-sm mb-2">
                <select
                  className="form-select form-select-sm"
                  style={{ maxWidth: '110px' }}
                  value={commChannel}
                  onChange={(e) => setCommChannel(e.target.value)}
                >
                  <option value="Phone">Phone</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Email">Email</option>
                  <option value="Meeting">Meeting</option>
                </select>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Summary of call/chat..."
                  value={commSummary}
                  onChange={(e) => setCommSummary(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={addingComm || !commSummary.trim()}
                className="btn btn-sm btn-outline-secondary w-100"
              >
                {addingComm ? 'Logging...' : 'Log Communication'}
              </button>
            </form>

            {/* Log History */}
            <div className="d-flex flex-column gap-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {booking.communicationLogs && booking.communicationLogs.length > 0 ? (
                booking.communicationLogs.map((log) => (
                  <div key={log.id} className="p-2 border rounded-3 small">
                    <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.7rem' }}>
                      <span className="badge bg-light text-dark border">{log.channel}</span>
                      <span>
                        {new Date(log.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                    <div className="text-dark mt-1">{log.summary}</div>
                  </div>
                ))
              ) : (
                <div className="text-muted small text-center py-2">No communication logged yet.</div>
              )}
            </div>
          </div>

          {/* Audit History Timeline */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
            <h3 className="h6 fw-bold text-dark mb-2">
              <i className="bi bi-clock-history me-1 text-maroon" style={{ color: '#641e2b' }}></i>
              Audit History Timeline
            </h3>

            <div className="small text-muted" style={{ maxHeight: '220px', overflowY: 'auto' }}>
              {booking.auditHistory && booking.auditHistory.length > 0 ? (
                <ul className="list-unstyled mb-0 ps-2 border-start border-2 border-danger-subtle">
                  {booking.auditHistory.map((entry) => (
                    <li key={entry.id} className="mb-2 ps-2">
                      <div className="fw-semibold text-dark">{entry.action}</div>
                      <div style={{ fontSize: '0.72rem' }}>
                        By {entry.changedBy || 'Admin'} &bull;{' '}
                        {new Date(entry.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                      {entry.reason && (
                        <div className="text-danger small mt-1">Reason: {entry.reason}</div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No audit logs recorded.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status Confirmation Modal for Confirmed / Cancelled */}
      {statusDialog && (
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
                    {statusDialog.newStatus === 'confirmed'
                      ? 'Confirm This Booking?'
                      : 'Cancel This Booking?'}
                  </h3>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setStatusDialog(null)}
                    aria-label="Close dialog"
                  ></button>
                </div>
                <div className="modal-body px-4 py-3">
                  {statusDialog.newStatus === 'confirmed' ? (
                    <div>
                      <p className="small text-muted mb-2">
                        Marking this booking as <strong>Confirmed</strong> signifies that menu arrangements,
                        dates, and quotation have been agreed with the customer.
                      </p>
                      <div className="alert alert-info py-2 px-3 small mb-0">
                        <i className="bi bi-info-circle me-1" aria-hidden="true"></i>
                        Booking ID: <strong>{booking.id}</strong>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="small text-muted mb-2">
                        Please provide a reason for cancelling this booking:
                      </p>
                      <textarea
                        className="form-control form-control-sm"
                        rows="3"
                        placeholder="e.g. Customer cancelled due to date clash, alternate caterer chosen..."
                        value={statusDialog.reason}
                        onChange={(e) =>
                          setStatusDialog((prev) => ({
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
                    onClick={() => setStatusDialog(null)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${
                      statusDialog.newStatus === 'confirmed' ? 'btn-success' : 'btn-danger'
                    }`}
                    onClick={() => executeStatusChange(statusDialog.newStatus, statusDialog.reason)}
                  >
                    {statusDialog.newStatus === 'confirmed'
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

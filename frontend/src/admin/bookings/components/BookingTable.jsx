import { Link } from 'react-router-dom';
import { BOOKING_STATUSES } from '../../../services/bookingAdminService';

export default function BookingTable({
  bookings = [],
  onQuickStatusChange,
}) {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="card border-0 shadow-sm rounded-4 p-5 text-center my-3">
        <div className="py-4">
          <i
            className="bi bi-calendar-x text-muted"
            style={{ fontSize: '3rem' }}
            aria-hidden="true"
          ></i>
          <h3 className="h5 fw-bold text-dark mt-3 mb-1">No Bookings Found</h3>
          <p className="text-muted small mb-0">
            No booking or enquiry records match the current filters or search term.
          </p>
        </div>
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0" aria-label="Bookings list table">
          <thead className="table-light small text-muted text-uppercase">
            <tr>
              <th scope="col" style={{ minWidth: '150px' }}>Booking Ref</th>
              <th scope="col" style={{ minWidth: '180px' }}>Customer</th>
              <th scope="col" style={{ minWidth: '170px' }}>Event & Date</th>
              <th scope="col" style={{ minWidth: '90px' }}>Guests</th>
              <th scope="col" style={{ minWidth: '130px' }}>Catering</th>
              <th scope="col" style={{ minWidth: '140px' }}>Status</th>
              <th scope="col" className="text-end" style={{ minWidth: '140px' }}>Actions</th>
            </tr>
          </thead>
          <tbody className="small">
            {bookings.map((b) => {
              const statusCfg = BOOKING_STATUSES[b.status] || BOOKING_STATUSES.pending_review;
              const cleanMobile = b.customer?.mobile ? b.customer.mobile.replace(/\D/g, '') : '';
              const waUrl = cleanMobile
                ? `https://wa.me/91${cleanMobile.slice(-10)}?text=${encodeURIComponent(
                    `Hello ${b.customer?.name || ''}, regarding your catering enquiry ${b.id} with Aditi Caterers...`
                  )}`
                : null;

              // Date status (Upcoming / Past / Undecided)
              const dateBadge =
                b.event?.dateNotDecided || !b.event?.date ? (
                  <span className="text-muted small">Date not decided</span>
                ) : (
                  <span
                    className={`small ${
                      new Date(b.event.date) >= today ? 'fw-semibold text-dark' : 'text-muted'
                    }`}
                  >
                    {new Date(b.event.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                    {new Date(b.event.date).getTime() === today.getTime() && (
                      <span className="badge bg-danger ms-1" style={{ fontSize: '0.65rem' }}>
                        Today
                      </span>
                    )}
                  </span>
                );

              return (
                <tr key={b.id}>
                  {/* Reference & Source */}
                  <td>
                    <Link
                      to={`/admin/bookings/${b.id}`}
                      className="fw-bold text-maroon text-decoration-none d-block text-truncate"
                      style={{ color: '#641e2b', maxWidth: '140px' }}
                      title={b.id}
                    >
                      {b.id}
                    </Link>
                    <span
                      className="badge bg-light text-secondary border mt-1"
                      style={{ fontSize: '0.7rem' }}
                    >
                      {b.source || 'Website'}
                    </span>
                  </td>

                  {/* Customer Information */}
                  <td>
                    <div className="fw-semibold text-dark text-truncate" style={{ maxWidth: '160px' }}>
                      {b.customer?.name || 'Customer'}
                    </div>
                    <div className="d-flex align-items-center gap-2 mt-1">
                      <a
                        href={`tel:${b.customer?.mobile}`}
                        className="text-decoration-none text-muted"
                        title="Call Customer"
                      >
                        <i className="bi bi-telephone me-1" aria-hidden="true"></i>
                        {b.customer?.mobile}
                      </a>
                      {waUrl && (
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-success text-decoration-none"
                          title="Open WhatsApp chat with customer"
                          aria-label={`Chat with ${b.customer?.name} on WhatsApp`}
                        >
                          <i className="bi bi-whatsapp"></i>
                        </a>
                      )}
                    </div>
                  </td>

                  {/* Event & Date */}
                  <td>
                    <div className="text-capitalize fw-medium mb-1">
                      {b.event?.type === 'other' ? b.event?.otherType || 'Other' : b.event?.type}
                    </div>
                    <div>{dateBadge}</div>
                    {b.event?.city && (
                      <div className="text-muted text-truncate" style={{ fontSize: '0.75rem', maxWidth: '150px' }}>
                        <i className="bi bi-geo-alt me-1" aria-hidden="true"></i>
                        {b.event.city}
                      </div>
                    )}
                  </td>

                  {/* Guest Count */}
                  <td>
                    <span className="fw-semibold text-dark">{b.event?.guestCount || '-'}</span>
                  </td>

                  {/* Catering Type */}
                  <td>
                    <span className="badge bg-light text-dark border text-wrap text-start">
                      {b.catering?.type === 'with-material'
                        ? 'With Material'
                        : b.catering?.type === 'without-material'
                          ? 'Without Material'
                          : b.catering?.type || '-'}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td>
                    <span className={`badge ${statusCfg.badgeClass} d-inline-flex align-items-center gap-1`}>
                      <i className={`bi ${statusCfg.icon}`} aria-hidden="true"></i>
                      <span>{statusCfg.label.en}</span>
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="text-end">
                    <div className="d-inline-flex align-items-center gap-1">
                      <Link
                        to={`/admin/bookings/${b.id}`}
                        className="btn btn-sm btn-outline-dark px-2 py-1"
                        aria-label={`View details of booking ${b.id}`}
                      >
                        <i className="bi bi-eye me-1" aria-hidden="true"></i>
                        Details
                      </Link>

                      {/* Quick Status Dropdown */}
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn btn-sm btn-light border px-2 py-1 dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          aria-label="Change status"
                        >
                          Status
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                          {Object.values(BOOKING_STATUSES).map((st) => (
                            <li key={st.id}>
                              <button
                                type="button"
                                className={`dropdown-item small d-flex align-items-center gap-2 ${
                                  b.status === st.id ? 'active' : ''
                                }`}
                                onClick={() => onQuickStatusChange(b.id, st.id)}
                              >
                                <i className={`bi ${st.icon}`}></i>
                                <span>{st.label.en}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
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

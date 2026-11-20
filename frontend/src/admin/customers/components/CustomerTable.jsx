import { Link } from 'react-router-dom';

export default function CustomerTable({
  customers,
  onEdit,
  onArchive,
  onRestore,
}) {
  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-4">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light border-bottom">
            <tr>
              <th scope="col" className="ps-4">Customer Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Email</th>
              <th scope="col" className="text-center">Total Bookings</th>
              <th scope="col">Last Event / Booking</th>
              <th scope="col">Created Date</th>
              <th scope="col">Status</th>
              <th scope="col" className="text-end pe-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => {
              const formattedCreated = c.createdAt
                ? new Date(c.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : '—';

              const formattedLastEvent = c.lastEventDate
                ? new Date(c.lastEventDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : '—';

              return (
                <tr key={c.id}>
                  <td className="ps-4">
                    <Link
                      to={`/admin/customers/${c.id}`}
                      className="fw-semibold text-dark text-decoration-none d-flex align-items-center gap-2"
                    >
                      <span
                        className="rounded-circle bg-maroon-subtle text-maroon d-inline-flex align-items-center justify-content-center fw-bold"
                        style={{
                          width: '36px',
                          height: '36px',
                          backgroundColor: '#f8e9eb',
                          color: '#641e2b',
                          fontSize: '0.9rem',
                        }}
                      >
                        {c.name ? c.name.charAt(0).toUpperCase() : 'C'}
                      </span>
                      <div>
                        <div>{c.name}</div>
                        <div className="text-muted small" style={{ fontSize: '0.75rem' }}>
                          ID: {c.id}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td>
                    {c.phone ? (
                      <a
                        href={`tel:${c.phone}`}
                        className="text-decoration-none text-dark fw-medium"
                      >
                        <i className="bi bi-telephone-fill text-muted me-1 small"></i>
                        {c.phone}
                      </a>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td>
                    {c.email ? (
                      <a
                        href={`mailto:${c.email}`}
                        className="text-decoration-none text-muted small"
                      >
                        {c.email}
                      </a>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="text-center">
                    {c.totalBookings > 0 ? (
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1">
                        {c.totalBookings}
                      </span>
                    ) : (
                      <span className="text-muted small">0</span>
                    )}
                  </td>
                  <td>
                    {formattedLastEvent !== '—' ? (
                      <span className="small text-dark fw-medium">
                        <i className="bi bi-calendar-event text-muted me-1"></i>
                        {formattedLastEvent}
                      </span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="small text-muted">{formattedCreated}</td>
                  <td>
                    {c.isArchived ? (
                      <span className="badge bg-secondary-subtle text-secondary border">
                        Archived
                      </span>
                    ) : (
                      <span className="badge bg-success-subtle text-success border border-success-subtle">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="text-end pe-4">
                    <div className="btn-group btn-group-sm" role="group" aria-label="Customer actions">
                      <Link
                        to={`/admin/customers/${c.id}`}
                        className="btn btn-outline-dark"
                        title="View Profile"
                        aria-label={`View profile for ${c.name}`}
                      >
                        <i className="bi bi-eye-fill"></i>
                      </Link>
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => onEdit(c)}
                        title="Edit Details"
                        aria-label={`Edit details for ${c.name}`}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      {c.isArchived ? (
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          onClick={() => onRestore(c)}
                          title="Restore Customer"
                          aria-label={`Restore customer ${c.name}`}
                        >
                          <i className="bi bi-arrow-counterclockwise"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => onArchive(c)}
                          title="Archive Customer"
                          aria-label={`Archive customer ${c.name}`}
                        >
                          <i className="bi bi-archive-fill"></i>
                        </button>
                      )}
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

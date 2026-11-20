import { ENQUIRY_STATUSES } from '../../../services/dashboardService';
import { useAdminLanguage } from '../../../context/useAdminLanguage';

export default function RecentEnquiriesTable({ enquiries = [], onViewDetails }) {
  const { at, adminLang } = useAdminLanguage();
  const re = at.dashboard.recentEnquiries;

  if (!enquiries || enquiries.length === 0) {
    return (
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
        <h2 className="h5 fw-bold text-dark mb-3">{re.title}</h2>
        <div className="text-center py-4 text-muted">
          <i className="bi bi-chat-left-dots fs-2 text-secondary mb-2 d-block" aria-hidden="true"></i>
          <p className="mb-0">{re.noData}</p>
          <small className="text-muted">{re.noDataSub}</small>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 fw-bold text-dark mb-0">{re.title}</h2>
        <span className="small text-muted">
          {re.showing} {enquiries.length} {re.requests}
        </span>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0" aria-label="Recent customer enquiries">
          <thead className="table-light small text-muted text-uppercase">
            <tr>
              <th scope="col">{re.colRef}</th>
              <th scope="col">{re.colContact}</th>
              <th scope="col">{re.colEvent}</th>
              <th scope="col">{re.colGuests}</th>
              <th scope="col">{re.colCatering}</th>
              <th scope="col">{re.colStatus}</th>
              <th scope="col">{re.colSubmitted}</th>
              <th scope="col" className="text-end">{re.colAction}</th>
            </tr>
          </thead>
          <tbody className="small">
            {enquiries.map((enq) => {
              const statusKey = enq.status || 'new';
              const statusCfg = ENQUIRY_STATUSES[statusKey] || ENQUIRY_STATUSES.new;
              const formattedSubmitDate = enq.submittedAt
                ? new Date(enq.submittedAt).toLocaleDateString(adminLang === 'mr' ? 'mr-IN' : 'en-IN', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : re.recentLabel;

              const cateringLabel =
                enq.cateringType === 'with-material'
                  ? re.withMaterial
                  : enq.cateringType === 'without-material'
                    ? re.withoutMaterial
                    : enq.cateringType || '-';

              return (
                <tr key={enq.enquiryNumber || `${enq.fullName}-${enq.submittedAt}`}>
                  {/* Customer & Ref */}
                  <td>
                    <div className="fw-semibold text-dark">{enq.fullName}</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                      {enq.enquiryNumber || 'N/A'}
                    </div>
                  </td>

                  {/* Contact */}
                  <td>
                    <a
                      href={`tel:${enq.mobile}`}
                      className="text-decoration-none text-dark fw-medium"
                    >
                      {enq.mobile}
                    </a>
                    {enq.email && (
                      <div className="text-muted text-truncate" style={{ fontSize: '0.75rem', maxWidth: '140px' }}>
                        {enq.email}
                      </div>
                    )}
                  </td>

                  {/* Event & Date */}
                  <td>
                    <span className="badge bg-light text-dark border text-capitalize mb-1">
                      {enq.eventType === 'other' ? enq.otherEventType || 'Other' : enq.eventType}
                    </span>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                      {enq.dateNotDecided ? re.dateUndecided : enq.eventDate || re.notSpecified}
                    </div>
                  </td>

                  {/* Guest Count */}
                  <td>
                    <span className="fw-medium">{enq.guestCount || '-'}</span>
                  </td>

                  {/* Catering Type */}
                  <td>
                    <span className="small text-truncate d-inline-block" style={{ maxWidth: '120px' }}>
                      {cateringLabel}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td>
                    <span className={`badge ${statusCfg.badgeClass}`}>
                      <i className={`bi ${statusCfg.icon} me-1`} aria-hidden="true"></i>
                      {statusCfg.label}
                    </span>
                  </td>

                  {/* Submission Timestamp */}
                  <td className="text-muted">{formattedSubmitDate}</td>

                  {/* Action Button */}
                  <td className="text-end">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-dark"
                      onClick={() => onViewDetails(enq)}
                      aria-label={`View details for enquiry ${enq.enquiryNumber || enq.fullName}`}
                    >
                      <i className="bi bi-eye me-1" aria-hidden="true"></i>
                      {re.viewBtn}
                    </button>
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

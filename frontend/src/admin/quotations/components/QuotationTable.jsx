import React from 'react';
import { useAdminLanguage } from '../../../context/useAdminLanguage';
import { QUOTATION_STATUSES } from '../../../services/quotationAdminService';

const QuotationTable = ({
  quotations = [],
  loading,
  onPreview,
  onEdit,
  onIssue,
  onCreateRevision,
  onRecordResponse,
  onCancel,
  onDelete
}) => {
  const { adminLang, at } = useAdminLanguage();
  const currentLang = adminLang === 'mr' ? 'mr' : 'en';
  const qa = at.quotationAdmin || {};

  const getStatusBadge = (statusId) => {
    const meta = QUOTATION_STATUSES.find((s) => s.id === statusId);
    if (!meta) return <span className="badge bg-secondary">{statusId}</span>;

    const bgMap = {
      draft: 'secondary',
      issued: 'primary',
      accepted: 'success',
      rejected: 'danger',
      revision_requested: 'warning text-dark',
      expired: 'dark',
      cancelled: 'secondary text-decoration-line-through',
      superseded: 'info text-dark'
    };

    return (
      <span className={`badge bg-${bgMap[statusId] || 'secondary'}`}>
        {currentLang === 'mr' ? meta.mr : meta.en}
      </span>
    );
  };

  const getServiceTypeBadge = (type) => {
    if (type === 'with_material') {
      return (
        <span className="badge bg-success-subtle text-success border border-success-subtle">
          <i className="bi bi-basket2-fill me-1"></i>
          {currentLang === 'mr' ? 'साहित्यासह' : 'With Material'}
        </span>
      );
    }
    return (
      <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle">
        <i className="bi bi-person-workspace me-1"></i>
        {currentLang === 'mr' ? 'साहित्याशिवाय' : 'Labor Only'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="card shadow-sm border-0">
        <div className="card-body p-5 text-center text-muted">
          <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
          Loading quotations...
        </div>
      </div>
    );
  }

  if (quotations.length === 0) {
    return (
      <div className="card shadow-sm border-0">
        <div className="card-body p-5 text-center">
          <i className="bi bi-file-earmark-text text-muted display-4 mb-3 d-block"></i>
          <h5 className="text-secondary">{qa.noQuotationsFound || 'No quotations found'}</h5>
          <p className="text-muted small">
            {qa.noQuotationsHelp || 'Try adjusting your search filters or create a new quotation.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col" style={{ width: '150px' }}>
                {qa.quoteNumber || 'Quote #'}
              </th>
              <th scope="col">{qa.customer || 'Customer'}</th>
              <th scope="col">{qa.eventService || 'Event & Service'}</th>
              <th scope="col" className="text-center">
                {qa.guests || 'Guests'}
              </th>
              <th scope="col" className="text-end">
                {qa.amount || 'Grand Total'}
              </th>
              <th scope="col">{qa.validity || 'Date / Validity'}</th>
              <th scope="col" className="text-center">
                {qa.status || 'Status'}
              </th>
              <th scope="col" className="text-end" style={{ width: '130px' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((q) => {
              const isDraft = q.status === 'draft';
              const isIssued = q.status === 'issued';
              const isSuperseded = q.status === 'superseded';
              const isAccepted = q.status === 'accepted';
              const isCancelled = q.status === 'cancelled';
              const canEdit = isDraft;
              const canIssue = isDraft;
              const canRevise = !isDraft && !isSuperseded;
              const canRespond = isIssued || q.status === 'revision_requested';

              return (
                <tr key={q.id || q._id}>
                  {/* Quote Number & Revision */}
                  <td>
                    <div className="fw-semibold text-primary">{q.quotationNumber}</div>
                    {q.revision > 0 && (
                      <span className="badge bg-light text-dark border extra-small">
                        Rev {q.revision}
                      </span>
                    )}
                  </td>

                  {/* Customer */}
                  <td>
                    <div className="fw-medium text-dark">{q.customer?.name}</div>
                    <div className="small text-muted">
                      <i className="bi bi-telephone me-1"></i>
                      {q.customer?.phone}
                    </div>
                  </td>

                  {/* Event & Service */}
                  <td>
                    <div className="small fw-semibold">{q.eventDetails?.eventType || 'Catering Event'}</div>
                    <div className="mt-1">{getServiceTypeBadge(q.serviceType)}</div>
                  </td>

                  {/* Guests */}
                  <td className="text-center">
                    <span className="badge bg-light text-secondary border">
                      {q.eventDetails?.guestCount || 0}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="text-end">
                    <div className="fw-bold text-dark">
                      ₹{(q.pricing?.grandTotal || 0).toLocaleString('en-IN')}
                    </div>
                    {q.pricing?.pricePerPerson > 0 && (
                      <div className="small text-muted">
                        ₹{q.pricing.pricePerPerson} / plate
                      </div>
                    )}
                  </td>

                  {/* Validity / Dates */}
                  <td>
                    <div className="small text-muted">
                      {q.issuedDate ? (
                        <>
                          <div>
                            <i className="bi bi-calendar-check me-1"></i>
                            {new Date(q.issuedDate).toLocaleDateString()}
                          </div>
                          {q.validUntilDate && (
                            <div className="text-secondary extra-small">
                              Valid: {q.validUntilDate}
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-muted fst-italic">Not yet issued</span>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="text-center">{getStatusBadge(q.status)}</td>

                  {/* Actions Dropdown / Quick Buttons */}
                  <td className="text-end">
                    <div className="d-flex justify-content-end gap-1">
                      {/* Preview / Print */}
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onPreview(q)}
                        title={qa.preview || 'Preview / Print'}
                      >
                        <i className="bi bi-eye"></i>
                      </button>

                      {/* Dropdown for other actions */}
                      <div className="dropdown">
                        <button
                          className="btn btn-sm btn-outline-secondary dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        ></button>
                        <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                          {canEdit && (
                            <li>
                              <button
                                className="dropdown-item text-primary"
                                onClick={() => onEdit(q)}
                              >
                                <i className="bi bi-pencil me-2"></i>
                                {qa.editQuotation || 'Edit Draft'}
                              </button>
                            </li>
                          )}

                          {canIssue && (
                            <li>
                              <button
                                className="dropdown-item text-success"
                                onClick={() => onIssue(q)}
                              >
                                <i className="bi bi-send-check me-2"></i>
                                {qa.issueQuotation || 'Issue Quotation'}
                              </button>
                            </li>
                          )}

                          {canRevise && (
                            <li>
                              <button
                                className="dropdown-item text-info"
                                onClick={() => onCreateRevision(q)}
                              >
                                <i className="bi bi-file-earmark-diff me-2"></i>
                                {qa.createRevision || 'Create Revision'}
                              </button>
                            </li>
                          )}

                          {canRespond && (
                            <li>
                              <button
                                className="dropdown-item text-warning"
                                onClick={() => onRecordResponse(q)}
                              >
                                <i className="bi bi-chat-left-dots me-2"></i>
                                {qa.recordResponse || 'Record Customer Response'}
                              </button>
                            </li>
                          )}

                          <li><hr className="dropdown-divider" /></li>

                          {!isCancelled && !isAccepted && (
                            <li>
                              <button
                                className="dropdown-item text-secondary"
                                onClick={() => onCancel(q)}
                              >
                                <i className="bi bi-slash-circle me-2"></i>
                                {qa.cancelQuotation || 'Cancel Quotation'}
                              </button>
                            </li>
                          )}

                          {!isAccepted && (
                            <li>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => onDelete(q)}
                              >
                                <i className="bi bi-trash me-2"></i>
                                Delete
                              </button>
                            </li>
                          )}
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
};

export default QuotationTable;

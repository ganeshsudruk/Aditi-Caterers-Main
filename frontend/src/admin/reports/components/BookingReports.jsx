import React, { useState } from 'react';
import { useAdminLanguage } from '../../../context/useAdminLanguage';
import { exportToCsv } from '../../../services/reportAdminService';

const BookingReports = ({ data = {}, onPrint, loading }) => {
  const { at } = useAdminLanguage();
  const rep = at.reportsAdmin || {};

  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const records = data.records || [];
  const summary = data.summary || {};

  const filteredRecords = records.filter(item => {
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      const name = item.customerName || item.customerSnapshot?.name || '';
      const ref = item.bookingReference || item.id || '';
      return name.toLowerCase().includes(q) || ref.toLowerCase().includes(q);
    }
    return true;
  });

  const handleExport = () => {
    const headers = [
      { label: 'Booking Ref', getter: r => r.bookingReference || r.id || '' },
      { label: 'Customer Name', getter: r => r.customerName || r.customerSnapshot?.name || '' },
      { label: 'Customer Phone', getter: r => r.customerPhone || r.customerSnapshot?.phone || '' },
      { label: 'Event Type', getter: r => r.eventType || r.eventDetails?.eventType || '' },
      { label: 'Event Date', getter: r => r.eventDate || r.eventDetails?.eventDate || '' },
      { label: 'Guests', getter: r => r.guestCount || r.eventDetails?.guestCount || 0 },
      { label: 'Status', key: 'status' },
      { label: 'Created At', getter: r => r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '' },
    ];
    exportToCsv('Aditi_Caterers_Booking_Report', headers, filteredRecords);
  };

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 d-print-none">
        <div>
          <h5 className="fw-bold mb-1 text-dark">
            <i className="bi bi-calendar-check text-primary me-2"></i>
            {rep.bookingReportTitle || 'Event Bookings & Scheduling Report'}
          </h5>
          <small className="text-muted">
            Track confirmed banquets, caterer reservations, and scheduling status.
          </small>
        </div>
        <div className="d-flex gap-2 mt-2 mt-md-0">
          <button type="button" className="btn btn-sm btn-outline-success" onClick={handleExport} disabled={filteredRecords.length === 0}>
            <i className="bi bi-file-earmark-spreadsheet me-1"></i>
            {rep.exportCsv || 'Export CSV'}
          </button>
          <button type="button" className="btn btn-sm btn-outline-primary" onClick={onPrint}>
            <i className="bi bi-printer me-1"></i>
            {rep.printReport || 'Print'}
          </button>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 p-3 bg-light">
            <div className="small text-muted">Total Bookings</div>
            <div className="fs-5 fw-bold text-dark">{summary.total || 0}</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 p-3 bg-light">
            <div className="small text-muted">Confirmed</div>
            <div className="fs-5 fw-bold text-success">{summary.confirmed || 0}</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 p-3 bg-light">
            <div className="small text-muted">Pending Review</div>
            <div className="fs-5 fw-bold text-warning-emphasis">{summary.pending_review || 0}</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 p-3 bg-light">
            <div className="small text-muted">Cancelled</div>
            <div className="fs-5 fw-bold text-danger">{summary.cancelled || 0}</div>
          </div>
        </div>
      </div>

      <div className="row g-2 mb-3 d-print-none">
        <div className="col-12 col-md-6">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search booking ref, customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4">
          <select
            className="form-select form-select-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Booking Statuses</option>
            <option value="pending_review">Pending Review</option>
            <option value="contacted">Contacted</option>
            <option value="quotation_sent">Quotation Sent</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Booking Ref</th>
                <th>Customer</th>
                <th>Event Type</th>
                <th>Event Date</th>
                <th className="text-center">Guests</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Loading booking records...
                  </td>
                </tr>
              ) : filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted fst-italic">
                    No matching booking records found.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item, idx) => (
                  <tr key={item.id || item._id || idx}>
                    <td className="fw-semibold text-primary">{item.bookingReference || item.id || `BK-${idx + 1}`}</td>
                    <td>
                      <div>{item.customerName || item.customerSnapshot?.name}</div>
                      <small className="text-muted">{item.customerPhone || item.customerSnapshot?.phone}</small>
                    </td>
                    <td>{item.eventType || item.eventDetails?.eventType || 'Event'}</td>
                    <td>{item.eventDate || (item.eventDetails?.eventDate ? new Date(item.eventDetails.eventDate).toLocaleDateString() : 'TBD')}</td>
                    <td className="text-center">
                      <span className="badge bg-light text-dark border">
                        {item.guestCount || item.eventDetails?.guestCount || 0}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className={`badge bg-${
                        item.status === 'confirmed' ? 'success' :
                        item.status === 'cancelled' ? 'danger' : 'secondary'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingReports;

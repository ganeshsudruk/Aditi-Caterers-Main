import React, { useState } from 'react';
import { useAdminLanguage } from '../../../context/useAdminLanguage';
import { exportToCsv } from '../../../services/reportAdminService';

const CustomerReports = ({ data = {}, onPrint, loading }) => {
  const { at } = useAdminLanguage();
  const rep = at.reportsAdmin || {};

  const [search, setSearch] = useState('');

  const records = data.records || [];
  const summary = data.summary || {};

  const filteredRecords = records.filter(item => {
    if (search) {
      const q = search.toLowerCase();
      return (
        (item.name || '').toLowerCase().includes(q) ||
        (item.phone || '').includes(q) ||
        (item.email || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExport = () => {
    const headers = [
      { label: 'Customer Name', key: 'name' },
      { label: 'Phone', key: 'phone' },
      { label: 'Email', key: 'email' },
      { label: 'City / Address', key: 'address' },
      { label: 'Total Enquiries', getter: r => r.enquiryCount || 0 },
      { label: 'Total Bookings', getter: r => r.bookingCount || 0 },
      { label: 'Created At', getter: r => r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '' },
    ];
    exportToCsv('Aditi_Caterers_Customer_Report', headers, filteredRecords);
  };

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 d-print-none">
        <div>
          <h5 className="fw-bold mb-1 text-dark">
            <i className="bi bi-people text-primary me-2"></i>
            {rep.customerReportTitle || 'Customer & Client Engagement Report'}
          </h5>
          <small className="text-muted">
            Track customer relationship profiles, repeat bookings, and contact records.
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
        <div className="col-12 col-md-4">
          <div className="card shadow-sm border-0 p-3 bg-light">
            <div className="small text-muted">Total Customer Records</div>
            <div className="fs-5 fw-bold text-dark">{summary.total || filteredRecords.length}</div>
          </div>
        </div>
      </div>

      <div className="row g-2 mb-3 d-print-none">
        <div className="col-12 col-md-6">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search by customer name, phone, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Loading customer records...
                  </td>
                </tr>
              ) : filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted fst-italic">
                    No matching customer records found.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item, idx) => (
                  <tr key={item.id || item._id || idx}>
                    <td className="fw-semibold text-dark">{item.name}</td>
                    <td>{item.phone}</td>
                    <td className="text-muted small">{item.email || '—'}</td>
                    <td className="text-muted small">{item.address || '—'}</td>
                    <td className="small text-muted">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '—'}
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

export default CustomerReports;

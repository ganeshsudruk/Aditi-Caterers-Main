import React, { useState } from 'react';
import { useAdminLanguage } from '../../../context/useAdminLanguage';
import { exportToCsv } from '../../../services/reportAdminService';

const QuotationReports = ({ data = {}, onPrint, loading }) => {
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
      return (
        item.quotationNumber?.toLowerCase().includes(q) ||
        item.customer?.name?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExport = () => {
    const headers = [
      { label: 'Quotation #', key: 'quotationNumber' },
      { label: 'Customer Name', getter: r => r.customer?.name || '' },
      { label: 'Customer Phone', getter: r => r.customer?.phone || '' },
      { label: 'Event Type', getter: r => r.eventDetails?.eventType || '' },
      { label: 'Event Date', getter: r => r.eventDetails?.eventDate || '' },
      { label: 'Service Type', key: 'serviceType' },
      { label: 'Status', key: 'status' },
      { label: 'Grand Total (₹)', getter: r => r.pricing?.grandTotal || 0 },
      { label: 'Issued Date', getter: r => r.issuedDate ? new Date(r.issuedDate).toLocaleDateString() : '' },
    ];
    exportToCsv('Aditi_Caterers_Quotation_Report', headers, filteredRecords);
  };

  return (
    <div>
      {/* Top Header & Actions */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 d-print-none">
        <div>
          <h5 className="fw-bold mb-1 text-dark">
            <i className="bi bi-file-earmark-text text-primary me-2"></i>
            {rep.quotationReportTitle || 'Quotation & Financial Estimate Report'}
          </h5>
          <small className="text-muted">
            Track quoted estimates, revision conversions, and client response rates.
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

      {/* KPI Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 p-3 bg-light">
            <div className="small text-muted">{rep.totalQuotations || 'Total Quotations'}</div>
            <div className="fs-5 fw-bold text-dark">{summary.total || 0}</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 p-3 bg-light">
            <div className="small text-muted">{rep.issued || 'Issued'}</div>
            <div className="fs-5 fw-bold text-primary">{summary.issued || 0}</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 p-3 bg-light">
            <div className="small text-muted">{rep.accepted || 'Accepted'}</div>
            <div className="fs-5 fw-bold text-success">{summary.accepted || 0}</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 p-3 bg-light">
            <div className="small text-muted">{rep.acceptedQuotedValue || 'Accepted Quoted Value'}</div>
            <div className="fs-5 fw-bold text-success">₹{(summary.acceptedQuotedValue || 0).toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>

      {/* Local Filter Bar */}
      <div className="row g-2 mb-3 d-print-none">
        <div className="col-12 col-md-6">
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-light border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search by quote # or customer name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12 col-md-4">
          <select
            className="form-select form-select-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Quotation Statuses</option>
            <option value="draft">Draft</option>
            <option value="issued">Issued</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="revision_requested">Revision Requested</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Report Table */}
      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Quote #</th>
                <th>Customer</th>
                <th>Event Type</th>
                <th>Service Model</th>
                <th className="text-end">Amount</th>
                <th className="text-center">Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Loading quotation records...
                  </td>
                </tr>
              ) : filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted fst-italic">
                    No matching quotation records found.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item) => (
                  <tr key={item.id || item._id}>
                    <td className="fw-semibold text-primary">{item.quotationNumber}</td>
                    <td>
                      <div>{item.customer?.name}</div>
                      <small className="text-muted">{item.customer?.phone}</small>
                    </td>
                    <td>{item.eventDetails?.eventType || 'Catering'}</td>
                    <td>
                      <span className="badge bg-light text-dark border">
                        {item.serviceType === 'with_material' ? 'With Material' : 'Labor Only'}
                      </span>
                    </td>
                    <td className="text-end fw-bold">
                      ₹{(item.pricing?.grandTotal || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="text-center">
                      <span className={`badge bg-${
                        item.status === 'accepted' ? 'success' :
                        item.status === 'issued' ? 'primary' :
                        item.status === 'rejected' ? 'danger' : 'secondary'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="small text-muted">
                      {new Date(item.createdAt).toLocaleDateString()}
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

export default QuotationReports;

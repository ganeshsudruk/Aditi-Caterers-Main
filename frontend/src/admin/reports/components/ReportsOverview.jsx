import React from 'react';
import { useAdminLanguage } from '../../../context/useAdminLanguage';
import { exportToCsv } from '../../../services/reportAdminService';

const ReportsOverview = ({ summary = {}, onNavigateTab, onPrint }) => {
  const { at } = useAdminLanguage();
  const rep = at.reportsAdmin || {};

  const handleExportOverview = () => {
    const headers = [
      { label: 'Metric', key: 'metric' },
      { label: 'Value', key: 'value' },
      { label: 'Category', key: 'category' },
    ];
    const rows = [
      { metric: 'Total Quotations', value: summary.totalQuotations || 0, category: 'Quotations' },
      { metric: 'Issued Quotations', value: summary.issuedQuotations || 0, category: 'Quotations' },
      { metric: 'Accepted Quotations', value: summary.acceptedQuotations || 0, category: 'Quotations' },
      { metric: 'Accepted Quoted Value (₹)', value: summary.acceptedQuotedValue || 0, category: 'Quotations' },
      { metric: 'Total Bookings', value: summary.totalBookings || 0, category: 'Bookings' },
      { metric: 'Confirmed Bookings', value: summary.confirmedBookings || 0, category: 'Bookings' },
      { metric: 'Cancelled Bookings', value: summary.cancelledBookings || 0, category: 'Bookings' },
      { metric: 'Total Enquiries', value: summary.totalEnquiries || 0, category: 'Enquiries' },
      { metric: 'Customer Records', value: summary.totalCustomers || 0, category: 'Customers' },
      { metric: 'Published Reviews', value: summary.totalReviews || 0, category: 'Content' },
      { metric: 'Published Awards', value: summary.totalAwards || 0, category: 'Content' },
      { metric: 'Gallery Items', value: summary.totalGallery || 0, category: 'Content' },
    ];
    exportToCsv('Aditi_Caterers_Overview_Report', headers, rows);
  };

  return (
    <div>
      {/* Top action bar */}
      <div className="d-flex justify-content-between align-items-center mb-4 d-print-none">
        <h5 className="fw-bold mb-0 text-dark">
          <i className="bi bi-speedometer2 text-primary me-2"></i>
          {rep.executiveSummary || 'Executive Overview & Key Metrics'}
        </h5>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-sm btn-outline-success" onClick={handleExportOverview}>
            <i className="bi bi-file-earmark-spreadsheet me-1"></i>
            {rep.exportCsv || 'Export CSV'}
          </button>
          <button type="button" className="btn btn-sm btn-outline-primary" onClick={onPrint}>
            <i className="bi bi-printer me-1"></i>
            {rep.printReport || 'Print Report'}
          </button>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="row g-3 mb-4">
        {/* Accepted Quoted Value */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 border-start border-4 border-success h-100 p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small text-muted fw-semibold">{rep.acceptedQuotedValue || 'Accepted Quoted Value'}</span>
              <i className="bi bi-cash-coin fs-4 text-success"></i>
            </div>
            <div className="fs-4 fw-bold text-dark">
              ₹{(summary.acceptedQuotedValue || 0).toLocaleString('en-IN')}
            </div>
            <small className="text-secondary extra-small mt-1">
              *Sum of accepted quotations (Not collected revenue)
            </small>
          </div>
        </div>

        {/* Confirmed Bookings */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 border-start border-4 border-primary h-100 p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small text-muted fw-semibold">{rep.confirmedBookings || 'Confirmed Bookings'}</span>
              <i className="bi bi-check-circle-fill fs-4 text-primary"></i>
            </div>
            <div className="fs-4 fw-bold text-dark">{summary.confirmedBookings || 0}</div>
            <div className="small text-muted mt-1">
              Out of {summary.totalBookings || 0} total bookings
            </div>
          </div>
        </div>

        {/* Quotations Ratio */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 border-start border-4 border-info h-100 p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small text-muted fw-semibold">{rep.quotationsIssued || 'Quotations Issued'}</span>
              <i className="bi bi-file-earmark-text-fill fs-4 text-info"></i>
            </div>
            <div className="fs-4 fw-bold text-dark">{summary.issuedQuotations || 0}</div>
            <div className="small text-success mt-1">
              <i className="bi bi-check2 me-1"></i>
              {summary.acceptedQuotations || 0} Accepted
            </div>
          </div>
        </div>

        {/* Customers */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 border-start border-4 border-warning h-100 p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small text-muted fw-semibold">{rep.totalCustomers || 'Total Customers'}</span>
              <i className="bi bi-people-fill fs-4 text-warning"></i>
            </div>
            <div className="fs-4 fw-bold text-dark">{summary.totalCustomers || 0}</div>
            <div className="small text-muted mt-1">
              Active CRM profiles
            </div>
          </div>
        </div>
      </div>

      {/* Department Breakdown Section */}
      <div className="row g-4 mb-4">
        {/* Quotation Department */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <span className="fw-bold text-dark">
                <i className="bi bi-file-earmark-text text-primary me-2"></i>
                {rep.quotationSummary || 'Quotation Management Activity'}
              </span>
              <button
                type="button"
                className="btn btn-sm btn-link text-decoration-none p-0 d-print-none"
                onClick={() => onNavigateTab('quotations')}
              >
                View details &rarr;
              </button>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center py-2 px-3">
                  <span>Total Quotations Created</span>
                  <span className="badge bg-secondary">{summary.totalQuotations || 0}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center py-2 px-3">
                  <span>Issued to Clients</span>
                  <span className="badge bg-primary">{summary.issuedQuotations || 0}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center py-2 px-3">
                  <span className="text-success fw-semibold">Accepted Quotations</span>
                  <span className="badge bg-success">{summary.acceptedQuotations || 0}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center py-2 px-3 bg-light">
                  <span className="fw-bold">Total Quoted Value Accepted</span>
                  <span className="fw-bold text-success">₹{(summary.acceptedQuotedValue || 0).toLocaleString('en-IN')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Website Content Overview */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <span className="fw-bold text-dark">
                <i className="bi bi-globe2 text-info me-2"></i>
                {rep.websiteContent || 'Website Content Records'}
              </span>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center py-2 px-3">
                  <span>Published Customer Reviews</span>
                  <span className="badge bg-info text-dark">{summary.totalReviews || 0}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center py-2 px-3">
                  <span>Awards & Recognitions</span>
                  <span className="badge bg-warning text-dark">{summary.totalAwards || 0}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center py-2 px-3">
                  <span>Event Gallery Photos</span>
                  <span className="badge bg-secondary">{summary.totalGallery || 0}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsOverview;

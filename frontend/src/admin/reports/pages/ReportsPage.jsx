import React, { useState, useEffect, useCallback } from 'react';
import { useAdminLanguage } from '../../../context/useAdminLanguage';
import { reportAdminService } from '../../../services/reportAdminService';
import ReportDateFilter from '../components/ReportDateFilter';
import ReportsOverview from '../components/ReportsOverview';
import QuotationReports from '../components/QuotationReports';
import BookingReports from '../components/BookingReports';
import CustomerReports from '../components/CustomerReports';

const ReportsPage = () => {
  const { at } = useAdminLanguage();
  const rep = at.reportsAdmin || {};

  // Active section tab
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'quotations' | 'bookings' | 'customers'

  // Date filters
  const [preset, setPreset] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Report datasets
  const [overviewData, setOverviewData] = useState({});
  const [quotationData, setQuotationData] = useState({});
  const [bookingData, setBookingData] = useState({});
  const [customerData, setCustomerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      };

      if (activeTab === 'overview') {
        const data = await reportAdminService.getOverviewReport(params);
        setOverviewData(data);
      } else if (activeTab === 'quotations') {
        const data = await reportAdminService.getQuotationReport(params);
        setQuotationData(data);
      } else if (activeTab === 'bookings') {
        const data = await reportAdminService.getBookingReport(params);
        setBookingData(data);
      } else if (activeTab === 'customers') {
        const data = await reportAdminService.getCustomerReport(params);
        setCustomerData(data);
      }
    } catch (err) {
      console.error('fetchReports error:', err);
      setError(err.message || 'Failed to load report data');
    } finally {
      setLoading(false);
    }
  }, [activeTab, startDate, endDate]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleResetFilters = () => {
    setPreset('all');
    setStartDate('');
    setEndDate('');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container-fluid p-4">
      {/* Page Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: '#800020' }}>
            <i className="bi bi-file-earmark-bar-graph-fill me-2"></i>
            {rep.pageTitle || 'Reports & Business Intelligence'}
          </h3>
          <p className="text-muted small mb-0">
            {rep.pageSubtitle ||
              'Analyze catering operational performance, bookings, quotations, and customer engagement metrics.'}
          </p>
        </div>
        <div className="d-print-none mt-2 mt-md-0">
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={handlePrint}>
            <i className="bi bi-printer me-1"></i>
            {rep.printReport || 'Print Report'}
          </button>
        </div>
      </div>

      {/* Global Date Filter */}
      <ReportDateFilter
        preset={preset}
        setPreset={setPreset}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onApply={fetchReports}
        onReset={handleResetFilters}
        loading={loading}
      />

      {/* Navigation Tabs */}
      <div className="border-bottom mb-4 d-print-none">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'overview' ? 'active fw-bold' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <i className="bi bi-speedometer2 me-1"></i>
              {rep.tabOverview || 'Overview / आढावा'}
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'quotations' ? 'active fw-bold' : ''}`}
              onClick={() => setActiveTab('quotations')}
            >
              <i className="bi bi-file-earmark-text me-1"></i>
              {rep.tabQuotations || 'Quotations / कोटेशन'}
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'bookings' ? 'active fw-bold' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              <i className="bi bi-calendar-check me-1"></i>
              {rep.tabBookings || 'Bookings / बुकिंग'}
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'customers' ? 'active fw-bold' : ''}`}
              onClick={() => setActiveTab('customers')}
            >
              <i className="bi bi-people me-1"></i>
              {rep.tabCustomers || 'Customers / ग्राहक'}
            </button>
          </li>
        </ul>
      </div>

      {/* Error alert */}
      {error && (
        <div className="alert alert-danger py-2 small" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      )}

      {/* Report views */}
      {activeTab === 'overview' && (
        <ReportsOverview
          summary={overviewData.summary}
          onNavigateTab={setActiveTab}
          onPrint={handlePrint}
        />
      )}

      {activeTab === 'quotations' && (
        <QuotationReports
          data={quotationData}
          onPrint={handlePrint}
          loading={loading}
        />
      )}

      {activeTab === 'bookings' && (
        <BookingReports
          data={bookingData}
          onPrint={handlePrint}
          loading={loading}
        />
      )}

      {activeTab === 'customers' && (
        <CustomerReports
          data={customerData}
          onPrint={handlePrint}
          loading={loading}
        />
      )}
    </div>
  );
};

export default ReportsPage;

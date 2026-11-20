import React from 'react';
import { useAdminLanguage } from '../../../context/useAdminLanguage';
import { QUOTATION_STATUSES, SERVICE_TYPES } from '../../../services/quotationAdminService';

const QuotationFilters = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  serviceTypeFilter,
  setServiceTypeFilter,
  sortBy,
  setSortBy,
  onReset,
  stats = {}
}) => {
  const { adminLang, at } = useAdminLanguage();
  const currentLang = adminLang === 'mr' ? 'mr' : 'en';
  const qa = at.quotationAdmin || {};

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body p-3">
        {/* Quick status pill buttons */}
        <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
          <button
            type="button"
            className={`btn btn-sm ${statusFilter === 'all' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setStatusFilter('all')}
          >
            {qa.allQuotations || 'All Quotations'} ({stats.total || 0})
          </button>
          <button
            type="button"
            className={`btn btn-sm ${statusFilter === 'draft' ? 'btn-secondary text-white' : 'btn-outline-secondary'}`}
            onClick={() => setStatusFilter('draft')}
          >
            {qa.draft || 'Draft'} ({stats.draft || 0})
          </button>
          <button
            type="button"
            className={`btn btn-sm ${statusFilter === 'issued' ? 'btn-info text-dark' : 'btn-outline-info'}`}
            onClick={() => setStatusFilter('issued')}
          >
            {qa.issued || 'Issued'} ({stats.issued || 0})
          </button>
          <button
            type="button"
            className={`btn btn-sm ${statusFilter === 'accepted' ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setStatusFilter('accepted')}
          >
            {qa.accepted || 'Accepted'} ({stats.accepted || 0})
          </button>
          <button
            type="button"
            className={`btn btn-sm ${statusFilter === 'revision_requested' ? 'btn-warning text-dark' : 'btn-outline-warning'}`}
            onClick={() => setStatusFilter('revision_requested')}
          >
            {qa.revisionRequested || 'Revision Requested'} ({stats.revision_requested || 0})
          </button>
        </div>

        {/* Search, Dropdowns, and Reset */}
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-4">
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder={qa.searchPlaceholder || 'Search by quote #, customer, phone, event...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setSearch('')}
                  title="Clear search"
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          </div>

          <div className="col-6 col-md-3">
            <select
              className="form-select form-select-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">{qa.filterStatus || 'All Statuses'}</option>
              {QUOTATION_STATUSES.map((st) => (
                <option key={st.id} value={st.id}>
                  {currentLang === 'mr' ? st.mr : st.en}
                </option>
              ))}
            </select>
          </div>

          <div className="col-6 col-md-3">
            <select
              className="form-select form-select-sm"
              value={serviceTypeFilter}
              onChange={(e) => setServiceTypeFilter(e.target.value)}
            >
              <option value="all">{qa.filterServiceType || 'All Service Types'}</option>
              {SERVICE_TYPES.map((st) => (
                <option key={st.id} value={st.id}>
                  {currentLang === 'mr' ? st.mr : st.en}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-2 d-flex gap-2 justify-content-md-end">
            <select
              className="form-select form-select-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">{qa.sortNewest || 'Newest First'}</option>
              <option value="oldest">{qa.sortOldest || 'Oldest First'}</option>
              <option value="amount_high">{qa.sortAmountHigh || 'Highest Amount'}</option>
              <option value="amount_low">{qa.sortAmountLow || 'Lowest Amount'}</option>
              <option value="event_date">{qa.sortEventDate || 'Event Date'}</option>
            </select>

            <button
              type="button"
              className="btn btn-sm btn-outline-secondary text-nowrap"
              onClick={onReset}
              title="Reset filters"
            >
              <i className="bi bi-arrow-counterclockwise"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationFilters;

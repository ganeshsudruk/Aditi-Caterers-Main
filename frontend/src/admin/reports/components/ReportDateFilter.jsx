import React from 'react';
import { useAdminLanguage } from '../../../context/useAdminLanguage';

const ReportDateFilter = ({
  preset,
  setPreset,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onApply,
  onReset,
  loading
}) => {
  const { at } = useAdminLanguage();
  const rep = at.reportsAdmin || {};

  const handlePresetChange = (newPreset) => {
    setPreset(newPreset);
    const now = new Date();
    let start = '';
    let end = now.toISOString().split('T')[0];

    if (newPreset === 'today') {
      start = end;
    } else if (newPreset === 'this_week') {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      start = d.toISOString().split('T')[0];
    } else if (newPreset === 'this_month') {
      const d = new Date(now.getFullYear(), now.getMonth(), 1);
      start = d.toISOString().split('T')[0];
    } else if (newPreset === 'this_year') {
      const d = new Date(now.getFullYear(), 0, 1);
      start = d.toISOString().split('T')[0];
    } else if (newPreset === 'all') {
      start = '';
      end = '';
    }

    if (newPreset !== 'custom') {
      setStartDate(start);
      setEndDate(end);
    }
  };

  return (
    <div className="card shadow-sm border-0 mb-4 d-print-none">
      <div className="card-body p-3">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-3">
            <label className="form-label small fw-semibold text-secondary mb-1">
              <i className="bi bi-calendar3 me-1"></i>
              {rep.presetLabel || 'Reporting Period'}
            </label>
            <select
              className="form-select form-select-sm"
              value={preset}
              onChange={(e) => handlePresetChange(e.target.value)}
            >
              <option value="all">{rep.presetAll || 'All Time'}</option>
              <option value="today">{rep.presetToday || 'Today'}</option>
              <option value="this_week">{rep.presetWeek || 'Last 7 Days'}</option>
              <option value="this_month">{rep.presetMonth || 'This Month'}</option>
              <option value="this_year">{rep.presetYear || 'This Year'}</option>
              <option value="custom">{rep.presetCustom || 'Custom Date Range'}</option>
            </select>
          </div>

          <div className="col-6 col-md-3">
            <label className="form-label small fw-semibold text-secondary mb-1">
              {rep.startDate || 'Start Date'}
            </label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setPreset('custom');
              }}
            />
          </div>

          <div className="col-6 col-md-3">
            <label className="form-label small fw-semibold text-secondary mb-1">
              {rep.endDate || 'End Date'}
            </label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setPreset('custom');
              }}
            />
          </div>

          <div className="col-12 col-md-3 d-flex gap-2 align-items-end pt-3 pt-md-0">
            <button
              type="button"
              className="btn btn-sm btn-primary flex-grow-1"
              onClick={onApply}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-1" role="status"></span>
              ) : (
                <i className="bi bi-filter me-1"></i>
              )}
              {rep.applyFilters || 'Apply'}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={onReset}
              title={rep.resetFilters || 'Reset'}
              disabled={loading}
            >
              <i className="bi bi-arrow-counterclockwise"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDateFilter;

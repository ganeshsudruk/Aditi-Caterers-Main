import { BOOKING_STATUSES } from '../../../services/bookingAdminService';

const EVENT_TYPES = [
  { id: 'all', label: 'All Event Types' },
  { id: 'wedding', label: 'Wedding' },
  { id: 'engagement', label: 'Engagement' },
  { id: 'birthday', label: 'Birthday Party' },
  { id: 'reception', label: 'Reception' },
  { id: 'corporate', label: 'Corporate Event' },
  { id: 'religious', label: 'Religious Ceremony / Pooja' },
  { id: 'other', label: 'Other Event' },
];

const CATERING_TYPES = [
  { id: 'all', label: 'All Catering Types' },
  { id: 'with-material', label: 'With Material' },
  { id: 'without-material', label: 'Without Material' },
];

const SORT_OPTIONS = [
  { id: 'created_desc', label: 'Newest Submissions' },
  { id: 'created_asc', label: 'Oldest Submissions' },
  { id: 'date_asc', label: 'Upcoming Event Date (Nearest)' },
  { id: 'date_desc', label: 'Event Date (Furthest)' },
  { id: 'customer_asc', label: 'Customer Name (A-Z)' },
];

export default function BookingFilters({
  filters,
  onFilterChange,
  onResetFilters,
}) {
  const hasActiveFilters =
    filters.search ||
    filters.status !== 'all' ||
    filters.eventType !== 'all' ||
    filters.cateringType !== 'all' ||
    filters.sortBy !== 'created_desc';

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
      <div className="row g-2 align-items-center">
        {/* Search Input */}
        <div className="col-12 col-md-4">
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-light border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Search by ID, Customer, Mobile, City..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              aria-label="Search bookings and enquiries"
            />
            {filters.search && (
              <button
                type="button"
                className="btn btn-outline-secondary border-start-0"
                onClick={() => onFilterChange('search', '')}
                aria-label="Clear search"
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
        </div>

        {/* Status Filter */}
        <div className="col-6 col-md-2">
          <select
            className="form-select form-select-sm"
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            aria-label="Filter by status"
          >
            <option value="all">All Statuses</option>
            {Object.values(BOOKING_STATUSES).map((st) => (
              <option key={st.id} value={st.id}>
                {st.label.en}
              </option>
            ))}
          </select>
        </div>

        {/* Event Type Filter */}
        <div className="col-6 col-md-2">
          <select
            className="form-select form-select-sm"
            value={filters.eventType}
            onChange={(e) => onFilterChange('eventType', e.target.value)}
            aria-label="Filter by event type"
          >
            {EVENT_TYPES.map((et) => (
              <option key={et.id} value={et.id}>
                {et.label}
              </option>
            ))}
          </select>
        </div>

        {/* Catering Type Filter */}
        <div className="col-6 col-md-2">
          <select
            className="form-select form-select-sm"
            value={filters.cateringType}
            onChange={(e) => onFilterChange('cateringType', e.target.value)}
            aria-label="Filter by catering type"
          >
            {CATERING_TYPES.map((ct) => (
              <option key={ct.id} value={ct.id}>
                {ct.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="col-6 col-md-2">
          <select
            className="form-select form-select-sm"
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            aria-label="Sort bookings"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active filters / Reset button */}
      {hasActiveFilters && (
        <div className="d-flex align-items-center justify-content-between mt-2 pt-2 border-top small text-muted">
          <span>Active filters applied</span>
          <button
            type="button"
            className="btn btn-sm btn-link text-danger p-0 text-decoration-none"
            onClick={onResetFilters}
          >
            <i className="bi bi-x-circle me-1"></i>
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}

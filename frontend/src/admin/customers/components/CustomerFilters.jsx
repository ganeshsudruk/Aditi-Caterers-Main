export default function CustomerFilters({ filters, counts, onFilterChange, onReset }) {
  const isFiltered =
    filters.search ||
    filters.bookingFilter !== 'all' ||
    filters.archiveFilter !== 'active' ||
    filters.sortBy !== 'created_desc';

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
      <div className="row g-3 align-items-center">
        {/* Search Input */}
        <div className="col-12 col-md-4">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control bg-light border-start-0"
              placeholder="Search by name, phone or email..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              aria-label="Search customers"
            />
            {filters.search && (
              <button
                type="button"
                className="btn btn-light border"
                onClick={() => onFilterChange('search', '')}
                title="Clear search"
                aria-label="Clear search"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>

        {/* Booking Filter */}
        <div className="col-6 col-md-2">
          <select
            className="form-select"
            value={filters.bookingFilter}
            onChange={(e) => onFilterChange('bookingFilter', e.target.value)}
            aria-label="Filter by booking activity"
          >
            <option value="all">All Bookings</option>
            <option value="with_bookings">With Bookings</option>
            <option value="without_bookings">Without Bookings</option>
          </select>
        </div>

        {/* Archive / Status Filter */}
        <div className="col-6 col-md-2">
          <select
            className="form-select"
            value={filters.archiveFilter}
            onChange={(e) => onFilterChange('archiveFilter', e.target.value)}
            aria-label="Filter by customer status"
          >
            <option value="active">Active Only ({counts.active})</option>
            <option value="archived">Archived ({counts.archived})</option>
            <option value="all">All Statuses ({counts.total})</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="col-6 col-md-3">
          <select
            className="form-select"
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            aria-label="Sort customers"
          >
            <option value="created_desc">Created: Newest First</option>
            <option value="created_asc">Created: Oldest First</option>
            <option value="name_asc">Name: A to Z</option>
            <option value="bookings_desc">Total Bookings: Highest</option>
            <option value="last_event_desc">Recent Event Date</option>
          </select>
        </div>

        {/* Reset Action */}
        <div className="col-6 col-md-1 text-md-end">
          {isFiltered && (
            <button
              type="button"
              className="btn btn-outline-secondary w-100 px-2"
              onClick={onReset}
              title="Reset all filters"
            >
              <i className="bi bi-arrow-counterclockwise"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

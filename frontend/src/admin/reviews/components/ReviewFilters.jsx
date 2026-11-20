import { REVIEW_SOURCES, REVIEW_EVENT_TYPES } from '../../../services/reviewAdminService';

export default function ReviewFilters({ filters, counts, onFilterChange, onReset }) {
  const isFiltered =
    filters.search ||
    filters.statusFilter !== 'all' ||
    filters.ratingFilter !== 'all' ||
    filters.eventTypeFilter !== 'all' ||
    filters.sourceFilter !== 'all' ||
    filters.featuredFilter !== 'all' ||
    filters.sortBy !== 'newest';

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
      <div className="row g-3 align-items-center">
        {/* Search */}
        <div className="col-12 col-md-3">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control bg-light border-start-0"
              placeholder="Search by customer, text..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              aria-label="Search reviews"
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

        {/* Status Filter */}
        <div className="col-6 col-md-2">
          <select
            className="form-select"
            value={filters.statusFilter}
            onChange={(e) => onFilterChange('statusFilter', e.target.value)}
            aria-label="Filter by status"
          >
            <option value="all">All Statuses ({counts.total})</option>
            <option value="pending">Pending ({counts.pending})</option>
            <option value="approved">Approved ({counts.approved})</option>
            <option value="published">Published ({counts.published})</option>
            <option value="rejected">Rejected ({counts.rejected})</option>
            <option value="unpublished">Unpublished ({counts.unpublished})</option>
            <option value="archived">Archived ({counts.archived})</option>
          </select>
        </div>

        {/* Rating Filter */}
        <div className="col-6 col-md-2">
          <select
            className="form-select"
            value={filters.ratingFilter}
            onChange={(e) => onFilterChange('ratingFilter', e.target.value)}
            aria-label="Filter by rating"
          >
            <option value="all">All Ratings</option>
            <option value="5">★★★★★ (5 Stars)</option>
            <option value="4">★★★★☆ (4 Stars)</option>
            <option value="3">★★★☆☆ (3 Stars)</option>
            <option value="2">★★☆☆☆ (2 Stars)</option>
            <option value="1">★☆☆☆☆ (1 Star)</option>
            <option value="unrated">Unrated / No Rating</option>
          </select>
        </div>

        {/* Event Type Filter */}
        <div className="col-6 col-md-2">
          <select
            className="form-select"
            value={filters.eventTypeFilter}
            onChange={(e) => onFilterChange('eventTypeFilter', e.target.value)}
            aria-label="Filter by event type"
          >
            <option value="all">All Event Types</option>
            {REVIEW_EVENT_TYPES.map((ev) => (
              <option key={ev.id} value={ev.id}>
                {ev.en}
              </option>
            ))}
          </select>
        </div>

        {/* Source Filter */}
        <div className="col-6 col-md-1">
          <select
            className="form-select px-2"
            value={filters.sourceFilter}
            onChange={(e) => onFilterChange('sourceFilter', e.target.value)}
            aria-label="Filter by source"
          >
            <option value="all">Source</option>
            {REVIEW_SOURCES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.en}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="col-8 col-md-1">
          <select
            className="form-select px-2"
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            aria-label="Sort reviews"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="rating_desc">Rating ↓</option>
            <option value="rating_asc">Rating ↑</option>
            <option value="order_asc">Order</option>
            <option value="updated_desc">Updated</option>
          </select>
        </div>

        {/* Reset */}
        <div className="col-4 col-md-1 text-end">
          {isFiltered && (
            <button
              type="button"
              className="btn btn-outline-secondary w-100 px-2"
              onClick={onReset}
              title="Reset all filters"
              aria-label="Reset filters"
            >
              <i className="bi bi-arrow-counterclockwise"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

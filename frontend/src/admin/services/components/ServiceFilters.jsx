export default function ServiceFilters({ filters, counts, onFilterChange, onReset }) {
  const isFiltered =
    filters.search ||
    filters.statusFilter !== 'all' ||
    filters.sortBy !== 'order_asc';

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
      <div className="row g-3 align-items-center">
        {/* Search */}
        <div className="col-12 col-md-5">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control bg-light border-start-0"
              placeholder="Search services by English or Marathi name..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              aria-label="Search services"
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
        <div className="col-6 col-md-3">
          <select
            className="form-select"
            value={filters.statusFilter}
            onChange={(e) => onFilterChange('statusFilter', e.target.value)}
            aria-label="Filter by service status"
          >
            <option value="all">All Statuses ({counts.total})</option>
            <option value="published">Published ({counts.published})</option>
            <option value="draft">Drafts ({counts.draft})</option>
            <option value="unpublished">Unpublished ({counts.unpublished})</option>
            <option value="archived">Archived ({counts.archived})</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="col-6 col-md-3">
          <select
            className="form-select"
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            aria-label="Sort services"
          >
            <option value="order_asc">Display Order (Ascending)</option>
            <option value="name_asc">Service Name (A-Z)</option>
            <option value="created_desc">Recently Created</option>
            <option value="updated_desc">Recently Updated</option>
          </select>
        </div>

        {/* Reset */}
        <div className="col-12 col-md-1 text-md-end">
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

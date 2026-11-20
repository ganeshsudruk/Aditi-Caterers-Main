export default function PackageFilters({
  filters,
  counts,
  onFilterChange,
  onReset,
}) {
  const isFiltered =
    filters.search ||
    filters.statusFilter !== 'all' ||
    filters.serviceTypeFilter !== 'all' ||
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
              placeholder="Search packages by English or Marathi name..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              aria-label="Search packages"
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
            aria-label="Filter by package status"
          >
            <option value="all">All Statuses ({counts.total})</option>
            <option value="published">Published ({counts.published})</option>
            <option value="draft">Drafts ({counts.draft})</option>
            <option value="unpublished">Unpublished ({counts.unpublished})</option>
            <option value="archived">Archived ({counts.archived})</option>
          </select>
        </div>

        {/* Service Type Filter */}
        <div className="col-6 col-md-2">
          <select
            className="form-select"
            value={filters.serviceTypeFilter}
            onChange={(e) => onFilterChange('serviceTypeFilter', e.target.value)}
            aria-label="Filter by service type"
          >
            <option value="all">All Service Types</option>
            <option value="with_material">With Material</option>
            <option value="without_material">Without Material</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="col-8 col-md-1">
          <select
            className="form-select px-2"
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            aria-label="Sort packages"
          >
            <option value="order_asc">Order</option>
            <option value="name_asc">A-Z</option>
            <option value="price_desc">Price: High</option>
            <option value="price_asc">Price: Low</option>
            <option value="created_desc">Newest</option>
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
            >
              <i className="bi bi-arrow-counterclockwise"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

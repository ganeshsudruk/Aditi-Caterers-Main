import { defaultGalleryCategories } from '../../../services/galleryService';

export default function GalleryFilters({ filters, counts, onFilterChange, onReset }) {
  const isFiltered =
    filters.search ||
    filters.statusFilter !== 'all' ||
    filters.categoryFilter !== 'all' ||
    filters.featuredFilter !== 'all' ||
    filters.sortBy !== 'order_asc';

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
      <div className="row g-3 align-items-center">
        {/* Search */}
        <div className="col-12 col-md-4">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control bg-light border-start-0"
              placeholder="Search photos by caption or event type..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              aria-label="Search photos"
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

        {/* Category Filter */}
        <div className="col-6 col-md-2">
          <select
            className="form-select"
            value={filters.categoryFilter}
            onChange={(e) => onFilterChange('categoryFilter', e.target.value)}
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {defaultGalleryCategories
              .filter((c) => c.id !== 'all')
              .map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name?.en}
                </option>
              ))}
          </select>
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
            <option value="published">Published ({counts.published})</option>
            <option value="draft">Drafts ({counts.draft})</option>
            <option value="unpublished">Unpublished ({counts.unpublished})</option>
            <option value="archived">Archived ({counts.archived})</option>
          </select>
        </div>

        {/* Featured Filter */}
        <div className="col-6 col-md-2">
          <select
            className="form-select"
            value={filters.featuredFilter}
            onChange={(e) => onFilterChange('featuredFilter', e.target.value)}
            aria-label="Filter by featured"
          >
            <option value="all">All Highlights</option>
            <option value="featured">Featured Only</option>
            <option value="not_featured">Regular Only</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="col-4 col-md-1">
          <select
            className="form-select px-2"
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            aria-label="Sort photos"
          >
            <option value="order_asc">Order</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="updated_desc">Updated</option>
          </select>
        </div>

        {/* Reset */}
        <div className="col-2 col-md-1 text-end">
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

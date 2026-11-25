import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchAdminMenuItems,
  fetchAdminCategories,
  createMenuItem,
  updateMenuItem,
  updateMenuItemStatus,
  reorderMenuItem,
} from '../../../services/menuAdminService';
import MenuItemTable from '../components/MenuItemTable';
import MenuFilters from '../components/MenuFilters';
import MenuItemForm from '../components/MenuItemForm';
import MenuItemPreviewModal from '../components/MenuItemPreviewModal';
import MenuItemActionModal from '../components/MenuItemActionModal';

const DEFAULT_FILTERS = {
  search: '',
  categoryFilter: 'all',
  statusFilter: 'all',
  foodTypeFilter: 'all',
  sortBy: 'order_asc',
  page: 1,
  limit: 10,
};

export default function ManageMenuItemsPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({
    items: [],
    pagination: { total: 0, page: 1, limit: 10, totalPages: 1 },
    counts: { total: 0, published: 0, draft: 0, unpublished: 0, archived: 0, totalCategories: 0 },
  });
  const [loading, setLoading] = useState(true);

  // Modals
  const [itemFormState, setItemFormState] = useState({ isOpen: false, data: null });
  const [previewModal, setPreviewModal] = useState({ isOpen: false, item: null });
  const [actionModal, setActionModal] = useState({
    isOpen: false,
    item: null,
    actionType: 'publish',
  });
  const [submittingAction, setSubmittingAction] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    document.title = 'Food Menu Management | Aditi Caterers Admin';
    fetchAdminCategories().then((res) => setCategories(res.items || []));
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchAdminMenuItems(filters)
      .then((result) => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [filters, refreshTrigger]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? value : 1,
    }));
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleSaveItem = async (payload, editId) => {
    try {
      if (editId) {
        await updateMenuItem(editId, payload);
        setFeedback({ type: 'success', message: 'Menu item updated successfully in MongoDB.' });
      } else {
        await createMenuItem(payload);
        setFeedback({ type: 'success', message: 'Menu item saved successfully to MongoDB.' });
      }
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to save menu item.';
      setFeedback({ type: 'danger', message: msg });
      throw err;
    }
  };

  const handleOpenEdit = (item) => {
    setItemFormState({ isOpen: true, data: item });
  };

  const handleOpenPreview = (item) => {
    setPreviewModal({ isOpen: true, item });
  };

  const handleOpenAction = (item, actionType) => {
    setActionModal({ isOpen: true, item, actionType });
  };

  const handleConfirmAction = async () => {
    if (!actionModal.item) return;
    setSubmittingAction(true);
    try {
      const { item, actionType } = actionModal;
      let targetStatus = 'draft';
      if (actionType === 'publish') targetStatus = 'published';
      else if (actionType === 'unpublish') targetStatus = 'unpublished';
      else if (actionType === 'archive') targetStatus = 'archived';
      else if (actionType === 'restore') targetStatus = 'draft';

      await updateMenuItemStatus(item.id, targetStatus);
      setActionModal({ isOpen: false, item: null, actionType: 'publish' });
      setFeedback({
        type: 'success',
        message: `Menu item "${item.name?.en || ''}" status updated to ${targetStatus}.`,
      });
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to update menu item status.';
      setFeedback({ type: 'danger', message: msg });
      setActionModal({ isOpen: false, item: null, actionType: 'publish' });
    } finally {
      setSubmittingAction(false);
    }
  };

  const handleReorder = async (id, direction) => {
    await reorderMenuItem(id, direction);
    setRefreshTrigger((prev) => prev + 1);
  };

  const pagination = data.pagination || { total: 0, page: 1, totalPages: 1 };

  return (
    <div>
      {feedback && (
        <div
          className={`alert alert-${feedback.type} alert-dismissible fade show d-flex align-items-center mb-3`}
          role="alert"
        >
          <i className={`bi ${feedback.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`} />
          <div>{feedback.message}</div>
          <button
            type="button"
            className="btn-close"
            onClick={() => setFeedback(null)}
            aria-label="Close"
          />
        </div>
      )}

      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1">
            <i className="bi bi-egg-fried me-2" style={{ color: '#641e2b' }}></i>
            Food Menu Management
          </h1>
          <p className="text-muted small mb-0">
            Manage categories, dishes, ingredients, and dietary choices shown on the public menu.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Link
            to="/admin/menu/categories"
            className="btn btn-outline-dark d-flex align-items-center gap-2"
          >
            <i className="bi bi-folder-fill"></i>
            <span>Manage Categories ({categories.length})</span>
          </Link>

          <button
            type="button"
            className="btn btn-primary d-flex align-items-center gap-2"
            style={{ backgroundColor: '#641e2b', borderColor: '#641e2b' }}
            onClick={() => setItemFormState({ isOpen: true, data: null })}
          >
            <i className="bi bi-plus-circle-fill"></i>
            <span>Add Menu Item</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <MenuFilters
        filters={filters}
        categories={categories}
        counts={data.counts || { total: 0, published: 0, draft: 0, unpublished: 0, archived: 0 }}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Loading State */}
      {loading ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
          <div className="spinner-border text-maroon mx-auto mb-3" style={{ color: '#641e2b' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mb-0">Loading menu dishes...</p>
        </div>
      ) : data.items.length === 0 ? (
        /* Empty / No Results State */
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
          <div
            className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mx-auto mb-3"
            style={{ width: '64px', height: '64px' }}
          >
            <i className="bi bi-egg-fried text-muted fs-2"></i>
          </div>
          <h3 className="h5 fw-bold text-dark mb-2">
            {filters.search || filters.categoryFilter !== 'all' || filters.statusFilter !== 'all' || filters.foodTypeFilter !== 'all'
              ? 'No matching dishes found'
              : 'No menu items yet'}
          </h3>
          <p className="text-muted small mb-3">
            {filters.search || filters.categoryFilter !== 'all' || filters.statusFilter !== 'all' || filters.foodTypeFilter !== 'all'
              ? 'Try modifying your search term or filter options.'
              : 'Add your first dish to start showcasing your food menu.'}
          </p>
          {(filters.search || filters.categoryFilter !== 'all' || filters.statusFilter !== 'all' || filters.foodTypeFilter !== 'all') && (
            <div>
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleResetFilters}>
                <i className="bi bi-arrow-counterclockwise me-1"></i> Reset Filters
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Table of Menu Items */
        <>
          <MenuItemTable
            items={data.items}
            onEdit={handleOpenEdit}
            onPreview={handleOpenPreview}
            onPublish={(i) => handleOpenAction(i, 'publish')}
            onUnpublish={(i) => handleOpenAction(i, 'unpublish')}
            onArchive={(i) => handleOpenAction(i, 'archive')}
            onRestore={(i) => handleOpenAction(i, 'restore')}
            onReorder={handleReorder}
          />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 mt-3">
              <span className="small text-muted">
                Showing page <strong>{pagination.page}</strong> of <strong>{pagination.totalPages}</strong> ({pagination.total} dishes)
              </span>

              <nav aria-label="Menu pagination">
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${pagination.page <= 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handleFilterChange('page', pagination.page - 1)}
                      disabled={pagination.page <= 1}
                      aria-label="Previous page"
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                  </li>

                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <li
                      key={pageNum}
                      className={`page-item ${pageNum === pagination.page ? 'active' : ''}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handleFilterChange('page', pageNum)}
                        style={
                          pageNum === pagination.page
                            ? { backgroundColor: '#641e2b', borderColor: '#641e2b' }
                            : {}
                        }
                      >
                        {pageNum}
                      </button>
                    </li>
                  ))}

                  <li className={`page-item ${pagination.page >= pagination.totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handleFilterChange('page', pagination.page + 1)}
                      disabled={pagination.page >= pagination.totalPages}
                      aria-label="Next page"
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </>
      )}

      {/* Add / Edit Form Modal */}
      <MenuItemForm
        isOpen={itemFormState.isOpen}
        initialData={itemFormState.data}
        categories={categories}
        onClose={() => setItemFormState({ isOpen: false, data: null })}
        onSave={handleSaveItem}
      />

      {/* Public Preview Modal */}
      <MenuItemPreviewModal
        isOpen={previewModal.isOpen}
        item={previewModal.item}
        onClose={() => setPreviewModal({ isOpen: false, item: null })}
      />

      {/* Confirmation Modal */}
      <MenuItemActionModal
        isOpen={actionModal.isOpen}
        item={actionModal.item}
        actionType={actionModal.actionType}
        submitting={submittingAction}
        onClose={() => setActionModal({ isOpen: false, item: null, actionType: 'publish' })}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}

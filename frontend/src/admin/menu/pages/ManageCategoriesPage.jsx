import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchAdminCategories,
  createCategory,
  updateCategory,
  updateCategoryStatus,
} from '../../../services/menuAdminService';

export default function ManageCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    nameEn: '',
    nameMr: '',
    descEn: '',
    descMr: '',
    displayOrder: 1,
    status: 'active',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    document.title = 'Menu Categories | Aditi Caterers Admin';
    let isMounted = true;
    setLoading(true);

    fetchAdminCategories()
      .then((res) => {
        if (isMounted) {
          setCategories(res.items || []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [refreshTrigger]);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      nameEn: '',
      nameMr: '',
      descEn: '',
      descMr: '',
      displayOrder: categories.length + 1,
      status: 'active',
    });
    setErrors({});
    setModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({
      nameEn: cat.name?.en || '',
      nameMr: cat.name?.mr || '',
      descEn: cat.description?.en || '',
      descMr: cat.description?.mr || '',
      displayOrder: cat.displayOrder || 1,
      status: cat.status || 'active',
    });
    setErrors({});
    setModalOpen(true);
  };

  const handleToggleStatus = async (cat) => {
    const nextStatus = cat.status === 'active' ? 'inactive' : 'active';
    await updateCategoryStatus(cat.id, nextStatus);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.nameEn.trim()) errs.nameEn = 'English Category Name is required.';
    if (!formData.nameMr.trim()) errs.nameMr = 'Marathi Category Name is required.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: { en: formData.nameEn.trim(), mr: formData.nameMr.trim() },
        description: { en: formData.descEn.trim(), mr: formData.descMr.trim() },
        displayOrder: parseInt(formData.displayOrder, 10) || 1,
        status: formData.status,
      };

      if (editingCategory) {
        await updateCategory(editingCategory.id, payload);
      } else {
        await createCategory(payload);
      }

      setModalOpen(false);
      setRefreshTrigger((prev) => prev + 1);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <div className="mb-2">
            <Link
              to="/admin/menu"
              className="text-decoration-none text-muted small d-inline-flex align-items-center gap-1"
            >
              <i className="bi bi-arrow-left"></i>
              <span>Back to Food Menu</span>
            </Link>
          </div>
          <h1 className="h3 fw-bold text-dark mb-1">
            <i className="bi bi-folder-fill me-2" style={{ color: '#641e2b' }}></i>
            Menu Categories
          </h1>
          <p className="text-muted small mb-0">
            Create, order, and activate categories that organize dishes on the website.
          </p>
        </div>

        <div>
          <button
            type="button"
            className="btn btn-primary d-flex align-items-center gap-2"
            style={{ backgroundColor: '#641e2b', borderColor: '#641e2b' }}
            onClick={handleOpenAdd}
          >
            <i className="bi bi-plus-circle-fill"></i>
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
          <div className="spinner-border text-maroon mx-auto mb-3" style={{ color: '#641e2b' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mb-0">Loading menu categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
          <h3 className="h5 fw-bold text-dark mb-2">No categories found</h3>
          <p className="text-muted small mb-0">Add your first category to group dishes.</p>
        </div>
      ) : (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light border-bottom">
                <tr>
                  <th scope="col" className="ps-4" style={{ width: '80px' }}>Order</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Description</th>
                  <th scope="col" className="text-center">Dishes Count</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td className="ps-4 fw-bold text-dark">{cat.displayOrder}</td>
                    <td>
                      <div className="fw-bold text-dark">{cat.name?.en}</div>
                      <div className="text-muted small" style={{ fontSize: '0.8rem' }}>
                        {cat.name?.mr}
                      </div>
                      <code className="text-muted" style={{ fontSize: '0.72rem' }}>
                        {cat.slug || cat.id}
                      </code>
                    </td>
                    <td>
                      <div className="small text-muted text-truncate" style={{ maxWidth: '280px' }}>
                        {cat.description?.en || cat.description?.mr || '—'}
                      </div>
                    </td>
                    <td className="text-center">
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                        {cat.itemCount || 0} Dishes
                      </span>
                    </td>
                    <td>
                      {cat.status === 'active' ? (
                        <span className="badge bg-success-subtle text-success border border-success-subtle">
                          Active
                        </span>
                      ) : (
                        <span className="badge bg-secondary-subtle text-secondary border">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="text-end pe-4">
                      <div className="btn-group btn-group-sm">
                        <button
                          type="button"
                          className="btn btn-outline-dark"
                          onClick={() => handleOpenEdit(cat)}
                          title="Edit Category"
                          aria-label={`Edit ${cat.name?.en}`}
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          type="button"
                          className={`btn ${cat.status === 'active' ? 'btn-outline-warning' : 'btn-outline-success'}`}
                          onClick={() => handleToggleStatus(cat)}
                          title={cat.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          <i className={`bi ${cat.status === 'active' ? 'bi-pause-circle' : 'bi-play-circle'}`}></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {modalOpen && (
        <>
          <div className="modal-backdrop fade show" onClick={() => setModalOpen(false)} style={{ zIndex: 1050 }}></div>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="cat-modal-title"
            aria-modal="true"
            style={{ zIndex: 1055 }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow rounded-4">
                <div className="modal-header border-bottom px-4 py-3 bg-light rounded-top-4">
                  <h5 className="modal-title fw-bold text-dark" id="cat-modal-title">
                    {editingCategory ? 'Edit Menu Category' : 'Add Menu Category'}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setModalOpen(false)}
                    aria-label="Close"
                  ></button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="modal-body px-4 py-3">
                    <div className="d-flex flex-column gap-3">
                      <div>
                        <label className="form-label fw-semibold small text-dark">
                          Category Name (English) <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.nameEn ? 'is-invalid' : ''}`}
                          placeholder="e.g. Maharashtrian Feasts"
                          value={formData.nameEn}
                          onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                        />
                        {errors.nameEn && <div className="invalid-feedback">{errors.nameEn}</div>}
                      </div>

                      <div>
                        <label className="form-label fw-semibold small text-dark">
                          वर्गाचे नाव (मराठी) <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.nameMr ? 'is-invalid' : ''}`}
                          placeholder="उदा. अस्सल महाराष्ट्रीयन जेवण"
                          value={formData.nameMr}
                          onChange={(e) => setFormData({ ...formData, nameMr: e.target.value })}
                        />
                        {errors.nameMr && <div className="invalid-feedback">{errors.nameMr}</div>}
                      </div>

                      <div>
                        <label className="form-label fw-semibold small text-dark">
                          Description (English)
                        </label>
                        <textarea
                          className="form-control"
                          rows="2"
                          placeholder="Brief summary..."
                          value={formData.descEn}
                          onChange={(e) => setFormData({ ...formData, descEn: e.target.value })}
                        ></textarea>
                      </div>

                      <div>
                        <label className="form-label fw-semibold small text-dark">
                          माहिती (मराठी)
                        </label>
                        <textarea
                          className="form-control"
                          rows="2"
                          placeholder="संक्षिप्त माहिती..."
                          value={formData.descMr}
                          onChange={(e) => setFormData({ ...formData, descMr: e.target.value })}
                        ></textarea>
                      </div>

                      <div className="row g-2">
                        <div className="col-6">
                          <label className="form-label fw-semibold small text-dark">
                            Display Order
                          </label>
                          <input
                            type="number"
                            min="1"
                            className="form-control"
                            value={formData.displayOrder}
                            onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                          />
                        </div>

                        <div className="col-6">
                          <label className="form-label fw-semibold small text-dark">
                            Status
                          </label>
                          <select
                            className="form-select"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer border-top px-4 py-3 bg-light rounded-bottom-4">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setModalOpen(false)}
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ backgroundColor: '#641e2b', borderColor: '#641e2b' }}
                      disabled={submitting}
                    >
                      {submitting ? 'Saving...' : editingCategory ? 'Update Category' : 'Save Category'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

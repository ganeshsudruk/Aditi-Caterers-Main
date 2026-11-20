import { useState, useEffect } from 'react';
import { generateSlug } from '../../../services/menuAdminService';

export default function MenuItemForm({
  isOpen,
  initialData = null,
  categories = [],
  onClose,
  onSave,
}) {
  const isEdit = !!initialData?.id;
  const [activeTab, setActiveTab] = useState('en');

  const [formData, setFormData] = useState({
    nameEn: '',
    nameMr: '',
    categoryId: '',
    descEn: '',
    descMr: '',
    ingredientsEn: [''],
    ingredientsMr: [''],
    foodType: 'veg',
    imageUrl: '',
    imageAltEn: '',
    imageAltMr: '',
    displayOrder: 1,
    featured: false,
    status: 'draft',
    slug: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        nameEn: initialData.name?.en || '',
        nameMr: initialData.name?.mr || '',
        categoryId: initialData.categoryId || (categories[0]?.id || 'breakfast'),
        descEn: initialData.description?.en || '',
        descMr: initialData.description?.mr || '',
        ingredientsEn:
          initialData.ingredients?.en && initialData.ingredients.en.length > 0
            ? initialData.ingredients.en
            : [''],
        ingredientsMr:
          initialData.ingredients?.mr && initialData.ingredients.mr.length > 0
            ? initialData.ingredients.mr
            : [''],
        foodType: initialData.foodType || 'veg',
        imageUrl: initialData.image?.url || '',
        imageAltEn: initialData.image?.alt?.en || '',
        imageAltMr: initialData.image?.alt?.mr || '',
        displayOrder: initialData.displayOrder || 1,
        featured: !!initialData.featured,
        status: initialData.status || 'draft',
        slug: initialData.slug || '',
      });
    } else {
      setFormData({
        nameEn: '',
        nameMr: '',
        categoryId: categories[0]?.id || 'breakfast',
        descEn: '',
        descMr: '',
        ingredientsEn: [''],
        ingredientsMr: [''],
        foodType: 'veg',
        imageUrl: '',
        imageAltEn: '',
        imageAltMr: '',
        displayOrder: 1,
        featured: false,
        status: 'draft',
        slug: '',
      });
    }
    setActiveTab('en');
    setErrors({});
  }, [initialData, categories, isOpen]);

  if (!isOpen) return null;

  const handleTextChange = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'nameEn' && !isEdit && !prev.slug) {
        next.slug = generateSlug(value);
      }
      return next;
    });

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleIngredientChange = (lang, index, val) => {
    const key = lang === 'en' ? 'ingredientsEn' : 'ingredientsMr';
    const list = [...formData[key]];
    list[index] = val;
    setFormData((prev) => ({ ...prev, [key]: list }));
  };

  const handleAddIngredient = (lang) => {
    const key = lang === 'en' ? 'ingredientsEn' : 'ingredientsMr';
    setFormData((prev) => ({ ...prev, [key]: [...prev[key], ''] }));
  };

  const handleRemoveIngredient = (lang, index) => {
    const key = lang === 'en' ? 'ingredientsEn' : 'ingredientsMr';
    const list = formData[key].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [key]: list.length > 0 ? list : [''] }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.nameEn.trim()) {
      errs.nameEn = 'English Dish Name is required.';
    }

    if (formData.status === 'published' && !formData.nameMr.trim()) {
      errs.nameMr = 'Marathi Dish Name is required before publishing.';
    }

    if (!formData.categoryId) {
      errs.categoryId = 'Please select a menu category.';
    }

    if (!formData.displayOrder || isNaN(formData.displayOrder) || formData.displayOrder < 1) {
      errs.displayOrder = 'Display order must be a positive integer.';
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      if (errs.nameEn) setActiveTab('en');
      else if (errs.nameMr) setActiveTab('mr');
      else setActiveTab('settings');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: {
          en: formData.nameEn.trim(),
          mr: formData.nameMr.trim(),
        },
        categoryId: formData.categoryId,
        description: {
          en: formData.descEn.trim(),
          mr: formData.descMr.trim(),
        },
        ingredients: {
          en: formData.ingredientsEn.map((i) => i.trim()).filter(Boolean),
          mr: formData.ingredientsMr.map((i) => i.trim()).filter(Boolean),
        },
        foodType: formData.foodType,
        image: {
          url: formData.imageUrl.trim(),
          alt: {
            en: formData.imageAltEn.trim() || formData.nameEn.trim(),
            mr: formData.imageAltMr.trim() || formData.nameMr.trim(),
          },
        },
        displayOrder: parseInt(formData.displayOrder, 10),
        featured: formData.featured,
        status: formData.status,
        slug: formData.slug || generateSlug(formData.nameEn),
      };

      await onSave(payload, isEdit ? initialData.id : null);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} style={{ zIndex: 1050 }}></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="menu-form-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow rounded-4">
            <div className="modal-header border-bottom px-4 py-3 bg-light rounded-top-4">
              <h5 className="modal-title fw-bold text-dark" id="menu-form-title">
                <i
                  className={`bi ${isEdit ? 'bi-pencil-square' : 'bi-plus-circle-fill'} me-2`}
                  style={{ color: '#641e2b' }}
                ></i>
                {isEdit ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close modal"
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body px-4 py-3">
                {/* Tabs */}
                <ul className="nav nav-pills nav-fill mb-4 p-1 bg-light rounded-3">
                  <li className="nav-item">
                    <button
                      type="button"
                      className={`nav-link small fw-semibold ${activeTab === 'en' ? 'active' : ''}`}
                      style={activeTab === 'en' ? { backgroundColor: '#641e2b' } : {}}
                      onClick={() => setActiveTab('en')}
                    >
                      <i className="bi bi-translate me-1"></i> English Content
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className={`nav-link small fw-semibold ${activeTab === 'mr' ? 'active' : ''}`}
                      style={activeTab === 'mr' ? { backgroundColor: '#641e2b' } : {}}
                      onClick={() => setActiveTab('mr')}
                    >
                      <i className="bi bi-flag-fill me-1"></i> मराठी माहिती (Marathi)
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className={`nav-link small fw-semibold ${activeTab === 'settings' ? 'active' : ''}`}
                      style={activeTab === 'settings' ? { backgroundColor: '#641e2b' } : {}}
                      onClick={() => setActiveTab('settings')}
                    >
                      <i className="bi bi-sliders me-1"></i> Category & Options
                    </button>
                  </li>
                </ul>

                {/* Tab: English */}
                {activeTab === 'en' && (
                  <div className="d-flex flex-column gap-3">
                    <div>
                      <label className="form-label fw-semibold small text-dark">
                        Dish Name (English) <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.nameEn ? 'is-invalid' : ''}`}
                        placeholder="e.g. Maharashtrian Kanda Poha"
                        value={formData.nameEn}
                        onChange={(e) => handleTextChange('nameEn', e.target.value)}
                      />
                      {errors.nameEn && <div className="invalid-feedback">{errors.nameEn}</div>}
                    </div>

                    <div>
                      <label className="form-label fw-semibold small text-dark">
                        Short Description / Taste Profile (English)
                      </label>
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="e.g. Lightly spiced flattened rice cooked with crunchy onions, mustard, roasted peanuts..."
                        value={formData.descEn}
                        onChange={(e) => handleTextChange('descEn', e.target.value)}
                      ></textarea>
                    </div>

                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label fw-semibold small text-dark mb-0">
                          Ingredients List (English)
                        </label>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary py-0"
                          onClick={() => handleAddIngredient('en')}
                        >
                          <i className="bi bi-plus-lg me-1"></i> Add Ingredient
                        </button>
                      </div>
                      {formData.ingredientsEn.map((ing, idx) => (
                        <div key={idx} className="input-group input-group-sm mb-2">
                          <span className="input-group-text bg-light">{idx + 1}</span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. Flattened Rice (Poha)"
                            value={ing}
                            onChange={(e) => handleIngredientChange('en', idx, e.target.value)}
                          />
                          {formData.ingredientsEn.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => handleRemoveIngredient('en', idx)}
                              title="Remove"
                            >
                              <i className="bi bi-x-lg"></i>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: Marathi */}
                {activeTab === 'mr' && (
                  <div className="d-flex flex-column gap-3">
                    <div>
                      <label className="form-label fw-semibold small text-dark">
                        पदार्थाचे नाव (मराठी) {formData.status === 'published' && <span className="text-danger">*</span>}
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.nameMr ? 'is-invalid' : ''}`}
                        placeholder="उदा. पारंपारिक कांदा पोहे"
                        value={formData.nameMr}
                        onChange={(e) => handleTextChange('nameMr', e.target.value)}
                      />
                      {errors.nameMr && <div className="invalid-feedback">{errors.nameMr}</div>}
                    </div>

                    <div>
                      <label className="form-label fw-semibold small text-dark">
                        संक्षिप्त माहिती / चवीचा तपशील (मराठी)
                      </label>
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="उदा. खमंग फोडणी, कांदा, भाजलेले शेंगदाणे, ताजी कोथिंबीर आणि खोबरे..."
                        value={formData.descMr}
                        onChange={(e) => handleTextChange('descMr', e.target.value)}
                      ></textarea>
                    </div>

                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label fw-semibold small text-dark mb-0">
                          साहित्य / घटकांची यादी (मराठी)
                        </label>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary py-0"
                          onClick={() => handleAddIngredient('mr')}
                        >
                          <i className="bi bi-plus-lg me-1"></i> घटक जोडा
                        </button>
                      </div>
                      {formData.ingredientsMr.map((ing, idx) => (
                        <div key={idx} className="input-group input-group-sm mb-2">
                          <span className="input-group-text bg-light">{idx + 1}</span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="उदा. पोहे, शेंगदाणे, कढीपत्ता..."
                            value={ing}
                            onChange={(e) => handleIngredientChange('mr', idx, e.target.value)}
                          />
                          {formData.ingredientsMr.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => handleRemoveIngredient('mr', idx)}
                              title="काढून टाका"
                            >
                              <i className="bi bi-x-lg"></i>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: Category & Settings */}
                {activeTab === 'settings' && (
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-dark">
                        Menu Category <span className="text-danger">*</span>
                      </label>
                      <select
                        className={`form-select ${errors.categoryId ? 'is-invalid' : ''}`}
                        value={formData.categoryId}
                        onChange={(e) => handleTextChange('categoryId', e.target.value)}
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name?.en} ({c.name?.mr})
                          </option>
                        ))}
                      </select>
                      {errors.categoryId && <div className="invalid-feedback">{errors.categoryId}</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-dark">
                        Food Type (Dietary)
                      </label>
                      <select
                        className="form-select"
                        value={formData.foodType}
                        onChange={(e) => handleTextChange('foodType', e.target.value)}
                      >
                        <option value="veg">Pure Vegetarian (शाकाहारी)</option>
                        <option value="non-veg">Non-Vegetarian (मांसाहारी)</option>
                        <option value="jain">Jain Friendly (जैन)</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-dark">
                        Display Order <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        className={`form-control ${errors.displayOrder ? 'is-invalid' : ''}`}
                        value={formData.displayOrder}
                        onChange={(e) => handleTextChange('displayOrder', e.target.value)}
                      />
                      {errors.displayOrder && <div className="invalid-feedback">{errors.displayOrder}</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-dark">
                        Status
                      </label>
                      <select
                        className="form-select"
                        value={formData.status}
                        onChange={(e) => handleTextChange('status', e.target.value)}
                      >
                        <option value="draft">Draft (Private)</option>
                        <option value="published">Published (Public)</option>
                        <option value="unpublished">Unpublished (Hidden)</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold small text-dark">
                        Dish Image URL (Optional)
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        placeholder="https://images.unsplash.com/..."
                        value={formData.imageUrl}
                        onChange={(e) => handleTextChange('imageUrl', e.target.value)}
                      />
                      <div className="form-text small">
                        Owner-approved genuine food image representing this catering dish.
                      </div>
                    </div>

                    {formData.imageUrl && (
                      <div className="col-12">
                        <div className="card bg-light p-2 text-center" style={{ maxHeight: '140px' }}>
                          <img
                            src={formData.imageUrl}
                            alt="Dish preview"
                            className="img-fluid rounded mx-auto object-fit-cover"
                            style={{ maxHeight: '120px' }}
                            onError={(e) => (e.target.style.display = 'none')}
                          />
                        </div>
                      </div>
                    )}

                    <div className="col-12">
                      <div className="form-check">
                        <input
                          id="featuredCheck"
                          type="checkbox"
                          className="form-check-input"
                          checked={formData.featured}
                          onChange={(e) => handleTextChange('featured', e.target.checked)}
                        />
                        <label htmlFor="featuredCheck" className="form-check-label small fw-semibold text-dark">
                          Mark as Popular / Chef Special dish (highlighted on website)
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer border-top px-4 py-3 bg-light rounded-bottom-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={onClose}
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
                  {submitting ? 'Saving...' : isEdit ? 'Update Dish' : 'Save Dish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

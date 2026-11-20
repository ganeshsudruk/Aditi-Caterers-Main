import { useState, useEffect } from 'react';
import { generateSlug } from '../../../services/packageAdminService';

export default function PackageModal({
  isOpen,
  initialData = null,
  onClose,
  onSave,
}) {
  const isEdit = !!initialData?.id;
  const [activeTab, setActiveTab] = useState('basic');

  const [formData, setFormData] = useState({
    nameEn: '',
    nameMr: '',
    shortDescEn: '',
    shortDescMr: '',
    fullDescEn: '',
    fullDescMr: '',
    minGuests: 50,
    maxGuests: 1000,
    fixedGuests: 100,
    priceAmount: '',
    currency: 'INR',
    pricingBasis: 'fixed_package',
    priceNotesEn: '',
    priceNotesMr: '',
    serviceTypes: ['with_material'],
    inclusionsEn: [''],
    inclusionsMr: [''],
    exclusionsEn: [''],
    exclusionsMr: [''],
    imageUrl: '',
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
        shortDescEn: initialData.shortDescription?.en || '',
        shortDescMr: initialData.shortDescription?.mr || '',
        fullDescEn: initialData.description?.en || '',
        fullDescMr: initialData.description?.mr || '',
        minGuests: initialData.guestCount?.min || 50,
        maxGuests: initialData.guestCount?.max || 1000,
        fixedGuests: initialData.guestCount?.fixed || 100,
        priceAmount: initialData.price?.amount || '',
        currency: initialData.price?.currency || 'INR',
        pricingBasis: initialData.price?.pricingBasis || 'fixed_package',
        priceNotesEn: initialData.price?.notes?.en || '',
        priceNotesMr: initialData.price?.notes?.mr || '',
        serviceTypes: initialData.serviceTypes || ['with_material'],
        inclusionsEn:
          initialData.inclusions?.en && initialData.inclusions.en.length > 0
            ? initialData.inclusions.en
            : [''],
        inclusionsMr:
          initialData.inclusions?.mr && initialData.inclusions.mr.length > 0
            ? initialData.inclusions.mr
            : [''],
        exclusionsEn:
          initialData.exclusions?.en && initialData.exclusions.en.length > 0
            ? initialData.exclusions.en
            : [''],
        exclusionsMr:
          initialData.exclusions?.mr && initialData.exclusions.mr.length > 0
            ? initialData.exclusions.mr
            : [''],
        imageUrl: initialData.image?.url || '',
        displayOrder: initialData.displayOrder || 1,
        featured: !!initialData.featured,
        status: initialData.status || 'draft',
        slug: initialData.slug || '',
      });
    } else {
      setFormData({
        nameEn: '',
        nameMr: '',
        shortDescEn: '',
        shortDescMr: '',
        fullDescEn: '',
        fullDescMr: '',
        minGuests: 50,
        maxGuests: 1000,
        fixedGuests: 100,
        priceAmount: '',
        currency: 'INR',
        pricingBasis: 'fixed_package',
        priceNotesEn: '',
        priceNotesMr: '',
        serviceTypes: ['with_material'],
        inclusionsEn: [''],
        inclusionsMr: [''],
        exclusionsEn: [''],
        exclusionsMr: [''],
        imageUrl: '',
        displayOrder: 1,
        featured: false,
        status: 'draft',
        slug: '',
      });
    }
    setActiveTab('basic');
    setErrors({});
  }, [initialData, isOpen]);

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

  const handleServiceTypeToggle = (type) => {
    setFormData((prev) => {
      const current = prev.serviceTypes || [];
      if (current.includes(type)) {
        if (current.length === 1) return prev; // At least one service type required
        return { ...prev, serviceTypes: current.filter((t) => t !== type) };
      } else {
        return { ...prev, serviceTypes: [...current, type] };
      }
    });
  };

  const handleArrayChange = (field, index, val) => {
    const list = [...formData[field]];
    list[index] = val;
    setFormData((prev) => ({ ...prev, [field]: list }));
  };

  const handleAddRow = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const handleRemoveRow = (field, index) => {
    const list = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: list.length > 0 ? list : [''] }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.nameEn.trim()) {
      errs.nameEn = 'English Package Name is required.';
    }

    if (formData.status === 'published' && !formData.nameMr.trim()) {
      errs.nameMr = 'Marathi Package Name is required before publishing.';
    }

    if (!formData.displayOrder || isNaN(formData.displayOrder) || formData.displayOrder < 1) {
      errs.displayOrder = 'Display order must be a positive integer.';
    }

    if (formData.minGuests > formData.maxGuests) {
      errs.minGuests = 'Minimum guests cannot exceed maximum guests.';
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      if (errs.nameEn || errs.nameMr) setActiveTab('basic');
      else if (errs.minGuests) setActiveTab('pricing');
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
        shortDescription: {
          en: formData.shortDescEn.trim(),
          mr: formData.shortDescMr.trim(),
        },
        description: {
          en: formData.fullDescEn.trim(),
          mr: formData.fullDescMr.trim(),
        },
        guestCount: {
          min: parseInt(formData.minGuests, 10) || 50,
          max: parseInt(formData.maxGuests, 10) || 1000,
          fixed: parseInt(formData.fixedGuests, 10) || 100,
          note: { en: '', mr: '' },
        },
        price: {
          amount: parseFloat(formData.priceAmount) || 0,
          currency: formData.currency,
          pricingBasis: formData.pricingBasis,
          notes: {
            en: formData.priceNotesEn.trim(),
            mr: formData.priceNotesMr.trim(),
          },
          showPublicly: true,
        },
        serviceTypes: formData.serviceTypes,
        inclusions: {
          en: formData.inclusionsEn.map((i) => i.trim()).filter(Boolean),
          mr: formData.inclusionsMr.map((i) => i.trim()).filter(Boolean),
        },
        exclusions: {
          en: formData.exclusionsEn.map((e) => e.trim()).filter(Boolean),
          mr: formData.exclusionsMr.map((e) => e.trim()).filter(Boolean),
        },
        image: {
          url: formData.imageUrl.trim(),
          alt: {
            en: formData.nameEn.trim(),
            mr: formData.nameMr.trim(),
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
        aria-labelledby="package-modal-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow rounded-4">
            <div className="modal-header border-bottom px-4 py-3 bg-light rounded-top-4">
              <h5 className="modal-title fw-bold text-dark" id="package-modal-title">
                <i
                  className={`bi ${isEdit ? 'bi-pencil-square' : 'bi-plus-circle-fill'} me-2`}
                  style={{ color: '#641e2b' }}
                ></i>
                {isEdit ? 'Edit Catering Package' : 'Add New Catering Package'}
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
                      className={`nav-link small fw-semibold ${activeTab === 'basic' ? 'active' : ''}`}
                      style={activeTab === 'basic' ? { backgroundColor: '#641e2b' } : {}}
                      onClick={() => setActiveTab('basic')}
                    >
                      <i className="bi bi-info-circle me-1"></i> Basic & Descriptions
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className={`nav-link small fw-semibold ${activeTab === 'pricing' ? 'active' : ''}`}
                      style={activeTab === 'pricing' ? { backgroundColor: '#641e2b' } : {}}
                      onClick={() => setActiveTab('pricing')}
                    >
                      <i className="bi bi-currency-rupee me-1"></i> Capacity & Pricing
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className={`nav-link small fw-semibold ${activeTab === 'inclusions' ? 'active' : ''}`}
                      style={activeTab === 'inclusions' ? { backgroundColor: '#641e2b' } : {}}
                      onClick={() => setActiveTab('inclusions')}
                    >
                      <i className="bi bi-check2-all me-1"></i> Inclusions & Terms
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className={`nav-link small fw-semibold ${activeTab === 'settings' ? 'active' : ''}`}
                      style={activeTab === 'settings' ? { backgroundColor: '#641e2b' } : {}}
                      onClick={() => setActiveTab('settings')}
                    >
                      <i className="bi bi-sliders me-1"></i> Image & Display
                    </button>
                  </li>
                </ul>

                {/* Tab: Basic */}
                {activeTab === 'basic' && (
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-dark">
                        Package Name (English) <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.nameEn ? 'is-invalid' : ''}`}
                        placeholder="e.g. Basic Budget Package"
                        value={formData.nameEn}
                        onChange={(e) => handleTextChange('nameEn', e.target.value)}
                      />
                      {errors.nameEn && <div className="invalid-feedback">{errors.nameEn}</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-dark">
                        पॅकेजचे नाव (मराठी) {formData.status === 'published' && <span className="text-danger">*</span>}
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.nameMr ? 'is-invalid' : ''}`}
                        placeholder="उदा. बेसिक बजेट पॅकेज"
                        value={formData.nameMr}
                        onChange={(e) => handleTextChange('nameMr', e.target.value)}
                      />
                      {errors.nameMr && <div className="invalid-feedback">{errors.nameMr}</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-dark">
                        Tagline / Summary (English)
                      </label>
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="e.g. Simple & Affordable Catering for 100 People"
                        value={formData.shortDescEn}
                        onChange={(e) => handleTextChange('shortDescEn', e.target.value)}
                      ></textarea>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-dark">
                        संक्षिप्त टॅगलाईन (मराठी)
                      </label>
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="उदा. १०० लोकांसाठी साधी व परवडणारी जेवण व्यवस्था"
                        value={formData.shortDescMr}
                        onChange={(e) => handleTextChange('shortDescMr', e.target.value)}
                      ></textarea>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-dark">
                        Full Description (English)
                      </label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Detailed package overview..."
                        value={formData.fullDescEn}
                        onChange={(e) => handleTextChange('fullDescEn', e.target.value)}
                      ></textarea>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-dark">
                        सविस्तर माहिती (मराठी)
                      </label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="सविस्तर माहिती व तपशील..."
                        value={formData.fullDescMr}
                        onChange={(e) => handleTextChange('fullDescMr', e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                )}

                {/* Tab: Capacity & Pricing */}
                {activeTab === 'pricing' && (
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label fw-semibold small text-dark">
                        Base / Fixed Guests
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="form-control"
                        value={formData.fixedGuests}
                        onChange={(e) => handleTextChange('fixedGuests', e.target.value)}
                      />
                      <div className="form-text small">e.g. Standard 100 pax</div>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold small text-dark">
                        Min Guests
                      </label>
                      <input
                        type="number"
                        min="1"
                        className={`form-control ${errors.minGuests ? 'is-invalid' : ''}`}
                        value={formData.minGuests}
                        onChange={(e) => handleTextChange('minGuests', e.target.value)}
                      />
                      {errors.minGuests && <div className="invalid-feedback">{errors.minGuests}</div>}
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold small text-dark">
                        Max Guests
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="form-control"
                        value={formData.maxGuests}
                        onChange={(e) => handleTextChange('maxGuests', e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-dark">
                        Price Amount (₹)
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        placeholder="e.g. 10000"
                        value={formData.priceAmount}
                        onChange={(e) => handleTextChange('priceAmount', e.target.value)}
                      />
                      <div className="form-text small">Leave empty if customized via quote.</div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-dark">
                        Pricing Basis
                      </label>
                      <select
                        className="form-select"
                        value={formData.pricingBasis}
                        onChange={(e) => handleTextChange('pricingBasis', e.target.value)}
                      >
                        <option value="fixed_package">Fixed Package Price (for base guests)</option>
                        <option value="per_person">Per Person / Per Plate Rate</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold small text-dark d-block">
                        Supported Service Types
                      </label>
                      <div className="d-flex gap-3">
                        <div className="form-check">
                          <input
                            id="svcWithMat"
                            type="checkbox"
                            className="form-check-input"
                            checked={formData.serviceTypes.includes('with_material')}
                            onChange={() => handleServiceTypeToggle('with_material')}
                          />
                          <label htmlFor="svcWithMat" className="form-check-label small fw-semibold text-dark">
                            With Material (साहित्यासह)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            id="svcWithoutMat"
                            type="checkbox"
                            className="form-check-input"
                            checked={formData.serviceTypes.includes('without_material')}
                            onChange={() => handleServiceTypeToggle('without_material')}
                          />
                          <label htmlFor="svcWithoutMat" className="form-check-label small fw-semibold text-dark">
                            Without Material (साहित्याशिवाय)
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-dark">
                        Price Notes / Terms (English)
                      </label>
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="e.g. Price based on 100 guests (~₹100/person)..."
                        value={formData.priceNotesEn}
                        onChange={(e) => handleTextChange('priceNotesEn', e.target.value)}
                      ></textarea>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-dark">
                        किंमत स्पष्टीकरण / अटी (मराठी)
                      </label>
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="उदा. ₹१०,००० चा प्रस्तावित दर १०० पाहुण्यांसाठी आहे..."
                        value={formData.priceNotesMr}
                        onChange={(e) => handleTextChange('priceNotesMr', e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                )}

                {/* Tab: Inclusions */}
                {activeTab === 'inclusions' && (
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label fw-semibold small text-dark mb-0">
                          Inclusions (English)
                        </label>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary py-0"
                          onClick={() => handleAddRow('inclusionsEn')}
                        >
                          <i className="bi bi-plus-lg me-1"></i> Add
                        </button>
                      </div>
                      {formData.inclusionsEn.map((inc, i) => (
                        <div key={i} className="input-group input-group-sm mb-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. Food preparation by skilled cooks"
                            value={inc}
                            onChange={(e) => handleArrayChange('inclusionsEn', i, e.target.value)}
                          />
                          {formData.inclusionsEn.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => handleRemoveRow('inclusionsEn', i)}
                            >
                              <i className="bi bi-x-lg"></i>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="col-md-6">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label fw-semibold small text-dark mb-0">
                          समाविष्ट बाबी (मराठी)
                        </label>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary py-0"
                          onClick={() => handleAddRow('inclusionsMr')}
                        >
                          <i className="bi bi-plus-lg me-1"></i> जोडा
                        </button>
                      </div>
                      {formData.inclusionsMr.map((inc, i) => (
                        <div key={i} className="input-group input-group-sm mb-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="उदा. अनुभवी स्वयंपाक्यांकडून स्वयंपाक"
                            value={inc}
                            onChange={(e) => handleArrayChange('inclusionsMr', i, e.target.value)}
                          />
                          {formData.inclusionsMr.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => handleRemoveRow('inclusionsMr', i)}
                            >
                              <i className="bi bi-x-lg"></i>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="col-md-6 mt-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label fw-semibold small text-dark mb-0">
                          Exclusions (English)
                        </label>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary py-0"
                          onClick={() => handleAddRow('exclusionsEn')}
                        >
                          <i className="bi bi-plus-lg me-1"></i> Add
                        </button>
                      </div>
                      {formData.exclusionsEn.map((exc, i) => (
                        <div key={i} className="input-group input-group-sm mb-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. Hall / Venue charges"
                            value={exc}
                            onChange={(e) => handleArrayChange('exclusionsEn', i, e.target.value)}
                          />
                          {formData.exclusionsEn.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => handleRemoveRow('exclusionsEn', i)}
                            >
                              <i className="bi bi-x-lg"></i>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="col-md-6 mt-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label fw-semibold small text-dark mb-0">
                          वगळलेल्या बाबी (मराठी)
                        </label>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary py-0"
                          onClick={() => handleAddRow('exclusionsMr')}
                        >
                          <i className="bi bi-plus-lg me-1"></i> जोडा
                        </button>
                      </div>
                      {formData.exclusionsMr.map((exc, i) => (
                        <div key={i} className="input-group input-group-sm mb-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="उदा. हॉल किंवा जागेचे भाडे"
                            value={exc}
                            onChange={(e) => handleArrayChange('exclusionsMr', i, e.target.value)}
                          />
                          {formData.exclusionsMr.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => handleRemoveRow('exclusionsMr', i)}
                            >
                              <i className="bi bi-x-lg"></i>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: Settings */}
                {activeTab === 'settings' && (
                  <div className="row g-3">
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
                        Package Image URL (Optional)
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        placeholder="https://images.unsplash.com/..."
                        value={formData.imageUrl}
                        onChange={(e) => handleTextChange('imageUrl', e.target.value)}
                      />
                    </div>

                    {formData.imageUrl && (
                      <div className="col-12">
                        <div className="card bg-light p-2 text-center" style={{ maxHeight: '140px' }}>
                          <img
                            src={formData.imageUrl}
                            alt="Package preview"
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
                          id="pkgFeatured"
                          type="checkbox"
                          className="form-check-input"
                          checked={formData.featured}
                          onChange={(e) => handleTextChange('featured', e.target.checked)}
                        />
                        <label htmlFor="pkgFeatured" className="form-check-label small fw-semibold text-dark">
                          Mark as Featured / Recommended Package on website
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
                  {submitting ? 'Saving...' : isEdit ? 'Update Package' : 'Save Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

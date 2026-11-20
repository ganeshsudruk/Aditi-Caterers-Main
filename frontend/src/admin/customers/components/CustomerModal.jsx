import { useState, useEffect } from 'react';
import { checkCustomerDuplicate } from '../../../services/customerAdminService';

export default function CustomerModal({
  isOpen,
  onClose,
  onSave,
  initialData = null,
}) {
  const isEdit = !!initialData?.id;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    preferredLanguage: 'mr',
    initialNote: '',
  });

  const [errors, setErrors] = useState({});
  const [duplicateMatches, setDuplicateMatches] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        phone: initialData.phone || '',
        email: initialData.email || '',
        address: initialData.address || '',
        preferredLanguage: initialData.preferredLanguage || 'mr',
        initialNote: '',
      });
    } else {
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        preferredLanguage: 'mr',
        initialNote: '',
      });
    }
    setErrors({});
    setDuplicateMatches([]);
  }, [initialData, isOpen]);

  // Check duplicates when phone or email changes
  useEffect(() => {
    if (!formData.phone && !formData.email) {
      setDuplicateMatches([]);
      return;
    }

    const timer = setTimeout(() => {
      const matches = checkCustomerDuplicate(
        formData.phone,
        formData.email,
        initialData?.id || null
      );
      setDuplicateMatches(matches);
    }, 300);

    return () => clearTimeout(timer);
  }, [formData.phone, formData.email, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Customer name is required.';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (cleanPhone.length !== 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address.';
      }
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      await onSave(formData, isEdit ? initialData.id : null);
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
        aria-labelledby="customer-modal-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow rounded-4">
            <div className="modal-header border-bottom px-4 py-3 bg-light rounded-top-4">
              <h5 className="modal-title fw-bold text-dark" id="customer-modal-title">
                <i
                  className={`bi ${isEdit ? 'bi-pencil-square' : 'bi-person-plus-fill'} me-2`}
                  style={{ color: '#641e2b' }}
                ></i>
                {isEdit ? 'Edit Customer Details' : 'Add New Customer'}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close modal"
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body px-4 py-4">
                {/* Duplicate Warning Alert */}
                {duplicateMatches.length > 0 && (
                  <div className="alert alert-warning border border-warning-subtle rounded-3 mb-4">
                    <div className="d-flex align-items-center gap-2 fw-bold text-warning-emphasis mb-1">
                      <i className="bi bi-exclamation-triangle-fill"></i>
                      <span>Potential Duplicate Customer Detected</span>
                    </div>
                    <div className="small text-muted mb-2">
                      A customer with matching phone number or email already exists in records:
                    </div>
                    <ul className="mb-0 small ps-3">
                      {duplicateMatches.map((m) => (
                        <li key={m.id}>
                          <strong>{m.name}</strong> (ID: {m.id}, Phone: {m.phone || '—'}, Email: {m.email || '—'})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="row g-3">
                  {/* Name */}
                  <div className="col-md-6">
                    <label htmlFor="customer-name-input" className="form-label fw-semibold small text-dark">
                      Customer Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      id="customer-name-input"
                      type="text"
                      name="name"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="e.g. Rajesh Patil"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>

                  {/* Phone */}
                  <div className="col-md-6">
                    <label htmlFor="customer-phone-input" className="form-label fw-semibold small text-dark">
                      Phone Number (10 digits) <span className="text-danger">*</span>
                    </label>
                    <input
                      id="customer-phone-input"
                      type="tel"
                      name="phone"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      placeholder="e.g. 9822012345"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label htmlFor="customer-email-input" className="form-label fw-semibold small text-dark">
                      Email Address (Optional)
                    </label>
                    <input
                      id="customer-email-input"
                      type="email"
                      name="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="e.g. rajesh@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  {/* Preferred Language */}
                  <div className="col-md-6">
                    <label htmlFor="customer-lang-select" className="form-label fw-semibold small text-dark">
                      Preferred Language
                    </label>
                    <select
                      id="customer-lang-select"
                      name="preferredLanguage"
                      className="form-select"
                      value={formData.preferredLanguage}
                      onChange={handleChange}
                    >
                      <option value="mr">Marathi (मराठी)</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  {/* Address */}
                  <div className="col-12">
                    <label htmlFor="customer-address-input" className="form-label fw-semibold small text-dark">
                      Address / City (Optional)
                    </label>
                    <input
                      id="customer-address-input"
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="e.g. Kothrud, Pune"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Initial Note (only when creating) */}
                  {!isEdit && (
                    <div className="col-12">
                      <label htmlFor="customer-note-input" className="form-label fw-semibold small text-dark">
                        Internal Note (Optional, admin-only)
                      </label>
                      <textarea
                        id="customer-note-input"
                        name="initialNote"
                        rows="2"
                        className="form-control"
                        placeholder="e.g. Contacted via phone regarding wedding catering..."
                        value={formData.initialNote}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  )}
                </div>
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
                  {submitting ? 'Saving...' : isEdit ? 'Update Details' : 'Save Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from 'react';
import { useAuth } from '../../../context/useAuth';

export default function ManualBookingModal({ onClose, onCreated }) {
  const { admin } = useAuth();

  const [formData, setFormData] = useState({
    customerName: '',
    mobile: '',
    email: '',
    eventType: 'wedding',
    otherEventType: '',
    eventDate: '',
    dateNotDecided: false,
    guestCount: '100',
    cateringType: 'with-material',
    city: 'Pune',
    venueAddress: '',
    timeSlot: 'Lunch Banquet',
    initialNote: '',
    status: 'pending_review',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
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
    if (!formData.customerName.trim()) {
      errs.customerName = 'Customer name is required.';
    }

    const cleanMobile = formData.mobile.replace(/\D/g, '');
    if (!formData.mobile.trim()) {
      errs.mobile = 'Mobile number is required.';
    } else if (cleanMobile.length !== 10) {
      errs.mobile = 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.dateNotDecided && !formData.eventDate) {
      errs.eventDate = 'Please select an event date or check "Date not decided".';
    }

    const guests = parseInt(formData.guestCount, 10);
    if (!formData.guestCount || isNaN(guests) || guests <= 0) {
      errs.guestCount = 'Guest count must be at least 1.';
    }

    if (!formData.city.trim()) {
      errs.city = 'City or location is required.';
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
      await onCreated(formData, admin?.name || 'Administrator');
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
        aria-labelledby="manual-booking-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4 border-0 shadow">
            {/* Header */}
            <div className="modal-header border-bottom px-4 pt-4 pb-3">
              <div>
                <span className="badge bg-danger-subtle text-danger border border-danger-subtle mb-1">
                  Phone / Walk-in Booking
                </span>
                <h3 className="modal-title h5 fw-bold text-dark mb-0" id="manual-booking-title">
                  Create Manual Catering Booking
                </h3>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close dialog"
              ></button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="modal-body px-4 py-3">
                <div className="row g-3">
                  {/* Customer Name */}
                  <div className="col-md-6">
                    <label htmlFor="mb-name" className="form-label small fw-semibold">
                      Customer Name <span className="text-danger">*</span>
                    </label>
                    <input
                      id="mb-name"
                      name="customerName"
                      type="text"
                      className={`form-control form-control-sm ${errors.customerName ? 'is-invalid' : ''}`}
                      placeholder="e.g. Ramesh Kulkarni"
                      value={formData.customerName}
                      onChange={handleChange}
                    />
                    {errors.customerName && (
                      <div className="invalid-feedback">{errors.customerName}</div>
                    )}
                  </div>

                  {/* Customer Mobile */}
                  <div className="col-md-6">
                    <label htmlFor="mb-mobile" className="form-label small fw-semibold">
                      Mobile Number <span className="text-danger">*</span>
                    </label>
                    <input
                      id="mb-mobile"
                      name="mobile"
                      type="tel"
                      maxLength={10}
                      className={`form-control form-control-sm ${errors.mobile ? 'is-invalid' : ''}`}
                      placeholder="10-digit mobile number"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                    {errors.mobile && (
                      <div className="invalid-feedback">{errors.mobile}</div>
                    )}
                  </div>

                  {/* Customer Email */}
                  <div className="col-md-6">
                    <label htmlFor="mb-email" className="form-label small fw-semibold">
                      Email Address (Optional)
                    </label>
                    <input
                      id="mb-email"
                      name="email"
                      type="email"
                      className="form-control form-control-sm"
                      placeholder="customer@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Event Type */}
                  <div className="col-md-6">
                    <label htmlFor="mb-eventType" className="form-label small fw-semibold">
                      Event Type <span className="text-danger">*</span>
                    </label>
                    <select
                      id="mb-eventType"
                      name="eventType"
                      className="form-select form-select-sm"
                      value={formData.eventType}
                      onChange={handleChange}
                    >
                      <option value="wedding">Wedding</option>
                      <option value="engagement">Engagement</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="reception">Reception</option>
                      <option value="corporate">Corporate Function</option>
                      <option value="religious">Religious Ceremony / Pooja</option>
                      <option value="other">Other Event</option>
                    </select>
                  </div>

                  {/* Event Date & Date Undecided */}
                  <div className="col-md-6">
                    <label htmlFor="mb-date" className="form-label small fw-semibold">
                      Event Date {!formData.dateNotDecided && <span className="text-danger">*</span>}
                    </label>
                    <input
                      id="mb-date"
                      name="eventDate"
                      type="date"
                      disabled={formData.dateNotDecided}
                      className={`form-control form-control-sm ${errors.eventDate ? 'is-invalid' : ''}`}
                      value={formData.eventDate}
                      onChange={handleChange}
                    />
                    {errors.eventDate && (
                      <div className="invalid-feedback">{errors.eventDate}</div>
                    )}
                    <div className="form-check mt-1">
                      <input
                        id="mb-undecided"
                        name="dateNotDecided"
                        type="checkbox"
                        className="form-check-input"
                        checked={formData.dateNotDecided}
                        onChange={handleChange}
                      />
                      <label htmlFor="mb-undecided" className="form-check-label small text-muted">
                        Date not decided yet
                      </label>
                    </div>
                  </div>

                  {/* Guest Count */}
                  <div className="col-md-6">
                    <label htmlFor="mb-guests" className="form-label small fw-semibold">
                      Estimated Guests <span className="text-danger">*</span>
                    </label>
                    <input
                      id="mb-guests"
                      name="guestCount"
                      type="number"
                      min="1"
                      className={`form-control form-control-sm ${errors.guestCount ? 'is-invalid' : ''}`}
                      value={formData.guestCount}
                      onChange={handleChange}
                    />
                    {errors.guestCount && (
                      <div className="invalid-feedback">{errors.guestCount}</div>
                    )}
                  </div>

                  {/* Catering Type */}
                  <div className="col-md-6">
                    <label htmlFor="mb-catering" className="form-label small fw-semibold">
                      Catering Service Type <span className="text-danger">*</span>
                    </label>
                    <select
                      id="mb-catering"
                      name="cateringType"
                      className="form-select form-select-sm"
                      value={formData.cateringType}
                      onChange={handleChange}
                    >
                      <option value="with-material">With Material (साहित्यासह)</option>
                      <option value="without-material">Without Material (साहित्याशिवाय)</option>
                    </select>
                  </div>

                  {/* City */}
                  <div className="col-md-6">
                    <label htmlFor="mb-city" className="form-label small fw-semibold">
                      City / Event Location <span className="text-danger">*</span>
                    </label>
                    <input
                      id="mb-city"
                      name="city"
                      type="text"
                      className={`form-control form-control-sm ${errors.city ? 'is-invalid' : ''}`}
                      placeholder="e.g. Pune, Satara, Wai"
                      value={formData.city}
                      onChange={handleChange}
                    />
                    {errors.city && (
                      <div className="invalid-feedback">{errors.city}</div>
                    )}
                  </div>

                  {/* Venue Address */}
                  <div className="col-12">
                    <label htmlFor="mb-venue" className="form-label small fw-semibold">
                      Venue Address / Hall Name (Optional)
                    </label>
                    <input
                      id="mb-venue"
                      name="venueAddress"
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. Yash Lawns, Bibwewadi, Pune"
                      value={formData.venueAddress}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Initial Internal Note */}
                  <div className="col-12">
                    <label htmlFor="mb-note" className="form-label small fw-semibold">
                      Initial Admin Notes / Special Requirements
                    </label>
                    <textarea
                      id="mb-note"
                      name="initialNote"
                      rows="2"
                      className="form-control form-control-sm"
                      placeholder="e.g. Customer called for daughter's wedding catering. Discussed standard Maharashtrian menu..."
                      value={formData.initialNote}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer border-top px-4 py-3">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={onClose}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-sm"
                  style={{ backgroundColor: '#641e2b', color: '#fff' }}
                >
                  {submitting ? 'Creating...' : 'Create Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

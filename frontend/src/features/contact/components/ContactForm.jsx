import { useState, useRef } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import {
  contactEventTypes,
  contactCateringTypes,
  preferredContactMethods,
  budgetRanges,
  submitContactEnquiry,
} from '../../../services/contactService';

export default function ContactForm({ onSuccess }) {
  const { language, t } = useLanguage();
  const formText = t.contactPage?.form || {};
  const labels = formText.labels || {};
  const placeholders = formText.placeholders || {};
  const validation = formText.validation || {};
  const cateringOpts = formText.cateringTypeOptions || {};

  // Individual Refs for accessibility focus-on-error
  const refFullName = useRef(null);
  const refMobile = useRef(null);
  const refEmail = useRef(null);
  const refEventType = useRef(null);
  const refOtherEventType = useRef(null);
  const refEventDate = useRef(null);
  const refGuestCount = useRef(null);
  const refEventCity = useRef(null);
  const refMessage = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    eventType: '',
    otherEventType: '',
    eventDate: '',
    dateNotDecided: false,
    guestCount: '',
    cateringType: 'with-material',
    eventCity: '',
    venueAddress: '',
    preferredContactMethod: 'phone',
    budgetRange: 'not-decided',
    message: '',
    honeypot: '', // Spam trap
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const clearFieldError = (name) => {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    clearFieldError(name);
  };

  const handleCateringTypeSelect = (typeId) => {
    setFormData((prev) => ({ ...prev, cateringType: typeId }));
    clearFieldError('cateringType');
  };

  const handleDateUndecidedToggle = (e) => {
    const isChecked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      dateNotDecided: isChecked,
      eventDate: isChecked ? '' : prev.eventDate,
    }));
    clearFieldError('eventDate');
  };

  const validate = () => {
    const newErrors = {};

    // 1. Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = validation.nameRequired || 'Please enter your full name.';
    }

    // 2. Mobile
    const mobileDigits = formData.mobile.replace(/\D/g, '');
    if (!formData.mobile.trim()) {
      newErrors.mobile = validation.mobileRequired || 'Please enter your mobile number.';
    } else if (mobileDigits.length !== 10 || !/^[6-9]\d{9}$/.test(mobileDigits)) {
      newErrors.mobile =
        validation.mobileInvalid || 'Please enter a valid 10-digit mobile number.';
    }

    // 3. Email (optional)
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = validation.emailInvalid || 'Please enter a valid email address.';
      }
    }

    // 4. Event Type
    if (!formData.eventType) {
      newErrors.eventType = validation.eventTypeRequired || 'Please select the event type.';
    } else if (formData.eventType === 'other' && !formData.otherEventType.trim()) {
      newErrors.otherEventType =
        validation.otherTypeRequired || 'Please specify your event type.';
    }

    // 5. Event Date
    if (!formData.dateNotDecided) {
      if (!formData.eventDate) {
        newErrors.eventDate =
          validation.eventDateRequired ||
          'Please select the event date or check "Date not decided yet".';
      } else {
        const selected = new Date(formData.eventDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) {
          newErrors.eventDate =
            validation.eventDatePast || 'Event date must be in the future.';
        }
      }
    }

    // 6. Guest Count
    const parsedGuests = parseInt(formData.guestCount, 10);
    if (!formData.guestCount || isNaN(parsedGuests)) {
      newErrors.guestCount =
        validation.guestCountRequired || 'Please enter the estimated number of guests.';
    } else if (parsedGuests <= 0) {
      newErrors.guestCount =
        validation.guestCountInvalid || 'Guest count must be at least 1.';
    }

    // 7. Catering Service Type
    if (!formData.cateringType) {
      newErrors.cateringType =
        validation.cateringTypeRequired || 'Please select a catering service type.';
    }

    // 8. Event City
    if (!formData.eventCity.trim()) {
      newErrors.eventCity =
        validation.eventCityRequired || 'Please enter the city or event location.';
    }

    // 9. Message / Requirements
    if (!formData.message.trim()) {
      newErrors.message =
        validation.messageRequired || 'Please enter your message or event requirements.';
    }

    return newErrors;
  };

  const focusFirstError = (validationErrors) => {
    const order = [
      ['fullName', refFullName],
      ['mobile', refMobile],
      ['email', refEmail],
      ['eventType', refEventType],
      ['otherEventType', refOtherEventType],
      ['eventDate', refEventDate],
      ['guestCount', refGuestCount],
      ['eventCity', refEventCity],
      ['message', refMessage],
    ];
    for (const [field, ref] of order) {
      if (validationErrors[field] && ref.current) {
        ref.current.focus();
        break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    // Spam honeypot check
    if (formData.honeypot) {
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      focusFirstError(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        fullName: formData.fullName.trim(),
        mobile: formData.mobile.trim(),
        ...(formData.email.trim() && { email: formData.email.trim() }),
        eventType: formData.eventType,
        ...(formData.eventType === 'other' && { otherEventType: formData.otherEventType.trim() }),
        ...(formData.dateNotDecided
          ? { dateNotDecided: true }
          : { eventDate: formData.eventDate, dateNotDecided: false }),
        guestCount: parseInt(formData.guestCount, 10),
        cateringType: formData.cateringType,
        eventCity: formData.eventCity.trim(),
        ...(formData.venueAddress.trim() && { venueAddress: formData.venueAddress.trim() }),
        ...(formData.preferredContactMethod && {
          preferredContactMethod: formData.preferredContactMethod,
        }),
        ...(formData.budgetRange && formData.budgetRange !== 'not-decided' && {
          budgetRange: formData.budgetRange,
        }),
        message: formData.message.trim(),
        language: language === 'mr' ? 'Marathi' : 'English',
      };

      const result = await submitContactEnquiry(payload);
      if (result?.success) {
        onSuccess(result.data);
      } else {
        setServerError(
          formText.serverError ||
            'Unable to submit your enquiry at this time. Please try again or reach out directly.'
        );
      }
    } catch {
      setServerError(
        formText.serverError ||
          'Unable to submit your enquiry at this time. Please try again or reach out directly via Phone or WhatsApp.'
      );
    } finally {
      setLoading(false);
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="ac-contact-form-container" id="contact-form-section">
      <div className="mb-4">
        <span className="ac-form-header-badge">
          <i className="bi bi-chat-quote-fill me-1" aria-hidden="true"></i>
          {language === 'mr' ? 'केटरिंग चौकशी' : 'Catering Enquiry'}
        </span>
        <h2 className="ac-form-title">
          {formText.title || 'Send a Catering Enquiry'}
        </h2>
        <p className="ac-form-subtitle">
          {formText.subtitle ||
            'Provide your event details below to help our catering team prepare an initial discussion and quotation.'}
        </p>
        <p className="small text-muted mb-0">
          <span className="text-danger fw-bold">*</span> {formText.requiredNotice || 'Indicates required field'}
        </p>
      </div>

      {serverError && (
        <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2 fs-5" aria-hidden="true"></i>
          <div>{serverError}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="ac-contact-form">
        {/* Spam honeypot trap */}
        <div className="ac-hp-field" aria-hidden="true">
          <label htmlFor="contact-website">Leave this field blank</label>
          <input
            id="contact-website"
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex="-1"
            autoComplete="off"
          />
        </div>

        {/* Row 1: Full Name & Mobile Number */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label htmlFor="contact-fullName" className="form-label">
              {labels.fullName || 'Full Name'} <span className="text-danger">*</span>
            </label>
            <input
              ref={refFullName}
              id="contact-fullName"
              name="fullName"
              type="text"
              className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
              placeholder={placeholders.fullName || 'Enter your full name'}
              value={formData.fullName}
              onChange={handleChange}
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? 'err-fullName' : undefined}
            />
            {errors.fullName && (
              <div id="err-fullName" className="invalid-feedback d-block">
                {errors.fullName}
              </div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="contact-mobile" className="form-label">
              {labels.mobile || 'Mobile Number'} <span className="text-danger">*</span>
            </label>
            <input
              ref={refMobile}
              id="contact-mobile"
              name="mobile"
              type="tel"
              className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
              placeholder={placeholders.mobile || '10-digit mobile number'}
              value={formData.mobile}
              onChange={handleChange}
              maxLength={10}
              autoComplete="tel"
              aria-required="true"
              aria-invalid={!!errors.mobile}
              aria-describedby={errors.mobile ? 'err-mobile' : undefined}
            />
            {errors.mobile && (
              <div id="err-mobile" className="invalid-feedback d-block">
                {errors.mobile}
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Email & Preferred Contact Method */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label htmlFor="contact-email" className="form-label">
              {labels.email || 'Email Address (Optional)'}
            </label>
            <input
              ref={refEmail}
              id="contact-email"
              name="email"
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder={placeholders.email || 'name@example.com'}
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'err-email' : undefined}
            />
            {errors.email && (
              <div id="err-email" className="invalid-feedback d-block">
                {errors.email}
              </div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="contact-preferredMethod" className="form-label">
              {labels.preferredContactMethod || 'Preferred Contact Method (Optional)'}
            </label>
            <select
              id="contact-preferredMethod"
              name="preferredContactMethod"
              className="form-select"
              value={formData.preferredContactMethod}
              onChange={handleChange}
            >
              {preferredContactMethods.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label[language] || m.label.en}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3: Event Type & Conditional Other Event Type */}
        <div className="row g-3 mb-3">
          <div className={formData.eventType === 'other' ? 'col-md-6' : 'col-12'}>
            <label htmlFor="contact-eventType" className="form-label">
              {labels.eventType || 'Event Type'} <span className="text-danger">*</span>
            </label>
            <select
              ref={refEventType}
              id="contact-eventType"
              name="eventType"
              className={`form-select ${errors.eventType ? 'is-invalid' : ''}`}
              value={formData.eventType}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.eventType}
              aria-describedby={errors.eventType ? 'err-eventType' : undefined}
            >
              <option value="">{placeholders.selectEventType || 'Select event type'}</option>
              {contactEventTypes.map((et) => (
                <option key={et.id} value={et.id}>
                  {et.label[language] || et.label.en}
                </option>
              ))}
            </select>
            {errors.eventType && (
              <div id="err-eventType" className="invalid-feedback d-block">
                {errors.eventType}
              </div>
            )}
          </div>

          {formData.eventType === 'other' && (
            <div className="col-md-6">
              <label htmlFor="contact-otherEventType" className="form-label">
                {labels.otherEventType || 'Specify Other Event Type'}{' '}
                <span className="text-danger">*</span>
              </label>
              <input
                ref={refOtherEventType}
                id="contact-otherEventType"
                name="otherEventType"
                type="text"
                className={`form-control ${errors.otherEventType ? 'is-invalid' : ''}`}
                placeholder={placeholders.otherEventType || 'e.g. Baby Shower, House Warming'}
                value={formData.otherEventType}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.otherEventType}
                aria-describedby={errors.otherEventType ? 'err-otherEventType' : undefined}
              />
              {errors.otherEventType && (
                <div id="err-otherEventType" className="invalid-feedback d-block">
                  {errors.otherEventType}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Row 4: Event Date & Date Not Decided Checkbox */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label htmlFor="contact-eventDate" className="form-label">
              {labels.eventDate || 'Event Date'}{' '}
              {!formData.dateNotDecided && <span className="text-danger">*</span>}
            </label>
            <input
              ref={refEventDate}
              id="contact-eventDate"
              name="eventDate"
              type="date"
              className={`form-control ${errors.eventDate ? 'is-invalid' : ''}`}
              value={formData.eventDate}
              onChange={handleChange}
              disabled={formData.dateNotDecided}
              min={todayStr}
              aria-required={!formData.dateNotDecided}
              aria-invalid={!!errors.eventDate}
              aria-describedby={errors.eventDate ? 'err-eventDate' : undefined}
            />
            {errors.eventDate && (
              <div id="err-eventDate" className="invalid-feedback d-block">
                {errors.eventDate}
              </div>
            )}
            {/* Date Undecided Toggle Checkbox */}
            <div className="ac-date-undecided-toggle form-check">
              <input
                id="contact-dateNotDecided"
                name="dateNotDecided"
                type="checkbox"
                className="form-check-input"
                checked={formData.dateNotDecided}
                onChange={handleDateUndecidedToggle}
              />
              <label htmlFor="contact-dateNotDecided" className="form-check-label">
                {labels.dateNotDecided || 'Date not decided yet'}
              </label>
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="contact-guestCount" className="form-label">
              {labels.guestCount || 'Number of Guests'} <span className="text-danger">*</span>
            </label>
            <input
              ref={refGuestCount}
              id="contact-guestCount"
              name="guestCount"
              type="number"
              min="1"
              max="10000"
              className={`form-control ${errors.guestCount ? 'is-invalid' : ''}`}
              placeholder={placeholders.guestCount || 'e.g. 150'}
              value={formData.guestCount}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.guestCount}
              aria-describedby={errors.guestCount ? 'err-guestCount' : undefined}
            />
            {errors.guestCount && (
              <div id="err-guestCount" className="invalid-feedback d-block">
                {errors.guestCount}
              </div>
            )}
          </div>
        </div>

        {/* Row 5: Catering Service Type (With Material / Without Material) */}
        <div className="mb-3">
          <label className="form-label d-block">
            {labels.cateringType || 'Catering Service Type'} <span className="text-danger">*</span>
          </label>
          <div className="row g-3">
            {contactCateringTypes.map((ct) => {
              const isSelected = formData.cateringType === ct.id;
              const title =
                ct.id === 'with-material'
                  ? cateringOpts.withMaterial || ct.label[language] || ct.label.en
                  : cateringOpts.withoutMaterial || ct.label[language] || ct.label.en;
              const desc =
                ct.id === 'with-material'
                  ? cateringOpts.withMaterialDesc || ct.desc[language] || ct.desc.en
                  : cateringOpts.withoutMaterialDesc || ct.desc[language] || ct.desc.en;

              return (
                <div key={ct.id} className="col-md-6">
                  <div
                    className={`ac-catering-option-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleCateringTypeSelect(ct.id)}
                    role="button"
                    tabIndex="0"
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        handleCateringTypeSelect(ct.id);
                      }
                    }}
                  >
                    <input
                      type="radio"
                      id={`cateringType-${ct.id}`}
                      name="cateringType"
                      value={ct.id}
                      checked={isSelected}
                      onChange={() => handleCateringTypeSelect(ct.id)}
                      className="form-check-input"
                    />
                    <div>
                      <div className="ac-catering-option-label">
                        <i className={`bi ${ct.icon} me-1 text-maroon`} aria-hidden="true"></i>
                        {title}
                      </div>
                      <div className="ac-catering-option-desc">{desc}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {errors.cateringType && (
            <div className="invalid-feedback d-block mt-2">{errors.cateringType}</div>
          )}
        </div>

        {/* Row 6: City or Event Location & Venue Address */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label htmlFor="contact-eventCity" className="form-label">
              {labels.eventCity || 'City or Event Location'}{' '}
              <span className="text-danger">*</span>
            </label>
            <input
              ref={refEventCity}
              id="contact-eventCity"
              name="eventCity"
              type="text"
              className={`form-control ${errors.eventCity ? 'is-invalid' : ''}`}
              placeholder={placeholders.eventCity || 'e.g. Pune, Satara, Wai, Karad'}
              value={formData.eventCity}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.eventCity}
              aria-describedby={errors.eventCity ? 'err-eventCity' : undefined}
            />
            {errors.eventCity && (
              <div id="err-eventCity" className="invalid-feedback d-block">
                {errors.eventCity}
              </div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="contact-budgetRange" className="form-label">
              {labels.budgetRange || 'Approximate Budget (Optional)'}
            </label>
            <select
              id="contact-budgetRange"
              name="budgetRange"
              className="form-select"
              value={formData.budgetRange}
              onChange={handleChange}
            >
              {budgetRanges.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label[language] || b.label.en}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Venue / Full Address (Optional) */}
        <div className="mb-3">
          <label htmlFor="contact-venueAddress" className="form-label">
            {labels.venueAddress || 'Venue / Full Address (Optional)'}
          </label>
          <input
            id="contact-venueAddress"
            name="venueAddress"
            type="text"
            className="form-control"
            placeholder={placeholders.venueAddress || 'Hall name, landmark or street address'}
            value={formData.venueAddress}
            onChange={handleChange}
          />
        </div>

        {/* Message / Requirements (Required) */}
        <div className="mb-4">
          <label htmlFor="contact-message" className="form-label">
            {labels.message || 'Message / Event Requirements'}{' '}
            <span className="text-danger">*</span>
          </label>
          <textarea
            ref={refMessage}
            id="contact-message"
            name="message"
            rows="4"
            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
            placeholder={
              placeholders.message ||
              'Please mention any specific food preferences, menu items, or requirements...'
            }
            value={formData.message}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'err-message' : undefined}
          />
          {errors.message && (
            <div id="err-message" className="invalid-feedback d-block">
              {errors.message}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="ac-btn-submit-enquiry"
            aria-label="Submit catering enquiry"
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                {formText.submittingBtn || 'Submitting...'}
              </>
            ) : (
              <>
                <i className="bi bi-send-fill me-2" aria-hidden="true"></i>
                {formText.submitBtn || 'Submit Enquiry'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

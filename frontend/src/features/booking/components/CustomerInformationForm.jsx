import { useLanguage } from '../../../context/LanguageContext';
import { contactMethodsList } from '../../../services/bookingService';

export default function CustomerInformationForm({ formData, onChange, errors }) {
  const { language, t } = useLanguage();
  const sec = t.bookingPage?.sections || {};
  const f = t.bookingPage?.fields || {};

  return (
    <div className="ac-form-section">
      <h2 className="ac-form-section-title">
        <i className="bi bi-person-circle" aria-hidden="true" />
        <span>{sec.customer || (language === 'mr' ? 'ग्राहकाची माहिती' : 'Customer Information')}</span>
      </h2>
      <p className="ac-form-section-desc">
        {sec.customerDesc || (language === 'mr' ? 'कोटेशन आणि संपर्कासाठी तुमची संपर्क माहिती.' : 'Your contact details so we can reach you with the quotation.')}
      </p>

      <div className="row g-3">
        {/* Full Name */}
        <div className="col-12 col-md-6">
          <label htmlFor="customerName" className="form-label">
            {f.fullName || (language === 'mr' ? 'पूर्ण नाव' : 'Full Name')} <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            className={`form-control ${errors.customerName ? 'is-invalid' : ''}`}
            placeholder={f.fullNamePlaceholder || 'Enter your full name'}
            value={formData.customerName}
            onChange={onChange}
            autoComplete="name"
          />
          {errors.customerName && (
            <div className="ac-form-error">
              <i className="bi bi-exclamation-circle-fill" />
              <span>{errors.customerName}</span>
            </div>
          )}
        </div>

        {/* Mobile Number */}
        <div className="col-12 col-md-6">
          <label htmlFor="mobile" className="form-label">
            {f.mobile || (language === 'mr' ? 'मोबाईल नंबर' : 'Mobile Number')} <span className="text-danger">*</span>
          </label>
          <div className="input-group">
            <span className="input-group-text bg-light text-muted border-end-0" style={{ borderRadius: '10px 0 0 10px' }}>
              +91
            </span>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              maxLength={10}
              className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
              placeholder={f.mobilePlaceholder || '10-digit mobile number'}
              value={formData.mobile}
              onChange={onChange}
              autoComplete="tel"
              style={{ borderRadius: '0 10px 10px 0' }}
            />
          </div>
          {errors.mobile && (
            <div className="ac-form-error">
              <i className="bi bi-exclamation-circle-fill" />
              <span>{errors.mobile}</span>
            </div>
          )}
        </div>

        {/* Email Address */}
        <div className="col-12 col-md-6">
          <label htmlFor="email" className="form-label">
            {f.email || (language === 'mr' ? 'ईमेल पत्ता (पर्यायी)' : 'Email Address (Optional)')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder={f.emailPlaceholder || 'name@example.com'}
            value={formData.email}
            onChange={onChange}
            autoComplete="email"
          />
          {errors.email && (
            <div className="ac-form-error">
              <i className="bi bi-exclamation-circle-fill" />
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        {/* Preferred Contact Method */}
        <div className="col-12 col-md-6">
          <label htmlFor="preferredContactMethod" className="form-label">
            {f.contactMethod || (language === 'mr' ? 'संपर्काची पसंती' : 'Preferred Contact Method')}
          </label>
          <select
            id="preferredContactMethod"
            name="preferredContactMethod"
            className="form-select"
            value={formData.preferredContactMethod}
            onChange={onChange}
          >
            {contactMethodsList.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label[language] || m.label.en}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

import { useLanguage } from '../../../context/LanguageContext';
import { eventTypesList } from '../../../services/bookingService';

export default function EventInformationForm({ formData, onChange, errors }) {
  const { language, t } = useLanguage();
  const sec = t.bookingPage?.sections || {};
  const f = t.bookingPage?.fields || {};
  const opts = t.bookingPage?.options || {};

  // Compute today's date formatted as YYYY-MM-DD for min date
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="ac-form-section">
      <h2 className="ac-form-section-title">
        <i className="bi bi-calendar2-heart-fill" aria-hidden="true" />
        <span>{sec.event || (language === 'mr' ? 'कार्यक्रमाची माहिती' : 'Event Information')}</span>
      </h2>
      <p className="ac-form-section-desc">
        {sec.eventDesc || (language === 'mr' ? 'तुमच्या कार्यक्रमाचे स्वरूप, तारीख आणि ठिकाण.' : 'Key details about your celebration and venue.')}
      </p>

      <div className="row g-3">
        {/* Event Type */}
        <div className="col-12 col-md-6">
          <label htmlFor="eventType" className="form-label">
            {f.eventType || (language === 'mr' ? 'कार्यक्रमाचा प्रकार' : 'Event Type')} <span className="text-danger">*</span>
          </label>
          <select
            id="eventType"
            name="eventType"
            className={`form-select ${errors.eventType ? 'is-invalid' : ''}`}
            value={formData.eventType}
            onChange={onChange}
          >
            <option value="">
              {f.selectEventType || (language === 'mr' ? '-- कार्यक्रमाचा प्रकार निवडा --' : '-- Select Event Type --')}
            </option>
            {eventTypesList.map((et) => (
              <option key={et.id} value={et.id}>
                {et.label[language] || et.label.en}
              </option>
            ))}
          </select>
          {errors.eventType && (
            <div className="ac-form-error">
              <i className="bi bi-exclamation-circle-fill" />
              <span>{errors.eventType}</span>
            </div>
          )}
        </div>

        {/* Other Event Type (conditional) */}
        {formData.eventType === 'other' && (
          <div className="col-12 col-md-6">
            <label htmlFor="otherEventType" className="form-label">
              {f.otherEventType || (language === 'mr' ? 'इतर कार्यक्रमाचा उल्लेख करा' : 'Specify Other Event')} <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="otherEventType"
              name="otherEventType"
              className={`form-control ${errors.otherEventType ? 'is-invalid' : ''}`}
              placeholder={f.otherEventTypePlaceholder || 'e.g. Naming Ceremony, House Warming'}
              value={formData.otherEventType}
              onChange={onChange}
            />
            {errors.otherEventType && (
              <div className="ac-form-error">
                <i className="bi bi-exclamation-circle-fill" />
                <span>{errors.otherEventType}</span>
              </div>
            )}
          </div>
        )}

        {/* Event Date */}
        <div className="col-12 col-md-6">
          <label htmlFor="eventDate" className="form-label">
            {f.eventDate || (language === 'mr' ? 'कार्यक्रमाची तारीख' : 'Event Date')} <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            min={todayStr}
            className={`form-control ${errors.eventDate ? 'is-invalid' : ''}`}
            value={formData.eventDate}
            onChange={onChange}
          />
          {errors.eventDate && (
            <div className="ac-form-error">
              <i className="bi bi-exclamation-circle-fill" />
              <span>{errors.eventDate}</span>
            </div>
          )}
        </div>

        {/* Event Time Slot */}
        <div className="col-12 col-md-6">
          <label htmlFor="eventTime" className="form-label">
            {f.eventTime || (language === 'mr' ? 'वेळ / सत्र' : 'Preferred Time / Slot')}
          </label>
          <select
            id="eventTime"
            name="eventTime"
            className="form-select"
            value={formData.eventTime}
            onChange={onChange}
          >
            <option value="">
              {f.selectEventTime || (language === 'mr' ? '-- वेळ निवडा --' : '-- Select Time / Slot --')}
            </option>
            <option value="morning">{opts.morning || 'Morning (Breakfast / Lunch)'}</option>
            <option value="afternoon">{opts.afternoon || 'Afternoon (Lunch)'}</option>
            <option value="evening">{opts.evening || 'Evening (High Tea / Dinner)'}</option>
            <option value="fullDay">{opts.fullDay || 'Full Day Event'}</option>
          </select>
        </div>

        {/* Number of Guests */}
        <div className="col-12 col-md-6">
          <label htmlFor="guestCount" className="form-label">
            {f.guestCount || (language === 'mr' ? 'अंदाजे पाहुण्यांची संख्या' : 'Estimated Number of Guests')} <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            id="guestCount"
            name="guestCount"
            min="1"
            className={`form-control ${errors.guestCount ? 'is-invalid' : ''}`}
            placeholder={f.guestCountPlaceholder || 'e.g. 150'}
            value={formData.guestCount}
            onChange={onChange}
          />
          {errors.guestCount && (
            <div className="ac-form-error">
              <i className="bi bi-exclamation-circle-fill" />
              <span>{errors.guestCount}</span>
            </div>
          )}
        </div>

        {/* Village / City */}
        <div className="col-12 col-md-6">
          <label htmlFor="city" className="form-label">
            {f.city || (language === 'mr' ? 'गाव / शहर' : 'Village / City')} <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
            placeholder={f.cityPlaceholder || 'e.g. Pune, Satara, Kolhapur'}
            value={formData.city}
            onChange={onChange}
          />
          {errors.city && (
            <div className="ac-form-error">
              <i className="bi bi-exclamation-circle-fill" />
              <span>{errors.city}</span>
            </div>
          )}
        </div>

        {/* Venue / Address (Optional) */}
        <div className="col-12 col-md-6">
          <label htmlFor="venueAddress" className="form-label">
            {f.venueAddress || (language === 'mr' ? 'कार्यक्रमाचे ठिकाण / हॉलचा पत्ता (पर्यायी)' : 'Venue / Hall Address (Optional)')}
          </label>
          <input
            type="text"
            id="venueAddress"
            name="venueAddress"
            className="form-control"
            placeholder={f.venueAddressPlaceholder || 'Hall name, landmark or address'}
            value={formData.venueAddress}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

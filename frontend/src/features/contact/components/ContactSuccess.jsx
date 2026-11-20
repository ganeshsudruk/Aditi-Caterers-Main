import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { contactEventTypes } from '../../../services/contactService';

export default function ContactSuccess({ enquiry, onReset }) {
  const { language, t } = useLanguage();
  const successText = t.contactPage?.success || {};

  const eventTypeObj = contactEventTypes.find((e) => e.id === enquiry.eventType);
  const eventTypeDisplay =
    enquiry.eventType === 'other'
      ? enquiry.otherEventType || (language === 'mr' ? 'इतर' : 'Other')
      : eventTypeObj
        ? eventTypeObj.label[language] || eventTypeObj.label.en
        : enquiry.eventType;

  const cateringTypeDisplay =
    enquiry.cateringType === 'with-material'
      ? language === 'mr'
        ? 'साहित्यासह (With Material)'
        : 'With Material'
      : language === 'mr'
        ? 'साहित्याशिवाय (Without Material)'
        : 'Without Material';

  const dateDisplay = enquiry.dateNotDecided
    ? language === 'mr'
      ? 'तारीख अद्याप ठरलेली नाही'
      : 'Date not decided yet'
    : enquiry.eventDate;

  const waFollowUpMsg =
    language === 'mr'
      ? `नमस्कार अदिती केटरर्स, मी नुकतीच केटरिंग चौकशी (संदर्भ: ${enquiry.enquiryNumber}) नोंदवली आहे. मला याबद्दल चर्चा करायची आहे.`
      : `Hello Aditi Caterers, I have submitted a catering enquiry (Ref: ${enquiry.enquiryNumber}). I would like to discuss this.`;

  const waFollowUpUrl = `https://wa.me/919975959391?text=${encodeURIComponent(waFollowUpMsg)}`;

  return (
    <div className="ac-success-card" role="alert" aria-live="polite">
      <div className="ac-success-icon-wrap" aria-hidden="true">
        <i className="bi bi-check-circle-fill"></i>
      </div>

      <h2 className="ac-success-title">
        {successText.title || 'Thank You for Contacting Aditi Caterers!'}
      </h2>
      <p className="ac-success-subtitle">
        {successText.subtitle ||
          'Your enquiry has been submitted successfully. Our team will review your details and contact you soon.'}
      </p>

      {/* Reference Number Badge */}
      <div className="ac-ref-badge-box">
        <div className="ac-ref-badge-label">
          {successText.refLabel || 'Enquiry Reference ID'}
        </div>
        <div className="ac-ref-badge-val">{enquiry.enquiryNumber}</div>
      </div>

      {/* Summary Grid */}
      <div className="ac-summary-grid">
        <div className="ac-summary-title">
          <i className="bi bi-card-checklist me-2" aria-hidden="true"></i>
          {successText.summaryTitle || 'Submitted Enquiry Details'}
        </div>

        <div className="ac-summary-item">
          <span className="ac-summary-key">{successText.fullName || 'Name'}:</span>
          <span className="ac-summary-value">{enquiry.fullName}</span>
        </div>

        <div className="ac-summary-item">
          <span className="ac-summary-key">{successText.mobile || 'Mobile'}:</span>
          <span className="ac-summary-value">{enquiry.mobile}</span>
        </div>

        {enquiry.email && (
          <div className="ac-summary-item">
            <span className="ac-summary-key">{successText.email || 'Email'}:</span>
            <span className="ac-summary-value">{enquiry.email}</span>
          </div>
        )}

        <div className="ac-summary-item">
          <span className="ac-summary-key">{successText.eventType || 'Event Type'}:</span>
          <span className="ac-summary-value">{eventTypeDisplay}</span>
        </div>

        <div className="ac-summary-item">
          <span className="ac-summary-key">{successText.eventDate || 'Event Date'}:</span>
          <span className="ac-summary-value">{dateDisplay}</span>
        </div>

        <div className="ac-summary-item">
          <span className="ac-summary-key">{successText.guestCount || 'Guest Count'}:</span>
          <span className="ac-summary-value">{enquiry.guestCount}</span>
        </div>

        <div className="ac-summary-item">
          <span className="ac-summary-key">{successText.cateringType || 'Catering Type'}:</span>
          <span className="ac-summary-value">{cateringTypeDisplay}</span>
        </div>

        <div className="ac-summary-item">
          <span className="ac-summary-key">{successText.eventCity || 'Location'}:</span>
          <span className="ac-summary-value">{enquiry.eventCity}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
        <a
          href={waFollowUpUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn ac-btn-whatsapp fw-semibold px-4 py-2"
          aria-label="Follow up on WhatsApp with enquiry reference (opens in a new window)"
        >
          <i className="bi bi-whatsapp me-2" aria-hidden="true"></i>
          {successText.whatsappFollowUp || 'Follow Up on WhatsApp'}
        </a>

        <button
          type="button"
          onClick={onReset}
          className="btn btn-outline-secondary fw-semibold px-4 py-2"
        >
          <i className="bi bi-arrow-repeat me-2" aria-hidden="true"></i>
          {successText.submitAnother || 'Submit Another Enquiry'}
        </button>

        <Link to="/" className="btn btn-outline-dark fw-semibold px-4 py-2">
          <i className="bi bi-house me-2" aria-hidden="true"></i>
          {successText.returnHome || 'Back to Home'}
        </Link>
      </div>
    </div>
  );
}

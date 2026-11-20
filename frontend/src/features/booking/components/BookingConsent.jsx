import { useLanguage } from '../../../context/LanguageContext';

export default function BookingConsent({
  consentAccepted,
  onConsentChange,
  isSubmitting,
  error,
}) {
  const { language, t } = useLanguage();
  const consent = t.bookingPage?.consent || {};
  const btn = t.bookingPage?.buttons || {};

  return (
    <div className="pt-2">
      {/* Disclaimer Box */}
      <div className="ac-booking-disclaimer">
        <div className="d-flex align-items-start gap-2">
          <i className="bi bi-info-circle-fill text-warning flex-shrink-0 mt-1" aria-hidden="true" />
          <span>
            {consent.disclaimer ||
              (language === 'mr'
                ? 'नोंद: चौकशी फॉर्म पाठवल्याने बुकिंग आपोआप कन्फर्म होत नाही. आमची टीम चर्चा करून व्यवस्था निश्चित केल्यानंतरच बुकिंग निश्चित मानले जाईल.'
                : 'Note: Submitting an enquiry creates a quotation request only and does not automatically confirm an event booking. Our team will review the details and contact you to confirm arrangements.')}
          </span>
        </div>
      </div>

      {/* Consent Checkbox */}
      <div className="form-check mb-4">
        <input
          type="checkbox"
          id="privacyConsent"
          name="privacyConsent"
          className="form-check-input"
          checked={consentAccepted}
          onChange={(e) => onConsentChange(e.target.checked)}
          style={{ cursor: 'pointer', width: '1.2rem', height: '1.2rem' }}
        />
        <label
          htmlFor="privacyConsent"
          className="form-check-label small text-dark ms-1"
          style={{ cursor: 'pointer', lineHeight: '1.5' }}
        >
          {consent.text ||
            (language === 'mr'
              ? 'मी मान्य करतो/करते की अदिती केटरर्सने माझ्या चौकशीचा आढावा घेण्यासाठी आणि प्रतिसाद देण्यासाठी ही माहिती वापरावी.'
              : 'I agree that Aditi Caterers may use the information provided to review and respond to my catering enquiry.')}{' '}
          <span className="text-danger">*</span>
        </label>
      </div>

      {error && (
        <div className="alert alert-danger py-2 small d-flex align-items-center gap-2 mb-3">
          <i className="bi bi-exclamation-triangle-fill flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-lg text-white fw-bold py-3 rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2"
          style={{ backgroundColor: 'var(--ac-maroon, #641e2b)' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
              <span>{btn.submitting || (language === 'mr' ? 'चौकशी पाठवत आहे...' : 'Submitting Enquiry...')}</span>
            </>
          ) : (
            <>
              <i className="bi bi-send-fill" aria-hidden="true" />
              <span>{btn.submit || (language === 'mr' ? 'चौकशी फॉर्म पाठवा' : 'Submit Booking Enquiry')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

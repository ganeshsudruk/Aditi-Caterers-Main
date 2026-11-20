import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function ContactFaqPrompt() {
  const { language, t } = useLanguage();
  const faqText = t.contactPage?.faqPrompt || {};

  return (
    <div className="ac-contact-faq-banner mt-5">
      <div className="row align-items-center">
        <div className="col-lg-8 mb-3 mb-lg-0">
          <h3 className="h5 fw-bold text-dark mb-1">
            <i className="bi bi-question-circle-fill text-maroon me-2" aria-hidden="true"></i>
            {faqText.title || 'Have Common Questions?'}
          </h3>
          <p className="text-muted mb-0 small">
            {faqText.text ||
              'Find quick answers to common questions about our booking policies, service areas, and tasting sessions in our FAQ section.'}
          </p>
        </div>
        <div className="col-lg-4 text-lg-end">
          <Link to="/faq" className="btn btn-outline-dark fw-semibold px-4 py-2 me-2 mb-2 mb-sm-0">
            {faqText.button || 'Browse FAQ'}
          </Link>
          <Link to="/booking" className="btn btn-maroon fw-semibold px-4 py-2">
            {language === 'mr' ? 'तपशीलवार बुकिंग' : 'Detailed Booking'}
          </Link>
        </div>
      </div>
    </div>
  );
}

import { useLanguage } from '../../../context/LanguageContext';

export default function ContactInfoCards() {
  const { language, t } = useLanguage();
  const info = t.contactPage?.info || {};

  const waMessage =
    language === 'mr'
      ? 'नमस्कार अदिती केटरर्स, मला माझ्या कार्यक्रमासाठी केटरिंग सेवेबद्दल विचारणा करायची आहे.'
      : 'Hello Aditi Caterers, I would like to enquire about catering services for my event.';

  const waUrl = `https://wa.me/919975959391?text=${encodeURIComponent(waMessage)}`;

  return (
    <section className="mb-5" aria-labelledby="contact-info-title">
      <div className="mb-4">
        <h2 id="contact-info-title" className="h3 fw-bold text-dark mb-2">
          {info.title || 'Get in Touch'}
        </h2>
        <p className="text-muted mb-0">
          {info.subtitle ||
            'Reach out directly via phone or WhatsApp, or submit the catering enquiry form below.'}
        </p>
      </div>

      <div className="row g-4">
        {/* Phone Card */}
        <div className="col-md-4">
          <div className="ac-contact-card">
            <div className="ac-contact-card-icon" aria-hidden="true">
              <i className="bi bi-telephone-fill"></i>
            </div>
            <h3 className="ac-contact-card-title">{info.phoneLabel || 'Phone Call'}</h3>
            <div className="ac-contact-card-value">
              <a
                href="tel:+919975959391"
                className="text-decoration-none text-reset"
                aria-label={`Call ${info.phoneVal || '+91 9975959391'}`}
              >
                {info.phoneVal || '+91 9975959391'}
              </a>
            </div>
            <p className="ac-contact-card-desc">
              {info.phoneNote || 'Available 7 days a week for enquiries'}
            </p>
            <a
              href="tel:+919975959391"
              className="ac-btn-contact-action ac-btn-phone"
              aria-label="Call Aditi Caterers directly"
            >
              <i className="bi bi-telephone-fill" aria-hidden="true"></i>
              <span>{info.phoneBtn || 'Call Now'}</span>
            </a>
          </div>
        </div>

        {/* WhatsApp Card */}
        <div className="col-md-4">
          <div className="ac-contact-card">
            <div className="ac-contact-card-icon whatsapp" aria-hidden="true">
              <i className="bi bi-whatsapp"></i>
            </div>
            <h3 className="ac-contact-card-title">{info.whatsappLabel || 'WhatsApp Chat'}</h3>
            <div className="ac-contact-card-value">{info.whatsappVal || '+91 9975959391'}</div>
            <p className="ac-contact-card-desc">
              {info.whatsappNote || 'Quick responses for event enquiries'}
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ac-btn-contact-action ac-btn-whatsapp"
              aria-label="Chat with Aditi Caterers on WhatsApp (opens in a new window)"
            >
              <i className="bi bi-whatsapp" aria-hidden="true"></i>
              <span>{info.whatsappBtn || 'Chat on WhatsApp'}</span>
            </a>
          </div>
        </div>

        {/* Service Coverage Card */}
        <div className="col-md-4">
          <div className="ac-contact-card">
            <div className="ac-contact-card-icon" aria-hidden="true">
              <i className="bi bi-geo-alt-fill"></i>
            </div>
            <h3 className="ac-contact-card-title">
              {info.locationLabel || 'Service Coverage Area'}
            </h3>
            <div className="ac-contact-card-value text-dark">
              {info.locationVal || 'Maharashtra State'}
            </div>
            <p className="ac-contact-card-desc">
              {info.locationNote || 'Serving Pune, Satara, and surrounding districts'}
            </p>
            <div className="mt-auto">
              <span className="badge bg-light text-secondary border px-3 py-2 w-100 text-wrap">
                <i className="bi bi-truck me-1" aria-hidden="true"></i>
                {language === 'mr' ? 'थेट कार्यक्रम स्थळी सेवा' : 'On-Site Catering Service'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Status & Unconfirmed Details Notice */}
      <div className="ac-service-notice-banner" role="region" aria-label="Service Notice">
        <div className="ac-service-notice-title">
          <i className="bi bi-info-circle-fill text-warning me-1" aria-hidden="true"></i>
          {info.statusNoticeTitle || 'Direct Consultation Available'}
        </div>
        <p className="ac-service-notice-text">
          {info.statusNoticeText ||
            'Aditi Caterers provides on-site catering services across Maharashtra. Official office address and physical showroom visits remain pending business-owner confirmation. For immediate bookings and consultations, please call or message directly.'}
        </p>
      </div>
    </section>
  );
}

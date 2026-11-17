import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function ServiceCTA({ eventType = null }) {
  const { language, t } = useLanguage();
  const cta = t.servicesPage.cta;

  const bookingUrl = eventType ? `/booking?eventType=${eventType}` : '/booking';
  const waMessage = encodeURIComponent(
    language === 'mr'
      ? 'नमस्कार अदिती केटरर्स, मला केटरिंग सेवेबद्दल चौकशी करायची आहे.'
      : 'Hello Aditi Caterers, I would like to enquire about your catering services.'
  );

  return (
    <section className="py-5 bg-white" aria-label="Booking Call-to-Action">
      <div className="container-xl py-3">
        <div className="ac-service-cta-banner p-4 p-md-5 text-white text-center shadow-lg">
          <div className="position-relative z-1 mx-auto" style={{ maxWidth: '820px' }}>
            <span className="badge bg-gold text-dark px-3 py-2 rounded-pill fw-bold mb-3 fs-6">
              <i className="bi bi-calendar-event me-2" />
              {language === 'mr' ? 'आरक्षण व नियोजन' : 'Reservations & Planning'}
            </span>

            <h2 className="display-6 fw-bold mb-3">
              {cta.heading}
            </h2>

            <p className="lead fs-6 text-white-50 mb-4 mx-auto" style={{ maxWidth: '680px' }}>
              {cta.description}
            </p>

            {/* Buttons Row */}
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link
                to={bookingUrl}
                className="btn btn-warning px-4 py-3 rounded-pill fw-bold text-dark d-inline-flex align-items-center gap-2 shadow-sm"
                style={{ backgroundColor: 'var(--ac-gold, #c9a45c)', borderColor: 'var(--ac-gold, #c9a45c)' }}
              >
                <i className="bi bi-calendar-check-fill" />
                <span>{cta.bookBtn}</span>
              </Link>

              <Link
                to="/contact"
                className="btn btn-outline-light px-4 py-3 rounded-pill fw-semibold d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-envelope-fill" />
                <span>{cta.contactBtn}</span>
              </Link>

              <a
                href="tel:+919975959391"
                className="btn btn-outline-light px-4 py-3 rounded-pill fw-semibold d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-telephone-fill" />
                <span>{cta.callNow}</span>
              </a>

              <a
                href={`https://wa.me/919975959391?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success px-4 py-3 rounded-pill fw-semibold d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-whatsapp" />
                <span>{cta.whatsappUs}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

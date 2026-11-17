import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function AwardsCTA() {
  const { language, t } = useLanguage();
  const cta = t.awardsPage?.cta || {};

  const heading = cta.heading || (language === 'mr' ? 'तुमच्या खास कार्यक्रमाचे नियोजन करत आहात?' : 'Planning a Special Event?');
  const description = cta.description || (language === 'mr'
    ? 'तुमच्या आगामी कार्यक्रमासाठी केटरिंग सेवांबद्दल चर्चा करण्यासाठी Aditi Caterers शी संपर्क साधा.'
    : 'Get in touch with Aditi Caterers to discuss catering for your upcoming celebration.');
  const contactBtn = cta.contactBtn || (language === 'mr' ? 'संपर्क साधा' : 'Contact Us');
  const bookBtn = cta.bookBtn || (language === 'mr' ? 'आता बुक करा' : 'Book Now');
  const whatsappBtn = cta.whatsappBtn || (language === 'mr' ? 'WhatsApp वर चॅट करा' : 'Chat on WhatsApp');

  const waMsg = language === 'mr'
    ? 'नमस्कार अदिती केटरर्स, मला माझ्या कार्यक्रमासाठी केटरिंग सेवेबद्दल माहिती हवी आहे.'
    : 'Hello Aditi Caterers, I would like to enquire about catering for my upcoming event.';
  const waUrl = `https://wa.me/919975959391?text=${encodeURIComponent(waMsg)}`;

  return (
    <section className="py-5 bg-white" aria-label="Awards Call-to-Action">
      <div className="container-xl py-3">
        <div className="ac-awards-cta-banner p-4 p-md-5 text-white text-center shadow-lg">
          <div className="position-relative mx-auto" style={{ maxWidth: '800px', zIndex: 1 }}>
            <span className="badge px-3 py-2 rounded-pill fw-bold mb-3 fs-6" style={{ backgroundColor: 'var(--ac-gold, #c9a45c)', color: '#1a1a1a' }}>
              <i className="bi bi-calendar-check me-2" aria-hidden="true" />
              {cta.tag || (language === 'mr' ? 'संपर्क करा' : 'Get in Touch')}
            </span>

            <h2 className="display-6 fw-bold mb-3">{heading}</h2>

            <p className="lead fs-6 text-white-50 mb-4 mx-auto" style={{ maxWidth: '640px' }}>
              {description}
            </p>

            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link
                to="/contact"
                className="btn btn-warning px-4 py-3 rounded-pill fw-bold text-dark d-inline-flex align-items-center gap-2 shadow-sm"
                style={{ backgroundColor: 'var(--ac-gold, #c9a45c)', borderColor: 'var(--ac-gold, #c9a45c)' }}
              >
                <i className="bi bi-envelope-fill" aria-hidden="true" />
                <span>{contactBtn}</span>
              </Link>

              <Link
                to="/booking"
                className="btn btn-outline-light px-4 py-3 rounded-pill fw-semibold d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-calendar-check-fill" aria-hidden="true" />
                <span>{bookBtn}</span>
              </Link>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success px-4 py-3 rounded-pill fw-semibold d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-whatsapp" aria-hidden="true" />
                <span>{whatsappBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

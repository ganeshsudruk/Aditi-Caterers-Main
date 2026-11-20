import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function GalleryCTA() {
  const { language, t } = useLanguage();
  const cta = t.galleryPage?.cta || {};

  const heading =
    cta.title ||
    (language === 'mr'
      ? 'कार्यक्रमाचे नियोजन करत आहात का?'
      : 'Planning an Event?');

  const description =
    cta.description ||
    (language === 'mr'
      ? 'तुमच्या कार्यक्रमाच्या केटरिंगविषयी चर्चा करण्यासाठी Aditi Caterers शी संपर्क साधा.'
      : 'Explore our catering services and contact Aditi Caterers to discuss your event requirements.');

  const enquireBtn =
    cta.enquireNow || (language === 'mr' ? 'चौकशी करा' : 'Enquire Now');

  const contactBtn =
    cta.contactUs || (language === 'mr' ? 'संपर्क साधा' : 'Contact Us');

  const whatsappBtn =
    cta.whatsappUs || (language === 'mr' ? 'WhatsApp वर संपर्क करा' : 'WhatsApp Us');

  const waMsg =
    language === 'mr'
      ? 'नमस्कार अदिती केटरर्स, मी गॅलरीमधील फोटो पाहिले आहेत. मला माझ्या कार्यक्रमासाठी केटरिंग सेवेबद्दल चौकशी करायची आहे.'
      : 'Hello Aditi Caterers, I viewed your gallery photos and would like to enquire about catering for my upcoming event.';

  const waUrl = `https://wa.me/919975959391?text=${encodeURIComponent(waMsg)}`;

  return (
    <section className="py-5 bg-white" aria-label="Gallery Booking Call-to-Action">
      <div className="container-xl py-3">
        <div className="ac-gallery-cta-banner p-4 p-md-5 text-white text-center shadow-lg">
          <div className="position-relative mx-auto" style={{ maxWidth: '820px', zIndex: 1 }}>
            <span
              className="badge px-3 py-2 rounded-pill fw-bold mb-3 fs-6"
              style={{ backgroundColor: 'var(--ac-gold, #c9a45c)', color: '#1a1a1a' }}
            >
              <i className="bi bi-calendar-heart-fill me-2" aria-hidden="true" />
              {cta.tag || (language === 'mr' ? 'उत्कृष्ट केटरिंग सेवा' : 'Celebration Catering')}
            </span>

            <h2 className="display-6 fw-bold mb-3">{heading}</h2>

            <p className="lead fs-6 text-white-50 mb-4 mx-auto" style={{ maxWidth: '640px' }}>
              {description}
            </p>

            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link
                to="/booking"
                className="btn btn-warning px-4 py-3 rounded-pill fw-bold text-dark d-inline-flex align-items-center gap-2 shadow-sm"
                style={{ backgroundColor: 'var(--ac-gold, #c9a45c)', borderColor: 'var(--ac-gold, #c9a45c)' }}
              >
                <i className="bi bi-calendar-check-fill" aria-hidden="true" />
                <span>{enquireBtn}</span>
              </Link>

              <Link
                to="/contact"
                className="btn btn-outline-light px-4 py-3 rounded-pill fw-semibold d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-envelope-fill" aria-hidden="true" />
                <span>{contactBtn}</span>
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

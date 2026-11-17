import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function MenuEnquiryCTA() {
  const { language, t } = useLanguage();
  const cta = t.menuPage?.enquiryCTA || {};

  const title = cta.title || (language === 'mr' ? 'तुमच्या कार्यक्रमाचा मेनू अदिती केटरर्ससोबत ठरवा' : 'Plan Your Event Menu with Aditi Caterers');
  const description = cta.description || (language === 'mr' ? 'आवडते पदार्थ निवडा आणि परिपूर्ण मेनू तयार करण्यासाठी आमच्याशी संपर्क करा.' : 'Shortlist your favorite dishes above and contact us to build the perfect catering spread for your celebration.');
  const bookNow = cta.bookNow || (language === 'mr' ? 'तारीख बुक करा' : 'Book Your Date');
  const contactUs = cta.contactUs || (language === 'mr' ? 'संपर्क करा' : 'Contact Us');
  const whatsappUs = cta.whatsappUs || (language === 'mr' ? 'WhatsApp वर चॅट करा' : 'Chat on WhatsApp');

  const waMsg =
    language === 'mr'
      ? 'नमस्कार अदिती केटरर्स, मला माझ्या कार्यक्रमासाठी खाद्यमेनूबद्दल माहिती हवी आहे. कृपया उपलब्धता आणि कोटेशन सांगा.'
      : 'Hello Aditi Caterers, I would like to enquire about catering menu options for my event. Please share availability and quotation.';

  const waUrl = `https://wa.me/919975959391?text=${encodeURIComponent(waMsg)}`;

  return (
    <section className="py-5 bg-white" aria-label="Menu Booking Call-to-Action">
      <div className="container-xl py-3">
        <div className="ac-service-cta-banner p-4 p-md-5 text-white text-center shadow-lg">
          <div className="position-relative z-1 mx-auto" style={{ maxWidth: '820px' }}>
            <span className="badge bg-gold text-dark px-3 py-2 rounded-pill fw-bold mb-3 fs-6">
              <i className="bi bi-calendar-check me-2" />
              {language === 'mr' ? 'आरक्षण व चर्चा' : 'Bookings & Enquiries'}
            </span>

            <h2 className="display-6 fw-bold mb-3">{title}</h2>

            <p className="lead fs-6 text-white-50 mb-4 mx-auto" style={{ maxWidth: '680px' }}>
              {description}
            </p>

            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link
                to="/booking?source=menu"
                className="btn btn-warning px-4 py-3 rounded-pill fw-bold text-dark d-inline-flex align-items-center gap-2 shadow-sm"
                style={{ backgroundColor: 'var(--ac-gold, #c9a45c)', borderColor: 'var(--ac-gold, #c9a45c)' }}
              >
                <i className="bi bi-calendar-check-fill" />
                <span>{bookNow}</span>
              </Link>

              <Link
                to="/contact"
                className="btn btn-outline-light px-4 py-3 rounded-pill fw-semibold d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-envelope-fill" />
                <span>{contactUs}</span>
              </Link>

              <a
                href="tel:+919975959391"
                className="btn btn-outline-light px-4 py-3 rounded-pill fw-semibold d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-telephone-fill" />
                <span>+91 9975959391</span>
              </a>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success px-4 py-3 rounded-pill fw-semibold d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-whatsapp" />
                <span>{whatsappUs}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

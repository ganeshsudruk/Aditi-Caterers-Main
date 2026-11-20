import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function BookingHero() {
  const { language, t } = useLanguage();
  const hero = t.bookingPage?.hero || {};

  return (
    <section className="ac-booking-hero text-white" aria-label="Booking Hero Banner">
      <div className="container-xl text-center position-relative">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3 d-inline-block">
          <ol className="breadcrumb mb-0 px-3 py-1 bg-white bg-opacity-10 rounded-pill small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-white text-decoration-none">
                <i className="bi bi-house-door-fill me-1" aria-hidden="true" />
                {hero.breadcrumbHome || (language === 'mr' ? 'मुख्यपृष्ठ' : 'Home')}
              </Link>
            </li>
            <li
              className="breadcrumb-item active fw-semibold"
              style={{ color: 'var(--ac-gold, #c9a45c)' }}
              aria-current="page"
            >
              {hero.breadcrumbBooking || (language === 'mr' ? 'केटरिंग बुकिंग' : 'Book Catering')}
            </li>
          </ol>
        </nav>

        {/* Decorative Calendar Icon */}
        <div className="mb-3">
          <i
            className="bi bi-calendar2-check-fill"
            style={{ fontSize: '3rem', color: 'var(--ac-gold, #c9a45c)' }}
            aria-hidden="true"
          />
        </div>

        {/* Title */}
        <h1 className="display-5 fw-bold mb-3">
          {hero.title ||
            (language === 'mr'
              ? 'Aditi Caterers सोबत तुमच्या कार्यक्रमाचे नियोजन करा'
              : 'Plan Your Event with Aditi Caterers')}
        </h1>

        {/* Subtitle */}
        <p
          className="lead fs-6 text-white-50 mx-auto mb-0"
          style={{ maxWidth: '680px' }}
        >
          {hero.subtitle ||
            (language === 'mr'
              ? 'तुमच्या कार्यक्रमाची माहिती आणि केटरिंगच्या गरजा आम्हाला कळवा. तुमच्या चौकशीचा आढावा घेऊन पुढील माहितीसाठी आमची टीम तुमच्याशी संपर्क साधेल.'
              : 'Share your event details and catering requirements with us. Our team can review your enquiry and contact you to discuss the next steps.')}
        </p>
      </div>
    </section>
  );
}

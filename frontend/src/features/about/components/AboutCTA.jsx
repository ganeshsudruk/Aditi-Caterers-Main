import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function AboutCTA() {
  const { t } = useLanguage();
  const cta = t.aboutPage.cta;

  return (
    <section className="ac-about-cta py-5" aria-label="Call to Action">
      <div className="container-xl py-4">
        <div className="ac-cta-banner p-4 p-md-5 rounded-4 text-center text-white position-relative overflow-hidden shadow">
          
          <div className="position-relative z-2 max-w-700 mx-auto">
            <span className="badge bg-gold text-dark px-3 py-2 rounded-pill small fw-semibold mb-3">
              <i className="bi bi-stars me-1" />
              Aditi Caterers
            </span>

            <h2 className="ac-cta-title mb-3 fw-bold">
              {cta.heading}
            </h2>

            <p className="ac-cta-desc text-white-90 mb-4 fs-6">
              {cta.description}
            </p>

            <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
              <Link
                to="/booking"
                className="btn btn-light text-maroon fw-semibold px-4 py-2 rounded-3 d-inline-flex align-items-center gap-2 shadow-sm"
              >
                <i className="bi bi-calendar-check-fill" />
                <span>{cta.bookBtn}</span>
              </Link>
              <Link
                to="/contact"
                className="btn btn-outline-light px-4 py-2 rounded-3 d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-envelope-fill text-warning" />
                <span>{cta.contactBtn}</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

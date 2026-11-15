import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function HomeCTA() {
  const { t } = useLanguage();
  const cta = t.home.cta;

  return (
    <section className="ac-home-cta py-5" aria-label="Call to Action">
      <div className="container-xl py-4">
        <div className="ac-cta-banner p-4 p-md-5 rounded-4 text-center text-white position-relative overflow-hidden shadow">
          
          {/* Subtle background decoration */}
          <div className="ac-cta-glow position-absolute" />

          <div className="position-relative z-2 max-w-700 mx-auto">
            <span className="badge bg-gold text-dark px-3 py-2 rounded-pill small fw-semibold mb-3">
              <i className="bi bi-stars me-1" />
              Aditi Caterers
            </span>

            <h2 className="ac-cta-title mb-3 fw-bold">
              {cta.title}
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
                <span>{cta.bookEvent}</span>
              </Link>
              <a
                href="tel:+919975959391"
                className="btn btn-outline-light px-4 py-2 rounded-3 d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-telephone-fill text-warning" />
                <span>{cta.callNow} (+91 9975959391)</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

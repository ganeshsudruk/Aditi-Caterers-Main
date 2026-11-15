import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function AboutPreview() {
  const { t } = useLanguage();

  return (
    <section className="ac-about-preview py-5 bg-white" aria-label="About Aditi Caterers">
      <div className="container-xl py-4">
        <div className="row align-items-center g-5">
          
          {/* Left Column: Image with frame */}
          <div className="col-lg-6">
            <div className="ac-about-img-wrapper position-relative">
              <img
                src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"
                alt="Aditi Caterers food preparation and service"
                className="img-fluid rounded-4 shadow-sm w-100 object-fit-cover ac-about-img"
                loading="lazy"
              />
              <div className="ac-about-card-badge position-absolute bottom-0 start-0 m-4 p-3 bg-white rounded-3 shadow">
                <div className="d-flex align-items-center gap-3">
                  <div className="ac-badge-icon bg-light-maroon text-maroon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-patch-check-fill fs-3" />
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold text-dark">Aditi Caterers</h6>
                    <small className="text-muted">{t.nav.services}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text & CTA */}
          <div className="col-lg-6">
            <div className="ps-lg-3">
              <span className="ac-section-badge mb-2 d-inline-block">
                {t.home.about.tag}
              </span>
              <h2 className="ac-section-title mb-3">
                {t.home.about.title}
              </h2>
              <div className="ac-heading-line mb-4" />
              
              <p className="ac-about-text text-muted mb-4 lead fs-6">
                {t.home.about.description}
              </p>

              {/* Verified Value Points */}
              <div className="ac-about-points mb-4">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <i className="bi bi-check-circle-fill text-success fs-5" />
                  <span className="fw-medium text-dark">{t.home.about.highlight1}</span>
                </div>
                <div className="d-flex align-items-center gap-3 mb-2">
                  <i className="bi bi-check-circle-fill text-success fs-5" />
                  <span className="fw-medium text-dark">{t.home.about.highlight2}</span>
                </div>
                <div className="d-flex align-items-center gap-3 mb-2">
                  <i className="bi bi-check-circle-fill text-success fs-5" />
                  <span className="fw-medium text-dark">{t.home.about.highlight3}</span>
                </div>
              </div>

              {/* CTA button */}
              <Link
                to="/about"
                className="btn ac-btn-outline-primary d-inline-flex align-items-center gap-2 mt-2"
              >
                <span>{t.home.about.knowMore}</span>
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

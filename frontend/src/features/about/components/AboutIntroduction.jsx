import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function AboutIntroduction({ image }) {
  const { t } = useLanguage();
  const intro = t.aboutPage.intro;

  const displayImage =
    image || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=80';

  return (
    <section className="ac-about-intro py-5 bg-white" aria-label="About Aditi Caterers Introduction">
      <div className="container-xl py-4">
        <div className="row align-items-center g-5">
          
          {/* Left Column: Image with frame */}
          <div className="col-lg-6">
            <div className="ac-intro-img-wrap position-relative">
              <img
                src={displayImage}
                alt="Aditi Caterers Authentic Cooking"
                className="img-fluid rounded-4 shadow w-100 object-fit-cover ac-intro-img"
                loading="lazy"
              />
              <div className="ac-intro-badge position-absolute bottom-0 start-0 m-3 m-md-4 p-3 bg-white rounded-3 shadow">
                <div className="d-flex align-items-center gap-3">
                  <div className="ac-intro-badge-icon rounded-circle bg-light-maroon text-maroon d-flex align-items-center justify-content-center">
                    <i className="bi bi-award-fill fs-3" />
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold text-dark">Aditi Caterers</h6>
                    <small className="text-muted">Catering Services</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text & CTA */}
          <div className="col-lg-6">
            <div className="ps-lg-3">
              <span className="ac-section-badge mb-2 d-inline-block">
                {intro.tag}
              </span>
              <h2 className="ac-section-title mb-3">
                {intro.heading}
              </h2>
              <div className="ac-heading-line mb-4" />

              <p className="text-muted mb-3 fs-6 lh-base">
                {intro.p1}
              </p>
              <p className="text-muted mb-3 fs-6 lh-base">
                {intro.p2}
              </p>
              <p className="text-muted mb-4 fs-6 lh-base">
                {intro.p3}
              </p>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="btn ac-btn-primary d-inline-flex align-items-center gap-2"
                >
                  <i className="bi bi-telephone-fill" />
                  <span>{intro.contactBtn}</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

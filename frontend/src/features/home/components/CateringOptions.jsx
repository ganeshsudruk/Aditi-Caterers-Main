import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function CateringOptions() {
  const { t } = useLanguage();
  const withMat = t.home.cateringOptions.withMaterial;
  const withoutMat = t.home.cateringOptions.withoutMaterial;

  return (
    <section className="ac-catering-options py-5 bg-white" aria-label="Our Catering Options">
      <div className="container-xl py-4">
        
        {/* Section Heading */}
        <SectionHeading
          tag={t.home.cateringOptions.tag}
          title={t.home.cateringOptions.title}
          description={t.home.cateringOptions.description}
        />

        {/* 2 Comparison / Choice Cards */}
        <div className="row g-4 mt-2 justify-content-center">
          
          {/* Card 1: With Material */}
          <div className="col-lg-6 col-md-10">
            <div className="ac-option-card h-100 p-4 p-md-5 rounded-4 border position-relative d-flex flex-column justify-content-between ac-option-with">
              <div className="ac-option-badge-top">
                <span className="badge bg-maroon text-white px-3 py-2 rounded-pill small fw-semibold">
                  <i className="bi bi-basket-fill me-1" />
                  {withMat.badge}
                </span>
              </div>

              <div>
                <div className="ac-option-icon mb-3 mt-2 text-maroon">
                  <i className="bi bi-cart-check-fill fs-1" />
                </div>
                <h3 className="h4 fw-bold text-dark mb-3">
                  {withMat.title}
                </h3>
                <p className="text-muted mb-4 fs-6">
                  {withMat.description}
                </p>

                {/* Features */}
                <ul className="list-unstyled mb-4">
                  <li className="d-flex align-items-center gap-2 mb-2 text-dark">
                    <i className="bi bi-check2-circle text-success fs-5" />
                    <span>{withMat.feature1}</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 mb-2 text-dark">
                    <i className="bi bi-check2-circle text-success fs-5" />
                    <span>{withMat.feature2}</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 text-dark">
                    <i className="bi bi-check2-circle text-success fs-5" />
                    <span>{withMat.feature3}</span>
                  </li>
                </ul>
              </div>

              <div className="pt-3 border-top border-light-subtle">
                <Link
                  to="/booking?option=with-material"
                  className="btn ac-btn-primary w-100 py-2 d-inline-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-envelope-paper-fill" />
                  <span>{withMat.cta}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Without Material */}
          <div className="col-lg-6 col-md-10">
            <div className="ac-option-card h-100 p-4 p-md-5 rounded-4 border position-relative d-flex flex-column justify-content-between ac-option-without">
              <div className="ac-option-badge-top">
                <span className="badge bg-gold text-dark px-3 py-2 rounded-pill small fw-semibold">
                  <i className="bi bi-person-workspace me-1" />
                  {withoutMat.badge}
                </span>
              </div>

              <div>
                <div className="ac-option-icon mb-3 mt-2 text-gold">
                  <i className="bi bi-award-fill fs-1" />
                </div>
                <h3 className="h4 fw-bold text-dark mb-3">
                  {withoutMat.title}
                </h3>
                <p className="text-muted mb-4 fs-6">
                  {withoutMat.description}
                </p>

                {/* Features */}
                <ul className="list-unstyled mb-4">
                  <li className="d-flex align-items-center gap-2 mb-2 text-dark">
                    <i className="bi bi-check2-circle text-success fs-5" />
                    <span>{withoutMat.feature1}</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 mb-2 text-dark">
                    <i className="bi bi-check2-circle text-success fs-5" />
                    <span>{withoutMat.feature2}</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 text-dark">
                    <i className="bi bi-check2-circle text-success fs-5" />
                    <span>{withoutMat.feature3}</span>
                  </li>
                </ul>
              </div>

              <div className="pt-3 border-top border-light-subtle">
                <Link
                  to="/booking?option=without-material"
                  className="btn ac-btn-outline-primary w-100 py-2 d-inline-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-envelope-paper" />
                  <span>{withoutMat.cta}</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

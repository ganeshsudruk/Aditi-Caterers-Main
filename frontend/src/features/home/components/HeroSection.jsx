import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import heroImg from '../../../assets/hero.png';

export default function HeroSection({ data }) {
  const { t, language } = useLanguage();
  const heroContent = data?.hero || {};

  // Resolve dynamic title & description with respect to selected language
  const heroTitle =
    (language === 'mr' ? heroContent.title_mr : heroContent.title_en) ||
    heroContent[language]?.title ||
    t.home?.hero?.title;

  const heroDescription =
    (language === 'mr' ? heroContent.description_mr : heroContent.description_en) ||
    heroContent[language]?.description ||
    t.home?.hero?.description;

  return (
    <section className="ac-hero-section position-relative" aria-label="Hero">
      {/* Background with overlay */}
      <div className="ac-hero-bg-container">
        <img
          src={heroContent.image || heroImg}
          alt={heroTitle}
          className="ac-hero-bg-img"
          onError={(e) => {
            // Branded gradient fallback if image not found
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="ac-hero-overlay" />
      </div>

      {/* Hero Content */}
      <div className="container-xl position-relative z-2 py-5">
        <div className="row align-items-center min-vh-75 py-4 py-lg-5">
          <div className="col-lg-8 col-xl-7 text-white">
            
            {/* Badge */}
            <div className="d-inline-flex align-items-center gap-2 ac-hero-badge mb-3">
              <i className="bi bi-stars text-warning" aria-hidden="true" />
              <span>{t.home.hero.badge}</span>
            </div>

            {/* H1 Heading */}
            <h1 className="ac-hero-title mb-4">
              {heroTitle}
            </h1>

            {/* Description */}
            <p className="ac-hero-desc text-white-90 mb-5">
              {heroDescription}
            </p>

            {/* CTA Buttons */}
            <div className="d-flex flex-wrap align-items-center gap-3">
              <Link
                to="/booking"
                className="btn ac-btn-primary d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-calendar-check-fill" aria-hidden="true" />
                <span>{t.home.hero.bookEvent}</span>
              </Link>
              <Link
                to="/services"
                className="btn ac-btn-outline-light d-inline-flex align-items-center gap-2"
              >
                <span>{t.home.hero.exploreServices}</span>
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </Link>
            </div>

            {/* Quick feature pills */}
            <div className="d-flex flex-wrap align-items-center gap-4 mt-5 pt-3 border-top border-white-15 small text-white-80">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-warning" />
                <span>{t.home.cateringOptions.withMaterial.title}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-warning" />
                <span>{t.home.cateringOptions.withoutMaterial.title}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-telephone-fill text-warning" />
                <span>+91 9975959391</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

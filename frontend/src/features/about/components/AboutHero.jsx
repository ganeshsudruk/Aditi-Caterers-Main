import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function AboutHero() {
  const { t } = useLanguage();
  const hero = t.aboutPage.hero;

  return (
    <section className="ac-about-hero position-relative text-white py-5" aria-label="Page Banner">
      {/* Background with overlay */}
      <div className="ac-about-hero-bg position-absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=80"
          alt="Aditi Caterers Celebration Setup"
          className="w-100 h-100 object-fit-cover"
        />
        <div className="ac-about-hero-overlay position-absolute inset-0" />
      </div>

      <div className="container-xl position-relative z-2 py-4 py-lg-5 text-center">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="d-flex justify-content-center mb-3">
          <ol className="breadcrumb ac-breadcrumb px-3 py-1 rounded-pill mb-0">
            <li className="breadcrumb-item">
              <Link to="/" className="text-white-50 text-decoration-none hover-white">
                <i className="bi bi-house-door-fill me-1" />
                {hero.breadcrumbHome}
              </Link>
            </li>
            <li className="breadcrumb-item active text-gold fw-semibold" aria-current="page">
              {hero.breadcrumbCurrent}
            </li>
          </ol>
        </nav>

        {/* Page Title */}
        <h1 className="ac-about-hero-title fw-bold mb-3">
          {hero.title}
        </h1>

        {/* Subtitle */}
        <p className="ac-about-hero-subtitle text-white-90 lead max-w-700 mx-auto fs-6">
          {hero.subtitle}
        </p>
      </div>
    </section>
  );
}

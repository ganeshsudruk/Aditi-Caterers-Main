import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function ServicesHero() {
  const { t } = useLanguage();
  const hero = t.servicesPage.hero;

  return (
    <section className="ac-services-hero position-relative py-5 text-white" aria-label="Services Header">
      {/* Background Image with Warm Maroon Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 ac-services-hero-overlay"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=80')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundBlendMode: 'overlay',
        }}
      />

      <div className="container-xl position-relative z-1 py-4 text-center">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="d-inline-block mb-3">
          <ol className="breadcrumb ac-breadcrumb px-3 py-1 rounded-pill mb-0">
            <li className="breadcrumb-item">
              <Link to="/" className="text-white text-decoration-none">
                <i className="bi bi-house-door-fill me-1" />
                {hero.breadcrumbHome}
              </Link>
            </li>
            <li className="breadcrumb-item active text-white fw-bold" aria-current="page">
              {hero.breadcrumbServices}
            </li>
          </ol>
        </nav>

        {/* Page Heading & Tagline */}
        <h1 className="ac-services-hero-title fw-bold text-white mb-3">
          {hero.heading}
        </h1>
        <p className="ac-services-hero-subtitle mx-auto lead fs-5">
          {hero.description}
        </p>
      </div>
    </section>
  );
}

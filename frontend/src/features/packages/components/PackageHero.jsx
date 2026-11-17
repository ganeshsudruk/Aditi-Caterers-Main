import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function PackageHero() {
  const { t } = useLanguage();
  const hero = t.packagesPage.hero;
  const breadcrumb = t.packagesPage.breadcrumb;

  const scrollToPackages = (e) => {
    e.preventDefault();
    const el = document.getElementById('budget-packages') || document.getElementById('package-listing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="ac-packages-hero position-relative py-5 text-white" aria-label="Packages Header">
      {/* Background Image with Warm Maroon Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 ac-packages-hero-overlay"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=80')`,
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
                {breadcrumb.home}
              </Link>
            </li>
            <li className="breadcrumb-item active text-white fw-bold" aria-current="page">
              {breadcrumb.packages}
            </li>
          </ol>
        </nav>

        {/* Page Heading & Subtitle */}
        <h1 className="ac-packages-hero-title fw-bold text-white mb-2">
          {hero.title}
        </h1>
        <p className="fs-5 text-gold fw-semibold mb-3">
          {hero.subtitle}
        </p>
        <p className="ac-packages-hero-subtitle mx-auto text-white-50 fs-6 mb-4">
          {hero.description}
        </p>

        {/* Action Buttons */}
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <a
            href="#budget-packages"
            onClick={scrollToPackages}
            className="btn btn-warning px-4 py-2 rounded-pill fw-bold text-dark d-inline-flex align-items-center gap-2 shadow-sm"
            style={{ backgroundColor: 'var(--ac-gold, #c9a45c)', borderColor: 'var(--ac-gold, #c9a45c)' }}
          >
            <i className="bi bi-collection-fill" />
            <span>{hero.exploreBtn}</span>
          </a>
          <Link
            to="/booking"
            className="btn btn-outline-light px-4 py-2 rounded-pill fw-semibold d-inline-flex align-items-center gap-2"
          >
            <i className="bi bi-calendar-check" />
            <span>{hero.enquireBtn}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

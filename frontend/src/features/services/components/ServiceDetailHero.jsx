import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function ServiceDetailHero({ service }) {
  const { language, t } = useLanguage();

  if (!service) return null;

  const title = service.heroHeading?.[language] || service.heroHeading?.en || service.name?.[language] || service.name?.en;
  const shortDesc = service.shortDescription?.[language] || service.shortDescription?.en || '';
  const serviceName = service.name?.[language] || service.name?.en;
  const imageUrl = service.image?.url || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=80';
  const icon = service.icon || 'bi-cup-hot-fill';

  return (
    <section className="ac-service-detail-hero position-relative py-5 text-white" aria-label={title}>
      {/* Background Image with Gradient Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 ac-services-hero-overlay"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundBlendMode: 'overlay',
        }}
      />

      <div className="container-xl position-relative z-1 py-4">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb ac-breadcrumb px-3 py-1 rounded-pill d-inline-flex mb-0">
            <li className="breadcrumb-item">
              <Link to="/" className="text-white text-decoration-none">
                <i className="bi bi-house-door-fill me-1" />
                {t.servicesPage.hero.breadcrumbHome}
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/services" className="text-white text-decoration-none">
                {t.servicesPage.hero.breadcrumbServices}
              </Link>
            </li>
            <li className="breadcrumb-item active text-white fw-bold" aria-current="page">
              {serviceName}
            </li>
          </ol>
        </nav>

        {/* Category Pill */}
        <div className="mb-3">
          <span className="ac-detail-badge">
            <i className={`bi ${icon}`} />
            <span>{serviceName}</span>
          </span>
        </div>

        {/* Heading & Short Tagline */}
        <h1 className="ac-services-hero-title fw-bold text-white mb-3" style={{ maxWidth: '850px' }}>
          {title}
        </h1>
        <p className="lead fs-5 text-white-50 mb-0" style={{ maxWidth: '750px' }}>
          {shortDesc}
        </p>
      </div>
    </section>
  );
}

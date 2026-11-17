import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function PackageDetailHero({ pkg }) {
  const { language, t } = useLanguage();

  if (!pkg) return null;

  const name = pkg.name?.[language] || pkg.name?.en || pkg.slug;
  const shortDesc = pkg.shortDescription?.[language] || pkg.shortDescription?.en || '';
  const imageUrl = pkg.image?.url || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=80';
  const breadcrumb = t.packagesPage.breadcrumb;

  let badgeClass = 'badge-with-material';
  let badgeLabel = t.packagesPage.listing.filters.withMaterial;
  if (pkg.packageType === 'without-material') {
    badgeClass = 'badge-without-material';
    badgeLabel = t.packagesPage.listing.filters.withoutMaterial;
  } else if (pkg.packageType === 'custom') {
    badgeClass = 'badge-custom';
    badgeLabel = t.packagesPage.listing.filters.custom;
  }

  return (
    <section className="ac-package-detail-hero position-relative py-5 text-white" aria-label={name}>
      {/* Background Image with Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 ac-packages-hero-overlay"
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
                {breadcrumb.home}
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/packages" className="text-white text-decoration-none">
                {breadcrumb.packages}
              </Link>
            </li>
            <li className="breadcrumb-item active text-white fw-bold" aria-current="page">
              {name}
            </li>
          </ol>
        </nav>

        {/* Type Badge */}
        <div className="mb-3">
          <span className={`ac-pkg-type-badge ${badgeClass} position-static d-inline-block`}>
            {badgeLabel}
          </span>
          {pkg.category && (
            <span className={`ac-tier-badge ac-tier-${pkg.category} ms-2`}>
              {pkg.category.toUpperCase()}
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <h1 className="ac-packages-hero-title fw-bold text-white mb-3" style={{ maxWidth: '850px' }}>
          {name}
        </h1>
        <p className="lead fs-5 text-white-50 mb-0" style={{ maxWidth: '750px' }}>
          {shortDesc}
        </p>
      </div>
    </section>
  );
}


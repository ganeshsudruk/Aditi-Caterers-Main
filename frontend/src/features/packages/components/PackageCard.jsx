import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function PackageCard({ pkg }) {
  const { language, t } = useLanguage();

  if (!pkg) return null;

  const name = pkg.name?.[language] || pkg.name?.en || pkg.slug;
  const shortDesc = pkg.shortDescription?.[language] || pkg.shortDescription?.en || '';
  const imageUrl = pkg.image?.url || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80';
  const highlights = pkg.menuHighlights?.slice(0, 3) || [];

  const listingText = t.packagesPage.listing;

  // Type badge styling & label
  let badgeClass = 'badge-with-material';
  let badgeLabel = t.packagesPage.listing.filters.withMaterial;
  if (pkg.packageType === 'without-material') {
    badgeClass = 'badge-without-material';
    badgeLabel = t.packagesPage.listing.filters.withoutMaterial;
  } else if (pkg.packageType === 'custom') {
    badgeClass = 'badge-custom';
    badgeLabel = t.packagesPage.listing.filters.custom;
  }

  // Price formatting rule: never display ₹0; display "Price on Request" if amount is not confirmed
  const priceDisplay = pkg.price?.amount
    ? `₹${pkg.price.amount.toLocaleString('en-IN')}`
    : listingText.priceOnRequest;

  return (
    <div className="col-12 col-md-6 col-lg-4 d-flex">
      <div className="card ac-pkg-card w-100 shadow-sm d-flex flex-column">
        {/* Package Image & Type Badge */}
        <div className="ac-pkg-img-wrapper position-relative">
          <img
            src={imageUrl}
            alt={name}
            className="ac-pkg-img"
            loading="lazy"
          />
          <span className={`ac-pkg-type-badge ${badgeClass}`}>
            {badgeLabel}
          </span>
        </div>

        {/* Card Body */}
        <div className="card-body p-4 d-flex flex-column flex-grow-1">
          <h3 className="h5 fw-bold text-dark mb-2">
            {name}
          </h3>
          <p className="text-muted small mb-3 flex-grow-1 line-clamp-2">
            {shortDesc}
          </p>

          {/* Pricing & Min Guests Box */}
          <div className="ac-pkg-price-tag mb-3">
            <div>
              <span className="d-block text-muted" style={{ fontSize: '0.75rem' }}>
                {language === 'mr' ? 'दर अंदाज' : 'Pricing Estimate'}
              </span>
              <span className="fw-bold text-maroon small">
                {priceDisplay}
              </span>
            </div>
            {pkg.minimumGuests && (
              <div className="text-end">
                <span className="d-block text-muted" style={{ fontSize: '0.75rem' }}>
                  {listingText.minGuests}
                </span>
                <span className="fw-semibold text-dark small">
                  {pkg.minimumGuests}+ {listingText.guests}
                </span>
              </div>
            )}
          </div>

          {/* Menu Highlights List */}
          {highlights.length > 0 && (
            <div className="mb-4">
              <span className="d-block text-muted fw-semibold mb-2" style={{ fontSize: '0.75rem' }}>
                {listingText.menuHighlights}:
              </span>
              <div className="d-flex flex-column gap-1">
                {highlights.map((h, i) => (
                  <div key={i} className="ac-pkg-highlight-item">
                    <i className="bi bi-check-circle" />
                    <span className="text-truncate">{h[language] || h.en}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions: View Details & Enquire Now */}
          <div className="d-flex flex-column gap-2 mt-auto pt-2">
            <Link
              to={`/packages/${pkg.slug}`}
              className="btn ac-btn-outline-maroon btn-sm py-2 rounded-3 text-center d-flex align-items-center justify-content-center gap-2"
            >
              <span>{listingText.viewDetails}</span>
              <i className="bi bi-arrow-right" />
            </Link>
            <Link
              to={`/booking?packageType=${pkg.packageType}&packageId=${pkg.slug}`}
              className="btn btn-maroon btn-sm py-2 rounded-3 text-white text-center d-flex align-items-center justify-content-center gap-2"
              style={{ backgroundColor: 'var(--ac-maroon, #641e2b)' }}
            >
              <i className="bi bi-calendar2-check-fill" />
              <span>{listingText.enquireNow}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


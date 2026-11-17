import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function PackageDetailOverview({ pkg }) {
  const { language, t } = useLanguage();

  if (!pkg) return null;

  const fullDesc = pkg.fullDescription?.[language] || pkg.fullDescription?.en || pkg.shortDescription?.[language] || '';
  const priceDisplay = pkg.price?.amount
    ? `₹${pkg.price.amount.toLocaleString('en-IN')}`
    : t.packagesPage.listing.priceOnRequest;

  return (
    <section className="py-5 bg-white" aria-label="Package Overview">
      <div className="container-xl py-3">
        <div className="row g-4 g-lg-5 align-items-start">
          {/* Main Description */}
          <div className="col-12 col-lg-7">
            <span className="badge bg-light-maroon text-maroon px-3 py-2 rounded-pill fw-semibold mb-3">
              {t.packagesPage.detail.overview}
            </span>
            <h2 className="h3 fw-bold text-dark mb-4">
              {pkg.name?.[language] || pkg.name?.en}
            </h2>
            <p className="lead fs-6 text-secondary mb-4 lh-lg">
              {fullDesc}
            </p>

            {/* Quick Specs */}
            <div className="row g-3 mt-2">
              {pkg.minimumGuests && (
                <div className="col-sm-6">
                  <div className="p-3 rounded-3 bg-light border d-flex align-items-center gap-3">
                    <i className="bi bi-people-fill text-maroon fs-3" />
                    <div>
                      <span className="d-block text-muted small">{t.packagesPage.listing.minGuests}</span>
                      <span className="fw-bold text-dark">{pkg.minimumGuests}+ {t.packagesPage.listing.guests}</span>
                    </div>
                  </div>
                </div>
              )}
              {pkg.foodPreferences && pkg.foodPreferences.length > 0 && (
                <div className="col-sm-6">
                  <div className="p-3 rounded-3 bg-light border d-flex align-items-center gap-3">
                    <i className="bi bi-check2-circle text-success fs-3" />
                    <div>
                      <span className="d-block text-muted small">{language === 'mr' ? 'खाद्य पसंती' : 'Food Preference'}</span>
                      <span className="fw-bold text-dark">{pkg.foodPreferences.join(', ')}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pricing & Booking Card */}
          <div className="col-12 col-lg-5">
            <div className="card border rounded-4 p-4 p-md-5 shadow-sm bg-white">
              <span className="text-muted small fw-semibold text-uppercase tracking-wider">
                {language === 'mr' ? 'अंदाजित पॅकेज दर' : 'Package Pricing'}
              </span>
              <div className="d-flex align-items-baseline gap-2 my-2">
                <span className="h2 fw-bold text-maroon mb-0">
                  {priceDisplay}
                </span>
                {pkg.price?.approxPerPerson && (
                  <span className="text-muted small">
                    (~₹{pkg.price.approxPerPerson}/person)
                  </span>
                )}
              </div>
              <p className="text-muted small mb-4">
                {language === 'mr'
                  ? '* प्रत्यक्ष मेनू निवड, कार्यक्रमाची तारीख आणि पाहुण्यांच्या संख्येनुसार अंतिम दर ठरवले जातात.'
                  : '* Final quotation is calculated based on menu selection, event timing, and verified guest count.'}
              </p>

              <div className="d-flex flex-column gap-3">
                <Link
                  to={`/booking?packageType=${pkg.packageType}&packageId=${pkg.slug}`}
                  className="btn btn-maroon py-3 rounded-3 text-white fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                  style={{ backgroundColor: 'var(--ac-maroon, #641e2b)' }}
                >
                  <i className="bi bi-calendar2-check-fill" />
                  <span>{t.packagesPage.detail.enquireBtn}</span>
                </Link>

                <a
                  href="tel:+919975959391"
                  className="btn ac-btn-outline-maroon py-2 rounded-3 text-center fw-semibold d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-telephone-fill" />
                  <span>{language === 'mr' ? 'कॉल करा: +91 9975959391' : 'Call: +91 9975959391'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


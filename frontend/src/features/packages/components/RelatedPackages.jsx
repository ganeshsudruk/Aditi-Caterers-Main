import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function RelatedPackages({ packages = [] }) {
  const { language, t } = useLanguage();

  if (!packages || packages.length === 0) return null;

  const detailText = t.packagesPage?.detail || {};
  const listingText = t.packagesPage?.listing || {};
  const sectionTitle = detailText.relatedTitle || (language === 'mr' ? 'इतर केटरिंग पॅकेजेस पहा' : 'Explore Related Packages');
  const viewDetailsText = listingText.viewDetails || (language === 'mr' ? 'अधिक माहिती' : 'View Details');
  const priceOnRequestText = listingText.priceOnRequest || (language === 'mr' ? 'किंमत माहितीसाठी संपर्क साधा' : 'Price on Request');

  return (
    <section className="py-5 ac-bg-light" aria-label="Related Catering Packages">
      <div className="container-xl py-3">
        {/* Section Heading */}
        <SectionHeading
          tag={language === 'mr' ? 'पर्याय' : 'Other Options'}
          title={sectionTitle}
          centered={true}
        />

        {/* Cards Row */}
        <div className="row g-4 mt-2 justify-content-center">
          {packages.map((pkg) => {
            const pName = pkg.name?.[language] || pkg.name?.en || pkg.slug;
            const pDesc = pkg.shortDescription?.[language] || pkg.shortDescription?.en || '';
            const pImg = pkg.image?.url || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80';
            const priceAmount = pkg.price?.amount || pkg.pricing?.amount;
            const priceDisplay = priceAmount
              ? `₹${priceAmount.toLocaleString('en-IN')}`
              : priceOnRequestText;

            return (
              <div key={pkg.id || pkg.slug} className="col-12 col-md-6 col-lg-4 d-flex">
                <div className="card ac-pkg-card w-100 rounded-4 overflow-hidden border shadow-sm d-flex flex-column">
                  <div className="ac-pkg-img-wrapper position-relative" style={{ height: '200px' }}>
                    <img
                      src={pImg}
                      alt={pName}
                      className="ac-pkg-img"
                      loading="lazy"
                    />
                    <span className="ac-pkg-price-badge position-absolute top-0 end-0 m-3 badge bg-white text-dark shadow-sm px-3 py-2 rounded-pill fw-bold">
                      {priceDisplay}
                    </span>
                  </div>

                  <div className="card-body p-4 d-flex flex-column flex-grow-1">
                    <h3 className="h6 fw-bold text-dark mb-2">
                      {pName}
                    </h3>
                    <p className="text-muted small mb-3 flex-grow-1">
                      {pDesc}
                    </p>
                    <Link
                      to={`/packages/${pkg.slug}`}
                      className="btn ac-btn-outline-maroon btn-sm py-2 rounded-3 text-center mt-auto d-flex align-items-center justify-content-center gap-2"
                    >
                      <span>{viewDetailsText}</span>
                      <i className="bi bi-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


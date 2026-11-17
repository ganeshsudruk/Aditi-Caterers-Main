import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function ServiceMenuSuggestions({ service }) {
  const { language, t } = useLanguage();

  if (!service || !service.menuCategories || service.menuCategories.length === 0) {
    return null;
  }

  const detailText = t.servicesPage.detail;

  return (
    <section className="py-5 ac-bg-light" aria-label="Suggested Menu Categories">
      <div className="container-xl py-3">
        {/* Section Heading */}
        <SectionHeading
          tag={language === 'mr' ? 'स्वादिष्ट मेनू' : 'Delicious Menu'}
          title={detailText.menuSuggestions}
          centered={true}
        />

        {/* Menu Categories Grid */}
        <div className="row g-3 g-md-4 mt-2 justify-content-center">
          {service.menuCategories.map((cat) => {
            const label = cat[language] || cat.en;

            return (
              <div key={cat.id} className="col-12 col-sm-6 col-md-4">
                <div className="ac-menu-category-card shadow-sm h-100">
                  <div className="ac-menu-cat-icon">
                    <i className={`bi ${cat.icon || 'bi-egg-fried'}`} />
                  </div>
                  <span className="fw-semibold text-dark fs-6">
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Note & Explore Menu CTA */}
        <div className="text-center mt-4">
          <p className="text-muted small mb-4 italic" style={{ maxWidth: '700px', margin: '0 auto' }}>
            {detailText.menuDisclaimer}
          </p>

          <Link
            to="/menu"
            className="btn ac-btn-outline-maroon px-4 py-2 rounded-pill fw-semibold d-inline-flex align-items-center gap-2"
          >
            <i className="bi bi-book-half" />
            <span>{detailText.exploreMenuBtn}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

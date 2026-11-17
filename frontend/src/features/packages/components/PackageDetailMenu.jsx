import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function PackageDetailMenu({ pkg }) {
  const { language, t } = useLanguage();

  if (!pkg) return null;

  const detailText = t.packagesPage.detail;
  const menuHighlights = pkg.menuHighlights || [];
  const sampleMenuStructure = pkg.sampleMenuStructure || [];

  return (
    <section className="py-5 ac-bg-light" aria-label="Package Food Menu Highlights">
      <div className="container-xl py-3">
        {/* Section Heading */}
        <SectionHeading
          tag={language === 'mr' ? 'खास चव' : 'Culinary Highlights'}
          title={detailText.foodMenu}
          centered={true}
        />

        {/* If package has a structured menu with categories (like Section 5.5.1 budget packages) */}
        {sampleMenuStructure.length > 0 ? (
          <div className="card border rounded-4 p-4 p-md-5 mt-4 shadow-sm bg-white mx-auto" style={{ maxWidth: '840px' }}>
            <h3 className="h6 fw-bold text-maroon mb-3 text-uppercase tracking-wider">
              {language === 'mr' ? 'समाविष्ट मेनू रचना' : 'Included Menu Breakdown'}
            </h3>
            <div className="d-flex flex-column gap-3">
              {sampleMenuStructure.map((m, idx) => (
                <div key={idx} className="p-3 rounded-3 bg-light border d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <div>
                    <strong className="text-dark">{m.category[language] || m.category.en}:</strong>{' '}
                    <span className="text-muted">{m.items[language] || m.items.en}</span>
                  </div>
                  {m.isAlternative && (
                    <span className="ac-alternative-badge">
                      {language === 'mr' ? 'कोणताही एक पर्याय' : 'Choose Any One'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* General Highlights Grid */
          <div className="row g-3 g-md-4 mt-2 justify-content-center">
            {menuHighlights.map((item, idx) => {
              const label = item[language] || item.en;

              return (
                <div key={idx} className="col-12 col-md-6 col-lg-4">
                  <div className="ac-menu-category-card shadow-sm h-100 bg-white">
                    <div className="ac-menu-cat-icon">
                      <i className="bi bi-egg-fried" />
                    </div>
                    <span className="fw-semibold text-dark fs-6">
                      {label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Disclaimer Note & Explore Menu CTA */}
        <div className="text-center mt-4">
          <p className="text-muted small mb-4 italic mx-auto" style={{ maxWidth: '720px' }}>
            {detailText.menuDisclaimer}
          </p>

          <Link
            to="/menu"
            className="btn ac-btn-outline-maroon px-4 py-2 rounded-pill fw-semibold d-inline-flex align-items-center gap-2"
          >
            <i className="bi bi-book-half" />
            <span>{language === 'mr' ? 'संपूर्ण मेनू पहा' : 'Explore Full Food Menu'}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}


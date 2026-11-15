import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function PopularFoodCategories({ categories = [] }) {
  const { t } = useLanguage();

  return (
    <section className="ac-food-categories py-5 ac-bg-light" aria-label="Explore Our Food Menu">
      <div className="container-xl py-4">
        
        {/* Section Heading */}
        <SectionHeading
          tag={t.home.foodMenu.tag}
          title={t.home.foodMenu.title}
          description={t.home.foodMenu.description}
        />

        {/* Categories Grid */}
        <div className="row g-4 mt-2">
          {categories.map((cat) => {
            const title = t.menu[cat.key] || cat.name || cat.key;
            const description =
              t.home.foodMenu.categories?.[cat.key] ||
              cat.description ||
              'Authentic flavors prepared with traditional recipes.';

            return (
              <div key={cat.id || cat.key} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                <Link
                  to={cat.route || `/menu/${cat.key}`}
                  className="ac-food-cat-card text-decoration-none d-block h-100 bg-white rounded-4 overflow-hidden border shadow-sm transition"
                >
                  {/* Category Image */}
                  <div className="ac-food-img-wrap position-relative overflow-hidden">
                    <img
                      src={cat.image}
                      alt={title}
                      className="w-100 h-100 object-fit-cover ac-food-img"
                      loading="lazy"
                    />
                    <div className="ac-food-veg-pill position-absolute top-0 start-0 m-3">
                      <span className="badge bg-success text-white px-2 py-1 rounded-pill small">
                        <i className="bi bi-circle-fill me-1" style={{ fontSize: '0.5rem' }} />
                        {t.home.foodMenu.pureVeg}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-3 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <h4 className="h6 fw-bold text-dark mb-0">
                          {title}
                        </h4>
                        <i className={`bi ${cat.icon || 'bi-egg-fried'} text-maroon`} />
                      </div>
                      <p className="text-muted extra-small mb-2 text-truncate-2">
                        {description}
                      </p>
                    </div>

                    <div className="d-flex align-items-center justify-content-between pt-2 border-top border-light-subtle">
                      <span className="extra-small text-maroon fw-semibold">
                        {t.home.foodMenu.viewCategory}
                      </span>
                      <i className="bi bi-arrow-right text-maroon small" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* View Full Menu CTA */}
        <div className="text-center mt-5">
          <Link
            to="/menu"
            className="btn ac-btn-primary px-4 py-2 d-inline-flex align-items-center gap-2"
          >
            <i className="bi bi-book-half" />
            <span>{t.home.foodMenu.viewFullMenu}</span>
          </Link>
        </div>

      </div>
    </section>
  );
}

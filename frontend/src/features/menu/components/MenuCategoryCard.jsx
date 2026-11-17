import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function MenuCategoryCard({ category }) {
  const { language, t } = useLanguage();

  if (!category) return null;

  const name = category.name?.[language] || category.name?.en || category.slug;
  const desc = category.shortDescription?.[language] || category.shortDescription?.en || '';
  const imgUrl = category.image?.url || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80';
  const icon = category.icon || 'bi-cup-hot-fill';
  const count = category.itemCount || 8;

  const btnText = t.menuPage?.categories?.exploreBtn || (language === 'mr' ? 'पदार्थ पहा' : 'Explore Category');
  const itemsText = language === 'mr' ? 'पदार्थ' : 'Dishes';

  return (
    <div className="col-12 col-md-6 col-lg-3 d-flex">
      <div className="card ac-category-card w-100 shadow-sm">
        {/* Category Image with Icon & Count Badges */}
        <div className="ac-category-img-wrapper">
          <img
            src={imgUrl}
            alt={name}
            className="ac-category-img"
            loading="lazy"
          />
          <div className="ac-category-icon-badge">
            <i className={`bi ${icon}`} />
          </div>
          <span className="ac-category-count-badge">
            {count}+ {itemsText}
          </span>
        </div>

        {/* Card Body */}
        <div className="card-body p-4 d-flex flex-column flex-grow-1">
          <h3 className="h6 fw-bold text-dark mb-2">
            {name}
          </h3>
          <p className="text-muted small mb-3 flex-grow-1 line-clamp-2">
            {desc}
          </p>

          <Link
            to={`/menu/${category.slug}`}
            className="btn ac-btn-outline-maroon btn-sm py-2 rounded-3 text-center mt-auto d-flex align-items-center justify-content-center gap-2"
          >
            <span>{btnText}</span>
            <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
}

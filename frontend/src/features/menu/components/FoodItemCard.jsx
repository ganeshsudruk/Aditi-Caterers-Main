import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { useMenuSelection } from '../../../context/MenuSelectionContext';

export default function FoodItemCard({ item, onQuickView }) {
  const { language, t } = useLanguage();
  const { toggleItem, isItemSelected } = useMenuSelection();

  if (!item) return null;

  const isSelected = isItemSelected(item.id);
  const name = item.name?.[language] || item.name?.en || item.slug;
  const desc = item.shortDescription?.[language] || item.shortDescription?.en || '';
  const imgUrl = item.image?.url || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80';
  const spice = item.spiceLevel ?? 1;

  const itemsText = t.menuPage?.items || {};
  const addText = itemsText.addToMenu || (language === 'mr' ? '+ मेनूमध्ये जोडा' : '+ Add to Menu');
  const selectedText = itemsText.selected || (language === 'mr' ? '✓ समाविष्ट केले' : '✓ Shortlisted');
  const detailsText = itemsText.viewDetails || (language === 'mr' ? 'तपशील' : 'Details');

  return (
    <div className="col-12 col-md-6 col-lg-4 d-flex">
      <div className={`card ac-food-card w-100 shadow-sm ${isSelected ? 'border-maroon' : ''}`}>
        {/* Dish Image with Dietary & Spice Indicators */}
        <div className="ac-food-img-wrapper position-relative">
          <img
            src={imgUrl}
            alt={name}
            className="ac-food-img"
            loading="lazy"
          />

          {/* Top Left: Veg Symbol & Jain Tag */}
          <div className="position-absolute top-0 start-0 m-3 d-flex align-items-center gap-2">
            <span className="ac-veg-symbol" title="100% Vegetarian" />
            {item.dietary?.isJain && (
              <span className="ac-jain-badge">
                {language === 'mr' ? 'जैन उपलब्ध' : 'Jain Opt'}
              </span>
            )}
            {item.isChefSpecial && (
              <span className="ac-chef-badge">
                <i className="bi bi-star-fill me-1" />
                {language === 'mr' ? 'खास' : 'Special'}
              </span>
            )}
          </div>

          {/* Top Right: Spice Meter */}
          <div className="position-absolute top-0 end-0 m-3 bg-white bg-opacity-90 px-2 py-1 rounded-pill shadow-sm">
            <span className="ac-spice-meter" title={`Spice Level: ${spice}/3`}>
              {[1, 2, 3].map((lvl) => (
                <i
                  key={lvl}
                  className={`bi bi-fire ${lvl <= spice ? 'ac-spice-active' : 'ac-spice-inactive'}`}
                  style={{ fontSize: '0.8rem' }}
                />
              ))}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body p-4 d-flex flex-column flex-grow-1">
          {/* Dish Header */}
          <div className="ac-food-card-header mb-1">
            <h3 className="h6 fw-bold text-dark mb-1 text-truncate" title={name}>
              {name}
            </h3>
            {item.servingStyle && (
              <span className="text-muted d-block text-truncate" style={{ fontSize: '0.78rem' }}>
                <i className="bi bi-award me-1 text-maroon" />
                {item.servingStyle[language] || item.servingStyle.en}
              </span>
            )}
          </div>

          {/* Scrollable Description & Key Notes */}
          <div className="ac-food-card-scroll flex-grow-1 mt-2">
            <p className="text-secondary small mb-2" style={{ fontSize: '0.85rem' }}>
              {desc}
            </p>

            {item.ingredients && (
              <div className="mt-2">
                <span className="d-block text-muted small fw-semibold mb-1" style={{ fontSize: '0.74rem' }}>
                  {language === 'mr' ? 'मुख्य घटक:' : 'Key Ingredients:'}
                </span>
                <div className="d-flex flex-wrap gap-1">
                  {(item.ingredients[language] || item.ingredients.en || []).slice(0, 4).map((ing, idx) => (
                    <span key={idx} className="badge bg-light text-dark border small" style={{ fontSize: '0.7rem' }}>
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Fixed Footer with Shortlist Toggle & Details Link */}
          <div className="ac-food-card-footer mt-auto pt-2">
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className={`btn btn-sm w-100 ac-btn-shortlist d-flex align-items-center justify-content-center gap-2 ${
                  isSelected ? 'active' : ''
                }`}
                onClick={() => toggleItem(item)}
              >
                <i className={`bi ${isSelected ? 'bi-check-circle-fill' : 'bi-plus-circle'}`} />
                <span>{isSelected ? selectedText : addText}</span>
              </button>

              <Link
                to={`/menu/${item.categorySlug || 'all'}/${item.slug}`}
                className="btn btn-sm btn-outline-secondary rounded-3 px-3 py-2"
                title={detailsText}
                onClick={onQuickView ? (e) => { e.preventDefault(); onQuickView(item); } : undefined}
              >
                <i className="bi bi-eye" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

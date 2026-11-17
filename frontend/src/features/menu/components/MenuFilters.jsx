import { useLanguage } from '../../../context/LanguageContext';

export default function MenuFilters({
  dietaryFilter,
  setDietaryFilter,
  spiceFilter,
  setSpiceFilter,
  categories = [],
  activeCategory,
  onSelectCategory,
}) {
  const { language, t } = useLanguage();
  const fText = t.menuPage?.filters || {};

  return (
    <div className="ac-menu-filter-bar mb-4">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
        {/* Dietary Filters */}
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <span className="small fw-bold text-dark me-1 d-none d-sm-inline">
            <i className="bi bi-funnel-fill text-maroon me-1" />
            {fText.dietaryLabel || (language === 'mr' ? 'आहार प्रकार:' : 'Dietary:')}
          </span>

          <button
            type="button"
            className={`ac-filter-pill-btn ${dietaryFilter === 'all' ? 'active' : ''}`}
            onClick={() => setDietaryFilter('all')}
          >
            {fText.all || (language === 'mr' ? 'सर्व' : 'All')}
          </button>

          <button
            type="button"
            className={`ac-filter-pill-btn ${dietaryFilter === 'veg' ? 'active' : ''}`}
            onClick={() => setDietaryFilter('veg')}
          >
            <span className="ac-veg-symbol me-1" style={{ width: '14px', height: '14px' }} />
            {fText.pureVeg || (language === 'mr' ? 'शाकाहारी' : 'Pure Veg')}
          </button>

          <button
            type="button"
            className={`ac-filter-pill-btn ${dietaryFilter === 'jain' ? 'active' : ''}`}
            onClick={() => setDietaryFilter('jain')}
          >
            <i className="bi bi-peace text-success me-1" />
            {fText.jain || (language === 'mr' ? 'जैन अनुकूल' : 'Jain Friendly')}
          </button>
        </div>

        {/* Spice Level Filters */}
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <span className="small fw-bold text-dark me-1 d-none d-sm-inline">
            <i className="bi bi-fire text-danger me-1" />
            {fText.spiceLabel || (language === 'mr' ? 'तिखटपणा:' : 'Spice:')}
          </span>

          <select
            className="form-select form-select-sm rounded-pill border px-3"
            style={{ width: 'auto', minWidth: '130px', fontSize: '0.85rem' }}
            value={spiceFilter}
            onChange={(e) => setSpiceFilter(e.target.value)}
          >
            <option value="all">{fText.allSpices || (language === 'mr' ? 'सर्व तिखटपणा' : 'All Spice Levels')}</option>
            <option value="0">{language === 'mr' ? 'गोड / कमी तिखट (Mild)' : 'Mild (Sweet / Less Spicy)'}</option>
            <option value="1">{language === 'mr' ? 'मध्यम (Medium)' : 'Medium Spicy'}</option>
            <option value="2">{language === 'mr' ? 'झणझणीत (Spicy)' : 'Hot & Spicy'}</option>
            <option value="3">{language === 'mr' ? 'अति तिखट (Extra Spicy)' : 'Extra Spicy'}</option>
          </select>

          {/* Optional Category Dropdown if categories provided */}
          {categories.length > 0 && onSelectCategory && (
            <select
              className="form-select form-select-sm rounded-pill border px-3"
              style={{ width: 'auto', minWidth: '150px', fontSize: '0.85rem' }}
              value={activeCategory}
              onChange={(e) => onSelectCategory(e.target.value)}
            >
              <option value="all">{fText.allCategories || (language === 'mr' ? 'सर्व विभाग' : 'All Categories')}</option>
              {categories.map((c) => (
                <option key={c.id || c.slug} value={c.slug}>
                  {c.name[language] || c.name.en}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}

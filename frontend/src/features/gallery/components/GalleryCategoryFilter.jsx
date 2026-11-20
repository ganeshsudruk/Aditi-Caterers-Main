import { useLanguage } from '../../../context/LanguageContext';

export default function GalleryCategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
  counts = {},
  totalCount = 0,
}) {
  const { language } = useLanguage();

  return (
    <nav
      className="ac-gallery-categories-wrapper"
      aria-label={language === 'mr' ? 'गॅलरी प्रकार' : 'Gallery Categories'}
    >
      {categories.map((cat) => {
        const catName = cat.name?.[language] || cat.name?.en || cat.slug;
        const count = cat.slug === 'all' ? totalCount : counts[cat.slug] || 0;
        const isActive = activeCategory === cat.slug;

        return (
          <button
            key={cat.id || cat.slug}
            type="button"
            className={`ac-gallery-category-pill ${isActive ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.slug)}
            aria-pressed={isActive}
          >
            {cat.icon && <i className={`bi ${cat.icon}`} aria-hidden="true" />}
            <span>{catName}</span>
            <span className="ac-gallery-count-badge">{count}</span>
          </button>
        );
      })}
    </nav>
  );
}

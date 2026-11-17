import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { defaultCategories } from '../../../services/menuService';

export default function MenuHero({ searchQuery, setSearchQuery, onSearchSubmit }) {
  const { language, t } = useLanguage();
  const heroText = t.menuPage?.hero || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit(searchQuery);
  };

  return (
    <section className="ac-menu-hero text-white" aria-label="Food Menu Hero">
      <div className="container-xl text-center">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3 d-inline-block">
          <ol className="breadcrumb mb-0 px-3 py-1 bg-white bg-opacity-10 rounded-pill small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-white text-decoration-none">
                <i className="bi bi-house-door-fill me-1" />
                {t.nav?.home || 'Home'}
              </Link>
            </li>
            <li className="breadcrumb-item active text-gold fw-semibold" aria-current="page">
              {t.nav?.menu || 'Food Menu'}
            </li>
          </ol>
        </nav>

        {/* Title & Tagline */}
        <h1 className="display-5 fw-bold mb-3">
          {heroText.heading || (language === 'mr' ? 'आमचा खाद्यपदार्थ मेनू' : 'Our Catering Food Menu')}
        </h1>
        <p className="lead fs-6 text-white-50 mx-auto mb-4" style={{ maxWidth: '720px' }}>
          {heroText.description ||
            (language === 'mr'
              ? 'प्रत्येक समारंभासाठी अस्सल घरगुती चव, दर्जेदार साहित्याची पारंपारिक मेजवानी आणि सानुकूलित मेनू पर्याय.'
              : 'Authentic festive feasts, traditional recipes, pure ghee delicacies, and tailored menus for your special celebrations.')}
        </p>

        {/* Live Search Input */}
        <form onSubmit={handleSubmit} className="ac-menu-hero-search">
          <i className="bi bi-search search-icon" />
          <input
            type="text"
            className="form-control"
            placeholder={heroText.searchPlaceholder || (language === 'mr' ? 'पदार्थाचे नाव किंवा साहित्य शोधा (उदा. मोदक, पुरणपोळी, पनीर)...' : 'Search dishes or ingredients (e.g. Modak, Puran Poli, Paneer)...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Quick Category Badges */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
          {defaultCategories.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              to={`/menu/${cat.slug}`}
              className="badge bg-white bg-opacity-15 text-white text-decoration-none px-3 py-2 rounded-pill small fw-medium"
              style={{ backdropFilter: 'blur(4px)' }}
            >
              <i className={`bi ${cat.icon} me-1 text-gold`} />
              <span>{cat.name[language] || cat.name.en}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

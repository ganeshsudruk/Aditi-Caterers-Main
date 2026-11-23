import { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import {
  defaultCategories,
  defaultMenuItems,
  getCategoryBySlug,
  getMenuItems,
} from '../../../services/menuService';

import '../styles/menu.css';

import MenuFilters from '../components/MenuFilters';
import MenuSearch from '../components/MenuSearch';
import FoodItemCard from '../components/FoodItemCard';
import MenuEnquiryCTA from '../components/MenuEnquiryCTA';
import MenuLoader from '../components/MenuLoader';
import SelectedMenuDrawer from '../components/SelectedMenuDrawer';

export default function MenuCategoryPage() {
  const { category } = useParams();
  const location = useLocation();
  const { language, t } = useLanguage();

  const [categoryData, setCategoryData] = useState(null);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [spiceFilter, setSpiceFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Scroll to top on category change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearchQuery('');
    setDietaryFilter('all');
    setSpiceFilter('all');
  }, [location.pathname]);

  // Load category data and items
  useEffect(() => {
    setLoading(true);
    Promise.all([
      getCategoryBySlug(category).catch(() => {
        return defaultCategories.find((c) => c.slug === category) || null;
      }),
      getMenuItems(category, {}).catch(() => {
        return defaultMenuItems.filter((i) => i.categorySlug === category);
      }),
    ])
      .then(([cat, menuItems]) => {
        setCategoryData(cat);
        setItems(menuItems || []);
        setFilteredItems(menuItems || []);
      })
      .finally(() => setLoading(false));
  }, [category]);

  // Update document title
  useEffect(() => {
    const catName = categoryData?.name?.[language] || categoryData?.name?.en || category;
    document.title = `${catName} | ${t.menuPage?.metaTitle || 'Food Menu | Aditi Caterers'}`;
  }, [categoryData, language, t, category]);

  // Apply filters
  const applyFilters = useCallback(() => {
    let results = [...items];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter((item) => {
        const name = (item.name?.en || '') + ' ' + (item.name?.mr || '');
        const desc = (item.shortDescription?.en || '') + ' ' + (item.shortDescription?.mr || '');
        const ings = [...(item.ingredients?.en || []), ...(item.ingredients?.mr || [])].join(' ');
        return (name + desc + ings).toLowerCase().includes(q);
      });
    }

    if (dietaryFilter === 'veg') {
      results = results.filter((item) => item.dietary?.isVeg);
    } else if (dietaryFilter === 'jain') {
      results = results.filter((item) => item.dietary?.isJain);
    }

    if (spiceFilter !== 'all') {
      const level = parseInt(spiceFilter, 10);
      results = results.filter((item) => (item.spiceLevel ?? 1) === level);
    }

    setFilteredItems(results);
  }, [items, searchQuery, dietaryFilter, spiceFilter]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const menuText = t.menuPage || {};
  const categoryText = menuText.category || {};

  const catName = categoryData?.name?.[language] || categoryData?.name?.en || category;
  const catDesc = categoryData?.shortDescription?.[language] || categoryData?.shortDescription?.en || '';
  const catImg = categoryData?.image?.url || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80';

  // Other categories for navigation
  const otherCategories = defaultCategories.filter((c) => c.slug !== category).slice(0, 6);

  return (
    <>
      {/* Category Hero Banner */}
      <section
        className="ac-category-hero text-white position-relative"
        style={{
          background: `linear-gradient(135deg, rgba(100,30,43,0.88) 0%, rgba(60,15,25,0.92) 100%), url('${catImg}') center/cover no-repeat`,
          minHeight: '340px',
        }}
        aria-label={`${catName} category`}
      >
        <div className="container-xl py-5 d-flex flex-column justify-content-center" style={{ minHeight: '340px' }}>
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb mb-0 px-3 py-1 d-inline-flex bg-white bg-opacity-10 rounded-pill small">
              <li className="breadcrumb-item">
                <Link to="/" className="text-white text-decoration-none">
                  <i className="bi bi-house-door-fill me-1" />
                  {t.nav?.home || 'Home'}
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/menu" className="text-white text-decoration-none">
                  {t.nav?.menu || 'Food Menu'}
                </Link>
              </li>
              <li className="breadcrumb-item active text-gold fw-semibold" aria-current="page">
                {catName}
              </li>
            </ol>
          </nav>

          <h1 className="display-5 fw-bold mb-2">{catName}</h1>
          {catDesc && (
            <p className="lead fs-6 text-white-50 mb-0" style={{ maxWidth: '640px' }}>
              {catDesc}
            </p>
          )}
        </div>
      </section>

      {/* Filter & Search Toolbar */}
      <section className="py-4 bg-white border-bottom">
        <div className="container-xl">
          <div className="d-flex flex-column flex-md-row gap-3 align-items-md-center justify-content-between">
            <MenuFilters
              dietaryFilter={dietaryFilter}
              setDietaryFilter={setDietaryFilter}
              spiceFilter={spiceFilter}
              setSpiceFilter={setSpiceFilter}
            />
            <MenuSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
        </div>
      </section>

      {/* Items Grid */}
      <section className="py-5" style={{ backgroundColor: 'var(--ac-bg-light, #fdf8f0)' }}>
        <div className="container-xl">
          {/* Results count */}
          <p className="text-muted small mb-3">
            <strong>{filteredItems.length}</strong>{' '}
            {categoryText.itemsFound || (language === 'mr' ? 'पदार्थ आढळले' : 'dishes found')}
          </p>

          {loading ? (
            <MenuLoader />
          ) : filteredItems.length > 0 ? (
            <div className="row g-4">
              {filteredItems.map((item) => (
                <FoodItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-search display-4 text-muted mb-3 d-block" />
              <h4 className="text-muted fw-semibold">
                {categoryText.noResults || 'No dishes found matching your filters.'}
              </h4>
              <p className="text-muted small">
                {categoryText.tryDifferent || 'Try a different filter or search term.'}
              </p>
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill px-4 mt-2"
                onClick={() => {
                  setSearchQuery('');
                  setDietaryFilter('all');
                  setSpiceFilter('all');
                }}
              >
                <i className="bi bi-arrow-counterclockwise me-2" />
                {categoryText.resetFilters || (language === 'mr' ? 'फिल्टर रीसेट करा' : 'Reset Filters')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Other Categories Quick Nav */}
      {otherCategories.length > 0 && (
        <section className="py-5 bg-white border-top">
          <div className="container-xl">
            <h2 className="h5 fw-bold mb-4 text-center" style={{ color: 'var(--ac-maroon, #641e2b)' }}>
              <i className="bi bi-grid-3x3-gap me-2" />
              {language === 'mr' ? 'इतर मेनू प्रकार' : 'Explore Other Categories'}
            </h2>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {otherCategories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/menu/${cat.slug}`}
                  className="btn btn-outline-secondary rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2"
                >
                  <i className={`bi ${cat.icon}`} style={{ color: 'var(--ac-maroon, #641e2b)' }} />
                  <span>{cat.name[language] || cat.name.en}</span>
                </Link>
              ))}
              <Link
                to="/menu"
                className="btn rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 text-white"
                style={{ backgroundColor: 'var(--ac-maroon, #641e2b)' }}
              >
                <i className="bi bi-list-ul" />
                <span>{language === 'mr' ? 'सर्व मेनू पहा' : 'View Full Menu'}</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <MenuEnquiryCTA />

      {/* Floating Shortlist Drawer */}
      <SelectedMenuDrawer />
    </>
  );
}

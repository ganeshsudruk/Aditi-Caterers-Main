import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import {
  getAllCategories,
  getFeaturedDishes,
  getMenuItems,
} from '../../../services/menuService';

import '../styles/menu.css';

import MenuHero from '../components/MenuHero';
import MenuIntroduction from '../components/MenuIntroduction';
import MenuCategoriesGrid from '../components/MenuCategoriesGrid';
import PopularDishes from '../components/PopularDishes';
import MenuFilters from '../components/MenuFilters';
import MenuSearch from '../components/MenuSearch';
import FoodItemCard from '../components/FoodItemCard';
import MenuHygiene from '../components/MenuHygiene';
import MenuFAQ from '../components/MenuFAQ';
import MenuEnquiryCTA from '../components/MenuEnquiryCTA';
import MenuLoader from '../components/MenuLoader';
import SelectedMenuDrawer from '../components/SelectedMenuDrawer';
import ContactPreview from '../../home/components/ContactPreview';
import SectionHeading from '../../../components/common/SectionHeading';

export default function FoodMenuPage() {
  const { language, t } = useLanguage();

  const [categories, setCategories] = useState([]);
  const [featuredDishes, setFeaturedDishes] = useState([]);
  const [allDishes, setAllDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [spiceFilter, setSpiceFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(null);

  // Set document title
  useEffect(() => {
    document.title = t.menuPage?.metaTitle || 'Food Menu | Aditi Caterers';
  }, [language, t]);

  const loadMenuData = useCallback(() => {
    setLoading(true);
    setServerError(null);

    Promise.all([
      getAllCategories(),
      getFeaturedDishes(),
      getMenuItems(null, {}),
    ])
      .then(([cats, featured, items]) => {
        setCategories(cats || []);
        setFeaturedDishes(featured || []);
        setAllDishes(items || []);
        setFilteredDishes(items || []);
        setServerError(null);
      })
      .catch((err) => {
        console.error('Failed to load menu data from backend:', err);
        setServerError(
          language === 'mr'
            ? 'सर्व्हरशी संपर्क होऊ शकला नाही. कृपया बॅकएंड सर्व्हर सुरू असल्याची खात्री करा आणि पुन्हा प्रयत्न करा.'
            : 'Unable to connect to the backend server. Please ensure the backend server is running and try again.'
        );
        setCategories([]);
        setFeaturedDishes([]);
        setAllDishes([]);
        setFilteredDishes([]);
      })
      .finally(() => setLoading(false));
  }, [language]);

  // Load data on mount and refresh when returning to the tab
  useEffect(() => {
    loadMenuData();

    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === 'visible') {
        loadMenuData();
      }
    };

    window.addEventListener('focus', handleVisibilityOrFocus);
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);
    return () => {
      window.removeEventListener('focus', handleVisibilityOrFocus);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
    };
  }, [loadMenuData]);

  // Apply filters client-side
  const applyFilters = useCallback(() => {
    let results = [...allDishes];

    // Category Filter
    if (categoryFilter && categoryFilter !== 'all') {
      const catLower = categoryFilter.toLowerCase();
      results = results.filter((item) => {
        const itemCatSlug = (item.categorySlug || '').toLowerCase();
        const itemCatId = (item.categoryId || '').toString().toLowerCase();
        const itemCatObjSlug = (item.category?.slug || '').toLowerCase();
        const itemCatObjId = (item.category?._id || item.category?.id || '').toString().toLowerCase();
        return (
          itemCatSlug === catLower ||
          itemCatId === catLower ||
          itemCatObjSlug === catLower ||
          itemCatObjId === catLower
        );
      });
    }

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

    setFilteredDishes(results);
  }, [allDishes, categoryFilter, searchQuery, dietaryFilter, spiceFilter]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const menuText = t.menuPage || {};
  const categoryText = menuText.category || {};

  return (
    <>
      {/* Hero with Search */}
      <MenuHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={setSearchQuery}
        categories={categories}
      />

      {/* Introduction */}
      <MenuIntroduction />

      {/* Categories Grid */}
      {categories.length > 0 && <MenuCategoriesGrid categories={categories} />}

      {/* Popular / Featured Dishes */}
      {featuredDishes.length > 0 && (
        <PopularDishes dishes={featuredDishes} />
      )}

      {/* All Dishes Section */}
      <section className="py-5" style={{ backgroundColor: 'var(--ac-bg-light, #fdf8f0)' }} id="all-dishes" aria-label="All Menu Dishes">
        <div className="container-xl py-2">
          <SectionHeading
            tag={language === 'mr' ? 'संपूर्ण मेनू' : 'Full Menu'}
            title={language === 'mr' ? 'सर्व पदार्थ पहा' : 'Browse All Dishes'}
            description={language === 'mr' ? 'आमच्या खाद्यमेनूतून तुमच्या आवडीचे पदार्थ निवडा आणि शॉर्टलिस्ट करा.' : 'Browse our complete catering menu and shortlist your favorite dishes for your event.'}
            centered={true}
          />

          {/* Server Connection Error Alert */}
          {serverError && (
            <div className="alert alert-danger d-flex align-items-center justify-content-between p-4 my-4 rounded-4 shadow-sm" role="alert">
              <div className="d-flex align-items-center gap-3">
                <i className="bi bi-exclamation-triangle-fill fs-2 text-danger" />
                <div>
                  <h5 className="alert-heading mb-1 fw-bold">
                    {language === 'mr' ? 'सर्व्हर कनेक्शन त्रुटी' : 'Server Connection Error'}
                  </h5>
                  <p className="mb-0 text-muted small">{serverError}</p>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-danger btn-sm rounded-pill px-4"
                onClick={loadMenuData}
              >
                <i className="bi bi-arrow-clockwise me-1" />
                {language === 'mr' ? 'पुन्हा प्रयत्न करा' : 'Retry'}
              </button>
            </div>
          )}

          {/* Filters & Search Toolbar (Only rendered if no server error) */}
          {!serverError && (
            <div className="d-flex flex-column flex-md-row gap-3 align-items-md-center justify-content-between mb-4 mt-4">
              <MenuFilters
                dietaryFilter={dietaryFilter}
                setDietaryFilter={setDietaryFilter}
                spiceFilter={spiceFilter}
                setSpiceFilter={setSpiceFilter}
                categories={categories}
                activeCategory={categoryFilter}
                onSelectCategory={setCategoryFilter}
              />
              <MenuSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          )}

          {/* Results Count */}
          {!serverError && (
            <p className="text-muted small mb-3">
              <strong>{filteredDishes.length}</strong>{' '}
              {categoryText.itemsFound || (language === 'mr' ? 'पदार्थ आढळले' : 'dishes found')}
            </p>
          )}

          {loading ? (
            <MenuLoader />
          ) : serverError ? null : filteredDishes.length > 0 ? (
            <div className="row g-4">
              {filteredDishes.map((item) => (
                <FoodItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : allDishes.length === 0 ? (
            /* Database Empty State */
            <div className="text-center py-5">
              <i className="bi bi-journal-x display-4 text-muted mb-3 d-block" />
              <h4 className="text-muted fw-semibold">
                {language === 'mr' ? 'कोणतेही मेनू आयटम उपलब्ध नाहीत.' : 'No menu items available.'}
              </h4>
              <p className="text-muted small">
                {language === 'mr'
                  ? 'कृपया डेटाबेसमध्ये नवीन मेनू आयटम जोडण्यासाठी ॲडमिन पॅनेल तपासा.'
                  : 'Please check the admin panel to add menu items to the database.'}
              </p>
            </div>
          ) : (
            /* Filter Empty State */
            <div className="text-center py-5">
              <i className="bi bi-search display-4 text-muted mb-3 d-block" />
              <h4 className="text-muted fw-semibold">
                {categoryText.noResults || (language === 'mr' ? 'तुमच्या फिल्टरनुसार कोणते पदार्थ आढळले नाहीत.' : 'No dishes found matching your filters.')}
              </h4>
              <p className="text-muted small">
                {categoryText.tryDifferent || (language === 'mr' ? 'वेगळा फिल्टर किंवा शोध शब्द वापरा.' : 'Try a different filter or search term.')}
              </p>
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill px-4 mt-2"
                onClick={() => {
                  setSearchQuery('');
                  setDietaryFilter('all');
                  setSpiceFilter('all');
                  setCategoryFilter('all');
                }}
              >
                <i className="bi bi-arrow-counterclockwise me-2" />
                {categoryText.resetFilters || (language === 'mr' ? 'फिल्टर रीसेट करा' : 'Reset Filters')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Hygiene Standards */}
      <MenuHygiene />

      {/* FAQ */}
      <MenuFAQ />

      {/* CTA */}
      <MenuEnquiryCTA />

      {/* Contact Preview */}
      <ContactPreview />

      {/* Floating Shortlist Drawer */}
      <SelectedMenuDrawer />
    </>
  );
}

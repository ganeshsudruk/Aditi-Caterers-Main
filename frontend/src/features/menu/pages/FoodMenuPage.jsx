import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import {
  defaultCategories,
  defaultMenuItems,
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

  const [categories, setCategories] = useState(defaultCategories);
  const [featuredDishes, setFeaturedDishes] = useState([]);
  const [allDishes, setAllDishes] = useState(defaultMenuItems);
  const [filteredDishes, setFilteredDishes] = useState(defaultMenuItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [spiceFilter, setSpiceFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Set document title
  useEffect(() => {
    document.title = t.menuPage?.metaTitle || 'Food Menu | Aditi Caterers';
  }, [language, t]);

  // Load data on mount
  useEffect(() => {
    setLoading(true);
    Promise.all([
      getAllCategories().catch(() => defaultCategories),
      getFeaturedDishes().catch(() => []),
      getMenuItems(null, {}).catch(() => defaultMenuItems),
    ])
      .then(([cats, featured, items]) => {
        setCategories(cats || defaultCategories);
        setFeaturedDishes(featured || []);
        setAllDishes(items || defaultMenuItems);
        setFilteredDishes(items || defaultMenuItems);
      })
      .finally(() => setLoading(false));
  }, []);

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
      />

      {/* Introduction */}
      <MenuIntroduction />

      {/* Categories Grid */}
      <MenuCategoriesGrid categories={categories} />

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

          {/* Filters & Search Toolbar */}
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

          {/* Results Count */}
          <p className="text-muted small mb-3">
            <strong>{filteredDishes.length}</strong>{' '}
            {categoryText.itemsFound || (language === 'mr' ? 'पदार्थ आढळले' : 'dishes found')}
          </p>

          {loading ? (
            <MenuLoader />
          ) : filteredDishes.length > 0 ? (
            <div className="row g-4">
              {filteredDishes.map((item) => (
                <FoodItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            /* Empty State */
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

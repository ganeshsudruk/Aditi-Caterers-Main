import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { useMenuSelection } from '../../../context/MenuSelectionContext';
import {
  defaultCategories,
  defaultMenuItems,
  getMenuItemById,
  getMenuItems,
} from '../../../services/menuService';

import '../styles/menu.css';

import MenuEnquiryCTA from '../components/MenuEnquiryCTA';
import MenuLoader from '../components/MenuLoader';
import SelectedMenuDrawer from '../components/SelectedMenuDrawer';
import FoodItemCard from '../components/FoodItemCard';

export default function FoodItemDetailsPage() {
  const { category, itemId } = useParams();
  const { language, t } = useLanguage();
  const { toggleItem, isItemSelected } = useMenuSelection();

  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const menuText = t.menuPage || {};
  const detailText = menuText.detail || {};
  const notFoundText = menuText.notFound || {};

  // Load item data
  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    Promise.all([
      getMenuItemById(itemId).catch(() => {
        return defaultMenuItems.find((i) => i.slug === itemId || i.id === itemId) || null;
      }),
      getMenuItems(category, {}).catch(() => {
        return defaultMenuItems.filter((i) => i.categorySlug === category);
      }),
    ])
      .then(([foundItem, catItems]) => {
        if (!foundItem) {
          setNotFound(true);
        } else {
          setItem(foundItem);
          // Get 3 related items (same category, excluding current)
          const related = (catItems || [])
            .filter((i) => i.id !== foundItem.id && i.slug !== foundItem.slug)
            .slice(0, 3);
          setRelatedItems(related);
        }
      })
      .finally(() => setLoading(false));
  }, [category, itemId]);

  // Set document title
  useEffect(() => {
    if (item) {
      const name = item.name?.[language] || item.name?.en || '';
      document.title = `${name} | ${menuText.metaTitle || 'Food Menu | Aditi Caterers'}`;
    }
  }, [item, language, menuText]);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [itemId]);

  if (loading) return <MenuLoader />;

  // Not Found State
  if (notFound) {
    return (
      <section className="py-5 text-center">
        <div className="container-xl py-5">
          <i className="bi bi-exclamation-triangle-fill display-4 text-muted mb-4 d-block" />
          <h2 className="fw-bold text-muted">
            {notFoundText.title || (language === 'mr' ? 'पदार्थ आढळला नाही' : 'Dish Not Found')}
          </h2>
          <p className="text-muted mb-4">
            {notFoundText.message || (language === 'mr' ? 'माफ करा, तुम्ही शोधत असलेला पदार्थ सापडला नाही.' : 'Sorry, the dish you are looking for could not be found.')}
          </p>
          <Link to="/menu" className="btn rounded-pill px-4 py-2 text-white" style={{ backgroundColor: 'var(--ac-maroon, #641e2b)' }}>
            <i className="bi bi-arrow-left me-2" />
            {notFoundText.backBtn || (language === 'mr' ? 'मेनूकडे परत जा' : 'Back to Menu')}
          </Link>
        </div>
      </section>
    );
  }

  if (!item) return null;

  const name = item.name?.[language] || item.name?.en || '';
  const description = item.description?.[language] || item.description?.en || item.shortDescription?.[language] || item.shortDescription?.en || '';
  const imgUrl = item.image?.url || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80';
  const imgAlt = item.image?.alt?.[language] || item.image?.alt?.en || name;
  const spice = item.spiceLevel ?? 1;
  const isSelected = isItemSelected(item.id);
  const ingredients = item.ingredients?.[language] || item.ingredients?.en || [];
  const servingStyle = item.servingStyle?.[language] || item.servingStyle?.en || '';
  const idealFor = item.idealFor?.[language] || item.idealFor?.en || '';

  const catData = defaultCategories.find((c) => c.slug === category);
  const catName = catData?.name?.[language] || catData?.name?.en || category;

  const waMsg =
    language === 'mr'
      ? `नमस्कार अदिती केटरर्स, मला माझ्या कार्यक्रमासाठी "${name}" या पदार्थाबद्दल माहिती हवी आहे.`
      : `Hello Aditi Caterers, I would like to enquire about "${name}" for my event.`;
  const waUrl = `https://wa.me/919975959391?text=${encodeURIComponent(waMsg)}`;

  return (
    <>
      {/* Breadcrumb */}
      <section className="py-3 bg-white border-bottom">
        <div className="container-xl">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none" style={{ color: 'var(--ac-maroon, #641e2b)' }}>
                  <i className="bi bi-house-door-fill me-1" />
                  {t.nav?.home || 'Home'}
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/menu" className="text-decoration-none" style={{ color: 'var(--ac-maroon, #641e2b)' }}>
                  {t.nav?.menu || 'Food Menu'}
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/menu/${category}`} className="text-decoration-none" style={{ color: 'var(--ac-maroon, #641e2b)' }}>
                  {catName}
                </Link>
              </li>
              <li className="breadcrumb-item active text-muted" aria-current="page">
                {name}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Main Detail Section */}
      <section className="py-5 bg-white">
        <div className="container-xl">
          <div className="row g-5 align-items-start">
            {/* Left: Dish Image */}
            <div className="col-12 col-lg-5">
              <div className="rounded-4 overflow-hidden shadow-lg position-relative">
                <img
                  src={imgUrl}
                  alt={imgAlt}
                  className="w-100"
                  style={{ objectFit: 'cover', maxHeight: '480px', minHeight: '300px' }}
                  loading="eager"
                />
                {/* Badges on image */}
                <div className="position-absolute top-0 start-0 m-3 d-flex gap-2 flex-wrap">
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
              </div>

              {/* Quick action buttons under image on mobile */}
              <div className="d-flex gap-2 mt-3 d-lg-none">
                <button
                  type="button"
                  className={`btn flex-fill fw-semibold rounded-3 d-flex align-items-center justify-content-center gap-2 ${isSelected ? 'btn-success' : ''}`}
                  style={!isSelected ? { backgroundColor: 'var(--ac-maroon, #641e2b)', color: '#fff' } : {}}
                  onClick={() => toggleItem(item)}
                >
                  <i className={`bi ${isSelected ? 'bi-check-circle-fill' : 'bi-plus-circle'}`} />
                  {isSelected
                    ? (detailText.addToMenu ? '✓ ' + detailText.addToMenu : (language === 'mr' ? '✓ समाविष्ट केले' : '✓ Shortlisted'))
                    : (detailText.addToMenu || (language === 'mr' ? 'मेनूत जोडा' : 'Add to Event Menu'))
                  }
                </button>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success rounded-3 d-flex align-items-center justify-content-center gap-2 px-3"
                >
                  <i className="bi bi-whatsapp" />
                </a>
              </div>
            </div>

            {/* Right: Dish Info */}
            <div className="col-12 col-lg-7">
              {/* Name + Spice */}
              <div className="d-flex align-items-start justify-content-between flex-wrap gap-2 mb-3">
                <h1 className="display-6 fw-bold mb-0" style={{ color: 'var(--ac-maroon, #641e2b)' }}>
                  {name}
                </h1>
                <div className="bg-light px-3 py-1 rounded-pill border">
                  {[1, 2, 3].map((lvl) => (
                    <i
                      key={lvl}
                      className={`bi bi-fire ${lvl <= spice ? 'ac-spice-active' : 'ac-spice-inactive'}`}
                      style={{ fontSize: '1rem' }}
                    />
                  ))}
                </div>
              </div>

              {/* Serving style */}
              {servingStyle && (
                <p className="text-muted small mb-3">
                  <i className="bi bi-award me-1" style={{ color: 'var(--ac-maroon, #641e2b)' }} />
                  <strong>{detailText.servingStyle || (language === 'mr' ? 'वाढण्याची पद्धत' : 'Serving Style')}:</strong>{' '}
                  {servingStyle}
                </p>
              )}

              {/* Description */}
              <p className="text-secondary lh-lg mb-4" style={{ fontSize: '1.05rem' }}>
                {description}
              </p>

              {/* Ideal For */}
              {idealFor && (
                <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: 'var(--ac-bg-light, #fdf8f0)' }}>
                  <p className="mb-0 small">
                    <i className="bi bi-calendar-event me-2" style={{ color: 'var(--ac-maroon, #641e2b)' }} />
                    <strong>{detailText.idealFor || (language === 'mr' ? 'योग्य प्रसंग' : 'Ideal For')}:</strong>{' '}
                    {idealFor}
                  </p>
                </div>
              )}

              {/* Key Ingredients */}
              {ingredients.length > 0 && (
                <div className="mb-4">
                  <h3 className="h6 fw-bold mb-2" style={{ color: 'var(--ac-maroon, #641e2b)' }}>
                    <i className="bi bi-layers me-2" />
                    {detailText.ingredients || (language === 'mr' ? 'मुख्य साहित्य' : 'Key Ingredients')}
                  </h3>
                  <div className="d-flex flex-wrap gap-2">
                    {ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="badge bg-light text-dark border px-3 py-2 rounded-pill"
                        style={{ fontSize: '0.82rem' }}
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons — desktop */}
              <div className="d-none d-lg-flex gap-3 flex-wrap mt-4">
                <button
                  type="button"
                  className={`btn px-4 py-2 rounded-3 fw-bold d-flex align-items-center gap-2 ${isSelected ? 'btn-success' : ''}`}
                  style={!isSelected ? { backgroundColor: 'var(--ac-maroon, #641e2b)', color: '#fff' } : {}}
                  onClick={() => toggleItem(item)}
                >
                  <i className={`bi ${isSelected ? 'bi-check-circle-fill' : 'bi-plus-circle'}`} />
                  {isSelected
                    ? (language === 'mr' ? '✓ समाविष्ट केले' : '✓ Shortlisted')
                    : (detailText.addToMenu || (language === 'mr' ? 'कार्यक्रम मेनूत जोडा' : 'Add to Event Menu'))
                  }
                </button>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success px-4 py-2 rounded-3 fw-semibold d-flex align-items-center gap-2"
                >
                  <i className="bi bi-whatsapp" />
                  <span>{detailText.enquireAbout || (language === 'mr' ? 'या पदार्थाबद्दल चौकशी करा' : 'Enquire About This Dish')}</span>
                </a>
                <Link
                  to={`/menu/${category}`}
                  className="btn btn-outline-secondary px-4 py-2 rounded-3 d-flex align-items-center gap-2"
                >
                  <i className="bi bi-arrow-left" />
                  <span>{detailText.backToCategory || (language === 'mr' ? 'प्रकाराकडे परत जा' : 'Back to Category')}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Dishes */}
      {relatedItems.length > 0 && (
        <section className="py-5" style={{ backgroundColor: 'var(--ac-bg-light, #fdf8f0)' }}>
          <div className="container-xl">
            <h2 className="h4 fw-bold mb-4" style={{ color: 'var(--ac-maroon, #641e2b)' }}>
              <i className="bi bi-grid me-2" />
              {detailText.relatedDishes || (language === 'mr' ? 'हे पण आवडतील' : 'You May Also Like')}
            </h2>
            <div className="row g-4">
              {relatedItems.map((relItem) => (
                <FoodItemCard key={relItem.id} item={relItem} />
              ))}
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

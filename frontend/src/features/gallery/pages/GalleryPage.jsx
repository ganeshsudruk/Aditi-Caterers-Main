import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import {
  defaultGalleryCategories,
  defaultGalleryItems,
  getGalleryCategories,
  getGalleryItems,
} from '../../../services/galleryService';

import '../styles/gallery.css';

import GalleryHero from '../components/GalleryHero';
import GalleryCategoryFilter from '../components/GalleryCategoryFilter';
import GalleryGrid from '../components/GalleryGrid';
import GalleryLightbox from '../components/GalleryLightbox';
import GalleryCTA from '../components/GalleryCTA';
import GalleryLoader from '../components/GalleryLoader';

export default function GalleryPage() {
  const { language, t } = useLanguage();

  const [categories, setCategories] = useState(defaultGalleryCategories);
  const [allItems, setAllItems] = useState(defaultGalleryItems);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  // SEO: Document Title & Meta Description
  useEffect(() => {
    const metaTitle =
      t.galleryPage?.metaTitle ||
      (language === 'mr' ? 'गॅलरी | अदिती केटरर्स' : 'Gallery | Aditi Caterers');
    document.title = metaTitle;

    const metaDesc =
      t.galleryPage?.metaDesc ||
      (language === 'mr'
        ? 'अदिती केटरर्सच्या स्वादिष्ट खाद्यपदार्थ, भव्य केटरिंग मांडणी आणि कार्यक्रम आयोजनाची खास छायाचित्रे पहा.'
        : 'Explore the Aditi Caterers gallery featuring approved photographs of food, catering arrangements, and event celebrations.');

    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'description';
      document.head.appendChild(metaTag);
    }
    metaTag.content = metaDesc;
  }, [language, t]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Fetch data
  useEffect(() => {
    let isMounted = true;
    Promise.all([
      getGalleryCategories().catch(() => defaultGalleryCategories),
      getGalleryItems().catch(() => defaultGalleryItems),
    ])
      .then(([cats, itemsData]) => {
        if (!isMounted) return;
        setCategories(cats || defaultGalleryCategories);
        setAllItems(itemsData || defaultGalleryItems);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Category map for quick lookup
  const categoryMap = useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat.slug] = cat.name?.[language] || cat.name?.en || cat.slug;
      return acc;
    }, {});
  }, [categories, language]);

  // Calculate item counts per category
  const counts = useMemo(() => {
    const countMap = {};
    allItems.forEach((item) => {
      countMap[item.category] = (countMap[item.category] || 0) + 1;
    });
    return countMap;
  }, [allItems]);

  // Filter items by category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return allItems;
    return allItems.filter((item) => item.category === activeCategory);
  }, [allItems, activeCategory]);

  // Lightbox navigation
  const handleOpenLightbox = useCallback((index) => {
    setLightboxIndex(index);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handlePrevLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  }, [filteredItems.length]);

  const handleNextLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  }, [filteredItems.length]);

  const handleResetCategory = useCallback(() => {
    setActiveCategory('all');
  }, []);

  const photosFoundText =
    t.galleryPage?.categories?.photosFound ||
    (language === 'mr' ? 'छायाचित्रे आढळली' : 'photos found');

  return (
    <>
      {/* 1. Hero / Banner */}
      <GalleryHero />

      {/* 2. Gallery Content Section */}
      <section
        className="py-5"
        style={{ backgroundColor: 'var(--ac-bg-light, #fdf8f0)' }}
        aria-label="Gallery Photos"
      >
        <div className="container-xl">
          {/* Category Filter Pills */}
          <GalleryCategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            counts={counts}
            totalCount={allItems.length}
          />

          {/* Results Summary Bar */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <span className="text-muted small">
              <strong>{filteredItems.length}</strong> {photosFoundText}
            </span>
            {activeCategory !== 'all' && (
              <button
                type="button"
                className="btn btn-sm btn-link text-decoration-none text-muted p-0"
                onClick={handleResetCategory}
              >
                <i className="bi bi-arrow-counterclockwise me-1" aria-hidden="true" />
                {t.galleryPage?.categories?.reset ||
                  (language === 'mr' ? 'फिल्टर रीसेट करा' : 'Reset Filters')}
              </button>
            )}
          </div>

          {/* Grid or Loader */}
          {loading ? (
            <GalleryLoader />
          ) : (
            <GalleryGrid
              items={filteredItems}
              onOpenLightbox={handleOpenLightbox}
              categoryMap={categoryMap}
              onResetCategory={handleResetCategory}
            />
          )}
        </div>
      </section>

      {/* 3. Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <GalleryLightbox
          items={filteredItems}
          currentIndex={lightboxIndex}
          onClose={handleCloseLightbox}
          onPrev={handlePrevLightbox}
          onNext={handleNextLightbox}
          categoryMap={categoryMap}
        />
      )}

      {/* 4. Call to Action */}
      <GalleryCTA />
    </>
  );
}

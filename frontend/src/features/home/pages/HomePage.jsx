import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { getHomePageData, defaultHomeData } from '../../../services/homeService';

// Section components
import HeroSection from '../components/HeroSection';
import AboutPreview from '../components/AboutPreview';
import FeaturedServices from '../components/FeaturedServices';
import CateringOptions from '../components/CateringOptions';
import PopularFoodCategories from '../components/PopularFoodCategories';
import WhyChooseUs from '../components/WhyChooseUs';
import FeaturedGallery from '../components/FeaturedGallery';
import EventsWeServe from '../components/EventsWeServe';
import BookingProcess from '../components/BookingProcess';
import Testimonials from '../components/Testimonials';
import HomeCTA from '../components/HomeCTA';
import ContactPreview from '../components/ContactPreview';

// Loaders and error states
import HomeSectionLoader from '../../../components/common/HomeSectionLoader';

// Dedicated styles
import '../styles/home.css';

export default function HomePage() {
  const { t, language } = useLanguage();

  const [data, setData] = useState(defaultHomeData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // SEO: Update page title and description
  useEffect(() => {
    document.title =
      language === 'mr'
        ? 'आदिती केटरर्स | प्रत्येक खास प्रसंगासाठी केटरिंग सेवा'
        : 'Aditi Caterers | Catering Services for Every Occasion';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t.home.metaDesc);
    }
  }, [language, t.home.metaDesc]);

  // Fetch Home Page Data
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getHomePageData();
      setData(result || defaultHomeData);
    } catch (err) {
      // In case of network error, use default curated data and log non-breaking warning
      setData(defaultHomeData);
      setError(err?.userMessage || t.common.errorMsg);
    } finally {
      setLoading(false);
    }
  }, [t.common.errorMsg]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="ac-home-page">
      {/* ── Section 2: Hero Section ── */}
      <HeroSection data={data} />

      {/* Optional Error Alert if API was completely unreachable */}
      {error && (
        <div className="container-xl pt-4">
          <div className="alert alert-warning alert-dismissible fade show d-flex align-items-center justify-content-between" role="alert">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-exclamation-triangle-fill" />
              <span>{t.common.errorMsg}</span>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-outline-dark"
              onClick={loadData}
            >
              {t.common.retry}
            </button>
          </div>
        </div>
      )}

      {/* ── Section 3: About Aditi Caterers ── */}
      <AboutPreview />

      {/* ── Section 4: Our Catering Services ── */}
      {loading ? (
        <HomeSectionLoader message={t.common.loading} />
      ) : (
        <FeaturedServices services={data.services} />
      )}

      {/* ── Section 5: Catering Options ── */}
      <CateringOptions />

      {/* ── Section 6: Popular Food Categories ── */}
      {loading ? (
        <HomeSectionLoader message={t.common.loading} />
      ) : (
        <PopularFoodCategories categories={data.foodCategories} />
      )}

      {/* ── Section 7: Why Choose Aditi Caterers ── */}
      <WhyChooseUs />

      {/* ── Section 8: Featured Food Gallery ── */}
      {loading ? (
        <HomeSectionLoader message={t.common.loading} />
      ) : (
        <FeaturedGallery gallery={data.gallery} />
      )}

      {/* ── Section 9: Events We Serve ── */}
      <EventsWeServe />

      {/* ── Section 10: How Our Booking Process Works ── */}
      <BookingProcess />

      {/* ── Section 11: Customer Testimonials ── */}
      {loading ? (
        <HomeSectionLoader message={t.common.loading} />
      ) : (
        <Testimonials testimonials={data.testimonials} />
      )}

      {/* ── Section 12: Call-to-Action Section ── */}
      <HomeCTA />

      {/* ── Section 13: Contact Information Section ── */}
      <ContactPreview />
    </div>
  );
}

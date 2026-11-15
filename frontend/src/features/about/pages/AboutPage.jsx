import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { getAboutPageData, defaultAboutData } from '../../../services/aboutService';

// About section components
import AboutHero from '../components/AboutHero';
import AboutIntroduction from '../components/AboutIntroduction';
import OurStory from '../components/OurStory';
import OurExperience from '../components/OurExperience';
import OurMissionVision from '../components/OurMissionVision';
import CoreValues from '../components/CoreValues';
import AboutServices from '../components/AboutServices';
import WorkingProcess from '../components/WorkingProcess';
import WhyChooseUs from '../components/WhyChooseUs';
import AboutGallery from '../components/AboutGallery';
import AboutCTA from '../components/AboutCTA';
import ContactPreview from '../../home/components/ContactPreview';

// Loaders and error states
import AboutSectionLoader from '../components/AboutSectionLoader';

// Dedicated styles
import '../styles/about.css';

export default function AboutPage() {
  const { t, language } = useLanguage();
  const [data, setData] = useState(defaultAboutData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // SEO: Update page title and description
  useEffect(() => {
    document.title =
      language === 'mr'
        ? 'अदिती केटरर्सबद्दल | आमचा प्रवास आणि केटरिंग सेवा'
        : 'About Aditi Caterers | Our Story and Catering Services';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t.aboutPage.metaDesc);
    }
  }, [language, t.aboutPage.metaDesc]);

  // Fetch About Page Data
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAboutPageData();
      setData(result || defaultAboutData);
    } catch (err) {
      setData(defaultAboutData);
      setError(err?.userMessage || t.common.errorMsg);
    } finally {
      setLoading(false);
    }
  }, [t.common.errorMsg]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="ac-about-page">
      {/* ── Section 1: Page Hero / Banner ── */}
      <AboutHero />

      {/* Optional Error Alert if API was completely unreachable */}
      {error && (
        <div className="container-xl pt-4">
          <div
            className="alert alert-warning alert-dismissible fade show d-flex align-items-center justify-content-between"
            role="alert"
          >
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

      {/* ── Section 2: About Aditi Caterers ── */}
      {loading ? (
        <AboutSectionLoader message={t.common.loading} />
      ) : (
        <AboutIntroduction image={data.featuredImage} />
      )}

      {/* ── Section 3: Our Story / Business Journey ── */}
      <OurStory storyImage={data.storyImage} />

      {/* ── Section 4: Our Experience ── */}
      <OurExperience />

      {/* ── Sections 5 & 6: Our Mission & Vision ── */}
      <OurMissionVision />

      {/* ── Section 7: Our Core Values ── */}
      <CoreValues />

      {/* ── Section 8: Our Catering Services Overview ── */}
      <AboutServices />

      {/* ── Section 9: Our Working Process ── */}
      <WorkingProcess />

      {/* ── Section 10: Why Choose Aditi Caterers ── */}
      <WhyChooseUs />

      {/* ── Section 11: Business Gallery Preview ── */}
      {loading ? (
        <AboutSectionLoader message={t.common.loading} />
      ) : (
        <AboutGallery gallery={data.gallery} />
      )}

      {/* ── Section 12: Call-to-Action Section ── */}
      <AboutCTA />

      {/* ── Section 13: Contact Information ── */}
      <ContactPreview />
    </div>
  );
}

import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { getAllServices, defaultServices } from '../../../services/serviceService';

// Section components
import ServicesHero from '../components/ServicesHero';
import ServicesIntroduction from '../components/ServicesIntroduction';
import ServiceGrid from '../components/ServiceGrid';
import CateringOptions from '../components/CateringOptions';
import EventsWeServe from '../components/EventsWeServe';
import ServiceApproach from '../components/ServiceApproach';
import ServicesGallery from '../components/ServicesGallery';
import ServicesFAQ from '../components/ServicesFAQ';
import ServiceCTA from '../components/ServiceCTA';
import ContactPreview from '../../home/components/ContactPreview';
import ServiceLoader from '../components/ServiceLoader';

// Styles
import '../styles/services.css';

export default function ServicesPage() {
  const { t, language } = useLanguage();
  const [services, setServices] = useState(defaultServices);
  const [loading, setLoading] = useState(true);

  // SEO Title & Description
  useEffect(() => {
    document.title =
      language === 'mr'
        ? t.servicesPage?.metaTitle || 'अदिती केटरर्स | लग्न, वाढदिवस आणि इतर कार्यक्रमांसाठी केटरिंग सेवा'
        : t.servicesPage?.metaTitle || 'Aditi Caterers | Wedding, Birthday and Event Catering Services';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t.servicesPage?.metaDesc || '');
    }
  }, [language, t.servicesPage]);

  // Load Services Data
  const loadServices = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllServices();
      setServices(data || defaultServices);
    } catch {
      setServices(defaultServices);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  return (
    <div className="ac-services-page" style={{ overflowX: 'hidden' }}>
      {/* 1. Navbar is automatically rendered by MainLayout */}

      {/* 2. Services Hero / Banner */}
      <ServicesHero />

      {/* 3. Introduction */}
      <ServicesIntroduction />

      {/* 4. All Catering Services */}
      {loading ? (
        <ServiceLoader />
      ) : (
        <ServiceGrid services={services} />
      )}

      {/* 5. Catering Options (With Material vs Without Material) */}
      <CateringOptions />

      {/* 6. Types of Events We Serve */}
      <EventsWeServe />

      {/* 7. Our Service Approach */}
      <ServiceApproach />

      {/* 8. Featured Food and Event Gallery */}
      <ServicesGallery />

      {/* 9. Frequently Asked Questions Preview */}
      <ServicesFAQ />

      {/* 10. Booking Call-to-Action */}
      <ServiceCTA />

      {/* 11. Contact Information */}
      <ContactPreview />

      {/* 12. Footer is automatically rendered by MainLayout */}
    </div>
  );
}

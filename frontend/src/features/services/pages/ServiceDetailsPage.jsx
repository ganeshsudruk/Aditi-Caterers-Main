import { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { getServiceBySlug, getRelatedServices } from '../../../services/serviceService';

// Detail Components
import ServiceDetailHero from '../components/ServiceDetailHero';
import ServiceInformation from '../components/ServiceInformation';
import CateringOptions from '../components/CateringOptions';
import ServiceMenuSuggestions from '../components/ServiceMenuSuggestions';
import ServiceDetailGallery from '../components/ServiceDetailGallery';
import ServiceDetailProcess from '../components/ServiceDetailProcess';
import ServiceDetailFAQ from '../components/ServiceDetailFAQ';
import ServiceCTA from '../components/ServiceCTA';
import RelatedServices from '../components/RelatedServices';
import ServiceNotFound from '../components/ServiceNotFound';
import ServiceLoader from '../components/ServiceLoader';
import ContactPreview from '../../home/components/ContactPreview';

// Styles
import '../styles/services.css';

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const { language } = useLanguage();

  const [service, setService] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Load Service Data
  const loadServiceData = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await getServiceBySlug(id);
      setService(data);
      if (data?.slug) {
        const relatedData = await getRelatedServices(data.slug, 3);
        setRelated(relatedData || []);
      }
    } catch {
      setService(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadServiceData();
  }, [loadServiceData]);

  // Dynamic SEO Title & Meta Description per service
  useEffect(() => {
    if (service) {
      const serviceTitle = service.heroHeading?.[language] || service.name?.[language] || service.name?.en;
      document.title = `${serviceTitle} | Aditi Caterers`;

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute(
          'content',
          service.shortDescription?.[language] || service.shortDescription?.en || ''
        );
      }
    }
  }, [service, language]);

  if (loading) {
    return (
      <div className="py-5 my-5">
        <ServiceLoader />
      </div>
    );
  }

  // 404 / Service Not Found State
  if (!service) {
    return <ServiceNotFound />;
  }

  return (
    <div className="ac-service-detail-page" style={{ overflowX: 'hidden' }}>
      {/* 1. Service Hero Banner with Breadcrumbs */}
      <ServiceDetailHero service={service} />

      {/* 2. Service Introduction & Event Requirements */}
      <ServiceInformation service={service} />

      {/* 3. Available Catering Options (With Material vs Without Material) */}
      <CateringOptions />

      {/* 4. Suggested Menu Categories */}
      <ServiceMenuSuggestions service={service} />

      {/* 5. Service-Specific Gallery with Lightbox */}
      <ServiceDetailGallery service={service} />

      {/* 6. How We Arrange the Service */}
      <ServiceDetailProcess service={service} />

      {/* 7. Service Specific FAQs */}
      <ServiceDetailFAQ service={service} />

      {/* 8. Booking Call-to-Action with Preselected Event Type */}
      <ServiceCTA eventType={service.slug} />

      {/* 9. Related Services */}
      <RelatedServices services={related} />

      {/* 10. Contact Information Preview */}
      <ContactPreview />
    </div>
  );
}

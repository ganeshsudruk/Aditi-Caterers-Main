import { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { getPackageBySlug, getRelatedPackages } from '../../../services/packageService';

// Detail Components
import PackageDetailHero from '../components/PackageDetailHero';
import PackageDetailOverview from '../components/PackageDetailOverview';
import PackageDetailMenu from '../components/PackageDetailMenu';
import PackageDetailInclusions from '../components/PackageDetailInclusions';
import PackageDetailConditions from '../components/PackageDetailConditions';
import RelatedPackages from '../components/RelatedPackages';
import PackageEnquiryCTA from '../components/PackageEnquiryCTA';
import PackageNotFound from '../components/PackageNotFound';
import PackageLoader from '../components/PackageLoader';
import ContactPreview from '../../home/components/ContactPreview';

// Styles
import '../styles/packages.css';

export default function PackageDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const { language } = useLanguage();

  const [pkg, setPkg] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Load Package Data
  const loadPackageData = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await getPackageBySlug(id);
      setPkg(data);
      if (data?.slug) {
        const relatedData = await getRelatedPackages(data.slug, 3);
        setRelated(relatedData || []);
      }
    } catch {
      setPkg(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadPackageData();
  }, [loadPackageData]);

  // Dynamic Document Title & Meta Description
  useEffect(() => {
    if (pkg) {
      const pkgName = pkg.name?.[language] || pkg.name?.en || 'Catering Package';
      document.title = `${pkgName} | Aditi Caterers`;

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        const desc = pkg.shortDescription?.[language] || pkg.shortDescription?.en || '';
        metaDescription.setAttribute('content', desc);
      }
    }
  }, [pkg, language]);

  if (loading) {
    return <PackageLoader />;
  }

  if (!pkg) {
    return <PackageNotFound />;
  }

  const pkgName = pkg.name?.[language] || pkg.name?.en;

  return (
    <div className="ac-package-detail-page" style={{ overflowX: 'hidden' }}>
      {/* 1. Package Hero Section */}
      <PackageDetailHero pkg={pkg} />

      {/* 2. Package Overview Section */}
      <PackageDetailOverview pkg={pkg} />

      {/* 3. Food Menu Highlights & Structure */}
      <PackageDetailMenu pkg={pkg} />

      {/* 4. Inclusions Checklist */}
      <PackageDetailInclusions pkg={pkg} />

      {/* 5. Conditions & Additional Costs */}
      <PackageDetailConditions pkg={pkg} />

      {/* 6. Related Packages */}
      {related.length > 0 && <RelatedPackages packages={related} />}

      {/* 7. Booking / Enquiry Call-to-Action */}
      <PackageEnquiryCTA packageName={pkgName} packageType={pkg.packageType} />

      {/* 8. Contact Information & Hours Preview */}
      <ContactPreview />
    </div>
  );
}

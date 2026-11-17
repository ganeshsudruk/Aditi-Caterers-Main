import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import {
  getAllPackages,
  getBudgetPackages,
  defaultPackages,
  defaultBudgetPackages,
} from '../../../services/packageService';

// Section components
import PackageHero from '../components/PackageHero';
import PackageIntroduction from '../components/PackageIntroduction';
import PackageTypeCards from '../components/PackageTypeCards';
import BudgetPackagesSection from '../components/BudgetPackagesSection';
import PackageList from '../components/PackageList';
import PackageComparison from '../components/PackageComparison';
import PackageInclusions from '../components/PackageInclusions';
import CustomPackageCTA from '../components/CustomPackageCTA';
import PackageProcess from '../components/PackageProcess';
import PackageFAQ from '../components/PackageFAQ';
import PackageEnquiryCTA from '../components/PackageEnquiryCTA';
import PackageLoader from '../components/PackageLoader';
import ContactPreview from '../../home/components/ContactPreview';

// Styles
import '../styles/packages.css';

export default function PackagesPage() {
  const { t, language } = useLanguage();
  const [packages, setPackages] = useState(defaultPackages);
  const [budgetPackages, setBudgetPackages] = useState(defaultBudgetPackages);
  const [loading, setLoading] = useState(true);

  // SEO Title & Description
  useEffect(() => {
    document.title =
      language === 'mr'
        ? t.packagesPage?.metaTitle || 'केटरिंग पॅकेजेस | अदिती केटरर्स'
        : t.packagesPage?.metaTitle || 'Catering Packages | Aditi Caterers';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t.packagesPage?.metaDesc || '');
    }
  }, [language, t.packagesPage]);

  // Load Packages Data
  const loadPackagesData = useCallback(async () => {
    setLoading(true);
    try {
      const [allPkg, budgetPkg] = await Promise.all([
        getAllPackages(),
        getBudgetPackages(),
      ]);
      setPackages(allPkg || defaultPackages);
      setBudgetPackages(budgetPkg || defaultBudgetPackages);
    } catch {
      setPackages(defaultPackages);
      setBudgetPackages(defaultBudgetPackages);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPackagesData();
  }, [loadPackagesData]);

  return (
    <div className="ac-packages-page" style={{ overflowX: 'hidden' }}>
      {/* 1. Package Hero / Banner */}
      <PackageHero />

      {/* 2. Package Introduction */}
      <PackageIntroduction />

      {/* 3. Three Core Package Types (With Material, Without Material, Custom) */}
      <PackageTypeCards />

      {/* 4. Section 5.5.1: Budget-Based Catering Packages */}
      {loading ? (
        <PackageLoader />
      ) : (
        <BudgetPackagesSection packages={budgetPackages} />
      )}

      {/* 5. All Packages Listing with Interactive Filters */}
      {loading ? (
        <PackageLoader />
      ) : (
        <PackageList packages={packages} />
      )}

      {/* 6. Package Comparison Matrix */}
      <PackageComparison />

      {/* 7. What's Included / Scope of Service */}
      <PackageInclusions />

      {/* 8. Custom Package Call-to-Action */}
      <CustomPackageCTA />

      {/* 9. How It Works / Process */}
      <PackageProcess />

      {/* 10. Frequently Asked Questions */}
      <PackageFAQ />

      {/* 11. Final Booking / Enquiry CTA */}
      <PackageEnquiryCTA />

      {/* 12. Contact Information & Hours Preview */}
      <ContactPreview />
    </div>
  );
}

import { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';
import PackageCard from './PackageCard';

export default function PackageList({ packages = [] }) {
  const { t } = useLanguage();
  const listingText = t.packagesPage.listing;
  const [activeFilter, setActiveFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: listingText.filters.all },
    { id: 'with-material', label: listingText.filters.withMaterial },
    { id: 'without-material', label: listingText.filters.withoutMaterial },
    { id: 'custom', label: listingText.filters.custom },
  ];

  const activePackages = packages.filter((p) => p.isActive !== false);

  const filteredPackages =
    activeFilter === 'all'
      ? activePackages
      : activePackages.filter((p) => p.packageType === activeFilter);

  return (
    <section className="py-5 bg-white" id="package-listing" aria-label="Available Packages">
      <div className="container-xl py-4">
        {/* Section Heading */}
        <SectionHeading
          tag={listingText.tag}
          title={listingText.heading}
          description={listingText.description}
          centered={true}
        />

        {/* Filter Pills */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mt-4 mb-5">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`ac-filter-pill ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Package Grid */}
        <div className="row g-4 justify-content-center">
          {filteredPackages.length > 0 ? (
            filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id || pkg.slug} pkg={pkg} />
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <div className="ac-not-found-icon mb-3">
                <i className="bi bi-box" />
              </div>
              <h3 className="h5 fw-bold text-dark mb-2">
                {listingText.emptyTitle}
              </h3>
              <p className="text-muted small">
                {listingText.emptyMessage}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


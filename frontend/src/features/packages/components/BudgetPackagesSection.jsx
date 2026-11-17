import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';
import {
  defaultBudgetPackages,
  defaultBudgetComparison,
  defaultGuestCountOptions,
} from '../../../services/packageService';

export default function BudgetPackagesSection({
  packages = defaultBudgetPackages,
  comparison = defaultBudgetComparison,
}) {
  const { language, t } = useLanguage();
  const bText = t.packagesPage.budget;

  const [selectedGuests, setSelectedGuests] = useState(100);
  const [cateringType, setCateringType] = useState('with-material');
  const [activeTab, setActiveTab] = useState('cards'); // 'cards' | 'compare'

  return (
    <section className="py-5 ac-budget-section" id="budget-packages" aria-label="Budget-Based Catering Packages">
      <div className="container-xl py-4">
        {/* Section Heading */}
        <SectionHeading
          tag={bText.tag}
          title={bText.heading}
          description={bText.description}
          centered={true}
        />

        {/* Guest Count Selector & Service Type Controls */}
        <div className="card border-0 shadow-sm rounded-4 p-4 mt-4 mb-4 bg-white mx-auto" style={{ maxWidth: '960px' }}>
          <div className="row g-3 align-items-center">
            {/* Guest Count Selector */}
            <div className="col-12 col-lg-7">
              <label className="form-label fw-bold text-dark small mb-2 d-flex align-items-center gap-2">
                <i className="bi bi-people-fill text-maroon fs-5" />
                <span>{bText.guestSelectorTitle}</span>
              </label>
              <div className="d-flex flex-wrap gap-2">
                {defaultGuestCountOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`btn btn-sm rounded-pill fw-semibold ${
                      selectedGuests === opt.value
                        ? 'btn-maroon text-white shadow-sm'
                        : 'btn-outline-secondary'
                    }`}
                    style={selectedGuests === opt.value ? { backgroundColor: 'var(--ac-maroon, #641e2b)' } : {}}
                    onClick={() => setSelectedGuests(opt.value)}
                  >
                    {opt.value} {language === 'mr' ? 'पाहुणे' : 'Guests'}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Type Switch */}
            <div className="col-12 col-lg-5">
              <label className="form-label fw-bold text-dark small mb-2 d-flex align-items-center gap-2">
                <i className="bi bi-box-seam-fill text-gold fs-5" />
                <span>{bText.serviceTypeLabel}</span>
              </label>
              <div className="btn-group w-100" role="group">
                <button
                  type="button"
                  className={`btn btn-sm ${
                    cateringType === 'with-material'
                      ? 'btn-maroon text-white fw-bold'
                      : 'btn-outline-secondary'
                  }`}
                  style={cateringType === 'with-material' ? { backgroundColor: 'var(--ac-maroon, #641e2b)' } : {}}
                  onClick={() => setCateringType('with-material')}
                >
                  {bText.withMaterial}
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${
                    cateringType === 'without-material'
                      ? 'btn-success text-white fw-bold'
                      : 'btn-outline-secondary'
                  }`}
                  onClick={() => setCateringType('without-material')}
                >
                  {bText.withoutMaterial}
                </button>
              </div>
            </div>
          </div>

          {/* Unconfigured Guest Count Guidance */}
          {selectedGuests !== 100 && (
            <div className="alert alert-warning mt-3 mb-0 py-2 px-3 small d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div>
                <i className="bi bi-info-circle-fill me-2" />
                {language === 'mr'
                  ? `${selectedGuests} पाहुण्यांच्या अचूक प्रमाण व व्यवस्थेसाठी कृपया थेट कोटेशन मागवा.`
                  : `For ${selectedGuests} guests, package quantities and quotation will be tailored to ensure accurate portioning.`}
              </div>
              <Link
                to={`/booking?packageType=custom&guests=${selectedGuests}`}
                className="btn btn-sm btn-dark px-3 py-1 rounded-pill"
              >
                {language === 'mr' ? 'कोटेशन मागवा' : 'Request Quotation'}
              </Link>
            </div>
          )}
        </div>

        {/* Tabs: Cards View vs Comparison Table */}
        <div className="d-flex justify-content-center gap-2 mb-4">
          <button
            type="button"
            className={`btn btn-sm px-4 py-2 rounded-pill fw-bold ${
              activeTab === 'cards' ? 'btn-maroon text-white' : 'btn-light border text-muted'
            }`}
            style={activeTab === 'cards' ? { backgroundColor: 'var(--ac-maroon, #641e2b)' } : {}}
            onClick={() => setActiveTab('cards')}
          >
            <i className="bi bi-grid-fill me-2" />
            {bText.cardsTab}
          </button>
          <button
            type="button"
            className={`btn btn-sm px-4 py-2 rounded-pill fw-bold ${
              activeTab === 'compare' ? 'btn-maroon text-white' : 'btn-light border text-muted'
            }`}
            style={activeTab === 'compare' ? { backgroundColor: 'var(--ac-maroon, #641e2b)' } : {}}
            onClick={() => setActiveTab('compare')}
          >
            <i className="bi bi-table me-2" />
            {bText.compareTab}
          </button>
        </div>

        {/* TAB 1: Budget Package Cards */}
        {activeTab === 'cards' && (
          <div className="row g-4 justify-content-center">
            {packages.map((pkg) => {
              const name = pkg.name?.[language] || pkg.name?.en;
              const tagline = pkg.tagline?.[language] || pkg.tagline?.en || '';
              const shortDesc = pkg.shortDescription?.[language] || pkg.shortDescription?.en || '';
              const isLuxury = pkg.category === 'luxury';
              const priceText = pkg.price?.amount
                ? `₹${pkg.price.amount.toLocaleString('en-IN')}`
                : t.packagesPage.listing.priceOnRequest;

              const perPersonText = pkg.price?.approxPerPerson
                ? `(~₹${pkg.price.approxPerPerson}/person)`
                : '';

              return (
                <div key={pkg.id} className="col-12 col-md-6 col-lg-3 d-flex">
                  <div className={`ac-budget-card tier-${pkg.category} w-100 shadow-sm`}>
                    {/* Tier Badge */}
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className={`ac-tier-badge ac-tier-${pkg.category}`}>
                        {pkg.category.toUpperCase()}
                      </span>
                      {pkg.price?.guestBase && (
                        <span className="badge bg-light text-dark border small">
                          {pkg.price.guestBase} {language === 'mr' ? 'पाहुणे' : 'Guests'}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="h5 fw-bold text-dark mb-1">
                      {name}
                    </h3>
                    <p className="text-muted small mb-2 line-clamp-1" style={{ fontSize: '0.8rem' }}>
                      {tagline}
                    </p>

                    {/* Price Tag Box */}
                    <div className="ac-budget-price-box">
                      <div className="h4 fw-bold text-maroon mb-0">
                        {priceText}
                      </div>
                      <div className="text-muted small">
                        {isLuxury ? (
                          <span>{language === 'mr' ? 'मागणीनुसार कोटेशन' : 'Custom Quotation'}</span>
                        ) : (
                          <span>{bText.fixedForGuests.replace('{count}', pkg.price?.guestBase || 100)} {perPersonText}</span>
                        )}
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-secondary small mb-3 flex-grow-1" style={{ fontSize: '0.85rem' }}>
                      {shortDesc}
                    </p>

                    {/* Menu Structure Preview */}
                    <div className="ac-budget-menu-box">
                      <div className="fw-bold text-dark small mb-2 d-flex align-items-center gap-1">
                        <i className="bi bi-list-stars text-maroon" />
                        <span>{bText.menuStructure}:</span>
                      </div>
                      <div className="d-flex flex-column">
                        {pkg.sampleMenuStructure?.map((m, mIdx) => (
                          <div key={mIdx} className="ac-menu-item-row">
                            <i className="bi bi-check2 text-success flex-shrink-0" />
                            <div>
                              <strong className="text-dark small">{m.category[language] || m.category.en}:</strong>{' '}
                              <span className="text-muted small">{m.items[language] || m.items.en}</span>
                              {m.isAlternative && (
                                <span className="ac-alternative-badge">
                                  {bText.orChoice}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex flex-column gap-2 mt-auto pt-2">
                      <Link
                        to={`/packages/${pkg.slug}`}
                        className="btn ac-btn-outline-maroon btn-sm py-2 rounded-3 text-center d-flex align-items-center justify-content-center gap-2"
                      >
                        <span>{t.packagesPage.listing.viewDetails}</span>
                        <i className="bi bi-arrow-right" />
                      </Link>
                      <Link
                        to={`/booking?packageType=${cateringType}&packageId=${pkg.slug}&guests=${selectedGuests}`}
                        className="btn btn-maroon btn-sm py-2 rounded-3 text-white text-center d-flex align-items-center justify-content-center gap-2"
                        style={{ backgroundColor: 'var(--ac-maroon, #641e2b)' }}
                      >
                        <i className="bi bi-calendar2-check-fill" />
                        <span>{t.packagesPage.listing.enquireNow}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: Budget Tier Comparison Table (Section 5.5.1 B) */}
        {activeTab === 'compare' && (
          <div className="ac-comparison-card shadow-sm mt-3">
            <div className="table-responsive">
              <table className="table ac-comparison-table align-middle">
                <thead>
                  <tr>
                    <th>{language === 'mr' ? 'वैशिष्ट्ये / पदार्थ' : 'Feature / Course'}</th>
                    <th style={{ backgroundColor: '#5e35b1' }}>Basic ₹10K</th>
                    <th style={{ backgroundColor: '#2e7d32' }}>Standard ₹20K</th>
                    <th style={{ backgroundColor: '#b78103' }}>Premium ₹30K</th>
                    <th style={{ backgroundColor: '#641e2b' }}>Luxury</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.feature[language] || row.feature.en}</td>
                      <td>{row.basic[language] || row.basic.en}</td>
                      <td>{row.standard[language] || row.standard.en}</td>
                      <td>{row.premium[language] || row.premium.en}</td>
                      <td>{row.luxury[language] || row.luxury.en}</td>
                    </tr>
                  ))}
                  {/* Action Row */}
                  <tr>
                    <td className="fw-bold">{language === 'mr' ? 'थेट निवड' : 'Action'}</td>
                    <td>
                      <Link
                        to={`/booking?packageType=${cateringType}&packageId=basic-budget-package&guests=100`}
                        className="btn btn-sm btn-outline-primary px-3 py-1 rounded-pill"
                      >
                        {t.packagesPage.listing.enquireNow}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/booking?packageType=${cateringType}&packageId=standard-budget-package&guests=100`}
                        className="btn btn-sm btn-outline-success px-3 py-1 rounded-pill"
                      >
                        {t.packagesPage.listing.enquireNow}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/booking?packageType=${cateringType}&packageId=premium-budget-package&guests=100`}
                        className="btn btn-sm btn-outline-warning text-dark px-3 py-1 rounded-pill fw-bold"
                      >
                        {t.packagesPage.listing.enquireNow}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/booking?packageType=${cateringType}&packageId=luxury-custom-package`}
                        className="btn btn-sm btn-maroon text-white px-3 py-1 rounded-pill"
                        style={{ backgroundColor: 'var(--ac-maroon, #641e2b)' }}
                      >
                        {t.packagesPage.listing.enquireNow}
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Business Rule / Planning Disclaimer (Section 5.5.1 A) */}
        <div className="mt-4 p-3 px-4 rounded-3 bg-light border text-center text-muted small mx-auto" style={{ maxWidth: '900px' }}>
          <i className="bi bi-shield-exclamation text-maroon me-2 fs-6" />
          <span>{bText.proposalDisclaimer}</span>
        </div>
      </div>
    </section>
  );
}

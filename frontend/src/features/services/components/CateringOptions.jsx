import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';
import { defaultCateringOptions } from '../../../services/serviceService';

export default function CateringOptions({ options = defaultCateringOptions }) {
  const { language, t } = useLanguage();
  const optionsText = t.servicesPage.cateringOptions;

  return (
    <section className="py-5 bg-white" id="catering-options" aria-label="Catering Options">
      <div className="container-xl py-4">
        {/* Section Heading */}
        <SectionHeading
          tag={optionsText.tag}
          title={optionsText.heading}
          description={optionsText.description}
          centered={true}
        />

        {/* Options Cards Grid */}
        <div className="row g-4 mt-2 justify-content-center">
          {options.map((opt, idx) => {
            const title = opt.title?.[language] || opt.title?.en;
            const badge = opt.badge?.[language] || opt.badge?.en;
            const description = opt.description?.[language] || opt.description?.en;
            const features = opt.features?.[language] || opt.features?.en || [];
            const actionText = opt.actionText?.[language] || opt.actionText?.en || t.servicesPage.allServices.enquireNow;
            const isFirst = idx === 0;

            return (
              <div key={opt.id} className="col-12 col-lg-6 d-flex">
                <div
                  className={`card ac-catering-option-card w-100 p-4 p-md-5 d-flex flex-column ${
                    isFirst ? 'highlight' : ''
                  }`}
                >
                  {/* Top Bar with Icon and Badge */}
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="ac-option-icon-box">
                      <i className={`bi ${opt.icon}`} />
                    </div>
                    {badge && (
                      <span className="badge rounded-pill bg-light-maroon text-maroon px-3 py-2 fw-semibold fs-6">
                        {badge}
                      </span>
                    )}
                  </div>

                  {/* Title and Description */}
                  <h3 className="h4 fw-bold text-dark mb-3">
                    {title}
                  </h3>
                  <p className="text-muted mb-4 lead fs-6">
                    {description}
                  </p>

                  {/* Feature List */}
                  <div className="d-flex flex-column gap-2 mb-5 flex-grow-1">
                    {features.map((feat, fIdx) => (
                      <div key={fIdx} className="ac-feature-item">
                        <i className="bi bi-check-circle-fill ac-feature-icon" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Enquire CTA */}
                  <div className="mt-auto pt-2">
                    <Link
                      to={`/booking?cateringType=${opt.bookingParam}`}
                      className={`btn w-100 py-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 ${
                        isFirst
                          ? 'btn-maroon text-white shadow-sm'
                          : 'ac-btn-outline-maroon'
                      }`}
                      style={isFirst ? { backgroundColor: 'var(--ac-maroon, #641e2b)' } : {}}
                    >
                      <i className="bi bi-calendar2-check-fill" />
                      <span>{actionText}</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Business Rule / Disclosure Banner */}
        <div className="mt-4 p-3 px-4 rounded-3 bg-light border text-center text-muted small mx-auto" style={{ maxWidth: '880px' }}>
          <i className="bi bi-info-circle-fill text-maroon me-2" />
          <span>{optionsText.importantNote}</span>
        </div>
      </div>
    </section>
  );
}

import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';
import { defaultWhatsIncluded } from '../../../services/packageService';

export default function PackageInclusions({ items = defaultWhatsIncluded }) {
  const { language, t } = useLanguage();
  const incText = t.packagesPage.whatsIncluded;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'included':
        return (
          <span className="ac-status-badge ac-status-included">
            <i className="bi bi-check-circle-fill me-1" />
            {incText.status.included}
          </span>
        );
      case 'on-request':
        return (
          <span className="ac-status-badge ac-status-on-request">
            <i className="bi bi-hourglass-split me-1" />
            {incText.status.onRequest}
          </span>
        );
      case 'not-included':
      default:
        return (
          <span className="ac-status-badge ac-status-not-included">
            <i className="bi bi-dash-circle me-1" />
            {incText.status.notIncluded}
          </span>
        );
    }
  };

  return (
    <section className="py-5 bg-white" id="whats-included" aria-label="What is Included in Catering Packages">
      <div className="container-xl py-4">
        {/* Section Heading */}
        <SectionHeading
          tag={incText.tag}
          title={incText.heading}
          description={incText.description}
          centered={true}
        />

        {/* Inclusions Grid */}
        <div className="row g-4 mt-2 justify-content-center">
          {items.map((item) => {
            const title = item.title?.[language] || item.title?.en;
            const desc = item.description?.[language] || item.description?.en;

            return (
              <div key={item.id} className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex">
                <div className="ac-included-card w-100 shadow-sm">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="ac-included-icon-box mb-0">
                      <i className={`bi ${item.icon}`} />
                    </div>
                  </div>

                  <h3 className="h6 fw-bold text-dark mb-2">
                    {title}
                  </h3>
                  <p className="text-secondary small mb-3 flex-grow-1">
                    {desc}
                  </p>

                  <div className="mt-auto pt-2">
                    {getStatusBadge(item.status)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


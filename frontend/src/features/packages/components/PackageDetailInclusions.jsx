import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function PackageDetailInclusions({ pkg }) {
  const { language, t } = useLanguage();

  if (!pkg || !pkg.inclusions || pkg.inclusions.length === 0) {
    return null;
  }

  const detailText = t.packagesPage.detail;
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
    <section className="py-5 bg-white" aria-label="Package Inclusions">
      <div className="container-xl py-3" style={{ maxWidth: '960px' }}>
        {/* Section Heading */}
        <SectionHeading
          tag={language === 'mr' ? 'सुविधा' : 'Scope'}
          title={detailText.inclusionsTitle}
          centered={true}
        />

        {/* Inclusions List Card */}
        <div className="card border rounded-4 p-4 p-md-5 mt-4 shadow-sm bg-white">
          <div className="d-flex flex-column gap-3">
            {pkg.inclusions.map((inc, idx) => {
              const title = inc.title?.[language] || inc.title?.en;
              const desc = inc.description?.[language] || inc.description?.en;

              return (
                <div key={idx} className="ac-inclusion-row">
                  <div className="d-flex align-items-center gap-3 flex-grow-1">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center text-maroon flex-shrink-0"
                      style={{ width: '40px', height: '40px', backgroundColor: 'var(--ac-light-maroon, #f5eaec)' }}
                    >
                      <i className="bi bi-check-lg fw-bold" />
                    </div>
                    <div>
                      <h4 className="h6 fw-bold text-dark mb-1">
                        {title}
                      </h4>
                      <p className="text-muted small mb-0">
                        {desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    {getStatusBadge(inc.status)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


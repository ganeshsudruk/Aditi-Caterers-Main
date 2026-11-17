import { useLanguage } from '../../../context/LanguageContext';

export default function PackageDetailConditions({ pkg }) {
  const { language, t } = useLanguage();

  if (!pkg || !pkg.conditions) {
    return null;
  }

  const conditionsText = pkg.conditions?.[language] || pkg.conditions?.en || '';
  const title = t.packagesPage.detail.conditionsTitle;

  return (
    <section className="py-5 ac-bg-light" aria-label="Package Conditions and Guidelines">
      <div className="container-xl py-3" style={{ maxWidth: '960px' }}>
        <div className="p-4 p-md-5 rounded-4 bg-white border shadow-sm">
          <div className="d-flex align-items-center gap-3 mb-3">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
              style={{ width: '44px', height: '44px', backgroundColor: 'var(--ac-maroon, #641e2b)' }}
            >
              <i className="bi bi-info-circle-fill fs-5" />
            </div>
            <h3 className="h5 fw-bold text-dark mb-0">
              {title}
            </h3>
          </div>
          <p className="text-secondary small mb-0 lh-lg">
            {conditionsText}
          </p>
        </div>
      </div>
    </section>
  );
}


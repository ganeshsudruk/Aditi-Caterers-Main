import { useLanguage } from '../../../context/LanguageContext';

export default function PackageLoader() {
  const { t } = useLanguage();

  return (
    <div className="py-5 text-center my-5" aria-live="polite">
      <div
        className="spinner-border mb-3"
        style={{ width: '3rem', height: '3rem', color: 'var(--ac-maroon, #641e2b)' }}
        role="status"
      >
        <span className="visually-hidden">{t.common.loading}</span>
      </div>
      <p className="text-muted fw-semibold">{t.common.loading}</p>
    </div>
  );
}


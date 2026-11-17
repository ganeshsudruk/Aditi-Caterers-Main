import { useLanguage } from '../../../context/LanguageContext';

export default function AwardsEmptyState() {
  const { language, t } = useLanguage();
  const empty = t.awardsPage?.empty || {};

  return (
    <div className="ac-awards-empty my-4">
      <i
        className="bi bi-trophy mb-3"
        style={{ fontSize: '4rem', color: 'var(--ac-maroon, #641e2b)', opacity: 0.4 }}
        aria-hidden="true"
      />
      <h3 className="h5 fw-bold text-muted mb-2">
        {empty.heading || (language === 'mr' ? 'पुरस्कार लवकरच येतील' : 'Awards Coming Soon')}
      </h3>
      <p className="text-muted mb-0 small" style={{ maxWidth: '420px' }}>
        {empty.description || (language === 'mr'
          ? 'पुरस्कार आणि सन्मानांची माहिती लवकरच येथे उपलब्ध होईल.'
          : 'Awards and recognitions will be updated here soon.')}
      </p>
    </div>
  );
}

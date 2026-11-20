import { useLanguage } from '../../../context/LanguageContext';

export default function GalleryEmptyState({ onReset }) {
  const { language, t } = useLanguage();
  const empty = t.galleryPage?.empty || {};

  const title =
    empty.title ||
    (language === 'mr' ? 'छायाचित्रे आढळली नाहीत' : 'No Photographs Found');

  const message =
    empty.message ||
    (language === 'mr'
      ? 'या प्रकारासाठी सध्या कोणतीही छायाचित्रे उपलब्ध नाहीत. कृपया इतर पर्याय निवडा किंवा लवकरच पुन्हा पहा.'
      : 'No photographs found matching the selected category. Please select another category or check back soon.');

  const resetBtn =
    empty.resetBtn ||
    (language === 'mr' ? 'सर्व फोटो पहा' : 'View All Photos');

  return (
    <div className="ac-gallery-empty-card" role="status">
      <i className="bi bi-images ac-gallery-empty-icon d-block" aria-hidden="true" />
      <h3 className="h5 fw-bold text-dark mb-2">{title}</h3>
      <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '480px' }}>
        {message}
      </p>
      {onReset && (
        <button
          type="button"
          className="btn rounded-pill px-4 py-2 text-white fw-semibold"
          style={{ backgroundColor: 'var(--ac-maroon, #641e2b)' }}
          onClick={onReset}
        >
          <i className="bi bi-arrow-counterclockwise me-2" aria-hidden="true" />
          {resetBtn}
        </button>
      )}
    </div>
  );
}

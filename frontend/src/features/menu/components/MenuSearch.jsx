import { useLanguage } from '../../../context/LanguageContext';

export default function MenuSearch({ value, onChange, onClear, placeholder }) {
  const { language, t } = useLanguage();
  const searchDefaultPlaceholder =
    placeholder ||
    (language === 'mr'
      ? 'पदार्थाचे नाव किंवा साहित्य शोधा (उदा. मोदक, पुरणपोळी, पनीर)...'
      : 'Search dishes or ingredients (e.g. Modak, Puran Poli, Paneer)...');

  return (
    <div className="position-relative w-100" style={{ maxWidth: '480px' }}>
      <i
        className="bi bi-search position-absolute text-muted"
        style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}
      />
      <input
        type="text"
        className="form-control rounded-pill ps-5 pe-5 py-2 border-2"
        style={{ fontSize: '0.92rem', borderColor: '#eae2d8' }}
        placeholder={searchDefaultPlaceholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className="btn btn-sm btn-link position-absolute end-0 top-50 translate-middle-y text-muted text-decoration-none pe-3"
          onClick={onClear}
          aria-label="Clear Search"
        >
          <i className="bi bi-x-circle-fill" />
        </button>
      )}
    </div>
  );
}

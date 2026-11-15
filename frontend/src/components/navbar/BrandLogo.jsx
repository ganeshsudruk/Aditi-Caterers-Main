import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const LOGO_SRC = '/src/assets/branding/logo/logo-primary.png';

/**
 * BrandLogo – Logo with graceful text fallback.
 */
export default function BrandLogo() {
  const { t } = useLanguage();

  const handleError = (e) => {
    e.currentTarget.classList.add('ac-img-error');
  };

  return (
    <Link to="/" className="ac-brand" aria-label="Aditi Caterers – Home">
      <img
        src={LOGO_SRC}
        alt={t.logo.alt}
        className="ac-brand-logo"
        onError={handleError}
      />
      {/* Fallback: shown via CSS when image errors */}
      <span className="ac-brand-text" aria-hidden="true">
        <strong>Aditi Caterers</strong>
        <small>Professional Catering Services</small>
      </span>
    </Link>
  );
}

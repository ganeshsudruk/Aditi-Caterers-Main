import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

/**
 * BookNowButton – Primary CTA.
 * @param {function} onClick  - optional callback (e.g. close mobile drawer)
 * @param {boolean}  fullWidth - true inside mobile drawer
 */
export default function BookNowButton({ onClick, fullWidth = false }) {
  const { t } = useLanguage();

  return (
    <Link
      to="/booking"
      className={fullWidth ? 'ac-drawer-book-btn' : 'ac-book-btn'}
      onClick={onClick}
    >
      <i className="bi bi-calendar-check" aria-hidden="true" />
      {t.nav.bookNow}
    </Link>
  );
}

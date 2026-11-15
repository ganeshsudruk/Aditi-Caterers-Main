import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function PagePlaceholder({ title, description }) {
  const { t } = useLanguage();

  return (
    <div className="container-xl py-5 text-center my-5">
      <div className="py-5 max-w-700 mx-auto">
        <span className="badge bg-gold text-dark px-3 py-2 rounded-pill small fw-semibold mb-3">
          Aditi Caterers
        </span>
        <h1 className="fw-bold mb-3 text-dark">{title}</h1>
        <p className="text-muted mb-4 lead fs-6">
          {description || 'This section is under active development and will be available shortly.'}
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/" className="btn ac-btn-primary">
            <i className="bi bi-house-door-fill me-2" />
            {t.nav.home}
          </Link>
          <Link to="/booking" className="btn ac-btn-outline-primary">
            <i className="bi bi-calendar-check me-2" />
            {t.nav.bookNow}
          </Link>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function ServiceNotFound() {
  const { t } = useLanguage();
  const notFound = t.servicesPage.notFound;

  return (
    <div className="container-xl py-5 my-5">
      <div className="ac-not-found-card">
        <div className="ac-not-found-icon">
          <i className="bi bi-exclamation-triangle" />
        </div>
        <h2 className="h3 fw-bold text-dark mb-3">
          {notFound.title}
        </h2>
        <p className="text-secondary mb-4 fs-6">
          {notFound.message}
        </p>
        <Link
          to="/services"
          className="btn btn-maroon px-4 py-2 rounded-pill text-white fw-semibold d-inline-flex align-items-center gap-2"
          style={{ backgroundColor: 'var(--ac-maroon, #641e2b)' }}
        >
          <i className="bi bi-arrow-left" />
          <span>{notFound.backBtn}</span>
        </Link>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function PackageNotFound() {
  const { language, t } = useLanguage();
  const notFound = t.packagesPage?.notFound || {
    title: language === 'mr' ? 'पॅकेज आढळले नाही' : 'Package Not Found',
    message: language === 'mr' ? 'माफ करा, तुम्ही शोधत असलेले केटरिंग पॅकेज उपलब्ध नाही.' : 'Sorry, the catering package you are looking for does not exist or has been updated.',
    backBtn: language === 'mr' ? 'सर्व पॅकेजेसकडे परत जा' : 'Back to All Packages',
  };

  return (
    <div className="container-xl py-5 my-5">
      <div className="ac-not-found-card text-center p-5 rounded-4 shadow-sm bg-white mx-auto border" style={{ maxWidth: '600px' }}>
        <div className="ac-not-found-icon mb-3" style={{ fontSize: '3rem', color: '#dc3545' }}>
          <i className="bi bi-exclamation-triangle" />
        </div>
        <h2 className="h3 fw-bold text-dark mb-3">
          {notFound.title}
        </h2>
        <p className="text-secondary mb-4 fs-6">
          {notFound.message}
        </p>
        <Link
          to="/packages"
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


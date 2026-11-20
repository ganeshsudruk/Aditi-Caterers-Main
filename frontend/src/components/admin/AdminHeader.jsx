import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { useAdminLanguage } from '../../context/useAdminLanguage';

export default function AdminHeader({ onToggleSidebar }) {
  const { admin, logout } = useAuth();
  const { at, adminLang, toggleAdminLang } = useAdminLanguage();

  return (
    <header className="ac-admin-header" aria-label="Admin Page Header">
      <div className="d-flex align-items-center gap-3">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm d-lg-none"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation sidebar"
        >
          <i className="bi bi-list fs-5"></i>
        </button>

        <span className="fw-bold text-dark fs-6 d-none d-sm-inline">
          {at.header.portal}
        </span>
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* Language Switcher */}
        <button
          type="button"
          onClick={toggleAdminLang}
          className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
          aria-label={adminLang === 'en' ? 'Switch to Marathi' : 'Switch to English'}
          title={adminLang === 'en' ? 'मराठीत बदला' : 'Switch to English'}
        >
          <i className="bi bi-translate" aria-hidden="true"></i>
          <span className="d-none d-md-inline">{at.header.switchLang}</span>
        </button>

        {/* Public Website Preview Link */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
          aria-label="Open public website in a new tab"
        >
          <i className="bi bi-globe2" aria-hidden="true"></i>
          <span className="d-none d-md-inline">{at.header.viewWebsite}</span>
        </Link>

        {/* Admin User Badge */}
        <div className="d-flex align-items-center gap-2">
          <div
            className="rounded-circle bg-light border d-flex align-items-center justify-content-center text-maroon fw-bold"
            style={{ width: '36px', height: '36px', color: '#641e2b' }}
            aria-hidden="true"
          >
            {admin?.name ? admin.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <span className="d-none d-md-inline small fw-semibold text-dark">
            {admin?.name || 'Administrator'}
          </span>
        </div>

        {/* Logout Action */}
        <button
          type="button"
          onClick={logout}
          className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
          aria-label="Sign out"
        >
          <i className="bi bi-box-arrow-right" aria-hidden="true"></i>
          <span className="d-none d-sm-inline">{at.header.logout}</span>
        </button>
      </div>
    </header>
  );
}

import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { useAdminLanguage } from '../../context/useAdminLanguage';

export default function AdminSidebar({ isOpen, onClose }) {
  const { logout, admin } = useAuth();
  const { at } = useAdminLanguage();

  const NAV_ITEMS = [
    { path: '/admin/dashboard', labelKey: 'dashboard', icon: 'bi-speedometer2' },
    { path: '/admin/bookings', labelKey: 'bookings', icon: 'bi-calendar-check-fill' },
    { path: '/admin/customers', labelKey: 'customers', icon: 'bi-people-fill' },
    { path: '/admin/services', labelKey: 'services', icon: 'bi-briefcase-fill' },
    { path: '/admin/menu', labelKey: 'menu', icon: 'bi-egg-fried' },
    { path: '/admin/packages', labelKey: 'packages', icon: 'bi-box-seam-fill' },
    { path: '/admin/gallery', labelKey: 'gallery', icon: 'bi-images' },
    { path: '/admin/awards', labelKey: 'awards', icon: 'bi-trophy-fill' },
    { path: '/admin/testimonials', labelKey: 'testimonials', icon: 'bi-chat-quote-fill' },
    { path: '/admin/quotations', labelKey: 'quotations', icon: 'bi-file-earmark-text-fill' },
    { path: '/admin/reports', labelKey: 'reports', icon: 'bi-file-earmark-bar-graph-fill' },
    { path: '/admin/faqs', labelKey: 'faqs', icon: 'bi-question-circle-fill' },
    { path: '/admin/settings', labelKey: 'settings', icon: 'bi-gear-fill' },
  ];

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="ac-admin-backdrop" onClick={onClose} aria-hidden="true" />}

      <aside
        className={`ac-admin-sidebar ${isOpen ? 'show' : ''}`}
        aria-label="Admin Navigation Sidebar"
      >
        {/* Header / Brand */}
        <div className="ac-admin-sidebar-header">
          <NavLink to="/admin/dashboard" className="ac-admin-sidebar-brand" onClick={handleNavClick}>
            <i className="bi bi-shield-lock-fill" aria-hidden="true"></i>
            <span>{at.sidebar.brand}</span>
          </NavLink>
          {isOpen && (
            <button
              type="button"
              className="btn btn-sm btn-link text-white-50 d-lg-none p-0 text-decoration-none"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <i className="bi bi-x-lg fs-5"></i>
            </button>
          )}
        </div>

        {/* Navigation list */}
        <nav className="ac-admin-nav" aria-label="Admin Modules">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `ac-admin-nav-item ${isActive ? 'active' : ''}`
              }
              onClick={handleNavClick}
            >
              <i className={`bi ${item.icon}`} aria-hidden="true"></i>
              <span>{at.sidebar[item.labelKey]}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer with Logged-in User and Logout */}
        <div className="ac-admin-sidebar-footer">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="text-truncate me-2">
              <div className="small fw-semibold text-white text-truncate">
                {admin?.name || 'Administrator'}
              </div>
              <div className="text-white-50 text-truncate" style={{ fontSize: '0.75rem' }}>
                {admin?.email || 'admin@aditicaterers.com'}
              </div>
            </div>
            <span className="badge bg-danger-subtle text-danger" style={{ fontSize: '0.7rem' }}>
              {at.sidebar.adminBadge}
            </span>
          </div>

          <button
            type="button"
            onClick={logout}
            className="btn btn-sm btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2"
            aria-label="Log out of admin session"
          >
            <i className="bi bi-box-arrow-right" aria-hidden="true"></i>
            <span>{at.sidebar.signOut}</span>
          </button>
        </div>
      </aside>
    </>
  );
}

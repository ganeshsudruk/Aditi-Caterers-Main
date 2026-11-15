import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import BrandLogo from './BrandLogo';
import BookNowButton from './BookNowButton';

/**
 * MobileMenu – Right-side slide-in drawer for mobile navigation.
 *
 * Props:
 *  isOpen  – boolean
 *  onClose – callback
 */
export default function MobileMenu({ isOpen, onClose }) {
  const { t } = useLanguage();
  const location = useLocation();
  const [openSub, setOpenSub] = useState(null); // 'services' | 'menu' | null

  // Close drawer on route change
  useEffect(() => { onClose(); }, [location.pathname]);

  // Disable body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const toggleSub = (key) => setOpenSub((prev) => (prev === key ? null : key));

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const serviceItems = [
    { label: t.services.wedding,    route: '/services/wedding'    },
    { label: t.services.birthday,   route: '/services/birthday'   },
    { label: t.services.engagement, route: '/services/engagement' },
    { label: t.services.reception,  route: '/services/reception'  },
    { label: t.services.corporate,  route: '/services/corporate'  },
    { label: t.services.religious,  route: '/services/religious'  },
    { label: t.services.other,      route: '/services/other'      },
  ];

  const menuItems = [
    { label: t.menu.breakfast,     route: '/menu/breakfast'     },
    { label: t.menu.starters,      route: '/menu/starters'      },
    { label: t.menu.mainCourse,    route: '/menu/main-course'   },
    { label: t.menu.maharashtrian, route: '/menu/maharashtrian' },
    { label: t.menu.punjabi,       route: '/menu/punjabi'       },
    { label: t.menu.southIndian,   route: '/menu/south-indian'  },
    { label: t.menu.desserts,      route: '/menu/desserts'      },
    { label: t.menu.beverages,     route: '/menu/beverages'     },
  ];

  return (
    <>
      {/* Dark overlay */}
      <div
        className={`ac-drawer-overlay ${isOpen ? 'ac-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        id="mobile-nav-drawer"
        className={`ac-drawer ${isOpen ? 'ac-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={t.aria.mainNav}
      >
        {/* Header */}
        <div className="ac-drawer-head">
          <BrandLogo />
          <button
            type="button"
            className="ac-drawer-close"
            onClick={onClose}
            aria-label={t.aria.closeMenu}
          >
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable body */}
        <nav className="ac-drawer-body" aria-label={t.aria.mainNav}>

          <Link to="/"       className={`ac-drawer-link ${isActive('/')        ? 'active' : ''}`}>{t.nav.home}</Link>
          <Link to="/about"  className={`ac-drawer-link ${isActive('/about')   ? 'active' : ''}`}>{t.nav.about}</Link>

          {/* Services accordion */}
          <button
            type="button"
            className={`ac-drawer-toggle ${isActive('/services') ? 'active' : ''}`}
            onClick={() => toggleSub('services')}
            aria-expanded={openSub === 'services'}
            aria-controls="drawer-services-sub"
          >
            {t.nav.services}
            <i className="bi bi-chevron-down ac-caret" aria-hidden="true" />
          </button>
          <div
            id="drawer-services-sub"
            className={`ac-drawer-sub ${openSub === 'services' ? 'ac-open' : ''}`}
          >
            {serviceItems.map(({ label, route }) => (
              <Link
                key={route}
                to={route}
                className={`ac-drawer-sub-link ${location.pathname === route ? 'active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Food Menu accordion */}
          <button
            type="button"
            className={`ac-drawer-toggle ${isActive('/menu') ? 'active' : ''}`}
            onClick={() => toggleSub('menu')}
            aria-expanded={openSub === 'menu'}
            aria-controls="drawer-menu-sub"
          >
            {t.nav.menu}
            <i className="bi bi-chevron-down ac-caret" aria-hidden="true" />
          </button>
          <div
            id="drawer-menu-sub"
            className={`ac-drawer-sub ${openSub === 'menu' ? 'ac-open' : ''}`}
          >
            {menuItems.map(({ label, route }) => (
              <Link
                key={route}
                to={route}
                className={`ac-drawer-sub-link ${location.pathname === route ? 'active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          <Link to="/packages"  className={`ac-drawer-link ${isActive('/packages')  ? 'active' : ''}`}>{t.nav.packages}</Link>
          <Link to="/gallery"   className={`ac-drawer-link ${isActive('/gallery')   ? 'active' : ''}`}>{t.nav.gallery}</Link>
          <Link to="/awards"    className={`ac-drawer-link ${isActive('/awards')    ? 'active' : ''}`}>{t.nav.awards}</Link>
          <Link to="/contact"   className={`ac-drawer-link ${isActive('/contact')   ? 'active' : ''}`}>{t.nav.contact}</Link>

        </nav>

        {/* Footer CTA */}
        <div className="ac-drawer-foot">
          <BookNowButton fullWidth onClick={onClose} />
        </div>
      </div>
    </>
  );
}

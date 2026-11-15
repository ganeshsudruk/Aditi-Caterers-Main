import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import NavDropdown from './NavDropdown';

/**
 * NavLinks – Horizontal desktop navigation list (centre column).
 */
export default function NavLinks() {
  const { t } = useLanguage();
  const location  = useLocation();
  const [openKey, setOpenKey] = useState(null); // 'services' | 'menu' | null

  const toggle = (key) => (val) =>
    setOpenKey(typeof val === 'boolean' ? (val ? key : null) : openKey === key ? null : key);

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
    <ul className="ac-nav-links" role="menubar" aria-label={t.aria.mainNav}>

      <li className="ac-nav-item" role="none">
        <Link to="/" role="menuitem" className={`ac-nav-link ${isActive('/') ? 'active' : ''}`}>
          {t.nav.home}
        </Link>
      </li>

      <li className="ac-nav-item" role="none">
        <Link to="/about" role="menuitem" className={`ac-nav-link ${isActive('/about') ? 'active' : ''}`}>
          {t.nav.about}
        </Link>
      </li>

      <NavDropdown
        label={t.nav.services}
        items={serviceItems}
        basePath="/services"
        isOpen={openKey === 'services'}
        onToggle={toggle('services')}
        id="dd-services"
      />

      <NavDropdown
        label={t.nav.menu}
        items={menuItems}
        basePath="/menu"
        isOpen={openKey === 'menu'}
        onToggle={toggle('menu')}
        id="dd-menu"
      />

      <li className="ac-nav-item" role="none">
        <Link to="/packages" role="menuitem" className={`ac-nav-link ${isActive('/packages') ? 'active' : ''}`}>
          {t.nav.packages}
        </Link>
      </li>

      <li className="ac-nav-item" role="none">
        <Link to="/gallery" role="menuitem" className={`ac-nav-link ${isActive('/gallery') ? 'active' : ''}`}>
          {t.nav.gallery}
        </Link>
      </li>

      <li className="ac-nav-item" role="none">
        <Link to="/awards" role="menuitem" className={`ac-nav-link ${isActive('/awards') ? 'active' : ''}`}>
          {t.nav.awards}
        </Link>
      </li>

      <li className="ac-nav-item" role="none">
        <Link to="/contact" role="menuitem" className={`ac-nav-link ${isActive('/contact') ? 'active' : ''}`}>
          {t.nav.contact}
        </Link>
      </li>

    </ul>
  );
}

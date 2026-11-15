import { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * NavDropdown – Desktop dropdown attached to a nav item.
 *
 * Props:
 *  label    – button label text
 *  items    – [{ label, route }]
 *  basePath – e.g. '/services'  (activates parent highlight)
 *  isOpen   – boolean
 *  onToggle – (bool) => void
 *  id       – id for aria-controls
 */
export default function NavDropdown({ label, items, basePath, isOpen, onToggle, id }) {
  const location  = useLocation();
  const wrapRef   = useRef(null);
  const isParentActive = location.pathname.startsWith(basePath);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) onToggle(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onToggle]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onToggle(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onToggle]);

  return (
    <li
      className="ac-nav-item"
      ref={wrapRef}
      onMouseEnter={() => onToggle(true)}
      onMouseLeave={() => onToggle(false)}
    >
      <button
        type="button"
        className={`ac-nav-btn ${isParentActive ? 'active' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={() => onToggle(!isOpen)}
      >
        {label}
        <i className="bi bi-chevron-down ac-caret" aria-hidden="true" />
      </button>

      <div
        id={id}
        role="listbox"
        className={`ac-dropdown ${isOpen ? 'ac-open' : ''}`}
      >
        {items.map(({ label: itemLabel, route }) => (
          <Link
            key={route}
            to={route}
            role="option"
            aria-selected={location.pathname === route}
            className={`ac-dropdown-link ${location.pathname === route ? 'active' : ''}`}
            onClick={() => onToggle(false)}
          >
            {itemLabel}
          </Link>
        ))}
      </div>
    </li>
  );
}

import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import TopBar from './TopBar';
import BrandLogo from './BrandLogo';
import NavLinks from './NavLinks';
import LanguageSwitcher from './LanguageSwitcher';
import BookNowButton from './BookNowButton';
import MobileMenu from './MobileMenu';
import './navbar.css';

/**
 * Navbar — Aditi Caterers full-width navigation
 *
 * Visual structure (desktop ≥ 992px):
 * ┌──────────────────────────────────────────────────────────┐
 * │  +91 9975959391          WhatsApp  [social icons]        │  ← TopBar (maroon)
 * ├──────────────────────────────────────────────────────────┤
 * │  [Logo]   Home  About  Services▾  Menu▾  ...   EN|मराठी  [Book Now] │  ← Navbar
 * └──────────────────────────────────────────────────────────┘
 *
 * On mobile (< 992px):
 * ┌──────────────────────────────────────────────────────────┐
 * │  [Logo]                             EN|मराठी  ☰          │
 * └──────────────────────────────────────────────────────────┘
 *   → Hamburger opens right-side drawer
 */
export default function Navbar() {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled,  setIsScrolled] = useState(false);

  // Add shadow when scrolled past the navbar
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {/* ── Top Information Bar (not sticky — scrolls away) ───── */}
      <TopBar />

      {/* ── Main Navbar (sticky) ──────────────────────────────── */}
      <header>
        <nav
          className={`ac-navbar-wrapper ${isScrolled ? 'ac-scrolled' : ''}`}
          aria-label={t.aria.mainNav}
        >
          {/*
            ac-navbar-inner uses a 3-column CSS grid:
              [Logo] | [Nav links – centred] | [Lang + Book Now]
            On mobile the grid collapses to 2 columns: [Logo] | [Mobile controls]
          */}
          <div className="ac-navbar-inner">

            {/* ── Column 1: Brand Logo ─────────────────────── */}
            <BrandLogo />

            {/* ── Column 2: Desktop Navigation Links ──────── */}
            <NavLinks />

            {/* ── Column 3: Right Controls (desktop) ──────── */}
            <div className="ac-nav-controls">
              <LanguageSwitcher />
              <BookNowButton />
            </div>

            {/* ── Column 3: Mobile Controls (tablet / phone) ── */}
            <div className="ac-mobile-controls">
              <LanguageSwitcher />
              <button
                type="button"
                className="ac-hamburger"
                onClick={() => setMobileOpen(true)}
                aria-label={t.aria.openMenu}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-drawer"
              >
                <i className="bi bi-list" aria-hidden="true" />
              </button>
            </div>

          </div>
        </nav>
      </header>

      {/* ── Mobile Drawer ─────────────────────────────────────── */}
      <MobileMenu isOpen={mobileOpen} onClose={closeMenu} />
    </>
  );
}

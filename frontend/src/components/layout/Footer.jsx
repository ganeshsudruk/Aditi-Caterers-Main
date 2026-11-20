import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  // Social links (shown only when approved URLs are available)
  const socialLinks = [];

  return (
    <footer className="ac-footer" role="contentinfo">
      {/* ── Main Footer Content ── */}
      <div className="container-xl py-5">
        <div className="row g-4 justify-content-between">
          
          {/* Col 1: Brand & About */}
          <div className="col-lg-4 col-md-6">
            <div className="ac-footer-brand mb-3">
              <span className="ac-footer-logo-text">Aditi Caterers</span>
              <span className="ac-footer-tagline d-block">
                {t.logo?.alt || 'Professional Catering Services'}
              </span>
            </div>
            <p className="ac-footer-desc text-white-50 mb-4">
              {t.footer.brandDesc}
            </p>
            <div className="d-flex align-items-center gap-3">
              <a
                href="tel:+919975959391"
                className="btn btn-sm btn-outline-light rounded-pill px-3 py-1 d-inline-flex align-items-center gap-2"
                aria-label="Call Aditi Caterers"
              >
                <i className="bi bi-telephone-fill" aria-hidden="true" />
                <span>+91 9975959391</span>
              </a>
              <a
                href="https://wa.me/919975959391"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-success rounded-pill px-3 py-1 d-inline-flex align-items-center gap-2"
                aria-label="WhatsApp Aditi Caterers"
              >
                <i className="bi bi-whatsapp" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="ac-footer-heading">{t.footer.quickLinks}</h5>
            <ul className="ac-footer-links">
              <li><Link to="/">{t.nav.home}</Link></li>
              <li><Link to="/about">{t.nav.about}</Link></li>
              <li><Link to="/services">{t.nav.services}</Link></li>
              <li><Link to="/menu">{t.nav.menu}</Link></li>
              <li><Link to="/packages">{t.nav.packages}</Link></li>
              <li><Link to="/gallery">{t.nav.gallery}</Link></li>
              <li><Link to="/contact">{t.nav.contact}</Link></li>
              <li><Link to="/booking" className="text-warning fw-semibold">{t.nav.bookNow}</Link></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="col-lg-3 col-md-3 col-6">
            <h5 className="ac-footer-heading">{t.footer.servicesTitle}</h5>
            <ul className="ac-footer-links">
              <li><Link to="/services/wedding">{t.services.wedding}</Link></li>
              <li><Link to="/services/birthday">{t.services.birthday}</Link></li>
              <li><Link to="/services/engagement">{t.services.engagement}</Link></li>
              <li><Link to="/services/reception">{t.services.reception}</Link></li>
              <li><Link to="/services/corporate">{t.services.corporate}</Link></li>
              <li><Link to="/services/religious">{t.services.religious}</Link></li>
              <li><Link to="/services/other">{t.services.other}</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h5 className="ac-footer-heading">{t.footer.contactTitle}</h5>
            <div className="ac-footer-contact-list">
              <div className="d-flex align-items-start gap-3 mb-3">
                <i className="bi bi-telephone-fill ac-footer-icon" aria-hidden="true" />
                <div>
                  <small className="text-white-50 d-block">{t.home?.contact?.phone || 'Phone Number'}</small>
                  <a href="tel:+919975959391" className="text-white text-decoration-none fw-medium">
                    +91 9975959391
                  </a>
                </div>
              </div>
              <div className="d-flex align-items-start gap-3 mb-3">
                <i className="bi bi-whatsapp ac-footer-icon text-success" aria-hidden="true" />
                <div>
                  <small className="text-white-50 d-block">{t.home?.contact?.whatsapp || 'WhatsApp'}</small>
                  <a
                    href="https://wa.me/919975959391"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-decoration-none fw-medium"
                  >
                    +91 9975959391
                  </a>
                </div>
              </div>
              <div className="d-flex align-items-start gap-3">
                <i className="bi bi-clock-fill ac-footer-icon text-warning" aria-hidden="true" />
                <div>
                  <small className="text-white-50 d-block">{t.topbar?.hours || 'Business Hours'}</small>
                  <span className="text-white-50 small">Mon–Sun: 9:00 AM – 8:00 PM</span>
                </div>
              </div>

              {socialLinks.length > 0 && (
                <div className="mt-4 d-flex gap-2">
                  {socialLinks.map(({ key, icon, url, label }) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ac-social-btn"
                      aria-label={label}
                    >
                      <i className={`bi ${icon}`} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── Footer Bottom ── */}
      <div className="ac-footer-bottom border-top border-white-10 py-3">
        <div className="container-xl d-flex flex-wrap justify-content-between align-items-center gap-2 small text-white-50">
          <div>
            © {currentYear} <strong>Aditi Caterers</strong>. {t.footer.rights}
          </div>
          <div className="d-flex gap-3">
            <Link to="/about" className="text-white-50 text-decoration-none hover-white">
              {t.nav.about}
            </Link>
            <span>•</span>
            <Link to="/contact" className="text-white-50 text-decoration-none hover-white">
              {t.nav.contact}
            </Link>
            <span>•</span>
            <Link to="/booking" className="text-warning text-decoration-none">
              {t.nav.bookNow}
            </Link>
            <span>•</span>
            <Link to="/admin/login" className="text-warning text-decoration-none">
              {t.nav.bookNow}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

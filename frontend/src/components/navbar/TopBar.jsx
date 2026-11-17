import { useLanguage } from '../../context/LanguageContext';

/**
 * TopBar – Full-width maroon information bar
 * Shows: Phone | WhatsApp | (Hours) | Social icons
 */
export default function TopBar() {
  const { t } = useLanguage();

  // Add real official URLs when confirmed by business owner.
  // Keep this array empty to hide the social section entirely.
  const socialLinks = [
    { key: 'instagram', icon: 'bi-instagram', url: 'https://instagram.com/aditicaterers', label: 'Instagram' },
    { key: 'facebook',  icon: 'bi-facebook',  url: 'https://facebook.com/aditicaterers',  label: 'Facebook'  },
    { key: 'youtube',   icon: 'bi-youtube',   url: 'https://youtube.com/@aditicaterers',  label: 'YouTube'   },
  ];

  return (
    <div className="ac-topbar" role="complementary" aria-label={t.aria.topBar}>
      <div className="ac-topbar-inner">

        {/* ── Left: Phone (+ optional Hours) ── */}
        <div className="ac-topbar-left">
          <a
            href="tel:+919975959391"
            className="ac-topbar-link"
            aria-label="Call Aditi Caterers"
          >
            <i className="bi bi-telephone-fill" aria-hidden="true" />
            <span>{t.topbar.phone}</span>
          </a>

          {/* Business hours — uncomment when confirmed */}
          {/* <span className="ac-topbar-sep" aria-hidden="true">|</span>
          <span className="ac-topbar-link ac-topbar-hours">
            <i className="bi bi-clock" aria-hidden="true" />
            {t.topbar.hours}
          </span> */}
        </div>

        {/* ── Right: WhatsApp + Social ── */}
        <div className="ac-topbar-right">
          <a
            href="https://wa.me/919975959391"
            className="ac-topbar-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
          >
            <i className="bi bi-whatsapp" aria-hidden="true" />
            <span>{t.topbar.whatsapp}</span>
          </a>

          {socialLinks.length > 0 && (
            <>
              <span className="ac-topbar-sep" aria-hidden="true">|</span>
              {socialLinks.map(({ key, icon, url, label }) => (
                <a
                  key={key}
                  href={url}
                  className="ac-social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <i className={`bi ${icon}`} aria-hidden="true" />
                </a>
              ))}
            </>
          )}
        </div>

      </div>
    </div>
  );
}

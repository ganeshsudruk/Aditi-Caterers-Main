import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function CustomPackageCTA() {
  const { t } = useLanguage();
  const custom = t.packagesPage.customCTA;

  return (
    <section className="py-5 bg-white" aria-label="Request a Custom Catering Package">
      <div className="container-xl py-3">
        <div className="ac-custom-cta-card text-center shadow-lg">
          <div className="position-relative z-1 mx-auto" style={{ maxWidth: '820px' }}>
            <span className="badge bg-gold text-dark px-3 py-2 rounded-pill fw-bold mb-3 fs-6">
              <i className="bi bi-stars me-2" />
              {custom.tag}
            </span>

            <h2 className="display-6 fw-bold mb-3 text-white">
              {custom.title}
            </h2>

            <p className="lead fs-6 text-white-50 mb-4 mx-auto" style={{ maxWidth: '700px' }}>
              {custom.description}
            </p>

            <Link
              to="/booking?packageType=custom"
              className="btn btn-warning px-5 py-3 rounded-pill fw-bold text-dark d-inline-flex align-items-center gap-2 shadow-sm"
              style={{ backgroundColor: 'var(--ac-gold, #c9a45c)', borderColor: 'var(--ac-gold, #c9a45c)' }}
            >
              <i className="bi bi-file-earmark-plus-fill" />
              <span>{custom.button}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


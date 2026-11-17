import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function AwardsHero() {
  const { language, t } = useLanguage();
  const hero = t.awardsPage?.hero || {};

  return (
    <section className="ac-awards-hero text-white" aria-label="Awards Hero">
      <div className="container-xl text-center position-relative">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3 d-inline-block">
          <ol className="breadcrumb mb-0 px-3 py-1 bg-white bg-opacity-10 rounded-pill small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-white text-decoration-none">
                <i className="bi bi-house-door-fill me-1" />
                {t.nav?.home || 'Home'}
              </Link>
            </li>
            <li className="breadcrumb-item active fw-semibold" style={{ color: 'var(--ac-gold, #c9a45c)' }} aria-current="page">
              {t.nav?.awards || 'Awards'}
            </li>
          </ol>
        </nav>

        {/* Trophy Icon */}
        <div className="mb-3">
          <i className="bi bi-trophy-fill" style={{ fontSize: '3rem', color: 'var(--ac-gold, #c9a45c)' }} aria-hidden="true" />
        </div>

        <h1 className="display-5 fw-bold mb-3">
          {hero.heading || (language === 'mr' ? 'पुरस्कार आणि सन्मान' : 'Awards & Recognition')}
        </h1>
        <p
          className="lead fs-6 text-white-50 mx-auto"
          style={{ maxWidth: '640px' }}
        >
          {hero.description || (language === 'mr'
            ? 'आमच्या कामाची दखल घेऊन मिळालेले प्रत्येक पुरस्कार आणि सन्मान ही आमच्यासाठी अभिमानाची गोष्ट आहे.'
            : 'Every recognition is a reminder of our commitment to quality food and dedicated catering service.')}
        </p>
      </div>
    </section>
  );
}

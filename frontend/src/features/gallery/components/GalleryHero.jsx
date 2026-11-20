import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function GalleryHero() {
  const { language, t } = useLanguage();
  const hero = t.galleryPage?.hero || {};

  return (
    <section className="ac-gallery-hero text-white" aria-label="Gallery Hero Banner">
      <div className="container-xl text-center position-relative">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3 d-inline-block">
          <ol className="breadcrumb mb-0 px-3 py-1 bg-white bg-opacity-10 rounded-pill small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-white text-decoration-none">
                <i className="bi bi-house-door-fill me-1" aria-hidden="true" />
                {hero.breadcrumbHome || (language === 'mr' ? 'मुख्यपृष्ठ' : 'Home')}
              </Link>
            </li>
            <li
              className="breadcrumb-item active fw-semibold"
              style={{ color: 'var(--ac-gold, #c9a45c)' }}
              aria-current="page"
            >
              {hero.breadcrumbGallery || (language === 'mr' ? 'गॅलरी' : 'Gallery')}
            </li>
          </ol>
        </nav>

        {/* Decorative Camera / Images Icon */}
        <div className="mb-3">
          <i
            className="bi bi-images"
            style={{ fontSize: '3rem', color: 'var(--ac-gold, #c9a45c)' }}
            aria-hidden="true"
          />
        </div>

        {/* Title */}
        <h1 className="display-5 fw-bold mb-3">
          {hero.title || (language === 'mr' ? 'आमची गॅलरी' : 'Our Gallery')}
        </h1>

        {/* Subtitle / Introduction */}
        <p
          className="lead fs-6 text-white-50 mx-auto mb-0"
          style={{ maxWidth: '680px' }}
        >
          {hero.subtitle ||
            (language === 'mr'
              ? 'आमचे खाद्यपदार्थ, केटरिंग व्यवस्था आणि कार्यक्रमांमधील काही खास क्षण छायाचित्रांमधून पहा.'
              : 'Explore photographs of our food, catering arrangements, and event celebrations. Discover the presentation and catering services offered by Aditi Caterers.')}
        </p>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function ServiceCard({ service }) {
  const { language, t } = useLanguage();

  if (!service) return null;

  const title = service.name?.[language] || service.name?.en || service.slug;
  const description = service.shortDescription?.[language] || service.shortDescription?.en || '';
  const imageUrl = service.image?.url || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80';
  const imageAlt = service.image?.alt?.[language] || service.image?.alt?.en || title;
  const icon = service.icon || 'bi-cup-hot-fill';

  const viewDetailsText = t.servicesPage?.allServices?.viewDetails || 'View Details';
  const enquireNowText = t.servicesPage?.allServices?.enquireNow || 'Enquire Now';

  return (
    <div className="col-12 col-md-6 col-lg-3 d-flex">
      <div className="card ac-service-card w-100 rounded-4 overflow-hidden border shadow-sm d-flex flex-column">
        {/* Card Image with Overlay and Badge */}
        <div className="ac-service-img-wrapper position-relative">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="ac-service-img"
            loading="lazy"
          />
          {/* Service Icon Badge */}
          <div className="ac-service-icon-badge" title={title}>
            <i className={`bi ${icon}`} />
          </div>
        </div>

        {/* Card Content */}
        <div className="card-body p-4 d-flex flex-column flex-grow-1">
          <h3 className="h5 ac-service-title mb-2">
            {title}
          </h3>
          <p className="text-muted small mb-4 flex-grow-1">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="d-flex flex-column gap-2 mt-auto pt-2">
            <Link
              to={`/services/${service.slug}`}
              className="btn ac-btn-outline-maroon btn-sm py-2 rounded-3 text-center d-flex align-items-center justify-content-center gap-2"
            >
              <span>{viewDetailsText}</span>
              <i className="bi bi-arrow-right" />
            </Link>
            <Link
              to={`/booking?eventType=${service.slug}`}
              className="btn btn-maroon btn-sm py-2 rounded-3 text-white text-center d-flex align-items-center justify-content-center gap-2"
              style={{ backgroundColor: 'var(--ac-maroon, #641e2b)' }}
            >
              <i className="bi bi-calendar-check" />
              <span>{enquireNowText}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

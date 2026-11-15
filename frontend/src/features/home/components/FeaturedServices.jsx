import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function FeaturedServices({ services = [] }) {
  const { t } = useLanguage();

  return (
    <section className="ac-services-section py-5 ac-bg-light" aria-label="Our Catering Services">
      <div className="container-xl py-4">
        
        {/* Section Heading */}
        <SectionHeading
          tag={t.home.servicesSection.tag}
          title={t.home.servicesSection.title}
          description={t.home.servicesSection.description}
        />

        {/* Services Grid */}
        <div className="row g-4 mt-2">
          {services.map((service) => {
            const title = t.services[service.key] || service.name || service.key;
            const descKey = `${service.key}Desc`;
            const description =
              t.home.servicesSection[descKey] ||
              service.description ||
              'Quality catering arrangements designed for your special occasion.';

            return (
              <div key={service.id || service.key} className="col-lg-4 col-md-6">
                <div className="ac-service-card h-100 bg-white rounded-4 overflow-hidden shadow-sm d-flex flex-direction-column">
                  {/* Card Image */}
                  <div className="ac-service-img-wrap position-relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={title}
                      className="w-100 h-100 object-fit-cover ac-service-img"
                      loading="lazy"
                    />
                    <div className="ac-service-icon-badge position-absolute top-0 end-0 m-3">
                      <i className={`bi ${service.icon || 'bi-stars'}`} aria-hidden="true" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 d-flex flex-column flex-grow-1 justify-content-between">
                    <div>
                      <h3 className="h5 fw-bold text-dark mb-2 ac-service-title">
                        {title}
                      </h3>
                      <p className="text-muted small mb-3">
                        {description}
                      </p>
                    </div>

                    <div className="pt-2 border-top border-light">
                      <Link
                        to={service.route || `/services/${service.key}`}
                        className="ac-card-link text-maroon fw-semibold text-decoration-none d-inline-flex align-items-center gap-2 small"
                      >
                        <span>{t.home.servicesSection.viewDetails}</span>
                        <i className="bi bi-arrow-right" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Services CTA */}
        <div className="text-center mt-5">
          <Link
            to="/services"
            className="btn ac-btn-outline-primary px-4 py-2"
          >
            {t.home.servicesSection.viewAll}
            <i className="bi bi-arrow-right ms-2" />
          </Link>
        </div>

      </div>
    </section>
  );
}

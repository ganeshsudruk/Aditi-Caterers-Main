import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function RelatedServices({ services = [] }) {
  const { language, t } = useLanguage();

  if (!services || services.length === 0) return null;

  const title = t.servicesPage.detail.relatedServices;
  const viewDetailsText = t.servicesPage.allServices.viewDetails;

  return (
    <section className="py-5 ac-bg-light" aria-label="Related Catering Services">
      <div className="container-xl py-3">
        {/* Section Heading */}
        <SectionHeading
          tag={language === 'mr' ? 'इतर सेवा' : 'Other Options'}
          title={title}
          centered={true}
        />

        {/* Cards Row */}
        <div className="row g-4 mt-2 justify-content-center">
          {services.map((service) => {
            const sName = service.name?.[language] || service.name?.en || service.slug;
            const sDesc = service.shortDescription?.[language] || service.shortDescription?.en || '';
            const sImg = service.image?.url || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80';
            const sIcon = service.icon || 'bi-cup-hot-fill';

            return (
              <div key={service.id || service.slug} className="col-12 col-md-4 d-flex">
                <div className="card ac-service-card w-100 rounded-4 overflow-hidden border shadow-sm d-flex flex-column">
                  <div className="ac-service-img-wrapper position-relative" style={{ height: '180px' }}>
                    <img
                      src={sImg}
                      alt={sName}
                      className="ac-service-img"
                      loading="lazy"
                    />
                    <div className="ac-service-icon-badge" style={{ width: '38px', height: '38px', fontSize: '1.1rem' }}>
                      <i className={`bi ${sIcon}`} />
                    </div>
                  </div>

                  <div className="card-body p-4 d-flex flex-column flex-grow-1">
                    <h3 className="h6 fw-bold text-dark mb-2">
                      {sName}
                    </h3>
                    <p className="text-muted small mb-3 flex-grow-1">
                      {sDesc}
                    </p>
                    <Link
                      to={`/services/${service.slug}`}
                      className="btn ac-btn-outline-maroon btn-sm py-2 rounded-3 text-center mt-auto d-flex align-items-center justify-content-center gap-2"
                    >
                      <span>{viewDetailsText}</span>
                      <i className="bi bi-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

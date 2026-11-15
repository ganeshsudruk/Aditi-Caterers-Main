import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function AboutServices() {
  const { t } = useLanguage();
  const so = t.aboutPage.servicesOverview;

  const serviceCategories = [
    { key: 'wedding', icon: 'bi-gem', label: t.services.wedding, route: '/services/wedding' },
    { key: 'birthday', icon: 'bi-balloon-fill', label: t.services.birthday, route: '/services/birthday' },
    { key: 'engagement', icon: 'bi-flower1', label: t.services.engagement, route: '/services/engagement' },
    { key: 'reception', icon: 'bi-stars', label: t.services.reception, route: '/services/reception' },
    { key: 'corporate', icon: 'bi-briefcase-fill', label: t.services.corporate, route: '/services/corporate' },
    { key: 'religious', icon: 'bi-brightness-high-fill', label: t.services.religious, route: '/services/religious' },
    { key: 'other', icon: 'bi-calendar2-event-fill', label: t.services.other, route: '/services/other' },
  ];

  return (
    <section className="ac-about-services py-5 ac-bg-light" aria-label="What We Do">
      <div className="container-xl py-4">
        
        {/* Section Heading */}
        <SectionHeading
          tag={so.tag}
          title={so.heading}
          description={so.description}
        />

        {/* 2 Catering Arrangement Highlight Cards */}
        <div className="row g-4 mt-2 justify-content-center">
          <div className="col-lg-6">
            <div className="p-4 p-md-5 rounded-4 bg-white border shadow-sm h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="rounded-circle bg-light-maroon text-maroon p-3 d-flex align-items-center justify-content-center">
                    <i className="bi bi-cart-check-fill fs-3" />
                  </div>
                  <div>
                    <span className="badge bg-maroon text-white mb-1">Full Package</span>
                    <h3 className="h5 fw-bold text-dark mb-0">{so.withMaterialTitle}</h3>
                  </div>
                </div>
                <p className="text-muted small mb-0 lh-base">
                  {so.withMaterialDesc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-top border-light-subtle">
                <Link to="/booking?option=with-material" className="text-maroon fw-semibold small text-decoration-none d-inline-flex align-items-center gap-1">
                  <span>Enquire for Catering With Material</span>
                  <i className="bi bi-arrow-right" />
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="p-4 p-md-5 rounded-4 bg-white border shadow-sm h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="rounded-circle bg-gold text-dark p-3 d-flex align-items-center justify-content-center">
                    <i className="bi bi-person-workspace fs-3" />
                  </div>
                  <div>
                    <span className="badge bg-gold text-dark mb-1">Chefs & Service</span>
                    <h3 className="h5 fw-bold text-dark mb-0">{so.withoutMaterialTitle}</h3>
                  </div>
                </div>
                <p className="text-muted small mb-0 lh-base">
                  {so.withoutMaterialDesc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-top border-light-subtle">
                <Link to="/booking?option=without-material" className="text-maroon fw-semibold small text-decoration-none d-inline-flex align-items-center gap-1">
                  <span>Enquire for Catering Without Material</span>
                  <i className="bi bi-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Service Category Pills */}
        <div className="row g-3 mt-4 justify-content-center">
          {serviceCategories.map((item) => (
            <div key={item.key} className="col-lg-3 col-md-4 col-sm-6">
              <Link
                to={item.route}
                className="p-3 bg-white rounded-3 border shadow-xs text-decoration-none d-flex align-items-center gap-2 text-dark hover-maroon transition h-100"
              >
                <i className={`bi ${item.icon} text-maroon`} />
                <span className="fw-medium small">{item.label}</span>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="text-center mt-5">
          <Link to="/services" className="btn ac-btn-outline-primary px-4 py-2">
            <span>{so.viewAllBtn}</span>
            <i className="bi bi-arrow-right ms-2" />
          </Link>
        </div>

      </div>
    </section>
  );
}

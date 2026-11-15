import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function EventsWeServe() {
  const { t } = useLanguage();

  const events = [
    { key: 'wedding', icon: 'bi-gem', label: t.home.eventsWeServe.wedding },
    { key: 'birthday', icon: 'bi-balloon-fill', label: t.home.eventsWeServe.birthday },
    { key: 'engagement', icon: 'bi-flower1', label: t.home.eventsWeServe.engagement },
    { key: 'reception', icon: 'bi-stars', label: t.home.eventsWeServe.reception },
    { key: 'corporate', icon: 'bi-briefcase-fill', label: t.home.eventsWeServe.corporate },
    { key: 'religious', icon: 'bi-brightness-high-fill', label: t.home.eventsWeServe.religious },
    { key: 'family', icon: 'bi-house-heart-fill', label: t.home.eventsWeServe.family },
  ];

  return (
    <section className="ac-events-we-serve py-5 bg-white" aria-label="Events We Serve">
      <div className="container-xl py-4">
        
        {/* Section Heading */}
        <SectionHeading
          tag={t.home.eventsWeServe.tag}
          title={t.home.eventsWeServe.title}
          description={t.home.eventsWeServe.description}
        />

        {/* Events Grid */}
        <div className="row g-3 justify-content-center mt-3">
          {events.map((event) => (
            <div key={event.key} className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
              <Link
                to={`/booking?event=${event.key}`}
                className="ac-event-pill-card text-decoration-none d-flex align-items-center gap-3 p-3 rounded-4 border bg-white shadow-sm transition h-100"
              >
                <div className="ac-event-icon-circle rounded-circle d-flex align-items-center justify-content-center bg-light-maroon text-maroon flex-shrink-0">
                  <i className={`bi ${event.icon} fs-5`} aria-hidden="true" />
                </div>
                <div className="flex-grow-1">
                  <h3 className="h6 fw-semibold text-dark mb-0">
                    {event.label}
                  </h3>
                  <small className="text-muted extra-small d-flex align-items-center gap-1 mt-1">
                    <span>{t.home.eventsWeServe.enquire}</span>
                    <i className="bi bi-chevron-right" style={{ fontSize: '0.65rem' }} />
                  </small>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

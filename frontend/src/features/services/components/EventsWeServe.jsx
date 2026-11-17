import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';
import { defaultEventsWeServe } from '../../../services/serviceService';

export default function EventsWeServe({ events = defaultEventsWeServe }) {
  const { language, t } = useLanguage();
  const eventsText = t.servicesPage.eventsWeServe;

  return (
    <section className="py-5 ac-bg-light" aria-label="Types of Events We Serve">
      <div className="container-xl py-4">
        {/* Section Heading */}
        <SectionHeading
          tag={eventsText.tag}
          title={eventsText.heading}
          description={eventsText.description}
          centered={true}
        />

        {/* Event Cards Grid */}
        <div className="row g-3 g-md-4 mt-2">
          {events.map((evt) => {
            const title = evt[language] || evt.en;

            return (
              <div key={evt.id} className="col-6 col-md-4 col-lg-3">
                <Link
                  to={evt.route}
                  className="text-decoration-none d-block h-100"
                >
                  <div className="ac-event-item-card">
                    <div className="ac-event-icon-circle">
                      <i className={`bi ${evt.icon}`} />
                    </div>
                    <h3 className="h6 fw-semibold text-dark mb-0">
                      {title}
                    </h3>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

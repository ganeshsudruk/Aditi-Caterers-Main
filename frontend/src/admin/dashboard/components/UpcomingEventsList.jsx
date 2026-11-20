import { useAdminLanguage } from '../../../context/useAdminLanguage';

export default function UpcomingEventsList({ events = [], onViewDetails }) {
  const { at, adminLang } = useAdminLanguage();
  const ue = at.dashboard.upcomingEvents;

  if (!events || events.length === 0) {
    return (
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
        <h2 className="h5 fw-bold text-dark mb-3">{ue.title}</h2>
        <div className="text-center py-4 text-muted">
          <i className="bi bi-calendar-x fs-2 text-secondary mb-2 d-block" aria-hidden="true"></i>
          <p className="mb-0">{ue.noData}</p>
          <small className="text-muted">{ue.noDataSub}</small>
        </div>
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDayLabel = (diffDays) => {
    if (diffDays === 0) return ue.today;
    if (diffDays === 1) return ue.tomorrow;
    return ue.inDays.replace('{n}', diffDays);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 fw-bold text-dark mb-0">{ue.title}</h2>
        <span className="badge bg-success-subtle text-success border border-success-subtle">
          {events.length} {ue.upcoming}
        </span>
      </div>

      <div className="row g-3">
        {events.map((ev) => {
          const evDate = new Date(ev.eventDate);
          const diffDays = Math.ceil((evDate - today) / (1000 * 60 * 60 * 24));
          const dateStr = evDate.toLocaleDateString(adminLang === 'mr' ? 'mr-IN' : 'en-IN', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          });

          return (
            <div key={ev.enquiryNumber || ev.submittedAt} className="col-12 col-md-6 col-xl-4">
              <div className="border rounded-3 p-3 bg-light-subtle h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="badge bg-success-subtle text-success border border-success">
                      <i className="bi bi-calendar-check me-1" aria-hidden="true"></i>
                      {getDayLabel(diffDays)}
                    </span>
                    <span className="small text-muted">{ev.enquiryNumber}</span>
                  </div>

                  <h3 className="h6 fw-bold text-dark mb-1">{ev.fullName}</h3>
                  <div className="small text-muted mb-2">
                    <i className="bi bi-calendar-event me-1 text-maroon" aria-hidden="true"></i>
                    {dateStr}
                  </div>

                  <div className="small text-secondary mb-1">
                    <i className="bi bi-geo-alt me-1 text-maroon" aria-hidden="true"></i>
                    {ev.eventCity || ev.venueAddress || ue.locationPending}
                  </div>

                  <div className="small text-secondary">
                    <i className="bi bi-people me-1 text-maroon" aria-hidden="true"></i>
                    {ev.guestCount} {ue.guests} &bull; {ev.eventType}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-top d-flex justify-content-between align-items-center">
                  <a href={`tel:${ev.mobile}`} className="small text-decoration-none text-dark fw-semibold">
                    <i className="bi bi-telephone me-1" aria-hidden="true"></i>
                    {ev.mobile}
                  </a>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-dark py-0 px-2"
                    onClick={() => onViewDetails(ev)}
                    aria-label={`View details for event by ${ev.fullName}`}
                  >
                    {ue.detailsBtn}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

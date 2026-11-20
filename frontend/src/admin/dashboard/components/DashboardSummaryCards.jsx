import { useAdminLanguage } from '../../../context/useAdminLanguage';

export default function DashboardSummaryCards({ summary = {} }) {
  const { at } = useAdminLanguage();
  const c = at.dashboard.cards;

  const cards = [
    {
      id: 'total',
      title: c.total,
      count: summary.totalEnquiries || 0,
      icon: 'bi-inbox-fill',
      colorClass: 'text-dark',
      bgClass: '#f5eded',
      iconColor: '#641e2b',
      desc: c.totalDesc,
    },
    {
      id: 'new',
      title: c.new,
      count: summary.newEnquiries || 0,
      icon: 'bi-bell-fill',
      colorClass: 'text-warning-emphasis',
      bgClass: '#fff8e6',
      iconColor: '#ffc107',
      desc: c.newDesc,
    },
    {
      id: 'contacted',
      title: c.contacted,
      count: summary.contactedEnquiries || 0,
      icon: 'bi-telephone-fill',
      colorClass: 'text-info-emphasis',
      bgClass: '#eefbfe',
      iconColor: '#0dcaf0',
      desc: c.contactedDesc,
    },
    {
      id: 'quotation',
      title: c.quotation,
      count: summary.quotationSent || 0,
      icon: 'bi-file-earmark-text-fill',
      colorClass: 'text-primary-emphasis',
      bgClass: '#edf3ff',
      iconColor: '#0d6efd',
      desc: c.quotationDesc,
    },
    {
      id: 'confirmed',
      title: c.confirmed,
      count: summary.confirmedEvents || 0,
      icon: 'bi-check-circle-fill',
      colorClass: 'text-success-emphasis',
      bgClass: '#edfcf2',
      iconColor: '#198754',
      desc: c.confirmedDesc,
    },
    {
      id: 'upcoming',
      title: c.upcoming,
      count: summary.upcomingEvents || 0,
      icon: 'bi-calendar-event-fill',
      colorClass: 'text-maroon',
      bgClass: '#faf0f2',
      iconColor: '#843b49',
      desc: c.upcomingDesc,
    },
  ];

  return (
    <section aria-label="Summary Statistics" className="mb-4">
      <div className="row g-3">
        {cards.map((card) => (
          <div key={card.id} className="col-12 col-sm-6 col-lg-4 col-xl-2">
            <div className="ac-stat-card">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <div className="ac-stat-card-title">{card.title}</div>
                  <div className={`ac-stat-card-num ${card.colorClass}`}>{card.count}</div>
                </div>
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center p-2 flex-shrink-0"
                  style={{
                    backgroundColor: card.bgClass,
                    color: card.iconColor,
                    width: '42px',
                    height: '42px',
                  }}
                  aria-hidden="true"
                >
                  <i className={`bi ${card.icon} fs-5`}></i>
                </div>
              </div>
              <div className="small text-muted text-truncate" title={card.desc}>
                {card.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

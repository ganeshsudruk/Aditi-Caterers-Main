import { Link } from 'react-router-dom';

const ACTIONS = [
  {
    path: '/admin/enquiries',
    label: 'All Enquiries',
    desc: 'Review and update received customer requests',
    icon: 'bi-envelope-paper-fill',
    color: '#641e2b',
    bg: '#fcf0f2',
  },
  {
    path: '/admin/menu',
    label: 'Food Menu',
    desc: 'Manage dish categories, items, and pricing',
    icon: 'bi-egg-fried',
    color: '#d97706',
    bg: '#fef3c7',
  },
  {
    path: '/admin/packages',
    label: 'Packages',
    desc: 'Configure Silver, Gold & Platinum packages',
    icon: 'bi-box-seam-fill',
    color: '#2563eb',
    bg: '#dbeafe',
  },
  {
    path: '/admin/gallery',
    label: 'Gallery Photos',
    desc: 'Manage event, food, and award photographs',
    icon: 'bi-images',
    color: '#059669',
    bg: '#d1fae5',
  },
  {
    path: '/admin/faqs',
    label: 'FAQs',
    desc: 'Update common questions and catering answers',
    icon: 'bi-question-circle-fill',
    color: '#7c3aed',
    bg: '#ede9fe',
  },
  {
    path: '/admin/settings',
    label: 'Website Settings',
    desc: 'Business contact details, notice banners & hours',
    icon: 'bi-gear-fill',
    color: '#475569',
    bg: '#f1f5f9',
  },
];

export default function DashboardQuickActions() {
  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
      <h2 className="h5 fw-bold text-dark mb-1">Quick Shortcuts</h2>
      <p className="small text-muted mb-3">Instant navigation to administrative operations</p>

      <div className="row g-3">
        {ACTIONS.map((act) => (
          <div key={act.path} className="col-12 col-sm-6 col-md-4">
            <Link
              to={act.path}
              className="text-decoration-none border rounded-3 p-3 d-flex align-items-center gap-3 bg-white h-100 transition-hover"
              style={{ transition: 'all 0.2s ease' }}
            >
              <div
                className="rounded-3 d-flex align-items-center justify-content-center p-2 flex-shrink-0"
                style={{ backgroundColor: act.bg, color: act.color, width: '44px', height: '44px' }}
                aria-hidden="true"
              >
                <i className={`bi ${act.icon} fs-5`}></i>
              </div>
              <div className="min-w-0">
                <div className="fw-semibold text-dark text-truncate">{act.label}</div>
                <div className="text-muted small text-truncate" style={{ fontSize: '0.78rem' }}>
                  {act.desc}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

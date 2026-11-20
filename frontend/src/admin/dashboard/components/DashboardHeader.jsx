import { useAuth } from '../../../context/useAuth';
import { useAdminLanguage } from '../../../context/useAdminLanguage';

export default function DashboardHeader({ onRefresh, refreshing }) {
  const { admin } = useAuth();
  const { at, adminLang } = useAdminLanguage();

  const formattedDate = new Date().toLocaleDateString(adminLang === 'mr' ? 'mr-IN' : 'en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <div>
        <div className="d-flex align-items-center gap-2 mb-1">
          <h1 className="h3 fw-bold text-dark mb-0">{at.dashboard.title}</h1>
          <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1 small">
            {at.dashboard.live}
          </span>
        </div>
        <p className="text-muted mb-0 small">
          {at.dashboard.welcomeBack}{' '}
          <strong className="text-dark">{admin?.name || 'Administrator'}</strong>!{' '}
          {at.dashboard.todayIs} {formattedDate}.
        </p>
      </div>

      <div className="d-flex align-items-center gap-2">
        <button
          type="button"
          onClick={onRefresh}
          disabled={refreshing}
          className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2"
          aria-label="Refresh dashboard data"
        >
          <i className={`bi bi-arrow-clockwise ${refreshing ? 'spin' : ''}`} aria-hidden="true"></i>
          <span>{refreshing ? at.dashboard.refreshing : at.dashboard.refreshBtn}</span>
        </button>
      </div>
    </div>
  );
}

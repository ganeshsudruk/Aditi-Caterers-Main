import { useAdminLanguage } from '../../../context/useAdminLanguage';

export default function DashboardStatusBreakdown({ breakdown = [], total = 0 }) {
  const { at } = useAdminLanguage();
  const sb = at.dashboard.statusBreakdown;

  if (total === 0) {
    return (
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
        <h2 className="h6 fw-bold text-dark mb-2">{sb.title}</h2>
        <div className="text-muted small text-center py-3">
          <i className="bi bi-inbox fs-3 d-block mb-1 text-secondary" aria-hidden="true"></i>
          {sb.noData}
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h6 fw-bold text-dark mb-0">{sb.title}</h2>
        <span className="small text-muted">{total} {sb.total}</span>
      </div>

      {/* Segmented Horizontal Progress Bar */}
      <div
        className="progress mb-3"
        style={{ height: '10px', borderRadius: '6px', overflow: 'hidden' }}
        role="progressbar"
        aria-label="Enquiry status distribution"
        aria-valuenow={100}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {breakdown.map((item) =>
          item.count > 0 ? (
            <div
              key={item.id}
              className="progress-bar"
              style={{
                width: `${item.percent}%`,
                backgroundColor: item.color,
              }}
              title={`${item.label}: ${item.count} (${item.percent}%)`}
            />
          ) : null
        )}
      </div>

      {/* Status Badges Grid */}
      <div className="row g-2">
        {breakdown.map((item) => (
          <div key={item.id} className="col-6 col-md-4 col-lg-2">
            <div className="border rounded-3 p-2 text-center bg-light-subtle">
              <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
                <span
                  className="rounded-circle"
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: item.color,
                  }}
                  aria-hidden="true"
                />
                <span className="small fw-semibold text-truncate">{item.label}</span>
              </div>
              <div className="fw-bold fs-6 text-dark">
                {item.count}{' '}
                <span className="small text-muted fw-normal">({item.percent}%)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

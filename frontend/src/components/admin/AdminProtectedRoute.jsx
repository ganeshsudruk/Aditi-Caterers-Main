import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

export default function AdminProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
        role="status"
        aria-live="polite"
      >
        <div className="spinner-border text-maroon mb-3" style={{ color: '#641e2b' }} role="status">
          <span className="visually-hidden">Checking admin session...</span>
        </div>
        <p className="text-muted small mb-0">Verifying administrator authorization...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
}

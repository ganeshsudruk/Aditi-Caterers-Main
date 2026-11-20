import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import AdminRoutes from './AdminRoutes';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Admin Module Routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* Public Website Routes */}
      <Route path="/*" element={<PublicRoutes />} />
    </Routes>
  );
}

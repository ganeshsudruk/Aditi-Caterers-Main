import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from '../admin/auth/pages/AdminLogin';
import DashboardPage from '../admin/dashboard/pages/DashboardPage';
import BookingsPage from '../admin/bookings/pages/BookingsPage';
import BookingDetailsPage from '../admin/bookings/pages/BookingDetailsPage';
import CustomersPage from '../admin/customers/pages/CustomersPage';
import CustomerDetailsPage from '../admin/customers/pages/CustomerDetailsPage';
import ManageServicesPage from '../admin/services/pages/ManageServicesPage';
import ManageMenuItemsPage from '../admin/menu/pages/ManageMenuItemsPage';
import ManageCategoriesPage from '../admin/menu/pages/ManageCategoriesPage';
import ManagePackagesPage from '../admin/packages/pages/ManagePackagesPage';
import ManageGalleryPage from '../admin/gallery/pages/ManageGalleryPage';
import ManageAwardsPage from '../admin/awards/pages/ManageAwardsPage';
import ManageReviewsPage from '../admin/reviews/pages/ManageReviewsPage';
import QuotationsPage from '../admin/quotations/pages/QuotationsPage';
import ReportsPage from '../admin/reports/pages/ReportsPage';
import SettingsPage from '../admin/settings/pages/SettingsPage';
import AdminLayout from '../components/admin/AdminLayout';
import AdminProtectedRoute from '../components/admin/AdminProtectedRoute';

export default function AdminRoutes() {
  return (
    <Routes>
      {/* Public Admin Auth Route */}
      <Route path="login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />

        {/* Bookings & Enquiries Management */}
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="bookings/:id" element={<BookingDetailsPage />} />
        <Route path="enquiries" element={<BookingsPage />} />

        {/* Customer Management */}
        <Route path="customers" element={<CustomersPage />} />
        <Route path="customers/:id" element={<CustomerDetailsPage />} />

        {/* Service Management */}
        <Route path="services" element={<ManageServicesPage />} />

        {/* Menu Management */}
        <Route path="menu" element={<ManageMenuItemsPage />} />
        <Route path="menu/categories" element={<ManageCategoriesPage />} />

        {/* Package Management */}
        <Route path="packages" element={<ManagePackagesPage />} />
        <Route path="gallery" element={<ManageGalleryPage />} />
        <Route path="awards" element={<ManageAwardsPage />} />
        <Route path="reviews" element={<ManageReviewsPage />} />
        <Route path="testimonials" element={<ManageReviewsPage />} />
        <Route path="quotations" element={<QuotationsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="faqs" element={<DashboardPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}

import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

// Public feature pages
import HomePage from '../features/home/pages/HomePage';
import AboutPage from '../features/about/pages/AboutPage';
import ServicesPage from '../features/services/pages/ServicesPage';
import ServiceDetailsPage from '../features/services/pages/ServiceDetailsPage';
import PackagesPage from '../features/packages/pages/PackagesPage';
import PackageDetailsPage from '../features/packages/pages/PackageDetailsPage';
import FoodMenuPage from '../features/menu/pages/FoodMenuPage';
import MenuCategoryPage from '../features/menu/pages/MenuCategoryPage';
import FoodItemDetailsPage from '../features/menu/pages/FoodItemDetailsPage';
import GalleryPage from '../features/gallery/pages/GalleryPage';
import AwardsPage from '../features/awards/pages/AwardsPage';
import TestimonialsPage from '../features/testimonials/pages/TestimonialsPage';
import ContactPage from '../features/contact/pages/ContactPage';
import BookingPage from '../features/booking/pages/BookingPage';
import FAQPage from '../features/faq/pages/FAQPage';

export default function PublicRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        
        {/* Services */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetailsPage />} />
        
        {/* Packages */}
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/packages/:id" element={<PackageDetailsPage />} />
        
        {/* Food Menu */}
        <Route path="/menu" element={<FoodMenuPage />} />
        <Route path="/menu/:category" element={<MenuCategoryPage />} />
        <Route path="/menu/:category/:itemId" element={<FoodItemDetailsPage />} />
        
        {/* Other Public Pages */}
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/awards" element={<AwardsPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/faq" element={<FAQPage />} />

        {/* Fallback route */}
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

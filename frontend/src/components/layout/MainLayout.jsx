import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from './Footer';

export default function MainLayout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
}

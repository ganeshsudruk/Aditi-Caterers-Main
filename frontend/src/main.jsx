import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { MenuSelectionProvider } from './context/MenuSelectionContext';
import AdminLanguageProvider from './context/AdminLanguageContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AdminLanguageProvider>
          <LanguageProvider>
            <MenuSelectionProvider>
              <App />
            </MenuSelectionProvider>
          </LanguageProvider>
        </AdminLanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

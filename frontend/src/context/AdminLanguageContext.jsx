import { useState } from 'react';
import AdminLanguageContext from './adminLanguageContextDef';
import adminEn from '../locales/adminEn.json';
import adminMr from '../locales/adminMr.json';

const adminTranslations = { en: adminEn, mr: adminMr };

const STORAGE_KEY = 'aditi_admin_language';

function getInitialAdminLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'mr' ? 'mr' : 'en';
  } catch {
    return 'en';
  }
}

export default function AdminLanguageProvider({ children }) {
  const [adminLang, setAdminLangState] = useState(getInitialAdminLang);

  const at = adminTranslations[adminLang] || adminTranslations.en;

  const setAdminLang = (lang) => {
    const next = lang === 'mr' ? 'mr' : 'en';
    setAdminLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage errors
    }
  };

  const toggleAdminLang = () => {
    setAdminLang(adminLang === 'en' ? 'mr' : 'en');
  };

  return (
    <AdminLanguageContext.Provider value={{ adminLang, setAdminLang, toggleAdminLang, at }}>
      {children}
    </AdminLanguageContext.Provider>
  );
}

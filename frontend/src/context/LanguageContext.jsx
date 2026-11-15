import { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import mr from '../locales/mr.json';

const translations = { en, mr };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const t = translations[language] || translations['en'];

  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    // Update html lang attribute for SEO
    document.documentElement.lang = lang === 'mr' ? 'mr' : 'en';
  };

  useEffect(() => {
    document.documentElement.lang = language === 'mr' ? 'mr' : 'en';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}

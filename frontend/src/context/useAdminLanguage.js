import { useContext } from 'react';
import AdminLanguageContext from './adminLanguageContextDef';

export function useAdminLanguage() {
  const ctx = useContext(AdminLanguageContext);
  if (!ctx) throw new Error('useAdminLanguage must be used inside AdminLanguageProvider');
  return ctx;
}

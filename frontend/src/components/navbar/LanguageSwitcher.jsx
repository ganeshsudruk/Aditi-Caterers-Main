import { useLanguage } from '../../context/LanguageContext';

/**
 * LanguageSwitcher – Pill-style EN / मराठी toggle.
 * Persists choice to localStorage via LanguageContext.
 */
export default function LanguageSwitcher() {
  const { language, switchLanguage, t } = useLanguage();

  return (
    <div className="ac-lang-switch" role="group" aria-label="Language selection">
      <button
        type="button"
        className={`ac-lang-btn ${language === 'en' ? 'ac-active' : ''}`}
        onClick={() => switchLanguage('en')}
        aria-label={t.aria.switchToEnglish}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <button
        type="button"
        className={`ac-lang-btn ${language === 'mr' ? 'ac-active' : ''}`}
        onClick={() => switchLanguage('mr')}
        aria-label={t.aria.switchToMarathi}
        aria-pressed={language === 'mr'}
      >
        मराठी
      </button>
    </div>
  );
}

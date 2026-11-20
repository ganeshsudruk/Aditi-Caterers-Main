import { useLanguage } from '../../../context/LanguageContext';

export default function AdditionalNotesForm({ formData, onChange }) {
  const { language, t } = useLanguage();
  const sec = t.bookingPage?.sections || {};
  const f = t.bookingPage?.fields || {};

  const maxNotesLength = 1000;
  const currentLength = (formData.additionalNotes || '').length;

  return (
    <div className="ac-form-section">
      <h2 className="ac-form-section-title">
        <i className="bi bi-chat-left-text-fill" aria-hidden="true" />
        <span>{sec.additional || (language === 'mr' ? 'बजेट आणि इतर माहिती' : 'Budget & Additional Notes')}</span>
      </h2>
      <p className="ac-form-section-desc">
        {sec.additionalDesc || (language === 'mr' ? 'खास सूचना, उपवासाचे पदार्थ किंवा इतर आवश्यकता.' : 'Any special requirements, dietary requests, or notes for our team.')}
      </p>

      <div className="row g-3">
        {/* Estimated Budget */}
        <div className="col-12 col-md-6">
          <label htmlFor="budget" className="form-label">
            {f.budget || (language === 'mr' ? 'अंदाजे बजेट (पर्यायी)' : 'Approximate Budget (Optional)')}
          </label>
          <input
            type="text"
            id="budget"
            name="budget"
            className="form-control"
            placeholder={f.budgetPlaceholder || 'e.g. ₹50,000 or per plate budget'}
            value={formData.budget}
            onChange={onChange}
          />
        </div>

        {/* Additional Notes */}
        <div className="col-12">
          <label htmlFor="additionalNotes" className="form-label">
            {f.additionalNotes || (language === 'mr' ? 'अधिक माहिती / विशेष सूचना (पर्यायी)' : 'Additional Notes / Special Instructions (Optional)')}
          </label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            rows="3"
            maxLength={maxNotesLength}
            className="form-control"
            placeholder={f.additionalNotesPlaceholder || 'Any specific requests regarding serving style, live counters, or timing...'}
            value={formData.additionalNotes}
            onChange={onChange}
          />
          <div className="ac-char-counter">
            {currentLength} / {maxNotesLength}
          </div>
        </div>
      </div>
    </div>
  );
}

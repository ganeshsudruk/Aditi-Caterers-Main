import { useLanguage } from '../../../context/LanguageContext';
import { cateringTypesList } from '../../../services/bookingService';

export default function CateringRequirementsForm({ formData, onSelectCateringType, errors }) {
  const { language, t } = useLanguage();
  const sec = t.bookingPage?.sections || {};

  return (
    <div className="ac-form-section">
      <h2 className="ac-form-section-title">
        <i className="bi bi-box-seam-fill" aria-hidden="true" />
        <span>{sec.catering || (language === 'mr' ? 'केटरिंग प्रकार' : 'Catering Requirements')}</span>
        <span className="text-danger">*</span>
      </h2>
      <p className="ac-form-section-desc">
        {sec.cateringDesc || (language === 'mr' ? 'साहित्यासह किंवा साहित्याशिवाय यापैकी योग्य पर्याय निवडा.' : 'Choose whether you need service with material or without material.')}
      </p>

      {errors.cateringType && (
        <div className="ac-form-error mb-3">
          <i className="bi bi-exclamation-circle-fill" />
          <span>{errors.cateringType}</span>
        </div>
      )}

      <div className="row g-3" role="radiogroup" aria-label="Catering Type">
        {cateringTypesList.map((ct) => {
          const isSelected = formData.cateringType === ct.id;
          const label = ct.label[language] || ct.label.en;
          const desc = ct.desc[language] || ct.desc.en;
          const badge = ct.badge[language] || ct.badge.en;

          return (
            <div key={ct.id} className="col-12 col-md-4">
              <div
                className={`ac-catering-option-card ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectCateringType(ct.id)}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCateringType(ct.id);
                  }
                }}
              >
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="ac-catering-badge">{badge}</span>
                  <div className="form-check m-0 p-0">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="cateringTypeRadio"
                      checked={isSelected}
                      onChange={() => onSelectCateringType(ct.id)}
                      aria-label={label}
                    />
                  </div>
                </div>

                <h3 className="h6 fw-bold text-dark mb-1 d-flex align-items-center gap-2">
                  <i className={`bi ${ct.icon} text-maroon`} aria-hidden="true" />
                  <span>{label}</span>
                </h3>

                <p className="small text-muted mb-0" style={{ fontSize: '0.82rem', lineHeight: '1.45' }}>
                  {desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

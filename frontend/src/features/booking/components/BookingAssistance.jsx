import { useLanguage } from '../../../context/LanguageContext';

export default function BookingAssistance() {
  const { language, t } = useLanguage();
  const ast = t.bookingPage?.assistance || {};

  const waMsg =
    language === 'mr'
      ? 'नमस्कार अदिती केटरर्स, मला माझ्या कार्यक्रमासाठी तातडीने केटरिंग चौकशी करायची आहे.'
      : 'Hello Aditi Caterers, I would like to enquire about catering for my upcoming event.';

  const waUrl = `https://wa.me/919975959391?text=${encodeURIComponent(waMsg)}`;

  return (
    <div className="ac-assistance-banner">
      <div className="row align-items-center g-3">
        <div className="col-12 col-md-7 text-center text-md-start">
          <h2 className="h6 fw-bold text-dark mb-1 d-flex align-items-center justify-content-center justify-content-md-start gap-2">
            <i className="bi bi-headset text-maroon fs-5" aria-hidden="true" />
            <span>{ast.title || (language === 'mr' ? 'तातडीने मार्गदर्शन किंवा चर्चा हवी आहे?' : 'Need Urgent Assistance or Consultation?')}</span>
          </h2>
          <p className="small text-muted mb-0">
            {ast.desc || (language === 'mr' ? 'पुढील काही दिवसांतील कार्यक्रमांसाठी त्वरित माहिती मिळवण्यासाठी थेट फोन किंवा WhatsApp करा.' : 'For immediate enquiries or dates within the next few days, call us or WhatsApp directly.')}
          </p>
        </div>

        <div className="col-12 col-md-5 d-flex justify-content-center justify-content-md-end gap-2 flex-wrap">
          <a
            href="tel:+919975959391"
            className="btn btn-outline-danger btn-sm rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2"
            style={{ color: 'var(--ac-maroon, #641e2b)', borderColor: 'var(--ac-maroon, #641e2b)' }}
          >
            <i className="bi bi-telephone-fill" aria-hidden="true" />
            <span>+91 9975959391</span>
          </a>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success btn-sm rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2 shadow-sm"
          >
            <i className="bi bi-whatsapp" aria-hidden="true" />
            <span>{ast.whatsapp || 'WhatsApp'}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

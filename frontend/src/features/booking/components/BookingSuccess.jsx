import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function BookingSuccess({ enquiryData, onResetForm }) {
  const { language, t } = useLanguage();
  const succ = t.bookingPage?.success || {};

  const refNumber = enquiryData?.enquiryNumber || 'AC-ENQ-SUBMITTED';

  const waMsg =
    language === 'mr'
      ? `नमस्कार अदिती केटरर्स, मी वेबसाइटवरून केटरिंग चौकशी पाठवली आहे.\nसंदर्भ क्रमांक: ${refNumber}\nकार्यक्रम: ${enquiryData?.eventType || ''}\nतारीख: ${enquiryData?.eventDate || ''}\nपाहुणे: ${enquiryData?.guestCount || ''}\nकृपया कोटेशन आणि उपलब्धतेबद्दल सांगा.`
      : `Hello Aditi Caterers, I submitted a catering booking enquiry on your website.\nReference: ${refNumber}\nEvent: ${enquiryData?.eventType || ''}\nDate: ${enquiryData?.eventDate || ''}\nGuests: ${enquiryData?.guestCount || ''}\nPlease share availability and quotation.`;

  const waUrl = `https://wa.me/919975959391?text=${encodeURIComponent(waMsg)}`;

  return (
    <div className="container-xl py-5">
      <div className="ac-success-card">
        {/* Animated Check Icon */}
        <div className="ac-success-icon-circle">
          <i className="bi bi-check-lg" aria-hidden="true" />
        </div>

        {/* Title */}
        <h1 className="h3 fw-bold text-dark mb-2">
          {succ.title || (language === 'mr' ? 'तुमची चौकशी यशस्वीरीत्या पाठवली आहे' : 'Your Enquiry Has Been Submitted')}
        </h1>

        {/* Subtitle */}
        <p className="text-muted mb-3 mx-auto" style={{ maxWidth: '600px' }}>
          {succ.subtitle ||
            (language === 'mr'
              ? 'Aditi Caterers शी संपर्क साधल्याबद्दल धन्यवाद. तुमची चौकशी आम्हाला प्राप्त झाली आहे. आमची टीम दिलेल्या माहितीचा आढावा घेऊन पुढील चर्चेसाठी तुमच्याशी संपर्क साधेल.'
              : 'Thank you for contacting Aditi Caterers. Your enquiry has been received. Our team will review the details and contact you to discuss your requirements.')}
        </p>

        {/* Reference Box */}
        <div className="ac-ref-box">
          <span className="d-block small text-muted text-uppercase fw-semibold mb-1">
            {succ.refLabel || (language === 'mr' ? 'चौकशी संदर्भ क्रमांक' : 'Enquiry Reference Number')}
          </span>
          <span className="ac-ref-num">{refNumber}</span>
        </div>

        {/* Summary Table */}
        <div className="card text-start mb-4 border-0 bg-light rounded-3 p-3 mx-auto" style={{ maxWidth: '540px' }}>
          <h2 className="h6 fw-bold text-dark border-bottom pb-2 mb-3">
            <i className="bi bi-clipboard2-check me-2 text-maroon" />
            {succ.detailsSummary || (language === 'mr' ? 'चौकशी सारांश' : 'Enquiry Summary')}
          </h2>

          <div className="row g-2 small">
            <div className="col-5 text-muted">{succ.customer || 'Customer'}:</div>
            <div className="col-7 fw-semibold text-dark">{enquiryData?.customerName}</div>

            <div className="col-5 text-muted">{succ.event || 'Event'}:</div>
            <div className="col-7 fw-semibold text-dark text-capitalize">{enquiryData?.eventType}</div>

            <div className="col-5 text-muted">{succ.date || 'Date'}:</div>
            <div className="col-7 fw-semibold text-dark">{enquiryData?.eventDate}</div>

            <div className="col-5 text-muted">{succ.guests || 'Guests'}:</div>
            <div className="col-7 fw-semibold text-dark">{enquiryData?.guestCount}</div>

            <div className="col-5 text-muted">{succ.catering || 'Catering'}:</div>
            <div className="col-7 fw-semibold text-dark text-capitalize">{enquiryData?.cateringType}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success px-4 py-2 rounded-pill fw-semibold d-inline-flex align-items-center gap-2 shadow-sm"
          >
            <i className="bi bi-whatsapp" aria-hidden="true" />
            <span>{succ.chatOnWhatsapp || (language === 'mr' ? 'WhatsApp वर फॉलो-अप करा' : 'Follow up on WhatsApp')}</span>
          </a>

          <Link
            to="/"
            className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-semibold d-inline-flex align-items-center gap-2"
          >
            <i className="bi bi-house-door" aria-hidden="true" />
            <span>{succ.homeBtn || (language === 'mr' ? 'मुख्यपृष्ठावर जा' : 'Return to Home')}</span>
          </Link>

          <button
            type="button"
            className="btn btn-link text-decoration-none text-muted small p-2"
            onClick={onResetForm}
          >
            <i className="bi bi-plus-circle me-1" />
            {succ.anotherBtn || (language === 'mr' ? 'दुसरी चौकशी पाठवा' : 'Submit Another Enquiry')}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function ContactPreview() {
  const { t, language } = useLanguage();
  const contact = t.home.contact;

  const waEncodedMsg = encodeURIComponent(
    contact.waMessage ||
      (language === 'mr'
        ? 'नमस्कार अदिती केटरर्स, मला माझ्या कार्यक्रमासाठी केटरिंग सेवेबद्दल माहिती हवी आहे.'
        : 'Hello Aditi Caterers, I would like to enquire about catering services for my event.')
  );

  return (
    <section className="ac-contact-preview py-5 bg-white" aria-label="Contact Aditi Caterers">
      <div className="container-xl py-4">
        
        {/* Section Heading */}
        <SectionHeading
          tag={contact.tag}
          title={contact.title}
          description={contact.description}
        />

        {/* Contact Cards Row */}
        <div className="row g-4 mt-2 justify-content-center">
          
          {/* Card 1: Phone */}
          <div className="col-lg-5 col-md-6">
            <div className="ac-contact-card h-100 p-4 p-md-5 rounded-4 border bg-white shadow-sm d-flex flex-column align-items-center text-center transition">
              <div className="ac-contact-icon-circle rounded-circle bg-light-maroon text-maroon d-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-telephone-inbound-fill fs-2" />
              </div>

              <h3 className="h5 fw-bold text-dark mb-1">
                {contact.phone}
              </h3>
              <p className="text-muted small mb-3">
                Direct phone consultation with our catering coordinator
              </p>

              <a
                href="tel:+919975959391"
                className="btn ac-btn-primary px-4 py-2 mt-auto d-inline-flex align-items-center gap-2"
                aria-label="Call Aditi Caterers"
              >
                <i className="bi bi-telephone-fill" />
                <span>+91 9975959391</span>
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="col-lg-5 col-md-6">
            <div className="ac-contact-card h-100 p-4 p-md-5 rounded-4 border bg-white shadow-sm d-flex flex-column align-items-center text-center transition">
              <div className="ac-contact-icon-circle rounded-circle bg-light-green text-success d-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-whatsapp fs-2" />
              </div>

              <h3 className="h5 fw-bold text-dark mb-1">
                {contact.whatsapp}
              </h3>
              <p className="text-muted small mb-3">
                Quick response via WhatsApp for menu & date availability
              </p>

              <a
                href={`https://wa.me/919975959391?text=${waEncodedMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success px-4 py-2 mt-auto d-inline-flex align-items-center gap-2 rounded-3 shadow-sm"
                aria-label="Chat on WhatsApp"
              >
                <i className="bi bi-whatsapp" />
                <span>{contact.chat}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

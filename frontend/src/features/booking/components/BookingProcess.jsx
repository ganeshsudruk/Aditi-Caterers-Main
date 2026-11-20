import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function BookingProcess() {
  const { language, t } = useLanguage();
  const proc = t.bookingPage?.process || {};

  return (
    <section className="py-5 bg-white border-top" aria-label="Booking Process Steps">
      <div className="container-xl py-2">
        <SectionHeading
          tag={proc.tag || (language === 'mr' ? 'बुकिंग प्रक्रिया' : 'How It Works')}
          title={proc.heading || (language === 'mr' ? 'आमची बुकिंग चौकशी प्रक्रिया' : 'Our Booking Enquiry Process')}
          description={
            language === 'mr'
              ? 'अदिती केटरर्ससोबत तुमच्या सोहळ्याचे नियोजन करणे सोपे आणि पारदर्शक आहे.'
              : 'Planning your event catering with Aditi Caterers is smooth, clear, and transparent.'
          }
          centered={true}
        />

        <div className="row g-4 mt-2">
          {/* Step 1 */}  
          <div className="col-12 col-md-4">
            <div className="ac-process-card text-center text-md-start">
              <div className="ac-process-icon mx-auto mx-md-0">
                <i className="bi bi-file-earmark-text-fill" aria-hidden="true" />
              </div>
              <h3 className="h6 fw-bold text-dark mb-2">
                {proc.step1Title || '1. Submit Enquiry'}
              </h3>
              <p className="text-muted small mb-0" style={{ lineHeight: '1.55' }}>
                {proc.step1Desc || 'Fill out your event details, guest count, and preferred catering type.'}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="col-12 col-md-4">
            <div className="ac-process-card text-center text-md-start">
              <div className="ac-process-icon mx-auto mx-md-0">
                <i className="bi bi-telephone-inbound-fill" aria-hidden="true" />
              </div>
              <h3 className="h6 fw-bold text-dark mb-2">
                {proc.step2Title || '2. Review & Consultation'}
              </h3>
              <p className="text-muted small mb-0" style={{ lineHeight: '1.55' }}>
                {proc.step2Desc || 'Our team reviews your requirements and contacts you with a customized quotation.'}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="col-12 col-md-4">
            <div className="ac-process-card text-center text-md-start">
              <div className="ac-process-icon mx-auto mx-md-0">
                <i className="bi bi-calendar2-check-fill" aria-hidden="true" />
              </div>
              <h3 className="h6 fw-bold text-dark mb-2">
                {proc.step3Title || '3. Booking Confirmation'}
              </h3>
              <p className="text-muted small mb-0" style={{ lineHeight: '1.55' }}>
                {proc.step3Desc || 'Once menu, dates, and terms are finalized and agreed upon, your booking is confirmed.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

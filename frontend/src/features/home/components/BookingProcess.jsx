import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function BookingProcess() {
  const { t } = useLanguage();
  const bp = t.home.bookingProcess;

  const steps = [
    {
      number: '01',
      icon: 'bi-file-text-fill',
      title: bp.step1Title,
      description: bp.step1Desc,
    },
    {
      number: '02',
      icon: 'bi-chat-dots-fill',
      title: bp.step2Title,
      description: bp.step2Desc,
    },
    {
      number: '03',
      icon: 'bi-card-checklist',
      title: bp.step3Title,
      description: bp.step3Desc,
    },
    {
      number: '04',
      icon: 'bi-check2-circle',
      title: bp.step4Title,
      description: bp.step4Desc,
    },
  ];

  return (
    <section className="ac-booking-process py-5 ac-bg-light" aria-label="How Our Booking Process Works">
      <div className="container-xl py-4">
        
        {/* Section Heading */}
        <SectionHeading
          tag={bp.tag}
          title={bp.title}
          description={bp.description}
        />

        {/* 4 Process Steps */}
        <div className="row g-4 mt-3 position-relative">
          {steps.map((step, index) => (
            <div key={step.number} className="col-lg-3 col-md-6">
              <div className="ac-process-card h-100 p-4 rounded-4 bg-white border shadow-sm text-center position-relative d-flex flex-column align-items-center">
                
                {/* Number Badge */}
                <div className="ac-process-num mb-3 rounded-circle d-flex align-items-center justify-content-center bg-maroon text-white fw-bold">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="ac-process-icon text-gold mb-3">
                  <i className={`bi ${step.icon} fs-2`} />
                </div>

                {/* Title & Desc */}
                <h3 className="h6 fw-bold text-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-muted small mb-0">
                  {step.description}
                </p>

                {/* Connector arrow for desktop (not on last item) */}
                {index < steps.length - 1 && (
                  <div className="ac-process-connector d-none d-lg-block">
                    <i className="bi bi-chevron-right text-muted opacity-50" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-5">
          <Link
            to="/booking"
            className="btn ac-btn-primary px-4 py-2 d-inline-flex align-items-center gap-2"
          >
            <i className="bi bi-calendar-check" />
            <span>{bp.bookNow}</span>
          </Link>
        </div>

      </div>
    </section>
  );
}

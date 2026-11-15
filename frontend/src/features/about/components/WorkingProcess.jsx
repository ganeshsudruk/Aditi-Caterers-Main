import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function WorkingProcess() {
  const { t } = useLanguage();
  const proc = t.aboutPage.process;

  const steps = [
    {
      num: '01',
      icon: 'bi-chat-square-quote-fill',
      title: proc.step1Title,
      desc: proc.step1Desc,
    },
    {
      num: '02',
      icon: 'bi-arrow-left-right',
      title: proc.step2Title,
      desc: proc.step2Desc,
    },
    {
      num: '03',
      icon: 'bi-receipt-cutoff',
      title: proc.step3Title,
      desc: proc.step3Desc,
    },
    {
      num: '04',
      icon: 'bi-check-circle-fill',
      title: proc.step4Title,
      desc: proc.step4Desc,
    },
    {
      num: '05',
      icon: 'bi-stars',
      title: proc.step5Title,
      desc: proc.step5Desc,
    },
  ];

  return (
    <section className="ac-working-process py-5 bg-white" aria-label="How We Work">
      <div className="container-xl py-4">
        
        {/* Section Heading */}
        <SectionHeading
          tag={proc.tag}
          title={proc.heading}
          description={proc.description}
        />

        {/* 5 Process Steps */}
        <div className="row g-4 mt-3 justify-content-center">
          {steps.map((step, idx) => (
            <div key={step.num} className="col-xl col-lg-4 col-md-6">
              <div className="ac-process-box h-100 p-4 rounded-4 bg-white border shadow-sm text-center d-flex flex-column align-items-center transition position-relative">
                <div className="ac-process-number-badge mb-3 rounded-circle bg-maroon text-white fw-bold d-flex align-items-center justify-content-center">
                  {step.num}
                </div>
                <div className="ac-process-icon text-gold mb-3">
                  <i className={`bi ${step.icon} fs-3`} />
                </div>
                <h3 className="h6 fw-bold text-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-muted extra-small mb-0 lh-base">
                  {step.desc}
                </p>
                {idx < steps.length - 1 && (
                  <div className="ac-step-arrow d-none d-xl-block position-absolute">
                    <i className="bi bi-chevron-right text-muted opacity-25" />
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
            <span>{proc.bookNow}</span>
          </Link>
        </div>

      </div>
    </section>
  );
}

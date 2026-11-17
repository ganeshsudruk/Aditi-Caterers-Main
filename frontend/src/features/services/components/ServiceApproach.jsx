import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function ServiceApproach() {
  const { t } = useLanguage();
  const approachText = t.servicesPage.approach;
  const steps = approachText.steps;

  const stepList = [
    { num: '01', title: steps.step1.title, desc: steps.step1.desc, icon: 'bi-clipboard2-check' },
    { num: '02', title: steps.step2.title, desc: steps.step2.desc, icon: 'bi-sliders' },
    { num: '03', title: steps.step3.title, desc: steps.step3.desc, icon: 'bi-journal-text' },
    { num: '04', title: steps.step4.title, desc: steps.step4.desc, icon: 'bi-calendar-check' },
    { num: '05', title: steps.step5.title, desc: steps.step5.desc, icon: 'bi-stars' },
  ];

  return (
    <section className="py-5 bg-white" aria-label="Our Service Approach">
      <div className="container-xl py-4">
        {/* Section Heading */}
        <SectionHeading
          tag={approachText.tag}
          title={approachText.heading}
          description={approachText.description}
          centered={true}
        />

        {/* Steps Grid */}
        <div className="row g-4 mt-2 justify-content-center">
          {stepList.map((step) => (
            <div key={step.num} className="col-12 col-md-6 col-lg-4 col-xl d-flex">
              <div className="ac-process-step-card w-100 d-flex flex-column">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="ac-step-number-badge mb-0">
                    {step.num}
                  </div>
                  <i className={`bi ${step.icon} fs-3 text-muted`} />
                </div>
                <h3 className="h6 fw-bold text-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-muted small mb-0 flex-grow-1">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

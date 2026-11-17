import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';
import { defaultPackageProcess } from '../../../services/packageService';

export default function PackageProcess({ steps = defaultPackageProcess }) {
  const { language, t } = useLanguage();
  const processText = t.packagesPage.howItWorks;

  return (
    <section className="py-5 ac-bg-light" id="how-it-works" aria-label="How Catering Enquiry and Booking Works">
      <div className="container-xl py-4">
        {/* Section Heading */}
        <SectionHeading
          tag={processText.tag}
          title={processText.heading}
          description={processText.description}
          centered={true}
        />

        {/* Steps Grid */}
        <div className="row g-4 mt-2 justify-content-center">
          {steps.map((step) => {
            const title = step.title[language] || step.title.en;
            const desc = step.desc[language] || step.desc.en;

            return (
              <div key={step.num} className="col-12 col-md-6 col-lg-4 col-xl d-flex">
                <div className="ac-process-step-card w-100 d-flex flex-column shadow-sm">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="ac-step-number-badge mb-0">
                      {step.num}
                    </div>
                    <i className={`bi ${step.icon} fs-3 text-muted`} />
                  </div>
                  <h3 className="h6 fw-bold text-dark mb-2">
                    {title}
                  </h3>
                  <p className="text-muted small mb-0 flex-grow-1">
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


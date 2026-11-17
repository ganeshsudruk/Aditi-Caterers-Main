import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function ServiceDetailProcess({ service }) {
  const { language, t } = useLanguage();

  if (!service || !service.process) return null;

  const processSteps = service.process?.[language] || service.process?.en || [];
  const heading = t.servicesPage.detail.howWeArrange;

  return (
    <section className="py-5 bg-white" aria-label="How We Arrange This Service">
      <div className="container-xl py-3">
        {/* Section Heading */}
        <SectionHeading
          tag={language === 'mr' ? 'पायऱ्या' : 'Process'}
          title={heading}
          centered={true}
        />

        {/* Steps Grid */}
        <div className="row g-4 mt-2 justify-content-center">
          {processSteps.map((step, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-3 d-flex">
              <div className="ac-process-step-card w-100 d-flex flex-column">
                <div className="ac-step-number-badge">
                  {`0${idx + 1}`}
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

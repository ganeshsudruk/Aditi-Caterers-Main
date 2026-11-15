import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function CoreValues() {
  const { t } = useLanguage();
  const val = t.aboutPage.values;

  const valueList = [
    {
      key: 'foodQuality',
      icon: 'bi-patch-check-fill',
      title: val.items.foodQuality.title,
      description: val.items.foodQuality.description,
    },
    {
      key: 'customerSatisfaction',
      icon: 'bi-emoji-smile-fill',
      title: val.items.customerSatisfaction.title,
      description: val.items.customerSatisfaction.description,
    },
    {
      key: 'properPlanning',
      icon: 'bi-calendar-check-fill',
      title: val.items.properPlanning.title,
      description: val.items.properPlanning.description,
    },
    {
      key: 'serviceCommitment',
      icon: 'bi-hand-thumbs-up-fill',
      title: val.items.serviceCommitment.title,
      description: val.items.serviceCommitment.description,
    },
    {
      key: 'flexibility',
      icon: 'bi-sliders2-vertical',
      title: val.items.flexibility.title,
      description: val.items.flexibility.description,
    },
    {
      key: 'trust',
      icon: 'bi-shield-shaded',
      title: val.items.trust.title,
      description: val.items.trust.description,
    },
  ];

  return (
    <section className="ac-core-values py-5 bg-white" aria-label="Our Core Values">
      <div className="container-xl py-4">
        
        {/* Section Heading */}
        <SectionHeading
          tag={val.tag}
          title={val.heading}
          description={val.description}
        />

        {/* Values Grid */}
        <div className="row g-4 mt-2">
          {valueList.map((item) => (
            <div key={item.key} className="col-lg-4 col-md-6">
              <div className="ac-value-card h-100 p-4 rounded-4 border bg-white shadow-sm d-flex flex-column align-items-start transition">
                <div className="ac-value-icon-box rounded-circle bg-light-maroon text-maroon d-flex align-items-center justify-content-center mb-3">
                  <i className={`bi ${item.icon} fs-4`} aria-hidden="true" />
                </div>
                <h3 className="h6 fw-bold text-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-muted small mb-0 lh-base">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

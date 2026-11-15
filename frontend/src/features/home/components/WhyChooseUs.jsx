import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const items = [
    {
      id: 1,
      icon: 'bi-shield-check',
      title: t.home.whyChooseUs.item1.title,
      description: t.home.whyChooseUs.item1.description,
    },
    {
      id: 2,
      icon: 'bi-clock-history',
      title: t.home.whyChooseUs.item2.title,
      description: t.home.whyChooseUs.item2.description,
    },
    {
      id: 3,
      icon: 'bi-sliders',
      title: t.home.whyChooseUs.item3.title,
      description: t.home.whyChooseUs.item3.description,
    },
    {
      id: 4,
      icon: 'bi-calendar-heart-fill',
      title: t.home.whyChooseUs.item4.title,
      description: t.home.whyChooseUs.item4.description,
    },
    {
      id: 5,
      icon: 'bi-people-fill',
      title: t.home.whyChooseUs.item5.title,
      description: t.home.whyChooseUs.item5.description,
    },
    {
      id: 6,
      icon: 'bi-journal-check',
      title: t.home.whyChooseUs.item6.title,
      description: t.home.whyChooseUs.item6.description,
    },
  ];

  return (
    <section className="ac-why-choose-us py-5 bg-white" aria-label="Why Choose Aditi Caterers">
      <div className="container-xl py-4">
        
        {/* Section Heading */}
        <SectionHeading
          tag={t.home.whyChooseUs.tag}
          title={t.home.whyChooseUs.title}
          description={t.home.whyChooseUs.description}
        />

        {/* Highlights Grid */}
        <div className="row g-4 mt-2">
          {items.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6">
              <div className="ac-feature-box h-100 p-4 rounded-4 border bg-white shadow-sm d-flex align-items-start gap-3 transition">
                <div className="ac-feature-icon-wrap flex-shrink-0 rounded-circle d-flex align-items-center justify-content-center bg-light-maroon text-maroon">
                  <i className={`bi ${item.icon} fs-4`} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="h6 fw-bold text-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted small mb-0">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

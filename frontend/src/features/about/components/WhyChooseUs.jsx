import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function WhyChooseUs() {
  const { t } = useLanguage();
  const wc = t.aboutPage.whyChooseUs;

  const points = [
    {
      icon: 'bi-calendar-event-fill',
      title: wc.item1.title,
      desc: wc.item1.desc,
    },
    {
      icon: 'bi-sliders2',
      title: wc.item2.title,
      desc: wc.item2.desc,
    },
    {
      icon: 'bi-egg-fried',
      title: wc.item3.title,
      desc: wc.item3.desc,
    },
    {
      icon: 'bi-people-fill',
      title: wc.item4.title,
      desc: wc.item4.desc,
    },
    {
      icon: 'bi-layout-text-window-reverse',
      title: wc.item5.title,
      desc: wc.item5.desc,
    },
    {
      icon: 'bi-chat-heart-fill',
      title: wc.item6.title,
      desc: wc.item6.desc,
    },
  ];

  return (
    <section className="ac-why-choose-us py-5 ac-bg-light" aria-label="Why Choose Aditi Caterers">
      <div className="container-xl py-4">
        
        {/* Section Heading */}
        <SectionHeading
          tag={wc.tag}
          title={wc.heading}
          description={wc.description}
        />

        {/* 6 Highlights Grid */}
        <div className="row g-4 mt-2">
          {points.map((pt, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="ac-why-card h-100 p-4 rounded-4 bg-white border shadow-sm d-flex align-items-start gap-3 transition">
                <div className="ac-why-icon-box rounded-circle bg-light-maroon text-maroon d-flex align-items-center justify-content-center flex-shrink-0">
                  <i className={`bi ${pt.icon} fs-4`} />
                </div>
                <div>
                  <h3 className="h6 fw-bold text-dark mb-2">
                    {pt.title}
                  </h3>
                  <p className="text-muted extra-small mb-0 lh-base">
                    {pt.desc}
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

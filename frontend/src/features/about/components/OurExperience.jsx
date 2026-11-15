import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function OurExperience() {
  const { t } = useLanguage();
  const exp = t.aboutPage.experience;

  const highlights = [
    {
      icon: 'bi-gem',
      title: exp.highlight1Title,
      description: exp.highlight1Desc,
    },
    {
      icon: 'bi-person-badge-fill',
      title: exp.highlight2Title,
      description: exp.highlight2Desc,
    },
    {
      icon: 'bi-check2-square',
      title: exp.highlight3Title,
      description: exp.highlight3Desc,
    },
  ];

  return (
    <section className="ac-our-experience py-5 bg-white" aria-label="Our Experience">
      <div className="container-xl py-4">
        
        {/* Section Heading */}
        <SectionHeading
          tag={exp.tag}
          title={exp.heading}
          description={exp.description}
        />

        {/* Experience Cards (Verified Qualitative Highlights - No unverified numbers) */}
        <div className="row g-4 mt-2 justify-content-center">
          {highlights.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="ac-exp-card h-100 p-4 p-md-5 rounded-4 border bg-white shadow-sm d-flex flex-column align-items-center text-center transition">
                <div className="ac-exp-icon-wrap rounded-circle bg-light-maroon text-maroon d-flex align-items-center justify-content-center mb-4">
                  <i className={`bi ${item.icon} fs-2`} />
                </div>
                <h3 className="h5 fw-bold text-dark mb-3">
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

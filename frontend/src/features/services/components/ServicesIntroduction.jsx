import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function ServicesIntroduction() {
  const { t } = useLanguage();
  const intro = t.servicesPage.intro;

  return (
    <section className="py-5 bg-white" aria-label="Services Introduction">
      <div className="container-xl py-2">
        <SectionHeading
          tag={intro.tag}
          title={intro.heading}
          description={intro.description}
          centered={true}
        />
      </div>
    </section>
  );
}

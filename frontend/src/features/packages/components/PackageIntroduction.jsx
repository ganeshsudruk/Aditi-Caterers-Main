import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function PackageIntroduction() {
  const { t } = useLanguage();
  const intro = t.packagesPage.intro;

  return (
    <section className="py-5 bg-white" aria-label="Packages Introduction">
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


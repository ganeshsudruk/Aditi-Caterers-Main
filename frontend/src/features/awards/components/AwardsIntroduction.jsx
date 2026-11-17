import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function AwardsIntroduction() {
  const { language, t } = useLanguage();
  const intro = t.awardsPage?.intro || {};

  return (
    <section className="py-5 bg-white" aria-label="Awards Introduction">
      <div className="container-xl py-2">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 text-center">
            <SectionHeading
              tag={intro.tag || (language === 'mr' ? 'आमच्या कामगिरी' : 'Our Achievements')}
              title={intro.heading || (language === 'mr' ? 'समर्पणाचा प्रवास' : 'A Journey of Dedication')}
              description={intro.description || (language === 'mr'
                ? 'आमच्या कामाची दखल घेऊन मिळालेली प्रशंसा आणि सन्मान आम्हाला पुढेही उत्तम सेवा देण्यासाठी प्रेरणा देतात.'
                : 'We are grateful for the recognition and appreciation received for our work. These awards encourage us to continue delivering food and catering services with care and commitment.')}
              centered={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

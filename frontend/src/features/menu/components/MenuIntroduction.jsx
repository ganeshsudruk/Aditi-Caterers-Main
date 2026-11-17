import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function MenuIntroduction() {
  const { language, t } = useLanguage();
  const intro = t.menuPage?.intro || {};

  return (
    <section className="py-5 bg-white" aria-label="Menu Introduction">
      <div className="container-xl py-2">
        <SectionHeading
          tag={intro.tag || (language === 'mr' ? 'अस्सल चव आणि परंपरा' : 'Authentic Culinary Heritage')}
          title={intro.heading || (language === 'mr' ? 'प्रत्येक सण व सोहळ्यासाठी समृद्ध खाद्यसंस्कृती' : 'Catering Feasts for Every Special Occasion')}
          description={
            intro.description ||
            (language === 'mr'
              ? 'अदिती केटरर्समध्ये आम्ही चव, स्वच्छता आणि घरगुती प्रेमाला सर्वोच्च प्राधान्य देतो. स्वागत पेयांपासून ते गोड पक्वान्नांपर्यंत प्रत्येक पदार्थ उत्कृष्ट साहित्यातून तयार केला जातो.'
              : 'At Aditi Caterers, we blend traditional culinary methods with highest standards of food hygiene. From welcome drinks to festive sweets, our menus make your celebration unforgettable.')
          }
          centered={true}
        />
      </div>
    </section>
  );
}

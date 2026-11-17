import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';
import FoodItemCard from './FoodItemCard';

export default function PopularDishes({ dishes = [], onQuickView }) {
  const { language, t } = useLanguage();
  const popText = t.menuPage?.popular || {};

  if (!dishes || dishes.length === 0) return null;

  return (
    <section className="py-5 bg-white" id="popular-dishes" aria-label="Signature Catering Dishes">
      <div className="container-xl py-2">
        <SectionHeading
          tag={popText.tag || (language === 'mr' ? 'खास आकर्षण' : 'Customer Favorites')}
          title={popText.heading || (language === 'mr' ? 'अदिती केटरर्सचे लोकप्रिय स्वादीष्ट पक्वान्ने' : 'Our Signature & Most-Requested Dishes')}
          description={
            popText.description ||
            (language === 'mr'
              ? 'लग्न सोहळे आणि मंगलकार्यामध्ये ग्राहकांकडून सर्वाधिक मागणी असणारे खास पारंपारिक पदार्थ.'
              : 'The star delicacies that elevate weddings, engagements, and festive celebrations across Maharashtra.')
          }
          centered={true}
        />

        <div className="row g-4 mt-2">
          {dishes.slice(0, 6).map((item) => (
            <FoodItemCard key={item.id} item={item} onQuickView={onQuickView} />
          ))}
        </div>
      </div>
    </section>
  );
}

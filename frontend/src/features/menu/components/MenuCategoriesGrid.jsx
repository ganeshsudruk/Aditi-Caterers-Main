import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';
import MenuCategoryCard from './MenuCategoryCard';

export default function MenuCategoriesGrid({ categories = [] }) {
  const { language, t } = useLanguage();
  const catText = t.menuPage?.categories || {};

  return (
    <section className="py-5 ac-bg-light" id="menu-categories" aria-label="Menu Categories">
      <div className="container-xl py-2">
        <SectionHeading
          tag={catText.tag || (language === 'mr' ? 'कॅटेगरीज' : 'Catering Categories')}
          title={catText.heading || (language === 'mr' ? 'आमचे खाद्यप्रकार व विभाग' : 'Explore by Cuisine & Course')}
          description={
            catText.description ||
            (language === 'mr'
              ? 'सकाळच्या खमंग नाश्त्यापासून ते लग्नकार्यातील शाही जेवण आणि मिठायांपर्यंत विविध खाद्यप्रकार निवडा.'
              : 'Browse our extensive spread organized across traditional feasts, breakfast savories, main courses, and desserts.')
          }
          centered={true}
        />

        <div className="row g-4 mt-2">
          {categories.map((cat) => (
            <MenuCategoryCard key={cat.id || cat.slug} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

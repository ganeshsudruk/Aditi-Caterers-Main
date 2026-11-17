import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function MenuHygiene() {
  const { language, t } = useLanguage();
  const hText = t.menuPage?.hygiene || {};

  const standards = [
    {
      icon: 'bi-droplet-half',
      title: { en: 'Pure Ghee & Brand Ingredients', mr: 'साजूक तूप व दर्जेदार किराणा' },
      desc: {
        en: 'We use certified branded grocery products, whole spices, and pure cow/buffalo ghee for authentic richness.',
        mr: 'प्रमाणित ब्रँडेड किराणा, अस्सल खडे मसाले आणि घरगुती साजूक तुपाचा वापर केला जातो.',
      },
    },
    {
      icon: 'bi-basket2-fill',
      title: { en: 'Fresh Farm Produce', mr: 'पहाटे आणलेल्या ताज्या भाज्या' },
      desc: {
        en: 'Vegetables, milk, and herbs are procured fresh on event morning to ensure zero compromise on flavor and nutrition.',
        mr: 'कार्यक्रमाच्या दिवशी पहाटे मंडईतून ताजी भाजी, दूध व पनीर आणले जाते.',
      },
    },
    {
      icon: 'bi-shield-check',
      title: { en: 'Dedicated Cookware & Sanctity', mr: 'स्वतंत्र भांडी व पावित्र्य' },
      desc: {
        en: 'Separate sanitized utensils for religious poojas, Satyanarayan, and Jain preparations guaranteeing purity.',
        mr: 'पूजा, सण आणि उपवासाच्या जेवणासाठी स्वतंत्र व स्वच्छ भांड्यांची पवित्र व्यवस्था.',
      },
    },
    {
      icon: 'bi-patch-check-fill',
      title: { en: 'Kitchen & Serving Hygiene', mr: 'स्वयंपाकघर व वाढप स्वच्छता' },
      desc: {
        en: 'Uniformed chefs and servers with caps and gloves maintaining continuous sanitization at the dining area.',
        mr: 'गणवेश, टोपी आणि ग्लोव्हज परिधान केलेले आचारी व वाढपी पथक संपूर्ण स्वच्छता राखतात.',
      },
    },
  ];

  return (
    <section className="py-5 ac-bg-light" aria-label="Culinary Hygiene & Sourcing Standards">
      <div className="container-xl py-3">
        <SectionHeading
          tag={hText.tag || (language === 'mr' ? 'गुणवत्ता आणि स्वच्छता' : 'Kitchen Standards')}
          title={hText.heading || (language === 'mr' ? 'आमची खाद्य गुणवत्ता आणि स्वच्छतेची हमी' : 'Our Commitment to Purity & Hygiene')}
          description={
            hText.description ||
            (language === 'mr'
              ? 'अदिती केटरर्समध्ये प्रत्येक पक्वान्न हे घरगुती पावित्र्य, ताजे साहित्य आणि स्वच्छतेचे कडक नियम पाळून तयार केले जाते.'
              : 'Every feast prepared by Aditi Caterers reflects our uncompromised focus on ingredient freshness, pure ghee, and spotless hygiene.')
          }
          centered={true}
        />

        <div className="row g-4 mt-2">
          {standards.map((s, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-3 d-flex">
              <div className="card ac-hygiene-card w-100 shadow-sm border-0">
                <div className="ac-hygiene-icon mx-auto">
                  <i className={`bi ${s.icon}`} />
                </div>
                <h3 className="h6 fw-bold text-dark mb-2">
                  {s.title[language] || s.title.en}
                </h3>
                <p className="text-muted small mb-0 lh-base">
                  {s.desc[language] || s.desc.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

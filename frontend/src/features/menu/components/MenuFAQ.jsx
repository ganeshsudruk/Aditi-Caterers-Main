import { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';
import { getMenuFaqs } from '../../../services/menuService';

export default function MenuFAQ({ faqs: initialFaqs }) {
  const { language, t } = useLanguage();
  const faqText = t.menuPage?.faq || {};
  const [faqs, setFaqs] = useState(initialFaqs || []);
  const [openId, setOpenId] = useState(1);

  useEffect(() => {
    if (initialFaqs && initialFaqs.length > 0) {
      setFaqs(initialFaqs);
    } else {
      getMenuFaqs()
        .then((data) => setFaqs(data || []))
        .catch(() => setFaqs([]));
    }
  }, [initialFaqs]);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-5 bg-white" id="menu-faq" aria-label="Food Menu Frequently Asked Questions">
      <div className="container-xl py-4" style={{ maxWidth: '900px' }}>
        <SectionHeading
          tag={faqText.tag || (language === 'mr' ? 'नेहमीचे प्रश्न' : 'Got Questions?')}
          title={faqText.heading || (language === 'mr' ? 'खाद्यमेनूविषयी प्रश्न' : 'Food Menu FAQs')}
          description={faqText.description || (language === 'mr' ? 'मेनू सानुकूलन, जैन पदार्थ आणि स्वच्छतेविषयी जलद उत्तरे.' : 'Quick answers about customization, Jain preparations, live counters, and ingredient sourcing.')}
          centered={true}
        />

        <div className="accordion mt-4" id="menuFaqAccordion">
          {faqs.map((faq, idx) => {
            const id = faq.id || idx + 1;
            const question = faq.q?.[language] || faq.q?.en;
            const answer = faq.a?.[language] || faq.a?.en;
            const isOpen = openId === id;

            return (
              <div
                key={id}
                className="accordion-item mb-3 border rounded-3 overflow-hidden shadow-sm"
              >
                <h3 className="accordion-header" id={`menu-faq-heading-${id}`}>
                  <button
                    className={`accordion-button fw-semibold ${!isOpen ? 'collapsed' : ''}`}
                    type="button"
                    onClick={() => toggle(id)}
                    aria-expanded={isOpen}
                    aria-controls={`menu-faq-collapse-${id}`}
                    style={
                      isOpen
                        ? {
                            backgroundColor: '#fdf8f0',
                            color: 'var(--ac-maroon, #641e2b)',
                            boxShadow: 'none',
                          }
                        : {}
                    }
                  >
                    <i className="bi bi-patch-question-fill me-2" style={{ color: 'var(--ac-maroon, #641e2b)' }} />
                    {question}
                  </button>
                </h3>
                <div
                  id={`menu-faq-collapse-${id}`}
                  className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
                  aria-labelledby={`menu-faq-heading-${id}`}
                >
                  <div className="accordion-body text-secondary lh-base pt-2 pb-4">
                    {answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

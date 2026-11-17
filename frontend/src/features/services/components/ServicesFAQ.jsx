import { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';
import { defaultServicesFaqs } from '../../../services/serviceService';

export default function ServicesFAQ({ faqs = defaultServicesFaqs }) {
  const { language, t } = useLanguage();
  const faqText = t.servicesPage.faq;
  const [openId, setOpenId] = useState(1);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-5 bg-white" id="services-faq" aria-label="Services Frequently Asked Questions">
      <div className="container-xl py-4" style={{ maxWidth: '900px' }}>
        {/* Section Heading */}
        <SectionHeading
          tag={faqText.tag}
          title={faqText.heading}
          description={faqText.description}
          centered={true}
        />

        {/* FAQ Accordion */}
        <div className="accordion mt-4" id="servicesFaqAccordion">
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
                <h3 className="accordion-header" id={`heading-${id}`}>
                  <button
                    className={`accordion-button fw-semibold ${!isOpen ? 'collapsed' : ''}`}
                    type="button"
                    onClick={() => toggle(id)}
                    aria-expanded={isOpen}
                    aria-controls={`collapse-${id}`}
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
                    <i className="bi bi-question-circle-fill me-2 text-maroon" />
                    {question}
                  </button>
                </h3>
                <div
                  id={`collapse-${id}`}
                  className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
                  aria-labelledby={`heading-${id}`}
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

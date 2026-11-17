import { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function ServiceDetailFAQ({ service }) {
  const { language, t } = useLanguage();
  const [openIdx, setOpenIdx] = useState(0);

  if (!service || !service.faqs || service.faqs.length === 0) {
    return null;
  }

  const faqs = service.faqs;
  const heading = t.servicesPage.detail.serviceFaqs;

  const toggle = (idx) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-5 bg-white" aria-label="Service Frequently Asked Questions">
      <div className="container-xl py-3" style={{ maxWidth: '880px' }}>
        {/* Section Heading */}
        <SectionHeading
          tag={language === 'mr' ? 'प्रश्नोत्तरे' : 'FAQ'}
          title={heading}
          centered={true}
        />

        {/* Accordion */}
        <div className="accordion mt-4" id={`faq-acc-${service.slug}`}>
          {faqs.map((faq, idx) => {
            const question = faq.q?.[language] || faq.q?.en;
            const answer = faq.a?.[language] || faq.a?.en;
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="accordion-item mb-3 border rounded-3 overflow-hidden shadow-sm"
              >
                <h3 className="accordion-header" id={`detail-heading-${idx}`}>
                  <button
                    className={`accordion-button fw-semibold ${!isOpen ? 'collapsed' : ''}`}
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`detail-collapse-${idx}`}
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
                    <i className="bi bi-patch-question-fill me-2 text-maroon" />
                    {question}
                  </button>
                </h3>
                <div
                  id={`detail-collapse-${idx}`}
                  className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
                  aria-labelledby={`detail-heading-${idx}`}
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

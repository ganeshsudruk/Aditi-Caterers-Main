import { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import ContactHero from '../components/ContactHero';
import ContactInfoCards from '../components/ContactInfoCards';
import ContactForm from '../components/ContactForm';
import ContactSuccess from '../components/ContactSuccess';
import ContactFaqPrompt from '../components/ContactFaqPrompt';
import '../styles/contact.css';

export default function ContactPage() {
  const { t } = useLanguage();
  const [submittedEnquiry, setSubmittedEnquiry] = useState(null);

  // Dynamic SEO Page Title & Meta Description
  useEffect(() => {
    const metaTitle =
      t.contactPage?.metaTitle || 'Contact Aditi Caterers | Catering Enquiries';
    const metaDesc =
      t.contactPage?.metaDesc ||
      'Have an upcoming celebration or event? Contact Aditi Caterers for catering enquiries across Maharashtra. Call, WhatsApp, or submit your enquiry online.';

    document.title = metaTitle;

    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'description';
      document.head.appendChild(metaTag);
    }
    metaTag.content = metaDesc;
  }, [t.contactPage]);

  const handleSuccess = (enquiryData) => {
    setSubmittedEnquiry(enquiryData);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSubmittedEnquiry(null);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  return (
    <main id="main-content" className="ac-contact-page">
      {/* Hero Header */}
      <ContactHero />

      {/* Main Content Area */}
      <section className="py-5 bg-light-subtle" aria-label="Contact and Enquiry Section">
        <div className="container">
          {submittedEnquiry ? (
            <ContactSuccess enquiry={submittedEnquiry} onReset={handleReset} />
          ) : (
            <>
              {/* Direct Contact Cards */}
              <ContactInfoCards />

              {/* Catering Enquiry Form */}
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <ContactForm onSuccess={handleSuccess} />
                </div>
              </div>

              {/* FAQ and Booking Assistance Prompt */}
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <ContactFaqPrompt />
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

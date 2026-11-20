import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function ContactHero() {
  const { t } = useLanguage();
  const contactText = t.contactPage?.hero || {};

  return (
    <section className="ac-contact-hero text-white" aria-labelledby="contact-heading">
      <div className="container position-relative">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-3">
            <li className="breadcrumb-item">
              <Link to="/">{contactText.breadcrumbHome || 'Home'}</Link>
            </li>
            <li className="breadcrumb-item active text-white-50" aria-current="page">
              {contactText.breadcrumbContact || 'Contact Us'}
            </li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-lg-8">
            <h1 id="contact-heading" className="display-5 fw-bold mb-3">
              {contactText.title || 'Contact Us'}
            </h1>
            <p className="lead text-white-50 mb-0">
              {contactText.subtitle ||
                'Have an upcoming celebration or event? Contact Aditi Caterers to discuss your catering requirements. Share your event details and our team will get in touch.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

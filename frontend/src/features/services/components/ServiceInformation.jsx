import { useLanguage } from '../../../context/LanguageContext';

export default function ServiceInformation({ service }) {
  const { language, t } = useLanguage();

  if (!service) return null;

  const fullDescription = service.fullDescription?.[language] || service.fullDescription?.en;
  const requirements = service.eventRequirements?.[language] || service.eventRequirements?.en || [];
  const reqTitle = t.servicesPage.detail.eventRequirements;

  return (
    <section className="py-5 bg-white" aria-label="Service Details & Event Requirements">
      <div className="container-xl py-3">
        <div className="row g-4 g-lg-5 align-items-start">
          {/* Main Description */}
          <div className="col-12 col-lg-7">
            <div className="pe-lg-3">
              <span className="badge bg-light-maroon text-maroon px-3 py-2 rounded-pill fw-semibold mb-3">
                {language === 'mr' ? 'सेवा परिचय' : 'Service Overview'}
              </span>
              <h2 className="h3 fw-bold text-dark mb-4 lh-base">
                {service.name?.[language] || service.name?.en}
              </h2>
              <p className="lead fs-6 text-secondary mb-4 lh-lg">
                {fullDescription}
              </p>

              {/* Trust Callout */}
              <div className="p-3 px-4 rounded-3 bg-light border-start border-4 border-maroon mt-4" style={{ borderColor: 'var(--ac-maroon, #641e2b)' }}>
                <p className="text-dark small mb-0 fw-medium">
                  <i className="bi bi-shield-check text-success me-2 fs-6" />
                  {language === 'mr'
                    ? 'अदिती केटरर्समध्ये आम्ही स्वच्छता, ताजे साहित्य आणि पाहुण्यांच्या आदरातिथ्याला सर्वोच्च प्राधान्य देतो.'
                    : 'At Aditi Caterers, we prioritize pristine kitchen hygiene, fresh ingredients, and courteous hospitality for your celebration.'}
                </p>
              </div>
            </div>
          </div>

          {/* Event Requirements & Considerations Card */}
          <div className="col-12 col-lg-5">
            <div className="card border rounded-4 p-4 p-md-5 shadow-sm bg-white">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white"
                  style={{ width: '48px', height: '48px', backgroundColor: 'var(--ac-maroon, #641e2b)' }}
                >
                  <i className="bi bi-list-check fs-4" />
                </div>
                <h3 className="h5 fw-bold text-dark mb-0">
                  {reqTitle}
                </h3>
              </div>

              <div className="d-flex flex-column gap-2">
                {requirements.map((req, idx) => (
                  <div key={idx} className="ac-requirement-item">
                    <i className="bi bi-check2-circle ac-requirement-icon text-success" />
                    <span className="text-secondary small">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function Testimonials({ testimonials = [] }) {
  const { t } = useLanguage();

  if (!testimonials || testimonials.length === 0) {
    return null; // Gracefully hide section if no approved reviews are available as per Section 15.3
  }

  return (
    <section className="ac-testimonials py-5 bg-white" aria-label="Customer Testimonials">
      <div className="container-xl py-4">
        
        {/* Section Heading */}
        <SectionHeading
          tag={t.home.testimonials.tag}
          title={t.home.testimonials.title}
          description={t.home.testimonials.description}
        />

        {/* Testimonials Cards Grid */}
        <div className="row g-4 mt-2 justify-content-center">
          {testimonials.map((item) => {
            const reviewData = t.home.testimonials[item.key] || {
              name: item.name || 'Valued Customer',
              event: item.event || 'Catering Event',
              text: item.text || item.feedback || '',
            };

            const rating = item.rating || 5;

            return (
              <div key={item.id || item.key} className="col-lg-4 col-md-6">
                <div className="ac-testimonial-card h-100 p-4 rounded-4 border bg-white shadow-sm d-flex flex-column justify-content-between">
                  <div>
                    {/* Star Rating */}
                    <div className="d-flex align-items-center gap-1 mb-3 text-warning">
                      {[...Array(rating)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill small" />
                      ))}
                    </div>

                    {/* Feedback quote */}
                    <p className="ac-testimonial-quote text-muted mb-4 fst-italic">
                      "{reviewData.text}"
                    </p>
                  </div>

                  {/* Customer author */}
                  <div className="d-flex align-items-center gap-3 pt-3 border-top border-light-subtle">
                    <div className="ac-testimonial-avatar rounded-circle bg-light-maroon text-maroon d-flex align-items-center justify-content-center fw-bold">
                      {reviewData.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="h6 fw-bold text-dark mb-0">
                        {reviewData.name}
                      </h4>
                      <small className="text-muted extra-small">
                        {reviewData.event}
                      </small>
                    </div>
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

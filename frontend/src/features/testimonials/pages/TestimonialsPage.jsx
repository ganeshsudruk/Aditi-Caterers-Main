import { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';
import api from '../../../services/api';

export default function TestimonialsPage() {
  const { language, t } = useLanguage();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = language === 'mr' ? 'ग्राहक अभिप्राय | अदिती केटरर्स' : 'Customer Reviews | Aditi Caterers';
  }, [language]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    api.get('/reviews/public/all')
      .then((res) => {
        if (isMounted && res?.data) {
          const list = Array.isArray(res.data.data) ? res.data.data : (Array.isArray(res.data) ? res.data : []);
          setReviews(list.filter((r) => r.status === 'published' && r.consent?.granted));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load public reviews:', err);
        if (isMounted) {
          setReviews([]);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, []);

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--ac-bg-light, #fdf8f0)', minHeight: '80vh' }}>
      <div className="container-xl py-4">
        {/* Section Heading */}
        <SectionHeading
          tag={language === 'mr' ? 'ग्राहक अनुभव' : 'Client Experiences'}
          title={language === 'mr' ? 'आमच्या समाधानी ग्राहकांचे अभिप्राय' : 'What Our Clients Say About Us'}
          description={
            language === 'mr'
              ? 'अदिती केटरर्सच्या स्वादिष्ट भोजनाचा आणि आदरातिथ्याचा अनुभव घेतलेल्या ग्राहकांचे प्रामाणिक मत.'
              : 'Genuine feedback and heartfelt testimonials from families and organizers who trusted us with their celebrations.'
          }
          centered={true}
        />

        {/* Reviews Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-maroon mb-3" style={{ color: '#641e2b' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">{language === 'mr' ? 'अभिप्राय लोड होत आहेत...' : 'Loading testimonials...'}</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-5">
            <div className="rounded-circle bg-white shadow-sm d-inline-flex align-items-center justify-content-center p-4 mb-3">
              <i className="bi bi-chat-heart text-muted fs-1"></i>
            </div>
            <h4 className="fw-bold text-dark mb-2">
              {language === 'mr' ? 'लवकरच नवीन अभिप्राय जोडले जातील' : 'No testimonials published yet'}
            </h4>
            <p className="text-muted small">
              {language === 'mr'
                ? 'आम्ही लवकरच आमच्या ग्राहकांचे अनुभव येथे प्रसिद्ध करू.'
                : 'Verified client reviews will be published here shortly.'}
            </p>
          </div>
        ) : (
          <div className="row g-4 mt-3">
            {reviews.map((rev) => {
              // Resolve display name
              let name = rev.customerDisplayName || (language === 'mr' ? 'समाधानी ग्राहक' : 'Valued Client');
              if (rev.consent?.displayNamePermission === 'first_name_only' && name) {
                name = name.split(' ')[0] + '...';
              } else if (rev.consent?.displayNamePermission === 'anonymous') {
                name = language === 'mr' ? 'समाधानी ग्राहक' : 'Satisfied Client';
              }

              // Resolve review text based on current language
              let text = rev.reviewText?.original || '';
              if (language === 'mr' && rev.reviewText?.mr) {
                text = rev.reviewText.mr;
              } else if (language === 'en' && rev.reviewText?.en) {
                text = rev.reviewText.en;
              }

              return (
                <div key={rev.id || rev._id} className="col-12 col-md-6 col-lg-4 d-flex">
                  <div
                    className="card border-0 shadow-sm rounded-4 p-4 w-100 bg-white d-flex flex-column justify-content-between"
                    style={{ borderTop: '4px solid #641e2b' }}
                  >
                    <div>
                      {/* Rating stars if provided */}
                      {rev.rating && (
                        <div className="d-flex align-items-center gap-1 text-warning mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <i
                              key={star}
                              className={`bi ${star <= rev.rating ? 'bi-star-fill' : 'bi-star'} small`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Review text */}
                      <p className="text-muted fst-italic mb-4" style={{ lineHeight: 1.7, fontSize: '0.98rem' }}>
                        "{text}"
                      </p>
                    </div>

                    {/* Author footer */}
                    <div className="d-flex align-items-center justify-content-between pt-3 border-top border-light-subtle mt-2">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                          style={{ width: '42px', height: '42px', backgroundColor: '#641e2b', fontSize: '1.1rem' }}
                        >
                          {name.charAt(0)}
                        </div>
                        <div>
                          <h6 className="fw-bold text-dark mb-0">{name}</h6>
                          <small className="text-muted text-capitalize">
                            {rev.eventType ? rev.eventType.replace('_', ' ') : (language === 'mr' ? 'समारंभ केटरिंग' : 'Catering Event')}
                          </small>
                        </div>
                      </div>

                      {rev.isFeatured && (
                        <span className="badge bg-danger-subtle text-danger border border-danger-subtle" style={{ fontSize: '0.65rem' }}>
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

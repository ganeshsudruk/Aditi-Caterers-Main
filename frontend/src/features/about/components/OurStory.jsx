  import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';

export default function OurStory({ storyImage }) {
  const { t } = useLanguage();
  const story = t.aboutPage.story;

  const displayImage =
    storyImage || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80';

  return (
    <section className="ac-our-story py-5 ac-bg-light" aria-label="Our Story">
      <div className="container-xl py-4">
        
        {/* Section Heading */}
        <SectionHeading
          tag={story.tag}
          title={story.heading}
        />

        <div className="row align-items-center g-5 mt-1">
          {/* Text Description */}
          <div className="col-lg-6 order-2 order-lg-1">
            <div className="p-4 p-md-5 bg-white rounded-4 border shadow-sm h-100">
              <div className="d-flex align-items-center gap-2 mb-3 text-gold">
                <i className="bi bi-clock-history fs-3" />
                <span className="fw-semibold text-uppercase small letter-spacing-1">
                  Aditi Caterers
                </span>
              </div>
              
              <p className="lead text-dark fs-6 mb-4 fw-medium">
                "{story.p1}"
              </p>

              <p className="text-muted mb-4 fs-6 lh-base">
                {story.p2}
              </p>

              <div className="d-flex align-items-center gap-3 pt-3 border-top border-light-subtle">
                <div className="rounded-circle bg-light-maroon text-maroon p-2 d-flex align-items-center justify-content-center">
                  <i className="bi bi-heart-fill fs-5" />
                </div>
                <div>
                  <h6 className="mb-0 fw-bold text-dark">Dedicated to Authentic Flavors</h6>
                  <small className="text-muted">Serving with care & punctuality</small>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="col-lg-6 order-1 order-lg-2">
            <div className="position-relative overflow-hidden rounded-4 shadow">
              <img
                src={displayImage}
                alt="Aditi Caterers Journey & Catering Events"
                className="w-100 object-fit-cover ac-story-img"
                loading="lazy"
              />
              <div className="ac-story-overlay position-absolute inset-0 d-flex align-items-end p-4 text-white">
                <span className="badge bg-gold text-dark px-3 py-2 rounded-pill small fw-semibold">
                  <i className="bi bi-stars me-1" />
                  Wholesome Food & Thoughtful Service
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

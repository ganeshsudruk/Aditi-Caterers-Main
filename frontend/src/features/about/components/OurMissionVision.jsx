import { useLanguage } from '../../../context/LanguageContext';

export default function OurMissionVision() {
  const { t } = useLanguage();
  const mv = t.aboutPage.missionVision;

  return (
    <section className="ac-mission-vision py-5 ac-bg-light" aria-label="Our Mission and Vision">
      <div className="container-xl py-4">
        <div className="row g-4 justify-content-center">
          
          {/* Mission Card */}
          <div className="col-lg-6 col-md-10">
            <div className="ac-mv-card h-100 p-4 p-md-5 rounded-4 bg-white border shadow-sm position-relative overflow-hidden transition">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="ac-mv-icon-circle rounded-circle bg-light-maroon text-maroon d-flex align-items-center justify-content-center">
                  <i className="bi bi-bullseye fs-2" />
                </div>
                <div>
                  <span className="badge bg-light-maroon text-maroon px-2 py-1 rounded small fw-semibold text-uppercase">
                    {mv.missionTag}
                  </span>
                  <h3 className="h4 fw-bold text-dark mb-0 mt-1">
                    {mv.missionTitle}
                  </h3>
                </div>
              </div>
              <p className="text-muted fs-6 mb-0 lh-lg">
                {mv.missionText}
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="col-lg-6 col-md-10">
            <div className="ac-mv-card h-100 p-4 p-md-5 rounded-4 bg-white border shadow-sm position-relative overflow-hidden transition">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="ac-mv-icon-circle rounded-circle bg-light-green text-success d-flex align-items-center justify-content-center">
                  <i className="bi bi-eye-fill fs-2" />
                </div>
                <div>
                  <span className="badge bg-gold text-dark px-2 py-1 rounded small fw-semibold text-uppercase">
                    {mv.visionTag}
                  </span>
                  <h3 className="h4 fw-bold text-dark mb-0 mt-1">
                    {mv.visionTitle}
                  </h3>
                </div>
              </div>
              <p className="text-muted fs-6 mb-0 lh-lg">
                {mv.visionText}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

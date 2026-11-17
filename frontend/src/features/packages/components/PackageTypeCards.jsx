import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';
import { defaultPackageTypes } from '../../../services/packageService';

export default function PackageTypeCards({ types = defaultPackageTypes }) {
  const { language, t } = useLanguage();
  const pkgTypesText = t.packagesPage.packageTypes;

  return (
    <section className="py-5 ac-bg-light" id="package-types" aria-label="Core Package Types">
      <div className="container-xl py-4">
        {/* Section Heading */}
        <SectionHeading
          tag={pkgTypesText.tag}
          title={pkgTypesText.heading}
          description={pkgTypesText.description}
          centered={true}
        />

        {/* 3 Core Package Types */}
        <div className="row g-4 mt-2 justify-content-center">
          {types.map((pkgType) => {
            const name = pkgType.name?.[language] || pkgType.name?.en;
            const desc = pkgType.shortDescription?.[language] || pkgType.shortDescription?.en;
            const badge = pkgType.badge?.[language] || pkgType.badge?.en;
            const actionText = pkgType.actionText?.[language] || pkgType.actionText?.en;
            const isCustom = pkgType.type === 'custom';

            return (
              <div key={pkgType.id} className="col-12 col-md-6 col-lg-4 d-flex">
                <div className="ac-package-type-card w-100 shadow-sm">
                  {/* Top Icon & Badge */}
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="ac-type-icon-box mb-0">
                      <i className={`bi ${pkgType.icon}`} />
                    </div>
                    {badge && (
                      <span className="badge rounded-pill bg-light-maroon text-maroon px-3 py-2 small fw-semibold">
                        {badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="h5 fw-bold text-dark mb-3">
                    {name}
                  </h3>
                  <p className="text-secondary small mb-4 flex-grow-1 lh-base">
                    {desc}
                  </p>

                  {/* Action Link */}
                  <div className="mt-auto pt-2">
                    <Link
                      to={pkgType.route}
                      className={`btn w-100 py-2 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 ${
                        isCustom ? 'btn-gold text-dark' : 'ac-btn-outline-maroon'
                      }`}
                      style={
                        isCustom
                          ? { backgroundColor: 'var(--ac-gold, #c9a45c)', borderColor: 'var(--ac-gold, #c9a45c)' }
                          : {}
                      }
                    >
                      <span>{actionText}</span>
                      <i className="bi bi-arrow-right" />
                    </Link>
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


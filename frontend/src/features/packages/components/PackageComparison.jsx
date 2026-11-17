import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';
import { defaultPackageComparison } from '../../../services/packageService';

export default function PackageComparison({ rows = defaultPackageComparison }) {
  const { language, t } = useLanguage();
  const compText = t.packagesPage.comparison;

  return (
    <section className="py-5 ac-bg-light" id="package-comparison" aria-label="Package Comparison">
      <div className="container-xl py-4">
        {/* Section Heading */}
        <SectionHeading
          tag={compText.tag}
          title={compText.heading}
          description={compText.description}
          centered={true}
        />

        {/* Comparison Table Card */}
        <div className="ac-comparison-card mt-4">
          <div className="table-responsive">
            <table className="table ac-comparison-table align-middle">
              <thead>
                <tr>
                  <th>{compText.featureCol}</th>
                  <th>{compText.withMaterialCol}</th>
                  <th>{compText.withoutMaterialCol}</th>
                  <th>{compText.customCol}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.feature[language] || row.feature.en}</td>
                    <td>{row.withMaterial[language] || row.withMaterial.en}</td>
                    <td>{row.withoutMaterial[language] || row.withoutMaterial.en}</td>
                    <td>{row.custom[language] || row.custom.en}</td>
                  </tr>
                ))}
                {/* Actions Row */}
                <tr>
                  <td className="fw-bold text-dark">
                    {language === 'mr' ? 'थेट चौकशी' : 'Action'}
                  </td>
                  <td>
                    <Link
                      to="/booking?packageType=with-material"
                      className="btn btn-sm btn-maroon text-white px-3 py-1 rounded-pill fw-semibold"
                      style={{ backgroundColor: 'var(--ac-maroon, #641e2b)' }}
                    >
                      {compText.enquireBtn}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to="/booking?packageType=without-material"
                      className="btn btn-sm btn-success px-3 py-1 rounded-pill fw-semibold"
                    >
                      {compText.enquireBtn}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to="/booking?packageType=custom"
                      className="btn btn-sm btn-warning text-dark px-3 py-1 rounded-pill fw-semibold"
                      style={{ backgroundColor: 'var(--ac-gold, #c9a45c)', borderColor: 'var(--ac-gold, #c9a45c)' }}
                    >
                      {compText.enquireBtn}
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="text-center mt-3 text-muted small mx-auto" style={{ maxWidth: '850px' }}>
          <p className="mb-0 italic">
            <i className="bi bi-info-circle me-1 text-maroon" />
            {compText.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}


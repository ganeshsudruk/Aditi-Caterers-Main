import { useLanguage } from '../../../context/LanguageContext';
import SectionHeading from '../../../components/common/SectionHeading';
import ServiceCard from './ServiceCard';

export default function ServiceGrid({ services = [] }) {
  const { t } = useLanguage();
  const allServicesText = t.servicesPage.allServices;

  const activeServices = services
    .filter((s) => s.isActive !== false)
    .sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));

  return (
    <section className="py-5 ac-bg-light" id="all-services" aria-label="All Catering Services">
      <div className="container-xl py-4">
        {/* Section Heading */}
        <SectionHeading
          tag={allServicesText.tag}
          title={allServicesText.heading}
          description={allServicesText.description}
          centered={true}
        />

        {/* Services Grid */}
        <div className="row g-4 mt-2">
          {activeServices.length > 0 ? (
            activeServices.map((service) => (
              <ServiceCard key={service.id || service.slug} service={service} />
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <p className="text-muted fs-5">{t.common.errorMsg}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

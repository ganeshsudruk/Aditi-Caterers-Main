import PagePlaceholder from '../../../components/common/PagePlaceholder';
import { useLanguage } from '../../../context/LanguageContext';

export default function ServicesPage() {
  const { t } = useLanguage();
  return <PagePlaceholder title={t.nav.services} description={t.home.servicesSection.description} />;
}

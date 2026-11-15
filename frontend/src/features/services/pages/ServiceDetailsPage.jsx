import { useParams } from 'react-router-dom';
import PagePlaceholder from '../../../components/common/PagePlaceholder';
import { useLanguage } from '../../../context/LanguageContext';

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const serviceName = t.services?.[id] || (id ? id.replace(/-/g, ' ').toUpperCase() : t.nav.services);

  return (
    <PagePlaceholder
      title={`${serviceName} – Aditi Caterers`}
      description="Professional event catering services tailored to your occasion. Contact us for customized quotes."
    />
  );
}

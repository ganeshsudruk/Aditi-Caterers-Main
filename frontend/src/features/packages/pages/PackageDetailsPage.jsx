import { useParams } from 'react-router-dom';
import PagePlaceholder from '../../../components/common/PagePlaceholder';
import { useLanguage } from '../../../context/LanguageContext';

export default function PackageDetailsPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  return <PagePlaceholder title={`${t.nav.packages}: ${id}`} />;
}

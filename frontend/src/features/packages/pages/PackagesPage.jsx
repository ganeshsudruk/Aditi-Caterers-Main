import PagePlaceholder from '../../../components/common/PagePlaceholder';
import { useLanguage } from '../../../context/LanguageContext';

export default function PackagesPage() {
  const { t } = useLanguage();
  return <PagePlaceholder title={t.nav.packages} description="Explore our budget and premium catering packages." />;
}

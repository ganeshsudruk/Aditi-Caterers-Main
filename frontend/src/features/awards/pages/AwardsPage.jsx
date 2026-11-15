import PagePlaceholder from '../../../components/common/PagePlaceholder';
import { useLanguage } from '../../../context/LanguageContext';

export default function AwardsPage() {
  const { t } = useLanguage();
  return <PagePlaceholder title={t.nav.awards} description="Recognition and milestones in our catering journey." />;
}

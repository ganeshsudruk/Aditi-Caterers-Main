import PagePlaceholder from '../../../components/common/PagePlaceholder';
import { useLanguage } from '../../../context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  return <PagePlaceholder title={t.nav.about} description={t.home.about.description} />;
}

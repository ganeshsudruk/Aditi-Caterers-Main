import PagePlaceholder from '../../../components/common/PagePlaceholder';
import { useLanguage } from '../../../context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  return <PagePlaceholder title={t.nav.contact} description={t.home.contact.description} />;
}

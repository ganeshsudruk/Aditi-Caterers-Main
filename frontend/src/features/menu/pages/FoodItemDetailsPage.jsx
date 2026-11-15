import PagePlaceholder from '../../../components/common/PagePlaceholder';
import { useLanguage } from '../../../context/LanguageContext';

export default function FoodItemDetailsPage() {
  const { t } = useLanguage();
  return <PagePlaceholder title={t.nav.menu} />;
}

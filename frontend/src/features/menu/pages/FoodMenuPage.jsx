import PagePlaceholder from '../../../components/common/PagePlaceholder';
import { useLanguage } from '../../../context/LanguageContext';

export default function FoodMenuPage() {
  const { t } = useLanguage();
  return <PagePlaceholder title={t.nav.menu} description={t.home.foodMenu.description} />;
}

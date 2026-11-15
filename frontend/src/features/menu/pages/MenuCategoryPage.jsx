import { useParams } from 'react-router-dom';
import PagePlaceholder from '../../../components/common/PagePlaceholder';
import { useLanguage } from '../../../context/LanguageContext';

export default function MenuCategoryPage() {
  const { category } = useParams();
  const { t } = useLanguage();
  const catName = t.menu?.[category] || category;

  return (
    <PagePlaceholder
      title={`${catName} – ${t.nav.menu}`}
      description="Delicious and hygienic dishes prepared by our master chefs."
    />
  );
}

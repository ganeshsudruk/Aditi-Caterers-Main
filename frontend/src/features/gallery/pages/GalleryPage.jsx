import PagePlaceholder from '../../../components/common/PagePlaceholder';
import { useLanguage } from '../../../context/LanguageContext';

export default function GalleryPage() {
  const { t } = useLanguage();
  return <PagePlaceholder title={t.nav.gallery} description={t.home.gallery.description} />;
}

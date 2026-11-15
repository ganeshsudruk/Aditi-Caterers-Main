import PagePlaceholder from '../../../components/common/PagePlaceholder';
import { useLanguage } from '../../../context/LanguageContext';

export default function TestimonialsPage() {
  const { t } = useLanguage();
  return <PagePlaceholder title={t.home.testimonials.title} description={t.home.testimonials.description} />;
}

import { useSearchParams } from 'react-router-dom';
import PagePlaceholder from '../../../components/common/PagePlaceholder';
import { useLanguage } from '../../../context/LanguageContext';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const option = searchParams.get('option');
  const event = searchParams.get('event');
  const { t } = useLanguage();

  let subtitle = 'Fill out your event details to receive an instant quotation or consultation.';
  if (option === 'with-material') {
    subtitle = 'Booking Enquiry for Catering With Material (साहित्यासह केटरिंग).';
  } else if (option === 'without-material') {
    subtitle = 'Booking Enquiry for Catering Without Material (साहित्या शिवाय केटरिंग).';
  } else if (event) {
    subtitle = `Booking Enquiry for ${event.toUpperCase()} Catering.`;
  }

  return (
    <PagePlaceholder
      title={t.nav.bookNow}
      description={subtitle}
    />
  );
}

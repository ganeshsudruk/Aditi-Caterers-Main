import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { getAllPackages } from '../../../services/packageService';

import '../styles/booking.css';

import BookingHero from '../components/BookingHero';
import BookingForm from '../components/BookingForm';
import BookingSuccess from '../components/BookingSuccess';
import BookingProcess from '../components/BookingProcess';
import BookingAssistance from '../components/BookingAssistance';

export default function BookingPage() {
  const { language, t } = useLanguage();
  const [searchParams] = useSearchParams();

  // Query parameters prefill
  const paramPackageType = searchParams.get('packageType') || searchParams.get('option') || '';
  const paramPackageId = searchParams.get('packageId') || '';
  const paramSelectedDishes = searchParams.get('selectedDishes') || '';
  const paramEvent = searchParams.get('event') || '';

  // Form State (persists across language changes)
  const [formData, setFormData] = useState({
    customerName: '',
    mobile: '',
    email: '',
    preferredContactMethod: 'phone',
    eventType: paramEvent || '',
    otherEventType: '',
    eventDate: '',
    eventTime: '',
    guestCount: '',
    city: '',
    venueAddress: '',
    cateringType:
      paramPackageType === 'with-material' || paramPackageType === 'without-material'
        ? paramPackageType
        : '',
    packageId: paramPackageId || '',
    foodPreference: 'pure-veg',
    mealType: '',
    selectedDishes: paramSelectedDishes || '',
    specialDietary: '',
    budget: '',
    additionalNotes: '',
  });

  const [packages, setPackages] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);

  // SEO: Document Title & Meta Description
  useEffect(() => {
    const metaTitle =
      t.bookingPage?.metaTitle ||
      (language === 'mr' ? 'केटरिंग बुकिंग | अदिती केटरर्स' : 'Book Catering | Aditi Caterers');
    document.title = metaTitle;

    const metaDesc =
      t.bookingPage?.metaDesc ||
      (language === 'mr'
        ? 'अदिती केटरर्सकडे तुमच्या कार्यक्रमाची माहिती पाठवा आणि केटरिंग सेवा, पॅकेजेस व मेनू पर्यायांची चौकशी करा.'
        : 'Send your event details to Aditi Caterers and enquire about catering services, packages, and menu requirements.');

    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'description';
      document.head.appendChild(metaTag);
    }
    metaTag.content = metaDesc;
  }, [language, t]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Load packages for dropdown
  useEffect(() => {
    let isMounted = true;
    getAllPackages()
      .then((pkgs) => {
        if (isMounted && Array.isArray(pkgs)) {
          setPackages(pkgs);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle successful form submission
  const handleSubmissionSuccess = (record) => {
    setSubmittedData(record);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Reset to submit another enquiry
  const handleResetForm = () => {
    setSubmittedData(null);
    setFormData({
      customerName: '',
      mobile: '',
      email: '',
      preferredContactMethod: 'phone',
      eventType: '',
      otherEventType: '',
      eventDate: '',
      eventTime: '',
      guestCount: '',
      city: '',
      venueAddress: '',
      cateringType: '',
      packageId: '',
      foodPreference: 'pure-veg',
      mealType: '',
      selectedDishes: '',
      specialDietary: '',
      budget: '',
      additionalNotes: '',
    });
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Hero / Banner */}
      <BookingHero />

      {/* 2. Main Booking / Success Section */}
      <section
        className="py-5"
        style={{ backgroundColor: 'var(--ac-bg-light, #fdf8f0)' }}
        aria-label="Event Catering Booking"
      >
        <div className="container-xl">
          {submittedData ? (
            <BookingSuccess
              enquiryData={submittedData}
              onResetForm={handleResetForm}
            />
          ) : (
            <div className="ac-booking-container">
              <div className="ac-booking-card">
                <BookingForm
                  formData={formData}
                  setFormData={setFormData}
                  packages={packages}
                  onSuccess={handleSubmissionSuccess}
                />
              </div>

              {/* Direct Phone / WhatsApp Assistance Banner */}
              <BookingAssistance />
            </div>
          )}
        </div>
      </section>

      {/* 3. Booking Process Steps */}
      <BookingProcess />
    </>
  );
}

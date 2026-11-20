import { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { submitBookingEnquiry } from '../../../services/bookingService';

import CustomerInformationForm from './CustomerInformationForm';
import EventInformationForm from './EventInformationForm';
import CateringRequirementsForm from './CateringRequirementsForm';
import PackageMenuPreferencesForm from './PackageMenuPreferencesForm';
import AdditionalNotesForm from './AdditionalNotesForm';
import BookingConsent from './BookingConsent';

export default function BookingForm({
  formData,
  setFormData,
  packages = [],
  onSuccess,
}) {
  const { language, t } = useLanguage();
  const v = t.bookingPage?.validation || {};

  const [errors, setErrors] = useState({});
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Handle generic input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle catering type selection
  const handleSelectCateringType = (typeId) => {
    setFormData((prev) => ({ ...prev, cateringType: typeId }));
    if (errors.cateringType) {
      setErrors((prev) => ({ ...prev, cateringType: null }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // 1. Customer Name
    if (!formData.customerName || !formData.customerName.trim()) {
      newErrors.customerName = v.nameRequired || 'Please enter your full name.';
    }

    // 2. Mobile Number (10 digits)
    const mobileClean = (formData.mobile || '').replace(/\D/g, '');
    if (!mobileClean) {
      newErrors.mobile = v.mobileRequired || 'Please enter your mobile number.';
    } else if (mobileClean.length !== 10) {
      newErrors.mobile = v.mobileInvalid || 'Please enter a valid 10-digit mobile number.';
    }

    // 3. Email (optional, validate format if provided)
    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = v.emailInvalid || 'Please enter a valid email address.';
      }
    }

    // 4. Event Type
    if (!formData.eventType) {
      newErrors.eventType = v.eventTypeRequired || 'Please select the event type.';
    } else if (formData.eventType === 'other' && (!formData.otherEventType || !formData.otherEventType.trim())) {
      newErrors.otherEventType = v.otherTypeRequired || 'Please specify the event type.';
    }

    // 5. Event Date
    if (!formData.eventDate) {
      newErrors.eventDate = v.eventDateRequired || 'Please select the event date.';
    } else {
      const selected = new Date(formData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.eventDate = v.eventDatePast || 'Event date must be in the future.';
      }
    }

    // 6. Number of Guests
    const count = parseInt(formData.guestCount, 10);
    if (!formData.guestCount) {
      newErrors.guestCount = v.guestCountRequired || 'Please enter the estimated number of guests.';
    } else if (isNaN(count) || count < 1) {
      newErrors.guestCount = v.guestCountInvalid || 'Guest count must be at least 1.';
    }

    // 7. City / Village
    if (!formData.city || !formData.city.trim()) {
      newErrors.city = v.cityRequired || 'Please enter the city or village.';
    }

    // 8. Catering Type
    if (!formData.cateringType) {
      newErrors.cateringType = v.cateringTypeRequired || 'Please select a catering type.';
    }

    // 9. Privacy Consent Checkbox
    if (!consentAccepted) {
      newErrors.consent = v.consentRequired || 'You must accept the privacy notice to submit an enquiry.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      // Focus on first error if practical
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customerName: formData.customerName.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email ? formData.email.trim() : '',
        preferredContactMethod: formData.preferredContactMethod || 'phone',
        eventType: formData.eventType,
        otherEventType: formData.eventType === 'other' ? formData.otherEventType.trim() : '',
        eventDate: formData.eventDate,
        eventTime: formData.eventTime || '',
        guestCount: parseInt(formData.guestCount, 10),
        city: formData.city.trim(),
        venueAddress: formData.venueAddress ? formData.venueAddress.trim() : '',
        cateringType: formData.cateringType,
        packageId: formData.packageId || '',
        foodPreference: formData.foodPreference || 'pure-veg',
        mealType: formData.mealType || '',
        selectedDishes: formData.selectedDishes ? formData.selectedDishes.trim() : '',
        specialDietary: formData.specialDietary ? formData.specialDietary.trim() : '',
        budget: formData.budget ? formData.budget.trim() : '',
        additionalNotes: formData.additionalNotes ? formData.additionalNotes.trim() : '',
        language,
        submittedAt: new Date().toISOString(),
      };

      const result = await submitBookingEnquiry(payload);

      if (result?.success) {
        onSuccess(result.data || payload);
      } else {
        setSubmitError(result?.message || 'Failed to submit enquiry. Please try again.');
      }
    } catch {
      setSubmitError(
        language === 'mr'
          ? 'चौकशी पाठवताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा किंवा थेट फोन करा.'
          : 'An unexpected error occurred while submitting. Please try again or call us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="ac-booking-form">
      {/* 1. Customer Information */}
      <CustomerInformationForm
        formData={formData}
        onChange={handleChange}
        errors={errors}
      />

      {/* 2. Event Information */}
      <EventInformationForm
        formData={formData}
        onChange={handleChange}
        errors={errors}
      />

      {/* 3. Catering Requirements */}
      <CateringRequirementsForm
        formData={formData}
        onSelectCateringType={handleSelectCateringType}
        errors={errors}
      />

      {/* 4. Package & Menu Preferences */}
      <PackageMenuPreferencesForm
        formData={formData}
        onChange={handleChange}
        packages={packages}
      />

      {/* 5. Budget & Additional Notes */}
      <AdditionalNotesForm
        formData={formData}
        onChange={handleChange}
      />

      {/* 6. Consent & Submit */}
      <BookingConsent
        consentAccepted={consentAccepted}
        onConsentChange={setConsentAccepted}
        isSubmitting={isSubmitting}
        error={errors.consent || submitError}
      />
    </form>
  );
}

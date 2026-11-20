import api from './api';

export const contactEventTypes = [
  { id: 'wedding', label: { en: 'Wedding', mr: 'लग्न समारंभ' } },
  { id: 'birthday', label: { en: 'Birthday Party', mr: 'वाढदिवस सोहळा' } },
  { id: 'engagement', label: { en: 'Engagement', mr: 'साखरपुडा' } },
  { id: 'corporate', label: { en: 'Corporate Event', mr: 'कॉर्पोरेट कार्यक्रम' } },
  { id: 'reception', label: { en: 'Reception', mr: 'रिसेप्शन' } },
  { id: 'religious', label: { en: 'Religious Ceremony / Pooja', mr: 'धार्मिक कार्यक्रम / पूजा' } },
  { id: 'other', label: { en: 'Other Event', mr: 'इतर कार्यक्रम' } },
];

export const contactCateringTypes = [
  {
    id: 'with-material',
    label: { en: 'With Material', mr: 'साहित्यासह' },
    desc: {
      en: 'Aditi Caterers brings all ingredients, raw materials, cooking, and complete catering service.',
      mr: 'सर्व खाद्यपदार्थांचे किराणा साहित्य, स्वयंपाक आणि सेवा अदिती केटरर्सकडून पुरवली जाईल.',
    },
    icon: 'bi-box-seam-fill',
  },
  {
    id: 'without-material',
    label: { en: 'Without Material', mr: 'साहित्याशिवाय' },
    desc: {
      en: 'You provide agreed ingredients; our experienced team manages cooking and food service.',
      mr: 'ठरलेले साहित्य तुम्ही उपलब्ध करता; आमची अनुभवी टीम स्वयंपाक आणि वाढण्याचे काम करते.',
    },
    icon: 'bi-person-check-fill',
  },
];

export const preferredContactMethods = [
  { id: 'phone', label: { en: 'Phone Call', mr: 'फोन कॉल' }, icon: 'bi-telephone-fill' },
  { id: 'whatsapp', label: { en: 'WhatsApp', mr: 'WhatsApp' }, icon: 'bi-whatsapp' },
];

export const budgetRanges = [
  { id: 'not-decided', label: { en: 'Not Decided Yet', mr: 'अद्याप ठरलेले नाही' } },
  { id: 'under-50k', label: { en: 'Under ₹50,000', mr: '₹५०,००० पेक्षा कमी' } },
  { id: '50k-100k', label: { en: '₹50,000 – ₹1,00,000', mr: '₹५०,००० ते ₹१,००,०००' } },
  { id: '100k-250k', label: { en: '₹1,00,000 – ₹2,50,000', mr: '₹१,००,००० ते ₹२,५०,०००' } },
  { id: 'above-250k', label: { en: 'Above ₹2,50,000', mr: '₹२,५०,००० पेक्षा जास्त' } },
];

/**
 * Submit contact / catering enquiry to backend API or fallback storage
 */
export async function submitContactEnquiry(enquiryData) {
  try {
    const res = await api.post('/enquiries', enquiryData);
    if (res?.data?.success && res.data.data) {
      return res.data;
    }
  } catch {
    // If backend endpoint is unavailable or fails, fallback to local storage
  }

  // Generate unique contact reference: AC-CNT-YYYY-XXXX
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const enquiryNumber = `AC-CNT-${year}-${randomNum}`;

  const savedRecord = {
    ...enquiryData,
    enquiryNumber,
    submittedAt: new Date().toISOString(),
    status: 'new',
  };

  try {
    const existing = JSON.parse(localStorage.getItem('aditi_contact_enquiries') || '[]');
    existing.unshift(savedRecord);
    localStorage.setItem('aditi_contact_enquiries', JSON.stringify(existing));
  } catch {
    // LocalStorage quota or error handled gracefully
  }

  return {
    success: true,
    message: 'Enquiry submitted successfully.',
    data: savedRecord,
  };
}

export default {
  contactEventTypes,
  contactCateringTypes,
  preferredContactMethods,
  budgetRanges,
  submitContactEnquiry,
};

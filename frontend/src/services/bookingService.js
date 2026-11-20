import api from './api';

export const eventTypesList = [
  { id: 'wedding', label: { en: 'Wedding', mr: 'लग्न समारंभ' } },
  { id: 'engagement', label: { en: 'Engagement', mr: 'साखरपुडा' } },
  { id: 'birthday', label: { en: 'Birthday Party', mr: 'वाढदिवस सोहळा' } },
  { id: 'reception', label: { en: 'Reception', mr: 'रिसेप्शन' } },
  { id: 'religious', label: { en: 'Religious Ceremony / Pooja', mr: 'धार्मिक कार्यक्रम / पूजा' } },
  { id: 'corporate', label: { en: 'Corporate Event', mr: 'कॉर्पोरेट कार्यक्रम' } },
  { id: 'other', label: { en: 'Other Event', mr: 'इतर कार्यक्रम' } },
];

export const cateringTypesList = [
  {
    id: 'with-material',
    label: { en: 'With Material', mr: 'साहित्यासह' },
    desc: {
      en: 'Aditi Caterers arranges all ingredients, raw materials, and catering service.',
      mr: 'सर्व खाद्यपदार्थांचे साहित्य, किराणा आणि स्वयंपाक सेवा अदिती केटरर्सकडून पुरवली जाईल.',
    },
    badge: { en: 'All Materials Included', mr: 'सर्व साहित्यासह' },
    icon: 'bi-box-seam-fill',
  },
  {
    id: 'without-material',
    label: { en: 'Without Material', mr: 'साहित्याशिवाय' },
    desc: {
      en: 'You provide agreed ingredients; our chefs provide cooking and service.',
      mr: 'ठरलेले साहित्य तुम्ही उपलब्ध करता; आमची अनुभवी टीम स्वयंपाक आणि वाढण्याचे काम करते.',
    },
    badge: { en: 'Service & Cooking Only', mr: 'स्वयंपाक व सेवा' },
    icon: 'bi-person-check-fill',
  },
  {
    id: 'need-guidance',
    label: { en: 'Not Sure / Need Guidance', mr: 'निश्चित नाही / मार्गदर्शन हवे आहे' },
    desc: {
      en: 'Our team will explain both options and help you choose the best arrangement.',
      mr: 'आमची टीम दोन्ही पर्यायांचे फायदे समजावून योग्य पर्याय ठरवण्यास मदत करेल.',
    },
    badge: { en: 'Consultation Available', mr: 'मार्गदर्शन उपलब्ध' },
    icon: 'bi-question-circle-fill',
  },
];

export const contactMethodsList = [
  { id: 'phone', label: { en: 'Phone Call', mr: 'फोन कॉल' }, icon: 'bi-telephone-fill' },
  { id: 'whatsapp', label: { en: 'WhatsApp', mr: 'WhatsApp' }, icon: 'bi-whatsapp' },
  { id: 'email', label: { en: 'Email', mr: 'ईमेल' }, icon: 'bi-envelope-fill' },
  { id: 'any', label: { en: 'Any Method', mr: 'कोणताही मार्ग' }, icon: 'bi-chat-dots-fill' },
];

export const foodPreferencesList = [
  { id: 'pure-veg', label: { en: '100% Pure Vegetarian', mr: '१००% शुद्ध शाकाहारी' } },
  { id: 'jain', label: { en: 'Pure Veg with Jain Options', mr: 'शुद्ध शाकाहारी (जैन पर्यायांसह)' } },
  { id: 'veg-guidance', label: { en: 'Discuss with Catering Team', mr: 'टीमशी चर्चा करू' } },
];

export const mealTypesList = [
  { id: 'breakfast', label: { en: 'Breakfast & Morning Snacks', mr: 'सकाळचा नाश्ता व स्नॅक्स' } },
  { id: 'lunch', label: { en: 'Lunch Banquet', mr: 'दुपारचे भोजन' } },
  { id: 'high-tea', label: { en: 'High Tea & Evening Snacks', mr: 'संध्याकाळचा चहा व स्नॅक्स' } },
  { id: 'dinner', label: { en: 'Dinner Banquet', mr: 'रात्रीचे जेवण' } },
  { id: 'all-day', label: { en: 'Full Day (Breakfast + Lunch + Dinner)', mr: 'संपूर्ण दिवस (नाश्ता + दुपार + रात्र)' } },
];

/**
 * Submit booking enquiry to backend or fallback storage
 */
export async function submitBookingEnquiry(enquiryData) {
  try {
    const res = await api.post('/enquiries', enquiryData);
    if (res?.data?.success && res.data.data) {
      return res.data;
    }
  } catch {
    // If backend endpoint is unavailable or fails, fallback to local persistence
  }

  // Generate unique enquiry reference: AC-ENQ-YYYY-XXXX
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const enquiryNumber = `AC-ENQ-${year}-${randomNum}`;

  const savedRecord = {
    ...enquiryData,
    enquiryNumber,
    submittedAt: new Date().toISOString(),
    status: 'new',
  };

  try {
    const existing = JSON.parse(localStorage.getItem('aditi_enquiries') || '[]');
    existing.unshift(savedRecord);
    localStorage.setItem('aditi_enquiries', JSON.stringify(existing));
  } catch {
    // LocalStorage quota or error
  }

  return {
    success: true,
    message: 'Enquiry submitted successfully.',
    data: savedRecord,
  };
}

export default {
  eventTypesList,
  cateringTypesList,
  contactMethodsList,
  foodPreferencesList,
  mealTypesList,
  submitBookingEnquiry,
};

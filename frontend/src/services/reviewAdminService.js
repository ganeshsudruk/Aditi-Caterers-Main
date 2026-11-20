import api from './api';

const STORAGE_KEY = 'aditi_admin_reviews';

export const REVIEW_SOURCES = [
  { id: 'whatsapp', en: 'WhatsApp', mr: 'व्हॉट्सॲप' },
  { id: 'written_feedback', en: 'Written Feedback', mr: 'लिखित अभिप्राय' },
  { id: 'google', en: 'Google Reviews', mr: 'गुगल पुनरावलोकने' },
  { id: 'direct_call', en: 'Direct Phone / In-Person', mr: 'थेट फोन / भेट' },
  { id: 'website', en: 'Website Form', mr: 'वेबसाइट फॉर्म' },
  { id: 'other', en: 'Other Channel', mr: 'इतर माध्यम' },
];

export const REVIEW_EVENT_TYPES = [
  { id: 'wedding', en: 'Wedding Ceremony', mr: 'लग्न समारंभ' },
  { id: 'reception', en: 'Wedding Reception', mr: 'स्वागत समारंभ (रिसेप्शन)' },
  { id: 'engagement', en: 'Engagement (Sakharpuda)', mr: 'साखरपुडा' },
  { id: 'birthday', en: 'Birthday Celebration', mr: 'वाढदिवस सोहळा' },
  { id: 'anniversary', en: 'Anniversary Party', mr: 'अॅनिव्हर्सरी पार्टी' },
  { id: 'corporate', en: 'Corporate Event / Gathering', mr: 'कॉर्पोरेट इव्हेंट' },
  { id: 'religious', en: 'Puja / Vastu / Religious Event', mr: 'पूजा / वास्तुशांत / धार्मिक कार्य' },
  { id: 'other', en: 'Other Social Gathering', mr: 'इतर सामाजिक समारंभ' },
];

export const DISPLAY_NAME_PERMISSIONS = [
  { id: 'full_name', en: 'Full Name (e.g. Rahul Deshmukh)', mr: 'पूर्ण नाव (उदा. राहुल देशमुख)' },
  { id: 'first_name_only', en: 'First Name Only (e.g. Rahul D.)', mr: 'फक्त पहिले नाव (उदा. राहुल दे.)' },
  { id: 'anonymous', en: 'Anonymous (Valued Customer)', mr: 'अनामिक (समाधानी ग्राहक)' },
];

export const DEFAULT_REVIEWS = [
  {
    id: 'rev-1',
    customerDisplayName: 'Sunil Patil',
    reviewText: {
      original: 'अदिती केटरर्सने आमच्या मुलीच्या लग्नात दिलेली जेवणाची चव अप्रतिम होती! पुरणपोळी आणि मसाला भात सर्वांना खूप आवडला. वेळेवर आणि अतिशय स्वच्छ मांडणी होती.',
      originalLanguage: 'mr',
      en: 'The catering by Aditi Caterers at our daughter’s wedding was truly exquisite! Everyone praised the Puran Poli and Masale Bhat. Extremely punctual, professional, and hygienic presentation.',
      mr: 'अदिती केटरर्सने आमच्या मुलीच्या लग्नात दिलेली जेवणाची चव अप्रतिम होती! पुरणपोळी आणि मसाला भात सर्वांना खूप आवडला. वेळेवर आणि अतिशय स्वच्छ मांडणी होती.',
    },
    rating: 5,
    eventType: 'wedding',
    eventDate: '2024-01-18',
    reviewDate: '2024-01-20',
    source: 'whatsapp',
    sourceReference: 'WhatsApp message received after Satara reception',
    consent: {
      granted: true,
      grantedAt: '2024-01-21T09:00:00.000Z',
      displayNamePermission: 'full_name',
      evidenceReference: 'Confirmed via WhatsApp chat permission',
    },
    isFeatured: true,
    displayOrder: 1,
    status: 'published',
    internalNotes: 'VIP wedding banquet in Pune. Customer highly satisfied.',
    approvedAt: '2024-01-22T10:00:00.000Z',
    publishedAt: '2024-01-22T10:00:00.000Z',
    createdAt: '2024-01-21T08:30:00.000Z',
    updatedAt: '2024-01-22T10:00:00.000Z',
  },
  {
    id: 'rev-2',
    customerDisplayName: 'Priya Kulkarni',
    reviewText: {
      original: 'आमच्या साखरपुड्यासाठी २५० लोकांचे जेवण होते. स्टार्टर्सपासून ते डेझर्टपर्यंत सर्वच पदार्थ अप्रतिम होते. वाढपी लोकांची नम्रता विशेष कौतुकास्पद होती.',
      originalLanguage: 'mr',
      en: 'We had 250 guests for our engagement ceremony. From the starters to desserts, every item was delightful. The polite service staff deserves special appreciation.',
      mr: 'आमच्या साखरपुड्यासाठी २५० लोकांचे जेवण होते. स्टार्टर्सपासून ते डेझर्टपर्यंत सर्वच पदार्थ अप्रतिम होते. वाढपी लोकांची नम्रता विशेष कौतुकास्पद होती.',
    },
    rating: 5,
    eventType: 'engagement',
    eventDate: '2023-11-25',
    reviewDate: '2023-11-26',
    source: 'written_feedback',
    sourceReference: 'Written feedback form collected at venue',
    consent: {
      granted: true,
      grantedAt: '2023-11-26T14:00:00.000Z',
      displayNamePermission: 'full_name',
      evidenceReference: 'Signed guest feedback slip #1042',
    },
    isFeatured: true,
    displayOrder: 2,
    status: 'published',
    internalNotes: 'Engagement event at Kothrud banquet hall.',
    approvedAt: '2023-11-27T11:00:00.000Z',
    publishedAt: '2023-11-27T11:00:00.000Z',
    createdAt: '2023-11-26T12:00:00.000Z',
    updatedAt: '2023-11-27T11:00:00.000Z',
  },
  {
    id: 'rev-3',
    customerDisplayName: 'Ramesh Jadhav',
    reviewText: {
      original: 'घरगुती वास्तुशांतीसाठी केटरिंग मागवले होते. उत्तम नियोजन, गरम आणि चवदार भोजन. सर्वांनी जेवणाची खूप तारीफ केली. धन्यवाद अदिती केटरर्स!',
      originalLanguage: 'mr',
      en: 'We booked Aditi Caterers for our home Vastu Shanti puja. Impeccable planning, steaming hot and flavorful meals. All our relatives praised the food. Thank you!',
      mr: 'घरगुती वास्तुशांतीसाठी केटरिंग मागवले होते. उत्तम नियोजन, गरम आणि चवदार भोजन. सर्वांनी जेवणाची खूप तारीफ केली. धन्यवाद अदिती केटरर्स!',
    },
    rating: 5,
    eventType: 'religious',
    eventDate: '2023-10-12',
    reviewDate: '2023-10-13',
    source: 'google',
    sourceReference: 'Public Google review',
    consent: {
      granted: true,
      grantedAt: '2023-10-14T08:00:00.000Z',
      displayNamePermission: 'first_name_only',
      evidenceReference: 'Verified customer review from phone booking #BK-789',
    },
    isFeatured: false,
    displayOrder: 3,
    status: 'published',
    internalNotes: 'Small family gathering in Baner, 80 guests.',
    approvedAt: '2023-10-14T10:00:00.000Z',
    publishedAt: '2023-10-14T10:00:00.000Z',
    createdAt: '2023-10-13T15:00:00.000Z',
    updatedAt: '2023-10-14T10:00:00.000Z',
  },
  {
    id: 'rev-4',
    customerDisplayName: 'Amit Deshpande',
    reviewText: {
      original: 'Good food quality overall. Gulab Jamuns were great, but buffet line could have been managed a little faster during peak dinner time.',
      originalLanguage: 'en',
      en: 'Good food quality overall. Gulab Jamuns were great, but buffet line could have been managed a little faster during peak dinner time.',
      mr: 'एकंदरीत जेवणाची गुणवत्ता चांगली होती. गुलाबजाम खूप आवडले, गर्दीच्या वेळी बुफे काऊंटरचे नियोजन आणखी थोडे गतिमान करता आले असते.',
    },
    rating: 4,
    eventType: 'birthday',
    eventDate: '2024-02-10',
    reviewDate: '2024-02-11',
    source: 'direct_call',
    sourceReference: 'Follow-up feedback call',
    consent: {
      granted: false,
      grantedAt: null,
      displayNamePermission: 'first_name_only',
      evidenceReference: 'Pending confirmation from customer before public release',
    },
    isFeatured: false,
    displayOrder: 4,
    status: 'pending',
    internalNotes: 'Internal review for operations improvement. Customer consent pending.',
    approvedAt: null,
    publishedAt: null,
    createdAt: '2024-02-11T16:00:00.000Z',
    updatedAt: '2024-02-11T16:00:00.000Z',
  },
];

export function getAllReviewsFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_REVIEWS));
    return DEFAULT_REVIEWS;
  } catch {
    return DEFAULT_REVIEWS;
  }
}

export function saveReviewsToStorage(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Error saving reviews to storage:', err);
  }
}

/**
 * Fetch reviews for admin with search, filters, sorting, and pagination.
 */
export async function fetchAdminReviews(params = {}) {
  const {
    search = '',
    statusFilter = 'all',
    ratingFilter = 'all',
    eventTypeFilter = 'all',
    sourceFilter = 'all',
    featuredFilter = 'all',
    sortBy = 'newest',
    page = 1,
    limit = 10,
  } = params;

  try {
    const res = await api.get('/admin/reviews', { params });
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Storage fallback
  }

  let records = [...getAllReviewsFromStorage()];

  if (statusFilter !== 'all') records = records.filter((r) => r.status === statusFilter);
  if (eventTypeFilter !== 'all') records = records.filter((r) => r.eventType === eventTypeFilter);
  if (sourceFilter !== 'all') records = records.filter((r) => r.source === sourceFilter);
  if (featuredFilter === 'featured') records = records.filter((r) => r.isFeatured);
  else if (featuredFilter === 'not_featured') records = records.filter((r) => !r.isFeatured);

  if (ratingFilter !== 'all') {
    if (ratingFilter === 'unrated') {
      records = records.filter((r) => r.rating === null || r.rating === undefined);
    } else {
      records = records.filter((r) => r.rating === parseInt(ratingFilter, 10));
    }
  }

  const q = (search || '').trim().toLowerCase();
  if (q) {
    records = records.filter((r) => {
      const name = (r.customerDisplayName || '').toLowerCase();
      const orig = (r.reviewText?.original || '').toLowerCase();
      const en = (r.reviewText?.en || '').toLowerCase();
      const mr = (r.reviewText?.mr || '').toLowerCase();
      const evt = (r.eventType || '').toLowerCase();
      const src = (r.source || '').toLowerCase();
      return name.includes(q) || orig.includes(q) || en.includes(q) || mr.includes(q) || evt.includes(q) || src.includes(q);
    });
  }

  records.sort((a, b) => {
    if (sortBy === 'oldest') return new Date(a.reviewDate || 0) - new Date(b.reviewDate || 0);
    if (sortBy === 'rating_desc') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'rating_asc') return (a.rating || 0) - (b.rating || 0);
    if (sortBy === 'order_asc') return (a.displayOrder || 0) - (b.displayOrder || 0);
    if (sortBy === 'updated_desc') return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
    // default: newest
    return new Date(b.reviewDate || 0) - new Date(a.reviewDate || 0);
  });

  const allItems = getAllReviewsFromStorage();
  const counts = {
    total: allItems.length,
    pending: allItems.filter((r) => r.status === 'pending').length,
    approved: allItems.filter((r) => r.status === 'approved').length,
    published: allItems.filter((r) => r.status === 'published').length,
    rejected: allItems.filter((r) => r.status === 'rejected').length,
    unpublished: allItems.filter((r) => r.status === 'unpublished').length,
    archived: allItems.filter((r) => r.status === 'archived').length,
  };

  const total = records.length;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;
  const totalPages = Math.ceil(total / limitNum) || 1;
  const paginatedItems = records.slice((pageNum - 1) * limitNum, pageNum * limitNum);

  return {
    items: paginatedItems,
    pagination: { total, page: pageNum, limit: limitNum, totalPages },
    counts,
  };
}

export async function fetchReviewById(id) {
  try {
    const res = await api.get(`/admin/reviews/${id}`);
    if (res?.data?.success && res.data.data) return res.data.data;
  } catch {
    // fallback
  }
  const all = getAllReviewsFromStorage();
  const item = all.find((r) => r.id === id);
  if (!item) throw new Error(`Review ${id} not found.`);
  return item;
}

export async function createReview(data) {
  const all = getAllReviewsFromStorage();
  const highest = all.reduce((m, r) => Math.max(m, r.displayOrder || 0), 0);
  const now = new Date().toISOString();
  const newId = `rev-${Date.now()}`;

  const newReview = {
    id: newId,
    customerDisplayName: (data.customerDisplayName || '').trim(),
    reviewText: {
      original: (data.reviewText?.original || '').trim(),
      originalLanguage: data.reviewText?.originalLanguage || 'mr',
      en: (data.reviewText?.en || '').trim(),
      mr: (data.reviewText?.mr || '').trim(),
    },
    rating: data.rating ? parseInt(data.rating, 10) : null,
    eventType: (data.eventType || '').trim(),
    eventDate: data.eventDate || null,
    reviewDate: data.reviewDate || now.split('T')[0],
    source: data.source || 'whatsapp',
    sourceReference: (data.sourceReference || '').trim(),
    consent: {
      granted: Boolean(data.consent?.granted),
      grantedAt: data.consent?.granted ? (data.consent?.grantedAt || now) : null,
      displayNamePermission: data.consent?.displayNamePermission || 'full_name',
      evidenceReference: (data.consent?.evidenceReference || '').trim(),
    },
    isFeatured: Boolean(data.isFeatured),
    displayOrder: parseInt(data.displayOrder, 10) || highest + 1,
    status: data.status || 'pending',
    internalNotes: (data.internalNotes || '').trim(),
    approvedAt: data.status === 'approved' || data.status === 'published' ? now : null,
    publishedAt: data.status === 'published' ? now : null,
    createdAt: now,
    updatedAt: now,
  };

  try {
    const res = await api.post('/admin/reviews', newReview);
    if (res?.data?.success && res.data.data) return res.data.data;
  } catch {
    // fallback
  }

  all.unshift(newReview);
  saveReviewsToStorage(all);
  return newReview;
}

export async function updateReview(id, data) {
  const all = getAllReviewsFromStorage();
  const idx = all.findIndex((r) => r.id === id);
  if (idx === -1) throw new Error(`Review ${id} not found.`);

  const prev = all[idx];
  const now = new Date().toISOString();

  const updated = {
    ...prev,
    customerDisplayName: data.customerDisplayName !== undefined ? data.customerDisplayName.trim() : prev.customerDisplayName,
    reviewText: {
      original: data.reviewText?.original !== undefined ? data.reviewText.original.trim() : prev.reviewText.original,
      originalLanguage: data.reviewText?.originalLanguage || prev.reviewText.originalLanguage,
      en: data.reviewText?.en !== undefined ? data.reviewText.en.trim() : prev.reviewText.en,
      mr: data.reviewText?.mr !== undefined ? data.reviewText.mr.trim() : prev.reviewText.mr,
    },
    rating: data.rating !== undefined ? (data.rating ? parseInt(data.rating, 10) : null) : prev.rating,
    eventType: data.eventType !== undefined ? data.eventType.trim() : prev.eventType,
    eventDate: data.eventDate !== undefined ? data.eventDate : prev.eventDate,
    reviewDate: data.reviewDate !== undefined ? data.reviewDate : prev.reviewDate,
    source: data.source || prev.source,
    sourceReference: data.sourceReference !== undefined ? data.sourceReference.trim() : prev.sourceReference,
    consent: {
      ...prev.consent,
      ...(data.consent || {}),
      granted: data.consent?.granted !== undefined ? Boolean(data.consent.granted) : prev.consent?.granted,
      evidenceReference: data.consent?.evidenceReference !== undefined ? data.consent.evidenceReference.trim() : (prev.consent?.evidenceReference || ''),
    },
    isFeatured: data.isFeatured !== undefined ? Boolean(data.isFeatured) : prev.isFeatured,
    displayOrder: data.displayOrder !== undefined ? (parseInt(data.displayOrder, 10) || prev.displayOrder) : prev.displayOrder,
    internalNotes: data.internalNotes !== undefined ? data.internalNotes.trim() : prev.internalNotes,
    status: data.status || prev.status,
    updatedAt: now,
  };

  if (data.status === 'published' && !updated.publishedAt) updated.publishedAt = now;
  if (data.status === 'approved' && !updated.approvedAt) updated.approvedAt = now;

  try {
    await api.put(`/admin/reviews/${id}`, updated);
  } catch {
    // fallback
  }

  all[idx] = updated;
  saveReviewsToStorage(all);
  return updated;
}

export async function approveReview(id) {
  const all = getAllReviewsFromStorage();
  const idx = all.findIndex((r) => r.id === id);
  if (idx === -1) throw new Error(`Review ${id} not found.`);

  const now = new Date().toISOString();
  all[idx].status = 'approved';
  all[idx].approvedAt = now;
  all[idx].updatedAt = now;

  try {
    await api.patch(`/admin/reviews/${id}/approve`);
  } catch {
    // fallback
  }

  saveReviewsToStorage(all);
  return all[idx];
}

export async function rejectReview(id) {
  const all = getAllReviewsFromStorage();
  const idx = all.findIndex((r) => r.id === id);
  if (idx === -1) throw new Error(`Review ${id} not found.`);

  const now = new Date().toISOString();
  all[idx].status = 'rejected';
  all[idx].updatedAt = now;

  try {
    await api.patch(`/admin/reviews/${id}/reject`);
  } catch {
    // fallback
  }

  saveReviewsToStorage(all);
  return all[idx];
}

export async function updateReviewStatus(id, newStatus) {
  const all = getAllReviewsFromStorage();
  const idx = all.findIndex((r) => r.id === id);
  if (idx === -1) throw new Error(`Review ${id} not found.`);

  // Validation: cannot publish if consent is not granted
  if (newStatus === 'published' && !all[idx].consent?.granted) {
    throw new Error('Cannot publish review without confirmed customer consent.');
  }

  const now = new Date().toISOString();
  all[idx].status = newStatus;
  all[idx].updatedAt = now;
  if (newStatus === 'published' && !all[idx].publishedAt) all[idx].publishedAt = now;
  if (newStatus === 'approved' && !all[idx].approvedAt) all[idx].approvedAt = now;

  try {
    await api.patch(`/admin/reviews/${id}/status`, { status: newStatus });
  } catch {
    // fallback
  }

  saveReviewsToStorage(all);
  return all[idx];
}

export async function deleteReview(id) {
  const all = getAllReviewsFromStorage();
  const filtered = all.filter((r) => r.id !== id);

  try {
    await api.delete(`/admin/reviews/${id}`);
  } catch {
    // fallback
  }

  saveReviewsToStorage(filtered);
  return true;
}

export default {
  REVIEW_SOURCES,
  REVIEW_EVENT_TYPES,
  DISPLAY_NAME_PERMISSIONS,
  DEFAULT_REVIEWS,
  getAllReviewsFromStorage,
  saveReviewsToStorage,
  fetchAdminReviews,
  fetchReviewById,
  createReview,
  updateReview,
  approveReview,
  rejectReview,
  updateReviewStatus,
  deleteReview,
};

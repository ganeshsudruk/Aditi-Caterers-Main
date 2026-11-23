import api from './api';

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

function mapBackendReview(item) {
  if (!item) return item;
  return {
    ...item,
    id: item._id || item.id,
  };
}

/**
 * Fetch reviews for admin directly from backend
 */
export async function fetchAdminReviews(params = {}) {
  const res = await api.get('/admin/reviews', { params });
  if (res?.data?.success && res.data.data) {
    const data = res.data.data;
    return {
      ...data,
      items: (data.items || []).map(mapBackendReview),
    };
  }
  return { items: [], pagination: { total: 0, page: 1, limit: 10, totalPages: 1 }, counts: {} };
}

export async function fetchReviewById(id) {
  const res = await api.get(`/admin/reviews/${id}`);
  if (res?.data?.success && res.data.data) {
    return mapBackendReview(res.data.data);
  }
  throw new Error(`Review ${id} not found.`);
}

export async function createReview(data) {
  const payload = {
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
    reviewDate: data.reviewDate || new Date().toISOString().split('T')[0],
    source: data.source || 'whatsapp',
    sourceReference: (data.sourceReference || '').trim(),
    consent: {
      granted: Boolean(data.consent?.granted),
      grantedAt: data.consent?.granted ? (data.consent?.grantedAt || new Date().toISOString()) : null,
      displayNamePermission: data.consent?.displayNamePermission || 'full_name',
      evidenceReference: (data.consent?.evidenceReference || '').trim(),
    },
    isFeatured: Boolean(data.isFeatured),
    displayOrder: parseInt(data.displayOrder, 10) || 1,
    status: data.status || 'pending',
    internalNotes: (data.internalNotes || '').trim(),
  };

  const res = await api.post('/admin/reviews', payload);
  if (res?.data?.success && res.data.data) {
    return mapBackendReview(res.data.data);
  }
  throw new Error(res?.data?.message || 'Failed to create review in database');
}

export async function updateReview(id, data) {
  const res = await api.put(`/admin/reviews/${id}`, data);
  if (res?.data?.success && res.data.data) {
    return mapBackendReview(res.data.data);
  }
  throw new Error(res?.data?.message || `Failed to update review ${id}`);
}

export async function approveReview(id) {
  const res = await api.patch(`/admin/reviews/${id}/approve`);
  if (res?.data?.success && res.data.data) {
    return mapBackendReview(res.data.data);
  }
  throw new Error(res?.data?.message || `Failed to approve review ${id}`);
}

export async function rejectReview(id, reason = '') {
  const res = await api.patch(`/admin/reviews/${id}/reject`, { reason });
  if (res?.data?.success && res.data.data) {
    return mapBackendReview(res.data.data);
  }
  throw new Error(res?.data?.message || `Failed to reject review ${id}`);
}

export async function updateReviewStatus(id, newStatus) {
  const res = await api.patch(`/admin/reviews/${id}/status`, { status: newStatus });
  if (res?.data?.success && res.data.data) {
    return mapBackendReview(res.data.data);
  }
  throw new Error(res?.data?.message || `Failed to update status`);
}

export async function toggleReviewFeatured(id, isFeatured) {
  const res = await api.patch(`/admin/reviews/${id}/featured`, { isFeatured });
  if (res?.data?.success && res.data.data) {
    return mapBackendReview(res.data.data);
  }
  throw new Error(res?.data?.message || `Failed to toggle featured status`);
}

export async function updateReviewDisplayOrder(id, displayOrder) {
  const res = await api.patch(`/admin/reviews/${id}/order`, { displayOrder });
  if (res?.data?.success && res.data.data) {
    return mapBackendReview(res.data.data);
  }
  throw new Error(res?.data?.message || `Failed to update display order`);
}

export async function restoreReview(id) {
  const res = await api.post(`/admin/reviews/${id}/restore`);
  if (res?.data?.success && res.data.data) {
    return mapBackendReview(res.data.data);
  }
  throw new Error(res?.data?.message || `Failed to restore review`);
}

export async function deleteReview(id) {
  const res = await api.delete(`/admin/reviews/${id}`);
  if (res?.data?.success) {
    return true;
  }
  throw new Error(res?.data?.message || `Failed to delete review`);
}

export default {
  REVIEW_SOURCES,
  REVIEW_EVENT_TYPES,
  DISPLAY_NAME_PERMISSIONS,
  fetchAdminReviews,
  fetchReviewById,
  createReview,
  updateReview,
  approveReview,
  rejectReview,
  updateReviewStatus,
  toggleReviewFeatured,
  updateReviewDisplayOrder,
  restoreReview,
  deleteReview,
};

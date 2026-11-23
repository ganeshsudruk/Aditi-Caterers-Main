import api from './api';

export const AWARD_CATEGORIES = [
  { id: 'catering_excellence', en: 'Catering Excellence', mr: 'केटरिंग उत्कृष्टता' },
  { id: 'customer_appreciation', en: 'Customer Appreciation', mr: 'ग्राहक प्रशंसा' },
  { id: 'event_services', en: 'Event Services', mr: 'कार्यक्रम सेवा' },
  { id: 'other_recognition', en: 'Other Recognition', mr: 'इतर मान्यता' },
];

function mapBackendAward(item) {
  if (!item) return item;
  return {
    ...item,
    id: item._id || item.id,
  };
}

/**
 * Fetch awards for admin directly from backend
 */
export async function fetchAdminAwards(params = {}) {
  const res = await api.get('/admin/awards', { params });
  if (res?.data?.success && res.data.data) {
    const data = res.data.data;
    return {
      ...data,
      items: (data.items || []).map(mapBackendAward),
    };
  }
  return { items: [], pagination: { total: 0, page: 1, limit: 10, totalPages: 1 }, counts: {} };
}

export async function fetchAwardById(id) {
  const res = await api.get(`/admin/awards/${id}`);
  if (res?.data?.success && res.data.data) {
    return mapBackendAward(res.data.data);
  }
  throw new Error(`Award ${id} not found.`);
}

export async function createAward(data) {
  const payload = {
    title: { en: (data.title?.en || '').trim(), mr: (data.title?.mr || '').trim() },
    description: { en: (data.description?.en || '').trim(), mr: (data.description?.mr || '').trim() },
    image: { url: (data.image?.url || '').trim(), publicId: '' },
    issuingOrganization: (data.issuingOrganization || '').trim(),
    awardDate: data.awardDate || null,
    awardYear: data.awardYear ? parseInt(data.awardYear, 10) : null,
    category: data.category || 'other_recognition',
    recipient: (data.recipient || '').trim(),
    displayOrder: parseInt(data.displayOrder, 10) || 1,
    isFeatured: !!data.isFeatured,
    status: data.status || 'draft',
  };

  const res = await api.post('/admin/awards', payload);
  if (res?.data?.success && res.data.data) {
    return mapBackendAward(res.data.data);
  }
  throw new Error(res?.data?.message || 'Failed to create award in database');
}

export async function updateAward(id, data) {
  const res = await api.put(`/admin/awards/${id}`, data);
  if (res?.data?.success && res.data.data) {
    return mapBackendAward(res.data.data);
  }
  throw new Error(res?.data?.message || `Failed to update award ${id}`);
}

export async function updateAwardStatus(id, newStatus) {
  const res = await api.patch(`/admin/awards/${id}/status`, { status: newStatus });
  if (res?.data?.success && res.data.data) {
    return mapBackendAward(res.data.data);
  }
  throw new Error(res?.data?.message || `Failed to update status`);
}

export async function deleteAward(id) {
  const res = await api.delete(`/admin/awards/${id}`);
  if (res?.data?.success) {
    return true;
  }
  throw new Error(res?.data?.message || `Failed to delete award`);
}

export async function reorderAward(id, direction) {
  const res = await api.patch('/admin/awards/reorder', { id, direction });
  if (res?.data?.success && res.data.data) {
    return (res.data.data || []).map(mapBackendAward);
  }
  const listRes = await fetchAdminAwards({ limit: 100 });
  return listRes.items;
}

export default {
  AWARD_CATEGORIES,
  fetchAdminAwards,
  fetchAwardById,
  createAward,
  updateAward,
  updateAwardStatus,
  deleteAward,
  reorderAward,
};

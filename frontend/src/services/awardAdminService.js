import api from './api';

const STORAGE_KEY = 'aditi_admin_awards';

export const AWARD_CATEGORIES = [
  { id: 'catering_excellence', en: 'Catering Excellence', mr: 'केटरिंग उत्कृष्टता' },
  { id: 'customer_appreciation', en: 'Customer Appreciation', mr: 'ग्राहक प्रशंसा' },
  { id: 'event_services', en: 'Event Services', mr: 'कार्यक्रम सेवा' },
  { id: 'other_recognition', en: 'Other Recognition', mr: 'इतर मान्यता' },
];

export const DEFAULT_AWARDS = [
  {
    id: 'award-1',
    title: {
      en: 'Best Traditional Maharashtrian Caterer',
      mr: 'सर्वोत्कृष्ट पारंपारिक महाराष्ट्रीयन केटरर',
    },
    description: {
      en: 'Awarded for exceptional authenticity, hygiene standards, and master-level preparation of traditional Maharashtrian delicacies.',
      mr: 'अस्सल चव, स्वच्छता आणि पारंपारिक महाराष्ट्रीयन पक्वान्नांच्या उत्कृष्ट सादरीकरणासाठी सन्मानित.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    issuingOrganization: 'Maharashtra Food & Hospitality Association',
    awardDate: '2023-11-15',
    awardYear: 2023,
    category: 'catering_excellence',
    recipient: 'Aditi Caterers',
    displayOrder: 1,
    isFeatured: true,
    status: 'published',
    createdAt: '2023-11-15T10:00:00.000Z',
    updatedAt: '2023-11-15T10:00:00.000Z',
  },
  {
    id: 'award-2',
    title: {
      en: 'Excellence in Wedding Catering & Hospitality',
      mr: 'लग्न सोहळा केटरिंग आणि आदरातिथ्य उत्कृष्टता',
    },
    description: {
      en: 'Recognized for seamless banquet operations, premium buffet presentation, and flawless event execution serving over 2,000 guests.',
      mr: '२,००० हून अधिक पाहुण्यांच्या उपस्थितीत भव्य लग्न सोहळ्यात उत्कृष्ट बुफे मांडणी व नियोजनबद्ध सेवेसाठी गौरव.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    issuingOrganization: 'Pune Event Management Guild',
    awardDate: '2022-12-10',
    awardYear: 2022,
    category: 'event_services',
    recipient: 'Aditi Caterers',
    displayOrder: 2,
    isFeatured: true,
    status: 'published',
    createdAt: '2022-12-10T10:00:00.000Z',
    updatedAt: '2022-12-10T10:00:00.000Z',
  },
  {
    id: 'award-3',
    title: {
      en: 'Customer Choice & Satisfaction Award',
      mr: 'ग्राहक पसंती आणि समाधान पुरस्कार',
    },
    description: {
      en: 'Conferred based on verified 5-star client reviews, punctuality, and consistent culinary delight across social celebrations.',
      mr: 'ग्राहकांचे सकारात्मक अभिप्राय, वक्तशीरपणा आणि सातत्यपूर्ण चवदार भोजनासाठी सन्मान.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      publicId: '',
    },
    issuingOrganization: 'Western India Catering Federation',
    awardDate: '2021-10-05',
    awardYear: 2021,
    category: 'customer_appreciation',
    recipient: 'Aditi Caterers',
    displayOrder: 3,
    isFeatured: false,
    status: 'published',
    createdAt: '2021-10-05T10:00:00.000Z',
    updatedAt: '2021-10-05T10:00:00.000Z',
  },
];

export function getAllAwardsFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    // Seed default awards if empty
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_AWARDS));
    return DEFAULT_AWARDS;
  } catch {
    return DEFAULT_AWARDS;
  }
}

export function saveAwardsToStorage(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Error saving awards to storage:', err);
  }
}

/**
 * Fetch awards for admin with search, filters, sorting, and pagination.
 */
export async function fetchAdminAwards(params = {}) {
  const {
    search = '',
    statusFilter = 'all',
    categoryFilter = 'all',
    featuredFilter = 'all',
    sortBy = 'order_asc',
    page = 1,
    limit = 10,
  } = params;

  try {
    const res = await api.get('/admin/awards', { params });
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Storage fallback
  }

  let records = [...getAllAwardsFromStorage()];

  if (statusFilter !== 'all') records = records.filter((a) => a.status === statusFilter);
  if (categoryFilter !== 'all') records = records.filter((a) => a.category === categoryFilter);
  if (featuredFilter === 'featured') records = records.filter((a) => a.isFeatured);
  else if (featuredFilter === 'not_featured') records = records.filter((a) => !a.isFeatured);

  const q = (search || '').trim().toLowerCase();
  if (q) {
    records = records.filter((a) => {
      const titleEn = (a.title?.en || '').toLowerCase();
      const titleMr = (a.title?.mr || '').toLowerCase();
      const org = (a.issuingOrganization || '').toLowerCase();
      const desc = (a.description?.en || '').toLowerCase();
      return titleEn.includes(q) || titleMr.includes(q) || org.includes(q) || desc.includes(q);
    });
  }

  records.sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    if (sortBy === 'oldest') return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    if (sortBy === 'updated_desc') return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
    if (sortBy === 'year_desc') return (b.awardYear || 0) - (a.awardYear || 0);
    return (a.displayOrder || 0) - (b.displayOrder || 0);
  });

  const allItems = getAllAwardsFromStorage();
  const counts = {
    total: allItems.length,
    published: allItems.filter((a) => a.status === 'published').length,
    draft: allItems.filter((a) => a.status === 'draft').length,
    unpublished: allItems.filter((a) => a.status === 'unpublished').length,
    archived: allItems.filter((a) => a.status === 'archived').length,
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

export async function fetchAwardById(id) {
  try {
    const res = await api.get(`/admin/awards/${id}`);
    if (res?.data?.success && res.data.data) return res.data.data;
  } catch {
    // fallback
  }
  const all = getAllAwardsFromStorage();
  const item = all.find((a) => a.id === id);
  if (!item) throw new Error(`Award ${id} not found.`);
  return item;
}

export async function createAward(data) {
  const all = getAllAwardsFromStorage();
  const highest = all.reduce((m, a) => Math.max(m, a.displayOrder || 0), 0);
  const now = new Date().toISOString();
  const newId = `award-${Date.now()}`;

  const newAward = {
    id: newId,
    title: { en: (data.title?.en || '').trim(), mr: (data.title?.mr || '').trim() },
    description: { en: (data.description?.en || '').trim(), mr: (data.description?.mr || '').trim() },
    image: { url: (data.image?.url || '').trim(), publicId: '' },
    issuingOrganization: (data.issuingOrganization || '').trim(),
    awardDate: data.awardDate || null,
    awardYear: data.awardYear ? parseInt(data.awardYear, 10) : null,
    category: data.category || 'other_recognition',
    recipient: (data.recipient || '').trim(),
    displayOrder: parseInt(data.displayOrder, 10) || highest + 1,
    isFeatured: !!data.isFeatured,
    status: data.status || 'draft',
    createdAt: now,
    updatedAt: now,
  };

  try {
    const res = await api.post('/admin/awards', newAward);
    if (res?.data?.success && res.data.data) return res.data.data;
  } catch {
    // fallback
  }

  all.push(newAward);
  saveAwardsToStorage(all);
  return newAward;
}

export async function updateAward(id, data) {
  const all = getAllAwardsFromStorage();
  const idx = all.findIndex((a) => a.id === id);
  if (idx === -1) throw new Error(`Award ${id} not found.`);

  const prev = all[idx];
  const updated = {
    ...prev,
    title: {
      en: (data.title?.en !== undefined ? data.title.en : (prev.title?.en || '')).trim(),
      mr: (data.title?.mr !== undefined ? data.title.mr : (prev.title?.mr || '')).trim(),
    },
    description: {
      en: (data.description?.en !== undefined ? data.description.en : (prev.description?.en || '')).trim(),
      mr: (data.description?.mr !== undefined ? data.description.mr : (prev.description?.mr || '')).trim(),
    },
    image: { ...prev.image, ...(data.image || {}) },
    issuingOrganization: data.issuingOrganization !== undefined ? (data.issuingOrganization || '').trim() : prev.issuingOrganization,
    awardDate: data.awardDate !== undefined ? data.awardDate : prev.awardDate,
    awardYear: data.awardYear !== undefined ? (data.awardYear ? parseInt(data.awardYear, 10) : null) : prev.awardYear,
    category: data.category || prev.category,
    recipient: data.recipient !== undefined ? (data.recipient || '').trim() : prev.recipient,
    displayOrder: data.displayOrder !== undefined ? (parseInt(data.displayOrder, 10) || prev.displayOrder) : prev.displayOrder,
    isFeatured: data.isFeatured !== undefined ? !!data.isFeatured : prev.isFeatured,
    status: data.status || prev.status,
    updatedAt: new Date().toISOString(),
  };

  try {
    await api.put(`/admin/awards/${id}`, updated);
  } catch {
    // fallback
  }

  all[idx] = updated;
  saveAwardsToStorage(all);
  return updated;
}

export async function updateAwardStatus(id, newStatus) {
  const all = getAllAwardsFromStorage();
  const idx = all.findIndex((a) => a.id === id);
  if (idx === -1) throw new Error(`Award ${id} not found.`);

  all[idx].status = newStatus;
  all[idx].updatedAt = new Date().toISOString();

  try {
    await api.patch(`/admin/awards/${id}/status`, { status: newStatus });
  } catch {
    // fallback
  }

  saveAwardsToStorage(all);
  return all[idx];
}

export async function deleteAward(id) {
  const all = getAllAwardsFromStorage();
  const filtered = all.filter((a) => a.id !== id);

  try {
    await api.delete(`/admin/awards/${id}`);
  } catch {
    // fallback
  }

  saveAwardsToStorage(filtered);
  return true;
}

export async function reorderAward(id, direction) {
  const all = getAllAwardsFromStorage();
  all.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  const idx = all.findIndex((a) => a.id === id);
  if (idx === -1) return all;
  const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
  if (targetIdx < 0 || targetIdx >= all.length) return all;

  const curOrder = all[idx].displayOrder || idx + 1;
  const tgtOrder = all[targetIdx].displayOrder || targetIdx + 1;
  all[idx].displayOrder = tgtOrder;
  all[targetIdx].displayOrder = curOrder;

  const now = new Date().toISOString();
  all[idx].updatedAt = now;
  all[targetIdx].updatedAt = now;

  saveAwardsToStorage(all);

  try {
    await api.patch('/admin/awards/reorder', {
      orders: [
        { id: all[idx].id, displayOrder: tgtOrder },
        { id: all[targetIdx].id, displayOrder: curOrder },
      ],
    });
  } catch {
    // fallback
  }

  return all;
}

export default {
  AWARD_CATEGORIES,
  getAllAwardsFromStorage,
  fetchAdminAwards,
  fetchAwardById,
  createAward,
  updateAward,
  updateAwardStatus,
  deleteAward,
  reorderAward,
};

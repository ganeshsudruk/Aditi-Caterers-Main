import api from './api';
import { defaultGalleryItems, defaultGalleryCategories } from './galleryService';

const STORAGE_KEY_GALLERY = 'aditi_admin_gallery';

/**
 * Load gallery items from storage or seed from defaultGalleryItems
 */
export function getAllGalleryItemsFromStorage() {
  try {
    let items = JSON.parse(localStorage.getItem(STORAGE_KEY_GALLERY) || '[]');
    if (!items || items.length === 0) {
      const seeded = defaultGalleryItems.map((item, idx) => ({
        id: item.id || `gal-${idx + 1}`,
        image: {
          url: item.url || item.image?.url || '',
          publicId: '',
        },
        title: {
          en: item.title?.en || item.caption?.en || '',
          mr: item.title?.mr || item.caption?.mr || '',
        },
        altText: {
          en: item.alt?.en || item.altText?.en || item.title?.en || '',
          mr: item.alt?.mr || item.altText?.mr || item.title?.mr || '',
        },
        category: item.category || 'other',
        eventType: item.eventType || item.category || 'other',
        displayOrder: item.sortOrder || idx + 1,
        isFeatured: !!item.isFeatured,
        status: 'published', // draft, published, unpublished, archived
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      items = seeded;
      localStorage.setItem(STORAGE_KEY_GALLERY, JSON.stringify(seeded));
    }
    return items;
  } catch (err) {
    console.error('Error reading gallery items from storage:', err);
    return [];
  }
}

export function saveGalleryItemsToStorage(items) {
  try {
    localStorage.setItem(STORAGE_KEY_GALLERY, JSON.stringify(items));
  } catch (err) {
    console.error('Error saving gallery items to storage:', err);
  }
}

/**
 * Fetch gallery items for admin with search, filters, sorting and pagination
 */
export async function fetchAdminGallery(params = {}) {
  const {
    search = '',
    statusFilter = 'all', // all, published, draft, unpublished, archived
    categoryFilter = 'all',
    featuredFilter = 'all',
    sortBy = 'order_asc', // order_asc, newest, oldest, updated_desc
    page = 1,
    limit = 10,
  } = params;

  try {
    const res = await api.get('/admin/gallery', { params });
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Storage fallback
  }

  const allItems = getAllGalleryItemsFromStorage();
  let records = allItems;

  // 1. Status Filter
  if (statusFilter !== 'all') {
    records = records.filter((item) => item.status === statusFilter);
  }

  // 2. Category Filter
  if (categoryFilter !== 'all') {
    records = records.filter((item) => item.category === categoryFilter);
  }

  // 3. Featured Filter
  if (featuredFilter === 'featured') {
    records = records.filter((item) => item.isFeatured);
  } else if (featuredFilter === 'not_featured') {
    records = records.filter((item) => !item.isFeatured);
  }

  // 4. Search Filter
  const q = (search || '').trim().toLowerCase();
  if (q) {
    records = records.filter((item) => {
      const titleEn = (item.title?.en || '').toLowerCase();
      const titleMr = (item.title?.mr || '').toLowerCase();
      const cat = (item.category || '').toLowerCase();
      const eventT = (item.eventType || '').toLowerCase();
      return titleEn.includes(q) || titleMr.includes(q) || cat.includes(q) || eventT.includes(q);
    });
  }

  // 5. Sorting
  records.sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
    if (sortBy === 'oldest') {
      return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    }
    if (sortBy === 'updated_desc') {
      return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
    }
    // Default: order_asc
    return (a.displayOrder || 0) - (b.displayOrder || 0);
  });

  // 6. Pagination
  const total = records.length;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;
  const totalPages = Math.ceil(total / limitNum) || 1;
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedItems = records.slice(startIndex, startIndex + limitNum);

  const counts = {
    total: allItems.length,
    published: allItems.filter((i) => i.status === 'published').length,
    draft: allItems.filter((i) => i.status === 'draft').length,
    unpublished: allItems.filter((i) => i.status === 'unpublished').length,
    archived: allItems.filter((i) => i.status === 'archived').length,
  };

  return {
    items: paginatedItems,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
    },
    counts,
  };
}

export async function fetchGalleryItemById(id) {
  try {
    const res = await api.get(`/admin/gallery/${id}`);
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Storage fallback
  }

  const all = getAllGalleryItemsFromStorage();
  const item = all.find((i) => i.id === id);
  if (!item) throw new Error(`Gallery item ${id} not found.`);
  return item;
}

export async function createGalleryItem(itemData) {
  const all = getAllGalleryItemsFromStorage();
  const highest = all.reduce((max, i) => Math.max(max, i.displayOrder || 0), 0);
  const now = new Date().toISOString();
  const newId = `gal-${Date.now()}`;

  const newItem = {
    id: newId,
    image: {
      url: (itemData.image?.url || '').trim(),
      publicId: '',
    },
    title: {
      en: (itemData.title?.en || '').trim(),
      mr: (itemData.title?.mr || '').trim(),
    },
    altText: {
      en: (itemData.altText?.en || itemData.title?.en || '').trim(),
      mr: (itemData.altText?.mr || itemData.title?.mr || '').trim(),
    },
    category: itemData.category || 'setup',
    eventType: itemData.eventType || itemData.category || 'setup',
    displayOrder: parseInt(itemData.displayOrder, 10) || highest + 1,
    isFeatured: !!itemData.isFeatured,
    status: itemData.status || 'draft',
    createdAt: now,
    updatedAt: now,
  };

  try {
    const res = await api.post('/admin/gallery', newItem);
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Storage fallback
  }

  all.push(newItem);
  saveGalleryItemsToStorage(all);
  return newItem;
}

export async function updateGalleryItem(id, updatedFields) {
  const all = getAllGalleryItemsFromStorage();
  const index = all.findIndex((i) => i.id === id);
  if (index === -1) throw new Error(`Gallery item ${id} not found.`);

  const now = new Date().toISOString();
  const prev = all[index];

  const updatedRecord = {
    ...prev,
    ...updatedFields,
    image: { ...prev.image, ...(updatedFields.image || {}) },
    title: { ...prev.title, ...(updatedFields.title || {}) },
    altText: { ...prev.altText, ...(updatedFields.altText || {}) },
    category: updatedFields.category || prev.category,
    eventType: updatedFields.eventType || prev.eventType,
    displayOrder: parseInt(updatedFields.displayOrder, 10) || prev.displayOrder,
    isFeatured: updatedFields.isFeatured !== undefined ? !!updatedFields.isFeatured : prev.isFeatured,
    updatedAt: now,
  };

  try {
    await api.put(`/admin/gallery/${id}`, updatedRecord);
  } catch {
    // Storage fallback
  }

  all[index] = updatedRecord;
  saveGalleryItemsToStorage(all);
  return updatedRecord;
}

export async function updateGalleryStatus(id, newStatus) {
  const all = getAllGalleryItemsFromStorage();
  const index = all.findIndex((i) => i.id === id);
  if (index === -1) throw new Error(`Gallery item ${id} not found.`);

  all[index].status = newStatus;
  all[index].updatedAt = new Date().toISOString();

  try {
    await api.patch(`/admin/gallery/${id}/status`, { status: newStatus });
  } catch {
    // Storage fallback
  }

  saveGalleryItemsToStorage(all);
  return all[index];
}

export async function deleteGalleryItem(id) {
  const all = getAllGalleryItemsFromStorage();
  const filtered = all.filter((i) => i.id !== id);

  try {
    await api.delete(`/admin/gallery/${id}`);
  } catch {
    // Storage fallback
  }

  saveGalleryItemsToStorage(filtered);
  return true;
}

export async function reorderGalleryItem(id, direction) {
  const all = getAllGalleryItemsFromStorage();
  all.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  const index = all.findIndex((i) => i.id === id);
  if (index === -1) return all;

  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= all.length) return all;

  const currentOrder = all[index].displayOrder || index + 1;
  const targetOrder = all[targetIndex].displayOrder || targetIndex + 1;

  all[index].displayOrder = targetOrder;
  all[targetIndex].displayOrder = currentOrder;

  const now = new Date().toISOString();
  all[index].updatedAt = now;
  all[targetIndex].updatedAt = now;

  saveGalleryItemsToStorage(all);

  try {
    await api.patch('/admin/gallery/reorder', {
      orders: [
        { id: all[index].id, displayOrder: targetOrder },
        { id: all[targetIndex].id, displayOrder: currentOrder },
      ],
    });
  } catch {
    // Storage fallback
  }

  return all;
}

export default {
  getAllGalleryItemsFromStorage,
  saveGalleryItemsToStorage,
  fetchAdminGallery,
  fetchGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  updateGalleryStatus,
  deleteGalleryItem,
  reorderGalleryItem,
};

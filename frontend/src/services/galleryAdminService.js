import api from './api';

function mapBackendGallery(item) {
  if (!item) return item;
  return {
    ...item,
    id: item._id || item.id,
  };
}

/**
 * Fetch gallery items for admin directly from backend
 */
export async function fetchAdminGallery(params = {}) {
  const res = await api.get('/admin/gallery', { params });
  if (res?.data?.success && res.data.data) {
    const data = res.data.data;
    return {
      ...data,
      items: (data.items || []).map(mapBackendGallery),
    };
  }
  return { items: [], pagination: { total: 0, page: 1, limit: 10, totalPages: 1 }, counts: {} };
}

export async function fetchGalleryItemById(id) {
  const res = await api.get(`/admin/gallery/${id}`);
  if (res?.data?.success && res.data.data) {
    return mapBackendGallery(res.data.data);
  }
  throw new Error(`Gallery item ${id} not found.`);
}

export async function createGalleryItem(itemData) {
  const payload = {
    image: {
      url: (itemData.image?.url || '').trim(),
      publicId: (itemData.image?.publicId || '').trim(),
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
    displayOrder: parseInt(itemData.displayOrder, 10) || 1,
    isFeatured: !!itemData.isFeatured,
    status: itemData.status || 'draft',
  };

  const res = await api.post('/admin/gallery', payload);
  if (res?.data?.success && res.data.data) {
    return mapBackendGallery(res.data.data);
  }
  throw new Error(res?.data?.message || 'Failed to create gallery item in database');
}

export async function updateGalleryItem(id, updatedFields) {
  const res = await api.put(`/admin/gallery/${id}`, updatedFields);
  if (res?.data?.success && res.data.data) {
    return mapBackendGallery(res.data.data);
  }
  throw new Error(res?.data?.message || `Failed to update gallery item ${id}`);
}

export async function updateGalleryStatus(id, newStatus) {
  const res = await api.patch(`/admin/gallery/${id}/status`, { status: newStatus });
  if (res?.data?.success && res.data.data) {
    return mapBackendGallery(res.data.data);
  }
  throw new Error(res?.data?.message || `Failed to update gallery status`);
}

export async function deleteGalleryItem(id) {
  const res = await api.delete(`/admin/gallery/${id}`);
  if (res?.data?.success) {
    return true;
  }
  throw new Error(res?.data?.message || `Failed to delete gallery item ${id}`);
}

export async function reorderGalleryItem(id, direction) {
  const res = await api.patch('/admin/gallery/reorder', { id, direction });
  if (res?.data?.success && res.data.data) {
    return (res.data.data || []).map(mapBackendGallery);
  }
  const listRes = await fetchAdminGallery({ limit: 100 });
  return listRes.items;
}

export default {
  fetchAdminGallery,
  fetchGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  updateGalleryStatus,
  deleteGalleryItem,
  reorderGalleryItem,
};

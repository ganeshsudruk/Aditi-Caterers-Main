import api from './api';

export function generateSlug(name) {
  if (!name) return `service-${Date.now()}`;
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function mapBackendService(item) {
  if (!item) return item;
  return {
    ...item,
    id: item._id || item.id,
  };
}

/**
 * Fetch services with filtering, search, sorting and pagination directly from backend
 */
export async function fetchAdminServices(params = {}) {
  const res = await api.get('/admin/services', { params });
  if (res?.data?.success && res.data.data) {
    const data = res.data.data;
    return {
      ...data,
      items: (data.items || []).map(mapBackendService),
    };
  }
  return { items: [], pagination: { total: 0, page: 1, limit: 10, totalPages: 1 }, counts: {} };
}

/**
 * Fetch service by ID
 */
export async function fetchServiceById(id) {
  const res = await api.get(`/admin/services/${id}`);
  if (res?.data?.success && res.data.data) {
    return mapBackendService(res.data.data);
  }
  throw new Error(`Service with ID ${id} not found.`);
}

/**
 * Create a new service
 */
export async function createService(serviceData) {
  const payload = {
    slug: serviceData.slug || generateSlug(serviceData.name?.en),
    name: {
      en: (serviceData.name?.en || '').trim(),
      mr: (serviceData.name?.mr || '').trim(),
    },
    shortDescription: {
      en: (serviceData.shortDescription?.en || '').trim(),
      mr: (serviceData.shortDescription?.mr || '').trim(),
    },
    description: {
      en: (serviceData.description?.en || '').trim(),
      mr: (serviceData.description?.mr || '').trim(),
    },
    highlights: {
      en: (serviceData.highlights?.en || []).filter(Boolean),
      mr: (serviceData.highlights?.mr || []).filter(Boolean),
    },
    image: {
      url: (serviceData.image?.url || '').trim(),
      publicId: (serviceData.image?.publicId || '').trim(),
      alt: {
        en: (serviceData.image?.alt?.en || serviceData.name?.en || '').trim(),
        mr: (serviceData.image?.alt?.mr || serviceData.name?.mr || '').trim(),
      },
    },
    displayOrder: parseInt(serviceData.displayOrder, 10) || 1,
    status: serviceData.status || 'draft',
  };

  const res = await api.post('/admin/services', payload);
  if (res?.data?.success && res.data.data) {
    return mapBackendService(res.data.data);
  }
  throw new Error(res?.data?.message || 'Failed to create service in database');
}

/**
 * Update an existing service
 */
export async function updateService(id, updatedFields) {
  const res = await api.put(`/admin/services/${id}`, updatedFields);
  if (res?.data?.success && res.data.data) {
    return mapBackendService(res.data.data);
  }
  throw new Error(res?.data?.message || `Failed to update service ${id}`);
}

/**
 * Change status (published, unpublished, draft, archived)
 */
export async function updateServiceStatus(id, newStatus) {
  const res = await api.patch(`/admin/services/${id}/status`, { status: newStatus });
  if (res?.data?.success && res.data.data) {
    return mapBackendService(res.data.data);
  }
  throw new Error(res?.data?.message || `Failed to update service status`);
}

/**
 * Shift display order (move up / down)
 */
export async function reorderService(id, direction) {
  const res = await api.patch('/admin/services/reorder', { id, direction });
  if (res?.data?.success && res.data.data) {
    return (res.data.data || []).map(mapBackendService);
  }
  // Re-fetch list
  const listRes = await fetchAdminServices({ limit: 100 });
  return listRes.items;
}

export default {
  generateSlug,
  fetchAdminServices,
  fetchServiceById,
  createService,
  updateService,
  updateServiceStatus,
  reorderService,
};

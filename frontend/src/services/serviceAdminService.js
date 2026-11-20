import api from './api';
import { defaultServices } from './serviceService';

const STORAGE_KEY_SERVICES = 'aditi_admin_services';

/**
 * Generate slug from name
 */
export function generateSlug(name) {
  if (!name) return `service-${Date.now()}`;
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Initialize or get services from storage
 */
export function getAllServicesFromStorage() {
  try {
    let services = JSON.parse(localStorage.getItem(STORAGE_KEY_SERVICES) || '[]');

    if (!services || services.length === 0) {
      // Seed from existing website defaultServices
      const seeded = defaultServices.map((s, idx) => {
        const order = s.sortOrder || idx + 1;
        const status = s.isActive ? 'published' : 'draft';

        return {
          id: s.id || `srv-${idx + 1}`,
          slug: s.slug || generateSlug(s.name?.en || `service-${idx + 1}`),
          name: {
            en: s.name?.en || '',
            mr: s.name?.mr || '',
          },
          shortDescription: {
            en: s.shortDescription?.en || '',
            mr: s.shortDescription?.mr || '',
          },
          description: {
            en: s.fullDescription?.en || s.description?.en || '',
            mr: s.fullDescription?.mr || s.description?.mr || '',
          },
          highlights: {
            en: s.eventRequirements?.en || s.highlights?.en || [],
            mr: s.eventRequirements?.mr || s.highlights?.mr || [],
          },
          image: {
            url: s.image?.url || '',
            publicId: s.image?.publicId || '',
            alt: {
              en: s.image?.alt?.en || s.name?.en || '',
              mr: s.image?.alt?.mr || s.name?.mr || '',
            },
          },
          displayOrder: order,
          status: status, // 'published', 'draft', 'unpublished', 'archived'
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      });

      services = seeded;
      localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(seeded));
    }

    return services;
  } catch (err) {
    console.error('Error fetching admin services from storage:', err);
    return [];
  }
}

/**
 * Save services to storage
 */
export function saveServicesToStorage(services) {
  try {
    localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(services));
  } catch (err) {
    console.error('Error saving admin services to storage:', err);
  }
}

/**
 * Fetch services with filtering, search, sorting and pagination
 */
export async function fetchAdminServices(params = {}) {
  const {
    search = '',
    statusFilter = 'all', // all, published, draft, unpublished, archived
    sortBy = 'order_asc', // order_asc, name_asc, created_desc, updated_desc
    page = 1,
    limit = 10,
  } = params;

  try {
    const res = await api.get('/admin/services', { params });
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Storage fallback
  }

  const allServices = getAllServicesFromStorage();

  // 1. Status Filter
  let records = allServices;
  if (statusFilter !== 'all') {
    records = records.filter((s) => s.status === statusFilter);
  }

  // 2. Search (English or Marathi name or slug)
  const trimmedSearch = (search || '').trim().toLowerCase();
  if (trimmedSearch) {
    records = records.filter((s) => {
      const matchEn = (s.name?.en || '').toLowerCase().includes(trimmedSearch);
      const matchMr = (s.name?.mr || '').toLowerCase().includes(trimmedSearch);
      const matchSlug = (s.slug || '').toLowerCase().includes(trimmedSearch);
      return matchEn || matchMr || matchSlug;
    });
  }

  // 3. Sorting
  records.sort((a, b) => {
    if (sortBy === 'name_asc') {
      return (a.name?.en || '').localeCompare(b.name?.en || '');
    }
    if (sortBy === 'created_desc') {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
    if (sortBy === 'updated_desc') {
      return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
    }
    // Default: order_asc
    return (a.displayOrder || 0) - (b.displayOrder || 0);
  });

  // 4. Pagination
  const total = records.length;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;
  const totalPages = Math.ceil(total / limitNum) || 1;
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedItems = records.slice(startIndex, startIndex + limitNum);

  // 5. Counts summary
  const counts = {
    total: allServices.length,
    published: allServices.filter((s) => s.status === 'published').length,
    draft: allServices.filter((s) => s.status === 'draft').length,
    unpublished: allServices.filter((s) => s.status === 'unpublished').length,
    archived: allServices.filter((s) => s.status === 'archived').length,
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

/**
 * Fetch service by ID
 */
export async function fetchServiceById(id) {
  try {
    const res = await api.get(`/admin/services/${id}`);
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Storage fallback
  }

  const all = getAllServicesFromStorage();
  const service = all.find((s) => s.id === id);
  if (!service) {
    throw new Error(`Service with ID ${id} not found.`);
  }
  return service;
}

/**
 * Create a new service
 */
export async function createService(serviceData) {
  const now = new Date().toISOString();
  const all = getAllServicesFromStorage();
  const highestOrder = all.reduce((max, s) => Math.max(max, s.displayOrder || 0), 0);

  const slug = serviceData.slug || generateSlug(serviceData.name?.en);
  const newId = `srv-${Date.now()}`;

  const newService = {
    id: newId,
    slug,
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
    displayOrder: parseInt(serviceData.displayOrder, 10) || highestOrder + 1,
    status: serviceData.status || 'draft',
    createdAt: now,
    updatedAt: now,
  };

  try {
    const res = await api.post('/admin/services', newService);
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Storage fallback
  }

  all.push(newService);
  saveServicesToStorage(all);

  return newService;
}

/**
 * Update an existing service
 */
export async function updateService(id, updatedFields) {
  const all = getAllServicesFromStorage();
  const index = all.findIndex((s) => s.id === id);

  if (index === -1) {
    throw new Error(`Service with ID ${id} not found.`);
  }

  const now = new Date().toISOString();
  const prev = all[index];

  const updatedRecord = {
    ...prev,
    ...updatedFields,
    name: { ...prev.name, ...(updatedFields.name || {}) },
    shortDescription: { ...prev.shortDescription, ...(updatedFields.shortDescription || {}) },
    description: { ...prev.description, ...(updatedFields.description || {}) },
    highlights: {
      en: (updatedFields.highlights?.en || prev.highlights?.en || []).filter(Boolean),
      mr: (updatedFields.highlights?.mr || prev.highlights?.mr || []).filter(Boolean),
    },
    image: { ...prev.image, ...(updatedFields.image || {}) },
    displayOrder: parseInt(updatedFields.displayOrder, 10) || prev.displayOrder,
    updatedAt: now,
  };

  try {
    const res = await api.put(`/admin/services/${id}`, updatedRecord);
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Storage fallback
  }

  all[index] = updatedRecord;
  saveServicesToStorage(all);

  return updatedRecord;
}

/**
 * Change status (published, unpublished, draft, archived)
 */
export async function updateServiceStatus(id, newStatus) {
  const all = getAllServicesFromStorage();
  const index = all.findIndex((s) => s.id === id);

  if (index === -1) {
    throw new Error(`Service with ID ${id} not found.`);
  }

  const now = new Date().toISOString();
  all[index].status = newStatus;
  all[index].updatedAt = now;

  try {
    await api.patch(`/admin/services/${id}/status`, { status: newStatus });
  } catch {
    // Storage fallback
  }

  saveServicesToStorage(all);
  return all[index];
}

/**
 * Shift display order (move up / down)
 */
export async function reorderService(id, direction) {
  const all = getAllServicesFromStorage();
  all.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  const index = all.findIndex((s) => s.id === id);
  if (index === -1) return all;

  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= all.length) return all;

  // Swap display orders
  const currentOrder = all[index].displayOrder || index + 1;
  const targetOrder = all[targetIndex].displayOrder || targetIndex + 1;

  all[index].displayOrder = targetOrder;
  all[targetIndex].displayOrder = currentOrder;

  const now = new Date().toISOString();
  all[index].updatedAt = now;
  all[targetIndex].updatedAt = now;

  saveServicesToStorage(all);

  try {
    await api.patch('/admin/services/reorder', {
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
  generateSlug,
  getAllServicesFromStorage,
  saveServicesToStorage,
  fetchAdminServices,
  fetchServiceById,
  createService,
  updateService,
  updateServiceStatus,
  reorderService,
};

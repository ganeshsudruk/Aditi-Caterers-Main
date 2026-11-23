import api from './api';

export function generateSlug(text) {
  if (!text) return `package-${Date.now()}`;
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function mapBackendPackage(p) {
  if (!p) return null;
  return {
    ...p,
    id: p._id || p.id,
    name: p.name || { en: '', mr: '' },
    shortDescription: p.shortDescription || { en: '', mr: '' },
    description: p.description || { en: '', mr: '' },
    price: p.price || { amount: 0, currency: 'INR', pricingBasis: 'fixed_package' },
    guestCount: p.guestCount || { min: 50, max: 1000, fixed: 100 },
    serviceTypes: p.serviceTypes || ['with_material'],
    eventTypes: p.eventTypes || ['wedding'],
    menuSelections: p.menuSelections || [],
    inclusions: p.inclusions || { en: [], mr: [] },
    exclusions: p.exclusions || { en: [], mr: [] },
    notes: p.notes || { en: '', mr: '' },
    image: p.image || { url: '', alt: { en: '', mr: '' } },
    displayOrder: p.displayOrder || 1,
    featured: !!p.featured,
    status: p.status || 'draft',
    createdAt: p.createdAt || new Date().toISOString(),
    updatedAt: p.updatedAt || new Date().toISOString(),
  };
}

export async function fetchAdminPackages(params = {}) {
  const res = await api.get('/admin/packages', { params });
  if (res?.data?.success && res.data.data) {
    const data = res.data.data;
    const rawItems = data.items || (Array.isArray(data) ? data : []);
    const items = rawItems.map(mapBackendPackage);
    return {
      items,
      pagination: {
        total: data.pagination?.total || data.total || items.length,
        page: data.pagination?.page || params.page || 1,
        limit: data.pagination?.limit || params.limit || 10,
        totalPages: data.pagination?.totalPages || 1,
      },
      counts: data.counts || {
        total: items.length,
        published: items.filter((p) => p.status === 'published').length,
        draft: items.filter((p) => p.status === 'draft').length,
        unpublished: items.filter((p) => p.status === 'unpublished').length,
        archived: items.filter((p) => p.status === 'archived').length,
      },
    };
  }
  return res.data;
}

export async function fetchPackageById(id) {
  const res = await api.get(`/admin/packages/${id}`);
  if (res?.data?.success && res.data.data) {
    return mapBackendPackage(res.data.data);
  }
  return res.data;
}

export async function createPackage(pkgData) {
  const payload = {
    name: pkgData.name,
    slug: pkgData.slug || generateSlug(pkgData.name?.en),
    shortDescription: pkgData.shortDescription,
    description: pkgData.description,
    guestCount: pkgData.guestCount,
    price: pkgData.price,
    serviceTypes: pkgData.serviceTypes || ['with_material'],
    eventTypes: pkgData.eventTypes || ['wedding'],
    menuSelections: pkgData.menuSelections || [],
    inclusions: pkgData.inclusions || { en: [], mr: [] },
    exclusions: pkgData.exclusions || { en: [], mr: [] },
    notes: pkgData.notes || { en: '', mr: '' },
    image: pkgData.image || { url: '', alt: { en: '', mr: '' } },
    displayOrder: parseInt(pkgData.displayOrder, 10) || 1,
    featured: !!pkgData.featured,
    status: pkgData.status || 'draft',
  };

  const res = await api.post('/admin/packages', payload);
  if (res?.data?.success && res.data.data) {
    return mapBackendPackage(res.data.data);
  }
  return res.data;
}

export async function updatePackage(id, updatedFields) {
  const res = await api.put(`/admin/packages/${id}`, updatedFields);
  if (res?.data?.success && res.data.data) {
    return mapBackendPackage(res.data.data);
  }
  return res.data;
}

export async function updatePackageStatus(id, newStatus) {
  const res = await api.patch(`/admin/packages/${id}/status`, { status: newStatus });
  if (res?.data?.success && res.data.data) {
    return mapBackendPackage(res.data.data);
  }
  return res.data;
}

export async function reorderPackage(id, direction) {
  return { success: true };
}

export default {
  generateSlug,
  mapBackendPackage,
  fetchAdminPackages,
  fetchPackageById,
  createPackage,
  updatePackage,
  updatePackageStatus,
  reorderPackage,
};

import api from './api';
import { defaultPackages } from './packageService';

const STORAGE_KEY_PACKAGES = 'aditi_admin_packages';

export function generateSlug(text) {
  if (!text) return `package-${Date.now()}`;
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Retrieve packages from localStorage, seeding from defaultPackages if empty
 */
export function getAllPackagesFromStorage() {
  try {
    let pkgs = JSON.parse(localStorage.getItem(STORAGE_KEY_PACKAGES) || '[]');
    if (!pkgs || pkgs.length === 0) {
      const seeded = defaultPackages.map((p, idx) => ({
        id: p.id || `pkg-${idx + 1}`,
        slug: p.slug || generateSlug(p.name?.en || `package-${idx + 1}`),
        name: {
          en: p.name?.en || '',
          mr: p.name?.mr || '',
        },
        shortDescription: {
          en: p.shortDescription?.en || p.tagline?.en || '',
          mr: p.shortDescription?.mr || p.tagline?.mr || '',
        },
        description: {
          en: p.fullDescription?.en || '',
          mr: p.fullDescription?.mr || '',
        },
        guestCount: {
          min: p.minimumGuests || 50,
          max: 1000,
          fixed: p.price?.guestBase || 100,
          note: { en: 'Suitable for 100 people standard', mr: '१०० लोकांसाठी योग्य' },
        },
        price: {
          amount: p.price?.amount || 0,
          currency: 'INR',
          pricingBasis: p.price?.unit === 'per-person' ? 'per_person' : 'fixed_package',
          notes: {
            en: p.conditions?.en || 'Price confirmed for 100 guests standard',
            mr: p.conditions?.mr || '१०० पाहुण्यांसाठी प्रमाणित दर',
          },
          showPublicly: true,
        },
        serviceTypes: p.packageType === 'without-material' ? ['without_material'] : ['with_material'],
        eventTypes: ['wedding', 'birthday', 'engagement', 'family_function'],
        menuSelections: p.sampleMenuStructure
          ? p.sampleMenuStructure.map((s, i) => ({
              groupName: { en: s.category?.en || `Course ${i + 1}`, mr: s.category?.mr || `कोर्स ${i + 1}` },
              selectionRule: s.isAlternative ? 'choose_one' : 'all_included',
              itemsText: { en: s.items?.en || '', mr: s.items?.mr || '' },
            }))
          : [],
        inclusions: {
          en: p.inclusions ? p.inclusions.map((inc) => inc.title?.en || '') : ['Food Preparation', 'Hygiene Standards'],
          mr: p.inclusions ? p.inclusions.map((inc) => inc.title?.mr || '') : ['स्वच्छता आणि ताजे अन्न', 'अनुभवी स्वयंपाकी'],
        },
        exclusions: {
          en: ['Hall / Venue Booking', 'Stage & Sound Decoration'],
          mr: ['हॉल किंवा जागेचे भाडे', 'मंडप व ध्वनी व्यवस्था'],
        },
        notes: {
          en: p.conditions?.en || '',
          mr: p.conditions?.mr || '',
        },
        image: {
          url: p.image?.url || '',
          publicId: '',
          alt: {
            en: p.image?.alt?.en || p.name?.en || '',
            mr: p.image?.alt?.mr || p.name?.mr || '',
          },
        },
        displayOrder: p.displayOrder || idx + 1,
        featured: !!p.isFeatured,
        status: p.isActive !== false ? 'published' : 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      pkgs = seeded;
      localStorage.setItem(STORAGE_KEY_PACKAGES, JSON.stringify(seeded));
    }
    return pkgs;
  } catch (err) {
    console.error('Error fetching admin packages from storage:', err);
    return [];
  }
}

export function savePackagesToStorage(pkgs) {
  try {
    localStorage.setItem(STORAGE_KEY_PACKAGES, JSON.stringify(pkgs));
  } catch (err) {
    console.error('Error saving packages to storage:', err);
  }
}

/**
 * Fetch packages with filters, search, sorting and pagination
 */
export async function fetchAdminPackages(params = {}) {
  const {
    search = '',
    statusFilter = 'all', // all, published, draft, unpublished, archived
    serviceTypeFilter = 'all', // all, with_material, without_material
    sortBy = 'order_asc', // order_asc, name_asc, price_desc, price_asc, created_desc
    page = 1,
    limit = 10,
  } = params;

  try {
    const res = await api.get('/admin/packages', { params });
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Storage fallback
  }

  const allPkgs = getAllPackagesFromStorage();
  let records = allPkgs;

  // 1. Status Filter
  if (statusFilter !== 'all') {
    records = records.filter((p) => p.status === statusFilter);
  }

  // 2. Service Type Filter
  if (serviceTypeFilter !== 'all') {
    records = records.filter((p) => (p.serviceTypes || []).includes(serviceTypeFilter));
  }

  // 3. Search Filter
  const q = (search || '').trim().toLowerCase();
  if (q) {
    records = records.filter((p) => {
      const matchEn = (p.name?.en || '').toLowerCase().includes(q);
      const matchMr = (p.name?.mr || '').toLowerCase().includes(q);
      const matchSlug = (p.slug || '').toLowerCase().includes(q);
      return matchEn || matchMr || matchSlug;
    });
  }

  // 4. Sorting
  records.sort((a, b) => {
    if (sortBy === 'name_asc') {
      return (a.name?.en || '').localeCompare(b.name?.en || '');
    }
    if (sortBy === 'price_desc') {
      return (b.price?.amount || 0) - (a.price?.amount || 0);
    }
    if (sortBy === 'price_asc') {
      return (a.price?.amount || 0) - (b.price?.amount || 0);
    }
    if (sortBy === 'created_desc') {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
    // Default: order_asc
    return (a.displayOrder || 0) - (b.displayOrder || 0);
  });

  // 5. Pagination
  const total = records.length;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;
  const totalPages = Math.ceil(total / limitNum) || 1;
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedItems = records.slice(startIndex, startIndex + limitNum);

  const counts = {
    total: allPkgs.length,
    published: allPkgs.filter((p) => p.status === 'published').length,
    draft: allPkgs.filter((p) => p.status === 'draft').length,
    unpublished: allPkgs.filter((p) => p.status === 'unpublished').length,
    archived: allPkgs.filter((p) => p.status === 'archived').length,
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

export async function fetchPackageById(id) {
  try {
    const res = await api.get(`/admin/packages/${id}`);
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Storage fallback
  }

  const all = getAllPackagesFromStorage();
  const pkg = all.find((p) => p.id === id);
  if (!pkg) throw new Error(`Package ${id} not found.`);
  return pkg;
}

export async function createPackage(pkgData) {
  const all = getAllPackagesFromStorage();
  const highest = all.reduce((max, p) => Math.max(max, p.displayOrder || 0), 0);
  const now = new Date().toISOString();
  const newId = `pkg-${Date.now()}`;

  const newPackage = {
    id: newId,
    slug: pkgData.slug || generateSlug(pkgData.name?.en),
    name: {
      en: (pkgData.name?.en || '').trim(),
      mr: (pkgData.name?.mr || '').trim(),
    },
    shortDescription: {
      en: (pkgData.shortDescription?.en || '').trim(),
      mr: (pkgData.shortDescription?.mr || '').trim(),
    },
    description: {
      en: (pkgData.description?.en || '').trim(),
      mr: (pkgData.description?.mr || '').trim(),
    },
    guestCount: {
      min: parseInt(pkgData.guestCount?.min, 10) || 50,
      max: parseInt(pkgData.guestCount?.max, 10) || 1000,
      fixed: parseInt(pkgData.guestCount?.fixed, 10) || 100,
      note: {
        en: (pkgData.guestCount?.note?.en || '').trim(),
        mr: (pkgData.guestCount?.note?.mr || '').trim(),
      },
    },
    price: {
      amount: parseFloat(pkgData.price?.amount) || 0,
      currency: pkgData.price?.currency || 'INR',
      pricingBasis: pkgData.price?.pricingBasis || 'fixed_package',
      notes: {
        en: (pkgData.price?.notes?.en || '').trim(),
        mr: (pkgData.price?.notes?.mr || '').trim(),
      },
      showPublicly: pkgData.price?.showPublicly !== false,
    },
    serviceTypes: Array.isArray(pkgData.serviceTypes) ? pkgData.serviceTypes : ['with_material'],
    eventTypes: Array.isArray(pkgData.eventTypes) ? pkgData.eventTypes : ['wedding'],
    menuSelections: Array.isArray(pkgData.menuSelections) ? pkgData.menuSelections : [],
    inclusions: {
      en: (pkgData.inclusions?.en || []).filter(Boolean),
      mr: (pkgData.inclusions?.mr || []).filter(Boolean),
    },
    exclusions: {
      en: (pkgData.exclusions?.en || []).filter(Boolean),
      mr: (pkgData.exclusions?.mr || []).filter(Boolean),
    },
    notes: {
      en: (pkgData.notes?.en || '').trim(),
      mr: (pkgData.notes?.mr || '').trim(),
    },
    image: {
      url: (pkgData.image?.url || '').trim(),
      publicId: '',
      alt: {
        en: (pkgData.image?.alt?.en || pkgData.name?.en || '').trim(),
        mr: (pkgData.image?.alt?.mr || pkgData.name?.mr || '').trim(),
      },
    },
    displayOrder: parseInt(pkgData.displayOrder, 10) || highest + 1,
    featured: !!pkgData.featured,
    status: pkgData.status || 'draft',
    createdAt: now,
    updatedAt: now,
  };

  try {
    const res = await api.post('/admin/packages', newPackage);
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Storage fallback
  }

  all.push(newPackage);
  savePackagesToStorage(all);
  return newPackage;
}

export async function updatePackage(id, updatedFields) {
  const all = getAllPackagesFromStorage();
  const index = all.findIndex((p) => p.id === id);
  if (index === -1) throw new Error(`Package ${id} not found.`);

  const now = new Date().toISOString();
  const prev = all[index];

  const updatedRecord = {
    ...prev,
    ...updatedFields,
    name: { ...prev.name, ...(updatedFields.name || {}) },
    shortDescription: { ...prev.shortDescription, ...(updatedFields.shortDescription || {}) },
    description: { ...prev.description, ...(updatedFields.description || {}) },
    guestCount: { ...prev.guestCount, ...(updatedFields.guestCount || {}) },
    price: { ...prev.price, ...(updatedFields.price || {}) },
    serviceTypes: updatedFields.serviceTypes || prev.serviceTypes,
    eventTypes: updatedFields.eventTypes || prev.eventTypes,
    menuSelections: updatedFields.menuSelections || prev.menuSelections,
    inclusions: {
      en: (updatedFields.inclusions?.en || prev.inclusions?.en || []).filter(Boolean),
      mr: (updatedFields.inclusions?.mr || prev.inclusions?.mr || []).filter(Boolean),
    },
    exclusions: {
      en: (updatedFields.exclusions?.en || prev.exclusions?.en || []).filter(Boolean),
      mr: (updatedFields.exclusions?.mr || prev.exclusions?.mr || []).filter(Boolean),
    },
    notes: { ...prev.notes, ...(updatedFields.notes || {}) },
    image: { ...prev.image, ...(updatedFields.image || {}) },
    displayOrder: parseInt(updatedFields.displayOrder, 10) || prev.displayOrder,
    featured: updatedFields.featured !== undefined ? !!updatedFields.featured : prev.featured,
    updatedAt: now,
  };

  try {
    await api.put(`/admin/packages/${id}`, updatedRecord);
  } catch {
    // Storage fallback
  }

  all[index] = updatedRecord;
  savePackagesToStorage(all);
  return updatedRecord;
}

export async function updatePackageStatus(id, newStatus) {
  const all = getAllPackagesFromStorage();
  const index = all.findIndex((p) => p.id === id);
  if (index === -1) throw new Error(`Package ${id} not found.`);

  all[index].status = newStatus;
  all[index].updatedAt = new Date().toISOString();

  try {
    await api.patch(`/admin/packages/${id}/status`, { status: newStatus });
  } catch {
    // Storage fallback
  }

  savePackagesToStorage(all);
  return all[index];
}

export async function reorderPackage(id, direction) {
  const all = getAllPackagesFromStorage();
  all.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  const index = all.findIndex((p) => p.id === id);
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

  savePackagesToStorage(all);

  try {
    await api.patch('/admin/packages/reorder', {
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
  getAllPackagesFromStorage,
  savePackagesToStorage,
  fetchAdminPackages,
  fetchPackageById,
  createPackage,
  updatePackage,
  updatePackageStatus,
  reorderPackage,
};

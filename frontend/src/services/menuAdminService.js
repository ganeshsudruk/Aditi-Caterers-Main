import api from './api';
import { defaultCategories, defaultMenuItems } from './menuService';

const STORAGE_KEY_CATEGORIES = 'aditi_admin_menu_categories';
const STORAGE_KEY_ITEMS = 'aditi_admin_menu_items';

export function generateSlug(text) {
  if (!text) return `item-${Date.now()}`;
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Get all categories from storage, seeding from defaultCategories if empty
 */
export function getAllCategoriesFromStorage() {
  try {
    let cats = JSON.parse(localStorage.getItem(STORAGE_KEY_CATEGORIES) || '[]');
    if (!cats || cats.length === 0) {
      const seeded = defaultCategories.map((c, idx) => ({
        id: c.id,
        slug: c.slug || c.id,
        name: {
          en: c.name?.en || '',
          mr: c.name?.mr || '',
        },
        description: {
          en: c.shortDescription?.en || '',
          mr: c.shortDescription?.mr || '',
        },
        displayOrder: c.sortOrder || idx + 1,
        status: 'active', // active, inactive, archived
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      cats = seeded;
      localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(seeded));
    }
    return cats;
  } catch (err) {
    console.error('Error fetching categories from storage:', err);
    return [];
  }
}

export function saveCategoriesToStorage(categories) {
  try {
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
  } catch (err) {
    console.error('Error saving categories to storage:', err);
  }
}

/**
 * Get all menu items from storage, seeding from defaultMenuItems if empty
 */
export function getAllMenuItemsFromStorage() {
  try {
    let items = JSON.parse(localStorage.getItem(STORAGE_KEY_ITEMS) || '[]');
    if (!items || items.length === 0) {
      const seeded = defaultMenuItems.map((item, idx) => ({
        id: item.id || `item-${idx + 1}`,
        slug: item.slug || generateSlug(item.name?.en || `item-${idx + 1}`),
        categoryId: item.categoryId || item.categorySlug || 'breakfast',
        name: {
          en: item.name?.en || '',
          mr: item.name?.mr || '',
        },
        description: {
          en: item.shortDescription?.en || '',
          mr: item.shortDescription?.mr || '',
        },
        ingredients: {
          en: item.ingredients?.en || [],
          mr: item.ingredients?.mr || [],
        },
        foodType: item.dietary?.isVeg ? 'veg' : 'non-veg',
        image: {
          url: item.image?.url || '',
          publicId: '',
          alt: {
            en: item.image?.alt?.en || item.name?.en || '',
            mr: item.image?.alt?.mr || item.name?.mr || '',
          },
        },
        displayOrder: idx + 1,
        featured: !!(item.isPopular || item.isChefSpecial),
        status: 'published', // draft, published, unpublished, archived
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      items = seeded;
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(seeded));
    }
    return items;
  } catch (err) {
    console.error('Error fetching menu items from storage:', err);
    return [];
  }
}

export function saveMenuItemsToStorage(items) {
  try {
    localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
  } catch (err) {
    console.error('Error saving menu items to storage:', err);
  }
}

// ─────────────────────────────────────────────────────────────
// CATEGORY CRUD
// ─────────────────────────────────────────────────────────────

export async function fetchAdminCategories(params = {}) {
  try {
    const res = await api.get('/admin/menu/categories', { params });
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Storage fallback
  }

  const all = getAllCategoriesFromStorage();
  const allItems = getAllMenuItemsFromStorage();

  const enriched = all.map((c) => {
    const itemCount = allItems.filter((i) => i.categoryId === c.id && i.status !== 'archived').length;
    return { ...c, itemCount };
  });

  enriched.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  return { items: enriched, total: enriched.length };
}

export async function createCategory(catData) {
  const all = getAllCategoriesFromStorage();
  const highest = all.reduce((max, c) => Math.max(max, c.displayOrder || 0), 0);
  const now = new Date().toISOString();

  const newCat = {
    id: generateSlug(catData.name?.en) || `cat-${Date.now()}`,
    slug: generateSlug(catData.name?.en),
    name: {
      en: (catData.name?.en || '').trim(),
      mr: (catData.name?.mr || '').trim(),
    },
    description: {
      en: (catData.description?.en || '').trim(),
      mr: (catData.description?.mr || '').trim(),
    },
    displayOrder: parseInt(catData.displayOrder, 10) || highest + 1,
    status: catData.status || 'active',
    createdAt: now,
    updatedAt: now,
  };

  try {
    const res = await api.post('/admin/menu/categories', newCat);
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Storage fallback
  }

  all.push(newCat);
  saveCategoriesToStorage(all);
  return newCat;
}

export async function updateCategory(id, updatedFields) {
  const all = getAllCategoriesFromStorage();
  const index = all.findIndex((c) => c.id === id);
  if (index === -1) throw new Error(`Category ${id} not found.`);

  const now = new Date().toISOString();
  all[index] = {
    ...all[index],
    ...updatedFields,
    name: { ...all[index].name, ...(updatedFields.name || {}) },
    description: { ...all[index].description, ...(updatedFields.description || {}) },
    displayOrder: parseInt(updatedFields.displayOrder, 10) || all[index].displayOrder,
    updatedAt: now,
  };

  try {
    await api.put(`/admin/menu/categories/${id}`, all[index]);
  } catch {
    // Storage fallback
  }

  saveCategoriesToStorage(all);
  return all[index];
}

export async function updateCategoryStatus(id, newStatus) {
  const all = getAllCategoriesFromStorage();
  const index = all.findIndex((c) => c.id === id);
  if (index === -1) throw new Error(`Category ${id} not found.`);

  all[index].status = newStatus;
  all[index].updatedAt = new Date().toISOString();

  try {
    await api.patch(`/admin/menu/categories/${id}/status`, { status: newStatus });
  } catch {
    // Storage fallback
  }

  saveCategoriesToStorage(all);
  return all[index];
}

// ─────────────────────────────────────────────────────────────
// MENU ITEM CRUD
// ─────────────────────────────────────────────────────────────

export async function fetchAdminMenuItems(params = {}) {
  const {
    search = '',
    categoryFilter = 'all',
    statusFilter = 'all', // all, published, draft, unpublished, archived
    foodTypeFilter = 'all', // all, veg, non-veg, jain
    sortBy = 'order_asc', // order_asc, name_asc, created_desc, category_asc
    page = 1,
    limit = 10,
  } = params;

  try {
    const res = await api.get('/admin/menu/items', { params });
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Storage fallback
  }

  const allItems = getAllMenuItemsFromStorage();
  const allCats = getAllCategoriesFromStorage();
  const catMap = new Map(allCats.map((c) => [c.id, c]));

  let records = allItems.map((item) => ({
    ...item,
    categoryName: catMap.get(item.categoryId)?.name || { en: item.categoryId, mr: item.categoryId },
  }));

  // Status Filter
  if (statusFilter !== 'all') {
    records = records.filter((i) => i.status === statusFilter);
  }

  // Category Filter
  if (categoryFilter !== 'all') {
    records = records.filter((i) => i.categoryId === categoryFilter);
  }

  // Food Type Filter
  if (foodTypeFilter !== 'all') {
    records = records.filter((i) => i.foodType === foodTypeFilter);
  }

  // Search Filter
  const q = (search || '').trim().toLowerCase();
  if (q) {
    records = records.filter((i) => {
      const matchEn = (i.name?.en || '').toLowerCase().includes(q);
      const matchMr = (i.name?.mr || '').toLowerCase().includes(q);
      const matchCat = (i.categoryName?.en || '').toLowerCase().includes(q) || (i.categoryName?.mr || '').toLowerCase().includes(q);
      const matchSlug = (i.slug || '').toLowerCase().includes(q);
      return matchEn || matchMr || matchCat || matchSlug;
    });
  }

  // Sorting
  records.sort((a, b) => {
    if (sortBy === 'name_asc') {
      return (a.name?.en || '').localeCompare(b.name?.en || '');
    }
    if (sortBy === 'category_asc') {
      const catA = a.categoryName?.en || '';
      const catB = b.categoryName?.en || '';
      return catA.localeCompare(catB);
    }
    if (sortBy === 'created_desc') {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
    // Default: order_asc
    return (a.displayOrder || 0) - (b.displayOrder || 0);
  });

  // Pagination
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
    totalCategories: allCats.length,
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

export async function createMenuItem(itemData) {
  const all = getAllMenuItemsFromStorage();
  const highest = all.reduce((max, i) => Math.max(max, i.displayOrder || 0), 0);
  const now = new Date().toISOString();
  const newId = `item-${Date.now()}`;

  const newItem = {
    id: newId,
    slug: itemData.slug || generateSlug(itemData.name?.en),
    categoryId: itemData.categoryId,
    name: {
      en: (itemData.name?.en || '').trim(),
      mr: (itemData.name?.mr || '').trim(),
    },
    description: {
      en: (itemData.description?.en || '').trim(),
      mr: (itemData.description?.mr || '').trim(),
    },
    ingredients: {
      en: (itemData.ingredients?.en || []).filter(Boolean),
      mr: (itemData.ingredients?.mr || []).filter(Boolean),
    },
    foodType: itemData.foodType || 'veg',
    image: {
      url: (itemData.image?.url || '').trim(),
      publicId: '',
      alt: {
        en: (itemData.image?.alt?.en || itemData.name?.en || '').trim(),
        mr: (itemData.image?.alt?.mr || itemData.name?.mr || '').trim(),
      },
    },
    displayOrder: parseInt(itemData.displayOrder, 10) || highest + 1,
    featured: !!itemData.featured,
    status: itemData.status || 'draft',
    createdAt: now,
    updatedAt: now,
  };

  try {
    const res = await api.post('/admin/menu/items', newItem);
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Storage fallback
  }

  all.push(newItem);
  saveMenuItemsToStorage(all);
  return newItem;
}

export async function updateMenuItem(id, updatedFields) {
  const all = getAllMenuItemsFromStorage();
  const index = all.findIndex((i) => i.id === id);
  if (index === -1) throw new Error(`Menu item ${id} not found.`);

  const now = new Date().toISOString();
  const prev = all[index];

  const updatedRecord = {
    ...prev,
    ...updatedFields,
    name: { ...prev.name, ...(updatedFields.name || {}) },
    description: { ...prev.description, ...(updatedFields.description || {}) },
    ingredients: {
      en: (updatedFields.ingredients?.en || prev.ingredients?.en || []).filter(Boolean),
      mr: (updatedFields.ingredients?.mr || prev.ingredients?.mr || []).filter(Boolean),
    },
    image: { ...prev.image, ...(updatedFields.image || {}) },
    displayOrder: parseInt(updatedFields.displayOrder, 10) || prev.displayOrder,
    updatedAt: now,
  };

  try {
    await api.put(`/admin/menu/items/${id}`, updatedRecord);
  } catch {
    // Storage fallback
  }

  all[index] = updatedRecord;
  saveMenuItemsToStorage(all);
  return updatedRecord;
}

export async function updateMenuItemStatus(id, newStatus) {
  const all = getAllMenuItemsFromStorage();
  const index = all.findIndex((i) => i.id === id);
  if (index === -1) throw new Error(`Menu item ${id} not found.`);

  all[index].status = newStatus;
  all[index].updatedAt = new Date().toISOString();

  try {
    await api.patch(`/admin/menu/items/${id}/status`, { status: newStatus });
  } catch {
    // Storage fallback
  }

  saveMenuItemsToStorage(all);
  return all[index];
}

export async function reorderMenuItem(id, direction) {
  const all = getAllMenuItemsFromStorage();
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

  saveMenuItemsToStorage(all);

  try {
    await api.patch('/admin/menu/items/reorder', {
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
  getAllCategoriesFromStorage,
  saveCategoriesToStorage,
  getAllMenuItemsFromStorage,
  saveMenuItemsToStorage,
  fetchAdminCategories,
  createCategory,
  updateCategory,
  updateCategoryStatus,
  fetchAdminMenuItems,
  createMenuItem,
  updateMenuItem,
  updateMenuItemStatus,
  reorderMenuItem,
};

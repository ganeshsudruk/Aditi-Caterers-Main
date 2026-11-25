import api from './api';

// ── API SERVICE METHODS (MONGODB AS SINGLE SOURCE OF TRUTH) ────────────────

/**
 * Fetch all menu categories from MongoDB
 */
export async function getAllCategories() {
  const res = await api.get('/public/menu/categories');
  if (res?.data?.data && Array.isArray(res.data.data)) {
    return res.data.data;
  }
  return [];
}

/**
 * Fetch a single menu category by slug or id from MongoDB
 */
export async function getCategoryBySlug(slug) {
  if (!slug) return null;
  const res = await api.get(`/public/menu/categories/${encodeURIComponent(slug)}`);
  if (res?.data?.data) {
    return res.data.data;
  }
  return null;
}

/**
 * Fetch menu items from MongoDB with filtering, dietary, and spice options
 */
export async function getMenuItems(categorySlug = null, filters = {}) {
  const params = new URLSearchParams();
  if (categorySlug && categorySlug !== 'all') params.append('category', categorySlug);
  if (filters.dietary && filters.dietary !== 'all') {
    params.append('dietary', filters.dietary);
    params.append('foodType', filters.dietary);
  }
  if (filters.spiceLevel && filters.spiceLevel !== 'all') params.append('spice', filters.spiceLevel);
  if (filters.search) {
    params.append('search', filters.search);
    params.append('q', filters.search);
  }

  const res = await api.get(`/public/menu?${params.toString()}`);
  const itemsData = res?.data?.data?.items || (Array.isArray(res?.data?.data) ? res.data.data : null);

  if (Array.isArray(itemsData)) {
    return itemsData.map((item) => ({
      ...item,
      id: item._id || item.id,
      categorySlug: item.category?.slug || item.categorySlug || item.categoryId || (typeof item.category === 'string' ? item.category : ''),
      categoryId: item.categoryId || item.category?._id || item.category?.id || item.category || '',
      shortDescription: item.shortDescription || item.description || { en: '', mr: '' },
      dietary: item.dietary || {
        isVeg: item.foodType === 'veg' || item.foodType === 'jain',
        isJain: item.foodType === 'jain',
        isVegan: item.dietaryType === 'vegan',
      },
      spiceLevel: item.spiceLevel !== undefined ? item.spiceLevel : 1,
    }));
  }

  return [];
}

/**
 * Fetch a single menu item by ID or slug from MongoDB
 */
export async function getMenuItemById(idOrSlug) {
  if (!idOrSlug) return null;
  const res = await api.get(`/public/menu/items/${encodeURIComponent(idOrSlug)}`);
  if (res?.data?.data) {
    const item = res.data.data;
    return {
      ...item,
      id: item._id || item.id,
      categorySlug: item.category?.slug || item.categorySlug || item.categoryId || (typeof item.category === 'string' ? item.category : ''),
      categoryId: item.categoryId || item.category?._id || item.category?.id || item.category || '',
      shortDescription: item.shortDescription || item.description || { en: '', mr: '' },
      dietary: item.dietary || {
        isVeg: item.foodType === 'veg' || item.foodType === 'jain',
        isJain: item.foodType === 'jain',
        isVegan: item.dietaryType === 'vegan',
      },
      spiceLevel: item.spiceLevel !== undefined ? item.spiceLevel : 1,
    };
  }
  return null;
}

/**
 * Fetch featured dishes from MongoDB
 */
export async function getFeaturedDishes() {
  const res = await api.get('/public/menu/featured');
  if (res?.data?.data && Array.isArray(res.data.data)) {
    return res.data.data.map((item) => ({
      ...item,
      id: item._id || item.id,
      categorySlug: item.category?.slug || item.categorySlug || item.categoryId || (typeof item.category === 'string' ? item.category : ''),
      categoryId: item.categoryId || item.category?._id || item.category?.id || item.category || '',
      shortDescription: item.shortDescription || item.description || { en: '', mr: '' },
      dietary: item.dietary || {
        isVeg: item.foodType === 'veg' || item.foodType === 'jain',
        isJain: item.foodType === 'jain',
        isVegan: item.dietaryType === 'vegan',
      },
      spiceLevel: item.spiceLevel !== undefined ? item.spiceLevel : 1,
    }));
  }
  return [];
}

/**
 * Search menu items from MongoDB
 */
export async function searchMenuItems(query) {
  if (!query || query.trim() === '') return [];
  const res = await api.get(`/public/menu?search=${encodeURIComponent(query.trim())}`);
  const items = res?.data?.data?.items || (Array.isArray(res?.data?.data) ? res.data.data : []);
  return items;
}

/**
 * Fetch menu FAQs from MongoDB
 */
export async function getMenuFaqs() {
  const res = await api.get('/public/menu/faqs');
  if (res?.data?.data && Array.isArray(res.data.data)) {
    return res.data.data;
  }
  return [];
}

export default {
  getAllCategories,
  getCategoryBySlug,
  getMenuItems,
  getMenuItemById,
  getFeaturedDishes,
  searchMenuItems,
  getMenuFaqs,
};

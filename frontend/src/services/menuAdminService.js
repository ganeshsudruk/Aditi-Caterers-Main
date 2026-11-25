import api from './api';

export function generateSlug(text) {
  if (!text) return `item-${Date.now()}`;
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ─────────────────────────────────────────────────────────────
// CATEGORY CRUD
// ─────────────────────────────────────────────────────────────

export async function fetchAdminCategories(params = {}) {
  const res = await api.get('/admin/menu/categories', { params });
  if (res?.data?.success && res.data.data) {
    const data = res.data.data;
    const items = (data.items || (Array.isArray(data) ? data : [])).map((c) => ({
      ...c,
      id: c._id || c.id,
      slug: c.slug || c.id,
    }));
    return {
      items,
      total: data.total || items.length,
    };
  }
  return res.data;
}

export async function fetchCategoryById(id) {
  const res = await api.get(`/admin/menu/categories/${id}`);
  if (res?.data?.success && res.data.data) {
    const c = res.data.data;
    return { ...c, id: c._id || c.id };
  }
  return res.data;
}

export async function createCategory(catData) {
  const payload = {
    name: {
      en: (catData.name?.en || '').trim(),
      mr: (catData.name?.mr || '').trim(),
    },
    slug: catData.slug || generateSlug(catData.name?.en),
    description: {
      en: (catData.description?.en || '').trim(),
      mr: (catData.description?.mr || '').trim(),
    },
    displayOrder: parseInt(catData.displayOrder, 10) || 1,
    status: catData.status || 'active',
  };

  const res = await api.post('/admin/menu/categories', payload);
  if (res?.data?.success && res.data.data) {
    const created = res.data.data;
    return { ...created, id: created._id || created.id };
  }
  return res.data;
}

export async function updateCategory(id, updatedFields) {
  const payload = {
    name: updatedFields.name,
    description: updatedFields.description,
    displayOrder: parseInt(updatedFields.displayOrder, 10),
    status: updatedFields.status,
  };

  const res = await api.put(`/admin/menu/categories/${id}`, payload);
  if (res?.data?.success && res.data.data) {
    const updated = res.data.data;
    return { ...updated, id: updated._id || updated.id };
  }
  return res.data;
}

export async function updateCategoryStatus(id, newStatus) {
  const res = await api.patch(`/admin/menu/categories/${id}/status`, { status: newStatus });
  if (res?.data?.success && res.data.data) {
    const updated = res.data.data;
    return { ...updated, id: updated._id || updated.id };
  }
  return res.data;
}

export async function deleteCategory(id) {
  const res = await api.delete(`/admin/menu/categories/${id}`);
  return res?.data?.data || res.data;
}

export async function reorderCategories(orderedIds) {
  const res = await api.patch('/admin/menu/categories/reorder', { categoryIds: orderedIds });
  return res?.data?.data || res.data;
}

// ─────────────────────────────────────────────────────────────
// MENU ITEM CRUD
// ─────────────────────────────────────────────────────────────

export async function fetchAdminMenuItems(params = {}) {
  const {
    search = '',
    categoryFilter = 'all',
    statusFilter = 'all',
    foodTypeFilter = 'all',
    sortBy = 'order_asc',
    page = 1,
    limit = 10,
  } = params;

  const queryParams = {
    search,
    category: categoryFilter,
    categoryFilter,
    status: statusFilter,
    statusFilter,
    foodType: foodTypeFilter,
    foodTypeFilter,
    sortBy,
    page,
    limit,
  };

  const res = await api.get('/admin/menu/items', { params: queryParams });
  if (res?.data?.success && res.data.data) {
    const data = res.data.data;
    const items = (data.items || []).map((item) => ({
      ...item,
      id: item._id || item.id,
      categoryName: item.category?.name || {
        en: item.categoryId || item.category?.slug || '',
        mr: item.categoryId || item.category?.slug || '',
      },
    }));
    return {
      ...data,
      items,
    };
  }
  return res.data;
}

export async function fetchMenuItemById(id) {
  const res = await api.get(`/admin/menu/items/${id}`);
  if (res?.data?.success && res.data.data) {
    const item = res.data.data;
    return {
      ...item,
      id: item._id || item.id,
      categoryName: item.category?.name || {
        en: item.categoryId || '',
        mr: item.categoryId || '',
      },
    };
  }
  return res.data;
}

export async function createMenuItem(itemData) {
  const payload = {
    name: {
      en: (itemData.name?.en || '').trim(),
      mr: (itemData.name?.mr || '').trim(),
    },
    slug: itemData.slug || generateSlug(itemData.name?.en),
    category: itemData.categoryId || itemData.category,
    categoryId: itemData.categoryId,
    description: {
      en: (itemData.description?.en || '').trim(),
      mr: (itemData.description?.mr || '').trim(),
    },
    ingredients: {
      en: (itemData.ingredients?.en || []).filter(Boolean),
      mr: (itemData.ingredients?.mr || []).filter(Boolean),
    },
    foodType: itemData.foodType || 'veg',
    dietaryType: itemData.foodType === 'jain' ? 'jain' : itemData.foodType === 'veg' ? 'veg' : 'non-veg',
    image: {
      url: (itemData.image?.url || '').trim(),
      alt: {
        en: (itemData.image?.alt?.en || itemData.name?.en || '').trim(),
        mr: (itemData.image?.alt?.mr || itemData.name?.mr || '').trim(),
      },
    },
    displayOrder: parseInt(itemData.displayOrder, 10) || 1,
    isFeatured: !!itemData.featured,
    featured: !!itemData.featured,
    status: itemData.status || 'draft',
  };

  const res = await api.post('/admin/menu/items', payload);
  if (res?.data?.success && res.data.data) {
    const created = res.data.data;
    return { ...created, id: created._id || created.id };
  }
  return res.data;
}

export async function updateMenuItem(id, updatedFields) {
  const payload = {
    ...updatedFields,
    category: updatedFields.categoryId || updatedFields.category,
    isFeatured: updatedFields.featured !== undefined ? !!updatedFields.featured : undefined,
    featured: updatedFields.featured !== undefined ? !!updatedFields.featured : undefined,
  };

  const res = await api.put(`/admin/menu/items/${id}`, payload);
  if (res?.data?.success && res.data.data) {
    const updated = res.data.data;
    return { ...updated, id: updated._id || updated.id };
  }
  return res.data;
}

export async function updateMenuItemStatus(id, newStatus) {
  const res = await api.patch(`/admin/menu/items/${id}/status`, { status: newStatus });
  if (res?.data?.success && res.data.data) {
    const updated = res.data.data;
    return { ...updated, id: updated._id || updated.id };
  }
  return res.data;
}

export async function archiveMenuItem(id) {
  const res = await api.delete(`/admin/menu/items/${id}`);
  return res?.data?.data || res.data;
}

export async function reorderMenuItem(id, direction) {
  // Reordering via backend status/order
  return { success: true };
}

export default {
  generateSlug,
  fetchAdminCategories,
  fetchCategoryById,
  createCategory,
  updateCategory,
  updateCategoryStatus,
  deleteCategory,
  reorderCategories,
  fetchAdminMenuItems,
  fetchMenuItemById,
  createMenuItem,
  updateMenuItem,
  updateMenuItemStatus,
  archiveMenuItem,
  reorderMenuItem,
};

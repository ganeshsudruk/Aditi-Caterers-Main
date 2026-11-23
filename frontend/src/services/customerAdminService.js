import api from './api';

export function normalizePhone(rawPhone) {
  if (!rawPhone) return '';
  const digits = String(rawPhone).replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  return digits;
}

export function mapBackendCustomer(c) {
  if (!c) return null;
  return {
    ...c,
    id: c._id || c.id,
    name: c.name || '',
    phone: c.phone || '',
    normalizedPhone: c.normalizedPhone || normalizePhone(c.phone),
    email: c.email || '',
    address: c.address || '',
    preferredLanguage: c.preferredLanguage || 'mr',
    notes: (c.notes || []).map((n, i) => ({
      id: n._id || n.id || `n-${i}`,
      message: n.message || '',
      author: n.author || 'Administrator',
      createdAt: n.createdAt || new Date().toISOString(),
    })),
    isArchived: !!c.isArchived,
    totalBookings: c.totalBookings || (c.bookings?.length || 0),
    lastEventDate: c.lastEventDate || null,
    bookings: c.bookings || [],
    createdAt: c.createdAt || new Date().toISOString(),
    updatedAt: c.updatedAt || new Date().toISOString(),
  };
}

export async function fetchAdminCustomers(params = {}) {
  const res = await api.get('/admin/customers', { params });
  if (res?.data?.success && res.data.data) {
    const data = res.data.data;
    const rawItems = data.items || (Array.isArray(data) ? data : []);
    const items = rawItems.map(mapBackendCustomer);
    return {
      items,
      pagination: {
        total: data.pagination?.total || data.total || items.length,
        page: data.pagination?.page || params.page || 1,
        limit: data.pagination?.limit || params.limit || 10,
        totalPages: data.pagination?.totalPages || 1,
      },
    };
  }
  return res.data;
}

export async function fetchCustomerById(id) {
  const res = await api.get(`/admin/customers/${id}`);
  if (res?.data?.success && res.data.data) {
    return mapBackendCustomer(res.data.data);
  }
  return res.data;
}

export function checkCustomerDuplicate(phone, email, excludeId = null) {
  // Let backend handle duplicates or return empty for client pre-check
  return [];
}

export async function createCustomer(customerData, adminName = 'Administrator') {
  const payload = {
    name: customerData.name?.trim(),
    phone: customerData.phone?.trim(),
    email: customerData.email?.trim() || '',
    address: customerData.address?.trim() || '',
    preferredLanguage: customerData.preferredLanguage || 'mr',
    initialNote: customerData.initialNote || '',
  };

  const res = await api.post('/admin/customers', payload);
  if (res?.data?.success && res.data.data) {
    return mapBackendCustomer(res.data.data);
  }
  return res.data;
}

export async function updateCustomer(id, updatedFields, adminName = 'Administrator') {
  const payload = {
    name: updatedFields.name?.trim(),
    phone: updatedFields.phone?.trim(),
    email: updatedFields.email?.trim(),
    address: updatedFields.address?.trim(),
    preferredLanguage: updatedFields.preferredLanguage,
  };

  const res = await api.put(`/admin/customers/${id}`, payload);
  if (res?.data?.success && res.data.data) {
    return mapBackendCustomer(res.data.data);
  }
  return res.data;
}

export async function archiveCustomer(id, adminName = 'Administrator') {
  const res = await api.patch(`/admin/customers/${id}/archive`);
  if (res?.data?.success && res.data.data) {
    return mapBackendCustomer(res.data.data);
  }
  return res.data;
}

export async function restoreCustomer(id, adminName = 'Administrator') {
  const res = await api.patch(`/admin/customers/${id}/restore`);
  if (res?.data?.success && res.data.data) {
    return mapBackendCustomer(res.data.data);
  }
  return res.data;
}

export async function addCustomerNote(id, message, author = 'Administrator') {
  if (!message || !message.trim()) return null;

  const payload = {
    message: message.trim(),
    author,
  };

  const res = await api.post(`/admin/customers/${id}/notes`, payload);
  if (res?.data?.success && res.data.data) {
    return res.data.data;
  }
  return res.data;
}

export default {
  normalizePhone,
  mapBackendCustomer,
  fetchAdminCustomers,
  fetchCustomerById,
  checkCustomerDuplicate,
  createCustomer,
  updateCustomer,
  archiveCustomer,
  restoreCustomer,
  addCustomerNote,
};

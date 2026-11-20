import api from './api';
import { getAllBookingsFromStorage, saveBookingsToStorage } from './bookingAdminService';

const STORAGE_KEY_CUSTOMERS = 'aditi_admin_customers';

/**
 * Normalize phone number (digits only, e.g., 10 digits for Indian mobiles)
 */
export function normalizePhone(rawPhone) {
  if (!rawPhone) return '';
  const digits = String(rawPhone).replace(/\D/g, '');
  // If starts with 91 and length 12, take last 10
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  return digits;
}

/**
 * Generate unique Customer ID: AC-CUST-XXXX
 */
function generateCustomerId() {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `AC-CUST-${rand}`;
}

/**
 * Extract / seed customers from current bookings if customer storage is empty
 */
export function getAllCustomersFromStorage() {
  try {
    let customers = JSON.parse(localStorage.getItem(STORAGE_KEY_CUSTOMERS) || '[]');

    if (!customers || customers.length === 0) {
      // Sync/seed from bookings
      const bookings = getAllBookingsFromStorage();
      const customerMap = new Map();

      bookings.forEach((b) => {
        const phone = b.customer?.mobile || '';
        const norm = normalizePhone(phone);
        const name = b.customer?.name || 'Customer';
        const email = b.customer?.email || '';
        const key = norm || (email ? email.toLowerCase() : name.toLowerCase());

        if (!customerMap.has(key)) {
          const id = b.customerId || generateCustomerId();
          customerMap.set(key, {
            id,
            name,
            phone,
            normalizedPhone: norm,
            email: email || '',
            address: b.event?.venueAddress || b.event?.city || '',
            preferredLanguage: 'mr',
            notes: [],
            isArchived: false,
            createdAt: b.createdAt || new Date().toISOString(),
            updatedAt: b.updatedAt || new Date().toISOString(),
          });
        }
      });

      customers = Array.from(customerMap.values());
      if (customers.length > 0) {
        localStorage.setItem(STORAGE_KEY_CUSTOMERS, JSON.stringify(customers));
      }
    }

    return customers;
  } catch (err) {
    console.error('Error reading customers from storage:', err);
    return [];
  }
}

/**
 * Save customers array to localStorage
 */
export function saveCustomersToStorage(customers) {
  try {
    localStorage.setItem(STORAGE_KEY_CUSTOMERS, JSON.stringify(customers));
  } catch (err) {
    console.error('Error saving customers to storage:', err);
  }
}

/**
 * Calculate customer stats dynamically from booking records
 */
export function enrichCustomerWithBookingStats(customer, allBookings) {
  const normPhone = customer.normalizedPhone || normalizePhone(customer.phone);
  const custEmail = (customer.email || '').toLowerCase().trim();

  // Find bookings matching customer ID or matching phone/email
  const matchedBookings = allBookings.filter((b) => {
    if (b.customerId && b.customerId === customer.id) return true;
    const bNormPhone = normalizePhone(b.customer?.mobile);
    if (normPhone && bNormPhone && normPhone === bNormPhone) return true;
    const bEmail = (b.customer?.email || '').toLowerCase().trim();
    if (custEmail && bEmail && custEmail === bEmail) return true;
    return false;
  });

  // Sort bookings by event date or createdAt descending
  matchedBookings.sort((a, b) => {
    const dateA = new Date(a.event?.date || a.createdAt || 0);
    const dateB = new Date(b.event?.date || b.createdAt || 0);
    return dateB - dateA;
  });

  const totalBookings = matchedBookings.length;
  const lastBooking = matchedBookings[0] || null;
  const lastEventDate = lastBooking?.event?.date || null;

  return {
    ...customer,
    totalBookings,
    lastEventDate,
    lastBookingId: lastBooking?.id || null,
    bookings: matchedBookings,
  };
}

/**
 * Fetch paginated, filtered, searched and sorted customers
 */
export async function fetchAdminCustomers(params = {}) {
  const {
    search = '',
    bookingFilter = 'all', // all, with_bookings, without_bookings
    archiveFilter = 'active', // active, archived, all
    sortBy = 'created_desc', // created_desc, created_asc, name_asc, bookings_desc, last_event_desc
    page = 1,
    limit = 10,
  } = params;

  // Try API first
  try {
    const res = await api.get('/admin/customers', { params });
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Fallback to storage
  }

  const allCustomers = getAllCustomersFromStorage();
  const allBookings = getAllBookingsFromStorage();

  // Enrich with live booking stats
  let records = allCustomers.map((c) => enrichCustomerWithBookingStats(c, allBookings));

  // 1. Archive filter
  if (archiveFilter === 'active') {
    records = records.filter((c) => !c.isArchived);
  } else if (archiveFilter === 'archived') {
    records = records.filter((c) => !!c.isArchived);
  }

  // 2. Booking status filter
  if (bookingFilter === 'with_bookings') {
    records = records.filter((c) => c.totalBookings > 0);
  } else if (bookingFilter === 'without_bookings') {
    records = records.filter((c) => c.totalBookings === 0);
  }

  // 3. Search (name, phone, email)
  const trimmedSearch = search.trim().toLowerCase();
  if (trimmedSearch) {
    const cleanSearchPhone = trimmedSearch.replace(/\D/g, '');
    records = records.filter((c) => {
      const matchName = (c.name || '').toLowerCase().includes(trimmedSearch);
      const matchEmail = (c.email || '').toLowerCase().includes(trimmedSearch);
      const matchPhone = cleanSearchPhone && (c.normalizedPhone || '').includes(cleanSearchPhone);
      const rawPhoneMatch = (c.phone || '').includes(trimmedSearch);
      return matchName || matchEmail || matchPhone || rawPhoneMatch;
    });
  }

  // 4. Sorting
  records.sort((a, b) => {
    if (sortBy === 'name_asc') {
      return (a.name || '').localeCompare(b.name || '');
    }
    if (sortBy === 'created_asc') {
      return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    }
    if (sortBy === 'bookings_desc') {
      return b.totalBookings - a.totalBookings;
    }
    if (sortBy === 'last_event_desc') {
      const timeA = a.lastEventDate ? new Date(a.lastEventDate).getTime() : 0;
      const timeB = b.lastEventDate ? new Date(b.lastEventDate).getTime() : 0;
      return timeB - timeA;
    }
    // Default: created_desc
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });

  // 5. Pagination
  const total = records.length;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;
  const totalPages = Math.ceil(total / limitNum) || 1;
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedItems = records.slice(startIndex, startIndex + limitNum);

  return {
    items: paginatedItems,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
    },
    counts: {
      total: allCustomers.length,
      active: allCustomers.filter((c) => !c.isArchived).length,
      archived: allCustomers.filter((c) => !!c.isArchived).length,
    },
  };
}

/**
 * Fetch a single customer profile with booking history
 */
export async function fetchCustomerById(id) {
  try {
    const res = await api.get(`/admin/customers/${id}`);
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Fallback to storage
  }

  const allCustomers = getAllCustomersFromStorage();
  const customer = allCustomers.find((c) => c.id === id);

  if (!customer) {
    throw new Error(`Customer with ID ${id} not found.`);
  }

  const allBookings = getAllBookingsFromStorage();
  return enrichCustomerWithBookingStats(customer, allBookings);
}

/**
 * Check for duplicate customer based on normalized phone and/or email
 */
export function checkCustomerDuplicate(phone, email, excludeId = null) {
  const normPhone = normalizePhone(phone);
  const cleanEmail = (email || '').trim().toLowerCase();

  const all = getAllCustomersFromStorage();
  const matches = all.filter((c) => {
    if (excludeId && c.id === excludeId) return false;
    const samePhone = normPhone && c.normalizedPhone && c.normalizedPhone === normPhone;
    const sameEmail = cleanEmail && c.email && c.email.trim().toLowerCase() === cleanEmail;
    return samePhone || sameEmail;
  });

  return matches;
}

/**
 * Create a new customer
 */
export async function createCustomer(customerData, adminName = 'Administrator') {
  const now = new Date().toISOString();
  const normPhone = normalizePhone(customerData.phone);
  const newId = generateCustomerId();

  const notesList = [];
  if (customerData.initialNote && customerData.initialNote.trim()) {
    notesList.push({
      id: `n-${Date.now()}`,
      message: customerData.initialNote.trim(),
      author: adminName,
      createdAt: now,
    });
  }

  const newCustomer = {
    id: newId,
    name: customerData.name.trim(),
    phone: customerData.phone.trim(),
    normalizedPhone: normPhone,
    email: (customerData.email || '').trim(),
    address: (customerData.address || '').trim(),
    preferredLanguage: customerData.preferredLanguage || 'mr',
    notes: notesList,
    isArchived: false,
    createdAt: now,
    updatedAt: now,
  };

  try {
    const res = await api.post('/admin/customers', newCustomer);
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Local storage fallback
  }

  const all = getAllCustomersFromStorage();
  all.unshift(newCustomer);
  saveCustomersToStorage(all);

  return newCustomer;
}

/**
 * Update an existing customer's details
 */
export async function updateCustomer(id, updatedFields, adminName = 'Administrator') {
  const all = getAllCustomersFromStorage();
  const index = all.findIndex((c) => c.id === id);

  if (index === -1) {
    throw new Error(`Customer with ID ${id} not found.`);
  }

  const now = new Date().toISOString();
  const prev = all[index];
  const normPhone = updatedFields.phone ? normalizePhone(updatedFields.phone) : prev.normalizedPhone;

  const updatedCustomer = {
    ...prev,
    ...updatedFields,
    normalizedPhone: normPhone,
    updatedAt: now,
  };

  try {
    const res = await api.put(`/admin/customers/${id}`, updatedCustomer);
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Local storage
  }

  all[index] = updatedCustomer;
  saveCustomersToStorage(all);

  return updatedCustomer;
}

/**
 * Archive customer (soft delete)
 */
export async function archiveCustomer(id, adminName = 'Administrator') {
  const all = getAllCustomersFromStorage();
  const index = all.findIndex((c) => c.id === id);

  if (index === -1) {
    throw new Error(`Customer with ID ${id} not found.`);
  }

  const now = new Date().toISOString();
  all[index].isArchived = true;
  all[index].updatedAt = now;

  try {
    await api.patch(`/admin/customers/${id}/archive`);
  } catch {
    // Local storage
  }

  saveCustomersToStorage(all);
  return all[index];
}

/**
 * Restore archived customer
 */
export async function restoreCustomer(id, adminName = 'Administrator') {
  const all = getAllCustomersFromStorage();
  const index = all.findIndex((c) => c.id === id);

  if (index === -1) {
    throw new Error(`Customer with ID ${id} not found.`);
  }

  const now = new Date().toISOString();
  all[index].isArchived = false;
  all[index].updatedAt = now;

  try {
    await api.patch(`/admin/customers/${id}/restore`);
  } catch {
    // Local storage
  }

  saveCustomersToStorage(all);
  return all[index];
}

/**
 * Add internal note to a customer
 */
export async function addCustomerNote(id, message, author = 'Administrator') {
  if (!message || !message.trim()) return null;

  const all = getAllCustomersFromStorage();
  const index = all.findIndex((c) => c.id === id);

  if (index === -1) {
    throw new Error(`Customer with ID ${id} not found.`);
  }

  const now = new Date().toISOString();
  const newNote = {
    id: `cn-${Date.now()}`,
    message: message.trim(),
    author,
    createdAt: now,
  };

  all[index].notes = [newNote, ...(all[index].notes || [])];
  all[index].updatedAt = now;

  try {
    await api.post(`/admin/customers/${id}/notes`, newNote);
  } catch {
    // Local storage
  }

  saveCustomersToStorage(all);
  return newNote;
}

export default {
  normalizePhone,
  getAllCustomersFromStorage,
  saveCustomersToStorage,
  enrichCustomerWithBookingStats,
  fetchAdminCustomers,
  fetchCustomerById,
  checkCustomerDuplicate,
  createCustomer,
  updateCustomer,
  archiveCustomer,
  restoreCustomer,
  addCustomerNote,
};

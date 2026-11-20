import api from './api';

export const ENQUIRY_STATUSES = {
  new: {
    id: 'new',
    label: 'New',
    badgeClass: 'bg-warning-subtle text-warning-emphasis border border-warning',
    icon: 'bi-bell-fill',
  },
  contacted: {
    id: 'contacted',
    label: 'Contacted',
    badgeClass: 'bg-info-subtle text-info-emphasis border border-info',
    icon: 'bi-telephone-fill',
  },
  quotation_sent: {
    id: 'quotation_sent',
    label: 'Quotation Sent',
    badgeClass: 'bg-primary-subtle text-primary-emphasis border border-primary',
    icon: 'bi-file-earmark-text-fill',
  },
  confirmed: {
    id: 'confirmed',
    label: 'Confirmed',
    badgeClass: 'bg-success-subtle text-success-emphasis border border-success',
    icon: 'bi-check-circle-fill',
  },
  completed: {
    id: 'completed',
    label: 'Event Completed',
    badgeClass: 'bg-secondary-subtle text-secondary-emphasis border border-secondary',
    icon: 'bi-calendar-check-fill',
  },
  cancelled: {
    id: 'cancelled',
    label: 'Cancelled',
    badgeClass: 'bg-danger-subtle text-danger-emphasis border border-danger',
    icon: 'bi-x-circle-fill',
  },
};

/**
 * Fetch all local enquiries from both contact and booking local storages
 */
export function getLocalEnquiries() {
  try {
    const contactEnquiries = JSON.parse(
      localStorage.getItem('aditi_contact_enquiries') || '[]'
    );
    const bookingEnquiries = JSON.parse(
      localStorage.getItem('aditi_enquiries') || '[]'
    );

    // Combine and deduplicate by reference or submitted timestamp
    const all = [...contactEnquiries, ...bookingEnquiries];
    const seen = new Set();
    const unique = [];

    for (const item of all) {
      const key = item.enquiryNumber || `${item.mobile}-${item.submittedAt}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    }

    // Sort newest first
    unique.sort((a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0));
    return unique;
  } catch {
    return [];
  }
}

/**
 * Save updated enquiry back to local storage
 */
export function saveLocalEnquiry(updatedEnquiry) {
  try {
    const isContact = updatedEnquiry.enquiryNumber?.startsWith('AC-CNT-');
    const storageKey = isContact ? 'aditi_contact_enquiries' : 'aditi_enquiries';

    const list = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const index = list.findIndex(
      (e) => e.enquiryNumber === updatedEnquiry.enquiryNumber
    );

    if (index !== -1) {
      list[index] = { ...list[index], ...updatedEnquiry };
      localStorage.setItem(storageKey, JSON.stringify(list));
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Calculate dashboard summary, status breakdown, recent list, and upcoming events
 */
export function computeDashboardData(enquiries) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let newCount = 0;
  let contactedCount = 0;
  let quotationCount = 0;
  let confirmedCount = 0;
  let completedCount = 0;
  let cancelledCount = 0;

  const upcomingEvents = [];

  for (const item of enquiries) {
    const st = item.status || 'new';

    if (st === 'new') newCount++;
    else if (st === 'contacted') contactedCount++;
    else if (st === 'quotation_sent' || st === 'quotation-sent') quotationCount++;
    else if (st === 'confirmed') {
      confirmedCount++;

      // Check if confirmed event is in the future
      if (item.eventDate && !item.dateNotDecided) {
        const evDate = new Date(item.eventDate);
        if (evDate >= today) {
          upcomingEvents.push(item);
        }
      }
    } else if (st === 'completed') completedCount++;
    else if (st === 'cancelled') cancelledCount++;
    else newCount++;
  }

  // Sort upcoming events by nearest event date
  upcomingEvents.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

  const total = enquiries.length;

  return {
    summary: {
      totalEnquiries: total,
      newEnquiries: newCount,
      contactedEnquiries: contactedCount,
      quotationSent: quotationCount,
      confirmedEvents: confirmedCount,
      upcomingEvents: upcomingEvents.length,
    },
    statusBreakdown: [
      { id: 'new', label: 'New', count: newCount, percent: total ? Math.round((newCount / total) * 100) : 0, color: '#ffc107' },
      { id: 'contacted', label: 'Contacted', count: contactedCount, percent: total ? Math.round((contactedCount / total) * 100) : 0, color: '#0dcaf0' },
      { id: 'quotation_sent', label: 'Quotation Sent', count: quotationCount, percent: total ? Math.round((quotationCount / total) * 100) : 0, color: '#0d6efd' },
      { id: 'confirmed', label: 'Confirmed', count: confirmedCount, percent: total ? Math.round((confirmedCount / total) * 100) : 0, color: '#198754' },
      { id: 'completed', label: 'Event Completed', count: completedCount, percent: total ? Math.round((completedCount / total) * 100) : 0, color: '#6c757d' },
      { id: 'cancelled', label: 'Cancelled', count: cancelledCount, percent: total ? Math.round((cancelledCount / total) * 100) : 0, color: '#dc3545' },
    ],
    recentEnquiries: enquiries.slice(0, 6),
    upcomingEventsList: upcomingEvents.slice(0, 5),
  };
}

/**
 * Fetch dashboard overview data with backend and local fallback
 */
export async function fetchDashboardOverview() {
  try {
    const res = await api.get('/admin/dashboard/overview');
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // If backend is offline or endpoint not yet configured, use local stored records
  }

  const enquiries = getLocalEnquiries();
  return computeDashboardData(enquiries);
}

/**
 * Update enquiry status
 */
export async function updateEnquiryStatus(enquiryNumber, newStatus, internalNotes = '') {
  try {
    const res = await api.patch(`/admin/enquiries/${enquiryNumber}/status`, {
      status: newStatus,
      internalNotes,
    });
    if (res?.data?.success) {
      return res.data;
    }
  } catch {
    // Fallback to local storage update
  }

  saveLocalEnquiry({
    enquiryNumber,
    status: newStatus,
    internalNotes,
    updatedAt: new Date().toISOString(),
  });

  return { success: true };
}

export default {
  ENQUIRY_STATUSES,
  getLocalEnquiries,
  saveLocalEnquiry,
  computeDashboardData,
  fetchDashboardOverview,
  updateEnquiryStatus,
};

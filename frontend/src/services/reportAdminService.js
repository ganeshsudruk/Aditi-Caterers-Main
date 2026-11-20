import api from './api';

function escapeCsvField(val) {
  if (val === null || val === undefined) return '""';
  let str = String(val).trim();
  // CSV Injection prevention (escape leading =, +, -, @, \t, \r)
  if (/^[=+\-@\t\r]/.test(str)) {
    str = "'" + str;
  }
  return `"${str.replace(/"/g, '""')}"`;
}

export function exportToCsv(filename, headers, rows) {
  // UTF-8 BOM for perfect Marathi / Unicode excel compatibility
  const BOM = '\uFEFF';
  const headerLine = headers.map(h => escapeCsvField(h.label)).join(',');
  const rowLines = rows.map(row => {
    return headers.map(h => escapeCsvField(h.getter ? h.getter(row) : row[h.key])).join(',');
  });

  const csvContent = BOM + [headerLine, ...rowLines].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const reportAdminService = {
  async getOverviewReport(params = {}) {
    try {
      const res = await api.get('/admin/reports/overview', { params });
      if (res.data?.data) return res.data.data;
    } catch {
      // Fallback
    }

    // Read stored items from local storage
    const bookings = JSON.parse(localStorage.getItem('aditi_admin_bookings') || '[]');
    const quotations = JSON.parse(localStorage.getItem('aditi_admin_quotations') || '[]');
    const customers = JSON.parse(localStorage.getItem('aditi_admin_customers') || '[]');
    const reviews = JSON.parse(localStorage.getItem('aditi_admin_reviews') || '[]');
    const awards = JSON.parse(localStorage.getItem('aditi_admin_awards') || '[]');
    const gallery = JSON.parse(localStorage.getItem('aditi_admin_gallery') || '[]');

    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
    const issuedQuotations = quotations.filter(q => q.status === 'issued').length;
    const acceptedQuotations = quotations.filter(q => q.status === 'accepted').length;
    const acceptedQuotedValue = quotations
      .filter(q => q.status === 'accepted')
      .reduce((sum, q) => sum + (Number(q.pricing?.grandTotal) || 0), 0);

    return {
      summary: {
        totalEnquiries: bookings.filter(b => b.isEnquiry).length,
        totalBookings: bookings.filter(b => !b.isEnquiry).length,
        confirmedBookings,
        cancelledBookings,
        totalQuotations: quotations.length,
        issuedQuotations,
        acceptedQuotations,
        acceptedQuotedValue,
        totalCustomers: customers.length,
        totalReviews: reviews.filter(r => r.status === 'published').length,
        totalAwards: awards.filter(a => a.status === 'published').length,
        totalGallery: gallery.length,
      },
      filters: params,
      generatedAt: new Date().toISOString(),
    };
  },

  async getQuotationReport(params = {}) {
    try {
      const res = await api.get('/admin/reports/quotations', { params });
      if (res.data?.data) return res.data.data;
    } catch {
      // Fallback
    }

    let list = JSON.parse(localStorage.getItem('aditi_admin_quotations') || '[]');
    if (params.status && params.status !== 'all') {
      list = list.filter(q => q.status === params.status);
    }
    if (params.serviceType && params.serviceType !== 'all') {
      list = list.filter(q => q.serviceType === params.serviceType);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(item =>
        item.quotationNumber?.toLowerCase().includes(q) ||
        item.customer?.name?.toLowerCase().includes(q)
      );
    }

    const acceptedVal = list
      .filter(q => q.status === 'accepted')
      .reduce((sum, q) => sum + (Number(q.pricing?.grandTotal) || 0), 0);

    return {
      summary: {
        total: list.length,
        draft: list.filter(q => q.status === 'draft').length,
        issued: list.filter(q => q.status === 'issued').length,
        accepted: list.filter(q => q.status === 'accepted').length,
        rejected: list.filter(q => q.status === 'rejected').length,
        revision_requested: list.filter(q => q.status === 'revision_requested').length,
        expired: list.filter(q => q.status === 'expired').length,
        cancelled: list.filter(q => q.status === 'cancelled').length,
        acceptedQuotedValue: acceptedVal,
      },
      records: list,
      pagination: {
        page: 1,
        limit: list.length || 25,
        totalRecords: list.length,
        totalPages: 1
      },
      filters: params,
      generatedAt: new Date().toISOString()
    };
  },

  async getBookingReport(params = {}) {
    try {
      const res = await api.get('/admin/reports/bookings', { params });
      if (res.data?.data) return res.data.data;
    } catch {
      // Fallback
    }

    let list = JSON.parse(localStorage.getItem('aditi_admin_bookings') || '[]');
    list = list.filter(b => !b.isEnquiry);

    if (params.status && params.status !== 'all') {
      list = list.filter(b => b.status === params.status);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(b =>
        (b.customerName || b.customerSnapshot?.name || '').toLowerCase().includes(q) ||
        (b.bookingReference || b.id || '').toLowerCase().includes(q)
      );
    }

    return {
      summary: {
        total: list.length,
        pending_review: list.filter(b => b.status === 'pending_review' || b.status === 'new').length,
        contacted: list.filter(b => b.status === 'contacted').length,
        quotation_sent: list.filter(b => b.status === 'quotation_sent').length,
        confirmed: list.filter(b => b.status === 'confirmed').length,
        completed: list.filter(b => b.status === 'completed').length,
        cancelled: list.filter(b => b.status === 'cancelled').length,
      },
      records: list,
      pagination: {
        page: 1,
        limit: list.length || 25,
        totalRecords: list.length,
        totalPages: 1
      },
      filters: params,
      generatedAt: new Date().toISOString()
    };
  },

  async getCustomerReport(params = {}) {
    try {
      const res = await api.get('/admin/reports/customers', { params });
      if (res.data?.data) return res.data.data;
    } catch {
      // Fallback
    }

    let list = JSON.parse(localStorage.getItem('aditi_admin_customers') || '[]');
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(c =>
        (c.name || '').toLowerCase().includes(q) ||
        (c.phone || '').includes(q) ||
        (c.email || '').toLowerCase().includes(q)
      );
    }

    return {
      summary: {
        total: list.length,
      },
      records: list,
      pagination: {
        page: 1,
        limit: list.length || 25,
        totalRecords: list.length,
        totalPages: 1
      },
      filters: params,
      generatedAt: new Date().toISOString()
    };
  },

  async getContentReport() {
    try {
      const res = await api.get('/admin/reports/content');
      if (res.data?.data) return res.data.data;
    } catch {
      // Fallback
    }

    const reviews = JSON.parse(localStorage.getItem('aditi_admin_reviews') || '[]');
    const awards = JSON.parse(localStorage.getItem('aditi_admin_awards') || '[]');
    const gallery = JSON.parse(localStorage.getItem('aditi_admin_gallery') || '[]');

    return {
      galleryCount: gallery.length,
      awardsCount: awards.length,
      reviewsCount: reviews.length,
      activeServices: 6,
      activePackages: 4,
      activeMenuItems: 24,
      generatedAt: new Date().toISOString()
    };
  }
};

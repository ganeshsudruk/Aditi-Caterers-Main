import api from './api';

export const QUOTATION_STATUSES = [
  { id: 'draft', en: 'Draft', mr: 'मसुदा', badge: 'secondary' },
  { id: 'issued', en: 'Issued', mr: 'जारी केले', badge: 'primary' },
  { id: 'accepted', en: 'Accepted', mr: 'स्वीकृत', badge: 'success' },
  { id: 'rejected', en: 'Rejected', mr: 'नाकारले', badge: 'danger' },
  { id: 'revision_requested', en: 'Revision Requested', mr: 'दुरुस्तीची विनंती', badge: 'warning' },
  { id: 'expired', en: 'Expired', mr: 'कालबाह्य', badge: 'dark' },
  { id: 'cancelled', en: 'Cancelled', mr: 'रद्द केले', badge: 'secondary' },
  { id: 'superseded', en: 'Superseded', mr: 'पुनरावृत्तीने बदललेले', badge: 'info' },
];

export const SERVICE_TYPES = [
  {
    id: 'with_material',
    en: 'With Material (Full Catering)',
    mr: 'साहित्यासह (संपूर्ण केटरिंग सेवा)',
    description: {
      en: 'Includes groceries, vegetables, dairy, disposable dinnerware, service staff, buffet setup, and live counters.',
      mr: 'किराणा, भाजीपाला, दुग्धजन्य पदार्थ, डिस्पोजेबल भांडी, वाढपी कामगार आणि बुफे मांडणी समाविष्ट.'
    }
  },
  {
    id: 'without_material',
    en: 'Without Material (Labor / Preparation Only)',
    mr: 'साहित्याशिवाय (केवळ बनवणे / वाढणे श्रम)',
    description: {
      en: 'Customer provides all raw materials & groceries; Aditi Caterers provides master chefs, cooking tools, and service team.',
      mr: 'कच्चा माल व किराणा ग्राहक पुरवेल; आदिती केटरर्स कुशल आचारी, स्वयंपाकाची भांडी आणि वाढपी पुरवेल.'
    }
  }
];

export const DEFAULT_TERMS = {
  en: `1. 50% advance payment required upon quotation confirmation.\n2. Balance amount must be settled on or before the event date.\n3. Final guest count must be confirmed at least 48 hours prior to the event.\n4. Additional guests will be charged pro-rata.\n5. Any damage to caterer's equipment or utensils will be charged at actual cost.`,
  mr: `१. कोटेशन निश्चित झाल्यावर ५०% आगाऊ रक्कम भरणे आवश्यक आहे.\n२. उर्वरित रक्कम कार्यक्रमाच्या दिवशी किंवा त्यापूर्वी अदा करावी लागेल.\n३. पाहुण्यांची अंतिम संख्या कार्यक्रमाच्या किमान ४८ तास आधी कळवणे आवश्यक आहे.\n४. अतिरिक्त उपस्थित पाहुण्यांचे शुल्क प्रमाणानुसार आकारले जाईल.\n५. केटरर्सच्या साहित्याचे किंवा भांड्यांचे काही नुकसान झाल्यास प्रत्यक्ष खर्च आकारला जाईल.`
};

function calculatePricing({ lineItems = [], discount = {}, additionalCharges = [], tax = {}, guestCount = 1 }) {
  const subtotal = lineItems.reduce((sum, item) => {
    const qty = Number(item.quantity) || 0;
    const rate = Number(item.rate) || 0;
    return sum + (qty * rate);
  }, 0);

  let discountAmount = 0;
  if (discount.type === 'percentage') {
    const pct = Math.max(0, Math.min(100, Number(discount.rate) || 0));
    discountAmount = Math.round((subtotal * pct) / 100);
  } else if (discount.type === 'fixed') {
    discountAmount = Math.min(subtotal, Math.max(0, Number(discount.amount) || 0));
  }

  const additionalChargesTotal = (additionalCharges || []).reduce(
    (sum, c) => sum + (Number(c.amount) || 0),
    0
  );

  const taxableBase = Math.max(0, subtotal - discountAmount + additionalChargesTotal);
  let taxAmount = 0;
  let cgst = 0;
  let sgst = 0;

  if (tax?.isTaxable) {
    const rate = Number(tax.gstRate) || 5;
    taxAmount = Math.round((taxableBase * rate) / 100);
    cgst = Number((taxAmount / 2).toFixed(2));
    sgst = Number((taxAmount / 2).toFixed(2));
  }

  const grandTotal = taxableBase + taxAmount;
  const count = Number(guestCount) > 0 ? Number(guestCount) : 1;
  const pricePerPerson = Number((grandTotal / count).toFixed(2));

  return {
    subtotal,
    discount: {
      ...discount,
      amount: discountAmount
    },
    additionalChargesTotal,
    tax: {
      ...tax,
      cgst,
      sgst,
      taxAmount
    },
    grandTotal,
    pricePerPerson
  };
}

function mapBackendQuotation(item) {
  if (!item) return item;
  return {
    ...item,
    id: item._id || item.id,
  };
}

export const quotationAdminService = {
  calculatePricing,

  async getQuotations(params = {}) {
    const res = await api.get('/admin/quotations', { params });
    if (res.data?.data) {
      const list = Array.isArray(res.data.data) ? res.data.data : (res.data.data.items || []);
      return {
        ...res.data,
        data: list.map(mapBackendQuotation),
      };
    }
    return { success: true, data: [], count: 0, total: 0 };
  },

  async getQuotationById(id) {
    const res = await api.get(`/admin/quotations/${id}`);
    if (res.data?.data) {
      return mapBackendQuotation(res.data.data);
    }
    throw new Error('Quotation not found');
  },

  async createQuotation(data) {
    const res = await api.post('/admin/quotations', data);
    if (res.data?.data) {
      return mapBackendQuotation(res.data.data);
    }
    throw new Error(res.data?.message || 'Failed to create quotation');
  },

  async updateQuotation(id, data) {
    const res = await api.put(`/admin/quotations/${id}`, data);
    if (res.data?.data) {
      return mapBackendQuotation(res.data.data);
    }
    throw new Error(res.data?.message || 'Failed to update quotation');
  },

  async issueQuotation(id, payload = {}) {
    const res = await api.patch(`/admin/quotations/${id}/issue`, payload);
    if (res.data?.data) {
      return mapBackendQuotation(res.data.data);
    }
    throw new Error(res.data?.message || 'Failed to issue quotation');
  },

  async createRevision(id, payload = {}) {
    const res = await api.post(`/admin/quotations/${id}/revision`, payload);
    if (res.data?.data) {
      return mapBackendQuotation(res.data.data);
    }
    throw new Error(res.data?.message || 'Failed to create revision');
  },

  async updateStatus(id, status, notes = '') {
    const res = await api.patch(`/admin/quotations/${id}/status`, { status, notes });
    if (res.data?.data) {
      return mapBackendQuotation(res.data.data);
    }
    throw new Error(res.data?.message || 'Failed to update quotation status');
  },

  async recordCustomerResponse(id, { status, notes }) {
    const res = await api.post(`/admin/quotations/${id}/response`, { status, notes });
    if (res.data?.data) {
      return mapBackendQuotation(res.data.data);
    }
    throw new Error(res.data?.message || 'Failed to record response');
  },

  async deleteQuotation(id) {
    const res = await api.delete(`/admin/quotations/${id}`);
    if (res.data?.success) {
      return true;
    }
    throw new Error(res.data?.message || 'Failed to delete quotation');
  }
};

export default quotationAdminService;

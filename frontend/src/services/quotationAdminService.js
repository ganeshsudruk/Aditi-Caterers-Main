import api from './api';

const STORAGE_KEY = 'aditi_admin_quotations';

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

export const SEED_QUOTATIONS = [
  {
    id: 'qtn-001',
    quotationNumber: 'AC-QTN-2026-0001',
    revision: 0,
    parentQuotation: null,
    customer: {
      id: 'cust-101',
      name: 'Ramesh Kulkarni',
      phone: '+91 98220 12345',
      email: 'ramesh.kulkarni@example.com',
      address: 'Plot 42, Mayur Colony, Kothrud, Pune - 411038'
    },
    eventDetails: {
      eventType: 'Wedding Reception (लग्न सोहळा)',
      eventDate: '2026-12-15',
      eventTime: '19:00',
      guestCount: 350,
      venue: 'Siddhi Banquet Hall, DP Road, Pune'
    },
    serviceType: 'with_material',
    documentLanguage: 'en',
    lineItems: [
      {
        id: 'li-1',
        name: 'Royal Maharashtrian Thali Buffet',
        description: 'Puran Poli, Katachi Amti, Kaju Kari, Batata Sukhi Bhaji, Jeera Rice, Masale Bhat, Gulab Jamun, Mattha, Papad, Chutney, Koshimbir',
        category: 'Buffet Package',
        unit: 'Plate',
        quantity: 350,
        rate: 550,
        amount: 192500
      },
      {
        id: 'li-2',
        name: 'Welcome Drinks & Mocktail Counter',
        description: 'Kokum Sarbat, Mango Panna, Fresh Fruit Punch with bartender display',
        category: 'Beverage',
        unit: 'Counter',
        quantity: 1,
        rate: 15000,
        amount: 15000
      },
      {
        id: 'li-3',
        name: 'Premium Crockery & Uniformed Waiters',
        description: 'Fine ceramic dining sets, uniformed captains & serving staff for 4 hours',
        category: 'Service',
        unit: 'Setup',
        quantity: 1,
        rate: 18000,
        amount: 18000
      }
    ],
    pricing: {
      subtotal: 225500,
      discount: {
        type: 'fixed',
        rate: 0,
        amount: 10500,
        reason: 'Festive Season Special Booking Discount'
      },
      additionalCharges: [
        { name: 'Transport & Fuel (Pune Outer Venue)', amount: 3500 },
        { name: 'Round-the-clock Live Kitchen Setup', amount: 4500 }
      ],
      tax: {
        isTaxable: true,
        gstRate: 5,
        cgst: 5575,
        sgst: 5575,
        taxAmount: 11150
      },
      grandTotal: 234150,
      pricePerPerson: 669
    },
    termsAndConditions: DEFAULT_TERMS.en,
    notes: 'Bride side request: Less spicy preparation for amti and extra desi ghee for puran poli.',
    status: 'issued',
    issuedDate: '2026-11-18T10:30:00.000Z',
    validUntilDate: '2026-11-28',
    customerResponse: {
      status: 'pending',
      responseDate: null,
      notes: ''
    },
    createdAt: '2026-11-18T09:15:00.000Z',
    updatedAt: '2026-11-18T10:30:00.000Z'
  },
  {
    id: 'qtn-002',
    quotationNumber: 'AC-QTN-2026-0002',
    revision: 0,
    parentQuotation: null,
    customer: {
      id: 'cust-102',
      name: 'Sunita Patil',
      phone: '+91 94230 98765',
      email: 'sunita.patil@example.com',
      address: 'Flat 304, Green Acres, Viman Nagar, Pune'
    },
    eventDetails: {
      eventType: 'House Warming / Vastu Shanti (वास्तुशांती)',
      eventDate: '2026-12-05',
      eventTime: '12:30',
      guestCount: 120,
      venue: 'Residence Garden Terrace'
    },
    serviceType: 'without_material',
    documentLanguage: 'mr',
    lineItems: [
      {
        id: 'li-201',
        name: 'अन्न बनवणे आणि वाढणे मजूर खर्च (Labor Only)',
        description: 'मुख्य आचारी आणि ४ मदतनीस. सर्व स्वयंपाक जागेवर ताजा तयार केला जाईल.',
        category: 'श्रम सेवा',
        unit: 'व्यक्ती',
        quantity: 120,
        rate: 160,
        amount: 19200
      },
      {
        id: 'li-202',
        name: 'मोठे स्वयंपाक भांडी आणि शेगडी भाडे',
        description: 'मोठे पातेले, गॅस भट्टी, झाऱ्या, अन्न साठवणूक कुंड्यांचा संच',
        category: 'भांडी भाडे',
        unit: 'संच',
        quantity: 1,
        rate: 4500,
        amount: 4500
      }
    ],
    pricing: {
      subtotal: 23700,
      discount: {
        type: 'fixed',
        rate: 0,
        amount: 1200,
        reason: 'शेजारी आणि नियमित ग्राहक सवलत'
      },
      additionalCharges: [
        { name: 'वाहतूक खर्च (भांडी ने-आण)', amount: 1500 }
      ],
      tax: {
        isTaxable: false,
        gstRate: 0,
        cgst: 0,
        sgst: 0,
        taxAmount: 0
      },
      grandTotal: 24000,
      pricePerPerson: 200
    },
    termsAndConditions: DEFAULT_TERMS.mr,
    notes: 'ग्राहकाने किराणा यादीनुसार सर्व सामान आदल्या दिवशी संध्याकाळपर्यंत उपलब्ध करून द्यावे.',
    status: 'accepted',
    issuedDate: '2026-11-15T11:00:00.000Z',
    validUntilDate: '2026-11-25',
    customerResponse: {
      status: 'accepted',
      responseDate: '2026-11-16T15:20:00.000Z',
      notes: 'Customer accepted and confirmed 120 plates for vastu shanti.'
    },
    createdAt: '2026-11-15T10:00:00.000Z',
    updatedAt: '2026-11-16T15:20:00.000Z'
  },
  {
    id: 'qtn-003',
    quotationNumber: 'AC-QTN-2026-0003',
    revision: 0,
    parentQuotation: null,
    customer: {
      id: 'cust-103',
      name: 'Anand Deshmukh',
      phone: '+91 98901 44332',
      email: 'anand.deshmukh@corpsol.in',
      address: 'Magarpatta Cybercity, Tower 7, Hadapsar, Pune'
    },
    eventDetails: {
      eventType: 'Corporate Annual Gala Dinner',
      eventDate: '2026-12-22',
      eventTime: '18:30',
      guestCount: 200,
      venue: 'Hyatt Regency Lawns, Pune'
    },
    serviceType: 'with_material',
    documentLanguage: 'en',
    lineItems: [
      {
        id: 'li-301',
        name: 'Deluxe Fusion Corporate Buffet',
        description: '3 Starters, Paneer Lababdar, Veg Kolhapuri, Dal Makhani, Assorted Breads, Biryani, Gulab Jamun with Ice Cream',
        category: 'Buffet',
        unit: 'Person',
        quantity: 200,
        rate: 680,
        amount: 136000
      },
      {
        id: 'li-302',
        name: 'Chaat Live Stall (Pani Puri, Sev Puri, Aloo Tikki)',
        description: 'Live interactive snack counter for 2 hours during networking',
        category: 'Live Counter',
        unit: 'Counter',
        quantity: 1,
        rate: 14000,
        amount: 14000
      }
    ],
    pricing: {
      subtotal: 150000,
      discount: {
        type: 'percentage',
        rate: 5,
        amount: 7500,
        reason: 'Corporate Annual Contract'
      },
      additionalCharges: [
        { name: 'Hotel Lawn Cleaning & Service Surcharge', amount: 5000 }
      ],
      tax: {
        isTaxable: true,
        gstRate: 5,
        cgst: 3687.5,
        sgst: 3687.5,
        taxAmount: 7375
      },
      grandTotal: 154875,
      pricePerPerson: 774.38
    },
    termsAndConditions: DEFAULT_TERMS.en,
    notes: 'Special request for corporate GST invoicing and presentation tables with black linen.',
    status: 'draft',
    issuedDate: null,
    validUntilDate: '2026-12-05',
    customerResponse: {
      status: 'pending',
      responseDate: null,
      notes: ''
    },
    createdAt: '2026-11-19T14:00:00.000Z',
    updatedAt: '2026-11-19T14:00:00.000Z'
  }
];

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

function getLocalQuotations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_QUOTATIONS));
      return SEED_QUOTATIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_QUOTATIONS;
  } catch (err) {
    console.error('Error reading quotations from storage:', err);
    return SEED_QUOTATIONS;
  }
}

function setLocalQuotations(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Error saving quotations to storage:', err);
  }
}

export const quotationAdminService = {
  calculatePricing,

  async getQuotations(params = {}) {
    try {
      const res = await api.get('/admin/quotations', { params });
      if (res.data?.data) {
        return res.data;
      }
    } catch {
      // Fallback to local storage
    }

    let items = getLocalQuotations();

    if (params.search) {
      const q = params.search.trim().toLowerCase();
      items = items.filter(i =>
        i.quotationNumber?.toLowerCase().includes(q) ||
        i.customer?.name?.toLowerCase().includes(q) ||
        i.customer?.phone?.includes(q) ||
        i.eventDetails?.eventType?.toLowerCase().includes(q) ||
        i.eventDetails?.venue?.toLowerCase().includes(q)
      );
    }

    if (params.status && params.status !== 'all') {
      items = items.filter(i => i.status === params.status);
    }

    if (params.serviceType && params.serviceType !== 'all') {
      items = items.filter(i => i.serviceType === params.serviceType);
    }

    if (params.sort) {
      if (params.sort === 'newest') {
        items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (params.sort === 'oldest') {
        items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (params.sort === 'amount_high') {
        items.sort((a, b) => (b.pricing?.grandTotal || 0) - (a.pricing?.grandTotal || 0));
      } else if (params.sort === 'amount_low') {
        items.sort((a, b) => (a.pricing?.grandTotal || 0) - (b.pricing?.grandTotal || 0));
      } else if (params.sort === 'event_date') {
        items.sort((a, b) => new Date(a.eventDetails?.eventDate || 0) - new Date(b.eventDetails?.eventDate || 0));
      }
    } else {
      items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return {
      success: true,
      data: items,
      count: items.length,
      total: items.length
    };
  },

  async getQuotationById(id) {
    try {
      const res = await api.get(`/admin/quotations/${id}`);
      if (res.data?.data) {
        return res.data.data;
      }
    } catch {
      // Fallback
    }

    const items = getLocalQuotations();
    const found = items.find(i => (i.id === id || i._id === id));
    if (!found) throw new Error('Quotation not found');
    return found;
  },

  async createQuotation(data) {
    try {
      const res = await api.post('/admin/quotations', data);
      if (res.data?.data) {
        return res.data.data;
      }
    } catch {
      // Fallback
    }

    const items = getLocalQuotations();
    const currentYear = new Date().getFullYear();
    const nextSeq = items.length + 1;
    const seqStr = String(nextSeq).padStart(4, '0');
    const quotationNumber = `AC-QTN-${currentYear}-${seqStr}`;

    const calculatedPricing = calculatePricing({
      lineItems: data.lineItems || [],
      discount: data.pricing?.discount || {},
      additionalCharges: data.pricing?.additionalCharges || [],
      tax: data.pricing?.tax || {},
      guestCount: data.eventDetails?.guestCount || 1
    });

    const newQuotation = {
      ...data,
      id: `qtn-${Date.now()}`,
      quotationNumber,
      revision: 0,
      parentQuotation: null,
      pricing: calculatedPricing,
      status: data.status || 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customerResponse: {
        status: 'pending',
        responseDate: null,
        notes: ''
      }
    };

    items.unshift(newQuotation);
    setLocalQuotations(items);
    return newQuotation;
  },

  async updateQuotation(id, data) {
    try {
      const res = await api.put(`/admin/quotations/${id}`, data);
      if (res.data?.data) {
        return res.data.data;
      }
    } catch {
      // Fallback
    }

    const items = getLocalQuotations();
    const index = items.findIndex(i => (i.id === id || i._id === id));
    if (index === -1) throw new Error('Quotation not found');

    if (items[index].status === 'issued') {
      throw new Error('Issued quotation cannot be edited directly. Create a revision instead.');
    }

    const calculatedPricing = calculatePricing({
      lineItems: data.lineItems || items[index].lineItems || [],
      discount: data.pricing?.discount || items[index].pricing?.discount || {},
      additionalCharges: data.pricing?.additionalCharges || items[index].pricing?.additionalCharges || [],
      tax: data.pricing?.tax || items[index].pricing?.tax || {},
      guestCount: data.eventDetails?.guestCount || items[index].eventDetails?.guestCount || 1
    });

    items[index] = {
      ...items[index],
      ...data,
      pricing: calculatedPricing,
      updatedAt: new Date().toISOString()
    };

    setLocalQuotations(items);
    return items[index];
  },

  async issueQuotation(id, payload = {}) {
    try {
      const res = await api.patch(`/admin/quotations/${id}/issue`, payload);
      if (res.data?.data) {
        return res.data.data;
      }
    } catch {
      // Fallback
    }

    const items = getLocalQuotations();
    const index = items.findIndex(i => (i.id === id || i._id === id));
    if (index === -1) throw new Error('Quotation not found');

    const validUntilDate = payload.validUntilDate ||
      new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    items[index] = {
      ...items[index],
      status: 'issued',
      issuedDate: new Date().toISOString(),
      validUntilDate,
      updatedAt: new Date().toISOString()
    };

    setLocalQuotations(items);
    return items[index];
  },

  async createRevision(id, payload = {}) {
    try {
      const res = await api.post(`/admin/quotations/${id}/revision`, payload);
      if (res.data?.data) {
        return res.data.data;
      }
    } catch {
      // Fallback
    }

    const items = getLocalQuotations();
    const index = items.findIndex(i => (i.id === id || i._id === id));
    if (index === -1) throw new Error('Original quotation not found');

    const original = items[index];
    const newRevisionNumber = (original.revision || 0) + 1;
    const baseNumber = original.quotationNumber.replace(/-R\d+$/, '');
    const newQuotationNumber = `${baseNumber}-R${newRevisionNumber}`;

    // Mark parent as superseded
    original.status = 'superseded';
    original.updatedAt = new Date().toISOString();

    const revisedQuotation = {
      ...JSON.parse(JSON.stringify(original)),
      id: `qtn-${Date.now()}`,
      quotationNumber: newQuotationNumber,
      revision: newRevisionNumber,
      parentQuotation: original.id || original._id,
      status: 'draft',
      issuedDate: null,
      notes: payload.revisionNotes
        ? `Revision ${newRevisionNumber}: ${payload.revisionNotes}\n${original.notes || ''}`
        : original.notes,
      customerResponse: {
        status: 'pending',
        responseDate: null,
        notes: ''
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    items.unshift(revisedQuotation);
    setLocalQuotations(items);
    return revisedQuotation;
  },

  async updateStatus(id, status, notes = '') {
    try {
      const res = await api.patch(`/admin/quotations/${id}/status`, { status, notes });
      if (res.data?.data) {
        return res.data.data;
      }
    } catch {
      // Fallback
    }

    const items = getLocalQuotations();
    const index = items.findIndex(i => (i.id === id || i._id === id));
    if (index === -1) throw new Error('Quotation not found');

    items[index].status = status;
    if (notes) {
      items[index].notes = (items[index].notes ? items[index].notes + '\n' : '') + notes;
    }
    items[index].updatedAt = new Date().toISOString();

    setLocalQuotations(items);
    return items[index];
  },

  async recordCustomerResponse(id, { status, notes }) {
    try {
      const res = await api.post(`/admin/quotations/${id}/response`, { status, notes });
      if (res.data?.data) {
        return res.data.data;
      }
    } catch {
      // Fallback
    }

    const items = getLocalQuotations();
    const index = items.findIndex(i => (i.id === id || i._id === id));
    if (index === -1) throw new Error('Quotation not found');

    items[index].status = status;
    items[index].customerResponse = {
      status,
      notes: notes || '',
      responseDate: new Date().toISOString()
    };
    items[index].updatedAt = new Date().toISOString();

    setLocalQuotations(items);
    return items[index];
  },

  async deleteQuotation(id) {
    try {
      const res = await api.delete(`/admin/quotations/${id}`);
      if (res.data?.success) {
        return true;
      }
    } catch {
      // Fallback
    }

    let items = getLocalQuotations();
    const found = items.find(i => (i.id === id || i._id === id));
    if (!found) throw new Error('Quotation not found');
    if (found.status === 'accepted') {
      throw new Error('Accepted quotations cannot be deleted for audit and accounting consistency.');
    }

    items = items.filter(i => (i.id !== id && i._id !== id));
    setLocalQuotations(items);
    return true;
  }
};

import api from './api';

export const defaultGalleryCategories = [
  {
    id: 'all',
    slug: 'all',
    sortOrder: 1,
    name: {
      en: 'All Photos',
      mr: 'सर्व फोटो',
    },
    icon: 'bi-grid-fill',
  },
  {
    id: 'wedding',
    slug: 'wedding',
    sortOrder: 2,
    name: {
      en: 'Wedding Celebrations',
      mr: 'लग्न समारंभ',
    },
    icon: 'bi-heart-fill',
  },
  {
    id: 'engagement',
    slug: 'engagement',
    sortOrder: 3,
    name: {
      en: 'Engagement Functions',
      mr: 'साखरपुडा समारंभ',
    },
    icon: 'bi-gem',
  },
  {
    id: 'birthday',
    slug: 'birthday',
    sortOrder: 4,
    name: {
      en: 'Birthday Parties',
      mr: 'वाढदिवस व पार्टी',
    },
    icon: 'bi-balloon-fill',
  },
  {
    id: 'food',
    slug: 'food',
    sortOrder: 5,
    name: {
      en: 'Food & Sweets',
      mr: 'खाद्यपदार्थ आणि मिठाया',
    },
    icon: 'bi-egg-fried',
  },
  {
    id: 'setup',
    slug: 'setup',
    sortOrder: 6,
    name: {
      en: 'Catering Setup & Buffet',
      mr: 'केटरिंग मांडणी व बुफे',
    },
    icon: 'bi-box-seam-fill',
  },
  {
    id: 'other',
    slug: 'other',
    sortOrder: 7,
    name: {
      en: 'Other Events',
      mr: 'इतर कार्यक्रम',
    },
    icon: 'bi-calendar-event-fill',
  },
];

export const defaultGalleryItems = [
  {
    id: 'gal-01',
    category: 'setup',
    title: {
      en: 'Royal Buffet Arrangement',
      mr: 'शाही बुफे जेवण व्यवस्था',
    },
    caption: {
      en: 'Grand banquet buffet counter with traditional brass chafing dishes and hygienic presentation.',
      mr: 'पारंपारिक पितळी भांड्यांमध्ये सुसज्ज आणि स्वच्छ पद्धतीने मांडलेला भव्य बुफे काउंटर.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Royal buffet table setup with warm lights and decor',
        mr: 'शाही बुफे टेबल व्यवस्था',
      },
      width: 1200,
      height: 800,
    },
    location: 'Pune',
    isFeatured: true,
    sortOrder: 1,
  },
  {
    id: 'gal-02',
    category: 'wedding',
    title: {
      en: 'Traditional Wedding Pangat Feast',
      mr: 'पारंपारिक लग्न पंगत मेजवानी',
    },
    caption: {
      en: 'Authentic Maharashtrian wedding sit-down banquet served with pure ghee and festive delicacies.',
      mr: 'शुद्ध साजूक तूप आणि पारंपारिक पक्वान्नांसह सजलेली अस्सल महाराष्ट्रीयन लग्न पंगत.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Traditional Maharashtrian wedding catering banquet',
        mr: 'लग्न समारंभातील भोजन व्यवस्था',
      },
      width: 1200,
      height: 800,
    },
    location: 'Kolhapur',
    isFeatured: true,
    sortOrder: 2,
  },
  {
    id: 'gal-03',
    category: 'food',
    title: {
      en: 'Authentic Maharashtrian Thali',
      mr: 'अस्सल महाराष्ट्रीयन भोजन थाळी',
    },
    caption: {
      en: 'Festive platter featuring Puran Poli, Katachi Amti, Masale Bhaat, and seasonal delicacies.',
      mr: 'पुरणपोळी, कटाची आमटी, सुवासिक मसाले भात आणि पंचपक्वान्नांनी सजलेली रुचकर थाळी.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Authentic festive Maharashtrian Thali with traditional sweets',
        mr: 'अस्सल महाराष्ट्रीयन जेवण थाळी',
      },
      width: 1200,
      height: 800,
    },
    location: 'Satara',
    isFeatured: true,
    sortOrder: 3,
  },
  {
    id: 'gal-04',
    category: 'engagement',
    title: {
      en: 'Engagement Welcome Counter',
      mr: 'साखरपुडा स्वागत काउंटर',
    },
    caption: {
      en: 'Elegant dessert and welcome drink display arranged for a grand ring ceremony.',
      mr: 'साखरपुडा सोहळ्यासाठी सजवलेला आधुनिक वेलकम ड्रिंक्स आणि गोड पदार्थांचा काउंटर.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Engagement welcome reception food setup with flowers',
        mr: 'साखरपुडा रिसेप्शन जेवण मांडणी',
      },
      width: 1200,
      height: 800,
    },
    location: 'Pune',
    isFeatured: false,
    sortOrder: 4,
  },
  {
    id: 'gal-05',
    category: 'food',
    title: {
      en: 'Freshly Steamed Ukadiche Modak',
      mr: 'गरमागरम उकडीचे मोदक',
    },
    caption: {
      en: 'Handcrafted rice flour modaks filled with freshly grated coconut, organic jaggery, and pure ghee.',
      mr: 'ताजे खोबरे, गूळ आणि साजूक तुपाची धार असलेले अदिती केटरर्सचे खास उकडीचे मोदक.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Fresh Ukadiche Modak served on banana leaf',
        mr: 'केळीच्या पानावर वाढलेले उकडीचे मोदक',
      },
      width: 1200,
      height: 800,
    },
    location: 'Pune',
    isFeatured: true,
    sortOrder: 5,
  },
  {
    id: 'gal-06',
    category: 'birthday',
    title: {
      en: 'Celebration Birthday Snacks Setup',
      mr: 'वाढदिवस स्नॅक्स व चाट व्यवस्था',
    },
    caption: {
      en: 'Colorful finger foods, crispy appetizers, and mocktails prepared for an evening birthday bash.',
      mr: 'वाढदिवसाच्या आनंदासाठी कुरकुरीत स्टार्टर्स, गरमागरम स्नॅक्स आणि मॉकटेल्सची व्यवस्था.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Birthday celebration food table arrangement',
        mr: 'वाढदिवस पार्टी जेवण व्यवस्था',
      },
      width: 1200,
      height: 800,
    },
    location: 'Pimpri-Chinchwad',
    isFeatured: false,
    sortOrder: 6,
  },
  {
    id: 'gal-07',
    category: 'setup',
    title: {
      en: 'Live Dosa & Tawa Counter',
      mr: 'लाइव्ह डोसा आणि तवा काउंटर',
    },
    caption: {
      en: 'Chefs serving piping hot, crispy dosas and accompaniments live for breakfast and high tea.',
      mr: 'सकाळच्या नाश्त्यासाठी गरमागरम डोसा व चटणी थेट तव्यावरून वाढणारा लाइव्ह काउंटर.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Live south indian breakfast counter at catering event',
        mr: 'लाइव्ह डोसा काउंटर केटरिंग व्यवस्था',
      },
      width: 1200,
      height: 800,
    },
    location: 'Pune',
    isFeatured: false,
    sortOrder: 7,
  },
  {
    id: 'gal-08',
    category: 'wedding',
    title: {
      en: 'Grand Reception Dinner Spread',
      mr: 'भव्य रिसेप्शन डिनर मेजवानी',
    },
    caption: {
      en: 'Extensive multi-cuisine wedding reception spread serving thousands of guests seamlessly.',
      mr: 'हजारो पाहुण्यांना वेळेत व आदराने जेवण देणारी भव्य रिसेप्शन डिनर व्यवस्था.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Wedding reception dinner table with lighting and decor',
        mr: 'लग्न रिसेप्शन जेवण व्यवस्था',
      },
      width: 1200,
      height: 800,
    },
    location: 'Pune',
    isFeatured: true,
    sortOrder: 8,
  },
  {
    id: 'gal-09',
    category: 'food',
    title: {
      en: 'Golden Kesari Basundi & Jalebi',
      mr: 'केशरी बासुंदी आणि गरमागरम जिलेबी',
    },
    caption: {
      en: 'Slow-simmered rich milk Basundi garnished with saffron, almonds, and pistachios.',
      mr: 'केशर, बदाम, पिस्त्याची सजावट असलेली घट्ट केशरी बासुंदी आणि कुरकुरीत जिलेबी.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Traditional Indian sweet dessert presentation',
        mr: 'पारंपारिक मिठाई आणि गोड पदार्थ',
      },
      width: 1200,
      height: 800,
    },
    location: 'Pune',
    isFeatured: false,
    sortOrder: 9,
  },
  {
    id: 'gal-10',
    category: 'other',
    title: {
      en: 'Satyanarayan Pooja Mahaprasad',
      mr: 'सत्यनारायण महापूजा महाप्रसाद',
    },
    caption: {
      en: 'Sacred religious Mahaprasad preparation with pure ghee Sheera, Masale Bhaat, and Alu Vadi.',
      mr: 'धार्मिक कार्यक्रमासाठी साजूक तुपाचा शिरा, मसाले भात आणि अळूवड्यांचा सात्विक महाप्रसाद.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Religious ceremony traditional vegetarian meal',
        mr: 'धार्मिक कार्यक्रमाचा सात्विक महाप्रसाद',
      },
      width: 1200,
      height: 800,
    },
    location: 'Pune',
    isFeatured: false,
    sortOrder: 10,
  },
  {
    id: 'gal-11',
    category: 'setup',
    title: {
      en: 'Round Table Banquet Dining',
      mr: 'राऊंड टेबल बँक्वेट भोजन व्यवस्था',
    },
    caption: {
      en: 'VIP family dining table setting with personalized table service and immaculate cutlery.',
      mr: 'कुटुंब आणि विशेष पाहुण्यांसाठी आदरातिथ्यासह केलेली राऊंड टेबल भोजन मांडणी.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Round table dining setup for celebration banquet',
        mr: 'राऊंड टेबल डायनिंग व्यवस्था',
      },
      width: 1200,
      height: 800,
    },
    location: 'Pune',
    isFeatured: false,
    sortOrder: 11,
  },
  {
    id: 'gal-12',
    category: 'food',
    title: {
      en: 'Crispy Kothimbir Vadi & Appetizers',
      mr: 'खमंग कोथिंबीर वडी व स्टार्टर्स',
    },
    caption: {
      en: 'Traditional Maharashtrian fried snacks served piping hot with mint chutney and curd.',
      mr: 'पुदिना चटणी आणि दह्यासोबत गरमागरम वाढली जाणारी कुरकुरीत खमंग कोथिंबीर वडी.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Crispy fried Indian starters platter',
        mr: 'खमंग स्टार्टर्स व तोंडी लावणी पदार्थ',
      },
      width: 1200,
      height: 800,
    },
    location: 'Pune',
    isFeatured: false,
    sortOrder: 12,
  },
];

/**
 * Fetch all gallery items with optional category/search filter
 */
export async function getGalleryItems({ category, search, language = 'en', isFeatured } = {}) {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search && search.trim()) params.append('search', search.trim());
    if (isFeatured !== undefined) params.append('featured', String(isFeatured));
    if (language) params.append('language', language);

    const qs = params.toString() ? `?${params.toString()}` : '';
    const res = await api.get(`/public/gallery${qs}`);

    if (res?.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
      return res.data.data;
    }
  } catch {
    // Fall back to localStorage admin gallery (if admin has made changes), then static defaults
  }

  // Check localStorage for admin-managed gallery items (published only)
  try {
    const stored = localStorage.getItem('aditi_admin_gallery');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        let items = parsed.filter((i) => i.status === 'published');

        if (category && category !== 'all') {
          items = items.filter((item) => item.category === category);
        }
        if (isFeatured !== undefined) {
          items = items.filter((item) => Boolean(item.isFeatured) === Boolean(isFeatured));
        }
        if (search && search.trim()) {
          const q = search.trim().toLowerCase();
          items = items.filter((item) => {
            const titleEn = (item.title?.en || '').toLowerCase();
            const titleMr = (item.title?.mr || '').toLowerCase();
            return titleEn.includes(q) || titleMr.includes(q);
          });
        }
        return items.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
      }
    }
  } catch {
    // fall through to static defaults
  }

  let items = [...defaultGalleryItems];

  if (category && category !== 'all') {
    items = items.filter((item) => item.category === category);
  }

  if (isFeatured !== undefined) {
    items = items.filter((item) => Boolean(item.isFeatured) === Boolean(isFeatured));
  }

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    items = items.filter((item) => {
      const titleEn = item.title?.en?.toLowerCase() || '';
      const titleMr = item.title?.mr?.toLowerCase() || '';
      const capEn = item.caption?.en?.toLowerCase() || '';
      const capMr = item.caption?.mr?.toLowerCase() || '';
      const loc = item.location?.toLowerCase() || '';
      return titleEn.includes(q) || titleMr.includes(q) || capEn.includes(q) || capMr.includes(q) || loc.includes(q);
    });
  }

  return items.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

/**
 * Fetch categories for the gallery
 */
export async function getGalleryCategories() {
  try {
    const res = await api.get('/public/gallery/categories');
    if (res?.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
      return res.data.data;
    }
  } catch {
    // Fall back to default categories
  }
  return defaultGalleryCategories;
}

/**
 * Fetch a single gallery item by ID
 */
export async function getGalleryItemById(id) {
  try {
    const res = await api.get(`/public/gallery/${id}`);
    if (res?.data?.data) {
      return res.data.data;
    }
  } catch {
    // Fall back
  }
  return defaultGalleryItems.find((item) => item.id === id) || null;
}

/**
 * Fetch featured highlights for gallery
 */
export async function getFeaturedGalleryItems() {
  return getGalleryItems({ isFeatured: true });
}

export default {
  defaultGalleryCategories,
  defaultGalleryItems,
  getGalleryItems,
  getGalleryCategories,
  getGalleryItemById,
  getFeaturedGalleryItems,
};

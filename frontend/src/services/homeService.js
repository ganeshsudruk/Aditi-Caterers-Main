import api from './api';

// Verified default mock data matching AC-FE-002 requirements with full bilingual support
export const defaultHomeData = {
  hero: {
    title_en: 'Make Every Celebration Special with Aditi Caterers',
    title_mr: 'अदिती केटरर्ससोबत प्रत्येक सोहळा बनवा खास!',
    description_en:
      'Delicious food, quality service, and memorable catering experiences for your special occasions. We serve weddings, birthdays, engagements, corporate events, and more.',
    description_mr:
      'तुमच्या खास प्रसंगांसाठी स्वादिष्ट जेवण, उत्तम सेवा आणि अविस्मरणीय केटरिंग अनुभव. लग्न, वाढदिवस, साखरपुडा, कॉर्पोरेट कार्यक्रम आणि इतर समारंभांसाठी केटरिंग सेवा.',
    image: '/src/assets/hero.png',
  },
  services: [
    {
      id: 'wedding',
      key: 'wedding',
      icon: 'bi-gem',
      route: '/services/wedding',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'birthday',
      key: 'birthday',
      icon: 'bi-balloon-fill',
      route: '/services/birthday',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'engagement',
      key: 'engagement',
      icon: 'bi-flower1',
      route: '/services/engagement',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'reception',
      key: 'reception',
      icon: 'bi-stars',
      route: '/services/reception',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'corporate',
      key: 'corporate',
      icon: 'bi-briefcase-fill',
      route: '/services/corporate',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'religious',
      key: 'religious',
      icon: 'bi-brightness-high-fill',
      route: '/services/religious',
      image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'other',
      key: 'other',
      icon: 'bi-calendar2-event-fill',
      route: '/services/other',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=700&q=80',
    },
  ],
  foodCategories: [
    {
      id: 'breakfast',
      key: 'breakfast',
      icon: 'bi-cup-hot-fill',
      route: '/menu/breakfast',
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'starters',
      key: 'starters',
      icon: 'bi-egg-fried',
      route: '/menu/starters',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'mainCourse',
      key: 'mainCourse',
      icon: 'bi-pie-chart-fill',
      route: '/menu/main-course',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'maharashtrian',
      key: 'maharashtrian',
      icon: 'bi-fire',
      route: '/menu/maharashtrian',
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'punjabi',
      key: 'punjabi',
      icon: 'bi-bowl-hot',
      route: '/menu/punjabi',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'southIndian',
      key: 'southIndian',
      icon: 'bi-circle-square',
      route: '/menu/south-indian',
      image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'desserts',
      key: 'desserts',
      icon: 'bi-cake2-fill',
      route: '/menu/desserts',
      image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'beverages',
      key: 'beverages',
      icon: 'bi-cup-straw',
      route: '/menu/beverages',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    },
  ],
  gallery: [
    {
      id: 1,
      title_en: 'Buffet Arrangement',
      title_mr: 'बुफे व्यवस्था',
      category_en: 'Catering Setup',
      category_mr: 'केटरिंग मांडणी',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title_en: 'Traditional Feast',
      title_mr: 'पारंपारिक मेजवानी',
      category_en: 'Maharashtrian Cuisine',
      category_mr: 'महाराष्ट्रीयन खाद्यसंस्कृती',
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title_en: 'Wedding Food Counter',
      title_mr: 'लग्न समारंभ जेवण काउंटर',
      category_en: 'Wedding Catering',
      category_mr: 'लग्न केटरिंग',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      title_en: 'Artisan Indian Sweets',
      title_mr: 'अस्सल गोड पदार्थ',
      category_en: 'Desserts',
      category_mr: 'मिठाई',
      image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      title_en: 'Crispy Evening Starters',
      title_mr: 'कुरकुरीत स्टार्टर्स',
      category_en: 'Appetizers',
      category_mr: 'सुरुवातीचे पदार्थ',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 6,
      title_en: 'Festive Dining Setup',
      title_mr: 'समारंभ जेवण व्यवस्था',
      category_en: 'Event Arrangement',
      category_mr: 'कार्यक्रम व्यवस्था',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    },
  ],
  testimonials: [
    {
      id: 1,
      key: 'review1',
      rating: 5,
    },
    {
      id: 2,
      key: 'review2',
      rating: 5,
    },
    {
      id: 3,
      key: 'review3',
      rating: 5,
    },
  ],
};

/**
 * Fetch Home Page Data
 * Tries API first; falls back to verified static data if offline or not configured.
 */
export async function getHomePageData() {
  try {
    const res = await api.get('/public/home');
    if (res?.data?.data) {
      return {
        ...defaultHomeData,
        ...res.data.data,
      };
    }
    return defaultHomeData;
  } catch {
    // Graceful fallback to verified business data
    return defaultHomeData;
  }
}

export async function getFeaturedServices() {
  try {
    const res = await api.get('/public/services/featured');
    if (res?.data?.data?.length) return res.data.data;
    return defaultHomeData.services;
  } catch {
    return defaultHomeData.services;
  }
}

export async function getMenuCategories() {
  try {
    const res = await api.get('/public/menu/categories');
    if (res?.data?.data?.length) return res.data.data;
    return defaultHomeData.foodCategories;
  } catch {
    return defaultHomeData.foodCategories;
  }
}

export async function getFeaturedGallery() {
  try {
    const res = await api.get('/public/gallery/featured');
    if (res?.data?.data?.length) return res.data.data;
    return defaultHomeData.gallery;
  } catch {
    return defaultHomeData.gallery;
  }
}

export async function getApprovedTestimonials() {
  try {
    const res = await api.get('/public/testimonials/approved');
    if (res?.data?.data?.length) return res.data.data;
    return defaultHomeData.testimonials;
  } catch {
    return defaultHomeData.testimonials;
  }
}

export default {
  getHomePageData,
  getFeaturedServices,
  getMenuCategories,
  getFeaturedGallery,
  getApprovedTestimonials,
  defaultHomeData,
};

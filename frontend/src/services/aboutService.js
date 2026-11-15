import api from './api';

export const defaultAboutData = {
  businessName: 'Aditi Caterers',
  featuredImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=80',
  storyImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
  gallery: [
    {
      id: 1,
      title_en: 'Traditional Wedding Feast',
      title_mr: 'पारंपारिक विवाह मेजवानी',
      category_en: 'Wedding Catering',
      category_mr: 'लग्न केटरिंग',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title_en: 'Deluxe Buffet Arrangement',
      title_mr: 'भव्य बुफे व्यवस्था',
      category_en: 'Buffet Setup',
      category_mr: 'बुफे मांडणी',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title_en: 'Fresh Evening Starters',
      title_mr: 'ताजे खमंग स्टार्टर्स',
      category_en: 'Appetizers',
      category_mr: 'सुरुवातीचे पदार्थ',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      title_en: 'Authentic Maharashtrian Thali',
      title_mr: 'अस्सल महाराष्ट्रीयन थाळी',
      category_en: 'Traditional Food',
      category_mr: 'पारंपारिक पदार्थ',
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      title_en: 'Celebration Sweet Selection',
      title_mr: 'समारंभातील गोड पदार्थ',
      category_en: 'Desserts',
      category_mr: 'मिठाई',
      image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 6,
      title_en: 'Formal Reception Dining',
      title_mr: 'रिसेप्शन जेवण मांडणी',
      category_en: 'Event Arrangement',
      category_mr: 'समारंभ व्यवस्था',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    },
  ],
};

export async function getAboutPageData() {
  try {
    const res = await api.get('/public/about');
    if (res?.data?.data) {
      return {
        ...defaultAboutData,
        ...res.data.data,
      };
    }
    return defaultAboutData;
  } catch {
    // Graceful fallback to verified default data
    return defaultAboutData;
  }
}

export default {
  getAboutPageData,
  defaultAboutData,
};

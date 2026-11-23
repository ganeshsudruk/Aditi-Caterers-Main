import api from './api';

export const DEFAULT_WEBSITE_SETTINGS = {
  general: {
    websiteName: { en: 'Aditi Caterers', mr: 'आदिती केटरर्स' },
    tagline: {
      en: 'Authentic Maharashtrian Taste & Royal Event Hospitality',
      mr: 'अस्सल महाराष्ट्रीयन चव आणि शाही आदरातिथ्य',
    },
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'mr'],
    timezone: 'Asia/Kolkata',
    currency: 'INR',
  },
  business: {
    name: { en: 'Aditi Caterers', mr: 'आदिती केटरर्स' },
    shortDescription: {
      en: 'Pune premier catering service specializing in authentic Maharashtrian banquets, weddings, and celebrations.',
      mr: 'पुण्यातील आघाडीची केटरिंग सेवा, अस्सल महाराष्ट्रीयन जेवण, विवाह आणि समारंभांसाठी प्रसिद्ध.',
    },
    experienceYears: 15,
    address: {
      en: 'Plot 14, Ideal Colony, Kothrud, Pune - 411038, Maharashtra',
      mr: 'प्लॉट १४, आयडियल कॉलनी, कोथरूड, पुणे - ४११०३८, महाराष्ट्र',
    },
    city: 'Pune',
    state: 'Maharashtra',
    postalCode: '411038',
    country: 'India',
    operatingHours: {
      en: 'Mon - Sun: 8:00 AM - 10:00 PM',
      mr: 'सोम - रवि: सकाळी ८:०० ते रात्री १०:००',
    },
  },
  contact: {
    primaryPhone: '+91 9975959391',
    secondaryPhone: '+91 9822000000',
    whatsappNumber: '+91 9975959391',
    email: 'contact@aditicaterers.in',
    mapUrl: 'https://maps.google.com/?q=Kothrud+Pune',
    contactMessage: {
      en: 'Have an upcoming event or celebration? Get in touch with us for custom menus, quotes, and expert catering advice.',
      mr: 'आपल्या घरात काही कार्यक्रम किंवा सोहळा आहे का? खास मेनू आणि सल्ल्यासाठी आजच आमच्याशी संपर्क साधा.',
    },
  },
  branding: {
    logoUrl: '',
    faviconUrl: '',
    logoAlt: { en: 'Aditi Caterers Logo', mr: 'आदिती केटरर्स लोगो' },
  },
  homepage: {
    heroTitle: {
      en: 'Authentic Maharashtrian Catering for Grand Celebrations',
      mr: 'भव्य समारंभांसाठी अस्सल महाराष्ट्रीयन केटरिंग सेवा',
    },
    heroSubtitle: {
      en: 'Traditional flavors prepared with pure hygiene, master chefs, and royal hospitality for up to 5,000+ guests.',
      mr: 'शुद्ध स्वच्छता, निष्णात आचारी आणि ५,००० हून अधिक पाहुण्यांसाठी शाही आदरातिथ्य.',
    },
    heroImageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=80',
    sectionsVisibility: {
      about: true,
      services: true,
      packages: true,
      gallery: true,
      awards: true,
      reviews: true,
      contactCta: true,
    },
  },
  footer: {
    aboutText: {
      en: 'Aditi Caterers brings over 15+ years of excellence in traditional Maharashtrian catering, wedding banquets, and customized event hospitality.',
      mr: 'आदिती केटरर्स गेल्या १५+ वर्षांपासून पारंपारिक महाराष्ट्रीयन जेवण, विवाह सोहळे आणि उत्कृष्ट आदरातिथ्यासाठी कटिबद्ध आहे.',
    },
    copyrightText: {
      en: 'Aditi Caterers. All Rights Reserved.',
      mr: 'आदिती केटरर्स. सर्व हक्क राखीव.',
    },
  },
  socialLinks: [
    { platform: 'whatsapp', url: 'https://wa.me/919975959391', enabled: true, displayOrder: 1 },
    { platform: 'facebook', url: 'https://facebook.com', enabled: true, displayOrder: 2 },
    { platform: 'instagram', url: 'https://instagram.com', enabled: true, displayOrder: 3 },
    { platform: 'youtube', url: 'https://youtube.com', enabled: false, displayOrder: 4 },
  ],
  seo: {
    metaTitle: {
      en: 'Aditi Caterers | Best Traditional Maharashtrian Catering in Pune',
      mr: 'आदिती केटरर्स | पुण्यातील सर्वोत्तम पारंपारिक महाराष्ट्रीयन केटरिंग',
    },
    metaDescription: {
      en: 'Premium catering services for weddings, receptions, housewarming, birthdays and corporate events in Pune. Authentic taste and hygienic food.',
      mr: 'पुण्यातील लग्न, रिसेप्शन, वास्तुशांती आणि कॉर्पोरेट कार्यक्रमांसाठी दर्जेदार केटरिंग सेवा. अस्सल चव आणि स्वच्छ अन्न.',
    },
    ogImageUrl: '',
    canonicalUrl: '',
  },
};

export const websiteSettingsAdminService = {
  async getSettings() {
    const res = await api.get('/admin/website-settings');
    if (res.data?.data) {
      return res.data.data;
    }
    return res.data;
  },

  async updateSettings(data) {
    const res = await api.put('/admin/website-settings', data);
    if (res.data?.data) {
      return res.data.data;
    }
    return res.data;
  },

  async publishSettings() {
    const res = await api.post('/admin/website-settings/publish');
    if (res.data?.data) {
      return res.data.data;
    }
    return res.data;
  },

  async getPublicSettings() {
    const res = await api.get('/website-settings/public');
    if (res.data?.data) {
      return res.data.data;
    }
    return res.data;
  },
};

export default websiteSettingsAdminService;

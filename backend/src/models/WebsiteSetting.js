const mongoose = require('mongoose');

const bilingualStringSchema = new mongoose.Schema(
  {
    en: { type: String, trim: true, default: '' },
    mr: { type: String, trim: true, default: '' },
  },
  { _id: false }
);

const socialLinkSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
      enum: ['facebook', 'instagram', 'youtube', 'whatsapp', 'twitter', 'linkedin'],
    },
    url: {
      type: String,
      trim: true,
      default: '',
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: true }
);

const websiteSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: 'website_settings',
      index: true,
    },
    // 1. General Settings
    general: {
      websiteName: {
        type: bilingualStringSchema,
        default: () => ({ en: 'Aditi Caterers', mr: 'आदिती केटरर्स' }),
      },
      tagline: {
        type: bilingualStringSchema,
        default: () => ({
          en: 'Authentic Maharashtrian Taste & Royal Event Hospitality',
          mr: 'अस्सल महाराष्ट्रीयन चव आणि शाही आदरातिथ्य',
        }),
      },
      defaultLanguage: {
        type: String,
        enum: ['en', 'mr'],
        default: 'en',
      },
      supportedLanguages: {
        type: [String],
        default: ['en', 'mr'],
      },
      timezone: {
        type: String,
        default: 'Asia/Kolkata',
      },
      currency: {
        type: String,
        default: 'INR',
      },
    },
    // 2. Business Profile
    business: {
      name: {
        type: bilingualStringSchema,
        default: () => ({ en: 'Aditi Caterers', mr: 'आदिती केटरर्स' }),
      },
      shortDescription: {
        type: bilingualStringSchema,
        default: () => ({
          en: 'Pune premier catering service specializing in authentic Maharashtrian banquets, weddings, and celebrations.',
          mr: 'पुण्यातील आघाडीची केटरिंग सेवा, अस्सल महाराष्ट्रीयन जेवण, विवाह आणि समारंभांसाठी प्रसिद्ध.',
        }),
      },
      experienceYears: {
        type: Number,
        default: 15,
      },
      address: {
        type: bilingualStringSchema,
        default: () => ({
          en: 'Plot 14, Ideal Colony, Kothrud, Pune - 411038, Maharashtra',
          mr: 'प्लॉट १४, आयडियल कॉलनी, कोथरूड, पुणे - ४११०३८, महाराष्ट्र',
        }),
      },
      city: { type: String, default: 'Pune' },
      state: { type: String, default: 'Maharashtra' },
      postalCode: { type: String, default: '411038' },
      country: { type: String, default: 'India' },
      operatingHours: {
        type: bilingualStringSchema,
        default: () => ({
          en: 'Mon - Sun: 8:00 AM - 10:00 PM',
          mr: 'सोम - रवि: सकाळी ८:०० ते रात्री १०:००',
        }),
      },
    },
    // 3. Contact Details
    contact: {
      primaryPhone: { type: String, default: '+91 9975959391' },
      secondaryPhone: { type: String, default: '+91 9822000000' },
      whatsappNumber: { type: String, default: '+91 9975959391' },
      email: { type: String, default: 'contact@aditicaterers.in' },
      mapUrl: {
        type: String,
        default: 'https://maps.google.com/?q=Kothrud+Pune',
      },
      contactMessage: {
        type: bilingualStringSchema,
        default: () => ({
          en: 'Have an upcoming event or celebration? Get in touch with us for custom menus, quotes, and expert catering advice.',
          mr: 'आपल्या घरात काही कार्यक्रम किंवा सोहळा आहे का? खास मेनू आणि सल्ल्यासाठी आजच आमच्याशी संपर्क साधा.',
        }),
      },
    },
    // 4. Branding
    branding: {
      logoUrl: { type: String, default: '' },
      logoPublicId: { type: String, default: '' },
      faviconUrl: { type: String, default: '' },
      faviconPublicId: { type: String, default: '' },
      logoAlt: {
        type: bilingualStringSchema,
        default: () => ({ en: 'Aditi Caterers Logo', mr: 'आदिती केटरर्स लोगो' }),
      },
    },
    // 5. Homepage
    homepage: {
      heroTitle: {
        type: bilingualStringSchema,
        default: () => ({
          en: 'Authentic Maharashtrian Catering for Grand Celebrations',
          mr: 'भव्य समारंभांसाठी अस्सल महाराष्ट्रीयन केटरिंग सेवा',
        }),
      },
      heroSubtitle: {
        type: bilingualStringSchema,
        default: () => ({
          en: 'Traditional flavors prepared with pure hygiene, master chefs, and royal hospitality for up to 5,000+ guests.',
          mr: 'शुद्ध स्वच्छता, निष्णात आचारी आणि ५,००० हून अधिक पाहुण्यांसाठी शाही आदरातिथ्य.',
        }),
      },
      heroImageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=80',
      },
      sectionsVisibility: {
        about: { type: Boolean, default: true },
        services: { type: Boolean, default: true },
        packages: { type: Boolean, default: true },
        gallery: { type: Boolean, default: true },
        awards: { type: Boolean, default: true },
        reviews: { type: Boolean, default: true },
        contactCta: { type: Boolean, default: true },
      },
    },
    // 6. Footer
    footer: {
      aboutText: {
        type: bilingualStringSchema,
        default: () => ({
          en: 'Aditi Caterers brings over 15+ years of excellence in traditional Maharashtrian catering, wedding banquets, and customized event hospitality.',
          mr: 'आदिती केटरर्स गेल्या १५+ वर्षांपासून पारंपारिक महाराष्ट्रीयन जेवण, विवाह सोहळे आणि उत्कृष्ट आदरातिथ्यासाठी कटिबद्ध आहे.',
        }),
      },
      copyrightText: {
        type: bilingualStringSchema,
        default: () => ({
          en: 'Aditi Caterers. All Rights Reserved.',
          mr: 'आदिती केटरर्स. सर्व हक्क राखीव.',
        }),
      },
    },
    // 7. Social Links
    socialLinks: {
      type: [socialLinkSchema],
      default: () => [
        { platform: 'whatsapp', url: 'https://wa.me/919975959391', enabled: true, displayOrder: 1 },
        { platform: 'facebook', url: 'https://facebook.com', enabled: true, displayOrder: 2 },
        { platform: 'instagram', url: 'https://instagram.com', enabled: true, displayOrder: 3 },
        { platform: 'youtube', url: 'https://youtube.com', enabled: false, displayOrder: 4 },
      ],
    },
    // 8. SEO Defaults
    seo: {
      metaTitle: {
        type: bilingualStringSchema,
        default: () => ({
          en: 'Aditi Caterers | Best Traditional Maharashtrian Catering in Pune',
          mr: 'आदिती केटरर्स | पुण्यातील सर्वोत्तम पारंपारिक महाराष्ट्रीयन केटरिंग',
        }),
      },
      metaDescription: {
        type: bilingualStringSchema,
        default: () => ({
          en: 'Premium catering services for weddings, receptions, housewarming, birthdays and corporate events in Pune. Authentic taste and hygienic food.',
          mr: 'पुण्यातील लग्न, रिसेप्शन, वास्तुशांती आणि कॉर्पोरेट कार्यक्रमांसाठी दर्जेदार केटरिंग सेवा. अस्सल चव आणि स्वच्छ अन्न.',
        }),
      },
      ogImageUrl: { type: String, default: '' },
      canonicalUrl: { type: String, default: '' },
    },
    // 9. Enquiry Form Settings
    enquiry: {
      enabled: { type: Boolean, default: true },
      heading: {
        type: bilingualStringSchema,
        default: () => ({ en: 'Book Catering or Request a Quote', mr: 'केटरिंग बुक करा किंवा अंदाजपत्रक मिळवा' }),
      },
      description: {
        type: bilingualStringSchema,
        default: () => ({
          en: 'Fill in your event details below and our team will get back to you within 24 hours.',
          mr: 'खालील फॉर्ममध्ये आपल्या कार्यक्रमाचा तपशील भरा, आमची टीम २४ तासांत संपर्क करेल.',
        }),
      },
      allowWithMaterial: { type: Boolean, default: true },
      allowWithoutMaterial: { type: Boolean, default: true },
    },
    // 10. Notification Preferences
    notifications: {
      adminEmailNotification: { type: Boolean, default: true },
      adminEmailRecipient: { type: String, default: 'admin@aditicaterers.in' },
      whatsappNotification: { type: Boolean, default: true },
      whatsappRecipient: { type: String, default: '+91 9975959391' },
    },
    lastPublishedAt: {
      type: Date,
      default: Date.now,
    },
    lastPublishedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('WebsiteSetting', websiteSettingSchema);

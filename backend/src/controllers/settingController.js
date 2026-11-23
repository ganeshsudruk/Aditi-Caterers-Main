const WebsiteSetting = require('../models/WebsiteSetting');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Get or initialize website settings document
 */
async function getOrCreateSettings() {
  let settings = await WebsiteSetting.findOne({ key: 'website_settings' });
  if (!settings) {
    settings = await WebsiteSetting.create({ key: 'website_settings' });
  }
  return settings;
}

// 1. GET /api/admin/website-settings (Full admin view)
exports.getAdminSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();
  res.status(200).json(new ApiResponse(200, settings, 'Website settings retrieved successfully'));
});

// 2. PUT /api/admin/website-settings (Update full or partial settings)
exports.updateAdminSettings = asyncHandler(async (req, res) => {
  let settings = await getOrCreateSettings();

  const allowedSections = [
    'general',
    'business',
    'contact',
    'branding',
    'homepage',
    'footer',
    'socialLinks',
    'seo',
    'enquiry',
    'notifications',
  ];

  allowedSections.forEach((section) => {
    if (req.body[section] !== undefined) {
      if (section === 'socialLinks') {
        settings.socialLinks = req.body.socialLinks;
      } else {
        const currentSection = settings[section]?.toObject ? settings[section].toObject() : (settings[section] || {});
        settings[section] = {
          ...currentSection,
          ...req.body[section],
        };
      }
    }
  });

  settings.lastPublishedAt = new Date();
  if (req.user?.id) {
    settings.lastPublishedBy = req.user.id;
  }

  await settings.save();

  res.status(200).json(new ApiResponse(200, settings, 'Website settings updated successfully'));
});

// 3. POST /api/admin/website-settings/publish
exports.publishSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();
  settings.lastPublishedAt = new Date();
  if (req.user?.id) {
    settings.lastPublishedBy = req.user.id;
  }
  await settings.save();

  res.status(200).json(new ApiResponse(200, settings, 'Website settings published to live website'));
});

// 4. GET /api/website-settings/public (Public sanitize-only payload)
exports.getPublicSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();

  // Whitelist only public fields (omit notifications, credentials, admin IDs)
  const publicPayload = {
    general: {
      websiteName: settings.general.websiteName,
      tagline: settings.general.tagline,
      defaultLanguage: settings.general.defaultLanguage,
      supportedLanguages: settings.general.supportedLanguages,
      timezone: settings.general.timezone,
      currency: settings.general.currency,
    },
    business: {
      name: settings.business.name,
      shortDescription: settings.business.shortDescription,
      experienceYears: settings.business.experienceYears,
      address: settings.business.address,
      city: settings.business.city,
      state: settings.business.state,
      postalCode: settings.business.postalCode,
      country: settings.business.country,
      operatingHours: settings.business.operatingHours,
    },
    contact: {
      primaryPhone: settings.contact.primaryPhone,
      secondaryPhone: settings.contact.secondaryPhone,
      whatsappNumber: settings.contact.whatsappNumber,
      email: settings.contact.email,
      mapUrl: settings.contact.mapUrl,
      contactMessage: settings.contact.contactMessage,
    },
    branding: {
      logoUrl: settings.branding.logoUrl,
      faviconUrl: settings.branding.faviconUrl,
      logoAlt: settings.branding.logoAlt,
    },
    homepage: {
      heroTitle: settings.homepage.heroTitle,
      heroSubtitle: settings.homepage.heroSubtitle,
      heroImageUrl: settings.homepage.heroImageUrl,
      sectionsVisibility: settings.homepage.sectionsVisibility,
    },
    footer: {
      aboutText: settings.footer.aboutText,
      copyrightText: settings.footer.copyrightText,
    },
    socialLinks: (settings.socialLinks || []).filter((link) => link.enabled),
    seo: settings.seo,
    enquiry: settings.enquiry,
  };

  res.status(200).json(new ApiResponse(200, publicPayload, 'Public website settings retrieved'));
});

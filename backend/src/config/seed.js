const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');

const Admin = require('../models/Admin');
const Service = require('../models/Service');
const MenuCategory = require('../models/MenuCategory');
const MenuItem = require('../models/MenuItem');
const Package = require('../models/Package');
const WebsiteSetting = require('../models/WebsiteSetting');
const FAQ = require('../models/FAQ');

const seedMenuData = require('./seedMenuData.json');

const seedInitialData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('MONGODB_URI is not set in environment.');
      process.exit(1);
    }

    console.log('[Seed] Connecting to MongoDB...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
    console.log('[Seed] Connected successfully to database:', mongoose.connection.name);

    // 1. Initial Admin Users
    const adminsToSeed = [
      {
        name: 'Ganesh Sudruk',
        fullName: 'Ganesh Sudruk',
        email: 'admin@aditicaterers.com',
        password: 'Admin@123456',
        role: 'superadmin',
        permissions: ['*'],
        isActive: true,
      },
      {
        name: 'Ganesh Sudruk',
        fullName: 'Ganesh Sudruk',
        email: 'admin@aditicaterers.in',
        password: 'AdminPassword@2026',
        role: 'superadmin',
        permissions: ['*'],
        isActive: true,
      },
      {
        name: 'Admin User',
        fullName: 'Admin User',
        email: 'admin@example.com',
        password: 'Admin@123456',
        role: 'superadmin',
        permissions: ['*'],
        isActive: true,
      },
    ];

    let primaryAdmin = null;
    for (const adminData of adminsToSeed) {
      let existing = await Admin.findOne({ email: adminData.email });
      if (!existing) {
        existing = await Admin.create(adminData);
        console.log(`[Seed] Created admin user: ${adminData.email}`);
      } else {
        console.log(`[Seed] Admin user already exists: ${adminData.email}`);
      }
      if (!primaryAdmin) primaryAdmin = existing;
    }

    // 2. Initial Website Settings (if not exists)
    const existingSettings = await WebsiteSetting.findOne({ key: 'website_settings' });
    if (!existingSettings) {
      console.log('[Seed] Initializing default website settings...');
      await WebsiteSetting.create({
        key: 'website_settings',
        businessName: { en: 'Aditi Caterers', mr: 'अदिती केटरर्स' },
        tagline: {
          en: 'Authentic Maharashtrian & Multi-Cuisine Catering',
          mr: 'अस्सल महाराष्ट्रीयन व बहुविध रुचकर केटरिंग सेवा',
        },
        contact: {
          phone: '+919876543210',
          email: 'info@aditicaterers.in',
          address: {
            street: 'Sadashiv Peth',
            city: 'Pune',
            state: 'Maharashtra',
            pincode: '411030',
          },
        },
      });
      console.log('[Seed] Website settings initialized.');
    }

    // 3. Initial FAQs (if empty)
    const faqCount = await FAQ.countDocuments();
    if (faqCount === 0) {
      console.log('[Seed] Seeding sample FAQs...');
      await FAQ.insertMany([
        {
          question: {
            en: 'What types of catering services do you offer?',
            mr: 'तुम्ही कोणत्या प्रकारच्या केटरिंग सेवा पुरवता?',
          },
          answer: {
            en: 'We specialize in authentic Maharashtrian weddings, receptions, naming ceremonies, corporate events, and religious functions.',
            mr: 'आम्ही अस्सल महाराष्ट्रीयन विवाह, स्वागत समारंभ, नामकरण, कॉर्पोरेट इव्हेंट्स आणि धार्मिक कार्यांसाठी केटरिंग सेवा पुरवतो.',
          },
          category: 'general',
          displayOrder: 1,
          isPublished: true,
        },
        {
          question: {
            en: 'Do you provide live food counters?',
            mr: 'तुम्ही लाईव्ह फूड काउंटर्स पुरवता का?',
          },
          answer: {
            en: 'Yes, we offer live chaat, dosa, and jalebi counters tailored to your event requirements.',
            mr: 'होय, आम्ही तुमच्या आवश्यकतेनुसार लाईव्ह चाट, डोसा आणि जिलेबी काउंटर्स पुरवतो.',
          },
          category: 'catering',
          displayOrder: 2,
          isPublished: true,
        },
      ]);
      console.log('[Seed] Baseline FAQs created.');
    }

    // 4. Initial Menu Categories (if empty)
    const catCount = await MenuCategory.countDocuments();
    const categoryDocMap = {};

    if (catCount === 0 && seedMenuData.defaultCategories) {
      console.log('[Seed] Seeding menu categories...');
      for (const cat of seedMenuData.defaultCategories) {
        const createdCat = await MenuCategory.create({
          name: cat.name,
          slug: cat.slug || cat.id,
          description: cat.shortDescription || { en: '', mr: '' },
          displayOrder: cat.sortOrder || 1,
          status: 'active',
          isActive: true,
          createdBy: primaryAdmin?._id || null,
        });
        categoryDocMap[cat.slug || cat.id] = createdCat;
        categoryDocMap[cat.id] = createdCat;
      }
      console.log(`[Seed] Seeded ${Object.keys(categoryDocMap).length / 2} menu categories.`);
    } else {
      const existingCats = await MenuCategory.find().lean();
      existingCats.forEach((c) => {
        categoryDocMap[c.slug] = c;
        if (c.id) categoryDocMap[c.id] = c;
      });
      console.log(`[Seed] Menu categories already exist (${existingCats.length} found).`);
    }

    // 5. Initial Menu Items (if empty)
    const itemCount = await MenuItem.countDocuments();
    if (itemCount === 0 && seedMenuData.defaultMenuItems) {
      console.log('[Seed] Seeding menu items...');
      const itemsToInsert = [];

      for (const item of seedMenuData.defaultMenuItems) {
        const catKey = item.categorySlug || item.categoryId;
        const matchedCat = categoryDocMap[catKey] || categoryDocMap[item.categoryId];

        itemsToInsert.push({
          name: item.name,
          slug: item.slug,
          category: matchedCat ? matchedCat._id : undefined,
          categoryId: item.categoryId || (matchedCat ? matchedCat.slug : 'breakfast'),
          description: item.shortDescription || { en: '', mr: '' },
          ingredients: item.ingredients || { en: [], mr: [] },
          foodType: item.dietary?.isVeg ? 'veg' : 'non-veg',
          dietaryType: item.dietary?.isJain ? 'jain' : item.dietary?.isVeg ? 'vegetarian' : 'unspecified',
          image: item.image || { url: '', alt: { en: item.name.en, mr: item.name.mr } },
          displayOrder: itemsToInsert.length + 1,
          isFeatured: !!(item.isPopular || item.isChefSpecial),
          featured: !!(item.isPopular || item.isChefSpecial),
          status: 'published',
          isActive: true,
          createdBy: primaryAdmin?._id || null,
        });
      }

      await MenuItem.insertMany(itemsToInsert);
      console.log(`[Seed] Successfully seeded ${itemsToInsert.length} menu items.`);
    } else {
      console.log(`[Seed] Menu items already exist (${itemCount} found).`);
    }

    console.log('[Seed] Database initialization finished successfully!');
    process.exit(0);
  } catch (err) {
    console.error(`[Seed] Error executing seed: ${err.message}`);
    process.exit(1);
  }
};

seedInitialData();

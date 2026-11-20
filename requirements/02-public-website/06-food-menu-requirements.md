# Food Menu Page Requirements – Aditi Caterers

**Document ID:** AC-FE-006  
**Module:** Public Website – Food Menu  
**Priority:** High  
**Status:** Requirements Defined & Ready for Development  
**Frontend:** React + Vite + Bootstrap 5  
**Icons:** Bootstrap Icons  
**Routing:** React Router DOM  
**Language Support:** English and Marathi (Full Parity)  

---

## 1. Introduction & Overview

The **Food Menu** module is one of the central attractions of the Aditi Caterers website. Prospective clients—whether planning a traditional Maharashtrian wedding, an engagement, a family gathering, a corporate lunch, or a birthday party—visit the Food Menu to explore culinary offerings, discover authentic festive specialties, verify dietary options, and select dishes for their catering quotation.

The module provides an intuitive, appetizing, and organized experience in both **English and Marathi**, featuring rich imagery, clear categorization, dietary badges (Pure Vegetarian, Jain Options), spice level indicators, and an interactive **Menu Shortlisting** feature that allows customers to curate their dream catering spread and enquire directly.

---

## 2. Business Objectives & Principles

1. **Authentic Presentation:** Showcase Aditi Caterers' mastery of authentic Maharashtrian cuisine (e.g., Puran Poli, Ukadiche Modak, Katachi Amti, Kothimbir Vadi, Masale Bhaat) alongside popular multi-cuisine catering options (North Indian/Punjabi, South Indian, Continental starters, and Desserts).
2. **Transparent Culinary Details:** Provide clear item descriptions, ingredient highlights, flavor profiles, and dietary badges (Vegetarian, Vegan, Jain preparation available).
3. **Interactive Menu Shortlisting:** Allow prospective clients to add dishes to a persistent **"My Event Menu"** shortlist while browsing, calculate estimated counts, and send their shortlisted dishes straight into the Booking / Enquiry form or WhatsApp inquiry.
4. **Bilingual Parity:** Ensure 100% bilingual availability (Marathi and English) across dish names, category titles, descriptions, filter tags, and dietary disclosures.
5. **Portion & Sourcing Integrity:** Emphasize that actual catering quantities, ingredient sourcing (With Material vs. Without Material), live food stations, and exact pricing are customized and confirmed with the business owner based on guest count and venue setup.
6. **Responsive Accessibility:** Ensure seamless browsing on mobile phones, tablets, and desktop computers.

---

## 3. URLs, Routing & Page Structure

The Food Menu module spans three integrated route views:

| Route | View Name | Purpose |
|---|---|---|
| `/menu` | **Main Food Menu Page** | Complete culinary showcase, category directory, live search, signature dishes, dietary filters, shortlisting tray, and catering CTA. |
| `/menu/:category` | **Category Items Page** | Dedicated page for a specific menu category (e.g. `/menu/maharashtrian`, `/menu/starters`, `/menu/breakfast`, `/menu/desserts`, `/menu/main-course`, `/menu/punjabi`, `/menu/south-indian`, `/menu/beverages`). |
| `/menu/:category/:itemId` | **Dish Detail View / Modal** | Comprehensive culinary profile of a specific dish, including ingredients, flavor notes, ideal catering occasions, recommended pairings, and add-to-shortlist action. |

---

## 4. Core Catering Menu Categories

Aditi Caterers organizes its catering cuisine into 8 core categories:

1. **Breakfast & Snacks (सकाळचा नाश्ता व स्नॅक्स):** Pohe, Upma, Misal Pav, Idli Sambhar, Sabudana Khichdi, Medu Vada, Thalipeeth.
2. **Starters & Appetizers (स्टार्टर्स व तोंडी लावणी):** Kothimbir Vadi, Aluvadi, Veg Cutlets, Spring Rolls, Hara Bhara Kabab, Paneer Tikka, Crispy Corn.
3. **Maharashtrian Special Feasts (अस्सल महाराष्ट्रीयन जेवण):** Puran Poli, Katachi Amti, Batata Bhaji, Bharli Vangi, Matki Usal, Pitla Bhakri, Valache Birde, Shevbhaji.
4. **Main Course - North Indian & Punjabi (पंजाबी व उत्तर भारतीय पक्वान्ने):** Paneer Butter Masala, Veg Kolhapuri, Kaju Curry, Mix Vegetable Handi, Dal Tadka, Dal Makhani, Palak Paneer.
5. **Rotis & Breads (पोळी, भाकरी व नान):** Chapati (Ghadichi Poli), Tawa Roti, Puri, Jowar Bhakri, Bajra Bhakri, Butter Naan, Kulcha.
6. **Rice & Pulao (सुवासिक भात, पुलाव व बिर्याणी):** Steamed Basmati Rice, Masale Bhaat, Veg Dum Biryani, Jeera Rice, Dal Khichdi, Veg Pulao.
7. **Traditional Sweets & Desserts (गोड पदार्थ व मिठाया):** Ukadiche Modak, Shrikhand, Basundi, Gulab Jamun, Moong Dal Halwa, Jalebi with Rabdi, Fruit Salad, Ice Cream.
8. **Beverages & Accompaniments (पेये, सरबते व कोशिंबीर):** Solkadhi, Masala Taas (Chhaas), Mango Lassi, Kokum Sarbat, Koshimbir, Boondi Raita, Papad, Chutney, Lonche (Pickle).

---

## 5. Main Food Menu Page (`/menu`) Layout

1. **Breadcrumb Navigation:** Home > Food Menu.
2. **Menu Hero Section:**
   - Title: "Our Catering Food Menu" / "आमचा खाद्यपदार्थ मेनू".
   - Subtitle: "Authentic Flavors & Fresh Cooking for Every Celebration" / "प्रत्येक कार्यक्रमासाठी अस्सल घरगुती चव आणि ताज्या जेवणाची मेजवानी".
   - Live Search Input with instant autocomplete.
   - Quick Category Filter Pills.
3. **Menu Introduction Section:**
   - Narrative on quality, authentic home-style recipes, pure ghee preparations, and strict hygiene protocols.
4. **Category Showcase Grid:**
   - Visual cards for all 8 categories displaying category thumbnail, name, description, item count badge, and "Explore Category" button.
5. **Interactive Filter & Search Toolbar:**
   - Search by dish name or ingredient.
   - Dietary Filter: All, Pure Veg, Jain Friendly.
   - Spice Level Filter: All, Mild, Medium, Spicy.
   - Category Dropdown / Tabs.
6. **Featured & Signature Catering Dishes:**
   - Highlighted cards for most requested festive items (e.g. Ukadiche Modak, Puran Poli Feast, Masale Bhaat, Kothimbir Vadi).
   - Card includes: Food photo, Bilingual title, Dietary tag (Veg/Jain), Spice meter, Short description, and **"Add to Menu Shortlist"** toggle.
7. **Interactive Menu Shortlisting Floating Tray / Drawer:**
   - Sticky floating bar showing count of shortlisted dishes (e.g., "5 dishes selected for your event").
   - Drawer expands to show selected dishes grouped by course.
   - Action buttons: "Enquire for this Menu" (pre-fills booking form), "Share via WhatsApp", and "Clear Selection".
8. **Custom Catering & Live Counters CTA:**
   - Explains customization flexibility: live counters (Jalebi, Chaat, Dosa), seasonal menus (Aamras Puri in summer), and bespoke requests.
9. **Kitchen Hygiene & Ingredient Sourcing Standards:**
   - 4 trust badges: 100% Fresh Ingredients, Dedicated Cookware, Strict Food Hygiene, Timely Service Setup.
10. **Food Menu FAQs:**
    - Clear answers regarding tastings, minimum order sizes, custom menu alterations, Jain food availability, and seasonal specialties.
11. **Booking & Enquiry Action Banner:**
    - Direct CTAs to book an event date, call, or chat on WhatsApp.
12. **Contact Preview & Footer.**

---

## 6. Category Items Page (`/menu/:category`) Layout

1. **Breadcrumb Navigation:** Home > Food Menu > [Category Name].
2. **Category Hero Banner:**
   - Category name, localized title, detailed description, and item count.
   - High-resolution thematic background banner.
3. **Filter & Sort Toolbar:**
   - Search within this category.
   - Filter by Dietary type (All, Pure Veg, Jain Friendly).
   - Filter by Spice level (Mild, Medium, Spicy).
   - View mode toggle: Grid view vs Compact list view.
4. **Category Dishes Grid:**
   - Displays all active items in the category.
   - Each dish card provides:
     - High-quality food image with lazy loading.
     - Dietary indicators (green Veg symbol, Jain available badge).
     - Spice level icon (1-3 chillies).
     - Dish name (Marathi & English).
     - Description of ingredients and preparation style.
     - Portion / serving recommendation note.
     - "Quick View" / "View Details" link.
     - "Add to My Menu" button with active state.
5. **Suggested Catering Combinations:**
   - Curated menu pairings (e.g., pairing Puran Poli with Katachi Amti and Batata Bhaji).
6. **Other Categories Carousel / Navigation:**
   - Quick links to explore adjacent categories without returning to the main menu.
7. **Enquiry CTA & Shortlist Drawer.**

---

## 7. Dish Details View (`/menu/:category/:itemId`)

Available both as a dedicated route and an accessible quick-view modal:
- High-resolution dish photography.
- Bilingual name, category badge, and dietary flags.
- Complete description of taste profile, traditional cooking method, and texture.
- Key ingredients list.
- Allergen / dietary indicators (Nut-free, Gluten status, Jain option availability).
- Ideal event types (Wedding Muhurat feast, Satyanarayan Pooja, Birthday dinner).
- Recommended accompanying items.
- Primary CTA: "Add to Event Menu Shortlist" / "Enquire About This Dish".

---

## 8. State Management: MenuSelectionContext

To empower customers to design their personalized catering menu, a persistent context (`MenuSelectionContext`) is provided:
- `selectedItems`: Array of chosen menu items stored in local state and `localStorage`.
- `addItem(item)`: Adds dish to shortlist.
- `removeItem(itemId)`: Removes dish from shortlist.
- `toggleItem(item)`: Toggles dish in shortlist.
- `isItemSelected(itemId)`: Checks if a dish is currently selected.
- `clearMenu()`: Resets current shortlist.
- `selectedCount`: Total count of selected dishes.
- `groupedByCourse`: Automatically groups selected items by category for easy review.

---

## 9. Data Service (`menuService.js`) Architecture

The data service provides asynchronous methods connecting to backend APIs with robust offline fallback data:
- `getAllCategories()`: Fetches all 8 menu categories with metadata.
- `getCategoryBySlug(slug)`: Fetches category details by URL slug.
- `getMenuItems(categorySlug, filters)`: Retrieves dishes with category, dietary, search, and spice filters.
- `getMenuItemById(idOrSlug)`: Retrieves detailed dish information.
- `getFeaturedDishes()`: Returns highlighted signature catering dishes.
- `searchMenuItems(query)`: Performs case-insensitive bilingual substring search across title, description, and ingredients.
- `getSuggestedCombinations(categorySlug)`: Returns popular festive meal pairings.
- `getMenuFaqs()`: Returns bilingual food menu FAQs.

---

## 10. Localization & Bilingual Parity

Full parity in `frontend/src/locales/en.json` and `frontend/src/locales/mr.json`:
- Category names and descriptions.
- Filter labels (All, Vegetarian, Jain Friendly, Mild, Medium, Spicy).
- Action labels (Add to Menu, Selected, Explore Category, Quick View, View Details).
- Shortlist drawer labels (My Event Menu, Shortlisted Items, Enquire for this Menu, Clear All).
- Hygiene, FAQ, and CTA section copy.

---

## 11. Acceptance Criteria & Definition of Done

- [x] Documented detailed Food Menu specification in `06-food-menu-requirements.md`.
- [x] `menuService.js` created with rich authentic Maharashtrian dishes, category definitions, and fallback data.
- [x] `MenuSelectionContext.jsx` implemented with persistence and tray integration.
- [x] `FoodMenuPage.jsx` implemented with hero search, categories grid, signature items, and CTAs.
- [x] `MenuCategoryPage.jsx` implemented with category filters, search, and responsive item cards.
- [x] `FoodItemDetailsPage.jsx` implemented with ingredients, spice indicators, and pairings.
- [x] `FoodItemCard.jsx`, `MenuCategoryCard.jsx`, `MenuFilters.jsx`, `MenuSearch.jsx` components created.
- [x] `SelectedMenuDrawer.jsx` implemented for shortlisting event menus and transferring selections to booking enquiry.
- [x] Bilingual strings added to `en.json` and `mr.json` with 100% key parity.
- [x] `menu.css` written with responsive breakpoints, dietary badges, and custom styling.
- [x] Production build passes cleanly with 0 errors.

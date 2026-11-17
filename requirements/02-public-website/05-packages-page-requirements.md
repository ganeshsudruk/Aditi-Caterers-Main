# Catering Packages Page – Requirements

**Project:** Aditi Caterers Website  

**Module:** Public Website – Catering Packages  

**Document:** `05-packages-page-requirements.md`  

**Task ID:** AC-FE-005  

**Priority:** High  

**Status:** Requirements Defined – Budget Package Examples Added; Business Approval Pending

---

## 1. Introduction

The Catering Packages page will display the catering options offered by Aditi Caterers. Customers should be able to understand the available package types, compare their features, explore package details, and submit an enquiry or booking request.

The page must support both **English and Marathi** languages.

The website must provide three main package types:

1. With Material Catering

2. Without Material Catering

3. Custom Catering Package

**Important:** Actual package prices, food items, quantities, inclusions, minimum guest counts, and service conditions must be provided and approved by the business owner. Developers must not create fictional prices or promise unconfirmed services.

## 2. Objectives

- Display available catering packages professionally.

- Explain the difference between With Material and Without Material services.

- Allow customers to compare packages.

- Provide package details in English and Marathi.

- Allow customers to enquire about a selected package.

- Allow customers to request a customized quotation.

- Connect package enquiries with the existing booking system.

- Allow the Admin Panel to manage packages without changing frontend code.

## 3. Technology Stack

| Technology | Purpose |

|---|---|

| React + Vite | Frontend |

| Bootstrap 5 | Responsive layout and components |

| Bootstrap Icons | Icons |

| React Router DOM | Page navigation |

| Context API | Language management |

| Axios | API communication |

| Node.js + Express.js | Backend |

| MongoDB + Mongoose | Package data storage |

| Cloudinary + Multer | Package image uploads |

## 4. Page Route

Main page:

`/packages`

Suggested package detail route:

`/packages/:slug`

Examples:

- `/packages/with-material`

- `/packages/without-material`

- `/packages/custom-catering`

The detail pages should use a reusable component. The frontend must handle unavailable or unpublished packages gracefully.

## 5. Page Layout and Sections

The page should contain the following sections in order:

1. Breadcrumb

2. Hero Section

3. Introduction

4. Package Type Overview

5. Package Listing

6. Package Comparison

7. What's Included Section

8. Custom Package Section

9. How It Works

10. Frequently Asked Questions

11. Booking / Enquiry CTA

12. Contact Section

13. Footer

### 5.1 Breadcrumb

Display the current page location.

| English | Marathi |

|---|---|

| Home | मुख्यपृष्ठ |

| Packages | पॅकेजेस |

Example:

`Home > Packages`

Requirements:

- Home breadcrumb must navigate to `/`.

- Current page must be visually distinguishable.

- Breadcrumb must work in both languages.

### 5.2 Hero Section

Display a professional banner introducing catering packages.

**English content:**

Title: Catering Packages

Subtitle: Choose the Right Catering Option for Your Special Occasion.

Description: Explore our catering options and contact us to plan a menu and service arrangement according to your event requirements.

Buttons:

- Explore Packages

- Enquire Now

**Marathi content:**

Title: केटरिंग पॅकेजेस

Subtitle: तुमच्या खास कार्यक्रमासाठी योग्य केटरिंग पर्याय निवडा.

Description: तुमच्या कार्यक्रमाच्या गरजेनुसार योग्य मेनू आणि केटरिंग सेवेची माहिती मिळवण्यासाठी आमच्याशी संपर्क साधा.

Buttons:

- पॅकेजेस पहा

- चौकशी करा

Requirements:

- Use an approved catering/event photograph.

- Use a readable overlay if text appears over an image.

- Buttons must navigate to the package listing and enquiry section.

- Hero image must be responsive.

- Do not use stock images as actual Aditi Caterers event photographs without approval.

### 5.3 Introduction Section

Explain that customers can select a catering option based on their event requirements.

**English:**

"Every event has different catering requirements. Aditi Caterers offers flexible catering options to help customers plan food arrangements according to their event, guest count, and preferences."

**Marathi:**

"प्रत्येक कार्यक्रमाच्या केटरिंगच्या गरजा वेगवेगळ्या असतात. तुमचा कार्यक्रम, पाहुण्यांची संख्या आणि आवडीनुसार योग्य केटरिंग पर्याय निवडण्यासाठी Aditi Caterers कडून विविध पर्याय उपलब्ध करून दिले जातील."

The content must be editable from the Admin Panel.

### 5.4 Package Type Overview

Display three main package-type cards.

#### A. With Material Catering

**English Title:** With Material Catering  

**Marathi Title:** साहित्यांसह केटरिंग

**English Description:**

A catering arrangement where food ingredients and other agreed materials are arranged as part of the service.

**Marathi Description:**

या पर्यायामध्ये ठरल्याप्रमाणे खाद्यपदार्थांचे साहित्य आणि आवश्यक वस्तूंची व्यवस्था केटरिंग सेवेमध्ये समाविष्ट केली जाते.

Button:

- View Details / अधिक माहिती

#### B. Without Material Catering

**English Title:** Without Material Catering  

**Marathi Title:** साहित्याशिवाय केटरिंग

**English Description:**

A catering arrangement where the customer and catering team agree on the responsibilities for ingredients and materials before the event.

**Marathi Description:**

या पर्यायामध्ये खाद्यपदार्थांचे साहित्य कोण उपलब्ध करून देणार याबाबत ग्राहक आणि केटरिंग टीम यांच्यात आधीच चर्चा करून निर्णय घेतला जाईल.

Button:

- View Details / अधिक माहिती

#### C. Custom Catering Package

**English Title:** Custom Catering Package  

**Marathi Title:** कस्टम केटरिंग पॅकेज

**English Description:**

Discuss your event requirements with our team to plan a customized catering arrangement.

**Marathi Description:**

तुमच्या कार्यक्रमाच्या गरजेनुसार योग्य मेनू आणि केटरिंगची व्यवस्था ठरवण्यासाठी आमच्या टीमशी चर्चा करा.

Button:

- Request Custom Quote / कस्टम कोटेशन मागवा

**Card requirements:**

- Display an approved image or illustration.

- Display bilingual title and description.

- Use consistent card dimensions.

- Display a clear action button.

- Do not display a price unless the business owner has approved it.

- Do not display unconfirmed labels such as "Most Popular" or "Best Value".

### 5.5 Package Listing Section

Display all active packages created through the Admin Panel.

Each package card should support the following information:

| Field | Description |

|---|---|

| Package Image | Main package photograph |

| Package Name | English and Marathi names |

| Package Type | With Material / Without Material / Custom |

| Short Description | Short bilingual description |

| Price | Approved price, if available |

| Price Unit | Per Person / Per Plate / Fixed / Custom Quote |

| Minimum Guests | Minimum guest count, if applicable |

| Food Preference | Veg / Non-Veg / Both |

| Meal Type | Breakfast / Lunch / Dinner / Other |

| Menu Highlights | Approved food items |

| Availability | Active / Inactive |

| Action | View Details / Enquire Now |

**Important pricing rules:**

- Do not display `₹0` when the price is unavailable.

- If a package needs a custom quotation, display `Price on Request` / `किंमत माहितीसाठी संपर्क साधा`.

- Clearly identify whether a price is per person, per plate, or a fixed amount.

- Taxes and additional charges must only be mentioned according to confirmed business policies.

- Do not calculate or invent a final quotation on the frontend.
5.5.1 Budget-Based Packages (बजेटनुसार पॅकेजेस)
The website must support budget-based catering packages for customers who want to select a menu according to their budget and guest count.

ग्राहकांना त्यांच्या बजेटनुसार आणि पाहुण्यांच्या संख्येनुसार केटरिंग पॅकेज निवडता आले पाहिजे. बजेट वाढेल तसे पॅकेजमधील पदार्थांची विविधता आणि पर्याय वाढले पाहिजेत.

Important business rule: The prices and menus below are proposed examples for requirement planning. They are not confirmed commercial offers. The business owner must approve the price, menu, serving quantity, guest count, and inclusions before any package is published.
A. Proposed Budget Package Examples
All examples below are based on 100 guests so customers can easily compare the packages.

Package 1 – Basic Budget Package
- Proposed Price: ₹10,000
- Guest Count: 100 People
- Approximate Price: ₹100 per person
- Category: Basic
Sample Menu:
Menu Category	Included Items
Bhaji (भाजी)	1 type
Rice (भात)	1 type
Chapati OR Puri (पोळी किंवा पुरी)	Choose any one


Marathi menu:
- 1 प्रकारची भाजी
- भात
- पोळी किंवा पुरी यापैकी कोणताही एक पर्याय
This package is intended as a simple, affordable menu option. The exact bhaji, rice, and bread selection must be configurable by Admin.

Package 2 – Standard Budget Package
- Proposed Price: ₹20,000
- Guest Count: 100 People
- Approximate Price: ₹200 per person
- Category: Standard
Sample Menu:
Menu Category	Included Items
Bhaji (भाजी)	2 types
Dal / Amti (डाळ / आमटी)	1 type
Rice (भात)	1 type
Chapati OR Puri (पोळी किंवा पुरी)	Choose any one
Salad / Koshimbir (कोशिंबीर)	1 type
Pickle (लोणचे)	Included
Sweet (गोड पदार्थ)	1 type


Marathi menu:
- 2 प्रकारच्या भाज्या
- 1 प्रकारची डाळ किंवा आमटी
- भात
- पोळी किंवा पुरी यापैकी कोणताही एक पर्याय
- 1 प्रकारची कोशिंबीर
- लोणचे
- 1 प्रकारचा गोड पदार्थ
Package 3 – Premium Budget Package
- Proposed Price: ₹30,000
- Guest Count: 100 People
- Approximate Price: ₹300 per person
- Category: Premium
Sample Menu:
Menu Category	Included Items
Starter (स्टार्टर)	1 type
Special Bhaji (स्पेशल भाजी)	1 type
Regular Bhaji (साधी भाजी)	1 type
Dal / Amti (डाळ / आमटी)	1 type
Rice OR Pulao (भात किंवा पुलाव)	Choose any one
Chapati (पोळी)	Included
Puri (पुरी)	Included
Salad / Koshimbir (कोशिंबीर)	1 type
Papad (पापड)	Included
Sweet / Dessert (गोड पदार्थ)	1 type


Marathi menu:
- 1 प्रकारचा स्टार्टर
- 1 स्पेशल भाजी
- 1 साधी भाजी
- 1 प्रकारची डाळ किंवा आमटी
- भात किंवा पुलाव यापैकी एक
- पोळी
- पुरी
- 1 प्रकारची कोशिंबीर
- पापड
- 1 प्रकारचा गोड पदार्थ
Package 4 – Luxury / Customized Package
- Proposed Price: Price on Request
- Guest Count: As agreed with the customer
- Category: Luxury / Customized
Possible menu options, subject to owner approval:
- Welcome Drinks (स्वागत पेय)
- Multiple Starters (विविध स्टार्टर)
- Multiple Special Bhaji Options (विविध स्पेशल भाज्या)
- Paneer Special (पनीर स्पेशल)
- Multiple Main Course Options (विविध मुख्य पदार्थ)
- Dal / Amti (डाळ / आमटी)
- Jeera Rice / Pulao / Biryani (जिरा राईस / पुलाव / बिर्याणी)
- Chapati / Puri / Bhakri (पोळी / पुरी / भाकरी)
- Salad / Koshimbir (कोशिंबीर)
- Papad / Pickle (पापड / लोणचे)
- Multiple Sweets (विविध गोड पदार्थ)
- Ice Cream / Dessert (आईस्क्रीम / डेझर्ट)
The customer must be able to discuss a customized menu and receive a quotation after the business confirms the requirements.
B. Package Comparison – Sample Only
Feature	Basic ₹10K	Standard ₹20K	Premium ₹30K	Luxury
Guest Count	100	100	100	Custom
Bhaji	1	2	2	Custom
Dal / Amti	—	1	1	Custom
Rice	1	1	1	Multiple options
Chapati / Puri	Any one	Any one	Both	Custom
Starter	—	—	1	Multiple
Salad / Koshimbir	—	1	1	Multiple
Sweet	—	1	1	Multiple
Dessert	—	—	Optional	Custom
Price	₹10,000	₹20,000	₹30,000	On Request


The comparison must be generated from package data managed by Admin. Do not hardcode these sample values in the frontend.
C. Guest Count Options
The package system must support different guest counts, such as:
- 50 people
- 100 people
- 150 people
- 200 people
- 300 people
- 500 or more people
Requirements:
- Admin must configure the guest count associated with each package price.
- Admin must be able to set a minimum and, if required, maximum guest count.
- Customers must be able to enter their expected guest count.
- If the customer's guest count does not match a configured package quantity, the website must offer an enquiry or quotation request rather than inventing a final price.
- Additional guest charges must only be shown when the business owner has approved the rate and pricing rule.
- The system must not assume that a 100-person package price can be multiplied proportionally for every guest count.
D. Menu Selection and Customization Rules
Each package must support menu categories and configurable item quantities.

Examples:
- Bhaji: 1 choice in Basic, 2 choices in Standard and Premium.
- Rice: 1 configured choice or a choice between approved rice options.
- Chapati OR Puri: customer can select one option where the package allows it.
- Premium and Luxury packages may include more menu categories and choices.
- Admin must decide whether a menu item is fixed, selectable, optional, or available at an additional approved charge.
Requirements:
- Admin must assign menu items from the existing Food Menu collection.
- Admin must configure how many items a customer can select in each category.
- Admin must define allowed alternatives, such as Chapati OR Puri and Rice OR Pulao.
- The customer must not be able to select more items than the package permits.
- The customer must see only available and approved menu options.
- Additional items or substitutions must be sent for confirmation and may require a revised quotation.
- Menu selection must be saved with the package enquiry.
E. With Material and Without Material Pricing
Budget packages must support both catering service types:
- With Material Catering (साहित्यांसह केटरिंग)
- Without Material Catering (साहित्याशिवाय केटरिंग)
Admin must be able to configure whether a package is available for one or both service types. If prices differ between the two service types, Admin must be able to maintain separate approved prices and inclusions.

Do not assume that the sample prices above apply to both service types. The business owner must confirm:
- Whether the package price includes ingredients and food materials.
- What the customer must arrange for Without Material Catering.
- Whether cooking, serving staff, utensils, equipment, transport, setup, and cleanup are included or charged separately.
- Whether taxes or other charges apply.
F. Package Enquiry Behaviour
When a customer selects a budget package:
1. Pass the package ID and package type to the booking/enquiry form.
2. Display the selected package name, approved price, guest count, and menu.
3. Allow the customer to enter the actual expected guest count.
4. Allow only the menu choices permitted by that package.
5. Ask the customer to select With Material or Without Material if both are available.
6. Save the selected package, service type, guest count, and menu choices with the enquiry.
7. If the guest count, menu, or service type requires a custom quotation, clearly show that the final price will be confirmed by the catering team.
8. Include the selected package details in the WhatsApp enquiry message.
G. Admin Panel – Budget Package Management
Admin must be able to:
- Create Basic, Standard, Premium, and Luxury packages.
- Set and edit the package price and pricing unit.
- Set the included guest count, minimum guest count, and optional maximum guest count.
- Configure different prices for different guest counts when approved.
- Select With Material, Without Material, or both.
- Assign menu categories and menu items to a package.
- Set the allowed number of menu selections in each category.
- Mark menu items as fixed, selectable, optional, or additional-charge items.
- Configure approved additional-item charges, if applicable.
- Add bilingual package names and descriptions.
- Upload package images.
- Set display order and featured status.
- Activate, deactivate, or archive packages.
- Preview the package before publishing.
H. Business Approval Checklist for Budget Packages
Before publishing these sample packages, the business owner must confirm:
- [ ] Whether ₹10,000, ₹20,000, and ₹30,000 are approved prices for 100 people.
- [ ] Whether the proposed menu items are available.
- [ ] Exact names and options for each bhaji, rice, sweet, and other food item.
- [ ] Serving quantity and portion size per guest.
- [ ] Whether Chapati OR Puri is the correct choice for each package.
- [ ] Whether Premium includes both Chapati and Puri.
- [ ] Whether each package is With Material, Without Material, or available in both forms.
- [ ] Whether the package includes cooking, serving, staff, utensils, transport, setup, and cleanup.
- [ ] Additional guest pricing, if offered.
- [ ] Any taxes or other additional charges.
- [ ] Which event types can use each package.
Until these details are confirmed, keep the packages as draft records in the Admin Panel and do not publish them as confirmed offers.

### 5.6 Package Detail Page

When a customer clicks View Details, open the corresponding package detail page.

Suggested layout:

**Section 1 – Package Overview**

- Package name

- Package image

- Package description

- Package type

- Price information, if approved

- Enquire Now button

**Section 2 – Food Menu**

- Breakfast

- Starters

- Main Course

- Rice and Breads

- Desserts

- Beverages

- Other menu categories

Only show categories and items assigned to that package.

**Section 3 – Package Inclusions**

Display confirmed inclusions, such as:

- Food preparation

- Ingredients and materials

- Serving arrangements

- Serving staff

- Equipment

- Transportation

- Setup and cleanup

These are configurable fields. Do not automatically mark them as included. Each inclusion must be approved by the business owner.

**Section 4 – Package Conditions**

Display confirmed conditions, where applicable:

- Minimum guest count

- Booking requirements

- Advance payment

- Cancellation policy

- Additional charges

- Service area

- Availability

Do not publish conditions until they have been confirmed.

**Section 5 – Related Packages**

Display other active packages.

**Section 6 – Enquiry CTA**

Button: Enquire About This Package / या पॅकेजबद्दल चौकशी करा

The selected package must automatically be passed to the enquiry form.

### 5.7 Package Comparison Section

Allow customers to understand the difference between the three package types.

Example comparison structure:

| Feature | With Material | Without Material | Custom |

|---|---|---|---|

| Food material arrangement | As agreed | Customer/team responsibility as agreed | As agreed |

| Menu selection | Approved menu | Approved menu | Customizable |

| Guest count | As configured | As configured | Discuss with team |

| Pricing | If available | If available | Quotation |

| Enquiry | Available | Available | Available |

**Requirements:**

- Use actual approved business policies in the final comparison.

- Do not imply that all inclusions are guaranteed.

- Display a responsive comparison table on desktop.

- On mobile, use stacked comparison cards or a horizontally scrollable table.

- Maintain clear English and Marathi translations.

- Each package must have an enquiry action.

### 5.8 What's Included Section

Provide a clear explanation of what may be included in a catering arrangement.

Possible configurable categories:

1. Food preparation

2. Food ingredients

3. Cooking arrangements

4. Serving arrangements

5. Serving staff

6. Transportation

7. Equipment

8. Setup and cleanup

Each item must support:

- English title

- Marathi title

- English description

- Marathi description

- Included / Not Included / Available on Request status

- Display order

**Business confirmation required:** The owner must confirm which services are actually offered under each package type.

### 5.9 Custom Package Section

Customers who do not find a suitable package should be able to request a customized quotation.

**English content:**

Title: Looking for a Custom Catering Package?

Description: Tell us about your event, guest count, food preferences, and catering requirements. Our team will discuss a suitable arrangement with you.

Button: Request a Custom Quote

**Marathi content:**

Title: तुमच्यासाठी खास केटरिंग पॅकेज हवे आहे का?

Description: तुमचा कार्यक्रम, पाहुण्यांची संख्या, जेवणाची आवड आणि केटरिंगच्या गरजा आम्हाला सांगा. आमची टीम तुमच्याशी चर्चा करून योग्य व्यवस्था ठरवेल.

Button: कस्टम कोटेशन मागवा

Button action:

- Navigate to `/booking?packageType=custom`

- Automatically select Custom Catering Package in the booking form.

### 5.10 How It Works Section

Display the basic enquiry process.

1. **Choose a Package / पॅकेज निवडा**  

   Select a suitable catering option.

2. **Share Event Details / कार्यक्रमाची माहिती द्या**  

   Provide event date, location, guest count, and requirements.

3. **Discuss Requirements / गरजांबद्दल चर्चा करा**  

   The catering team reviews the enquiry and discusses the arrangements.

4. **Receive Quotation / कोटेशन मिळवा**  

   The team provides a quotation after confirming the requirements.

5. **Confirm Booking / बुकिंग निश्चित करा**  

   Booking is confirmed according to the agreed terms.

Do not display a guaranteed response time or booking confirmation without business approval.

### 5.11 Frequently Asked Questions

Display common package-related questions.

Suggested questions:

**Q1. What is the difference between With Material and Without Material Catering?**

Marathi: साहित्यांसह आणि साहित्याशिवाय केटरिंगमध्ये काय फरक आहे?

**Q2. Can I customize my catering package?**

Marathi: मी माझे केटरिंग पॅकेज कस्टमाइज करू शकतो का?

**Q3. How is the package price calculated?**

Marathi: पॅकेजची किंमत कशी ठरवली जाते?

**Q4. Can I select my own food menu?**

Marathi: मी माझ्या आवडीचा मेनू निवडू शकतो का?

**Q5. Can I enquire before confirming a booking?**

Marathi: बुकिंग निश्चित करण्यापूर्वी मी चौकशी करू शकतो का?

**Q6. How can I get a quotation for my event?**

Marathi: माझ्या कार्यक्रमासाठी कोटेशन कसे मिळेल?

Requirements:

- FAQ content must be manageable from the Admin Panel.

- Use Bootstrap Accordion.

- Support both languages.

- Answers must reflect actual business policies.

- Do not promise services or prices that are not confirmed.

### 5.12 Booking / Enquiry CTA

Display a prominent enquiry section.

**English:**

Title: Plan Your Event Catering With Us

Description: Contact Aditi Caterers to discuss your package, menu, and event requirements.

Buttons:

- Book Now

- Contact Us

- WhatsApp Us

**Marathi:**

Title: तुमच्या कार्यक्रमाच्या केटरिंगचे नियोजन आमच्यासोबत करा

Description: तुमचे पॅकेज, मेनू आणि कार्यक्रमाच्या गरजांबद्दल चर्चा करण्यासाठी Aditi Caterers शी संपर्क साधा.

Buttons:

- बुकिंग करा

- संपर्क साधा

- WhatsApp वर संपर्क करा

Contact:

- Phone: `+91 9975959391`

- WhatsApp: `https://wa.me/919975959391`

WhatsApp message should include the selected package name when the customer starts an enquiry from a package card or detail page.

### 5.13 Footer

Use the shared website footer component.

Include:

- Business name and approved logo

- Short business description

- Navigation links

- Services links

- Package links

- Contact number

- WhatsApp link

- Approved social media links

- Copyright information

Do not create fictional social media URLs or business addresses.

---

## 6. Booking Form Integration

Package enquiry must connect with the existing booking form.

Suggested route:

`/booking?packageType=with-material&packageId=PACKAGE_ID`

Example routes:

- `/booking?packageType=with-material`

- `/booking?packageType=without-material`

- `/booking?packageType=custom`

When a customer selects Enquire Now from a package card:

1. Navigate to the booking page.

2. Automatically select the relevant package type.

3. Preselect the package if a package ID is available.

4. Allow the customer to enter event details.

5. Submit the enquiry to the backend.

6. Display a success or error message.

### 6.1 Required Booking Information

Use the existing booking form fields:

- Full Name

- Mobile Number

- Email Address (optional)

- Event Type

- Event Date

- Event Time

- Number of Guests

- Event Address

- Village / City

- Catering Type

- Selected Package

- Food Preference

- Meal Type

- Menu Selection

- Special Requirements

- Budget (optional)

- Additional Notes

The package selection must be linked to the enquiry record.

### 6.2 Form Validation

- Name is required.

- Mobile number is required and must be valid.

- Event type is required.

- Event date must be valid.

- Guest count must be a positive number.

- Required fields must be validated on both frontend and backend.

- Show clear English and Marathi validation messages.

- Prevent duplicate submissions while the request is processing.

---

## 7. Admin Panel Requirements

Admin users must be able to manage packages without developer involvement.

### 7.1 Package Management

Suggested Admin Panel route:

`/admin/packages`

Required operations:

- Add Package

- View Package

- Edit Package

- Delete Package

- Activate / Deactivate Package

- Search Packages

- Filter by Package Type

- Sort Packages

- Manage Package Images

- Manage Package Menu Items

- Manage Package Inclusions

- Manage Package FAQs

### 7.2 Add / Edit Package Form

| Field | Type | Required |

|---|---|---|

| Package Name (English) | Text | Yes |

| Package Name (Marathi) | Text | Yes |

| Package Slug | Text | Yes |

| Package Type | Select | Yes |

| Short Description (English) | Textarea | Yes |

| Short Description (Marathi) | Textarea | Yes |

| Full Description (English) | Rich Text / Textarea | No |

| Full Description (Marathi) | Rich Text / Textarea | No |

| Package Image | File Upload | No |

| Price | Number | No |

| Price Unit | Select | No |

| Minimum Guests | Number | No |

| Food Preference | Multi-select | No |

| Meal Type | Multi-select | No |

| Menu Items | Multi-select | No |

| Package Inclusions | Configurable List | No |

| Package Conditions | Textarea | No |

| Display Order | Number | No |

| Featured | Checkbox | No |

| Active Status | Toggle | Yes |

Price Unit options:

- Per Person

- Per Plate

- Fixed Price

- Custom Quotation

Marathi labels:

- प्रति व्यक्ती

- प्रति प्लेट

- निश्चित किंमत

- कस्टम कोटेशन

### 7.3 Admin Validation

- Package name must be unique where required.

- Slug must be unique.

- Price cannot be negative.

- Minimum guest count cannot be negative.

- Only valid image formats should be accepted.

- Image size must follow the configured upload limit.

- Required bilingual fields must be completed before publishing.

- Inactive packages must not appear on the public website.

- Admin must receive a confirmation before deleting a package.

- If a package is linked to existing bookings, prevent unsafe deletion or use an archive/deactivation approach.

---

## 8. Database Requirements

Create a `packages` collection in MongoDB.

### 8.1 Suggested Package Schema

```js

{

  name: {

    en: String,

    mr: String

  },

  slug: {

    type: String,

    unique: true

  },

  packageType: {

    type: String,

    enum: [

      "with-material",

      "without-material",

      "custom"

    ]

  },

  shortDescription: {

    en: String,

    mr: String

  },

  description: {

    en: String,

    mr: String

  },

  image: {

    url: String,

    publicId: String

  },

  price: {

    amount: Number,

    unit: {

      type: String,

      enum: [

        "per-person",

        "per-plate",

        "fixed",

        "custom-quote"

      ]

    }

  },

  minimumGuests: Number,

  foodPreferences: [String],

  mealTypes: [String],

  menuItems: [

    {

      type: mongoose.Schema.Types.ObjectId,

      ref: "MenuItem"

    }

  ],

  inclusions: [

    {

      title: {

        en: String,

        mr: String

      },

      description: {

        en: String,

        mr: String

      },

      status: {

        type: String,

        enum: [

          "included",

          "not-included",

          "on-request"

        ]

      }

    }

  ],

  conditions: {

    en: String,

    mr: String

  },

  isFeatured: {

    type: Boolean,

    default: false

  },

  displayOrder: {

    type: Number,

    default: 0

  },

  isActive: {

    type: Boolean,

    default: true

  },

  createdAt: Date,

  updatedAt: Date

}

```

**Developer notes:**

- Use Mongoose schema validation.

- Add indexes for `slug`, `packageType`, and `isActive` where appropriate.

- Store image URLs and Cloudinary public IDs.

- Avoid duplicating complete menu records inside packages; use references to the existing menu collection where appropriate.

- Validate all incoming data on the backend.

- Do not expose unpublished package data through public APIs.

---

## 9. Backend API Requirements

### 9.1 Public APIs

| Method | Endpoint | Purpose |

|---|---|---|

| GET | `/api/public/packages` | Get all active packages |

| GET | `/api/public/packages/featured` | Get featured packages |

| GET | `/api/public/packages/:slug` | Get package details |

| GET | `/api/public/packages/type/:type` | Filter by package type |

Support optional query parameters:

- `language=en`

- `language=mr`

- `type=with-material`

- `type=without-material`

- `type=custom`

- `page=1`

- `limit=10`

Public APIs must return only active packages.

### 9.2 Admin APIs

| Method | Endpoint | Purpose |

|---|---|---|

| POST | `/api/admin/packages` | Create package |

| GET | `/api/admin/packages` | Get all packages |

| GET | `/api/admin/packages/:id` | Get package by ID |

| PUT | `/api/admin/packages/:id` | Update package |

| PATCH | `/api/admin/packages/:id/status` | Change active status |

| DELETE | `/api/admin/packages/:id` | Delete or archive package |

All Admin APIs must require valid JWT authentication and the appropriate admin authorization.

### 9.3 API Response Example

```json

{

  "success": true,

  "message": "Packages fetched successfully",

  "data": [

    {

      "_id": "PACKAGE_ID",

      "name": {

        "en": "Wedding Catering Package",

        "mr": "लग्न समारंभ केटरिंग पॅकेज"

      },

      "slug": "wedding-catering",

      "packageType": "with-material",

      "price": {

        "amount": null,

        "unit": "custom-quote"

      },

      "isActive": true

    }

  ]

}

```

The example is a response structure only. It is not an actual package or approved business price.

---

## 10. Frontend Component Structure

Suggested folder structure:

```text

frontend/

└── src/

    ├── pages/

    │   └── packages/

    │       ├── PackagesPage.jsx

    │       └── PackageDetailsPage.jsx

    │

    ├── components/

    │   └── packages/

    │       ├── PackageHero.jsx

    │       ├── PackageTypeCards.jsx

    │       ├── PackageCard.jsx

    │       ├── PackageList.jsx

    │       ├── PackageComparison.jsx

    │       ├── PackageInclusions.jsx

    │       ├── CustomPackageCTA.jsx

    │       ├── PackageProcess.jsx

    │       ├── PackageFAQ.jsx

    │       └── PackageEnquiryCTA.jsx

    │

    ├── services/

    │   └── packageService.js

    │

    └── locales/

        ├── en.json

        └── mr.json

```

### Component Responsibilities

| Component | Responsibility |

|---|---|

| PackagesPage | Main packages page |

| PackageHero | Hero banner |

| PackageTypeCards | Display three main package types |

| PackageCard | Display individual package |

| PackageList | Render package collection |

| PackageComparison | Compare package features |

| PackageInclusions | Display approved inclusions |

| CustomPackageCTA | Custom quotation section |

| PackageProcess | Explain enquiry process |

| PackageFAQ | Display FAQs |

| PackageEnquiryCTA | Booking and contact actions |

| PackageDetailsPage | Reusable package details page |

Use reusable components and avoid duplicating the same package card or detail-page markup.

---

## 11. Bilingual Requirements

All customer-facing text must support English and Marathi.

Example translation keys:

```json

{

  "packages": {

    "title": "Catering Packages",

    "subtitle": "Choose the Right Catering Option",

    "withMaterial": "With Material Catering",

    "withoutMaterial": "Without Material Catering",

    "customPackage": "Custom Catering Package",

    "viewDetails": "View Details",

    "enquireNow": "Enquire Now",

    "priceOnRequest": "Price on Request",

    "minimumGuests": "Minimum Guests",

    "comparePackages": "Compare Packages",

    "requestCustomQuote": "Request Custom Quote"

  }

}

```

Marathi translations:

```json

{

  "packages": {

    "title": "केटरिंग पॅकेजेस",

    "subtitle": "योग्य केटरिंग पर्याय निवडा",

    "withMaterial": "साहित्यांसह केटरिंग",

    "withoutMaterial": "साहित्याशिवाय केटरिंग",

    "customPackage": "कस्टम केटरिंग पॅकेज",

    "viewDetails": "अधिक माहिती",

    "enquireNow": "चौकशी करा",

    "priceOnRequest": "किंमत माहितीसाठी संपर्क साधा",

    "minimumGuests": "किमान पाहुणे",

    "comparePackages": "पॅकेजेसची तुलना करा",

    "requestCustomQuote": "कस्टम कोटेशन मागवा"

  }

}

```

Requirements:

- Use the existing Language Context.

- Do not hardcode English text directly into JSX.

- Store translations in the appropriate locale files.

- Use the selected language consistently across all package sections.

- Use Poppins for English and Noto Sans Devanagari for Marathi, following the branding requirements.

---

## 12. Responsive Design Requirements

The page must work on mobile, tablet, laptop, and desktop.

### Desktop

- Display package cards in a three-column grid when space permits.

- Use a clear comparison table.

- Display package details with image and content in balanced columns.

- Keep enquiry buttons visible and easy to use.

### Tablet

- Display two package cards per row when appropriate.

- Allow comparison tables to scroll horizontally.

- Keep text and images properly aligned.

### Mobile

- Display package cards in a single column.

- Use full-width or comfortably sized CTA buttons.

- Stack package details vertically.

- Avoid text overflow.

- Use a mobile-friendly comparison layout.

- Ensure forms and dropdowns are easy to operate.

- Keep touch targets at least 44 × 44 CSS pixels.

Minimum supported width: 320px.

Follow Bootstrap 5 responsive breakpoints and the existing `responsive-guidelines.md`.

---

## 13. UI and Design Requirements

- Follow the approved Aditi Caterers brand guidelines.

- Use the approved color palette:

  - Maroon: `#641E2B`

  - Gold: `#C9A45C`

  - White: `#FFFFFF`

  - Light Cream: `#FAF7F2`

  - Dark Gray: `#333333`

- Use Bootstrap 5 components and utilities.

- Use Bootstrap Icons instead of emojis.

- Maintain consistent card radius, spacing, and typography.

- Use high-quality approved catering images.

- Avoid excessive animations and decorative elements.

- Ensure buttons have hover, focus, disabled, and loading states.

- Maintain consistent styling with the Home, About, and Services pages.

---

## 14. Loading, Empty, and Error States

### Loading State

- Display Bootstrap spinner or skeleton cards while packages are loading.

- Prevent duplicate API calls where possible.

- Avoid blank page rendering.

### Empty State

English: No packages are available at the moment. Please contact us for catering enquiries.

Marathi: सध्या कोणतेही पॅकेज उपलब्ध नाही. केटरिंगविषयी चौकशी करण्यासाठी कृपया आमच्याशी संपर्क साधा.

### Error State

English: Unable to load packages. Please try again later.

Marathi: पॅकेजेस लोड करता आले नाहीत. कृपया पुन्हा प्रयत्न करा.

Requirements:

- Provide a Retry button.

- Do not display technical API errors to customers.

- Log useful errors for developers.

- Handle missing package images with an approved fallback image.

---

## 15. SEO Requirements

- Unique page title: `Catering Packages | Aditi Caterers`

- Meta description describing the available catering options.

- Each package detail page must have a unique title and description.

- Use meaningful URLs/slugs.

- Add canonical URLs.

- Use descriptive image alt text.

- Add Open Graph metadata.

- Include published package pages in the sitemap.

- Do not index unpublished or inactive packages.

- Ensure bilingual metadata is provided where supported.

---

## 16. Accessibility Requirements

- Use semantic HTML elements.

- Provide meaningful image alt text in the selected language.

- Ensure keyboard navigation works.

- Provide visible focus indicators.

- Use accessible labels for form controls.

- Ensure sufficient color contrast.

- Accordion controls must expose their expanded/collapsed state.

- Do not use color alone to communicate package status.

- Ensure buttons and links have clear accessible names.

Target: WCAG 2.2 AA where applicable.

---

## 17. Performance Requirements

- Use lazy loading for package images below the fold.

- Optimize images before uploading.

- Use responsive image sizes where possible.

- Avoid unnecessary API requests.

- Use pagination if the package list becomes large.

- Keep React components reusable.

- Avoid unnecessary component re-renders.

- Configure appropriate caching for public package data.

- Do not load large images when small thumbnails are sufficient.

---

## 18. Security Requirements

- Validate all package data on the backend.

- Protect Admin APIs with JWT authentication.

- Verify admin authorization for all package-management operations.

- Validate uploaded image type and size.

- Do not expose Cloudinary secrets or database credentials in frontend code.

- Sanitize rich text before rendering.

- Prevent unauthorized package creation, editing, and deletion.

- Never trust price or package details submitted by the frontend without backend validation.

---

## 19. Testing Requirements

### Functional Testing

- [ ] Packages page loads successfully.

- [ ] All active packages are displayed.

- [ ] Inactive packages are hidden from public users.

- [ ] Package types are displayed correctly.

- [ ] Package details page opens correctly.

- [ ] Package comparison displays correct data.

- [ ] Price and price unit are displayed correctly when available.

- [ ] Price on Request appears when pricing is not available.

- [ ] Package menu items are displayed correctly.

- [ ] Custom package enquiry works.

- [ ] Booking form receives the selected package.

- [ ] WhatsApp enquiry includes relevant package information.

- [ ] FAQs open and close correctly.
- [ ] Admin can create, edit, activate, deactivate, and manage packages.
- [ ] Budget packages display the correct approved price and guest count.
- [ ] Basic, Standard, Premium, and Luxury package categories work correctly.
- [ ] Menu choices follow the configured selection limits.
- [ ] Chapati OR Puri and other alternatives enforce the correct choice rules.
- [ ] With Material and Without Material availability and pricing are handled separately when configured.
- [ ] Unconfigured guest counts request a quotation instead of showing an invented price.
- [ ] Additional menu-item charges appear only when approved and configured.
### Bilingual Testing

- [ ] English content displays correctly.

- [ ] Marathi content displays correctly.

- [ ] Language switching updates the entire page.

- [ ] Marathi fonts render correctly.

- [ ] Package names and descriptions are translated.

- [ ] Validation and error messages are translated.

### Responsive Testing

- [ ] Mobile layout works at 320px.

- [ ] Mobile layout works at 375px.

- [ ] Tablet layout works correctly.

- [ ] Desktop layout works correctly.

- [ ] Comparison section works on mobile.

- [ ] Images do not stretch or overflow.

- [ ] Buttons are easy to tap.

- [ ] No horizontal page overflow occurs.

### API Testing

- [ ] Public package API returns active packages.

- [ ] Package detail API returns the correct package.

- [ ] Invalid package slug returns a proper 404 response.

- [ ] Admin APIs reject unauthorized requests.

- [ ] Invalid package data is rejected.

- [ ] Image upload and deletion are handled correctly.

- [ ] API errors are handled properly in the frontend.

---

## 20. Definition of Done

The Packages Page task will be considered complete when:

1. The main Packages page is implemented.

2. All three package types are displayed.

3. Package cards and details pages are reusable.

4. Package comparison is implemented.

5. Custom package enquiry is functional.

6. Booking integration correctly passes package information.

7. Admin Panel package management is connected to the backend.

8. MongoDB package data is stored and retrieved correctly.

9. English and Marathi translations are complete.

10. Responsive behaviour is verified on mobile, tablet, and desktop.

11. Loading, empty, and error states are implemented.

12. SEO and accessibility requirements are addressed.

13. All relevant tests pass.

14. No fictional pricing, inclusions, or business claims are displayed.

15. Code is reviewed and merged according to the team's Git workflow.

---

## 21. Developer Task Assignment

| Detail | Value |

|---|---|

| Task ID | AC-FE-005 |

| Task Name | Catering Packages Page |

| Suggested Branch | `feature/packages-page` |

| Priority | High |

| Estimated Duration | 4–5 working days |

| Dependencies | Navbar, Home Page, Services Page, Booking Form, API |

| Main Components | PackagesPage, PackageCard, PackageComparison, PackageDetailsPage |

| Backend Dependency | Package CRUD APIs |

| Database Dependency | Packages Collection |

**Suggested Git commands:**

```bash

git checkout dev

git pull origin dev

git checkout -b feature/packages-page

git add .

git commit -m "feat: implement bilingual catering packages page"

git push origin feature/packages-page

```

Create a Pull Request into the agreed development branch after testing.

---

## 22. Pending Business Information

The following information must be confirmed by the Aditi Caterers business owner before publishing actual packages:
- [ ] Final list of available packages.
- [ ] Approval of proposed budget packages for 100 guests (₹10,000 / ₹20,000 / ₹30,000 and Luxury quotation).
- [ ] Approved menu items and number of choices for each budget tier.
- [ ] Approved prices for each guest-count tier.
- [ ] Separate approved prices and inclusions for With Material and Without Material packages.
- [ ] Package names.

- [ ] Approved package prices.

- [ ] Pricing unit (per person, per plate, or fixed).

- [ ] Minimum guest count, if applicable.

- [ ] Food items included in each package.

- [ ] Veg / Non-Veg / Both options.

- [ ] Breakfast, lunch, and dinner availability.

- [ ] Exact difference between With Material and Without Material services.

- [ ] Responsibility for ingredients and other materials.

- [ ] Serving staff availability.

- [ ] Cooking and serving equipment arrangements.

- [ ] Transportation availability and charges.

- [ ] Setup and cleanup responsibilities.

- [ ] Advance payment and cancellation policies.

- [ ] Package-specific photographs.

- [ ] Service locations and availability.

Until these details are confirmed, use draft content in the Admin Panel and do not publish unverified package information.

---

## 23. Next Document

After completing the Packages Page, the next document will be:

`requirements/02-public-website/06-food-menu-requirements.md`

This document will define food categories, menu items, Veg/Non-Veg filters, food photographs, menu details, and Admin Panel menu management.
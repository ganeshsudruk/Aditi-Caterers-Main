# Services Page Requirements – Aditi Caterers

**Document ID:** AC-FE-004  
**Module:** Public Website – Services  
**Priority:** High  
**Status:** Ready for Development  
**Frontend:** React + Vite + Bootstrap 5  
**Icons:** Bootstrap Icons  
**Routing:** React Router DOM  
**Language Support:** English and Marathi

---

## 1. Introduction

The Services page explains all catering services offered by Aditi Caterers.

Visitors should be able to explore different event categories, understand the catering arrangements available, view relevant photographs, and submit enquiries for their events.

The website must support multiple catering services, including:

- Wedding Catering
- Birthday Catering
- Engagement Catering
- Reception Catering
- Corporate Event Catering
- Religious Event Catering
- Family Function Catering
- Other Special Events

The Services module must include:

1. Main Services Listing Page.
2. Individual Service Detail Pages.
3. Catering Options.
4. Service Enquiry Navigation.
5. English and Marathi language support.

## 2. Objectives

1. Display all catering services offered by Aditi Caterers.
2. Explain each service clearly.
3. Help visitors identify the service suitable for their event.
4. Explain catering with material and without material.
5. Display relevant food and event photographs.
6. Provide direct navigation to booking enquiries.
7. Support English and Marathi.
8. Allow the administrator to manage service information.
9. Provide responsive layouts for all devices.
10. Avoid publishing unverified business claims.

## 3. Routes and Page Structure

| Page | Route |
|---|---|
| All Services | `/services` |
| Wedding Catering | `/services/wedding` |
| Birthday Catering | `/services/birthday` |
| Engagement Catering | `/services/engagement` |
| Reception Catering | `/services/reception` |
| Corporate Catering | `/services/corporate` |
| Religious Catering | `/services/religious` |
| Family Functions | `/services/family-functions` |
| Other Events | `/services/other` |

All individual service pages should use a reusable service detail page component.

---

# PART A – MAIN SERVICES LISTING PAGE

## 4. Services Page Sections

Implement the following sections in order:

1. Navbar
2. Services Hero / Banner
3. Introduction
4. All Catering Services
5. Catering Options
6. Types of Events We Serve
7. Our Service Approach
8. Featured Food and Event Gallery
9. Frequently Asked Questions Preview
10. Booking Call-to-Action
11. Contact Information
12. Footer

The Navbar and Footer must reuse the shared layout components.

## 5. Services Hero / Banner

### 5.1 English Content

**Heading:** Our Catering Services

**Description:**

"From weddings and birthdays to corporate and family celebrations, Aditi Caterers provides catering arrangements for different occasions."

### 5.2 Marathi Content

**Heading:** आमच्या केटरिंग सेवा

**Description:**

"लग्न समारंभ आणि वाढदिवसापासून ते कॉर्पोरेट व कौटुंबिक कार्यक्रमांपर्यंत विविध प्रसंगांसाठी अदिती केटरर्स केटरिंग सेवा पुरवते."

### 5.3 UI Requirements

- Display a relevant catering photograph.
- Display page heading and short description.
- Add breadcrumb navigation.
- Use approved brand colors.
- Maintain readable text contrast.
- Support both languages.

### 5.4 Breadcrumb

| Label | Marathi | Route |
|---|---|---|
| Home | मुख्यपृष्ठ | `/` |
| Services | सेवा | `/services` |

---

## 6. Services Introduction

### 6.1 English Content

**Heading:** Catering for Every Special Occasion

"Every event has different food and service requirements. At Aditi Caterers, we provide catering arrangements according to the occasion, number of guests, food preferences, and customer requirements."

### 6.2 Marathi Content

**Heading:** प्रत्येक खास प्रसंगासाठी केटरिंग सेवा

"प्रत्येक कार्यक्रमाच्या जेवणाच्या आणि सेवेच्या गरजा वेगवेगळ्या असतात. अदिती केटरर्समध्ये कार्यक्रमाचा प्रकार, पाहुण्यांची संख्या, खाद्यपदार्थांची पसंती आणि ग्राहकांच्या गरजेनुसार केटरिंगची व्यवस्था केली जाते."

### 6.3 Requirements

- Keep the introduction short.
- Display it above the service cards.
- Use a readable content width.
- Avoid repeating the entire About Us page description.

---

## 7. All Catering Services

**Priority:** Critical

### 7.1 Section Heading

English: Explore Our Catering Services

Marathi: आमच्या केटरिंग सेवांची माहिती घ्या

### 7.2 Service Categories

The following service categories must be supported.

| ID | Service Name | Marathi Name | Route |
|---|---|---|---|
| wedding | Wedding Catering | लग्न समारंभ | `/services/wedding` |
| birthday | Birthday Catering | वाढदिवस समारंभ | `/services/birthday` |
| engagement | Engagement Catering | साखरपुडा | `/services/engagement` |
| reception | Reception Catering | स्वागत समारंभ | `/services/reception` |
| corporate | Corporate Catering | कॉर्पोरेट कार्यक्रम | `/services/corporate` |
| religious | Religious Event Catering | धार्मिक कार्यक्रम | `/services/religious` |
| family-functions | Family Function Catering | कौटुंबिक कार्यक्रम | `/services/family-functions` |
| other | Other Event Catering | इतर कार्यक्रम | `/services/other` |

### 7.3 Service Card Design

Each service card must contain:

1. Service photograph.
2. Service title.
3. Short description.
4. View Details button.
5. Enquire Now button or equivalent CTA.

### 7.4 Example Card Content

**Wedding Catering**

English:

"Plan your wedding food arrangements with catering options suitable for your celebration and guest requirements."

Marathi:

"तुमच्या लग्नसोहळ्यासाठी कार्यक्रम आणि पाहुण्यांच्या गरजेनुसार योग्य केटरिंग व्यवस्थेचे नियोजन करा."

**Birthday Catering**

English:

"Arrange food and catering services for birthday celebrations of different sizes."

Marathi:

"लहान किंवा मोठ्या वाढदिवसाच्या कार्यक्रमांसाठी जेवण आणि केटरिंगची व्यवस्था करा."

**Engagement Catering**

English:

"Explore catering arrangements for engagement ceremonies and family gatherings."

Marathi:

"साखरपुडा समारंभ आणि कौटुंबिक कार्यक्रमांसाठी केटरिंगची व्यवस्था जाणून घ्या."

**Reception Catering**

English:

"Plan food arrangements for your reception with suitable menu and catering options."

Marathi:

"तुमच्या स्वागत समारंभासाठी योग्य मेनू आणि केटरिंग पर्यायांसह जेवणाचे नियोजन करा."

Other service descriptions should follow the same standard.

### 7.5 Functional Requirements

- Clicking View Details opens the corresponding service detail page.
- Clicking Enquire Now opens the booking page.
- Service cards must be responsive.
- Images must maintain consistent proportions.
- Display only active services.
- Display featured services in the configured order.
- Service information must be manageable through the Admin Panel.
- Do not display inactive or unpublished services.

### 7.6 Service Card Navigation

| Action | Route |
|---|---|
| Wedding Details | `/services/wedding` |
| Birthday Details | `/services/birthday` |
| Engagement Details | `/services/engagement` |
| Reception Details | `/services/reception` |
| Corporate Details | `/services/corporate` |
| Religious Details | `/services/religious` |
| Family Functions Details | `/services/family-functions` |
| Other Events Details | `/services/other` |
| Enquire Now | `/booking` |

---

# PART B – CATERING OPTIONS

## 8. Catering Options

**Purpose:** Explain the two main catering arrangements offered by Aditi Caterers.

### 8.1 Section Heading

English: Choose Your Catering Arrangement

Marathi: तुमचा केटरिंग पर्याय निवडा

### 8.2 Option 1 – Catering With Material

**English Heading:** Catering With Material

**Marathi Heading:** साहित्यासह केटरिंग

**English Description:**

"We arrange the agreed food materials and provide catering services according to your event requirements."

**Marathi Description:**

"कार्यक्रमाच्या गरजेनुसार ठरलेले खाद्यपदार्थांचे साहित्य आम्ही उपलब्ध करून देतो आणि केटरिंग सेवा पुरवतो."

**Suggested Features:**

- Food materials as agreed.
- Menu planning discussion.
- Catering service arrangements.
- Event-based food planning.

### 8.3 Option 2 – Catering Without Material

**English Heading:** Catering Without Material

**Marathi Heading:** साहित्याशिवाय केटरिंग

**English Description:**

"We provide catering services using the food materials arranged by the customer, according to the agreed requirements."

**Marathi Description:**

"ग्राहकांनी उपलब्ध करून दिलेल्या खाद्यपदार्थांच्या साहित्याचा वापर करून ठरलेल्या गरजेनुसार आम्ही केटरिंग सेवा पुरवतो."

**Suggested Features:**

- Customer-arranged materials.
- Catering service arrangements.
- Menu and quantity discussion.
- Event-based planning.

### 8.4 Important Business Rule

The exact responsibility for purchasing materials, transportation, equipment, cooking arrangements, serving staff, and cleanup must be agreed with the business owner and customer.

Do not promise that every item is included in either package unless confirmed.

### 8.5 UI Requirements

- Display two visually distinct cards.
- Use relevant photographs or Bootstrap Icons.
- Include short descriptions.
- Include an Enquire Now button.
- Maintain consistent card heights.
- Support English and Marathi.

**Enquire Now Route:** `/booking`

When a customer selects an option, the booking page should automatically preselect the corresponding catering type.

Suggested query parameters:

- `/booking?cateringType=with-material`
- `/booking?cateringType=without-material`

The booking form must validate the selected value.

---

# PART C – INDIVIDUAL SERVICE DETAIL PAGES

## 9. Common Service Detail Page Structure

All individual service pages must follow a common reusable layout.

### 9.1 Required Sections

1. Service Hero Banner
2. Service Introduction
3. Event Requirements
4. Available Catering Options
5. Menu Suggestions
6. Service Gallery
7. How We Arrange the Service
8. Frequently Asked Questions
9. Booking CTA
10. Related Services

### 9.2 Dynamic Page Content

Each service page should display its own:

- Service name.
- English description.
- Marathi description.
- Hero photograph.
- Event-related photographs.
- Relevant menu categories.
- Catering option availability.
- FAQs.
- Related services.
- SEO metadata.

### 9.3 Reusable Page Component

Suggested component:

`src/pages/Services/ServiceDetails.jsx`

The component should identify the requested service using the route parameter and load the correct content.

Example:

- `/services/wedding` loads Wedding Catering.
- `/services/birthday` loads Birthday Catering.

Do not create eight completely separate page implementations containing duplicated code.

### 9.4 Service Not Found

If an invalid or unavailable service slug is requested:

- Display a custom 404 or service-not-found message.
- Provide a Back to Services button.
- Do not display unrelated service information.

English:

"Sorry, the requested catering service could not be found."

Marathi:

"माफ करा, तुम्ही शोधत असलेली केटरिंग सेवा उपलब्ध नाही."

---

## 10. Wedding Catering Detail Page

**Route:** `/services/wedding`

### English Content

**Heading:** Wedding Catering Services

"Make your wedding celebration special with catering arrangements planned according to your event requirements, guest count, and food preferences."

### Marathi Content

**Heading:** लग्न समारंभासाठी केटरिंग सेवा

"तुमच्या लग्नसोहळ्यासाठी कार्यक्रमाचे स्वरूप, पाहुण्यांची संख्या आणि खाद्यपदार्थांची पसंती लक्षात घेऊन केटरिंग व्यवस्थेचे नियोजन करा."

### Suggested Information Sections

- Wedding food arrangements.
- Guest count discussion.
- Menu planning.
- Catering with material.
- Catering without material.
- Food serving arrangements, if offered.
- Event photographs.
- Booking enquiry.

### Suggested Menu Categories

- Welcome Drinks.
- Starters.
- Main Course.
- Maharashtrian Food.
- Punjabi Food.
- Desserts.
- Beverages.

These are menu suggestions only. Actual availability must be confirmed.

---

## 11. Birthday Catering Detail Page

**Route:** `/services/birthday`

### English Content

**Heading:** Birthday Catering Services

"Celebrate birthdays with food arrangements planned according to your guest count, event preferences, and selected menu."

### Marathi Content

**Heading:** वाढदिवसासाठी केटरिंग सेवा

"पाहुण्यांची संख्या, कार्यक्रमाची गरज आणि निवडलेला मेनू लक्षात घेऊन वाढदिवसासाठी जेवणाची व्यवस्था करा."

### Suggested Information Sections

- Birthday party food arrangements.
- Children's birthday events.
- Family birthday gatherings.
- Menu selection.
- Catering options.
- Food photographs.
- Booking enquiry.

Do not promise birthday decoration, cake supply, venue, or entertainment services unless the business confirms that it provides them.

---

## 12. Engagement Catering Detail Page

**Route:** `/services/engagement`

### English Content

**Heading:** Engagement Catering Services

"Plan your engagement celebration with suitable catering arrangements for family members and guests."

### Marathi Content

**Heading:** साखरपुडा समारंभासाठी केटरिंग सेवा

"कुटुंबीय आणि पाहुण्यांसाठी योग्य केटरिंग व्यवस्थेसह तुमचा साखरपुडा समारंभ नियोजित करा."

### Suggested Information Sections

- Engagement event catering.
- Food and menu planning.
- Guest count.
- Catering arrangement options.
- Food photographs.
- Booking enquiry.

---

## 13. Reception Catering Detail Page

**Route:** `/services/reception`

### English Content

**Heading:** Reception Catering Services

"Arrange food and catering services for your reception according to the event schedule, guest requirements, and selected menu."

### Marathi Content

**Heading:** स्वागत समारंभासाठी केटरिंग सेवा

"कार्यक्रमाचे वेळापत्रक, पाहुण्यांची संख्या आणि निवडलेला मेनू लक्षात घेऊन तुमच्या स्वागत समारंभासाठी केटरिंगची व्यवस्था करा."

### Suggested Information Sections

- Reception food arrangements.
- Guest serving requirements.
- Menu selection.
- Catering options.
- Event photographs.
- Booking enquiry.

---

## 14. Corporate Event Catering Detail Page

**Route:** `/services/corporate`

### English Content

**Heading:** Corporate Event Catering

"Explore catering arrangements for business meetings, office events, corporate gatherings, and other professional occasions."

### Marathi Content

**Heading:** कॉर्पोरेट कार्यक्रमांसाठी केटरिंग

"व्यावसायिक बैठका, ऑफिस कार्यक्रम, कॉर्पोरेट मेळावे आणि इतर व्यावसायिक प्रसंगांसाठी केटरिंग व्यवस्थेची माहिती घ्या."

### Suggested Information Sections

- Office meetings.
- Corporate gatherings.
- Breakfast and lunch arrangements.
- Tea and refreshments, if offered.
- Menu and guest count discussion.
- Booking enquiry.

Do not promise recurring corporate contracts or large-scale service capacity without business confirmation.

---

## 15. Religious Event Catering Detail Page

**Route:** `/services/religious`

### English Content

**Heading:** Religious Event Catering

"Arrange food for religious functions and traditional family occasions according to your preferences and event requirements."

### Marathi Content

**Heading:** धार्मिक कार्यक्रमांसाठी केटरिंग

"तुमच्या पसंतीनुसार आणि कार्यक्रमाच्या गरजेनुसार धार्मिक समारंभ व पारंपरिक कौटुंबिक कार्यक्रमांसाठी जेवणाची व्यवस्था करा."

### Suggested Information Sections

- Religious ceremonies.
- Traditional food arrangements.
- Menu preferences.
- Guest count.
- Catering options.
- Booking enquiry.

Specific religious menu or dietary claims must be confirmed with the business.

---

## 16. Family Function Catering Detail Page

**Route:** `/services/family-functions`

### English Content

**Heading:** Family Function Catering

"Plan food arrangements for family gatherings, anniversaries, naming ceremonies, and other special family occasions."

### Marathi Content

**Heading:** कौटुंबिक कार्यक्रमांसाठी केटरिंग

"कौटुंबिक मेळावे, लग्नाचे वाढदिवस, नामकरण समारंभ आणि इतर खास कौटुंबिक कार्यक्रमांसाठी जेवणाचे नियोजन करा."

### Suggested Information Sections

- Family gatherings.
- Anniversary functions.
- Naming ceremonies.
- Traditional occasions.
- Menu selection.
- Booking enquiry.

---

## 17. Other Event Catering Detail Page

**Route:** `/services/other`

### English Content

**Heading:** Catering for Other Special Events

"Have another event in mind? Contact Aditi Caterers to discuss your event requirements and possible catering arrangements."

### Marathi Content

**Heading:** इतर खास कार्यक्रमांसाठी केटरिंग

"तुमचा वेगळा कार्यक्रम आहे का? तुमच्या कार्यक्रमाच्या गरजा आणि केटरिंगच्या संभाव्य व्यवस्थेबद्दल चर्चा करण्यासाठी अदिती केटरर्सशी संपर्क साधा."

### Suggested Information Sections

- Other social events.
- Community gatherings.
- Special occasions.
- Custom menu discussion.
- Catering options.
- Booking enquiry.

Do not automatically confirm service availability for an event type. The business must review and accept the enquiry.

---

# PART D – COMMON FUNCTIONAL REQUIREMENTS

## 18. Service Enquiry Integration

**Priority:** Critical

Every service page must provide a clear way to submit an enquiry.

### 18.1 Enquiry Buttons

| Button | English | Marathi | Action |
|---|---|---|---|
| Main CTA | Book This Service | ही सेवा बुक करा | `/booking` |
| Secondary CTA | Contact Us | संपर्क साधा | `/contact` |
| Phone CTA | Call Now | आत्ताच कॉल करा | `tel:+919975959391` |
| WhatsApp CTA | WhatsApp Us | WhatsApp वर संपर्क करा | WhatsApp link |

### 18.2 Preselected Service

When a visitor clicks Book This Service from an individual service page, the booking page should automatically select the relevant event type.

Examples:

- Wedding page → Wedding.
- Birthday page → Birthday.
- Engagement page → Engagement.
- Corporate page → Corporate Event.

Suggested routes:

- `/booking?eventType=wedding`
- `/booking?eventType=birthday`
- `/booking?eventType=engagement`
- `/booking?eventType=corporate`

The booking form must read and validate query parameters.

### 18.3 Booking Form Fields

The booking form will be specified in the separate Booking Requirements document.

At minimum, the selected service must be passed to the booking form correctly.

---

## 19. Service Search and Filtering

If the service catalogue grows, support service search and category filtering.

### Requirements

- Search services by name.
- Support English and Marathi search terms.
- Filter active services.
- Provide a clear filters option.
- Show a friendly message when no services match.

This functionality is optional for the initial release because the current service catalogue is small.

---

## 20. API Integration Requirements

Service content must be retrieved from public backend APIs.

### 20.1 Suggested Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/public/services` | Fetch all active services |
| GET | `/api/public/services/:slug` | Fetch service details |
| GET | `/api/public/services/featured` | Fetch featured services |
| GET | `/api/public/services/:slug/gallery` | Fetch service photographs |
| GET | `/api/public/services/:slug/related` | Fetch related services |

These endpoints are proposed API contracts. Backend developers must confirm final routes and response structures.

### 20.2 Suggested Service Data Structure

```json
{
  "id": "service-id",
  "name": {
    "en": "Wedding Catering",
    "mr": "लग्न समारंभासाठी केटरिंग"
  },
  "slug": "wedding",
  "description": {
    "en": "Catering arrangements for wedding events.",
    "mr": "लग्न समारंभासाठी केटरिंग व्यवस्था."
  },
  "image": {
    "url": "approved-image-url",
    "alt": {
      "en": "Wedding catering arrangement",
      "mr": "लग्न समारंभातील केटरिंग व्यवस्था"
    }
  },
  "cateringOptions": [
    "with-material",
    "without-material"
  ],
  "isActive": true,
  "isFeatured": true,
  "sortOrder": 1
}
```

This is a proposed data structure, not an existing database record.

### 20.3 API Requirements

- Use Axios.
- Create reusable service API functions.
- Handle loading and error states.
- Display only active services.
- Support bilingual fields.
- Avoid duplicate API calls.
- Validate service slugs.
- Use approved images only.
- Do not expose private admin information.

---

## 21. Admin Panel Integration

The Services module must be manageable through the Admin Panel.

Suggested Admin Panel module:

`03-admin-panel/05-service-management.md`

### 21.1 Admin Capabilities

The administrator should be able to:

- Add a new service.
- Edit existing services.
- View all services.
- Delete or deactivate services.
- Upload service photographs.
- Change service titles.
- Add English descriptions.
- Add Marathi descriptions.
- Set service slugs.
- Mark services as featured.
- Set service display order.
- Enable or disable catering options.
- Manage service gallery photographs.
- Update SEO title and description.

### 21.2 Service Status

| Status | Meaning |
|---|---|
| Active | Visible on public website |
| Inactive | Hidden from public website |
| Draft | Saved but not published |

### 21.3 Validation

- Service name is required in both languages before publishing.
- Slug must be unique.
- Invalid image uploads must be rejected.
- Required descriptions must be validated.
- Only authorized administrators can manage services.
- Deleting a service must not silently break existing booking records.

---

## 22. Loading, Empty, and Error States

### Loading

- Show Bootstrap spinner or skeleton cards.
- Maintain card dimensions to reduce layout shifts.

### Empty

English:

"No catering services are currently available."

Marathi:

"सध्या कोणत्याही केटरिंग सेवा उपलब्ध नाहीत."

### Error

English:

"Unable to load catering services. Please try again."

Marathi:

"केटरिंग सेवा लोड करता आल्या नाहीत. कृपया पुन्हा प्रयत्न करा."

### Error Handling Requirements

- Show user-friendly messages.
- Provide retry where appropriate.
- Do not expose server stack traces.
- Keep the rest of the website functional if one service fails.

---

## 23. Suggested React Component Structure

```text
src/
├── pages/
│   └── Services/
│       ├── Services.jsx
│       ├── ServiceDetails.jsx
│       └── services.css
│
├── components/
│   └── services/
│       ├── ServicesHero.jsx
│       ├── ServicesIntroduction.jsx
│       ├── ServiceGrid.jsx
│       ├── ServiceCard.jsx
│       ├── CateringOptions.jsx
│       ├── EventsWeServe.jsx
│       ├── ServiceHero.jsx
│       ├── ServiceInformation.jsx
│       ├── ServiceMenuSuggestions.jsx
│       ├── ServiceGallery.jsx
│       ├── ServiceProcess.jsx
│       ├── RelatedServices.jsx
│       ├── ServiceCTA.jsx
│       └── ServiceLoader.jsx
│
└── services/
    └── serviceService.js
```

### Component Responsibilities

| Component | Responsibility |
|---|---|
| `Services.jsx` | Main services listing page |
| `ServiceDetails.jsx` | Reusable individual service page |
| `ServicesHero.jsx` | Services page banner |
| `ServicesIntroduction.jsx` | Services introduction |
| `ServiceGrid.jsx` | Display all service cards |
| `ServiceCard.jsx` | Individual service card |
| `CateringOptions.jsx` | With-material and without-material options |
| `EventsWeServe.jsx` | Event category overview |
| `ServiceHero.jsx` | Individual service banner |
| `ServiceInformation.jsx` | Service description |
| `ServiceMenuSuggestions.jsx` | Related menu categories |
| `ServiceGallery.jsx` | Service-specific photographs |
| `ServiceProcess.jsx` | Service process |
| `RelatedServices.jsx` | Related service links |
| `ServiceCTA.jsx` | Booking and contact actions |
| `ServiceLoader.jsx` | Loading and fallback UI |
| `serviceService.js` | Service API functions |

Use reusable components and avoid duplicating code across individual service pages.

---

## 24. Bilingual Language Requirements

All Services page content must support English and Marathi.

### Requirements

- English is the default language.
- Use the shared Navbar language switcher.
- Use React Context API for language state.
- Persist language preference using localStorage.
- Translate service names and descriptions.
- Translate buttons and labels.
- Translate FAQs where displayed.
- Use Poppins for English.
- Use Noto Sans Devanagari for Marathi.
- Avoid hardcoding translated strings throughout components.

### Suggested Translation Keys

```json
{
  "services": {
    "pageTitle": "Our Catering Services",
    "introTitle": "Catering for Every Special Occasion",
    "allServices": "Explore Our Catering Services",
    "cateringOptions": "Choose Your Catering Arrangement",
    "withMaterial": "Catering With Material",
    "withoutMaterial": "Catering Without Material",
    "viewDetails": "View Details",
    "enquireNow": "Enquire Now",
    "bookThisService": "Book This Service",
    "contactUs": "Contact Us",
    "wedding": "Wedding Catering",
    "birthday": "Birthday Catering",
    "engagement": "Engagement Catering",
    "reception": "Reception Catering",
    "corporate": "Corporate Catering",
    "religious": "Religious Event Catering",
    "familyFunctions": "Family Function Catering",
    "other": "Other Event Catering"
  }
}
```

Create the equivalent Marathi translations in `mr.json`.

---

## 25. SEO Requirements

### Main Services Page

**Page Title:**

Aditi Caterers | Wedding, Birthday and Event Catering Services

**Meta Description:**

"Explore Aditi Caterers services for weddings, birthdays, engagements, receptions, corporate events, religious functions, and other occasions."

### Individual Service Pages

Each service page must have a unique title and description.

Examples:

**Wedding Page Title:**

Wedding Catering Services | Aditi Caterers

**Birthday Page Title:**

Birthday Catering Services | Aditi Caterers

### SEO Rules

- One primary H1 per page.
- Use meaningful H2 and H3 headings.
- Add descriptive image alt text.
- Use clean service URLs.
- Add canonical URLs after the production domain is confirmed.
- Add Open Graph metadata.
- Use appropriate structured data where applicable.
- Do not add unverified business information to structured data.
- Support English and Marathi content.

---

## 26. Accessibility Requirements

- Use semantic HTML.
- Provide meaningful image alt text.
- Ensure keyboard-accessible links and buttons.
- Maintain visible focus states.
- Maintain sufficient color contrast.
- Use accessible dropdown and navigation controls.
- Do not rely only on color to communicate service status.
- Ensure readable Marathi text.
- Maintain logical heading hierarchy.

---

## 27. Responsive Design Requirements

Supported widths:

| Device | Width |
|---|---|
| Small Mobile | 320px – 374px |
| Mobile | 375px – 575px |
| Tablet | 576px – 991px |
| Laptop | 992px – 1199px |
| Desktop | 1200px – 1399px |
| Large Desktop | 1400px and above |

### Mobile

- Service cards should stack or use a suitable two-column layout where readable.
- Images must fit the screen.
- CTA buttons must be easy to tap.
- Individual service pages must stack content vertically.
- No horizontal scrolling.
- Menu suggestions must remain readable.

### Tablet

- Use suitable card grids.
- Maintain balanced image and text layouts.
- Prevent content overflow.

### Desktop

- Display service cards in a balanced grid.
- Use two-column detail layouts where suitable.
- Maintain consistent content width and spacing.

---

## 28. Performance Requirements

- Optimize service photographs.
- Use WebP or AVIF where supported.
- Lazy-load below-the-fold images.
- Avoid loading all service galleries on the listing page.
- Load only the required individual service content.
- Avoid unnecessary API requests.
- Use reusable React components.
- Minimize layout shifts.
- Keep animations lightweight.

---

## 29. Security Requirements

- Public APIs must return only published service data.
- Protect admin service-management routes.
- Validate all admin inputs on the backend.
- Sanitize user-provided text where necessary.
- Validate uploaded image type and size.
- Never expose database credentials.
- Never expose JWT secrets.
- Do not allow public visitors to modify service content.

---

## 30. Testing Requirements

### Services Listing

- [ ] Services page loads at `/services`.
- [ ] All active services are displayed.
- [ ] Service titles are correct.
- [ ] Service photographs load correctly.
- [ ] View Details navigation works.
- [ ] Enquire Now navigation works.
- [ ] Catering options display correctly.
- [ ] With-material enquiry preselection works.
- [ ] Without-material enquiry preselection works.

### Individual Service Pages

- [ ] Wedding page loads.
- [ ] Birthday page loads.
- [ ] Engagement page loads.
- [ ] Reception page loads.
- [ ] Corporate page loads.
- [ ] Religious page loads.
- [ ] Family Functions page loads.
- [ ] Other Events page loads.
- [ ] Each page displays the correct service information.
- [ ] Related services links work.
- [ ] Booking CTA passes the correct event type.
- [ ] Invalid service slugs display the not-found state.

### Language Testing

- [ ] English content works.
- [ ] Marathi content works.
- [ ] Language preference persists.
- [ ] Marathi font loads correctly.
- [ ] No untranslated labels remain.
- [ ] Long Marathi text does not break the layout.

### Responsive Testing

- [ ] 320px mobile.
- [ ] 375px mobile.
- [ ] 425px mobile.
- [ ] 768px tablet.
- [ ] 1024px laptop.
- [ ] 1366px desktop.
- [ ] 1440px large desktop.

### API Testing

- [ ] Services API works.
- [ ] Service details API works.
- [ ] Loading state works.
- [ ] Empty state works.
- [ ] Error state works.
- [ ] Only active services are displayed.
- [ ] Unpublished services are not visible publicly.

### UI Testing

- [ ] No broken images.
- [ ] No overlapping content.
- [ ] No horizontal scrolling.
- [ ] Cards have consistent spacing.
- [ ] Buttons are styled consistently.
- [ ] No critical browser console errors.

---

## 31. Definition of Done

The Services module will be considered complete when:

1. Main Services page is implemented.
2. All configured service detail pages work.
3. Individual service pages use reusable components.
4. Catering options are displayed correctly.
5. Booking navigation passes the selected service.
6. English and Marathi translations work.
7. Responsive layouts are complete.
8. Backend API integration is completed.
9. Loading, empty, and error states are implemented.
10. Admin-managed content is displayed correctly.
11. SEO metadata is configured.
12. Accessibility requirements are addressed.
13. All important test cases pass.
14. No critical console errors remain.
15. Code is committed and pushed to the assigned branch.
16. Implementation is reviewed before merging.

---

## 32. Developer Task Assignment

**Task ID:** AC-FE-004

**Task Name:** Implement Responsive Bilingual Services Module

**Suggested Branch:**

`feature/services-page`

**Priority:** High

**Dependencies:**

- React project setup completed.
- React Router configured.
- Bootstrap 5 installed.
- Bootstrap Icons installed.
- Navbar and Footer available.
- Language Context API configured.
- Home Page components available.
- About Page design standards available.
- Booking route configured or agreed.

**Expected Deliverables:**

- Services listing page.
- Reusable individual service detail page.
- Service cards.
- Catering options section.
- English and Marathi translations.
- Service API integration.
- Booking enquiry navigation.
- Responsive UI.
- Loading, empty, and error states.
- SEO metadata.
- Testing results.

**Suggested Git Commit:**

`feat: implement responsive bilingual catering services`

---

## 33. Pending Business Confirmations

The following details must be confirmed before publishing:

- [ ] Final list of services actually offered.
- [ ] Whether corporate catering is available.
- [ ] Whether religious catering is available.
- [ ] Whether family function catering is available.
- [ ] Exact scope of catering with material.
- [ ] Exact scope of catering without material.
- [ ] Whether serving staff are included.
- [ ] Whether cooking equipment is provided.
- [ ] Whether transportation is included.
- [ ] Whether cleanup is included.
- [ ] Actual event photographs for each service.
- [ ] Menu options available for each service.
- [ ] Service availability for different locations.

Do not promise services or arrangements that have not been confirmed by the business owner.

---

## 34. Final Acceptance Criteria

The Services module must:

- Clearly display available catering services.
- Explain each service in English and Marathi.
- Provide individual service detail pages.
- Explain both catering arrangements.
- Allow customers to submit relevant booking enquiries.
- Display only approved business content.
- Work correctly across mobile, tablet, and desktop.
- Integrate with the backend and Admin Panel.
- Follow the approved Aditi Caterers branding guidelines.

**Next Document:** `05-packages-page-requirements.md`
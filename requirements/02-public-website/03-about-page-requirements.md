# About Us Page Requirements – Aditi Caterers

**Document ID:** AC-FE-003  
**Module:** Public Website – About Us Page  
**Priority:** High  
**Status:** Ready for Development  
**Frontend:** React + Vite + Bootstrap 5  
**Icons:** Bootstrap Icons  
**Routing:** React Router DOM  
**Language Support:** English and Marathi

---

## 1. Introduction

The About Us page provides detailed information about Aditi Caterers, its business background, catering services, values, and approach to customer satisfaction.

The purpose of this page is to help visitors understand the business, build trust, and learn why Aditi Caterers can be considered for their special occasions.

The page must present genuine business information in a professional and engaging format.

All content must be available in English and Marathi.

## 2. Objectives

The main objectives are:

1. Introduce Aditi Caterers and its business background.
2. Explain the company's catering services.
3. Present its experience and journey using verified information.
4. Communicate the business mission and vision.
5. Highlight the business's service values.
6. Showcase actual food and event photographs.
7. Build customer trust.
8. Encourage visitors to submit catering enquiries.
9. Provide English and Marathi content.
10. Maintain a consistent design across all devices.

## 3. Page URL

| Page | Route |
|---|---|
| About Us | `/about` |

The About Us link in the Navbar must navigate to this route.

## 4. About Page Sections

Implement the following sections in the specified order:

1. Page Hero / Banner
2. About Aditi Caterers
3. Our Story / Business Journey
4. Our Experience
5. Our Mission
6. Our Vision
7. Our Core Values
8. Our Catering Services Overview
9. Our Working Process
10. Why Choose Aditi Caterers
11. Business Gallery Preview
12. Call-to-Action Section
13. Contact Information
14. Footer

The Navbar and Footer must reuse the shared layout components.

---

## 5. Page Hero / Banner

**Priority:** High

### 5.1 Purpose

Introduce the About Us page and clearly identify the page visitors are viewing.

### 5.2 English Content

**Page Title:** About Aditi Caterers

**Subtitle:** "Serving Delicious Food and Creating Memorable Experiences."

### 5.3 Marathi Content

**Page Title:** अदिती केटरर्सबद्दल

**Subtitle:** "स्वादिष्ट जेवण आणि अविस्मरणीय अनुभव देण्याचा आमचा प्रयत्न."

### 5.4 UI Requirements

- Display a professional catering-related background image.
- Display the page title prominently.
- Display a short subtitle.
- Add a Home / About Us breadcrumb.
- Maintain readable text contrast.
- Use an approved business photograph where available.
- Provide a branded fallback if no approved image exists.

### 5.5 Breadcrumb

| English | Marathi | Route |
|---|---|---|
| Home | मुख्यपृष्ठ | `/` |
| About Us | आमच्याबद्दल | `/about` |

The breadcrumb must be clickable and keyboard accessible.

---

## 6. About Aditi Caterers

**Priority:** Critical

### 6.1 Purpose

Provide the main introduction to Aditi Caterers.

### 6.2 Layout

Use a responsive two-column layout:

**Left Column:**
- Actual business or food photograph.
- Optional secondary image.

**Right Column:**
- Section heading.
- Business introduction.
- Short description.
- Learn More / Contact Us button.

On mobile devices, display the image and text vertically.

### 6.3 English Content

**Heading:** Welcome to Aditi Caterers

**Description:**

"Welcome to Aditi Caterers. We provide catering services for weddings, birthdays, engagements, receptions, corporate events, religious functions, and other special occasions.

We believe that good food plays an important role in making every celebration memorable. Our focus is on understanding customer requirements, planning suitable food arrangements, and delivering catering services according to the needs of each event.

Whether customers need catering with materials or without materials, we aim to provide suitable arrangements based on their preferences and event requirements."

### 6.4 Marathi Content

**Heading:** अदिती केटरर्समध्ये आपले स्वागत आहे

**Description:**

"अदिती केटरर्समध्ये आपले स्वागत आहे. आम्ही लग्न समारंभ, वाढदिवस, साखरपुडा, रिसेप्शन, कॉर्पोरेट कार्यक्रम, धार्मिक कार्यक्रम आणि इतर विविध खास प्रसंगांसाठी केटरिंग सेवा पुरवतो.

प्रत्येक कार्यक्रम खास बनवण्यात स्वादिष्ट जेवणाची महत्त्वाची भूमिका असते, असा आमचा विश्वास आहे. ग्राहकांच्या गरजा समजून घेणे, योग्य खाद्यपदार्थांचे नियोजन करणे आणि कार्यक्रमाच्या आवश्यकतेनुसार केटरिंग सेवा देणे यावर आमचा भर असतो.

ग्राहकांना साहित्यासह किंवा साहित्याशिवाय केटरिंग सेवा हवी असल्यास त्यांच्या पसंतीनुसार आणि कार्यक्रमाच्या गरजेनुसार योग्य व्यवस्था करण्याचा आमचा प्रयत्न असतो."

### 6.5 Functional Requirements

- Display approved business information.
- Support both languages.
- Provide a Contact Us button.
- Use optimized images.
- Do not display unconfirmed claims.
- Keep text readable and properly aligned.

**Contact Us Route:** `/contact`

---

## 7. Our Story / Business Journey

**Purpose:** Explain how Aditi Caterers started and how the business developed.

### 7.1 Section Heading

English: Our Story

Marathi: आमचा प्रवास

### 7.2 Content Requirements

This section should explain:

- How the catering business started.
- Why the business was established.
- The business's journey.
- Important milestones.
- Development of catering services.
- Changes in food arrangements and customer services over time.

### 7.3 Content Status

<em>Business history information must be collected and approved before publication.</em>

Developers must not invent:

- Business founding year.
- Founder names.
- Number of years in business.
- Number of completed events.
- Historical achievements.
- Customer counts.

### 7.4 Suggested Placeholder Content

**English:**

"Every catering journey has a story. Aditi Caterers continues to focus on providing food and catering arrangements for different celebrations and occasions."

**Marathi:**

"प्रत्येक केटरिंग व्यवसायाचा स्वतःचा एक प्रवास असतो. विविध समारंभ आणि कार्यक्रमांसाठी खाद्यपदार्थ व केटरिंगची व्यवस्था देण्यावर अदिती केटरर्सचा भर आहे."

This placeholder should be replaced with the actual business story after approval.

### 7.5 UI Requirements

- Use a timeline or story-based layout.
- Display actual business photographs where available.
- Keep paragraphs short.
- Support English and Marathi.
- Hide unconfirmed timeline dates.

---

## 8. Our Experience

**Purpose:** Present the experience and background of Aditi Caterers.

### 8.1 Section Heading

English: Our Experience

Marathi: आमचा अनुभव

### 8.2 Information to Display

Display the following only after confirmation:

- Years of experience.
- Types of events served.
- Important business milestones.
- Awards and recognitions.
- Other verified business achievements.

### 8.3 Important Confirmation

The business owner previously mentioned "70" years of experience. It is not yet confirmed whether this means 70 years, another figure, or a different business detail.

Therefore:

- Do not publish "70 Years of Experience" without confirmation.
- Do not use a number counter with unverified values.
- Do not invent completed-event statistics.
- Obtain confirmation from the business owner before displaying experience claims.

### 8.4 UI Requirements

Once verified, experience information may be presented using:

- Number highlight cards.
- Short achievement descriptions.
- Timeline.
- Approved award photographs.

If information is not confirmed, hide the numerical statistics section.

---

## 9. Our Mission

### 9.1 Section Heading

English: Our Mission

Marathi: आमचे ध्येय

### 9.2 English Content

"To provide suitable catering services for different occasions by understanding customer requirements, focusing on food quality, and planning food arrangements according to each event."

### 9.3 Marathi Content

"ग्राहकांच्या गरजा समजून घेऊन, खाद्यपदार्थांच्या गुणवत्तेवर लक्ष केंद्रित करून आणि प्रत्येक कार्यक्रमाच्या आवश्यकतेनुसार जेवणाचे नियोजन करून योग्य केटरिंग सेवा देणे हे आमचे ध्येय आहे."

### 9.4 UI Requirements

- Display a relevant Bootstrap Icon.
- Use a separate mission card or content block.
- Keep the text concise.
- Support both languages.

---

## 10. Our Vision

### 10.1 Section Heading

English: Our Vision

Marathi: आमची दृष्टी

### 10.2 English Content

"To build lasting customer relationships by providing catering services that make special occasions more enjoyable and memorable."

### 10.3 Marathi Content

"उत्तम केटरिंग सेवा देऊन ग्राहकांशी दीर्घकालीन विश्वासाचे नाते निर्माण करणे आणि त्यांचे खास प्रसंग अधिक आनंददायी व अविस्मरणीय बनवणे ही आमची दृष्टी आहे."

### 10.4 UI Requirements

- Display a suitable Bootstrap Icon.
- Use a design visually consistent with the Mission section.
- Ensure proper mobile spacing.

---

## 11. Our Core Values

**Purpose:** Communicate the values that guide the business.

### 11.1 Section Heading

English: Our Core Values

Marathi: आमची मूलभूत मूल्ये

### 11.2 Suggested Values

| Value | Marathi | Description |
|---|---|---|
| Food Quality | खाद्यपदार्थांची गुणवत्ता | Focus on the quality of food served. |
| Customer Satisfaction | ग्राहकांचे समाधान | Understand and consider customer requirements. |
| Proper Planning | योग्य नियोजन | Plan food arrangements according to events. |
| Service Commitment | सेवेसाठी बांधिलकी | Work according to agreed service requirements. |
| Flexibility | लवचिकता | Offer suitable catering arrangements. |
| Trust | विश्वास | Maintain clear communication with customers. |

### 11.3 Marathi Descriptions

**खाद्यपदार्थांची गुणवत्ता:** ग्राहकांना चांगल्या दर्जाचे खाद्यपदार्थ देण्यावर भर.

**ग्राहकांचे समाधान:** ग्राहकांच्या गरजा आणि पसंती समजून घेणे.

**योग्य नियोजन:** कार्यक्रमाच्या स्वरूपानुसार जेवणाची व्यवस्था करणे.

**सेवेसाठी बांधिलकी:** ठरलेल्या नियोजनानुसार सेवा देण्याचा प्रयत्न.

**लवचिकता:** ग्राहकांच्या गरजेनुसार योग्य केटरिंग पर्याय उपलब्ध करणे.

**विश्वास:** ग्राहकांशी स्पष्ट आणि प्रामाणिक संवाद ठेवणे.

### 11.4 UI Requirements

- Display values in responsive cards.
- Use Bootstrap Icons.
- Use short descriptions.
- Maintain consistent card heights.
- Do not make unsupported certification or quality-guarantee claims.

---

## 12. Our Catering Services Overview

**Purpose:** Briefly explain the different catering services offered by Aditi Caterers.

### 12.1 Section Heading

English: What We Do

Marathi: आम्ही कोणत्या सेवा देतो?

### 12.2 Services

| Service | Marathi |
|---|---|
| Wedding Catering | लग्न समारंभासाठी केटरिंग |
| Birthday Catering | वाढदिवसासाठी केटरिंग |
| Engagement Catering | साखरपुड्यासाठी केटरिंग |
| Reception Catering | रिसेप्शनसाठी केटरिंग |
| Corporate Catering | कॉर्पोरेट कार्यक्रमांसाठी केटरिंग |
| Religious Event Catering | धार्मिक कार्यक्रमांसाठी केटरिंग |
| Other Event Catering | इतर कार्यक्रमांसाठी केटरिंग |

### 12.3 Catering Arrangement Types

**With Material – साहित्यासह**

A catering arrangement where the business provides the agreed food materials and catering service.

**Without Material – साहित्याशिवाय**

A catering arrangement where the customer provides the agreed materials and the business provides the catering service.

The exact scope of each arrangement must be discussed and confirmed with the customer.

### 12.4 Functional Requirements

- Display service categories.
- Use approved photographs or suitable icons.
- Provide View All Services button.
- Navigate to `/services`.
- Do not duplicate all service details from the Services page.

---

## 13. Our Working Process

**Purpose:** Explain how the business approaches a catering enquiry and event arrangement.

### 13.1 Section Heading

English: How We Work

Marathi: आम्ही कसे काम करतो?

### 13.2 Process Steps

**Step 1 – Understand Customer Requirements**

English: Understand the event type, date, number of guests, and catering preferences.

Marathi: कार्यक्रमाचा प्रकार, तारीख, पाहुण्यांची संख्या आणि केटरिंगची पसंती समजून घेणे.

**Step 2 – Discuss Catering Arrangements**

English: Discuss whether the customer needs catering with material or without material.

Marathi: ग्राहकांना साहित्यासह किंवा साहित्याशिवाय कोणती केटरिंग सेवा हवी आहे याबद्दल चर्चा करणे.

**Step 3 – Menu and Quotation Discussion**

English: Discuss suitable food options and the quotation according to the event requirements.

Marathi: कार्यक्रमाच्या गरजेनुसार योग्य मेनू आणि दराबद्दल चर्चा करणे.

**Step 4 – Booking Confirmation**

English: Confirm the agreed arrangements with the customer.

Marathi: ग्राहकासोबत ठरलेली व्यवस्था निश्चित करून बुकिंग कन्फर्म करणे.

**Step 5 – Event Catering Service**

English: Provide the agreed catering service for the event.

Marathi: कार्यक्रमासाठी ठरल्याप्रमाणे केटरिंग सेवा देणे.

### 13.3 UI Requirements

- Display five steps.
- Use numbered indicators or Bootstrap Icons.
- Use a horizontal process layout on desktop.
- Use a vertical process layout on mobile.
- Display a Book Now button.

**Booking Route:** `/booking`

Do not imply that an enquiry automatically confirms a booking.

---

## 14. Why Choose Aditi Caterers?

### 14.1 Section Heading

English: Why Choose Aditi Caterers?

Marathi: अदिती केटरर्सची निवड का करावी?

### 14.2 Suggested Highlights

1. Catering for Different Occasions – विविध कार्यक्रमांसाठी केटरिंग.
2. Flexible Catering Options – विविध केटरिंग पर्याय.
3. Food Variety – खाद्यपदार्थांचे विविध पर्याय.
4. Customer-Focused Planning – ग्राहकांच्या गरजेनुसार नियोजन.
5. Event-Based Arrangements – कार्यक्रमानुसार जेवणाची व्यवस्था.
6. Direct Communication – ग्राहकांशी थेट संवाद.

### 14.3 UI Requirements

- Display 4–6 highlights.
- Use Bootstrap Icons.
- Keep descriptions short.
- Use a consistent card or feature-list layout.
- Avoid unsupported marketing claims.

---

## 15. Business Gallery Preview

**Purpose:** Show actual business work and provide visitors with visual information about catering arrangements.

### 15.1 Section Heading

English: Moments from Our Catering Services

Marathi: आमच्या केटरिंग सेवेतील काही खास क्षण

### 15.2 Suggested Image Categories

- Wedding Events.
- Birthday Events.
- Traditional Food.
- Food Preparation.
- Buffet Arrangements.
- Event Setups.

### 15.3 Requirements

- Display 4–6 featured photographs.
- Use approved Aditi Caterers photographs.
- Maintain consistent image dimensions.
- Use lazy loading.
- Add descriptive alt text.
- Open photographs in a lightbox.
- Provide a View Full Gallery button.

**Gallery Route:** `/gallery`

If actual photographs are unavailable, display an appropriate placeholder or hide the section.

Do not use unrelated photographs as evidence of actual Aditi Caterers events.

---

## 16. Call-to-Action Section

**Purpose:** Convert interested visitors into catering enquiries.

### 16.1 English Content

**Heading:** Let's Make Your Special Occasion Memorable!

**Description:**

"Planning a wedding, birthday, engagement, or another event? Contact Aditi Caterers to discuss your catering requirements."

**Buttons:**

- Book Your Event
- Contact Us

### 16.2 Marathi Content

**Heading:** तुमचा खास कार्यक्रम अविस्मरणीय बनवूया!

**Description:**

"लग्न, वाढदिवस, साखरपुडा किंवा इतर कार्यक्रमाचे नियोजन करत आहात? तुमच्या केटरिंगच्या गरजांबद्दल चर्चा करण्यासाठी अदिती केटरर्सशी संपर्क साधा."

**Buttons:**

- कार्यक्रम बुक करा
- संपर्क साधा

### 16.3 Button Navigation

| Button | Route |
|---|---|
| Book Your Event | `/booking` |
| Contact Us | `/contact` |

### 16.4 Design Requirements

- Use the approved brand colors.
- Display a prominent heading.
- Use clear CTA buttons.
- Ensure mobile responsiveness.
- Avoid excessive animation.

---

## 17. Contact Information

Display the confirmed business contact information.

**Business Name:** Aditi Caterers

**Phone:** +91 9975959391

**WhatsApp:** +91 9975959391

### Contact Links

Phone:

`tel:+919975959391`

WhatsApp:

`https://wa.me/919975959391`

### Pending Information

Do not publish the following until confirmed:

- Business address.
- Operating hours.
- Email address.
- Official social media accounts.
- Google Maps location.

---

## 18. Bilingual Language Requirements

The About Us page must fully support English and Marathi.

### 18.1 Requirements

- English is the default language.
- Marathi must be available through the shared Navbar language switcher.
- All headings and paragraphs must change with the selected language.
- All buttons and navigation labels must be translated.
- Language preference must persist using localStorage.
- Use the existing React Context API language state.
- Do not create a separate language switcher for this page.
- Use the correct font for each language.

### 18.2 Suggested Translation Files

```text
src/
└── locales/
    ├── en.json
    └── mr.json
```

### 18.3 Suggested Translation Keys

```json
{
  "about": {
    "pageTitle": "About Aditi Caterers",
    "welcomeTitle": "Welcome to Aditi Caterers",
    "storyTitle": "Our Story",
    "experienceTitle": "Our Experience",
    "missionTitle": "Our Mission",
    "visionTitle": "Our Vision",
    "valuesTitle": "Our Core Values",
    "servicesTitle": "What We Do",
    "processTitle": "How We Work",
    "whyChooseUsTitle": "Why Choose Aditi Caterers?",
    "galleryTitle": "Moments from Our Catering Services",
    "bookNow": "Book Your Event",
    "contactUs": "Contact Us"
  }
}
```

Create equivalent Marathi translations in `mr.json`.

---

## 19. API Integration Requirements

The About Us page should support dynamic content from the backend where applicable.

### 19.1 Suggested API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/public/about` | Fetch About page content |
| GET | `/api/public/gallery/featured` | Fetch approved business photographs |
| GET | `/api/public/services/featured` | Fetch featured catering services |
| POST | `/api/public/bookings` | Submit booking enquiry |

These are proposed API contracts. Backend developers must confirm the final endpoint names and response formats.

### 19.2 Suggested About API Response

```json
{
  "success": true,
  "data": {
    "businessName": "Aditi Caterers",
    "description": {
      "en": "Approved English business description.",
      "mr": "मंजूर मराठी व्यवसाय परिचय."
    },
    "story": {
      "en": "",
      "mr": ""
    },
    "experience": null,
    "mission": {
      "en": "",
      "mr": ""
    },
    "vision": {
      "en": "",
      "mr": ""
    },
    "values": [],
    "featuredGallery": []
  }
}
```

This is an example response structure. Actual content must be supplied and approved by the business owner.

### 19.3 API Requirements

- Use Axios.
- Create reusable API service functions.
- Handle loading states.
- Handle API errors.
- Handle empty responses.
- Display only active and approved public content.
- Do not expose admin-only information.
- Do not hardcode sensitive configuration values.

---

## 20. Admin Panel Content Management

The About Us page should eventually be manageable through the Admin Panel.

Suggested admin module:

`03-admin-panel/13-website-settings.md`

The administrator should be able to manage:

- About page heading.
- English business description.
- Marathi business description.
- Business story.
- Mission.
- Vision.
- Core values.
- Approved experience information.
- Featured About page image.
- Featured gallery images.
- Section visibility.

### Content Management Rules

- Allow English and Marathi content to be edited independently.
- Validate required content.
- Allow image upload and replacement.
- Support section enable/disable controls.
- Do not publish changes without saving.
- Display success and error messages.
- Keep sensitive admin functionality protected.

---

## 21. Loading, Empty, and Error States

### Loading State

- Display Bootstrap spinner or skeleton loader.
- Prevent large layout shifts.
- Maintain the overall page structure.

### Empty State

Examples:

- Business story not available.
- No experience information configured.
- No approved gallery photographs.
- No featured services available.

Requirements:

- Hide optional sections when appropriate.
- Do not show empty cards.
- Do not display placeholder business statistics.

### Error State

English:

"Unable to load this information. Please try again."

Marathi:

"ही माहिती लोड करता आली नाही. कृपया पुन्हा प्रयत्न करा."

Requirements:

- Show a clear error message.
- Provide retry functionality where appropriate.
- Avoid exposing technical errors.
- Keep other page sections usable when one API request fails.

---

## 22. Suggested Component Structure

```text
src/
├── pages/
│   └── About/
│       ├── About.jsx
│       └── about.css
│
├── components/
│   └── about/
│       ├── AboutHero.jsx
│       ├── AboutIntroduction.jsx
│       ├── OurStory.jsx
│       ├── OurExperience.jsx
│       ├── OurMissionVision.jsx
│       ├── CoreValues.jsx
│       ├── AboutServices.jsx
│       ├── WorkingProcess.jsx
│       ├── WhyChooseUs.jsx
│       ├── AboutGallery.jsx
│       ├── AboutCTA.jsx
│       └── AboutSectionLoader.jsx
│
└── services/
    └── aboutService.js
```

### Component Responsibilities

| Component | Responsibility |
|---|---|
| `About.jsx` | Main About page layout |
| `AboutHero.jsx` | Page title and breadcrumb |
| `AboutIntroduction.jsx` | Main business introduction |
| `OurStory.jsx` | Business journey |
| `OurExperience.jsx` | Verified experience information |
| `OurMissionVision.jsx` | Mission and vision |
| `CoreValues.jsx` | Business values |
| `AboutServices.jsx` | Catering services overview |
| `WorkingProcess.jsx` | Catering process |
| `WhyChooseUs.jsx` | Business highlights |
| `AboutGallery.jsx` | Featured business photographs |
| `AboutCTA.jsx` | Booking and contact actions |
| `AboutSectionLoader.jsx` | Loading and fallback UI |
| `aboutService.js` | About page API functions |

Components must be reusable and should not contain unnecessary duplicate code.

---

## 23. UI/UX Design Requirements

- Use React and Bootstrap 5.
- Follow the approved brand guidelines.
- Use Bootstrap Icons instead of emojis.
- Use Poppins for English.
- Use Noto Sans Devanagari for Marathi.
- Maintain consistent spacing.
- Use professional image layouts.
- Use readable heading sizes.
- Use consistent buttons and cards.
- Avoid excessive shadows and gradients.
- Avoid unnecessary animation.
- Ensure the page feels consistent with the Home Page.
- Use actual business photographs wherever available.
- Keep content sections visually balanced.

---

## 24. Responsive Design Requirements

The About page must support:

| Device | Width |
|---|---|
| Small Mobile | 320px – 374px |
| Mobile | 375px – 575px |
| Tablet | 576px – 991px |
| Laptop | 992px – 1199px |
| Desktop | 1200px – 1399px |
| Large Desktop | 1400px and above |

### Mobile

- Stack all two-column sections vertically.
- Display readable text.
- Ensure images do not overflow.
- Make CTA buttons easy to tap.
- Use vertical layouts for the process timeline.
- Prevent horizontal scrolling.
- Maintain appropriate spacing.

### Tablet

- Use two-column layouts where appropriate.
- Maintain consistent image and text alignment.
- Adjust card grids.
- Ensure the Navbar and content remain usable.

### Desktop

- Use balanced multi-column layouts.
- Maintain consistent content width.
- Use appropriate image and text proportions.
- Avoid excessively wide paragraphs.

---

## 25. SEO Requirements

**Suggested Page Title:**

About Aditi Caterers | Our Story and Catering Services

**Suggested Meta Description:**

"Learn about Aditi Caterers, our catering services, business values, and food arrangements for weddings, birthdays, engagements, and other occasions."

Requirements:

- Unique page title.
- Unique meta description.
- One primary H1 heading.
- Proper H2 and H3 hierarchy.
- Descriptive image alt text.
- Clean URL `/about`.
- Open Graph metadata.
- Canonical URL after production domain confirmation.
- Appropriate Marathi language support.
- LocalBusiness structured data only with verified information.

---

## 26. Accessibility Requirements

- Use semantic HTML.
- Use proper heading hierarchy.
- Provide image alt text.
- Maintain sufficient color contrast.
- Ensure keyboard navigation.
- Provide visible focus indicators.
- Use accessible link and button labels.
- Ensure the gallery lightbox is keyboard accessible.
- Support screen readers.
- Use correct language attributes for English and Marathi content.

---

## 27. Performance Requirements

- Optimize all images.
- Prefer WebP or AVIF.
- Lazy-load images below the initial viewport.
- Avoid unnecessary API calls.
- Use reusable components.
- Avoid unnecessary dependencies.
- Minimize layout shifts.
- Optimize fonts.
- Keep animations lightweight.
- Avoid loading the entire gallery when only featured images are needed.

---

## 28. Testing Requirements

### Functional Testing

- [ ] About page loads at `/about`.
- [ ] Navbar About Us link works.
- [ ] Breadcrumb Home link works.
- [ ] Business introduction displays correctly.
- [ ] Business story displays only approved content.
- [ ] Experience information displays only when verified.
- [ ] Mission and vision sections display correctly.
- [ ] Core values display correctly.
- [ ] Catering service links work.
- [ ] Booking CTA navigates correctly.
- [ ] Contact CTA navigates correctly.
- [ ] Phone link works.
- [ ] WhatsApp link works.
- [ ] Gallery lightbox works.
- [ ] Footer links work.

### Language Testing

- [ ] English content displays correctly.
- [ ] Marathi content displays correctly.
- [ ] Language switcher updates the page.
- [ ] Language preference persists after refresh.
- [ ] Marathi fonts render correctly.
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

- [ ] About API returns the expected response.
- [ ] Loading state works.
- [ ] Empty state works.
- [ ] Error state works.
- [ ] Retry functionality works.
- [ ] Only approved content is displayed.

### UI Testing

- [ ] Images maintain correct proportions.
- [ ] No broken images.
- [ ] No overlapping sections.
- [ ] No horizontal scrolling.
- [ ] Buttons have consistent styles.
- [ ] Spacing is consistent.
- [ ] No critical browser console errors.

---

## 29. Definition of Done

The About Us page will be considered complete when:

1. All approved About page sections are implemented.
2. English and Marathi translations work.
3. The page is responsive across supported devices.
4. All navigation links work.
5. Approved business photographs are displayed correctly.
6. Unverified experience and historical claims are not published.
7. Mission, vision, and core values are displayed.
8. API integration is completed where applicable.
9. Loading, empty, and error states are implemented.
10. SEO metadata is configured.
11. Accessibility requirements are addressed.
12. All functional and responsive tests pass.
13. No critical console errors remain.
14. Code is committed and pushed to the assigned branch.
15. The implementation is reviewed before merging.

---

## 30. Developer Task Assignment

**Task ID:** AC-FE-003

**Task Name:** Implement Responsive Bilingual About Us Page

**Suggested Branch:**

`feature/about-page`

**Priority:** High

**Dependencies:**

- React project setup completed.
- React Router configured.
- Bootstrap 5 installed.
- Bootstrap Icons installed.
- Shared Navbar available.
- Shared Footer available.
- Language Context API configured.
- Home Page shared design standards available.

**Expected Deliverables:**

- Complete About Us page.
- Reusable About page components.
- English and Marathi translations.
- Responsive layouts.
- About page API integration.
- Loading, empty, and error states.
- SEO metadata.
- Testing results.

**Suggested Git Commit:**

`feat: implement responsive bilingual about page`

---

## 31. Pending Business Information

The following information must be confirmed by the business owner before final publication:

- [ ] Official business history.
- [ ] Business starting year.
- [ ] Confirmed years of experience.
- [ ] Meaning of the previously mentioned "70" experience figure.
- [ ] Founder or business owner details, if they want them displayed.
- [ ] Actual business milestones.
- [ ] Verified awards and recognitions.
- [ ] Approved business description in English.
- [ ] Approved business description in Marathi.
- [ ] Actual business photographs.
- [ ] Official business address.

Do not invent any of these details.

---

## 32. Final Acceptance Criteria

The About Us page must:

- Clearly introduce Aditi Caterers.
- Communicate the business's story and values using approved information.
- Explain its catering services.
- Present verified experience and achievements only.
- Showcase actual business photographs.
- Support English and Marathi.
- Provide easy access to booking and contact pages.
- Work correctly on desktop, tablet, and mobile.
- Follow the approved branding and development standards.

**Next Document:** `04-services-page-requirements.md`
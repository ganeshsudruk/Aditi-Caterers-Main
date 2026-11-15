# Home Page Requirements – Aditi Caterers

**Document ID:** AC-FE-002  
**Module:** Public Website – Home Page  
**Priority:** High  
**Status:** Ready for Development  
**Frontend Stack:** React + Vite + Bootstrap 5  
**Icons:** Bootstrap Icons  
**Routing:** React Router DOM  
**Language Support:** English and Marathi

---

## 1. Introduction

The Home Page is the main landing page of the Aditi Caterers website. It should introduce the catering business, highlight its services, showcase food and event photographs, explain catering options, and encourage visitors to submit booking enquiries.

The page must provide a professional, attractive, user-friendly, and responsive experience across desktop, tablet, and mobile devices.

The Home Page must support both English and Marathi languages.

## 2. Objectives

The primary objectives are:

1. Introduce Aditi Caterers to new visitors.
2. Highlight available catering services.
3. Showcase food quality and event arrangements through photographs.
4. Explain catering options with material and without material.
5. Display popular food categories.
6. Build customer trust through genuine business information.
7. Encourage customers to contact the business or submit booking enquiries.
8. Provide easy navigation to other website pages.
9. Support English and Marathi languages.
10. Provide a consistent experience across all screen sizes.

## 3. Home Page URL

| Page | URL |
|---|---|
| Home Page | `/` |

The Home Page must load when visitors open the main website URL.

## 4. Home Page Sections

The Home Page must contain the following sections in the specified order:

1. Navbar
2. Hero Section
3. About Aditi Caterers – Short Introduction
4. Our Catering Services
5. Catering Options
6. Popular Food Categories
7. Why Choose Aditi Caterers
8. Featured Food Gallery
9. Events We Serve
10. How Our Booking Process Works
11. Customer Testimonials
12. Call-to-Action Section
13. Contact Information Section
14. Footer

The Navbar and Footer should use the shared components created for the overall website.

---

## 5. Navbar Integration

The Home Page must use the common website Navbar component.

**Component:** `src/components/layout/Navbar.jsx`

Requirements:

- Display the official Aditi Caterers logo when provided.
- Display navigation links.
- Support English and Marathi.
- Include the Book Now button.
- Include the mobile navigation menu.
- Highlight Home as the active navigation item.
- Maintain consistent styling across all public pages.

Refer to:

`requirements/02-public-website/01-navbar-requirements.md`

---

## 6. Hero Section

**Priority:** Critical

The Hero Section is the first major section visitors see when opening the Home Page.

### 6.1 Design Requirements

The hero section should include:

- High-quality catering or food background photograph.
- Main heading.
- Short supporting description.
- Primary CTA button.
- Secondary CTA button.
- Optional decorative image overlay.
- Professional text contrast.
- Responsive layout.

Use an actual Aditi Caterers photograph when available. Do not use unrelated stock photographs as actual business-event photographs.

### 6.2 English Content

**Main Heading:**

"Make Every Celebration Special with Aditi Caterers"

**Description:**

"Delicious food, quality service, and memorable catering experiences for your special occasions. We serve weddings, birthdays, engagements, corporate events, and more."

**Buttons:**

- Book Your Event
- Explore Our Services

### 6.3 Marathi Content

**Main Heading:**

"अदिती केटरर्ससोबत प्रत्येक सोहळा बनवा खास!"

**Description:**

"तुमच्या खास प्रसंगांसाठी स्वादिष्ट जेवण, उत्तम सेवा आणि अविस्मरणीय केटरिंग अनुभव. लग्न, वाढदिवस, साखरपुडा, कॉर्पोरेट कार्यक्रम आणि इतर समारंभांसाठी केटरिंग सेवा."

**Buttons:**

- कार्यक्रम बुक करा
- आमच्या सेवा पहा

### 6.4 Button Navigation

| Button | Route |
|---|---|
| Book Your Event | `/booking` |
| Explore Our Services | `/services` |

### 6.5 Functional Requirements

- CTA buttons must navigate to the correct pages.
- Hero image must be optimized.
- Text must remain readable on different image sizes.
- Use a suitable overlay when required.
- If a hero image is not configured, show a branded fallback background.
- If a carousel is implemented, provide manual controls and accessible labels.
- Do not use automatic fast-changing slides.
- Ensure hero content is manageable through the Admin Panel in a future content-management implementation.

### 6.6 Responsive Behaviour

**Desktop:**
- Large hero image or background.
- Heading and description clearly visible.
- CTA buttons displayed horizontally.

**Tablet:**
- Adjust text width and image height.
- Maintain readable heading size.

**Mobile:**
- Stack content vertically when necessary.
- Use a mobile-friendly image crop.
- Display CTA buttons without horizontal overflow.
- Maintain readable text and sufficient spacing.

---

## 7. About Aditi Caterers – Short Introduction

**Purpose:** Introduce the business and provide a short overview.

### 7.1 Layout

Use a two-column layout:

- Left: Business photograph.
- Right: Heading, introduction, and CTA button.

On mobile, stack the image and text vertically.

### 7.2 English Content

**Heading:** About Aditi Caterers

**Description:**

"At Aditi Caterers, we believe that delicious food brings people together. We provide catering services for different occasions, focusing on food quality, customer satisfaction, and well-organized service."

**Button:** Know More About Us

### 7.3 Marathi Content

**Heading:** अदिती केटरर्सबद्दल

**Description:**

"अदिती केटरर्समध्ये आम्हाला विश्वास आहे की स्वादिष्ट जेवण लोकांना एकत्र आणते. आम्ही विविध कार्यक्रमांसाठी केटरिंग सेवा पुरवतो. उत्तम खाद्यपदार्थ, ग्राहकांचे समाधान आणि व्यवस्थित सेवा यावर आमचा भर आहे."

**Button:** आमच्याबद्दल अधिक जाणून घ्या

### 7.4 Button Navigation

`/about`

### 7.5 Business Information Rules

- Display only verified business information.
- Do not publish an unconfirmed experience claim.
- Do not invent awards, customer counts, event counts, or business history.
- Business experience information must be confirmed before publishing.
- Use the official business description after approval.

---

## 8. Our Catering Services

**Purpose:** Display the main event categories for which Aditi Caterers provides catering services.

### 8.1 Section Heading

English: Our Catering Services

Marathi: आमच्या केटरिंग सेवा

### 8.2 Service Cards

Display the following service categories:

| Service | Marathi |
|---|---|
| Wedding Catering | लग्न समारंभ |
| Birthday Catering | वाढदिवस समारंभ |
| Engagement Catering | साखरपुडा |
| Reception Catering | स्वागत समारंभ |
| Corporate Events | कॉर्पोरेट कार्यक्रम |
| Religious Events | धार्मिक कार्यक्रम |
| Other Events | इतर कार्यक्रम |

### 8.3 Service Card Design

Each card should contain:

- Relevant service photograph.
- Service title.
- Short description.
- View Details link.
- Bootstrap Icon where appropriate.

### 8.4 Example Descriptions

**Wedding Catering**

English: "Make your wedding celebration special with delicious food and organized catering service."

Marathi: "स्वादिष्ट जेवण आणि उत्तम केटरिंग सेवेसह तुमचा लग्नसोहळा खास बनवा."

**Birthday Catering**

English: "Enjoy your birthday celebration with food arrangements for your guests."

Marathi: "तुमच्या वाढदिवसाच्या कार्यक्रमासाठी पाहुण्यांच्या आवडीनुसार जेवणाची व्यवस्था."

**Engagement Catering**

English: "Celebrate your engagement with quality food and catering arrangements."

Marathi: "तुमच्या साखरपुड्यासाठी स्वादिष्ट जेवण आणि उत्तम केटरिंग व्यवस्था."

Other descriptions should follow the same content standard.

### 8.5 Functional Requirements

- Cards must be clickable.
- Each card must navigate to its relevant service detail page.
- Display a View All Services button.
- Use consistent card heights and image dimensions.
- Avoid broken images.
- Service content should eventually be managed through the Admin Panel.

**View All Services Route:** `/services`

---

## 9. Catering Options

**Purpose:** Explain the two main catering arrangements offered by the business.

### 9.1 Section Heading

English: Our Catering Options

Marathi: आमचे केटरिंग पर्याय

### 9.2 Option 1 – Catering With Material

English Heading: Catering With Material

Marathi Heading: साहित्यासह केटरिंग

English Description:

"We arrange the required food materials and provide catering services according to the event requirements."

Marathi Description:

"कार्यक्रमाच्या गरजेनुसार आवश्यक खाद्यपदार्थांचे साहित्य आणि केटरिंगची व्यवस्था आम्ही करतो."

### 9.3 Option 2 – Catering Without Material

English Heading: Catering Without Material

Marathi Heading: साहित्या शिवाय केटरिंग

English Description:

"We provide catering services using materials arranged by the customer, according to the agreed service requirements."

Marathi Description:

"ग्राहकांनी उपलब्ध करून दिलेल्या साहित्याचा वापर करून ठरलेल्या नियोजनानुसार आम्ही केटरिंग सेवा पुरवतो."

### 9.4 UI Requirements

Display two separate cards.

Each card should include:

- Relevant image or icon.
- Option title.
- Short description.
- Enquire Now button.

**Enquire Now Route:** `/booking`

The booking form should allow customers to select either catering option.

---

## 10. Popular Food Categories

**Purpose:** Showcase the variety of food categories available through Aditi Caterers.

### 10.1 Section Heading

English: Explore Our Food Menu

Marathi: आमचा खाद्यपदार्थ मेनू पहा

### 10.2 Food Categories

| Category | Marathi |
|---|---|
| Breakfast | नाश्ता |
| Starters | सुरुवातीचे पदार्थ |
| Main Course | मुख्य जेवण |
| Maharashtrian Food | महाराष्ट्रीयन पदार्थ |
| Punjabi Food | पंजाबी पदार्थ |
| South Indian Food | दक्षिण भारतीय पदार्थ |
| Desserts | गोड पदार्थ |
| Beverages | पेये |

### 10.3 Card Requirements

Each food category card should contain:

- Food photograph.
- Category title.
- Optional short description.
- View Menu link.

### 10.4 Functional Requirements

- Clicking a category should open its corresponding menu route.
- Display a View Full Menu button.
- Images must be optimized.
- Only approved menu categories should be displayed.
- Veg and Non-Veg information should be shown where relevant.

**Full Menu Route:** `/menu`

---

## 11. Why Choose Aditi Caterers

**Purpose:** Communicate the business's service values and help customers understand its approach.

### 11.1 Section Heading

English: Why Choose Aditi Caterers?

Marathi: अदिती केटरर्सची निवड का करावी?

### 11.2 Suggested Highlights

| Highlight | Marathi |
|---|---|
| Quality Food | दर्जेदार जेवण |
| Organized Service | नियोजनबद्ध सेवा |
| Different Catering Options | विविध केटरिंग पर्याय |
| Multiple Event Services | विविध कार्यक्रमांसाठी सेवा |
| Customer-Focused Approach | ग्राहकांच्या गरजांना प्राधान्य |
| Menu Flexibility | मेनूमध्ये लवचिकता |

### 11.3 UI Requirements

- Display 4–6 highlights.
- Use Bootstrap Icons.
- Keep descriptions short.
- Use a clean and professional layout.
- Do not display unverified claims such as guaranteed lowest prices, certified hygiene, or a specific number of successful events.

### 11.4 Example Content

**Quality Food**

English: "We focus on providing delicious food for your special occasions."

Marathi: "तुमच्या खास कार्यक्रमांसाठी स्वादिष्ट जेवण देण्यावर आमचा भर असतो."

**Customer-Focused Approach**

English: "We consider customer requirements while planning catering arrangements."

Marathi: "केटरिंगचे नियोजन करताना ग्राहकांच्या गरजांना प्राधान्य दिले जाते."

---

## 12. Featured Food Gallery

**Purpose:** Showcase real food photographs and catering arrangements.

### 12.1 Section Heading

English: A Glimpse of Our Food & Events

Marathi: आमच्या खाद्यपदार्थांची आणि कार्यक्रमांची झलक

### 12.2 Gallery Requirements

Display selected photographs of:

- Food preparation.
- Traditional food.
- Wedding catering.
- Food presentation.
- Buffet arrangements.
- Event catering setup.

### 12.3 UI Requirements

- Use a responsive image grid.
- Maintain consistent image proportions.
- Add suitable image spacing.
- Display a hover effect on desktop.
- Open images in a lightbox when clicked.
- Provide descriptive alt text.
- Lazy-load images below the initial viewport.

### 12.4 Functional Requirements

- Gallery images should come from approved business photographs.
- Clicking an image should open a larger preview.
- Provide close, previous, and next controls where applicable.
- Support keyboard navigation.
- Display a View Full Gallery button.

**Gallery Route:** `/gallery`

If no approved photographs are available, use a clean placeholder state instead of presenting unrelated images as actual business work.

---

## 13. Events We Serve

**Purpose:** Highlight the different occasions customers can arrange catering for.

### 13.1 Section Heading

English: Catering for Every Occasion

Marathi: प्रत्येक खास प्रसंगासाठी केटरिंग सेवा

### 13.2 Event Types

- Wedding – लग्न समारंभ
- Birthday – वाढदिवस
- Engagement – साखरपुडा
- Reception – स्वागत समारंभ
- Corporate Events – कॉर्पोरेट कार्यक्रम
- Religious Events – धार्मिक कार्यक्रम
- Family Functions – कौटुंबिक कार्यक्रम

### 13.3 Requirements

- Display each event with an image or Bootstrap Icon.
- Use clear event names.
- Provide an enquiry CTA.
- Do not duplicate the entire Services section unnecessarily.
- Keep this section visually different from the service cards.

---

## 14. How Our Booking Process Works

**Purpose:** Explain how customers can enquire about catering services.

### 14.1 Section Heading

English: How to Book Our Catering Service

Marathi: आमची केटरिंग सेवा कशी बुक करावी?

### 14.2 Booking Steps

**Step 1 – Submit Your Enquiry**

English: "Share your event details through our booking form."

Marathi: "बुकिंग फॉर्मद्वारे तुमच्या कार्यक्रमाची माहिती द्या."

**Step 2 – Discuss Your Requirements**

English: "Our team will contact you to understand your requirements."

Marathi: "तुमच्या गरजा समजून घेण्यासाठी आमची टीम तुमच्याशी संपर्क साधेल."

**Step 3 – Discuss Menu and Quotation**

English: "Discuss the menu, catering arrangement, and quotation."

Marathi: "मेनू, केटरिंग व्यवस्था आणि दर याबद्दल चर्चा करा."

**Step 4 – Confirm Your Booking**

English: "Finalize the event arrangements and confirm your booking."

Marathi: "कार्यक्रमाचे नियोजन निश्चित करून तुमचे बुकिंग कन्फर्म करा."

### 14.3 UI Requirements

- Display four steps in sequence.
- Use numbered indicators or Bootstrap Icons.
- Use a responsive horizontal layout on larger screens.
- Stack steps vertically on mobile.
- Display a Book Now CTA.

**Booking Route:** `/booking`

Do not display an automatic booking confirmation unless the backend has actually confirmed the booking.

---

## 15. Customer Testimonials

**Purpose:** Display genuine customer feedback and improve trust.

### 15.1 Section Heading

English: What Our Customers Say

Marathi: आमचे ग्राहक काय म्हणतात?

### 15.2 Testimonial Card Fields

Each testimonial should contain:

- Customer name.
- Customer feedback.
- Event type (optional).
- Rating (optional).
- Customer photograph (optional, with permission).

### 15.3 Functional Requirements

- Display only genuine customer reviews.
- Do not create fake customer names or feedback.
- Do not generate artificial ratings.
- Display only approved testimonials.
- Provide a View All Reviews link if a separate reviews page is implemented.
- Reviews should be manageable through the Admin Panel.

If no approved reviews are available, hide the section or show an approved alternative business-information section.

---

## 16. Call-to-Action Section

**Priority:** High

This section should encourage visitors to contact Aditi Caterers for their upcoming events.

### 16.1 English Content

**Heading:** Planning Your Next Celebration?

**Description:** "Let Aditi Caterers help you plan the food arrangements for your special occasion."

**Buttons:**
- Book Your Event
- Call Us Now

### 16.2 Marathi Content

**Heading:** तुमचा पुढील कार्यक्रम नियोजित करत आहात?

**Description:** "तुमच्या खास कार्यक्रमातील जेवणाच्या व्यवस्थेसाठी अदिती केटरर्सची मदत घ्या."

**Buttons:**
- कार्यक्रम बुक करा
- आत्ताच कॉल करा

### 16.3 Button Actions

| Button | Action |
|---|---|
| Book Your Event | Navigate to `/booking` |
| Call Us Now | Open `tel:+919975959391` |

### 16.4 Design Requirements

- Use the brand color palette.
- Provide strong text contrast.
- Keep CTA buttons clearly visible.
- Use a responsive layout.
- Avoid excessive animation.

---

## 17. Contact Information Section

**Purpose:** Make it easy for customers to contact the business.

### 17.1 Section Heading

English: Get in Touch With Us

Marathi: आमच्याशी संपर्क साधा

### 17.2 Confirmed Contact Information

**Business Name:** Aditi Caterers

**Phone:** +91 9975959391

**WhatsApp:** +91 9975959391

### 17.3 Contact Actions

Phone link:

`tel:+919975959391`

WhatsApp link:

`https://wa.me/919975959391`

Suggested WhatsApp message:

English: "Hello Aditi Caterers, I would like to enquire about catering services for my event."

Marathi: "नमस्कार अदिती केटरर्स, मला माझ्या कार्यक्रमासाठी केटरिंग सेवेबद्दल माहिती हवी आहे."

### 17.4 Pending Information

The following details must not be published until confirmed:

- Official business address.
- Business operating hours.
- Official email address.
- Official social media links.
- Google Maps location.

Do not display a fabricated address or map location.

---

## 18. Footer Integration

The Home Page must use the common website Footer component.

**Component:** `src/components/layout/Footer.jsx`

The footer should include:

- Business name.
- Short business description.
- Quick navigation links.
- Catering service links.
- Contact number.
- WhatsApp link.
- Language support.
- Copyright information.
- Social media links only when official URLs are available.

Refer to the shared footer requirements when implemented.

---

## 19. Bilingual Language Requirements

The Home Page must support English and Marathi.

### 19.1 Language Behaviour

- English is the default language.
- Marathi can be selected through the Navbar language switcher.
- All Home Page headings, descriptions, buttons, labels, and messages must change with the selected language.
- Language preference should persist using localStorage.
- Language state should be managed through React Context API.
- Avoid hardcoding translated text directly inside individual components.

### 19.2 Suggested Translation Files

```text
src/
└── locales/
    ├── en.json
    └── mr.json
```

### 19.3 Suggested Translation Keys

```json
{
  "home": {
    "heroTitle": "Make Every Celebration Special with Aditi Caterers",
    "heroDescription": "Delicious food and quality catering services for your special occasions.",
    "bookNow": "Book Your Event",
    "exploreServices": "Explore Our Services",
    "aboutTitle": "About Aditi Caterers",
    "servicesTitle": "Our Catering Services",
    "foodMenuTitle": "Explore Our Food Menu",
    "galleryTitle": "A Glimpse of Our Food & Events",
    "whyChooseUsTitle": "Why Choose Aditi Caterers?"
  }
}
```

Create the equivalent Marathi translation file with approved translations.

---

## 20. API Integration Requirements

The Home Page should retrieve dynamic content from the backend where applicable.

### 20.1 Suggested API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/public/home` | Fetch Home Page content |
| GET | `/api/public/services/featured` | Fetch featured services |
| GET | `/api/public/menu/categories` | Fetch food categories |
| GET | `/api/public/gallery/featured` | Fetch featured gallery images |
| GET | `/api/public/testimonials/approved` | Fetch approved testimonials |
| POST | `/api/public/bookings` | Submit booking enquiry |

These endpoints are proposed API contracts. Backend developers must confirm and document the final routes.

### 20.2 Suggested Home Page API Response

```json
{
  "success": true,
  "data": {
    "hero": {
      "title": "Make Every Celebration Special with Aditi Caterers",
      "description": "Delicious food and quality catering services.",
      "image": "https://example.com/hero-image.jpg"
    },
    "services": [],
    "foodCategories": [],
    "featuredGallery": [],
    "testimonials": []
  }
}
```

This is a sample response structure only. Do not use the example image URL as an actual business asset.

### 20.3 API Requirements

- Use Axios for HTTP requests.
- Create reusable API service functions.
- Do not call APIs separately from multiple components when one shared request can provide the required data.
- Handle loading states.
- Handle API errors.
- Handle empty responses.
- Do not expose backend secrets in frontend code.
- Use environment variables for API base URLs.
- Display only active and approved public content.

---

## 21. Loading, Empty, and Error States

Each dynamic section must handle the following states.

### Loading State

- Show a Bootstrap spinner or skeleton loader.
- Avoid sudden layout shifts.
- Maintain the section's expected height where practical.

### Empty State

Examples:

- No featured services available.
- No gallery images available.
- No approved testimonials available.
- No menu categories available.

Requirements:

- Hide optional empty sections where appropriate.
- Do not display broken or blank cards.
- Use a meaningful empty message when the section remains visible.

### Error State

- Show a user-friendly message.
- Do not expose server errors or stack traces.
- Provide a retry action where appropriate.
- Keep the rest of the Home Page usable if one section's API fails.

Suggested message:

English: "Unable to load this section. Please try again."

Marathi: "हा विभाग लोड करता आला नाही. कृपया पुन्हा प्रयत्न करा."

---

## 22. Component Structure

Create reusable components for the Home Page.

Suggested folder structure:

```text
src/
├── pages/
│   └── Home/
│       ├── Home.jsx
│       └── home.css
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   │
│   └── home/
│       ├── HeroSection.jsx
│       ├── AboutPreview.jsx
│       ├── FeaturedServices.jsx
│       ├── CateringOptions.jsx
│       ├── PopularFoodCategories.jsx
│       ├── WhyChooseUs.jsx
│       ├── FeaturedGallery.jsx
│       ├── EventsWeServe.jsx
│       ├── BookingProcess.jsx
│       ├── Testimonials.jsx
│       ├── HomeCTA.jsx
│       ├── ContactPreview.jsx
│       ├── SectionHeading.jsx
│       └── HomeSectionLoader.jsx
│
└── services/
    └── homeService.js
```

### Component Responsibilities

| Component | Responsibility |
|---|---|
| `Home.jsx` | Main Home Page layout |
| `HeroSection.jsx` | Hero content and CTA |
| `AboutPreview.jsx` | Business introduction |
| `FeaturedServices.jsx` | Featured catering services |
| `CateringOptions.jsx` | With-material and without-material options |
| `PopularFoodCategories.jsx` | Food category cards |
| `WhyChooseUs.jsx` | Business service highlights |
| `FeaturedGallery.jsx` | Featured event and food images |
| `EventsWeServe.jsx` | Event category highlights |
| `BookingProcess.jsx` | Booking steps |
| `Testimonials.jsx` | Approved customer reviews |
| `HomeCTA.jsx` | Main booking CTA |
| `ContactPreview.jsx` | Contact information |
| `SectionHeading.jsx` | Reusable section heading |
| `homeService.js` | Home Page API functions |

Developers may adjust the component structure when necessary, but components must remain reusable and maintainable.

---

## 23. UI/UX Design Requirements

- Use React and Bootstrap 5.
- Use the approved brand color palette.
- Use Bootstrap Icons instead of emojis.
- Maintain consistent section spacing.
- Use professional typography.
- Use Poppins for English and Noto Sans Devanagari for Marathi.
- Use consistent button styles.
- Use consistent card border radius and shadows.
- Avoid excessive animations.
- Avoid unnecessary large empty spaces.
- Maintain good image quality.
- Use consistent image aspect ratios.
- Keep content readable.
- Avoid excessive gradients and decorative effects.
- Ensure the website looks like a professional catering business website, not a generic AI-generated template.

---

## 24. Responsive Design Requirements

The Home Page must work on the following screen sizes:

| Device | Width |
|---|---|
| Small Mobile | 320px – 374px |
| Mobile | 375px – 575px |
| Tablet | 576px – 991px |
| Laptop | 992px – 1199px |
| Desktop | 1200px – 1399px |
| Large Desktop | 1400px and above |

### Mobile Requirements

- All sections must stack correctly.
- No horizontal scrolling.
- Images must resize correctly.
- Buttons must be easy to tap.
- Text must remain readable.
- Cards must use suitable column widths.
- Gallery images must fit the screen.
- Contact links must be easy to access.
- Minimum recommended touch target: 44 × 44 CSS pixels.

### Tablet Requirements

- Use suitable two-column layouts where space allows.
- Maintain readable text.
- Prevent image and card overflow.
- Keep navigation usable.

### Desktop Requirements

- Use balanced section widths.
- Avoid excessively stretched content.
- Maintain consistent alignment.
- Use suitable multi-column layouts.

---

## 25. SEO Requirements

The Home Page should include:

**Page Title:**

Aditi Caterers | Catering Services for Every Occasion

**Meta Description:**

"Discover Aditi Caterers for wedding, birthday, engagement, reception, and event catering services. Contact us for your catering enquiry."

Requirements:

- Add a unique page title.
- Add a meta description.
- Use one primary H1 heading.
- Use meaningful H2 and H3 headings.
- Add descriptive image alt attributes.
- Use clean URLs.
- Add Open Graph metadata.
- Add appropriate canonical URL after the production domain is confirmed.
- Avoid keyword stuffing.
- Support Marathi page content appropriately.
- Add LocalBusiness structured data only with verified business information.

---

## 26. Accessibility Requirements

- Use semantic HTML elements.
- Maintain sufficient text contrast.
- Add alt text to meaningful images.
- Use empty alt text for decorative images.
- Ensure keyboard navigation.
- Provide visible focus indicators.
- Use accessible button labels.
- Ensure language switching is keyboard accessible.
- Use proper heading hierarchy.
- Ensure lightbox controls are accessible.
- Do not communicate important information using color alone.

---

## 27. Performance Requirements

- Optimize image file sizes.
- Use WebP or AVIF where supported.
- Lazy-load images below the initial viewport.
- Prioritize the hero image appropriately.
- Avoid unnecessary React re-renders.
- Use reusable components.
- Avoid unnecessary third-party packages.
- Keep animations lightweight.
- Avoid loading the entire gallery at once.
- Use pagination or limited featured items where appropriate.
- Keep the initial Home Page load fast.

---

## 28. Security and Data Handling

- Public Home Page APIs must expose only public information.
- Never expose JWT secrets, database credentials, or Cloudinary secrets.
- Do not place admin-only data in public API responses.
- Validate all dynamic API content before rendering where necessary.
- Do not render untrusted HTML directly.
- Use environment variables for configuration.
- Booking submission must use the backend API.

---

## 29. Testing Requirements

### Functional Testing

- [ ] Home Page loads successfully.
- [ ] Navbar is displayed correctly.
- [ ] Home navigation is highlighted.
- [ ] Hero CTA navigates to the booking page.
- [ ] Services CTA navigates correctly.
- [ ] Service cards navigate to their correct pages.
- [ ] Catering option buttons work.
- [ ] Food category links work.
- [ ] Gallery lightbox works.
- [ ] Gallery previous and next controls work.
- [ ] Booking process CTA works.
- [ ] Phone link opens the phone application.
- [ ] WhatsApp link opens the correct WhatsApp conversation.
- [ ] Footer navigation links work.
- [ ] Language switching works.
- [ ] Language preference persists after refresh.
- [ ] API data is displayed correctly.

### UI Testing

- [ ] All sections follow the approved design.
- [ ] Images have correct proportions.
- [ ] Buttons have consistent styles.
- [ ] Cards have consistent spacing.
- [ ] No broken images.
- [ ] No overlapping elements.
- [ ] No unnecessary blank spaces.
- [ ] No horizontal scrolling.

### Responsive Testing

- [ ] 320px mobile.
- [ ] 375px mobile.
- [ ] 425px mobile.
- [ ] 768px tablet.
- [ ] 1024px laptop.
- [ ] 1366px desktop.
- [ ] 1440px large desktop.

### Language Testing

- [ ] English content displays correctly.
- [ ] Marathi content displays correctly.
- [ ] Marathi font loads correctly.
- [ ] No text clipping.
- [ ] No untranslated labels.
- [ ] Buttons fit in both languages.

### Error Testing

- [ ] API loading state works.
- [ ] API error state works.
- [ ] Empty sections are handled.
- [ ] Retry functionality works where implemented.
- [ ] Missing images show a fallback.

---

## 30. Definition of Done

The Home Page task will be considered complete when:

1. All approved Home Page sections are implemented.
2. English and Marathi language support works.
3. The Home Page is responsive across supported screen sizes.
4. All navigation and CTA links work.
5. Dynamic sections integrate with the agreed backend APIs.
6. Loading, empty, and error states are implemented.
7. Actual business images are used only when approved.
8. No fake testimonials or unverified business claims are displayed.
9. SEO metadata is implemented.
10. Accessibility requirements are addressed.
11. All important test cases pass.
12. No critical console errors remain.
13. Code is committed and pushed to the assigned Git branch.
14. The completed work is reviewed before merging.

---

## 31. Developer Task Assignment

**Task ID:** AC-FE-002

**Task Name:** Implement Responsive Bilingual Home Page

**Suggested Branch:**

`feature/home-page`

**Priority:** High

**Dependencies:**

- Project setup completed.
- React Router configured.
- Bootstrap 5 installed.
- Bootstrap Icons installed.
- Navbar component available.
- Footer component available.
- Language Context API configured.
- Brand guidelines finalized.

**Expected Deliverables:**

- Complete Home Page UI.
- Reusable Home Page components.
- English and Marathi translations.
- Responsive layouts.
- Home Page API integration.
- Loading, empty, and error states.
- SEO metadata.
- Testing results.

**Suggested Git Commit:**

`feat: implement responsive bilingual home page`

---

## 32. Pending Business Assets and Confirmations

The following information must be collected before final production content is published:

- [ ] Official Aditi Caterers logo.
- [ ] Approved hero photograph.
- [ ] Actual food photographs.
- [ ] Actual wedding and event photographs.
- [ ] Final approved business description.
- [ ] Confirmed business experience.
- [ ] Verified customer testimonials.
- [ ] Approved service descriptions.
- [ ] Confirmed food categories and menu items.
- [ ] Official business address.
- [ ] Business operating hours.
- [ ] Official email and social media links.

Do not create fake business information to fill missing content.

---

## 33. Final Acceptance Criteria

The final Home Page must:

- Represent Aditi Caterers professionally.
- Clearly communicate catering services.
- Showcase genuine food and event photographs.
- Explain both catering options.
- Make booking and contact actions easy.
- Support English and Marathi.
- Work correctly on mobile, tablet, and desktop.
- Integrate with the backend.
- Follow the project's branding and development standards.

**Next Document:** `03-about-page-requirements.md`
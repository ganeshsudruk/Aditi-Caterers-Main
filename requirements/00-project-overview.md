# Aditi Caterers – Project Overview & Requirements

**Document ID:** AC-DOC-001  
**Project Name:** Aditi Caterers Website & Management System  
**Document Type:** Project Overview / Software Requirements Specification  
**Version:** 1.0  
**Status:** Initial Documentation  
**Priority:** High

---

# 1. Project Introduction

Aditi Caterers is a professional catering business that provides catering services for different types of events in villages and cities.

The objective of this project is to develop a modern, professional, responsive, and bilingual (English and Marathi) catering business website with a complete Admin Management System.

The website will allow customers to:

- Explore catering services.
- View food menus and catering packages.
- Browse event photographs.
- Check awards and achievements.
- Submit online booking enquiries.
- Contact the business through phone and WhatsApp.
- Access the website in English or Marathi.

The Admin Panel will allow authorized administrators to manage website content, bookings, customers, menus, services, packages, gallery images, reviews, and reports.

# 2. Business Information

| Field | Details |
|---|---|
| Business Name | Aditi Caterers |
| Contact Number | +91 9975959391 |
| Business Type | Catering Services |
| Service Locations | Villages and Cities |
| Business Coverage | Local and surrounding areas |
| Experience | To be confirmed before publishing |
| Website Languages | English and Marathi |
| Catering Options | With Material / Without Material |
| Event Types | Wedding, Birthday, Engagement and Other Events |

**Important:** Do not publish unverified business information, experience claims, awards, social media URLs, or customer testimonials.

# 3. Project Objectives

The main objectives are:

1. Build a professional online presence for Aditi Caterers.
2. Make catering services accessible to customers online.
3. Display food menus, packages, and event photographs.
4. Generate more customer enquiries and bookings.
5. Provide English and Marathi language support throughout the website.
6. Allow administrators to manage website content without changing source code.
7. Store booking and customer information securely.
8. Provide a responsive experience on desktop, tablet, and mobile.
9. Improve customer communication through phone and WhatsApp.
10. Build a scalable system for future business requirements.

# 4. Project Scope

The project consists of three main parts.

## 4.1 Public Website

The public website will be accessible to all visitors without login.

Required modules:

1. Home Page
2. About Us
3. Services
4. Catering Packages
5. Food Menu
6. Gallery
7. Awards & Achievements
8. Testimonials
9. Online Booking / Enquiry
10. Contact Us
11. FAQ
12. Navbar and Footer

## 4.2 Admin Management System

The Admin Panel will be accessible only to authorized administrators.

Required modules:

1. Admin Login
2. Admin Dashboard
3. Booking Management
4. Customer Management
5. Service Management
6. Food Category Management
7. Food Item Management
8. Package Management
9. Gallery Management
10. Awards Management
11. Review Management
12. Quotation Management
13. Reports
14. Website Settings
15. Admin Profile and Password Management

## 4.3 Backend & Database

The backend will provide APIs and database operations for the website and Admin Panel.

Required functionalities:

- Database connection.
- Authentication and authorization.
- Booking APIs.
- Customer APIs.
- Menu APIs.
- Service APIs.
- Package APIs.
- Gallery APIs.
- Awards APIs.
- Review APIs.
- Admin management APIs.
- Image upload integration.
- Input validation.
- Error handling.
- Secure data management.

# 5. Technology Stack

## 5.1 Frontend

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Development server and build tool |
| Bootstrap 5 | Responsive UI |
| Bootstrap Icons | Icons |
| React Router DOM | Routing |
| Axios | API integration |
| React Context API | Global language and authentication state |

## 5.2 Backend

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB Atlas | Cloud database |
| Mongoose | Database modelling |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Multer | File upload handling |
| Cloudinary | Image storage |
| dotenv | Environment configuration |

## 5.3 Deployment

| Service | Purpose |
|---|---|
| Vercel | Frontend deployment |
| Render | Backend deployment |
| MongoDB Atlas | Database hosting |
| Cloudinary | Image hosting |

# 6. Bilingual Language Requirements

The entire application must support two languages:

- English
- Marathi

## 6.1 Language Features

1. English will be the default language.
2. Users can switch between English and Marathi.
3. Language switching must update the complete page content.
4. The selected language must remain saved after refreshing the page.
5. Language switching must not redirect users to another page.
6. Navigation links, buttons, labels, forms, validation messages, notifications, and footer content must support both languages.
7. Admin Panel must also support both languages.
8. Marathi text must display correctly on all supported devices.
9. Use the Noto Sans Devanagari font for Marathi text.
10. If a translation is unavailable, display the English fallback.

## 6.2 Recommended Implementation

Create the following structure:

```text
src/
└── locales/
    ├── en.json
    └── mr.json
```

Implement language management using React Context API.

Use consistent translation keys across the application.

For dynamic content stored in MongoDB, provide separate English and Marathi fields wherever customer-facing translations are required.

# 7. Design & UI Guidelines

The website must have a professional catering-business design.

## 7.1 Recommended Brand Colors

| Color | Hex Code | Usage |
|---|---|---|
| Maroon | #641E2B | Primary brand color |
| Gold | #C9A45C | Highlights and accents |
| White | #FFFFFF | Background |
| Light Cream | #FAF7F2 | Section backgrounds |
| Dark Gray | #333333 | Main text |

Final colors must be checked against the actual business logo and approved before implementation.

## 7.2 UI Guidelines

- Use Bootstrap 5 components wherever possible.
- Prefer reusable components.
- Maintain consistent spacing.
- Use professional typography.
- Use Bootstrap Icons instead of emojis.
- Avoid unnecessary animations.
- Use clean cards and layouts.
- Avoid excessive shadows and gradients.
- Use actual business photographs where available.
- Maintain consistent button styles.
- Ensure readable Marathi typography.

# 8. Responsive Design Requirements

The complete application must work on:

- Desktop computers.
- Laptops.
- Tablets.
- Mobile phones.

Minimum supported viewport width: 320px.

Requirements:

1. No horizontal scrolling.
2. Navbar must work on mobile.
3. Images must resize correctly.
4. Forms must be usable on small screens.
5. Tables must support mobile scrolling or responsive layouts.
6. Cards must adapt to available screen width.
7. Buttons must have touch-friendly dimensions.
8. Admin Panel must also be responsive.

# 9. Public Website Functional Requirements

## 9.1 Home Page

- Display business branding.
- Show an attractive hero section.
- Display primary catering services.
- Display popular food items.
- Display featured packages.
- Show event photographs.
- Include customer testimonials.
- Provide Book Now and Contact Us buttons.

## 9.2 About Us

- Display business introduction.
- Show business experience after verification.
- Display business mission and values.
- Include business photographs.
- Support English and Marathi.

## 9.3 Services

- Display all available catering services.
- Support different event types.
- Display service descriptions and photographs.
- Provide enquiry or booking links.

## 9.4 Catering Packages

- With Material.
- Without Material.
- Custom Packages.

Display package details, available services, and enquiry options.

## 9.5 Food Menu

Categories may include:

- Breakfast.
- Starters.
- Main Course.
- Maharashtrian Food.
- Punjabi Food.
- South Indian Food.
- Desserts.
- Beverages.

Provide Veg and Non-Veg filters where applicable.

## 9.6 Gallery

- Display event photographs.
- Support image categories.
- Provide image preview/lightbox.
- Optimize image loading.
- Allow administrators to manage images.

## 9.7 Booking / Enquiry

Customers must be able to submit event booking enquiries.

The form must collect:

- Full Name.
- Mobile Number.
- Email (Optional).
- Event Type.
- Event Date.
- Event Time.
- Number of Guests.
- Event Address.
- Village / City.
- Catering Type.
- Food Preference.
- Meal Type.
- Menu Requirements.
- Special Requirements.
- Estimated Budget (Optional).
- Additional Notes.

After submission, display a clear success or error message.

## 9.8 Contact Us

- Business phone number.
- WhatsApp contact.
- Business address (after confirmation).
- Google Maps location (after confirmation).
- Contact enquiry form.
- Social media links (only verified URLs).

# 10. Admin Panel Functional Requirements

The Admin Panel must provide a centralized interface to manage business operations and website content.

## 10.1 Admin Authentication

- Secure Admin Login.
- JWT-based authentication.
- Password hashing.
- Protected routes.
- Logout functionality.
- Unauthorized access prevention.

## 10.2 Admin Dashboard

Display summary cards such as:

- Total Bookings.
- New Bookings.
- Confirmed Bookings.
- Completed Events.
- Total Customers.
- Total Menu Items.

Also display recent bookings and useful business statistics.

## 10.3 Booking Management

Administrators must be able to:

- View all bookings.
- View booking details.
- Search and filter bookings.
- Update booking status.
- Add internal notes.
- Manage customer enquiries.

Booking status lifecycle:

New → Contacted → Quotation Sent → Confirmed → Completed

Cancelled must be available as a separate status.

## 10.4 Content Management

Administrators must be able to create, read, update, and delete:

- Services.
- Food Categories.
- Food Items.
- Packages.
- Gallery Images.
- Awards.
- Customer Reviews.

## 10.5 Quotation Management

- Generate customer quotations.
- Add event and customer details.
- Add selected menu items and prices.
- Calculate totals.
- Generate downloadable PDF quotations.
- Store quotation records.

## 10.6 Website Settings

Allow authorized administrators to manage:

- Business Name.
- Logo.
- Contact Number.
- WhatsApp Number.
- Business Address.
- Business Hours.
- Social Media Links.
- English and Marathi website content.

# 11. Backend & API Requirements

The backend must follow a structured REST API architecture.

Recommended structure:

```text
backend/
├── config/
│   ├── db.js
│   └── cloudinary.js
│
├── models/
├── controllers/
├── routes/
├── middleware/
├── utils/
├── uploads/
├── .env
├── .gitignore
└── server.js
```

Requirements:

1. Use MVC architecture.
2. Keep routes, controllers, and models separate.
3. Use async/await.
4. Validate incoming request data.
5. Use centralized error handling.
6. Return consistent API responses.
7. Protect Admin APIs.
8. Use environment variables for secrets.
9. Never expose database credentials or JWT secrets.
10. Validate and restrict uploaded file types and sizes.

# 12. Database Requirements

Use MongoDB Atlas with Mongoose.

Recommended collections:

1. Admins
2. Customers
3. Bookings
4. Services
5. FoodCategories
6. FoodItems
7. Packages
8. Gallery
9. Awards
10. Reviews
11. Quotations
12. WebsiteSettings

Requirements:

- Define proper schemas.
- Add required field validation.
- Use appropriate references between collections.
- Add timestamps where required.
- Prevent duplicate records where applicable.
- Store uploaded image URLs rather than unnecessary image binaries.
- Maintain data consistency.

# 13. Security Requirements

- Hash passwords using bcryptjs.
- Use JWT for authentication.
- Keep secrets inside environment variables.
- Validate and sanitize user input.
- Protect private Admin routes.
- Implement role-based access if multiple admin roles are introduced.
- Configure CORS for approved frontend origins.
- Apply reasonable API rate limits.
- Validate file uploads.
- Never store plain-text passwords.
- Do not expose sensitive customer information publicly.

# 14. Performance Requirements

- Optimize images.
- Use lazy loading for suitable images.
- Avoid unnecessary API calls.
- Use reusable components.
- Minimize unnecessary React re-renders.
- Add pagination to large data lists.
- Optimize database queries.
- Display loading states.
- Display empty states.
- Display useful error messages.

# 15. SEO & Accessibility Requirements

- Add page-specific titles and meta descriptions.
- Use meaningful headings.
- Add descriptive image alt text.
- Use semantic HTML.
- Provide accessible form labels.
- Support keyboard navigation.
- Maintain sufficient color contrast.
- Add sitemap.xml.
- Add robots.txt.
- Use meaningful page URLs.
- Set the correct document language for English and Marathi.

# 16. Testing Requirements

The team must test:

## Frontend Testing

- Page navigation.
- Form validation.
- Language switching.
- Responsive layouts.
- Dropdown behaviour.
- Gallery interactions.
- API integration.
- Loading and error states.

## Backend Testing

- API responses.
- Database operations.
- Authentication.
- Authorization.
- Input validation.
- Booking creation.
- CRUD operations.
- File upload validation.

## Cross-Device Testing

- Desktop.
- Tablet.
- Android mobile.
- Different browser sizes.
- Minimum viewport width of 320px.

# 17. Development Rules & Team Guidelines

Every developer must follow these rules:

1. Read the assigned requirement document before starting development.
2. Follow the approved project structure.
3. Use the agreed technology stack.
4. Do not modify unrelated modules.
5. Use reusable components.
6. Follow consistent naming conventions.
7. Do not hardcode dynamic business content unnecessarily.
8. Do not use dummy business information in production.
9. Do not commit `.env` files.
10. Test the module before submitting it.
11. Fix console errors and build errors.
12. Push code to the assigned Git branch.
13. Share the branch name and completion status.
14. Inform the project lead about blockers.
15. Update the task status regularly.

# 18. Git Branch & Commit Guidelines

Use feature branches for individual modules.

Example:

```text
main
develop
feature/navbar
feature/home-page
feature/booking
feature/admin-dashboard
feature/menu-management
feature/backend-auth
```

Suggested commit messages:

```text
feat: create responsive navbar
feat: implement bilingual language switcher
feat: develop home page
feat: add booking enquiry form
fix: resolve mobile navigation issue
fix: handle booking form validation
refactor: improve reusable components
```

All changes must be reviewed before merging into the main development branch.

# 19. Definition of Done (DoD)

A module will be considered completed only when:

- All documented requirements are implemented.
- UI matches the approved design.
- English and Marathi translations work where applicable.
- Desktop, tablet, and mobile layouts are tested.
- All buttons and links work.
- API integration works where required.
- Form validation works.
- Loading, empty, and error states are handled.
- No critical console or build errors remain.
- Code is pushed to the assigned branch.
- Code review is completed.
- Acceptance criteria are verified.

# 20. Project Deliverables

The final project must include:

1. Complete responsive public website.
2. English and Marathi language support.
3. Complete Admin Management System.
4. Node.js and Express backend.
5. MongoDB database integration.
6. Booking and enquiry management.
7. Menu and package management.
8. Gallery and content management.
9. Quotation PDF generation.
10. WhatsApp and phone integration.
11. Testing and validation.
12. Deployment configuration.
13. Project documentation.
14. Git repository with organized source code.

# 21. Future Enhancements

The following features may be considered for future versions:

- Online payment integration.
- Customer login and registration.
- Automated WhatsApp notifications.
- Email notifications.
- Advanced booking calendar.
- Multiple administrator roles.
- Advanced sales and revenue analytics.
- Customer booking history.
- Inventory management.
- Event expense management.

These features are not part of the initial release unless separately approved.

# 22. Final Project Acceptance Criteria

The project will be accepted when:

- The public website is fully functional.
- All approved pages are available.
- English and Marathi work throughout the application.
- Customers can submit booking enquiries.
- Booking data is saved correctly.
- Admins can securely log in.
- Admins can manage website content.
- Admins can manage bookings and customers.
- Menu, services, packages, and gallery management work.
- The application is responsive.
- The backend and database are connected.
- Security and validation requirements are implemented.
- Production deployment is successful.

---

**Document End**

**Project:** Aditi Caterers  
**Document ID:** AC-DOC-001  

# Aditi Caterers – Frontend Folder Structure

```text
frontend/
│
├── public/
│   ├── images/
│   ├── favicon.ico
│   └── logo.png
│
├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo/
│   │   │   ├── banners/
│   │   │   ├── food/
│   │   │   └── gallery/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── LanguageSwitcher.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TopBar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── MainLayout.jsx
│   │   │
│   │   └── admin/
│   │       ├── AdminSidebar.jsx
│   │       ├── AdminHeader.jsx
│   │       ├── AdminLayout.jsx
│   │       └── AdminProtectedRoute.jsx
│   │
│   ├── features/
│   │   │
│   │   ├── home/
│   │   │   ├── pages/
│   │   │   │   └── HomePage.jsx
│   │   │   └── components/
│   │   │       ├── HeroSection.jsx
│   │   │       ├── AboutSection.jsx
│   │   │       ├── ServicesSection.jsx
│   │   │       └── HomeGallery.jsx
│   │   │
│   │   ├── about/
│   │   │   └── pages/
│   │   │       └── AboutPage.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── pages/
│   │   │   │   ├── ServicesPage.jsx
│   │   │   │   └── ServiceDetailsPage.jsx
│   │   │   └── components/
│   │   │       └── ServiceCard.jsx
│   │   │
│   │   ├── packages/
│   │   │   ├── pages/
│   │   │   │   ├── PackagesPage.jsx
│   │   │   │   └── PackageDetailsPage.jsx
│   │   │   └── components/
│   │   │       ├── PackageCard.jsx
│   │   │       └── PackageComparison.jsx
│   │   │
│   │   ├── menu/
│   │   │   ├── pages/
│   │   │   │   ├── FoodMenuPage.jsx
│   │   │   │   ├── MenuCategoryPage.jsx
│   │   │   │   └── FoodItemDetailsPage.jsx
│   │   │   └── components/
│   │   │       ├── MenuCategoryCard.jsx
│   │   │       ├── FoodItemCard.jsx
│   │   │       ├── MenuFilters.jsx
│   │   │       └── MenuSearch.jsx
│   │   │
│   │   ├── gallery/
│   │   │   ├── pages/
│   │   │   │   └── GalleryPage.jsx
│   │   │   └── components/
│   │   │       ├── GalleryGrid.jsx
│   │   │       └── GalleryLightbox.jsx
│   │   │
│   │   ├── awards/
│   │   │   └── pages/
│   │   │       └── AwardsPage.jsx
│   │   │
│   │   ├── testimonials/
│   │   │   └── pages/
│   │   │       └── TestimonialsPage.jsx
│   │   │
│   │   ├── booking/
│   │   │   ├── pages/
│   │   │   │   └── BookingPage.jsx
│   │   │   └── components/
│   │   │       └── BookingForm.jsx
│   │   │
│   │   ├── contact/
│   │   │   └── pages/
│   │   │       └── ContactPage.jsx
│   │   │
│   │   └── faq/
│   │       └── pages/
│   │           └── FAQPage.jsx
│   │
│   ├── admin/
│   │   ├── auth/
│   │   │   └── pages/
│   │   │       └── AdminLogin.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   └── pages/
│   │   │       └── DashboardPage.jsx
│   │   │
│   │   ├── bookings/
│   │   │   ├── pages/
│   │   │   │   ├── BookingsPage.jsx
│   │   │   │   └── BookingDetailsPage.jsx
│   │   │   └── components/
│   │   │       └── BookingTable.jsx
│   │   │
│   │   ├── customers/
│   │   │   └── pages/
│   │   │       └── CustomersPage.jsx
│   │   │
│   │   ├── services/
│   │   │   └── pages/
│   │   │       └── ManageServicesPage.jsx
│   │   │
│   │   ├── packages/
│   │   │   └── pages/
│   │   │       └── ManagePackagesPage.jsx
│   │   │
│   │   ├── menu/
│   │   │   ├── pages/
│   │   │   │   ├── ManageCategoriesPage.jsx
│   │   │   │   └── ManageMenuItemsPage.jsx
│   │   │   └── components/
│   │   │       └── MenuItemForm.jsx
│   │   │
│   │   ├── gallery/
│   │   │   └── pages/
│   │   │       └── ManageGalleryPage.jsx
│   │   │
│   │   ├── awards/
│   │   │   └── pages/
│   │   │       └── ManageAwardsPage.jsx
│   │   │
│   │   ├── reviews/
│   │   │   └── pages/
│   │   │       └── ManageReviewsPage.jsx
│   │   │
│   │   ├── quotations/
│   │   │   └── pages/
│   │   │       └── QuotationsPage.jsx
│   │   │
│   │   ├── reports/
│   │   │   └── pages/
│   │   │       └── ReportsPage.jsx
│   │   │
│   │   └── settings/
│   │       └── pages/
│   │           └── SettingsPage.jsx
│   │
│   ├── context/
│   │   ├── LanguageContext.jsx
│   │   ├── AuthContext.jsx
│   │   └── MenuSelectionContext.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useLanguage.js
│   │   └── useDebounce.js
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── bookingService.js
│   │   ├── packageService.js
│   │   ├── menuService.js
│   │   ├── serviceService.js
│   │   └── galleryService.js
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   ├── PublicRoutes.jsx
│   │   └── AdminRoutes.jsx
│   │
│   ├── locales/
│   │   ├── en.json
│   │   └── mr.json
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   ├── formatDate.js
│   │   ├── validators.js
│   │   └── whatsapp.js
│   │
│   ├── styles/
│   │   ├── variables.css
│   │   ├── global.css
│   │   ├── responsive.css
│   │   └── admin.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

## Frontend Architecture Rules

1. `features/` – Public website pages and their components.
2. `admin/` – Admin Panel pages and modules.
3. `components/common/` – Reusable components.
4. `components/layout/` – Navbar, Footer, and public layout.
5. `context/` – Global state management.
6. `services/` – All API calls.
7. `routes/` – Route configuration.
8. `locales/` – English and Marathi translations.
9. `styles/` – Global CSS and design tokens.
10. `assets/` – Images, fonts, and icons.

**Rule:** Do not write API calls directly inside every page component. Keep API communication inside the relevant service files.
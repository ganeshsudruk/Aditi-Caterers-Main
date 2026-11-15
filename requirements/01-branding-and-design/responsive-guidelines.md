# Aditi Caterers – Responsive Design Guidelines

**Document ID:** AC-BD-003  
**Project:** Aditi Caterers Website & Admin Management System  
**Module:** Branding & Responsive Design  
**Version:** 1.0  
**Priority:** High  
**Status:** Not Started

---

# 1. Objective

The objective of this document is to define responsive design standards for the complete Aditi Caterers application.

The website and Admin Panel must provide a consistent, accessible, and user-friendly experience across different screen sizes and devices.

The application must work properly on:

- Mobile Phones.
- Tablets.
- Laptops.
- Desktop Computers.
- Large Desktop Displays.

All layouts must automatically adapt to the available screen width without breaking the design or functionality.

# 2. Responsive Design Scope

Responsive design requirements apply to the following modules:

## 2.1 Public Website

- Navbar.
- Top Information Bar.
- Home Page.
- About Us.
- Services.
- Catering Packages.
- Food Menu.
- Gallery.
- Awards & Achievements.
- Testimonials.
- Booking Form.
- Contact Us.
- FAQ.
- Footer.
- WhatsApp Floating Button.

## 2.2 Admin Panel

- Admin Login.
- Admin Sidebar.
- Admin Top Navbar.
- Dashboard.
- Booking Management.
- Customer Management.
- Service Management.
- Menu Management.
- Package Management.
- Gallery Management.
- Awards Management.
- Review Management.
- Quotation Management.
- Reports.
- Website Settings.
- Profile Management.

# 3. Supported Screen Sizes

The application must support the following screen categories.

| Device | Screen Width | Layout |
|---|---:|---|
| Small Mobile | 320px – 374px | Compact Mobile |
| Standard Mobile | 375px – 575px | Mobile |
| Large Mobile | 576px – 767px | Wide Mobile |
| Tablet | 768px – 991px | Tablet |
| Small Laptop | 992px – 1199px | Laptop |
| Desktop | 1200px – 1399px | Desktop |
| Large Desktop | 1400px and above | Wide Desktop |

**Minimum Supported Width: 320px**

The website must not have horizontal overflow at the minimum supported width.

# 4. Bootstrap Responsive Breakpoints

The project uses Bootstrap 5.

Use the following Bootstrap breakpoints consistently.

| Breakpoint | Minimum Width | Usage |
|---|---:|---|
| xs | Below 576px | Mobile |
| sm | 576px | Large Mobile |
| md | 768px | Tablet |
| lg | 992px | Laptop |
| xl | 1200px | Desktop |
| xxl | 1400px | Large Desktop |

Developers should prefer Bootstrap's responsive grid and utilities instead of unnecessary custom media queries.

# 5. General Responsive Rules

1. Use a mobile-first development approach.
2. Use Bootstrap 5 grid system.
3. Avoid fixed widths for main content.
4. Use flexible containers.
5. Use responsive images.
6. Avoid horizontal scrolling.
7. Maintain readable typography.
8. Keep consistent spacing.
9. Make all interactive elements touch-friendly.
10. Prevent text overlapping.
11. Prevent images from stretching.
12. Ensure buttons fit smaller screens.
13. Test English and Marathi content separately.
14. Maintain consistent layouts across all pages.

# 6. Container & Layout Requirements

Use Bootstrap containers and grid layouts.

Recommended classes:

- `.container`
- `.container-fluid`
- `.row`
- `.col-12`
- `.col-sm-*`
- `.col-md-*`
- `.col-lg-*`
- `.col-xl-*`

Requirements:

- Main content must remain centered.
- Content must not touch the screen edges unnecessarily.
- Use consistent horizontal padding.
- Avoid unnecessary fixed margins.
- Sections must adapt to available width.
- Avoid fixed heights for content-heavy sections.

# 7. Navbar Responsive Requirements

The Navbar must support desktop, tablet, and mobile layouts.

## 7.1 Desktop

- Display business logo on the left.
- Display navigation links horizontally.
- Display Services dropdown.
- Display Food Menu dropdown.
- Display language switcher.
- Display Book Now button.
- Maintain proper spacing.

## 7.2 Tablet

- Adjust navigation spacing.
- Reduce unnecessary gaps.
- Maintain logo visibility.
- Switch to a collapsible menu when horizontal space is insufficient.
- Ensure all links remain accessible.

## 7.3 Mobile

- Display logo on the left.
- Display language switcher.
- Display hamburger menu.
- Open navigation links in a mobile menu.
- Support expandable dropdowns.
- Show Book Now CTA clearly.
- Close the menu after navigation.
- Prevent background page scrolling when the menu is open.

## 7.4 Mobile Navbar Behaviour

- Hamburger icon changes to close icon.
- Menu opens and closes correctly.
- Outside-click behaviour works where appropriate.
- Escape key closes the menu.
- Active page is highlighted.
- Dropdowns work using touch interactions.

# 8. Top Information Bar Requirements

Desktop:

- Display business contact number.
- Display business hours if confirmed.
- Display WhatsApp contact.
- Display approved social media links.

Mobile:

- Show only essential information.
- Avoid overcrowding.
- Allow non-essential details to move into the mobile menu.
- Do not allow text to overflow.

# 9. Hero Section Responsive Requirements

The Home Page Hero Section must adapt to different screen sizes.

Desktop:

- Large hero image or approved background image.
- Clear heading and description.
- Book Now CTA.
- Secondary CTA where required.

Tablet:

- Adjust image dimensions.
- Reduce heading size.
- Maintain readable text.

Mobile:

- Stack content vertically where appropriate.
- Keep the heading readable.
- Ensure buttons fit the screen.
- Use an appropriately cropped image.
- Avoid covering important image content.
- Maintain sufficient contrast between text and background.

Avoid fixed hero heights that crop content on smaller screens.

# 10. Image Responsive Requirements

All website images must be responsive.

Requirements:

- Use `width: 100%` where appropriate.
- Use `max-width: 100%`.
- Maintain aspect ratios.
- Avoid stretching.
- Use suitable image cropping.
- Optimize image sizes.
- Use lazy loading for suitable images.
- Provide fallback images when required.
- Add meaningful alt text.

Recommended image behaviour:

| Image Type | Recommended Behaviour |
|---|---|
| Logo | object-fit: contain |
| Hero Image | Responsive cover |
| Service Card | object-fit: cover |
| Food Card | object-fit: cover |
| Gallery Image | Consistent aspect ratio |
| Profile Image | object-fit: cover |

# 11. Card & Grid Responsive Requirements

All cards must automatically adjust to available screen space.

Recommended layouts:

| Screen Size | Cards Per Row |
|---|---:|
| Mobile 320px–575px | 1 |
| Large Mobile 576px–767px | 2 |
| Tablet 768px–991px | 2 or 3 |
| Laptop 992px–1199px | 3 |
| Desktop 1200px+ | 3 or 4 |

Applicable modules:

- Services.
- Food Menu.
- Packages.
- Testimonials.
- Awards.
- Gallery.

Requirements:

- Maintain consistent card spacing.
- Keep images properly aligned.
- Prevent text overflow.
- Keep CTA buttons accessible.
- Avoid cards becoming too narrow.

# 12. Food Menu Responsive Requirements

The Food Menu must be easy to browse on mobile devices.

Desktop:

- Display category navigation clearly.
- Show multiple food cards in a row.
- Provide Veg and Non-Veg filters.

Mobile:

- Display categories in a horizontally scrollable area or a suitable dropdown.
- Stack food cards vertically or in two columns when space allows.
- Keep filters easy to access.
- Avoid horizontal overflow.
- Maintain readable food names and descriptions.

# 13. Gallery Responsive Requirements

The Gallery must support different screen sizes.

Desktop:

- Display multiple photographs in a grid.
- Use consistent image dimensions.
- Support image preview/lightbox.

Tablet:

- Reduce the number of columns.
- Maintain image spacing.

Mobile:

- Display one or two columns depending on available width.
- Use touch-friendly image preview.
- Keep navigation controls accessible.
- Prevent image overflow.

Gallery lightbox requirements:

- Support touch navigation where implemented.
- Support keyboard navigation.
- Close using a visible close control.
- Avoid content extending beyond the viewport.

# 14. Booking Form Responsive Requirements

The Booking Form must be easy to use on mobile phones.

Desktop:

- Use two-column form layout where suitable.
- Group related fields.
- Keep labels and inputs aligned.

Tablet:

- Use two columns where readable.
- Reduce unnecessary spacing.

Mobile:

- Use a single-column layout.
- Inputs should occupy available width.
- Labels must remain visible.
- Buttons should be easy to tap.
- Validation messages must wrap correctly.
- Date and time inputs must remain usable.
- Form sections should be clearly separated.

Requirements:

- Do not use excessively small input fields.
- Do not hide required labels.
- Prevent accidental double submission.
- Preserve entered values when validation fails.

# 15. Contact Section Responsive Requirements

- Phone number must be clickable.
- WhatsApp button must remain accessible.
- Contact information must wrap correctly.
- Address must not overflow.
- Map or location embed must be responsive.
- Social media icons must remain touch-friendly.
- Contact forms must adapt to mobile layouts.

# 16. Footer Responsive Requirements

Desktop:

- Use multiple columns.
- Display logo and business details.
- Display quick links.
- Display services links.
- Display contact information.
- Display approved social media links.

Tablet:

- Reduce columns.
- Maintain alignment.

Mobile:

- Stack sections vertically.
- Keep important links accessible.
- Avoid overcrowding.
- Maintain readable text.
- Keep social icons properly spaced.

# 17. Admin Panel Responsive Requirements

The Admin Panel must also be fully responsive.

## 17.1 Admin Sidebar

Desktop:

- Display persistent sidebar.
- Show logo or brand identity.
- Display navigation groups.
- Highlight active navigation item.

Tablet:

- Support collapsible or compact sidebar.
- Maintain accessible navigation.

Mobile:

- Use a drawer or offcanvas navigation.
- Show hamburger button.
- Close navigation after selecting a page.
- Prevent unnecessary horizontal scrolling.

## 17.2 Admin Dashboard

Desktop:

- Display multiple summary cards in a row.
- Display charts and recent bookings.
- Use a structured dashboard layout.

Tablet:

- Reduce cards per row.
- Stack charts where necessary.

Mobile:

- Display summary cards in one or two columns.
- Stack dashboard sections.
- Keep charts readable.
- Avoid excessively wide content.

## 17.3 Admin Tables

Tables must be usable on smaller screens.

Requirements:

- Use Bootstrap responsive table wrappers where appropriate.
- Allow horizontal scrolling inside the table container when necessary.
- Keep important actions accessible.
- Prevent action buttons from becoming too small.
- Provide search and filter controls.
- Avoid causing page-level horizontal scrolling.

For complex data tables, use a mobile card layout where it provides a better experience.

## 17.4 Admin Forms

- Use responsive grid layouts.
- Stack fields on mobile.
- Keep labels visible.
- Maintain validation messages.
- Make file upload controls usable.
- Ensure Save and Cancel buttons remain accessible.

## 17.5 Admin Modals

- Modals must fit within the viewport.
- Long forms must scroll inside the modal.
- Important buttons must remain accessible.
- Avoid content extending beyond the screen.

# 18. English & Marathi Responsive Requirements

The website must work properly in both languages.

English and Marathi text may have different lengths.

Requirements:

1. Text containers must be flexible.
2. Buttons must support longer Marathi labels.
3. Navigation must adapt to translated text.
4. Cards must support multiline headings.
5. Forms must support Marathi labels.
6. Validation messages must wrap correctly.
7. Headings must not overlap.
8. No fixed-height text containers unless content is controlled.
9. Use Noto Sans Devanagari for Marathi.
10. Test both languages at all major breakpoints.

Example:

English: Book Now

Marathi: बुकिंग करा

The same button must display both labels correctly without breaking its layout.

# 19. Buttons & Touch Interaction Requirements

All interactive elements must be usable on touch devices.

Requirements:

- Recommended minimum touch target: 44 × 44 CSS pixels.
- Maintain adequate spacing between adjacent buttons.
- Do not depend only on hover interactions.
- Provide visible active and focus states.
- Use clear labels.
- Avoid tiny icon-only controls without accessible names.

# 20. Typography Responsive Requirements

Use the typography scale defined in:

`color-typography.md`

Requirements:

- Main headings must scale appropriately.
- Body text must remain readable.
- Marathi text must not be clipped.
- Line heights must support Devanagari characters.
- Buttons must accommodate longer labels.
- Avoid unnecessarily small text.

# 21. Spacing Responsive Requirements

- Use Bootstrap spacing utilities.
- Reduce excessive spacing on mobile.
- Maintain consistent section padding.
- Avoid unnecessary large margins.
- Keep content readable.
- Maintain proper spacing between form fields.
- Use consistent card gaps.

Do not copy desktop spacing values blindly into mobile layouts.

# 22. Responsive Behaviour for Interactive Components

The following components must be tested on all supported screen sizes:

- Dropdown menus.
- Navigation menus.
- Modals.
- Lightboxes.
- Tabs.
- Accordions.
- Sliders.
- Carousels.
- Forms.
- Search fields.
- Filter controls.
- Toast notifications.
- Floating WhatsApp button.

All interactions must work with both mouse and touch input where applicable.

# 23. Browser Compatibility

The website should be tested on:

- Google Chrome.
- Microsoft Edge.
- Mozilla Firefox.
- Safari.
- Android Chrome.
- iOS Safari.

Use modern, supported web standards and avoid browser-specific behaviour unless properly handled.

# 24. Performance Requirements

- Optimize images for different screen sizes.
- Use responsive image loading where practical.
- Avoid unnecessarily large assets.
- Load only required fonts.
- Lazy-load suitable below-the-fold content.
- Avoid unnecessary animations.
- Minimize layout shifts.
- Ensure acceptable loading performance on mobile networks.

# 25. Testing Checklist

## 25.1 Mobile Testing

- [ ] Website works at 320px width.
- [ ] Website works at 375px width.
- [ ] Website works at 414px width.
- [ ] Navbar opens and closes.
- [ ] All buttons are clickable.
- [ ] Forms are usable.
- [ ] Images are responsive.
- [ ] No horizontal page scrolling.
- [ ] Marathi text displays correctly.
- [ ] Footer layout works.

## 25.2 Tablet Testing

- [ ] Navbar layout works.
- [ ] Cards align correctly.
- [ ] Images resize correctly.
- [ ] Forms remain readable.
- [ ] Admin sidebar works.
- [ ] Tables remain usable.

## 25.3 Desktop Testing

- [ ] Navigation alignment is correct.
- [ ] Content width is controlled.
- [ ] Cards use proper columns.
- [ ] Images maintain quality.
- [ ] Forms are properly aligned.
- [ ] Admin dashboard works.

## 25.4 Language Testing

- [ ] English layout works.
- [ ] Marathi layout works.
- [ ] Language switching does not break layout.
- [ ] Long Marathi labels wrap correctly.
- [ ] No text clipping.
- [ ] No overlapping elements.

# 26. Definition of Done

Responsive design will be considered completed when:

- All public pages are responsive.
- All Admin Panel pages are responsive.
- The application works at 320px minimum width.
- No page-level horizontal overflow exists.
- All images adapt correctly.
- Forms work on mobile.
- Tables are usable on mobile.
- Navigation works on touch devices.
- Modals and dropdowns fit the viewport.
- English and Marathi layouts work correctly.
- Supported browsers are tested.
- No major responsive UI defects remain.

# 27. Developer Task Information

**Task ID:** AC-BD-003

**Module:** Responsive Design Guidelines

**Assigned To:** To Be Assigned

**Priority:** High

**Dependencies:**

- AC-BD-001 – Brand Guidelines
- AC-BD-002 – Color & Typography

**Deliverables:**

- Responsive public website layouts.
- Responsive Navbar.
- Responsive Home Page.
- Responsive content pages.
- Responsive booking forms.
- Responsive Admin Panel.
- Responsive tables and modals.
- English and Marathi responsive verification.
- Cross-device testing report.

**Status:** Not Started

**Final Approval:** Project Lead

---

**Document End**

**Project:** Aditi Caterers  
**Document ID:** AC-BD-003  
**Next Module:** Public Website Requirements  
**Next Document:** `01-navbar-requirements.md`
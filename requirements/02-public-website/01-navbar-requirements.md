# Aditi Caterers – Navbar Requirements

**Document ID:** AC-FE-001  
**Project:** Aditi Caterers Website & Admin Management System  
**Module:** Public Website – Navigation Bar  
**Version:** 1.0  
**Priority:** Critical  
**Status:** Not Started

---

# 1. Module Introduction

The Navbar is one of the most important components of the Aditi Caterers website.

It provides navigation between different website pages and helps customers quickly access important business information, catering services, food menus, and booking options.

The Navbar must have a professional, clean, responsive, and user-friendly design.

It must support both English and Marathi languages.

The Navbar must work correctly on Desktop, Laptop, Tablet, and Mobile devices.

# 2. Module Objective

The main objectives are:

1. Provide easy navigation throughout the website.
2. Display Aditi Caterers branding and logo.
3. Provide access to all major website pages.
4. Provide Services and Food Menu dropdowns.
5. Allow users to switch between English and Marathi.
6. Provide a prominent Book Now button.
7. Display business contact information.
8. Provide WhatsApp and social media access.
9. Support sticky navigation on scroll.
10. Provide an accessible mobile navigation menu.

# 3. Technology Requirements

| Technology | Purpose |
|---|---|
| React.js | Navbar components |
| Bootstrap 5 | Layout and responsive design |
| Bootstrap Icons | Navigation icons |
| React Router DOM | Page navigation |
| React Context API | Language management |
| CSS | Custom navbar styling |

Rules:

- Use Bootstrap 5 as the primary UI framework.
- Use Bootstrap Icons instead of emojis.
- Use React Router DOM for internal navigation.
- Use reusable components.
- Avoid unnecessary external UI libraries.
- Follow the global brand guidelines.

# 4. Navbar Layout Structure

The Navbar must contain three main sections.

## 4.1 Top Information Bar

Displays important business contact information.

## 4.2 Main Navigation Bar

Displays the business logo, navigation links, language switcher, and Book Now button.

## 4.3 Mobile Navigation Menu

Displays navigation links in a collapsible mobile layout.

Recommended desktop structure:

```text
---------------------------------------------------------
 Phone Number | Business Hours | WhatsApp | Social Links
---------------------------------------------------------
 Logo | Home | About | Services | Menu | Gallery | More
                                     Language | Book Now
---------------------------------------------------------
```

The exact layout must adapt to available screen width without horizontal overflow.

# 5. Top Information Bar Requirements

## 5.1 Purpose

The Top Information Bar must provide quick access to business contact information.

## 5.2 Required Elements

1. Business Phone Number.
2. Business Hours (only after confirmation).
3. WhatsApp Contact.
4. Social Media Links.
5. Optional Location Information.

## 5.3 Phone Number

Display:

`+91 9975959391`

Requirements:

- Phone number must be clickable.
- Use the `tel:` link.
- Open the phone application on supported mobile devices.
- Display a telephone icon.
- Number must be manageable from website settings in the future.

Example:

```jsx
<a href="tel:+919975959391">
  <i className="bi bi-telephone"></i>
  +91 9975959391
</a>
```

## 5.4 WhatsApp Contact

Requirements:

- Display a WhatsApp icon.
- Provide a clickable WhatsApp link.
- Open WhatsApp or WhatsApp Web.
- Use the official business number.
- Support a prefilled enquiry message where appropriate.

WhatsApp URL format:

```text
https://wa.me/919975959391
```

## 5.5 Business Hours

- Display business working hours only after confirmation.
- Use a clock icon.
- Keep the text short.
- Support English and Marathi translations.

## 5.6 Social Media Links

Potential platforms:

- Instagram.
- Facebook.
- YouTube.

Requirements:

- Display only official business social media accounts.
- Open external links in a new tab.
- Use appropriate icons.
- Include accessible labels.
- Do not use dummy URLs.

## 5.7 Mobile Behaviour

On smaller screens:

- Display essential contact information.
- Prioritize Phone and WhatsApp.
- Move non-essential information into the mobile menu if needed.
- Prevent content overflow.

# 6. Brand Logo Requirements

## 6.1 Logo Position

- Display the logo on the left side of the main Navbar.
- Clicking the logo must navigate to the Home Page.
- Maintain appropriate spacing between logo and navigation links.

## 6.2 Logo Dimensions

Recommended dimensions:

| Device | Logo Height |
|---|---:|
| Desktop | 55–65px |
| Tablet | 48–55px |
| Mobile | 42–48px |

Requirements:

- Maintain original aspect ratio.
- Use `object-fit: contain`.
- Do not stretch or distort the logo.
- Provide a fallback brand name if the logo is unavailable.
- Add meaningful alt text.

## 6.3 Logo Asset

Expected location:

```text
frontend/src/assets/branding/logo/logo-primary.png
```

The actual business logo must be provided by the business owner.

# 7. Main Navigation Links

The Navbar must provide access to the following pages.

| No. | English | Marathi | Route |
|---|---|---|---|
| 1 | Home | मुख्यपृष्ठ | `/` |
| 2 | About Us | आमच्याबद्दल | `/about` |
| 3 | Services | सेवा | `/services` |
| 4 | Food Menu | खाद्यपदार्थ मेनू | `/menu` |
| 5 | Packages | पॅकेजेस | `/packages` |
| 6 | Gallery | फोटो गॅलरी | `/gallery` |
| 7 | Awards | पुरस्कार | `/awards` |
| 8 | Contact Us | संपर्क साधा | `/contact` |

Additional Requirements:

- All internal links must use React Router DOM.
- Highlight the active page.
- Avoid full-page reloads for internal navigation.
- All routes must be valid.
- Do not create dead or placeholder navigation links in production.

# 8. Services Dropdown Requirements

The Services navigation item must display a dropdown.

## 8.1 Dropdown Categories

| English | Marathi | Route |
|---|---|---|
| Wedding Catering | लग्न समारंभ | `/services/wedding` |
| Birthday Catering | वाढदिवस समारंभ | `/services/birthday` |
| Engagement Catering | साखरपुडा | `/services/engagement` |
| Reception Catering | स्वागत समारंभ | `/services/reception` |
| Corporate Events | कॉर्पोरेट कार्यक्रम | `/services/corporate` |
| Religious Events | धार्मिक कार्यक्रम | `/services/religious` |
| Other Events | इतर कार्यक्रम | `/services/other` |

## 8.2 Desktop Behaviour

- Open on hover where appropriate.
- Also support click interaction.
- Display a clean dropdown.
- Highlight the active item.
- Close when clicking outside.
- Close when pressing Escape.

## 8.3 Mobile Behaviour

- Open when the user taps Services.
- Expand and collapse the submenu.
- Keep the submenu inside the mobile navigation.
- Do not navigate unexpectedly when expanding the dropdown.

# 9. Food Menu Dropdown Requirements

The Food Menu navigation item must display food categories.

## 9.1 Menu Categories

| English | Marathi | Route |
|---|---|---|
| Breakfast | नाश्ता | `/menu/breakfast` |
| Starters | सुरुवातीचे पदार्थ | `/menu/starters` |
| Main Course | मुख्य जेवण | `/menu/main-course` |
| Maharashtrian Food | महाराष्ट्रीयन पदार्थ | `/menu/maharashtrian` |
| Punjabi Food | पंजाबी पदार्थ | `/menu/punjabi` |
| South Indian Food | दक्षिण भारतीय पदार्थ | `/menu/south-indian` |
| Desserts | गोड पदार्थ | `/menu/desserts` |
| Beverages | पेये | `/menu/beverages` |

## 9.2 Desktop Behaviour

- Display dropdown on hover or click.
- Use readable labels.
- Maintain proper spacing.
- Highlight active categories.

## 9.3 Mobile Behaviour

- Open submenu on tap.
- Support expand/collapse.
- Prevent accidental navigation.
- Maintain touch-friendly spacing.

# 10. Language Switcher Requirements

**Priority: Critical**

The complete website must support English and Marathi.

## 10.1 Language Options

- English – EN
- Marathi – मराठी

Recommended design:

`EN | मराठी`

## 10.2 Functional Requirements

1. English must be the default language.
2. Users must be able to switch to Marathi.
3. Language switching must update the entire website content.
4. Navigation labels must update immediately.
5. Dropdown labels must update.
6. Buttons must update.
7. Footer content must update.
8. Forms and validation messages must update.
9. Admin Panel language support must be implemented separately through the shared language system.
10. The selected language must persist after refresh.

## 10.3 Language Persistence

Use browser localStorage.

Example:

```js
localStorage.setItem("language", "mr");
```

On application initialization:

- Read the saved language.
- If no language is saved, use English.
- Apply the selected language.

## 10.4 Language Context

Recommended location:

```text
frontend/src/context/LanguageContext.jsx
```

## 10.5 Translation Files

```text
frontend/src/locales/
├── en.json
└── mr.json
```

## 10.6 Font Behaviour

- English: Poppins.
- Marathi: Noto Sans Devanagari.
- Apply the correct font after language switching.
- Prevent clipping and overlapping.
- Support longer Marathi navigation labels.

# 11. Book Now Button Requirements

The Book Now button must be prominently visible.

## 11.1 Button Labels

English: Book Now

Marathi: बुकिंग करा

## 11.2 Navigation

Route:

`/booking`

## 11.3 Design

- Primary Maroon background.
- White text.
- Consistent padding.
- Moderate border radius.
- Proper hover and focus states.
- Optional calendar icon.

## 11.4 Functional Requirements

- Navigate to Booking Page.
- Work on desktop and mobile.
- Use React Router DOM.
- Remain visible in the mobile menu.
- Prevent repeated clicks during navigation where necessary.

# 12. Desktop Navbar Requirements

For screen widths where a full horizontal layout fits:

- Logo must appear on the left.
- Navigation links must be aligned properly.
- Dropdowns must work.
- Language switcher must be visible.
- Book Now CTA must be visible.
- Top Information Bar must be displayed.
- Navbar must maintain consistent height.
- Avoid overcrowding.

If all links cannot fit, use an approved More dropdown or switch to a compact navigation layout rather than shrinking text excessively.

# 13. Tablet Navbar Requirements

For tablet screens:

- Adjust navigation spacing.
- Maintain logo visibility.
- Avoid overlapping links.
- Support collapsible navigation when required.
- Maintain access to Book Now.
- Keep the language switcher accessible.
- Ensure dropdowns fit within the viewport.

# 14. Mobile Navbar Requirements

## 14.1 Mobile Layout

Recommended structure:

```text
--------------------------------
 Logo          EN | मराठी   ☰
--------------------------------

When opened:

Home
About Us
Services          +
  Wedding Catering
  Birthday Catering
  Engagement Catering

Food Menu         +
  Breakfast
  Starters
  Main Course

Packages
Gallery
Awards
Contact Us

[ Book Now ]
--------------------------------
```

## 14.2 Mobile Functional Requirements

- Hamburger menu must open the navigation.
- Hamburger icon must change to a close icon.
- Menu must close after route navigation.
- Menu must close when the user presses Escape.
- Background scrolling should be disabled while an overlay menu is open.
- Dropdowns must expand on tap.
- All links must be accessible.
- The Book Now button must be clearly visible.
- The language switcher must remain accessible.

## 14.3 Mobile Touch Requirements

- Minimum recommended touch target: 44 × 44 CSS pixels.
- Maintain sufficient spacing between links.
- Avoid tiny icons.
- Avoid hover-only interactions.

# 15. Sticky Navbar Requirements

The main navigation bar must support sticky behaviour.

Requirements:

1. Navbar appears normally when the page loads.
2. On scrolling, the main Navbar remains visible.
3. The Top Information Bar may scroll away.
4. Apply a subtle shadow when sticky.
5. Maintain correct z-index.
6. Do not cover page content.
7. Ensure dropdowns appear above the page content.
8. Avoid layout jumping when sticky behaviour activates.

# 16. Active Navigation Requirements

The active route must be highlighted.

Examples:

- Home route: Home is active.
- About route: About Us is active.
- Services detail route: Services is active.
- Menu category route: Food Menu is active.

Requirements:

- Use React Router location information.
- Highlight the current parent dropdown item when a child route is active.
- Apply consistent active styling.
- Support both languages.

# 17. Dropdown Interaction Requirements

All dropdowns must support:

- Mouse hover.
- Mouse click.
- Touch interaction.
- Keyboard navigation.
- Escape key.
- Outside click.
- Active item highlighting.

Requirements:

- Dropdown must not open outside the viewport.
- Dropdown must not be clipped by parent containers.
- Menu items must have readable spacing.
- Avoid unnecessary animation.
- Ensure dropdown state is handled correctly.

# 18. Accessibility Requirements

The Navbar must follow accessible navigation practices.

Requirements:

- Use semantic `<nav>` elements.
- Add accessible navigation labels.
- Use meaningful link text.
- Provide keyboard navigation.
- Support Tab navigation.
- Support Enter and Space for appropriate controls.
- Use Escape to close open menus.
- Use `aria-expanded` for expandable controls.
- Use `aria-controls` where appropriate.
- Add accessible names to icon-only buttons.
- Maintain visible focus indicators.
- Ensure proper contrast.
- Provide descriptive logo alt text.

# 19. SEO Requirements

- Use semantic navigation markup.
- Use actual internal links.
- Ensure links are crawlable.
- Avoid unnecessary duplicate navigation links.
- Use meaningful route names.
- Set the document language according to the selected language.

# 20. Navbar Component Structure

Develop the Navbar using reusable React components.

Recommended structure:

```text
frontend/src/
│
├── components/
│   └── navbar/
│       ├── Navbar.jsx
│       ├── TopBar.jsx
│       ├── BrandLogo.jsx
│       ├── NavLinks.jsx
│       ├── NavDropdown.jsx
│       ├── LanguageSwitcher.jsx
│       ├── MobileMenu.jsx
│       ├── BookNowButton.jsx
│       └── navbar.css
│
├── context/
│   └── LanguageContext.jsx
│
└── locales/
    ├── en.json
    └── mr.json
```

## Component Responsibilities

### Navbar.jsx

- Main Navbar wrapper.
- Manage overall layout.
- Coordinate mobile navigation.
- Handle sticky behaviour where appropriate.

### TopBar.jsx

- Display phone number.
- Display WhatsApp link.
- Display approved business hours.
- Display approved social links.

### BrandLogo.jsx

- Display official business logo.
- Navigate to Home Page.
- Provide fallback text.

### NavLinks.jsx

- Display main navigation links.
- Highlight active routes.

### NavDropdown.jsx

- Display dropdown navigation items.
- Handle dropdown interaction.

### LanguageSwitcher.jsx

- Switch English and Marathi.
- Update the global language state.
- Persist selected language.

### MobileMenu.jsx

- Display mobile navigation.
- Handle open and close interactions.
- Support expandable submenus.

### BookNowButton.jsx

- Navigate to `/booking`.
- Display translated CTA text.

# 21. Navbar Styling Requirements

- Follow `brand-guidelines.md`.
- Follow `color-typography.md`.
- Follow `responsive-guidelines.md`.
- Use Maroon as the primary brand color.
- Use Gold only for suitable accents.
- Use Poppins for English.
- Use Noto Sans Devanagari for Marathi.
- Use Bootstrap spacing utilities.
- Avoid excessive shadows.
- Avoid unnecessary gradients.
- Maintain consistent spacing.
- Prevent horizontal overflow.

# 22. Error Handling & Edge Cases

The Navbar must handle:

- Missing logo image.
- Missing business hours.
- Missing social media URLs.
- Missing optional business information.
- Long Marathi navigation labels.
- Small screen widths.
- Invalid internal navigation routes.
- Dropdown overflow.
- Repeated menu clicks.
- Language preference not available in localStorage.

Optional business information must not create empty spaces or broken UI elements.

# 23. Performance Requirements

- Avoid unnecessary component re-renders.
- Keep Navbar assets optimized.
- Avoid unnecessary dependencies.
- Use efficient event listener handling.
- Clean up event listeners.
- Avoid layout shifts.
- Load only required fonts.
- Keep navigation interactions smooth.

# 24. Testing Requirements

## Desktop Testing

- [ ] Logo is visible.
- [ ] All navigation links work.
- [ ] Services dropdown works.
- [ ] Food Menu dropdown works.
- [ ] Language switcher works.
- [ ] Book Now navigation works.
- [ ] Sticky Navbar works.
- [ ] Active route is highlighted.

## Mobile Testing

- [ ] Hamburger menu works.
- [ ] Close button works.
- [ ] Mobile dropdowns work.
- [ ] Navigation closes after route change.
- [ ] Language switcher works.
- [ ] Book Now button works.
- [ ] No horizontal overflow.
- [ ] Touch targets are usable.

## Bilingual Testing

- [ ] English navigation displays correctly.
- [ ] Marathi navigation displays correctly.
- [ ] Dropdown translations work.
- [ ] Marathi font is applied.
- [ ] Long Marathi labels do not overflow.
- [ ] Selected language persists after refresh.

## Accessibility Testing

- [ ] Keyboard navigation works.
- [ ] Focus indicators are visible.
- [ ] Escape closes menus.
- [ ] ARIA attributes are correct.
- [ ] Logo has meaningful alt text.

## Edge Case Testing

- [ ] Missing logo fallback works.
- [ ] Missing social links are hidden.
- [ ] Missing business hours are handled.
- [ ] Dropdowns stay within the viewport.
- [ ] 320px screen width is supported.

# 25. Definition of Done

The Navbar module will be considered completed only when:

1. All documented navigation items are implemented.
2. Business logo is integrated.
3. Top Information Bar works.
4. Services dropdown works.
5. Food Menu dropdown works.
6. English and Marathi language switching works.
7. Language selection persists after refresh.
8. Book Now navigates correctly.
9. Desktop navigation works.
10. Tablet navigation works.
11. Mobile navigation works.
12. Sticky behaviour works.
13. Active route highlighting works.
14. Accessibility requirements are addressed.
15. All responsive tests pass.
16. No major console errors remain.
17. Code is pushed to the assigned branch.
18. Code review is completed.

# 26. Developer Task Assignment

**Task ID:** AC-FE-001

**Module:** Navbar

**Assigned To:** To Be Assigned

**Priority:** Critical

**Dependencies:**

- AC-DOC-001 – Project Overview
- AC-BD-001 – Brand Guidelines
- AC-BD-002 – Color & Typography
- AC-BD-003 – Responsive Guidelines

**Expected Deliverables:**

- Navbar.jsx
- TopBar.jsx
- BrandLogo.jsx
- NavLinks.jsx
- NavDropdown.jsx
- LanguageSwitcher.jsx
- MobileMenu.jsx
- BookNowButton.jsx
- navbar.css
- Navigation integration with React Router.
- English and Marathi navigation translations.
- Responsive and accessibility testing report.

**Suggested Git Branch:**

`feature/navbar`

**Suggested Commit Message:**

`feat: implement responsive bilingual navbar`

**Status:** Not Started

**Final Reviewer:** Project Lead

---

# 27. Business Owner Pending Information

The following information must be collected before final production approval:

- [ ] Official Aditi Caterers Logo.
- [ ] Confirmed business hours.
- [ ] Official Instagram URL.
- [ ] Official Facebook URL.
- [ ] Official YouTube URL (if available).
- [ ] Confirmed business contact number.
- [ ] Approved brand colors.

Do not use dummy social media links or unverified business information.

---

**Document End**

**Project:** Aditi Caterers  
**Document ID:** AC-FE-001  
**Next Document:** `02-home-page-requirements.md`
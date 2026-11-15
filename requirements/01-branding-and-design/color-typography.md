# Aditi Caterers – Color & Typography Guidelines

**Document ID:** AC-BD-002  
**Project:** Aditi Caterers Website & Admin Management System  
**Module:** Branding & Design  
**Version:** 1.0  
**Priority:** High  
**Status:** Not Started

---

# 1. Objective

The objective of this document is to define a consistent color system and typography system for the entire Aditi Caterers application.

These guidelines must be followed across:

- Public Website.
- Admin Panel.
- Navigation Bar.
- Footer.
- Forms.
- Buttons.
- Cards.
- Tables.
- Modals.
- Dashboard.
- Notifications.
- Mobile and Tablet Layouts.

The application must support both English and Marathi languages without typography or layout issues.

# 2. Color System Overview

The website will use a professional and elegant color palette inspired by traditional Indian catering and hospitality branding.

The proposed brand palette includes:

- Maroon as the primary brand color.
- Gold as the secondary accent color.
- White for clean backgrounds.
- Light Cream for section backgrounds.
- Dark Gray for readable text.

**Important:** These colors are proposed design tokens. Final approval must be obtained after checking the official Aditi Caterers logo.

# 3. Primary Brand Colors

| Color Name | HEX Code | RGB | Usage |
|---|---|---|---|
| Primary Maroon | #641E2B | 100, 30, 43 | Primary buttons, branding |
| Secondary Gold | #C9A45C | 201, 164, 92 | Highlights, accents |
| White | #FFFFFF | 255, 255, 255 | Main backgrounds |
| Light Cream | #FAF7F2 | 250, 247, 242 | Section backgrounds |
| Dark Gray | #333333 | 51, 51, 51 | Primary text |
| Medium Gray | #6C757D | 108, 117, 125 | Secondary text |
| Light Gray | #F1F1F1 | 241, 241, 241 | Borders and surfaces |

# 4. Extended Color Palette

The following color variations should be used for hover, active, and background states.

## 4.1 Maroon Variations

| Name | HEX | Usage |
|---|---|---|
| Maroon Dark | #45131D | Dark hover state |
| Maroon Primary | #641E2B | Main brand color |
| Maroon Light | #843B49 | Secondary highlights |
| Maroon Background | #F5EAEC | Light background accents |

## 4.2 Gold Variations

| Name | HEX | Usage |
|---|---|---|
| Gold Dark | #A9823D | Gold hover state |
| Gold Primary | #C9A45C | Main accent |
| Gold Light | #E1C995 | Light decorative elements |
| Gold Background | #F8F1E3 | Light accent background |

## 4.3 Neutral Colors

| Name | HEX | Usage |
|---|---|---|
| Black | #000000 | Limited use |
| Dark Gray | #333333 | Headings and body text |
| Gray | #6C757D | Secondary text |
| Light Gray | #F1F1F1 | Background and borders |
| Border Gray | #DEE2E6 | Input and card borders |
| White | #FFFFFF | Background |

# 5. Semantic Colors

Semantic colors must be used consistently for system feedback and Admin Panel status indicators.

| Status | Color | HEX |
|---|---|---|
| Success | Green | #198754 |
| Error / Danger | Red | #DC3545 |
| Warning | Amber | #FFC107 |
| Information | Blue | #0D6EFD |
| Pending | Gray | #6C757D |

Examples:

- Booking confirmed: Success.
- Booking cancelled: Danger.
- Booking pending: Warning.
- New booking notification: Information.

Do not use semantic colors as replacements for primary brand colors.

# 6. Color Usage Rules

## 6.1 Primary Maroon

Use Maroon for:

- Primary CTA buttons.
- Active navigation links.
- Important headings.
- Brand highlights.
- Selected menu items.
- Primary form actions.

## 6.2 Gold

Use Gold for:

- Decorative accents.
- Small section dividers.
- Premium highlights.
- Important icon accents.
- Subtle borders.

Avoid using Gold for long paragraphs or small text on white backgrounds when contrast is insufficient.

## 6.3 Background Colors

Use:

- White for main content areas.
- Light Cream for selected sections.
- Light Gray for input backgrounds where appropriate.
- White cards on light backgrounds.

## 6.4 Text Colors

- Primary text: #333333.
- Secondary text: #6C757D.
- Important brand text: #641E2B.
- Text on dark Maroon: #FFFFFF.

Maintain readable contrast for all text.

# 7. Color Accessibility

The design must follow WCAG 2.2 AA contrast guidance wherever applicable.

Minimum contrast targets:

- Normal text: 4.5:1.
- Large text: 3:1.
- Important UI boundaries and graphical controls: 3:1 where applicable.

Do not assume every brand color combination is accessible.

For example:

- White text on Primary Maroon: Verify contrast.
- Gold text on White: Avoid for small text unless verified.
- Dark Gray text on White: Preferred for body content.

Do not communicate booking status using color alone. Include text labels or icons.

# 8. Typography System Overview

The application must support:

1. English typography.
2. Marathi typography.

The font system must remain readable and consistent across the complete application.

# 9. English Font Guidelines

**Recommended Font:** Poppins

Usage:

- Navbar.
- Main headings.
- Section headings.
- Body text.
- Buttons.
- Forms.
- Admin dashboard.
- Tables.

Recommended font weights:

| Weight | Value | Usage |
|---|---:|---|
| Regular | 400 | Body text |
| Medium | 500 | Labels and navigation |
| SemiBold | 600 | Section headings |
| Bold | 700 | Main headings |

Use only the required font weights to avoid unnecessary font loading.

# 10. Marathi Font Guidelines

**Recommended Font:** Noto Sans Devanagari

Usage:

- Marathi navigation.
- Marathi headings.
- Marathi paragraphs.
- Marathi form labels.
- Marathi buttons.
- Marathi notifications.
- Admin Panel translations.

Recommended font weights:

| Weight | Value | Usage |
|---|---:|---|
| Regular | 400 | Body text |
| Medium | 500 | Labels |
| SemiBold | 600 | Section headings |
| Bold | 700 | Main headings |

Requirements:

- Marathi characters must render correctly.
- Matras must not be clipped.
- Text must not overlap.
- Line height must be sufficient.
- Marathi buttons must support longer text.
- Marathi paragraphs must wrap naturally.

# 11. Font Loading Requirements

Use Google Fonts or properly licensed local font files.

Recommended font families:

- Poppins.
- Noto Sans Devanagari.

The application should use font fallbacks.

Example CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');

:root {
  --font-english: 'Poppins', sans-serif;
  --font-marathi: 'Noto Sans Devanagari', sans-serif;
}
```

For production, prefer optimized local font files or another reliable font-loading strategy.

# 12. Language-Based Typography

The website must automatically apply the appropriate font based on the selected language.

Example:

```jsx
const isMarathi = language === "mr";

<div className={isMarathi ? "font-marathi" : "font-english"}>
  {children}
</div>
```

CSS:

```css
.font-english {
  font-family: var(--font-english);
}

.font-marathi {
  font-family: var(--font-marathi);
}
```

Requirements:

- English mode uses Poppins.
- Marathi mode uses Noto Sans Devanagari.
- Switching languages updates typography immediately.
- Font changes must not break the layout.
- Language preference must persist after refresh.

# 13. Font Size Guidelines

Use a consistent typography scale.

| Element | Desktop | Tablet | Mobile |
|---|---:|---:|---:|
| Hero Heading | 48px | 40px | 32px |
| Page Heading | 40px | 34px | 28px |
| Section Heading | 32px | 28px | 24px |
| Card Heading | 22px | 21px | 19px |
| Subheading | 18px | 17px | 16px |
| Body Text | 16px | 16px | 15px |
| Small Text | 14px | 14px | 13px |
| Button Text | 16px | 15px | 15px |
| Form Label | 14px | 14px | 14px |

These are recommended sizes. Adjust them if Marathi text requires more space.

# 14. Typography Hierarchy

Maintain the following heading structure:

- H1: Main page heading.
- H2: Main section heading.
- H3: Card and subsection heading.
- H4: Small subsection heading.
- Paragraph: Regular content.
- Small: Secondary information.

Do not skip heading levels without a semantic reason.

Use only one primary H1 for each page where appropriate.

# 15. Line Height Guidelines

| Element | Recommended Line Height |
|---|---|
| Main Heading | 1.2 |
| Section Heading | 1.3 |
| Card Heading | 1.35 |
| Body Paragraph | 1.6 |
| Form Label | 1.5 |
| Button Text | 1.4 |

For Marathi text, test line heights carefully to avoid clipping of Devanagari characters.

# 16. Letter Spacing Guidelines

- Use normal letter spacing for paragraphs.
- Avoid excessive letter spacing in Marathi.
- Use subtle spacing for uppercase English labels only when appropriate.
- Do not force uppercase styling on Marathi text.

# 17. Spacing & Border Radius Tokens

Maintain consistent spacing and shape styles.

## 17.1 Spacing Scale

| Token | Value |
|---|---:|
| space-1 | 4px |
| space-2 | 8px |
| space-3 | 12px |
| space-4 | 16px |
| space-5 | 24px |
| space-6 | 32px |
| space-7 | 48px |
| space-8 | 64px |

## 17.2 Border Radius

| Token | Value |
|---|---:|
| radius-sm | 4px |
| radius-md | 8px |
| radius-lg | 12px |
| radius-xl | 16px |
| radius-pill | 50px |

Use moderate border radii. Avoid excessive rounded elements.

# 18. CSS Design Tokens

Create a centralized design token file.

Recommended location:

```text
frontend/
└── src/
    └── styles/
        ├── variables.css
        ├── typography.css
        └── global.css
```

Example `variables.css`:

```css
:root {
  /* Brand Colors */
  --color-primary: #641E2B;
  --color-primary-dark: #45131D;
  --color-primary-light: #843B49;

  --color-secondary: #C9A45C;
  --color-secondary-dark: #A9823D;
  --color-secondary-light: #E1C995;

  /* Background Colors */
  --color-white: #FFFFFF;
  --color-cream: #FAF7F2;
  --color-light: #F1F1F1;

  /* Text Colors */
  --color-text: #333333;
  --color-text-secondary: #6C757D;

  /* Border */
  --color-border: #DEE2E6;

  /* Semantic Colors */
  --color-success: #198754;
  --color-danger: #DC3545;
  --color-warning: #FFC107;
  --color-info: #0D6EFD;

  /* Typography */
  --font-english: 'Poppins', sans-serif;
  --font-marathi: 'Noto Sans Devanagari', sans-serif;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
}
```

# 19. Global Typography CSS

Create a centralized typography stylesheet.

Example `typography.css`:

```css
body {
  font-family: var(--font-english);
  color: var(--color-text);
  font-size: 16px;
  line-height: 1.6;
}

.font-english {
  font-family: var(--font-english);
}

.font-marathi {
  font-family: var(--font-marathi);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 600;
  line-height: 1.3;
}

button,
input,
select,
textarea {
  font: inherit;
}
```

# 20. Bootstrap Integration Rules

The project uses Bootstrap 5.

Developers must:

- Use Bootstrap spacing utilities.
- Use Bootstrap grid.
- Use Bootstrap responsive breakpoints.
- Use Bootstrap form controls.
- Use Bootstrap buttons where suitable.
- Override Bootstrap defaults only when necessary.
- Use centralized design tokens for custom branding.
- Avoid repeating the same CSS in multiple components.

Do not introduce a second CSS framework without approval.

# 21. UI Component Color Standards

## Buttons

Primary:

- Background: Primary Maroon.
- Text: White.
- Hover: Dark Maroon.

Secondary:

- Background: White.
- Text: Primary Maroon.
- Border: Primary Maroon.

## Cards

- Background: White.
- Border: Light Gray.
- Heading: Dark Gray or Primary Maroon.
- Description: Medium Gray.

## Forms

- Background: White.
- Text: Dark Gray.
- Border: Border Gray.
- Focus: Primary Maroon.
- Error: Danger Red.

## Navigation

- Follow the approved Navbar design document.
- Use consistent active and hover states.
- Maintain contrast in both languages.

# 22. Responsive Typography Requirements

Typography must adapt to different screen sizes.

Requirements:

- Avoid fixed text widths.
- Use responsive font sizes where appropriate.
- Allow headings to wrap naturally.
- Prevent button text overflow.
- Ensure Marathi matras are not clipped.
- Maintain readable paragraph widths.
- Test all important pages at 320px width.

# 23. Performance Requirements

- Load only required font weights.
- Avoid loading duplicate font files.
- Prefer WOFF2 font format where available.
- Use font-display: swap where appropriate.
- Avoid unnecessary external font dependencies.
- Optimize local font assets.
- Prevent layout shifts caused by font loading where practical.

# 24. Developer Rules

1. Use centralized color variables.
2. Do not hardcode repeated brand colors.
3. Follow the approved typography scale.
4. Use Poppins for English.
5. Use Noto Sans Devanagari for Marathi.
6. Do not use random font families.
7. Maintain readable contrast.
8. Keep spacing consistent.
9. Follow Bootstrap 5 conventions.
10. Test both languages on every major UI component.
11. Do not introduce unapproved colors.
12. Do not duplicate global typography styles.
13. Do not use excessive gradients or shadows.

# 25. Acceptance Criteria

This module will be accepted when:

- Primary and secondary colors are configured.
- Extended palette is available.
- Semantic colors are configured.
- CSS design tokens are created.
- English typography is implemented.
- Marathi typography is implemented.
- Language-based font switching works.
- Font sizes follow the approved scale.
- Line heights are readable.
- Bootstrap integration is consistent.
- Text contrast is verified.
- Marathi characters render correctly.
- Responsive typography works.
- No unnecessary duplicate CSS exists.

# 26. Developer Task Information

**Task ID:** AC-BD-002

**Module:** Color & Typography

**Assigned To:** To Be Assigned

**Priority:** High

**Dependencies:** AC-BD-001 – Brand Guidelines

**Deliverables:**

- `variables.css`
- `typography.css`
- `global.css`
- English font integration.
- Marathi font integration.
- Color token configuration.
- Responsive typography.
- Language-based font switching.

**Status:** Not Started

**Final Approval:** Project Lead / Business Owner

---

**Document End**

**Project:** Aditi Caterers  
**Document ID:** AC-BD-002  
**Next Document:** `responsive-guidelines.md`
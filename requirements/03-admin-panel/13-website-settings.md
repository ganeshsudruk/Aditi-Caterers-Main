13. Website Settings Management – Admin Panel Requirements
1. Document Information
Field	Details
Project	Aditi Caterers Website
Module	Admin Panel – Website Settings
File	13-website-settings.md
Status	Development Requirement
Primary Users	Owner / Authorized Admin
Languages	English and Marathi
Frontend	React + Vite, Bootstrap 5, React Router, Axios, Context API
Backend	Node.js, Express.js, MongoDB Atlas, Mongoose


2. Module Overview
The Website Settings module allows authorized administrators to manage approved business information and selected website-wide content from the Admin Panel without changing source code.

The settings managed here may be displayed across public website pages, including the navbar, homepage, footer, contact page, and enquiry or booking forms.

Keep a clear separation between business information, public presentation settings, contact and social links, SEO defaults, and notification preferences. This module must not become an unrestricted control panel for changing application security, database credentials, API keys, or environment secrets.
3. Objectives
- Allow the owner to update approved business details.
- Manage logo, favicon, and selected branding assets.
- Manage public phone, WhatsApp, email, address, and social links.
- Configure selected homepage and footer content.
- Support English and Marathi content.
- Manage website-wide SEO defaults.
- Configure supported enquiry and notification preferences.
- Preview changes before publishing where practical.
- Protect settings through authentication, authorization, validation, and audit history.
4. Scope
4.1 Included
- Website Settings overview.
- Business profile and contact information.
- Logo and favicon management.
- Selected branding and display settings.
- Editable homepage content and section visibility.
- Footer settings and social media links.
- Public website language defaults and bilingual content fields.
- Default SEO settings.
- Enquiry form configuration supported by the existing implementation.
- Notification preferences for integrations that are actually configured.
- Save, preview, publish, and reset-to-saved-value behavior.
- Settings validation and audit logging.
- Responsive English/Marathi admin interface.
4.2 Not Included
- Editing source code, routes, or application logic from the admin panel.
- Editing or displaying environment variables and secret credentials.
- Changing MongoDB connection strings, JWT secrets, Cloudinary API secrets, SMTP passwords, or WhatsApp provider tokens.
- A complete theme builder or arbitrary CSS editor.
- Automatically creating unsupported payment, SMS, WhatsApp, or email integrations.
- Domain registration, DNS, hosting, or deployment configuration.
- Publishing unapproved business claims, awards, testimonials, prices, or policies.
- Replacing dedicated modules for menu, packages, gallery, awards, reviews, bookings, or quotations.
5. Users and Permissions
Use the existing Admin Panel authentication and role-based permission system.

Suggested permission keys:
- websiteSettings.view
- websiteSettings.business.update
- websiteSettings.branding.update
- websiteSettings.homepage.update
- websiteSettings.footer.update
- websiteSettings.socialLinks.update
- websiteSettings.seo.update
- websiteSettings.enquiry.update
- websiteSettings.notifications.update
- websiteSettings.publish
Role	Suggested Access
Owner / Super Admin	View, update, preview, and publish all approved settings
Authorized Admin	Access only settings permissions assigned
Content Staff	Edit selected public content only if explicitly permitted
Other Staff	No access unless permission is granted
Unauthenticated User	No access


The backend must enforce every permission. Hiding a tab or button in React is not sufficient authorization. High-impact changes should be restricted to the owner or a specifically authorized administrator.
6. Navigation and Page Structure
Add a Website Settings / वेबसाइट सेटिंग्ज item to the admin sidebar.

Suggested sections:
1. General / सामान्य माहिती
2. Business Profile / व्यवसाय माहिती
3. Contact Details / संपर्क माहिती
4. Branding / ब्रँडिंग
5. Homepage / मुख्यपृष्ठ
6. Footer / फूटर
7. Social Links / सोशल मीडिया लिंक्स
8. Language / भाषा
9. SEO / सर्च इंजिन सेटिंग्ज
10. Enquiry Settings / चौकशी सेटिंग्ज
11. Notifications / सूचना
12. Preview & Publish / पूर्वावलोकन आणि प्रकाशित करा
Organize these as tabs or sub-pages according to the existing Admin Panel design. Show only settings supported by the application and the current user's permissions.
7. General Settings
Suggested fields:
Field	Type	Requirements
Website Name	Text	Approved public website/business name
Website Tagline (English)	Text	Optional owner-approved tagline
Website Tagline (Marathi)	Text	Optional Marathi tagline
Default Website Language	Select	English or Marathi
Available Website Languages	Fixed / multi-select	English and Marathi for this project
Website Status	Controlled setting	Active / maintenance only if maintenance mode is implemented
Default Country	Select or text	Owner-approved value
Default Timezone	Select	Confirm with owner; IST may be intended
Default Currency	Select	Confirm with owner before monetary formatting


Rules:
- Do not invent a tagline or business description.
- Do not allow a setting to enable a language that the application does not support.
- Do not display a maintenance-mode control unless maintenance mode is safely implemented.
- Website name changes should be reflected consistently across the public website and relevant generated documents where applicable.
- Existing quotation and booking snapshots must not be rewritten when the website name changes.
8. Business Profile Settings
Manage the public business identity.

Suggested fields:
- Business name in English and Marathi.
- Short and long business descriptions in English and Marathi.
- Business experience, only if the owner confirms the exact value and wording.
- Business address in English and Marathi.
- City, state, postal code, and country, if provided and approved.
- Business operating hours, only if confirmed.
- Primary and optional secondary phone numbers.
- Public business email, optional.
- WhatsApp number.
- Map location or map URL, optional and owner-approved.
8.1 Existing Project Information
The project currently has the following information supplied for development:
- Business name: Aditi Caterers.
- Contact number: +91 9975959391.
- WhatsApp link: https://wa.me/919975959391.
- Service availability: With Material and Without Material.
- Event coverage: Weddings, birthdays, engagements, and other owner-approved event types.
- Website languages: English and Marathi.
Use these as initial values only after owner verification. The owner must be able to correct them.
8.2 Validation
- Trim leading and trailing whitespace.
- Validate phone number format and country code.
- Validate email format when supplied.
- Validate URLs and reject unsafe protocols.
- Apply sensible maximum lengths.
- Do not require optional details that have not been supplied.
- Do not publish unverified address or operating-hour details.
9. Contact Details Settings
Manage contact information displayed on the public website.

Fields may include:
- Primary and secondary phone numbers.
- WhatsApp number and click-to-chat link.
- Public email address.
- Business address.
- Google Maps URL or approved map reference.
- Contact page message in English and Marathi.
- Contact page display options.
Requirements:
- Provide click-to-call links for valid phone numbers.
- Provide a WhatsApp link using the approved number.
- Validate URLs on the backend.
- Do not accept arbitrary iframe or script HTML.
- Do not expose private admin contact details as public business details.
- Hide empty optional fields on the public website.
- Confirm final public contact details with the owner before publishing.
10. Branding Settings
Manage approved visual assets used throughout the website.
10.1 Logo
Authorized users may upload, preview, replace, and remove the primary logo, provided a safe fallback exists. Allow optional alternative text in English and Marathi.

Requirements:
- Use the configured Cloudinary integration or existing media-upload service.
- Validate file type and size on the backend.
- Accept approved image formats such as PNG, JPEG, and WebP. Accept SVG only if uploads are securely sanitized and supported.
- Reject executable files and unrelated document uploads.
- Preview the image before saving.
- Preserve aspect ratio and avoid unexpected stretching or cropping.
- Use a safe fallback if no logo is configured.
10.2 Favicon
Allow authorized users to upload or replace the favicon.
- Validate supported dimensions and file types.
- Generate or store required icon variants if supported.
- Provide a preview.
- Do not break the website if the favicon is absent or invalid.
10.3 Brand Display Settings
Optional settings may include logo display in navbar/footer, business name beside logo, and approved light/dark logo variants.

Do not add a free-form CSS editor. Do not invent brand colors or change the existing design system without owner approval.
11. Homepage Settings
Control only homepage content intended to be editable by an administrator.

Possible fields:
- Hero heading and supporting text in English and Marathi.
- Hero image or approved media asset.
- Primary and secondary CTA labels in both languages.
- CTA destinations.
- Visibility of About, Services, Packages, Gallery, Awards, Reviews, and Contact CTA sections.
11.1 Homepage Content Rules
- Do not publish claims that have not been approved by the owner.
- Do not invent customer counts, event counts, years of experience, awards, ratings, or service guarantees.
- Use existing Services, Packages, Gallery, Awards, and Reviews modules as the source of their records.
- Show only records eligible for public display.
- Hiding a homepage preview section must not delete its underlying records.
- A homepage setting must not bypass publication or approval status.
- Restrict CTA destinations to approved internal routes or validated external HTTPS links.
- Provide preview before publishing.
11.2 Hero Image
- Use the configured media upload service.
- Show an image preview.
- Provide English and Marathi alt text.
- Validate image dimensions and file size according to the agreed media policy.
- Do not publish an image until it has been saved and approved.
- Avoid storing raw image binaries in MongoDB.
12. Footer Settings
Allow authorized users to manage:
- Footer business name.
- Short footer description in English and Marathi.
- Public contact details and approved address display.
- Social media links.
- Quick-link visibility and order, if supported.
- Copyright text.
- Footer logo selection.
- Optional footer CTA.
Rules:
- Reuse shared public contact and social-link settings to avoid conflicting duplicate values.
- Generate the current copyright year in the frontend where appropriate.
- Hide empty contact and social fields.
- Validate footer link destinations.
- Do not accept arbitrary HTML or JavaScript.
13. Social Media Links
Allow management of approved social profile links, such as Facebook, Instagram, YouTube, or another owner-approved platform.

Fields:
- Platform.
- Profile URL.
- Enabled/disabled.
- Display order.
- Optional accessible label in English and Marathi.
Requirements:
- Validate URLs and allow only approved protocols, preferably HTTPS.
- Do not assume the business has an account on every platform.
- Show only enabled links with valid URLs publicly.
- Use Bootstrap Icons or the existing approved icon library.
- Provide accessible link labels.
- Reject JavaScript URLs and arbitrary embedded scripts.
14. Language Settings
The public website and Admin Panel must support English and Marathi.
14.1 Public Website Language
- Provide English and Marathi in the public language selector.
- Allow the owner to choose the default language.
- Preserve the current page when changing language where translated content exists.
- If a translation is missing, use the approved fallback behavior; never display raw translation keys.
- Store language preference using the existing locale mechanism.
14.2 Admin Panel Language
- Reuse the existing Admin Panel language selector.
- Changing the admin language must not unintentionally change the public website default.
- Switching language must preserve current settings form values.
- All Website Settings labels, buttons, validations, messages, and help text must be bilingual.
14.3 Editable Content Translations
Store language variants separately, for example:
{
  "heroTitle": {
    "en": "Owner-approved English heading",
    "mr": "मालकाने मंजूर केलेले मराठी शीर्षक"
  }
}
This is an illustrative data shape. Follow the project's existing translation conventions.
- Do not automatically translate descriptions, policies, or customer-facing claims and publish them without review.
- Keep the original approved content.
- Allow the owner to review both language versions.
- Show a missing-translation warning when a required public field lacks an approved translation.
15. SEO Settings
Manage website-wide default metadata.

Suggested fields:
- Default SEO title in English and Marathi.
- Default meta description in English and Marathi.
- Default Open Graph image.
- Default social-sharing title and description, where supported.
- Canonical website URL, configured only after the production domain is verified.
- Robots/indexing setting, restricted to authorized users.
Requirements:
- Provide guidance for title and description lengths.
- Do not insert untrusted HTML into metadata.
- Use page-specific SEO values first; global settings are fallbacks.
- Restrict indexing controls to the owner or a specifically authorized administrator.
- Keep production indexing configuration separate from development/staging.
- Do not publish a canonical URL until the real production domain is confirmed.
- Avoid duplicate or conflicting metadata.
- Do not promise search ranking improvements.
16. Enquiry and Booking Form Settings
Control approved presentation and behavior options for public enquiry forms.

Possible settings:
- Public enquiry form enabled/disabled.
- Required and optional fields, limited to fields supported by the backend.
- Form heading and description in English and Marathi.
- Submit button label in both languages.
- Success message in both languages.
- Approved privacy notice text and link.
- Event types available for selection, sourced from approved configuration.
- Service options: With Material and Without Material, if still approved.
- Guest-count field visibility, if supported.
- Preferred contact method options, if supported.
16.1 Form Rules
- Do not remove fields required by backend validation.
- Frontend required/optional settings must match backend validation.
- Do not bypass spam protection, validation, or rate limits.
- Show a success message only after the server confirms that the enquiry was saved.
- Public enquiry submission is a request, not a confirmed booking.
- Do not add automatic booking confirmation through a settings toggle.
- Keep the enquiry status workflow in Booking Management.
- Preserve historical enquiry records when form configuration changes.
- Review changes to required fields against existing API and database validation.
17. Notification Settings
Manage notification preferences only for integrations that are implemented and configured.

Possible options:
- Notify an approved admin email when a new enquiry is received.
- Notify an approved WhatsApp number when a new enquiry is received, if a supported WhatsApp Business integration is configured.
- Enable or disable supported notification event types.
- Select authorized recipients.
- Configure customer acknowledgement messages only if the integration and templates are approved.
17.1 Integration Rules
- Do not show a channel as active if its provider integration is not configured.
- Do not store provider secrets or API tokens in ordinary website settings.
- Keep credentials in protected environment variables or an approved secret manager.
- Do not promise SMS, WhatsApp, or email delivery unless the provider confirms the send result.
- A notification failure must not delete or invalidate a successfully saved enquiry.
- Log notification outcomes without unnecessarily exposing personal information.
- Do not send unsolicited marketing messages.
- Customer-facing templates must be approved and available in the required language.
- Follow applicable provider rules and customer consent requirements.
18. Preview and Publish Workflow
Where practical, provide a preview and publish workflow for public-facing settings.

Suggested states:
- Saved Draft.
- Ready for Preview.
- Published.
Requirements:
- Preview proposed settings without exposing them publicly.
- Only authorized users may publish.
- Validate required fields before publication.
- Show a clear confirmation before publishing website-wide changes.
- Record who published changes and when.
- If publishing fails, keep the previous live settings active.
- Do not partially publish related settings.
- Summarize changes to contact information, business identity, and SEO before publication.
- If the project uses immediate-save settings instead, document the behavior and confirm successful saves clearly.
19. Save, Reset, and Change History
19.1 Save Behavior
- Validate fields before sending requests.
- Show field-specific validation errors.
- Prevent duplicate submissions while saving.
- Show success only after backend confirmation.
- Preserve unsaved values after recoverable network errors.
- Warn before leaving with unsaved changes, where supported.
19.2 Reset Behavior
- Reset restores the last saved value; it does not erase the setting.
- Provide a separate confirmed action for removing an optional asset or clearing an optional field.
- Do not provide a one-click destructive reset of all settings.
- Require confirmation before removing important public information.
19.3 Change History
Record relevant changes:
- Setting group.
- Admin user ID.
- Timestamp.
- Changed field names.
- Previous and new values where safe.
- Publish status.
- Operation result.
Never store secrets or sensitive authentication values in audit history. Follow the project's privacy policy for personal contact fields.
20. Frontend Requirements
Suggested React structure:
src/
  pages/
    admin/
      website-settings/
        WebsiteSettingsPage.jsx
        GeneralSettings.jsx
        BusinessProfileSettings.jsx
        ContactSettings.jsx
        BrandingSettings.jsx
        HomepageSettings.jsx
        FooterSettings.jsx
        SocialLinksSettings.jsx
        LanguageSettings.jsx
        SeoSettings.jsx
        EnquirySettings.jsx
        NotificationSettings.jsx
        WebsiteSettingsPreview.jsx
  components/
    admin/
      website-settings/
        SettingsSectionNav.jsx
        SettingsFormActions.jsx
        ImageUploadField.jsx
        SocialLinkEditor.jsx
        BilingualTextField.jsx
        UnsavedChangesPrompt.jsx
        PublishConfirmationModal.jsx
  services/
    websiteSettingsService.js
  utils/
    websiteSettingsValidation.js
The exact structure may follow existing project conventions.
20.1 UI Guidelines
- Use Bootstrap 5 components and utilities first.
- Use Bootstrap Icons rather than emojis.
- Keep forms clean, consistent, and responsive.
- Group related settings into understandable sections.
- Use readable form controls and appropriate spacing.
- Provide clear labels, help text, and validation messages.
- Follow the existing admin dashboard design system.
- Do not introduce an unapproved color palette.
- Provide image previews and clear upload/remove actions.
- Use confirmation dialogs for publishing or destructive changes.
20.2 Frontend Behavior
- Fetch saved settings when the page loads.
- Keep form state separate from published settings where draft publishing is supported.
- Track unsaved changes.
- Use the existing Axios service and authentication mechanism.
- Do not store secret credentials in local storage or frontend state.
- Handle loading, empty, validation, permission, and network error states.
- Reuse the existing language context.
- Never render arbitrary HTML entered into settings.
21. Backend Requirements
21.1 Suggested API Routes
All routes must use authentication and appropriate permission middleware.
Method	Endpoint	Purpose
GET	/api/admin/website-settings	Get settings available to current admin
PUT	/api/admin/website-settings/general	Update general settings
PUT	/api/admin/website-settings/business	Update business profile
PUT	/api/admin/website-settings/contact	Update contact details
PUT	/api/admin/website-settings/branding	Update branding asset references
PUT	/api/admin/website-settings/homepage	Update homepage settings
PUT	/api/admin/website-settings/footer	Update footer settings
PUT	/api/admin/website-settings/social-links	Update social links
PUT	/api/admin/website-settings/language	Update public language defaults
PUT	/api/admin/website-settings/seo	Update SEO defaults
PUT	/api/admin/website-settings/enquiry	Update supported enquiry form settings
PUT	/api/admin/website-settings/notifications	Update notification preferences
POST	/api/admin/website-settings/preview	Validate and prepare preview, if supported
POST	/api/admin/website-settings/publish	Publish approved draft settings, if supported
GET	/api/website-settings/public	Return approved public settings only


Route names may be adjusted to match existing conventions. Do not expose admin-only settings through the public endpoint.
21.2 Public Settings API
Return only fields required by the public website, such as approved business name and descriptions, public contact details, logo/favicon URLs, homepage/footer content, enabled social links, public language configuration, SEO defaults, and public enquiry form presentation settings.

Never return admin user records, permission definitions, secrets, private notes, internal notification recipients, unpublished drafts, or audit history.
21.3 Example Response Shape
{
  "success": true,
  "data": {
    "business": {
      "name": {
        "en": "Aditi Caterers",
        "mr": "Owner-approved Marathi name"
      }
    },
    "contact": {
      "phone": "+919975959391",
      "whatsapp": "+919975959391"
    },
    "branding": {
      "logoUrl": null,
      "faviconUrl": null
    },
    "languages": {
      "default": "en",
      "supported": ["en", "mr"]
    }
  }
}
This is an illustrative response shape. Production values must come from saved and approved settings. Confirm the Marathi business name with the owner before publication.
22. Suggested MongoDB Data Model
A centralized settings document or separate settings documents may be used depending on the existing architecture.
{
  key: "website",
  general: {
    websiteName: { en: String, mr: String },
    tagline: { en: String, mr: String },
    defaultLanguage: String,
    supportedLanguages: [String],
    timezone: String,
    currency: String
  },
  business: {
    name: { en: String, mr: String },
    description: { en: String, mr: String },
    experience: Number,
    address: { en: String, mr: String },
    phone: String,
    secondaryPhone: String,
    email: String,
    whatsapp: String,
    mapUrl: String
  },
  branding: {
    logoUrl: String,
    logoPublicId: String,
    faviconUrl: String,
    faviconPublicId: String,
    logoAlt: { en: String, mr: String }
  },
  homepage: {
    heroTitle: { en: String, mr: String },
    heroDescription: { en: String, mr: String },
    heroImageUrl: String,
    heroImagePublicId: String,
    sections: {
      about: Boolean,
      services: Boolean,
      packages: Boolean,
      gallery: Boolean,
      awards: Boolean,
      reviews: Boolean
    }
  },
  footer: {
    description: { en: String, mr: String },
    copyrightText: { en: String, mr: String }
  },
  socialLinks: [{
    platform: String,
    url: String,
    enabled: Boolean,
    displayOrder: Number
  }],
  seo: {
    title: { en: String, mr: String },
    description: { en: String, mr: String },
    ogImageUrl: String,
    canonicalUrl: String
  },
  enquiry: {
    enabled: Boolean,
    heading: { en: String, mr: String },
    description: { en: String, mr: String }
  },
  notifications: {
    emailEnabled: Boolean,
    whatsappEnabled: Boolean
  },
  updatedBy: ObjectId,
  updatedAt: Date
}
This is a suggested schema, not a requirement to put every setting into one document. Follow existing naming conventions and use Mongoose validation. Avoid duplicate fields that already have a trusted source elsewhere.

Do not store provider secrets, passwords, API tokens, database URLs, or JWT secrets in this model.
23. Validation Requirements
- Validate settings on both frontend and backend.
- Trim text values and enforce maximum lengths.
- Validate phone numbers and email addresses.
- Validate URLs and allow only approved protocols.
- Restrict social platform values to an allowlist or safe custom-link rule.
- Validate image MIME type, file size, and dimensions.
- Verify uploaded media belongs to the configured media provider/account.
- Validate language codes against supported languages.
- Validate SEO fields and canonical URL format.
- Validate CTA destinations against approved internal routes or HTTPS URLs.
- Reject unknown fields to prevent mass assignment.
- Prevent arbitrary HTML, script, iframe, and CSS injection.
- Prevent accidental clearing of required public fields.
- Apply role-specific validation for high-impact changes.
24. Security Requirements
- Require authentication for every admin settings endpoint.
- Enforce granular permissions on the backend.
- Protect state-changing requests using the project's established security approach.
- Validate and sanitize all input.
- Prevent mass assignment by explicitly selecting writable fields.
- Never return secrets through admin or public settings APIs.
- Keep credentials in environment variables or an approved secret manager.
- Use secure upload validation and safe media URLs.
- Restrict publish permissions.
- Log important changes without recording secrets.
- Apply rate limits to settings and upload endpoints.
- Use HTTPS in production.
- Do not trust frontend-only validation.
- Do not allow settings to disable authentication, authorization, or security middleware.
25. Public Website Integration
The public website must consume only the public settings API or the project's approved settings delivery mechanism.
- Navbar uses the approved business logo/name and language selector.
- Footer uses approved public business, contact, and social details.
- Contact page uses approved public contact settings.
- Homepage uses approved editable content and visibility settings.
- SEO uses page-specific values first and global defaults as fallback.
- Enquiry forms use supported labels and configuration.
- Public pages must not expose draft settings.
- If the settings API is unavailable, use a safe fallback and avoid rendering raw errors or broken values.
- Cache public settings only with a defined refresh/invalidation strategy so published changes become visible predictably.
26. Performance and Reliability
- Load settings efficiently and avoid unnecessary repeated requests.
- Use a safe cache strategy for public settings.
- Invalidate or refresh cached settings after successful publication.
- Keep image uploads separate from ordinary text updates where practical.
- Prevent duplicate save and publish requests.
- Use atomic updates for related settings where possible.
- Keep previous published settings available if publication fails.
- Avoid storing large image files in MongoDB.
- Provide clear feedback for upload, save, preview, and publish failures.
27. Error and Empty States
Provide bilingual messages for:
- Settings could not be loaded.
- Changes saved successfully.
- Changes could not be saved.
- Invalid phone number or email address.
- Invalid URL.
- Unsupported image format or image too large.
- Required translation missing.
- Unsaved changes.
- Permission denied.
- Preview unavailable.
- Publish confirmation required.
- Publish failed.
- Notification integration not configured.
Do not show success messages before backend confirmation.
28. Responsive and Accessibility Requirements
- Support desktop, tablet, and mobile.
- Use responsive Bootstrap form layouts.
- Associate visible labels with fields.
- Support keyboard navigation and visible focus indicators.
- Make upload controls keyboard accessible.
- Provide meaningful alt text for logos and homepage images.
- Do not use color alone to indicate saved, draft, or published status.
- Ensure Marathi text wraps without clipping.
- Give confirmation dialogs accessible titles and actions.
- Associate error messages with relevant fields.
29. Testing Requirements
29.1 Functional Tests
- Verify each settings section loads saved values.
- Verify authorized users can update permitted fields.
- Verify users without permission cannot update settings.
- Verify English and Marathi values save and display correctly.
- Verify public language defaults work.
- Verify logo and favicon upload, preview, replace, and removal behavior.
- Verify invalid image uploads are rejected.
- Verify contact links and social URLs are validated.
- Verify homepage visibility settings do not delete source content.
- Verify footer and contact page reflect published settings.
- Verify SEO defaults are used only as fallbacks.
- Verify enquiry form settings remain consistent with backend validation.
- Verify notification preferences do not claim an unconfigured integration is active.
- Verify preview/publish workflow, if implemented.
- Verify reset restores saved values.
- Verify unsaved-change warnings.
29.2 Security Tests
- Verify unauthenticated users cannot access admin settings APIs.
- Verify role and permission enforcement.
- Verify public settings API excludes private and secret fields.
- Verify mass-assignment attempts are rejected.
- Verify unsafe URLs and script/HTML injection attempts are rejected.
- Verify secrets never appear in API responses or audit logs.
- Verify unauthorized users cannot publish.
- Verify uploaded files are validated.
- Verify settings cannot disable authentication or authorization.
29.3 Integration Tests
- Verify navbar, homepage, footer, contact page, and SEO use published settings.
- Verify public cache refreshes after publication.
- Verify failed publication keeps previous published settings.
- Verify a saved enquiry remains stored if a notification provider fails.
- Verify existing bookings, quotations, and historical records are not rewritten by settings changes.
30. Acceptance Criteria
The module is accepted when:
- Authorized administrators can open Website Settings.
- Settings are divided into clear sections.
- Business profile and contact information can be updated with validation.
- Logo and favicon can be managed safely.
- Supported homepage and footer content can be updated.
- Social links are validated and only enabled links appear publicly.
- English and Marathi content can be maintained.
- Public and admin language preferences remain separate.
- SEO defaults are applied safely.
- Enquiry settings do not bypass backend validation or booking workflow.
- Notification settings accurately reflect configured integrations.
- Preview/publish behavior works as documented, if implemented.
- Public APIs return only approved public settings.
- Secret credentials are never stored in ordinary settings documents or exposed through APIs.
- Important changes are recorded in audit history.
- The public website reflects published settings.
- Existing business records remain unchanged.
- The module works on desktop, tablet, and mobile.
- Functional, security, and integration tests pass.
31. Definition of Done
- [ ] Website Settings navigation item added.
- [ ] Permission keys and backend authorization implemented.
- [ ] General settings implemented.
- [ ] Business profile settings implemented.
- [ ] Contact details settings implemented.
- [ ] Logo and favicon management implemented.
- [ ] Homepage settings implemented for approved editable content.
- [ ] Footer settings implemented.
- [ ] Social media link management implemented.
- [ ] English and Marathi support completed.
- [ ] SEO settings implemented.
- [ ] Enquiry form settings integrated safely.
- [ ] Notification preferences connected only to implemented integrations.
- [ ] Public settings API implemented with safe field allowlist.
- [ ] Preview/publish workflow implemented or immediate-save behavior documented.
- [ ] Validation, audit history, and error handling completed.
- [ ] Public website integration tested.
- [ ] Responsive and accessibility checks completed.
- [ ] Functional, security, and integration tests passed.
- [ ] Owner review and approval completed.
32. Pending Decisions / Owner Approval
Confirm these details with the business owner before final production configuration:
1. Exact public business name in English and Marathi.
2. Final business description and tagline in both languages.
3. Public phone number and WhatsApp number.
4. Whether a public email address should be displayed.
5. Complete business address, if it should be displayed.
6. Business operating hours, if they should appear on the website.
7. Approved logo, favicon, and alternate logo versions.
8. Final website color palette and typography, if branding settings will expose these values.
9. Approved homepage hero text and images in English and Marathi.
10. Which homepage sections should be visible.
11. Verified social media profile URLs.
12. Default public website language.
13. Production domain for canonical SEO URLs.
14. Approved SEO titles and descriptions in both languages.
15. Enquiry form fields and mandatory-field rules.
16. Whether email, WhatsApp, or SMS notifications are required and which provider will be used.
17. Which admin roles can edit and publish website settings.
18. Whether settings publish immediately or require preview and approval.
19. Business timezone and currency used for website display.
20. Approved privacy notice or customer-facing policy text.
33. Final Development Notes
- Reuse the existing Admin Panel layout, authentication, permission system, language selector, and media upload service.
- Keep Website Settings separate from dedicated content and operations modules.
- Use one trusted source for each shared business detail to avoid conflicting values.
- Keep public settings separate from private admin configuration.
- Never expose environment secrets through the settings interface or API.
- Do not publish unverified business details, translations, prices, awards, claims, or policies.
- Ensure settings changes do not rewrite historical bookings, enquiries, customers, or quotations.
- Treat publishing as a controlled operation with validation and audit history.
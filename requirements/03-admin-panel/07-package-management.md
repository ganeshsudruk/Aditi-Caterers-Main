07-Package Management Requirements
1. Document Overview
Field	Details
Project	Aditi Caterers Website
Module	Admin Panel – Package Management
File Name	07-package-management.md
Primary Users	Authorized Admin
Frontend	React + Vite, Bootstrap 5, React Router
Backend	Node.js, Express.js
Database	MongoDB Atlas, Mongoose
Media Storage	Cloudinary (optional package images)
Languages	English and Marathi
Status	Requirements Draft – Pending Business Owner Approval


2. Purpose
The Package Management module allows authorized admins to create, update, preview, publish, unpublish, reorder, and archive catering packages displayed on the Aditi Caterers public website.

Packages may contain guest count, price, pricing basis, menu items and choices, service type, inclusions, exclusions, descriptions, event type, and package-specific notes. All prices, menus, capacities, inclusions, exclusions, and business terms must be approved by the business owner. Do not invent business information.
3. Scope
3.1 Included
- Package list and details
- Add, view, edit, preview, publish, unpublish, archive, and restore
- English and Marathi package content
- Guest count / capacity information
- Package price, currency, and pricing basis
- Event type and package category (if configured)
- With Material / Without Material service options (if applicable)
- Menu item associations and optional choices
- Inclusions, exclusions, and additional notes
- Display order and optional featured flag
- Optional package image upload
- Search, filtering, sorting, and pagination
- Public website and optional booking/enquiry integration
3.2 Not Included
- Automatic quotation/cost calculation
- Online payments
- Guaranteed booking or availability
- Inventory / ingredient stock management
- Automatic discounts, taxes, or surge pricing
- Customer-specific contracts or final quotations
These require separate approval and requirements.
4. Navigation and Access
- Admin navigation must include Package Management / पॅकेज व्यवस्थापन.
- Suggested route: /admin/packages.
- Add route: /admin/packages/new.
- Edit route: /admin/packages/:packageId/edit.
- Details route: /admin/packages/:packageId.
- Only authenticated and authorized admins may access the module and APIs.
- Protect routes with frontend guards and backend authorization.
- Follow the shared Admin Panel layout, sidebar, header, and responsive conventions.
5. Mandatory English and Marathi Language Support
The entire Admin Panel must support English and Marathi. This module must use the centralized language system shared by Admin Login, Dashboard, Booking, Customer, Service, and Menu modules.
5.1 Interface Translation
Translate all module UI elements:
- Page titles, breadcrumbs, descriptions
- Buttons, labels, placeholders, helper text, and tooltips
- Table headers, filters, sorting, pagination, and action menus
- Package status and service-type labels
- Form validation, server errors, and notifications
- Confirmation dialogs and empty/loading/error states
- Preview and publication messages
5.2 Package Content Languages
Package content must support separate English and Marathi fields for:
- Package name
- Short and full descriptions
- Inclusions and exclusions
- Package notes and terms
- Custom menu-choice labels/notes (if used)
- Image alt text
- SEO title and description (optional)
Admins must enter or review both language versions. Do not auto-translate or overwrite one language with another. Incomplete translations should be identified in Admin. Publishing rules and fallback behavior must follow the agreed bilingual content policy.
5.3 Language Behavior
- Use the shared Admin Panel English/Marathi language switcher.
- Switching language must not clear unsaved form values.
- Selected admin language should persist using the shared preference system.
- Use centralized translation keys; avoid hardcoded translations within components.
- Admin and public language preferences must not unexpectedly overwrite each other.
6. Package Management Overview
6.1 Page Header
Display:
- Page title: Package Management / पॅकेज व्यवस्थापन
- Short explanatory text
- Add Package / नवीन पॅकेज जोडा button
- Optional summary counts: total, published, draft, unpublished, and archived packages
6.2 Package List
Use a responsive Bootstrap table on desktop and a compact card/list view on smaller screens.
Column	Description
Package Name	Name in selected content language
Image	Thumbnail or placeholder
Guest Count	Approved guest count or range
Price	Approved amount and pricing basis
Service Type	With Material / Without Material / applicable options
Status	Draft, Published, Unpublished, Archived
Display Order	Public display sequence
Updated At	Last updated date
Actions	View, Edit, Preview, Publish/Unpublish, Archive/Restore


- Do not invent missing prices or guest counts.
- If price is not configured, show a clear admin-only Not configured state.
- Provide loading, empty, error, and retry states.
- Keep the list concise; show full details on the detail view.
7. Basic Package Information
Field	Required	Notes
Package Name (English)	Required	Public name
Package Name (Marathi)	Required for Marathi publication	Approved translation
Short Description (English)	Optional	Card summary
Short Description (Marathi)	Optional	Marathi summary
Full Description (English)	Optional	Details
Full Description (Marathi)	Optional	Marathi details
Package Category	Optional	Owner-approved category
Event Types	Optional	Wedding, Birthday, Engagement, or other approved types
Package Image	Optional	Owner-approved image
Image Alt Text (English/Marathi)	Optional	Accessibility text
Display Order	Optional	Non-negative integer
Featured	Optional	If supported by public website
Status	Required	Draft by default


8. Guest Count / Capacity
Package may define:
- Minimum guest count
- Maximum guest count
- Fixed guest count
- Guest-count notes in English and Marathi
Rules:
- Guest count must be a positive integer.
- Minimum must not exceed maximum.
- Fixed count must not conflict with a range.
- Capacity details must be owner-confirmed.
- Do not assume a package supports a guest count not configured by the owner.
9. Package Pricing Management
9.1 Price Fields
Field	Required	Notes
Price Amount	Optional	Owner-configured numeric amount
Currency	Required when price is entered	Confirm currency configuration; INR may be default
Pricing Basis	Required when price is entered	Per person, per plate, per event, or fixed package (approved options)
Guest Count Basis	Conditional	Clarify number of guests covered
Price Notes (English)	Optional	Owner-approved
Price Notes (Marathi)	Optional	Marathi version
Show Price Publicly	Optional	Requires owner approval


9.2 Pricing Rules
- Never invent or auto-fill prices.
- Validate amount as a non-negative value within configured limits.
- Store currency and pricing basis with every displayed price.
- Do not display ambiguous price information without its basis.
- If price varies by guest count, event location, date, menu, or service type, display an owner-approved clarification instead of claiming a fixed final price.
- Admin must be able to mark a price as not configured.
- Price changes should be tracked through updated/audit metadata.
- A public package price is not a final event quotation or booking contract.
10. Service Type – With Material / Without Material
Where applicable, package may be offered with one or both service options:
- with_material – catering materials/ingredients included as specifically described by the owner.
- without_material – ingredients/material not supplied by caterer, according to owner-defined terms.
Requirements:
- Admin can select applicable service types.
- Labels must be translated into English and Marathi.
- Descriptions must clarify what each selected option includes.
- Do not assume staff, equipment, ingredients, transport, or other components are included.
- If prices differ by service type, configure each owner-approved price and basis clearly.
- Validate the service type before publishing when it is required.
11. Menu Items and Choices
11.1 Package Menu Configuration
Admin may associate approved menu items from Menu Management with a package, where supported:
- Select menu category and items
- Specify owner-provided portion/quantity notes (optional)
- Configure included items
- Configure optional choices or substitutions
- Add custom menu notes in English and Marathi
11.2 Illustrative Package Example
A package could be configured with:
- One vegetable item
- Rice
- A choice of Chapati or Puri
This is only an example of configuration behavior, not an actual Aditi Caterers package or confirmed menu.
11.3 Menu Configuration Rules
- Prefer references to existing menu item IDs.
- Only eligible published menu items should be selectable for a public package.
- Admin may define approved choice groups, such as selecting one item from a list.
- Validate configured selection limits.
- Archiving a menu item referenced by a package must not silently break package data.
- Public packages must not show unavailable menu references as active choices.
- Preserve menu/package snapshots where needed for historical booking or enquiry records.
- Do not automatically infer, substitute, or add menu items.
12. Inclusions, Exclusions, and Notes
Admin may maintain repeatable, optional lists:
12.1 Inclusions
- Owner-approved items/services included in the package
- English and Marathi text per entry
12.2 Exclusions
- Owner-approved items/services not included
- English and Marathi text per entry
12.3 Additional Notes
- Package terms, limitations, or clarifications
- English and Marathi versions
- No unapproved guarantees, refund terms, or legal claims
Do not assume serving staff, utensils, transport, decoration, cleanup, fuel, or other items are included or excluded. The owner must specify these.
13. Add Package Form
Group form fields into sections:
1. Basic Information
2. Guest Count / Capacity
3. Pricing
4. Service Type
5. Menu Configuration
6. Inclusions and Exclusions
7. Images
8. SEO (optional)
9. Display Order and Status
Actions:
- Save Draft
- Save / Update
- Preview
- Publish (only when validation succeeds)
- Cancel
13.1 Validation
- English package name is required.
- Marathi name must be completed according to bilingual publishing rules.
- Guest-count values must be valid and consistent.
- Price must be valid and non-negative if entered.
- Currency and pricing basis must be set when a price exists.
- Service type, event type, and category must be valid configured options.
- Menu references and choice rules must be valid.
- Display order must be a non-negative integer.
- Validate image type, size, and content.
- Enforce field length limits and sanitize inputs.
- Prevent empty inclusion/exclusion rows.
- Enforce slug uniqueness according to policy.
- Preserve entered values after validation/server errors.
- Show localized validation messages near the corresponding fields.
14. Edit Package
- Admin may edit package details and configuration.
- Populate all existing saved fields.
- English and Marathi fields must remain independent.
- Changes to price, guest count, service type, menu choices, inclusions, and exclusions should be reviewed before publication.
- Show current image and allow replace/remove when enabled.
- Warn about unsaved changes before leaving.
- Preserve ID and slug unless slug changes are explicitly supported.
- Update updatedAt and updatedBy after successful save.
- Editing a package must not silently alter historical booking/enquiry details; use snapshots where appropriate.
15. Package Details and Preview
15.1 Admin Detail View
Display:
- English and Marathi names and content
- Short/full descriptions
- Guest-count details
- Price, currency, and pricing basis (if configured)
- Service types
- Menu items and choice groups
- Inclusions, exclusions, and notes
- Event types, category, image, and alt text
- Status and display order
- Created/updated timestamps
- Created by/updated by where available
15.2 Preview
- Admin may preview package cards and detail layout.
- Preview must support both languages.
- Clearly mark preview as Admin-only.
- Preview must not publish or alter package status.
- Preview may show saved or current draft values according to implementation.
- Draft preview must not be accessible to unauthorized public users.
16. Search, Filters, Sorting, and Pagination
16.1 Search
Search by English package name, Marathi package name, slug, and event type (if supported). Use debounced search.
16.2 Filters
- Status: All, Draft, Published, Unpublished, Archived
- Service Type: With Material, Without Material, All
- Event Type
- Price Configured / Not Configured
- Featured: Yes / No, if supported
- Translation Completeness (optional)
16.3 Sorting
Allow sorting by name, guest count, display order, created date, and updated date. Sort prices only when pricing bases are comparable; do not mix incomparable price types.
16.4 Pagination
- Backend pagination required as records grow.
- Page-size options may be 10, 20, or 50.
- Preserve filters and sort state between pages.
- Show total count and current page.
17. Display Order and Featured Packages
- Admin may set package display order.
- Public package page should respect the configured order.
- Featured flag is optional and only if supported.
- Featured/status information must be accessible and not conveyed only by color.
- If drag-and-drop is used, provide keyboard-accessible move controls.
- Use a stable secondary sort when order values match.
- Archived and unpublished packages must not appear in public ordering.
18. Package Images (Optional)
- Use owner-approved package/event photographs.
- Allowlist formats such as JPEG, PNG, and WebP.
- Validate size, dimensions, and file content on the server.
- Use Cloudinary or configured media storage; do not store binary files in MongoDB.
- Show upload progress and localized success/error messages.
- Allow image replacement/removal when optional.
- Use responsive image delivery and lazy loading on public pages.
- Store English and Marathi alt text.
- Do not present stock photos as actual Aditi Caterers work.
- Clean up unused media only after checking references.
19. Draft, Publish, Unpublish, Archive, and Restore
Recommended statuses:
- draft – saved, not public
- published – eligible for public display
- unpublished – hidden from public
- archived – excluded from normal Admin list and public view
Rules:
- Publishing requires confirmation.
- Validate required package fields and language completeness.
- If a price is public, validate its currency and basis.
- Validate service types and menu references.
- Only published packages should be returned by public APIs.
- Unpublishing hides without deleting.
- Draft, unpublished, and archived packages must never be public.
- Status changes update timestamps and audit metadata.
- Public changes follow the application's cache/revalidation strategy.
19.1 Archive and Restore
- Prefer archive over permanent deletion.
- Archived packages are hidden publicly and from the normal list by default.
- Provide an archived filter/view.
- Restore to Draft or Unpublished unless publishing is explicitly confirmed.
- Permanent deletion, if approved, must be restricted and checked for references.
20. Public Website Integration
- Public Packages page fetches package data from backend.
- Only published packages are returned.
- Content supports selected public language and approved fallback behavior.
- Package cards may show name, description, approved price and basis, guest count, service type, and image.
- Details may include menu configuration, choices, inclusions, exclusions, and notes.
- Prices must show currency and basis clearly.
- If price is not configured or not public, show an approved enquiry/contact behavior rather than a fabricated amount.
- Respect display order.
- Show approved empty state if no packages are published.
- Handle loading and errors gracefully.
- Booking/enquiry forms may reference packages only if integration is approved.
- Package selection is an enquiry, not booking confirmation or final price commitment.
- Public APIs must exclude admin-only fields.
21. Suggested MongoDB / Mongoose Data Model
Suggested collection: packages
{
  _id: ObjectId,
  name: { en: String, mr: String },
  slug: String,
  shortDescription: { en: String, mr: String },
  description: { en: String, mr: String },
  guestCount: {
    min: Number,
    max: Number,
    fixed: Number,
    note: { en: String, mr: String }
  },
  price: {
    amount: Number,
    currency: String,
    pricingBasis: String,
    notes: { en: String, mr: String },
    showPublicly: Boolean
  },
  serviceTypes: [String],
  eventTypes: [String],
  menuSelections: [{
    groupName: { en: String, mr: String },
    selectionRule: String,
    minSelections: Number,
    maxSelections: Number,
    menuItemIds: [ObjectId]
  }],
  inclusions: { en: [String], mr: [String] },
  exclusions: { en: [String], mr: [String] },
  notes: { en: String, mr: String },
  image: {
    url: String,
    publicId: String,
    alt: { en: String, mr: String }
  },
  displayOrder: Number,
  featured: Boolean,
  status: "draft" | "published" | "unpublished" | "archived",
  createdBy: ObjectId,
  updatedBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
21.1 Schema Notes
- Use Mongoose timestamps or equivalent.
- Validate guest-count consistency, price, service types, status, and menu references.
- Store currency and pricing basis with price.
- Index status, display order, event types, and search fields.
- Enforce slug uniqueness according to project policy.
- Consider snapshots for historical bookings/enquiries.
- Do not store credentials or unrelated customer data in package records.
- Review this proposed schema with backend architecture before implementation.
22. Suggested API Endpoints
Admin endpoints require authentication and authorization.
Method	Endpoint	Purpose
GET	/api/admin/packages	List with search, filters, sorting, pagination
GET	/api/admin/packages/:packageId	Get details
POST	/api/admin/packages	Create package
PUT/PATCH	/api/admin/packages/:packageId	Update package
PATCH	/api/admin/packages/:packageId/status	Publish, unpublish, archive
PATCH	/api/admin/packages/reorder	Update ordering, if supported
PATCH	/api/admin/packages/:packageId/restore	Restore archived package, if supported
DELETE	/api/admin/packages/:packageId	Restricted permanent delete, if approved


Public endpoints:
Method	Endpoint	Purpose
GET	/api/public/packages	List published packages
GET	/api/public/packages/:slug	Published package details


22.1 API Requirements
- Validate and sanitize request data.
- Use consistent response formats and HTTP status codes.
- Enforce pagination limits and allowlisted sorting.
- Validate menu references and selection constraints.
- Do not trust client-supplied admin identity or permissions.
- Public responses must exclude audit/internal fields.
- Handle invalid IDs, missing records, duplicate slugs, validation errors, and upload failures.
- Return localized-safe error codes for frontend translation.
23. Frontend Component Suggestions
Possible components:
- PackageManagementPage
- PackageTable
- PackageForm
- PackageDetails
- PackageFilters
- PackageSearch
- GuestCountFields
- PackagePricingFields
- ServiceTypeSelector
- PackageMenuConfigurator
- InclusionsEditor
- ExclusionsEditor
- PackageImageUpload
- PackagePreview
- PackageStatusBadge
- PublishConfirmationModal
- ArchiveConfirmationModal
23.1 State and Data Handling
- Follow the project's shared state and API service conventions.
- Keep list state separate from form state.
- Use centralized Admin language state.
- Preserve unsaved values when switching languages.
- Update list after create/edit/status/archive/restore operations.
- Avoid unnecessary full-page reloads.
- Show loading, empty, success, and error states.
24. Security and Permissions
- Protect routes with authentication.
- Enforce backend permissions on all mutations.
- Validate numeric fields and menu references.
- Validate and restrict image uploads.
- Sanitize rich text if enabled.
- Prevent injection and unsafe HTML rendering.
- Store DB/JWT/media secrets in environment variables.
- Never expose secrets or admin metadata in public responses.
- Rate-limit sensitive endpoints as appropriate.
- Audit significant package edits, price changes, status changes, archive/restore where audit logging exists.
25. Responsive UI Requirements
- Desktop: package table with essential columns and clear actions.
- Tablet: responsive table or compact list.
- Mobile: package cards and accessible action menu.
- Form sections should stack on small screens.
- Language switcher remains accessible.
- Dialogs and preview fit mobile viewports.
26. Accessibility
- Semantic headings, buttons, tables, and labels.
- Keyboard access to all controls.
- Visible focus states and adequate contrast.
- Status and featured state must not rely only on color.
- Meaningful image alt text in both languages.
- Accessible form errors and operation announcements.
- Keyboard alternative for drag-and-drop ordering.
27. SEO and Public Content
- Published package pages may have localized SEO title/description.
- Slugs should be stable and valid.
- Draft, unpublished, and archived packages must not be indexed.
- Public content must be owner-approved and accurate.
- Never expose Admin metadata in public responses or page metadata.
28. Testing Requirements
28.1 Frontend
- Package list loads.
- English/Marathi search works.
- Filters, sorting, and pagination work.
- Create/edit validation works.
- Guest-count and pricing validation works.
- Service type and menu selections are configurable.
- Inclusions, exclusions, and notes support both languages.
- Language switching preserves form data.
- Preview works without publishing.
- Publish/unpublish/archive/restore flows work.
- Image upload validation works if enabled.
- Desktop/tablet/mobile layout works.
- Loading, empty, error, and success states work.
28.2 Backend
- Authentication and permissions enforced.
- CRUD endpoints validate fields.
- Guest-count and pricing rules enforced.
- Menu references and choice rules validated.
- Public API returns published packages only.
- Draft, unpublished, and archived packages are excluded.
- Slug uniqueness handled.
- Filters, sorting, and pagination validated.
- Upload validation works if enabled.
- Public responses exclude internal fields.
28.3 Integration
- Published packages appear on public Packages page.
- Changes reflect after cache/revalidation.
- Unpublished and archived packages disappear publicly.
- Menu selections reference eligible items.
- Booking/enquiry package selection works if enabled.
- English and Marathi views are verified.
- Price and pricing basis are accurate.
29. Acceptance Criteria
- Authorized Admin can access Package Management.
- Admin can create, view, edit, search, filter, sort, and paginate packages.
- English and Marathi package content can be maintained separately.
- Admin interface fully switches between English and Marathi.
- Admin language preference persists via shared system.
- Guest count/capacity can be configured and validated.
- Prices can be managed without fabricated defaults and include pricing basis.
- With Material / Without Material options can be maintained.
- Menu items and choice groups can be configured.
- Inclusions, exclusions, and notes are editable in both languages.
- Preview works without publishing.
- Draft, unpublished, and archived packages are hidden from public endpoints.
- Publishing, unpublishing, archiving, and restoring work.
- Public package ordering is respected.
- Optional images are uploaded safely.
- Public website shows only owner-approved published packages.
- Loading, empty, error, success, and validation states are handled.
- Responsive and accessibility checks pass.
- Backend security and authorization checks pass.
- Automated tests and manual QA are completed.
30. Definition of Done
- [ ] Requirements reviewed and approved.
- [ ] Admin UI implemented with shared layout and Bootstrap.
- [ ] Centralized English/Marathi translation system integrated.
- [ ] Package CRUD endpoints implemented.
- [ ] Guest-count and price validation implemented.
- [ ] Service type and menu selection implemented.
- [ ] Inclusions, exclusions, and notes implemented.
- [ ] Database schema and indexes reviewed.
- [ ] Image upload integration completed, if enabled.
- [ ] Public Packages page integration completed.
- [ ] Preview, ordering, archive, and restore workflows completed as agreed.
- [ ] Unit, API, and integration tests pass.
- [ ] Responsive QA completed.
- [ ] Accessibility checks completed.
- [ ] Owner-approved English and Marathi content entered.
- [ ] No fabricated prices, menu details, capacities, or claims remain.
- [ ] Code review and merge completed.
31. Pending Business Owner / Project Decisions
Confirm before implementation or launch:
- Final package names and Marathi translations
- Guest counts or capacity
- Package prices and pricing basis
- Whether prices are displayed publicly
- Package categories and event types
- With Material / Without Material definitions and availability
- Menu items included in each package
- Menu choices, substitutions, and selection limits
- Inclusions, exclusions, and notes
- Package images and image ownership
- Display order and featured-package rules
- Booking/enquiry integration
- Translation fallback behavior
- Admin permissions for editing/publishing prices
- Archive-only or permanent deletion policy
- Minimum guest count, location restrictions, taxes, or terms, if any (owner-approved only)
Document End
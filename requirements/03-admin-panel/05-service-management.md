05-Service Management Requirements
1. Document Overview
Field	Details
Project	Aditi Caterers Website
Module	Admin Panel – Service Management
File Name	05-service-management.md
Primary Users	Authorized Admin
Frontend	React + Vite, Bootstrap 5, React Router
Backend	Node.js, Express.js
Database	MongoDB Atlas, Mongoose
Media Storage	Cloudinary (if service images are enabled)
Languages	English and Marathi
Status	Requirements Draft – Pending Business Owner Approval


2. Purpose
The Service Management module allows authorized administrators to manage the catering services displayed on the public website without requiring code changes.

Admins should be able to create, view, edit, publish, unpublish, reorder, and archive service records. Services managed here may be displayed on the Services page and reused in relevant sections of the Home page or enquiry/booking flow, where applicable.

Service details and business-specific claims must be approved by the business owner before publication. Do not invent service descriptions, prices, service areas, guarantees, or policies.
3. Scope
3.1 Included
- Service listing and service details
- Add a new service
- Edit existing service
- Draft, publish, and unpublish controls
- Active / inactive visibility management
- Service image upload and replacement (optional)
- Search, filtering, sorting, and pagination
- Service ordering / display priority
- English and Marathi content fields
- Preview before publishing
- Archive and restore
- Form validation and error handling
- API and database integration
- Audit information for created/updated records
3.2 Not Included
- Automatic pricing or quotation calculations
- Booking confirmation or event scheduling
- Payment processing
- Customer-side service purchasing
- Automatically generated service descriptions
- Unapproved service guarantees or claims
These features require separate approval and/or requirements documents.
4. Navigation and Access
- Admin navigation must include a Services / सेवा व्यवस्थापन entry.
- Suggested route: /admin/services.
- Add and edit route examples:
  - /admin/services/new
  - /admin/services/:serviceId/edit
- Only authenticated admins with the required permission may access these pages or service APIs.
- Direct URL access must be protected by route guards and backend authorization.
- The service module must follow the existing Admin Panel layout, sidebar, header, spacing, typography, and responsive conventions.
5. Mandatory English and Marathi Language Support
The entire Admin Panel must support English and Marathi. Service Management must follow the same centralized language system used by the Admin Login, Dashboard, Booking Management, and Customer Management modules.
5.1 Admin Interface Translations
Translate all interface elements, including:
- Page titles, breadcrumbs, labels, placeholders, and helper text
- Buttons and action menus
- Table headers and empty states
- Search, filter, sorting, and pagination labels
- Status labels and badges
- Form validation and server error messages (user-facing)
- Confirmation dialogs, alerts, and notifications
- Image upload instructions and upload errors
- Preview labels and publishing messages
5.2 Service Content Languages
- Each service must support content in English and Marathi.
- Service name and description should have English and Marathi fields.
- Optional short description, highlights, and image alt text should support both languages when these fields are used.
- The admin must be able to enter and edit both language versions.
- Do not automatically translate entered content or overwrite one language with the other.
- If a translation is missing, apply the project's approved fallback behavior (for example, show the available language or hide the content field from public display); finalize the fallback rule before implementation.
5.3 Language Behavior
- Language switcher must be accessible from the shared Admin Panel header.
- Changing the language must update the module interface without unnecessarily clearing form data.
- The selected admin interface language should persist across navigation and reloads, according to the shared language system.
- Use centralized translation resources / keys; do not hardcode language conditionals throughout individual components.
- Public website language selection and Admin Panel language selection should be managed appropriately and must not unexpectedly overwrite each other.
6. Service Listing Page
6.1 Page Header
Display:
- Page title: Service Management / सेवा व्यवस्थापन
- Short description explaining that admins can manage services shown on the public website
- Add Service / नवीन सेवा जोडा button
- Optional count summary (total, published, draft, archived)
6.2 Service Table / List
The list should display the following fields where applicable:
Column	Description
Service Name	Show name in the selected admin content language, with a fallback indicator if missing
Image	Thumbnail or placeholder
Short Description	Brief preview, truncated if lengthy
Status	Draft, Published, Unpublished, or Archived
Display Order	Position on the public website
Updated At	Last updated date/time
Actions	View, Edit, Preview, Publish/Unpublish, Archive/Restore


- Use a clean Bootstrap responsive table or responsive list/cards for smaller screens.
- Avoid overcrowding the table with every service field.
- Provide an action menu or buttons with clear labels and accessible tooltips.
- Show a loading state while data is fetched.
- Show a helpful empty state when no services exist.
- Show a retry option when loading fails.
- Confirm destructive or visibility-changing actions where appropriate.
7. Search, Filters, Sorting, and Pagination
7.1 Search
Allow admins to search services by:
- English service name
- Marathi service name
- Service slug, if used
Search should be debounced and should not trigger a request on every keystroke.
7.2 Filters
Provide filters as applicable:
- Status: All, Draft, Published, Unpublished, Archived
- Updated date range (optional)
- Content language completeness: Complete / Missing translation (optional)
7.3 Sorting
Allow sorting by:
- Service name
- Display order
- Created date
- Updated date
7.4 Pagination
- Backend pagination is required when the service list grows.
- Page size options may be 10, 20, or 50.
- Preserve selected filters and sorting when changing pages.
- Show total records and current page information.
8. Add Service
8.1 Add Service Form
The form should include:
Field	Required	Notes
Service Name (English)	Required	Clear public-facing name
Service Name (Marathi)	Required before bilingual publishing	Owner-approved translation
Short Description (English)	Optional	For cards and summaries
Short Description (Marathi)	Optional	Translation of short description
Full Description (English)	Optional	Detailed service description
Full Description (Marathi)	Optional	Detailed Marathi description
Highlights (English)	Optional	Repeatable list of approved highlights
Highlights (Marathi)	Optional	Matching Marathi highlights
Service Image	Optional	Approved image, supported formats only
Image Alt Text (English)	Optional	Accessibility text
Image Alt Text (Marathi)	Optional	Accessibility text
Display Order	Optional	Non-negative integer; default assigned by system
Status	Required	Draft by default
SEO Title (English/Marathi)	Optional	If page-level SEO is supported
SEO Description (English/Marathi)	Optional	If page-level SEO is supported


8.2 Form Controls
- Text fields for service names and short descriptions.
- Textarea or rich-text editor for full descriptions (if rich text is approved).
- Repeatable controls for highlights.
- Image picker/upload control.
- Numeric field for display order.
- Status selector.
- Save Draft, Save Changes, Preview, and Cancel actions as appropriate.
- Use Bootstrap form controls and existing design conventions.
8.3 Validation
- Trim leading/trailing whitespace.
- English service name is required.
- Marathi service name must be provided before publishing to Marathi public view, according to the approved bilingual content policy.
- Enforce reasonable length limits on names, descriptions, highlights, and SEO fields.
- Display order must be a valid non-negative integer.
- Validate image file type and file size on client and server.
- Reject unsupported files and provide clear localized errors.
- Prevent empty highlight items from being saved.
- Prevent duplicate service slugs or names where uniqueness rules apply.
- Validation errors should appear near the relevant fields and be announced accessibly.
- Do not silently discard form data after validation or server errors.
9. Edit Service
- Admin may open an existing service and update its content and metadata.
- Populate all form fields with saved values.
- Editing English content must not change Marathi content, and vice versa.
- Show the current service image and provide replace/remove actions if image management is enabled.
- Warn about unsaved changes when leaving the form.
- Update the updatedAt field after successful edits.
- Preserve the existing service identifier and slug unless an approved slug-editing workflow is used.
- Handle concurrent edits safely if the project implements version checking.
10. Service Details and Preview
10.1 Admin Detail View
Show:
- Service name and content in both language versions (where available)
- Short and full descriptions
- Highlights
- Current image and alt text
- Status
- Display order
- Created date and updated date
- Created by / updated by, if audit fields are available
10.2 Preview
- Admin may preview how a service card and service detail content will appear on the public website.
- Preview must not publish a draft or change its status.
- Preview should support English and Marathi views.
- The preview must clearly indicate that it is an admin preview and not public.
- Do not show preview content to unauthorized users.
11. Publish, Unpublish, and Draft
11.1 Statuses
Recommended service statuses:
- draft – saved but not publicly visible
- published – eligible for public display
- unpublished – previously published, now hidden from public display
- archived – removed from normal admin list; can be restored if supported
11.2 Publishing Rules
- Publishing requires confirmation.
- Publishing must validate required content for supported public languages.
- Only published services may be returned by public service APIs.
- Unpublishing should remove the service from public display without deleting the record.
- Draft and unpublished content must never appear in public API results.
- Status changes should update updatedAt and audit information.
- Public website changes should appear after successful API/cache refresh according to the application's cache strategy.
12. Display Order
- Admin can assign or update a display order.
- Public services should be displayed in ascending display-order sequence.
- Provide optional move-up / move-down controls or drag-and-drop ordering if approved.
- If drag-and-drop is implemented, support keyboard operation or an equivalent accessible ordering control.
- Display order must be unique only if the project explicitly requires uniqueness; otherwise define a stable secondary sort.
- Avoid reordering archived services in the public list.
13. Service Image Management (Optional)
- Allow upload of an approved image for each service.
- Supported image types should be explicitly allowlisted (e.g., JPEG, PNG, WebP).
- Validate file type, size, and dimensions on client and server.
- Use Cloudinary or the project's configured media service; do not store image binaries in MongoDB.
- Show upload progress and localized success/failure messages.
- Allow replacing an image and removing it when optional.
- Use optimized image delivery, responsive image sizes, and lazy loading on public pages.
- Ensure alt text is available in English and Marathi when the corresponding public language is shown.
- Only use genuine, owner-approved business/service images. Do not use stock photos as though they depict Aditi Caterers' actual work.
- Cleanup orphaned media only after confirming the image is no longer referenced and according to the media retention policy.
14. Archive and Restore
- Archive should be preferred over permanent deletion for services that may have been used in past enquiries or bookings.
- Archived services must be excluded from the normal list by default and from public APIs.
- Provide an Archived filter or archive view.
- Restore should return the service to a safe non-public status (draft or unpublished) unless the admin explicitly confirms publishing.
- Archive and restore actions require confirmation and localized feedback.
- Permanent delete, if ever implemented, must be restricted, confirmed, and reviewed for related booking/enquiry references.
15. Public Website Integration
- Public Services page should fetch services from the backend.
- Public API must return published services only.
- Response content should support the selected language, with the agreed missing-translation fallback.
- Service cards may display image, service name, short description, and a details link.
- Home page may reuse a subset of published services, subject to its own display requirements.
- Booking/enquiry form may reference services when that integration is included in the booking requirements.
- Service links and slugs must be stable and validated.
- If no published services exist, show an approved empty state rather than fabricated content.
- Handle API errors with a graceful fallback state.
16. Suggested MongoDB / Mongoose Data Model
Suggested collection: services
{
  _id: ObjectId,
  name: {
    en: String,
    mr: String
  },
  slug: String,
  shortDescription: {
    en: String,
    mr: String
  },
  description: {
    en: String,
    mr: String
  },
  highlights: {
    en: [String],
    mr: [String]
  },
  image: {
    url: String,
    publicId: String,
    alt: {
      en: String,
      mr: String
    }
  },
  status: "draft" | "published" | "unpublished" | "archived",
  displayOrder: Number,
  seo: {
    title: {
      en: String,
      mr: String
    },
    description: {
      en: String,
      mr: String
    }
  },
  createdBy: ObjectId,
  updatedBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
16.1 Schema Notes
- Add timestamps using Mongoose timestamps or equivalent.
- Define required fields and validation rules in the schema.
- Normalize slugs and create an index according to the uniqueness policy.
- Add indexes for status, display order, updated date, and search strategy as appropriate.
- Do not store admin passwords, authentication tokens, or unrelated customer data in the service record.
- The schema is a proposal; finalize it with the backend architecture before implementation.
17. Suggested API Endpoints
Admin endpoints must require authentication and authorization.
Method	Endpoint	Purpose
GET	/api/admin/services	List services with search, filters, sorting, pagination
GET	/api/admin/services/:id	Get one service for admin view/edit
POST	/api/admin/services	Create service
PUT/PATCH	/api/admin/services/:id	Update service
PATCH	/api/admin/services/:id/status	Change status
PATCH	/api/admin/services/reorder	Update display order (if implemented)
PATCH	/api/admin/services/:id/restore	Restore archived service (if implemented)
DELETE	/api/admin/services/:id	Restricted delete only if approved


Public endpoints:
Method	Endpoint	Purpose
GET	/api/public/services	Return published services only, language/fallback as agreed
GET	/api/public/services/:slug	Return a published service by slug


17.1 API Behavior
- Use consistent response format and HTTP status codes.
- Validate and sanitize incoming data.
- Return localized-safe error codes/messages; frontend maps codes to translations.
- Enforce pagination limits and allowlisted sort fields.
- Do not trust status, user ID, or permissions supplied by the client.
- Public endpoints must not expose admin/audit fields.
- Handle missing records, invalid IDs, duplicate slugs, validation failures, and upload failures.
18. Frontend Component Suggestions
Suggested components (names may be adapted to the project):
- ServiceManagementPage
- ServiceTable
- ServiceFilters
- ServiceForm
- ServiceImageUpload
- ServiceStatusBadge
- ServicePreview
- ServiceDetailsDrawer or ServiceDetailsPage
- ArchiveConfirmationModal
- PublishConfirmationModal
18.1 State and Data Handling
- Use the project's established state-management approach and API service layer.
- Keep form state separate from fetched list state.
- Avoid duplicating global language state inside each component.
- Show loading, empty, success, and error states.
- Refresh or update the list after create/edit/status/archive/restore operations.
- Avoid unnecessary full-page reloads.
19. Security and Permissions
- Protect Admin routes and APIs with authentication middleware.
- Check permission on the backend for every write operation.
- Validate uploaded images and restrict file size.
- Sanitize rich-text content if rich text is enabled.
- Prevent injection, malicious uploads, and unsafe HTML rendering.
- Use secure environment variables for database credentials, JWT secrets, and media credentials.
- Do not expose secrets in frontend code or API responses.
- Rate-limit sensitive admin endpoints as appropriate.
- Record status changes and admin actions where audit logging is available.
20. Responsive UI Requirements
- Desktop: comfortable service table, filters, and actions.
- Tablet: allow horizontal scrolling only where necessary; prioritize essential columns.
- Mobile: use compact cards or a responsive list with accessible action menus.
- Forms should use full-width fields on small screens and clear grouping on larger screens.
- Language switcher must remain reachable on mobile.
- Modals must fit small screens and support keyboard navigation.
21. Accessibility
- Use semantic headings, labels, buttons, and form controls.
- Ensure keyboard access to all actions, menus, filters, and ordering controls.
- Provide visible focus indicators.
- Use sufficient contrast for status badges and text.
- Images must have meaningful alt text in the relevant language.
- Announce form errors and operation results to assistive technology.
- Do not rely on color alone to convey status.
22. SEO and Public Content
- Published service pages should have appropriate title, description, and stable URL/slug where individual service pages are supported.
- SEO content should be available in both English and Marathi where the public website supports those locales.
- Draft, unpublished, and archived services must not be indexed.
- Public content must be owner-approved, accurate, and free of placeholder text.
- Avoid exposing admin-only metadata on public pages.
23. Testing Requirements
23.1 Frontend
- Service list loads correctly.
- Search works across English and Marathi service names.
- Filters, sorting, and pagination behave correctly.
- Create/edit form validation works.
- English and Marathi content remain independent.
- Language switching updates UI without losing entered form values.
- Preview works for both language views and does not publish.
- Publish/unpublish/archive/restore actions show correct confirmation and feedback.
- Responsive layouts work on desktop, tablet, and mobile.
- Loading, empty, and error states are handled.
23.2 Backend
- Admin authentication and permission checks are enforced.
- CRUD endpoints validate data and handle invalid IDs.
- Published status and public API filtering work correctly.
- Draft/unpublished/archived services are not returned publicly.
- Duplicate slug handling works.
- Pagination, filtering, and sorting are validated.
- Upload validation and error handling work, if uploads are enabled.
- Public responses exclude sensitive admin metadata.
23.3 Integration
- Services created in Admin appear on the public Services page after publishing.
- Editing a service updates public content after the agreed refresh/cache process.
- Unpublishing hides the service from public pages.
- Archived services remain unavailable publicly.
- Booking/enquiry integrations, if any, show only eligible published services.
- Both English and Marathi public content are verified.
24. Acceptance Criteria
The module is accepted when:
- Admin can access Service Management with appropriate permissions.
- Admin can create, edit, view, search, filter, sort, and paginate service records.
- Admin can manage English and Marathi content separately.
- Admin UI fully switches between English and Marathi.
- Selected Admin Panel language persists according to the shared language system.
- Admin can preview a service without publishing it.
- Draft and unpublished services are hidden from public endpoints.
- Admin can publish, unpublish, archive, and restore services according to defined rules.
- Service ordering is reflected on the public website.
- Image management works safely if enabled.
- Public Services page displays only approved, published content.
- Loading, empty, validation, error, and success states are handled.
- Responsive and accessibility checks pass.
- Backend authorization, validation, and security checks pass.
- Automated tests and manual QA are completed.
25. Definition of Done
- [ ] Requirements reviewed and approved.
- [ ] UI implemented using existing Admin Panel design conventions and Bootstrap.
- [ ] Centralized English/Marathi translation integration completed.
- [ ] Service CRUD and status APIs implemented.
- [ ] Database schema and indexes reviewed.
- [ ] Image upload integration completed (if enabled).
- [ ] Public Services page integration completed.
- [ ] Preview, ordering, archive, and restore workflows completed as agreed.
- [ ] Unit, API, and integration tests pass.
- [ ] Responsive QA completed.
- [ ] Accessibility checks completed.
- [ ] Owner-approved English and Marathi content entered.
- [ ] No placeholder, fabricated, or unapproved service content remains.
- [ ] Code review and merge completed.
26. Pending Business Owner / Project Decisions
Confirm before implementation or public launch:
- Final service names in English and Marathi.
- Final service descriptions and highlights.
- Which services are offered With Material and/or Without Material.
- Whether service images are required.
- Whether individual public service detail pages are needed.
- Whether services are selectable in the booking/enquiry form.
- Whether display ordering uses manual order, drag-and-drop, or numeric order.
- Translation fallback behavior when one language is incomplete.
- Whether SEO fields are editable per service.
- Whether permanent deletion is permitted or archive-only.
- Admin roles/permissions and audit log scope.
- Any business-specific prices, minimum guest counts, locations, or terms (must be owner-confirmed).
Document End
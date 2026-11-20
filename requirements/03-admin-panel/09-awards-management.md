09 - Awards Management Requirements
1. Overview
The Awards Management module is part of the Aditi Caterers Admin Panel. It allows authorized administrators to manage awards, certificates, recognitions, and achievement details that may be displayed on the public website.

All Admin Panel interface labels and messages must support English and Marathi. Award information intended for public visitors should support both languages where applicable.
2. Purpose
- Maintain a central, organized list of business awards and recognitions.
- Showcase approved achievements and certificates on the public website.
- Allow administrators to add, edit, preview, publish, unpublish, archive, and delete award records.
- Keep award details and images up to date without developer assistance for routine changes.
- Avoid publishing incorrect, duplicate, or unverified award information.
3. Scope
Included
- Awards listing and management.
- Add, edit, preview, publish, unpublish, archive, restore, and delete awards.
- Award image/certificate upload.
- Award title, description, date/year, issuing organization, and optional category.
- English and Marathi content fields where applicable.
- Search, filters, sorting, and pagination.
- Featured awards and display ordering, if approved.
- Integration with the public Awards/Achievements page or homepage section.
Not included
- Automatic award verification.
- Generating or editing certificates.
- Third-party award registration.
- Public award submissions.
- Any award data that has not been confirmed by the business owner.
4. Admin Access and Navigation
- Awards Management must be available from the Admin Panel sidebar.
- Suggested route: /admin/awards.
- Only authenticated administrators with appropriate awards-management permissions may access this module.
- Protect the route and API endpoints from unauthorized access.
- Show an access-denied message for admins without the required permission.
- Sidebar, page title, buttons, and messages must support English and Marathi.
5. Bilingual Admin Interface (English and Marathi)
The Admin Panel must provide an English/Marathi language switcher.

Translate all module interface elements, including:
- Page title and descriptions.
- Table headings.
- Form labels and placeholders.
- Buttons and action menus.
- Status labels.
- Search, filters, sorting, and pagination.
- Validation errors.
- Confirmation dialogs.
- Success and failure notifications.
- Empty states and help text.
Language behavior
- Switching the interface language must not clear unsaved form values.
- Use centralized translation resources rather than hard-coded labels.
- Award title and description may be stored in English and Marathi.
- Issuing organization name should preserve its official name; translated display can be added only when appropriate and approved.
- Admin must be able to preview English and Marathi public content.
- Missing translations should be indicated in the admin UI, with an agreed fallback for public display.
6. Awards Management Listing Page
Display award records in a table or responsive list.
Suggested columns
- Award image/certificate thumbnail.
- Award title.
- Award category (if enabled).
- Issuing organization.
- Award date/year.
- Display order.
- Status.
- Updated date.
- Actions.
Actions
- View/Preview.
- Edit.
- Publish.
- Unpublish.
- Archive.
- Restore (if supported).
- Delete (permission-protected).
Listing requirements
- Show a loading state while records are loading.
- Show a clear empty state when no awards are available.
- Show an error state with retry option when loading fails.
- Use thumbnail-sized images in the list.
- Ensure the list is responsive and usable on desktop, tablet, and mobile.
7. Award Data Fields
Field	Required	Description
Award Title (English)	Yes	Official award name or approved title
Award Title (Marathi)	Recommended	Marathi title or display text
Description (English)	Optional	Approved achievement details
Description (Marathi)	Optional	Marathi description
Award Image/Certificate	Optional	Image of trophy, certificate, or recognition
Issuing Organization	Recommended	Organization or institution that issued the award
Award Date	Optional	Full date, if known and approved
Award Year	Optional	Year of award, if date is not known
Category	Optional	Approved award category
Recipient/Business Name	Optional	Name associated with the award; default may be Aditi Caterers if confirmed
Display Order	Optional	Public display sequence
Featured	Optional	Mark award as featured if feature is enabled
Status	Yes	Draft, Published, Unpublished, or Archived
Created By	System	Admin who created the record
Updated By	System	Admin who last updated it
Created At	System	Record creation date
Updated At	System	Record update date


Do not invent awards, years, awarding organizations, certificate details, descriptions, or recipient information. Only use records verified and approved by the business owner.
8. Award Image and Certificate Upload
- Admin may upload an award photograph or certificate image.
- Support common image formats such as JPG, JPEG, PNG, and WebP.
- Validate file format and size on frontend and backend.
- Maximum file size must be configurable and confirmed before implementation.
- Display an image preview before saving.
- Allow replacing an existing image.
- Show clear upload validation and failure messages.
- Optimize images for display and store them through the approved media storage service (Cloudinary is proposed).
- Store image URL and storage identifier in MongoDB, not raw image binary, unless separately approved.
- Preserve existing award information if upload or replacement fails.
- Clean up replaced or deleted storage assets safely after successful database operations.
9. Add Award
Admin must be able to create a new award record.
Add form fields
- Award title in English.
- Award title in Marathi (optional/recommended).
- Description in English.
- Description in Marathi.
- Award/certificate image.
- Issuing organization.
- Award date or year.
- Category (if enabled).
- Recipient/business name (if required).
- Display order.
- Featured toggle (if enabled).
- Save as Draft.
- Publish (if permission allows).
Add workflow
1. Admin opens Awards Management.
2. Admin selects Add Award.
3. Admin enters verified award details.
4. Admin optionally uploads a certificate or award image.
5. Admin previews the content in English and Marathi.
6. Admin saves as draft or publishes.
7. Backend validates the data and upload.
8. System stores the award record.
9. Listing updates and a success notification appears.
10. Edit Award
- Admin can edit an existing award.
- Existing details and image must load into the edit form.
- Admin can update title, description, issuing organization, date/year, category, recipient, order, featured state, and status.
- Admin may replace or remove the image if the field is optional.
- Show unsaved-change indicators.
- Warn before leaving a form with unsaved changes.
- Preserve the current image if no replacement is selected.
- Update the updatedAt timestamp after a successful save.
11. Award Preview
- Provide a preview of the award card or public page layout.
- Preview certificate/award image when available.
- Admin must be able to preview English and Marathi content.
- Preview should show how the award will appear on the public website.
- Draft and unpublished records must be clearly marked as not publicly visible.
- Ensure preview images do not stretch or distort.
12. Award Categories
Categories may be used to organize award records, if approved.

Suggested categories could include:
- Catering Excellence.
- Customer Appreciation.
- Event Services.
- Other Recognition.
These are illustrative only. Final category names must be approved by the business owner.

Requirements:
- Use consistent category values.
- Allow filtering by category.
- Avoid duplicate categories.
- If category management is not included, use a controlled list in configuration.
- Category labels should be available in English and Marathi.
13. Search, Filters, Sorting, and Pagination
Search
- Search award titles in English and Marathi.
- Search issuing organization and description if supported.
- Trim search input and validate it safely.
Filters
- Status: Draft, Published, Unpublished, Archived.
- Category.
- Featured awards (if enabled).
- Award year or date range, if supported.
Sorting
- Newest created.
- Oldest created.
- Award date/year.
- Display order.
- Last updated.
Pagination
- Use server-side pagination for larger collections.
- Show current page and total pages where available.
- Provide page-size selection if practical.
- Preserve search/filter/sort selections while navigating pages.
14. Display Order and Featured Awards
- Admin may set the display order of awards on the public website.
- If lower display-order numbers appear first, document and apply that consistently.
- Featured status may be used to highlight selected awards on the homepage or awards page.
- Featured status must not cause unpublished awards to appear publicly.
- If drag-and-drop sorting is implemented, provide numeric ordering as an accessible alternative.
15. Award Status and Publishing Workflow
Suggested statuses
- Draft: saved for further editing, not public.
- Published: visible on public website.
- Unpublished: hidden publicly but retained in admin.
- Archived: inactive record retained for administration.
Status actions
- Save Draft.
- Publish.
- Unpublish.
- Archive.
- Restore (if supported).
- Delete (if permitted).
Workflow requirements
- Only authorized admins can publish or unpublish awards.
- Confirm before unpublishing, archiving, or deleting.
- Draft, unpublished, and archived awards must not appear publicly.
- Published records appear on the public website after successful save.
- Failed status updates must not falsely show success.
- Audit status changes if audit logging is implemented.
16. Archive, Restore, and Delete
- Archive should be preferred for routine removal from active content.
- Archive action requires confirmation.
- Archived awards must not appear publicly.
- Restore should return an award to a safe status, preferably Unpublished until reviewed.
- Permanent deletion requires explicit confirmation and appropriate permission.
- If an image is permanently deleted, clean up the associated storage asset safely.
- Avoid removing storage assets that are referenced by other records.
17. Public Website Integration
- Public Awards page should fetch only Published award records.
- Homepage award section (if enabled) should fetch only Published and Featured records.
- Public visitors must not see Draft, Unpublished, or Archived records.
- Public content must follow the approved display order.
- Award titles and descriptions must display in the selected website language.
- Certificate images must be responsive and optimized.
- Provide an empty-state behavior if there are no published awards; hide the section or show an approved message based on website design.
- Public API must not expose admin-only fields, internal audit data, or unnecessary storage identifiers.
18. Award Detail View (Public)
If a public award detail view is included:
- Show approved title and description.
- Show issuing organization if provided.
- Show award date/year if provided.
- Show certificate or award image if provided.
- Provide an accessible image viewing option.
- Do not display any unapproved claims or incomplete award details.
- Keep the design responsive and consistent with the website.
19. Proposed MongoDB Schema
Award model (suggested)
{
  title: {
    en: String,
    mr: String
  },
  description: {
    en: String,
    mr: String
  },
  issuingOrganization: String,
  awardDate: Date,
  awardYear: Number,
  category: String,
  recipient: String,
  image: {
    url: String,
    publicId: String
  },
  displayOrder: Number,
  isFeatured: Boolean,
  status: "draft" | "published" | "unpublished" | "archived",
  createdBy: ObjectId,
  updatedBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
Schema requirements:
- Use Mongoose schema validation.
- Trim and normalize text fields.
- Restrict status to approved values.
- Validate year/date values.
- Set default status to Draft.
- Add indexes for status, category, award date/year, display order, and timestamps according to query needs.
- Avoid duplicate records where a meaningful duplicate check is possible.
- Final schema may be adjusted to match backend conventions.
20. Proposed API Endpoints
Admin APIs
- GET /api/admin/awards — list records with search, filters, sorting, and pagination.
- GET /api/admin/awards/:id — retrieve award for preview/edit.
- POST /api/admin/awards — create award with optional image.
- PUT /api/admin/awards/:id — update award and optionally replace/remove image.
- PATCH /api/admin/awards/:id/status — update publication status.
- PATCH /api/admin/awards/:id/order — update display order.
- PATCH /api/admin/awards/:id/featured — update featured status, if enabled.
- POST /api/admin/awards/:id/restore — restore archived award, if supported.
- DELETE /api/admin/awards/:id — permanently delete, permission-protected.
Public APIs
- GET /api/public/awards — return published award records.
- GET /api/public/awards/featured — return published and featured records, if homepage section is enabled.
- GET /api/public/awards/categories — return categories, if public category filtering is enabled.
API requirements:
- Validate request bodies, query parameters, and record IDs.
- Require authentication and authorization for admin endpoints.
- Return consistent response structures and appropriate HTTP status codes.
- Public APIs must filter records by publication status.
- Do not rely on frontend validation alone.
21. Suggested Frontend Components
- AwardsManagementPage
- AwardsTable or AwardsCardList
- AwardForm
- AwardImageUploader
- AwardImagePreview
- AwardPublicPreview
- AwardStatusBadge
- AwardFilters
- AwardSearch
- AwardPagination
- AwardDeleteConfirmation
- AwardLanguagePreview
Use Bootstrap components and the existing Admin Panel layout. Use Bootstrap Icons rather than emoji icons. Reuse common form, modal, table, pagination, and notification components.
22. State Management and API Integration
- Use the project's shared Axios/API service.
- Follow existing Context API or state-management conventions.
- Keep API calls out of presentation components where possible.
- Maintain form state when switching English/Marathi UI language.
- Track loading, saving, and image uploading states.
- Prevent duplicate submit actions.
- Refresh or update the listing after successful operations.
- Handle image upload success followed by database failure safely.
23. Validation and Error Handling
- Award title in at least one supported language is required.
- Validate award year/date and ensure they are reasonable values.
- Validate image type and size if an image is uploaded.
- Trim text fields and validate maximum lengths.
- Validate category against approved values.
- Validate status transitions.
- Validate record IDs on backend.
- Display field-level errors and bilingual general messages.
- Do not expose stack traces, credentials, internal file paths, or database details.
24. Security Requirements
- Require admin authentication.
- Enforce permissions server-side for create, update, publish, archive, and delete.
- Validate and sanitize input.
- Validate image uploads by content/type and size.
- Use safe upload naming and approved media storage.
- Store credentials in environment variables.
- Never expose cloud-storage secrets to frontend.
- Protect against common injection and unauthorized API access.
- Add rate limiting where appropriate.
- Audit important changes if audit logging is supported.
25. Responsive Design
- Desktop: full table/list with award thumbnails and actions.
- Tablet: adapt table and filter layout.
- Mobile: compact cards or accessible horizontal scrolling.
- Forms and preview dialogs must fit smaller screens.
- Upload and image-preview controls must support touch input.
- Keep action controls readable and prevent overlapping.
26. Accessibility
- Label all inputs clearly.
- Provide meaningful image alt text.
- Support keyboard navigation.
- Ensure visible focus states.
- Provide accessible names for icon-only actions.
- Use sufficient contrast.
- Do not communicate status through color alone.
- Make dialogs and previews keyboard accessible.
27. Performance
- Use optimized thumbnails for listings.
- Lazy-load images where appropriate.
- Use server-side search and pagination for large collections.
- Avoid unnecessary list refreshes.
- Compress and optimize uploaded images through approved storage settings.
- Cache public award responses only where caching will not delay important updates.
28. Testing Requirements
Frontend tests
- Award list loading.
- Search, filters, sort, and pagination.
- Create/edit validation.
- Image upload and preview.
- Optional image removal/replacement.
- English/Marathi language switching without form-data loss.
- Preview behavior.
- Publish/unpublish/archive/restore actions.
- Delete confirmation.
- Loading, empty, error, and success states.
Backend tests
- Authentication and authorization.
- Create and update awards.
- Image upload validation and cleanup.
- Search/filter/sort/pagination.
- Date/year validation.
- Publication-status behavior.
- Public API returns only published awards.
- Featured endpoint excludes unpublished records.
- Archived records are excluded.
- Invalid IDs and malformed inputs.
Integration tests
- Published awards appear on the public Awards page.
- Featured published awards appear in the homepage section, if enabled.
- Unpublished awards disappear from public pages.
- English and Marathi content return correctly.
- Upload and database failure cases are handled safely.
29. Acceptance Criteria
- Authorized admins can access Awards Management.
- Admin can add and edit verified award information.
- Admin can upload, preview, and replace award images/certificates.
- Admin can search, filter, sort, and paginate records.
- English and Marathi Admin Panel interface is available.
- Switching language does not lose unsaved data.
- Public visitors see only Published awards.
- Featured awards are shown only when published and featured.
- Admin can unpublish, archive, restore, or delete according to permissions.
- Frontend and backend validations are implemented.
- Public award information is displayed in the selected language.
- Layout is responsive and accessible.
- Key workflows are tested.
30. Definition of Done (DoD)
- Admin UI implemented using approved design system.
- English and Marathi translations completed.
- CRUD operations completed.
- Image/certificate upload integration completed, if enabled.
- Backend schema and API implemented and validated.
- Public Awards page integration completed.
- Authorization and security checks verified.
- Responsive and accessibility checks completed.
- Tests pass for key workflows.
- Business owner reviewed and approved the module.
- No critical or high-priority defects remain.
31. Pending Business Owner Decisions
Confirm before implementation:
- Verified list of awards and recognitions.
- Official titles and issuing organizations.
- Award dates/years.
- Which awards should be displayed publicly.
- Whether certificates or award photos are available.
- Whether award descriptions are needed.
- Marathi content requirements.
- Categories and featured awards.
- Homepage awards section design.
- Who can publish or permanently delete award records.
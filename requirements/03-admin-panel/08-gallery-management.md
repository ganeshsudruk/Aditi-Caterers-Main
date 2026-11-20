08 - Gallery Management Requirements
1. Overview
The Gallery Management module is part of the Aditi Caterers Admin Panel. It allows authorized administrators to manage event photographs and gallery content displayed on the public website.

The module must support English and Marathi admin interface labels. Gallery captions and other visitor-facing text should support both languages where applicable.
2. Purpose
- Manage event photographs from one central admin module.
- Showcase catering work, food presentation, venue setup, and events.
- Keep public gallery content accurate, organized, and up to date.
- Allow administrators to add, edit, publish, unpublish, archive, and delete gallery items based on permissions.
- Reduce the need for developer involvement for routine gallery updates.
3. Scope
Included
- Gallery item listing and management.
- Add, edit, preview, publish, unpublish, archive, restore, and delete operations.
- Upload and manage images.
- Category and event-type organization.
- English and Marathi captions/alt text where applicable.
- Search, filters, sorting, and pagination.
- Public gallery integration.
- Image validation and storage integration.
Not included
- Video gallery unless separately approved.
- Automatic AI image enhancement or image editing.
- Public user photo uploads.
- Automatic event tagging or face recognition.
- Any feature requiring additional paid services unless approved.
4. Admin Access and Navigation
- Gallery Management must be accessible from the Admin Panel sidebar.
- Suggested route: /admin/gallery.
- Only authenticated users with the appropriate gallery-management permission can access this module.
- Direct route access must be protected.
- If the admin has insufficient permission, show an access-denied page/message.
- Sidebar labels and page titles must support English and Marathi.
5. Bilingual Admin Interface (English and Marathi)
The Admin Panel must include an English/Marathi language switcher.

All Gallery Management interface content must be translated, including:
- Page title and descriptions.
- Buttons and action labels.
- Form labels and placeholders.
- Status labels.
- Category labels where these are system-defined.
- Search and filter controls.
- Validation messages.
- Confirmation dialogs.
- Success and error notifications.
- Empty-state messages.
- Pagination controls.
Language behavior
- Switching the interface language must not clear or change unsaved form data.
- Use centralized translation files/resources rather than hard-coded text in components.
- Store visitor-facing captions and alt text separately for English and Marathi when bilingual content is enabled.
- The admin can preview both language versions before publishing.
- If one language's caption is missing, follow the agreed fallback behavior and show a missing-translation indicator in the admin UI.
6. Gallery Management Listing Page
Display gallery records in a table or responsive card/list layout.
Suggested columns
- Thumbnail.
- Gallery title or caption.
- Category/event type.
- Display order.
- Status.
- Created date.
- Updated date.
- Actions.
Available actions
- View/Preview.
- Edit.
- Publish.
- Unpublish.
- Archive.
- Restore (for archived items, if supported).
- Delete (permission-protected and confirmation required).
Listing requirements
- Show a loading state while records are being fetched.
- Show an empty state when no gallery items exist.
- Show a clear error state and retry option if the request fails.
- Use responsive layout on desktop, tablet, and mobile.
- Avoid displaying excessively large images in the listing; use optimized thumbnails.
7. Gallery Item Data Fields
Each gallery item should support the following fields.
Field	Required	Description
Image	Yes	Uploaded gallery image
Title/Caption (English)	Recommended	Visitor-facing title or caption
Title/Caption (Marathi)	Recommended	Marathi title or caption
Alt Text (English)	Recommended	Accessible image description
Alt Text (Marathi)	Recommended	Marathi accessible description
Category	Optional	Gallery grouping/category
Event Type	Optional	Wedding, birthday, engagement, or other approved event type
Display Order	Optional	Position in the public gallery
Featured	Optional	Mark as featured, if this option is enabled
Status	Yes	Draft, Published, Unpublished, or Archived
Created By	System	Admin who created the record
Created At	System	Record creation date
Updated At	System	Last update date


Do not invent event categories, captions, or event details. Use only approved business information.
8. Image Upload Requirements
- Admin must be able to upload a gallery image from their device.
- Support common image formats such as JPG, JPEG, PNG, and WebP.
- Validate file type and file size on both frontend and backend.
- Maximum file size must be configurable and confirmed before development.
- Provide a clear validation error for unsupported files or oversized images.
- Show image preview before saving.
- Allow replacing an image during editing.
- Prevent accidental upload of empty or invalid files.
- Use responsive image dimensions and optimization where available.
- Store image files using the approved image-storage service (Cloudinary is proposed).
- Store image URL and storage identifier in the database; do not store raw image binaries in MongoDB documents unless specifically approved.
- Handle upload failures without losing the rest of the form data.
- If an image is replaced or deleted, remove the old stored image only after the database update succeeds and according to safe cleanup logic.
9. Add Gallery Item
The administrator must be able to create a new gallery record.
Add form fields
- Upload image.
- English caption/title.
- Marathi caption/title.
- English alt text.
- Marathi alt text.
- Category (if categories are enabled).
- Event type (if enabled).
- Display order.
- Featured toggle (if enabled).
- Save as Draft.
- Publish (if the admin has publish permission).
Add flow
1. Admin opens Gallery Management.
2. Admin selects Add Gallery Item.
3. Admin uploads an image.
4. Admin fills in optional caption and metadata.
5. Admin previews the image and entered details.
6. Admin saves as draft or publishes, according to permission.
7. System validates all inputs.
8. System stores the image and record.
9. System displays success feedback and refreshes the listing.
10. Edit Gallery Item
- Admin can edit an existing gallery item.
- Existing image and metadata must be loaded into the form.
- Admin may update captions, alt text, category, event type, order, featured state, or status.
- Admin can replace the image.
- Unsaved changes must be clearly indicated.
- Show a confirmation prompt if the admin navigates away with unsaved changes.
- Saving must update the record and its updatedAt timestamp.
- Preserve the existing image if no replacement is uploaded.
11. Image Preview
- Provide a preview of the uploaded image before saving.
- Provide a preview of the public gallery card or image presentation.
- Preview should be responsive and not distort the image.
- Admin can preview English and Marathi visitor-facing content.
- Preview must clearly distinguish draft/unpublished content from content visible publicly.
12. Gallery Categories and Event Types
If approved, administrators can assign categories or event types to gallery images.

Possible event types may include:
- Wedding.
- Birthday.
- Engagement.
- Other Events.
These are suggestions only; the final list must be approved by the business owner.

Requirements:
- Category/event-type selection should be consistent.
- Admin must be able to filter gallery items by category/event type.
- Categories must be configurable if category management is included.
- Avoid creating duplicate category values.
- If categories are not separately managed, use a controlled list defined by the project configuration.
13. Search, Filters, Sorting, and Pagination
Search
- Search by English or Marathi caption/title.
- Search may also match category or event type if supported.
- Search must be trimmed and handled safely.
Filters
- Status: Draft, Published, Unpublished, Archived.
- Category.
- Event type.
- Featured items (if enabled).
Sorting
- Newest first.
- Oldest first.
- Display order ascending/descending.
- Updated date.
Pagination
- Use server-side pagination for larger gallery collections.
- Show current page and total pages where available.
- Provide page-size selection if practical.
- Preserve search/filter/sort parameters when navigating between pages.
14. Display Order and Featured Items
- Admin may set display order for public gallery images.
- Lower display-order values may appear earlier, subject to agreed sorting rules.
- Admin can mark an item as Featured if the feature is enabled.
- Featured status must not automatically publish an unpublished image.
- Public display must follow the approved ordering rules.
- If drag-and-drop ordering is implemented, provide an accessible alternative such as numeric ordering.
15. Gallery Status and Publishing Workflow
Suggested statuses
- Draft: saved but not visible publicly.
- Published: visible on the public website.
- Unpublished: removed from public display but retained in admin.
- Archived: inactive record retained for administrative purposes.
Status actions
- Save Draft.
- Publish.
- Unpublish.
- Archive.
- Restore (if archive restoration is enabled).
- Delete, where permitted.
Workflow requirements
- Only authorized admins may publish or unpublish gallery items.
- Confirm before unpublishing, archiving, or deleting.
- Draft, Unpublished, and Archived images must not appear in the public gallery.
- Published images should appear on the public website after successful backend update.
- If the publish request fails, keep the previous status and display an error.
- Status changes must be recorded in audit logs if audit logging is implemented.
16. Delete and Archive
- Delete must require confirmation.
- Prefer archive for routine removal from active management.
- Permanent deletion must be permission-protected.
- If an image is permanently deleted, remove the associated storage asset safely.
- Avoid deleting a storage asset if another record references it.
- Archived items must not appear on the public website.
- Restore should return an archived item to a selected safe status, preferably Unpublished until explicitly published.
17. Public Website Integration
- Public Gallery page should fetch only Published gallery records.
- Public visitors must not see drafts, unpublished, or archived items.
- Public gallery should support responsive image display.
- Public gallery should respect approved category filters and display ordering.
- Captions should appear in the selected website language.
- Use accessible alt text for gallery images.
- If a caption is not supplied, use a safe fallback such as an image label without inventing event details.
- Public image loading should be optimized; consider lazy loading.
- Provide an empty-state message when there are no published gallery items.
- Public API must not expose admin-only fields, internal storage IDs unnecessarily, or private audit information.
18. Gallery Image Viewer (Public)
If a lightbox or image viewer is included:
- Open an image in a larger view when selected.
- Provide previous/next controls where appropriate.
- Provide a close control.
- Support keyboard navigation and Escape to close.
- Prevent background scrolling while open, where practical.
- Keep captions and alt text accessible.
- On mobile, viewer controls must be easy to use.
19. Proposed MongoDB Schema
Gallery model (suggested)
{
  image: {
    url: String,
    publicId: String
  },
  title: {
    en: String,
    mr: String
  },
  altText: {
    en: String,
    mr: String
  },
  category: String,
  eventType: String,
  displayOrder: Number,
  isFeatured: Boolean,
  status: "draft" | "published" | "unpublished" | "archived",
  createdBy: ObjectId,
  updatedBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
Schema requirements:
- Use Mongoose validation.
- Normalize strings and trim whitespace.
- Restrict status to allowed values.
- Set default status to Draft.
- Add indexes for status, category/event type, display order, and dates as appropriate.
- Ensure indexes match actual query patterns.
- The final schema can be adjusted during implementation.
20. Proposed API Endpoints
Routes below are proposals; final endpoint naming may follow the existing backend conventions.
Admin APIs
- GET /api/admin/gallery — list records with search, filters, sorting, and pagination.
- GET /api/admin/gallery/:id — retrieve one record for editing or preview.
- POST /api/admin/gallery — create a gallery record and upload image.
- PUT /api/admin/gallery/:id — update record and optionally replace image.
- PATCH /api/admin/gallery/:id/status — update publication status.
- PATCH /api/admin/gallery/:id/order — update display order.
- PATCH /api/admin/gallery/:id/featured — update featured state, if enabled.
- POST /api/admin/gallery/:id/restore — restore an archived record, if supported.
- DELETE /api/admin/gallery/:id — permanently delete, permission-protected.
Public API
- GET /api/public/gallery — return published gallery items only.
- GET /api/public/gallery/categories — return public categories, if category filters are enabled.
API requirements:
- Validate all query parameters and request bodies.
- Apply authentication and authorization to admin routes.
- Return consistent response structures and error messages.
- Never trust frontend validation alone.
- Use appropriate HTTP status codes.
- Prevent public access to admin gallery endpoints.
21. Suggested Frontend Components
- GalleryManagementPage
- GalleryTable or GalleryCardList
- GalleryForm
- GalleryImageUploader
- GalleryImagePreview
- GalleryPublicPreview
- GalleryStatusBadge
- GalleryFilters
- GallerySearch
- GalleryPagination
- GalleryDeleteConfirmation
- GalleryLanguagePreview
Use reusable Bootstrap components and the project's existing layout, form, modal, and notification components where possible. Use Bootstrap Icons instead of emoji icons.
22. State Management and API Integration
- Use the existing API service/Axios setup.
- Use Context API or the project's established state-management pattern.
- Avoid duplicating API logic inside multiple components.
- Maintain form state during language switching.
- Track loading, saving, uploading, and error states independently.
- Prevent duplicate submission while an upload or save is in progress.
- Refresh or update the list after successful changes.
- If an upload succeeds but the database save fails, handle cleanup or retry safely.
23. Validation and Error Handling
- Image is required when creating a new item.
- Validate file format and size.
- Trim captions and metadata.
- Validate display order as a permitted numeric value.
- Validate category/event type against approved values.
- Prevent invalid status transitions.
- Validate ObjectId/record identifiers on backend.
- Display field-level errors where possible.
- Provide user-friendly bilingual error messages.
- Do not expose stack traces, internal paths, cloud credentials, or database details to the admin UI.
24. Security Requirements
- Require admin authentication.
- Enforce permissions on the backend for every management action.
- Validate and sanitize inputs.
- Restrict upload file types and size.
- Do not rely on file extensions alone; validate actual file content/MIME as appropriate.
- Generate safe file names and use secure storage configuration.
- Protect APIs against unauthorized access and common injection risks.
- Use environment variables for cloud storage credentials.
- Do not expose private Cloudinary configuration or secrets.
- Use rate limiting for upload/API routes where appropriate.
- Maintain audit logging for important actions if supported.
25. Responsive Design
- Desktop: comfortable table/list view with thumbnail and action controls.
- Tablet: adapt columns and filters to available space.
- Mobile: use a card/list layout or horizontally scrollable table with accessible actions.
- Upload controls and preview must work on touch screens.
- Buttons must not become too small or overlap.
- Modal/dialog content must fit smaller viewports.
26. Accessibility
- Use clear labels for all form fields.
- Provide meaningful alt text for images.
- Ensure keyboard navigation for forms, dialogs, and image viewer.
- Use visible focus states.
- Do not rely only on color to convey status.
- Maintain suitable contrast.
- Ensure icon-only buttons have accessible names.
- Announce validation errors and upload status where possible.
27. Performance
- Use optimized thumbnails in the admin list.
- Lazy-load images where appropriate.
- Avoid loading the entire gallery at once.
- Use pagination and server-side filtering for larger datasets.
- Avoid unnecessary re-fetching and rendering.
- Optimize image uploads and transformations through the approved storage service.
28. Testing Requirements
Frontend tests
- Gallery list loads and displays data.
- Search and filters work.
- Pagination and sorting work.
- Add form validation works.
- Image preview works.
- Edit form loads existing values.
- Image replacement behaves correctly.
- English/Marathi switch works without losing form data.
- Publish/unpublish/archive/restore actions work.
- Confirmation dialog appears for destructive actions.
- Loading, empty, success, and error states are displayed.
Backend tests
- Admin authentication and authorization.
- Create and update gallery record.
- Upload validation and failure handling.
- Search, filtering, sorting, and pagination.
- Publish status behavior.
- Public endpoint returns only published records.
- Archived records are excluded from public output.
- Deletion and storage cleanup behavior.
- Validation and invalid ID handling.
Integration tests
- Admin changes are reflected on public gallery after successful publication.
- Unpublished items disappear from the public website.
- Language-specific caption and alt text are returned correctly.
- Upload and database failure scenarios are handled safely.
29. Acceptance Criteria
- Authorized admin can access Gallery Management.
- Admin can add gallery items with images.
- Admin can edit metadata and replace images.
- Admin can preview before saving/publishing.
- Admin can search, filter, sort, and paginate records.
- Admin interface is available in English and Marathi.
- Switching admin language does not clear unsaved form data.
- Draft and unpublished items remain hidden from public visitors.
- Published gallery items appear on the public website.
- Admin can unpublish and archive items.
- Image validation is enforced by frontend and backend.
- Responsive layout works across supported screen sizes.
- Errors and success messages are clear and bilingual.
- Tests cover key gallery workflows.
30. Definition of Done (DoD)
- UI completed using the approved admin design system.
- English and Marathi translations completed.
- Frontend validation and backend validation implemented.
- APIs connected and tested.
- Image upload/storage integration completed.
- Public gallery integration completed.
- Permissions and security checks verified.
- Responsive and accessibility checks completed.
- Unit and integration tests passed.
- No critical bugs remain.
- Business owner has reviewed gallery behavior and approved the module.
31. Pending Business Owner Decisions
Confirm the following before final implementation:
- Final gallery categories.
- Final event-type list.
- Whether captions are required.
- Whether Marathi captions are mandatory.
- Maximum image upload size.
- Whether featured gallery images are needed.
- Public gallery layout and lightbox behavior.
- Whether drag-and-drop ordering is required.
- Whether archived items can be restored.
- Who is allowed to publish or permanently delete images.
- Whether videos should be supported in a future phase.
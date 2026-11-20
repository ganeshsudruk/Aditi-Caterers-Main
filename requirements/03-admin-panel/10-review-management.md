10 - Review Management Requirements
1. Overview
The Review Management module allows authorized Aditi Caterers administrators to manage genuine customer reviews and feedback that may be displayed on the public website. The Admin Panel interface must support English and Marathi. Review content should retain its original language, with optional approved translations.
2. Purpose
- Manage customer feedback centrally.
- Review and approve content before public display.
- Showcase genuine, owner-approved customer experiences.
- Protect customer privacy and consent.
- Allow routine updates without developer involvement.
3. Scope
Included
- Review listing, details, and management.
- Manual entry of genuine reviews received through approved channels.
- Edit permitted metadata and translations.
- Approve, reject, publish, unpublish, archive, restore, and delete.
- Optional rating, event type/date, source, featured flag, and display order.
- English/Marathi interface and optional translations.
- Search, filters, sorting, pagination, and public website integration.
- Consent and privacy controls.
Excluded
- Fake or automatically generated reviews.
- Scraping third-party platforms.
- Public review submission unless separately approved.
- Automatic translation or sentiment analysis without approval.
4. Admin Access and Navigation
- Sidebar item: Reviews / पुनरावलोकने.
- Suggested route: /admin/reviews.
- Require authentication and review-management permissions.
- Protect both frontend routes and backend endpoints.
- Show an access-denied message when permission is missing.
5. Bilingual Admin Interface
Provide an English/Marathi language switcher. Translate page titles, table headings, labels, placeholders, buttons, status values, filters, validation messages, dialogs, notifications, and empty states.

Requirements:
- Use centralized translation resources.
- Switching interface language must not clear unsaved form data.
- Preserve the original review text.
- Store English and Marathi translations separately when supplied.
- Translations must be reviewed before public display.
- Allow preview of original and translated content.
- Do not silently replace original content with a translation.
6. Review Listing Page
Suggested columns:
- Customer display name.
- Review text preview.
- Rating, if supplied.
- Event type, if known.
- Source.
- Review date.
- Status.
- Featured flag, if enabled.
- Updated date.
- Actions.
Actions may include View, Edit, Approve, Reject, Publish, Unpublish, Archive, Restore, and Delete, subject to permissions.

Show loading, empty, and error states. Provide retry behavior. Use a responsive table or card layout. Keep private customer information out of the listing unless an authorized admin needs it.
7. Review Data Fields
Field	Required	Description
Customer Display Name	Recommended	Name approved for public display
Original Review Text	Yes	Genuine customer feedback
Original Language	Recommended	Language submitted by customer
English Translation	Optional	Approved English translation
Marathi Translation	Optional	Approved Marathi translation
Rating	Optional	Only if actually supplied
Event Type	Optional	Approved event type, if known
Event Date	Optional	If supplied and approved
Review Date	Recommended	Date feedback was received
Source	Recommended	WhatsApp, written feedback, website, etc.
Source Reference	Optional	Private internal reference
Consent to Publish	Required for public display	Customer permission
Featured	Optional	Highlight review if enabled
Display Order	Optional	Public display sequence
Status	Yes	Pending, Approved, Rejected, Published, Unpublished, Archived
Internal Notes	Optional	Admin-only information
Created/Updated By	System	Admin audit fields
Created/Updated At	System	Timestamps


Never invent customer names, review text, ratings, event details, or dates. If genuine approved reviews are unavailable, keep the public review section hidden or empty.
8. Review Sources
Potential sources, subject to owner approval:
- WhatsApp messages.
- Written feedback.
- Website form, if enabled.
- Other approved customer communication channels.
Record the source where known. Keep source references private. Do not copy third-party content unless permitted. For manually entered reviews, record which admin entered the record and when.
9. Add Review
Admin may manually add genuine feedback received through an approved channel.

Form fields:
- Customer display name.
- Original review text and language.
- Optional English and Marathi translations.
- Rating, only if supplied.
- Event type/date, if known.
- Review date and source.
- Consent confirmation and private evidence/reference.
- Featured flag and display order, if enabled.
Workflow:
1. Open Reviews and select Add Review.
2. Enter the genuine customer feedback.
3. Record consent and permitted display name.
4. Add translations only if approved.
5. Save the record in Pending status.
6. Backend validates and stores the record.
7. Show success feedback and refresh the list.
10. Edit Review
- Load existing review information into the form.
- Allow updates to metadata and approved translations.
- Preserve original review text.
- Any necessary correction to original text must not change the customer's meaning and should be auditable.
- Never rewrite feedback to make it more positive or add claims the customer did not make.
- Changes to public-facing content may require re-approval.
- Warn about unsaved changes.
- Update updatedAt after a successful save.
11. Approval and Publishing Workflow
Suggested statuses
- Pending: awaiting review.
- Approved: reviewed and permitted for publication.
- Rejected: not approved.
- Published: visible publicly.
- Unpublished: hidden but retained.
- Archived: retained for records and hidden publicly.
Rules
- New records default to Pending.
- Verify authenticity and consent before publication.
- Approval and publication may be separate actions.
- Only authorized admins can approve or publish.
- Pending, Rejected, Unpublished, and Archived records must never appear publicly.
- Consent or content changes may require re-approval.
- Record approver/publisher and timestamps if audit logging is enabled.
- A high rating alone must never cause automatic publication.
12. Customer Consent and Privacy
- Public display requires documented customer permission.
- Consent should cover the review text and the display name.
- Without consent, keep the review private.
- Use full name, first name, or an anonymous label only as permitted by the customer.
- Never display phone numbers, email addresses, home addresses, or private WhatsApp details.
- Do not publish screenshots of private conversations.
- Restrict consent evidence to authorized admins.
- Provide a process to unpublish/remove content if consent is withdrawn, subject to applicable retention requirements.
- Store only personal information needed for this module.
13. Rating Management
- Store a rating only when the customer actually provided one.
- If ratings are enabled, the owner must approve the scale (for example, 1–5).
- Validate rating values on frontend and backend.
- Never infer or alter a rating.
- Do not show a placeholder rating when none was supplied.
- Display an average rating only if calculation rules and source data are reliable and approved.
14. Search, Filters, Sorting, and Pagination
Search
Search customer display name, original review text, approved translations, and optionally source/event type.
Filters
- Status.
- Rating, if enabled.
- Event type.
- Source.
- Review date range.
- Featured flag, if enabled.
Sorting
- Newest or oldest review.
- Highest/lowest rating, if enabled.
- Recently updated.
Use server-side pagination for larger collections. Preserve filters and search values between pages.
15. Featured Reviews and Display Order
- Featured reviews must also be approved, consented, and Published.
- Admin may set display order.
- Featured status must not bypass approval or consent.
- Do not feature reviews automatically based only on rating.
- If drag-and-drop ordering is used, provide a numeric-order alternative.
16. Public Website Integration
- Public APIs return only Published reviews with valid consent.
- Show only the approved customer display name.
- Display original or approved translated content according to website language.
- Never expose internal notes, source references, consent evidence, contact details, or admin data.
- Show a rating only when supplied by the customer.
- Follow approved display ordering.
- Hide the section or show an owner-approved empty state if there are no published reviews.
- Do not use placeholder testimonials that could be mistaken for real customers.
17. Optional Public Review Submission
A public submission form is excluded from the initial scope unless approved. If introduced later:
- Explain how submitted content may be used.
- Require explicit consent for public display.
- Save submissions as Pending.
- Never publish automatically.
- Add spam protection, rate limiting, and backend validation.
- Collect only necessary information.
- Provide a privacy notice and correction/removal contact method.
18. Proposed MongoDB Schema
Review model (suggested)
{
  customerDisplayName: String,
  reviewText: {
    original: String,
    originalLanguage: String,
    en: String,
    mr: String
  },
  rating: Number,
  eventType: String,
  eventDate: Date,
  reviewDate: Date,
  source: String,
  sourceReference: String,
  consent: {
    granted: Boolean,
    grantedAt: Date,
    displayNamePermission: String,
    evidenceReference: String
  },
  isFeatured: Boolean,
  displayOrder: Number,
  status: "pending" | "approved" | "rejected" | "published" | "unpublished" | "archived",
  internalNotes: String,
  approvedBy: ObjectId,
  approvedAt: Date,
  publishedBy: ObjectId,
  publishedAt: Date,
  createdBy: ObjectId,
  updatedBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
Schema requirements:
- Use Mongoose validation.
- Preserve original review meaning.
- Restrict status and rating to allowed values.
- Require valid consent before publication.
- Default new records to Pending.
- Keep internal notes and consent evidence private.
- Add indexes for status, review date, and actual search/query patterns.
19. Proposed API Endpoints
Admin APIs
- GET /api/admin/reviews — list with search, filters, sorting, pagination.
- GET /api/admin/reviews/:id — retrieve review details.
- POST /api/admin/reviews — create a manually entered review.
- PUT /api/admin/reviews/:id — update metadata/translations.
- PATCH /api/admin/reviews/:id/approve — approve review.
- PATCH /api/admin/reviews/:id/reject — reject review.
- PATCH /api/admin/reviews/:id/status — publish, unpublish, or archive.
- PATCH /api/admin/reviews/:id/featured — update featured state, if enabled.
- PATCH /api/admin/reviews/:id/order — update display order.
- POST /api/admin/reviews/:id/restore — restore archived review, if supported.
- DELETE /api/admin/reviews/:id — permanent deletion, permission-protected.
Public APIs
- GET /api/public/reviews — published reviews with valid consent only.
- GET /api/public/reviews/featured — published featured reviews with valid consent, if enabled.
Validate request bodies, query parameters, and IDs. Enforce authentication, authorization, consent, and status checks on the backend. Return consistent responses and appropriate HTTP status codes. Never rely only on frontend validation.
20. Suggested Frontend Components
- ReviewManagementPage
- ReviewTable / ReviewCardList
- ReviewDetailsPanel
- ReviewForm
- ReviewStatusBadge
- ReviewRatingInput (if enabled)
- ReviewConsentPanel
- ReviewLanguageEditor
- ReviewPublicPreview
- ReviewFilters
- ReviewSearch
- ReviewPagination
- ReviewApprovalDialog
- ReviewDeleteConfirmation
Reuse existing Bootstrap layout, form, table, modal, pagination, and notification components. Use Bootstrap Icons rather than emoji icons.
21. State Management and API Integration
- Use the shared Axios/API service and existing Context API conventions.
- Keep API logic separate from presentation components.
- Preserve form state when switching Admin Panel language.
- Track loading, saving, and approval states.
- Prevent duplicate submissions.
- Refresh/update the list after successful operations.
- Handle API errors without exposing private information.
22. Validation and Error Handling
- Original review text is required.
- Require a display name if one will be shown publicly.
- Validate rating only if enabled.
- Validate dates and approved event types.
- Require valid consent before publication.
- Validate status transitions and permissions.
- Trim and limit text fields.
- Prevent unsafe HTML/script injection.
- Validate record IDs on the backend.
- Display clear English/Marathi field and general errors.
- Never expose stack traces, database details, or consent evidence.
23. Security Requirements
- Require admin authentication.
- Enforce server-side permissions for all management actions.
- Keep consent evidence, source references, and internal notes private.
- Safely render review text and protect against XSS/injection.
- Protect APIs from unauthorized access.
- Store secrets in environment variables.
- Apply rate limiting if public submission is enabled.
- Audit approval, rejection, publication, and deletion where supported.
- Restrict permanent deletion to authorized roles.
24. Responsive Design
- Desktop: table/list with text preview and clear actions.
- Tablet: adapt columns and filters.
- Mobile: compact cards or accessible horizontal scrolling.
- Long review text must wrap and remain readable.
- Forms and dialogs must fit small screens.
- Buttons must not overlap and must remain touch-friendly.
25. Accessibility
- Label all fields.
- Support keyboard navigation and visible focus.
- Provide accessible names for icon-only actions.
- Do not rely only on color for status.
- Use sufficient contrast and readable text.
- Provide text equivalents for ratings (for example, “4 out of 5”).
- Announce validation and action feedback where practical.
26. Performance
- Use server-side pagination and filtering for large collections.
- Return only fields needed by the current view.
- Add indexes based on actual queries.
- Avoid duplicate API calls and unnecessary re-renders.
- Ensure public data updates promptly after unpublishing.
27. Testing Requirements
Frontend tests
- List loading, search, filters, sorting, pagination.
- Add/edit validation.
- Original and translated content preview.
- Language switching without form-data loss.
- Consent validation.
- Approve, reject, publish, unpublish, archive, restore.
- Delete confirmation and featured/order behavior.
- Loading, empty, success, and error states.
Backend tests
- Authentication and authorization.
- Create/update validation.
- Consent enforcement.
- Status transition rules.
- Search/filter/sort/pagination.
- Public API excludes non-published and non-consented reviews.
- Private fields are excluded from public responses.
- Invalid IDs and malformed input.
Integration tests
- Only consented Published reviews appear publicly.
- Unpublished and archived reviews disappear.
- Language-specific content is returned correctly.
- Customer private details remain hidden.
- Consent withdrawal/unpublishing works.
- If public submission is enabled, new submissions remain Pending.
28. Acceptance Criteria
- Authorized admins can access Review Management.
- Admin can add genuine reviews from approved sources.
- Original text is preserved.
- Approved English and Marathi translations can be managed.
- Consent is recorded and enforced before publication.
- Admin can approve, reject, publish, unpublish, archive, and restore according to permissions.
- Search, filters, sorting, and pagination work.
- Admin interface supports English and Marathi without losing unsaved data.
- Public APIs return only Published reviews with valid consent.
- Private customer information and internal notes remain hidden.
- Ratings appear only when provided by customers.
- Responsive, accessibility, and testing requirements are met.
29. Definition of Done (DoD)
- Admin UI follows the approved design system.
- English and Marathi interface translations are complete.
- Review management and approval workflows work.
- Consent and privacy controls are implemented.
- Backend schema, validation, and APIs are complete.
- Public website integration is complete.
- Permissions and security checks are verified.
- Responsive and accessibility checks pass.
- Unit and integration tests pass.
- Business owner has reviewed and approved the module.
- No critical or high-priority defects remain.
30. Pending Business Owner Decisions
Confirm before implementation:
- Manual review management only or public submission in a later phase.
- Approved review sources.
- Whether ratings should be displayed and which scale to use.
- Whether customer names appear fully, partially, or anonymously.
- What consent evidence should be retained.
- Whether English and Marathi translations are required.
- Whether event type/date should be public.
- Whether featured reviews are needed on the homepage.
- Who can approve, publish, reject, and permanently delete reviews.
- How customer requests to correct or remove reviews will be handled.
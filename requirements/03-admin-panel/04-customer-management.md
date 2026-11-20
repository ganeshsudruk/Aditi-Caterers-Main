04 - Customer Management Requirements
1. Module Overview
The Customer Management module allows authorized Admin users to view, search, organize, and maintain customer records created through the Aditi Caterers website and booking/enquiry workflow.

The module should provide a centralized customer directory, customer profiles, related booking history, contact information, and internal notes where permitted.

Route: /admin/customers

Module Name: Customer Management

Project: Aditi Caterers Website
2. Objectives
- Maintain a centralized list of customers.
- View customer contact and profile details.
- Find customers quickly using search and filters.
- View a customer's booking and enquiry history.
- Link new enquiries/bookings to an existing customer when appropriate.
- Avoid unnecessary duplicate customer records.
- Allow authorized admins to update customer information.
- Keep customer information secure and accessible only to authorized users.
- Support English and Marathi UI text.
3. Access and Permissions
Only authenticated Admin users with the required permission may access Customer Management.
- Protect the route using admin authentication and authorization middleware.
- Unauthorized users must not be able to access customer records through the UI or API.
- Access to customer details and any export functionality must be permission-controlled.
- Admin actions that modify customer records should be recorded in an audit log where audit logging is available.
4. Customer Management Navigation
Add a Customers item to the Admin Panel sidebar.
- Label: Customers
- Icon: Bootstrap Icon appropriate for people/customer records (for example, bi-people)
- Route: /admin/customers
- Active state must be shown when the Customers page is open.
- The sidebar label must support English and Marathi translations.
5. Customer List Page
5.1 Page Header
Display:
- Page title: Customers
- Short description: Manage customer profiles and view their booking history.
- Optional customer count summary, based on the records available to the admin.
- Add Customer button, if manual customer creation is enabled.
5.2 Customer Table
Display customer records in a clean, responsive table.

Suggested columns:
Column	Description
Customer Name	Customer's display name
Phone Number	Primary contact number
Email	Email address, if provided
Total Bookings	Number of associated bookings
Last Event / Booking Date	Most recent associated event date, if available
Created Date	Date customer record was created
Actions	View, Edit, and permitted actions


- Do not show unavailable values as fabricated data.
- Use a clear placeholder such as — when optional data is missing.
- On smaller screens, use a responsive table, horizontal scroll, or compact customer cards.
- Action buttons must have accessible labels and tooltips where appropriate.
5.3 Search
Provide search functionality for the customer list.

Search should support, where available:
- Customer name
- Phone number
- Email address
Requirements:
- Search input should have a clear placeholder and accessible label.
- Search should ignore leading/trailing whitespace.
- Search behavior should be consistent for partial matches.
- Search must not expose customers outside the current admin's authorized scope.
- Provide a clear/reset search action.
- Search should be handled efficiently on the backend for larger datasets.
5.4 Filters
Provide practical filters if supported by the customer data:
- Customer creation date range
- Customers with bookings / customers without bookings
- Recent activity range
Filters must work together with search and pagination. If a filter is not implemented, do not display an inactive filter control.
5.5 Sorting
Allow sorting by supported fields, such as:
- Customer name
- Created date
- Total bookings
- Last booking/event date
Use a stable sort so records do not jump unpredictably between pages.
5.6 Pagination
- Use server-side pagination for larger datasets.
- Display the current page and total pages or total record count when available.
- Provide Previous and Next controls.
- Preserve search, filters, and sorting when changing pages.
- Reset to the first page when the search/filter criteria change.
- Set a reasonable default page size and allow page-size selection if needed.
6. Customer Profile / Details Page
6.1 Profile Overview
When Admin selects View Customer, open a dedicated details page or profile panel.

Display:
- Customer name
- Primary phone number
- Email address, if available
- Additional contact details, if collected and approved
- Customer record created date
- Last updated date
- Internal customer ID
6.2 Customer Contact Information
The customer profile should display contact information collected through website forms or entered by an authorized Admin.
- Phone number
- Email address (optional)
- Address (only if collected and approved for the project)
- Preferred language, if collected
- Other approved customer fields
Do not add or display sensitive fields that are not required for catering enquiry and booking management.
6.3 Booking and Enquiry History
Show the customer's linked bookings and enquiries in chronological order, with the latest items easy to find.

For each linked record, display available information such as:
- Booking / enquiry reference number
- Event type
- Event date
- Guest count
- Catering service type (With Material / Without Material)
- Booking status
- Created date
- Link to the booking/enquiry details page
The customer profile must link to the Booking Management module (03-booking-management.md).
- Admin can open a booking/enquiry record from the customer profile.
- Booking details should be read from the booking/enquiry record rather than duplicated unnecessarily.
- If there are no linked records, show a clear empty state.
6.4 Customer Notes
If internal notes are enabled:
- Allow authorized Admin users to add notes for internal use.
- Notes must not be visible on the public website or to customers.
- Display note author and created date/time.
- Notes should be editable/deletable only according to permissions and project policy.
- Validate note length and sanitize content.
- Do not use notes to store passwords, payment credentials, or unnecessary sensitive personal information.
7. Create Customer
If manual customer creation is approved, provide an Add Customer action.
7.1 Form Fields
Field	Required	Notes
Customer Name	Yes	Trim and validate
Phone Number	Yes	Validate according to supported phone format
Email	No	Validate format when provided
Address	No	Only if approved for collection
Preferred Language	No	English / Marathi, if required
Internal Notes	No	Optional, internal only


7.2 Form Behavior
- Use clear field labels and inline validation messages.
- Prevent submission while the form is invalid or a request is in progress.
- Show loading state during save.
- Show success feedback after the server confirms creation.
- Show a useful error message if creation fails.
- On successful creation, navigate to the profile or refresh the list as appropriate.
- Before creating a customer, check for a possible existing customer match (such as normalized phone number) and warn the Admin to review it.
7.3 Duplicate Handling
Customer records may be created from website enquiries/bookings or manually.
- Use a normalized phone number as a possible duplicate matching key, subject to business rules.
- Email may be used as an additional duplicate signal if present.
- Do not silently merge customer records.
- If a possible duplicate is found, show the existing customer record and allow the Admin to review.
- Only authorized Admin users may merge duplicate records, if a merge feature is implemented.
- A merge operation must preserve booking/enquiry references and be logged.
- Final duplicate/merge behavior requires business owner approval.
8. Edit Customer
Authorized Admin users may update editable customer fields.
8.1 Editable Fields
- Customer name
- Phone number, subject to validation and duplicate checks
- Email
- Approved address/contact fields
- Preferred language, if supported
8.2 Edit Behavior
- Pre-fill the form with existing data.
- Validate all changed fields.
- Warn about possible duplicate phone/email matches.
- Save only fields that are permitted to be edited.
- Display success or error feedback.
- Update the customer profile and customer list after a successful save.
- Record important changes in audit history, if available.
9. Delete / Archive Customer
Customer deletion should be handled carefully because customer records may be associated with bookings and enquiries.
- Prefer archive/deactivation over permanent deletion.
- Do not permanently delete a customer who has booking/enquiry history without an approved retention and deletion policy.
- If archive functionality is enabled, archived customers should be hidden from the default active list and available through an appropriate filter.
- Admin must receive a confirmation prompt before archiving.
- Archived customer records and associated bookings must remain consistent.
- Permanent deletion, if ever allowed, must be permission-controlled, logged, and comply with approved data-retention requirements.
The exact archive/delete policy is Pending Business Owner Approval.
10. Customer-to-Booking Integration
The Customer Management module must integrate with the booking/enquiry workflow.
- A new public booking/enquiry should associate with an existing customer when a reliable matching rule identifies one.
- If no matching customer is found, the backend may create a customer record according to the approved workflow.
- Customer matching must not rely only on an unverified name.
- Booking records must retain their customer reference.
- Customer profile must display linked booking/enquiry records.
- When Admin creates a booking manually, the Admin should be able to select an existing customer or create a customer as part of the workflow.
- Customer details should be updated only under approved rules; new enquiry data should not automatically overwrite verified profile information without review.
- Booking status changes should remain managed in Booking Management and reflected in the customer booking history.
11. Customer Status and Activity
If customer status is required, use a simple, clearly defined status model, such as:
- Active
- Archived
Avoid adding unsupported labels such as VIP, Frequent Customer, or Lead unless the business owner approves them and the criteria are documented.

Activity indicators may include:
- Customer created
- Customer information updated
- Booking/enquiry linked
- Customer archived/restored
Activity history must not expose internal admin activity to public users.
12. Frontend Requirements
12.1 Technology
- React with Vite
- Bootstrap 5 for layout and UI
- Bootstrap Icons for icons
- React Router for navigation
- Axios for API communication
- Context API or the existing project state-management approach
- Reuse existing admin components and styling conventions
12.2 UI Components
Recommended components:
- CustomersPage
- CustomerTable or CustomerList
- CustomerSearch
- CustomerFilters
- CustomerPagination
- CustomerDetailsPage or CustomerDetailsPanel
- CustomerForm
- CustomerBookingHistory
- CustomerNotesPanel (optional)
- CustomerArchiveConfirmationModal
Do not create duplicate components if reusable equivalents already exist in the Admin Panel.
12.3 UI States
Implement:
- Loading state
- Empty customer list state
- No search results state
- Error state
- Form validation state
- Saving state
- Success feedback
- Archive/restore confirmation state
12.4 Responsive Design
- Desktop: use the available admin content area efficiently.
- Tablet: maintain readable table and usable actions.
- Mobile: use compact cards or responsive table behavior.
- Search, filters, profile details, and actions must remain usable on touch devices.
- Avoid fixed widths that cause the entire page to overflow.
13. Backend Requirements
13.1 Suggested API Endpoints
Use the existing API naming conventions and admin authentication middleware.
Method	Endpoint	Purpose
GET	/api/admin/customers	List customers with search, filters, sorting, and pagination
GET	/api/admin/customers/:id	Get customer profile and related booking/enquiry history
POST	/api/admin/customers	Create a customer, if manual creation is enabled
PUT / PATCH	/api/admin/customers/:id	Update permitted customer fields
PATCH	/api/admin/customers/:id/archive	Archive/deactivate customer, if enabled
PATCH	/api/admin/customers/:id/restore	Restore archived customer, if enabled


Endpoint names and HTTP methods should follow the established project API conventions. Do not implement unsupported endpoints simply because they are listed here.
13.2 API Requirements
- Require authentication for all Admin customer endpoints.
- Validate request parameters and payloads on the backend.
- Return consistent response structures and status codes.
- Support server-side pagination and filtering.
- Handle invalid IDs and missing records gracefully.
- Prevent unauthorized updates.
- Avoid returning unnecessary personal data.
- Use safe database queries and parameter validation.
- Apply rate limiting where appropriate.
- Log server errors without exposing sensitive details to clients.
13.3 Example List Response
The response shape should align with existing project API conventions. An example conceptually:
{
  "success": true,
  "data": {
    "customers": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalRecords": 0,
      "totalPages": 0
    }
  }
}
The example is illustrative; the implementation should use the project's established response format.
14. Suggested MongoDB Customer Schema
Use Mongoose and align the schema with existing models and data flow.

Suggested fields:
Field	Type	Description
name	String	Customer name
phone	String	Primary phone number
normalizedPhone	String	Normalized value used for matching, if implemented
email	String	Optional email
address	String / structured object	Optional, subject to approval
preferredLanguage	String	Optional language preference
notes	String or separate notes collection	Internal notes, if enabled
isArchived	Boolean	Archive state, if implemented
createdAt	Date	Created timestamp
updatedAt	Date	Updated timestamp


Implementation notes:
- Use schema validation and sensible field length limits.
- Normalize phone numbers consistently before matching.
- Do not create a unique constraint on phone until the business rules for shared/changed phone numbers are approved.
- Consider indexes for normalized phone, name, creation date, and archive status based on actual query patterns.
- Booking/enquiry relationships should use stable IDs/references.
- Avoid embedding a growing booking history array inside the customer document if it creates unbounded document growth; query bookings by customer reference instead.
- Apply timestamps and appropriate indexes.
- Keep optional fields absent or null when not provided; do not invent data.
The final schema is subject to the existing backend architecture and business-owner decisions.
15. Security and Privacy
- Customer information must be accessible only to authorized Admin users.
- Validate and sanitize all user input.
- Prevent injection and unsafe query construction.
- Do not expose customer records through public APIs.
- Do not store passwords, payment-card information, or other unnecessary sensitive data in customer records.
- Use HTTPS in deployed environments.
- Follow the project's secure authentication and token handling approach.
- Protect archive, restore, edit, and merge actions with authorization.
- Do not log full customer personal details unnecessarily.
- Follow applicable privacy requirements and the business-approved data retention policy.
16. Localization (English and Marathi)
The Customer Management module must support English and Marathi.
- All page headings, labels, buttons, validation messages, confirmation prompts, empty states, and status labels must use the project's localization approach.
- Switching language should update the UI text without corrupting customer data.
- Customer names and notes must be displayed as stored; do not automatically translate personal names or user-entered notes.
- Use consistent translations with the rest of the Admin Panel.
17. Accessibility
- Use semantic headings, table structures, labels, and buttons.
- Ensure forms are keyboard accessible.
- Provide visible focus states.
- Do not communicate status through color alone.
- Provide accessible names for icon-only buttons.
- Use readable text sizes and sufficient contrast.
- Ensure confirmation dialogs can be operated with keyboard and assistive technologies.
18. Performance
- Use backend pagination instead of loading every customer at once.
- Debounce search input if requests are sent while typing.
- Avoid repeated requests for the same customer profile or booking history where caching is appropriate.
- Use efficient MongoDB indexes based on real query patterns.
- Keep customer profile pages responsive when a customer has a large booking history.
19. Testing Requirements
19.1 Frontend Testing
Test:
- Customer list loads successfully.
- Search by name, phone, and email works as supported.
- Filters and sorting work.
- Pagination preserves criteria.
- Customer profile displays correct details.
- Booking/enquiry history links to correct records.
- Create and edit forms validate inputs.
- Duplicate warning is shown when a potential match exists.
- Archive and restore confirmation behaves correctly if implemented.
- Loading, empty, error, and success states are displayed.
- English and Marathi UI text render correctly.
- Responsive layout works on desktop, tablet, and mobile.
19.2 Backend Testing
Test:
- Admin authentication and authorization.
- Customer list endpoint search, filtering, sorting, and pagination.
- Customer details endpoint and linked booking/enquiry retrieval.
- Create, update, archive, and restore endpoints, if enabled.
- Validation for required and optional fields.
- Invalid customer ID handling.
- Duplicate detection behavior.
- Unauthorized request rejection.
- Safe handling of database and server errors.
- Customer-booking relationship integrity.
20. Acceptance Criteria
The module is complete when:
- [ ] Customers navigation item is available to authorized Admin users.
- [ ] Customer list loads with server-side pagination.
- [ ] Search works for supported customer fields.
- [ ] Filters and sorting work as specified.
- [ ] Admin can open a customer profile.
- [ ] Customer profile displays contact details and linked booking/enquiry history.
- [ ] Admin can open related booking/enquiry records from the customer profile.
- [ ] Customer creation is available if approved and enabled.
- [ ] Customer edit is available to authorized Admin users.
- [ ] Duplicate detection/warning is implemented according to approved rules.
- [ ] Archive/restore is implemented if approved.
- [ ] Loading, empty, error, and success states are handled.
- [ ] UI supports English and Marathi.
- [ ] UI is responsive and accessible.
- [ ] APIs enforce authentication, authorization, validation, and safe handling of customer data.
- [ ] Tests pass and no existing Admin Panel modules are broken.
21. Development Tasks
- [ ] Add Customers navigation item to the Admin sidebar.
- [ ] Implement protected customer routes.
- [ ] Build customer list UI.
- [ ] Implement search, filtering, sorting, and pagination.
- [ ] Build customer profile UI.
- [ ] Integrate booking/enquiry history with Booking Management.
- [ ] Implement create/edit customer forms, if approved.
- [ ] Implement duplicate detection rules.
- [ ] Implement archive/restore, if approved.
- [ ] Create or update Mongoose customer model.
- [ ] Implement customer Admin API endpoints.
- [ ] Add validation, authorization, and error handling.
- [ ] Add localization strings for English and Marathi.
- [ ] Add tests and verify responsive behavior.
- [ ] Update API documentation and project documentation.
22. Suggested Git Branch
feature/admin-customer-management
Branch name may be adjusted to match the team's branch naming convention.
23. Pending Business Owner Decisions
The following items must be confirmed before final implementation:
- Whether Admin can manually create customers.
- Which customer fields should be collected and stored.
- Whether address should be stored.
- Whether preferred language should be stored.
- The duplicate matching rule (phone, email, or both).
- Whether customer records can be archived and restored.
- Whether permanent deletion is permitted and under what retention policy.
- Whether internal customer notes are required.
- Whether customer export is required.
- Whether any customer labels/segments (e.g., VIP) are needed.
- Whether multiple people can share one phone number.
- How customer records should be created from public enquiries and bookings.
Do not assume or hardcode these decisions without business owner approval.
24. Definition of Done
Customer Management is ready for release when:
- All approved requirements are implemented.
- Frontend and backend integration works.
- Customer data and booking/enquiry relationships are correct.
- Access controls and privacy safeguards are verified.
- English and Marathi localization is completed.
- Responsive UI and accessibility checks are completed.
- Relevant tests pass.
- No critical console errors, API errors, or regressions remain.
- Code is reviewed and merged according to the team's workflow.
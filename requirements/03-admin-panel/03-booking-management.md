03 - Booking Management Requirements
1. Document Information
Field	Details
Project	Aditi Caterers Website
Module	Admin Panel
Feature	Booking Management
Suggested file	requirements/03-admin-panel/03-booking-management.md
Status	Draft - requires business-owner approval


2. Purpose
The Booking Management module allows authorized administrators to review, manage, update, and track customer booking requests received through the public website.

The module must provide a clear view of each event request, its catering requirements, communication history, quotation progress, and final booking status.

Important: A customer enquiry is not automatically a confirmed booking. A booking should be marked as confirmed only after the business has reviewed the request and explicitly confirmed it with the customer.
3. Scope
Included
- Booking list and booking details.
- Search, filtering, sorting, and pagination.
- Booking status management.
- Event and catering requirement details.
- Admin notes and customer communication records.
- Booking creation from an approved enquiry.
- Booking updates and cancellation tracking.
- Dashboard booking summaries.
- English and Marathi admin interface support.
- Secure backend APIs and MongoDB persistence.
Not included unless approved
- Online payment collection or refunds.
- Automatic quotation generation.
- Automatic availability confirmation.
- Calendar synchronization with external services.
- Automated SMS or WhatsApp notifications.
- Staff, kitchen, inventory, or delivery scheduling.
These features may be planned separately after the business owner confirms the workflow.
4. Booking Lifecycle
Use the following suggested workflow. The business owner must approve the final statuses before implementation.
1. Pending Review - A request has been received and needs review.
2. Contacted - The team has contacted the customer.
3. Quotation Sent - A quotation has been shared with the customer.
4. Confirmed - The customer and Aditi Caterers have agreed to proceed.
5. Event Completed - The event has taken place and the booking is completed.
6. Cancelled - The booking has been cancelled.
Status rules
- New website submissions should initially be stored as enquiries. They should become bookings only through the approved enquiry-to-booking process.
- A booking must not become Confirmed merely because an admin opened or edited it.
- Require a confirmation action before setting the status to Confirmed.
- Record who changed the status and when.
- Cancellation should capture a reason where available.
- Completed and cancelled records should remain available for historical reference.
- Do not permanently delete bookings through the normal admin interface.
5. Admin Navigation and Access
- Add a Bookings item to the admin sidebar.
- Suggested route: /admin/bookings.
- Suggested detail route: /admin/bookings/:id.
- Only authenticated and authorized admin users may access these routes.
- If role-based permissions are implemented, viewing and editing permissions must be checked on the backend, not only hidden in the UI.
- Unauthenticated users must be redirected to the admin login page.
6. Booking List Page
The list page should display bookings in a clean, responsive table.
Suggested columns
Column	Description
Booking ID	Unique human-readable reference
Customer	Customer name
Mobile	Customer contact number
Event Type	Wedding, Birthday, Engagement, or other submitted type
Event Date	Requested or confirmed event date
Guest Count	Expected number of guests
Catering Type	With Material / Without Material
Status	Current booking status
Updated At	Last modification date
Actions	View, Edit, Update Status


Only show data that exists. Unknown values should display a neutral placeholder such as Not provided.
Row actions
- View booking details.
- Edit permitted booking information.
- Change status according to workflow rules.
- Open a WhatsApp conversation using the customer's verified mobile number, if the admin chooses to do so.
- Do not expose private admin notes or internal data in customer-facing links.
7. Search, Filters, Sorting, and Pagination
Search
Allow administrators to search by:
- Booking ID.
- Customer name.
- Mobile number.
- Event type, where supported.
Search must be performed safely and efficiently on the backend for larger datasets.
Filters
Provide filters for:
- Booking status.
- Event type.
- Catering type.
- Event date range.
- Booking creation date range.
Filter options must be based on supported values and must not silently change a booking's data.
Sorting
Support sorting by:
- Event date.
- Booking creation date.
- Last updated date.
- Customer name.
Pagination
- Use server-side pagination.
- Show the current page and total result count.
- Preserve active filters and search terms when changing pages.
- Provide a useful empty state when no records match.
8. Booking Details Page
The details page should present the booking information in clearly separated sections.
8.1 Booking Summary
- Booking ID.
- Current status.
- Booking creation date.
- Last updated date.
- Assigned admin, if assignment is implemented.
8.2 Customer Information
- Full name.
- Mobile number.
- Email, if provided.
- Preferred contact method, if collected.
- City or event location.
- Full venue address, if provided.
8.3 Event Information
- Event type.
- Event date.
- Event start time, if provided.
- Event end time, if provided.
- Expected guest count.
- Venue name or address.
- Additional event notes.
8.4 Catering Requirements
- Catering type: With Material or Without Material.
- Selected package, if applicable.
- Selected menu items, if applicable.
- Custom menu requirements.
- Dietary or special food requirements.
- Service requirements, if collected.
- Customer's estimated budget, if provided.
Do not assume that every booking uses a package. Support custom requirements where the business accepts them.
8.5 Quotation Information
If quotation tracking is approved, include:
- Quotation status: Not Prepared, Draft, Sent, Accepted, or Rejected.
- Quotation reference number.
- Quotation amount.
- Date sent.
- Valid-until date, if applicable.
- Internal remarks.
Quotation values and terms must be entered or approved by an authorized admin. Do not calculate or invent prices from incomplete booking details.
8.6 Internal Notes
- Allow authorized admins to add internal notes.
- Display note author and creation timestamp.
- Clearly label notes as internal.
- Never include internal notes in customer-facing emails, messages, PDFs, or public API responses.
9. Create Booking from an Enquiry
The preferred flow is to convert a reviewed enquiry into a booking.
1. Admin opens an enquiry.
2. Admin reviews customer, event, and catering details.
3. Admin selects Create Booking.
4. The system pre-fills available enquiry information.
5. Admin reviews and corrects the information.
6. Admin saves the booking.
7. The system creates a booking record and links it to the original enquiry.
8. The system records the admin and timestamp responsible for conversion.
Validation
- Prevent accidental duplicate conversion of the same enquiry.
- If a booking already exists for the enquiry, show the existing booking reference.
- Do not discard the original enquiry.
- Clearly identify fields that still need customer confirmation.
10. Create Booking Manually
If the business needs to accept bookings from phone calls or walk-in customers, an authorized admin may create a booking manually.

Required fields should be limited to information necessary to create a useful record, such as:
- Customer name.
- Mobile number.
- Event type.
- Event date, when known.
- Guest count, when known.
- Catering type, when known.
Other details may be completed later. The form must distinguish required fields from optional fields.

For manually created records, store the source as Admin Created and record the creating admin.
11. Edit Booking
Authorized admins may update booking details when the customer provides new information.
- Validate all editable fields on both frontend and backend.
- Preserve the booking ID and original creation timestamp.
- Record the admin and timestamp for updates.
- Important changes, such as event date, guest count, catering type, quotation amount, or status, should be included in the audit history.
- Show a confirmation prompt before saving significant changes.
- Do not allow invalid dates, negative guest counts, malformed mobile numbers, or unsupported status values.
12. Booking Status Management
Provide a clear status control on the list and details pages.
Suggested behavior
- Show the current status clearly.
- Offer only valid status options.
- Ask for confirmation before marking a booking Confirmed or Cancelled.
- Ask for a cancellation reason when cancelling, if available.
- Record previous status, new status, changed by, timestamp, and optional reason.
- Display a status history timeline on the details page.
The backend must enforce allowed status transitions. Frontend restrictions alone are not sufficient.
13. Communication Tracking
The module may provide links or records to help admins track customer communication.
Suggested communication log fields
- Communication channel: Phone, WhatsApp, Email, or Other.
- Communication date and time.
- Admin who handled the communication.
- Short summary.
- Follow-up date, if required.
WhatsApp shortcut
- Provide a WhatsApp link only when a valid customer mobile number is available.
- Normalize the number to the correct international format before creating the link.
- For Indian numbers, use the country code 91 only when the number is confirmed to be an Indian mobile number.
- Open WhatsApp in a new tab or the installed app.
- Do not send messages automatically without explicit admin action.
Automated messaging requires a separate approved integration and consent/compliance review.
14. Booking Calendar (Optional)
A calendar view may be added if the business owner finds it useful.
- Display bookings by event date.
- Allow month and week views.
- Use status labels that remain understandable without relying on color alone.
- Selecting an event should open its booking details.
- Clearly distinguish confirmed bookings from pending requests.
- Do not treat a calendar entry as proof that the business has availability.
- Avoid promising that a date is available unless a separate, approved availability-management process exists.
15. Notifications and Reminders (Optional)
Possible future enhancements:
- Admin notification when a new booking is created.
- Reminder for bookings approaching their event date.
- Follow-up reminders for quotations awaiting a response.
- Customer confirmation messages after an admin confirms the booking.
Before implementation, confirm the notification channel, message templates, consent requirements, provider, cost, and failure-handling process. Notifications must not be claimed as sent unless the provider confirms success.
16. Booking Data Model
Suggested MongoDB collection: bookings.

Example logical structure:
{
  bookingNumber: "AC-2026-0001",
  enquiryId: ObjectId, // optional reference to the source enquiry

  customer: {
    name: String,
    mobile: String,
    email: String
  },

  event: {
    type: String,
    date: Date,
    startTime: String,
    endTime: String,
    guestCount: Number,
    venueName: String,
    venueAddress: String,
    city: String
  },

  catering: {
    type: String, // WITH_MATERIAL or WITHOUT_MATERIAL
    packageId: ObjectId,
    menuItems: [String],
    specialRequirements: String
  },

  quotation: {
    status: String,
    referenceNumber: String,
    amount: Number,
    sentAt: Date,
    validUntil: Date
  },

  status: String,
  cancellationReason: String,
  internalNotes: [
    {
      message: String,
      createdBy: ObjectId,
      createdAt: Date
    }
  ],

  communicationLogs: [
    {
      channel: String,
      summary: String,
      followUpAt: Date,
      createdBy: ObjectId,
      createdAt: Date
    }
  ],

  source: String, // WEBSITE_ENQUIRY or ADMIN_CREATED
  createdBy: ObjectId,
  updatedBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
This is a proposed structure, not a finalized schema. Confirm whether packages and menu items should be stored as references, snapshots, or both. Store a snapshot of agreed booking details where historical accuracy is important.
Data validation
- bookingNumber must be unique.
- customer.name must be a valid non-empty string.
- Mobile number must be validated and normalized.
- event.guestCount, when provided, must be a positive integer.
- Event date must be valid.
- Catering type must use an approved enum.
- Status and quotation status must use approved enums.
- Monetary values must be non-negative and use the currency configured for the business.
- Optional fields must accept missing values without breaking the record.
17. Booking Number Generation
Generate a unique, readable booking reference on the backend.

Suggested format: AC-YYYY-0001.

Requirements:
- Generate the number safely on the server.
- Prevent duplicate numbers during concurrent booking creation.
- Enforce a unique database index.
- Do not rely only on frontend-generated numbers.
- Do not reuse booking numbers after cancellation or deletion.
The final reference format may be changed with owner approval.
18. Backend API Requirements
Suggested REST API endpoints:
Method	Endpoint	Purpose
GET	/api/admin/bookings	Get paginated bookings with filters
GET	/api/admin/bookings/:id	Get booking details
POST	/api/admin/bookings	Create a manual booking
POST	/api/admin/bookings/from-enquiry/:enquiryId	Convert an enquiry into a booking
PUT	/api/admin/bookings/:id	Update booking information
PATCH	/api/admin/bookings/:id/status	Update booking status
POST	/api/admin/bookings/:id/notes	Add an internal note
POST	/api/admin/bookings/:id/communications	Add a communication log
GET	/api/admin/bookings/:id/history	Get booking activity history
GET	/api/admin/bookings/summary	Get dashboard booking summary


API response requirements
- Use consistent JSON response structures.
- Return appropriate HTTP status codes.
- Validate route parameters, query parameters, and request bodies.
- Return useful validation errors without exposing stack traces.
- Apply pagination limits.
- Do not return password hashes, private tokens, or unnecessary internal fields.
- Keep internal notes and admin-only data restricted to authorized admin endpoints.
19. Dashboard Integration
The admin dashboard may show:
- Total active bookings.
- Pending review bookings.
- Confirmed bookings.
- Upcoming confirmed events.
- Recently updated bookings.
- Cancelled bookings, if useful.
All counts must come from actual database records and follow clearly defined date and status rules. Avoid hardcoded or sample statistics in production.
20. Frontend Components
Suggested React components:
src/
  pages/
    admin/
      bookings/
        BookingListPage.jsx
        BookingDetailsPage.jsx
        BookingCreatePage.jsx
        BookingEditPage.jsx
  components/
    admin/
      bookings/
        BookingTable.jsx
        BookingFilters.jsx
        BookingSearch.jsx
        BookingStatusBadge.jsx
        BookingDetailsCard.jsx
        BookingStatusHistory.jsx
        BookingNotes.jsx
        CommunicationLog.jsx
        BookingForm.jsx
        BookingPagination.jsx
Component names and folder structure may be adjusted to match the existing project architecture.
21. UI and UX Requirements
- Use Bootstrap 5 components and utility classes where practical.
- Use Bootstrap Icons for interface icons; do not use emojis as UI icons.
- Maintain a clean, professional admin design.
- Keep forms compact, readable, and grouped by purpose.
- Use clear labels and validation messages.
- Provide loading, empty, error, and success states.
- Use confirmation dialogs for important actions.
- Use pagination rather than loading an unlimited number of records.
- Do not rely on color alone to communicate status.
- Support keyboard navigation and visible focus states.
22. Responsive Requirements
- Desktop: show the full booking table and filters.
- Tablet: allow horizontal table scrolling or an appropriate compact layout.
- Mobile: use stacked booking cards or a carefully designed responsive table.
- Keep booking actions accessible on smaller screens.
- Ensure forms and dialogs fit within the viewport.
- Avoid horizontal overflow on the overall page.
23. Language Support
The admin interface should support English and Marathi.
- Translate navigation, labels, buttons, statuses, validation messages, and empty states.
- Store status values using stable language-independent codes.
- Translate status labels at display time.
- Customer-provided names, notes, addresses, and messages must remain unchanged.
- Do not automatically translate customer-entered information.
Suggested status codes:
PENDING_REVIEW
CONTACTED
QUOTATION_SENT
CONFIRMED
EVENT_COMPLETED
CANCELLED
24. Security and Privacy
- Protect all admin booking APIs with authentication.
- Enforce authorization on the backend.
- Validate and sanitize all incoming data.
- Use secure session or token handling according to the project's authentication architecture.
- Apply rate limiting to sensitive endpoints.
- Do not expose booking details publicly through predictable IDs.
- Avoid logging full customer contact details unnecessarily.
- Restrict internal notes and communication logs to authorized admins.
- Use HTTPS in production.
- Back up booking data according to the agreed operational policy.
- Define data retention and deletion procedures with the business owner.
- Follow applicable privacy and messaging requirements before sending customer communications.
25. Audit History
Maintain an audit trail for important booking actions.

Record at least:
- Booking created.
- Booking details updated.
- Status changed.
- Quotation status or amount updated, if quotation tracking is enabled.
- Booking cancelled.
- Internal note added.
Each audit entry should include the action, relevant changed fields, admin user ID, and timestamp. Avoid storing unnecessary copies of sensitive customer information in audit logs.
26. Error Handling
The interface must handle:
- Booking not found.
- Invalid booking ID.
- Duplicate enquiry conversion.
- Validation failure.
- Unauthorized or expired admin session.
- Network or server failure.
- Concurrent updates.
- Failed communication or notification integration, if enabled.
Show understandable messages and preserve unsaved form data where practical. Do not silently discard changes.
27. Testing Requirements
Functional testing
- Admin can view the booking list.
- Search, filters, sorting, and pagination work correctly.
- Admin can open booking details.
- Admin can create a manual booking.
- Admin can convert an enquiry without creating duplicates.
- Admin can edit permitted fields.
- Status transitions follow backend rules.
- Cancellation reason is captured where required.
- Notes and communication logs are saved and displayed correctly.
- Dashboard counts match database records.
Validation and security testing
- Invalid mobile numbers are rejected.
- Invalid event dates are rejected.
- Guest count cannot be zero or negative when supplied.
- Unsupported status values are rejected.
- Unauthenticated requests are blocked.
- Unauthorized admin actions are blocked.
- Internal notes are not exposed to public endpoints.
- Duplicate booking numbers cannot be created.
- Concurrent updates are handled safely.
Responsive and accessibility testing
- Test desktop, tablet, and mobile layouts.
- Test keyboard navigation.
- Verify labels and error messages are accessible.
- Verify status information is understandable without color.
28. Acceptance Criteria
The module is ready for review when:
- Authorized admins can access the booking module.
- The list displays real booking records from MongoDB.
- Search, filters, sorting, and pagination work.
- Booking details show customer, event, and catering information.
- Admins can create and update bookings according to permissions.
- Enquiry conversion does not create duplicate bookings.
- Booking status changes are validated and recorded.
- Internal notes remain private.
- Booking references are unique.
- English and Marathi labels are supported.
- The module works on desktop, tablet, and mobile.
- Loading, empty, validation, and error states are implemented.
- Required tests pass.
29. Pending Business-Owner Decisions
Confirm these items before final implementation:
1. Should every website enquiry be reviewed first, or can some enquiries become bookings directly?
2. Which booking statuses should be used in the final workflow?
3. Who is allowed to mark a booking as Confirmed?
4. Is quotation tracking required inside the admin panel?
5. Should admins be able to create bookings from phone or walk-in requests?
6. Is a calendar view required?
7. Are follow-up reminders required?
8. Should the system send customer confirmations through WhatsApp, SMS, or email?
9. Should bookings support advance payments and payment tracking in a future module?
10. What booking data retention policy should be followed?
Until these decisions are approved, implement only the core booking workflow and keep optional features disabled.
30. Definition of Done
- [ ] Booking list and details pages are implemented.
- [ ] Backend APIs and MongoDB schema are implemented.
- [ ] Search, filters, sorting, and pagination are implemented.
- [ ] Manual booking creation is implemented if approved.
- [ ] Enquiry-to-booking conversion is implemented.
- [ ] Booking editing and status workflow are implemented.
- [ ] Internal notes and audit history are implemented.
- [ ] Authentication and backend authorization are verified.
- [ ] English and Marathi UI text is added.
- [ ] Responsive layouts are tested.
- [ ] Functional, validation, and security tests pass.
- [ ] Business owner has reviewed and approved the workflow.
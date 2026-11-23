04. Booking API Requirements
Project: Aditi Caterers Website
Folder: 04-backend/
File: 04-booking-api.md
Backend: Node.js + Express.js
Database: MongoDB Atlas + Mongoose
API Style: REST API, versioned under /api/v1
1. Document Purpose
This document defines the backend API requirements for managing customer event booking requests for Aditi Caterers.

The public website allows visitors to submit an event enquiry or booking request. The Admin Panel allows authorized staff to review requests, contact customers, update booking progress, and manage event information.

Important: A public booking submission is a request, not a confirmed booking. A request must not be presented as confirmed until an authorized admin explicitly confirms it according to the approved business process.
2. Objectives
The Booking API must:
1. Accept booking requests from the public website.
2. Validate customer and event information on the backend.
3. Store booking requests in MongoDB.
4. Associate requests with customer records where appropriate.
5. Allow authorized admins to view, search, filter, and manage bookings.
6. Maintain clear booking statuses and status history.
7. Support English and Marathi user-facing messages and admin workflows.
8. Protect customer information.
9. Prevent common duplicate and spam submissions.
10. Provide consistent API responses and reliable error handling.
3. Booking Scope
The API supports requests for catering services such as:
- Wedding events.
- Birthday events.
- Engagement events.
- Other event types approved by the business.
Service type options:
- with_material
- without_material
The business owner must approve the final list of event types and service options. Do not assume that every option is available for every date, location, guest count, or event.

The API records a customer's request. It does not guarantee availability, pricing, or service confirmation.
4. API Base URL
Use the versioned API prefix:
/api/v1
Local example:
http://localhost:5000/api/v1
Production frontend must read the deployed API base URL from its environment configuration.
5. Access Control
API Operation	Access
Submit booking request	Public, rate-limited
View own booking status	Not included unless a secure customer lookup/portal is separately approved
List all bookings	Authenticated admin with permission
View booking details	Authenticated admin with permission
Update booking details	Authenticated admin with permission
Change booking status	Authenticated admin with permission
Archive/cancel booking	Authenticated admin with permission
Export booking records	Authorized admin with export permission


Do not expose a public endpoint that returns all bookings or allows a visitor to retrieve private booking information using only a sequential ID.
6. Booking Data Model
Create a Mongoose model, for example:

src/models/Booking.js

Suggested schema:
{
  bookingNumber: {
    type: String,
    unique: true,
    index: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer"
  },
  customer: {
    fullName: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true }
  },
  event: {
    eventType: { type: String, required: true },
    eventDate: { type: Date, required: true },
    startTime: String,
    endTime: String,
    guestCount: { type: Number, min: 1 },
    venueName: String,
    venueAddress: String
  },
  serviceType: {
    type: String,
    enum: ["with_material", "without_material"],
    required: true
  },
  requestedMenu: [String],
  customerMessage: { type: String, maxlength: 3000 },
  status: {
    type: String,
    enum: [
      "new", "contacted", "quotation_sent",
      "confirmed", "event_completed", "cancelled"
    ],
    default: "new"
  },
  statusHistory: [{
    status: String,
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser"
    },
    note: String,
    changedAt: Date
  }],
  internalNotes: [{
    note: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser"
    },
    createdAt: Date
  }],
  source: { type: String, default: "website" }
}
This is an illustrative starting point. Final fields, event types, status transitions, and required/optional rules must match the approved business workflow.
7. Customer Data Requirements
The public form should collect only information needed to respond to the request.
Field	Required	Notes
Full name	Yes	Trimmed, length-limited
Phone number	Yes	Validate accepted format
Email	No, unless owner requires it	Validate if provided
Event type	Yes	Must match approved options
Event date	Yes	Must be a valid date
Guest count	Optional or required by owner	Positive integer if provided
Service type	Yes	With Material / Without Material
Venue/location	Optional or required by owner	Do not assume business service coverage
Menu preferences	Optional	Plain text or approved item references
Additional message	Optional	Length-limited


Do not request payment card details, identity documents, or unrelated personal information through the booking form.
8. Booking Number Generation
Each request may receive a human-readable booking reference.

Requirements:
- Generate the reference on the backend.
- Ensure uniqueness using a database unique index.
- Do not use the MongoDB ObjectId as the only customer-facing reference.
- Do not derive a booking number solely from the current timestamp without collision protection.
- Do not expose internal database identifiers unnecessarily.
- Define the final prefix and format with the business owner.
Example format (illustrative only):
AC-BKG-2026-00001
The exact format and sequence-generation strategy must be confirmed before production. If a counter collection is used, handle concurrent requests safely.
9. Public Booking Submission API
Endpoint
POST /api/v1/bookings
Access: Public, rate-limited.
Request Example
{
  "customer": {
    "fullName": "Sample Customer",
    "phoneNumber": "9876543210",
    "email": "customer@example.com"
  },
  "event": {
    "eventType": "wedding",
    "eventDate": "2026-12-20",
    "startTime": "18:00",
    "guestCount": 100,
    "venueName": "Sample Venue",
    "venueAddress": "Sample City"
  },
  "serviceType": "with_material",
  "requestedMenu": [],
  "customerMessage": "Please contact me about catering."
}
All names, dates, addresses, and contact details in this example are placeholders, not actual customer or business information.
Success Response
Use 201 Created when the request has been stored successfully.
{
  "success": true,
  "message": "Your booking request has been submitted. Our team will contact you after reviewing it.",
  "data": {
    "bookingNumber": "AC-BKG-2026-00001",
    "status": "new"
  }
}
The response must clearly communicate that the request is received, not confirmed.

Do not return internal notes, admin IDs, or private customer records.
10. Public Submission Validation
The backend must validate:
- Full name is present and within configured length limits.
- Phone number is present and matches the accepted format.
- Email is valid if provided.
- Event type belongs to the approved list.
- Event date is valid and follows the approved past-date policy.
- Guest count is a positive integer when provided.
- Service type is one of the approved values.
- Time fields follow the selected format.
- End time is later than start time when both are provided.
- Message and venue fields respect length limits.
- Unknown or unexpected fields are rejected or safely ignored according to the API validation policy.
Do not trust the browser's validation. Validate all fields on the server.
11. Duplicate and Spam Submission Protection
Implement reasonable protections for the public endpoint:
- Rate limit by IP and other appropriate signals.
- Validate and normalize phone/email values.
- Consider a duplicate-detection window based on customer contact, event date, and other relevant fields.
- If an idempotency key is used, store and validate it safely.
- Consider a honeypot or CAPTCHA only if spam volume justifies it.
- Avoid blocking legitimate customers who submit a corrected request.
- Do not silently discard a request that may be legitimate.
- Log spam/security events without exposing personal details.
A duplicate match should be handled consistently and should not accidentally reveal another customer's booking information.
12. Customer Association
When a public request is received:
1. Normalize the submitted contact details.
2. Search for an existing customer using the approved matching rule.
3. Associate the booking with that customer if a reliable match exists.
4. Otherwise create a customer record or defer customer creation according to the customer module design.
5. Keep the submitted customer details as an appropriate request snapshot if required.
6. Avoid creating multiple customer records for the same person due to formatting differences.
The business owner must approve whether phone number, email, or a combination is the primary customer matching key.

Do not merge records automatically when the match is uncertain.
13. Admin Booking List API
Endpoint
GET /api/v1/admin/bookings
Access: Authenticated admin with booking.read.

Supported query parameters may include:
?page=1&limit=10&status=new&eventType=wedding&serviceType=with_material&fromDate=2026-12-01&toDate=2026-12-31&search=customer&sortBy=createdAt&sortOrder=desc
Requirements:
- Validate all query parameters.
- Whitelist filter and sort fields.
- Enforce a maximum page size.
- Search only approved fields.
- Do not accept raw MongoDB query operators.
- Return a consistent pagination structure.
Response Example
{
  "success": true,
  "message": "Bookings retrieved successfully",
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalRecords": 0,
      "totalPages": 0
    }
  }
}
14. Admin Booking Details API
Endpoint
GET /api/v1/admin/bookings/:bookingId
Access: Authenticated admin with booking.read.

Requirements:
- Validate the MongoDB ObjectId or use an approved booking-number lookup route.
- Return the booking details required by the admin role.
- Include customer, event, service, status, and permitted history information.
- Include internal notes only for roles with the relevant permission.
- Return 404 when the record does not exist.
- Do not expose password, token, or unrelated customer information.
15. Update Booking Details API
Endpoint
PATCH /api/v1/admin/bookings/:bookingId
Access: Authenticated admin with booking.update.

Editable fields may include customer contact details, event type, event date/time, guest count, venue information, service type, menu preferences, and permitted customer-facing notes.

Requirements:
1. Validate the record ID.
2. Validate every changed field.
3. Use an allowlist of editable fields.
4. Prevent updates to protected fields such as booking number, system timestamps, and status history through this endpoint.
5. Record the admin responsible for the change where audit requirements apply.
6. Return the updated safe booking representation.
7. Do not overwrite fields omitted from the request.
Status changes must use the dedicated status endpoint.
16. Booking Status Workflow
Suggested statuses:
Status	Meaning
new	Request received; not yet reviewed
contacted	Team has contacted the customer
quotation_sent	A quotation has been issued
confirmed	Authorized admin has confirmed the event
event_completed	Event has been completed
cancelled	Request/booking has been cancelled


These are machine-readable values. Display labels must be localized in the frontend.
Important Rules
- New public requests start as new.
- A quotation being issued does not automatically change the booking to confirmed.
- A customer accepting a quotation does not automatically confirm the booking unless an approved workflow explicitly says so.
- Only an authorized admin may set confirmed.
- A cancelled booking must not silently return to confirmed.
- Reopening or reversing a status requires an explicitly approved transition.
- Every status change must record actor, time, previous status, new status, and an optional note.
The final transition matrix must be approved by the business owner.
17. Update Booking Status API
Endpoint
PATCH /api/v1/admin/bookings/:bookingId/status
Access: Authenticated admin with booking.update or a dedicated status permission.
Request Example
{
  "status": "contacted",
  "note": "Customer was contacted."
}
Requirements:
1. Validate the requested status.
2. Load the current booking status.
3. Check whether the transition is allowed.
4. Check the admin's permission.
5. Update the status.
6. Append a status-history entry.
7. Record the actor and timestamp using authenticated identity and server time.
8. Write an audit event if audit logging is enabled.
9. Return the updated booking status and history summary.
Do not allow a client to submit its own changedBy or changedAt values.
18. Internal Notes API
Endpoint
POST /api/v1/admin/bookings/:bookingId/notes
Access: Authenticated admin with the appropriate booking-note permission.

Example request:
{
  "note": "Customer requested a follow-up discussion."
}
Requirements:
- Validate note length.
- Record the authenticated admin ID and server timestamp.
- Do not expose internal notes through public APIs.
- Restrict reading and editing according to the permission matrix.
- Preserve note history where required; do not silently overwrite an existing note.
19. Cancel or Archive Booking API
The project must distinguish cancellation from archival.

Suggested cancellation endpoint:
PATCH /api/v1/admin/bookings/:bookingId/status
with an approved cancelled status and required reason where the owner requests it.

Optional archive endpoint:
PATCH /api/v1/admin/bookings/:bookingId/archive
Requirements:
- Do not permanently delete a booking by default.
- Record the reason and admin actor where required.
- Keep archived records out of ordinary active lists by default.
- Allow authorized admins to find archived records.
- Define how archived and cancelled records appear in reports.
20. Booking Search and Filters
The admin list should support relevant filters:
- Booking number.
- Customer name.
- Phone number, with access restricted by role.
- Event type.
- Event date range.
- Booking creation date range.
- Guest count range.
- Service type.
- Booking status.
- Archived state, if implemented.
Requirements:
- Validate search text and date ranges.
- Use indexed fields for common queries.
- Avoid unbounded regular-expression searches.
- Apply role-based field visibility.
- Return paginated results.
- Do not expose private fields in list rows unnecessarily.
21. Booking Reports and Export Integration
The Booking API may provide data to the Reports module.

Requirements:
- Keep report aggregation logic in the report module/service.
- Apply the same access controls as booking records.
- Support approved date and status filters.
- Restrict export to users with report.export or the approved equivalent.
- Do not expose customer contact information in exports unless the user's role allows it.
- Record export actions where required.
- Do not treat enquiry count, confirmed booking count, and completed event count as the same metric.
22. Notifications
After a public request is successfully saved, the system may send a customer acknowledgement or an internal admin notification if an approved provider is configured.

Requirements:
- Database save must not depend on a third-party notification provider being available.
- Use a queue or retryable background process if delivery reliability is required.
- Record delivery status only if notification tracking is implemented.
- Do not claim an SMS, email, or WhatsApp message was sent unless the provider confirms the result.
- Keep provider credentials in backend environment configuration.
- Use owner-approved message templates in English and Marathi.
- Do not include unnecessary customer personal data in notifications.
Notification providers, costs, templates, and delivery promises are pending approval.
23. Bilingual API and Frontend Behavior
The backend must store bilingual content where the booking module requires it, but machine-readable status values remain language-neutral.

Requirements:
- Support en and mr for approved user-facing messages.
- The frontend must localize labels, form validation, status names, and confirmation messages.
- Store customer-provided text as submitted; do not silently translate it.
- If the API accepts a language preference for message selection, validate it against supported values.
- Do not duplicate a booking merely because a customer changes the UI language.
- Keep booking references and status codes stable across languages.
24. Security and Privacy Requirements
- Protect every admin booking endpoint with authentication and authorization.
- Rate-limit public booking submission.
- Validate and sanitize all input.
- Use HTTPS in production.
- Restrict CORS to approved frontend origins.
- Never expose internal notes in public responses.
- Never expose all customer bookings publicly.
- Do not log full request bodies containing personal information.
- Restrict customer phone/email visibility according to admin permissions.
- Use secure database credentials and least-privilege access.
- Avoid trusting frontend-submitted status, booking number, actor, or timestamps.
- Follow owner-approved retention and deletion rules.
25. Error Handling
Use consistent HTTP status codes:
Situation	HTTP Status
Booking request created	201
Successful read/update	200
Invalid request data	400
Missing/invalid admin authentication	401
Insufficient permission	403
Booking not found	404
Duplicate/conflicting request	409
Rate limit exceeded	429
Unexpected server error	500


Return a consistent response body:
{
  "success": false,
  "message": "A clear and safe error message",
  "errors": []
}
Do not return stack traces or raw MongoDB errors to the client in production.
26. Suggested Backend File Structure
src/
├── models/
│   ├── Booking.js
│   └── Customer.js
├── routes/
│   └── booking.routes.js
├── controllers/
│   └── booking.controller.js
├── services/
│   └── booking.service.js
├── validators/
│   └── booking.validator.js
├── middleware/
│   ├── auth.middleware.js
│   ├── authorize.middleware.js
│   └── validate.middleware.js
└── utils/
    └── booking-number.js
Use existing shared middleware and utilities rather than creating duplicate implementations.
27. API Endpoint Summary
Method	Endpoint	Access	Purpose
POST	/api/v1/bookings	Public, rate-limited	Submit booking request
GET	/api/v1/admin/bookings	Admin: booking.read	List bookings
GET	/api/v1/admin/bookings/:bookingId	Admin: booking.read	Booking details
PATCH	/api/v1/admin/bookings/:bookingId	Admin: booking.update	Update booking details
PATCH	/api/v1/admin/bookings/:bookingId/status	Admin: status permission	Change booking status
POST	/api/v1/admin/bookings/:bookingId/notes	Admin: note permission	Add internal note
PATCH	/api/v1/admin/bookings/:bookingId/archive	Admin: archive permission	Archive booking, if enabled


Implement only endpoints that are supported by the approved booking workflow and permission matrix.
28. Testing Requirements
Public API Tests
- Valid booking request is saved.
- Missing required customer data is rejected.
- Invalid phone/email is rejected.
- Invalid event type is rejected.
- Invalid date/time is rejected.
- Invalid service type is rejected.
- Guest count validation works.
- Oversized message is rejected.
- Rate limiting works.
- Duplicate protection behaves as documented.
- Success response does not claim confirmation.
- Public response does not expose internal IDs or notes.
Admin API Tests
- Unauthenticated list request returns 401.
- Admin without permission receives 403.
- Authorized admin can list and view bookings.
- Invalid booking ID is handled safely.
- Missing booking returns 404.
- Search and filters work.
- Pagination and sorting are validated.
- Updates modify only allowed fields.
- Status transition rules are enforced.
- Status history records the authenticated actor and server timestamp.
- Internal notes are not exposed publicly.
- Archive/cancel behavior follows the approved rules.
Integration Tests
- Customer association follows the approved matching rule.
- Booking number uniqueness is maintained under concurrent requests.
- Database failures are handled safely.
- Notification provider failure does not undo a successfully stored request.
- Audit records are created for required actions.
Use a separate test database and test customer data.
29. Acceptance Criteria
- [ ] Public booking submission endpoint is implemented.
- [ ] Public requests are stored with initial status new.
- [ ] The response clearly says the request is not confirmed.
- [ ] Customer and event fields are validated on the backend.
- [ ] Approved event types and service types are enforced.
- [ ] Booking reference generation is unique and server-controlled.
- [ ] Duplicate/spam protection is implemented.
- [ ] Customer association follows an approved matching rule.
- [ ] Admin booking routes require authentication and permissions.
- [ ] Admin list supports validated filters and pagination.
- [ ] Booking detail endpoint protects private fields.
- [ ] Booking updates use an allowlist of editable fields.
- [ ] Status changes use a dedicated endpoint and transition validation.
- [ ] Status history records actor and server timestamp.
- [ ] Internal notes are private to authorized admins.
- [ ] Cancellation and archival are handled according to approved rules.
- [ ] Public APIs do not expose private booking data.
- [ ] English and Marathi UI behavior is supported.
- [ ] Notification integration failures do not lose booking requests.
- [ ] Automated tests pass in an isolated test environment.
30. Definition of Done
The Booking API is complete when:
1. A visitor can submit a valid booking request.
2. The backend validates and stores the request.
3. The response clearly indicates that the request is awaiting review.
4. An authorized admin can list and view requests.
5. Admins can update permitted booking details.
6. Status transitions are validated and recorded.
7. Customer information and internal notes are protected.
8. Search, filters, and pagination work.
9. Relevant audit and notification behavior is verified.
10. English and Marathi frontend integration is tested.
11. Automated tests pass.
12. The implementation is reviewed and merged.
31. Pending Business Decisions
Confirm before final implementation:
- Final event type options.
- Whether guest count is required.
- Whether venue address is required at submission.
- Whether event dates in the past are rejected.
- Accepted phone number formats and country support.
- Customer matching key: phone, email, or both.
- Booking reference format and sequence policy.
- Final status transition matrix.
- Who can confirm or cancel a booking.
- Whether cancellation requires a reason.
- Whether archive functionality is needed.
- Whether customers can securely check request status.
- Whether email, SMS, or WhatsApp notifications are required.
- Approved notification provider and message templates.
- Customer data retention period.
- Admin role permissions for customer contact details and exports.
Do not invent availability, package prices, advance payment rules, cancellation fees, service-area coverage, or response-time promises. Record owner-approved policies in the relevant module documents.
End of Document
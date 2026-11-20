11 – Contact Page Requirements
1. Document Information
- Project: Aditi Caterers Website
- Document: Contact Page Requirements
- File Name: 11-contact-page-requirements.md
- Page Route: /contact
- Languages: English and Marathi
- Status: Draft – pending business-owner confirmation for unconfirmed details
2. Purpose
The Contact Page must make it easy for prospective customers to contact Aditi Caterers, ask questions, and submit catering enquiries for weddings, birthdays, engagements, corporate functions, and other events.

The page must provide clear contact options, location information (when confirmed), and a simple enquiry form. The enquiry form must collect enough information for the catering team to respond and prepare an initial quotation.
3. Goals
- Make contact details easy to find and use on desktop and mobile.
- Offer phone, WhatsApp, and enquiry-form contact options.
- Collect structured event and catering information.
- Support English and Marathi content.
- Validate submitted information and show clear success/error feedback.
- Save enquiries securely in the backend database.
- Allow authorized admins to view, manage, and update enquiry statuses.
- Avoid promising availability, prices, or services until the business confirms them.
4. Page Layout and UI
4.1 Page Header
Display:
- Page title: Contact Us
- Supporting text inviting visitors to contact Aditi Caterers for event catering enquiries.
- Breadcrumb: Home > Contact
Suggested copy:
Have an upcoming celebration or event? Contact Aditi Caterers to discuss your catering requirements. Share your event details and our team will get in touch.

Marathi copy must be provided for all user-facing text and managed through the website's language system.
4.2 Contact Information Section
Display contact information in clean cards or rows. Each item should be visible, readable, and actionable.

Information fields:
- Business name: Aditi Caterers
- Phone number: +91 9975959391 (provided project contact; confirm before production publishing)
- WhatsApp contact: https://wa.me/919975959391 (confirm before production publishing)
- Email address: Pending owner confirmation
- Business address: Pending owner confirmation
- Business hours: Pending owner confirmation
Actions:
- Phone: use a tel: link on supported devices.
- WhatsApp: open a WhatsApp chat using the configured business number.
- Email: use a mailto: link only after the official email is confirmed.
- Address: show a map/directions link only after the correct address or map pin is confirmed.
Do not display placeholder email, address, opening hours, or map location as if they were verified.
4.3 Contact / Enquiry Form
Provide a responsive form with the following fields.
Required fields
- Full Name
- Mobile Number
- Event Type
- Event Date (if known)
- Number of Guests
- Catering Service Type (With Material / Without Material)
- City or Event Location
- Message / Requirements
Optional fields
- Email Address
- Venue / Full Event Address
- Preferred Contact Method (Phone / WhatsApp)
- Approximate Budget (optional; ranges may be configured by the owner)
Field behavior and controls
- Full Name: text input; trim whitespace.
- Mobile Number: input suitable for Indian mobile numbers; validate format; do not assume all enquiries are from India if international support is later required.
- Email: validate only if entered.
- Event Type: dropdown, including Wedding, Birthday, Engagement, Corporate Event, Other. Admin should be able to configure options if desired.
- Event Date: date picker; allow unknown dates using an “Date not decided yet” option.
- Number of Guests: positive integer; allow an owner-approved maximum or reasonable validation limit.
- Catering Service Type: required choice of “With Material” or “Without Material”.
- City / Event Location: text input.
- Venue / Full Event Address: optional text area or input.
- Preferred Contact Method: optional choice of Phone or WhatsApp.
- Approximate Budget: optional range selector or “Not decided”.
- Message / Requirements: textarea for additional information.
Do not make budget, email, or venue address required unless the owner specifically approves that change.
5. Form UX Requirements
- Use clear field labels and short helper text where needed.
- Indicate required fields visibly.
- Use appropriate HTML input types (tel, email, date, number) where applicable.
- Keep the form easy to complete on mobile.
- Prevent accidental duplicate submissions while a request is processing.
- Preserve entered values if submission fails.
- Display inline validation messages near the relevant fields.
- Move focus to the first invalid field when practical.
- Ensure labels are associated with inputs.
- Do not rely on color alone to communicate errors.
- Use accessible keyboard navigation and visible focus styles.
6. Validation Requirements
Frontend and backend validation are both required.
- Full Name: required; trim; enforce a reasonable length.
- Mobile Number: required; validate allowed characters and expected number format.
- Email: optional; validate format if supplied.
- Event Type: required; must match an allowed option or approved “Other”.
- Event Date: optional if not decided; if supplied, validate date format and business rules.
- Guest Count: required; integer greater than zero; apply configurable limits if any.
- Catering Service Type: required; must match allowed values.
- City / Event Location: required; enforce a reasonable length.
- Venue Address: optional; enforce a reasonable length.
- Budget: optional; must match configured range/value.
- Message: required or optional based on owner-approved policy; if required, enforce a minimum/maximum length.
- Reject unexpected fields and sanitize/normalize input where appropriate.
- Never trust frontend validation alone.
7. Submission and Feedback States
The form must support the following states:
- Idle: form ready to fill.
- Submitting: show loading state and disable repeated submit action.
- Success: show confirmation after the backend accepts and saves the enquiry.
- Validation Error: show field-level messages.
- Server / Network Error: show a friendly retry message and retain user-entered data.
Suggested success copy:
Thank you for contacting Aditi Caterers! Your enquiry has been submitted successfully. Our team will contact you soon.

Marathi equivalent must be available through the language selector.

Do not show a successful-submission message unless the backend confirms the enquiry was accepted.
8. WhatsApp Integration
Provide a WhatsApp action in the contact information area and, optionally, a secondary action after form submission.
- Use the confirmed business WhatsApp number.
- Open WhatsApp using a supported wa.me URL.
- Optionally prefill a short message, without including sensitive data unnecessarily.
- If a prefilled message is used, encode the message safely.
- Make it clear that WhatsApp opens outside the website.
- Do not treat a WhatsApp message as a database enquiry unless a separate supported integration is implemented.
Suggested prefilled message:
Hello Aditi Caterers, I would like to enquire about catering services for my event.

9. Phone and Email Actions
- Phone action must use tel: and be tested on mobile.
- Email action must use mailto: only after the owner provides the official email.
- Display phone/email text so visitors can copy it even if an action does not work on their device.
- Do not invent contact details.
10. Location and Google Maps
If the business owner provides a verified address or Google Maps location:
- Display the address in a dedicated location section.
- Add a map embed or static map/link, based on implementation and privacy/performance considerations.
- Provide a “Get Directions” link that opens the confirmed location in Google Maps.
- Make the map responsive and avoid blocking the page on map loading.
- Include an accessible title for embedded maps.
- Provide the address as text, not only inside a map.
If location is not confirmed, hide the map/location section or show an owner-approved service-area message. Do not use a guessed map pin.
11. Event Details and Enquiry Data
The enquiry should capture information useful for initial catering discussion:
- Customer name
- Phone number
- Email (optional)
- Event type
- Event date (optional / undecided)
- Guest count
- Catering type: With Material / Without Material
- Event city/location
- Venue address (optional)
- Budget range (optional)
- Preferred contact method (optional)
- Message or menu requirements
- Submission timestamp (generated by server)
- Enquiry status (server default)
- Language used to submit (English / Marathi, if available)
Do not collect unnecessary personal information. Avoid collecting payment card details, identity documents, or sensitive information in the enquiry form.
12. Enquiry Status Workflow
Admin enquiry statuses should support:
1. New – enquiry received and not yet reviewed.
2. Contacted – staff has contacted the customer.
3. Quotation Sent – quotation shared with customer.
4. Confirmed – event/catering booking confirmed by the business.
5. Event Completed – event service completed.
6. Cancelled – enquiry or booking cancelled.
Status changes must be performed by authorized admins and stored with timestamps where appropriate. A status change to “Confirmed” must not automatically imply payment or contract completion unless those workflows are implemented separately.
13. Admin Panel Requirements
Authorized admin users should be able to:
- View enquiries in a list/table.
- View enquiry details.
- Search by customer name or mobile number.
- Filter by status, event type, event date, and submission date.
- Sort by newest/oldest.
- Update enquiry status.
- Add internal notes (not visible to customers).
- Record follow-up date/time if the admin workflow supports it.
- Delete or archive enquiries according to the agreed retention policy.
- Export enquiry data only if approved and access-controlled.
Admin UI must show loading, empty, success, and error states. Customer messages and internal notes must be clearly separated.
14. Admin Dashboard Summary (Optional)
If an admin dashboard summary is included, display counts such as:
- Total enquiries
- New enquiries
- Contacted enquiries
- Quotations sent
- Confirmed events
- Upcoming confirmed events
Counts must be calculated from database records and respect access permissions. Do not show fabricated or hardcoded business metrics.
15. Backend API Requirements
Use the existing backend architecture (Node.js + Express + MongoDB/Mongoose) and follow the project's API conventions.
Public endpoint
- POST /api/enquiries – submit a new contact/enquiry form.
Admin endpoints (authentication required)
- GET /api/admin/enquiries – list enquiries with pagination, search, filters, and sorting.
- GET /api/admin/enquiries/:id – fetch one enquiry.
- PATCH /api/admin/enquiries/:id/status – update enquiry status.
- PATCH /api/admin/enquiries/:id – update permitted enquiry fields or internal notes.
- DELETE /api/admin/enquiries/:id – delete/archive according to policy.
API requirements:
- Validate request body on the server.
- Use consistent success/error response shapes.
- Return appropriate HTTP status codes.
- Apply authentication and authorization to admin endpoints.
- Add rate limiting to public enquiry submission.
- Add spam protection (e.g., honeypot and/or CAPTCHA if needed).
- Log operational errors without exposing secrets or full sensitive customer data.
- Use pagination for admin list endpoints.
- Do not expose internal notes through public endpoints.
Suggested response examples:

Success (201 Created):
{
  "success": true,
  "message": "Enquiry submitted successfully",
  "data": {
    "enquiryId": "..."
  }
}
Validation error (400 Bad Request):
{
  "success": false,
  "message": "Please check the submitted information",
  "errors": {
    "mobile": "Enter a valid mobile number"
  }
}
Server error (500 Internal Server Error):
{
  "success": false,
  "message": "Unable to submit enquiry right now. Please try again."
}
16. MongoDB / Mongoose Schema
Suggested collection/model: Enquiry.

Suggested fields:
Field	Type	Required	Description
fullName	String	Yes	Customer name
mobile	String	Yes	Customer phone
email	String	No	Customer email
eventType	String	Yes	Event category
eventDate	Date	No	Event date, if decided
dateNotDecided	Boolean	No	Indicates date is not decided
guestCount	Number	Yes	Expected number of guests
cateringType	String	Yes	With Material / Without Material
eventCity	String	Yes	City or location
venueAddress	String	No	Venue/address
preferredContactMethod	String	No	Phone / WhatsApp
budgetRange	String	No	Optional configured budget range
message	String	No	Additional requirements
language	String	No	English / Marathi
status	String	Yes	Default: New
internalNotes	String	No	Admin-only notes
followUpAt	Date	No	Optional admin follow-up date
createdAt	Date	Yes	Server-generated creation time
updatedAt	Date	Yes	Server-generated update time


Schema notes:
- Use enums for event type, catering type, status, contact method, and language where appropriate.
- Add indexes to fields that are used frequently for search/filtering, based on expected volume.
- Avoid storing duplicate or unnecessary data.
- Keep internal notes inaccessible to public API responses.
- Apply timestamps (createdAt, updatedAt) through Mongoose where appropriate.
- Confirm required fields and exact enum options with the business owner before finalizing.
17. Security and Privacy
- Admin routes must require authentication and role/permission checks.
- Validate and sanitize all user-submitted data on the server.
- Protect against injection, abuse, and spam.
- Rate-limit the public enquiry endpoint.
- Avoid returning customer details in public API responses.
- Do not expose database credentials, API keys, or server stack traces.
- Restrict access to enquiry data to authorized staff.
- Define a data-retention and deletion policy with the business owner.
- Use HTTPS in production.
- Internal admin notes must never be returned in public enquiry responses.
- Do not use customer enquiries for marketing without an appropriate lawful basis/permission.
18. Accessibility Requirements
- All inputs must have accessible labels.
- Form controls must be keyboard accessible.
- Error messages must be announced and associated with fields where practical.
- Buttons and links must have clear names.
- Focus states must be visible.
- Contrast must be sufficient for text and controls.
- The map, if embedded, must have an accessible title and a text address alternative.
- The language switcher must communicate the selected language.
19. Responsive Design Requirements
Desktop
- Use a balanced layout with contact information and enquiry form side-by-side where space allows.
- Avoid excessively wide form fields.
- Keep contact actions easy to scan.
Tablet
- Allow sections to stack or use a two-column layout when comfortable.
- Maintain readable spacing and form controls.
Mobile
- Stack all content in a single column.
- Use full-width or appropriately sized form controls.
- Keep phone and WhatsApp actions easy to tap.
- Avoid horizontal scrolling.
- Ensure the submit button is reachable and clearly visible.
20. SEO Requirements
- Page title: Contact Aditi Caterers | Catering Enquiries
- Meta description: a concise description inviting customers to contact Aditi Caterers for event catering enquiries.
- Use one clear H1.
- Use descriptive headings for contact information and form sections.
- Use crawlable contact details where approved.
- Do not add fake ratings, reviews, or unverified business-location structured data.
- Add LocalBusiness structured data only when the business details required for it have been verified.
21. Performance Requirements
- Keep the Contact Page lightweight.
- Avoid loading a map until needed or use a lightweight map link/embed strategy.
- Optimize any images used.
- Avoid unnecessary animations.
- Keep form submission responsive and provide feedback promptly.
- Do not block the main page render with third-party map scripts.
22. Testing Requirements
UI Tests
- Contact details display correctly.
- Phone and WhatsApp links open the intended actions.
- Map/address section is hidden or accurate based on verified data.
- English and Marathi labels/content display correctly.
- Form layout works on desktop, tablet, and mobile.
Form Tests
- Required-field validation works.
- Invalid mobile number is rejected.
- Invalid email is rejected when entered.
- Guest count must be a valid positive integer.
- Optional date-not-decided state works.
- Catering type selection works.
- Valid form can be submitted.
- Submit button prevents repeated submissions during loading.
- Success feedback appears only after API success.
- Network/server errors preserve form values and provide retry guidance.
API Tests
- Public enquiry endpoint accepts valid payload.
- Invalid payload returns validation errors.
- Enquiry is stored in MongoDB.
- Admin endpoints reject unauthenticated users.
- Admin filters, pagination, and status updates work.
- Internal notes are not included in public responses.
- Rate limiting and spam protection are tested.
Admin Tests
- Admin can view enquiry details.
- Admin can search and filter enquiries.
- Admin can update status and internal notes.
- Unauthorized users cannot access enquiry records.
23. Definition of Done
The Contact Page is complete when:
- [ ] Contact page is implemented at /contact.
- [ ] English and Marathi content is available.
- [ ] Approved contact information is displayed accurately.
- [ ] Phone and WhatsApp actions work.
- [ ] Verified location/map is displayed correctly or safely omitted.
- [ ] Enquiry form contains the approved fields.
- [ ] Frontend and backend validation are implemented.
- [ ] Enquiries are saved successfully in MongoDB.
- [ ] Success, loading, validation, and error states are implemented.
- [ ] Admin enquiry management works with authentication.
- [ ] Admin status workflow and internal notes work.
- [ ] Responsive behavior is verified.
- [ ] Accessibility checks are completed.
- [ ] SEO metadata is added.
- [ ] Tests pass.
- [ ] No unapproved contact details, policies, prices, or promises are displayed.
24. Pending Business Owner Confirmation
Before production release, confirm:
- Official phone number and WhatsApp number.
- Official email address (if used).
- Full business address or approved service-area text.
- Business hours (if displayed).
- Event categories offered.
- Whether budget range should be included in the form.
- Whether message/requirements field is required.
- Guest-count limits, if any.
- Enquiry follow-up and data-retention policy.
- Exact Marathi translations and customer-facing copy.
- Whether Google Maps embed is approved.
25. Final Notes
This document describes the intended Contact Page and enquiry-management functionality. It does not confirm catering availability, prices, service-area coverage, event policies, or contact details beyond those supplied for the project. Any unconfirmed information must be reviewed and approved by Aditi Caterers before publication.
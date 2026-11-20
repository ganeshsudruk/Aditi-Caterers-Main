10 - Booking Page Requirements
1. Document Information
Field	Details
Project	Aditi Caterers Website
Module	Public Website
Page	Booking / Enquiry
Document	10-booking-requirements.md
Suggested file	requirements/01-public-website/10-booking-requirements.md
Task ID	AC-FE-010
Route	/booking
Priority	High
Status	Draft - booking workflow and business policies require owner approval
Languages	English and Marathi


2. Introduction
The Booking page allows customers to submit an event catering enquiry to Aditi Caterers. Customers should be able to provide their contact details, event information, guest count, catering type, package preferences, food requirements, and additional notes.

The submitted form must be saved securely in the backend and made available to authorized administrators for follow-up.

Important: Submitting the form creates an enquiry or booking request only. It does not confirm event availability, finalize a quotation, reserve a date, or create a confirmed booking. Aditi Caterers must review the request and communicate confirmation to the customer.
3. Objectives
- Provide a simple and clear booking enquiry form.
- Collect the information required to understand the customer's event.
- Support With Material and Without Material catering enquiries.
- Allow customers to select an available package or request a custom quotation.
- Allow customers to describe menu and special requirements.
- Support English and Marathi.
- Validate and securely store submissions.
- Connect website submissions with the Admin Panel enquiry/booking workflow.
- Provide clear submission success and error messages.
- Reduce incomplete and duplicate form submissions.
4. Technology Stack
Technology	Purpose
React + Vite	Frontend
Bootstrap 5	Responsive layout and form components
Bootstrap Icons	Interface icons
React Router DOM	Page navigation
Context API	Language management
Axios	API communication
Node.js + Express.js	Backend
MongoDB + Mongoose	Enquiry and booking request storage
Cloudinary + Multer	Only if booking attachments are approved


The booking form should use the existing project stack and shared components. Do not introduce a new framework or database for this page.
5. Page Route and Navigation
Main route:

/booking

Optional query parameters may prefill the form when the customer arrives from another page.

Examples:
- /booking?packageType=with-material
- /booking?packageType=without-material
- /booking?packageType=custom
- /booking?packageId=PACKAGE_ID
- /booking?source=packages
Requirements:
- Add booking links from the Navbar, Home page, Services page, Packages page, and relevant CTAs.
- The route must work when opened directly.
- Browser refresh must not cause a routing error.
- Use shared Navbar and Footer components.
- Preserve valid query parameters when initializing the form.
- Validate query parameters against actual available package data; never trust a URL parameter as proof of a valid package.
6. Page Layout and Sections
Suggested page structure:
1. Breadcrumb.
2. Page Heading and Introduction.
3. Booking / Enquiry Form.
4. Important Booking Information.
5. Contact and WhatsApp Assistance.
6. Privacy Notice and Consent.
7. Standard Footer.
The form should be easy to understand, not excessively long on a single screen, and grouped into logical sections.
7. Page Heading and Introduction
Suggested English heading:

Plan Your Event with Aditi Caterers

Suggested Marathi heading:

Aditi Caterers सोबत तुमच्या कार्यक्रमाचे नियोजन करा

Suggested English description:
Share your event details and catering requirements with us. Our team can review your enquiry and contact you to discuss the next steps.

Suggested Marathi description:
तुमच्या कार्यक्रमाची माहिती आणि केटरिंगच्या गरजा आम्हाला कळवा. तुमच्या चौकशीचा आढावा घेऊन पुढील माहितीसाठी आमची टीम तुमच्याशी संपर्क साधेल.

The final wording and translations should be reviewed by the business owner.

Do not promise a response time unless the owner has approved it.
8. Booking Form Structure
Divide the form into the following groups:
1. Customer Information.
2. Event Information.
3. Catering Requirements.
4. Package and Menu Preferences.
5. Additional Requirements.
6. Consent and Submission.
Use clear section headings and short helper text. On mobile, the form may use a single-column layout. On desktop, related fields may be arranged in two columns.
9. Customer Information
Suggested fields:
Field	Required	Description
Full Name	Yes	Customer's name
Mobile Number	Yes	Primary contact number
Email Address	No	Optional email
Preferred Contact Method	No	Phone, WhatsApp, or Email


Validation
- Name must not be empty.
- Trim leading and trailing spaces.
- Mobile number must be validated.
- Email must be validated when supplied.
- Do not accept a mobile number containing only spaces or invalid characters.
- Show field-specific error messages.
- Never expose customer contact details in public responses.
10. Event Information
Suggested fields:
Field	Required	Description
Event Type	Yes	Type of function
Event Date	Yes	Requested event date
Event Time	No	Preferred event time
Number of Guests	Yes	Expected guest count
Venue / Event Address	Yes, subject to owner approval	Event location
Village / City	Yes	Event city or village
Additional Venue Details	No	Landmark or instructions


Suggested event types:
- Wedding.
- Birthday.
- Engagement.
- Other Event.
These are suggested values and must be confirmed by the owner. If Other Event is selected, show a text field to describe the event.
Event date behavior
- Use a date picker.
- Prevent invalid date values.
- Past dates should normally be blocked for new requests; confirm the final rule with the owner.
- Do not display available/unavailable dates unless a separate approved availability system exists.
- Do not promise that a selected date is available.
Guest count behavior
- Accept positive whole numbers only.
- Do not accept zero or negative values.
- If the business has a minimum or maximum guest count, configure it only after owner approval.
- Do not invent a guest limit.
11. Catering Requirements
Suggested field:

Catering Type

Options:
- With Material.
- Without Material.
- Not Sure / Need Guidance.
The customer should be able to select one option.

The form may show a short explanation of the two service types, but the exact responsibility for ingredients, equipment, staff, transport, and other materials must be confirmed by the owner before publishing.

Suggested Marathi labels:
English	Marathi
With Material	साहित्यासह
Without Material	साहित्याशिवाय
Not Sure / Need Guidance	निश्चित नाही / मार्गदर्शन हवे आहे


12. Package Selection
Allow customers to select a package if packages are available and published.

Suggested options:
- Select a Package.
- Custom Catering Package.
- Not Sure / Need Guidance.
Requirements:
- Load package options from the backend.
- Display only active and published packages.
- Show the package name and approved summary.
- Display price only when the owner has approved the price and its pricing unit.
- Allow customers to submit an enquiry without selecting a package.
- If the customer arrives from a package card, preselect the corresponding package.
- Allow the customer to change the preselected package.
- Store the selected package reference and a safe snapshot of the displayed package name where historical context is required.
- If the selected package becomes unavailable before submission, ask the customer to select another option or submit a custom enquiry.
Do not hardcode fictional package options or prices in production.
13. Food Preference and Menu Selection
Suggested fields, subject to the actual menu supported by the business:
- Food Preference: Veg / Non-Veg / Both / Need Guidance.
- Meal Type: Breakfast / Lunch / Dinner / Other, if supported.
- Menu Selection: optional multi-select or free-text requirements.
- Special Food Requirements: optional text area.
Requirements:
- Load menu choices from the approved menu data where available.
- Display only active menu items.
- Do not assume that every menu item is available for every event or package.
- Allow customers to describe a custom menu request.
- Clearly indicate that menu choices are subject to discussion and confirmation.
- Support English and Marathi labels.
- Do not display unapproved menu prices.
14. Budget and Additional Requirements
Optional fields:
- Estimated Budget.
- Additional Notes.
- Special Requirements.
- Preferred Time to Contact.
Budget behavior:
- Keep the budget field optional.
- Use a numeric field only if the business owner wants exact amounts.
- If ranges are used, the owner must approve the range values.
- Do not treat a customer's budget as an accepted quotation.
Additional notes should allow customers to describe requirements that are not covered by the standard fields.

Set a reasonable maximum text length and display a character counter if useful.
15. Form Validation
Frontend validation
- Show required-field indicators.
- Validate values before sending the request.
- Display clear English and Marathi messages.
- Place validation messages near the related fields.
- Preserve valid entered values when validation fails.
- Prevent repeated clicks while submission is in progress.
Backend validation
- Repeat all important validations on the server.
- Validate and normalize mobile numbers.
- Validate email format when provided.
- Validate event date and guest count.
- Validate package IDs against the database.
- Validate catering type, event type, and menu references against approved values.
- Trim and sanitize text inputs.
- Reject unexpected fields where practical.
- Apply request-size limits.
Frontend validation must never be treated as a replacement for backend validation.
16. Form Submission Flow
Expected flow:
1. Customer opens /booking.
2. Customer enters contact details.
3. Customer enters event details.
4. Customer selects catering and package preferences.
5. Customer reviews the information.
6. Customer accepts the required privacy notice/consent.
7. Customer selects Submit Enquiry.
8. Frontend validates the form.
9. Frontend sends the request to the backend.
10. Backend validates and saves the request in MongoDB.
11. Backend returns a success response and reference number.
12. Frontend displays a confirmation message.
Submission behavior
- Disable the submit button while the request is processing.
- Prevent accidental duplicate submissions.
- Show a loading state.
- Do not clear the form before a successful response.
- If the request fails, preserve entered values where practical.
- Do not show a success message unless the backend confirms that the request was saved.
- Do not state that the booking is confirmed.
17. Success Message and Confirmation
Suggested English success message:

Your Enquiry Has Been Submitted

Thank you for contacting Aditi Caterers. Your enquiry has been received. Our team will review the details and contact you to discuss your requirements.

Suggested Marathi success message:

तुमची चौकशी यशस्वीरीत्या पाठवली आहे

Aditi Caterers शी संपर्क साधल्याबद्दल धन्यवाद. तुमची चौकशी आम्हाला प्राप्त झाली आहे. आमची टीम दिलेल्या माहितीचा आढावा घेऊन पुढील चर्चेसाठी तुमच्याशी संपर्क साधेल.

Requirements:
- Display the enquiry reference number returned by the backend.
- Provide a link back to the Home page.
- Provide an optional Contact Us or WhatsApp shortcut.
- Do not describe the request as confirmed.
- Do not promise a specific response time unless approved.
18. WhatsApp and Phone Assistance
Display the approved business contact information:
- Phone: +91 9975959391
- WhatsApp: https://wa.me/919975959391
Requirements:
- Use a tel: link for the phone number.
- Use the approved WhatsApp link.
- If a prefilled WhatsApp message is used, URL-encode the message.
- A prefilled message may include the selected package or event type when available.
- The customer must explicitly click the WhatsApp link to open the conversation.
- Do not send WhatsApp messages automatically from the website.
- Do not claim that an enquiry has been submitted through WhatsApp unless the customer completes that action.
Suggested prefilled message:

Hello Aditi Caterers, I would like to enquire about catering for my event.

The final message can be bilingual if approved.
19. Privacy Notice and Consent
The booking form collects personal information such as name, mobile number, email, event details, and location.

Requirements:
- Display a concise privacy notice near the submit button.
- Explain that submitted information will be used to review and respond to the enquiry.
- Link to a Privacy Policy page if one is published.
- Obtain explicit consent where required by the approved privacy and legal review.
- Do not preselect optional marketing consent.
- Do not use customer information for unrelated marketing without appropriate consent.
- Restrict access to submitted information to authorized administrators.
- Do not expose submitted information through public APIs.
Suggested consent text:

I agree that Aditi Caterers may use the information provided to review and respond to my enquiry.

The final privacy wording must be reviewed and approved before launch.
20. Backend and Admin Panel Integration
Each public booking form submission should be stored as an enquiry/request for review.

The Admin Panel should allow authorized users to:
- View submitted enquiries.
- Open full enquiry details.
- Contact the customer.
- Add internal notes.
- Update the enquiry status.
- Convert an enquiry into a booking after review, if the business workflow requires it.
Suggested enquiry statuses:
- New.
- Contacted.
- Quotation Sent.
- Confirmed.
- Event Completed.
- Cancelled.
The final workflow must remain consistent with the Admin Panel requirements. A form submission must not automatically create a Confirmed booking.
21. Suggested MongoDB Data Model
Suggested collection: enquiries or the project's approved booking-request collection.
{
  enquiryNumber: String,

  customer: {
    name: String,
    mobile: String,
    email: String,
    preferredContactMethod: String
  },

  event: {
    type: String,
    otherType: String,
    date: Date,
    time: String,
    guestCount: Number,
    venueAddress: String,
    city: String
  },

  catering: {
    type: String, // WITH_MATERIAL, WITHOUT_MATERIAL, or NEED_GUIDANCE
    packageId: ObjectId,
    packageNameSnapshot: String,
    foodPreference: String,
    mealType: String,
    menuItemIds: [ObjectId],
    specialRequirements: String
  },

  budget: Number,
  additionalNotes: String,

  source: String, // WEBSITE, PACKAGES_PAGE, or OTHER
  status: String,

  privacyConsent: {
    accepted: Boolean,
    acceptedAt: Date,
    policyVersion: String
  },

  createdAt: Date,
  updatedAt: Date
}
This is a proposed structure. Confirm whether enquiries and confirmed bookings should use separate collections or a shared collection with a controlled conversion process.
Data rules
- Generate a unique enquiry reference on the backend.
- Validate all required fields.
- Store package references only when they exist.
- Keep a package-name snapshot if needed for historical context.
- Store dates consistently and define the business timezone.
- Do not store unnecessary sensitive information.
- Do not store payment information in this form.
22. Backend API Requirements
Suggested public endpoints:
Method	Endpoint	Purpose
GET	/api/public/packages	Get active packages for the form
GET	/api/public/menu	Get active menu options
POST	/api/enquiries	Submit a new enquiry


Suggested admin endpoints are defined in the Admin Panel requirements and should be protected.
POST /api/enquiries
The endpoint must:
- Validate the request body.
- Normalize customer contact details.
- Validate package and menu references.
- Set the initial status on the server.
- Generate a unique enquiry number.
- Save the enquiry to MongoDB.
- Return a safe confirmation response.
- Avoid returning private admin-only fields.
Suggested successful response:
{
  "success": true,
  "message": "Enquiry submitted successfully.",
  "data": {
    "enquiryNumber": "AC-ENQ-2026-0001"
  }
}
The example reference is illustrative only. The backend must generate the actual unique value.
23. Frontend Components
Suggested React structure:
src/
  pages/
    public/
      BookingPage.jsx

  components/
    booking/
      BookingForm.jsx
      CustomerInformationForm.jsx
      EventInformationForm.jsx
      CateringRequirementsForm.jsx
      PackageSelection.jsx
      MenuSelection.jsx
      BookingReview.jsx
      BookingSuccess.jsx
      BookingContactOptions.jsx

  services/
    enquiryService.js
    packageService.js
    menuService.js
Component names and folder structure may be adjusted to match the existing project architecture.
24. UI and UX Requirements
- Use Bootstrap 5 form controls, grid, alerts, buttons, and validation styles.
- Use Bootstrap Icons for interface icons; do not use emojis as UI icons.
- Follow the approved Aditi Caterers branding.
- Keep form fields compact and readable.
- Group related fields logically.
- Use clear labels and helper text.
- Indicate required and optional fields.
- Use appropriate input types for mobile, email, date, number, and time.
- Provide loading, success, validation, and error states.
- Keep the submit button clearly identifiable.
- Avoid unnecessary animations and oversized spacing.
- Do not reset the form when the user changes the language.
25. Responsive Requirements
Desktop
- Use a centered form container with a comfortable maximum width.
- Arrange related fields in two columns where appropriate.
- Keep section headings and form labels easy to scan.
Tablet
- Adjust columns to available width.
- Maintain readable field sizes and spacing.
- Ensure dropdowns and date controls remain usable.
Mobile
- Use a single-column form layout.
- Use suitable mobile input types.
- Keep buttons full-width where appropriate.
- Ensure validation messages do not overlap fields.
- Keep the submit action easy to reach.
- Prevent horizontal overflow.
- Test the form on common mobile viewport sizes.
26. Accessibility Requirements
- Associate every form control with a visible label.
- Use semantic form elements.
- Mark required fields programmatically.
- Announce validation and submission feedback to assistive technology.
- Ensure keyboard navigation works for all controls.
- Provide visible focus indicators.
- Do not communicate errors using color alone.
- Ensure sufficient contrast.
- Use accessible names for icon-only controls.
- Preserve a logical focus order.
27. SEO Requirements
- Page title: Book Catering | Aditi Caterers.
- Add a useful meta description.
- Use one clear H1 heading.
- Ensure the page is accessible to search engines where appropriate.
- Use the canonical URL for /booking.
- Do not include customer-submitted details in page metadata.
- Avoid indexing confirmation pages containing enquiry reference or personal details.
Suggested meta description:
Send your event details to Aditi Caterers and enquire about catering services, packages, and menu requirements.

28. Security and Privacy Requirements
- Validate and sanitize all input on the backend.
- Apply rate limiting to public enquiry submissions.
- Add spam protection appropriate to the site's traffic and risk.
- Use server-side validation for all references and enum values.
- Prevent mass assignment by allowing only approved fields.
- Use secure database access and environment variables.
- Do not expose database IDs or internal admin notes unnecessarily.
- Do not expose customer records through public GET endpoints.
- Protect admin enquiry endpoints with authentication and authorization.
- Use HTTPS in production.
- Define retention and deletion procedures with the business owner.
- Consider an idempotency or duplicate-submission strategy.
- Do not log full customer personal details unnecessarily.
29. Error Handling
Handle these situations:
- Required fields are missing.
- Mobile number or email is invalid.
- Event date is invalid.
- Guest count is invalid.
- Selected package or menu item is no longer active.
- Backend validation fails.
- Network connection is unavailable.
- Server request times out.
- Duplicate submission is detected.
- Rate limit or spam protection is triggered.
Display a clear message and preserve the customer's entered information where practical. Never show raw server stack traces or database errors.
30. Testing Requirements
Functional testing
- Booking page loads at /booking.
- Query parameters prefill valid package selections.
- Customer can complete and submit the form.
- Successful submission creates a database record.
- A unique enquiry reference is returned.
- Success message is displayed only after backend success.
- Phone and WhatsApp links work.
- English and Marathi text is displayed correctly.
Validation testing
- Required fields cannot be submitted empty.
- Invalid mobile numbers are rejected.
- Invalid email addresses are rejected when supplied.
- Past or invalid event dates follow the approved rule.
- Zero, negative, and decimal guest counts are rejected.
- Invalid package and menu IDs are rejected.
- Text length limits are enforced.
- Duplicate submissions are handled safely.
Security testing
- Public users cannot access admin enquiry records.
- Rate limiting works.
- Unexpected fields are not saved.
- Customer data is not exposed in public responses.
- Admin APIs require authentication and authorization.
- Consent information is stored correctly.
Responsive and accessibility testing
- Test desktop, tablet, and mobile layouts.
- Verify keyboard navigation.
- Verify labels and validation announcements.
- Verify visible focus states and contrast.
- Confirm no horizontal overflow.
31. Acceptance Criteria
The Booking page is ready for review when:
1. The /booking route works correctly.
2. The page follows the approved Aditi Caterers design.
3. Customer, event, and catering information can be entered.
4. Package and menu choices load from approved backend data.
5. English and Marathi interface text is available.
6. Frontend and backend validation work.
7. Submissions are securely saved in MongoDB.
8. A unique enquiry reference is generated.
9. Duplicate submissions are handled.
10. The customer sees a clear success or error message.
11. The form does not claim that an event is confirmed.
12. Admin users can access the enquiry through the approved Admin Panel workflow.
13. Privacy, security, accessibility, and responsive requirements are addressed.
14. Required tests pass.
32. Developer Task Assignment
Detail	Value
Task ID	AC-FE-010
Task Name	Booking / Enquiry Page
Suggested Branch	feature/booking-page
Priority	High
Estimated Duration	4–5 working days
Dependencies	Navbar, Footer, Packages, Food Menu, Contact Page, Backend API
Main Components	BookingPage, BookingForm, EventInformationForm, CateringRequirementsForm, BookingSuccess
Backend Dependency	Enquiry Submission API
Database Dependency	Enquiries / Booking Requests Collection


Suggested Git commands:
git checkout dev
git pull origin dev

git checkout -b feature/booking-page

git add .
git commit -m "feat: implement bilingual booking enquiry page"

git push origin feature/booking-page
Create a Pull Request into the agreed development branch after testing.
33. Pending Business Information
The following details must be confirmed by the Aditi Caterers business owner:
- [ ] Final list of supported event types.
- [ ] Whether event date is mandatory at enquiry stage.
- [ ] Whether event time is required.
- [ ] Whether full venue address is mandatory or city/village is sufficient initially.
- [ ] Minimum or maximum guest count, if any.
- [ ] Exact meaning and responsibilities for With Material and Without Material.
- [ ] Approved package list and package prices.
- [ ] Approved food preferences and meal types.
- [ ] Which menu items customers may select.
- [ ] Whether customers may enter an estimated budget.
- [ ] Preferred customer contact methods.
- [ ] Whether the business wants an automated acknowledgement by SMS, WhatsApp, or email.
- [ ] Privacy notice and consent wording.
- [ ] Enquiry follow-up and booking confirmation workflow.
- [ ] Data retention policy.
Until these details are approved, keep uncertain fields optional where possible and do not publish unverified prices, service promises, availability, or policies.
34. Definition of Done
- [ ] Booking page is implemented at /booking.
- [ ] Page layout follows approved brand guidelines.
- [ ] Customer information fields are implemented.
- [ ] Event information fields are implemented.
- [ ] Catering and package selection are implemented.
- [ ] Menu and special requirement fields are implemented where approved.
- [ ] Query-based package preselection works.
- [ ] Frontend and backend validation are implemented.
- [ ] Enquiry submission API is connected.
- [ ] Enquiry records are saved in MongoDB.
- [ ] Unique enquiry reference is generated.
- [ ] Success, loading, validation, and error states are implemented.
- [ ] English and Marathi interface text is added.
- [ ] Phone and WhatsApp links are verified.
- [ ] Privacy and security requirements are addressed.
- [ ] Responsive and accessibility tests pass.
- [ ] Business owner has reviewed the booking form and workflow.
35. Next Document
After completing the Booking page, the next public website document is:

requirements/01-public-website/11-contact-page-requirements.md

This document will define the business contact information, enquiry options, contact form, location/map display, and communication links.
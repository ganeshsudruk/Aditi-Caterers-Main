11 - Quotation Management Requirements
1. Overview
The Quotation Management module is part of the Aditi Caterers Admin Panel. It allows authorized administrators to prepare, manage, share, and track catering quotations for customer enquiries and events.

A quotation is a proposed estimate or offer, not a confirmed booking. Sending a quotation must not automatically confirm an event or reserve a date. Final prices, taxes, terms, menu items, and business policies must be approved by the business owner.

The Admin Panel interface and customer-facing quotation document must support English and Marathi.
2. Purpose
- Prepare professional quotations for catering enquiries.
- Create quotations from customer and booking/enquiry details where available.
- Support both With Material and Without Material service options.
- Calculate item totals and grand totals consistently.
- Generate a printable/downloadable quotation document.
- Track quotation status, revisions, and customer response.
- Reduce manual calculation and document preparation errors.
3. Scope
Included
- Create quotations manually or from an existing enquiry.
- Link a quotation to a customer and enquiry/booking record.
- Add event details, service type, guest count, menu items, quantities, rates, and charges.
- Support configurable discounts, taxes, and additional charges only when approved.
- Calculate subtotal and final amount.
- English and Marathi quotation content.
- Preview, save draft, issue, revise, download, print, and mark quotation status.
- Track validity date and customer response.
- Quotation history and audit information.
- Search, filters, sorting, and pagination.
Not included by default
- Automatic booking confirmation after quotation issuance.
- Online payment collection or payment gateway integration.
- E-signature or legally binding digital contract workflows.
- Automatic tax/legal advice.
- Automatic WhatsApp/SMS delivery unless separately approved and integrated.
- Automatic price updates without administrator review.
4. Admin Access and Navigation
- Add Quotation Management to the Admin Panel sidebar.
- Suggested route: /admin/quotations.
- Only authenticated admins with quotation permissions may access the module.
- Protect frontend routes and backend APIs.
- Support role-based permissions for viewing, creating, editing drafts, issuing, revising, and cancelling quotations.
- Show an access-denied message when permission is missing.
- All navigation labels and interface messages must support English and Marathi.
5. Bilingual Admin Interface and Quotation Content
Provide an English/Marathi language switcher in the Admin Panel.

Translate:
- Page titles and descriptions.
- Form labels and placeholders.
- Buttons and action menus.
- Status labels.
- Validation and confirmation messages.
- Search, filters, and pagination.
- Notifications and empty states.
- Quotation document headings, labels, notes, and standard terms.
Requirements:
- Use centralized translation resources for interface labels.
- Switching the Admin Panel language must not clear unsaved quotation data.
- Admin must be able to choose the quotation document language: English or Marathi.
- Customer name, address, event details, and menu names should retain the entered text unless the admin explicitly edits them.
- Store the selected document language and a snapshot of the issued quotation content.
- Do not automatically translate prices, quantities, customer-entered text, or legal/business terms without review.
- Provide a preview before issuing or downloading.
6. Quotation Listing Page
Display quotations in a responsive table or card/list layout.
Suggested columns
- Quotation Number.
- Customer Name.
- Enquiry/Booking Reference.
- Event Type.
- Event Date.
- Service Type.
- Guest Count.
- Total Amount.
- Quotation Date.
- Valid Until.
- Status.
- Actions.
Actions
- View.
- Preview.
- Edit Draft.
- Duplicate as New Draft (if enabled).
- Issue/Send.
- Download PDF.
- Print.
- Create Revision.
- Mark Accepted or Rejected based on customer response.
- Mark Expired or Cancelled, subject to permissions.
Listing behavior
- Show loading, empty, and error states.
- Provide retry when loading fails.
- Support search, filters, sorting, and pagination.
- Display amounts in Indian Rupees (INR) unless the business owner approves another currency.
- Do not expose internal notes in customer-facing documents.
7. Quotation Numbering
- Each quotation must have a unique quotation number.
- Generate quotation numbers on the backend to avoid duplicates.
- Suggested format: AC-QTN-YYYY-0001; final prefix and format require owner approval.
- Number sequence must be concurrency-safe.
- Draft numbering behavior must be decided: assign on draft creation or only when issued.
- Revisions should retain a link to the original quotation and have a clear revision identifier.
- Never reuse a quotation number after deletion or cancellation.
- Show the quotation number on listing, detail view, and exported document.
8. Customer and Enquiry Details
A quotation may be created from an existing enquiry or manually.
Suggested customer fields
- Customer Name.
- Mobile Number.
- Email Address (optional).
- Address (optional).
- Customer/Enquiry ID (system reference).
- Preferred Contact Method (optional).
Event details
- Event Type.
- Event Date.
- Event Time or serving time (if provided).
- Event Location/Venue.
- Number of Guests.
- Event Notes (optional).
Requirements:
- Pre-fill known information from the linked enquiry.
- Allow authorized admins to correct or complete details.
- Do not invent missing customer or event details.
- Validate mobile number and email format when supplied.
- Keep customer contact details private and exclude them from public APIs.
- A quotation must be linked to a customer record or contain the minimum approved customer details.
9. Catering Service Type
Quotation must support the business's approved service options:
- With Material.
- Without Material.
Requirements:
- Service type must be clearly shown in the quotation.
- Menu, materials, labor, equipment, transport, and other inclusions must be described only as applicable and approved.
- Do not assume that a particular item or service is included in either option.
- If service-specific pricing rules exist, they must be configured and approved by the owner.
- Admin must be able to add explanatory notes for the selected service type.
10. Quotation Line Items
Admin must be able to add one or more line items.
Suggested line-item fields
- Item/Service Name.
- Description.
- Category (optional).
- Quantity.
- Unit (for example, per person, per plate, per item, or lump sum; approved list/configuration).
- Rate.
- Line Total.
- Optional notes.
Requirements
- Add, edit, and remove line items in a draft quotation.
- Calculate line total as quantity multiplied by rate, subject to approved rounding rules.
- Support menu items and non-menu charges as separate line items.
- Allow an optional package-based starting point, while keeping all included items editable before issue.
- Do not hard-code food items, rates, or package contents.
- Prevent negative quantities and invalid rates.
- Clearly distinguish included items with zero charge from items that are not included.
- Save the item name/description and rate snapshot in the quotation so later menu or price changes do not silently alter an issued quotation.
11. Menu and Package Integration
If the Menu Management and Package Management modules are available:
- Admin may select an approved package as a starting point.
- Package guest capacity, menu items, inclusions, exclusions, and price may be copied into a draft.
- Admin must review the copied details before issuing.
- Admin may add, remove, or modify line items in the draft according to permissions.
- Changes to a package after quotation issuance must not alter the existing quotation.
- Menu item names and prices must be snapshotted into the quotation.
- Package selection must not automatically guarantee availability for the requested date.
If no package is selected, admin can create a quotation using manual line items.
12. Price Calculation
The system must calculate quotation totals consistently.
Suggested calculation
- Line Total = Quantity × Rate.
- Subtotal = Sum of all line totals.
- Discount = Optional approved fixed amount or percentage.
- Additional Charges = Optional approved charges.
- Tax = Only if applicable and configured/approved.
- Grand Total = Subtotal − Discount + Additional Charges + Tax.
Requirements
- Display calculation breakdown clearly.
- Validate percentage and fixed-amount discounts.
- Prevent discounts from producing an invalid negative total.
- Apply tax only according to owner-approved configuration and applicable business/accounting guidance.
- Do not assume a tax rate or tax registration status.
- Support configurable rounding to the approved currency precision.
- Recalculate totals on the backend; never trust client-calculated totals.
- Store a snapshot of rates, discounts, charges, tax details, and final amount at issue time.
- Show currency clearly, preferably INR (₹), subject to owner confirmation.
13. Discount and Additional Charges
If enabled by the owner, admin may add:
- Fixed discount.
- Percentage discount.
- Delivery/transport charge.
- Setup or service charge.
- Other approved additional charge.
Requirements:
- Each charge must have a label and amount/calculation method.
- Admin permissions may restrict who can apply discounts.
- Optional maximum discount limits may be configured by the owner.
- Record the reason for manual discounts where required.
- Do not add hidden or unexplained charges.
- Show all customer-facing charges in the quotation breakdown.
- Do not add tax or service charges unless the owner has approved the rule.
14. Quotation Notes, Inclusions, and Exclusions
Quotation may include:
- Customer-facing notes.
- Service description.
- Menu/inclusions.
- Exclusions.
- Payment terms, if approved.
- Advance amount or schedule, if approved.
- Cancellation/rescheduling terms, if approved.
- Validity period.
- Other business-approved terms.
Requirements:
- Maintain standard terms in configurable settings if this feature is implemented.
- Allow quotation-specific notes.
- Clearly distinguish standard terms from custom notes.
- Do not invent payment, cancellation, refund, or validity policies.
- All terms must be reviewed and approved by the business owner before use.
- Support English and Marathi versions of standard content.
15. Quotation Date and Validity
- Record quotation creation date.
- Record issue date when the quotation is issued.
- Allow a Valid Until date if the owner uses quotation expiry.
- Validity duration/default must be configurable and owner-approved.
- Show validity clearly on the quotation document.
- Do not silently change validity after issue.
- Expired quotations must not be treated as accepted or confirmed bookings.
- Admin may create a revised quotation if the customer requests changes.
16. Quotation Preview
Before issuing, admin must be able to preview the complete customer-facing quotation.

Preview should include:
- Aditi Caterers branding/logo, if approved.
- Business contact details supplied and approved by the owner.
- Quotation number and date.
- Customer details.
- Event details and guest count.
- Service type.
- Menu and line-item details.
- Price calculation breakdown.
- Notes, inclusions, exclusions, and approved terms.
- Validity date, if enabled.
- Selected document language.
Requirements:
- Preview should closely match the exported PDF.
- Prevent content from being cut off.
- Show page breaks clearly for multi-page quotations.
- Keep internal notes and private admin information out of the preview.
- Allow admin to return to editing without losing data.
17. PDF Generation, Download, and Print
- Generate a professional PDF quotation.
- Support English and Marathi text rendering using fonts that support the required scripts.
- Use consistent A4 layout unless another format is approved.
- Include quotation number and page numbers.
- Format currency and dates consistently.
- Prevent table rows and important content from being clipped across pages.
- Provide Download PDF and Print actions.
- Store the issued PDF or provide a reproducible document snapshot, according to the approved storage design.
- If PDF generation fails, show a clear error and retain the quotation data.
- Do not expose internal storage paths or credentials.
18. Quotation Issuing and Sharing
- Issuing a quotation should change its status to Issued only after the backend successfully records the issue action.
- Admin may download the PDF and share it through an approved channel.
- WhatsApp/email automation is optional and requires separate approval and integration.
- If manual sharing is used, provide a copy/open contact action only where supported.
- Record issue date, issuing admin, and delivery method if known.
- Do not claim that a customer received or read a quotation unless delivery/read confirmation is actually available.
- Issuing a quotation must not automatically confirm a booking or reserve an event date.
19. Quotation Status and Workflow
Suggested statuses
- Draft: being prepared; not sent to customer.
- Issued: quotation has been finalized and shared/issued.
- Accepted: customer has explicitly accepted the quotation.
- Rejected: customer has declined.
- Revision Requested: customer has requested changes.
- Expired: validity period has ended, if validity is enabled.
- Cancelled: quotation withdrawn by an authorized admin.
- Superseded: replaced by a later revision.
Workflow requirements
- New quotations default to Draft.
- Drafts can be edited by authorized users.
- Issued quotations should be locked from direct editing; changes should create a revision.
- Accepted status requires explicit customer confirmation recorded by an admin or approved integration.
- Rejected status should include an optional reason.
- Revision Requested should allow creation of a new draft revision.
- Expired status must not imply rejection or acceptance.
- Cancelled and Superseded quotations must remain available for history.
- Maintain timestamps and user references for status changes.
20. Revisions and Version History
- Allow creation of a revised quotation from an issued quotation.
- Preserve the original quotation and all earlier revisions.
- Use a revision number or suffix (for example, Revision 1); final display format can be configured.
- Show which quotation a revision replaces.
- Keep previous totals and line items unchanged.
- Record revision reason, changed by, and date.
- Only the latest active revision should be presented as current.
- A revision must be previewed and issued separately.
- Do not overwrite an issued quotation silently.
21. Customer Response Tracking
Admin must be able to record the customer's response:
- Accepted.
- Rejected.
- Revision Requested.
- Awaiting Response.
Requirements:
- Record response date.
- Record the admin who updated the response.
- Optional response notes may be stored privately.
- Do not mark Accepted without explicit confirmation.
- Customer acceptance of a quotation is not, by itself, a complete booking workflow unless the business's booking process explicitly defines it that way.
- Link accepted quotations to the relevant booking/enquiry record for follow-up.
22. Booking and Enquiry Integration
- Admin should be able to create a quotation from an existing enquiry.
- Pre-fill customer, event, service type, guest count, and known notes.
- Allow more than one quotation/revision for an enquiry if needed.
- Display quotation status in the linked enquiry/booking detail.
- If a quotation is accepted, provide a link/action to continue the booking confirmation workflow.
- Do not automatically change a booking to Confirmed unless the booking workflow and owner-approved rules explicitly require it.
- Avoid duplicate customer or enquiry records where possible.
23. Proposed MongoDB Schema
Quotation model (suggested)
{
  quotationNumber: String,
  revisionNumber: Number,
  parentQuotation: ObjectId,
  customer: ObjectId,
  enquiry: ObjectId,
  customerSnapshot: {
    name: String,
    mobile: String,
    email: String,
    address: String
  },
  eventSnapshot: {
    eventType: String,
    eventDate: Date,
    eventTime: String,
    venue: String,
    guestCount: Number
  },
  serviceType: "with_material" | "without_material",
  documentLanguage: "en" | "mr",
  lineItems: [{
    name: String,
    description: String,
    category: String,
    quantity: Number,
    unit: String,
    rate: Number,
    lineTotal: Number
  }],
  subtotal: Number,
  discount: {
    type: String,
    value: Number,
    amount: Number,
    reason: String
  },
  additionalCharges: [{
    label: String,
    amount: Number
  }],
  taxDetails: {
    label: String,
    rate: Number,
    amount: Number
  },
  grandTotal: Number,
  notes: String,
  termsSnapshot: String,
  quotationDate: Date,
  issuedAt: Date,
  validUntil: Date,
  status: String,
  responseDate: Date,
  responseNotes: String,
  issuedBy: ObjectId,
  createdBy: ObjectId,
  updatedBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
Schema requirements:
- Use Mongoose validation and enums.
- Validate amounts, quantities, dates, and service type.
- Recalculate all totals on the backend.
- Store snapshots of customer, event, menu, package, pricing, and terms at issue time.
- Use a unique index for quotation number and revision identity.
- Preserve issued versions from accidental modification.
- Final schema may be adjusted to match existing project models.
24. Proposed API Endpoints
Admin APIs
- GET /api/admin/quotations — list with search, filters, sorting, and pagination.
- GET /api/admin/quotations/:id — get quotation details.
- POST /api/admin/quotations — create draft quotation.
- POST /api/admin/quotations/from-enquiry/:enquiryId — create draft from enquiry.
- PUT /api/admin/quotations/:id — update draft.
- GET /api/admin/quotations/:id/preview — get preview data.
- POST /api/admin/quotations/:id/issue — issue quotation.
- POST /api/admin/quotations/:id/revisions — create a new revision.
- PATCH /api/admin/quotations/:id/status — update allowed status.
- POST /api/admin/quotations/:id/response — record customer response.
- GET /api/admin/quotations/:id/pdf — generate or retrieve PDF.
- DELETE /api/admin/quotations/:id — delete draft only, permission-protected.
API requirements:
- Protect all admin routes with authentication and authorization.
- Validate all IDs, request bodies, and query parameters.
- Recalculate totals server-side.
- Prevent direct modification of issued quotations.
- Use transactions or safe update logic for numbering and revision creation.
- Return consistent response formats and appropriate HTTP status codes.
25. Suggested Frontend Components
- QuotationManagementPage
- QuotationTable / QuotationCardList
- QuotationForm
- QuotationCustomerSection
- QuotationEventSection
- QuotationServiceTypeSelector
- QuotationLineItemsEditor
- QuotationTotalsSummary
- QuotationTermsEditor
- QuotationPreview
- QuotationPdfActions
- QuotationStatusBadge
- QuotationRevisionHistory
- QuotationResponsePanel
- QuotationFilters
- QuotationSearch
- QuotationPagination
- QuotationConfirmationDialog
Reuse existing Bootstrap layout and shared form, table, modal, and notification components. Use Bootstrap Icons rather than emoji icons.
26. State Management and API Integration
- Use the shared Axios/API service and established Context API conventions.
- Keep API calls separate from presentation components.
- Maintain form data when switching Admin Panel language.
- Track loading, saving, preview generation, and PDF generation separately.
- Prevent duplicate quotation creation and issue actions.
- Recalculate displayed totals when line items change, while validating totals again on the backend.
- Preserve draft data after recoverable errors.
- Refresh linked enquiry details after quotation status changes.
27. Validation and Error Handling
- Validate customer and event details required by the business.
- Require at least one valid line item before issuing.
- Quantity must be positive and rate must be non-negative.
- Validate discount and additional-charge values.
- Prevent invalid negative grand totals.
- Validate service type against approved values.
- Validate quotation dates and validity dates.
- Validate customer response and status transitions.
- Prevent edits to issued versions; require revision instead.
- Validate all calculations on the backend.
- Display field-level errors in English and Marathi.
- Do not expose stack traces, internal IDs unnecessarily, storage paths, or secrets.
28. Security and Audit Requirements
- Require admin authentication.
- Enforce role-based permissions for create, edit, issue, revise, accept/reject status updates, and delete.
- Protect customer personal information.
- Keep internal notes and response notes out of customer-facing PDFs.
- Sanitize text fields and safely render quotation content.
- Store secrets in environment variables.
- Maintain audit history for important actions, including issue, revision, status changes, and deletion.
- Record the admin user and timestamp for each important action.
- Do not allow unauthorized changes to issued quotation snapshots.
29. Responsive Design
- Desktop: provide a structured quotation editor with line-item table and totals summary.
- Tablet: adapt the editor and preview to available width.
- Mobile: use stacked line-item cards or a mobile-friendly editor.
- Ensure currency totals remain readable.
- PDF preview and download controls must work on supported mobile browsers.
- Dialogs and dropdowns must fit smaller screens.
- Avoid horizontal overflow where possible.
30. Accessibility
- Label all form fields and calculation controls.
- Support keyboard navigation for line-item editing and dialogs.
- Provide visible focus states.
- Use accessible names for icon-only buttons.
- Do not rely only on color to communicate quotation status.
- Ensure sufficient contrast and readable text.
- Announce validation and calculation updates where practical.
- Ensure exported PDF text is selectable and readable where technically possible.
31. Performance
- Use pagination and server-side filters for quotation lists.
- Load quotation details only when required.
- Avoid unnecessary PDF regeneration; use safe caching/versioning where appropriate.
- Keep calculations efficient for typical quotation sizes.
- Use database indexes for quotation number, customer, enquiry, status, and dates.
- Avoid duplicate API calls when editing line items.
32. Testing Requirements
Frontend tests
- Create quotation manually and from enquiry.
- Add, edit, and remove line items.
- Calculate subtotal, discounts, charges, tax, and grand total.
- Validate quantities, rates, and dates.
- Switch English/Marathi without losing data.
- Preview and download PDF.
- Issue quotation and create revision.
- Record accepted/rejected/revision-requested response.
- Verify issued quotation is not directly editable.
- Test search, filters, sorting, pagination, and responsive layout.
Backend tests
- Authentication and authorization.
- Unique and concurrency-safe quotation numbering.
- Create/update draft.
- Server-side calculation and rounding.
- Validation of discounts, charges, taxes, and line items.
- Issue and revision workflow.
- Immutable issued snapshots.
- Status and response transition rules.
- PDF generation access control.
- Prevent deletion of issued quotations.
- Validate linked customer/enquiry references.
Integration tests
- Create quotation from an enquiry with correct pre-filled details.
- Package/menu changes do not alter issued quotation snapshots.
- Issued quotation PDF matches stored quotation data.
- Revision preserves previous version.
- Accepted quotation links to the booking workflow without unintended auto-confirmation.
- English and Marathi documents render correctly.
33. Acceptance Criteria
- Authorized admins can access Quotation Management.
- Admin can create a quotation manually or from an enquiry.
- Both With Material and Without Material service types are supported.
- Admin can add and edit line items in a draft.
- Totals are calculated and verified on the backend.
- Discounts, taxes, and additional charges follow owner-approved settings.
- Admin can preview and generate a readable PDF in English or Marathi.
- Quotation numbers are unique.
- Issued quotations are preserved and changes create revisions.
- Customer responses can be recorded accurately.
- Issuing or accepting a quotation does not unexpectedly confirm a booking.
- Search, filters, sorting, and pagination work.
- Permissions, privacy, responsive design, and accessibility requirements are met.
- Key workflows are covered by tests.
34. Definition of Done (DoD)
- Admin UI follows the approved design system.
- English and Marathi interface translations are complete.
- Quotation CRUD and status workflows are implemented.
- Pricing calculations are validated on the backend.
- PDF generation supports required languages.
- Enquiry/customer and package/menu integrations are tested.
- Revision history and audit controls are implemented.
- Permissions and security checks are verified.
- Responsive and accessibility checks pass.
- Unit and integration tests pass.
- Business owner has reviewed the quotation template, pricing rules, and terms.
- No critical or high-priority defects remain.
35. Pending Business Owner Decisions
Confirm before implementation:
- Quotation number format and when numbers are assigned.
- Business logo, address, phone, email, and other details to print.
- Default quotation language and whether both languages are always required.
- Whether quotation validity is used and its duration.
- Approved menu rates, package rates, units, and pricing rules.
- Whether discounts are allowed and who can approve them.
- Whether transport, setup, or other additional charges apply.
- Whether tax applies, the correct tax configuration, and required business details; confirm with the business's accountant/advisor.
- Approved payment, advance, cancellation, and rescheduling terms.
- Whether PDF files should be stored or generated on demand.
- Whether WhatsApp/email sharing automation is required.
- Which roles can issue, revise, accept, cancel, or delete quotations.
- How quotation acceptance should connect to booking confirmation.
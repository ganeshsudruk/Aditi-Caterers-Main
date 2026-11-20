12. Reports Management – Admin Panel Requirements
1. Document Information
Field	Details
Project	Aditi Caterers Website
Module	Admin Panel – Reports Management
File	12-reports.md
Status	Development Requirement
Primary Users	Owner / Authorized Admin
Languages	English and Marathi
Frontend	React + Vite, Bootstrap 5, React Router, Axios, Context API
Backend	Node.js, Express.js, MongoDB Atlas, Mongoose


2. Module Overview
The Reports Management module allows authorized administrators to view business activity and generate useful reports from the data already stored in the Aditi Caterers system.

Reports should help the business owner understand enquiries, bookings, customers, quotations, services, packages, and other operational activity. The module must present accurate information in a simple dashboard-style interface and allow permitted users to filter, view, print, and export reports.

This module is for reporting and analysis. It must not silently modify bookings, quotations, customer records, menu items, packages, or other business data.
3. Objectives
- Provide a single place to view important business reports.
- Show enquiry and booking activity over a selected period.
- Help the owner track booking statuses and event types.
- Summarize quotation activity and quoted amounts.
- Show customer and service-related summaries.
- Support date, status, and category filters where relevant.
- Provide printable and downloadable reports.
- Support English and Marathi in the admin interface.
- Protect customer information and business data through role-based access.
4. Scope
4.1 Included
- Reports overview page.
- Enquiry reports.
- Booking reports.
- Quotation reports.
- Customer reports.
- Service and event-type reports.
- Package and menu usage summaries, where the required data exists.
- Gallery, awards, and review content summaries, where useful.
- Date-range and relevant report filters.
- Summary cards, tables, and basic charts.
- CSV export for supported tabular reports.
- Print-friendly report view.
- Optional PDF export if a reliable PDF generation method is implemented.
- English/Marathi admin interface.
- Permission checks and report access logging.
4.2 Not Included
- Accounting software or a complete bookkeeping system.
- Profit, loss, or net-income reporting unless expenses and all required financial data are implemented separately.
- Tax filing, GST returns, or statutory financial reports.
- Payment collection, bank reconciliation, or payment gateway settlement reports unless those features are added in a separate approved scope.
- Automatic booking confirmation or quotation acceptance.
- Predictions, AI forecasts, or guaranteed business-performance insights.
- Customer-facing access to internal admin reports.
5. Users and Permissions
Reports must follow the Admin Panel role and permission system.
Role / Permission	Expected Access
Owner / Super Admin	View all available reports and export permitted data
Admin with report permission	View and export only the report categories granted
Staff without report permission	No access to the reports module
Unauthenticated user	No access


Suggested permission keys:
- reports.view
- reports.enquiries.view
- reports.bookings.view
- reports.quotations.view
- reports.customers.view
- reports.services.view
- reports.content.view
- reports.export
The backend must enforce permissions on every report API. Hiding a menu item in React is not sufficient authorization.
6. Navigation and Page Structure
Add a Reports / अहवाल item to the admin sidebar.

Suggested page layout:
1. Page title and short description.
2. Global date-range filter.
3. Report category tabs or navigation links.
4. Summary cards for the selected report.
5. Charts or visual summaries, when meaningful.
6. Detailed data table.
7. Export and print actions.
8. Last updated / generated timestamp.
Suggested report sections:
- Overview / आढावा
- Enquiries / चौकशी
- Bookings / बुकिंग
- Quotations / कोटेशन
- Customers / ग्राहक
- Services & Events / सेवा आणि कार्यक्रम
- Packages & Menu / पॅकेज आणि मेनू
- Website Content / वेबसाइट मजकूर
Only show report sections that are supported by implemented data and permissions.
7. Reports Overview
7.1 Summary Cards
The overview may show the following cards for the selected date range:
- Total enquiries received.
- New or pending enquiries.
- Total bookings created.
- Confirmed bookings.
- Cancelled bookings.
- Quotations created or issued.
- Accepted quotations.
- Total customers, if customer records are available.
Each card must show:
- A clear English/Marathi label.
- A count or amount with the correct unit.
- The selected reporting period.
- A comparison with a previous period only when the comparison is calculated correctly from available data.
Do not show fabricated sample business totals in production. If no records exist, show zero or a clear empty state.
7.2 Charts
Possible charts:
- Enquiries received by day, week, or month.
- Bookings grouped by status.
- Bookings grouped by event type.
- Quotations grouped by status.
- Enquiries compared with bookings over time.
Chart requirements:
- Use actual database results.
- Provide a readable title, legend, labels, and accessible text summary.
- Do not use a chart when there is insufficient data to make it useful.
- Provide a table or textual equivalent for key chart values.
- Avoid implying that enquiry count equals confirmed booking count.
- Use consistent date intervals and timezone handling.
8. Global Filters
Provide filters appropriate to the selected report.
8.1 Date Range
Support:
- Today.
- Yesterday.
- This week.
- This month.
- Previous month.
- This year.
- Custom date range.
Rules:
- Custom start date must not be later than the end date.
- Validate date input on both frontend and backend.
- Define and consistently use the business reporting timezone. Confirm the timezone with the owner before production; India Standard Time may be the intended default.
- Explain whether a report uses record creation date, event date, quotation date, or another date field.
- Do not silently mix different date meanings in one report.
8.2 Other Filters
Depending on report type, support:
- Booking or enquiry status.
- Event type.
- Service type: With Material / Without Material.
- Package, if package records are linked.
- Quotation status.
- Customer.
- Created by admin, if audit data exists.
Filters must be optional unless a report specifically requires them.
8.3 Filter Behavior
- Provide Apply and Reset actions.
- Keep selected filters visible.
- Refresh the report when Apply is selected.
- Avoid sending a request for every keystroke in text filters.
- Show a loading state while data is being fetched.
- Display a clear no-results state when no records match.
9. Enquiry Reports
The enquiry report must summarize enquiries submitted through the public website or entered by an authorized administrator.
9.1 Summary Metrics
Where data exists, show:
- Total enquiries received during the selected period.
- Enquiries by status.
- Enquiries by event type.
- Enquiries by service type.
- Enquiries by received date.
- Enquiries converted to bookings, based on an explicit enquiry-to-booking relationship.
9.2 Enquiry Table
Suggested columns:
- Enquiry reference number.
- Customer name.
- Event type.
- Event date, if provided.
- Service type.
- Enquiry received date.
- Current status.
- Linked booking reference, if available.
9.3 Rules
- Use the enquiry creation date for an enquiry-received report.
- Use the event date only for an event schedule report.
- Do not count an enquiry as a booking unless a booking record or explicit conversion relationship exists.
- Mask or omit phone numbers and email addresses in exports unless the user's permission allows access to personal contact data.
- Do not expose private notes in general summary exports.
10. Booking Reports
10.1 Summary Metrics
Show available booking counts grouped by:
- Booking status.
- Event type.
- Service type (With Material / Without Material).
- Event date period.
- Booking creation period.
Possible statuses must match the actual Booking Management implementation. Do not create a second, inconsistent status list in Reports.
10.2 Booking Table
Suggested columns:
- Booking reference.
- Customer name.
- Event type.
- Event date.
- Guest count, only if recorded.
- Service type.
- Booking status.
- Booking created date.
- Linked quotation reference, if available.
10.3 Booking Date Logic
Provide clearly labeled report modes if both are needed:
- Bookings Created: filter by booking record creation date.
- Events Scheduled: filter by event date.
Do not combine these two date meanings without labeling them.
10.4 Rules
- A booking is confirmed only when its actual booking status is confirmed.
- A public enquiry or quotation must not be counted as a confirmed booking.
- Cancelled bookings must be shown separately.
- Do not infer event completion from the event date alone; use the stored status.
- Do not treat guest count as actual attendance unless attendance is separately recorded.
11. Quotation Reports
11.1 Summary Metrics
Show:
- Total quotations created.
- Quotations issued.
- Accepted quotations.
- Rejected quotations.
- Expired quotations.
- Draft quotations.
- Total quoted value for the selected set, where monetary values are stored.
- Accepted quotation value, clearly labeled as accepted quoted value rather than received revenue.
11.2 Quotation Table
Suggested columns:
- Quotation number.
- Customer name.
- Linked enquiry or booking reference.
- Quotation date.
- Valid-until date, if configured.
- Quotation status.
- Grand total and currency.
- Last updated date.
11.3 Financial Reporting Rules
- All totals must be calculated from stored quotation line items and approved server-side calculation rules.
- Do not calculate revenue from quotation totals.
- An accepted quotation is not proof of payment.
- Do not include draft, rejected, or expired quotations in accepted quotation value.
- Clearly state which statuses are included in every amount summary.
- Use the currency configured and approved for the business. Do not assume tax rates, discounts, or additional charges.
- If currency or tax configuration is missing, show the stored amount with an appropriate warning or suppress the financial summary until configuration is approved.
12. Customer Reports
12.1 Summary Metrics
Where customer records and relationships exist, show:
- Total customer records.
- New customers created in the selected period.
- Customers with one or more linked enquiries.
- Customers with one or more linked bookings.
- Repeat customers, based on a defined booking-count rule.
12.2 Customer Table
Suggested columns:
- Customer reference.
- Customer name.
- Number of enquiries.
- Number of bookings.
- Most recent enquiry or booking date.
- Customer record created date.
Contact details must be hidden by default in general reports. Provide access only to roles with the relevant customer-data permission.
12.3 Rules
- Avoid counting duplicate customer records as one person unless a reliable deduplication rule exists.
- Do not infer customer identity from similar names alone.
- Define repeat-customer logic before enabling the metric.
- Do not expose full customer contact details in a public or unrestricted export.
13. Services and Event Reports
If service and event-type data is stored in a structured form, provide summaries for:
- Event types selected in enquiries and bookings.
- With Material and Without Material service selections.
- Number of enquiries and bookings by service type.
- Event demand by month or selected period.
Rules:
- Use the current approved service and event-type records or stored historical values.
- Preserve historical report labels if a service name is later changed, where the underlying record supports snapshots.
- Do not invent service categories or infer a service type from free-text notes.
- Do not interpret enquiry counts as confirmed demand.
14. Package and Menu Reports
If package and menu records are linked to enquiries, quotations, or bookings, provide optional summaries such as:
- Most frequently selected packages.
- Package selection counts.
- Menu item selection counts.
- Service type associated with selections.
Rules:
- Show only selections that are actually stored and linked to a relevant record.
- Do not infer popularity from public page views unless analytics tracking is implemented and approved.
- Do not calculate package profitability without cost and expense data.
- If historical quotation or booking records contain a snapshot of package details, use that snapshot for historical reporting rather than silently replacing it with the current package details.
- Do not expose unpublished or inactive menu information in public reports.
15. Website Content Reports
Optional operational summaries may include:
- Number of published gallery items.
- Number of published awards.
- Number of approved and published reviews.
- Number of draft or inactive content records.
These are content-management summaries, not marketing-performance analytics.

Do not report page views, visitors, traffic sources, or conversion rates unless a separately approved analytics integration records that data reliably.
16. Report Table Requirements
All report tables must support:
- Clear column headings in English and Marathi.
- Server-side pagination for large datasets.
- Sorting on supported fields.
- Search where relevant.
- Loading, error, and empty states.
- Responsive horizontal scrolling or an appropriate mobile layout.
- Consistent date and currency formatting.
- A visible indication of active filters.
- A generated-at timestamp.
Suggested page sizes: 10, 25, and 50 rows. The backend must enforce a maximum page size.

Do not load every record into the browser merely to calculate report totals.
17. Export and Print
17.1 CSV Export
Authorized users may export supported tabular reports as CSV.

Requirements:
- Export only records matching the currently applied filters.
- Include report name, applied date range, and generated timestamp where practical.
- Use stable, clear column names.
- Preserve Marathi Unicode text.
- Use a compatible text encoding and consider a UTF-8 BOM for spreadsheet compatibility.
- Format dates consistently.
- Keep currency values in separate numeric and currency fields where useful.
- Apply the same permission and privacy rules as the on-screen report.
- Prevent spreadsheet formula injection by safely escaping values beginning with characters such as =, +, -, or @.
- Enforce reasonable export row limits and provide a clear message when a report is too large.
17.2 PDF Export
PDF export is optional and should be implemented only if the project has a reliable PDF generation approach.

If implemented:
- Include the Aditi Caterers business name and approved logo.
- Include report title, date range, applied filters, and generated timestamp.
- Support Marathi font rendering correctly.
- Use readable page margins, table headings, and page numbers.
- Repeat table headers across pages.
- Avoid clipping long customer names or Marathi text.
- Apply the same data access restrictions as CSV export.
17.3 Print View
Provide a print-friendly layout that:
- Hides navigation, buttons, and unnecessary admin controls.
- Shows report title, filters, and generated timestamp.
- Uses readable table styling.
- Avoids splitting a row across pages where possible.
- Does not expose fields the current user is not permitted to view.
18. Bilingual Requirements – English and Marathi
The Reports module must support both English and Marathi.
18.1 Language Controls
- Reuse the existing Admin Panel language selector and language preference mechanism.
- All page titles, navigation labels, filters, buttons, table headings, status labels, validation messages, loading messages, empty states, and error messages must be translated.
- Switching language must not clear selected filters or navigate the user away from the current report.
- Use the same language preference behavior as the rest of the Admin Panel.
18.2 Report Data
- Translate system-defined labels such as status names and report categories.
- Do not automatically translate customer names, addresses, phone numbers, quotation references, or other user-entered data.
- Preserve the original customer-entered content.
- If a report title or description is generated in Marathi, ensure the export and print output uses a font that supports Marathi.
- Date and number formatting must be consistent with the selected language and approved business locale.
18.3 Suggested Labels
English	Marathi
Reports	अहवाल
Overview	आढावा
Enquiries	चौकशी
Bookings	बुकिंग
Quotations	कोटेशन
Customers	ग्राहक
Services	सेवा
Packages	पॅकेज
Menu	मेनू
Date Range	कालावधी
Apply Filters	फिल्टर लागू करा
Reset	रीसेट करा
Export CSV	CSV डाउनलोड करा
Print Report	अहवाल प्रिंट करा
No Records Found	कोणतीही नोंद आढळली नाही
Generated On	तयार केल्याची तारीख
Total	एकूण
Status	स्थिती


19. Frontend Requirements
Suggested React structure:
src/
  pages/
    admin/
      reports/
        ReportsPage.jsx
        ReportsOverview.jsx
        EnquiryReports.jsx
        BookingReports.jsx
        QuotationReports.jsx
        CustomerReports.jsx
        ServiceReports.jsx
        PackageMenuReports.jsx
        ContentReports.jsx
  components/
    admin/
      reports/
        ReportDateFilter.jsx
        ReportSummaryCard.jsx
        ReportChart.jsx
        ReportDataTable.jsx
        ReportExportActions.jsx
        ReportEmptyState.jsx
        ReportPrintHeader.jsx
  services/
    reportService.js
  utils/
    reportFormatters.js
The exact folder structure may follow the existing project conventions.
19.1 UI Guidelines
- Use Bootstrap 5 components and utilities first.
- Use Bootstrap Icons for interface icons; do not use emojis.
- Keep the design clean, professional, and consistent with the existing admin dashboard.
- Use responsive cards, tables, filters, and navigation.
- Avoid oversized headings, excessive spacing, and unnecessary decoration.
- Use accessible labels and clear focus states.
- Do not rely on color alone to communicate status.
- Use the existing design tokens and brand assets rather than introducing an unapproved color palette.
19.2 Frontend Behavior
- Fetch report data through the report service.
- Keep filters in component state or the existing shared state approach.
- Prevent duplicate requests while a request is already pending.
- Show skeletons or a loading indicator.
- Show a useful error message and retry action on failure.
- Do not calculate authoritative financial totals in the browser.
- Do not treat client-side filtering as a replacement for backend permission checks.
- Use safe rendering for customer-provided text.
20. Backend Requirements
20.1 Suggested API Routes
All routes must be protected by authentication and permission middleware.
Method	Endpoint	Purpose
GET	/api/admin/reports/overview	Overview metrics
GET	/api/admin/reports/enquiries	Enquiry report
GET	/api/admin/reports/bookings	Booking report
GET	/api/admin/reports/quotations	Quotation report
GET	/api/admin/reports/customers	Customer report
GET	/api/admin/reports/services	Service and event report
GET	/api/admin/reports/packages	Package and menu report
GET	/api/admin/reports/content	Website content summary
GET	/api/admin/reports/enquiries/export	Enquiry CSV export
GET	/api/admin/reports/bookings/export	Booking CSV export
GET	/api/admin/reports/quotations/export	Quotation CSV export
GET	/api/admin/reports/customers/export	Customer CSV export


Route names may be adjusted to match the existing backend conventions. Avoid creating an export endpoint for a report that is not implemented.
20.2 Query Parameters
Common query parameters may include:
startDate
endDate
dateField
status
eventType
serviceType
packageId
customerId
search
page
limit
sortBy
sortOrder
Only accept parameters relevant to the requested report.
20.3 Response Format
Use a consistent response structure:
{
  "success": true,
  "message": "Report generated successfully",
  "data": {
    "summary": {},
    "records": [],
    "pagination": {
      "page": 1,
      "limit": 25,
      "totalRecords": 0,
      "totalPages": 0
    },
    "filters": {
      "startDate": null,
      "endDate": null
    },
    "generatedAt": "2026-01-01T00:00:00.000Z"
  }
}
The example is a response-shape illustration only. Production values must come from the database and server clock.
20.4 Backend Implementation
- Use MongoDB aggregation pipelines for grouped counts and summaries where appropriate.
- Use indexed date, status, and relationship fields where query performance requires them.
- Validate and normalize all query parameters.
- Use allowlists for sort fields and sort directions.
- Apply pagination on the server.
- Calculate monetary totals using the same trusted rules as Quotation Management.
- Return only fields permitted for the authenticated role.
- Use consistent error response formats.
- Avoid unbounded aggregation and export operations.
- Consider query timeouts and export limits for large datasets.
21. Data Sources and Data Integrity
Reports should read from the existing collections and relationships, for example:
- Enquiries.
- Bookings.
- Customers.
- Quotations.
- Services and event types.
- Packages and menu items.
- Gallery items.
- Awards.
- Reviews.
The actual collection and field names must match the existing implementation.

Important rules:
- Do not create duplicate report records when a query can derive the report from existing data.
- Do not mutate source records while generating reports.
- Use stable references between enquiries, customers, bookings, and quotations.
- Handle deleted, archived, or unavailable related records safely.
- Define whether soft-deleted records are excluded from each report.
- Keep historical snapshots where required for accurate historical quotation and booking reports.
- Document each metric's definition so the same metric produces the same result across the dashboard and exports.
22. Suggested Metric Definitions
Metric	Definition
Total Enquiries	Count of enquiry records created within the selected enquiry-received date range, excluding records excluded by the approved deletion policy
Total Bookings Created	Count of booking records created within the selected creation date range
Events Scheduled	Count of booking records whose event date falls within the selected event date range
Confirmed Bookings	Count of records whose stored booking status is the approved confirmed status
Cancelled Bookings	Count of records whose stored booking status is the approved cancelled status
Quotations Issued	Count of quotations whose stored status indicates they were issued
Accepted Quotations	Count of quotations whose stored status indicates acceptance
Accepted Quoted Value	Sum of accepted quotation totals, not payment received
Repeat Customers	Count of customer records meeting the owner-approved repeat-booking definition
Enquiry Conversion	Enquiries with an explicit linked booking divided by eligible enquiries, using a documented denominator and date basis


If a metric cannot be calculated reliably from current data, do not display it. Record the missing data requirement for future implementation.
23. Security and Privacy
- Require a valid authenticated admin session.
- Enforce report permissions on every backend endpoint.
- Validate access to customer and financial information.
- Do not expose database credentials, JWT secrets, Cloudinary secrets, or other environment variables.
- Do not return internal notes or sensitive fields unless specifically authorized.
- Escape user-provided values in CSV exports to prevent formula injection.
- Prevent unauthorized access to exported files.
- Use HTTPS in production.
- Apply rate limits to report and export endpoints.
- Log sensitive export actions with admin ID, report type, filters, timestamp, and outcome, without copying unnecessary personal data into logs.
- Avoid logging full customer phone numbers or email addresses.
- Do not cache one administrator's private report response for another administrator.
- Follow the project's approved data retention and deletion policy.
24. Performance Requirements
- Use database aggregation instead of downloading all records to the frontend.
- Add indexes based on actual query patterns.
- Paginate detailed records.
- Limit export size and query date ranges where necessary.
- Avoid recalculating the same expensive aggregation repeatedly when a safe caching strategy is justified.
- If caching is used, define cache expiry and ensure data permissions are respected.
- Show a clear message if a report takes too long or exceeds an export limit.
- Do not show stale cached data as real-time data without a visible last-updated timestamp.
25. Error and Empty States
Provide bilingual messages for:
- No records found.
- Invalid date range.
- Failed to load report.
- Permission denied.
- Export failed.
- Export limit exceeded.
- Report data unavailable.
- Network connection problem.
The page must remain usable after an error. Provide a retry action where appropriate and do not display fabricated values as fallback data.
26. Responsive and Accessibility Requirements
- The report overview must work on desktop, tablet, and mobile.
- Filters must wrap or stack cleanly on smaller screens.
- Tables may use horizontal scrolling or a mobile-friendly presentation.
- Buttons must have accessible names.
- Inputs must have visible labels.
- Keyboard navigation and focus indicators must work.
- Charts must have text alternatives or equivalent data tables.
- Text and controls must have sufficient contrast.
- Status must be communicated through text as well as color.
- Marathi text must wrap without clipping or overlapping.
27. Testing Requirements
27.1 Functional Tests
- Verify every report category loads the correct data.
- Verify date presets and custom date ranges.
- Verify invalid date ranges are rejected.
- Verify each applicable status and category filter.
- Verify sorting, search, and pagination.
- Verify summary metrics match the underlying records.
- Verify booking-created-date and event-date reports use the correct fields.
- Verify quotation totals and accepted quotation values follow the defined rules.
- Verify CSV exports match the applied filters.
- Verify Marathi text is preserved in CSV output.
- Verify print view hides admin controls.
- Verify empty and error states.
- Verify language switching preserves report filters.
27.2 Security Tests
- Verify unauthenticated users cannot access report APIs.
- Verify users without report permission receive an appropriate forbidden response.
- Verify customer-sensitive fields are hidden for unauthorized roles.
- Verify export endpoints enforce the same access controls as report endpoints.
- Verify CSV formula-injection protection.
- Verify sort and filter parameters cannot inject database operators or arbitrary fields.
- Verify large export requests are limited.
- Verify private report data is not shared through caching.
27.3 Data Accuracy Tests
- Compare report counts with source collection records.
- Test records exactly at start and end date boundaries.
- Test records with missing optional fields.
- Test deleted or archived records according to the approved policy.
- Test quotations in Draft, Issued, Accepted, Rejected, and Expired states.
- Confirm accepted quotation value is not labeled as revenue or payment received.
- Confirm enquiries are not counted as confirmed bookings.
28. Acceptance Criteria
The Reports Management module is accepted when:
- Authorized administrators can open the Reports page.
- Unauthorized users cannot access report pages or APIs.
- The overview displays accurate metrics from real database records.
- Enquiry, booking, quotation, and customer reports work where the corresponding data exists.
- Date filters and relevant report filters work correctly.
- Report tables support pagination and useful sorting.
- CSV export respects filters, permissions, privacy rules, and Marathi text.
- Print output is readable and does not expose unauthorized information.
- English and Marathi are supported throughout the module.
- No fabricated data or unsupported financial claims are displayed.
- Reports do not modify the underlying business records.
- The interface works on desktop, tablet, and mobile.
- Functional, security, and data accuracy tests pass.
29. Definition of Done
- [ ] Reports navigation item added to the Admin Panel.
- [ ] Reports page and overview implemented.
- [ ] Supported report categories implemented.
- [ ] Date range and report-specific filters implemented.
- [ ] Backend aggregation and pagination implemented.
- [ ] Authentication and permission checks implemented.
- [ ] Metric definitions documented and verified.
- [ ] CSV export implemented for approved report types.
- [ ] Print view implemented.
- [ ] Marathi and English translations completed.
- [ ] Responsive and accessibility checks completed.
- [ ] Loading, empty, and error states completed.
- [ ] Functional and security tests passed.
- [ ] Owner review and approval completed.
30. Pending Decisions / Owner Approval
Confirm these items with the business owner before final production behavior is fixed:
1. Which admin roles should be allowed to view each report category?
2. Which roles may export customer and quotation information?
3. What reporting timezone should be used? Is India Standard Time (IST) acceptable?
4. Which booking statuses are final in the Booking Management module?
5. Which date basis should be the default for the booking report: booking creation date or event date?
6. Should reports include archived or soft-deleted records?
7. What is the approved definition of a repeat customer?
8. Should PDF export be included in the first release, or is CSV plus print sufficient?
9. What maximum date range and export row limit are acceptable?
10. Should the owner receive scheduled report summaries by email or WhatsApp? This requires a separately approved notification integration.
11. Are any additional financial fields, such as payments or expenses, planned? Until they exist, reports must not claim to show revenue, profit, or outstanding balances.
12. Should report exports include customer contact details, and which roles may access them?
31. Final Development Notes
- Reuse the existing Admin Panel authentication, language selector, layout, and permission system.
- Reuse the existing Enquiry, Booking, Customer, Quotation, Service, Package, Menu, Gallery, Awards, and Review data models.
- Keep metric definitions consistent across the overview, detailed reports, and exports.
- Build the first release around accurate operational reporting rather than unsupported analytics.
- Treat all totals as database-derived values and all financial figures according to the approved quotation rules.
- Do not invent business data, prices, tax rates, event categories, or financial outcomes.
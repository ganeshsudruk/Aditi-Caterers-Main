02 – Admin Dashboard Requirements
1. Document Information
- Project: Aditi Caterers Website
- Module: Admin Panel
- Document: Admin Dashboard Requirements
- File Name: 02-admin-dashboard.md
- Route: /admin/dashboard
- Status: Draft
2. Purpose
The Admin Dashboard is the central overview page for authorized Aditi Caterers administrators. After login, admins should be able to quickly understand enquiry activity, booking progress, upcoming confirmed events, and shortcuts to manage website content.

Dashboard information must be based on real backend/database data. Do not display fabricated counts, sample analytics, or placeholder business activity as if it were real.
3. Goals
- Provide a clear overview of the website's enquiry and booking activity.
- Make important information visible without navigating through multiple admin pages.
- Provide quick access to frequently used admin modules.
- Highlight newly received enquiries and upcoming confirmed events.
- Display analytics only when sufficient real data is available.
- Support responsive layouts for desktop, tablet, and mobile.
- Respect admin authentication, authorization, and data privacy.
4. Route and Access
- Dashboard route: /admin/dashboard
- The dashboard is accessible only to authenticated, authorized admin users.
- Unauthenticated users must be redirected to /admin/login.
- Authenticated users without dashboard permission must see an appropriate unauthorized/access-denied state or be redirected to an allowed page.
- Backend dashboard APIs must independently verify authentication and permissions.
5. Dashboard Layout
5.1 Overall Structure
The dashboard should use the established Admin Panel layout:
- Sidebar navigation
- Top navigation/header
- Main content area
- Page title and welcome area
- Summary cards
- Analytics area (if enabled)
- Recent enquiries
- Upcoming events (if available)
- Quick-action links
Maintain consistency with the approved admin design system and Bootstrap 5.
5.2 Page Header
Display:
- Heading: Dashboard
- Welcome message using the authenticated admin's display name, when available.
- Optional current date or date-range context.
- Optional refresh action for dashboard data.
Do not display sensitive account information in the welcome area.
6. Sidebar Navigation
The sidebar should provide navigation to authorized admin modules.

Suggested items:
- Dashboard
- Enquiries
- Packages
- Food Menu
- Gallery
- Awards
- Testimonials
- FAQs
- Website Settings
- Logout
Requirements:
- Use consistent icons from the project's approved icon library (e.g., Bootstrap Icons).
- Clearly highlight the currently selected route.
- Support collapse/expand behavior on desktop if needed.
- On mobile, use an accessible off-canvas menu or drawer.
- Sidebar visibility and navigation options must respect admin permissions.
- Avoid dead links; hide or disable modules that are not implemented yet.
7. Top Navigation / Header
The dashboard header may include:
- Sidebar toggle (when applicable)
- Page title or breadcrumb
- Notifications icon (optional, only if notifications are implemented)
- Admin profile menu
- Logout action
Profile menu may include:
- Admin display name
- Account/profile link (if implemented)
- Logout
Requirements:
- Keep the header uncluttered.
- Controls must have accessible names.
- Do not expose passwords, tokens, or sensitive account data.
- Notification badge counts must come from actual data.
8. Dashboard Summary Cards
Summary cards should provide a quick overview. Cards must display real database values and have clear labels.
8.1 Suggested Cards
- Total Enquiries – total enquiries recorded.
- New Enquiries – enquiries with status New.
- Contacted – enquiries with status Contacted.
- Quotations Sent – enquiries with status Quotation Sent.
- Confirmed Events – enquiries/bookings with status Confirmed.
- Upcoming Events – confirmed events with dates in the future.
The initial dashboard may show fewer cards if some statuses or booking concepts are not yet implemented.
8.2 Card Requirements
- Display label and count.
- Optional icon from the approved icon set.
- Optional comparison with a previous period only if the comparison is calculated from reliable data.
- Cards may link to the relevant filtered Enquiries/Bookings page.
- Use a consistent card size and spacing.
- Do not use arbitrary colors or gradients outside the approved dashboard design system.
- Avoid decorative animations that distract from data.
8.3 Data Rules
- Counts must be calculated by the backend or from reliable API data.
- Define the date/timezone basis for period-based counts.
- Avoid double-counting enquiries and confirmed bookings if they are represented by the same record.
- Clarify whether cancelled enquiries are included in totals.
- Show zero when the actual count is zero.
- Show a loading state while fetching data.
- Show an error state if the count cannot be retrieved; do not silently replace errors with zero.
9. Enquiry Status Summary
Provide a compact summary of enquiries by status, such as:
- New
- Contacted
- Quotation Sent
- Confirmed
- Event Completed
- Cancelled
Possible UI:
- Horizontal status cards
- Progress visualization
- Bar chart or doughnut chart, if appropriate
Requirements:
- Counts must reflect actual enquiries.
- Status names must match the Enquiry Management workflow.
- A chart must include a readable legend or labels.
- Charts must remain usable on smaller screens.
- If there is no data, show a helpful empty state instead of an empty chart.
10. Recent Enquiries Table
Display a small list of the most recently submitted enquiries.
10.1 Suggested Columns
- Customer Name
- Mobile Number (mask if required by privacy/access policy)
- Event Type
- Event Date
- Guest Count
- Catering Type
- Status
- Submitted Date
- Action (View)
10.2 Table Requirements
- Show a limited number of recent records (e.g., 5–10; configurable).
- Sort by newest submission first by default.
- Provide a link to the full Enquiries page.
- Provide a view/details action for each row.
- Use responsive table behavior or a mobile-friendly card/list view.
- Do not expose internal notes or sensitive fields in the dashboard table.
- Admin permissions must determine which customer fields are visible.
10.3 Empty State
When there are no enquiries:
- Display a clear message such as “No enquiries received yet.”
- Provide a link to the public website or an admin help action, if appropriate.
- Do not render fake enquiry rows.
11. Upcoming Events
If the system tracks confirmed event dates, display a list of upcoming events.

Suggested information:
- Event date
- Customer name
- Event type
- Guest count
- Event location/city (if available and authorized)
- Booking status
- View details action
Requirements:
- Include only confirmed bookings/events with valid future dates.
- Sort by nearest upcoming event first.
- Use the business's configured timezone.
- Display a helpful empty state if no upcoming confirmed events exist.
- Do not infer an event is confirmed from an enquiry alone.
If confirmed bookings and enquiries use the same collection, define the filtering logic clearly and avoid duplicating records.
12. Quick Actions
Provide shortcuts to common admin tasks.

Suggested actions:
- View All Enquiries
- Review New Enquiries
- Add Package
- Add Menu Item
- Upload Gallery Photo
- Add FAQ
Requirements:
- Only show actions for implemented modules and authorized roles.
- Each action must route to the correct admin page or form.
- Avoid shortcuts that lead to unavailable or unfinished pages.
- Use concise labels and clear icons.
13. Analytics and Charts (Optional)
Analytics may be included after the core dashboard is working.

Suggested analytics:
- Enquiries received over time (daily, weekly, monthly).
- Enquiries by event type.
- Enquiries by status.
- Confirmed events over time.
Requirements:
- Use real stored records.
- Allow a date-range filter if analytics support it.
- Clearly label axes, units, and series.
- Do not claim enquiry growth or conversion percentages unless the calculation is defined and data is sufficient.
- Do not include unnecessary charts that duplicate summary cards.
- Use accessible text summaries for charts where practical.
- Charts must be responsive.
Suggested date-range options:
- Last 7 days
- Last 30 days
- Last 90 days
- Custom range (optional)
Analytics definitions must be documented. For example, an enquiry conversion rate should use a clearly defined numerator (confirmed enquiries) and denominator (eligible enquiries from the same cohort/time period).
14. Notifications (Optional)
If a notification system is implemented, the dashboard may display:
- New enquiry alerts
- Upcoming event reminders
- Admin task reminders
Requirements:
- Notifications must be based on real system events.
- Provide a way to mark notifications read/unread if that functionality is implemented.
- Notification counts must reflect actual unread records.
- Do not display fake notifications.
- Avoid exposing customer information in notification previews beyond the admin's permissions.
- Notification delivery method and retention should be defined separately if email, SMS, or WhatsApp notifications are added.
15. Data Refresh and Dashboard States
Loading State
- Display loading placeholders or a clear loading indicator.
- Avoid layout shifts when data loads.
- Do not show zero values as temporary placeholders before data is fetched.
Success State
- Display real dashboard data.
- Allow the admin to refresh data if needed.
- Show the last updated timestamp if useful and accurate.
Empty State
- Display useful messages for sections without records.
- Provide relevant links or next actions.
Error State
- Display a friendly error message.
- Provide a retry action where appropriate.
- Do not leak server errors, database details, or stack traces.
- If one dashboard section fails, other successfully loaded sections may remain visible.
Refresh Behavior
- Support manual refresh.
- Optional automatic refresh may be added for active dashboard sessions, but avoid excessive API polling.
- Refresh behavior must not create duplicate requests or degrade performance.
16. Backend API Requirements
Use the project's Node.js, Express, MongoDB, and Mongoose architecture and existing API conventions.
16.1 Dashboard Overview
- GET /api/admin/dashboard/overview
Suggested data:
- Total enquiry count
- Counts by enquiry status
- Upcoming confirmed event count
- Recent enquiries
- Upcoming events (when event records/date fields support it)
16.2 Analytics (Optional)
- GET /api/admin/dashboard/analytics
Possible query parameters:
- range – supported preset such as 7d, 30d, 90d
- startDate – optional custom start date
- endDate – optional custom end date
- timezone – use only if the backend explicitly supports validated timezone selection; otherwise use the configured business timezone
Possible response data:
- Enquiries grouped by date
- Enquiries grouped by event type
- Status counts
- Optional confirmed booking statistics
16.3 API Requirements
- Admin authentication and authorization are mandatory.
- Validate query parameters.
- Use aggregation/count queries efficiently.
- Avoid returning unnecessary customer details.
- Use pagination for lists; dashboard recent lists should be limited.
- Use consistent success and error response formats.
- Define date boundaries and timezone behavior.
- Avoid expensive full-collection scans where indexes/aggregation can help.
- Never hardcode dashboard counts.
16.4 Example Overview Response
Illustrative only:
{
  "success": true,
  "data": {
    "summary": {
      "totalEnquiries": 0,
      "newEnquiries": 0,
      "contactedEnquiries": 0,
      "quotationSent": 0,
      "confirmedEvents": 0,
      "upcomingEvents": 0
    },
    "recentEnquiries": [],
    "upcomingEvents": []
  }
}
The values above are example structure only. In production, populate the response from the database.
17. MongoDB Data Integration
Dashboard data should be derived from existing Enquiry/Booking models and related content models where needed.
Data Sources
- Enquiries: enquiry collection/model.
- Confirmed Events: confirmed enquiry or booking records, according to the project's data model.
- Upcoming Events: confirmed records with valid future event dates.
- Packages/Menu/Gallery/FAQ counts: optional, only if useful and supported by actual models.
Data Rules
- Reuse existing data models rather than creating duplicate dashboard-only records.
- Use database aggregation for counts and grouped analytics where appropriate.
- Define indexes based on frequent dashboard filters.
- Use consistent status values across Enquiries and Dashboard.
- Treat missing event dates safely.
- Do not count cancelled events as upcoming confirmed events.
- Ensure all displayed values are derived from actual stored data.
18. Security and Privacy
- Dashboard route must be protected.
- Dashboard API must require authentication and authorization.
- Follow role/permission checks if multiple admin roles exist.
- Show only customer data required for dashboard operations.
- Mask sensitive information where appropriate.
- Do not expose credentials, tokens, internal notes, or stack traces.
- Protect APIs from injection and abuse.
- Use HTTPS in production.
- Log security/operational events without unnecessarily logging customer data.
19. Accessibility Requirements
- Use semantic headings and landmarks.
- Summary cards must have clear labels.
- Icons must not be the only source of meaning.
- Tables must use appropriate headings/labels.
- Charts should provide text labels or summaries.
- Navigation and actions must be keyboard accessible.
- Focus states must be visible.
- Ensure sufficient contrast.
- Loading, empty, and error states must be understandable to assistive technologies.
20. Responsive Design Requirements
Desktop
- Sidebar and header should remain organized.
- Summary cards may use a multi-column grid.
- Analytics and recent enquiry sections may use two columns where space permits.
- Tables must remain readable.
Tablet
- Sidebar may collapse.
- Cards should reflow into fewer columns.
- Analytics sections should stack when necessary.
Mobile
- Use a compact header and mobile navigation drawer.
- Summary cards should stack or use a small responsive grid.
- Recent enquiry table must switch to a suitable card layout or controlled horizontal scrolling.
- Upcoming event rows must be easy to scan.
- Quick actions must be touch-friendly.
- Avoid horizontal page overflow.
21. SEO and Indexing
Admin dashboard pages are private management pages.
- Apply appropriate noindex/robots directives.
- Do not include admin pages in the public sitemap.
- Do not expose dashboard content through public APIs.
- Remember that noindex is not a security control; authentication and API authorization are required.
22. Performance Requirements
- Fetch dashboard data using efficient queries/aggregations.
- Limit recent enquiry and upcoming event lists.
- Avoid requesting the entire enquiry collection.
- Use indexes based on query patterns.
- Avoid excessive API calls and polling.
- Lazy-load optional analytics/chart modules if beneficial.
- Keep the dashboard responsive while data loads.
- Consider caching only where it does not cause misleading stale operational data.
23. Testing Requirements
UI Tests
- Dashboard route loads for authenticated admins.
- Unauthenticated users are redirected to login.
- Sidebar navigation and active states work.
- Summary cards display API-provided data.
- Recent enquiry table renders correctly.
- Upcoming event list filters/sorts correctly.
- Quick actions route to correct pages.
- Loading, empty, and error states work.
- Responsive layout works on desktop, tablet, and mobile.
Data Tests
- Summary counts match database records.
- Status counts are correct.
- Upcoming event filtering excludes past, undated, and cancelled events.
- Recent enquiries are ordered correctly.
- Date-range analytics respect the selected range/timezone.
- No fake or hardcoded metrics appear in production.
API Tests
- Overview API requires authentication.
- Unauthorized users cannot access dashboard data.
- Aggregation results are correct.
- Invalid date ranges and query parameters are handled.
- API response does not expose unnecessary customer information.
- API errors are returned safely.
Accessibility Tests
- Navigation works by keyboard.
- Table headings and card labels are meaningful.
- Chart content has an accessible alternative.
- Focus and contrast checks pass.
24. Definition of Done
- [ ] Dashboard route implemented at /admin/dashboard.
- [ ] Authenticated and authorized access enforced.
- [ ] Sidebar and header navigation implemented.
- [ ] Summary cards display real data.
- [ ] Enquiry status summary displays correctly.
- [ ] Recent enquiries list is working.
- [ ] Upcoming events section works when supported by confirmed booking data.
- [ ] Quick actions route to implemented modules.
- [ ] Analytics/charts are implemented if included in scope.
- [ ] Notifications are implemented only if included in scope.
- [ ] Backend dashboard API is implemented and secured.
- [ ] MongoDB aggregation/count logic is verified.
- [ ] Loading, empty, and error states are implemented.
- [ ] Responsive behavior verified.
- [ ] Accessibility checks completed.
- [ ] Performance requirements verified.
- [ ] Tests pass.
- [ ] No hardcoded or fabricated dashboard data remains in production.
25. Pending Decisions
Confirm before implementation:
- Final sidebar navigation and module routes.
- Admin roles and dashboard permissions.
- Which summary cards are required for launch.
- Whether bookings use a separate collection or enquiry statuses.
- Definition of an “upcoming event”.
- Business timezone.
- Whether analytics charts are part of the initial release.
- Whether dashboard notifications are required.
- Refresh behavior (manual only or optional auto-refresh).
- Whether customer mobile numbers should be masked in dashboard lists.
- Which quick actions should appear.
26. Final Notes
This document defines the Admin Dashboard structure and behavior for the Aditi Caterers website. Dashboard metrics, charts, notifications, and upcoming event information must use real application data. Optional modules should only be displayed when implemented and approved. No fabricated business statistics, booking records, or customer enquiries may be shown as real data.
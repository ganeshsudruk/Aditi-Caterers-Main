02. Database Requirements
Project: Aditi Caterers Website
Folder: 04-backend/
File: 02-database-requirements.md
Database: MongoDB Atlas
ODM: Mongoose
Backend: Node.js + Express.js
1. Document Purpose
This document defines the database architecture, MongoDB Atlas configuration, Mongoose standards, collection planning, relationships, validation, indexing, data security, backup, and testing requirements for the Aditi Caterers website.

The database will support the public website and bilingual Admin Panel. It will store business content and operational records such as admin users, enquiries, bookings, customers, services, menus, packages, gallery items, awards, reviews, quotations, and website settings.

This is a database foundation document. Each feature module must define its detailed fields, validation rules, and business workflows in its own requirement document.
2. Database Objectives
The database must:
1. Store application data reliably in MongoDB Atlas.
2. Use Mongoose schemas for consistent structure and validation.
3. Support English and Marathi content.
4. Maintain relationships between enquiries, customers, bookings, and quotations where required.
5. Protect personal and business-sensitive information.
6. Support efficient searching, filtering, sorting, and pagination.
7. Preserve important operational history and audit information.
8. Avoid storing duplicate or unnecessary data.
9. Support development, testing, staging, and production environments safely.
10. Provide a documented backup and recovery approach.
3. Database Technology
Technology	Purpose
MongoDB Atlas	Managed cloud database
Mongoose	Schema definitions, validation, and database operations
MongoDB Compass	Optional visual database inspection
MongoDB Atlas UI	Database users, network access, monitoring, and backups


Use a supported MongoDB server version and compatible Mongoose version. Record the actual versions in the project documentation and lock file.
4. Database Environment Separation
Use separate databases or isolated Atlas clusters/projects for different environments as appropriate:
- Development: local development and test records.
- Testing: automated test data only.
- Staging: pre-production verification.
- Production: real customer and business data.
Requirements:
1. Never run automated tests against production data.
2. Do not copy production personal data into development without an approved anonymization process.
3. Use separate credentials for each environment.
4. Restrict each database user to the permissions required by that environment.
5. Keep connection strings in environment variables.
6. Document the active environment without exposing credentials.
5. MongoDB Atlas Setup
1. Create or select the Atlas project approved for Aditi Caterers.
2. Create a cluster in a suitable region after considering hosting location, latency, availability, and cost.
3. Create an application database user with a strong password.
4. Configure Network Access for the backend hosting environment.
5. Avoid allowing access from every IP address in production unless a documented infrastructure requirement justifies it.
6. Create the application database and collections through migrations or application initialization as appropriate.
7. Enable and configure backups according to the selected Atlas plan and business requirements.
8. Record the cluster region, database name, backup policy, and owner in internal deployment documentation.
Do not include actual credentials in this requirements file, Git repository, frontend source, or screenshots shared publicly.
6. Environment Variables
The backend must read the database connection string from an environment variable.

Example .env.example:
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
Requirements:
- Use a local .env file for local development.
- Add .env to .gitignore.
- Commit only .env.example with placeholder values.
- Validate MONGODB_URI during application startup.
- Do not print the connection string in logs.
- Do not expose it through any API endpoint.
- Rotate credentials if they are accidentally exposed.
7. Database Connection Requirements
Create a reusable connection module, for example:
src/config/database.js
The connection module must:
1. Read the URI from process.env.MONGODB_URI.
2. Connect using mongoose.connect().
3. Report a safe success message after connection.
4. Handle initial connection failures.
5. Handle disconnection and reconnection behavior appropriately.
6. Avoid starting the API server before the initial database connection succeeds.
7. Support graceful shutdown when the application receives a termination signal.
Do not create multiple independent MongoDB connections for each controller or route.
8. Database Naming Conventions
Use consistent names:
- Database name: a clear project-specific name selected by the team.
- Collection names: lowercase plural names, for example adminusers, customers, bookings.
- Mongoose model names: singular PascalCase, for example AdminUser, Customer, Booking.
- Field names: camelCase, for example createdAt, eventDate, phoneNumber.
- References: use ObjectId fields with explicit ref model names.
- Enum values: use stable machine-readable values, not translated display labels.
Avoid changing collection or field names casually after production data exists. Use a migration plan for schema changes.
9. Planned Collections
The following collections are expected as feature modules are implemented. Create only the collections needed by the application; do not create empty collections solely to match this list.
Collection	Purpose
adminusers	Admin accounts, roles, and account status
customers	Customer contact and profile information
enquiries	Public website enquiry submissions
bookings	Event booking records and workflow
services	Catering services and service descriptions
menus	Food/menu items and categories
packages	Approved catering packages and pricing
galleryitems	Event photographs and captions
awards	Business awards and certificates
reviews	Customer testimonials and review approval
quotations	Customer quotations and revisions
websitesettings	Public website and business configuration
auditlogs	Important admin actions and change history
notifications	Notification records, if notification tracking is implemented


Collection names must be confirmed against actual Mongoose model and collection naming configuration before deployment.
10. Common Document Fields
Where appropriate, documents should include:
{
  createdAt: Date,
  updatedAt: Date
}
Use Mongoose timestamps:
{
  timestamps: true
}
Additional fields such as createdBy, updatedBy, isDeleted, or deletedAt should be added only where the feature requires them.

Requirements:
- Use createdAt and updatedAt consistently.
- Store dates as BSON Date values, not formatted date strings.
- Store timestamps in UTC.
- Convert dates to the relevant local timezone for display and event scheduling.
- Do not rely on client device time for authoritative record creation timestamps.
11. Bilingual Data Structure
The website and Admin Panel must support English and Marathi.

For fields that need bilingual values, use a consistent object shape:
{
  title: {
    en: "Wedding Catering",
    mr: "लग्न समारंभ केटरिंग"
  },
  description: {
    en: "Catering service for wedding events.",
    mr: "लग्न समारंभासाठी केटरिंग सेवा."
  }
}
Requirements:
1. Use en for English and mr for Marathi.
2. Store both versions when the relevant module requires bilingual content.
3. Do not automatically overwrite owner-approved translations.
4. Define whether each bilingual field is required or optional in its feature schema.
5. Validate language values as strings with appropriate length limits.
6. Keep status, IDs, dates, prices, and other machine-readable fields language-neutral.
7. Store admin language preference separately from public content language.
8. Define a fallback rule for optional missing translations at the frontend/API presentation layer.
Do not store translated status values as database enum values. For example, use a stable status such as pending; translate its label in the UI.
12. Data Types and Validation Standards
Choose types based on the actual business meaning:
Data	Recommended Type
MongoDB record ID	ObjectId
Name/title	String
Description	String
Date/time	Date
Boolean setting	Boolean
Count/quantity	Number with validation
Price/amount	Consistent monetary representation
Status	String enum
Related document	ObjectId reference
Bilingual text	Object containing en and mr
Media reference	String URL and provider asset ID


Validation requirements:
- Required fields must be marked required.
- Trim user-entered strings where appropriate.
- Set maximum lengths for text fields.
- Validate phone and email formats.
- Reject invalid ObjectIds.
- Restrict status values to approved enums.
- Validate numeric values and prevent invalid negative values where not allowed.
- Validate dates and business-specific date rules.
- Do not trust frontend validation alone.
13. Customer and Personal Data
Customer records may contain names, phone numbers, email addresses, event information, and enquiry details.

Requirements:
1. Collect only information necessary to respond to the enquiry or manage the event.
2. Restrict customer data access to authorized admin roles.
3. Do not expose customer records through public APIs.
4. Do not include personal details in routine application logs.
5. Avoid duplicating customer contact details in unrelated collections unless a documented snapshot is required.
6. Define retention and deletion rules with the business owner.
7. Apply appropriate access controls to exports and reports.
8. Do not use real customer information in test fixtures.
Where a booking or quotation needs a historical snapshot of customer details, document why the snapshot is necessary and restrict access to it.
14. Relationships Between Collections
Use ObjectId references when records have a clear relationship.

Examples:
- A booking may reference a customer.
- An enquiry may reference a customer after matching or creating one.
- A quotation may reference a customer and optionally a booking or enquiry.
- An audit log may reference the admin user who performed an action.
- A gallery item may reference a gallery category if categories are stored separately.
Illustrative relationship:
{
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer"
  }
}
Requirements:
- Define relationship cardinality in each module.
- Validate referenced records exist before important operations.
- Handle deleted or archived references safely.
- Avoid excessive population of large related documents.
- Use transactions only where multiple database changes must succeed or fail together and the deployment supports the required transaction topology.
15. Enquiry, Booking, and Quotation Data Integrity
These records are related but represent different business stages.

Requirements:
1. A public enquiry is a request for information or service.
2. A booking record represents the event workflow according to the approved booking module.
3. A quotation is a price proposal and does not itself confirm a booking.
4. Issuing or accepting a quotation must not automatically confirm a booking unless a separately approved business workflow explicitly defines that action.
5. Preserve quotation versions and important status history.
6. Validate relationships between the records on the backend.
7. Prevent accidental duplicate submissions where a reliable idempotency or duplicate-detection strategy is implemented.
8. Do not assume every enquiry becomes a booking.
The exact status values and transitions must be defined in the relevant module requirements.
16. Monetary Data Requirements
Packages, quotations, reports, and other features may store prices and totals.

Requirements:
- Use one consistent representation for money throughout the application.
- Prefer integer minor units (for example, paise) or another explicitly documented decimal-safe approach; do not rely on ordinary floating-point arithmetic for financial totals.
- Record the currency explicitly where needed.
- Confirm the currency and rounding policy with the business owner before production.
- Recalculate totals on the backend.
- Never trust a total submitted by the frontend.
- Store a clear breakdown of line items, discounts, taxes, and additional charges where the quotation module requires it.
- Do not hard-code prices, tax rates, or discounts in generic database setup.
17. Indexing Requirements
Create indexes based on actual query and uniqueness requirements.

Potential indexes include:
Collection	Candidate Index
adminusers	Unique normalized email, if email is the login identifier
customers	Phone number and normalized email, according to matching rules
enquiries	Created date, status, and event date
bookings	Event date, status, and customer reference
quotations	Unique quotation number and customer reference
galleryitems	Publication status, category, and display order
awards	Publication status, year, and display order
reviews	Publication status and display order


These are candidates, not mandatory indexes. Confirm query patterns, uniqueness rules, and data quality before creating them.

Requirements:
1. Avoid unnecessary indexes because they increase storage and write costs.
2. Use unique indexes only where the business rule truly requires uniqueness.
3. Normalize values consistently before relying on unique indexes.
4. Review index usage and performance periodically.
5. Plan index creation carefully for large production collections.
18. Search, Filtering, Sorting, and Pagination
List APIs must support validated query parameters where relevant.

Example:
?page=1&limit=10&sortBy=createdAt&sortOrder=desc
Requirements:
- Apply pagination to large result sets.
- Enforce a maximum page size.
- Whitelist allowed sort fields.
- Validate filters and date ranges.
- Use indexed fields for common filters where practical.
- Avoid accepting raw MongoDB operators from client input.
- Return consistent pagination metadata.
- Consider text indexes or a dedicated search service only if actual search requirements justify them.
19. Soft Delete, Archive, and Permanent Delete
Deletion behavior must be defined per module.

Possible approaches:
- Soft delete: mark a record as deleted while retaining it.
- Archive: remove it from active views while preserving history.
- Permanent delete: remove the record when legally and operationally appropriate.
Requirements:
1. Do not apply soft deletion to every collection automatically.
2. Define whether archived records remain visible in reports.
3. Prevent deleted records from appearing in public website queries.
4. Restrict permanent deletion to authorized users.
5. Consider references, audit history, and media assets before deleting a record.
6. Follow owner-approved privacy and retention rules.
7. Do not retain personal data indefinitely without a defined business need.
20. Audit Log Requirements
Important admin actions should be auditable where required.

Potential events:
- Admin login and logout events.
- Create, update, archive, and delete actions.
- Booking status changes.
- Quotation creation, issue, revision, and status changes.
- Website settings changes.
- Changes to admin roles or permissions.
An audit record may include:
{
  actorId: ObjectId,
  action: "quotation.updated",
  entityType: "Quotation",
  entityId: ObjectId,
  createdAt: Date
}
Requirements:
- Store only the information necessary for accountability.
- Do not store passwords, tokens, or secret values.
- Restrict audit log access.
- Do not allow ordinary admins to modify audit history.
- Define retention and export rules.
- Avoid recording full sensitive customer payloads in audit metadata.
21. File and Media Metadata
Store media metadata in the relevant business document or a dedicated media collection if the project needs centralized media management.

Possible fields:
- Public or delivery URL.
- Provider asset/public ID.
- Original display filename, if needed.
- MIME type.
- File size.
- Image dimensions.
- Alternative text in English and Marathi.
- Uploaded by admin reference.
- Created date.
Requirements:
- Keep actual media files in the approved storage provider, not ordinary MongoDB documents by default.
- Validate media before storing references.
- Keep provider credentials outside the database and frontend.
- Define behavior for replacing or deleting referenced images.
- Do not expose private or unpublished media through public APIs.
22. Database Security
- Use strong database credentials.
- Restrict network access.
- Apply least-privilege database roles.
- Use TLS for database connections.
- Keep secrets in environment variables or an approved secret manager.
- Never expose database access directly to the browser.
- Access MongoDB only through the backend.
- Validate all user input.
- Protect admin routes with authentication and authorization.
- Avoid logging personal data and credentials.
- Review Atlas access and database users periodically.
- Rotate exposed or compromised credentials immediately.
23. Backup and Recovery
A backup and recovery policy must be selected based on the Atlas plan and business requirements.

Document:
- Backup method and schedule.
- Backup retention period.
- Recovery Point Objective (RPO).
- Recovery Time Objective (RTO).
- Who is authorized to restore data.
- How restoration is tested.
- How backups are protected from unauthorized access.
Requirements:
1. Confirm whether automated Atlas backups are available on the selected plan.
2. Do not assume backups are enabled by default.
3. Test restore procedures in a non-production environment.
4. Keep backup access restricted.
5. Do not store database backup files in the public frontend repository.
6. Record recovery actions for significant incidents.
24. Schema Changes and Migrations
Database schema changes must be controlled.

Requirements:
- Review changes to existing production fields before release.
- Prefer backward-compatible changes where possible.
- Provide migration scripts for data transformations.
- Back up production data before high-risk migrations.
- Test migrations on a staging copy or representative test data.
- Make migration scripts safe to rerun where practical.
- Document rollback or recovery steps.
- Do not rename or remove fields without checking all backend and frontend dependencies.
Mongoose schema validation does not automatically migrate existing documents. Migration logic must be implemented separately when needed.
25. Seed Data Requirements
Seed scripts may be used for initial development or approved setup data.

Requirements:
- Keep seed scripts separate from production startup.
- Make seed scripts safe and clearly documented.
- Do not insert fabricated awards, reviews, customer enquiries, event photos, or business claims into production.
- Use clearly identified sample records in development only.
- Do not store default admin passwords in source code.
- Create the initial admin account using a secure owner-controlled setup process.
- Never run destructive seed scripts against production.
26. Data Access Layer and Query Standards
- Keep database operations in services or repositories rather than route declarations.
- Use Mongoose models consistently.
- Select only fields needed by the API response.
- Use .lean() for read-only queries when appropriate.
- Handle missing records consistently.
- Validate ObjectIds before querying.
- Avoid unbounded queries and unnecessary population.
- Use transactions for multi-document consistency only when justified.
- Keep business rules out of raw database model hooks unless the behavior is truly schema-level.
27. Public and Admin Data Access
Separate public data retrieval from admin management operations.
Public APIs
May return only approved public content, such as:
- Published services.
- Published menus and packages.
- Published gallery items.
- Approved awards.
- Approved reviews.
- Public website settings.
Admin APIs
May access and manage records according to the admin user's role and permissions.

Never return:
- Password hashes.
- Authentication tokens or secrets.
- Private customer notes.
- Unpublished or rejected content through public endpoints.
- Internal audit metadata.
- Database connection details.
Apply authorization in the backend, not only by hiding frontend buttons.
28. Data Retention and Privacy
The business owner must approve data retention and privacy rules before production.

Define retention for:
- Enquiries that do not become bookings.
- Completed and cancelled bookings.
- Customer contact records.
- Quotations and revisions.
- Uploaded customer-provided files, if any.
- Audit logs.
- Notification delivery records.
Requirements:
- Collect only necessary information.
- Restrict access according to role.
- Provide a process for handling valid data correction or deletion requests.
- Consider legal, accounting, and business record obligations before deleting quotations or transaction-related records.
- Do not promise a retention period until the owner has approved it.
29. Performance and Scalability
- Use indexes for measured query patterns.
- Paginate large collections.
- Avoid returning large image data or unnecessary nested documents.
- Use projections for read queries.
- Review slow queries using Atlas monitoring tools.
- Avoid excessive populate chains.
- Use aggregation pipelines for reports when appropriate.
- Set practical request and query limits.
- Monitor database storage, connections, and query performance.
- Scale the Atlas cluster based on measured needs rather than assumptions.
30. Database Testing Requirements
Unit Tests
Test:
- Schema validation.
- Required fields.
- Enum restrictions.
- Bilingual field validation.
- Monetary value validation.
- Reference and ObjectId validation.
- Utility functions that prepare database queries.
Integration Tests
Test:
- Successful database connection.
- Database unavailability behavior.
- Create, read, update, and archive operations for each implemented module.
- Duplicate constraints and unique indexes.
- Relationship validation.
- Pagination, filtering, and sorting.
- Public versus admin data access.
- Audit logging where implemented.
- Migration and seed behavior in an isolated test database.
Tests must use a separate test database and must not affect production data.
31. Acceptance Criteria
- [ ] MongoDB Atlas project and environment are configured.
- [ ] Development, test, and production data are appropriately separated.
- [ ] Database credentials are stored only in secure environment configuration.
- [ ] Backend connects through one reusable Mongoose connection module.
- [ ] API startup waits for initial database readiness.
- [ ] Naming conventions are documented.
- [ ] Planned collections and module ownership are documented.
- [ ] Common timestamps and date handling are consistent.
- [ ] English and Marathi data conventions are defined.
- [ ] Schema and request validation standards are established.
- [ ] Relationships between customers, enquiries, bookings, and quotations are documented.
- [ ] Indexes are reviewed against actual query requirements.
- [ ] Pagination and safe query practices are documented.
- [ ] Public APIs expose only approved public records.
- [ ] Customer and admin data access is protected.
- [ ] Backup and recovery decisions are documented.
- [ ] Migration and seed data rules are documented.
- [ ] Automated tests use an isolated test database.
- [ ] No real credentials or customer data are committed to Git.
32. Definition of Done
This database foundation task is complete when:
1. MongoDB Atlas is configured for the development environment.
2. The backend successfully connects to the database.
3. Environment variables and Git exclusions are verified.
4. Database naming and schema conventions are documented.
5. Bilingual field conventions are agreed upon.
6. Relationship and data-access standards are documented.
7. Backup, retention, and migration decisions are recorded or explicitly marked pending.
8. Initial database connection and health behavior are tested.
9. The setup is reviewed and committed to the project repository.
33. Pending Business and Technical Decisions
The following must be confirmed rather than guessed:
- Final database name and Atlas region.
- Atlas cluster tier and expected storage requirements.
- Production hosting region and network access method.
- Backup availability, schedule, and retention.
- Recovery Point Objective and Recovery Time Objective.
- Customer and enquiry data retention periods.
- Admin roles and field-level access requirements.
- Whether customer matching uses phone, email, or both.
- Whether quotation and booking records require immutable snapshots.
- Currency and monetary rounding policy.
- Media storage provider and file limits.
- Audit log retention and access policy.
- Data export and deletion approval process.
Record approved decisions in the relevant module and deployment documentation.
End of Document
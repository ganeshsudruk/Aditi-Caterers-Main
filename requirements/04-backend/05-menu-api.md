05 - Menu API Requirements
1. Document Information
Item	Details
Project	Aditi Caterers Website
Module	Backend - Menu API
File	05-menu-api.md
Backend	Node.js, Express.js, MongoDB, Mongoose
Frontend	React, Bootstrap 5
API Style	REST API
Languages	English and Marathi
Status	Development requirements


2. Purpose
The Menu API manages the food items and menu categories displayed on the Aditi Caterers public website and used by authorized administrators.

The API must support:
- Creating, viewing, updating, publishing, hiding, and deleting menu items.
- Managing menu categories.
- Storing English and Marathi names and descriptions.
- Managing food-item images.
- Searching, filtering, sorting, and paginating menu items.
- Providing public endpoints for active menu content.
- Providing protected admin endpoints for menu management.
- Connecting menu items to packages or quotations only where the related modules explicitly support that relationship.
The API must not invent food items, ingredients, prices, availability, dietary claims, or service commitments. Such information must be entered and approved by the business owner.
3. Scope
3.1 Included
1. Menu category management.
2. Menu item management.
3. English and Marathi content fields.
4. Image upload and image metadata.
5. Active/inactive and draft/published visibility.
6. Public menu listing and item details.
7. Admin menu CRUD operations.
8. Search, filters, sorting, and pagination.
9. Input validation and API error handling.
10. Authentication, authorization, and audit information.
3.2 Not included unless separately approved
- Online food ordering or payment processing.
- Inventory, stock, or kitchen management.
- Automatic ingredient or allergen detection.
- Automatic nutrition calculation.
- Automatic menu recommendations.
- Automatic translation without administrator review.
- Customer-specific menu personalization.
- Guaranteed availability of a dish for a particular event.
- Automatic package price calculation based only on menu items.
4. Business Rules
1. Only menu items approved by the business owner may be published publicly.
2. An item must have the required content in the languages configured as mandatory by the business owner before publication.
3. English and Marathi content must be stored separately; do not overwrite one language with the other.
4. The API must not automatically translate content and publish it without review.
5. A menu item marked inactive or unpublished must not appear in public menu responses.
6. Public menu endpoints must return only published and active records.
7. Admin endpoints may return draft, inactive, and published records according to the user's permissions.
8. Prices are optional and must not be assumed. If prices are not supplied and approved, omit them from public responses.
9. Do not infer vegetarian/non-vegetarian status, ingredients, allergens, Jain suitability, spice level, or dietary suitability from the item name or image.
10. Menu item availability may vary by event, season, location, or service arrangement. Do not promise availability through this API.
11. Deleting an item that is referenced by a package, quotation, or historical record must not silently break that record. Use archive/soft-delete behavior or an approved reference-handling strategy.
12. The API must not treat a menu item as a confirmed customer order.
13. Menu changes must not silently modify previously issued quotations or historical records. Snapshot relevant item details and prices in the quotation module when a quotation is created or revised.
5. Menu Data Model
Create a Mongoose model named MenuItem.
5.1 Suggested Schema
{
  name: {
    en: { type: String, required: true, trim: true },
    mr: { type: String, required: true, trim: true }
  },
  description: {
    en: { type: String, default: "" },
    mr: { type: String, default: "" }
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuCategory",
    required: true
  },
  image: {
    url: { type: String, default: "" },
    publicId: { type: String, default: "" },
    altText: {
      en: { type: String, default: "" },
      mr: { type: String, default: "" }
    }
  },
  price: {
    amount: { type: Number, min: 0 },
    currency: { type: String, default: "INR" },
    unit: { type: String, default: "" }
  },
  dietaryType: {
    type: String,
    enum: ["vegetarian", "non_vegetarian", "vegan", "unspecified"],
    default: "unspecified"
  },
  displayOrder: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },
  publishedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null }
}
Implementation notes:
- The schema is a starting point. Confirm mandatory fields and allowed dietary labels with the business owner.
- If dietary labels are not verified, keep dietaryType as unspecified.
- Do not store a price of 0 to mean “price not provided.” Omit the amount when no approved price exists.
- Validate that a supplied price is a finite, non-negative number.
- Consider using Mongoose timestamps rather than manually maintaining timestamps.
- Use a soft-delete field or archive strategy where records may be referenced elsewhere.
6. Menu Category Data Model
Create a Mongoose model named MenuCategory.
6.1 Suggested Schema
{
  name: {
    en: { type: String, required: true, trim: true },
    mr: { type: String, required: true, trim: true }
  },
  description: {
    en: { type: String, default: "" },
    mr: { type: String, default: "" }
  },
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null }
}
6.2 Category Rules
- Category names must be unique according to a clearly defined normalization strategy.
- Do not create a fixed list of food categories without owner approval.
- Do not allow deletion of a category while active menu items reference it unless those items are reassigned or archived through an approved workflow.
- Inactive categories must not be offered for new public menu filtering.
- Existing historical records must retain their original category label or snapshot where required.
7. API Base URL and Response Format
All endpoints must use the configured API base URL, for example:
/api/v1
Use a consistent JSON response format.
7.1 Success Response
{
  "success": true,
  "message": "Menu items fetched successfully",
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 0,
    "totalPages": 0
  }
}
7.2 Error Response
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "name.en",
      "message": "English name is required"
    }
  ]
}
Do not expose stack traces, database details, Cloudinary secrets, tokens, or internal implementation details in production responses.
8. Public Menu APIs
Public endpoints must return only records where:
- status is published.
- isActive is true.
- deletedAt is null.
8.1 Get Public Menu Items
Endpoint
GET /api/v1/public/menu
Purpose

Fetch published menu items for the public website.

Optional query parameters
Parameter	Type	Purpose
category	string	Filter by category ID or approved category slug
search	string	Search item names and descriptions
featured	boolean	Return featured items only
page	number	Page number
limit	number	Number of records per page
sort	string	Approved sort option
lang	en or mr	Preferred response language


Requirements
- Validate category IDs before querying MongoDB.
- Restrict limit to a configured maximum.
- Escape or safely construct search expressions; do not pass arbitrary user-provided MongoDB operators.
- Return category details needed by the public menu.
- Preserve both language fields where the frontend needs language switching.
- If a language-specific response is requested, use the requested language and apply a documented fallback only when the corresponding field is genuinely empty.
- Do not expose admin-only fields such as internal notes, creator IDs, or audit metadata.
8.2 Get Public Menu Item Details
Endpoint
GET /api/v1/public/menu/:id
Purpose

Fetch one published menu item.

Requirements
- Validate the MongoDB ObjectId.
- Return 404 if the record does not exist, is inactive, is unpublished, or is deleted.
- Return only public fields.
- Do not reveal whether a hidden item exists to an unauthenticated caller.
8.3 Get Public Menu Categories
Endpoint
GET /api/v1/public/menu-categories
Requirements
- Return only active, non-deleted categories.
- Include only categories with at least one published, active menu item if the public UI should hide empty categories.
- Sort by displayOrder, then by a stable name field.
- Return English and Marathi names.
9. Admin Menu Item APIs
All admin endpoints must require a valid access token and the appropriate permission.
9.1 Create Menu Item
Endpoint
POST /api/v1/admin/menu
Purpose

Create a new menu item in draft status.

Example request
{
  "name": {
    "en": "Sample Food Item",
    "mr": "नमुना खाद्यपदार्थ"
  },
  "description": {
    "en": "Description pending owner approval.",
    "mr": "वर्णन मालकाच्या मंजुरीनंतर जोडले जाईल."
  },
  "category": "VALID_CATEGORY_OBJECT_ID",
  "image": {
    "url": "",
    "publicId": "",
    "altText": {
      "en": "",
      "mr": ""
    }
  },
  "displayOrder": 0,
  "isFeatured": false
}
Requirements
- Validate required English and Marathi names according to the configured content policy.
- Confirm that the category exists, is active, and is not deleted.
- Create new items as draft by default.
- Do not publish an item automatically after creation.
- Set createdBy and updatedBy from the authenticated admin, not from request data.
- Ignore or reject protected fields supplied by the client.
- Return the created record without sensitive internal data.
9.2 Get Admin Menu Items
Endpoint
GET /api/v1/admin/menu
Query parameters
- search
- category
- status
- isActive
- isFeatured
- page
- limit
- sort
- sortOrder
Requirements
- Support draft, published, archived, and inactive records for authorized users.
- Validate all filters and sort fields against an allowlist.
- Use pagination.
- Return useful category information.
- Do not allow arbitrary MongoDB query objects from the client.
9.3 Get Admin Menu Item by ID
Endpoint
GET /api/v1/admin/menu/:id
Return the full editable record to an authorized administrator. Validate the ID and return a consistent 404 response when unavailable.
9.4 Update Menu Item
Endpoint
PUT /api/v1/admin/menu/:id
Requirements
- Support updates to approved editable fields.
- Validate names, descriptions, category, price, dietary type, image metadata, order, and flags.
- Do not allow the client to set createdBy, createdAt, or other protected fields.
- Update updatedBy from the authenticated admin.
- If an already published item's public content changes, apply the configured review/publishing policy. Do not silently bypass any required approval.
- Preserve quotation and historical snapshots.
9.5 Delete or Archive Menu Item
Endpoint
DELETE /api/v1/admin/menu/:id
Requirements
- Prefer archive or soft delete over irreversible deletion.
- Check references from packages and other modules before removal.
- If references exist, prevent hard deletion and return a clear response explaining that the item must be archived or detached through an approved workflow.
- Record who performed the action and when.
- A deleted or archived item must not appear in public menu results.
9.6 Publish Menu Item
Endpoint
PATCH /api/v1/admin/menu/:id/publish
Requirements
- Verify that required language content is present.
- Verify that the category is active.
- Verify that any displayed image is valid and accessible.
- Verify all configured publication requirements.
- Set status to published and set publishedAt.
- Record the admin responsible for publishing.
- Return validation errors if publication requirements are not satisfied.
9.7 Unpublish Menu Item
Endpoint
PATCH /api/v1/admin/menu/:id/unpublish
Set the item to draft or the configured unpublished state. It must immediately stop appearing in public API results.
9.8 Update Menu Item Status
If a dedicated status endpoint is implemented, use an explicit allowlist of permitted state transitions. Do not accept arbitrary status strings.
10. Admin Menu Category APIs
10.1 Create Category
POST /api/v1/admin/menu-categories
Requirements:
- Require authentication and category-management permission.
- Validate English and Marathi category names.
- Check duplicate names using the agreed normalization policy.
- Set creator and updater from the authenticated admin.
- Create categories as active only if that is the approved default; otherwise use an inactive/draft state.
10.2 List Categories
GET /api/v1/admin/menu-categories
Support search, active status, pagination, and display-order sorting.
10.3 Get Category by ID
GET /api/v1/admin/menu-categories/:id
Return the category and a safe summary of associated menu-item counts where useful.
10.4 Update Category
PUT /api/v1/admin/menu-categories/:id
Validate changes and update updatedBy. Category renaming must not corrupt historical quotation or package snapshots.
10.5 Delete or Archive Category
DELETE /api/v1/admin/menu-categories/:id
Prevent deletion while menu items reference the category unless the records are reassigned or archived through an approved process. Prefer soft deletion.
10.6 Reorder Categories
PATCH /api/v1/admin/menu-categories/reorder
Example request:
{
  "items": [
    { "id": "CATEGORY_ID_1", "displayOrder": 1 },
    { "id": "CATEGORY_ID_2", "displayOrder": 2 }
  ]
}
Requirements:
- Validate every ID.
- Ensure the requesting admin has permission.
- Reject duplicate or invalid order values if the chosen ordering policy requires uniqueness.
- Update the order consistently; use a transaction if the operation spans multiple documents and the database deployment supports transactions.
11. Menu Image Upload
Use the project's approved image-storage provider, such as Cloudinary.
11.1 Upload Endpoint
POST /api/v1/admin/menu/upload-image
Requirements
- Require authentication and menu-edit permission.
- Accept only approved image MIME types.
- Verify actual file content rather than trusting the filename or client MIME type alone.
- Enforce a configurable file-size limit.
- Generate safe storage names; do not use user-provided filenames as trusted paths.
- Store the resulting secure URL and provider public ID.
- Return image metadata required by the admin form.
- Never expose provider API secrets in frontend code or API responses.
11.2 Replace or Remove Image
When replacing an image:
1. Upload and validate the new image.
2. Update the menu record after successful upload.
3. Remove the previous remote image only after the database update succeeds and only if no other record uses it.
4. Handle upload and database failures without leaving the record with a broken image reference.
When removing an image, clear the stored image fields and remove the remote asset only when safe.
11.3 Image Accessibility
- Store meaningful English and Marathi alt text where available.
- Do not generate descriptive alt text that claims facts not visible or confirmed.
- Provide a frontend fallback when an image is missing or fails to load.
12. Search, Filter, Sort, and Pagination
12.1 Search
Search may cover:
- English item name.
- Marathi item name.
- English description.
- Marathi description.
- Category name where practical.
Use indexed fields or a controlled search strategy. Avoid unrestricted regular expressions on large collections.
12.2 Filters
Support the following admin filters:
- Category.
- Publication status.
- Active/inactive state.
- Featured/not featured.
- Optional verified dietary type.
Only expose dietary filters if the business owner has approved and verified those labels.
12.3 Sorting
Allow only predefined sort keys, such as:
- createdAt
- updatedAt
- displayOrder
- name.en
- name.mr
Default public sorting should use displayOrder and a stable secondary key.
12.4 Pagination
- Default page and page size must be configured.
- Reject negative, non-numeric, or excessively large values.
- Return totalItems and totalPages.
- Use a maximum page size to prevent excessive database reads.
13. English and Marathi Language Support
1. Store English and Marathi values in separate fields.
2. The admin interface must support switching between English and Marathi.
3. Public responses must provide the fields needed by the frontend language selector.
4. Validate mandatory language fields before publishing.
5. Do not overwrite Marathi content when editing English content, or vice versa.
6. Do not automatically translate and publish content.
7. Keep API error codes stable; the frontend may display localized messages.
8. If localized server messages are implemented, use a controlled translation dictionary rather than translating dynamically.
9. Use UTF-8 throughout the request, database, and response pipeline.
10. Test Marathi text, punctuation, and Unicode search behavior.
14. Validation Requirements
Validate all incoming data on the server.
Field	Validation
name.en	Required according to publication policy; string; trimmed; length-limited
name.mr	Required according to publication policy; string; trimmed; length-limited
description.en	Optional string; length-limited
description.mr	Optional string; length-limited
category	Valid ObjectId; existing active category
price.amount	Optional finite non-negative number
price.currency	Approved currency code; default INR only if configured
price.unit	Optional approved text
dietaryType	Allowlisted value; use unspecified if unverified
displayOrder	Finite number within configured limits
isFeatured	Boolean
isActive	Boolean
status	Allowlisted state and permitted transition
Image URL	Valid provider URL or approved storage reference
Image public ID	String; server/provider validated


Also:
- Trim user-entered strings.
- Reject unexpected object properties where practical.
- Prevent mass assignment.
- Normalize category names before duplicate checks.
- Do not trust prices, role values, IDs, or publication status supplied by the browser without validation and authorization.
15. Authentication and Authorization
15.1 Public Endpoints
Public menu read endpoints may be unauthenticated. They must return only published, active, non-deleted content.
15.2 Admin Endpoints
Require:
- Valid JWT access token.
- Active admin account.
- Appropriate menu or category permission.
- Server-side authorization checks on every request.
Suggested permissions:
- menu.read
- menu.create
- menu.update
- menu.publish
- menu.archive
- menu.category.manage
- menu.image.upload
Use the project's existing role and permission model. Do not create a separate authentication system for this module.
16. Security Requirements
- Validate and sanitize request data.
- Use parameterized Mongoose queries and allowlisted filters.
- Prevent NoSQL injection and mass-assignment vulnerabilities.
- Apply rate limits to public search and image-upload endpoints as appropriate.
- Restrict upload size and file types.
- Keep JWT and Cloudinary secrets in environment variables.
- Configure CORS for approved frontend origins.
- Use HTTPS in production.
- Do not expose unpublished menu content through public endpoints.
- Do not expose internal IDs or audit fields unless needed by the authorized admin UI.
- Log security-relevant actions without logging credentials or tokens.
- Apply CSRF protection if cookie-based authentication is used.
17. Database Indexes and Performance
Consider indexes for common query patterns:
menuItemSchema.index({
  status: 1,
  isActive: 1,
  deletedAt: 1,
  category: 1,
  displayOrder: 1
});

menuItemSchema.index({
  "name.en": 1
});

menuItemSchema.index({
  "name.mr": 1
});

menuCategorySchema.index({
  isActive: 1,
  deletedAt: 1,
  displayOrder: 1
});
Additional requirements:
- Add indexes based on measured query patterns.
- Avoid unnecessary duplicate indexes.
- Use .select() to return only required fields.
- Use .lean() for read-only list queries where appropriate.
- Populate only the category fields required by the response.
- Review query performance with realistic data before production.
18. Suggested Backend Folder Structure
backend/
└── src/
    ├── config/
    │   └── cloudinary.js
    ├── models/
    │   ├── MenuItem.js
    │   └── MenuCategory.js
    ├── controllers/
    │   ├── publicMenuController.js
    │   ├── adminMenuController.js
    │   └── menuCategoryController.js
    ├── services/
    │   ├── menuService.js
    │   ├── menuCategoryService.js
    │   └── menuImageService.js
    ├── validators/
    │   ├── menuValidator.js
    │   └── menuCategoryValidator.js
    ├── routes/
    │   ├── publicMenuRoutes.js
    │   ├── adminMenuRoutes.js
    │   └── menuCategoryRoutes.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   ├── permissionMiddleware.js
    │   ├── uploadMiddleware.js
    │   └── errorMiddleware.js
    └── utils/
        ├── apiResponse.js
        └── pagination.js
Adapt this structure to the existing backend conventions instead of duplicating existing shared middleware or utilities.
19. Frontend Integration Requirements
The React admin menu screen should be able to:
- Load menu items with pagination.
- Search by English or Marathi name.
- Filter by category, status, and active state.
- Create and edit menu items.
- Upload, preview, replace, and remove images.
- Edit English and Marathi fields independently.
- Save an item as draft.
- Publish and unpublish items according to permissions.
- Archive items with a confirmation step.
- Display field-level validation errors.
- Show loading, empty, success, and error states.
- Prevent accidental repeated submissions while a request is pending.
The public menu page should be able to:
- Load published menu categories and items.
- Switch between English and Marathi.
- Filter by category.
- Display available descriptions and images.
- Hide unpublished or inactive items.
- Display a price only when an approved price exists.
- Show a suitable empty state when no published items are available.
Use the project's existing Axios instance, API configuration, authentication context, and language context. Do not create duplicate global state systems.
20. Error Handling
Use consistent HTTP status codes:
Status	Use
200	Successful read or update
201	Successfully created
400	Invalid input or query
401	Missing or invalid authentication
403	Authenticated but not authorized
404	Record not found or not publicly available
409	Duplicate category or conflicting operation
413	Uploaded file too large
415	Unsupported media type
422	Valid request format but business validation failed
429	Rate limit exceeded
500	Unexpected server error


Error messages must be useful but must not disclose sensitive implementation details.
21. Audit and Change History
Record relevant administrative actions:
- Menu item created.
- Menu item updated.
- Menu item published or unpublished.
- Menu item archived.
- Category created, updated, reordered, or archived.
- Image added, replaced, or removed.
At minimum, store the actor and timestamp. For important changes, consider a separate audit log containing the action and a safe before/after summary. Do not store secrets or unnecessary personal data in audit records.
22. Testing Requirements
22.1 Menu Item Tests
- Create a menu item with valid English and Marathi names.
- Reject missing required fields.
- Reject invalid category IDs.
- Reject nonexistent or inactive categories.
- Reject invalid prices and unsupported dietary values.
- Confirm new records are drafts by default.
- Update a menu item without overwriting the other language.
- Publish only when publication rules are satisfied.
- Unpublish an item and verify it disappears from public results.
- Archive an item and verify public access is denied.
- Verify referenced records are not silently broken.
22.2 Public API Tests
- Return only published and active menu items.
- Hide draft, archived, inactive, and deleted items.
- Return 404 for hidden item details.
- Filter by category.
- Search English and Marathi text.
- Return correct pagination metadata.
- Return only public fields.
22.3 Category Tests
- Create and update categories.
- Reject duplicate category names according to the approved rule.
- Prevent unsafe deletion of categories with referenced items.
- Verify category ordering.
- Hide inactive categories from public responses.
22.4 Image Tests
- Accept approved image types.
- Reject unsupported file types.
- Reject oversized files.
- Handle provider upload failures.
- Handle database update failures after upload.
- Verify old images are not deleted while still referenced.
22.5 Security Tests
- Reject unauthenticated admin requests.
- Reject users without the required permission.
- Reject mass-assignment attempts.
- Reject unsafe sort and filter parameters.
- Verify unpublished data is not exposed publicly.
- Verify secrets and stack traces are not returned.
23. Acceptance Criteria
The Menu API is ready for integration when:
- [ ] Menu item and category models are implemented.
- [ ] English and Marathi content are stored independently.
- [ ] Admin CRUD endpoints work with validation.
- [ ] Public endpoints return only published and active records.
- [ ] Draft, publish, unpublish, and archive behavior is correct.
- [ ] Category filtering and management work.
- [ ] Search, sorting, and pagination work safely.
- [ ] Image upload and replacement are handled safely.
- [ ] Prices and dietary labels are never invented or inferred.
- [ ] Admin authentication and permissions are enforced.
- [ ] Historical quotation/package information is protected from later menu edits.
- [ ] Error responses are consistent.
- [ ] Automated tests pass.
- [ ] API documentation is updated.
- [ ] Frontend integration is verified in English and Marathi.
24. Definition of Done
- Models, routes, controllers, services, validators, and middleware are implemented.
- API endpoints follow existing project conventions.
- All protected endpoints enforce authentication and permissions.
- Public endpoints expose only approved public content.
- English and Marathi data handling is tested.
- Image upload behavior is tested with success and failure cases.
- API tests pass.
- No secrets are committed to source control.
- Environment variables are documented.
- Changes are reviewed and merged through the project's Git workflow.
25. Pending Business Owner Decisions
Confirm these details before final production behavior is fixed:
1. Which menu categories should be available?
2. Are English and Marathi names mandatory before an item can be published?
3. Are menu-item prices displayed publicly, or are prices shared only through quotations?
4. Which dietary labels, if any, may be displayed after verification?
5. Which image formats and maximum upload size should be allowed?
6. Should menu items support seasonal or event-specific availability labels?
7. Should administrators require a second approval before publishing?
8. Should a public menu item detail page be available, or should items appear only in menu listings?
9. What category duplicate-matching rule should be used?
10. Should archived items remain visible to administrators indefinitely?
Do not assume answers to these questions. Use configurable defaults and obtain owner approval.
End of Document
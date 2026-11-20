06-Menu Management Requirements
1. Document Overview
Field	Details
Project	Aditi Caterers Website
Module	Admin Panel – Food Menu Management
File Name	06-menu-management.md
Primary Users	Authorized Admin
Frontend	React + Vite, Bootstrap 5, React Router
Backend	Node.js, Express.js
Database	MongoDB Atlas, Mongoose
Media Storage	Cloudinary (optional menu images)
Languages	English and Marathi
Status	Requirements Draft – Pending Business Owner Approval


2. Purpose
The Menu Management module allows authorized admins to manage the food menu displayed on the Aditi Caterers public website.

Admins should be able to create and maintain menu categories, menu items, descriptions, dietary labels, display order, and publication status. Menu items may be referenced by package details or booking/enquiry flows only where those integrations are approved and defined.

All menu items, ingredients, dietary labels, availability claims, and prices must be confirmed by the business owner. Do not create fabricated food items, ingredients, prices, or claims.
3. Scope
3.1 Included
- Menu categories management
- Add, view, edit, and archive menu items
- English and Marathi menu content
- Vegetarian / non-vegetarian / other owner-approved labels
- Menu item descriptions and optional ingredient information
- Optional menu item image upload
- Draft, publish, unpublish, and archive workflows
- Search, filter, sort, and pagination
- Display order management
- Category-based menu display
- Public website integration
- Optional package/menu associations
- Validation, testing, and acceptance criteria
3.2 Not Included
- Online food delivery or individual food-item ordering
- Payment processing
- Inventory or ingredient stock management
- Automatic nutrition or allergen calculations
- Automatic menu recommendations
- Catering quotation calculation
- Guaranteed availability of a menu item for a specific event
These are outside scope unless separately approved and documented.
4. Navigation and Access
- Admin navigation must include Menu Management / मेनू व्यवस्थापन.
- Suggested route: /admin/menu.
- Suggested category route: /admin/menu/categories.
- Add/edit routes may use:
  - /admin/menu/new
  - /admin/menu/:menuItemId/edit
- Only authenticated and authorized admins may access these routes and APIs.
- Direct URL access must be protected by route guards and backend authorization.
- Follow the shared Admin Panel layout and responsive design system.
5. Mandatory English and Marathi Language Support
The complete Admin Panel must support English and Marathi through the centralized language system. Menu Management must not implement a separate, isolated language switcher or translation logic.
5.1 Interface Translation
Translate all module interface content, including:
- Page headings and breadcrumbs
- Menu and category labels
- Buttons, tooltips, and action menus
- Table headings, filters, sorting, and pagination
- Form labels, placeholders, and helper text
- Status labels and dietary labels
- Validation errors and server feedback
- Confirmation dialogs, notifications, and empty states
- Image upload instructions and errors
5.2 Menu Content in Both Languages
Each menu category and menu item should support English and Marathi content.
- Category name: English and Marathi
- Menu item name: English and Marathi
- Description: English and Marathi (optional)
- Ingredients: English and Marathi (optional, owner-approved)
- Image alt text: English and Marathi (when image is used)
- Other content fields should support both languages if they are shown publicly.
Admins must enter or review both language versions. Do not automatically translate content or overwrite one language with the other.
5.3 Language Behavior
- The shared Admin Panel language switcher must be available.
- Switching interface language must not clear unsaved menu form data.
- Selected interface language should persist according to the shared language system.
- Centralized translation keys and resources must be used.
- Public website language preference and Admin Panel language preference must not unexpectedly overwrite one another.
- Missing-content fallback must follow an agreed project rule; incomplete translations should be clearly identified in Admin.
6. Menu Management Overview
6.1 Page Header
Display:
- Page title: Menu Management / मेनू व्यवस्थापन
- Short description
- Add Menu Item / नवीन पदार्थ जोडा action
- Optional summary cards:
  - Total menu items
  - Published items
  - Draft items
  - Archived items
  - Total categories
6.2 Menu Item List
Use a responsive Bootstrap table or list/cards for smaller screens.

Suggested columns:
Column	Description
Item Name	Name in selected content language
Category	Assigned menu category
Image	Thumbnail or placeholder
Food Type	Owner-approved dietary label
Status	Draft, Published, Unpublished, Archived
Display Order	Public display position
Updated At	Last update date
Actions	View, Edit, Preview, Publish/Unpublish, Archive/Restore


- Include loading, empty, error, and retry states.
- Keep the table uncluttered; full descriptions belong in details/edit views.
- Use accessible labels for actions and status indicators.
7. Menu Categories
7.1 Category Management
Admins may manage menu categories, subject to permission:
- Add category
- Edit category
- View category
- Change category display order
- Activate / deactivate category
- Archive category (if supported)
Category examples may be entered by the business owner; examples must not be treated as confirmed categories until approved.
7.2 Category Fields
Field	Required	Notes
Category Name (English)	Required	Public category name
Category Name (Marathi)	Required for Marathi publishing	Owner-approved translation
Description (English)	Optional	Category description
Description (Marathi)	Optional	Marathi version
Display Order	Optional	Non-negative integer
Status	Required	Active / Inactive
Slug	System-managed or optional	Must be unique if used in URL


7.3 Category Rules
- Prevent deleting categories that contain menu items unless items are reassigned or a safe archive workflow is used.
- Inactive categories must not appear in public menu navigation.
- Categories should be ordered consistently.
- Categories and items should support English and Marathi views.
8. Add Menu Item
8.1 Menu Item Form Fields
Field	Required	Notes
Item Name (English)	Required	Menu item name
Item Name (Marathi)	Required for Marathi publishing	Owner-approved translation
Category	Required	Select active category
Description (English)	Optional	Approved description
Description (Marathi)	Optional	Approved Marathi description
Ingredients (English)	Optional	Only if owner provides verified information
Ingredients (Marathi)	Optional	Marathi version
Food Type	Required	Owner-approved value, e.g. Veg / Non-Veg / Other
Image	Optional	Approved image
Image Alt Text (English)	Optional	Accessible description
Image Alt Text (Marathi)	Optional	Accessible description
Display Order	Optional	Non-negative integer
Status	Required	Draft by default
Featured	Optional	Only if public website supports featured items


8.2 Form Controls
- Text inputs for item names.
- Textareas for descriptions and ingredients.
- Category selector.
- Food-type selector using approved options.
- Optional image upload and preview.
- Numeric display-order control.
- Draft/publish status control.
- Save Draft, Save, Preview, and Cancel actions.
- Use existing Bootstrap form patterns and accessible labels.
8.3 Validation
- English item name is required.
- Marathi name must be completed before Marathi publication, according to the bilingual publishing rule.
- Category must exist and be active for publishing.
- Food type must be selected from allowed values.
- Trim unnecessary whitespace.
- Enforce field length limits.
- Display order must be a non-negative integer.
- Validate image type, size, and dimensions on both client and server.
- Reject empty descriptions/ingredients when entered as required fields.
- Prevent duplicate item names within a category if the agreed uniqueness rule requires it.
- Show validation errors near relevant fields in the currently selected admin language.
- Preserve form input when validation or server errors occur.
9. Edit and View Menu Item
- Admin can view menu item details.
- Edit form must load saved English and Marathi content independently.
- Changing one language must not overwrite the other.
- Admin can change category, food type, display order, image, and publication status based on permissions.
- Show the existing image and allow replace/remove if media is enabled.
- Warn about unsaved changes before navigating away.
- Preserve record ID and stable slug unless slug changes are explicitly supported.
- Update updatedAt and updatedBy after successful edits.
10. Search, Filters, Sorting, and Pagination
10.1 Search
Search menu items by:
- English item name
- Marathi item name
- Category name
- Slug, if implemented
Search should be debounced and use backend querying when needed.
10.2 Filters
Support applicable filters:
- Category
- Food Type
- Status: All, Draft, Published, Unpublished, Archived
- Featured: Yes / No, if applicable
- Translation completeness (optional)
10.3 Sorting
Allow sorting by:
- Item name
- Category
- Display order
- Created date
- Updated date
10.4 Pagination
- Backend pagination is required as the menu grows.
- Page-size options may be 10, 20, or 50.
- Preserve filters and sort selection between pages.
- Display total count and current page.
11. Food Type and Dietary Labels
- Food-type options must be configured or approved by the business owner.
- Possible labels include Vegetarian, Non-Vegetarian, and other approved categories, as appropriate to the actual menu.
- Do not assume an item's food type based solely on its name.
- Labels must be available in English and Marathi.
- Use text labels, not color alone, to distinguish food types.
- Do not display allergen-free, vegan, gluten-free, Jain, or other dietary claims unless verified and owner-approved.
- Any allergen or dietary information must be entered based on reliable business-provided details; do not calculate or infer it automatically.
12. Menu Item Images (Optional)
- Admin may upload an owner-approved image for a menu item.
- Allowlist supported image formats (e.g., JPEG, PNG, WebP).
- Validate size, dimensions, and file content on the backend.
- Use Cloudinary or the approved media provider; do not store binary image files in MongoDB.
- Show upload progress and localized success/error messages.
- Allow replacing/removing images if image is optional.
- Use responsive image sizes and lazy loading on the public website.
- Alt text should support English and Marathi.
- Only use genuine approved menu photographs or images that accurately represent the food. Do not present stock images as actual Aditi Caterers food.
- Clean up unused media safely after confirming it is not referenced.
13. Menu Item Display Order
- Admin can set display order within a category.
- Public menu should sort categories and items consistently.
- Optional move-up/move-down or drag-and-drop ordering may be implemented.
- If drag-and-drop is used, keyboard-accessible alternative controls must be provided.
- Define a stable secondary sort for items with the same order.
- Archived or unpublished items must not be included in public ordering.
14. Draft, Publish, Unpublish, and Archive
14.1 Recommended Statuses
- draft – saved but not publicly visible
- published – eligible for public display
- unpublished – hidden from public display
- archived – removed from normal admin list; may be restored
14.2 Publishing Rules
- Publishing requires confirmation.
- Validate the required content for public languages before publishing.
- Only published menu items under active categories should appear on public endpoints.
- Unpublishing hides an item without deleting its record.
- Draft, unpublished, and archived items must never be returned by public APIs.
- Status changes update audit fields and updatedAt.
- Public display should update after the application's cache/revalidation process.
14.3 Archive and Restore
- Prefer archive over permanent deletion for menu items referenced by packages or past enquiries.
- Archived items should be excluded from the normal admin list by default and from public display.
- Provide an archived-items view/filter.
- Restoring an item should return it to Draft or Unpublished unless publishing is explicitly confirmed.
- Permanent deletion, if allowed, must be restricted and carefully checked for references.
15. Preview
- Admin can preview how menu items appear on the public website.
- Preview should include category, item name, description, food-type label, and image if present.
- Preview should support English and Marathi.
- Preview must not change the item's publication status.
- Draft preview must not be accessible to public or unauthorized users.
- Clearly identify preview mode in the Admin interface.
16. Public Website Integration
- Public Food Menu page should fetch menu categories and published items from backend.
- Return only published items in active categories.
- Provide content in the selected public language, using the agreed translation fallback.
- Display category sections and item cards/list rows in the configured order.
- Show only approved content and accurate dietary labels.
- If no published menu exists, show an approved empty state instead of fabricated menu data.
- Handle loading and API failure gracefully.
- Menu items may be referenced by packages or booking/enquiry forms only if those integrations are approved and consistent with their requirements.
- Public API must not expose admin-only metadata.
17. Suggested MongoDB / Mongoose Data Model
17.1 Menu Category
Suggested collection: menuCategories
{
  _id: ObjectId,
  name: {
    en: String,
    mr: String
  },
  description: {
    en: String,
    mr: String
  },
  slug: String,
  displayOrder: Number,
  status: "active" | "inactive" | "archived",
  createdBy: ObjectId,
  updatedBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
17.2 Menu Item
Suggested collection: menuItems
{
  _id: ObjectId,
  name: {
    en: String,
    mr: String
  },
  slug: String,
  categoryId: ObjectId,
  description: {
    en: String,
    mr: String
  },
  ingredients: {
    en: [String],
    mr: [String]
  },
  foodType: String,
  image: {
    url: String,
    publicId: String,
    alt: {
      en: String,
      mr: String
    }
  },
  displayOrder: Number,
  featured: Boolean,
  status: "draft" | "published" | "unpublished" | "archived",
  createdBy: ObjectId,
  updatedBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
17.3 Schema Notes
- Add timestamps using Mongoose timestamps or equivalent.
- Define validation and allowed status/food-type enums.
- Index category, status, display order, and relevant search fields.
- Enforce slug uniqueness according to the chosen scope.
- Validate referenced category existence and status.
- Do not store admin credentials or unrelated customer data in menu records.
- This schema is a proposal; confirm with backend architecture before implementation.
18. Suggested API Endpoints
Admin endpoints must be authenticated and authorized.
Menu Categories
Method	Endpoint	Purpose
GET	/api/admin/menu/categories	List categories with filters/pagination
GET	/api/admin/menu/categories/:categoryId	Get category details
POST	/api/admin/menu/categories	Create category
PUT/PATCH	/api/admin/menu/categories/:categoryId	Update category
PATCH	/api/admin/menu/categories/:categoryId/status	Activate/deactivate/archive
PATCH	/api/admin/menu/categories/reorder	Update category order if supported


Menu Items
Method	Endpoint	Purpose
GET	/api/admin/menu/items	List menu items with search, filters, sorting, pagination
GET	/api/admin/menu/items/:itemId	Get menu item details
POST	/api/admin/menu/items	Create menu item
PUT/PATCH	/api/admin/menu/items/:itemId	Update menu item
PATCH	/api/admin/menu/items/:itemId/status	Publish/unpublish/archive
PATCH	/api/admin/menu/items/reorder	Update item ordering if supported
PATCH	/api/admin/menu/items/:itemId/restore	Restore archived item if supported
DELETE	/api/admin/menu/items/:itemId	Restricted permanent deletion, only if approved


Public Endpoints
Method	Endpoint	Purpose
GET	/api/public/menu	Get active categories with published menu items
GET	/api/public/menu/categories/:slug	Get published items for one category


18.1 API Requirements
- Validate and sanitize all request data.
- Use consistent response formats and HTTP status codes.
- Enforce pagination limits and allowlisted sort fields.
- Do not trust user-provided admin identity or permissions.
- Public endpoints must exclude audit and internal metadata.
- Return appropriate errors for invalid IDs, missing categories, duplicate slugs, validation failures, and media upload failures.
- Use localized-safe error codes; frontend should map them to language resources.
19. Frontend Component Suggestions
Possible component structure:
- MenuManagementPage
- MenuItemTable
- MenuItemForm
- MenuItemDetails
- MenuCategoryManagement
- MenuCategoryForm
- MenuFilters
- MenuSearch
- FoodTypeBadge
- MenuImageUpload
- MenuPreview
- PublishConfirmationModal
- ArchiveConfirmationModal
19.1 State and Data Handling
- Use the shared state-management and API service conventions.
- Keep fetched list state and form state separate.
- Use centralized Admin language state.
- Avoid unnecessary full-page reloads.
- Refresh or update lists after create/edit/status/archive/restore actions.
- Show loading, empty, success, and error states consistently.
20. Security and Permissions
- Protect admin routes with authentication.
- Enforce permissions on backend endpoints, not only frontend route guards.
- Validate image uploads, size, and file type.
- Sanitize rich text if rich text is enabled.
- Prevent injection and unsafe HTML rendering.
- Store secrets in environment variables.
- Do not expose credentials or internal metadata in public responses.
- Rate-limit sensitive admin endpoints where appropriate.
- Log significant changes to menu items and categories if audit logging is available.
21. Responsive UI Requirements
- Desktop: table/list with category, item, food type, status, order, and actions.
- Tablet: responsive table or compact list with essential fields.
- Mobile: card/list layout with accessible action menus.
- Forms must use appropriate field grouping and mobile-friendly controls.
- Language switcher and key actions must remain reachable.
- Dialogs and previews must fit small screens.
22. Accessibility
- Use semantic headings and properly associated form labels.
- All controls must be keyboard accessible.
- Provide visible focus states.
- Ensure text and status labels meet contrast requirements.
- Food type/status must not be indicated by color alone.
- Images need meaningful alt text in the active language.
- Validation and operation feedback must be announced accessibly.
- Reordering controls must have a keyboard-accessible alternative.
23. SEO and Public Content
- Public menu page should use appropriate page title and description in English and Marathi.
- Category anchors or URLs should be stable if used.
- Draft, unpublished, and archived menu content must not be indexed.
- Public content must be owner-approved and accurate.
- Do not expose internal admin data in public page metadata or API responses.
24. Testing Requirements
24.1 Frontend Tests
- Menu list and categories load correctly.
- Search across English and Marathi names works.
- Filters, sorting, and pagination work.
- Category create/edit/status actions work.
- Menu item create/edit validation works.
- English and Marathi content remain independent.
- Language switching does not clear entered data.
- Preview supports both languages and does not publish.
- Publish, unpublish, archive, and restore flows work.
- Image upload validation and progress work if enabled.
- Responsive layouts work on desktop, tablet, and mobile.
- Loading, empty, error, and success states are handled.
24.2 Backend Tests
- Authentication and permissions are enforced.
- CRUD endpoints validate required fields.
- Category references are validated.
- Public API returns only published items in active categories.
- Draft, unpublished, and archived records are excluded from public results.
- Duplicate slug/name rules are enforced.
- Filtering, sorting, and pagination are validated.
- Upload validation works if media is enabled.
- Public response does not expose internal metadata.
24.3 Integration Tests
- Admin-created categories and items appear on public Food Menu after publishing.
- Edits reflect after the agreed cache/revalidation behavior.
- Unpublishing removes the item from public display.
- Archiving prevents public display.
- Package or booking integrations, if enabled, reference only eligible menu items.
- English and Marathi content render correctly.
25. Acceptance Criteria
The module is accepted when:
- Authorized Admin can access Menu Management.
- Admin can create, view, edit, search, filter, sort, and paginate menu items.
- Admin can create and maintain menu categories.
- English and Marathi names and content can be maintained independently.
- The entire Admin interface switches between English and Marathi.
- Selected Admin language persists according to the shared language system.
- Admin can preview menu items in both languages without publishing.
- Food type labels are accurate and owner-approved.
- Draft, unpublished, and archived items are hidden from public endpoints.
- Publishing and unpublishing work correctly.
- Display order is respected on the public menu.
- Optional image uploads work securely.
- Public Food Menu shows only approved, published items.
- Loading, empty, validation, error, and success states are implemented.
- Responsive and accessibility checks pass.
- Backend authorization, validation, and security checks pass.
- Automated tests and manual QA are completed.
26. Definition of Done
- [ ] Requirements reviewed and approved.
- [ ] Admin UI implemented with shared layout and Bootstrap.
- [ ] Centralized English/Marathi language support integrated.
- [ ] Category CRUD and status management completed.
- [ ] Menu item CRUD and status management completed.
- [ ] Database schema and indexes reviewed.
- [ ] API validation, authorization, and error handling completed.
- [ ] Image upload integration completed if enabled.
- [ ] Public Food Menu integration completed.
- [ ] Preview, ordering, archive, and restore workflows completed as agreed.
- [ ] Unit, API, and integration tests pass.
- [ ] Responsive QA completed.
- [ ] Accessibility checks completed.
- [ ] Owner-approved English and Marathi menu content entered.
- [ ] No fabricated food names, ingredients, dietary labels, or prices remain.
- [ ] Code review and merge completed.
27. Pending Business Owner / Project Decisions
Confirm before implementation or launch:
- Final menu categories in English and Marathi.
- Final food item names and translations.
- Which descriptions and ingredients may be published.
- Food type labels and any dietary/allergen information.
- Which menu items should be visible publicly.
- Whether menu images are required and who will provide them.
- Whether menu items should be linked to packages or booking/enquiry forms.
- Display order rules.
- Missing translation fallback behavior.
- Whether permanent deletion is permitted or archive-only.
- Admin roles and permissions for menu management.
- Whether any prices should be displayed (must be owner-confirmed).
Document End
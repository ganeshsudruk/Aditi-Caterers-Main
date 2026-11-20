07 - Gallery Page Requirements
1. Document Information
Field	Details
Project	Aditi Caterers Website
Module	Public Website
Page	Gallery
Document	07-gallery-requirements.md
Suggested file	requirements/01-public-website/07-gallery-requirements.md
Task ID	AC-FE-007
Route	/gallery
Priority	Medium
Status	Draft - content and media require business-owner approval
Languages	English and Marathi


2. Introduction
The Gallery page showcases genuine photographs of Aditi Caterers' food, catering arrangements, event setups, and other approved business activities.

The page should help visitors understand the style and presentation of the catering services and encourage them to submit an enquiry for their event.

Only authentic, owner-approved media may be published. Do not use stock photos, sample images, or AI-generated images as if they were actual Aditi Caterers events.
3. Objectives
- Present approved catering and food photographs professionally.
- Allow visitors to browse photographs by category.
- Provide a responsive gallery experience on mobile, tablet, and desktop.
- Support English and Marathi interface text.
- Provide an image preview/lightbox.
- Connect gallery visitors to the booking and contact pages.
- Load gallery content dynamically from the backend.
- Allow authorized admins to manage gallery content through the Admin Panel.
4. Technology Stack
Technology	Purpose
React + Vite	Frontend
Bootstrap 5	Responsive layout and components
Bootstrap Icons	Interface icons
React Router DOM	Page navigation
Context API	Language management
Axios	API communication
Node.js + Express.js	Backend
MongoDB + Mongoose	Gallery data storage
Cloudinary + Multer	Image upload and media storage


The stack must remain consistent with the main project architecture. Do not introduce a separate technology without team approval.
5. Page Route and Navigation
Main route:

/gallery

Requirements:
- The Gallery page must be accessible from the main website navigation.
- The page must work when opened directly through its URL.
- Browser refresh must not produce a routing error.
- Use the shared Navbar and Footer components.
- Add a breadcrumb if breadcrumbs are used consistently across the public website.
- The page title and navigation label must support English and Marathi.
Suggested breadcrumb:

Home > Gallery
6. Page Layout and Sections
Suggested page structure:
1. Breadcrumb.
2. Hero / Page Heading.
3. Short Introduction.
4. Gallery Category Filters.
5. Photo Gallery Grid.
6. Optional Featured Gallery Section.
7. Optional Video Gallery.
8. Enquiry Call-to-Action.
9. Standard Footer.
The final layout should follow the approved Aditi Caterers brand guidelines and remain visually consistent with the other public pages.
7. Hero Section and Introduction
Display:
- Page heading: Our Gallery.
- Marathi heading: आमची गॅलरी (final wording to be approved).
- A short introduction describing the photographs visitors can explore.
Suggested English copy:
Explore photographs of our food, catering arrangements, and event celebrations. Discover the presentation and catering services offered by Aditi Caterers.

Suggested Marathi copy:
आमचे खाद्यपदार्थ, केटरिंग व्यवस्था आणि कार्यक्रमांमधील काही खास क्षण छायाचित्रांमधून पहा.

The final English and Marathi content must be reviewed by the business owner. Do not claim that every photograph represents a completed customer event unless verified.
8. Gallery Categories and Filters
Suggested categories:
- All.
- Wedding.
- Birthday.
- Engagement.
- Food and Menu.
- Catering Setup.
- Other Events.
These categories are suggestions. The owner must confirm which event categories are relevant and approved.
Filter behavior
- All displays all published gallery items.
- Selecting a category displays only published items assigned to that category.
- The active category must be visually identifiable.
- Switching categories should not reload the entire page where practical.
- Display an informative empty state if a category has no published items.
- Category labels must support English and Marathi.
- Do not display empty categories unless specifically requested.
9. Photo Gallery Grid
Display approved images in a responsive grid.
Layout requirements
- Desktop: use a balanced multi-column grid.
- Tablet: reduce the number of columns based on available width.
- Mobile: use one or two columns depending on image proportions and screen width.
- Maintain consistent spacing and alignment.
- Avoid excessively tall cards and unnecessary blank space.
- Use suitable image aspect ratios.
- Use object-fit: cover for thumbnails where cropping is appropriate.
- Never stretch or distort images.
- Allow visitors to view the larger image in the preview.
Gallery item information
Each item may contain:
- Image.
- Title.
- Caption.
- Category.
- Event date or year, only if verified and approved.
- Location, only if approved for public display.
Optional fields must not be mandatory when the information is unavailable.
10. Image Preview / Lightbox
When a visitor selects an image, open a larger preview.

Requirements:
- Display the selected image at a suitable size.
- Provide a visible close button.
- Provide previous and next controls when multiple images are available.
- Show title or caption when available.
- Close with the Escape key.
- Support keyboard navigation where practical.
- Prevent unintended interaction with the background while the preview is open.
- Keep the image and controls within the viewport on mobile.
- Provide accessible labels for all controls.
- Restore focus to the selected gallery item after the preview closes.
11. Featured Gallery (Optional)
The owner may select photographs to feature prominently.

Possible collections:
- Wedding Catering Highlights.
- Food Presentation.
- Catering Arrangements.
- Event Highlights.
These are examples only. Display a collection only when approved matching content exists.

Featured images may appear near the top of the Gallery page. Home page integration should be implemented only if it is included in the Home page requirements.
12. Video Gallery (Optional)
Video support is optional and requires business-owner approval.

Possible video content:
- Event highlights.
- Food preparation clips.
- Catering setup videos.
- Customer-approved event videos.
Requirements:
- Use an approved video hosting or embedding solution.
- Do not upload large video files directly to the application server without an approved storage strategy.
- Display a thumbnail and optional title.
- Play only after visitor interaction.
- Do not autoplay videos with sound.
- Provide accessible controls and captions where available.
- Handle unavailable or removed videos gracefully.
If no approved videos are available, exclude the video section from the first release.
13. Enquiry Call-to-Action
Add a clear CTA after the gallery content.

Suggested English content:

Planning an Event?

Explore our catering services and contact Aditi Caterers to discuss your event requirements.

Suggested Marathi content:

कार्यक्रमाचे नियोजन करत आहात का?

तुमच्या कार्यक्रमाच्या केटरिंगविषयी चर्चा करण्यासाठी Aditi Caterers शी संपर्क साधा.

Suggested buttons:
English	Marathi	Destination
Enquire Now	चौकशी करा	/booking
Contact Us	संपर्क साधा	/contact
WhatsApp Us	WhatsApp वर संपर्क करा	Approved WhatsApp link


Do not promise availability, pricing, or response times unless approved by the owner.
14. Admin Panel Integration
Gallery content must be managed through the Admin Panel.

Authorized admins should be able to:
- Add a gallery item.
- Upload an image.
- Enter or edit title and caption in English and Marathi.
- Select a category.
- Add an event date or year if verified.
- Set display order.
- Mark an item as featured if enabled.
- Publish or unpublish an item.
- Edit existing items.
- Delete an item after confirmation.
Publishing rules
- New uploads should remain unpublished until reviewed and published.
- Only published items may appear on the public Gallery page.
- Unpublished items must not be accessible through public APIs.
- Deleting an item must follow the media-storage cleanup policy.
- Record important admin changes if audit logging is implemented.
Detailed Admin Panel functionality will be covered in the separate Admin Panel requirements documents.
15. Image Upload and Media Requirements
Accepted formats
- JPEG / JPG.
- PNG.
- WebP.
- AVIF only if supported by the approved image-processing and browser strategy.
Upload validation
- Validate file type and actual file content on the backend.
- Apply a configurable maximum upload size.
- Reject unsupported or corrupted files.
- Generate optimized display variants where possible.
- Use unique storage identifiers.
- Do not use the original filename as a storage path.
- Prevent executable files from being uploaded as images.
Storage
Cloudinary is the proposed media storage provider.
- Store media in the approved Cloudinary account.
- Store the secure URL and public ID in MongoDB.
- Do not store large binary image files directly in MongoDB.
- Keep provider credentials in environment variables.
- Define a safe replacement and deletion process.
- Document an alternative if Cloudinary is not selected.
16. Suggested MongoDB Data Model
Suggested collection: galleryItems.
{
  title: {
    en: String,
    mr: String
  },
  caption: {
    en: String,
    mr: String
  },
  category: String,
  mediaType: String, // IMAGE or VIDEO
  image: {
    secureUrl: String,
    publicId: String,
    width: Number,
    height: Number,
    format: String
  },
  eventDate: Date,
  location: String,
  isFeatured: Boolean,
  isPublished: Boolean,
  displayOrder: Number,
  createdBy: ObjectId,
  updatedBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
This is a proposed structure. Video fields may be added only if video support is approved.
Validation
- Validate title and caption lengths.
- Validate category against approved values.
- Validate media type and required media fields.
- Validate storage URLs and identifiers.
- Validate display order.
- Ensure unpublished content is excluded from public results.
17. Backend API Requirements
Suggested public APIs:
Method	Endpoint	Purpose
GET	/api/gallery	Get published gallery items
GET	/api/gallery/categories	Get categories with published content
GET	/api/gallery/:id	Get a published item if detail access is required


Suggested admin APIs:
Method	Endpoint	Purpose
GET	/api/admin/gallery	Get all items, including unpublished
GET	/api/admin/gallery/:id	Get one item for editing
POST	/api/admin/gallery	Create a gallery item
PUT	/api/admin/gallery/:id	Update a gallery item
PATCH	/api/admin/gallery/:id/publish	Publish or unpublish
DELETE	/api/admin/gallery/:id	Delete an item


API requirements:
- Protect admin APIs with authentication and authorization.
- Validate request bodies and query parameters.
- Support pagination and category filtering.
- Return only published items from public endpoints.
- Use consistent JSON responses and HTTP status codes.
- Never expose media-provider secrets or private admin fields.
18. Frontend Components
Suggested React structure:
src/
  pages/
    public/
      GalleryPage.jsx

  components/
    gallery/
      GalleryHeader.jsx
      GalleryCategoryFilter.jsx
      GalleryGrid.jsx
      GalleryCard.jsx
      GalleryLightbox.jsx
      FeaturedGallery.jsx
      GalleryCTA.jsx
      GalleryEmptyState.jsx

  services/
    galleryService.js
Component names may be adjusted to match the existing application architecture.
19. UI and UX Requirements
- Use Bootstrap 5 for layout, grid, spacing, buttons, and modal behavior where practical.
- Use Bootstrap Icons for interface icons; do not use emojis as UI icons.
- Follow approved brand guidelines.
- Keep the page visually focused on photographs.
- Use subtle hover effects without distracting animations.
- Keep image cards consistent in spacing and presentation.
- Avoid excessive borders, shadows, and decorative elements.
- Display loading placeholders while images load.
- Provide an informative empty state.
- Make category filters easy to use on mobile.
- Ensure lightbox controls are clear and accessible.
20. Responsive Requirements
Desktop
- Display a balanced multi-column grid.
- Use larger image previews.
- Keep category filters easy to navigate.
Tablet
- Reduce the number of columns.
- Maintain suitable image sizes and spacing.
- Allow filters to wrap or scroll without breaking the layout.
Mobile
- Use one or two columns depending on available width.
- Keep captions readable.
- Ensure touch targets are sufficiently large.
- Keep lightbox controls reachable.
- Prevent horizontal overflow.
- Optimize image sizes for mobile networks.
21. Performance Requirements
- Lazy-load images below the initial viewport.
- Load appropriately sized responsive images.
- Use modern optimized formats where supported.
- Avoid loading every full-resolution image on the initial request.
- Use pagination or a Load More pattern if the gallery becomes large.
- Reserve image dimensions or aspect ratios to reduce layout shifts.
- Cache public gallery responses and media according to the deployment strategy.
- Keep the page usable on slower mobile connections.
22. SEO Requirements
- Page title: Gallery | Aditi Caterers.
- Add a useful meta description.
- Use one clear H1 heading.
- Add descriptive alt text to informative images.
- Use descriptive image metadata where practical.
- Ensure public gallery content can be indexed.
- Configure canonical URL consistently with the website.
- Do not add misleading event names, locations, or structured data.
- Do not expose private customer information in captions or image metadata.
Suggested meta description:
Explore the Aditi Caterers gallery featuring approved photographs of food, catering arrangements, and event celebrations.

23. Accessibility Requirements
- Provide meaningful alt text for informative images.
- Use empty alt text for decorative images.
- Make category filters keyboard accessible.
- Provide visible focus indicators.
- Use accessible names for lightbox controls.
- Support Escape to close the preview.
- Maintain readable text contrast.
- Do not rely only on color to identify the active category.
- Respect reduced-motion preferences.
- Ensure video controls are accessible if video support is enabled.
24. Security and Privacy
- Only authorized admins may create, edit, publish, or delete gallery items.
- Validate uploaded file content on the backend.
- Restrict file size and accepted formats.
- Keep media-provider credentials on the server.
- Sanitize titles and captions before rendering.
- Do not publish customer photographs without appropriate permission.
- Do not publish identifiable customer details, private venue information, or children's photographs without required approval and consent.
- Remove sensitive metadata such as GPS coordinates from public image derivatives where appropriate.
- Ensure unpublished content is not available through public APIs.
- Use HTTPS in production.
25. Testing Requirements
Functional testing
- Gallery page loads at /gallery.
- Published items are displayed.
- Unpublished items are hidden from public visitors.
- Category filters show correct results.
- Image preview opens and closes correctly.
- Previous and next navigation works.
- Captions and language labels display correctly.
- CTA links navigate correctly.
Admin and API testing
- Authorized admins can create, edit, publish, unpublish, and delete items.
- Invalid uploads are rejected.
- Public APIs never return unpublished items.
- Filtering and pagination work.
- Media replacement and deletion follow the storage policy.
- Unauthorized users cannot access admin endpoints.
Responsive and accessibility testing
- Test desktop, tablet, and mobile layouts.
- Verify keyboard access to filters and lightbox controls.
- Verify alt text and accessible labels.
- Check contrast and focus indicators.
- Confirm there is no horizontal overflow.
Performance testing
- Confirm lazy loading works.
- Confirm thumbnails are optimized.
- Confirm image dimensions prevent layout shifts.
- Test with a large gallery and slower network.
26. Acceptance Criteria
The Gallery page is ready for review when:
1. The /gallery route works correctly.
2. The page follows approved Aditi Caterers branding.
3. Only genuine, owner-approved, published media is displayed.
4. Gallery categories and filters work.
5. Images display responsively without distortion.
6. Image preview and navigation work.
7. Optional video functionality is included only if approved.
8. Enquiry and contact CTAs work.
9. Gallery content is loaded from the backend.
10. Images are optimized and lazy-loaded.
11. English and Marathi labels are supported.
12. SEO and accessibility requirements are implemented.
13. Loading, empty, and error states are handled.
14. Required functional, security, and responsive tests pass.
27. Developer Task Assignment
Detail	Value
Task ID	AC-FE-007
Task Name	Gallery Page
Suggested Branch	feature/gallery-page
Priority	Medium
Estimated Duration	3–4 working days
Dependencies	Navbar, Footer, Branding, Backend API, Admin Gallery Management
Main Components	GalleryPage, GalleryGrid, GalleryCard, GalleryLightbox, GalleryCTA
Backend Dependency	Public Gallery APIs
Database Dependency	Gallery Items Collection
Media Dependency	Approved Cloudinary configuration


Suggested Git commands:
git checkout dev
git pull origin dev

git checkout -b feature/gallery-page

git add .
git commit -m "feat: implement bilingual gallery page"

git push origin feature/gallery-page
Create a Pull Request into the agreed development branch after testing.
28. Pending Business Information
The following information must be confirmed by the business owner:
- [ ] Final gallery categories.
- [ ] Approved photographs for the first release.
- [ ] Whether videos are required.
- [ ] Permission to display identifiable customers or guests.
- [ ] Permission requirements for photographs containing children.
- [ ] Whether event dates, years, or locations may be displayed.
- [ ] Whether featured gallery items should appear on the Home page.
- [ ] Approval of Cloudinary for image storage.
- [ ] Preferred pagination or Load More behavior.
- [ ] Person responsible for reviewing and approving gallery content.
Until these details are confirmed, use only approved photographs and implement the basic category filters, image preview, and enquiry CTA. Do not publish unverified event details.
29. Definition of Done
- [ ] Gallery page is implemented at /gallery.
- [ ] Page follows approved brand guidelines.
- [ ] Gallery categories and filters are implemented.
- [ ] Responsive photo grid is implemented.
- [ ] Image preview/lightbox is implemented.
- [ ] Gallery content is loaded from the backend.
- [ ] Only published and approved media is publicly visible.
- [ ] Admin upload and management APIs are coordinated with the Admin Panel module.
- [ ] Image optimization and lazy loading are implemented.
- [ ] English and Marathi interface text is added.
- [ ] SEO and accessibility requirements are addressed.
- [ ] Empty, loading, and error states are implemented.
- [ ] Security, responsive, and functional tests pass.
- [ ] Business owner has approved the published gallery content.
30. Next Document
After completing the Gallery page, the next public website document is:

requirements/01-public-website/08-awards-requirements.md

This document will define how approved awards, recognitions, certificates, and achievements are presented on the public website.
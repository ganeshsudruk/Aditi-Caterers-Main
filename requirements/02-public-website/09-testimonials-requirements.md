09 - Testimonials Requirements
Project: Aditi Caterers
Document: Testimonials Page / Section Requirements
File: 09-testimonials-requirements.md
Status: Draft - Pending Business Owner Approval
Frontend: React + Vite + Bootstrap 5
Backend: Node.js + Express.js
Database: MongoDB Atlas + Mongoose
Languages: English and Marathi
1. Purpose
The Testimonials feature will display genuine customer feedback about Aditi Caterers' food quality, service, event management, and overall catering experience.

The feature must help website visitors understand previous customers' experiences and build trust before submitting an enquiry or booking request.

All testimonials displayed publicly must be genuine and approved for publication by the business owner. The development team must not create fake customer names, reviews, ratings, event details, or photographs.
2. Scope
The Testimonials feature includes:
1. A testimonials section on the Home page.
2. A dedicated Testimonials page, if approved by the business owner.
3. Testimonial cards with customer feedback.
4. Optional customer name, event type, rating, date, and photograph.
5. English and Marathi content support.
6. Admin Panel management for testimonials.
7. Publish/unpublish and display-order controls.
8. Validation, security, accessibility, SEO, and responsive support.
The final decision about whether a separate page is required or only a Home page section is required must be confirmed by the business owner.
3. Navigation and Routes
Suggested public route:
- /testimonials
Suggested Admin Panel route:
- /admin/testimonials
Requirements:
- Add the Testimonials navigation link only if the business owner approves a dedicated page.
- If testimonials are displayed only on the Home page, do not add an unnecessary navigation item.
- Public routes must support English and Marathi language selection.
- Admin routes must be protected by authentication and authorization.
- Use React Router for route handling.
4. Home Page Testimonials Section
The Home page should show a selected set of approved testimonials.
4.1 Section Content
English heading:

What Our Customers Say

Suggested supporting text:

"Read what customers have shared about their experience with Aditi Caterers."

Marathi heading:

आमचे ग्राहक काय म्हणतात

Suggested supporting text:

"अदिती केटरर्ससोबतच्या अनुभवाबद्दल ग्राहकांनी दिलेले अभिप्राय वाचा."

These are suggested website copy and may be edited after owner approval.
4.2 Display Requirements
- Display only published and approved testimonials.
- Show a limited number of testimonials on the Home page. The count must be configurable or agreed during implementation.
- Provide a "View All Testimonials" link only when a dedicated page is enabled.
- Each card must have consistent spacing and alignment.
- Do not show empty fields or placeholder customer details.
- Do not show a rating unless a rating was actually submitted and approved.
- Do not use automatically generated or stock customer photographs as real customer photos.
4.3 Layout
Suggested card information:
- Customer name, if permission is available.
- Customer feedback.
- Star rating, if supplied.
- Event type, if supplied and approved.
- Event date or review date, if approved.
- Customer photograph, only with permission.
The layout should remain clean when optional fields are missing.
5. Dedicated Testimonials Page
If approved, create a dedicated page at /testimonials.
5.1 Page Header
English:
- Title: "Customer Testimonials"
- Supporting text: "Experiences and feedback shared by our customers."
Marathi:
- Title: "ग्राहकांचे अभिप्राय"
- Supporting text: "आमच्या ग्राहकांनी शेअर केलेले अनुभव आणि अभिप्राय."
5.2 Testimonials Listing
- Display all published testimonials.
- Use a responsive grid of cards.
- Sort testimonials by display order or approved review date.
- The default sort order must be confirmed during implementation.
- Pagination or a "Load More" control may be used if the number of testimonials becomes large.
- Do not display unpublished, rejected, or archived testimonials.
5.3 Filtering
Filtering is optional and should be implemented only if there are enough testimonials to make it useful.

Possible filters:
- Event type.
- Rating.
Do not show a filter category if there are no published testimonials for it.
6. Testimonial Card Requirements
Each testimonial card may contain the following fields:
Field	Required	Notes
Customer name	No	Display only with customer permission; anonymous display must be supported
Feedback	Yes	Approved testimonial text
Rating	No	Show only if an actual rating is available
Event type	No	Example: Wedding or Birthday; must be verified
Review date	No	Display only if approved
Customer photo	No	Must have explicit permission
Featured label	No	Admin-controlled, if needed


Card behaviour:
- Keep card heights visually consistent where practical.
- Long feedback must wrap correctly.
- Avoid cutting off important text without a clear "Read More" action.
- If "Read More" is used, it must work with keyboard and screen-reader access.
- Do not display a customer name or image if consent has not been recorded.
7. Testimonial Content and Bilingual Support
Every public testimonial must support English and Marathi content.

Suggested data structure:
- feedback.en
- feedback.mr
Rules:
1. Store the original customer feedback without changing its meaning.
2. If a translation is displayed, it must accurately preserve the customer's meaning.
3. Mark translations as reviewed before publishing.
4. If a translation is unavailable, use the approved original language rather than displaying empty text.
5. Do not automatically translate and publish customer feedback without review.
6. The website language switcher must update the testimonial content where an approved translation exists.
7. Customer names should not be translated.
8. Preserve the customer's original wording unless the customer approves an edited version.
8. Customer Consent and Privacy
Customer consent is mandatory before publishing identifiable testimonial information.

The business owner or authorized administrator must confirm permission for:
- Publishing the customer's name.
- Publishing the customer's photograph.
- Publishing event photographs that identify the customer or guests.
- Displaying event details.
- Publishing the customer's feedback on the website and promotional channels, where applicable.
Requirements:
- Support anonymous testimonials.
- Record whether consent has been obtained.
- Record the consent date and the person who recorded it, where practical.
- Do not expose customer phone numbers, email addresses, or private contact information publicly.
- Do not publish private WhatsApp conversations or screenshots without explicit permission.
- Provide an Admin option to unpublish or remove a testimonial if consent is withdrawn.
- Keep internal notes private and never return them from public APIs.
Suggested consent fields:
- consentToPublish
- nameConsent
- photoConsent
- eventDetailsConsent
- consentRecordedAt
- consentNotes (admin-only; do not store unnecessary sensitive information)
The business owner must approve the final consent collection process.
9. Admin Panel - Testimonials Management
Create a Testimonials management module in the Admin Panel.

Suggested route:

/admin/testimonials
9.1 Testimonials List
The Admin Panel list should show:
- Customer display name or "Anonymous".
- Short feedback preview.
- Rating, if available.
- Event type, if available.
- Publication status.
- Featured status.
- Created date.
- Updated date.
Admin actions:
- Add testimonial.
- View testimonial.
- Edit testimonial.
- Publish testimonial.
- Unpublish testimonial.
- Archive or delete testimonial.
- Mark/unmark as featured.
- Change display order.
Use confirmation dialogs for destructive actions.
9.2 Add / Edit Testimonial Form
Suggested fields:
Field	Input	Required
Customer display name	Text	No
Display anonymously	Checkbox	No
Feedback - English	Textarea	At least one approved language version
Feedback - Marathi	Textarea	Optional until translation is approved
Rating	Select (1-5)	No
Event type	Select or text	No
Review date	Date picker	No
Customer photo	Image upload	No
Featured	Checkbox	No
Display order	Number	No
Consent to publish	Checkbox	Yes before publishing
Name consent	Checkbox	If name is displayed
Photo consent	Checkbox	If photo is uploaded and displayed
Event details consent	Checkbox	If identifying event details are displayed
Status	Draft / Published / Archived	Yes


Validation:
- Feedback must not be empty.
- Trim leading and trailing whitespace.
- Enforce a reasonable maximum feedback length.
- Rating, when supplied, must be an integer from 1 to 5.
- Reject unsupported image formats and oversized uploads.
- A testimonial cannot be published unless required consent conditions are satisfied.
- If the customer is displayed anonymously, do not expose the private customer name through public APIs.
- Validate all fields on both frontend and backend.
9.3 Publication Workflow
Suggested workflow:
1. Admin receives customer feedback or obtains it from an approved source.
2. Admin enters the feedback into the Admin Panel.
3. Admin confirms the customer's consent.
4. Admin adds approved translation, if available.
5. Admin previews the testimonial.
6. Admin publishes it.
7. The testimonial becomes visible on the public website.
Only authorized Admin users should be able to publish or modify testimonials.
10. Image Upload Requirements
If customer photographs are enabled:
- Use Cloudinary for image storage.
- Use Multer for upload handling, with file validation.
- Accept only approved image formats such as JPG, JPEG, PNG, or WebP.
- Set a maximum file size. The exact limit must be configured by the development team and approved for the deployment environment.
- Generate optimized image URLs and suitable thumbnail sizes.
- Store the Cloudinary public ID and secure URL in MongoDB.
- Do not store raw image files in MongoDB.
- Provide an image preview before saving.
- Provide a way to remove or replace an uploaded image.
- Delete an old Cloudinary asset when it is no longer needed, subject to the project's retention policy.
- Add meaningful alternative text when the image conveys information.
- If an image is decorative, use empty alt text.
- Never upload a customer's image without permission.
If no approved customer images are available, display testimonial cards without photos.
11. Suggested API Endpoints
Base path:

/api/testimonials
11.1 Public APIs
Method	Endpoint	Purpose
GET	/api/testimonials	Get published testimonials
GET	/api/testimonials/featured	Get featured published testimonials
GET	/api/testimonials/:id	Get one published testimonial, if public detail view is required


Public API requirements:
- Return only published testimonials.
- Return only fields intended for public display.
- Never return consent notes, private customer contact details, internal notes, or unpublished content.
- Support language selection using a query parameter or the application's established language strategy.
- Support pagination if required.
- Validate IDs and query parameters.
Example:

GET /api/testimonials?language=en&page=1&limit=9
11.2 Admin APIs
All Admin APIs must require authentication and appropriate authorization.
Method	Endpoint	Purpose
GET	/api/admin/testimonials	Get testimonials for Admin Panel
GET	/api/admin/testimonials/:id	Get testimonial details
POST	/api/admin/testimonials	Create testimonial
PUT	/api/admin/testimonials/:id	Update testimonial
PATCH	/api/admin/testimonials/:id/status	Publish, unpublish, or archive
PATCH	/api/admin/testimonials/:id/featured	Update featured status
PATCH	/api/admin/testimonials/reorder	Update display order
DELETE	/api/admin/testimonials/:id	Delete testimonial, if deletion is permitted


The exact endpoint structure may follow the existing backend conventions. Avoid creating duplicate API patterns if the project already has a standard.
12. Suggested MongoDB Schema
Suggested Mongoose model: Testimonial
{
  customerDisplayName: {
    type: String,
    trim: true,
    default: ""
  },

  displayAnonymously: {
    type: Boolean,
    default: true
  },

  feedback: {
    en: {
      type: String,
      trim: true,
      default: ""
    },
    mr: {
      type: String,
      trim: true,
      default: ""
    }
  },

  originalLanguage: {
    type: String,
    enum: ["en", "mr", "other"],
    default: "en"
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },

  eventType: {
    type: String,
    trim: true,
    default: ""
  },

  reviewDate: {
    type: Date,
    default: null
  },

  customerPhoto: {
    url: { type: String, default: "" },
    publicId: { type: String, default: "" },
    altText: {
      en: { type: String, default: "" },
      mr: { type: String, default: "" }
    }
  },

  consent: {
    consentToPublish: { type: Boolean, default: false },
    nameConsent: { type: Boolean, default: false },
    photoConsent: { type: Boolean, default: false },
    eventDetailsConsent: { type: Boolean, default: false },
    consentRecordedAt: { type: Date, default: null }
  },

  isFeatured: {
    type: Boolean,
    default: false
  },

  displayOrder: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft"
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}
Implementation notes:
- This is a suggested schema, not a requirement to copy without review.
- Add timestamps: true to the Mongoose schema.
- Do not store unnecessary customer personal information.
- If the project requires private source/contact details for verification, store them separately with strict access controls and never include them in public API responses.
- Add indexes based on actual query patterns, such as status, isFeatured, and displayOrder.
- Validate consent rules in backend service logic, not only in the React form.
- The mongoose import and model setup must follow the existing backend project structure.
13. Suggested Public API Response
Example only:
{
  "success": true,
  "data": [
    {
      "_id": "example-testimonial-id",
      "customerDisplayName": "Anonymous Customer",
      "displayAnonymously": true,
      "feedback": {
        "en": "Approved customer feedback goes here.",
        "mr": "मंजूर केलेला ग्राहक अभिप्राय येथे दाखवला जाईल."
      },
      "rating": 5,
      "eventType": "Wedding",
      "isFeatured": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 9,
    "total": 1,
    "totalPages": 1
  }
}
Do not use this example as a real customer testimonial. Replace it only with genuine feedback and approved translations.
14. Frontend Component Structure
Suggested structure:
src/
  components/
    testimonials/
      TestimonialCard.jsx
      TestimonialsSection.jsx
      TestimonialsGrid.jsx
      TestimonialRating.jsx
      TestimonialFilters.jsx
  pages/
    TestimonialsPage.jsx
  services/
    testimonialService.js
  admin/
    testimonials/
      AdminTestimonialsPage.jsx
      TestimonialForm.jsx
      TestimonialPreview.jsx
Requirements:
- Reuse TestimonialCard on the Home page and dedicated page.
- Keep API calls inside the service layer.
- Use the application's existing language context or translation approach.
- Use reusable loading, empty, and error states.
- Follow existing naming and folder conventions if they differ from this suggestion.
15. UI and Design Requirements
- Follow the approved Aditi Caterers brand guidelines.
- Use Bootstrap 5 grid, cards, spacing, and responsive utilities.
- Use Bootstrap Icons where icons are required.
- Do not use emojis as interface icons.
- Keep typography readable and card spacing consistent.
- Use the approved brand colours; do not introduce unrelated colours.
- Use subtle borders or shadows only where they fit the approved design.
- Ensure text contrast is accessible.
- Do not make star ratings the main visual focus; customer feedback should remain readable.
- Keep the layout visually consistent with the Home, About, and Services pages.
16. Responsive Requirements
The testimonials UI must work on:
- Mobile phones.
- Tablets.
- Laptops.
- Desktop monitors.
Expected behaviour:
- Mobile: one card per row or a usable swipe layout.
- Tablet: two cards per row where space permits.
- Desktop: three cards per row where space permits.
- Avoid horizontal page overflow.
- Ensure long names and feedback wrap correctly.
- Buttons and links must be easy to tap.
- If a carousel is used, provide accessible previous/next controls and do not make essential content inaccessible without interaction.
17. Loading, Empty, and Error States
Loading
- Show a Bootstrap spinner or skeleton while testimonials load.
- Avoid a large layout shift after loading.
Empty
If no testimonials are published, do not show fabricated content.

Suggested English message:
"Customer testimonials will be available here soon."

Suggested Marathi message:
"ग्राहकांचे अभिप्राय लवकरच येथे उपलब्ध होतील."

The business owner may approve alternative wording.
Error
Suggested English message:
"Testimonials could not be loaded. Please try again later."

Suggested Marathi message:
"ग्राहकांचे अभिप्राय लोड करता आले नाहीत. कृपया नंतर पुन्हा प्रयत्न करा."
- Handle API errors gracefully.
- Do not expose server stack traces or internal error details.
- Provide a retry action where appropriate.
18. Accessibility Requirements
- Use semantic headings and landmarks.
- Use accessible buttons and links.
- Ensure all interactive elements are keyboard accessible.
- Provide visible focus states.
- Use sufficient colour contrast.
- Do not communicate rating only through colour or icons; provide an accessible text label such as "5 out of 5".
- Add appropriate alt text to meaningful customer images.
- Ensure carousel controls have accessible names if a carousel is implemented.
- Respect reduced-motion preferences for animated transitions.
- Ensure text can be resized without loss of content or functionality.
19. SEO Requirements
For a dedicated Testimonials page:
- Set a meaningful page title and meta description in English and Marathi.
- Use one clear H1 heading.
- Keep testimonial content crawlable in the rendered page.
- Use descriptive image alt text.
- Use canonical URL handling consistent with the website's multilingual routing.
- Do not add structured review/rating markup unless the content and implementation meet applicable search engine guidelines.
- Do not mark up fabricated, incentivized, or unverified reviews as genuine reviews.
- Avoid duplicate meta titles and descriptions across language versions.
Suggested English title:
Customer Testimonials | Aditi Caterers

Suggested Marathi title:
ग्राहकांचे अभिप्राय | अदिती केटरर्स
20. Security Requirements
- Protect all Admin APIs using authentication and role-based authorization.
- Validate and sanitize incoming data on the backend.
- Prevent unauthorized publication or modification.
- Validate uploaded image type, size, and content.
- Use secure Cloudinary configuration through environment variables.
- Never expose API secrets or database credentials in frontend code.
- Apply rate limiting to public endpoints where appropriate.
- Avoid rendering customer feedback as raw HTML.
- Escape or safely render user-provided text to reduce XSS risk.
- Do not expose internal consent notes or private information.
- Log administrative changes where the project's audit logging supports it.
21. Performance Requirements
- Optimize customer images and serve responsive sizes.
- Lazy-load images that are below the fold.
- Avoid loading the full testimonial collection on the Home page.
- Use pagination or "Load More" for large collections.
- Add appropriate database indexes after reviewing query patterns.
- Avoid unnecessary API calls when switching between pages.
- Use caching only where it does not cause unpublished testimonials to appear publicly.
22. Testing Requirements
22.1 Frontend Testing
- Testimonials section renders correctly on the Home page.
- Dedicated page works if enabled.
- English and Marathi content display correctly.
- Missing optional fields do not break the card layout.
- Anonymous testimonials do not show customer names.
- Unpublished testimonials are not visible publicly.
- Loading, empty, and error states work.
- Responsive layout works on mobile, tablet, and desktop.
- Keyboard navigation and focus states work.
- Read More, filters, pagination, and carousel controls work if implemented.
22.2 Backend Testing
- Public API returns only published testimonials.
- Public API does not expose private fields.
- Admin endpoints reject unauthenticated requests.
- Role permissions are enforced.
- Invalid ratings are rejected.
- Empty feedback is rejected.
- Publishing without required consent is rejected.
- Anonymous display hides the customer's private name.
- Invalid IDs return an appropriate response.
- Upload validation rejects unsupported or oversized files.
- Publish, unpublish, archive, and delete actions work according to permissions.
22.3 Manual Acceptance Testing
- Verify each published testimonial with the business owner.
- Verify permission for each displayed name and photograph.
- Verify English and Marathi versions.
- Verify event names and dates.
- Verify the page on common screen sizes.
- Confirm no sample or placeholder feedback is visible in production.
23. Acceptance Criteria
The feature is accepted when:
1. Approved testimonials display correctly on the Home page.
2. The dedicated page is available if approved.
3. Only published testimonials are publicly visible.
4. English and Marathi content are supported.
5. Optional fields are handled without layout issues.
6. Customer consent is recorded and enforced before publication.
7. Anonymous testimonials do not expose customer names.
8. Admin users can create, edit, publish, unpublish, feature, reorder, and archive testimonials.
9. Public APIs do not expose private or administrative fields.
10. Image upload works securely if enabled.
11. Responsive and accessibility checks pass.
12. SEO metadata is configured if a dedicated page is enabled.
13. Frontend and backend tests pass.
14. No fabricated testimonials are present in production.
24. Definition of Done
- [ ] Requirements reviewed with the business owner.
- [ ] Dedicated page vs Home page-only decision confirmed.
- [ ] Genuine customer feedback collected.
- [ ] Customer consent verified and recorded.
- [ ] English and Marathi content reviewed.
- [ ] Frontend components completed.
- [ ] Admin Panel CRUD completed.
- [ ] Backend APIs completed and protected.
- [ ] MongoDB model and validation completed.
- [ ] Cloudinary upload completed, if enabled.
- [ ] Responsive design completed.
- [ ] Accessibility checks completed.
- [ ] SEO completed, if a dedicated page is enabled.
- [ ] Frontend and backend tests passed.
- [ ] Production data reviewed; no placeholder testimonials remain.
25. Pending Information from Business Owner
The following details must be confirmed before final implementation:
1. Should testimonials appear only on the Home page, or should there be a separate Testimonials page?
2. How many testimonials should appear on the Home page?
3. Are genuine customer reviews currently available?
4. Can customer names be displayed, or should testimonials be anonymous by default?
5. Are customer photographs available, and has permission been obtained to publish them?
6. Should star ratings be displayed?
7. Should testimonials be categorized by event type?
8. Should customers be able to submit testimonials through the website, or should only Admin users add them?
9. Who will approve testimonials before publication?
10. Is there a preferred display order, such as newest first or featured first?
Until these details are confirmed, implement only the approved requirements and keep optional features configurable.
26. Development Notes
- Follow the existing project architecture and coding conventions.
- Reuse existing authentication, authorization, language, upload, and notification utilities.
- Do not create duplicate services or models if equivalent shared modules already exist.
- Keep frontend and backend validation consistent.
- Keep all credentials in environment variables.
- Use genuine owner-approved content in production.
- Any change to the scope must be reviewed and documented before implementation.
End of Document
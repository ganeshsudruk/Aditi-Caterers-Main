Aditi Caterers Website
Document Name: 08-awards-requirements.md
Project: Aditi Caterers Website
Page Name: Awards
Page Route: /awards
Supported Website Languages: English and Marathi
Document Language: English
Status: Draft – award details pending business-owner approval
1. Page Overview
The Awards Page will showcase the awards, certificates, recognitions, and honors received by Aditi Caterers.

The purpose of this page is to build customer trust by presenting the business's verified achievements in a professional and attractive way.

Important: The business has indicated that it has received various awards. However, the exact award names, years, and awarding organizations have not yet been provided. Do not create or publish unverified award information. Only details supplied and approved by the business owner may be displayed.
1.1 Main Objectives
- Display awards and recognitions received by Aditi Caterers.
- Show award, trophy, or certificate images where available.
- Display the award title, awarding organization, year, and description where verified.
- Support both English and Marathi website content.
- Allow authorized administrators to add, edit, publish, unpublish, reorder, and delete awards.
- Provide a responsive experience across desktop, tablet, and mobile devices.
2. Page URL and Navigation
Item	Requirement
Page Name	Awards
Route	/awards
Navbar Label (English)	Awards
Navbar Label (Marathi)	पुरस्कार
Page Access	Public
Management	Admin Panel


When a visitor clicks the Awards link in the website navigation, the /awards page should open.

The page route should remain unchanged when the visitor switches the website language. Only the displayed content should change according to the selected language.
3. Page Layout
The page should contain the following sections in order:
1. Hero / Banner Section
2. Introduction Section
3. Awards Gallery
4. Award Image Viewer / Lightbox
5. Contact Call-to-Action Section
6. Common Website Footer
Only published awards should appear on the public page.

If no awards are published, the page must display an appropriate Empty State instead of blank content or sample/fabricated award records.
4. Hero / Banner Section
4.1 Content
English Heading:
Awards & Recognition

English Description:
Every recognition is a reminder of our commitment to quality food and dedicated catering service.

Marathi Heading:
पुरस्कार आणि सन्मान

Marathi Description:
आमच्या कामाची दखल घेऊन मिळालेले प्रत्येक पुरस्कार आणि सन्मान ही आमच्यासाठी अभिमानाची गोष्ट आहे.

The above copy is proposed content and must be approved by the business owner before publication.
4.2 Design Requirements
- Follow the approved Aditi Caterers Brand Guidelines.
- Use a simple and attractive banner that matches the brand identity.
- Use a suitable background image or subtle decorative pattern only if approved.
- Ensure the heading and description are clear and readable.
- Avoid unnecessary animations and excessive decorative elements.
- Ensure text wraps correctly on smaller screens.
5. Introduction Section
Display a short introduction before the Awards Gallery.

English Heading:
A Journey of Dedication

English Description:
We are grateful for the recognition and appreciation received for our work. These awards encourage us to continue delivering food and catering services with care and commitment.

Marathi Heading:
समर्पणाचा प्रवास

Marathi Description:
आमच्या कामाची दखल घेऊन मिळालेली प्रशंसा आणि सन्मान आम्हाला पुढेही उत्तम सेवा देण्यासाठी प्रेरणा देतात.

This is proposed copy and should be published only after business-owner approval.
6. Awards Gallery
6.1 Display Requirements
- Display published awards in a responsive grid layout.
- Desktop: approximately 3 cards per row.
- Tablet: approximately 2 cards per row.
- Mobile: 1 card per row.
- Use an award, trophy, or certificate image where available.
- Allow visitors to click an image to view it in a larger format.
- Display only available and approved award information.
- Sort awards according to the Display Order configured in the Admin Panel.
- Hide optional fields when no verified value is available.
6.2 Award Card Fields
Field	Description	Requirement
Award Image	Image of the award, certificate, or trophy	Required before publishing
Award Title (English)	Award name in English	Required
Award Title (Marathi)	Award name in Marathi	Required
Awarding Organization	Name of the organization that presented the award	Optional
Year	Year the award was received	Optional; must be verified
Description (English)	Short award description in English	Optional
Description (Marathi)	Short award description in Marathi	Optional


Each card should provide a View Award action. The Marathi label should be पुरस्कार पहा.

The card must not display fabricated information, ratings, or unsupported claims.
7. Award Image Viewer / Lightbox
For the first release, a Lightbox is sufficient. A separate award detail page is not required unless confirmed during project planning.
Lightbox Requirements
- Display the selected award image in a larger view.
- Provide a clearly visible Close button.
- Allow closing with the Escape key.
- Optionally allow closing by clicking the overlay outside the image.
- Fit the image within the available mobile screen area.
- Preserve the image aspect ratio and do not stretch the image.
- Support keyboard navigation and appropriate focus handling.
8. Contact Call-to-Action Section
Display a contact section at the bottom of the Awards Page.

English Heading:
Planning a Special Event?

English Description:
Get in touch with Aditi Caterers to discuss catering for your upcoming celebration.

English Button:
Contact Us

Marathi Heading:
तुमच्या खास कार्यक्रमाचे नियोजन करत आहात?

Marathi Description:
तुमच्या आगामी कार्यक्रमासाठी केटरिंग सेवांबद्दल चर्चा करण्यासाठी Aditi Caterers शी संपर्क साधा.

Marathi Button:
संपर्क साधा

When clicked, the button should navigate to the Contact or Enquiry route defined in the project routing plan.
9. Bilingual Requirements
- The Awards Page must support both English and Marathi.
- Reuse the existing website Language Switcher and language-management approach.
- All static headings, descriptions, buttons, and labels must change according to the selected language.
- Award titles and descriptions must have separate English and Marathi fields in the Admin Panel.
- If optional content is missing in the selected language, follow the project's agreed fallback rule: display the available alternate-language content or hide the optional field.
- Do not display fabricated translations or placeholder content as real award information.
- Switching languages must not take the visitor away from the Awards Page.
10. Admin Panel – Awards Management
The Admin Panel must allow authorized administrators to manage award records.
10.1 Awards List
Display all award records in an Admin table.

Required columns:
- Award Image Thumbnail
- Award Title
- Awarding Organization
- Year
- Status (Draft / Published)
- Display Order
- Actions (View / Edit / Delete)
10.2 Add Award Form
When the administrator clicks Add Award, display a form with the following fields:
Field	Input Type	Requirement
Award Title (English)	Text	Required
Award Title (Marathi)	Text	Required
Award Image	Image Upload	Required before publishing
Awarding Organization	Text	Optional
Award Year	Number	Optional; validate if entered
Description (English)	Textarea	Optional
Description (Marathi)	Textarea	Optional
Alt Text (English)	Text	Recommended
Alt Text (Marathi)	Text	Recommended
Display Order	Number	Optional; default to the last position
Status	Draft / Published	Required


10.3 Edit Award
- Allow administrators to edit existing award information.
- Allow administrators to replace the award image.
- Display updated information on the public page after saving.
- Show clear validation messages when input is invalid.
10.4 Delete Award
- Display a confirmation dialog before deleting an award.
- If the administrator cancels, do not delete the record.
- After confirmation, remove the award from the public page.
- Handle Cloudinary image deletion separately and safely. Deleting a database record must not be assumed to delete the image automatically.
- Only authorized administrators may delete awards.
10.5 Draft and Published Status
- Draft awards must not appear on the public Awards Page.
- Only Published awards may appear publicly.
- Validate required fields and the award image before publishing.
- Allow administrators to change a Published award back to Draft.
10.6 Display Order
- Allow administrators to change the order of awards.
- Display awards with a lower Display Order value first.
- Apply consistent fallback sorting when display-order values are equal or missing.
11. Image Upload Requirements
- Accept JPG, JPEG, PNG, and WebP image formats.
- Define the maximum file size according to the project's common upload policy.
- Validate file type and file size before upload.
- Store award images in Cloudinary.
- Store the Cloudinary secure URL and public ID in MongoDB.
- Display an upload progress indicator while an image is uploading.
- Display an image preview after a successful upload.
- Show a clear error message if the upload fails.
- Provide fallback UI for unavailable or broken images.
- Obtain the business owner's permission before publicly displaying certificates containing personal or sensitive information.
12. Backend API Requirements
The following API endpoints are proposed. Final route naming should follow the existing backend conventions.
12.1 Public APIs
Method	Endpoint	Purpose
GET	/api/awards	Retrieve the list of published awards
GET	/api/awards/:id	Retrieve one published award, if required


Public APIs must never return Draft award records.
12.2 Admin APIs
Method	Endpoint	Purpose
GET	/api/admin/awards	Retrieve all awards
POST	/api/admin/awards	Create a new award
GET	/api/admin/awards/:id	Retrieve one award
PUT	/api/admin/awards/:id	Update an award
PATCH	/api/admin/awards/:id/status	Update Draft / Published status
PATCH	/api/admin/awards/reorder	Update award display order
DELETE	/api/admin/awards/:id	Delete an award


12.3 API Security
- Require JWT authentication for Admin APIs.
- Apply role-based authorization.
- Public users must not be able to create, update, publish, or delete awards.
- Validate all input on the server.
- Whitelist accepted request fields; do not save arbitrary request-body fields directly.
- Use appropriate HTTP status codes and consistent error response formats.
13. Suggested MongoDB Schema
Collection: awards
{
  title: {
    en: { type: String, required: true, trim: true },
    mr: { type: String, required: true, trim: true }
  },
  organization: {
    type: String,
    trim: true,
    default: ""
  },
  year: {
    type: Number,
    default: null
  },
  description: {
    en: { type: String, default: "" },
    mr: { type: String, default: "" }
  },
  image: {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    alt: {
      en: { type: String, default: "" },
      mr: { type: String, default: "" }
    }
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft"
  }
}
This is a suggested schema. Apply the project's existing Mongoose conventions for timestamps, validation, and indexes.
14. Suggested React Components
AwardsPage
├── AwardsHero
├── AwardsIntroduction
├── AwardsGrid
│   └── AwardCard
├── AwardImageLightbox
├── AwardsEmptyState
├── AwardsCTA
└── CommonFooter

AdminAwardsPage
├── AwardsTable
├── AwardForm
├── AwardImageUploader
├── AwardStatus
├── AwardDeleteConfirmation
└── AwardOrderControl
Frontend Requirements
- Use React functional components.
- Use Bootstrap 5 and the project's existing shared components.
- Reuse the existing React Router setup, language context, and configured Axios instance.
- Implement loading, empty, error, and success states.
- Keep components reusable and avoid unnecessary duplicate CSS.
15. Responsive Design Requirements
Desktop
- Display approximately 3 award cards per row.
- Maintain balanced image sizes, card heights, and content alignment.
Tablet
- Display approximately 2 cards per row.
- Resize text and images appropriately.
Mobile
- Display 1 card per row.
- Ensure cards fit within the screen width.
- Ensure the Lightbox works within the mobile viewport.
- Make buttons easy to tap.
- Prevent horizontal scrolling.
All breakpoints must follow the project's Responsive Guidelines.
16. Accessibility Requirements
- Provide meaningful alt text for all informative images.
- Use clear accessible labels for buttons and links.
- Make the Lightbox keyboard accessible.
- Allow the Lightbox to close using the Escape key.
- Provide visible focus indicators and sufficient text contrast.
- Use a logical heading hierarchy.
- Do not communicate Draft / Published status using color alone; include a text label.
- Provide visible labels and validation messages for Admin form fields.
17. SEO Requirements
- English Page Title: Awards & Recognition | Aditi Caterers
- English Meta Description: Explore the awards and recognition received by Aditi Caterers for its catering services.
- Allow separate Marathi SEO title and description values.
- Configure canonical URL and social-sharing metadata according to the project's SEO approach.
- Use descriptive alt text for award images.
- Use structured data only when supported by verified information. Do not create structured data for fabricated awards or organizations.
18. Performance Requirements
- Serve optimized and responsive award images.
- Use lazy loading for images below the fold.
- Configure loading appropriately for any important Hero image.
- Do not load large, unoptimized image files directly.
- Return only the data required by the public page from the API.
- Consider pagination or incremental loading if the number of awards becomes large.
19. Loading, Empty, and Error States
Loading State
Display a Bootstrap spinner or skeleton cards while award data is being fetched.
Empty State
English:
Awards and recognitions will be updated here soon.

Marathi:
पुरस्कार आणि सन्मानांची माहिती लवकरच येथे उपलब्ध होईल.
Error State
English:
We couldn't load the awards right now. Please try again later.

Marathi:
सध्या पुरस्कारांची माहिती लोड करता आली नाही. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.

Provide a Retry button. Do not display fabricated award cards when the API request fails.
20. Testing Requirements
20.1 Public Page
- Verify that the /awards route opens correctly.
- Verify that only Published awards are displayed.
- Verify that static and dynamic content changes with the language switcher.
- Verify that the Lightbox opens and closes correctly.
- Verify the Empty State.
- Verify the Error State when the API fails.
- Test the page on desktop, tablet, and mobile.
20.2 Admin Panel
- Verify that an authorized administrator can create an award.
- Verify required-field validation.
- Verify that invalid image formats and oversized files are rejected.
- Verify that Draft awards do not appear publicly.
- Verify that Published awards appear on the public page.
- Verify edit, unpublish, delete, and reorder operations.
- Verify that unauthorized users cannot access Admin APIs.
20.3 Bilingual Support
- Verify that all static labels are available in both languages.
- Verify that English and Marathi award fields are saved correctly.
- Verify that changing the language displays the correct content without leaving the page.
21. Definition of Done
- [ ] Awards Page and Hero Section are implemented.
- [ ] Introduction Section is implemented.
- [ ] Responsive Awards Gallery is implemented.
- [ ] Award cards display the correct information.
- [ ] Award Image Lightbox works correctly.
- [ ] English and Marathi language support is complete.
- [ ] Admin Awards List is implemented.
- [ ] Add / Edit / Delete functionality is complete.
- [ ] Draft / Published workflow is complete.
- [ ] Cloudinary image upload integration is complete.
- [ ] Public and Admin APIs are implemented and secured.
- [ ] MongoDB schema and validation are complete.
- [ ] Loading, Empty, Error, and Success states are implemented.
- [ ] SEO and accessibility requirements are checked.
- [ ] Desktop, tablet, and mobile testing is complete.
- [ ] All award details have been verified and approved by the business owner.
22. Pending Information – Business Owner Confirmation
Collect and confirm the following information before publishing awards:
1. Exact name of each award.
2. Year in which each award was received.
3. Name of the awarding organization or event organizer.
4. Original image of each award, trophy, or certificate.
5. Official description or details of each award.
6. Permission to display the award images and certificates publicly.
7. Preferred display order of the awards.
8. Final approval of English and Marathi award titles and descriptions.
If any information is unavailable, leave it out rather than inventing a value.
23. Final Notes for the Development Team
- Use this document as the reference for the Awards Page UI, functionality, Admin Panel, APIs, database, bilingual content, and testing.
- Reuse the existing project architecture, Navbar, Footer, language switcher, authentication, and design guidelines.
- Display only Published and approved award records on the public page.
- Do not create award names, years, organizations, or descriptions without business-owner confirmation.
- Confirm pending business information and image permissions before final implementation and publication.
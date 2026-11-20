01 – Admin Login Requirements
1. Document Information
- Project: Aditi Caterers Website
- Module: Admin Panel
- Document: Admin Login Requirements
- File Name: 01-admin-login.md
- Route: /admin/login
- Status: Draft
- Languages: English (admin interface may be English-only initially; Marathi support can be added if required)
2. Purpose
The Admin Login page provides secure access to the Aditi Caterers website administration system. Only authorized administrators should be able to access protected admin pages and perform management operations.

The login system must authenticate an admin, establish a secure session, and direct the authenticated user to the Admin Dashboard. It must not allow public visitors to access admin functionality.
3. Goals
- Provide a clean, professional, responsive login interface.
- Authenticate authorized admin accounts using email/username and password.
- Validate form inputs on both frontend and backend.
- Securely store passwords as hashes, never as plain text.
- Protect admin routes and APIs.
- Handle authentication errors without revealing sensitive account information.
- Support secure logout and session/token expiration.
- Provide a foundation for role-based access control if multiple admin roles are introduced.
4. Route and Access
Public Admin Authentication Routes
- /admin/login – Admin login page.
- /admin/forgot-password – Optional password recovery page, if implemented and approved.
Protected Admin Routes
- /admin/dashboard
- /admin/enquiries
- /admin/packages
- /admin/menu
- /admin/gallery
- /admin/awards
- /admin/testimonials
- /admin/faqs
- /admin/settings
Routes may change to match the final admin navigation structure.

Rules:
- Unauthenticated users accessing protected routes must be redirected to /admin/login.
- Authenticated users accessing /admin/login should be redirected to the Admin Dashboard (or their default authorized page).
- Admin routes must not rely only on frontend route guards; backend API authorization is mandatory.
5. Login Page UI Requirements
5.1 Layout
Create a professional, uncluttered login screen consistent with Aditi Caterers' admin branding.

Suggested layout:
- A centered login card or split-screen layout.
- Aditi Caterers logo/brand name, using the approved logo.
- Page heading: Admin Login
- Short supporting text: “Sign in to manage your website.”
- Email/Username field.
- Password field.
- Show/Hide Password control.
- Login button.
- Optional Forgot Password link, only if the recovery flow is implemented.
- Optional approved copyright/footer text.
Do not include public website navigation menus on the admin login page unless specifically required.
5.2 Visual Requirements
- Use the project's Bootstrap 5 styling conventions.
- Maintain consistent typography, spacing, form styles, buttons, and logo usage.
- Keep the login card width comfortable and not excessively large.
- Use subtle borders/shadows only where consistent with the approved design.
- Avoid unnecessary animation and decorative elements.
- Provide visible focus states and error messages.
- Ensure the page works in both light and dark themes only if themes are supported by the project.
6. Login Form Fields
6.1 Email or Username
- Label: Email Address (or Username, depending on the approved login identifier).
- Required.
- Trim surrounding whitespace.
- Validate format if email is used.
- Use autocomplete appropriate for the identifier.
- Do not expose whether a particular account exists in error messages.
6.2 Password
- Label: Password.
- Required.
- Input type must default to password.
- Include Show/Hide Password control.
- Use autocomplete="current-password".
- Do not trim or alter password characters unless the authentication policy explicitly defines it.
- Do not log or display the password.
6.3 Remember Me (Optional)
If implemented:
- Label: Remember me.
- Must not store the password in browser storage.
- Persistent login/session duration must be defined securely.
- Do not enable indefinite sessions.
6.4 Forgot Password (Optional)
Password recovery must only be implemented if the owner/admin setup process supports it.

If included:
- Provide a link to /admin/forgot-password.
- Use a secure reset token.
- Token must be single-use and expire.
- Do not reveal whether the submitted email exists.
- Avoid sending reset links to unverified or unauthorized accounts.
- The flow must be fully implemented before showing the link in production.
7. Login Form Interaction
Initial State
- Fields are empty.
- Login button is enabled when appropriate, or form validation runs on submission.
- Password is hidden.
Validation State
- Required-field messages appear for missing values.
- Email format is validated if email is the login identifier.
- Validation feedback is displayed near the relevant field.
- Error messages must be understandable and accessible.
Submitting State
- Display a loading indicator or “Signing in…” text.
- Disable repeated submissions while the request is in progress.
- Prevent duplicate login requests from repeated clicks.
Success State
- Store or establish authentication state using the approved secure session/token strategy.
- Redirect to /admin/dashboard or the configured default admin route.
- Do not expose authentication secrets in the UI.
Failure State
Display a generic error message, such as:
Invalid login credentials. Please check your details and try again.

Other possible messages:
- “Unable to sign in right now. Please try again.”
- “Your session has expired. Please sign in again.”
Do not reveal whether the email, username, or password alone was incorrect.
8. Authentication Requirements
8.1 Authentication Method
Use the project's backend authentication system with secure password verification.

Recommended:
- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt or bcryptjs for password hashing
- JWT or secure server-managed session authentication, based on the final architecture
The authentication method must be selected consistently for frontend, backend, and deployment.
8.2 JWT Strategy (If JWT Is Used)
- Generate access tokens only after successful credential verification.
- Use a strong secret or private key stored in environment variables.
- Include only necessary claims (e.g., admin user ID and role).
- Set appropriate expiration.
- Verify token signature, expiration, and claims on protected endpoints.
- Never place passwords or sensitive personal data in JWT payloads.
- Do not hardcode token secrets in source code.
- Refresh-token support may be added if required; it must follow secure rotation and revocation practices.
8.3 Secure Cookie Strategy (Preferred for Browser Admin)
Where the architecture supports it, prefer an HttpOnly, Secure, appropriately configured SameSite cookie for session or token storage rather than exposing long-lived tokens to JavaScript.

Cookie settings must be configured for the production environment:
- HttpOnly
- Secure (production over HTTPS)
- Appropriate SameSite policy
- Restricted cookie path/domain where appropriate
- Expiration/max-age defined by the session policy
If cookies are used for authentication, implement appropriate CSRF protection for state-changing requests.
8.4 Frontend Authentication State
- The frontend must know whether the admin is authenticated.
- Do not store admin passwords in local storage, session storage, or application state beyond the login submission.
- Avoid storing long-lived sensitive tokens in localStorage.
- On application startup, validate the current session using a backend endpoint if needed.
- On authentication failure/expiration, clear local admin state and redirect to login.
- Ensure logout clears the session/token according to the selected strategy.
9. Protected Route Requirements
Implement a reusable admin route guard.

Behavior:
- Check current authentication status.
- While authentication status is being checked, show a loading state instead of briefly rendering protected content.
- If authenticated and authorized, render the requested admin page.
- If unauthenticated, redirect to /admin/login.
- If authenticated but lacking permission, show an Unauthorized page or redirect to an allowed route.
- Preserve the intended return route where safe, so the user can return to the requested admin page after login.
Backend:
- Every protected admin API endpoint must independently verify authentication and authorization.
- Frontend route protection is not a substitute for backend security.
- Do not trust role/permission values supplied only by the frontend.
10. Logout Requirements
Provide a Logout action in the Admin Panel navigation/profile menu.

On logout:
- Revoke or invalidate the server-side session or refresh token where applicable.
- Clear authentication cookies using matching cookie settings, if cookies are used.
- Clear frontend authentication state.
- Redirect to /admin/login.
- Prevent protected pages from remaining accessible through subsequent API requests.
- Handle logout errors safely while ensuring the frontend returns to an unauthenticated state according to the security design.
11. Backend API Requirements
Follow the project's existing API response conventions.
11.1 Login
- POST /api/admin/auth/login
Example request:
{
  "email": "admin@example.com",
  "password": "user-entered-password"
}
Use the actual approved login identifier. The example address is illustrative only and must not be used as a real admin account.
11.2 Current Session / Admin
- GET /api/admin/auth/me – returns the current authenticated admin's safe profile and permissions, if applicable.
11.3 Logout
- POST /api/admin/auth/logout – invalidates the session or token as required by the authentication strategy.
11.4 Password Recovery (Optional)
- POST /api/admin/auth/forgot-password
- POST /api/admin/auth/reset-password
Implement these endpoints only if the complete recovery process is supported.
API Requirements
- Validate request bodies on the server.
- Return consistent response formats and HTTP status codes.
- Rate-limit login attempts.
- Do not expose passwords, password hashes, secrets, or reset tokens.
- Use generic authentication error responses.
- Log security events without logging credentials or tokens.
- Apply authentication and authorization middleware to all protected admin endpoints.
12. Suggested API Responses
Login Failure
{
  "success": false,
  "message": "Invalid login credentials. Please check your details and try again."
}
Login Success (Cookie-Based)
{
  "success": true,
  "message": "Login successful",
  "data": {
    "admin": {
      "id": "admin-id",
      "name": "Admin",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
}
If authentication uses secure cookies, the cookie is set through the HTTP response and is not returned in the JSON body.
Current Admin
{
  "success": true,
  "data": {
    "admin": {
      "id": "admin-id",
      "name": "Admin",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
}
These are illustrative response shapes. Do not hardcode the example identity or credentials.
13. MongoDB / Mongoose Admin Schema
Suggested model: AdminUser.
Field	Type	Required	Description
name	String	Yes	Admin display name
email	String	Yes	Login email, unique
passwordHash	String	Yes	Secure password hash
role	String	Yes	Admin role
permissions	Array	No	Optional permission list
isActive	Boolean	Yes	Account enabled/disabled
lastLoginAt	Date	No	Last successful login
passwordChangedAt	Date	No	Last password change
createdAt	Date	Yes	Creation timestamp
updatedAt	Date	Yes	Update timestamp


Schema rules:
- Email must be normalized (e.g., lowercase and trimmed) before saving.
- Password must never be stored in plain text.
- Password hash must not be returned by API responses.
- Use a unique index for the normalized email.
- Use timestamps.
- Admin accounts should be created using a secure setup process or seed script, not public registration.
- Do not provide a public admin signup endpoint.
If password recovery is implemented, store reset-token hashes and expiration data securely. Do not store raw reset tokens unnecessarily.
14. Admin Account Creation and Setup
- Admin accounts must be created by an authorized setup process.
- Use a secure one-time setup script, protected invitation process, or other approved method.
- Do not create publicly accessible admin registration.
- Avoid hardcoded default passwords.
- If an initial admin password is set during deployment, require it to be securely configured and changed as appropriate.
- Document how the owner can create, disable, or recover an admin account.
- Ensure the setup process cannot be repeatedly abused after initial deployment.
15. Security Requirements
- Hash passwords using bcrypt/bcryptjs or an approved modern password-hashing algorithm with suitable parameters.
- Never store or log plaintext passwords.
- Use HTTPS in production.
- Rate-limit login attempts and apply abuse protection.
- Consider progressive delay or temporary lockout controls; avoid permanent lockout that attackers could use to deny access.
- Validate all request data on the backend.
- Use secure cookies if the cookie-based strategy is selected.
- Implement CSRF protection where required.
- Protect against brute force, credential stuffing, injection, and session fixation.
- Rotate/revoke sessions after password change and account compromise.
- Enforce isActive and permissions on every protected API request.
- Keep secrets in environment variables or secret-management infrastructure.
- Do not return stack traces, password hashes, tokens, or internal security details to clients.
- Use generic login error messages.
- Audit important events such as successful login, failed login, logout, password reset, and admin account changes, without recording secrets.
16. Password Requirements
Define and enforce a password policy suitable for admin accounts.

Recommended policy:
- Require a sufficiently long password (e.g., minimum 12 characters, subject to project policy).
- Permit passphrases and common password-manager generated passwords.
- Do not silently truncate passwords.
- Block known compromised/common passwords where a suitable service or local list is available.
- Avoid arbitrary composition rules that make passwords difficult to remember but not more secure.
- Provide clear password requirements during creation/reset.
- Password change functionality should require appropriate verification.
17. UI Accessibility
- Every input must have a proper visible label.
- Password visibility toggle must be accessible and communicate its state.
- All controls must work by keyboard.
- Focus states must be visible.
- Validation errors must be associated with their inputs.
- Login feedback must be announced to assistive technologies where appropriate.
- Use sufficient color contrast.
- Do not rely on color alone to communicate success or failure.
- Buttons must have accessible names.
18. Responsive Design Requirements
Desktop
- Login card should be centered or placed in a balanced split layout.
- Form width should remain comfortable and compact.
- Avoid unnecessary large empty areas or distractions.
Tablet
- Layout must adapt to viewport width.
- Inputs and actions must remain easy to use.
Mobile
- Login form must fit small screens without horizontal scrolling.
- Use full-width form controls where appropriate.
- Keep password toggle and login button easy to tap.
- Respect safe areas and mobile keyboard behavior.
- Ensure error messages do not break the layout.
19. SEO and Indexing
Admin login pages are not public marketing pages.
- Add noindex/appropriate robots directives to admin authentication and admin pages.
- Avoid exposing admin route details in public navigation or sitemaps.
- Do not treat noindex as a security mechanism; authentication and authorization must still protect routes and APIs.
20. Testing Requirements
UI Tests
- Login page renders correctly.
- Email/username and password inputs are present.
- Show/Hide password works.
- Required validation works.
- Loading state prevents repeated submissions.
- Generic error feedback is displayed.
- Successful login redirects correctly.
- Responsive layout works on desktop, tablet, and mobile.
- Keyboard navigation and focus are usable.
Authentication Tests
- Valid credentials authenticate successfully.
- Invalid credentials are rejected.
- Inactive admin account cannot log in.
- Password hash is used for credential verification.
- No password or hash is returned in API responses.
- Session/token expiration is handled.
- Logout invalidates authentication.
- Protected routes redirect unauthenticated users.
- Admin APIs reject unauthorized requests.
Security Tests
- Login endpoint is rate-limited.
- Request validation is enforced by the backend.
- Admin signup is not publicly available.
- Authentication secrets are not hardcoded.
- Cookie/session security settings are verified in production.
- CSRF protection is tested if cookie authentication is used.
- Password reset tokens are secure and single-use if recovery is implemented.
- Security events do not log credentials or tokens.
21. Definition of Done
- [ ] Login page implemented at /admin/login.
- [ ] UI follows approved admin branding and Bootstrap conventions.
- [ ] Login identifier and password fields work.
- [ ] Show/Hide Password functionality works.
- [ ] Frontend validation is implemented.
- [ ] Backend authentication API is implemented.
- [ ] Passwords are securely hashed and verified.
- [ ] Authentication state/session is established securely.
- [ ] Protected admin routes are implemented.
- [ ] Backend admin APIs enforce authentication and permissions.
- [ ] Logout works and invalidates the session.
- [ ] Rate limiting and login abuse protections are enabled.
- [ ] Error messages do not reveal sensitive authentication details.
- [ ] Responsive layout is tested.
- [ ] Accessibility checks are completed.
- [ ] Admin account setup process is documented.
- [ ] Tests pass.
- [ ] No public admin registration or hardcoded production credentials exist.
22. Pending Decisions
Confirm before implementation:
- Admin login identifier: email or username.
- Single admin or multiple admin accounts.
- Roles and permissions required (if more than one role).
- Authentication strategy: secure cookie/session or JWT architecture.
- Session duration and expiration policy.
- Whether “Remember Me” is required.
- Whether forgot-password/recovery is required.
- Admin account setup and recovery process.
- Whether the admin login UI must support Marathi.
- Approved logo and login-page visual design.
23. Final Notes
This document defines the Admin Login functionality for the Aditi Caterers website. Authentication must be implemented securely on both the frontend and backend. Admin accounts must be provisioned through a controlled process; public admin registration must not be available. All example credentials, names, and response values are illustrative and must not be used as real account details.
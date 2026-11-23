
03. Authentication and Authorization Requirements
Project: Aditi Caterers Website
Folder: 04-backend/
File: 03-authentication.md
Backend: Node.js + Express.js
Database: MongoDB Atlas + Mongoose
Authentication: JWT-based admin authentication with secure password hashing
1. Document Purpose
This document defines the authentication and authorization requirements for the Aditi Caterers backend.

The authentication system protects the Admin Panel and all administrative API endpoints. Public website visitors must be able to browse approved public content and submit permitted enquiries without an admin account.

This document covers admin login, password security, JWT handling, protected routes, roles and permissions, logout, account status, password changes, recovery approach, audit events, security controls, API contracts, and testing.
2. Authentication Objectives
The system must:
1. Allow only authorized admin users to access the Admin Panel.
2. Authenticate admins using a registered identifier and password.
3. Store passwords as secure hashes, never as plaintext.
4. Issue signed, time-limited authentication tokens.
5. Protect admin API routes on the backend.
6. Support role-based and permission-based authorization.
7. Provide secure logout and token invalidation behavior.
8. Prevent brute-force login attempts.
9. Avoid revealing sensitive account information.
10. Keep authentication behavior consistent for the English and Marathi Admin Panel.
3. Authentication Scope
Included
- Admin login.
- Admin identity and account status verification.
- Password hashing and comparison.
- JWT creation and verification.
- Protected admin API routes.
- Role and permission checks.
- Logout and token invalidation strategy.
- Password change for authenticated admins.
- Admin account activation, deactivation, and lockout controls.
- Login-related audit events.
- Secure error handling.
Not Included in the Initial Public Scope
- Public customer registration.
- Public customer login.
- Social login.
- Public password reset.
- Customer accounts and customer self-service portal.
These features must not be added without a separate approved requirement.
4. Technology Requirements
Technology	Purpose
Node.js	Backend runtime
Express.js	Authentication API
MongoDB Atlas	Admin account and session/token metadata storage
Mongoose	Admin and session models
bcryptjs	Password hashing and comparison
jsonwebtoken	JWT signing and verification
express-validator or Zod	Request validation
express-rate-limit	Login rate limiting
Helmet	HTTP security headers


Use maintained, compatible package versions. Keep the package lock file committed.
5. Admin Account Model
Create an AdminUser Mongoose model.

Suggested fields:
{
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ["owner", "admin", "manager", "staff"],
    required: true
  },
  permissions: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  failedLoginAttempts: {
    type: Number,
    default: 0
  },
  lockedUntil: {
    type: Date,
    default: null
  },
  lastLoginAt: {
    type: Date,
    default: null
  },
  passwordChangedAt: {
    type: Date,
    default: null
  }
}
This is a starting schema, not a final permission policy. Adjust fields and roles after owner approval.

Requirements:
1. Normalize email addresses before saving and querying.
2. Enforce a unique index on the chosen login identifier.
3. Never return passwordHash in API responses.
4. Do not store plaintext passwords or reversible password values.
5. Do not allow public APIs to create admin accounts.
6. Add timestamps using Mongoose where appropriate.
7. Validate role and permission values on the backend.
If the business chooses a phone number as the login identifier instead of email, define normalization, uniqueness, verification, and recovery rules before implementation.
6. Initial Admin Account Creation
The first owner/admin account must be created through a secure, controlled setup process.

Requirements:
- Do not create a public admin registration endpoint.
- Do not hard-code a default admin password in source code.
- Do not commit credentials in seed files.
- Use a one-time secure setup script or a controlled owner-approved provisioning process.
- Hash the initial password before saving.
- Ensure the setup process cannot unintentionally create duplicate owner accounts.
- Remove or disable temporary setup access after the initial account is created.
- Record the provisioning action without recording the password.
The business owner must confirm who is authorized to create additional admin accounts.
7. Login Identifier and Form Requirements
The Admin Panel login page must include:
- Email address (or the owner-approved login identifier).
- Password.
- Show/hide password control.
- Login button.
- Clear validation messages.
- Loading state while the login request is processing.
- A generic login failure message.
- English and Marathi language support.
Do not add a public “Create Account” link.

A “Forgot Password?” link must be shown only after a secure recovery workflow has been designed and implemented. Do not display a link that does not work.
8. Login API
Endpoint
POST /api/v1/auth/login
Request example
{
  "email": "admin@example.com",
  "password": "user-entered-password"
}
The email is an illustrative placeholder, not a real admin account.

Success response example
{
  "success": true,
  "message": "Login successful",
  "data": {
    "admin": {
      "id": "ADMIN_OBJECT_ID",
      "fullName": "Admin User",
      "email": "admin@example.com",
      "role": "owner",
      "permissions": []
    },
    "accessToken": "SIGNED_ACCESS_TOKEN"
  }
}
The exact response and token transport must follow the selected cookie or bearer-token strategy. Never include password hashes or sensitive account-security fields in the response.

Failure response example
{
  "success": false,
  "message": "Invalid email or password"
}
9. Login Processing Rules
When a login request is received:
1. Validate the request body.
2. Normalize the login identifier.
3. Find the matching admin account.
4. Check whether the account exists.
5. Check whether the account is active.
6. Check whether the account is temporarily locked.
7. Compare the submitted password with the stored password hash.
8. On failure, update applicable failed-attempt controls.
9. On success, reset failed-attempt counters and lockout state.
10. Update lastLoginAt.
11. Create an access token or secure session.
12. Record a safe login audit event.
13. Return only the required admin profile and authentication information.
For nonexistent users and incorrect passwords, return a generic message so the endpoint does not reveal which email addresses are registered.

Do not reveal whether an account is locked, inactive, or nonexistent in a way that enables account enumeration. Security-sensitive details may be recorded in protected server logs.
10. Password Hashing
Use bcryptjs to hash passwords before saving them.

Requirements:
- Never store plaintext passwords.
- Never encrypt passwords for later decryption.
- Use a bcrypt work factor appropriate to the production environment and benchmark it before deployment.
- Use asynchronous hash and compare functions.
- Never log passwords or include them in error messages.
- Never return password hashes to the frontend.
- Do not allow a password update without verifying the current password or completing an approved recovery process.
Example:
import bcrypt from "bcryptjs";

const passwordHash = await bcrypt.hash(password, 12);

const isPasswordValid = await bcrypt.compare(
  enteredPassword,
  admin.passwordHash
);
The work factor shown is an example and must be benchmarked on the deployment environment.
11. Password Policy
The application must enforce a documented password policy.

Recommended baseline:
- Minimum length: 12 characters.
- Maximum accepted length: set a safe documented limit.
- Allow passphrases and spaces where practical.
- Do not require arbitrary character-combination rules that encourage weak passwords.
- Reject known common or compromised passwords if a suitable checking mechanism is adopted.
- Do not silently trim or transform passwords.
- Do not impose frequent password changes without a security reason.
The final policy must be documented and applied consistently in account creation and password change flows.
12. JWT Access Token Requirements
If JWT bearer authentication is selected, the backend must:
- Sign tokens using a strong secret stored outside source code.
- Set an explicit expiration time.
- Include only necessary claims.
- Include the admin identifier and required authorization claims.
- Verify signature, issuer, audience, and expiry as configured.
- Reject malformed, expired, or invalid tokens.
- Never accept tokens from URL query parameters.
- Never log tokens.
- Never expose the JWT signing secret.
Example payload:
{
  sub: "ADMIN_OBJECT_ID",
  role: "owner"
}
Do not put passwords, personal customer data, or sensitive admin details in JWT claims.

Use a short-lived access token. If refresh tokens are needed, implement rotation, storage, reuse detection, and revocation in a separate documented design.
13. Token Storage and Transport
The project must choose and document one secure browser authentication strategy.
Preferred Option: Secure HttpOnly Cookie
If the application uses cookies:
- Set HttpOnly.
- Set Secure in production.
- Set an appropriate SameSite policy based on frontend/backend domain architecture.
- Configure credentialed CORS for explicit origins only.
- Use CSRF protection for state-changing requests where required.
- Set an explicit cookie lifetime.
- Clear the cookie during logout.
- Never expose the cookie value to frontend JavaScript.
Alternative: Bearer Token
If the application uses bearer tokens:
- Send the token in the Authorization: Bearer header.
- Do not place it in a URL.
- Avoid persistent browser storage for long-lived tokens.
- Assess XSS risks before selecting any browser storage mechanism.
- Keep token lifetime limited.
- Implement revocation or session invalidation where required.
Do not mix cookie and bearer-token strategies inconsistently across routes.
14. Authentication Middleware
Create middleware, for example:
src/middleware/auth.middleware.js
Responsibilities:
1. Read the token from the selected transport.
2. Verify the token/session.
3. Load the admin account as required.
4. Confirm the admin account is active.
5. Reject expired, invalid, revoked, or malformed credentials.
6. Attach a minimal authenticated admin context to the request.
7. Pass authorization failures to centralized error handling.
The middleware must not trust role or permission values sent by the browser.

For high-risk operations, load current roles and permissions from the database instead of relying only on stale token claims.
15. Protected Route Requirements
All admin management routes must be protected.

Examples:
/api/v1/admin/dashboard
/api/v1/admin/bookings
/api/v1/admin/customers
/api/v1/admin/services
/api/v1/admin/menus
/api/v1/admin/packages
/api/v1/admin/gallery
/api/v1/admin/awards
/api/v1/admin/reviews
/api/v1/admin/quotations
/api/v1/admin/reports
/api/v1/admin/website-settings
Requirements:
- Apply authentication middleware to admin route groups.
- Apply authorization checks to individual actions.
- Keep public read endpoints separate from admin management endpoints.
- Do not rely on frontend route guards as the security boundary.
- Return 401 Unauthorized for missing or invalid authentication.
- Return 403 Forbidden for authenticated users without permission.
16. Role-Based Access Control (RBAC)
The system should support roles and permissions.

Suggested initial roles:
Role	Intended Access
Owner	Full business and system administration
Admin	Approved operational and content management
Manager	Assigned operational modules
Staff	Limited access to assigned tasks


These roles are proposed starting points. The business owner must approve the actual roles and access boundaries before implementation.

Requirements:
1. Define permissions as stable identifiers, such as booking.read or booking.update.
2. Map roles to approved permissions on the backend.
3. Check permissions for every protected operation.
4. Do not trust permissions supplied by the client.
5. Prevent unauthorized role escalation.
6. Restrict role and permission changes to the owner or another explicitly authorized role.
7. Record role and permission changes in the audit log.
8. Revoke or refresh sessions when access is materially changed.
17. Permission Examples
Potential permission identifiers:
dashboard.read
booking.read
booking.create
booking.update
booking.cancel
customer.read
customer.update
service.manage
menu.manage
package.manage
gallery.manage
award.manage
review.manage
quotation.read
quotation.create
quotation.issue
report.read
report.export
website-settings.manage
admin-users.read
admin-users.create
admin-users.update
admin-users.deactivate
audit-log.read
These are examples only. Final permissions must match the implemented modules and owner-approved responsibility matrix.
18. Logout API
Endpoint
POST /api/v1/auth/logout
Requirements depend on the chosen authentication strategy:
- Cookie strategy: clear the authentication cookie using matching cookie attributes.
- Stateful session or refresh-token strategy: revoke the active session/token record.
- Stateless short-lived access token strategy: document that clearing the client token does not invalidate a copied token before expiry; use a revocation mechanism if immediate invalidation is required.
Response example
{
  "success": true,
  "message": "Logout successful"
}
Logout must be safe to call more than once. Do not claim that a stateless JWT has been revoked unless the backend actually checks revocation state.
19. Current Admin Profile API
Endpoint
GET /api/v1/auth/me
Purpose:
- Return the authenticated admin's safe profile.
- Return role and effective permissions required by the Admin Panel.
- Confirm the current authentication is still valid.
Do not return:
- Password hash.
- Failed login count.
- Lockout internals.
- Token signing secrets.
- Private security metadata.
20. Change Password API
Endpoint
PATCH /api/v1/auth/change-password
Example request:
{
  "currentPassword": "current-password",
  "newPassword": "new-strong-password"
}
Requirements:
1. Require valid admin authentication.
2. Validate the current password.
3. Validate the new password policy.
4. Reject a new password that is identical to the current password where practical.
5. Hash the new password before saving.
6. Update passwordChangedAt.
7. Invalidate other active sessions or refresh tokens according to the session design.
8. Record a safe audit event.
9. Never return or log either password.
21. Password Recovery Requirements
A password recovery workflow is not enabled by default.

Before implementing recovery, the owner must approve a secure recovery method, such as a verified email workflow or an owner-controlled manual reset process.

If email recovery is approved:
- Use a short-lived, single-use reset token.
- Store only a secure hash of the reset token.
- Do not reveal whether an email address belongs to an admin.
- Rate-limit recovery requests.
- Invalidate existing sessions after a successful reset where appropriate.
- Send recovery links only to the verified registered address.
- Never send passwords in email or WhatsApp messages.
Do not implement a weak “security question” or public admin password reset based only on an email address.
22. Failed Login and Account Lockout
Implement configurable brute-force protection.

Requirements:
- Apply rate limits by IP and account identifier where practical.
- Use a temporary lockout or progressive delay after repeated failed attempts.
- Avoid permanent automatic account lockout that can be abused for denial of service.
- Reset counters after successful authentication.
- Keep lockout thresholds and duration configurable.
- Return generic failure messages.
- Record security events without logging passwords or tokens.
- Provide an owner-controlled process for reviewing and unlocking an account.
Exact thresholds and durations must be selected after considering the hosting environment and business needs.
23. Account Status Management
Admin accounts should support an active/inactive state.

Requirements:
- Inactive admins cannot log in.
- Deactivated admins must lose access to protected routes.
- Existing sessions should be revoked or rejected after deactivation.
- Only authorized users may activate or deactivate an admin.
- Prevent accidental removal or deactivation of the only active owner account.
- Record account status changes in the audit log.
24. Session and Token Management
If persistent sessions or refresh tokens are implemented, use a dedicated session/token model.

Possible fields:
{
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdminUser",
    required: true
  },
  tokenHash: {
    type: String,
    required: true,
    select: false
  },
  expiresAt: {
    type: Date,
    required: true
  },
  revokedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
Requirements:
- Store a hash of refresh/session secrets, not raw long-lived tokens.
- Expire old sessions.
- Revoke sessions on logout, password reset, account deactivation, and relevant permission changes.
- Use secure token rotation if refresh tokens are used.
- Detect reuse of a rotated refresh token.
- Restrict session listing and revocation to authorized admin workflows.
Do not create this collection unless the selected authentication architecture needs it.
25. Login Audit Events
Record appropriate authentication events, such as:
- Successful login.
- Failed login.
- Logout.
- Password change.
- Password recovery completion.
- Account lockout.
- Account activation/deactivation.
- Role or permission changes.
- Session revocation.
Audit records may include:
- Admin ID when known.
- Event type.
- Timestamp.
- Request ID.
- IP address only where justified by the privacy policy.
- Safe metadata.
Never record passwords, full JWTs, reset tokens, or authorization headers.
26. Authentication Error Responses
Use consistent status codes:
Situation	HTTP Status
Missing or invalid credentials	401
Expired or revoked authentication	401
Authenticated but insufficient permission	403
Invalid request fields	400
Rate limit exceeded	429
Unexpected server error	500


Use generic login messages. Do not expose account existence, password correctness, internal role configuration, or database details.

The frontend must translate user-facing messages into English or Marathi. Keep machine-readable error codes stable where possible.
27. Authentication Route Structure
Suggested route file:
src/routes/auth.routes.js
Suggested controller:
src/controllers/auth.controller.js
Suggested service:
src/services/auth.service.js
Suggested middleware:
src/middleware/auth.middleware.js
src/middleware/authorize.middleware.js
Suggested validator:
src/validators/auth.validator.js
Keep password comparison, token/session handling, and account lookup in the service layer. Keep route declarations focused on middleware and controller mapping.
28. API Endpoint Summary
Method	Endpoint	Access	Purpose
POST	/api/v1/auth/login	Public, rate-limited	Admin login
POST	/api/v1/auth/logout	Authenticated	Logout/revoke session
GET	/api/v1/auth/me	Authenticated	Current admin profile
PATCH	/api/v1/auth/change-password	Authenticated	Change password
POST	/api/v1/auth/forgot-password	Not enabled by default	Recovery request, only if approved
POST	/api/v1/auth/reset-password	Not enabled by default	Complete approved recovery


Admin user creation, role changes, and account deactivation should be handled through separately protected admin-user management endpoints, not public registration.
29. Frontend Integration Requirements
The React Admin Panel must:
- Submit login credentials over HTTPS in production.
- Use the selected cookie or bearer-token strategy consistently.
- Show loading and disabled states during login.
- Display generic authentication failures.
- Fetch the current admin profile after authentication where required.
- Protect admin routes for user experience, while relying on backend authorization for real security.
- Handle 401 by clearing local authentication state and redirecting to login.
- Handle 403 with an access-denied message.
- Avoid displaying permissions or admin details that the current user should not see.
- Support English and Marathi labels and validation messages.
- Avoid storing passwords in browser storage, logs, or analytics.
30. Security Requirements
- Use HTTPS in production.
- Hash passwords with bcryptjs using a benchmarked work factor.
- Use strong JWT secrets or approved asymmetric signing keys.
- Set token expiry.
- Validate token issuer and audience where configured.
- Apply login and recovery rate limits.
- Use explicit CORS origins.
- Use Helmet security headers.
- Prevent brute-force and account-enumeration attacks.
- Protect against CSRF when cookie-based authentication is used.
- Apply XSS prevention practices in the frontend.
- Validate and sanitize all authentication input.
- Keep dependencies updated.
- Never expose secrets or password hashes.
- Revoke sessions when an account is disabled or its credentials are reset.
31. Testing Requirements
Unit Tests
Test:
- Password hashing and comparison.
- Password policy validation.
- Login identifier normalization.
- JWT creation and verification.
- Token expiry and invalid token handling.
- Role and permission evaluation.
- Lockout threshold logic.
- Safe error response mapping.
Integration Tests
Test:
- Successful admin login.
- Incorrect password.
- Unknown account with generic error response.
- Inactive account login rejection.
- Locked account login rejection.
- Missing token on protected routes.
- Invalid and expired token rejection.
- Successful access to an authorized route.
- 403 for insufficient permissions.
- Logout and session revocation behavior.
- Password change with correct and incorrect current password.
- Rate limiting.
- Deactivated account access rejection.
- No password hash or token secret in API responses.
Use isolated test accounts and a test database. Do not test with the production owner account.
32. Acceptance Criteria
- [ ] Admin login API is implemented and validated.
- [ ] Initial admin account is created through a secure process.
- [ ] Passwords are stored only as hashes.
- [ ] Login errors do not reveal account existence.
- [ ] JWT/session strategy is documented and consistently implemented.
- [ ] Token expiry and verification are enforced.
- [ ] Admin routes are protected on the backend.
- [ ] Role and permission checks are enforced server-side.
- [ ] Logout follows the actual token/session architecture.
- [ ] Current admin profile endpoint returns safe fields only.
- [ ] Password change requires valid authentication and current-password verification.
- [ ] Recovery is disabled unless an approved secure workflow exists.
- [ ] Login rate limiting and failed-attempt controls are implemented.
- [ ] Deactivated accounts cannot continue using protected routes.
- [ ] Security-sensitive events are audited without storing secrets.
- [ ] Admin login UI supports English and Marathi.
- [ ] Automated authentication and authorization tests pass.
33. Definition of Done
Authentication is complete when:
1. An authorized admin can log in successfully.
2. Incorrect credentials are rejected safely.
3. Protected APIs reject unauthenticated requests.
4. Unauthorized roles and permissions are rejected.
5. Logout and session invalidation work according to the chosen architecture.
6. Password changes are secure and tested.
7. Rate limiting and account-status controls work.
8. Sensitive information is excluded from responses and logs.
9. English and Marathi login experiences are verified.
10. Security and integration tests pass.
11. The implementation is reviewed before merging.
34. Pending Owner and Technical Decisions
Confirm these items before production:
- Admin login identifier: email or another approved identifier.
- Final admin roles and permission matrix.
- Who can create and deactivate admin users.
- Password policy and bcrypt work factor.
- JWT signing method and access-token lifetime.
- Cookie-based or bearer-token authentication.
- Whether refresh tokens and a session collection are required.
- CSRF strategy if cookies are used.
- Failed-login thresholds and lockout duration.
- Password recovery method and verified recovery contact.
- Session revocation policy.
- Authentication audit-log retention.
- Whether multi-factor authentication is required.
- Whether admin login alerts are required.
Do not invent real admin credentials, recovery contacts, security thresholds, or role permissions. Obtain owner approval and document the final choices.
End of Document
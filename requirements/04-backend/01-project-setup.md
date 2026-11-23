01. Backend Project Setup Requirements
Project: Aditi Caterers Website
Folder: 04-backend/
File: 01-project-setup.md
Backend Stack: Node.js, Express.js, MongoDB Atlas, Mongoose
Related Frontend: React + Vite + Bootstrap 5
1. Document Purpose
This document defines the setup requirements, folder structure, configuration, development scripts, and baseline engineering standards for the Aditi Caterers backend.

The backend will provide secure APIs for the public website and Admin Panel. It will manage enquiries, bookings, customers, services, menus, packages, gallery items, awards, reviews, quotations, reports, and website settings as the related modules are implemented.

This file covers the initial backend foundation only. Detailed module-specific business rules and endpoints must be documented in their respective requirement files.
2. Project Objectives
The backend must:
1. Provide a maintainable REST API for the React frontend.
2. Connect securely to MongoDB Atlas through Mongoose.
3. Support English and Marathi content and admin interface workflows.
4. Validate and sanitize incoming request data.
5. Provide consistent API responses and centralized error handling.
6. Protect admin-only routes using authentication and authorization.
7. Keep secrets and environment-specific configuration outside source code.
8. Support local development, testing, and production deployment.
9. Be structured so additional modules can be added without major restructuring.
3. Technology Stack
Technology	Purpose
Node.js (LTS)	JavaScript runtime
Express.js	REST API framework
MongoDB Atlas	Cloud database
Mongoose	MongoDB object modeling and schema validation
dotenv	Environment variable loading
cors	Controlled frontend-origin access
helmet	HTTP security headers
express-rate-limit	Rate limiting
bcryptjs	Password hashing
jsonwebtoken	Admin authentication tokens
express-validator or Zod	Request validation
morgan	Development HTTP request logging
multer	Multipart file upload handling
Cloudinary SDK	Remote media storage, if enabled
Jest or Vitest + Supertest	Automated API testing


Use compatible, stable package versions and commit the package lock file. Do not install packages that are not needed by the implementation.
4. Prerequisites
Before starting, ensure the development machine has:
- A supported Node.js LTS version installed.
- npm installed.
- Git installed and the project repository cloned.
- A MongoDB Atlas project and database user created.
- A database connection string available.
- Access to the frontend development origin.
- Cloudinary credentials only if image upload integration is being configured.
Verify the tools:
node -v
npm -v
git --version
5. Backend Directory Structure
Create the backend inside the main project repository:
project-root/
├── frontend/
│   └── ...
├── 04-backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── cloudinary.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   ├── not-found.middleware.js
│   │   │   └── validate.middleware.js
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── utils/
│   │   │   ├── ApiError.js
│   │   │   └── ApiResponse.js
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   │   ├── integration/
│   │   └── unit/
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── README.md
└── requirements/
    └── ...
5.1 Folder Responsibilities
Folder/File	Responsibility
config/	Database, media provider, and external service configuration
controllers/	Receive requests and return responses
middleware/	Authentication, validation, error handling, and request controls
models/	Mongoose schemas and database models
routes/	API route definitions
services/	Business logic and integrations
validators/	Request validation schemas/rules
utils/	Reusable response, error, and helper utilities
tests/	Unit and integration tests
app.js	Express app creation and middleware/route registration
server.js	Environment loading, database connection, and server startup


Keep controllers thin. Put reusable business logic in services. Do not place database queries directly in route declaration files.
6. Initialize the Node.js Project
Open a terminal in the 04-backend directory:
cd 04-backend
npm init -y
Set the project to use ES modules by adding "type": "module" to package.json.

Install the core dependencies:
npm install express mongoose dotenv cors helmet express-rate-limit bcryptjs jsonwebtoken express-validator morgan
Install development dependencies:
npm install --save-dev nodemon jest supertest
If the project chooses Vitest instead of Jest, configure Vitest consistently and remove unused test dependencies. Install multer and the Cloudinary SDK when the media-upload module is ready.
7. Package Scripts
Configure scripts in package.json appropriate to the selected module system and test runner. Example:
{
  "name": "aditi-caterers-backend",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest --runInBand",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
The exact test command must match the selected Jest configuration. Do not leave scripts pointing to tools that are not installed or configured.
8. Environment Configuration
Create .env locally. Create .env.example for the repository with variable names and safe placeholder values only.

Example .env.example:
NODE_ENV=development
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=1d
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
Requirements:
1. Never commit .env or real credentials.
2. Add .env to .gitignore.
3. Use a strong, randomly generated JWT secret in each environment.
4. Never use the example JWT secret in development or production.
5. Validate required environment variables during startup.
6. Do not expose database credentials, JWT secrets, or Cloudinary secrets to the frontend.
7. Do not return environment variable values in API responses or logs.
8. Use separate credentials and database access policies for development and production where practical.
9. MongoDB Atlas Setup
1. Create or select the MongoDB Atlas project.
2. Create a database user with a strong password.
3. Configure Network Access for the deployment environment. Avoid unrestricted network access unless there is a documented temporary development reason.
4. Create or select the application database.
5. Add the connection string to the local .env as MONGODB_URI.
6. Confirm the database user has only the permissions required by the application.
7. Do not store database credentials in frontend code or source control.
The database name must be chosen consistently by the project owner/developer and documented in the deployment environment.
10. Database Connection
Create src/config/database.js to:
- Connect to MongoDB using mongoose.connect().
- Read the URI from process.env.MONGODB_URI.
- Fail startup clearly if the connection cannot be established.
- Log a safe success message without printing credentials.
- Handle connection errors and unexpected disconnections appropriately.
Do not start accepting API traffic before the initial database connection succeeds.
11. Express Application Setup
Create src/app.js to configure the Express application.

Recommended middleware order:
1. helmet() for security headers.
2. CORS with an explicit allowlist of configured frontend origins.
3. JSON body parsing with a reasonable request-size limit.
4. URL-encoded body parsing only if required.
5. Request logging in development.
6. Health-check route.
7. API routes under a versioned prefix such as /api/v1.
8. Not-found middleware.
9. Centralized error-handling middleware.
Do not use wildcard CORS in production when credentials or protected endpoints are involved. Configure allowed methods and headers deliberately.
12. Server Startup
Create src/server.js to:
1. Load environment variables before configuration is used.
2. Validate required environment variables.
3. Connect to MongoDB.
4. Start the Express server on the configured port.
5. Log the environment and listening port without exposing secrets.
6. Handle startup failures safely.
Implement graceful shutdown for SIGINT and SIGTERM: stop accepting new requests, close the HTTP server, and close the database connection. Avoid abruptly terminating active requests during normal shutdown.
13. API Versioning and Base URL
Use a versioned API prefix:
/api/v1
Local development example:
http://localhost:5000/api/v1
Production frontend must use the deployed backend base URL from frontend environment configuration. Do not hard-code a production URL throughout frontend components.
14. Initial Health Check
Create a public health endpoint:
GET /api/v1/health
Example success response:
{
  "success": true,
  "message": "API is running",
  "data": {
    "status": "ok"
  }
}
The health endpoint should confirm that the API process is responding. If database readiness is also reported, make that status explicit and do not expose internal connection strings, hostnames, or infrastructure secrets.
15. Standard API Response Format
Use a consistent JSON response structure.
Success
{
  "success": true,
  "message": "Request completed successfully",
  "data": {}
}
Error
{
  "success": false,
  "message": "A clear error message",
  "errors": []
}
Requirements:
- Use suitable HTTP status codes.
- Keep messages understandable and safe.
- Do not return stack traces in production.
- Do not expose internal database errors or sensitive values.
- Use a consistent pagination format in list endpoints when pagination is implemented.
16. Error Handling
Implement centralized error handling for:
- Request validation errors.
- Authentication and authorization failures.
- Missing routes.
- Mongoose validation errors.
- Duplicate-key errors.
- Cast/invalid identifier errors.
- Unexpected server errors.
Expected behavior:
1. Controllers/services should pass errors to centralized handling.
2. The error middleware should map known errors to appropriate HTTP status codes.
3. Unexpected errors should return a generic message in production.
4. Detailed diagnostic information may be logged securely on the server.
5. Never send stack traces, secrets, or raw database details to public clients.
17. Request Validation and Data Sanitization
Validate request bodies, route parameters, and query parameters at the API boundary.

Validation must cover, as applicable:
- Required fields and data types.
- String length limits.
- Email and phone formats.
- Valid MongoDB ObjectId values.
- Allowed enum values and status transitions.
- Numeric ranges and non-negative amounts.
- Pagination limits and sort fields.
- Supported language values.
- Uploaded file type and size.
Trim appropriate text fields and reject unexpected or disallowed input. Do not rely only on frontend validation.
18. Authentication and Authorization Foundation
Admin authentication will be implemented in its dedicated module. The project foundation must support:
- Password hashing with bcryptjs (never store plaintext passwords).
- JWT signing and verification using a server-side secret.
- Authentication middleware for protected routes.
- Role/permission checks for administrative operations.
- Token expiry and secure logout/token invalidation strategy as defined by the authentication design.
Public website endpoints must not expose admin-only operations. Never create a publicly accessible admin registration endpoint. Admin account creation and recovery must follow the approved owner-controlled process.

For browser-based authentication, choose and document the token storage and cookie strategy. If cookies are used, configure HttpOnly, Secure in production, appropriate SameSite, and CSRF protections as required. If bearer tokens are used, assess browser storage risks and never place long-lived secrets in URLs.
19. CORS and API Security
- Allow only approved frontend origins.
- Keep production origin configuration in environment variables.
- Enable security headers with Helmet.
- Apply rate limits to authentication and public submission endpoints.
- Limit request body sizes.
- Validate and sanitize all incoming data.
- Use HTTPS in production.
- Avoid revealing whether sensitive admin accounts exist through overly specific login errors.
- Keep dependencies updated and review security advisories.
- Do not trust client-supplied prices, totals, permissions, or status changes.
20. Bilingual Content Support
The public website and Admin Panel must support English and Marathi.

Backend requirements:
1. Store bilingual content in a consistent structure where a field needs two language versions.
2. Use a documented language key convention, such as en and mr.
3. Preserve the original approved business wording; do not silently machine-translate owner-provided content.
4. Validate both language values where both are required by the relevant module.
5. Allow module-specific rules for optional translations, with a clear fallback policy.
6. Keep API error messages stable and provide a mechanism for frontend localization.
7. Store language preference only where appropriate; admin UI language preference must not unintentionally alter public website content.
Example content shape:
{
  "title": {
    "en": "Wedding Catering",
    "mr": "लग्न समारंभ केटरिंग"
  }
}
This is an illustrative structure. Individual modules may define more appropriate schemas.
21. File and Image Upload Foundation
When upload functionality is implemented:
- Prefer a managed media service such as Cloudinary for production media.
- Keep provider credentials on the backend only.
- Validate MIME type and actual file content where possible.
- Enforce configurable file-size and image-dimension limits.
- Generate safe unique file identifiers.
- Do not trust the original filename or extension.
- Restrict upload endpoints to authorized admins unless a specific public upload flow is approved.
- Clean up temporary files after successful or failed processing.
- Store media URLs and provider identifiers, not image binaries, in ordinary MongoDB documents unless a specific requirement justifies otherwise.
- Define deletion behavior so a media asset is not removed while still referenced by another record.
Upload limits and permitted file formats must be finalized by the project owner/developer before production.
22. Logging and Monitoring
- Use structured, useful server logs.
- Log request method, route, status code, duration, and a request identifier where practical.
- Do not log passwords, JWTs, authorization headers, personal enquiry contents, or payment details.
- Use detailed stack traces only in protected server-side logs.
- Configure production monitoring and error reporting if an approved provider is selected.
- Define log retention according to deployment capabilities and privacy requirements.
23. Database Design Standards
All Mongoose models must follow consistent conventions:
- Use clear, singular model names.
- Add timestamps (createdAt, updatedAt) where appropriate.
- Add indexes for frequently queried fields after reviewing actual query patterns.
- Use enums for controlled status fields.
- Validate important fields at both request and schema levels.
- Use references only where relationships are needed.
- Avoid unnecessary duplication of personal data.
- Define deletion/archive behavior for records that need an audit trail.
- Store monetary values using a consistent representation and currency policy approved by the business owner.
- Do not hard-code menu prices, package prices, tax rates, discounts, or business policies in generic setup code.
Detailed schemas belong in the respective module requirement documents.
24. Pagination, Filtering, and Sorting Standards
For list endpoints, use consistent query parameters where applicable:
?page=1&limit=10&sortBy=createdAt&sortOrder=desc
Requirements:
- Default page and limit must be documented.
- Enforce a maximum page size.
- Whitelist sortable fields.
- Validate filter values.
- Return pagination metadata such as current page, page size, total records, and total pages.
- Do not allow raw client input to become arbitrary MongoDB query operators.
25. API Route Organization
Keep routes grouped by feature. Example planned route files:
src/routes/
├── health.routes.js
├── auth.routes.js
├── booking.routes.js
├── customer.routes.js
├── service.routes.js
├── menu.routes.js
├── package.routes.js
├── gallery.routes.js
├── award.routes.js
├── review.routes.js
├── quotation.routes.js
├── report.routes.js
└── website-settings.routes.js
Only create route files when their modules are being implemented. Mount routes under /api/v1. Protect each route according to its public/admin access requirements.
26. Development Workflow
Recommended implementation sequence:
1. Initialize Node.js project and install dependencies.
2. Create the folder structure.
3. Configure environment variables and .gitignore.
4. Connect to MongoDB Atlas.
5. Configure Express middleware and health endpoint.
6. Add centralized errors and response utilities.
7. Add request validation conventions.
8. Establish authentication and authorization foundation.
9. Implement feature modules according to their requirement documents.
10. Add unit and integration tests as each module is developed.
11. Review security and deployment configuration before release.
Use feature branches and meaningful commits. Do not commit .env, credentials, database dumps, or uploaded private customer files.
27. Local Development and Verification
Start the backend:
npm run dev
Verify the health endpoint using a browser, Postman, or an API client:
GET http://localhost:5000/api/v1/health
Before considering setup complete, verify:
- The server starts without configuration errors.
- MongoDB Atlas connection succeeds.
- The health endpoint returns the expected response.
- Requests from the configured frontend origin are allowed.
- Requests from unapproved origins are rejected by CORS policy.
- Unknown routes return a consistent 404 response.
- Invalid JSON and invalid request data are handled safely.
- Server errors do not expose stack traces in production mode.
28. Testing Requirements
Unit Tests
Test reusable utilities, validators, service functions, and error mapping.
Integration Tests
Test:
- Health endpoint.
- Database connection behavior using a controlled test database.
- CORS behavior.
- Unknown route handling.
- Request validation.
- Authentication middleware when implemented.
- Protected-route access rules when implemented.
- Standard success and error response formats.
Tests must not use or modify production data. Use a separate test database or isolated test environment and clean up test records.
29. Performance and Reliability
- Use database indexes based on measured query needs.
- Use pagination for potentially large collections.
- Avoid returning unnecessary fields.
- Use lean Mongoose queries for read-only operations where appropriate.
- Avoid unbounded database queries.
- Configure request timeouts and upload limits appropriately.
- Handle database unavailability without exposing internal details.
- Do not add caching until invalidation and freshness requirements are understood.
30. Deployment Readiness
Before deployment:
1. Set NODE_ENV=production.
2. Configure production MongoDB credentials and network access.
3. Configure the exact frontend origin in CORS.
4. Set a strong production JWT secret.
5. Configure approved media credentials if uploads are enabled.
6. Ensure HTTPS is used.
7. Confirm .env is not part of the deployment artifact or repository.
8. Run tests and production dependency checks.
9. Confirm logs do not contain sensitive information.
10. Verify health endpoint and critical API routes after deployment.
The final hosting provider, domain, backup plan, and monitoring provider must be confirmed separately.
31. Acceptance Criteria
The backend setup is accepted when:
- [ ] Node.js project is initialized successfully.
- [ ] Required dependencies and scripts are configured.
- [ ] The documented folder structure is created.
- [ ] .env.example is committed with placeholders only.
- [ ] .env is excluded from Git.
- [ ] MongoDB Atlas connects successfully in the configured environment.
- [ ] Express server starts only after required configuration and database readiness checks.
- [ ] Health endpoint responds successfully.
- [ ] API routes use the /api/v1 prefix.
- [ ] CORS uses an explicit origin allowlist.
- [ ] Centralized 404 and error handling work.
- [ ] Request validation conventions are established.
- [ ] Authentication/authorization foundation can protect admin routes.
- [ ] English and Marathi content conventions are documented.
- [ ] Basic automated tests pass.
- [ ] No secrets or sensitive customer information are exposed in responses or logs.
- [ ] Production deployment configuration is documented.
32. Definition of Done
This setup task is complete when:
1. The backend project runs locally.
2. The database connection is verified.
3. Health and error-handling endpoints are tested.
4. Environment configuration and Git exclusions are reviewed.
5. The folder structure and coding conventions are documented.
6. The frontend can reach the local API from its approved origin.
7. A pull request is reviewed and merged according to the team workflow.
33. Pending Decisions
Confirm the following before production or before the relevant feature is implemented:
- Final Node.js runtime version supported by the deployment host.
- Production backend hosting provider and API domain.
- Production frontend origin(s).
- MongoDB Atlas database name, region, and backup configuration.
- Admin roles and detailed permissions.
- JWT lifetime and browser token/cookie strategy.
- Cloudinary or alternative media provider.
- Permitted image formats, file-size limits, and image dimensions.
- Email, SMS, or WhatsApp notification provider, if required.
- Logging, monitoring, and retention policy.
- Currency and monetary rounding policy for quotations and reports.
- Approved privacy, retention, and data deletion rules.
Do not invent these values. Record owner-approved decisions in the relevant configuration and module documents.
End of Document
# Aditi Caterers - Backend REST API

Production-ready backend API service for Aditi Caterers, built with Node.js, Express.js, MongoDB Atlas, and Mongoose.

## Tech Stack
- **Runtime:** Node.js (LTS)
- **Framework:** Express.js
- **Database:** MongoDB Atlas via Mongoose
- **Security:** Helmet, CORS allowlist, Express Rate Limit, bcryptjs, JWT
- **Logging:** Morgan
- **Validation:** Express Validator

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and provide your database credentials:
```bash
cp .env.example .env
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Run Production Server
```bash
npm start
```

### 5. Health Check Endpoint
```http
GET http://localhost:5000/api/v1/health
```

Expected Response:
```json
{
  "success": true,
  "message": "API is running",
  "data": {
    "status": "ok",
    "uptime": 12.34,
    "timestamp": "2026-11-22T14:30:00.000Z",
    "environment": "development"
  }
}
```

## API Route Architecture
- Versioned Prefix: `/api/v1`
- Centralized Response Standard: `{ "success": boolean, "message": string, "data": ... }`
- Error Response Standard: `{ "success": false, "message": string, "errors": [] }`

## Database Architecture & Requirements
- **Database Engine:** MongoDB Atlas via Mongoose ODM.
- **Connection Module:** [src/config/database.js](file:///c:/MY%20PROJECTS/Aditi-Caterers/backend/src/config/database.js) handles single connection pooling, connection readiness verification on startup, and graceful shutdown handling.
- **Bilingual Structure:** Content fields needing Marathi and English support use the standard subdocument format `{ en: String, mr: String }`.
- **Monetary Policy:** Prices, quotes, and financial aggregates are validated on the backend and safely rounded to 2 decimal places ([src/utils/pagination.js](file:///c:/MY%20PROJECTS/Aditi-Caterers/backend/src/utils/pagination.js)) to avoid floating-point errors.
- **Audit Logging:** Administrative actions and lifecycle events are tracked in the `AuditLog` collection ([src/models/AuditLog.js](file:///c:/MY%20PROJECTS/Aditi-Caterers/backend/src/models/AuditLog.js)).
- **Database Seed Script:** Populates initial configuration and superadmin credentials securely:
  ```bash
  npm run seed
  ```
- **Database Model & Validation Unit Tests:**
  ```bash
  npm test
  ```

## Authentication & Authorization
- **Endpoint Structure:**
  - `POST /api/v1/auth/login` (Rate limited: 10 attempts / 15 mins)
  - `POST /api/v1/auth/logout` (Revokes session and creates audit record)
  - `GET /api/v1/auth/me` (Protected: returns current safe admin profile)
  - `PATCH /api/v1/auth/change-password` (Protected: verifies current password before updating)
- **Security & Protection:**
  - Passwords hashed with bcrypt (`work factor 10`).
  - Brute-force protection: Temporary 15-minute account lockout after 5 consecutive failed attempts.
  - Generic authentication failure responses to prevent account enumeration.
  - Role-based authorization (`superadmin`, `owner`, `admin`, `manager`, `editor`, `staff`) and granular permission guards.
  - Full audit logging for login success, failures, lockout events, and password changes in `AuditLog`.

## Booking Management API
- **Public Booking Submission:**
  - `POST /api/v1/bookings` (and `/api/v1/enquiries`)
  - Rate limited to 20 requests per 15 minutes.
  - Auto-associates with Customer profiles and assigns human-readable reference `AC-BKG-YYYY-XXXXX`.
  - Initial status: `new` / `pending_review` (indicates request is pending review, not confirmed).
  - Short-window duplicate protection based on normalized phone and event date.
- **Admin Management (Protected by Auth & Role):**
  - `GET /api/v1/admin/bookings`: Search, filter by status, event type, service type, date ranges, and pagination.
  - `GET /api/v1/admin/bookings/:bookingId`: Full booking details, snapshots, notes, and status audit logs.
  - `POST /api/v1/admin/bookings`: Admin creation of direct/walk-in bookings.
  - `PATCH /api/v1/admin/bookings/:bookingId`: Whitelisted details updating.
  - `PATCH /api/v1/admin/bookings/:bookingId/status`: Strict status transitions (`VALID_TRANSITIONS`), recording timestamp and authenticated actor.
  - `POST /api/v1/admin/bookings/:bookingId/notes`: Internal notes management with server timestamps.
  - `PATCH /api/v1/admin/bookings/:bookingId/archive`: Soft-archival support keeping records out of default active lists.

## Menu Management API
- **Public Menu Endpoints (Unauthenticated):**
  - `GET /api/v1/public/menu`: Returns only published, active, non-deleted menu items. Supports filtering by category (`category`), search (`search`), featured flag (`featured`), and pagination (`page`, `limit`).
  - `GET /api/v1/public/menu/categories`: Returns active categories with published dish count.
  - `GET /api/v1/public/menu/:id`: Returns single published item details (404 for draft/archived items).
- **Admin Management Endpoints (Protected by Auth & Role):**
  - `GET /api/v1/admin/menu/items` (and `/api/v1/admin/menu`): Full list with status counts (draft, published, unpublished, archived), filters, and pagination.
  - `POST /api/v1/admin/menu/items`: Creates draft item with bilingual names (`en`, `mr`) and optional pricing.
  - `PUT/PATCH /api/v1/admin/menu/items/:id`: Updates allowed menu item fields and records audit logs.
  - `PATCH /api/v1/admin/menu/items/:id/publish`: Verifies required Marathi and English names before publication.
  - `PATCH /api/v1/admin/menu/items/:id/unpublish`: Sets status to draft.
  - `DELETE /api/v1/admin/menu/items/:id`: Soft-archives items without breaking package/quotation references.
  - `PATCH /api/v1/admin/menu/items/reorder`: Reorders items by `displayOrder`.
  - `GET/POST/PUT/DELETE /api/v1/admin/menu/categories`: Complete category management with reference safety checks.

const assert = require('assert');
const request = require('supertest');
const jwt = require('jsonwebtoken');

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_jwt_secret_for_booking_suite_2026';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test_dummy_db';

const app = require('../../src/app');
const Booking = require('../../src/models/Booking');
const { VALID_TRANSITIONS } = require('../../src/constants/bookingStatus');
const { generateBookingNumber } = require('../../src/utils/bookingNumber');

async function runBookingTests() {
  console.log('--- Starting Booking API & Validation Unit Tests ---');
  let passed = 0;
  let failed = 0;

  const test = (description, fn) => {
    try {
      fn();
      console.log(`  [PASS] ${description}`);
      passed++;
    } catch (err) {
      console.error(`  [FAIL] ${description}`);
      console.error(`         ${err.message}`);
      failed++;
    }
  };

  const asyncTest = async (description, fn) => {
    try {
      await fn();
      console.log(`  [PASS] ${description}`);
      passed++;
    } catch (err) {
      console.error(`  [FAIL] ${description}`);
      console.error(`         ${err.message}`);
      failed++;
    }
  };

  // 1. Status transition logic verification
  test('VALID_TRANSITIONS enforces strict business progression and prevents skipping states', () => {
    assert.ok(VALID_TRANSITIONS.new.includes('contacted'));
    assert.ok(VALID_TRANSITIONS.new.includes('quotation_sent'));
    assert.ok(VALID_TRANSITIONS.new.includes('cancelled'));

    assert.ok(VALID_TRANSITIONS.confirmed.includes('completed'));
    assert.ok(VALID_TRANSITIONS.confirmed.includes('cancelled'));
    assert.ok(!VALID_TRANSITIONS.confirmed.includes('new'), 'Confirmed cannot regress silently to new');

    assert.strictEqual(VALID_TRANSITIONS.completed.length, 0, 'Completed is a terminal state');
  });

  // 2. Booking Schema Validation
  await asyncTest('Booking model validates customer snapshots, eventDetails, and default status', async () => {
    const validBooking = new Booking({
      bookingNumber: 'AC-BKG-2026-99999',
      customerSnapshot: {
        name: 'Anita Deshmukh',
        phone: '9822114455',
        email: 'anita@example.com',
      },
      eventDetails: {
        eventType: 'wedding',
        eventDate: new Date('2026-12-25'),
        guestCount: 250,
      },
      serviceType: 'with_material',
      status: 'new',
    });

    const err = validBooking.validateSync();
    assert.strictEqual(err, undefined);
    assert.strictEqual(validBooking.status, 'new');
    assert.strictEqual(validBooking.isArchived, false);
  });

  // 3. Booking Schema Rejects Invalid Status
  await asyncTest('Booking model rejects invalid status enums', async () => {
    const invalidBooking = new Booking({
      customerSnapshot: { name: 'Test', phone: '1234567890' },
      eventDetails: { eventType: 'wedding' },
      status: 'unauthorized_random_status',
    });

    const err = invalidBooking.validateSync();
    assert.ok(err.errors.status, 'Should reject invalid status enum');
  });

  // 4. Booking Schema Note & Communication Subdocument Validation
  await asyncTest('Internal notes and status history maintain audit details', async () => {
    const booking = new Booking({
      customerSnapshot: { name: 'Pooja Kulkarni', phone: '9822334455' },
      eventDetails: { eventType: 'birthday' },
      internalNotes: [{ message: 'Customer requested pure veg menu', author: 'Super Admin' }],
      statusHistory: [{ status: 'new', changedByName: 'Customer (Website)', note: 'Submitted via web' }],
    });

    const err = booking.validateSync();
    assert.strictEqual(err, undefined);
    assert.strictEqual(booking.internalNotes.length, 1);
    assert.strictEqual(booking.statusHistory[0].status, 'new');
  });

  // 5. Public Endpoint Rate Limiting and Validation with Supertest
  await asyncTest('Public POST /api/v1/bookings rejects payload missing required customer data with 400', async () => {
    const res = await request(app)
      .post('/api/v1/bookings')
      .send({
        // Missing customer details
        event: { eventType: 'wedding' },
      });

    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.success, false);
  });

  // 6. Admin Endpoints Authentication Guard
  await asyncTest('Admin GET /api/v1/admin/bookings rejects unauthenticated requests with 401', async () => {
    const res = await request(app).get('/api/v1/admin/bookings');
    assert.strictEqual(res.statusCode, 401);
    assert.strictEqual(res.body.success, false);
  });

  await asyncTest('Admin PATCH /api/v1/admin/bookings/:id/status rejects unauthenticated requests with 401', async () => {
    const res = await request(app)
      .patch('/api/v1/admin/bookings/fake-id/status')
      .send({ status: 'contacted' });

    assert.strictEqual(res.statusCode, 401);
  });

  await asyncTest('Admin POST /api/v1/admin/bookings/:id/notes rejects unauthenticated requests with 401', async () => {
    const res = await request(app)
      .post('/api/v1/admin/bookings/fake-id/notes')
      .send({ note: 'Confidential follow up' });

    assert.strictEqual(res.statusCode, 401);
  });

  // 7. Role Authorization Rejection
  await asyncTest('Admin endpoints reject authenticated tokens that have unauthorized roles', async () => {
    const viewerToken = jwt.sign(
      { id: '123', email: 'guest@example.com', role: 'viewer', permissions: [] },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const res = await request(app)
      .get('/api/v1/admin/bookings')
      .set('Authorization', `Bearer ${viewerToken}`);

    assert.strictEqual(res.statusCode, 403);
    assert.strictEqual(res.body.success, false);
  });

  console.log(`\n--- Test Summary: ${passed} passed, ${failed} failed ---`);
  if (failed > 0) {
    process.exit(1);
  }
}

runBookingTests().catch((err) => {
  console.error('Fatal error during booking test run:', err);
  process.exit(1);
});

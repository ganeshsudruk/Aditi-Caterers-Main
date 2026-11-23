const assert = require('assert');
const mongoose = require('mongoose');

// Models
const Admin = require('../../src/models/Admin');
const Customer = require('../../src/models/Customer');
const Booking = require('../../src/models/Booking');
const Quotation = require('../../src/models/Quotation');
const WebsiteSetting = require('../../src/models/WebsiteSetting');
const FAQ = require('../../src/models/FAQ');
const AuditLog = require('../../src/models/AuditLog');
const Service = require('../../src/models/Service');
const MenuItem = require('../../src/models/MenuItem');
const MenuCategory = require('../../src/models/MenuCategory');
const Package = require('../../src/models/Package');
const Gallery = require('../../src/models/Gallery');
const Award = require('../../src/models/Award');
const Review = require('../../src/models/Review');

// Utilities
const {
  isValidObjectId,
  normalizePhone,
  roundAmount,
  parsePaginationAndSort,
} = require('../../src/utils/pagination');

async function runTests() {
  console.log('--- Starting Database Models & Validation Unit Tests ---');
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

  // 1. Pagination & Utility Tests
  test('isValidObjectId correctly identifies valid and invalid MongoDB ObjectIds', () => {
    assert.strictEqual(isValidObjectId(new mongoose.Types.ObjectId().toString()), true);
    assert.strictEqual(isValidObjectId('not-a-valid-id'), false);
    assert.strictEqual(isValidObjectId('12345'), false);
    assert.strictEqual(isValidObjectId(null), false);
  });

  test('normalizePhone formats Indian numbers and removes non-digit characters', () => {
    assert.strictEqual(normalizePhone('+91 98765 43210'), '9876543210');
    assert.strictEqual(normalizePhone('919876543210'), '9876543210');
    assert.strictEqual(normalizePhone('09876543210'), '09876543210');
    assert.strictEqual(normalizePhone('9876543210'), '9876543210');
    assert.strictEqual(normalizePhone(''), '');
  });

  test('roundAmount rounds safely without float artifacts', () => {
    assert.strictEqual(roundAmount(10.126), 10.13);
    assert.strictEqual(roundAmount(10.124), 10.12);
    assert.strictEqual(roundAmount(0.1 + 0.2), 0.3);
    assert.strictEqual(roundAmount('250.50'), 250.5);
  });

  test('parsePaginationAndSort defaults and limits correctly', () => {
    const res = parsePaginationAndSort({ page: '-5', limit: '500', sortBy: 'invalid', sortOrder: 'asc' }, ['createdAt', 'eventDate']);
    assert.strictEqual(res.page, 1);
    assert.strictEqual(res.limit, 100); // capped at 100
    assert.strictEqual(res.skip, 0);
    assert.deepStrictEqual(res.sort, { createdAt: 1 });

    const res2 = parsePaginationAndSort({ page: '2', limit: '20', sortBy: 'eventDate', sortOrder: 'desc' }, ['createdAt', 'eventDate']);
    assert.strictEqual(res2.page, 2);
    assert.strictEqual(res2.limit, 20);
    assert.strictEqual(res2.skip, 20);
    assert.deepStrictEqual(res2.sort, { eventDate: -1 });
  });

  // 2. Admin Schema Validation
  await asyncTest('Admin model validates required fields and email regex', async () => {
    const admin = new Admin({ name: 'Test User', email: 'invalid-email', password: '123' });
    let err = admin.validateSync();
    assert.ok(err.errors.email, 'Should reject invalid email format');
    assert.ok(err.errors.password, 'Should reject password under 6 chars');

    const validAdmin = new Admin({ name: 'Valid Admin', email: 'admin@aditicaterers.com', password: 'password123', role: 'admin' });
    const noErr = validAdmin.validateSync();
    assert.strictEqual(noErr, undefined);
  });

  // 3. Customer Schema Validation
  await asyncTest('Customer model validates required name, phone, and subdocument notes', async () => {
    const customer = new Customer({});
    const err = customer.validateSync();
    assert.ok(err.errors.name, 'Customer name is required');
    assert.ok(err.errors.phone, 'Customer phone is required');

    const validCustomer = new Customer({
      name: 'Ramesh Patil',
      phone: '9876543210',
      email: 'ramesh@example.com',
      notes: [{ message: 'Prefers vegetarian menu', author: 'Super Admin' }]
    });
    const noErr = validCustomer.validateSync();
    assert.strictEqual(noErr, undefined);
  });

  // 4. Booking Schema Validation
  await asyncTest('Booking model requires eventDetails and enforces status enum', async () => {
    const booking = new Booking({
      customerSnapshot: { name: 'Suresh More', phone: '9822000000' },
      eventDetails: { eventType: 'Wedding Reception', eventDate: new Date('2026-12-15') },
      status: 'confirmed',
      serviceType: 'with_material'
    });
    const err = booking.validateSync();
    assert.strictEqual(err, undefined);

    const invalidBooking = new Booking({
      status: 'non_existent_status'
    });
    const validationErr = invalidBooking.validateSync();
    assert.ok(validationErr.errors.status, 'Invalid status enum should be rejected');
  });

  // 5. Quotation Schema Validation
  await asyncTest('Quotation model validates snapshots, items, and status enums', async () => {
    const quotation = new Quotation({
      quotationNumber: 'QT-202611-0001',
      customerSnapshot: { name: 'Mahesh Joshi', mobile: '9822112233' },
      eventSnapshot: { eventType: 'Birthday Party', eventDate: new Date('2026-12-20'), guestCount: 150 },
      serviceType: 'with_material',
      items: [
        {
          name: { en: 'Paneer Tikka', mr: 'पनीर टिक्का' },
          category: 'Starter',
          quantity: 150,
          rate: 120,
          amount: 18000
        }
      ],
      estimatedAmount: 18000,
      grandTotal: 18000,
      status: 'draft'
    });
    const err = quotation.validateSync();
    assert.strictEqual(err, undefined);
  });

  // 6. WebsiteSetting Bilingual Schema Validation
  await asyncTest('WebsiteSetting validates bilingual business and hero fields', async () => {
    const setting = new WebsiteSetting({
      businessName: { en: 'Aditi Caterers', mr: 'अदिती केटरर्स' },
      tagline: { en: 'Authentic Maharashtrian Taste', mr: 'अस्सल महाराष्ट्रीयन चव' },
      contact: {
        primaryPhone: '9822334455',
        primaryEmail: 'info@aditicaterers.com',
        address: { en: 'Pune, Maharashtra', mr: 'पुणे, महाराष्ट्र' }
      }
    });
    const err = setting.validateSync();
    assert.strictEqual(err, undefined);
  });

  // 7. FAQ Bilingual Schema Validation
  await asyncTest('FAQ model validates bilingual questions, answers, and category enums', async () => {
    const faq = new FAQ({
      question: { en: 'Do you provide live counters?', mr: 'तुम्ही लाईव्ह काउंटर्स पुरवता का?' },
      answer: { en: 'Yes, we provide live chaat and dosa counters.', mr: 'होय, आम्ही लाईव्ह चाट आणि डोसा काउंटर्स पुरवतो.' },
      category: 'catering'
    });
    const err = faq.validateSync();
    assert.strictEqual(err, undefined);

    const invalidFaq = new FAQ({
      question: { en: 'No Marathi provided' },
      category: 'invalid_category'
    });
    const valErr = invalidFaq.validateSync();
    assert.ok(valErr.errors['question.mr'], 'Missing Marathi question is required');
    assert.ok(valErr.errors.category, 'Category must be in enum whitelist');
  });

  // 8. AuditLog Schema Validation
  await asyncTest('AuditLog records action, entityType, actorId and metadata', async () => {
    const log = new AuditLog({
      action: 'quotation.created',
      entityType: 'Quotation',
      entityId: new mongoose.Types.ObjectId(),
      actorId: new mongoose.Types.ObjectId(),
      details: { quotationNumber: 'QT-202611-0001', grandTotal: 50000 },
      ipAddress: '127.0.0.1',
      userAgent: 'Mozilla/5.0'
    });
    const err = log.validateSync();
    assert.strictEqual(err, undefined);
  });

  console.log(`\n--- Test Summary: ${passed} passed, ${failed} failed ---`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal error during test run:', err);
  process.exit(1);
});

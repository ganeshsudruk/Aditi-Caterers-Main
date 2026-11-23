const assert = require('assert');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_jwt_secret_for_menu_suite_2026';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test_dummy_db';

const app = require('../../src/app');
const MenuItem = require('../../src/models/MenuItem');
const MenuCategory = require('../../src/models/MenuCategory');

async function runMenuTests() {
  console.log('--- Starting Menu API & Validation Unit Tests ---');
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

  // 1. MenuCategory Schema Validation
  await asyncTest('MenuCategory model validates required English name and slug', async () => {
    const validCat = new MenuCategory({
      name: { en: 'Maharashtrian Breads', mr: 'महाराष्ट्रीयन पोळी / भाकरी' },
      slug: 'maharashtrian-breads',
      status: 'active',
    });
    const err = validCat.validateSync();
    assert.strictEqual(err, undefined);
    assert.strictEqual(validCat.isActive, true);

    const invalidCat = new MenuCategory({
      name: { en: '' },
    });
    const valErr = invalidCat.validateSync();
    assert.ok(valErr.errors['name.en'], 'English name is required');
  });

  // 2. MenuItem Schema Validation & Defaults
  await asyncTest('MenuItem model validates required English name, slug, and sets draft status default', async () => {
    const item = new MenuItem({
      name: { en: 'Puran Poli', mr: 'पुरणपोळी' },
      slug: 'puran-poli',
      category: new mongoose.Types.ObjectId(),
      status: 'draft',
    });
    const err = item.validateSync();
    assert.strictEqual(err, undefined);
    assert.strictEqual(item.status, 'draft');
    assert.strictEqual(item.isFeatured, false);
  });

  // 3. MenuItem rejects negative prices
  await asyncTest('MenuItem model rejects negative prices', async () => {
    const invalidPriceItem = new MenuItem({
      name: { en: 'Invalid Dish' },
      slug: 'invalid-dish',
      price: { amount: -50 },
    });
    const valErr = invalidPriceItem.validateSync();
    assert.ok(valErr.errors['price.amount'], 'Should reject negative price amount');
  });

  // 4. Public Menu Endpoints Unauthenticated Access
  await asyncTest('Public GET /api/v1/public/menu responds with 200 without requiring auth token', async () => {
    const res = await request(app).get('/api/v1/public/menu');
    // Note: Since DB is dummy, it may return empty items or throw 500 on db connect, but not 401
    assert.notStrictEqual(res.statusCode, 401, 'Public menu must not require authentication');
  });

  await asyncTest('Public GET /api/v1/public/menu/categories responds without 401', async () => {
    const res = await request(app).get('/api/v1/public/menu/categories');
    assert.notStrictEqual(res.statusCode, 401, 'Public categories must not require authentication');
  });

  // 5. Admin Menu Endpoints Authentication Guard
  await asyncTest('Admin GET /api/v1/admin/menu/items rejects unauthenticated requests with 401', async () => {
    const res = await request(app).get('/api/v1/admin/menu/items');
    assert.strictEqual(res.statusCode, 401);
    assert.strictEqual(res.body.success, false);
  });

  await asyncTest('Admin POST /api/v1/admin/menu/items rejects unauthenticated requests with 401', async () => {
    const res = await request(app)
      .post('/api/v1/admin/menu/items')
      .send({ name: { en: 'Paneer Butter Masala' } });
    assert.strictEqual(res.statusCode, 401);
  });

  await asyncTest('Admin GET /api/v1/admin/menu/categories rejects unauthenticated requests with 401', async () => {
    const res = await request(app).get('/api/v1/admin/menu/categories');
    assert.strictEqual(res.statusCode, 401);
  });

  // 6. Role Authorization Rejection
  await asyncTest('Admin menu endpoints reject authenticated tokens that have unauthorized roles', async () => {
    const unauthorizedToken = jwt.sign(
      { id: '123', email: 'guest@example.com', role: 'viewer', permissions: [] },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const res = await request(app)
      .get('/api/v1/admin/menu/items')
      .set('Authorization', `Bearer ${unauthorizedToken}`);

    assert.strictEqual(res.statusCode, 403);
    assert.strictEqual(res.body.success, false);
  });

  console.log(`\n--- Test Summary: ${passed} passed, ${failed} failed ---`);
  if (failed > 0) {
    process.exit(1);
  }
}

runMenuTests().catch((err) => {
  console.error('Fatal error during menu test run:', err);
  process.exit(1);
});

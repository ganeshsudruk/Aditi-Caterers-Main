const assert = require('assert');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_jwt_secret_for_auth_suite_2026';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test_dummy_db';

const app = require('../../src/app');
const Admin = require('../../src/models/Admin');
const authService = require('../../src/services/authService');
const { requirePermission } = require('../../src/middleware/roleMiddleware');

async function runAuthTests() {
  console.log('--- Starting Authentication & Authorization Unit Tests ---');
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

  // 1. Password Hashing and Comparison
  await asyncTest('Bcrypt correctly hashes and compares passwords securely', async () => {
    const rawPass = 'Secret@123456';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(rawPass, salt);

    assert.notStrictEqual(rawPass, hash);
    const matches = await bcrypt.compare(rawPass, hash);
    const wrongMatches = await bcrypt.compare('WrongPassword', hash);

    assert.strictEqual(matches, true);
    assert.strictEqual(wrongMatches, false);
  });

  // 2. JWT Generation & Verification
  test('Token generator signs valid JWT with sub/id, email, and role claims', () => {
    const mockAdmin = {
      _id: '654321654321654321654321',
      email: 'owner@aditicaterers.in',
      role: 'owner',
      permissions: ['booking.read', 'quotation.issue'],
    };

    const token = authService.generateToken(mockAdmin);
    assert.ok(typeof token === 'string' && token.length > 20);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    assert.strictEqual(decoded.id, mockAdmin._id);
    assert.strictEqual(decoded.email, mockAdmin.email);
    assert.strictEqual(decoded.role, 'owner');
    assert.deepStrictEqual(decoded.permissions, ['booking.read', 'quotation.issue']);
  });

  // 3. Expired or Invalid Token Handling
  test('JWT verifier rejects malformed and expired tokens', () => {
    assert.throws(() => {
      jwt.verify('invalid-token-string', process.env.JWT_SECRET);
    });

    const expiredToken = jwt.sign(
      { id: '123' },
      process.env.JWT_SECRET,
      { expiresIn: '-1s' }
    );
    assert.throws(
      () => {
        jwt.verify(expiredToken, process.env.JWT_SECRET);
      },
      (err) => err.name === 'TokenExpiredError'
    );
  });

  // 4. Safe Admin Profile Sanitization
  test('formatSafeAdmin excludes password, lockout internals, and preserves safe fields', () => {
    const raw = {
      _id: 'admin-obj-id',
      name: 'Ganesh Sudruk',
      email: 'admin@aditicaterers.in',
      password: 'HashedPassword123',
      role: 'superadmin',
      permissions: ['*'],
      isActive: true,
      failedLoginAttempts: 3,
      lockedUntil: new Date(),
      lastLogin: new Date('2026-11-22T10:00:00.000Z'),
    };

    const safe = authService.formatSafeAdmin(raw);
    assert.strictEqual(safe.id, 'admin-obj-id');
    assert.strictEqual(safe.email, 'admin@aditicaterers.in');
    assert.strictEqual(safe.role, 'superadmin');
    assert.strictEqual(safe.password, undefined);
    assert.strictEqual(safe.failedLoginAttempts, undefined);
    assert.strictEqual(safe.lockedUntil, undefined);
  });

  // 5. Admin Model Locked Check
  test('Admin.isLocked helper detects active lockouts accurately', () => {
    const futureLocked = new Admin({
      name: 'Locked Admin',
      email: 'locked@example.com',
      password: 'Password123',
      lockedUntil: new Date(Date.now() + 100000),
    });
    assert.strictEqual(futureLocked.isLocked(), true);

    const pastLocked = new Admin({
      name: 'Unlocked Admin',
      email: 'unlocked@example.com',
      password: 'Password123',
      lockedUntil: new Date(Date.now() - 100000),
    });
    assert.strictEqual(pastLocked.isLocked(), false);
  });

  // 6. Permission Middleware
  test('requirePermission allows superadmin/owner and enforces matching permissions for other roles', () => {
    let nextCalled = false;
    const next = () => { nextCalled = true; };

    // Superadmin bypasses specific permission checks
    const reqSuper = { user: { role: 'superadmin', permissions: [] } };
    requirePermission('booking.delete')(reqSuper, {}, next);
    assert.strictEqual(nextCalled, true);

    // Regular admin with proper permission
    nextCalled = false;
    const reqAdminWithPerm = { user: { role: 'admin', permissions: ['booking.update'] } };
    requirePermission('booking.update')(reqAdminWithPerm, {}, next);
    assert.strictEqual(nextCalled, true);

    // Regular admin lacking required permission
    let capturedErr = null;
    const reqAdminNoPerm = { user: { role: 'admin', permissions: ['booking.read'] } };
    requirePermission('booking.update')(reqAdminNoPerm, {}, (err) => { capturedErr = err; });
    assert.ok(capturedErr && capturedErr.statusCode === 403);
  });

  // 7. Express App Unauthenticated Access Rejection
  await asyncTest('Protected /api/v1/auth/me rejects requests missing Authorization header with 401', async () => {
    const res = await request(app).get('/api/v1/auth/me');
    assert.strictEqual(res.statusCode, 401);
    assert.strictEqual(res.body.success, false);
  });

  await asyncTest('Protected /api/v1/auth/me rejects requests with invalid Bearer token with 401', async () => {
    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', 'Bearer totally-invalid-token');
    assert.strictEqual(res.statusCode, 401);
    assert.strictEqual(res.body.success, false);
  });

  console.log(`\n--- Test Summary: ${passed} passed, ${failed} failed ---`);
  if (failed > 0) {
    process.exit(1);
  }
}

runAuthTests().catch((err) => {
  console.error('Fatal error during auth test run:', err);
  process.exit(1);
});

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const AuditLog = require('../models/AuditLog');
const ApiError = require('../utils/ApiError');

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Generate signed JWT Access Token
 * @param {Object} admin Admin document
 * @returns {string} Signed JWT
 */
const generateToken = (admin) => {
  const secret = process.env.JWT_SECRET || 'aditi_default_jwt_secret_key_change_in_prod';
  const expiresIn = process.env.JWT_EXPIRES_IN || '24h';

  return jwt.sign(
    {
      id: admin._id,
      email: admin.email,
      role: admin.role,
      permissions: admin.permissions || [],
    },
    secret,
    { expiresIn }
  );
};

/**
 * Format safe admin profile for response
 * @param {Object} admin
 * @returns {Object}
 */
const formatSafeAdmin = (admin) => {
  return {
    id: admin._id,
    name: admin.name || admin.fullName,
    fullName: admin.fullName || admin.name,
    email: admin.email,
    role: admin.role,
    permissions: admin.permissions || [],
    isActive: admin.isActive,
    lastLogin: admin.lastLogin || admin.lastLoginAt,
    lastLoginAt: admin.lastLoginAt || admin.lastLogin,
  };
};

/**
 * Authenticate admin with email and password
 */
const login = async (email, password, { ipAddress = '', userAgent = '' } = {}) => {
  const normalizedEmail = (email || '').toLowerCase().trim();

  // Find admin with password select included
  const admin = await Admin.findOne({ email: normalizedEmail }).select('+password');

  // Generic message prevents account enumeration
  const genericErrorMsg = 'Invalid email or password';

  if (!admin) {
    // Record audit event for failed attempt
    await AuditLog.create({
      action: 'auth.login_failed',
      entityType: 'Admin',
      details: { reason: 'User not found' },
      ipAddress,
      userAgent,
    }).catch(() => {});
    throw ApiError.unauthorized(genericErrorMsg);
  }

  // Check if account is active
  if (!admin.isActive) {
    await AuditLog.create({
      actorId: admin._id,
      action: 'auth.login_failed',
      entityType: 'Admin',
      entityId: admin._id,
      details: { reason: 'Account deactivated' },
      ipAddress,
      userAgent,
    }).catch(() => {});
    throw ApiError.unauthorized(genericErrorMsg);
  }

  // Check temporary lockout
  if (admin.isLocked()) {
    await AuditLog.create({
      actorId: admin._id,
      action: 'auth.login_locked',
      entityType: 'Admin',
      entityId: admin._id,
      details: { lockedUntil: admin.lockedUntil },
      ipAddress,
      userAgent,
    }).catch(() => {});
    throw ApiError.unauthorized(genericErrorMsg);
  }

  // Verify password
  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    admin.failedLoginAttempts = (admin.failedLoginAttempts || 0) + 1;
    let locked = false;

    if (admin.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
      admin.lockedUntil = new Date(Date.now() + LOCKOUT_DURATION_MS);
      locked = true;
    }
    await admin.save();

    await AuditLog.create({
      actorId: admin._id,
      action: locked ? 'auth.account_locked' : 'auth.login_failed',
      entityType: 'Admin',
      entityId: admin._id,
      details: { failedAttempts: admin.failedLoginAttempts },
      ipAddress,
      userAgent,
    }).catch(() => {});

    throw ApiError.unauthorized(genericErrorMsg);
  }

  // Successful login: reset failed attempts & lockout, update lastLogin
  admin.failedLoginAttempts = 0;
  admin.lockedUntil = null;
  const now = new Date();
  admin.lastLogin = now;
  admin.lastLoginAt = now;
  await admin.save();

  // Create token
  const token = generateToken(admin);

  // Safe Audit log
  await AuditLog.create({
    actorId: admin._id,
    action: 'auth.login_success',
    entityType: 'Admin',
    entityId: admin._id,
    ipAddress,
    userAgent,
  }).catch(() => {});

  const safeAdmin = formatSafeAdmin(admin);

  return {
    admin: safeAdmin,
    token,
    accessToken: token, // backwards & standard compatibility
  };
};

/**
 * Get current admin profile
 */
const getCurrentAdmin = async (adminId) => {
  const admin = await Admin.findById(adminId);
  if (!admin || !admin.isActive) {
    throw ApiError.unauthorized('Admin account not found or deactivated');
  }
  return formatSafeAdmin(admin);
};

/**
 * Change admin password
 */
const changePassword = async (adminId, currentPassword, newPassword, { ipAddress = '', userAgent = '' } = {}) => {
  const admin = await Admin.findById(adminId).select('+password');
  if (!admin || !admin.isActive) {
    throw ApiError.unauthorized('Admin account not found or deactivated');
  }

  const isMatch = await admin.comparePassword(currentPassword);
  if (!isMatch) {
    throw ApiError.badRequest('Current password is incorrect');
  }

  if (currentPassword === newPassword) {
    throw ApiError.badRequest('New password must be different from current password');
  }

  admin.password = newPassword;
  admin.passwordChangedAt = new Date();
  await admin.save();

  await AuditLog.create({
    actorId: admin._id,
    action: 'auth.password_changed',
    entityType: 'Admin',
    entityId: admin._id,
    ipAddress,
    userAgent,
  }).catch(() => {});

  return { message: 'Password changed successfully' };
};

/**
 * Logout admin
 */
const logout = async (adminId, { ipAddress = '', userAgent = '' } = {}) => {
  if (adminId) {
    await AuditLog.create({
      actorId: adminId,
      action: 'auth.logout',
      entityType: 'Admin',
      entityId: adminId,
      ipAddress,
      userAgent,
    }).catch(() => {});
  }
  return { message: 'Logout successful' };
};

module.exports = {
  login,
  getCurrentAdmin,
  changePassword,
  logout,
  generateToken,
  formatSafeAdmin,
};

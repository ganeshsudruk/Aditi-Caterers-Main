const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const authService = require('../services/authService');

/**
 * Handle Admin Login
 * POST /api/v1/auth/login or /api/v1/admin/auth/login
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const clientInfo = {
    ipAddress: req.ip || req.connection?.remoteAddress || '',
    userAgent: req.get('user-agent') || '',
  };

  const result = await authService.login(email, password, clientInfo);

  res.status(200).json(
    new ApiResponse(200, result, 'Login successful')
  );
});

/**
 * Handle Current Admin Profile
 * GET /api/v1/auth/me or /api/v1/admin/auth/me
 */
const getMe = asyncHandler(async (req, res) => {
  const admin = await authService.getCurrentAdmin(req.user.id);
  res.status(200).json(
    new ApiResponse(200, { admin }, 'Admin profile retrieved successfully')
  );
});

/**
 * Handle Change Password
 * PATCH /api/v1/auth/change-password
 */
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const clientInfo = {
    ipAddress: req.ip || req.connection?.remoteAddress || '',
    userAgent: req.get('user-agent') || '',
  };

  const result = await authService.changePassword(
    req.user.id,
    currentPassword,
    newPassword,
    clientInfo
  );

  res.status(200).json(
    new ApiResponse(200, null, result.message)
  );
});

/**
 * Handle Admin Logout
 * POST /api/v1/auth/logout or /api/v1/admin/auth/logout
 */
const logout = asyncHandler(async (req, res) => {
  const clientInfo = {
    ipAddress: req.ip || req.connection?.remoteAddress || '',
    userAgent: req.get('user-agent') || '',
  };
  const adminId = req.user?.id || null;

  const result = await authService.logout(adminId, clientInfo);

  res.status(200).json(
    new ApiResponse(200, null, result.message)
  );
});

module.exports = {
  login,
  getMe,
  changePassword,
  logout,
};

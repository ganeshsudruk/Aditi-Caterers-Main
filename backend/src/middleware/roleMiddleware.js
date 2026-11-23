const ApiError = require('../utils/ApiError');

/**
 * Role & Permission-Based Authorization Middleware
 * Supports:
 * - allowedRoles: ['superadmin', 'owner', 'admin']
 * - options: { permissions: ['booking.update', 'quotation.issue'] }
 */
const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized('User not authenticated'));
    }

    const userRole = req.user.role;

    // Superadmin and owner have full administrative privileges
    if (userRole === 'superadmin' || userRole === 'owner') {
      return next();
    }

    // Role check
    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      return next(ApiError.forbidden('You do not have permission to perform this action'));
    }

    next();
  };
};

/**
 * Specific permission check middleware
 * @param  {...string} requiredPermissions
 */
const requirePermission = (...requiredPermissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized('User not authenticated'));
    }

    const userRole = req.user.role;
    if (userRole === 'superadmin' || userRole === 'owner') {
      return next();
    }

    const userPermissions = req.user.permissions || [];
    const hasPermission = requiredPermissions.every((perm) => userPermissions.includes(perm));

    if (!hasPermission) {
      return next(ApiError.forbidden('You lack the required permission for this operation'));
    }

    next();
  };
};

module.exports = roleMiddleware;
module.exports.roleMiddleware = roleMiddleware;
module.exports.requirePermission = requirePermission;

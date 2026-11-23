import api from './api';

const authService = {
  /**
   * Log in admin with email and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>}
   */
  async login(email, password) {
    const response = await api.post('/auth/login', {
      email: (email || '').trim().toLowerCase(),
      password,
    });
    return response.data;
  },

  /**
   * Retrieve current authenticated admin profile
   * @returns {Promise<Object>}
   */
  async getMe() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  /**
   * Change current admin password
   * @param {string} currentPassword
   * @param {string} newPassword
   * @returns {Promise<Object>}
   */
  async changePassword(currentPassword, newPassword) {
    const response = await api.patch('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  /**
   * Log out admin
   * @returns {Promise<Object>}
   */
  async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};

export default authService;

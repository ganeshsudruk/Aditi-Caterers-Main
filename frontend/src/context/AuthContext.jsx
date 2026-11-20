import { useState, useCallback, useMemo } from 'react';
import { AuthContext } from './authContextDef';
import api from '../services/api';

const STORAGE_KEY_TOKEN = 'aditi_admin_token';
const STORAGE_KEY_USER = 'aditi_admin_user';

// Default mock admin credentials for development / offline testing
const DEMO_ADMIN = {
  id: 'admin-01',
  name: 'Ganesh Sudruk',
  email: 'admin@aditicaterers.com',
  role: 'super_admin',
};
const DEMO_PASS = 'Admin@123456';

function getInitialSession() {
  try {
    const storedToken =
      localStorage.getItem(STORAGE_KEY_TOKEN) || sessionStorage.getItem(STORAGE_KEY_TOKEN);
    const storedUser =
      localStorage.getItem(STORAGE_KEY_USER) || sessionStorage.getItem(STORAGE_KEY_USER);

    if (storedToken && storedUser) {
      return { token: storedToken, admin: JSON.parse(storedUser) };
    }
  } catch {
    // Clear corrupted data
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_USER);
    sessionStorage.removeItem(STORAGE_KEY_TOKEN);
    sessionStorage.removeItem(STORAGE_KEY_USER);
  }
  return { token: null, admin: null };
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(getInitialSession);
  const [loading, setLoading] = useState(false);

  /**
   * Log in admin with email and password
   */
  const login = useCallback(async (email, password, rememberMe = false) => {
    const trimmedEmail = (email || '').trim().toLowerCase();
    const cleanPass = password || '';

    setLoading(true);
    try {
      // 1. Attempt backend API call if available
      try {
        const response = await api.post('/admin/auth/login', {
          email: trimmedEmail,
          password: cleanPass,
        });

        if (response?.data?.success && response.data.data) {
          const { admin: userData, token: authToken } = response.data.data;
          const storage = rememberMe ? localStorage : sessionStorage;

          storage.setItem(STORAGE_KEY_TOKEN, authToken);
          storage.setItem(STORAGE_KEY_USER, JSON.stringify(userData));

          setSession({ token: authToken, admin: userData });
          return { success: true, admin: userData };
        }
      } catch (apiError) {
        const status = apiError?.response?.status;
        if (status === 401 || status === 400) {
          throw new Error('Invalid login credentials. Please check your details and try again.', {
            cause: apiError,
          });
        }
      }

      // 2. Offline / Development fallback verification
      if (trimmedEmail === DEMO_ADMIN.email && cleanPass === DEMO_PASS) {
        const demoToken = `mock-jwt-token-${Date.now()}`;
        const storage = rememberMe ? localStorage : sessionStorage;

        storage.setItem(STORAGE_KEY_TOKEN, demoToken);
        storage.setItem(STORAGE_KEY_USER, JSON.stringify(DEMO_ADMIN));

        setSession({ token: demoToken, admin: DEMO_ADMIN });
        return { success: true, admin: DEMO_ADMIN };
      }

      // Generic error message - does not reveal if email or password was wrong
      throw new Error('Invalid login credentials. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Log out admin and clear session
   */
  const logout = useCallback(async () => {
    try {
      if (session.token) {
        await api.post('/admin/auth/logout').catch(() => {});
      }
    } finally {
      localStorage.removeItem(STORAGE_KEY_TOKEN);
      localStorage.removeItem(STORAGE_KEY_USER);
      sessionStorage.removeItem(STORAGE_KEY_TOKEN);
      sessionStorage.removeItem(STORAGE_KEY_USER);
      setSession({ token: null, admin: null });
    }
  }, [session.token]);

  const value = useMemo(
    () => ({
      admin: session.admin,
      token: session.token,
      isAuthenticated: !!session.token && !!session.admin,
      loading,
      login,
      logout,
    }),
    [session.admin, session.token, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

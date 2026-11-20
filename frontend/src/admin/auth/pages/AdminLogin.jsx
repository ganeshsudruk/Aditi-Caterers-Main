import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../../context/useAuth';
import { useAdminLanguage } from '../../../context/useAdminLanguage';
import '../../../styles/admin.css';

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const { at, adminLang, toggleAdminLang } = useAdminLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  // Preserve intended destination or default to /admin/dashboard
  const from = location.state?.from?.pathname || '/admin/dashboard';

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Set page title and noindex robots meta for admin login
  useEffect(() => {
    document.title = 'Admin Login | Aditi Caterers';

    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
    }
    const previousContent = robotsMeta.content;
    robotsMeta.content = 'noindex, nofollow';

    return () => {
      if (previousContent) {
        robotsMeta.content = previousContent;
      } else {
        robotsMeta.remove();
      }
    };
  }, []);

  const validate = () => {
    const errs = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      errs.email = at.login.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errs.email = at.login.emailInvalid;
    }

    if (!password) {
      errs.password = at.login.passwordRequired;
    }

    return errs;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.email;
        return next;
      });
    }
    if (authError) setAuthError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.password;
        return next;
      });
    }
    if (authError) setAuthError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (validationErrors.email && emailInputRef.current) {
        emailInputRef.current.focus();
      } else if (validationErrors.password && passwordInputRef.current) {
        passwordInputRef.current.focus();
      }
      return;
    }

    setLoading(true);
    try {
      await login(email, password, rememberMe);
      navigate(from, { replace: true });
    } catch (err) {
      setAuthError(err.message || at.login.errorInvalid);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ac-admin-login-wrapper">
      {/* Language Switcher on Login Page */}
      <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
        <button
          type="button"
          onClick={toggleAdminLang}
          className="btn btn-sm btn-outline-secondary"
          aria-label={adminLang === 'en' ? 'Switch to Marathi' : 'Switch to English'}
        >
          <i className="bi bi-translate me-1" aria-hidden="true"></i>
          {at.header.switchLang}
        </button>
      </div>

      <div className="ac-admin-login-card">
        {/* Brand Header */}
        <div className="ac-admin-login-brand">
          <div className="ac-admin-brand-icon" aria-hidden="true">
            <i className="bi bi-shield-lock-fill"></i>
          </div>
          <h1 className="ac-admin-login-title">{at.login.title}</h1>
          <p className="ac-admin-login-subtitle">{at.login.subtitle}</p>
        </div>

        {/* Generic Auth Error Alert */}
        {authError && (
          <div className="alert alert-danger d-flex align-items-center mb-3 py-2 px-3" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2 fs-5" aria-hidden="true"></i>
            <div className="small">{authError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email / Username Field */}
          <div className="mb-3">
            <label htmlFor="admin-email" className="form-label">
              {at.login.emailLabel} <span className="text-danger">*</span>
            </label>
            <input
              ref={emailInputRef}
              id="admin-email"
              name="email"
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder={at.login.emailPlaceholder}
              value={email}
              onChange={handleEmailChange}
              autoComplete="email"
              autoFocus
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'admin-email-error' : undefined}
            />
            {errors.email && (
              <div id="admin-email-error" className="invalid-feedback d-block">
                {errors.email}
              </div>
            )}
          </div>

          {/* Password Field with Show/Hide Toggle */}
          <div className="mb-3">
            <label htmlFor="admin-password" className="form-label">
              {at.login.passwordLabel} <span className="text-danger">*</span>
            </label>
            <div className="ac-admin-input-group">
              <input
                ref={passwordInputRef}
                id="admin-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder={at.login.passwordPlaceholder}
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password"
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'admin-password-error' : undefined}
              />
              <button
                type="button"
                className="ac-password-toggle-btn"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
              </button>
            </div>
            {errors.password && (
              <div id="admin-password-error" className="invalid-feedback d-block">
                {errors.password}
              </div>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="mb-4 form-check">
            <input
              id="admin-remember"
              type="checkbox"
              className="form-check-input"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="admin-remember" className="form-check-label small text-muted">
              {at.login.rememberMe}
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="ac-btn-admin-primary"
            aria-label="Sign In to Admin Dashboard"
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                {at.login.signingInBtn}
              </>
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right me-2" aria-hidden="true"></i>
                {at.login.signInBtn}
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Hint Box (for development & offline testing) */}
        <div className="ac-admin-hint-pill text-center">
          <div className="fw-semibold mb-1">
            <i className="bi bi-info-circle me-1" aria-hidden="true"></i>
            {at.login.demoTitle}
          </div>
          <div>{at.login.demoEmail} <code>admin@aditicaterers.com</code></div>
          <div>{at.login.demoPassword} <code>Admin@123456</code></div>
        </div>

        {/* Return to Public Website */}
        <div className="text-center mt-3">
          <Link to="/" className="text-decoration-none small text-muted">
            <i className="bi bi-arrow-left me-1" aria-hidden="true"></i>
            {at.login.backToWebsite}
          </Link>
        </div>
      </div>
    </div>
  );
}

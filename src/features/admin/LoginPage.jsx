import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Login Page Component
 *
 * PURPOSE: Authenticate users with backend API
 *
 * CHANGED: Now uses real backend authentication
 * OLD: Validated against hardcoded credentials in adminConfig
 * NEW: Calls backend API with email/password, receives JWT token
 *
 * FLOW:
 * 1. User enters email/password
 * 2. Submit calls backend API via AuthContext.login()
 * 3. Backend validates credentials
 * 4. Backend returns JWT token + user data
 * 5. Token stored in sessionStorage
 * 6. Redirect to dashboard
 */
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Call backend API via AuthContext
      // This will:
      // 1. POST to /v1/auth/login with email/password
      // 2. Receive JWT token from backend
      // 3. Store token in sessionStorage
      // 4. Update auth state
      const result = await login({
        username, // Actually email (field name kept for compatibility)
        password
      });

      if (result.success) {
        // Login successful - navigate to dashboard
        navigate('/admin/dashboard');
      } else {
        // Login failed - show error from backend
        setError(result.error || 'Invalid username or password');
      }
    } catch (err) {
      // Unexpected error
      setError('An error occurred during login');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001E3C] via-[#0A2540] to-[#001E3C] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">SWAN Shipping</h1>
          <p className="text-gray-400">Admin System Access</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white py-3 px-6 rounded-full font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Authorized access only</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

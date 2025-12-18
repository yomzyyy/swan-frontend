import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

const SESSION_STORAGE_KEY = 'swan_admin_auth';
const SESSION_DURATION = 3600000; // 1 hour in milliseconds

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const authData = sessionStorage.getItem(SESSION_STORAGE_KEY);

      if (authData) {
        const { user, expiresAt } = JSON.parse(authData);

        if (Date.now() < expiresAt) {
          setUser(user);
          setIsAuthenticated(true);
        } else {
          logout();
        }
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Login Function
   *
   * PURPOSE: Authenticate user with backend and store JWT token
   *
   * OLD BEHAVIOR (before):
   * - Accepted user data directly
   * - Stored in sessionStorage
   * - No backend call
   *
   * NEW BEHAVIOR (now):
   * - Calls backend API with email/password
   * - Backend verifies credentials
   * - Receives JWT token
   * - Stores token + user data in sessionStorage
   *
   * HOW IT WORKS:
   * 1. User enters email/password in login form
   * 2. Form calls: login({ username: email, password })
   * 3. This function calls: api.auth.login(email, password)
   * 4. Backend verifies and returns: { token, user }
   * 5. Store token + user in sessionStorage
   * 6. Update React state (user, isAuthenticated)
   * 7. Return success/error to form
   *
   * PARAMETERS:
   * @param {object} credentials - { username, password }
   *   - username: Actually the email (for backward compatibility)
   *   - password: User's password
   *
   * RETURNS:
   * @returns {Promise<object>} - { success: boolean, error?: string }
   *
   * USAGE IN LOGIN FORM:
   * const result = await login({ username: email, password });
   * if (result.success) {
   *   // Redirect to dashboard
   * } else {
   *   // Show error: result.error
   * }
   */
  const login = async (credentials) => {
    try {
      // Call backend API
      // credentials.username is actually email (for backward compatibility)
      const response = await api.auth.login(
        credentials.username,  // Email
        credentials.password   // Password
      );

      // Extract data from response
      // Backend returns: { data: { token, user } }
      const { token, user } = response.data.data;

      // Calculate session expiration (1 hour from now)
      const expiresAt = Date.now() + SESSION_DURATION;

      // Prepare auth data for storage
      const authData = {
        user: {
          username: user.email,                          // For compatibility
          name: `${user.firstName} ${user.lastName}`,    // Full name
          role: user.role                                // admin, editor, etc.
        },
        token,      // JWT token (for API authentication)
        expiresAt   // When session expires
      };

      // Store in sessionStorage
      // This will be read by:
      // - checkAuthStatus() on page reload
      // - api.js interceptor for JWT token
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(authData));

      // Update React state
      setUser(authData.user);
      setIsAuthenticated(true);

      // Return success
      return { success: true };

    } catch (error) {
      // Login failed - extract error message
      const errorMessage = error.message || 'Login failed. Please check your credentials.';

      // Return error for form to display
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

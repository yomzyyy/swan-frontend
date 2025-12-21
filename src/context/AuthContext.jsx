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

  const login = async (credentials) => {
    try {
      const response = await api.auth.login(
        credentials.username,  // Email
        credentials.password   // Password
      );

      const { token, user } = response.data.data;

      const expiresAt = Date.now() + SESSION_DURATION;

      const authData = {
        user: {
          username: user.email,                          // For compatibility
          name: `${user.firstName} ${user.lastName}`,    // Full name
          role: user.role                                // admin, editor, etc.
        },
        token,      // JWT token (for API authentication)
        expiresAt   // When session expires
      };

      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(authData));

      setUser(authData.user);
      setIsAuthenticated(true);

      return { success: true };

    } catch (error) {
      const errorMessage = error.message || 'Login failed. Please check your credentials.';

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

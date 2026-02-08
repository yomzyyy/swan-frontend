import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../services/api';
import type { AuthUser, LoginCredentials, ServiceResult } from '../types/api';

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<ServiceResult<void>>;
  logout: () => void;
}

interface StoredAuthData {
  user: AuthUser;
  token: string;
  expiresAt: number;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_STORAGE_KEY = 'swan_admin_auth';
const SESSION_DURATION = 3600000; // 1 hour in milliseconds

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const authData = sessionStorage.getItem(SESSION_STORAGE_KEY);

      if (authData) {
        const { user, expiresAt } = JSON.parse(authData) as StoredAuthData;

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

  const login = async (credentials: LoginCredentials): Promise<ServiceResult<void>> => {
    try {
      const response = await api.auth.login(
        credentials.username,  // Email
        credentials.password   // Password
      );

      const { token, user } = response.data.data;

      const expiresAt = Date.now() + SESSION_DURATION;

      const authData: StoredAuthData = {
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

      return { success: true, data: undefined };

    } catch (error) {
      const errorMessage = (error as Error).message || 'Login failed. Please check your credentials.';

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

  const value: AuthContextValue = {
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

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

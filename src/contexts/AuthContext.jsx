import { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService, register as registerService, clearAuthData } from '../services/authService';
import { setItem, getItem, removeItem } from '../services/storageService';
import { STORAGE_KEYS, ROUTES, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/constants';

// Create Auth Context
export const AuthContext = createContext(null);

/**
 * Authentication Context Provider
 * Manages global authentication state and operations
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  /**
   * Check for existing authentication on mount
   */
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Check if user is authenticated (from storage)
   */
  const checkAuth = useCallback(() => {
    try {
      setIsLoading(true);

      // Check localStorage first (remember me)
      let storedUser = getItem(STORAGE_KEYS.AUTH_USER, false);
      let storedToken = getItem(STORAGE_KEYS.AUTH_TOKEN, false);
      const storedRememberMe = getItem(STORAGE_KEYS.REMEMBER_ME, false);

      // If not in localStorage, check sessionStorage
      if (!storedUser || !storedToken) {
        storedUser = getItem(STORAGE_KEYS.AUTH_USER, true);
        storedToken = getItem(STORAGE_KEYS.AUTH_TOKEN, true);
      }

      if (storedUser && storedToken) {
        setUser(storedUser);
        setIsAuthenticated(true);
        setRememberMe(!!storedRememberMe);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setRememberMe(false);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {boolean} remember - Remember me flag
   * @param {string} redirectTo - Path to redirect after login
   */
  const login = useCallback(async (email, password, remember = false, redirectTo = ROUTES.DASHBOARD) => {
    try {
      setIsLoading(true);
      setError(null);

      const { user: loggedInUser, token } = await loginService(email, password);

      // Store auth data
      const useSession = !remember;
      setItem(STORAGE_KEYS.AUTH_USER, loggedInUser, useSession);
      setItem(STORAGE_KEYS.AUTH_TOKEN, token, useSession);

      if (remember) {
        setItem(STORAGE_KEYS.REMEMBER_ME, true, false);
      }

      // Update state
      setUser(loggedInUser);
      setIsAuthenticated(true);
      setRememberMe(remember);

      // Redirect to dashboard or specified path
      navigate(redirectTo);

      return { success: true, message: SUCCESS_MESSAGES.LOGIN_SUCCESS };
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.message || ERROR_MESSAGES.GENERIC_ERROR;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @param {string} redirectTo - Path to redirect after registration
   */
  const register = useCallback(async (userData, redirectTo = ROUTES.DASHBOARD) => {
    try {
      setIsLoading(true);
      setError(null);

      const { user: newUser, token } = await registerService(userData);

      // Auto-login after registration (with remember me)
      setItem(STORAGE_KEYS.AUTH_USER, newUser, false);
      setItem(STORAGE_KEYS.AUTH_TOKEN, token, false);
      setItem(STORAGE_KEYS.REMEMBER_ME, true, false);

      // Update state
      setUser(newUser);
      setIsAuthenticated(true);
      setRememberMe(true);

      // Redirect to dashboard or specified path
      navigate(redirectTo);

      return { success: true, message: SUCCESS_MESSAGES.REGISTER_SUCCESS };
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.message || ERROR_MESSAGES.GENERIC_ERROR;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  /**
   * Logout user
   */
  const logout = useCallback(() => {
    try {
      // Clear auth data from storage
      clearAuthData();

      // Reset state
      setUser(null);
      setIsAuthenticated(false);
      setRememberMe(false);
      setError(null);

      // Redirect to login
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [navigate]);

  /**
   * Update user profile in context and storage
   * @param {Object} updates - Updated user fields
   */
  const updateUser = useCallback((updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);

    // Update storage
    const useSession = !rememberMe;
    setItem(STORAGE_KEYS.AUTH_USER, updatedUser, useSession);
  }, [user, rememberMe]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Context value
  const value = {
    user,
    isAuthenticated,
    isLoading,
    rememberMe,
    error,
    login,
    register,
    logout,
    checkAuth,
    updateUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

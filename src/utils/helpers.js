import { SALT_KEY } from './constants';

/**
 * Generate a UUID v4
 * @returns {string} UUID
 */
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Generate a mock authentication token
 * @returns {string} Token
 */
export const generateToken = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return btoa(`${timestamp}-${random}`);
};

/**
 * Generate a session ID
 * @returns {string} Session ID
 */
export const generateSessionId = () => {
  return `session-${generateUUID()}`;
};

/**
 * Hash password using simple obfuscation (mock only, not cryptographically secure)
 * @param {string} password - Plain text password
 * @returns {string} Hashed password
 */
export const hashPassword = (password) => {
  return btoa(`${password}${SALT_KEY}`);
};

/**
 * Verify password against stored hash
 * @param {string} inputPassword - Plain text password from user
 * @param {string} storedHash - Stored hashed password
 * @returns {boolean} True if passwords match
 */
export const verifyPassword = (inputPassword, storedHash) => {
  return hashPassword(inputPassword) === storedHash;
};

/**
 * Format date to locale string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-PT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format date to short string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date (DD/MM/YYYY)
 */
export const formatDateShort = (date) => {
  return new Date(date).toLocaleDateString('pt-PT');
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Check if token is expired
 * @param {string} token - Token to check
 * @param {number} expirationMs - Expiration time in milliseconds
 * @returns {boolean} True if expired
 */
export const isTokenExpired = (token, expirationMs) => {
  try {
    const decoded = atob(token);
    const timestamp = parseInt(decoded.split('-')[0]);
    return Date.now() - timestamp > expirationMs;
  } catch {
    return true;
  }
};

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - User input
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;

  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials (max 2 letters)
 */
export const getInitials = (name) => {
  if (!name) return '';

  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Debounce function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Deep clone an object
 * @param {any} obj - Object to clone
 * @returns {any} Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

import { STORAGE_KEYS, ERROR_MESSAGES } from '../utils/constants';
import { generateUUID, generateToken, hashPassword, verifyPassword } from '../utils/helpers';
import { getItem, setItem } from './storageService';

/**
 * Mock Authentication Service
 * Simulates backend authentication using LocalStorage
 */

/**
 * Get all users from mock database
 * @returns {Array} Array of user objects
 */
const getAllUsers = () => {
  const users = getItem(STORAGE_KEYS.USERS_DB);
  return users || [];
};

/**
 * Save users to mock database
 * @param {Array} users - Array of user objects
 */
const saveUsers = (users) => {
  setItem(STORAGE_KEYS.USERS_DB, users, false);
};

/**
 * Find user by email
 * @param {string} email - User email
 * @returns {Object|null} User object or null
 */
const findUserByEmail = (email) => {
  const users = getAllUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null;
};

/**
 * Create new user account
 * @param {Object} userData - User data (name, email, password)
 * @returns {Object} Created user object (without password)
 * @throws {Error} If email already exists
 */
export const createUser = (userData) => {
  const { name, email, password } = userData;

  // Check if user already exists
  const existingUser = findUserByEmail(email);
  if (existingUser) {
    throw new Error(ERROR_MESSAGES.USER_EXISTS);
  }

  // Create new user
  const newUser = {
    id: generateUUID(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashPassword(password),
    createdAt: new Date().toISOString(),
  };

  // Save to mock database
  const users = getAllUsers();
  users.push(newUser);
  saveUsers(users);

  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

/**
 * Validate user credentials
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} User object (without password) if valid
 * @throws {Error} If credentials are invalid
 */
export const validateCredentials = (email, password) => {
  const user = findUserByEmail(email);

  if (!user) {
    throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }

  // Verify password
  const isValid = verifyPassword(password, user.password);
  if (!isValid) {
    throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

/**
 * Generate authentication token for user
 * @param {Object} user - User object
 * @returns {string} Authentication token
 */
export const generateAuthToken = (user) => {
  return generateToken();
};

/**
 * Login user - validates credentials and returns user data + token
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} { user, token }
 * @throws {Error} If credentials are invalid
 */
export const login = async (email, password) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = validateCredentials(email, password);
  const token = generateAuthToken(user);

  return { user, token };
};

/**
 * Register new user - creates account and returns user data + token
 * @param {Object} userData - User registration data
 * @returns {Object} { user, token }
 * @throws {Error} If email already exists
 */
export const register = async (userData) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = createUser(userData);
  const token = generateAuthToken(user);

  return { user, token };
};

/**
 * Check if user email exists
 * @param {string} email - Email to check
 * @returns {boolean} True if email exists
 */
export const emailExists = (email) => {
  return findUserByEmail(email) !== null;
};

/**
 * Get current authenticated user from storage
 * @returns {Object|null} User object or null
 */
export const getCurrentUser = () => {
  // Check localStorage first (remember me)
  let user = getItem(STORAGE_KEYS.AUTH_USER, false);
  if (user) return user;

  // Check sessionStorage
  user = getItem(STORAGE_KEYS.AUTH_USER, true);
  return user;
};

/**
 * Get current auth token from storage
 * @returns {string|null} Token or null
 */
export const getCurrentToken = () => {
  // Check localStorage first
  let token = getItem(STORAGE_KEYS.AUTH_TOKEN, false);
  if (token) return token;

  // Check sessionStorage
  token = getItem(STORAGE_KEYS.AUTH_TOKEN, true);
  return token;
};

/**
 * Validate current session
 * @returns {boolean} True if session is valid
 */
export const validateSession = () => {
  const user = getCurrentUser();
  const token = getCurrentToken();

  return !!(user && token);
};

/**
 * Clear authentication data from storage
 */
export const clearAuthData = () => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
  sessionStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  sessionStorage.removeItem(STORAGE_KEYS.SESSION_ID);
};

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} updates - Fields to update
 * @returns {Object} Updated user object
 * @throws {Error} If user not found
 */
export const updateUserProfile = (userId, updates) => {
  const users = getAllUsers();
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
  }

  // Update user (don't allow password or email update through this method)
  const { password, email, ...allowedUpdates } = updates;
  users[userIndex] = {
    ...users[userIndex],
    ...allowedUpdates,
    updatedAt: new Date().toISOString(),
  };

  saveUsers(users);

  // Return updated user without password
  const { password: _, ...userWithoutPassword } = users[userIndex];
  return userWithoutPassword;
};

/**
 * Delete user account
 * @param {string} userId - User ID
 * @throws {Error} If user not found
 */
export const deleteUser = (userId) => {
  const users = getAllUsers();
  const filteredUsers = users.filter((u) => u.id !== userId);

  if (users.length === filteredUsers.length) {
    throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
  }

  saveUsers(filteredUsers);
};

// Development helper to seed initial users (optional)
export const seedUsers = () => {
  const existingUsers = getAllUsers();
  if (existingUsers.length > 0) return; // Don't seed if users exist

  const demoUsers = [
    {
      name: 'Admin User',
      email: 'admin@gystreet.com',
      password: 'Admin123',
    },
    {
      name: 'Test User',
      email: 'test@gystreet.com',
      password: 'Test123',
    },
  ];

  demoUsers.forEach((userData) => {
    try {
      createUser(userData);
    } catch (error) {
      // Ignore if user already exists
    }
  });
};

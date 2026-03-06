// Storage keys for LocalStorage and SessionStorage
export const STORAGE_KEYS = {
  AUTH_USER: 'gystreet_auth_user',
  AUTH_TOKEN: 'gystreet_auth_token',
  REMEMBER_ME: 'gystreet_remember_me',
  USERS_DB: 'gystreet_users_db',
  SESSION_ID: 'gystreet_session_id',
  PRODUCERS_DB: 'gystreet_producers_db',
  PRODUCTS_DB: 'gystreet_products_db',
};

// Route paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  PRODUCERS: '/producers',
  PROFILE: '/profile',
  STORE: '/store',
  NOT_FOUND: '/404',
};

// Error messages
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Email ou palavra-passe incorretos',
  USER_EXISTS: 'Este email já está registado',
  USER_NOT_FOUND: 'Utilizador não encontrado',
  WEAK_PASSWORD: 'Palavra-passe muito fraca',
  NETWORK_ERROR: 'Erro de conexão. Tente novamente.',
  GENERIC_ERROR: 'Ocorreu um erro. Tente novamente.',
  REQUIRED_FIELD: 'Este campo é obrigatório',
  INVALID_EMAIL: 'Email inválido',
  PASSWORD_MISMATCH: 'As palavras-passe não coincidem',
  MIN_PASSWORD_LENGTH: 'Palavra-passe deve ter pelo menos 6 caracteres',
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login realizado com sucesso!',
  REGISTER_SUCCESS: 'Conta criada com sucesso!',
  LOGOUT_SUCCESS: 'Sessão terminada com sucesso!',
};

// Password validation regex
export const PASSWORD_REGEX = {
  MIN_LENGTH: 6,
  STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
};

// Salt for password hashing (mock only)
export const SALT_KEY = 'GYSTREET_SALT_2024';

// Token expiration time (in milliseconds)
export const TOKEN_EXPIRATION = 7 * 24 * 60 * 60 * 1000; // 7 days

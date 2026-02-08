export const ENV = {
  API_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/v1',
  API_TIMEOUT: import.meta.env.VITE_API_TIMEOUT || 10000,
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
  CONTACT_EMAIL: import.meta.env.VITE_CONTACT_EMAIL || 'info@swan-manila.com',
};

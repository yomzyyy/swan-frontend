interface EnvConfig {
  API_URL: string;
  API_TIMEOUT: number;
  APP_ENV: string;
  CONTACT_EMAIL: string;
}

export const ENV: EnvConfig = {
  API_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/v1',
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
  CONTACT_EMAIL: import.meta.env.VITE_CONTACT_EMAIL || 'info@swan-manila.com',
};

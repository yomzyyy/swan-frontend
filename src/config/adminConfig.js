/**
 * Admin Configuration
 *
 * PURPOSE: Configuration values for admin panel
 *
 * AUTHENTICATION:
 * - No longer uses hardcoded credentials
 * - All authentication is handled by backend API
 * - Users are stored in MongoDB database
 * - JWT tokens are used for session management
 */

export const ADMIN_CONFIG = {
  SESSION_DURATION: 3600000, // 1 hour in milliseconds
  LOGIN_URL: '/system-access',
  DASHBOARD_URL: '/admin/dashboard'
};

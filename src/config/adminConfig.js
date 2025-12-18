export const ADMIN_CREDENTIALS = [
  { username: 'admin1', password: 'SwanShip2025!', role: 'super_admin', name: 'Admin User 1' },
  { username: 'admin2', password: 'SwanShip2025!', role: 'editor', name: 'Admin User 2' },
  { username: 'admin3', password: 'SwanShip2025!', role: 'editor', name: 'Admin User 3' }
];

export const ADMIN_CONFIG = {
  SESSION_DURATION: 3600000, // 1 hour in milliseconds
  LOGIN_URL: '/system-access',
  DASHBOARD_URL: '/admin/dashboard'
};

export const validateCredentials = (username, password) => {
  const admin = ADMIN_CREDENTIALS.find(
    (cred) => cred.username === username && cred.password === password
  );

  if (admin) {
    const { password: _, ...userWithoutPassword } = admin;
    return { valid: true, user: userWithoutPassword };
  }

  return { valid: false, user: null };
};

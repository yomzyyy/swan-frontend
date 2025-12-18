import axios from 'axios';

/**
 * API Service - Frontend HTTP Client
 *
 * PURPOSE: Centralized place for ALL backend API calls
 *
 * WHY DO WE NEED THIS?
 * - Single place to configure API URL
 * - Automatic JWT token attachment
 * - Automatic error handling
 * - Auto-logout on authentication errors
 * - Clean, organized API methods
 *
 * HOW IT WORKS:
 * 1. Create axios instance with base URL
 * 2. Add interceptors (middleware for requests/responses)
 * 3. Define API methods for each endpoint
 * 4. Components import and use these methods
 *
 * EXAMPLE USAGE IN COMPONENTS:
 * import { api } from '../services/api';
 *
 * // Login:
 * const response = await api.auth.login('email@example.com', 'password');
 *
 * // Get news:
 * const articles = await api.news.getAll();
 *
 * // Create article:
 * await api.news.create({ title: "...", content: "..." });
 */

// ==========================================
// CONFIGURATION
// ==========================================

/**
 * API Base URL
 *
 * WHAT IS THIS?
 * The base URL of your backend server
 *
 * DEVELOPMENT: http://localhost:3001/v1
 * PRODUCTION: https://api.swanshipping.com/v1
 *
 * HOW IT WORKS:
 * - Reads from environment variable (VITE_API_BASE_URL)
 * - Falls back to localhost if not set
 * - All API calls automatically prepend this URL
 *
 * EXAMPLE:
 * Base URL: http://localhost:3001/v1
 * API call: api.news.getAll()
 * Actual URL: http://localhost:3001/v1/api/news
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/v1';

/**
 * Create Axios Instance
 *
 * WHAT IS AXIOS?
 * A library for making HTTP requests (like fetch but better)
 *
 * WHY USE AXIOS?
 * - Automatic JSON parsing
 * - Interceptors (middleware)
 * - Better error handling
 * - Request/response transformation
 * - Timeout support
 *
 * CONFIGURATION:
 * - baseURL: Prepended to all requests
 * - headers: Default headers for all requests
 * - timeout: Max time to wait for response (10 seconds)
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 seconds
});

// ==========================================
// REQUEST INTERCEPTOR
// ==========================================

/**
 * Request Interceptor
 *
 * PURPOSE: Automatically add JWT token to every request
 *
 * WHY?
 * Protected endpoints need JWT token in Authorization header
 * Without this, you'd have to manually add token to every API call
 *
 * HOW IT WORKS:
 * 1. Check if user is logged in (token in sessionStorage)
 * 2. If logged in, add "Authorization: Bearer <token>" header
 * 3. If not logged in, send request without token (for public endpoints)
 *
 * EXAMPLE:
 * // You write:
 * api.news.create({ title: "Article" })
 *
 * // This interceptor automatically adds:
 * headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIs..." }
 *
 * // Backend receives request with token and verifies it
 */
apiClient.interceptors.request.use(
  (config) => {
    // Get authentication data from sessionStorage
    const authData = sessionStorage.getItem('swan_admin_auth');

    if (authData) {
      try {
        // Parse JSON and extract token
        const { token } = JSON.parse(authData);

        if (token) {
          // Add Authorization header
          // Format: "Bearer <token>"
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        // If parsing fails, just continue without token
        console.error('Failed to parse auth data:', error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==========================================
// RESPONSE INTERCEPTOR
// ==========================================

/**
 * Response Interceptor
 *
 * PURPOSE: Handle errors globally, especially authentication errors
 *
 * WHY?
 * - Auto-logout when token expires (401 errors)
 * - Consistent error handling across app
 * - Better error messages for users
 *
 * HOW IT WORKS:
 * 1. If response is successful (200-299) → pass through
 * 2. If response is 401 (Unauthorized):
 *    - Clear session storage (logout)
 *    - Redirect to login page
 * 3. If other error → extract message and reject
 *
 * EXAMPLE SCENARIOS:
 * - Token expires after 24 hours → Auto-logout and redirect to login
 * - Invalid token → Auto-logout and redirect to login
 * - Server error (500) → Show error message
 * - Validation error (400) → Show validation message
 */
apiClient.interceptors.response.use(
  (response) => {
    // Success response (200-299)
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized (token expired or invalid)
    if (error.response?.status === 401) {
      // Clear session storage (logout)
      sessionStorage.removeItem('swan_admin_auth');

      // Redirect to login page
      window.location.href = '/system-access';
    }

    // Extract error message from response
    // Backend sends: { error: "...", message: "User-friendly message" }
    const message = error.response?.data?.message ||
                   error.message ||
                   'An error occurred';

    // Reject with error (component can catch it)
    return Promise.reject(new Error(message));
  }
);

// ==========================================
// API METHODS
// ==========================================

/**
 * API Object
 *
 * PURPOSE: Organized collection of all API methods
 *
 * STRUCTURE:
 * api.resource.method()
 *
 * EXAMPLE:
 * api.auth.login(email, password)
 * api.news.getAll()
 * api.news.create(data)
 *
 * WHY ORGANIZE THIS WAY?
 * - Easy to find methods: "Where's the create news method?" → api.news.create
 * - Grouped by resource (auth, news, fleet, etc.)
 * - IntelliSense/autocomplete works great
 */
export const api = {
  // ==========================================
  // AUTHENTICATION ENDPOINTS
  // ==========================================
  auth: {
    /**
     * Login
     *
     * PURPOSE: Authenticate user and get JWT token
     *
     * ENDPOINT: POST /v1/auth/login
     * REQUEST: { email: string, password: string }
     * RESPONSE: { data: { token: string, user: object } }
     *
     * USAGE:
     * const response = await api.auth.login('admin@swanshipping.com', 'password');
     * const { token, user } = response.data.data;
     */
    login: (email, password) =>
      apiClient.post('/auth/login', { email, password })
  },

  // ==========================================
  // NEWS ENDPOINTS
  // ==========================================
  news: {
    /**
     * Get All Articles
     *
     * ENDPOINT: GET /v1/api/news
     * RESPONSE: { data: [{ id, title, content, ... }] }
     * PUBLIC: Anyone can call (no token needed)
     */
    getAll: () => apiClient.get('/api/news'),

    /**
     * Get Article by ID
     *
     * ENDPOINT: GET /v1/api/news/:id
     * RESPONSE: { data: { id, title, content, ... } }
     */
    getById: (id) => apiClient.get(`/api/news/${id}`),

    /**
     * Get Article by Slug
     *
     * ENDPOINT: GET /v1/api/news/slug/:slug
     * RESPONSE: { data: { id, title, content, ... } }
     * USE CASE: For article page URLs (/news/article-title)
     */
    getBySlug: (slug) => apiClient.get(`/api/news/slug/${slug}`),

    /**
     * Create Article
     *
     * ENDPOINT: POST /v1/api/news
     * REQUEST: { title, slug, excerpt, content, category, ... }
     * RESPONSE: { data: { id, title, ... } }
     * PROTECTED: Requires authentication (token in header)
     */
    create: (data) => apiClient.post('/api/news', data),

    /**
     * Update Article
     *
     * ENDPOINT: PUT /v1/api/news/:id
     * REQUEST: { title?, content?, ... } (partial updates allowed)
     * RESPONSE: { data: { id, title, ... } }
     * PROTECTED: Requires authentication
     */
    update: (id, data) => apiClient.put(`/api/news/${id}`, data),

    /**
     * Delete Article
     *
     * ENDPOINT: DELETE /v1/api/news/:id
     * RESPONSE: { data: { id, ... } }
     * PROTECTED: Requires authentication
     * NOTE: This is a soft delete (article marked as deleted, not removed)
     */
    delete: (id) => apiClient.delete(`/api/news/${id}`)
  },

  // ==========================================
  // FLEET ENDPOINTS
  // (To be implemented later - same pattern as news)
  // ==========================================
  fleet: {
    getAll: () => apiClient.get('/api/fleet'),
    getById: (id) => apiClient.get(`/api/fleet/${id}`),
    create: (data) => apiClient.post('/api/fleet', data),
    update: (id, data) => apiClient.put(`/api/fleet/${id}`, data),
    delete: (id) => apiClient.delete(`/api/fleet/${id}`)
  },

  // ==========================================
  // CAREERS ENDPOINTS
  // (To be implemented later)
  // ==========================================
  careers: {
    getAll: () => apiClient.get('/api/careers'),
    getById: (id) => apiClient.get(`/api/careers/${id}`),
    create: (data) => apiClient.post('/api/careers', data),
    update: (id, data) => apiClient.put(`/api/careers/${id}`, data),
    delete: (id) => apiClient.delete(`/api/careers/${id}`)
  },

  // ==========================================
  // CONTENT ENDPOINTS
  // (For About, Services, Home pages)
  // ==========================================
  content: {
    get: (pageId) => apiClient.get(`/api/content/${pageId}`),
    update: (pageId, data) => apiClient.put(`/api/content/${pageId}`, data)
  },

  // ==========================================
  // CONTACT FORM ENDPOINTS
  // (For form submissions)
  // ==========================================
  contact: {
    /**
     * Submit General Contact Form
     */
    submitGeneral: (data) =>
      apiClient.post('/api/contact/general', data),

    /**
     * Submit Job Application with Resume
     *
     * NOTE: Uses FormData for file upload
     * HEADERS: Content-Type automatically set to multipart/form-data
     */
    submitJobApplication: (formData) =>
      apiClient.post('/api/contact/job-application', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }),

    /**
     * Submit Quote Request
     */
    submitQuoteRequest: (data) =>
      apiClient.post('/api/contact/quote-request', data)
  }
};

/**
 * SUMMARY
 *
 * This api.js file provides:
 * ✅ Centralized API configuration
 * ✅ Automatic JWT token handling
 * ✅ Auto-logout on token expiration
 * ✅ Organized API methods
 * ✅ Consistent error handling
 *
 * HOW TO USE IN COMPONENTS:
 * import { api } from '../services/api';
 *
 * // Login:
 * const { data } = await api.auth.login(email, password);
 *
 * // Get news:
 * const { data } = await api.news.getAll();
 * const articles = data.data; // Backend sends { data: [...] }
 *
 * // Create article:
 * await api.news.create({ title: "...", content: "..." });
 *
 * // Handle errors:
 * try {
 *   await api.news.create(data);
 * } catch (error) {
 *   console.error(error.message); // User-friendly error message
 * }
 */

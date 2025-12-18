import { api } from '../../../services/api';

/**
 * News Admin Service
 *
 * PURPOSE: Frontend service for news management
 * CHANGED: Now uses backend API instead of localStorage
 *
 * KEY CHANGES:
 * - All functions are now async (return Promises)
 * - Data comes from MongoDB via REST API
 * - No more localStorage - data persists in database
 * - Backend handles slug uniqueness validation
 * - Backend handles timestamps (createdAt, updatedAt)
 */

/**
 * Generate Slug Helper
 *
 * PURPOSE: Convert title to URL-friendly slug
 * EXAMPLE: "My Article Title" → "my-article-title"
 *
 * NOTE: Backend also validates slug format
 */
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Get All Articles
 *
 * OLD BEHAVIOR: Return from localStorage
 * NEW BEHAVIOR: Fetch from backend API
 *
 * API CALL: GET /v1/api/news
 * RETURNS: Array of published articles
 *
 * USAGE:
 * const articles = await getAllArticles();
 */
export const getAllArticles = async () => {
  try {
    const response = await api.news.getAll();
    return response.data.data; // Extract from { data: [...] }
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw error;
  }
};

/**
 * Get Article By ID
 *
 * OLD BEHAVIOR: Find in localStorage array
 * NEW BEHAVIOR: Fetch specific article from backend
 *
 * API CALL: GET /v1/api/news/:id
 * RETURNS: Single article object
 *
 * @param {string} id - Article ID (MongoDB ObjectId)
 *
 * USAGE:
 * const article = await getArticleById('507f1f77bcf86cd799439011');
 */
export const getArticleById = async (id) => {
  try {
    const response = await api.news.getById(id);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    throw error;
  }
};

/**
 * Get Article By Slug
 *
 * OLD BEHAVIOR: Find in localStorage array
 * NEW BEHAVIOR: Fetch from backend by slug
 *
 * API CALL: GET /v1/api/news/slug/:slug
 * RETURNS: Single article object
 *
 * @param {string} slug - Article slug (e.g., "my-article-title")
 *
 * USAGE:
 * const article = await getArticleBySlug('swan-shipping-expands-fleet');
 */
export const getArticleBySlug = async (slug) => {
  try {
    const response = await api.news.getBySlug(slug);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    throw error;
  }
};

/**
 * Create Article
 *
 * OLD BEHAVIOR:
 * - Generate ID locally
 * - Check slug uniqueness in localStorage
 * - Save to localStorage
 *
 * NEW BEHAVIOR:
 * - Backend generates MongoDB ID
 * - Backend validates slug uniqueness
 * - Backend saves to database
 * - Backend sets timestamps
 *
 * API CALL: POST /v1/api/news
 * REQUIRES: Authentication (JWT token)
 *
 * @param {object} articleData - Article data
 * @param {string} articleData.title - Article title (required)
 * @param {string} articleData.excerpt - Short summary (required)
 * @param {string} articleData.content - Full content (required)
 * @param {string} articleData.category - Category (required)
 * @param {string} articleData.slug - URL slug (optional, auto-generated from title)
 * @param {string} articleData.image - Image URL (optional)
 * @param {string[]} articleData.hashtags - Array of hashtags (optional)
 * @param {string} articleData.status - "draft" or "published" (default: "published")
 *
 * @returns {Promise<object>} - { success: boolean, data?: object, error?: string }
 *
 * USAGE:
 * const result = await createArticle({
 *   title: "New Article",
 *   excerpt: "Summary...",
 *   content: "Full content...",
 *   category: "Company News"
 * });
 *
 * if (result.success) {
 *   console.log('Created:', result.data);
 * } else {
 *   console.error('Error:', result.error);
 * }
 */
export const createArticle = async (articleData) => {
  try {
    // Generate slug if not provided
    const slug = articleData.slug || generateSlug(articleData.title);

    // Call backend API
    // Backend will:
    // - Validate all required fields
    // - Check slug uniqueness
    // - Generate MongoDB ID
    // - Set timestamps
    // - Save to database
    const response = await api.news.create({
      ...articleData,
      slug
    });

    // Return success with created article
    return { success: true, data: response.data.data };

  } catch (error) {
    // Return error for form to display
    return {
      success: false,
      error: error.message || 'Failed to create article'
    };
  }
};

/**
 * Update Article
 *
 * OLD BEHAVIOR:
 * - Find article in localStorage
 * - Check slug uniqueness
 * - Update fields
 * - Save to localStorage
 *
 * NEW BEHAVIOR:
 * - Backend finds article in database
 * - Backend validates slug uniqueness
 * - Backend updates only provided fields
 * - Backend updates timestamp
 *
 * API CALL: PUT /v1/api/news/:id
 * REQUIRES: Authentication (JWT token)
 *
 * @param {string} id - Article ID (MongoDB ObjectId)
 * @param {object} articleData - Fields to update (all optional)
 *
 * @returns {Promise<object>} - { success: boolean, data?: object, error?: string }
 *
 * USAGE:
 * // Partial update - only change title
 * const result = await updateArticle('507f1f77bcf86cd799439011', {
 *   title: "Updated Title"
 * });
 */
export const updateArticle = async (id, articleData) => {
  try {
    // Call backend API
    // Backend will:
    // - Validate article exists
    // - Check slug uniqueness (if slug is changing)
    // - Update only provided fields
    // - Update timestamp
    const response = await api.news.update(id, articleData);

    // Return success with updated article
    return { success: true, data: response.data.data };

  } catch (error) {
    // Return error for form to display
    return {
      success: false,
      error: error.message || 'Failed to update article'
    };
  }
};

/**
 * Delete Article
 *
 * OLD BEHAVIOR:
 * - Remove from localStorage array
 *
 * NEW BEHAVIOR:
 * - Backend performs soft delete
 * - Article marked as deleted (deletedAt timestamp)
 * - Article hidden from public listings
 * - Data preserved in database
 *
 * API CALL: DELETE /v1/api/news/:id
 * REQUIRES: Authentication (JWT token)
 *
 * @param {string} id - Article ID (MongoDB ObjectId)
 *
 * @returns {Promise<object>} - { success: boolean, error?: string }
 *
 * USAGE:
 * const result = await deleteArticle('507f1f77bcf86cd799439011');
 * if (result.success) {
 *   console.log('Article deleted');
 * }
 */
export const deleteArticle = async (id) => {
  try {
    // Call backend API
    // Backend will:
    // - Find article
    // - Set deletedAt timestamp
    // - Save to database
    await api.news.delete(id);

    // Return success
    return { success: true };

  } catch (error) {
    // Return error
    return {
      success: false,
      error: error.message || 'Failed to delete article'
    };
  }
};

/**
 * Initialize News Data
 *
 * OLD BEHAVIOR:
 * - Populate localStorage with default articles on first load
 *
 * NEW BEHAVIOR:
 * - No longer needed - backend handles data
 * - Data persists in MongoDB database
 * - Kept for backward compatibility (returns empty array)
 *
 * @deprecated Backend now manages all data
 * @returns {Array} Empty array
 */
export const initializeNewsData = () => {
  // No longer needed - backend handles data persistence
  // Return empty array for backward compatibility
  return [];
};

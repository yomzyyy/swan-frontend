import { api } from '../../../services/api';

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

export const getAllArticles = async () => {
  try {
    const response = await api.news.getAllAdmin();
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw error;
  }
};

export const getArticleById = async (id) => {
  try {
    const response = await api.news.getById(id);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    throw error;
  }
};

export const getArticleBySlug = async (slug) => {
  try {
    const response = await api.news.getBySlug(slug);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    throw error;
  }
};

export const createArticle = async (articleData) => {
  try {
    const slug = articleData.slug || generateSlug(articleData.title);

    const response = await api.news.create({
      ...articleData,
      slug
    });

    return { success: true, data: response.data.data };

  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to create article'
    };
  }
};

export const updateArticle = async (id, articleData) => {
  try {
    const response = await api.news.update(id, articleData);

    return { success: true, data: response.data.data };

  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to update article'
    };
  }
};

export const deleteArticle = async (id) => {
  try {
    await api.news.delete(id);

    return { success: true };

  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to delete article'
    };
  }
};

export const initializeNewsData = () => {
  return [];
};

export const uploadNewsImage = async (imageFile, altText = '') => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('altText', altText);

    const response = await api.news.uploadImage(formData);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to upload image'
    };
  }
};

export const validateImageFile = (file) => {
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }

  // Validate type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload JPEG, PNG, or WebP images.'
    };
  }

  // Validate size (5MB max)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large. Maximum size is ${formatFileSize(maxSize)}.`
    };
  }

  return { valid: true };
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

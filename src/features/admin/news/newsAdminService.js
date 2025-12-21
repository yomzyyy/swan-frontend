import { api } from '../../../services/api';

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

export const getAllArticles = async () => {
  try {
    const response = await api.news.getAll();
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

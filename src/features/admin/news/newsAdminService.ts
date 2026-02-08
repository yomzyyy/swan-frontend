import { api } from '../../../services/api';
import type { News } from '../../../types/models';
import type { ServiceResult, RemoveResult } from '../../../types/api';

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

export const getAllArticles = async (): Promise<News[]> => {
  try {
    const response = await api.news.getAllAdmin();
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw error;
  }
};

export const getArticleById = async (id: string): Promise<News> => {
  try {
    const response = await api.news.getById(id);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    throw error;
  }
};

export const getArticleBySlug = async (slug: string): Promise<News> => {
  try {
    const response = await api.news.getBySlug(slug);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    throw error;
  }
};

export const createArticle = async (articleData: Partial<News> & { title: string }): Promise<ServiceResult<News>> => {
  try {
    const slug = (articleData as { slug?: string }).slug || generateSlug(articleData.title);

    const response = await api.news.create({
      ...articleData,
      slug
    });

    return { success: true, data: response.data.data };

  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'Failed to create article'
    };
  }
};

export const updateArticle = async (id: string, articleData: Partial<News>): Promise<ServiceResult<News>> => {
  try {
    const response = await api.news.update(id, articleData);

    return { success: true, data: response.data.data };

  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'Failed to update article'
    };
  }
};

export const deleteArticle = async (id: string): Promise<RemoveResult> => {
  try {
    await api.news.delete(id);

    return { success: true };

  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'Failed to delete article'
    };
  }
};

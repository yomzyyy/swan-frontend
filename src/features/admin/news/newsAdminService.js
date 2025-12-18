import { getStorageData, setStorageData, updateStorageItem, deleteStorageItem, generateId } from '../../../utils/localStorage';

const STORAGE_KEY = 'swan_admin_news';

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

export const getAllArticles = () => {
  return getStorageData(STORAGE_KEY) || [];
};

export const getArticleById = (id) => {
  const articles = getAllArticles();
  return articles.find(article => article.id === parseInt(id));
};

export const getArticleBySlug = (slug) => {
  const articles = getAllArticles();
  return articles.find(article => article.slug === slug);
};

export const createArticle = (articleData) => {
  const articles = getAllArticles();
  const newId = generateId(articles);

  const slug = articleData.slug || generateSlug(articleData.title);

  if (getArticleBySlug(slug)) {
    return { success: false, error: 'An article with this slug already exists' };
  }

  const newArticle = {
    ...articleData,
    id: newId,
    slug,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  articles.push(newArticle);
  setStorageData(STORAGE_KEY, articles);

  return { success: true, data: newArticle };
};

export const updateArticle = (id, articleData) => {
  const articles = getAllArticles();
  const existingArticle = getArticleById(id);

  if (!existingArticle) {
    return { success: false, error: 'Article not found' };
  }

  const slug = articleData.slug || existingArticle.slug;

  const duplicateSlug = articles.find(
    article => article.slug === slug && article.id !== parseInt(id)
  );

  if (duplicateSlug) {
    return { success: false, error: 'An article with this slug already exists' };
  }

  const updatedArticle = {
    ...existingArticle,
    ...articleData,
    slug,
    id: parseInt(id),
    createdAt: existingArticle.createdAt,
    updatedAt: new Date().toISOString(),
  };

  const updatedArticles = articles.map(article =>
    article.id === parseInt(id) ? updatedArticle : article
  );

  setStorageData(STORAGE_KEY, updatedArticles);

  return { success: true, data: updatedArticle };
};

export const deleteArticle = (id) => {
  return deleteStorageItem(STORAGE_KEY, parseInt(id));
};

export const initializeNewsData = (defaultArticles) => {
  const existing = getAllArticles();
  if (existing.length === 0 && defaultArticles && defaultArticles.length > 0) {
    const articlesWithIds = defaultArticles.map((article, index) => ({
      ...article,
      id: index + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    setStorageData(STORAGE_KEY, articlesWithIds);
    return articlesWithIds;
  }
  return existing;
};

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

apiClient.interceptors.request.use(
  (config) => {
    const authData = sessionStorage.getItem('swan_admin_auth');

    if (authData) {
      try {
        const { token } = JSON.parse(authData);

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Failed to parse auth data:', error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('swan_admin_auth');

      window.location.href = '/system-access';
    }

    const message = error.response?.data?.message ||
                   error.message ||
                   'An error occurred';

    return Promise.reject(new Error(message));
  }
);

export const api = {
  auth: {
    login: (email, password) =>
      apiClient.post('/auth/login', { email, password })
  },

  news: {
    getAll: () => apiClient.get('/api/news'),

    getAllAdmin: () => apiClient.get('/api/news/admin/all'),

    getById: (id) => apiClient.get(`/api/news/${id}`),

    getBySlug: (slug) => apiClient.get(`/api/news/slug/${slug}`),

    create: (data) => apiClient.post('/api/news', data),

    update: (id, data) => apiClient.put(`/api/news/${id}`, data),

    delete: (id) => apiClient.delete(`/api/news/${id}`),

    uploadImage: (formData) =>
      apiClient.post('/api/news/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
  },

  fleet: {
    getAll: () => apiClient.get('/api/fleet'),
    getById: (id) => apiClient.get(`/api/fleet/${id}`),
    create: (data) => apiClient.post('/api/fleet', data),
    update: (id, data) => apiClient.put(`/api/fleet/${id}`, data),
    delete: (id) => apiClient.delete(`/api/fleet/${id}`)
  },

  careers: {
    getAll: () => apiClient.get('/api/careers'),
    getById: (id) => apiClient.get(`/api/careers/${id}`),
    create: (data) => apiClient.post('/api/careers', data),
    update: (id, data) => apiClient.put(`/api/careers/${id}`, data),
    delete: (id) => apiClient.delete(`/api/careers/${id}`)
  },

  content: {
    get: (pageId) => apiClient.get(`/api/content/${pageId}`),
    update: (pageId, data) => apiClient.put(`/api/content/${pageId}`, data),
    uploadImage: (formData) =>
      apiClient.post('/api/content/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
  },

  contact: {
    submitGeneral: (data) =>
      apiClient.post('/api/contact/general', data),

    submitJobApplication: (formData) =>
      apiClient.post('/api/contact/job-application', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }),

    submitQuoteRequest: (data) =>
      apiClient.post('/api/contact/quote-request', data)
  },

  hero: {
    getAll: () => apiClient.get('/api/hero/images'),

    getByPosition: (position) =>
      apiClient.get(`/api/hero/images/position/${position}`),

    upload: (formData) =>
      apiClient.post('/api/hero/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }),

    updateAltText: (position, altText) =>
      apiClient.put(`/api/hero/images/position/${position}/alttext`, {
        altText
      }),

    delete: (position) =>
      apiClient.delete(`/api/hero/images/position/${position}`)
  }
};

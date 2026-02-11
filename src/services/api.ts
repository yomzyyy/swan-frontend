import axios, { type AxiosResponse } from 'axios';
import { ENV } from '../config/env';
import type { ApiResponse, LoginResponse } from '../types/api';
import type { News, Fleet, Career, HeroImage, PageContent } from '../types/models';

const apiClient = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: ENV.API_TIMEOUT
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
    login: (email: string, password: string): Promise<AxiosResponse<ApiResponse<LoginResponse>>> =>
      apiClient.post('/auth/login', { email, password })
  },

  news: {
    getAll: (): Promise<AxiosResponse<ApiResponse<News[]>>> =>
      apiClient.get('/api/news'),

    getAllAdmin: (): Promise<AxiosResponse<ApiResponse<News[]>>> =>
      apiClient.get('/api/news/admin/all'),

    getById: (id: string): Promise<AxiosResponse<ApiResponse<News>>> =>
      apiClient.get(`/api/news/${id}`),

    getBySlug: (slug: string): Promise<AxiosResponse<ApiResponse<News>>> =>
      apiClient.get(`/api/news/slug/${slug}`),

    create: (data: Partial<News>): Promise<AxiosResponse<ApiResponse<News>>> =>
      apiClient.post('/api/news', data),

    update: (id: string, data: Partial<News>): Promise<AxiosResponse<ApiResponse<News>>> =>
      apiClient.put(`/api/news/${id}`, data),

    delete: (id: string): Promise<AxiosResponse<void>> =>
      apiClient.delete(`/api/news/${id}`),

    uploadImage: (formData: FormData): Promise<AxiosResponse<ApiResponse<{ imageUrl: string }>>> =>
      apiClient.post('/api/news/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
  },

  fleet: {
    getAll: (): Promise<AxiosResponse<ApiResponse<Fleet[]>>> =>
      apiClient.get('/api/fleet'),
    getById: (id: string): Promise<AxiosResponse<ApiResponse<Fleet>>> =>
      apiClient.get(`/api/fleet/${id}`),
    create: (data: Partial<Fleet>): Promise<AxiosResponse<ApiResponse<Fleet>>> =>
      apiClient.post('/api/fleet', data),
    update: (id: string, data: Partial<Fleet>): Promise<AxiosResponse<ApiResponse<Fleet>>> =>
      apiClient.put(`/api/fleet/${id}`, data),
    delete: (id: string): Promise<AxiosResponse<void>> =>
      apiClient.delete(`/api/fleet/${id}`),
    uploadImage: (formData: FormData): Promise<AxiosResponse<ApiResponse<{ imageUrl: string }>>> =>
      apiClient.post('/api/fleet/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
  },

  careers: {
    getAll: (): Promise<AxiosResponse<ApiResponse<Career[]>>> =>
      apiClient.get('/api/careers'),
    getById: (id: string): Promise<AxiosResponse<ApiResponse<Career>>> =>
      apiClient.get(`/api/careers/${id}`),
    create: (data: Partial<Career>): Promise<AxiosResponse<ApiResponse<Career>>> =>
      apiClient.post('/api/careers', data),
    update: (id: string, data: Partial<Career>): Promise<AxiosResponse<ApiResponse<Career>>> =>
      apiClient.put(`/api/careers/${id}`, data),
    delete: (id: string): Promise<AxiosResponse<void>> =>
      apiClient.delete(`/api/careers/${id}`)
  },

  content: {
    get: (pageId: string): Promise<AxiosResponse<ApiResponse<PageContent>>> =>
      apiClient.get(`/api/content/${pageId}`),
    update: (pageId: string, data: Record<string, unknown>): Promise<AxiosResponse<ApiResponse<PageContent>>> =>
      apiClient.put(`/api/content/${pageId}`, data),
    uploadImage: (formData: FormData): Promise<AxiosResponse<ApiResponse<{ imageUrl: string }>>> =>
      apiClient.post('/api/content/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
  },

  contact: {
    submitGeneral: (data: Record<string, unknown>): Promise<AxiosResponse<ApiResponse<unknown>>> =>
      apiClient.post('/api/contact/general', data),

    submitJobApplication: (formData: FormData): Promise<AxiosResponse<ApiResponse<unknown>>> =>
      apiClient.post('/api/contact/job-application', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }),

    submitQuoteRequest: (data: Record<string, unknown>): Promise<AxiosResponse<ApiResponse<unknown>>> =>
      apiClient.post('/api/contact/quote-request', data)
  },

  hero: {
    getAll: (): Promise<AxiosResponse<ApiResponse<HeroImage[]>>> =>
      apiClient.get('/api/hero/images'),

    getByPosition: (position: number): Promise<AxiosResponse<ApiResponse<HeroImage>>> =>
      apiClient.get(`/api/hero/images/position/${position}`),

    upload: (formData: FormData): Promise<AxiosResponse<ApiResponse<HeroImage>>> =>
      apiClient.post('/api/hero/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }),

    updateAltText: (position: number, altText: string): Promise<AxiosResponse<ApiResponse<HeroImage>>> =>
      apiClient.put(`/api/hero/images/position/${position}/alttext`, {
        altText
      }),

    delete: (position: number): Promise<AxiosResponse<ApiResponse<HeroImage>>> =>
      apiClient.delete(`/api/hero/images/position/${position}`)
  }
};

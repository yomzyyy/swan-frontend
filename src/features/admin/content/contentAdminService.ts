import { api } from '../../../services/api';
import type { PageContent } from '../../../types/models';
import type { ServiceResult } from '../../../types/api';

export const getAboutContent = async (): Promise<PageContent | null> => {
  try {
    const response = await api.content.get('about');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch about content:', error);
    return null;
  }
};

export const saveAboutContent = async (content: Record<string, unknown>): Promise<ServiceResult<PageContent>> => {
  try {
    const response = await api.content.update('about', content);
    return { success: true, data: response.data.data };
  } catch (error) {
    console.error('Failed to save about content:', error);
    return {
      success: false,
      error: (error as Error).message || 'Failed to save content'
    };
  }
};

export const clearAboutContent = async (): Promise<ServiceResult<PageContent>> => {
  try {
    const response = await api.content.update('about', {
      hero: null,
      intro: null,
      whyChooseUs: null,
      lgpPillars: null,
      missionVision: null,
      managementTeam: null,
      clients: null,
      contentTabs: null
    });
    return { success: true, data: response.data.data };
  } catch (error) {
    console.error('Failed to clear about content:', error);
    return {
      success: false,
      error: (error as Error).message || 'Failed to clear content'
    };
  }
};

export const getServicesContent = async (): Promise<PageContent | null> => {
  try {
    const response = await api.content.get('services');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch services content:', error);
    return null;
  }
};

export const saveServicesContent = async (content: Record<string, unknown>): Promise<ServiceResult<PageContent>> => {
  try {
    const response = await api.content.update('services', content);

    // Sync service items to homepage if services section was edited
    if ((content as { services?: { items?: unknown[] } }).services?.items) {
      try {
        await api.content.update('home', { services: { items: (content as { services: { items: unknown[] } }).services.items } });
      } catch {
        console.warn('Failed to sync service items to homepage');
      }
    }

    return { success: true, data: response.data.data };
  } catch (error) {
    console.error('Failed to save services content:', error);
    return {
      success: false,
      error: (error as Error).message || 'Failed to save content'
    };
  }
};

export const clearServicesContent = async (): Promise<ServiceResult<PageContent>> => {
  try {
    const response = await api.content.update('services', {});
    return { success: true, data: response.data.data };
  } catch (error) {
    console.error('Failed to clear services content:', error);
    return {
      success: false,
      error: (error as Error).message || 'Failed to clear content'
    };
  }
};

export const getHomeContent = async (): Promise<PageContent | null> => {
  try {
    const response = await api.content.get('home');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch home content:', error);
    return null;
  }
};

export const saveHomeContent = async (content: Record<string, unknown>): Promise<ServiceResult<PageContent>> => {
  try {
    const response = await api.content.update('home', content);

    // Sync service items to services page if services section was edited
    if ((content as { services?: { items?: unknown[] } }).services?.items) {
      try {
        await api.content.update('services', { services: { items: (content as { services: { items: unknown[] } }).services.items } });
      } catch {
        console.warn('Failed to sync service items to services page');
      }
    }

    return { success: true, data: response.data.data };
  } catch (error) {
    console.error('Failed to save home content:', error);
    return {
      success: false,
      error: (error as Error).message || 'Failed to save content'
    };
  }
};

export const clearHomeContent = async (): Promise<ServiceResult<PageContent>> => {
  try {
    const response = await api.content.update('home', {});
    return { success: true, data: response.data.data };
  } catch (error) {
    console.error('Failed to clear home content:', error);
    return {
      success: false,
      error: (error as Error).message || 'Failed to clear content'
    };
  }
};

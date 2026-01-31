import { api } from '../../../services/api';

export const getAboutContent = async () => {
  try {
    const response = await api.content.get('about');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch about content:', error);
    return null;
  }
};

export const saveAboutContent = async (content) => {
  try {
    const response = await api.content.update('about', content);
    return { success: true, data: response.data.data };
  } catch (error) {
    console.error('Failed to save about content:', error);
    return {
      success: false,
      error: error.message || 'Failed to save content'
    };
  }
};

export const clearAboutContent = async () => {
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
      error: error.message || 'Failed to clear content'
    };
  }
};

export const getServicesContent = async () => {
  try {
    const response = await api.content.get('services');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch services content:', error);
    return null;
  }
};

export const saveServicesContent = async (content) => {
  try {
    const response = await api.content.update('services', content);

    // Sync service items to homepage if services section was edited
    if (content.services?.items) {
      try {
        await api.content.update('home', { services: { items: content.services.items } });
      } catch {
        console.warn('Failed to sync service items to homepage');
      }
    }

    return { success: true, data: response.data.data };
  } catch (error) {
    console.error('Failed to save services content:', error);
    return {
      success: false,
      error: error.message || 'Failed to save content'
    };
  }
};

export const clearServicesContent = async () => {
  try {
    const response = await api.content.update('services', {});
    return { success: true, data: response.data.data };
  } catch (error) {
    console.error('Failed to clear services content:', error);
    return {
      success: false,
      error: error.message || 'Failed to clear content'
    };
  }
};

export const getHomeContent = async () => {
  try {
    const response = await api.content.get('home');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch home content:', error);
    return null;
  }
};

export const saveHomeContent = async (content) => {
  try {
    const response = await api.content.update('home', content);

    // Sync service items to services page if services section was edited
    if (content.services?.items) {
      try {
        await api.content.update('services', { services: { items: content.services.items } });
      } catch {
        console.warn('Failed to sync service items to services page');
      }
    }

    return { success: true, data: response.data.data };
  } catch (error) {
    console.error('Failed to save home content:', error);
    return {
      success: false,
      error: error.message || 'Failed to save content'
    };
  }
};

export const clearHomeContent = async () => {
  try {
    const response = await api.content.update('home', {});
    return { success: true, data: response.data.data };
  } catch (error) {
    console.error('Failed to clear home content:', error);
    return {
      success: false,
      error: error.message || 'Failed to clear content'
    };
  }
};

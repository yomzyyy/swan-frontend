import { getStorageData, setStorageData } from '../../../utils/localStorage';

const ABOUT_STORAGE_KEY = 'swan_admin_content_about';
const SERVICES_STORAGE_KEY = 'swan_admin_content_services';
const HOME_STORAGE_KEY = 'swan_admin_content_home';

export const getAboutContent = () => {
  return getStorageData(ABOUT_STORAGE_KEY);
};

export const saveAboutContent = (content) => {
  const success = setStorageData(ABOUT_STORAGE_KEY, {
    ...content,
    updatedAt: new Date().toISOString(),
  });
  return { success, data: content };
};

export const getServicesContent = () => {
  return getStorageData(SERVICES_STORAGE_KEY);
};

export const saveServicesContent = (content) => {
  const success = setStorageData(SERVICES_STORAGE_KEY, {
    ...content,
    updatedAt: new Date().toISOString(),
  });
  return { success, data: content };
};

export const getHomeContent = () => {
  return getStorageData(HOME_STORAGE_KEY);
};

export const saveHomeContent = (content) => {
  const success = setStorageData(HOME_STORAGE_KEY, {
    ...content,
    updatedAt: new Date().toISOString(),
  });
  return { success, data: content };
};

export const clearAboutContent = () => {
  localStorage.removeItem(ABOUT_STORAGE_KEY);
  return { success: true };
};

export const clearServicesContent = () => {
  localStorage.removeItem(SERVICES_STORAGE_KEY);
  return { success: true };
};

export const clearHomeContent = () => {
  localStorage.removeItem(HOME_STORAGE_KEY);
  return { success: true };
};

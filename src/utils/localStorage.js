export const getStorageData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error reading from localStorage (key: ${key}):`, error);
    return null;
  }
};

export const setStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage (key: ${key}):`, error);
    return false;
  }
};

export const updateStorageItem = (key, id, updatedItem) => {
  try {
    const data = getStorageData(key) || [];
    const index = data.findIndex(item => item.id === id);

    if (index !== -1) {
      data[index] = { ...data[index], ...updatedItem, updatedAt: new Date().toISOString() };
      setStorageData(key, data);
      return { success: true, data: data[index] };
    }

    return { success: false, error: 'Item not found' };
  } catch (error) {
    console.error(`Error updating item in localStorage (key: ${key}, id: ${id}):`, error);
    return { success: false, error: error.message };
  }
};

export const deleteStorageItem = (key, id) => {
  try {
    const data = getStorageData(key) || [];
    const filteredData = data.filter(item => item.id !== id);

    if (filteredData.length < data.length) {
      setStorageData(key, filteredData);
      return { success: true };
    }

    return { success: false, error: 'Item not found' };
  } catch (error) {
    console.error(`Error deleting item from localStorage (key: ${key}, id: ${id}):`, error);
    return { success: false, error: error.message };
  }
};

export const clearStorageData = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error clearing localStorage (key: ${key}):`, error);
    return false;
  }
};

export const generateId = (existingData = []) => {
  if (existingData.length === 0) return 1;
  const maxId = Math.max(...existingData.map(item => item.id || 0));
  return maxId + 1;
};

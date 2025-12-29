import { api } from '../../../services/api';

export const getAllCareers = async () => {
  try {
    const response = await api.careers.getAll();
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch careers:', error);
    throw error;
  }
};

export const getCareerById = async (id) => {
  try {
    const response = await api.careers.getById(id);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch career:', error);
    throw error;
  }
};

export const createCareer = async (careerData) => {
  try {
    const response = await api.careers.create(careerData);
    return { success: true, data: response.data.data };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to create career'
    };
  }
};

export const updateCareer = async (id, careerData) => {
  try {
    const response = await api.careers.update(id, careerData);
    return { success: true, data: response.data.data };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to update career'
    };
  }
};

export const deleteCareer = async (id) => {
  try {
    await api.careers.delete(id);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to delete career'
    };
  }
};

import { api } from '../../../services/api';

export const getAllVessels = async () => {
  try {
    const response = await api.fleet.getAll();
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch vessels:', error);
    throw error;
  }
};

export const getVesselById = async (id) => {
  try {
    const response = await api.fleet.getById(id);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch vessel:', error);
    throw error;
  }
};

export const createVessel = async (vesselData) => {
  try {
    const response = await api.fleet.create(vesselData);
    return { success: true, data: response.data.data };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to create vessel'
    };
  }
};

export const updateVessel = async (id, vesselData) => {
  try {
    const response = await api.fleet.update(id, vesselData);
    return { success: true, data: response.data.data };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to update vessel'
    };
  }
};

export const deleteVessel = async (id) => {
  try {
    await api.fleet.delete(id);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to delete vessel'
    };
  }
};

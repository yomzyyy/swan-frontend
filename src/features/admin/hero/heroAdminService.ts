import { api } from '../../../services/api';

export const getAllHeroImages = async () => {
  try {
    const response = await api.hero.getAll();
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch hero images:', error);
    throw error;
  }
};

export const uploadHeroImage = async (position, imageFile, altText) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('position', position.toString());
    formData.append('altText', altText);

    const response = await api.hero.upload(formData);

    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('Failed to upload hero image:', error);
    return {
      success: false,
      error: error.message || 'Failed to upload image. Please try again.'
    };
  }
};

export const updateHeroAltText = async (position, altText) => {
  try {
    const response = await api.hero.updateAltText(position, altText);

    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('Failed to update alt text:', error);
    return {
      success: false,
      error: error.message || 'Failed to update alt text. Please try again.'
    };
  }
};

export const deleteHeroImage = async (position) => {
  try {
    const response = await api.hero.delete(position);

    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('Failed to delete hero image:', error);
    return {
      success: false,
      error: error.message || 'Failed to delete image. Please try again.'
    };
  }
};

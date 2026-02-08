import { api } from '../../../services/api';
import type { HeroImage } from '../../../types/models';
import type { ServiceResult } from '../../../types/api';

export const getAllHeroImages = async (): Promise<HeroImage[]> => {
  try {
    const response = await api.hero.getAll();
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch hero images:', error);
    throw error;
  }
};

export const uploadHeroImage = async (position: number, imageFile: File, altText: string): Promise<ServiceResult<HeroImage>> => {
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
      error: (error as Error).message || 'Failed to upload image. Please try again.'
    };
  }
};

export const updateHeroAltText = async (position: number, altText: string): Promise<ServiceResult<HeroImage>> => {
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
      error: (error as Error).message || 'Failed to update alt text. Please try again.'
    };
  }
};

export const deleteHeroImage = async (position: number): Promise<ServiceResult<HeroImage>> => {
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
      error: (error as Error).message || 'Failed to delete image. Please try again.'
    };
  }
};

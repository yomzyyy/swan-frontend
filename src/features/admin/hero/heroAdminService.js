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

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const size = (bytes / Math.pow(k, i)).toFixed(2);

  const formattedSize = size.endsWith('.00')
    ? size.slice(0, -3)
    : size;

  return `${formattedSize} ${sizes[i]}`;
};

export const validateImageFile = (file) => {
  if (!file) {
    return { valid: false, error: 'Please select a file' };
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload a JPEG, PNG, or WebP image.'
    };
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large. Maximum size is 5MB. Your file is ${formatFileSize(file.size)}.`
    };
  }

  return { valid: true };
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

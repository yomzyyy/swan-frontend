import { api } from './api';
import type { ValidationResult, ImageUploadResult } from '../types/api';

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const size = (bytes / Math.pow(k, i)).toFixed(2);
  const formattedSize = size.endsWith('.00') ? size.slice(0, -3) : size;

  return `${formattedSize} ${sizes[i]}`;
};

export const validateImageFile = (file: File | null): ValidationResult => {
  if (!file) {
    return { valid: false, error: 'Please select a file' };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload a JPEG, PNG, or WebP image.'
    };
  }

  if (file.size > MAX_SIZE) {
    return {
      valid: false,
      error: `File too large. Maximum size is 5MB. Your file is ${formatFileSize(file.size)}.`
    };
  }

  return { valid: true };
};

export const uploadContentImage = async (file: File): Promise<ImageUploadResult> => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.content.uploadImage(formData);

    return {
      success: true,
      imageUrl: response.data.data.imageUrl
    };
  } catch (error) {
    console.error('Failed to upload content image:', error);
    return {
      success: false,
      error: (error as Error).message || 'Failed to upload image. Please try again.'
    };
  }
};

export const uploadNewsImage = async (imageFile: File, altText = ''): Promise<ImageUploadResult> => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('altText', altText);

    const response = await api.news.uploadImage(formData);
    return {
      success: true,
      data: response.data.data as Record<string, unknown>
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'Failed to upload image'
    };
  }
};

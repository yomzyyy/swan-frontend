import type { ValidationResult } from '../types/api';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface JobFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  coverLetter: string;
  resume: File | null;
}

export interface QuoteFormData {
  company: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  details: string;
}

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const trimmed = phone.trim();
  return trimmed.length > 0 && trimmed.length <= 25 && /^[0-9+\-\s()]+$/.test(trimmed);
};

export const validateFile = (file: File | null, maxSize = 5 * 1024 * 1024): ValidationResult => {
  if (!file) {
    return { valid: false, error: 'Please select a file' };
  }

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only PDF and DOC files are allowed' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 5MB' };
  }

  return { valid: true };
};

export const validateContactForm = (formData: ContactFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Full name is required';
  }

  if (!formData.email || formData.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (formData.phone && formData.phone.trim() !== '' && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!formData.subject || formData.subject.trim() === '') {
    errors.subject = 'Subject is required';
  }

  if (!formData.message || formData.message.trim() === '') {
    errors.message = 'Message is required';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
};

export const validateJobForm = (formData: JobFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Full name is required';
  }

  if (!formData.email || formData.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.phone || formData.phone.trim() === '') {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!formData.position || formData.position.trim() === '') {
    errors.position = 'Please enter a position';
  }

  if (!formData.coverLetter || formData.coverLetter.trim() === '') {
    errors.coverLetter = 'Cover letter is required';
  }

  if (!formData.resume) {
    errors.resume = 'Resume is required';
  } else {
    const fileValidation = validateFile(formData.resume);
    if (!fileValidation.valid) {
      errors.resume = fileValidation.error!;
    }
  }

  return errors;
};

export const validateQuoteForm = (formData: QuoteFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.company || formData.company.trim() === '') {
    errors.company = 'Company name is required';
  }

  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Contact person name is required';
  }

  if (!formData.email || formData.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.phone || formData.phone.trim() === '') {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!formData.service || formData.service.trim() === '') {
    errors.service = 'Please select a service';
  }

  if (!formData.details || formData.details.trim() === '') {
    errors.details = 'Project details are required';
  }

  return errors;
};

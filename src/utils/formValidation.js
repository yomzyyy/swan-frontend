export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone) => {
  const regex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return regex.test(phone);
};

export const validateFile = (file, maxSize = 5 * 1024 * 1024) => {
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

export const validateContactForm = (formData) => {
  const errors = {};

  if (!formData.fullName || formData.fullName.trim() === '') {
    errors.fullName = 'Full name is required';
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

export const validateJobForm = (formData) => {
  const errors = {};

  if (!formData.fullName || formData.fullName.trim() === '') {
    errors.fullName = 'Full name is required';
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

  if (!formData.position || formData.position === '') {
    errors.position = 'Please select a position';
  }

  if (!formData.experience || formData.experience === '') {
    errors.experience = 'Years of experience is required';
  } else if (parseInt(formData.experience) < 0) {
    errors.experience = 'Experience cannot be negative';
  }

  if (!formData.resume) {
    errors.resume = 'Resume is required';
  } else {
    const fileValidation = validateFile(formData.resume);
    if (!fileValidation.valid) {
      errors.resume = fileValidation.error;
    }
  }

  return errors;
};

export const validateQuoteForm = (formData) => {
  const errors = {};

  if (!formData.companyName || formData.companyName.trim() === '') {
    errors.companyName = 'Company name is required';
  }

  if (!formData.contactPerson || formData.contactPerson.trim() === '') {
    errors.contactPerson = 'Contact person name is required';
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

  if (!formData.serviceType || formData.serviceType === '') {
    errors.serviceType = 'Please select a service type';
  }

  if (!formData.cargoType || formData.cargoType.trim() === '') {
    errors.cargoType = 'Cargo type is required';
  }

  if (formData.cargoVolume && parseFloat(formData.cargoVolume) <= 0) {
    errors.cargoVolume = 'Cargo volume must be a positive number';
  }

  if (!formData.originPort || formData.originPort.trim() === '') {
    errors.originPort = 'Origin port is required';
  }

  if (!formData.destinationPort || formData.destinationPort.trim() === '') {
    errors.destinationPort = 'Destination port is required';
  }

  if (formData.shippingDate) {
    const selectedDate = new Date(formData.shippingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.shippingDate = 'Shipping date cannot be in the past';
    }
  }

  return errors;
};

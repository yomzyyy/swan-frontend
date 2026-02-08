import type { ChangeEvent } from 'react';
import { FormInput, FormTextarea } from '../../../components/forms';

interface GeneralContactFormProps {
  formData: Record<string, string>;
  errors: Record<string, string>;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const GeneralContactForm = ({ formData, errors, onChange }: GeneralContactFormProps) => (
  <>
    <FormInput
      label="Full Name"
      name="name"
      value={formData.name || ''}
      onChange={onChange}
      error={errors.name}
      required
    />
    <FormInput
      label="Email Address"
      name="email"
      type="email"
      value={formData.email || ''}
      onChange={onChange}
      error={errors.email}
      required
    />
    <FormInput
      label="Phone Number"
      name="phone"
      type="tel"
      value={formData.phone || ''}
      onChange={onChange}
      error={errors.phone}
    />
    <FormInput
      label="Subject"
      name="subject"
      value={formData.subject || ''}
      onChange={onChange}
      error={errors.subject}
      required
    />
    <FormTextarea
      label="Message"
      name="message"
      value={formData.message || ''}
      onChange={onChange}
      error={errors.message}
      rows={6}
      required
    />
  </>
);

export default GeneralContactForm;

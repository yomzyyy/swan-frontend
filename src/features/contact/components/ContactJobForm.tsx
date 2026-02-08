import type { ChangeEvent } from 'react';
import { FormInput, FormTextarea, FormFileUpload } from '../../../components/forms';
import type { FileChangeEvent } from '../../../components/forms/FormFileUpload';

interface ContactJobFormProps {
  formData: Record<string, string>;
  errors: Record<string, string>;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | FileChangeEvent) => void;
}

const ContactJobForm = ({ formData, errors, onChange }: ContactJobFormProps) => (
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
      required
    />
    <FormInput
      label="Position Applied For"
      name="position"
      type="text"
      value={formData.position || ''}
      onChange={onChange}
      error={errors.position}
      placeholder="e.g., Marine Engineer, Fleet Manager, Deck Officer"
      required
    />
    <FormTextarea
      label="Cover Letter"
      name="coverLetter"
      value={formData.coverLetter || ''}
      onChange={onChange}
      error={errors.coverLetter}
      rows={6}
      required
    />
    <FormFileUpload
      label="Upload Resume (PDF or DOC)"
      name="resume"
      accept=".pdf,.doc,.docx"
      onChange={onChange}
      error={errors.resume}
      required
    />
  </>
);

export default ContactJobForm;

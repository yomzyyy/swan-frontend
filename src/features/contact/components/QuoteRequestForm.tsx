import type { ChangeEvent } from 'react';
import { FormInput, FormTextarea, FormSelect } from '../../../components/forms';

const SERVICE_OPTIONS = [
  'Vessel Chartering',
  'Terminal Operations',
  'Fleet Management',
  'Technical Management',
  'Newbuilding Supervision',
  'Other Services',
].map(s => ({ value: s, label: s }));

interface QuoteRequestFormProps {
  formData: Record<string, string>;
  errors: Record<string, string>;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const QuoteRequestForm = ({ formData, errors, onChange }: QuoteRequestFormProps) => (
  <>
    <FormInput
      label="Company Name"
      name="company"
      value={formData.company || ''}
      onChange={onChange}
      error={errors.company}
      required
    />
    <FormInput
      label="Contact Person"
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
    <FormSelect
      label="Service Required"
      name="service"
      value={formData.service || ''}
      onChange={onChange}
      error={errors.service}
      options={SERVICE_OPTIONS}
      required
    />
    <FormTextarea
      label="Project Details"
      name="details"
      value={formData.details || ''}
      onChange={onChange}
      error={errors.details}
      rows={6}
      required
    />
  </>
);

export default QuoteRequestForm;

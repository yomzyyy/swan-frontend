import { FormInput, FormTextarea } from '../../../components/forms';

const GeneralContactForm = ({ formData, errors, onChange }) => (
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

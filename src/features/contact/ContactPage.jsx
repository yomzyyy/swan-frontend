import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import FormInput from '../../components/forms/FormInput';
import FormTextarea from '../../components/forms/FormTextarea';
import FormSelect from '../../components/forms/FormSelect';
import FormFileUpload from '../../components/forms/FormFileUpload';
import {
  validateContactForm,
  validateJobForm,
  validateQuoteForm
} from '../../utils/formValidation';

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab') || 'contact';
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['contact', 'jobs', 'quote'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (activeTab === 'contact') {
      validationErrors = validateContactForm(formData);
    } else if (activeTab === 'jobs') {
      validationErrors = validateJobForm(formData);
    } else if (activeTab === 'quote') {
      validationErrors = validateQuoteForm(formData);
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      console.log('Form submitted:', { ...formData, formType: activeTab });
      setSubmitSuccess(true);
      setFormData({});
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to send. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    'Vessel Chartering',
    'Terminal Operations',
    'Fleet Management',
    'Technical Management',
    'Newbuilding Supervision',
    'Other Services',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#001E3C] to-[#003C78] text-white py-24 pt-32">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-6xl font-extrabold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl opacity-95 max-w-3xl leading-relaxed">
            Have questions about our services? Looking to join our team?
            We're here to help.
          </p>
        </div>
      </div>

      <div className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl p-12">
                <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 pb-6">
                  <button
                    onClick={() => setActiveTab('contact')}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      activeTab === 'contact'
                        ? 'bg-[#207dff] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    General Contact
                  </button>
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      activeTab === 'jobs'
                        ? 'bg-[#207dff] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Job Application
                  </button>
                  <button
                    onClick={() => setActiveTab('quote')}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      activeTab === 'quote'
                        ? 'bg-[#207dff] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Request Quote
                  </button>
                </div>

                {submitSuccess && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-2xl mb-6">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}

                {errors.submit && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-2xl mb-6">
                    {errors.submit}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {activeTab === 'contact' && (
                    <>
                      <FormInput
                        label="Full Name"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        error={errors.name}
                        required
                      />
                      <FormInput
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        error={errors.email}
                        required
                      />
                      <FormInput
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        error={errors.phone}
                      />
                      <FormInput
                        label="Subject"
                        name="subject"
                        value={formData.subject || ''}
                        onChange={handleChange}
                        error={errors.subject}
                        required
                      />
                      <FormTextarea
                        label="Message"
                        name="message"
                        value={formData.message || ''}
                        onChange={handleChange}
                        error={errors.message}
                        rows={6}
                        required
                      />
                    </>
                  )}

                  {activeTab === 'jobs' && (
                    <>
                      <FormInput
                        label="Full Name"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        error={errors.name}
                        required
                      />
                      <FormInput
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        error={errors.email}
                        required
                      />
                      <FormInput
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        error={errors.phone}
                        required
                      />
                      <FormInput
                        label="Position Applied For"
                        name="position"
                        type="text"
                        value={formData.position || ''}
                        onChange={handleChange}
                        error={errors.position}
                        placeholder="e.g., Marine Engineer, Fleet Manager, Deck Officer"
                        required
                      />
                      <FormTextarea
                        label="Cover Letter"
                        name="coverLetter"
                        value={formData.coverLetter || ''}
                        onChange={handleChange}
                        error={errors.coverLetter}
                        rows={6}
                        required
                      />
                      <FormFileUpload
                        label="Upload Resume (PDF or DOC)"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleChange}
                        error={errors.resume}
                        required
                      />
                    </>
                  )}

                  {activeTab === 'quote' && (
                    <>
                      <FormInput
                        label="Company Name"
                        name="company"
                        value={formData.company || ''}
                        onChange={handleChange}
                        error={errors.company}
                        required
                      />
                      <FormInput
                        label="Contact Person"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        error={errors.name}
                        required
                      />
                      <FormInput
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        error={errors.email}
                        required
                      />
                      <FormInput
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        error={errors.phone}
                        required
                      />
                      <FormSelect
                        label="Service Required"
                        name="service"
                        value={formData.service || ''}
                        onChange={handleChange}
                        error={errors.service}
                        options={serviceOptions}
                        required
                      />
                      <FormTextarea
                        label="Project Details"
                        name="details"
                        value={formData.details || ''}
                        onChange={handleChange}
                        error={errors.details}
                        rows={6}
                        required
                      />
                    </>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-1">Address</p>
                    <p className="text-gray-800">
                      3F S&L Building, 1500 Roxas Boulevard<br />
                      Ermita, Manila 1000<br />
                      Philippines
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-1">Phone</p>
                    <p className="text-gray-800">+63-2-85268718 to 19</p>
                    <p className="text-gray-800">+63-2-85239830</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-1">Email</p>
                    <p className="text-gray-800">info@swan-manila.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#001E3C] to-[#003C78] rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2">
                  <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p>Saturday: 9:00 AM - 1:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 text-center bg-white">
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ContactPage;

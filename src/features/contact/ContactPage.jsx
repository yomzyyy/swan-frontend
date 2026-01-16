import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LocationOn, Phone, Email } from '@mui/icons-material';
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600)',
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          {/* About Us Label with line */}
          <div className="mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-0.5 bg-gray-900"></div>
              <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                About Us
              </span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-16">
            {/* Left - Heading */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight uppercase">
                Maritime Excellence In LPG Shipping Services
              </h2>
            </div>

            {/* Right - Description */}
            <div className="flex items-center">
              <p className="text-gray-700 text-base leading-relaxed">
                From safe vessel operations to technical ship management and crew training, we offer
                a wide range of products and services that meet the unique needs of the
                LPG shipping industry.
              </p>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Address Card */}
            <div style={{backgroundColor: '#2d3748'}} className="p-10">
              <div className="w-12 h-12 bg-blue-600 flex items-center justify-center mb-6">
                <LocationOn sx={{ fontSize: 24, color: 'white' }} />
              </div>
              <h3 className="text-base font-bold mb-6 text-white">Address</h3>
              <p className="text-white text-sm leading-relaxed">
                3F S&L Building, 1500 Roxas Boulevard<br />
                Ermita, Manila 1000<br />
                Philippines
              </p>
            </div>

            {/* Phone Card */}
            <div style={{backgroundColor: '#2d3748'}} className="p-10">
              <div className="w-12 h-12 bg-blue-600 flex items-center justify-center mb-6">
                <Phone sx={{ fontSize: 24, color: 'white' }} />
              </div>
              <h3 className="text-base font-bold mb-6 text-white">Address</h3>
              <p className="text-white text-sm leading-relaxed">
                +63-2-85268718 to 19<br />
                +63-2-85239830
              </p>
            </div>

            {/* Email Card */}
            <div style={{backgroundColor: '#2d3748'}} className="p-10">
              <div className="w-12 h-12 bg-blue-600 flex items-center justify-center mb-6">
                <Email sx={{ fontSize: 24, color: 'white' }} />
              </div>
              <h3 className="text-base font-bold mb-6 text-white">Address</h3>
              <p className="text-white text-sm leading-relaxed">
                info@swan-manila.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white shadow-xl p-8">
                <div className="flex flex-wrap gap-3 mb-6 pb-4">
                  <button
                    onClick={() => setActiveTab('contact')}
                    style={activeTab === 'contact' ? {backgroundColor: '#2d3748', color: 'white'} : {}}
                    className={`px-6 py-3 font-semibold transition-all duration-300 ${
                      activeTab === 'contact'
                        ? 'shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    General Contact
                  </button>
                  <button
                    onClick={() => setActiveTab('jobs')}
                    style={activeTab === 'jobs' ? {backgroundColor: '#2d3748', color: 'white'} : {}}
                    className={`px-6 py-3 font-semibold transition-all duration-300 ${
                      activeTab === 'jobs'
                        ? 'shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Job Application
                  </button>
                  <button
                    onClick={() => setActiveTab('quote')}
                    style={activeTab === 'quote' ? {backgroundColor: '#2d3748', color: 'white'} : {}}
                    className={`px-6 py-3 font-semibold transition-all duration-300 ${
                      activeTab === 'quote'
                        ? 'shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Request Quote
                  </button>
                </div>

                {submitSuccess && (
                  <div className="bg-green-100 border-l-4 border-green-500 text-green-700 px-4 py-3 mb-4 shadow-md text-sm">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}

                {errors.submit && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 mb-4 shadow-md text-sm">
                    {errors.submit}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-bold text-base hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div style={{backgroundColor: '#2d3748'}} className="p-8 text-white shadow-lg">
                <h3 className="text-2xl font-bold mb-4 pb-2 border-b-4" style={{borderColor: 'white'}}>
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
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="h-96 shadow-lg rounded">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.410882583308!2d120.97656931426677!3d14.578682189839178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca1f8ad25b33%3A0x4f3b4f8e3d8a3b0c!2s1500%20Roxas%20Blvd%2C%20Ermita%2C%20Manila%2C%201000%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1647284729842!5m2!1sen!2sph"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '4px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SWAN Shipping Office Location - 3F S&L Building, 1500 Roxas Boulevard, Ermita, Manila"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';
import FormFileUpload from '../../components/forms/FormFileUpload';

const JobApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await api.careers.getById(id);
        setJob(response.data?.data || null);
      } catch (err) {
        setError('Job opening not found');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }

    if (!formData.coverLetter.trim()) {
      errors.coverLetter = 'Cover letter is required';
    }

    if (!formData.resume) {
      errors.resume = 'Resume is required';
    } else if (formData.resume.size > 5 * 1024 * 1024) {
      errors.resume = 'Resume file size must be less than 5MB';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);

    // Simulate API submission (you'll need to implement the actual API endpoint)
    try {
      // In a real implementation, you would send this data to your backend
      // const formDataToSend = new FormData();
      // Object.keys(formData).forEach(key => {
      //   formDataToSend.append(key, formData[key]);
      // });
      // formDataToSend.append('jobId', id);
      // await api.applications.create(formDataToSend);

      // For now, simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitSuccess(true);

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/careers');
      }, 3000);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading job details...</div>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl text-red-600 mb-4">{error}</div>
          <Link
            to="/careers"
            className="inline-block bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-12 shadow-lg text-center max-w-2xl">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">✓</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Application Submitted Successfully!
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Thank you for applying to the {job.title} position. We'll review your application and get back to you soon.
          </p>
          <p className="text-gray-500">Redirecting to careers page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#001E3C] to-[#003C78] text-white py-16 pt-28">
        <div className="max-w-4xl mx-auto px-8">
          <Link
            to="/careers"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            ← Back to All Openings
          </Link>
          <h1 className="text-5xl font-extrabold mb-4">
            Apply for {job.title}
          </h1>
          <div className="flex flex-wrap gap-3">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              {job.department}
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              📍 {job.location}
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              {job.type}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
          <p className="text-gray-600 leading-relaxed">{job.description}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Form</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John"
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Doe"
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="john.doe@example.com"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+63 912 345 6789"
              />
              {formErrors.phone && (
                <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
              )}
            </div>

            <FormFileUpload
              label="Resume/CV"
              name="resume"
              onChange={handleChange}
              error={formErrors.resume}
              required={true}
              accept=".pdf,.doc,.docx"
              file={formData.resume}
              description="PDF or DOC (max 5MB)"
              showImagePreview={false}
            />

            <div>
              <label htmlFor="coverLetter" className="block text-sm font-semibold text-gray-700 mb-2">
                Cover Letter *
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows="6"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.coverLetter ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
              />
              {formErrors.coverLetter && (
                <p className="text-red-500 text-sm mt-1">{formErrors.coverLetter}</p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className={`flex-1 bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 ${
                  submitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
              <Link
                to="/careers"
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-gray-400 transition-all duration-300 text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationForm;

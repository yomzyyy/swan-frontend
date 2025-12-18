import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createJob, updateJob, getJobById } from './careersAdminService';

const CareersFormAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    department: 'Deck',
    location: '',
    type: 'Full-time',
    description: '',
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const job = getJobById(id);
      if (job) {
        setFormData(job);
      } else {
        setError('Job not found');
      }
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = isEditMode
        ? updateJob(id, formData)
        : createJob(formData);

      if (result.success) {
        navigate('/admin/careers');
      } else {
        setError(result.error || 'Failed to save job posting');
      }
    } catch (err) {
      setError('An error occurred while saving');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-2">
          <button
            onClick={() => navigate('/admin/careers')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Edit Job Posting' : 'Create New Job Posting'}
          </h1>
        </div>
        <p className="text-gray-600">
          {isEditMode ? 'Update job details' : 'Fill in the details for your new job posting'}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
              placeholder="e.g., Chief Engineer"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
            >
              <option value="Deck">Deck</option>
              <option value="Engine">Engine</option>
              <option value="Catering">Catering</option>
              <option value="Shore-based">Shore-based</option>
              <option value="Operations">Operations</option>
              <option value="Management">Management</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
              placeholder="e.g., Seagoing / Manila"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employment Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
            >
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
              placeholder="Enter job description, responsibilities, requirements, etc."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/careers')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Job' : 'Post Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CareersFormAdmin;

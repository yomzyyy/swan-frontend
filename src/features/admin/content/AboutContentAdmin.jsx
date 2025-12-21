import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAboutContent, saveAboutContent, clearAboutContent } from './contentAdminService';

const AboutContentAdmin = () => {
  const navigate = useNavigate();

  const defaultContent = {
    heritage: {
      badge: 'Our Story',
      title: 'Delivering Trusted LPG Maritime Services for Over 30 Years',
      body: 'For over three decades, Swan Shipping Corporation has been committed to providing safe, efficient, and cost-effective LPG maritime services to customers worldwide.\n\nBacked by experienced maritime professionals and a strong technical foundation, we specialize in ship management, vessel operations, and LPG transport support — ensuring reliability, compliance, and operational excellence at every stage.',
      stats: [
        { number: '19', label: 'Modern Vessels' },
        { number: '50+', label: 'Global Ports' }
      ]
    },
    innovation: {
      badge: 'Our Approach',
      title: 'Modern Solutions for Evolving Maritime Needs',
      body: 'We continuously adapt to changing maritime regulations and industry standards by integrating modern ship management practices, technical expertise, and operational efficiency to support safe LPG transport worldwide.',
      stats: [
        { number: '19', label: 'Modern Vessels' },
        { number: '50+', label: 'Global Ports' }
      ]
    },
    sustainability: {
      badge: 'Our Commitment',
      title: 'Responsible Operations for Safer Seas',
      body: 'Swan Shipping Corporation is committed to responsible maritime operations by promoting safety, regulatory compliance, and environmentally conscious practices across all vessel management activities.',
      stats: [
        { number: '19', label: 'Modern Vessels' },
        { number: '50+', label: 'Global Ports' }
      ]
    }
  };

  const [formData, setFormData] = useState(defaultContent);
  const [activeTab, setActiveTab] = useState('heritage');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedContent = getAboutContent();
    if (savedContent) {
      setFormData(savedContent);
    }
  }, []);

  const handleChange = (tab, field, value) => {
    setFormData(prev => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [field]: value
      }
    }));
  };

  const handleStatChange = (tab, index, field, value) => {
    setFormData(prev => {
      const newStats = [...prev[tab].stats];
      newStats[index] = { ...newStats[index], [field]: value };
      return {
        ...prev,
        [tab]: {
          ...prev[tab],
          stats: newStats
        }
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      const result = saveAboutContent(formData);
      if (result.success) {
        setSuccessMessage('About page content saved successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Failed to save content');
      }
    } catch (err) {
      setError('An error occurred while saving');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default content? This will remove any custom changes.')) {
      clearAboutContent();
      setFormData(defaultContent);
      setSuccessMessage('Content reset to defaults!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const currentTab = formData[activeTab];

  return (
    <div>
      
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">About Page Content</h1>
          <p className="text-gray-600 mt-1">Edit the three tabs on the About page</p>
        </div>
        <a
          href="/about"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#207dff] hover:underline"
        >
          View Page →
        </a>
      </div>

      
      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}

      
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      
      <div className="mb-6">
        <div className="flex space-x-2">
          {['heritage', 'innovation', 'sustainability'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-[#207dff] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6">
        <div className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Badge Text
            </label>
            <input
              type="text"
              value={currentTab.badge}
              onChange={(e) => handleChange(activeTab, 'badge', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
              placeholder="e.g., Our Story"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={currentTab.title}
              onChange={(e) => handleChange(activeTab, 'title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
              placeholder="Section title"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Body Text
            </label>
            <textarea
              value={currentTab.body}
              onChange={(e) => handleChange(activeTab, 'body', e.target.value)}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
              placeholder="Main content (use \n\n for paragraphs)"
            />
            <p className="text-xs text-gray-500 mt-1">Use \n\n to separate paragraphs</p>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Statistics
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentTab.stats.map((stat, index) => (
                <div key={index} className="border border-gray-300 rounded-lg p-4">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Number</label>
                  <input
                    type="text"
                    value={stat.number}
                    onChange={(e) => handleStatChange(activeTab, index, 'number', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent mb-2"
                    placeholder="19"
                  />
                  <label className="block text-xs font-medium text-gray-600 mb-1">Label</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(activeTab, index, 'label', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
                    placeholder="Modern Vessels"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
          >
            Reset to Defaults
          </button>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AboutContentAdmin;

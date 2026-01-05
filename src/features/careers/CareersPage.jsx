import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

const CareersPage = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);
        const response = await api.careers.getAll();
        setJobOpenings(response.data.data);
      } catch (err) {
        setError('Failed to load career opportunities');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading opportunities...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#001E3C] to-[#003C78] text-white py-24 pt-32">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-6xl font-extrabold mb-6">
            Join Our Team
          </h1>
          <p className="text-xl opacity-95 max-w-3xl leading-relaxed">
            Build your career with a global leader in LPG maritime transport.
            We're always looking for talented individuals who share our commitment
            to excellence and safety.
          </p>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Why Work at SWAN Shipping?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-3xl p-8">
              <div className="w-16 h-16 bg-[#207dff] rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🌏</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Global Opportunities
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Work with international teams and operate in 50+ ports worldwide.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-200 rounded-3xl p-8">
              <div className="w-16 h-16 bg-[#207dff] rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Training & Development
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Continuous professional development and maritime training programs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-3xl p-8">
              <div className="w-16 h-16 bg-[#207dff] rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Competitive Benefits
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Comprehensive health insurance, retirement plans, and performance bonuses.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Current Openings
          </h2>

          {jobOpenings.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 shadow-lg text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">💼</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No Open Positions Currently
              </h3>
              <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
                We don't have any open positions at the moment, but we're always interested in hearing from talented professionals. Feel free to submit your resume through the form below.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {jobOpenings.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {job.department}
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                        📍 {job.location}
                      </span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                  <div>
                    <Link
                      to={`/careers/apply/${job.id}`}
                      style={{backgroundColor: '#003366'}}
                      className="inline-block text-white px-8 py-3 font-semibold hover:shadow-lg transition-all duration-300 whitespace-nowrap shadow-md"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </div>

      <div className="py-12 text-center bg-white">
        <Link
          to="/"
          style={{backgroundColor: '#003366'}}
          className="inline-block text-white px-8 py-3 font-semibold hover:shadow-lg transition-all duration-300 shadow-md"
        >
          Back to Home
        </Link>
      </div>

      <div className="py-16 bg-gradient-to-br from-[#001E3C] to-[#003C78] text-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Don't See Your Role?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            We're always interested in hearing from talented professionals.
            Send us your resume and let's talk about your future with SWAN Shipping.
          </p>
          <Link
            to="/contact"
            style={{backgroundColor: 'white', color: '#003366'}}
            className="inline-block px-10 py-4 font-bold text-lg hover:shadow-xl transition-all duration-300 shadow-md"
          >
            Submit Resume
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;

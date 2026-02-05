import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useApiQuery } from '../../hooks';
import { SkeletonCard } from '../../components/skeletons';
import { ActionButton } from '../../components/common';

const CareersPage = () => {
  const { data: jobOpenings, loading, error } = useApiQuery(
    () => api.careers.getAll().then(r => r.data?.data || []),
    { initialData: [] }
  );

  // Filter states
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Extract unique values for filters
  const locations = useMemo(() => {
    const unique = [...new Set(jobOpenings.map(job => job.location))];
    return unique.filter(Boolean);
  }, [jobOpenings]);

  const categories = useMemo(() => {
    const unique = [...new Set(jobOpenings.map(job => job.department))];
    return unique.filter(Boolean);
  }, [jobOpenings]);

  const types = useMemo(() => {
    const unique = [...new Set(jobOpenings.map(job => job.type))];
    return unique.filter(Boolean);
  }, [jobOpenings]);

  // Filter jobs based on selections
  const filteredJobs = useMemo(() => {
    return jobOpenings.filter(job => {
      if (selectedLocation && job.location !== selectedLocation) return false;
      if (selectedCategory && job.department !== selectedCategory) return false;
      if (selectedType && job.type !== selectedType) return false;
      return true;
    });
  }, [jobOpenings, selectedLocation, selectedCategory, selectedType]);

  // Scroll to careers section
  const scrollToCareers = () => {
    document.getElementById('career-opportunities')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Join Our Team Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Title */}
            <div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Join Our Team at<br />SWAN Shipping
              </h1>
            </div>

            {/* Right Side - Description and Button */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-gray-900 mb-4">
                Are you ready to take your career to the next level?
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                At SWAN Shipping, we are a dynamic and innovative logistics and maritime company committed to excellence, sustainability, and delivering exceptional customer experiences.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                We believe our greatest asset is our people, and we're dedicated to fostering a culture of growth, inclusion, and innovation.
              </p>
              <ActionButton onClick={scrollToCareers}>
                Open Positions
              </ActionButton>
            </div>
          </div>
        </div>
      </div>

      {/* Career Opportunities Section */}
      <div id="career-opportunities" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Career Opportunities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're always on the lookout for passionate and talented individuals to join our team. Roles include:
            </p>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-6 py-3 border border-gray-300 rounded-full bg-white text-gray-700 min-w-[200px] focus:outline-none focus:border-gray-500 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10"
            >
              <option value="">Select Location</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-3 border border-gray-300 rounded-full bg-gray-100 text-gray-700 min-w-[200px] focus:outline-none focus:border-gray-500 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10"
            >
              <option value="">Select Job Category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-6 py-3 border border-gray-300 rounded-full bg-white text-gray-700 min-w-[200px] focus:outline-none focus:border-gray-500 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10"
            >
              <option value="">Select Type</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Job Cards Grid */}
          {loading ? (
            <div className="flex flex-wrap justify-center gap-6">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] max-w-[280px]">
                  <SkeletonCard variant="career" />
                </div>
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">💼</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {jobOpenings.length === 0 ? 'No Open Positions Currently' : 'No Matching Positions'}
              </h3>
              <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
                {jobOpenings.length === 0
                  ? "We don't have any open positions at the moment, but we're always interested in hearing from talented professionals."
                  : "Try adjusting your filters to see more opportunities."
                }
              </p>
              {selectedLocation || selectedCategory || selectedType ? (
                <button
                  onClick={() => {
                    setSelectedLocation('');
                    setSelectedCategory('');
                    setSelectedType('');
                  }}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              ) : null}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-6">
              {filteredJobs.map((job) => (
                <Link
                  to={`/careers/apply/${job.id}`}
                  key={job.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 group w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] max-w-[280px]"
                >
                  {/* Location Tag */}
                  <div className="mb-4">
                    <span className="inline-block px-4 py-1 border border-gray-300 rounded-full text-sm text-gray-600">
                      {job.location}
                    </span>
                  </div>

                  {/* Job Title */}
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h3>

                  {/* Job Type Tags */}
                  <div className="flex flex-wrap gap-2">
                    {job.type && (
                      <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        {job.type}
                      </span>
                    )}
                    {job.department && (
                      <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        {job.department}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default CareersPage;

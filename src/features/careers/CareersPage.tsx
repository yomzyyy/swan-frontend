import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useApiQuery } from '../../hooks';
import { SkeletonCard } from '../../components/skeletons';
import { ActionButton, PageError, SEO } from '../../components/common';
import { careersDefaults } from '../../constants/careersDefaults';
import { PAGE_SEO } from '../../constants/seo';
import { deepMerge, resolveImageUrl } from '../../utils';
import type { Career } from '../../types';
import type { CareersPageContent } from '../../types';

const CareersPage = () => {
  const [content, setContent] = useState<CareersPageContent>(careersDefaults);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.content.get('careers');
        const apiData = response.data.data;
        if (apiData) {
          setContent(deepMerge(careersDefaults, apiData as unknown as Partial<CareersPageContent>));
        }
      } catch {
        // Silently fall back to defaults
      }
    };
    fetchContent();
  }, []);

  const { data, loading, error } = useApiQuery<Career[]>(
    () => api.careers.getAll().then(r => r.data?.data || []),
    { initialData: [] }
  );
  const jobOpenings = data ?? [];

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
      <div className="min-h-screen bg-white">
        <PageError
          message={error}
          onRetry={() => window.location.reload()}
          backTo="/"
          backLabel="Go Home"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO {...PAGE_SEO.CAREERS} path="/careers" />
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(${resolveImageUrl(content.hero.backgroundImage)})`,
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
                {content.joinTeam.title.split('\n').map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </h1>
            </div>

            {/* Right Side - Description and Button */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-gray-900 mb-4">
                {content.joinTeam.subtitle}
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {content.joinTeam.description1}
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                {content.joinTeam.description2}
              </p>
              <ActionButton onClick={scrollToCareers}>
                {content.joinTeam.ctaText}
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
              {content.opportunities.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {content.opportunities.description}
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
                  ? content.opportunities.noPositionsMessage
                  : content.opportunities.noMatchMessage
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

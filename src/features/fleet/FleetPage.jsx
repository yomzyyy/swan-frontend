import { useState, useEffect, useMemo } from 'react';
import { api } from '../../services/api';
import Search from '@mui/icons-material/Search';
import Close from '@mui/icons-material/Close';
import SkeletonCard from '../../components/skeletons/SkeletonCard';

// Helper to parse capacity strings like "5,000 CBM" to numbers for sorting
const parseCapacity = (capacityStr) => {
  if (!capacityStr) return 0;
  const match = capacityStr.toString().replace(/,/g, '').match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

const FleetPage = () => {
  const [vessels, setVessels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedTradeArea, setSelectedTradeArea] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchVessels = async () => {
      try {
        setLoading(true);
        const response = await api.fleet.getAll();
        setVessels(response.data?.data || []);
      } catch (err) {
        setError('Failed to load fleet data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVessels();
  }, []);

  // Derived options from data
  const vesselTypes = useMemo(() =>
    [...new Set(vessels.map(v => v.type))].filter(Boolean).sort()
  , [vessels]);

  const tradeAreas = useMemo(() =>
    [...new Set(vessels.map(v => v.tradeArea))].filter(Boolean).sort()
  , [vessels]);

  // Filtered & sorted results
  const filteredVessels = useMemo(() => {
    let result = [...vessels];

    // Search by name
    if (searchQuery.trim()) {
      result = result.filter(v =>
        v.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by type
    if (selectedType) {
      result = result.filter(v => v.type === selectedType);
    }

    // Filter by trade area
    if (selectedTradeArea) {
      result = result.filter(v => v.tradeArea === selectedTradeArea);
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'name') {
        cmp = (a.name || '').localeCompare(b.name || '');
      } else if (sortBy === 'year') {
        cmp = (a.year || 0) - (b.year || 0);
      } else if (sortBy === 'capacity') {
        cmp = parseCapacity(a.capacity) - parseCapacity(b.capacity);
      }
      return sortOrder === 'desc' ? -cmp : cmp;
    });

    return result;
  }, [vessels, searchQuery, selectedType, selectedTradeArea, sortBy, sortOrder]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setSelectedTradeArea('');
    setSortBy('name');
    setSortOrder('asc');
  };

  const hasActiveFilters = selectedType || selectedTradeArea || searchQuery;

  // Hero Section Component
  const HeroSection = () => (
    <div
      className="relative h-80 md:h-96 bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1920)',
      }}
    >
      <div className="absolute inset-0 bg-navy-900/70"></div>
      <div className="relative h-full flex items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          Our Fleet
        </h1>
      </div>
    </div>
  );

  // Filter Bar Component
  const FilterBar = () => (
    <div className="bg-white shadow-sm p-4 md:p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vessels..."
            className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                       transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
                         hover:text-gray-600 transition-colors"
            >
              <Close className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg min-w-[160px]
                     focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                     bg-white cursor-pointer transition-colors"
        >
          <option value="">All Types</option>
          {vesselTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        {/* Trade Area Filter */}
        <select
          value={selectedTradeArea}
          onChange={(e) => setSelectedTradeArea(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg min-w-[160px]
                     focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                     bg-white cursor-pointer transition-colors"
        >
          <option value="">All Areas</option>
          {tradeAreas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>

        {/* Sort Dropdown */}
        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split('-');
            setSortBy(field);
            setSortOrder(order);
          }}
          className="px-4 py-3 border border-gray-300 rounded-lg min-w-[160px]
                     focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                     bg-white cursor-pointer transition-colors"
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="year-desc">Newest First</option>
          <option value="year-asc">Oldest First</option>
          <option value="capacity-desc">Largest First</option>
          <option value="capacity-asc">Smallest First</option>
        </select>
      </div>

      {/* Active Filter Pills */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50
                             text-blue-700 rounded-full text-sm font-medium">
              Search: "{searchQuery}"
              <button
                onClick={() => setSearchQuery('')}
                className="hover:text-blue-900 transition-colors"
              >
                <Close className="w-4 h-4" />
              </button>
            </span>
          )}
          {selectedType && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50
                             text-blue-700 rounded-full text-sm font-medium">
              {selectedType}
              <button
                onClick={() => setSelectedType('')}
                className="hover:text-blue-900 transition-colors"
              >
                <Close className="w-4 h-4" />
              </button>
            </span>
          )}
          {selectedTradeArea && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50
                             text-blue-700 rounded-full text-sm font-medium">
              {selectedTradeArea}
              <button
                onClick={() => setSelectedTradeArea('')}
                className="hover:text-blue-900 transition-colors"
              >
                <Close className="w-4 h-4" />
              </button>
            </span>
          )}
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline
                       transition-colors ml-2"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );

  // Vessel Card Component
  const VesselCard = ({ vessel }) => (
    <div className="group bg-white  overflow-hidden shadow-sm
                    hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image with type badge overlay */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={vessel.image}
          alt={vessel.name}
          className="w-full h-full object-cover group-hover:scale-105
                     transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 px-4 py-2 bg-white
                         text-navy-900 text-xs font-semibold uppercase tracking-wide
                         shadow-md border-l-4 border-l-navy-900">
          {vessel.type}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4
                       group-hover:text-blue-600 transition-colors">
          {vessel.name}
        </h3>

        {/* Key stats in 2-column grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Capacity</p>
            <p className="text-sm font-semibold text-blue-600">{vessel.capacity}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Built</p>
            <p className="text-sm font-semibold text-gray-900">{vessel.year}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-4 flex justify-between text-sm text-gray-600">
          <span>{vessel.flag}</span>
          <span>{vessel.tradeArea}</span>
        </div>
      </div>
    </div>
  );

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-grey-100">
        <HeroSection />
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/* Section Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Our Fleet
            </h2>

            {/* Skeleton Filter Bar */}
            <div className="bg-white shadow-sm p-4 md:p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-40 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-40 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-40 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>

            {/* Skeleton Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Array(9).fill(0).map((_, i) => (
                <SkeletonCard key={i} variant="fleet" />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-grey-100">
        <HeroSection />
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-8 text-center">
            <div className="text-2xl text-red-600 mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                         transition-colors"
            >
              Try Again
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grey-100">
      <HeroSection />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Our Fleet
          </h2>

          <FilterBar />

          {/* Results Count */}
          <div className="mb-6 text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredVessels.length}</span>
            {filteredVessels.length !== vessels.length && (
              <> of <span className="font-semibold text-gray-900">{vessels.length}</span></>
            )} vessel{filteredVessels.length !== 1 ? 's' : ''}
          </div>

          {/* Vessel Grid or Empty State */}
          {filteredVessels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredVessels.map((vessel) => (
                <VesselCard key={vessel.id} vessel={vessel} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white  shadow-sm">
              <div className="text-gray-400 mb-4">
                <Search style={{ fontSize: 64 }} />
              </div>
              <p className="text-gray-500 text-lg mb-4">No vessels match your filters</p>
              <button
                onClick={clearAllFilters}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium
                           transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FleetPage;

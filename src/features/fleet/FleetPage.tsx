import { useState, useMemo } from 'react';
import Search from '@mui/icons-material/Search';
import { api } from '../../services/api';
import { useApiQuery } from '../../hooks';
import { SEO, PageError } from '../../components/common';
import { SkeletonCard } from '../../components/skeletons';
import { PAGE_SEO } from '../../constants/seo';
import FleetHero from './components/FleetHero';
import FleetFilterBar from './components/FleetFilterBar';
import VesselCard from './components/VesselCard';
import type { Fleet } from '../../types';

// Helper to parse capacity strings like "5,000 CBM" to numbers for sorting
const parseCapacity = (capacityStr: string): number => {
  if (!capacityStr) return 0;
  const match = capacityStr.toString().replace(/,/g, '').match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

const FleetPage = () => {
  const { data, loading, error } = useApiQuery<Fleet[]>(
    () => api.fleet.getAll().then(r => r.data?.data || []),
    { initialData: [] }
  );
  const vessels = data ?? [];

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedTradeArea, setSelectedTradeArea] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

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

    if (searchQuery.trim()) {
      result = result.filter(v =>
        v.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedType) {
      result = result.filter(v => v.type === selectedType);
    }

    if (selectedTradeArea) {
      result = result.filter(v => v.tradeArea === selectedTradeArea);
    }

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

  const hasActiveFilters = !!(selectedType || selectedTradeArea || searchQuery);

  if (loading) {
    return (
      <div className="min-h-screen bg-grey-100">
        <FleetHero />
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Our Fleet
            </h2>
            <div className="bg-white shadow-sm p-4 md:p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-40 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-40 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-40 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
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

  if (error) {
    return (
      <div className="min-h-screen bg-grey-100">
        <FleetHero />
        <section className="py-20">
          <PageError
            message={error}
            onRetry={() => window.location.reload()}
          />
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grey-100">
      <SEO {...PAGE_SEO.FLEET} path="/fleet" />
      <FleetHero />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FleetFilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedTradeArea={selectedTradeArea}
            setSelectedTradeArea={setSelectedTradeArea}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            vesselTypes={vesselTypes}
            tradeAreas={tradeAreas}
            hasActiveFilters={hasActiveFilters}
            clearAllFilters={clearAllFilters}
          />

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

import Search from '@mui/icons-material/Search';
import Close from '@mui/icons-material/Close';

interface FleetFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedTradeArea: string;
  setSelectedTradeArea: (area: string) => void;
  sortBy: string;
  setSortBy: (field: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  vesselTypes: string[];
  tradeAreas: string[];
  hasActiveFilters: boolean;
  clearAllFilters: () => void;
}

const FleetFilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedTradeArea,
  setSelectedTradeArea,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  vesselTypes,
  tradeAreas,
  hasActiveFilters,
  clearAllFilters,
}: FleetFilterBarProps) => (
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
            Search: &quot;{searchQuery}&quot;
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

export default FleetFilterBar;

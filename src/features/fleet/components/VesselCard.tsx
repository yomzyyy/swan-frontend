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

export default VesselCard;

import SkeletonCard from '../skeletons/SkeletonCard';

const FleetGrid = ({
  vessels,
  loading = false,
  showTitle = true,
  title = "OUR FLEET",
  description,
  gridClassName = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
}) => {
  if (loading) {
    return (
      <div>
        {showTitle && (
          <div className="mb-12">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-gray-600 max-w-2xl">
                {description}
              </p>
            )}
          </div>
        )}

        <div className={gridClassName}>
          {Array(vessels?.length || 3).fill(0).map((_, i) => (
            <SkeletonCard key={i} variant="fleet" />
          ))}
        </div>
      </div>
    );
  }

  if (!vessels || vessels.length === 0) {
    return null;
  }

  return (
    <div>
      {showTitle && (
        <div className="mb-12">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl">
              {description}
            </p>
          )}
        </div>
      )}

      <div className={gridClassName}>
        {vessels.map((vessel) => (
          <div
            key={vessel.id}
            className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={vessel.image}
                alt={vessel.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {vessel.name}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Trade Area:</span>
                  <span className="font-semibold text-gray-900">{vessel.tradeArea}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">CBM:</span>
                  <span className="font-semibold text-gold-600">{vessel.capacity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Type:</span>
                  <span className="font-semibold text-gray-900">{vessel.type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Built:</span>
                  <span className="font-semibold text-gray-900">{vessel.year}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Flag:</span>
                  <span className="font-semibold text-gray-900">{vessel.flag}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  Shipyard
                </p>
                <p className="text-sm text-gray-600">
                  {vessel.yard}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FleetGrid;

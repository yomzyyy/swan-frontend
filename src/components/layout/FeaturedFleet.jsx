import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

const FeaturedFleet = () => {
  const [vessels, setVessels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVessels = async () => {
      try {
        setLoading(true);
        const response = await api.fleet.getAll();
        const allVessels = response.data.data;
        setVessels(allVessels.slice(0, 3));
      } catch (err) {
        console.error('Failed to load fleet data:', err);
        setVessels([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVessels();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center text-gray-600">Loading fleet...</div>
        </div>
      </section>
    );
  }

  if (vessels.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-12">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
            OUR FLEET
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Modern, efficient, and environmentally responsible LPG carriers
            equipped with cutting-edge technology and safety systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {vessels.map((vessel) => (
            <div
              key={vessel.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
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
                    <span className="font-semibold text-[#207dff]">{vessel.capacity}</span>
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

        <div className="text-center">
          <Link
            to="/fleet"
            className="inline-block bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            View Full Fleet
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFleet;

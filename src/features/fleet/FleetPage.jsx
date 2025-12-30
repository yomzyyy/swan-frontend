import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { FLEET_STATS } from '../../constants/metadata';

const FleetPage = () => {
  const [vessels, setVessels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVessels = async () => {
      try {
        setLoading(true);
        const response = await api.fleet.getAll();
        setVessels(response.data.data);
      } catch (err) {
        setError('Failed to load fleet data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVessels();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading fleet data...</div>
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
            Our Fleet
          </h1>
          <p className="text-xl opacity-95 max-w-3xl leading-relaxed">
            Modern, efficient, and environmentally responsible LPG carriers
            equipped with cutting-edge technology and safety systems.
          </p>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-extrabold text-[#207dff] mb-4">
                {FLEET_STATS.totalVessels}
              </div>
              <div className="text-gray-700 font-semibold text-lg">
                Total Vessels
              </div>
            </div>

            <div>
              <div className="text-5xl font-extrabold text-[#207dff] mb-4">
                {FLEET_STATS.maxCapacity}
              </div>
              <div className="text-gray-700 font-semibold text-lg">
                Max Capacity CBM
              </div>
            </div>

            <div>
              <div className="text-5xl font-extrabold text-[#207dff] mb-4">
                {FLEET_STATS.avgFleetAge}
              </div>
              <div className="text-gray-700 font-semibold text-lg">
                Avg Fleet Age
              </div>
            </div>

            <div>
              <div className="text-5xl font-extrabold text-[#207dff] mb-4">
                {FLEET_STATS.safetyCompliance}
              </div>
              <div className="text-gray-700 font-semibold text-lg">
                Safety Compliance
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Our Vessels
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Fleet Capabilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-3xl p-8">
              <div className="w-16 h-16 bg-[#207dff] rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🚢</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Advanced Technology
              </h3>
              <p className="text-gray-700 leading-relaxed">
                All vessels equipped with state-of-the-art navigation systems,
                real-time monitoring, and automated safety protocols.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-200 rounded-3xl p-8">
              <div className="w-16 h-16 bg-[#207dff] rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Global Operations
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Operating in 50+ ports worldwide with flexible routing and
                scheduling to meet diverse client needs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-3xl p-8">
              <div className="w-16 h-16 bg-[#207dff] rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">♻️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Eco-Friendly
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Committed to environmental sustainability with fuel-efficient
                engines and emissions reduction technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 text-center bg-white">
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>

      <div className="py-16 bg-gradient-to-br from-[#001E3C] to-[#003C78] text-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Charter Our Fleet
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Flexible chartering options for your LPG transportation needs.
            Contact us for availability and rates.
          </p>
          <Link
            to="/contact?tab=quote"
            className="inline-block bg-white text-[#207dff] px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FleetPage;

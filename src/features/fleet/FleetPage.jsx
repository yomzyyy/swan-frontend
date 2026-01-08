import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { FLEET_STATS } from '../../constants/metadata';
import { DirectionsBoat, Language, Public } from '@mui/icons-material';
import FleetGrid from '../../components/layout/FleetGrid';

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
      <div className="min-h-screen bg-gray-50">
        <div style={{backgroundColor: '#003366'}} className="text-white py-24 pt-32">
          <div className="max-w-7xl mx-auto px-8">
            <h1 className="text-6xl font-extrabold mb-6 text-white">
              Our Fleet
            </h1>
            <p className="text-xl opacity-95 max-w-3xl leading-relaxed text-white">
              Modern, efficient, and environmentally responsible LPG carriers
              equipped with cutting-edge technology and safety systems.
            </p>
          </div>
        </div>

        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-extrabold text-gold-600 mb-4">
                  {FLEET_STATS.totalVessels}
                </div>
                <div className="text-gray-700 font-semibold text-lg">
                  Total Vessels
                </div>
              </div>

              <div>
                <div className="text-5xl font-extrabold text-gold-600 mb-4">
                  {FLEET_STATS.maxCapacity}
                </div>
                <div className="text-gray-700 font-semibold text-lg">
                  Max Capacity CBM
                </div>
              </div>

              <div>
                <div className="text-5xl font-extrabold text-gold-600 mb-4">
                  {FLEET_STATS.avgFleetAge}
                </div>
                <div className="text-gray-700 font-semibold text-lg">
                  Avg Fleet Age
                </div>
              </div>

              <div>
                <div className="text-5xl font-extrabold text-gold-600 mb-4">
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
            <FleetGrid
              vessels={Array(9).fill(null)}
              loading={true}
              title="Our Vessels"
            />
          </div>
        </section>
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
      <div style={{backgroundColor: '#003366'}} className="text-white py-24 pt-32">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-6xl font-extrabold mb-6 text-white">
            Our Fleet
          </h1>
          <p className="text-xl opacity-95 max-w-3xl leading-relaxed text-white">
            Modern, efficient, and environmentally responsible LPG carriers
            equipped with cutting-edge technology and safety systems.
          </p>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-extrabold text-gold-600 mb-4">
                {FLEET_STATS.totalVessels}
              </div>
              <div className="text-gray-700 font-semibold text-lg">
                Total Vessels
              </div>
            </div>

            <div>
              <div className="text-5xl font-extrabold text-gold-600 mb-4">
                {FLEET_STATS.maxCapacity}
              </div>
              <div className="text-gray-700 font-semibold text-lg">
                Max Capacity CBM
              </div>
            </div>

            <div>
              <div className="text-5xl font-extrabold text-gold-600 mb-4">
                {FLEET_STATS.avgFleetAge}
              </div>
              <div className="text-gray-700 font-semibold text-lg">
                Avg Fleet Age
              </div>
            </div>

            <div>
              <div className="text-5xl font-extrabold text-gold-600 mb-4">
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
          <FleetGrid
            vessels={vessels}
            loading={false}
            showTitle={true}
            title="Our Vessels"
          />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Fleet Capabilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-grey-100 border-l-4 border-l-gold-500 p-8 shadow-md">
              <div className="w-16 h-16 bg-navy-800 flex items-center justify-center mb-6">
                <DirectionsBoat sx={{ fontSize: 40, color: '#d4af37' }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Advanced Technology
              </h3>
              <p className="text-gray-700 leading-relaxed">
                All vessels equipped with state-of-the-art navigation systems,
                real-time monitoring, and automated safety protocols.
              </p>
            </div>

            <div className="bg-grey-100 border-l-4 border-l-gold-500 p-8 shadow-md">
              <div className="w-16 h-16 bg-navy-800 flex items-center justify-center mb-6">
                <Language sx={{ fontSize: 40, color: '#d4af37' }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Global Operations
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Operating in 50+ ports worldwide with flexible routing and
                scheduling to meet diverse client needs.
              </p>
            </div>

            <div className="bg-grey-100 border-l-4 border-l-gold-500 p-8 shadow-md">
              <div className="w-16 h-16 bg-navy-800 flex items-center justify-center mb-6">
                <Public sx={{ fontSize: 40, color: '#d4af37' }} />
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
          style={{backgroundColor: '#003366'}}
          className="inline-block text-white px-8 py-3 font-semibold hover:shadow-lg transition-all duration-300 shadow-md"
        >
          Back to Home
        </Link>
      </div>

      <div style={{backgroundColor: '#003366'}} className="py-16 text-white border-t-4 border-gold-500">
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
            style={{backgroundColor: 'white', color: '#003366'}}
            className="inline-block px-10 py-4 font-bold text-lg hover:shadow-xl transition-all duration-300 shadow-md"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FleetPage;

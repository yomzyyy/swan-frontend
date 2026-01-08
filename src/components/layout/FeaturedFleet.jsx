import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import FleetGrid from './FleetGrid';

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
          <FleetGrid
            vessels={[null, null, null]}
            loading={true}
            title="OUR FLEET"
            description="Modern, efficient, and environmentally responsible LPG carriers equipped with cutting-edge technology and safety systems."
          />
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
        <FleetGrid
          vessels={vessels}
          loading={false}
          title="OUR FLEET"
          description="Modern, efficient, and environmentally responsible LPG carriers equipped with cutting-edge technology and safety systems."
          gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        />

        <div className="text-center">
          <Link
            to="/fleet"
            style={{backgroundColor: '#003366'}}
            className="inline-block text-white px-10 py-4 font-bold text-lg hover:shadow-lg transition-all duration-300 shadow-md"
          >
            View Full Fleet
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFleet;

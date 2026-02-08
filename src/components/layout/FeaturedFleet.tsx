import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import FleetGrid from './FleetGrid';
import ActionButton from '../common/ActionButton';
import type { Fleet } from '../../types';

const FeaturedFleet = () => {
  const [vessels, setVessels] = useState<Fleet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVessels = async () => {
      try {
        setLoading(true);
        const response = await api.fleet.getAll();
        const allVessels = response.data?.data || [];
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
            vessels={[]}
            loading={true}
            title="OUR FLEET"
            description="Modern, efficient, and environmentally responsible LPG carriers equipped with cutting-edge technology and safety systems."
            skeletonCount={3}
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

        <div className="flex justify-center">
          <ActionButton to="/fleet" size="lg">
            View Full Fleet
          </ActionButton>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFleet;

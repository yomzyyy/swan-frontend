import { useState, useEffect } from 'react';
import { api } from '../../services/api';
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
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div
          className="relative h-96 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Our Vessels Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-left">
              Our Vessels
            </h2>

            <FleetGrid
              vessels={Array(9).fill(null)}
              loading={true}
              showTitle={false}
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Our Vessels Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-left">
            Our Vessels
          </h2>

          <FleetGrid
            vessels={vessels}
            loading={false}
            showTitle={false}
          />
        </div>
      </section>
    </div>
  );
};

export default FleetPage;

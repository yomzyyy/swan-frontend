import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        <div className="relative text-white py-32 pt-40">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1920"
            alt="LPG Fleet"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50 z-10"></div>

          {/* Content */}
          <div className="relative z-20 max-w-7xl mx-auto px-8">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link to="/" className="text-white hover:text-gray-300">Home</Link>
              <span className="text-white mx-2">&gt;</span>
              <span className="text-white">Fleet</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-white uppercase leading-tight max-w-5xl">
              Modern, Efficient, And Environmentally Responsible LPG Carriers
            </h1>
          </div>
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
      <div className="relative text-white py-32 pt-40">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1920"
          alt="LPG Fleet"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            <span className="text-white mx-2">&gt;</span>
            <span className="text-white">Fleet</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white uppercase leading-tight max-w-5xl">
            Modern, Efficient, And Environmentally Responsible LPG Carriers
          </h1>
        </div>
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

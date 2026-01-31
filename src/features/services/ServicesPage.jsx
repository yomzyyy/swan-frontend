import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GetInTouch from '../../components/layout/GetInTouch';
import { servicesDefaults } from '../../constants/servicesDefaults';
import { deepMerge } from '../../utils/deepMerge';
import { api } from '../../services/api';

const ServicesPage = () => {
  const [content, setContent] = useState(servicesDefaults);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.content.get('services');
        const apiData = response.data.data;
        if (apiData) {
          setContent(deepMerge(servicesDefaults, apiData));
        }
      } catch {
        // Silently fall back to defaults
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(${content.hero.backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Services Grid Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase">
              {content.services.title}
            </h2>
            <Link to="/contact">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase px-8 py-4 transition-all duration-300 whitespace-nowrap">
                Send A Request +
              </button>
            </Link>
          </div>

          {/* Services Grid - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.services.items.map((service, index) => (
              <Link
                key={index}
                to="/services"
                className="relative h-96 overflow-hidden group cursor-pointer block"
              >
                {/* Background Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 z-0"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 z-10"></div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6 z-20">
                  {/* Bottom Content */}
                  <div className="z-30">
                    {/* Category Badge */}
                    <div className="mb-2">
                      <span className="text-white text-xs font-bold uppercase" style={{ color: 'white' }}>
                        {service.category}
                      </span>
                    </div>

                    {/* Service Title */}
                    <h3 className="text-white text-2xl font-bold leading-tight mb-3" style={{ color: 'white' }}>
                      {service.title}
                    </h3>

                    {/* Description - Hidden by default, shown on hover */}
                    <p className="text-white text-sm leading-relaxed opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 transition-all duration-300" style={{ color: 'white' }}>
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Get In Touch Section */}
      <GetInTouch bgColor="bg-white" />
    </div>
  );
};

export default ServicesPage;

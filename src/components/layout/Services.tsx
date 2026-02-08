import { Link } from 'react-router-dom';
import ActionButton from '../common/ActionButton';
import { homeDefaults } from '../../constants/homeDefaults';
import type { ServicesContent } from '../../types';

interface ServicesProps {
  services?: Partial<ServicesContent>;
}

const Services = ({ services: servicesProp = {} }: ServicesProps) => {
  const badge = servicesProp.badge || homeDefaults.services.badge;
  const sectionTitle = servicesProp.title || homeDefaults.services.title;
  const services = servicesProp.items || homeDefaults.services.items;

  return (
    <section id="services" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-white uppercase tracking-wider mb-4 font-semibold" style={{ color: 'white' }}>
            {badge}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight uppercase" style={{ color: 'white' }}>
            {sectionTitle}
          </h2>
        </div>

        {/* Services Grid - 3x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Link
              key={index}
              to="/services"
              className="relative h-64 overflow-hidden group cursor-pointer block"
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
                  <h3 className="text-white text-xl font-bold leading-tight mb-3" style={{ color: 'white' }}>
                    {service.title}
                  </h3>

                  {/* Description - Hidden by default, shown on hover */}
                  <p className="text-white text-sm leading-relaxed mb-3 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 transition-all duration-300" style={{ color: 'white' }}>
                    {service.description}
                  </p>

                  {/* Learn More Link - Hidden by default, shown on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-semibold text-sm inline-flex items-center" style={{ color: 'white' }}>
                      Learn More +
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Discover Services Button */}
        <div className="flex justify-center">
          <ActionButton to="/services" size="lg">
            Discover Our Services
          </ActionButton>
        </div>
      </div>
    </section>
  );
};

export default Services;

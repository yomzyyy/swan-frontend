import { Link } from 'react-router-dom';
import ActionButton from '../common/ActionButton';

const Services = () => {
  const services = [
    {
      title: 'Technical Management (LPG Specific)',
      description: 'Maintenance and lifecycle management of cargo containment systems, reliquefaction plants, compressors, valves, and safety equipment.',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800',
      category: 'LPG SHIPPING'
    },
    {
      title: 'LPG Crew Management',
      description: 'Selection, training, and retention of LPG-competent officers and crew, including cargo operation and emergency response training.',
      image: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800',
      category: 'LPG SHIPPING'
    },
    {
      title: 'Safety & Quality Management',
      description: 'Implementation of ISM, ISPS, and gas-specific operational procedures aligned with industry best practices.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
      category: 'LPG SHIPPING'
    },
    {
      title: 'PMS & Dry-Dock Planning',
      description: 'LPG-specific PMS monitoring, spare parts planning, and dry-dock execution.',
      image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800',
      category: 'LPG SHIPPING'
    },
    {
      title: 'Vetting & Terminal Inspection Readiness',
      description: 'Preparation and support for SIRE, CDI, Class, Flag, and terminal inspections.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800',
      category: 'LPG SHIPPING'
    },
    {
      title: 'Emergency Response & Incident Management',
      description: 'Immediate response, investigation, and corrective action for LPG-related incidents and near-misses.',
      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800',
      category: 'LPG SHIPPING'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-white uppercase tracking-wider mb-4 font-semibold" style={{ color: 'white' }}>
            Services We Provide
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight uppercase" style={{ color: 'white' }}>
            Innovating For A Sustainable Tomorrow In LPG Shipping
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

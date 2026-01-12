import { Link } from 'react-router-dom';
import GetInTouch from '../../components/layout/GetInTouch';

const ServicesPage = () => {
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center pt-24"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600)',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-8 h-full flex flex-col justify-center">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/" className="text-white/80 hover:text-white text-sm transition-colors">
              Home
            </Link>
            <span className="text-white/80 mx-2">&gt;</span>
            <span className="text-white text-sm">Services</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight uppercase" style={{ color: 'white' }}>
            Innovating For A Sustainable<br />Tomorrow In LPG Shipping
          </h1>
        </div>
      </div>

      {/* Services Grid Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase">
              Explore Our Services
            </h2>
            <Link to="/contact">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase px-8 py-4 transition-all duration-300 whitespace-nowrap">
                Send A Request +
              </button>
            </Link>
          </div>

          {/* Services Grid - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
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

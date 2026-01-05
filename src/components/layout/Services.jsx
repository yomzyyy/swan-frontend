const Services = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">


        <div className="mb-12">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
            COMPREHENSIVE
            <br />
            LPG SHIPPING
            <br />
            SERVICES
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            From vessel chartering to terminal operations, we provide end-to-end
            solutions for the global LPG supply chain with unmatched
            safety standards. Operating in 50+ ports worldwide.
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          
          <div className="bg-gray-50 p-8 transition-shadow duration-300 hover:shadow-lg shadow-md">

            <div className="mb-6 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800"
                alt="LPG carriers at port"
                className="w-full h-48 object-cover"
              />
            </div>

            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Advanced Fleet Operations
            </h3>

            
            <p className="text-gray-600 leading-relaxed">
              12 state-of-the-art LPG carriers ranging from 5,000 to
              84,000 CBM capacity, equipped with latest safety
              technology and environmental protection systems.
            </p>
          </div>

          
          <div className="bg-gray-50 p-8 transition-shadow duration-300 hover:shadow-lg shadow-md">

            <div className="mb-6 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"
                alt="Ship control center"
                className="w-full h-48 object-cover"
              />
            </div>


            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Industry-Leading Safety
            </h3>


            <div className="flex gap-3 mb-4">
              <span className="bg-navy-800 text-white px-4 py-2 border-l-4 border-gold-500 text-xs font-semibold">
                ISO 9001
              </span>
              <span className="bg-navy-800 text-white px-4 py-2 border-l-4 border-gold-500 text-xs font-semibold">
                IMO Certified
              </span>
            </div>

            
            <p className="text-gray-600 leading-relaxed">
              Zero incidents in 2024. Our comprehensive safety protocols
              and crew training programs exceed international maritime
              standards.
            </p>
          </div>

          
          <div className="bg-gray-50 p-8 transition-shadow duration-300 hover:shadow-lg shadow-md">

            <div className="mb-6 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800"
                alt="Vessel chartering"
                className="w-full h-48 object-cover"
              />
            </div>


            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Vessel Chartering
            </h3>

            
            <p className="text-gray-600 leading-relaxed">
              Flexible chartering options for short-term
              and long-term LPG transportation needs
              with competitive rates and reliable service.
            </p>
          </div>

          
          <div className="bg-gray-50 p-8 transition-shadow duration-300 hover:shadow-lg shadow-md">

            <div className="mb-6 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"
                alt="Terminal operations"
                className="w-full h-48 object-cover"
              />
            </div>


            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Terminal Operations
            </h3>

            
            <p className="text-gray-600 leading-relaxed">
              Comprehensive terminal management
              services including loading, unloading, and
              storage operations with cutting-edge technology.
            </p>
          </div>

          
          <div className="bg-gray-50 p-8 transition-shadow duration-300 hover:shadow-lg shadow-md">

            <div className="mb-6 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800"
                alt="24/7 Support team"
                className="w-full h-48 object-cover"
              />
            </div>


            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              24/7 Support
            </h3>

            
            <p className="text-gray-600 leading-relaxed">
              Round-the-clock operational support and
              emergency response team for all your
              maritime needs, ensuring smooth operations.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Services;

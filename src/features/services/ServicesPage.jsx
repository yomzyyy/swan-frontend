import { Link } from 'react-router-dom';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#001E3C] to-[#003C78] text-white py-24 pt-32">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-6xl font-extrabold mb-6">
            Our Services
          </h1>
          <p className="text-xl opacity-95 max-w-3xl leading-relaxed">
            Comprehensive LPG shipping solutions from vessel chartering to
            terminal operations, backed by 30+ years of maritime excellence.
          </p>
        </div>
      </div>

      <section className="py-24 bg-white">
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
            <div className="bg-gray-50 rounded-3xl p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-6 rounded-2xl overflow-hidden">
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

            <div className="bg-gray-50 rounded-3xl p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-6 rounded-2xl overflow-hidden">
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
                <span className="bg-[#001E3C] text-white px-4 py-2 rounded-full text-xs font-semibold">
                  ISO 9001
                </span>
                <span className="bg-[#001E3C] text-white px-4 py-2 rounded-full text-xs font-semibold">
                  IMO Certified
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed">
                Zero incidents in 2024. Our comprehensive safety protocols
                and crew training programs exceed international maritime
                standards.
              </p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-6 rounded-2xl overflow-hidden">
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

            <div className="bg-gray-50 rounded-3xl p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-6 rounded-2xl overflow-hidden">
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

            <div className="bg-gray-50 rounded-3xl p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-6 rounded-2xl overflow-hidden">
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

            <div className="bg-gray-50 rounded-3xl p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-6 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800"
                  alt="Ship management"
                  className="w-full h-48 object-cover"
                />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ship Management
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Full technical and crew management services,
                ensuring optimal vessel performance and
                regulatory compliance for all operations.
              </p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-6 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800"
                  alt="Technical management"
                  className="w-full h-48 object-cover"
                />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Technical Management
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Comprehensive technical management with experienced teams providing
                crewing, ship operation and maintenance, onboard inspections,
                dry docking, and detailed technical and operating budget reports.
              </p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-6 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800"
                  alt="Newbuilding supervision"
                  className="w-full h-48 object-cover"
                />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Newbuilding Supervision
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Expert supervision of vessel newbuilding from day one to delivery.
                Covering gas carriers, dry cargo, product and chemical tankers with
                20+ vessels supervised and design evaluation expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Why Choose SWAN Shipping?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-extrabold text-[#207dff] mb-4">
                30+
              </div>
              <div className="text-gray-700 font-semibold">
                Years Experience
              </div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-extrabold text-[#207dff] mb-4">
                12+
              </div>
              <div className="text-gray-700 font-semibold">
                Modern Vessels
              </div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-extrabold text-[#207dff] mb-4">
                50+
              </div>
              <div className="text-gray-700 font-semibold">
                Global Ports
              </div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-extrabold text-[#207dff] mb-4">
                Zero
              </div>
              <div className="text-gray-700 font-semibold">
                Incidents 2024
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 text-center bg-white">
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>

      <div className="py-16 bg-gradient-to-br from-[#001E3C] to-[#003C78] text-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Contact our team today to discuss your LPG transportation needs.
          </p>
          <button className="bg-white text-[#207dff] px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

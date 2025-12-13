/**
 * Services Section - Using Tailwind CSS
 *
 * UPDATED LAYOUT:
 * - All 5 service cards have the same consistent layout
 * - Each card has an image, title, and description
 * - Removed "Worldwide Coverage" as separate card
 * - 2 cards in first row, 3 cards in second row
 */
const Services = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        {/* Section Header */}
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

        {/* All Service Cards - Consistent Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Card 1 - Advanced Fleet Operations */}
          <div className="bg-gray-50 rounded-3xl p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            {/* Image */}
            <div className="mb-6 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800"
                alt="LPG carriers at port"
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Advanced Fleet Operations
            </h3>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              12 state-of-the-art LPG carriers ranging from 5,000 to
              84,000 CBM capacity, equipped with latest safety
              technology and environmental protection systems.
            </p>
          </div>

          {/* Card 2 - Industry-Leading Safety */}
          <div className="bg-gray-50 rounded-3xl p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            {/* Image */}
            <div className="mb-6 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"
                alt="Ship control center"
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Industry-Leading Safety
            </h3>

            {/* Badges */}
            <div className="flex gap-3 mb-4">
              <span className="bg-[#001E3C] text-white px-4 py-2 rounded-full text-xs font-semibold">
                ISO 9001
              </span>
              <span className="bg-[#001E3C] text-white px-4 py-2 rounded-full text-xs font-semibold">
                IMO Certified
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              Zero incidents in 2024. Our comprehensive safety protocols
              and crew training programs exceed international maritime
              standards.
            </p>
          </div>

          {/* Card 3 - Vessel Chartering */}
          <div className="bg-gray-50 rounded-3xl p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            {/* Image */}
            <div className="mb-6 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800"
                alt="Vessel chartering"
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Vessel Chartering
            </h3>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              Flexible chartering options for short-term
              and long-term LPG transportation needs
              with competitive rates and reliable service.
            </p>
          </div>

          {/* Card 4 - Terminal Operations */}
          <div className="bg-gray-50 rounded-3xl p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            {/* Image */}
            <div className="mb-6 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"
                alt="Terminal operations"
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Terminal Operations
            </h3>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              Comprehensive terminal management
              services including loading, unloading, and
              storage operations with cutting-edge technology.
            </p>
          </div>

          {/* Card 5 - 24/7 Support */}
          <div className="bg-gray-50 rounded-3xl p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            {/* Image */}
            <div className="mb-6 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800"
                alt="24/7 Support team"
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              24/7 Support
            </h3>

            {/* Description */}
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

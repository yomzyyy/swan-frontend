import { Link } from 'react-router-dom';
import AboutContentSection from '../../components/layout/AboutContentSection';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#001E3C] to-[#003C78] text-white py-24 pt-32">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-6xl font-extrabold mb-6">
            About SWAN Shipping
          </h1>
          <p className="text-xl opacity-95 max-w-3xl leading-relaxed">
            Three decades of maritime excellence in LPG transport.
            Building trust through safety, reliability, and innovation.
          </p>
        </div>
      </div>

      <div className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <AboutContentSection
            sectionTitle="DECADES OF RELIABLE LPG MARITIME OPERATIONS"
            showSectionTitle={true}
            containerClassName="mb-24"
          />

          <div className="py-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              Our Core Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 shadow-lg">
                <div className="w-16 h-16 bg-[#207dff] rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">⚓</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Safety First
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Zero-incident commitment with rigorous safety protocols and continuous crew training programs that exceed international standards.
                </p>
              </div>

              <div className="bg-white p-8 shadow-lg">
                <div className="w-16 h-16 bg-[#207dff] rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">🌊</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Excellence
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Commitment to operational excellence through state-of-the-art vessels, advanced technology, and experienced maritime professionals.
                </p>
              </div>

              <div className="bg-white p-8 shadow-lg">
                <div className="w-16 h-16 bg-[#207dff] rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">🌱</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Sustainability
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Environmental responsibility through eco-friendly practices, emissions reduction, and compliance with global maritime standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 text-center bg-white">
        <Link
          to="/"
          style={{backgroundColor: '#003366'}}
          className="inline-block text-white px-8 py-3 font-semibold hover:shadow-lg transition-all duration-300 shadow-md"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;

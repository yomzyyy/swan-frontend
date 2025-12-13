import { useState } from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('heritage');

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
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#001E3C] to-[#003C78] bg-clip-text text-transparent">
              MARITIME EXCELLENCE
              <br />
              SINCE 1994
            </h2>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('heritage')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'heritage'
                  ? 'bg-[#001E3C] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              HERITAGE
            </button>

            <button
              onClick={() => setActiveTab('innovation')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'innovation'
                  ? 'bg-[#001E3C] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              INNOVATION
            </button>

            <button
              onClick={() => setActiveTab('sustainability')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'sustainability'
                  ? 'bg-[#001E3C] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              SUSTAINABILITY
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mb-24">
            <div className="rounded-3xl overflow-hidden shadow-2xl relative h-full">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"
                alt="Modern building"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6 flex gap-3">
                <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-800">
                  EST. 1994
                </span>
                <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-800">
                  ISO CERTIFIED
                </span>
              </div>
            </div>

            <div className="bg-[#1a2332] rounded-3xl p-12 text-white shadow-xl flex flex-col h-full">
              <span className="bg-[#207dff] px-4 py-2 rounded-full text-xs font-bold mb-6 uppercase tracking-wide shadow-lg shadow-blue-500/30 self-start">
                Our Story
              </span>

              <h3 className="text-4xl font-bold mb-6 leading-tight">
                Building the Future of LPG
                <br />
                Transport
              </h3>

              <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                Our team is composed of highly experienced technical people
                with strong backgrounds in ship design, shipbuilding
                supervision, dry docking, ship business and gas carrier
                operation. We are committed to delivering safe, efficient, and
                environmentally responsible maritime solutions.
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-extrabold text-[#207dff] mb-2">
                    12+
                  </div>
                  <div className="text-gray-400 text-sm">
                    Modern Vessels
                  </div>
                </div>

                <div>
                  <div className="text-4xl font-extrabold text-[#207dff] mb-2">
                    50+
                  </div>
                  <div className="text-gray-400 text-sm">
                    Global Ports
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              Our Core Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
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

              <div className="bg-white rounded-3xl p-8 shadow-lg">
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

              <div className="bg-white rounded-3xl p-8 shadow-lg">
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
          className="inline-block bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;

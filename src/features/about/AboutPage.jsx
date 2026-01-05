import { useState } from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('heritage');

  const tabContent = {
    heritage: {
      badge: 'Our Story',
      title: 'Delivering Trusted LPG Maritime Services for Over 30 Years',
      body: 'For over three decades, Swan Shipping Corporation has been committed to providing safe, efficient, and cost-effective LPG maritime services to customers worldwide.\n\nBacked by experienced maritime professionals and a strong technical foundation, we specialize in ship management, vessel operations, and LPG transport support — ensuring reliability, compliance, and operational excellence at every stage.',
      stats: [
        { number: '19', label: 'Modern Vessels' },
        { number: '50+', label: 'Global Ports' }
      ]
    },
    innovation: {
      badge: 'Our Approach',
      title: 'Modern Solutions for Evolving Maritime Needs',
      body: 'We continuously adapt to changing maritime regulations and industry standards by integrating modern ship management practices, technical expertise, and operational efficiency to support safe LPG transport worldwide.',
      stats: [
        { number: '19', label: 'Modern Vessels' },
        { number: '50+', label: 'Global Ports' }
      ]
    },
    sustainability: {
      badge: 'Our Commitment',
      title: 'Responsible Operations for Safer Seas',
      body: 'Swan Shipping Corporation is committed to responsible maritime operations by promoting safety, regulatory compliance, and environmentally conscious practices across all vessel management activities.',
      stats: [
        { number: '19', label: 'Modern Vessels' },
        { number: '50+', label: 'Global Ports' }
      ]
    }
  };

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
              DECADES OF RELIABLE LPG MARITIME OPERATIONS
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

            <div className="bg-[#1a2332] rounded-3xl p-12 text-white shadow-xl flex flex-col h-[650px] transition-all duration-300">
              <span className="bg-[#207dff] px-4 py-2 rounded-full text-xs font-bold mb-6 uppercase tracking-wide shadow-lg shadow-blue-500/30 self-start">
                {tabContent[activeTab].badge}
              </span>

              <h3 className="text-4xl font-bold mb-6 leading-tight">
                {tabContent[activeTab].title}
              </h3>

              <p className="text-gray-300 leading-relaxed mb-auto text-lg whitespace-pre-line">
                {tabContent[activeTab].body}
              </p>

              <div className="grid grid-cols-2 gap-8 mt-8">
                {tabContent[activeTab].stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-4xl font-extrabold text-[#207dff] mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
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

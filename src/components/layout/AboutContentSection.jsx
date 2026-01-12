import { useState, useEffect } from 'react';

const AboutContentSection = ({
  sectionTitle,
  showSectionTitle = true,
  containerClassName = ''
}) => {
  const [activeTab, setActiveTab] = useState('heritage');

  // Auto-rotate tabs every 5 seconds
  useEffect(() => {
    const tabs = ['heritage', 'innovation', 'sustainability'];
    const interval = setInterval(() => {
      setActiveTab(current => {
        const currentIndex = tabs.indexOf(current);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
    <div className={containerClassName}>
      {showSectionTitle && sectionTitle && (
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-4 text-navy-900 inline-block pb-2" style={{borderBottom: '4px solid #0D2136'}}>
            {sectionTitle}
          </h2>
        </div>
      )}

      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => setActiveTab('heritage')}
          style={activeTab === 'heritage' ? {backgroundColor: '#0D2136', color: 'white'} : {backgroundColor: 'white', color: '#2d3748'}}
          className={`px-8 py-3 font-semibold transition-all duration-300 ${
            activeTab === 'heritage'
              ? 'shadow-lg'
              : 'hover:bg-gray-100 shadow-md'
          }`}
        >
          HERITAGE
        </button>

        <button
          onClick={() => setActiveTab('innovation')}
          style={activeTab === 'innovation' ? {backgroundColor: '#0D2136', color: 'white'} : {backgroundColor: 'white', color: '#2d3748'}}
          className={`px-8 py-3 font-semibold transition-all duration-300 ${
            activeTab === 'innovation'
              ? 'shadow-lg'
              : 'hover:bg-gray-100 shadow-md'
          }`}
        >
          INNOVATION
        </button>

        <button
          onClick={() => setActiveTab('sustainability')}
          style={activeTab === 'sustainability' ? {backgroundColor: '#0D2136', color: 'white'} : {backgroundColor: 'white', color: '#2d3748'}}
          className={`px-8 py-3 font-semibold transition-all duration-300 ${
            activeTab === 'sustainability'
              ? 'shadow-lg'
              : 'hover:bg-gray-100 shadow-md'
          }`}
        >
          SUSTAINABILITY
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        <div className="h-full">
          <div className="overflow-hidden shadow-2xl relative h-full">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"
              alt="Modern building"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 flex gap-3">
              <span className="bg-white/90 backdrop-blur-sm px-4 py-2 border-l-4 border-blue-600 text-sm font-semibold text-gray-800">
                EST. 1994
              </span>
              <span className="bg-white/90 backdrop-blur-sm px-4 py-2 border-l-4 border-blue-600 text-sm font-semibold text-gray-800">
                ISO CERTIFIED
              </span>
            </div>
          </div>
        </div>

        <div style={{backgroundColor: '#0D2136'}} className="px-12 pt-6 pb-12 text-white shadow-xl flex flex-col h-[650px] overflow-hidden">
          <div key={activeTab} className="flex flex-col h-full animate-fadeInSlide">
            <span className="bg-white/90 backdrop-blur-sm px-4 py-2 border-l-4 border-blue-600 text-sm font-semibold mb-6 uppercase tracking-wide self-start text-gray-800">
              {tabContent[activeTab].badge}
            </span>

            <h3 className="text-4xl font-bold mb-6 leading-tight text-white">
              {tabContent[activeTab].title}
            </h3>

            <p className="text-gray-300 leading-relaxed mb-auto text-lg whitespace-pre-line">
              {tabContent[activeTab].body}
            </p>

            <div className="grid grid-cols-2 gap-8 mt-8">
              {tabContent[activeTab].stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-extrabold text-blue-500 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContentSection;

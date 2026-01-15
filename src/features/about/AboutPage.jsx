import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Check, ArrowBackIos, ArrowForwardIos, HealthAndSafety, Groups, Build, FactCheck } from '@mui/icons-material';
import { useInView } from '../../hooks/useInView';
import { useCountingAnimation } from '../../hooks/useCountingAnimation';
import { parseStatNumber } from '../../utils/numberParser';
import GetInTouch from '../../components/layout/GetInTouch';

// StatItem Component - Displays animated statistics
const StatItem = ({ stat, shouldAnimate }) => {
  const { number: targetNumber, suffix } = parseStatNumber(stat.number);
  const animatedNumber = useCountingAnimation(targetNumber, 2000, shouldAnimate);

  return (
    <div className="flex flex-col items-center">
      {/* Large Animated Number */}
      <div className="mb-6">
        <span className="text-6xl md:text-7xl font-black text-gray-900">
          {animatedNumber}{suffix}
        </span>
      </div>

      {/* Category & Label */}
      <div className="text-center">
        <p
          className="text-sm font-bold uppercase tracking-wider mb-2"
          style={{ color: '#2563eb' }}
        >
          {stat.category}
        </p>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {stat.label}
        </h3>
        <p className="text-gray-600 text-sm max-w-xs">
          {stat.description}
        </p>
      </div>
    </div>
  );
};

const AboutPage = () => {
  const circularStats = [
    {
      number: '19',
      category: 'LPG SHIPPING',
      label: 'Fleet Management',
      description: 'We\'re leading the industry in LPG vessel management'
    },
    {
      number: '30+',
      category: 'LPG SHIPPING',
      label: 'Years of Experience',
      description: 'We\'re helping you navigate maritime excellence'
    },
    {
      number: '100%',
      category: 'LPG SHIPPING',
      label: 'Safety Compliance',
      description: 'We\'re maintaining the highest industry standards'
    }
  ];

  const whyChooseUs = [
    '30+ years of continuous ship management experience',
    'Strong safety culture with disciplined shore & shipboard operations',
    'Proven cost control & OPEX predictability',
    'Japanese-built vessel expertise',
    'Long-term owner focused partnerships'
  ];

  // Intersection observer for scroll-triggered animation
  const [statsRef, statsInView] = useInView({ threshold: 0.3 });

  // Mission/Vision state
  const [currentView, setCurrentView] = useState(0); // 0 = Mission, 1 = Vision
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleViewChange = (newView) => {
    if (newView === currentView) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView(newView);
      setIsTransitioning(false);
    }, 300);
  };

  const missionVisionData = [
    {
      title: 'Our Mission',
      subtitle: 'Empowering Global LPG Trade',
      description: 'To provide efficient, reliable, and tailored ship management solutions that facilitate the safe movement of LPG across the globe, ensuring operational excellence and environmental stewardship.',
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800'
    },
    {
      title: 'Our Vision',
      subtitle: 'Leading the Future of LPG Shipping',
      description: 'To be the most trusted and innovative LPG ship management partner, recognized globally for our commitment to safety, sustainability, and delivering exceptional value to vessel owners.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'
    }
  ];

  const lgpPillars = [
    {
      title: 'LPG Safety Culture',
      description: 'Strict adherence to gas safety procedures, permits to work, and emergency preparedness.',
      icon: HealthAndSafety
    },
    {
      title: 'Experienced LPG Crew & Management Team',
      description: 'Filipino officers and crew trained and experienced in LPG cargo handling and gas operations.',
      icon: Groups
    },
    {
      title: 'Cargo System Integrity & Readiness',
      description: 'Continuous monitoring and maintenance of cargo tanks, reliquefaction systems, valves, and safety devices.',
      icon: Build
    },
    {
      title: 'Vetting & Terminal Readiness',
      description: 'Strong preparation for OCIMF, CDI, terminal inspections, and charterer requirements.',
      icon: FactCheck
    }
  ];

  // Carousel state for LPG pillars
  const [currentPillarIndex, setCurrentPillarIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isCarouselTransitioning, setIsCarouselTransitioning] = useState(false);

  // Auto-rotate carousel every 4 seconds with fade animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsCarouselTransitioning(true);
      setTimeout(() => {
        setCurrentPillarIndex((prev) => (prev + 1) % lgpPillars.length);
        setIsCarouselTransitioning(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [lgpPillars.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center pt-24"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1600)',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Breadcrumb */}
        <div className="relative max-w-7xl mx-auto px-8 pt-8">
          <Link to="/" className="text-white/80 hover:text-white text-sm transition-colors">
            Home
          </Link>
          <span className="text-white/80 mx-2">&gt;</span>
          <span className="text-white text-sm">About Us</span>
        </div>
      </div>

      {/* Main Title + Circular Stats Section - Combined */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          {/* Label - Outside Grid */}
          <div className="mb-6">
            <span className="text-sm font-bold uppercase tracking-wider" style={{color: '#2563eb'}}>
              About Us
            </span>
          </div>

          {/* Top Part: Title + Description (Side-by-Side) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Left Column - Heading */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 uppercase leading-tight">
                LPG SHIPPING INNOVATORS: DRIVING PROGRESS IN THE INDUSTRY
              </h1>
            </div>

            {/* Right Column - Description */}
            <div className="space-y-4">
              <p className="text-base text-gray-900 leading-relaxed">
                From ship management and crew operations to technical services and safety compliance, we offer a wide range of products and services that meet the unique needs of the LPG shipping industry.
              </p>
              <p className="text-base text-gray-900 leading-relaxed">
                With over three decades of specialized experience, SWAN has established itself as a trusted partner in LPG vessel management. Our commitment to operational excellence, safety, and environmental stewardship sets us apart in the maritime industry.
              </p>
              <p className="text-base text-gray-900 leading-relaxed">
                We combine deep technical expertise with a culture of continuous improvement, ensuring our clients benefit from industry-leading standards and innovative solutions tailored to the unique challenges of LPG shipping.
              </p>
            </div>
          </div>

          {/* Bottom Part: Animated Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-16"
          >
            {circularStats.map((stat, index) => (
              <StatItem
                key={index}
                stat={stat}
                shouldAnimate={statsInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Owners Choose SWAN Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content (50%) */}
            <div>
              {/* Label */}
              <div className="mb-4">
                <span className="text-sm font-bold uppercase tracking-wider" style={{color: '#2563eb'}}>
                  Why Choose Us
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase">
                Why Owners Choose SWAN
              </h2>

              {/* Intro Text */}
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                With over three decades of specialized experience in LPG ship management, we deliver operational excellence and safety leadership for vessel owners worldwide.
              </p>

              {/* Achievement List */}
              <div className="space-y-3">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded flex items-center justify-center" style={{backgroundColor: '#2563eb'}}>
                        <Check sx={{ fontSize: 16, color: 'white' }} />
                      </div>
                    </div>
                    <p className="text-base text-gray-900 font-semibold">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Image (50%) */}
            <div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600"
                  alt="Maritime Professional"
                  className="w-full h-96 object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LPG Management Approach Section - Our LPG Management Pillars */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Image */}
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800"
                alt="LPG Vessel"
                className="w-full h-[500px] object-cover shadow-lg"
              />
            </div>

            {/* Right Column - Title and Cards */}
            <div className="order-1 lg:order-2">
              {/* Main Heading */}
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12">
                Our LPG Management Pillars
              </h2>

              {/* Cards Carousel */}
              <div
                className="grid grid-cols-3 gap-4 mb-8 transition-opacity duration-300"
                style={{ opacity: isCarouselTransitioning ? 0 : 1 }}
              >
                {(() => {
                  const visibleCards = [];
                  for (let i = 0; i < 3; i++) {
                    const index = (currentPillarIndex + i) % lgpPillars.length;
                    const pillar = lgpPillars[index];
                    visibleCards.push(
                      <div
                        key={index}
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => setCurrentPillarIndex(index)}
                        className="cursor-pointer transition-all duration-300 p-6 shadow-md"
                        style={{
                          backgroundColor: hoveredCard === index ? '#2563eb' : 'white',
                          border: '2px solid #e5e7eb'
                        }}
                      >
                        {/* Icon */}
                        <div className="mb-4">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor: hoveredCard === index ? 'white' : '#2563eb'
                            }}
                          >
                            <pillar.icon
                              sx={{
                                fontSize: 24,
                                color: hoveredCard === index ? '#2563eb' : 'white'
                              }}
                            />
                          </div>
                        </div>

                        {/* Title */}
                        <h3
                          className="text-lg font-bold mb-2"
                          style={{
                            color: hoveredCard === index ? 'white' : '#111827'
                          }}
                        >
                          {pillar.title}
                        </h3>
                      </div>
                    );
                  }
                  return visibleCards;
                })()}
              </div>

              {/* Current Description */}
              <div>
                <p className="text-base text-gray-600 leading-relaxed">
                  {lgpPillars[currentPillarIndex].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Vision Section */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column - Image (50%) */}
          <div className="relative h-[500px]">
            <img
              src={missionVisionData[currentView].image}
              alt={missionVisionData[currentView].title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column - Content (50%) */}
          <div className="relative flex items-center px-12 md:px-16 lg:px-24 py-12 h-[500px]" style={{backgroundColor: '#0D2136'}}>
            <div className="transition-opacity duration-300" style={{ opacity: isTransitioning ? 0 : 1 }}>
              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase" style={{color: 'white'}}>
                {missionVisionData[currentView].title}
              </h2>

              {/* Subtitle */}
              <h3 className="text-xl md:text-2xl font-bold mb-6" style={{color: 'white'}}>
                {missionVisionData[currentView].subtitle}
              </h3>

              {/* Description */}
              <p className="text-base text-white/90 leading-relaxed mb-8">
                {missionVisionData[currentView].description}
              </p>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => handleViewChange(0)}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: currentView === 0 ? '#2563eb' : 'rgba(255, 255, 255, 0.2)',
                  }}
                  aria-label="View Mission"
                >
                  <ArrowBackIos sx={{ fontSize: 20, color: 'white', ml: 1 }} />
                </button>
                <button
                  onClick={() => handleViewChange(1)}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: currentView === 1 ? '#2563eb' : 'rgba(255, 255, 255, 0.2)',
                  }}
                  aria-label="View Vision"
                >
                  <ArrowForwardIos sx={{ fontSize: 20, color: 'white' }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 text-center uppercase">
            Our Clients
          </h2>

          {/* Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {/* Placeholder Logos */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-400">
                    LOGO
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Client {item}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get In Touch Section */}
      <GetInTouch bgColor="bg-white" />
    </div>
  );
};

export default AboutPage;

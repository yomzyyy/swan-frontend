import { Link } from 'react-router-dom';
import { Check } from '@mui/icons-material';
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

  const services = [
    {
      title: 'Ship Management',
      description: 'Comprehensive vessel management services ensuring operational excellence and regulatory compliance.'
    },
    {
      title: 'LPG Operations',
      description: 'Specialized expertise in Liquefied Petroleum Gas carrier operations and cargo handling.'
    },
    {
      title: 'Technical Services',
      description: 'Advanced technical support, maintenance planning, and vessel performance optimization.'
    },
    {
      title: 'Crew Management',
      description: 'Professional crew recruitment, training, and development programs for maritime excellence.'
    },
    {
      title: 'Safety & Compliance',
      description: 'Rigorous safety protocols and full compliance with international maritime regulations.'
    },
    {
      title: 'Vessel Maintenance',
      description: 'Proactive maintenance programs ensuring fleet reliability and operational efficiency.'
    }
  ];

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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          {/* Top Part: Title + Description (Side-by-Side) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Left Column - Label + Heading */}
            <div>
              {/* Label */}
              <div className="mb-6">
                <span className="text-sm font-bold uppercase tracking-wider" style={{color: '#2563eb'}}>
                  About Us
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 uppercase leading-tight">
                LPG SHIPPING INNOVATORS: DRIVING PROGRESS IN THE INDUSTRY
              </h1>
            </div>

            {/* Right Column - Description */}
            <div className="flex items-end">
              <p className="text-base text-gray-900 leading-relaxed">
                From ship management and crew operations to technical services and safety compliance, we offer a wide range of products and services that meet the unique needs of the LPG shipping industry.
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left Column - Text Content (60%) */}
            <div className="lg:col-span-3">
              {/* Label */}
              <div className="mb-4">
                <span className="text-sm font-bold uppercase tracking-wider" style={{color: '#2563eb'}}>
                  Why Choose Us
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 uppercase">
                Why Owners Choose SWAN
              </h2>

              {/* Intro Text */}
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                With over three decades of specialized experience in LPG ship management, SWAN Shipping Corporation has earned the trust of vessel owners worldwide. Our proven track record, combined with our commitment to operational excellence and safety leadership, makes us the preferred partner for LPG vessel owners seeking reliable and cost-effective ship management solutions.
              </p>

              {/* Achievement List */}
              <div className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center">
                        <Check sx={{ fontSize: 16, color: 'white' }} />
                      </div>
                    </div>
                    <p className="text-gray-900 font-semibold text-lg">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Image (40%) */}
            <div className="lg:col-span-2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600"
                  alt="Maritime Professional"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - "EXPLORE, MANAGE, DELIVER" */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left Column - Image (40%) */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600"
                  alt="Maritime Operations"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Right Column - Services List (60%) */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              {/* Label */}
              <div className="mb-4">
                <span className="text-sm font-bold uppercase tracking-wider" style={{color: '#2563eb'}}>
                  Our Mission
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-12 uppercase">
                EXPLORE, MANAGE, DELIVER: YOUR LPG PARTNER
              </h2>

              {/* Services List */}
              <div className="space-y-6">
                {services.map((service, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center uppercase">
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

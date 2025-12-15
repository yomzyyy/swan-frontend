import { useState } from 'react';

/**
 * About Section - Using Tailwind CSS
 *
 * FEATURES:
 * - Tab navigation (Heritage, Innovation, Sustainability)
 * - Two-column layout (image + content)
 * - Stats display
 * - Responsive design
 *
 * NEW TAILWIND CONCEPTS:
 * - Conditional rendering with state
 * - Tab styling with active states
 * - Grid layout for complex designs
 */
const About = () => {
  // State for active tab
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
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          {/*
            TEXT GRADIENT HEADING:
            - text-5xl: Large font size
            - font-extrabold: Very bold
            - bg-gradient-to-r: Horizontal gradient
            - bg-clip-text text-transparent: Makes gradient visible as text
          */}
          <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#001E3C] to-[#003C78] bg-clip-text text-transparent">
            MARITIME EXCELLENCE
            <br />
            SINCE 1994
          </h2>
        </div>

        {/* Tab Navigation */}
        {/*
          FLEX LAYOUT:
          - flex justify-center: Center horizontally
          - gap-4: Space between tab buttons
          - mb-12: Margin bottom
        */}
        <div className="flex justify-center gap-4 mb-12">
          {/*
            TAB BUTTON:
            - px-8 py-3: Padding
            - rounded-full: Fully rounded
            - font-semibold: Bold text
            - transition-all: Smooth transitions
            - Conditional styling: Changes based on activeTab state
          */}
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

        {/* Content Grid - Two Columns */}
        {/*
          RESPONSIVE GRID:
          - grid: Enable CSS Grid
          - grid-cols-1 lg:grid-cols-2: 1 column mobile, 2 columns large screens
          - gap-12: Space between columns
          - items-stretch: Makes items equal height
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

          {/* LEFT - Image */}
          {/*
            IMAGE CONTAINER:
            - rounded-3xl: Large border radius
            - overflow-hidden: Clips content to rounded corners
            - shadow-2xl: Large shadow
            - relative: For absolute positioning of badges
            - h-full: Match height of adjacent column
          */}
          <div className="rounded-3xl overflow-hidden shadow-2xl relative h-full">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"
              alt="Modern building"
              className="w-full h-full object-cover"
            />
            {/*
              BADGES:
              - absolute positioning overlay on image
              - top-6 left-6: Equal padding from top and left
            */}
            <div className="absolute top-6 left-6 flex gap-3">
                <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-800">
                  EST. 1994
                </span>
                <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-800">
                  ISO CERTIFIED
                </span>
              </div>
          </div>

          {/* RIGHT - Content Card */}
          {/*
            CONTENT CARD:
            - bg-[#1a2332]: Dark navy background
            - rounded-3xl: Large border radius
            - p-12: Padding all sides
            - text-white: White text
            - shadow-xl: Extra large shadow
            - flex flex-col: Enables vertical flexbox layout
            - h-full: Match height of adjacent column
          */}
          <div className="bg-[#1a2332] rounded-3xl p-12 text-white shadow-xl flex flex-col h-[650px] transition-all duration-300">
            {/* Badge */}
            <span className="bg-[#207dff] px-4 py-2 rounded-full text-xs font-bold mb-6 uppercase tracking-wide shadow-lg shadow-blue-500/30 self-start">
              {tabContent[activeTab].badge}
            </span>

            {/* Heading */}
            <h3 className="text-4xl font-bold mb-6 leading-tight">
              {tabContent[activeTab].title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-auto text-lg whitespace-pre-line">
              {tabContent[activeTab].body}
            </p>

            {/* Stats Grid */}
            {/*
              STATS GRID:
              - grid grid-cols-2: 2 equal columns
              - gap-8: Space between items
            */}
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

      </div>
    </section>
  );
};

export default About;

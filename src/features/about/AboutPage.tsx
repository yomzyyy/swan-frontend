import React, { useState, useEffect } from 'react';
import Check from '@mui/icons-material/Check';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import HealthAndSafety from '@mui/icons-material/HealthAndSafety';
import Groups from '@mui/icons-material/Groups';
import Build from '@mui/icons-material/Build';
import FactCheck from '@mui/icons-material/FactCheck';
import { useInView, useCountingAnimation } from '../../hooks';
import { parseStatNumber, deepMerge, resolveImageUrl } from '../../utils';
import { SEO } from '../../components/common';
import GetInTouch from '../../components/layout/GetInTouch';
import { aboutDefaults } from '../../constants/aboutDefaults';
import { PAGE_SEO } from '../../constants/seo';
import { api } from '../../services/api';
import type { RefObject } from 'react';
import type { AboutContent, IntroStat, Pillar } from '../../types';

type MuiIcon = typeof HealthAndSafety;

interface PillarWithIcon extends Pillar {
  icon: MuiIcon;
}

// Hardcoded icons mapped by pillar index (MUI components can't serialize to DB)
const PILLAR_ICONS: MuiIcon[] = [HealthAndSafety, Groups, Build, FactCheck];

// StatItem Component - Displays animated statistics
interface StatItemProps {
  stat: IntroStat;
  shouldAnimate: boolean;
}

const StatItem = ({ stat, shouldAnimate }: StatItemProps) => {
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
  const [content, setContent] = useState<AboutContent>(aboutDefaults);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.content.get('about');
        const apiData = response.data.data;
        if (apiData) {
          setContent(deepMerge(aboutDefaults, apiData as unknown as Partial<AboutContent>));
        }
      } catch {
        // Silently fall back to defaults
      }
    };
    fetchContent();
  }, []);

  // Derived data from content
  const heroImage = content.hero.backgroundImage;
  const intro = content.intro;
  const whyChooseUs = content.whyChooseUs;
  const missionVisionData = content.missionVision;
  const president = content.managementTeam.president;
  const teamMembers = content.managementTeam.members;
  const clients = content.clients;

  // Map pillar data with hardcoded icons
  const lgpPillars: PillarWithIcon[] = content.lgpPillars.pillars.map((pillar, i) => ({
    ...pillar,
    icon: PILLAR_ICONS[i] || PILLAR_ICONS[0]
  }));

  // Intersection observer for scroll-triggered animation
  const [statsRef, statsInView] = useInView({ threshold: 0.3 });

  // Mission/Vision state
  const [currentView, setCurrentView] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleViewChange = (newView: number) => {
    if (newView === currentView) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView(newView);
      setIsTransitioning(false);
    }, 300);
  };

  // Carousel state for LPG pillars
  const [currentPillarIndex, setCurrentPillarIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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
      <SEO {...PAGE_SEO.ABOUT} path="/about" />
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(${resolveImageUrl(heroImage)})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Main Title + Circular Stats Section - Combined */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          {/* Label - Outside Grid */}
          <div className="mb-6">
            <span className="text-sm font-bold uppercase tracking-wider" style={{color: '#2563eb'}}>
              {intro.badge}
            </span>
          </div>

          {/* Top Part: Title + Description (Side-by-Side) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Left Column - Heading */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 uppercase leading-tight">
                {intro.title}
              </h1>
            </div>

            {/* Right Column - Description */}
            <div className="space-y-4">
              {intro.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-base text-gray-900 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Bottom Part: Animated Stats */}
          <div
            ref={statsRef as RefObject<HTMLDivElement | null>}
            className="grid grid-cols-1 md:grid-cols-3 gap-16"
          >
            {intro.stats.map((stat, index) => (
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
                  {whyChooseUs.badge}
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase">
                {whyChooseUs.title}
              </h2>

              {/* Intro Text */}
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                {whyChooseUs.description}
              </p>

              {/* Achievement List */}
              <div className="space-y-3">
                {whyChooseUs.bulletItems.map((item, index) => (
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
                  src={resolveImageUrl(whyChooseUs.image)}
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
                src={resolveImageUrl(content.lgpPillars.image)}
                alt="LPG Vessel"
                className="w-full h-[500px] object-cover shadow-lg"
              />
            </div>

            {/* Right Column - Title and Cards */}
            <div className="order-1 lg:order-2">
              {/* Main Heading */}
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12">
                {content.lgpPillars.title}
              </h2>

              {/* Cards Carousel */}
              <div
                className="grid grid-cols-3 gap-4 mb-8 transition-opacity duration-300"
                style={{ opacity: isCarouselTransitioning ? 0 : 1 }}
              >
                {(() => {
                  const visibleCards: React.JSX.Element[] = [];
                  for (let i = 0; i < 3; i++) {
                    const index = (currentPillarIndex + i) % lgpPillars.length;
                    const pillar = lgpPillars[index];
                    const IconComponent = pillar.icon;
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
                            <IconComponent
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
              src={resolveImageUrl(missionVisionData[currentView].image)}
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

      {/* Management Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center uppercase">
            Management Team
          </h2>

          {/* President - Prominent Display */}
          <div className="text-center mb-12 group">
            <div className="mb-4 overflow-hidden inline-block relative">
              <img
                src={resolveImageUrl(president.image)}
                alt={president.name}
                className="w-64 h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Shine overlay */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                              transition-transform duration-700 ease-out
                              bg-gradient-to-r from-transparent via-white/30 to-transparent
                              skew-x-12 pointer-events-none" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{president.name}</h3>
            <p className="text-gray-500 font-medium">{president.position}</p>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="mb-4 overflow-hidden relative">
                  <img
                    src={resolveImageUrl(member.image)}
                    alt={member.name}
                    className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Shine overlay */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                                  transition-transform duration-700 ease-out
                                  bg-gradient-to-r from-transparent via-white/30 to-transparent
                                  skew-x-12 pointer-events-none" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-gray-500 font-medium">{member.position}</p>
              </div>
            ))}
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
            {clients.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                {client.logo ? (
                  <img
                    src={resolveImageUrl(client.logo)}
                    alt={client.name}
                    className="max-h-16 object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-400">
                      LOGO
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {client.name}
                    </div>
                  </div>
                )}
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

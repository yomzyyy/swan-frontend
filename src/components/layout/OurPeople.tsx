import type { RefObject } from 'react';
import { useInView, useCountingAnimation } from '../../hooks';
import { parseStatNumber } from '../../utils';
import { homeDefaults } from '../../constants/homeDefaults';
import type { OurPeopleContent } from '../../types';

interface OurPeopleProps {
  ourPeople?: Partial<OurPeopleContent>;
}

// Brand colors (match the existing public-page palette / design system)
const NAVY = '#0D2136';
const ACCENT = '#2563eb';
const TRACK = '#dbeafe';

// One animated stat counter — the hook must be called per item, so this is its own component.
interface AnimatedStatProps {
  value: string;
  label: string;
  shouldAnimate: boolean;
}

const AnimatedStat = ({ value, label, shouldAnimate }: AnimatedStatProps) => {
  const { number, suffix } = parseStatNumber(value);
  const animated = useCountingAnimation(number, 2000, shouldAnimate);

  return (
    <div className="text-center">
      <div className="text-5xl md:text-6xl font-extrabold mb-2" style={{ color: ACCENT }}>
        {animated}{suffix}
      </div>
      <div className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-600">
        {label}
      </div>
    </div>
  );
};

const OurPeople = ({ ourPeople: ourPeopleProp = {} }: OurPeopleProps) => {
  const d = homeDefaults.ourPeople;
  const badge = ourPeopleProp.badge ?? d.badge;
  const titleLine1 = ourPeopleProp.titleLine1 ?? d.titleLine1;
  const titleLine2 = ourPeopleProp.titleLine2 ?? d.titleLine2;
  const description = ourPeopleProp.description ?? d.description;
  const stats = ourPeopleProp.stats?.length ? ourPeopleProp.stats : d.stats;
  const retentionTitle = ourPeopleProp.retentionTitle ?? d.retentionTitle;
  const retentionRates = ourPeopleProp.retentionRates?.length ? ourPeopleProp.retentionRates : d.retentionRates;
  const footnote = ourPeopleProp.footnote ?? d.footnote;

  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <section className="py-20" style={{ backgroundColor: '#f0f6ff' }}>
      <div ref={ref as RefObject<HTMLDivElement | null>} className="max-w-7xl mx-auto px-8">
        {/* Eyebrow */}
        <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>
          {badge}
        </p>

        {/* Two-tone title */}
        <h2 className="text-4xl md:text-5xl font-black leading-tight mb-3">
          <span style={{ color: NAVY }}>{titleLine1}</span>
          <br />
          <span style={{ color: ACCENT }}>{titleLine2}</span>
        </h2>

        {/* Accent rule */}
        <div className="w-16 h-1 mb-8" style={{ backgroundColor: ACCENT }} />

        {/* Description */}
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mb-16">
          {description}
        </p>

        {/* Stats + retention */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Stat counters (2x2) */}
          <div className="grid grid-cols-2 gap-y-12 gap-x-8">
            {stats.map((stat, index) => (
              <AnimatedStat
                key={index}
                value={stat.number}
                label={stat.label}
                shouldAnimate={inView}
              />
            ))}
          </div>

          {/* Retention rates panel */}
          <div>
            <h3 className="text-base font-bold uppercase tracking-wider mb-6" style={{ color: NAVY }}>
              {retentionTitle}
            </h3>

            <div className="space-y-6">
              {retentionRates.map((rate, index) => {
                const pct = Math.max(0, Math.min(100, parseFloat(rate.percentage) || 0));
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-900">{rate.label}</span>
                      <span className="font-semibold text-gray-700">{rate.percentage}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full" style={{ backgroundColor: TRACK }}>
                      <div
                        className="h-2 rounded-full transition-[width] duration-1000 ease-out"
                        style={{ width: inView ? `${pct}%` : '0%', backgroundColor: ACCENT }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mt-8">
              {footnote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPeople;

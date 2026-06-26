import { useState, useEffect } from 'react';
import DirectionsBoat from '@mui/icons-material/DirectionsBoat';
import Language from '@mui/icons-material/Language';
import Public from '@mui/icons-material/Public';
import { FLEET_STATS as DEFAULT_FLEET_STATS } from '../../constants/metadata';
import { resolveImageUrl } from '../../utils';
import type { FleetStatsContent } from '../../types';

const DEFAULT_BG_IMAGE = '';

interface FleetStatsProps {
  fleetStats?: Partial<FleetStatsContent>;
  loading?: boolean;
}

const FleetStats = ({ fleetStats: fleetStatsProp = {}, loading = false }: FleetStatsProps) => {
  const backgroundImage = fleetStatsProp.backgroundImage || DEFAULT_BG_IMAGE;
  const FLEET_STATS = {
    totalVessels: Number(fleetStatsProp.totalVessels) || DEFAULT_FLEET_STATS.totalVessels,
    maxCapacity: fleetStatsProp.maxCapacity || DEFAULT_FLEET_STATS.maxCapacity,
    avgFleetAge: Number(fleetStatsProp.avgFleetAge) || DEFAULT_FLEET_STATS.avgFleetAge,
    safetyCompliance: fleetStatsProp.safetyCompliance || DEFAULT_FLEET_STATS.safetyCompliance
  };
  const [animatedValues, setAnimatedValues] = useState({
    totalVessels: 0,
    maxCapacity: 0,
    avgFleetAge: 0,
    safetyCompliance: 0
  });

  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();

    const maxCapacityValue = parseInt(FLEET_STATS.maxCapacity) * 1000;
    const currentYear = new Date().getFullYear();
    const avgFleetAgeValue = currentYear - FLEET_STATS.avgFleetAge;

    const startValues = {
      totalVessels: Math.floor(Math.random() * 30),
      maxCapacity: Math.floor(Math.random() * 20000),
      avgFleetAge: Math.floor(Math.random() * 15),
      safetyCompliance: Math.floor(Math.random() * 100)
    };

    const targetValues = {
      totalVessels: FLEET_STATS.totalVessels,
      maxCapacity: maxCapacityValue,
      avgFleetAge: avgFleetAgeValue,
      safetyCompliance: parseInt(FLEET_STATS.safetyCompliance)
    };

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);

      setAnimatedValues({
        totalVessels: Math.floor(
          startValues.totalVessels +
          (targetValues.totalVessels - startValues.totalVessels) * easedProgress
        ),
        maxCapacity: Math.floor(
          startValues.maxCapacity +
          (targetValues.maxCapacity - startValues.maxCapacity) * easedProgress
        ),
        avgFleetAge: Math.floor(
          startValues.avgFleetAge +
          (targetValues.avgFleetAge - startValues.avgFleetAge) * easedProgress
        ),
        safetyCompliance: Math.floor(
          startValues.safetyCompliance +
          (targetValues.safetyCompliance - startValues.safetyCompliance) * easedProgress
        )
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="relative py-20" style={{backgroundColor: '#1a1a1a'}}>
      <div className="absolute inset-0 opacity-20">
        {!loading && backgroundImage && (
          <img
            src={resolveImageUrl(backgroundImage)}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          <div className="flex flex-col items-center py-8 border-r border-gray-600 last:border-r-0">
            <DirectionsBoat sx={{ fontSize: 60, color: 'white', marginBottom: 2 }} />
            <div className="text-5xl font-extrabold mb-3" style={{color: '#2563eb'}}>
              {animatedValues.totalVessels}
            </div>
            <div className="text-white font-semibold text-base">
              {fleetStatsProp.totalVesselsLabel || 'Total Vessels'}
            </div>
          </div>

          <div className="flex flex-col items-center py-8 border-r border-gray-600 last:border-r-0">
            <Language sx={{ fontSize: 60, color: 'white', marginBottom: 2 }} />
            <div className="text-5xl font-extrabold mb-3" style={{color: '#2563eb'}}>
              {Math.floor(animatedValues.maxCapacity / 1000)}K
            </div>
            <div className="text-white font-semibold text-base">
              {fleetStatsProp.maxCapacityLabel || 'Max Capacity CBM'}
            </div>
          </div>

          <div className="flex flex-col items-center py-8 border-r border-gray-600 last:border-r-0">
            <Public sx={{ fontSize: 60, color: 'white', marginBottom: 2 }} />
            <div className="text-5xl font-extrabold mb-3" style={{color: '#2563eb'}}>
              {animatedValues.avgFleetAge}
            </div>
            <div className="text-white font-semibold text-base">
              {fleetStatsProp.avgFleetAgeLabel || 'Avg Fleet Age'}
            </div>
          </div>

          <div className="flex flex-col items-center py-8">
            <DirectionsBoat sx={{ fontSize: 60, color: 'white', marginBottom: 2 }} />
            <div className="text-5xl font-extrabold mb-3" style={{color: '#2563eb'}}>
              {animatedValues.safetyCompliance}%
            </div>
            <div className="text-white font-semibold text-base">
              {fleetStatsProp.safetyComplianceLabel || 'Safety Compliance'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetStats;

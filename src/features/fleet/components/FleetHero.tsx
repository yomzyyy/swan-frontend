import { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { fleetDefaults } from '../../../constants/fleetDefaults';
import { deepMerge, resolveImageUrl } from '../../../utils';
import type { FleetPageContent } from '../../../types';

function FleetHero() {
  const [content, setContent] = useState<FleetPageContent>(fleetDefaults);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.content.get('fleet');
        const apiData = response.data.data;
        if (apiData) {
          setContent(deepMerge(fleetDefaults, apiData as unknown as Partial<FleetPageContent>));
        }
      } catch {
        // Silently fall back to defaults
      }
    };
    fetchContent();
  }, []);

  return (
    <div
      className="relative h-80 md:h-96 bg-cover bg-center"
      style={{
        backgroundImage: `url(${resolveImageUrl(content.hero.backgroundImage)})`,
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
    </div>
  );
}

export default FleetHero;

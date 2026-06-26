import { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { fleetDefaults } from '../../../constants/fleetDefaults';
import { deepMerge } from '../../../utils';
import { ContentImage } from '../../../components/common';
import type { FleetPageContent } from '../../../types';

function FleetHero() {
  const [content, setContent] = useState<FleetPageContent>(fleetDefaults);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="relative h-80 md:h-96">
      <ContentImage src={content.hero.backgroundImage} alt="" loading={loading} fill />
      <div className="absolute inset-0 bg-black/30"></div>
    </div>
  );
}

export default FleetHero;

import { api } from '../../services/api';
import { homeDefaults } from '../../constants/homeDefaults';
import { PAGE_SEO } from '../../constants/seo';
import { deepMerge } from '../../utils';
import { useApiQuery } from '../../hooks';
import { SEO } from '../../components/common';
import Hero from '../../components/layout/Hero';
import About from '../../components/layout/About';
import Services from '../../components/layout/Services';
import FeaturedFleet from '../../components/layout/FeaturedFleet';
import NewsSection from '../../components/layout/NewsSection';
import GetInTouch from '../../components/layout/GetInTouch';
import FleetStats from '../../components/layout/FleetStats';
import type { HomeContent } from '../../types';

const HomePage = () => {
  const { data } = useApiQuery<HomeContent>(
    async () => {
      try {
        const response = await api.content.get('home');
        const apiData = response.data?.data;
        if (apiData) return deepMerge(homeDefaults, apiData as unknown as Partial<HomeContent>);
      } catch {
        // Silently fall back to defaults
      }
      return homeDefaults;
    },
    { initialData: homeDefaults }
  );

  const homeContent = data ?? homeDefaults;

  return (
    <>
      <SEO {...PAGE_SEO.HOME} path="/" />
      <Hero heroText={homeContent.heroText} />
      <About tabContent={homeContent.contentTabs} />
      <FeaturedFleet />
      <FleetStats fleetStats={homeContent.fleetStats} />
      <Services services={homeContent.services} />
      <NewsSection />
      <GetInTouch getInTouch={homeContent.getInTouch} />
    </>
  );
};

export default HomePage;

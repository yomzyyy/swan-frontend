import { api } from '../../services/api';
import { homeDefaults } from '../../constants/homeDefaults';
import { deepMerge } from '../../utils/deepMerge';
import useApiQuery from '../../hooks/useApiQuery';
import Hero from '../../components/layout/Hero';
import About from '../../components/layout/About';
import Services from '../../components/layout/Services';
import FeaturedFleet from '../../components/layout/FeaturedFleet';
import NewsSection from '../../components/layout/NewsSection';
import GetInTouch from '../../components/layout/GetInTouch';
import FleetStats from '../../components/layout/FleetStats';

const HomePage = () => {
  const { data: homeContent } = useApiQuery(
    async () => {
      try {
        const response = await api.content.get('home');
        const data = response.data?.data;
        if (data) return deepMerge(homeDefaults, data);
      } catch {
        // Silently fall back to defaults
      }
      return homeDefaults;
    },
    { initialData: homeDefaults }
  );

  return (
    <>
      <Hero heroText={homeContent.heroText} />
      <About />
      <FeaturedFleet />
      <FleetStats fleetStats={homeContent.fleetStats} />
      <Services services={homeContent.services} />
      <NewsSection />
      <GetInTouch getInTouch={homeContent.getInTouch} />
    </>
  );
};

export default HomePage;

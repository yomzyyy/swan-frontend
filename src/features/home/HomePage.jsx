import Hero from '../../components/layout/Hero';
import About from '../../components/layout/About';
import Services from '../../components/layout/Services';
import FeaturedFleet from '../../components/layout/FeaturedFleet';
import NewsSection from '../../components/layout/NewsSection';
import GetInTouch from '../../components/layout/GetInTouch';
import FleetStats from '../../components/layout/FleetStats';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <FeaturedFleet />
      <FleetStats />
      <Services />
      <NewsSection />
      <GetInTouch />
    </>
  );
};

export default HomePage;

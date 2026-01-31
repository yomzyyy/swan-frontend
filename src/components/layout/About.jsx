import AboutContentSection from './AboutContentSection';

const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <AboutContentSection
          sectionTitle={
            <>
              MARITIME EXCELLENCE
              <br />
              SINCE 1994
            </>
          }
          showSectionTitle={true}
        />
      </div>
    </section>
  );
};

export default About;

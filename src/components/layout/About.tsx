import AboutContentSection from './AboutContentSection';
import type { ContentTabsContent } from '../../types';

interface AboutProps {
  tabContent?: ContentTabsContent;
}

const About = ({ tabContent }: AboutProps) => {
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
          tabContent={tabContent}
        />
      </div>
    </section>
  );
};

export default About;

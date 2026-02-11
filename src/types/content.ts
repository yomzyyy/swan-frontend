// CMS content section types — precise shapes for known content structures
// These match the default constants in src/constants/

export interface HeroTextContent {
  title: string;
  description: string;
  ctaText: string;
}

export interface FleetStatsContent {
  totalVessels: string;
  totalVesselsLabel: string;
  maxCapacity: string;
  maxCapacityLabel: string;
  avgFleetAge: string;
  avgFleetAgeLabel: string;
  safetyCompliance: string;
  safetyComplianceLabel: string;
  backgroundImage: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  image: string;
  category: string;
}

export interface ServicesContent {
  badge?: string;
  title: string;
  items: ServiceItem[];
}

export interface GetInTouchContent {
  badge: string;
  title: string;
  description: string;
  address: string;
  phone: string;
  phone2: string;
  email: string;
}

// Home page content (all sections)
export interface HomeContent {
  heroText: HeroTextContent;
  fleetStats: FleetStatsContent;
  services: ServicesContent;
  getInTouch: GetInTouchContent;
  contentTabs: ContentTabsContent;
}

// About page content
export interface AboutHeroContent {
  backgroundImage: string;
}

export interface IntroStat {
  number: string;
  category: string;
  label: string;
  description: string;
}

export interface IntroContent {
  badge: string;
  title: string;
  paragraphs: string[];
  stats: IntroStat[];
}

export interface WhyChooseUsContent {
  badge: string;
  title: string;
  description: string;
  bulletItems: string[];
  image: string;
}

export interface Pillar {
  title: string;
  description: string;
}

export interface LgpPillarsContent {
  title: string;
  image: string;
  pillars: Pillar[];
}

export interface MissionVisionItem {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface TeamMember {
  name: string;
  position: string;
  image: string;
}

export interface ManagementTeamContent {
  president: TeamMember;
  members: TeamMember[];
}

export interface Client {
  name: string;
  logo: string;
}

export interface ContentTabStat {
  number: string;
  label: string;
}

export interface ContentTab {
  badge: string;
  title: string;
  body: string;
  image: string;
  stats: ContentTabStat[];
}

export interface ContentTabsContent {
  heritage: ContentTab;
  innovation: ContentTab;
  sustainability: ContentTab;
}

export interface AboutContent {
  hero: AboutHeroContent;
  intro: IntroContent;
  whyChooseUs: WhyChooseUsContent;
  lgpPillars: LgpPillarsContent;
  missionVision: MissionVisionItem[];
  managementTeam: ManagementTeamContent;
  clients: Client[];
  contentTabs: ContentTabsContent;
}

// Services page content
export interface ServicesHeroContent {
  backgroundImage: string;
}

export interface ServicesPageContent {
  hero: ServicesHeroContent;
  services: ServicesContent;
}

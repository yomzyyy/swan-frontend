import type { HomeContent, ContentTabsContent } from '../types/content';

const contentTabsDefaults: ContentTabsContent = {
  heritage: {
    badge: 'Our Story',
    title: 'Delivering Trusted LPG Maritime Services for Over 30 Years',
    body: 'For over three decades, Swan Shipping Corporation has been committed to providing safe, efficient, and cost-effective LPG maritime services to customers worldwide.\n',
    image: '',
    stats: [
      { number: '19', label: 'Modern Vessels' },
      { number: '50+', label: 'Global Ports' }
    ]
  },
  innovation: {
    badge: 'Our Approach',
    title: 'Modern Solutions for Evolving Maritime Needs',
    body: 'We continuously adapt to changing maritime regulations and industry standards by integrating modern ship management practices, technical expertise, and operational efficiency to support safe LPG transport worldwide.',
    image: '',
    stats: [
      { number: '19', label: 'Modern Vessels' },
      { number: '50+', label: 'Global Ports' }
    ]
  },
  sustainability: {
    badge: 'Our Commitment',
    title: 'Responsible Operations for Safer Seas',
    body: 'Swan Shipping Corporation is committed to responsible maritime operations by promoting safety, regulatory compliance, and environmentally conscious practices across all vessel management activities.',
    image: '',
    stats: [
      { number: '19', label: 'Modern Vessels' },
      { number: '50+', label: 'Global Ports' }
    ]
  }
};

export const homeDefaults: HomeContent = {
  heroText: {
    title: 'Safety-Driven. Technically Disciplined. Proven in Gas Operations.',
    description:
      'With over 30 years of ship management experience, SWAN Shipping Corporation provides reliable and compliant management for LPG carriers, ensuring safe cargo operations, strong vetting performance, and stable operating costs.',
    ctaText: 'Discover Our Services'
  },
  fleetStats: {
    totalVessels: '19',
    totalVesselsLabel: 'Total Vessels',
    maxCapacity: '15K',
    maxCapacityLabel: 'Max Capacity CBM',
    avgFleetAge: '2017',
    avgFleetAgeLabel: 'Avg Fleet Age',
    safetyCompliance: '100%',
    safetyComplianceLabel: 'Safety Compliance',
    backgroundImage: ''
  },
  services: {
    badge: 'Services We Provide',
    title: 'Innovating For A Sustainable Tomorrow In LPG Shipping',
    items: [
      {
        title: 'Technical Management (LPG Specific)',
        description:
          'Maintenance and lifecycle management of cargo containment systems, reliquefaction plants, compressors, valves, and safety equipment.',
        image:
          '',
        category: 'LPG SHIPPING'
      },
      {
        title: 'LPG Crew Management',
        description:
          'Selection, training, and retention of LPG-competent officers and crew, including cargo operation and emergency response training.',
        image:
          '',
        category: 'LPG SHIPPING'
      },
      {
        title: 'Safety & Quality Management',
        description:
          'Implementation of ISM, ISPS, and gas-specific operational procedures aligned with industry best practices.',
        image:
          '',
        category: 'LPG SHIPPING'
      },
      {
        title: 'PMS & Dry-Dock Planning',
        description:
          'LPG-specific PMS monitoring, spare parts planning, and dry-dock execution.',
        image:
          '',
        category: 'LPG SHIPPING'
      },
      {
        title: 'Vetting & Terminal Inspection Readiness',
        description:
          'Preparation and support for SIRE, CDI, Class, Flag, and terminal inspections.',
        image:
          '',
        category: 'LPG SHIPPING'
      },
      {
        title: 'Emergency Response & Incident Management',
        description:
          'Immediate response, investigation, and corrective action for LPG-related incidents and near-misses.',
        image:
          '',
        category: 'LPG SHIPPING'
      }
    ]
  },
  ourPeople: {
    badge: 'Our People',
    titleLine1: 'The Heart of Every Vessel',
    titleLine2: 'Is Our Crew.',
    description:
      "Our people are our greatest competitive advantage. Filipino seafarers are globally recognized for competence, dedication, and adaptability — and Swan's crew welfare, training, and retention programs are built to keep the best aboard.",
    stats: [
      { number: '330', label: 'Crew Onboard' },
      { number: '272', label: 'On Relief/Vacation' },
      { number: '152', label: 'Officers Onboard' },
      { number: '178', label: 'Ratings Onboard' }
    ],
    retentionTitle: 'Crew Retention Rates (Dec 2024)',
    retentionRates: [
      { label: 'Senior Officers', percentage: '88.5' },
      { label: 'Junior Officers', percentage: '96.7' },
      { label: 'Ratings', percentage: '98.1' }
    ],
    footnote:
      'Industry-leading retention reflects the Swan culture: a workplace where people are valued, developed, and proud to return voyage after voyage. One Crew. One Standard. Driving Operational Excellence at Sea.'
  },
  getInTouch: {
    badge: 'Get In Touch',
    title:
      'We Are Your Reliable Partners for the Best LPG Maritime Solutions',
    description:
      'From ship management and technical operations to crew training and safety compliance, we offer a wide range of services that meet the unique needs of the LPG maritime industry.',
    address:
      '3F S&L Building, 1500 Roxas Boulevard, Ermita, Manila 1000, Philippines',
    phone: '+63-2-85268718 to 19',
    phone2: '+63-2-85239830',
    email: 'info@swan-manila.com'
  },
  contentTabs: contentTabsDefaults
};

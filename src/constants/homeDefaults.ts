import type { HomeContent } from '../types/content';

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
    backgroundImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920'
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
          'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800',
        category: 'LPG SHIPPING'
      },
      {
        title: 'LPG Crew Management',
        description:
          'Selection, training, and retention of LPG-competent officers and crew, including cargo operation and emergency response training.',
        image:
          'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800',
        category: 'LPG SHIPPING'
      },
      {
        title: 'Safety & Quality Management',
        description:
          'Implementation of ISM, ISPS, and gas-specific operational procedures aligned with industry best practices.',
        image:
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
        category: 'LPG SHIPPING'
      },
      {
        title: 'PMS & Dry-Dock Planning',
        description:
          'LPG-specific PMS monitoring, spare parts planning, and dry-dock execution.',
        image:
          'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800',
        category: 'LPG SHIPPING'
      },
      {
        title: 'Vetting & Terminal Inspection Readiness',
        description:
          'Preparation and support for SIRE, CDI, Class, Flag, and terminal inspections.',
        image:
          'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800',
        category: 'LPG SHIPPING'
      },
      {
        title: 'Emergency Response & Incident Management',
        description:
          'Immediate response, investigation, and corrective action for LPG-related incidents and near-misses.',
        image:
          'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800',
        category: 'LPG SHIPPING'
      }
    ]
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
  }
};

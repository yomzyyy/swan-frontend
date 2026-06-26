import type { ServicesPageContent } from '../types/content';

export const servicesDefaults: ServicesPageContent = {
  hero: {
    backgroundImage: ''
  },

  services: {
    title: 'Explore Our Services',
    items: [
      {
        title: 'Technical Management (LPG Specific)',
        description: 'Maintenance and lifecycle management of cargo containment systems, reliquefaction plants, compressors, valves, and safety equipment.',
        image: '',
        category: 'LPG SHIPPING'
      },
      {
        title: 'LPG Crew Management',
        description: 'Selection, training, and retention of LPG-competent officers and crew, including cargo operation and emergency response training.',
        image: '',
        category: 'LPG SHIPPING'
      },
      {
        title: 'Safety & Quality Management',
        description: 'Implementation of ISM, ISPS, and gas-specific operational procedures aligned with industry best practices.',
        image: '',
        category: 'LPG SHIPPING'
      },
      {
        title: 'PMS & Dry-Dock Planning',
        description: 'LPG-specific PMS monitoring, spare parts planning, and dry-dock execution.',
        image: '',
        category: 'LPG SHIPPING'
      },
      {
        title: 'Vetting & Terminal Inspection Readiness',
        description: 'Preparation and support for SIRE, CDI, Class, Flag, and terminal inspections.',
        image: '',
        category: 'LPG SHIPPING'
      },
      {
        title: 'Emergency Response & Incident Management',
        description: 'Immediate response, investigation, and corrective action for LPG-related incidents and near-misses.',
        image: '',
        category: 'LPG SHIPPING'
      }
    ]
  }
};

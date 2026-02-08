interface JobOpening {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export const jobOpenings: JobOpening[] = [
  {
    id: 1,
    title: 'Marine Engineer',
    department: 'Operations',
    location: 'Manila, Philippines',
    type: 'Full-time',
    description: 'Responsible for ship machinery maintenance and operations.',
  },
  {
    id: 2,
    title: 'Fleet Manager',
    department: 'Management',
    location: 'Manila, Philippines',
    type: 'Full-time',
    description: 'Oversee fleet operations and ensure compliance with maritime regulations.',
  },
  {
    id: 3,
    title: 'Safety Officer',
    department: 'Safety & Compliance',
    location: 'Manila, Philippines',
    type: 'Full-time',
    description: 'Ensure all operations meet international safety standards.',
  },
  {
    id: 4,
    title: 'Deck Officer',
    department: 'Operations',
    location: 'Onboard Vessels',
    type: 'Full-time',
    description: 'Navigation and deck operations on LPG carriers.',
  },
];

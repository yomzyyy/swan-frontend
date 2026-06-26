import type { AboutContent } from '../types/content';

export const aboutDefaults: AboutContent = {
  hero: {
    backgroundImage: ''
  },

  intro: {
    badge: 'About Us',
    title: 'LPG SHIPPING INNOVATORS: DRIVING PROGRESS IN THE INDUSTRY',
    paragraphs: [
      'From ship management and crew operations to technical services and safety compliance, we offer a wide range of products and services that meet the unique needs of the LPG shipping industry.',
      'With over three decades of specialized experience, SWAN has established itself as a trusted partner in LPG vessel management. Our commitment to operational excellence, safety, and environmental stewardship sets us apart in the maritime industry.',
      'We combine deep technical expertise with a culture of continuous improvement, ensuring our clients benefit from industry-leading standards and innovative solutions tailored to the unique challenges of LPG shipping.'
    ],
    stats: [
      {
        number: '19',
        category: 'LPG SHIPPING',
        label: 'Fleet Management',
        description: "We're leading the industry in LPG vessel management"
      },
      {
        number: '30+',
        category: 'LPG SHIPPING',
        label: 'Years of Experience',
        description: "We're helping you navigate maritime excellence"
      },
      {
        number: '100%',
        category: 'LPG SHIPPING',
        label: 'Safety Compliance',
        description: "We're maintaining the highest industry standards"
      }
    ]
  },

  whyChooseUs: {
    badge: 'Why Choose Us',
    title: 'Why Owners Choose SWAN',
    description: 'With over three decades of specialized experience in LPG ship management, we deliver operational excellence and safety leadership for vessel owners worldwide.',
    bulletItems: [
      '30+ years of continuous ship management experience',
      'Strong safety culture with disciplined shore & shipboard operations',
      'Proven cost control & OPEX predictability',
      'Japanese-built vessel expertise',
      'Long-term owner focused partnerships'
    ],
    image: ''
  },

  lgpPillars: {
    title: 'Our LPG Management Pillars',
    image: '',
    pillars: [
      {
        title: 'LPG Safety Culture',
        description: 'Strict adherence to gas safety procedures, permits to work, and emergency preparedness.'
      },
      {
        title: 'Experienced LPG Crew & Management Team',
        description: 'Filipino officers and crew trained and experienced in LPG cargo handling and gas operations.'
      },
      {
        title: 'Cargo System Integrity & Readiness',
        description: 'Continuous monitoring and maintenance of cargo tanks, reliquefaction systems, valves, and safety devices.'
      },
      {
        title: 'Vetting & Terminal Readiness',
        description: 'Strong preparation for OCIMF, CDI, terminal inspections, and charterer requirements.'
      }
    ]
  },

  missionVision: [
    {
      title: 'Our Mission',
      subtitle: 'Empowering Global LPG Trade',
      description: 'To provide efficient, reliable, and tailored ship management solutions that facilitate the safe movement of LPG across the globe, ensuring operational excellence and environmental stewardship.',
      image: ''
    },
    {
      title: 'Our Vision',
      subtitle: 'Leading the Future of LPG Shipping',
      description: 'To be the most trusted and innovative LPG ship management partner, recognized globally for our commitment to safety, sustainability, and delivering exceptional value to vessel owners.',
      image: ''
    }
  ],

  managementTeam: {
    president: {
      name: 'Bong Salas',
      position: 'President',
      image: '',
      description: ''
    },
    members: [
      {
        name: 'Capt Ermer C. Magbanua',
        position: 'General Manager',
        image: '',
        description: ''
      },
      {
        name: 'Capt Joseph N. San Pedro',
        position: 'DPA',
        image: '',
        description: ''
      },
      {
        name: 'CE Abel B. Cataroja',
        position: 'Technical Manager',
        image: '',
        description: ''
      },
      {
        name: 'Capt Randy M. Lacorte',
        position: 'Marine Manager',
        image: '',
        description: ''
      },
      {
        name: 'Ms Beth D. Ramirez',
        position: 'Admin',
        image: '',
        description: ''
      },
      {
        name: 'Ms Bel Mapalad',
        position: 'Accounting',
        image: '',
        description: ''
      },
      {
        name: 'Ms Kriz B. Marquez',
        position: 'Fleet Personnel Officer',
        image: '',
        description: ''
      }
    ]
  },

  clients: [
    { name: 'Client 1', logo: '' },
    { name: 'Client 2', logo: '' },
    { name: 'Client 3', logo: '' },
    { name: 'Client 4', logo: '' },
    { name: 'Client 5', logo: '' },
    { name: 'Client 6', logo: '' }
  ],

  contentTabs: {
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
  }
};

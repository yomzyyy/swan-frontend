// Domain entity types — mirrors backend API response shapes (not Mongoose docs)
// All IDs are strings (serialized ObjectIds), all timestamps are numbers (Unix ms)

export type VesselType = 'LPG Tanker' | 'Fully Pressurized' | 'Semi-Refrigerated' | 'Refrigerated';

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Temporary';

export type NewsStatus = 'draft' | 'published';

export type UserRole = 'admin';

export interface Fleet {
  id: string;
  name: string;
  type: VesselType;
  capacity: string;
  year: number;
  flag: string;
  tradeArea: string;
  yard: string;
  image: string;
  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string | null;
  hashtags: string[];
  status: NewsStatus;
  publishedAt: number | null;
  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  type: JobType;
  description: string;
  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface HeroImage {
  id: string;
  position: number;
  imageFileId: string;
  altText: string;
  filename: string;
  mimeType: string;
  fileSize: number;
  imageUrl: string;
  uploadedAt: number;
  updatedAt: number;
}

export interface PageContent {
  id: string;
  pageId: string;
  hero: Record<string, unknown> | null;
  intro: Record<string, unknown> | null;
  whyChooseUs: Record<string, unknown> | null;
  lgpPillars: Record<string, unknown> | null;
  missionVision: Record<string, unknown> | null;
  managementTeam: Record<string, unknown> | null;
  clients: Record<string, unknown> | null;
  contentTabs: Record<string, unknown> | null;
  heroText: Record<string, unknown> | null;
  fleetStats: Record<string, unknown> | null;
  services: Record<string, unknown> | null;
  getInTouch: Record<string, unknown> | null;
  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;
}

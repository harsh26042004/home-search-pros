export interface Configuration {
  bhk: string;
  carpetArea: string;
  price: number;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  city: string;
  microMarket: string;
  address: string;
  propertyType: string;
  priceMin: number;
  priceMax: number;
  configurations: Configuration[];
  carpetAreaRange: string;
  reraNumber: string;
  builder: string;
  possessionDate: string;
  status: "ready-to-move" | "under-construction" | "new-launch";
  usps: string[];
  amenities: string[];
  images: string[];
  description: string;
  mapEmbedUrl?: string;
  featured?: boolean;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  project_id?: string;
  project_name?: string;
  budget: string;
  location_pref: string;
  bhk: string;
  purpose: string;
  message: string;
  created_at: string;
  status: "new" | "contacted" | "qualified" | "lost";
  ai_intent_level: "hot" | "warm" | "cold" | null;
  ai_notes: string | null;
  interactions: Interaction[];
}

export interface Interaction {
  date: string;
  note: string;
  by: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage: string;
  author: string;
  publishedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  project: string;
  review: string;
  rating: number;
}

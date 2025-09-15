export type Language = 'fr' | 'en';

export interface BaseProps {
  lang: Language;
}

export interface SlugProps extends BaseProps {
  slug: string;
}

export interface RegionSlugProps extends BaseProps {
  regionSlug: string;
  slug: string;
}

export interface WinerySlugProps extends BaseProps {
  winerySlug: string;
  slug: string;
}

// Content types
export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  description?: string;
  address?: string;
  cuisine?: string;
  priceRange?: string;
  rating?: number;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  author?: string;
  publishedAt?: string;
}

export interface Hotel {
  id: string;
  slug: string;
  name: string;
  description?: string;
  address?: string;
  rating?: number;
  priceRange?: string;
}

export interface Itinerary {
  id: string;
  slug: string;
  regionSlug: string;
  title: string;
  description?: string;
  duration?: string;
  difficulty?: string;
}

export interface Person {
  id: string;
  slug: string;
  name: string;
  bio?: string;
  role?: string;
  specialty?: string;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description?: string;
  ingredients?: string[];
  instructions?: string[];
  difficulty?: string;
  cookingTime?: number;
}

export interface Spirit {
  id: string;
  slug: string;
  name: string;
  description?: string;
  type?: string;
  origin?: string;
  abv?: number;
}

export interface Winery {
  id: string;
  slug: string;
  name: string;
  description?: string;
  region?: string;
  established?: number;
}

export interface Wine {
  id: string;
  slug: string;
  winerySlug: string;
  name: string;
  description?: string;
  vintage?: number;
  type?: string;
  rating?: number;
}

export interface Artisan {
  id: string;
  slug: string;
  name: string;
  description?: string;
  specialty?: string;
  location?: string;
}

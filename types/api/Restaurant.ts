import { ApiPagination } from './Article';
import type { OpeningHour } from '@/types/Time';

export type { OpeningHour };

export interface ApiCity {
  cityName: string;
  slug: string;
}

export interface ApiChef {
  fullName: string;
  slug?: string;
}

export interface ApiSlugLabel {
  libelle: string;
  slug: string;
}

// ─── List item (from GET /api/restaurants) ─────────────────────────────────

export interface ApiRestaurant {
  name: string;
  slug: string;
  codePostale?: string;
  city: ApiCity;
  thumbId: string;
  chef?: ApiChef;
  lieu?: string;
  nbrToques: number;
  noteGM?: number;
  budgetMin?: number;
  budgetMax?: number;
  isSponsorised: boolean;
  cuisines: string[];
  openingHour?: OpeningHour[];
}

export interface ApiRestaurantListResponse {
  data: ApiRestaurant[];
  pagination: ApiPagination;
}

// ─── Filters (from GET /api/restaurants/filters) ───────────────────────────

export interface ApiRestaurantFilters {
  cities:   ApiCity[];
  toques:   number[];
  cuisines: ApiSlugLabel[];
  styles:   ApiSlugLabel[];
  services: ApiSlugLabel[];
}

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

// ─── Detail item (from GET /api/restaurants/:slug) ─────────────────────────

export interface ApiRestaurantDetail {
  name:             string;
  slug:             string;
  adresse?:         string;
  codePostale?:     string;
  city?:            { cityName: string; region?: string };
  latitude?:        string;
  longitude?:       string;
  openingHour:      OpeningHour[];
  thumbId:          string | null;
  imagesSecondaire: string[];
  employes:         { fullName: string; slug: string; thumbId: string | null }[];
  chef?:            { fullName: string; slug: string; thumbId: string | null } | null;
  avisGM?:          string | null;
  nbrToques:        number;
  noteGM?:          number | null;
  budgetMin?:       number | null;
  budgetMax?:       number | null;
  menuItems:        { formuleName: string; price: string; type: string }[];
  tel?:             string | null;
  website?:         string | null;
  reservationLink?: string | null;
  instagram?:       string | null;
  mapsIframe?:      string | null;
  isSponsorised:    boolean;
  createdAt?:       string | null;
  cuisines:         string[];
  styles:           string[];
  services:         string[];
}

// ─── Filters (from GET /api/restaurants/filters) ───────────────────────────

export interface ApiRestaurantFilters {
  cities:   ApiCity[];
  toques:   number[];
  cuisines: ApiSlugLabel[];
  styles:   ApiSlugLabel[];
  services: ApiSlugLabel[];
}

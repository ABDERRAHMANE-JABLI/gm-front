import { ApiPagination } from './Article';

export interface ApiHotelCity {
  cityName: string;
  slug: string;
}

export interface ApiSlugLabel {
  libelle: string;
  slug: string;
}

// ─── List item (from GET /api/hotels) ──────────────────────────────────────

export interface ApiHotel {
  name: string;
  slug: string;
  thumbId: string;
  nbrStars: number;
  noteGM?: number;
  budgetMin?: number;
  isSponsorised: boolean;
  services?: string[];
  lieu?: string;
  nbrToques?: number;
}

export interface ApiHotelListResponse {
  data: ApiHotel[];
  pagination: ApiPagination;
}

// ─── Filters (from GET /api/hotels/filters) ────────────────────────────────

export interface ApiHotelFilters {
  cities:   ApiHotelCity[];
  stars:    number[];
  toques:   number[];
  styles:   ApiSlugLabel[];
  services: ApiSlugLabel[];
}

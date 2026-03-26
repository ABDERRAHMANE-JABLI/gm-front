import { ApiPagination } from './Article';

export interface ApiRiyadCity {
  cityName: string;
  slug: string;
}

export interface ApiRiyadSlugLabel {
  libelle: string;
  slug: string;
}

// ─── List item (from GET /api/riyads) ──────────────────────────────────────

export interface ApiRiyad {
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

export interface ApiRiyadListResponse {
  data: ApiRiyad[];
  pagination: ApiPagination;
}

// ─── Filters (from GET /api/riyads/filters) ────────────────────────────────

export interface ApiRiyadFilters {
  cities:   ApiRiyadCity[];
  stars:    number[];
  toques:   number[];
  styles:   ApiRiyadSlugLabel[];
  services: ApiRiyadSlugLabel[];
}

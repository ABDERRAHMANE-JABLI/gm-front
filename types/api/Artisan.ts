import { ApiPagination } from './Article';

export interface ApiArtisanCity {
  cityName: string;
  slug: string;
}

export interface ApiArtisanSlugLabel {
  libelle: string;
  slug: string;
}

// ─── List item (from GET /api/artisans) ─────────────────────────────────────

export interface ApiArtisan {
  title: string;
  slug: string;
  thumbId: string | null;
  isSponsorised: boolean;
  isSelected: boolean;
  mainActivity: { libelle: string };
  services: string[];
  otherActivities: string[];
  lieu: string;
}

export interface ApiArtisanListResponse {
  data: ApiArtisan[];
  pagination: ApiPagination;
}

// ─── Filters (from GET /api/artisans/filters) ────────────────────────────────

export interface ApiArtisanFilters {
  cities:     ApiArtisanCity[];
  activities: ApiArtisanSlugLabel[];
  services:   ApiArtisanSlugLabel[];
}

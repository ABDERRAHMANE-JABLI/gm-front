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

// ─── Detail item (from GET /api/riyads/:slug) ──────────────────────────────

export interface ApiRiyadDetail {
  name:             string;
  slug?:            string;
  adresse?:         string;
  codePostale?:     string;
  city?:            { cityName: string; region?: string };
  latitude?:        string;
  longitude?:       string;
  thumbId:          string | null;
  mapsIframe?:      string | null;
  imagesSecondaire: string[];
  avisGM?:          string | null;
  nbrStars:         number;
  noteGM?:          number | null;
  budgetMin?:       number | null;
  tel?:             string | null;
  website?:         string | null;
  reservationLink?: string | null;
  instagram?:       string | null;
  isSponsorised:    boolean;
  createdAt?:       string | null;
  styles:           string[];
  services:         string[];
  restaurant?: {
    name:          string;
    slug:          string;
    thumbId?:      string | null;
    nbrToques:     number;
    noteGM?:       number | null;
    budgetMin?:    number | null;
    budgetMax?:    number | null;
    cuisines:      string[];
    chef?:         string | null;
    isSponsorised: boolean;
  } | null;
}

// ─── Filters (from GET /api/riyads/filters) ────────────────────────────────

export interface ApiRiyadFilters {
  cities:   ApiRiyadCity[];
  stars:    number[];
  toques:   number[];
  styles:   ApiRiyadSlugLabel[];
  services: ApiRiyadSlugLabel[];
}

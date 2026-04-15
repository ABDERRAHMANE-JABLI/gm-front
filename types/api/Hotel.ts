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

// ─── Detail item (from GET /api/hotels/:slug) ──────────────────────────────

export interface ApiHotelDetail {
  name:             string;
  slug?:            string;
  adresse?:         string;
  codePostale?:     string;
  city?:            { cityName: string; region?: string };
  latitude?:        string;
  longitude?:       string;
  thumbId:          string | null;
  imagesSecondaire: string[];
  avisGM?:          string | null;
  nbrStars:         number;
  noteGM?:          number | null;
  budgetMin?:       number | null;
  budgetMax?:       number | null;
  tel?:             string | null;
  website?:         string | null;
  reservationLink?: string | null;
  instagram?:       string | null;
  isSponsorised:    boolean;
  createdAt?:       string | null;
  styles:           string[];
  services:         string[];
  restaurant?: {
    name:         string;
    slug:         string;
    thumbId?:     string | null;
    nbrToques:    number;
    noteGM?:      number | null;
    budgetMin?:   number | null;
    budgetMax?:   number | null;
    cuisines:     string[];
    chef?:        string | null;
    isSponsorised: boolean;
  } | null;
}

export interface ApiHotelFilters {
  cities:   ApiHotelCity[];
  stars:    number[];
  toques:   number[];
  styles:   ApiSlugLabel[];
  services: ApiSlugLabel[];
}

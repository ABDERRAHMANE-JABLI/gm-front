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

// ─── Detail item (from GET /api/artisans/:slug) ─────────────────────────────

export interface ApiArtisanDetail {
  title:           string;
  slug:            string;
  thumbId:         string | null;
  mapsIframe?:     string | null;
  latitude?:       string | null;
  longitude?:      string | null;
  imagesSecondaire: string[];
  adresse?:        string | null;
  codePostale?:    string | null;
  city?:           { cityName: string } | null;
  isSponsorised:   boolean;
  isSelected:      boolean;
  avisGM?:         string | null;
  mainActivity:    { libelle: string };
  tel?:            string | null;
  website?:        string | null;
  instagram?:      string | null;
  services:        string[];
  otherActivities: string[];
}

// ─── Filters (from GET /api/artisans/filters) ────────────────────────────────

export interface ApiArtisanFilters {
  cities:     ApiArtisanCity[];
  activities: ApiArtisanSlugLabel[];
  services:   ApiArtisanSlugLabel[];
}

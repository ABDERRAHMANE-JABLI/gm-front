import { ApiPagination } from './Article';


export interface ApiTalentSlugLabel {
  libelle: string;
  slug: string;
}

// ─── List item (from GET /api/talents) ───────────────────────────────────────

export interface ApiTalent {
  fullName: string;
  slug: string;
  thumbId: string | null;
  nbrToques: number | null;
  noteGM: number | null;
  roles: string[];
  chefAt: { name: string }[];
  workplace?: { type: string; name: string } | null;
  awards: string[];
}

export interface ApiTalentListResponse {
  data: ApiTalent[];
  pagination: ApiPagination;
}

// ─── Workplace (shared by list + detail) ─────────────────────────────────────

export interface ApiWorkplace {
  type:          string;
  name:          string;
  slug:          string;
  thumbId:       string | null;
  lieu?:         string;
  // restaurant
  nbrToques?:    number | null;
  noteGM?:       number | null;
  budgetMin?:    number | null;
  budgetMax?:    number | null;
  isSponsorised?: boolean;
  // hotel / riyad
  nbrStars?:     number | null;
  budget?:       number | null;
  // artisan
  tel?:          string | null;
  activity?:     string;
  activities?:   string[];
  services?:     string[];
}

// ─── Detail item (from GET /api/talents/:slug) ───────────────────────────────

export interface ApiTalentDetail {
  fullName:      string;
  slug:          string;
  thumbId:       string | null;
  gendre?:       string | null;
  nbrToques:     number | null;
  noteGM:        number | null;
  roles:         string[];
  awards?:       string[];
  resume?:       string | null;
  presentation?: string | null;
  biographie?:   { year: number; libelle: string }[];
  chefAt: {
    name:          string;
    slug:          string;
    thumbId?:      string | null;
    nbrToques:     number;
    noteGM?:       number | null;
    budgetMin?:    number | null;
    budgetMax?:    number | null;
    isSponsorised: boolean;
    cuisines:      string[];
    lieu?:         string;
  }[];
  workplace?: ApiWorkplace | null;
}

// ─── Filters (from GET /api/talents/filters) ─────────────────────────────────

export interface ApiTalentFilters {
  toques: number[];
  roles:  ApiTalentSlugLabel[];
  awards: ApiTalentSlugLabel[];
}

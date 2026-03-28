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
  role: { role: string } | null;
  chefAt: { name: string }[];
  awards: string[];
}

export interface ApiTalentListResponse {
  data: ApiTalent[];
  pagination: ApiPagination;
}

// ─── Filters (from GET /api/talents/filters) ─────────────────────────────────

export interface ApiTalentFilters {
  toques: number[];
  roles:  ApiTalentSlugLabel[];
  awards: ApiTalentSlugLabel[];
}

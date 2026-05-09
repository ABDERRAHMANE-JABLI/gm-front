import { ApiPagination } from './Article';

// ─── List item (from GET /api/recipes) ───────────────────────────────────────

export interface ApiRecipe {
  title: string;
  slug: string;
  thumbId: string | null;
  resume: string;
  typeRecipe: string;
  difficulty: string;
  chef: {
    fullName: string;
    slug: string;
  } | null;
  restaurant: {
    name: string;
    slug: string;
    lieu: string;
  } | null;
}

export interface ApiRecipeListResponse {
  data: ApiRecipe[];
  pagination: ApiPagination;
}

// ─── Detail item (from GET /api/recipes/:slug) ────────────────────────────────

export interface ApiRecipeDetail {
  title:      string;
  slug:       string;
  thumbId:    string | null;
  resume:     string | null;
  content:    string | null;
  typeRecipe: string | null;
  difficulty: string | null;
  chef: {
    fullName:  string;
    slug:      string;
    thumbId:   string | null;
    nbrToques: number | null;
    noteGM:    number | null;
    awards:    string[];
    roles:     string[];
    workplace: null;
  } | null;
  restaurant: {
    name:          string;
    slug:          string;
    thumbId:       string | null;
    nbrToques:     number;
    noteGM:        number | null;
    isSponsorised: boolean;
    cuisines:      string[];
    budgetMin:     number | null;
    budgetMax:     number | null;
    chef?:         string;
    lieu?:         string;
  } | null;
}

// ─── Filters (from GET /api/recipes/filters) ─────────────────────────────────

export interface ApiRecipeChef {
  libelle: string;
  slug: string;
}

export interface ApiRecipeFilters {
  types:       string[];
  difficulties: string[];
  chefs:       ApiRecipeChef[];
}

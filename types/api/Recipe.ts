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

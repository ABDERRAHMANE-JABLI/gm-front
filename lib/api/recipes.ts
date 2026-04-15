import 'server-only';
import { getApiBaseUrl, getApiHeaders } from './_config';
import { ApiRecipe, ApiRecipeListResponse, ApiRecipeFilters } from '@/types/api/Recipe';
import { ApiPagination } from '@/types/api/Article';
import { RecipeCardProps, RecipeCardButtonKind } from '@/types/Recipe';

const FETCH_TIMEOUT_MS = 8000;
const MAX_LIMIT = 50;

function sanitizePage(page: unknown): number {
  const n = parseInt(String(page), 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

function sanitizeLimit(limit: unknown): number {
  const n = parseInt(String(limit), 10);
  return Number.isFinite(n) && n >= 1 ? Math.min(n, MAX_LIMIT) : 9;
}

function isValidListResponse(body: unknown): body is ApiRecipeListResponse {
  return (
    typeof body === 'object' &&
    body !== null &&
    'data' in body &&
    Array.isArray((body as ApiRecipeListResponse).data) &&
    'pagination' in body
  );
}

// ─── Mapping ────────────────────────────────────────────────────────────────

function mapRecipeToCard(r: ApiRecipe): RecipeCardProps {
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';

  const buttons: RecipeCardProps['buttons'] = [];
  if (r.chef) {
    buttons.push({
      buttonKind: RecipeCardButtonKind.PEOPLE,
      text_line1: r.chef.fullName,
      slug:       r.chef.slug,
      label:      'Chef',
    });
  }
  if (r.restaurant) {
    buttons.push({
      buttonKind: RecipeCardButtonKind.RESTAURANT,
      text_line1: r.restaurant.name,
      text_line2: r.restaurant.lieu,
      slug:       r.restaurant.slug,
      label:      'Restaurant',
    });
  }

  return {
    id:      r.slug,
    title:   r.title,
    resume:  r.resume ?? '',
    slug:    r.slug,
    thumbId: r.thumbId ? `${s3}/${r.thumbId}` : '',
    theme:   r.typeRecipe ? [r.typeRecipe] : undefined,
    buttons: buttons as RecipeCardProps['buttons'],
  };
}

// ─── Options / Result ────────────────────────────────────────────────────────

export interface FetchRecipesOptions {
  page?:       number;
  limit?:      number;
  type?:       string;
  difficulty?: string;
  chef?:       string;
}

export interface FetchRecipesResult {
  recipes:    RecipeCardProps[];
  pagination: ApiPagination;
}

const EMPTY_RESULT: FetchRecipesResult = {
  recipes:    [],
  pagination: { page: 1, limit: 9, total: 0, total_pages: 0 },
};

// ─── fetchRecipes ─────────────────────────────────────────────────────────────

export async function fetchRecipes(
  options: FetchRecipesOptions = {}
): Promise<FetchRecipesResult> {
  const page  = sanitizePage(options.page);
  const limit = sanitizeLimit(options.limit);

  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (options.type)       params.set('type',       options.type);
  if (options.difficulty) params.set('difficulty', options.difficulty);
  if (options.chef)       params.set('chef',       options.chef);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/recipes?${params.toString()}`,
      {
        signal:  controller.signal,
        next:    { tags: ['recipes_list'], revalidate: 3600 },
        headers: getApiHeaders(),
      }
    );

    if (!res.ok) {
      console.error(`[recipes] API responded with ${res.status}`);
      return EMPTY_RESULT;
    }

    const body: unknown = await res.json();
    if (!isValidListResponse(body)) return EMPTY_RESULT;

    return {
      recipes:    body.data.map(mapRecipeToCard),
      pagination: body.pagination,
    };
  } catch {
    return EMPTY_RESULT;
  } finally {
    clearTimeout(timeout);
  }
}

// ─── fetchRecipeFilters ───────────────────────────────────────────────────────

const EMPTY_FILTERS: ApiRecipeFilters = {
  types: [], difficulties: [], chefs: [],
};

export async function fetchRecipeFilters(): Promise<ApiRecipeFilters> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/recipes/filters`,
      {
        signal:  controller.signal,
        next:    { tags: ['recipes_list', 'recipes_filters'], revalidate: 3600 },
        headers: getApiHeaders(),
      }
    );

    if (!res.ok) return EMPTY_FILTERS;

    const body: unknown = await res.json();
    if (typeof body !== 'object' || body === null) return EMPTY_FILTERS;

    const b = body as Partial<ApiRecipeFilters>;
    return {
      types:        Array.isArray(b.types)        ? b.types        : [],
      difficulties: Array.isArray(b.difficulties) ? b.difficulties : [],
      chefs:        Array.isArray(b.chefs)        ? b.chefs        : [],
    };
  } catch {
    return EMPTY_FILTERS;
  } finally {
    clearTimeout(timeout);
  }
}

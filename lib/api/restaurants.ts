import 'server-only';
import { getApiBaseUrl, getApiHeaders } from './_config';
import {
  ApiRestaurant,
  ApiRestaurantListResponse,
  ApiRestaurantFilters,
  ApiRestaurantDetail,
} from '@/types/api/Restaurant';
import { ApiPagination } from '@/types/api/Article';
import { RestaurantCardProps } from '@/types/Restaurant';

const FETCH_TIMEOUT_MS = 8000;
const MAX_LIMIT = 50;

// ─── Helpers ────────────────────────────────────────────────────────────────

function sanitizePage(page: unknown): number {
  const n = parseInt(String(page), 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

function sanitizeLimit(limit: unknown): number {
  const n = parseInt(String(limit), 10);
  return Number.isFinite(n) && n >= 1 ? Math.min(n, MAX_LIMIT) : 9;
}

function isValidListResponse(body: unknown): body is ApiRestaurantListResponse {
  return (
    typeof body === 'object' &&
    body !== null &&
    'data' in body &&
    Array.isArray((body as ApiRestaurantListResponse).data) &&
    'pagination' in body &&
    typeof (body as ApiRestaurantListResponse).pagination === 'object'
  );
}

// ─── Mapping ────────────────────────────────────────────────────────────────

function mapRestaurantToCard(r: ApiRestaurant): RestaurantCardProps {
  const s3BaseUrl = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';

  return {
    title:    r.name,
    slug:     r.slug,
    thumbId:  `${s3BaseUrl}/${r.thumbId}`,
    nbToques:      r.nbrToques,
    isSponsorised: r.isSponsorised,
    note:     r.noteGM !== undefined ? `${r.noteGM}` : undefined,
    chief:    r.chef?.fullName,
    cuisines: r.cuisines,
    budget:   r.budgetMin !== undefined && r.budgetMax !== undefined
      ? `${r.budgetMin} - ${r.budgetMax} MAD`
      : undefined,
    address:      r.lieu,
    openingHours: r.openingHour ?? [],
  };
}

// ─── Fetch options / result ─────────────────────────────────────────────────

export interface FetchRestaurantsOptions {
  page?:     number;
  limit?:    number;
  city?:     string;
  toques?:   number[];
  cuisines?: string[];
  styles?:   string[];
  services?: string[];
}


export interface FetchRestaurantsResult {
  restaurants: RestaurantCardProps[];
  pagination:  ApiPagination;
}

const EMPTY_RESULT: FetchRestaurantsResult = {
  restaurants: [],
  pagination:  { page: 1, limit: 9, total: 0, total_pages: 0 },
};

// ─── fetchRestaurants ───────────────────────────────────────────────────────

export async function fetchRestaurants(
  options: FetchRestaurantsOptions = {}
): Promise<FetchRestaurantsResult> {
  const page  = sanitizePage(options.page);
  const limit = sanitizeLimit(options.limit);

  const params = new URLSearchParams({
    page:  String(page),
    limit: String(limit),
  });
  if (options.city)    params.set('city',    options.city);
  options.services?.forEach((s) => params.append('service[]', s));
  options.toques?.forEach((t)  => params.append('toques[]',  String(t)));
  options.cuisines?.forEach((c) => params.append('cuisine[]', c));
  options.styles?.forEach((s)   => params.append('style[]',   s));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/restaurants?${params.toString()}`,
      {
        signal:  controller.signal,
        next:    { tags: ['restaurants_list'], revalidate: 3600 },
        headers: getApiHeaders(),
      }
    );

    if (!res.ok) {
      console.error(`[restaurants] API responded with ${res.status}`);
      return EMPTY_RESULT;
    }

    const body: unknown = await res.json();

    if (!isValidListResponse(body)) {
      console.error('[restaurants] Unexpected API response shape');
      return EMPTY_RESULT;
    }

    return {
      restaurants: body.data.map(mapRestaurantToCard),
      pagination:  body.pagination,
    };
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('[restaurants] Request timed out');
    } else {
      console.error('[restaurants] Fetch error:', err);
    }
    return EMPTY_RESULT;
  } finally {
    clearTimeout(timeout);
  }
}

// ─── fetchRestaurantFilters ─────────────────────────────────────────────────

export async function fetchRestaurantFilters(): Promise<ApiRestaurantFilters> {
  const EMPTY_FILTERS: ApiRestaurantFilters = {
    cities: [], toques: [], cuisines: [], styles: [], services: [],
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/restaurants/filters`,
      {
        signal:  controller.signal,
        next:    { tags: ['restaurants_list', 'restaurants_filters'], revalidate: 3600 },
        headers: getApiHeaders(),
      }
    );

    if (!res.ok) {
      console.error(`[restaurants/filters] API responded with ${res.status}`);
      return EMPTY_FILTERS;
    }

    const body = await res.json() as Record<string, unknown>;

    if (typeof body !== 'object' || body === null) {
      console.error('[restaurants/filters] Unexpected response shape');
      return EMPTY_FILTERS;
    }

    // Normalise : chaque clé manquante dans l'API devient un tableau vide
    return {
      cities:   Array.isArray(body.cities)   ? body.cities   : [],
      toques:   Array.isArray(body.toques)   ? body.toques   : [],
      cuisines: Array.isArray(body.cuisines) ? body.cuisines : [],
      styles:   Array.isArray(body.styles)   ? body.styles   : [],
      services: Array.isArray(body.services) ? body.services : [],
    } as ApiRestaurantFilters;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('[restaurants/filters] Request timed out');
    } else {
      console.error('[restaurants/filters] Fetch error:', err);
    }
    return EMPTY_FILTERS;
  } finally {
    clearTimeout(timeout);
  }
}

// ─── fetchRestaurantDetail ──────────────────────────────────────────────────

export async function fetchRestaurantDetail(slug: string): Promise<ApiRestaurantDetail | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/restaurants/${slug}`,
      {
        signal:  controller.signal,
        next:    { tags: [`restaurant_${slug}`], revalidate: 3600 },
        headers: getApiHeaders(),
      }
    );

    if (!res.ok) {
      console.error(`[restaurants/detail] API responded with ${res.status}`);
      return null;
    }

    return await res.json() as ApiRestaurantDetail;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('[restaurants/detail] Request timed out');
    } else {
      console.error('[restaurants/detail] Fetch error:', err);
    }
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

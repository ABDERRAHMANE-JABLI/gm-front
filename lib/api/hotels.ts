import 'server-only';
import { getApiBaseUrl, getApiHeaders } from './_config';
import { ApiHotel, ApiHotelListResponse, ApiHotelFilters } from '@/types/api/Hotel';
import { ApiPagination } from '@/types/api/Article';
import { HotelProps } from '@/types/Hotels';

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

function isValidListResponse(body: unknown): body is ApiHotelListResponse {
  return (
    typeof body === 'object' &&
    body !== null &&
    'data' in body &&
    Array.isArray((body as ApiHotelListResponse).data) &&
    'pagination' in body
  );
}

// ─── Mapping ────────────────────────────────────────────────────────────────

function mapHotelToCard(h: ApiHotel): HotelProps {
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';

  return {
    title:              h.name,
    slug:               h.slug,
    thumbId:            `${s3}/${h.thumbId}`,
    isGmSelected:       !h.isSponsorised,
    isSponsorised:      h.isSponsorised,
    nbStars:            h.nbrStars,
    restaurantNbtoques: h.nbrToques,
    services:           h.services ?? [],
    address:            h.lieu,
    budget:             h.budgetMin !== undefined ? `${h.budgetMin} MAD` : undefined,
  };
}

// ─── Options / Result ────────────────────────────────────────────────────────

export interface FetchHotelsOptions {
  page?:     number;
  limit?:    number;
  city?:     string;
  stars?:    number[];
  toques?:   number[];
  styles?:   string[];
  services?: string[];
}

export interface FetchHotelsResult {
  hotels:     HotelProps[];
  pagination: ApiPagination;
}

const EMPTY_RESULT: FetchHotelsResult = {
  hotels:     [],
  pagination: { page: 1, limit: 9, total: 0, total_pages: 0 },
};

// ─── fetchHotels ─────────────────────────────────────────────────────────────

export async function fetchHotels(
  options: FetchHotelsOptions = {}
): Promise<FetchHotelsResult> {
  const page  = sanitizePage(options.page);
  const limit = sanitizeLimit(options.limit);

  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (options.city) params.set('city', options.city);
  options.stars?.forEach((s)    => params.append('stars[]',   String(s)));
  options.toques?.forEach((t)   => params.append('toques[]',  String(t)));
  options.styles?.forEach((s)   => params.append('style[]',   s));
  options.services?.forEach((s) => params.append('service[]', s));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/hotels?${params.toString()}`,
      {
        signal:  controller.signal,
        next:    { revalidate: 3600 },
        headers: getApiHeaders(),
      }
    );

    if (!res.ok) {
      console.error(`[hotels] API responded with ${res.status}`);
      return EMPTY_RESULT;
    }

    const body: unknown = await res.json();
    if (!isValidListResponse(body)) return EMPTY_RESULT;

    return {
      hotels:     body.data.map(mapHotelToCard),
      pagination: body.pagination,
    };
  } catch {
    return EMPTY_RESULT;
  } finally {
    clearTimeout(timeout);
  }
}

// ─── fetchHotelFilters ───────────────────────────────────────────────────────

const EMPTY_FILTERS: ApiHotelFilters = {
  cities: [], stars: [], toques: [], styles: [], services: [],
};

export async function fetchHotelFilters(): Promise<ApiHotelFilters> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/hotels/filters`,
      {
        signal:  controller.signal,
        cache:   'no-store',
        headers: getApiHeaders(),
      }
    );

    if (!res.ok) return EMPTY_FILTERS;

    const body: unknown = await res.json();
    if (typeof body !== 'object' || body === null) return EMPTY_FILTERS;

    const b = body as Partial<ApiHotelFilters>;
    return {
      cities:   Array.isArray(b.cities)   ? b.cities   : [],
      stars:    Array.isArray(b.stars)    ? b.stars    : [],
      toques:   Array.isArray(b.toques)   ? b.toques   : [],
      styles:   Array.isArray(b.styles)   ? b.styles   : [],
      services: Array.isArray(b.services) ? b.services : [],
    };
  } catch {
    return EMPTY_FILTERS;
  } finally {
    clearTimeout(timeout);
  }
}

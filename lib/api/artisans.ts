import 'server-only';
import { getApiBaseUrl, getApiHeaders } from './_config';
import { ApiArtisan, ApiArtisanListResponse, ApiArtisanFilters } from '@/types/api/Artisan';
import { ApiPagination } from '@/types/api/Article';
import { ArtisanProps } from '@/types/Artisans';

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

function isValidListResponse(body: unknown): body is ApiArtisanListResponse {
  return (
    typeof body === 'object' &&
    body !== null &&
    'data' in body &&
    Array.isArray((body as ApiArtisanListResponse).data) &&
    'pagination' in body
  );
}

// ─── Mapping ────────────────────────────────────────────────────────────────

function mapArtisanToCard(a: ApiArtisan): ArtisanProps {
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';

  return {
    title:           a.title,
    slug:            a.slug,
    thumbId:         a.thumbId ? `${s3}/${a.thumbId}` : undefined,
    isGmSelected:    !a.isSponsorised,
    primaryActivity: a.mainActivity?.libelle ?? '',
    otherActivities: a.otherActivities ?? null,
    services:        a.services,
    address:         a.lieu,
  };
}

// ─── Options / Result ────────────────────────────────────────────────────────

export interface FetchArtisansOptions {
  page?:       number;
  limit?:      number;
  city?:       string;
  activities?: string[];
  services?:   string[];
}

export interface FetchArtisansResult {
  artisans:   ArtisanProps[];
  pagination: ApiPagination;
}

const EMPTY_RESULT: FetchArtisansResult = {
  artisans:   [],
  pagination: { page: 1, limit: 9, total: 0, total_pages: 0 },
};

// ─── fetchArtisans ───────────────────────────────────────────────────────────

export async function fetchArtisans(
  options: FetchArtisansOptions = {}
): Promise<FetchArtisansResult> {
  const page  = sanitizePage(options.page);
  const limit = sanitizeLimit(options.limit);

  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (options.city) params.set('city', options.city);
  options.activities?.forEach((a) => params.append('activity', a));
  options.services?.forEach((s)   => params.append('service[]', s));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/artisans?${params.toString()}`,
      {
        signal:  controller.signal,
        next:    { tags: ['artisans_list'], revalidate: 3600 },
        headers: getApiHeaders(),
      }
    );

    if (!res.ok) {
      console.error(`[artisans] API responded with ${res.status}`);
      return EMPTY_RESULT;
    }

    const body: unknown = await res.json();
    if (!isValidListResponse(body)) return EMPTY_RESULT;

    return {
      artisans:   body.data.map(mapArtisanToCard),
      pagination: body.pagination,
    };
  } catch {
    return EMPTY_RESULT;
  } finally {
    clearTimeout(timeout);
  }
}

// ─── fetchArtisanFilters ─────────────────────────────────────────────────────

const EMPTY_FILTERS: ApiArtisanFilters = {
  cities: [], activities: [], services: [],
};

export async function fetchArtisanFilters(): Promise<ApiArtisanFilters> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/artisans/filters`,
      {
        signal:  controller.signal,
        next:    { tags: ['artisans_list', 'artisans_filters'], revalidate: 3600 },
        headers: getApiHeaders(),
      }
    );

    if (!res.ok) return EMPTY_FILTERS;

    const body: unknown = await res.json();
    if (typeof body !== 'object' || body === null) return EMPTY_FILTERS;

    const b = body as Partial<ApiArtisanFilters>;
    return {
      cities:     Array.isArray(b.cities)     ? b.cities     : [],
      activities: Array.isArray(b.activities) ? b.activities : [],
      services:   Array.isArray(b.services)   ? b.services   : [],
    };
  } catch {
    return EMPTY_FILTERS;
  } finally {
    clearTimeout(timeout);
  }
}

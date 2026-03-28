import { ApiTalent, ApiTalentListResponse, ApiTalentFilters } from '@/types/api/Talent';
import { ApiPagination } from '@/types/api/Article';
import PeopleProps from '@/types/Peoples';

const FETCH_TIMEOUT_MS = 8000;
const MAX_LIMIT = 50;

function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) throw new Error('NEXT_PUBLIC_API_URL is not defined');
  return url;
}

function sanitizePage(page: unknown): number {
  const n = parseInt(String(page), 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

function sanitizeLimit(limit: unknown): number {
  const n = parseInt(String(limit), 10);
  return Number.isFinite(n) && n >= 1 ? Math.min(n, MAX_LIMIT) : 9;
}

function isValidListResponse(body: unknown): body is ApiTalentListResponse {
  return (
    typeof body === 'object' &&
    body !== null &&
    'data' in body &&
    Array.isArray((body as ApiTalentListResponse).data) &&
    'pagination' in body
  );
}

// ─── Mapping ────────────────────────────────────────────────────────────────

function mapTalentToCard(t: ApiTalent): PeopleProps {
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';

  return {
    title:              t.fullName,
    slug:               t.slug,
    thumbId:            t.thumbId ? `${s3}/${t.thumbId}` : undefined,
    nbToques:           t.nbrToques ?? undefined,
    note:        t.noteGM != null ? String(t.noteGM) : undefined,
    role:        t.role?.role ? [t.role.role] : undefined,
    distinction: t.awards ?? [],
    chefAt:      t.chefAt ?? [],
  };
}

// ─── Options / Result ────────────────────────────────────────────────────────

export interface FetchTalentsOptions {
  page?:    number;
  limit?:   number;
  toques?:  number[];
  role?:    string;
  award?:   string;
}

export interface FetchTalentsResult {
  talents:    PeopleProps[];
  pagination: ApiPagination;
}

const EMPTY_RESULT: FetchTalentsResult = {
  talents:    [],
  pagination: { page: 1, limit: 9, total: 0, total_pages: 0 },
};

// ─── fetchTalents ─────────────────────────────────────────────────────────────

export async function fetchTalents(
  options: FetchTalentsOptions = {}
): Promise<FetchTalentsResult> {
  const page  = sanitizePage(options.page);
  const limit = sanitizeLimit(options.limit);

  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  options.toques?.forEach((t) => params.append('toque[]', String(t)));
  if (options.role)  params.set('role',  options.role);
  if (options.award) params.set('award', options.award);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/talents?${params.toString()}`,
      {
        signal:  controller.signal,
        next:    { revalidate: 3600 },
        headers: { Accept: 'application/json' },
      }
    );

    if (!res.ok) {
      console.error(`[talents] API responded with ${res.status}`);
      return EMPTY_RESULT;
    }

    const body: unknown = await res.json();
    if (!isValidListResponse(body)) return EMPTY_RESULT;

    return {
      talents:    body.data.map(mapTalentToCard),
      pagination: body.pagination,
    };
  } catch {
    return EMPTY_RESULT;
  } finally {
    clearTimeout(timeout);
  }
}

// ─── fetchTalentFilters ───────────────────────────────────────────────────────

const EMPTY_FILTERS: ApiTalentFilters = {
  toques: [], roles: [], awards: [],
};

export async function fetchTalentFilters(): Promise<ApiTalentFilters> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/talents/filters`,
      {
        signal:  controller.signal,
        next:    { revalidate: 3600 },
        headers: { Accept: 'application/json' },
      }
    );

    if (!res.ok) return EMPTY_FILTERS;

    const body: unknown = await res.json();
    if (typeof body !== 'object' || body === null) return EMPTY_FILTERS;

    const b = body as Partial<ApiTalentFilters>;
    return {
      toques: Array.isArray(b.toques) ? b.toques : [],
      roles:  Array.isArray(b.roles)  ? b.roles  : [],
      awards: Array.isArray(b.awards) ? b.awards : [],
    };
  } catch {
    return EMPTY_FILTERS;
  } finally {
    clearTimeout(timeout);
  }
}

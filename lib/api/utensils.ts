import 'server-only';
import { getApiBaseUrl, getApiHeaders } from './_config';
import { ApiUtensil, ApiUtensilListResponse, ApiUtensilItem, ApiUtensilItemListResponse } from '@/types/api/Utensil';
import { ApiPagination } from '@/types/api/Article';
import { UtensilProps, UtensilItemProps } from '@/types/Utensils';

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

const EMPTY_PAGINATION: ApiPagination = { page: 1, limit: 9, total: 0, total_pages: 0 };

// ─── Collections (/api/ustensils) ────────────────────────────────────────────

function mapUtensilToCard(u: ApiUtensil): UtensilProps {
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';
  return {
    title:   u.name,
    slug:    u.slug,
    thumbId: u.thumbId ? `${s3}/${u.thumbId}` : undefined,
  };
}

export interface FetchUtenstilsOptions {
  page?:  number;
  limit?: number;
}

export interface FetchUtenssilsResult {
  utensils:   UtensilProps[];
  pagination: ApiPagination;
}

export async function fetchUtensils(
  options: FetchUtenstilsOptions = {}
): Promise<FetchUtenssilsResult> {
  const page  = sanitizePage(options.page);
  const limit = sanitizeLimit(options.limit);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    const res = await fetch(
      `${getApiBaseUrl()}/api/ustensils?${params}`,
      { signal: controller.signal, next: { revalidate: 3600 }, headers: getApiHeaders() }
    );

    if (!res.ok) {
      console.error(`[utensils] API responded with ${res.status}`);
      return { utensils: [], pagination: EMPTY_PAGINATION };
    }

    const body: unknown = await res.json();
    if (typeof body !== 'object' || body === null || !('data' in body)) {
      return { utensils: [], pagination: EMPTY_PAGINATION };
    }

    const b = body as ApiUtensilListResponse;
    return {
      utensils:   b.data.map(mapUtensilToCard),
      pagination: b.pagination,
    };
  } catch {
    return { utensils: [], pagination: EMPTY_PAGINATION };
  } finally {
    clearTimeout(timeout);
  }
}

// ─── Items d'une collection (/api/ustensils/:slug) ────────────────────────────

function mapUtensilItemToCard(u: ApiUtensilItem): UtensilItemProps {
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';
  return {
    title:       u.name,
    slug:        u.slug,
    thumbId:     u.thumbId ? `${s3}/${u.thumbId}` : undefined,
    code:        u.refUstensil,
    description: u.description,
  };
}

export interface FetchUtensilItemsOptions {
  page?:  number;
  limit?: number;
}

export interface FetchUtensilItemsResult {
  items:      UtensilItemProps[];
  pagination: ApiPagination;
}

export async function fetchUtensilItems(
  collectionSlug: string,
  options: FetchUtensilItemsOptions = {}
): Promise<FetchUtensilItemsResult> {
  const page  = sanitizePage(options.page);
  const limit = sanitizeLimit(options.limit);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    const res = await fetch(
      `${getApiBaseUrl()}/api/ustensils/${collectionSlug}?${params}`,
      { signal: controller.signal, next: { revalidate: 3600 }, headers: getApiHeaders() }
    );

    if (!res.ok) {
      console.error(`[utensils] items API responded with ${res.status}`);
      return { items: [], pagination: EMPTY_PAGINATION };
    }

    const body: unknown = await res.json();
    if (typeof body !== 'object' || body === null || !('data' in body)) {
      return { items: [], pagination: EMPTY_PAGINATION };
    }

    const b = body as ApiUtensilItemListResponse;
    return {
      items:      b.data.map(mapUtensilItemToCard),
      pagination: b.pagination,
    };
  } catch {
    return { items: [], pagination: EMPTY_PAGINATION };
  } finally {
    clearTimeout(timeout);
  }
}

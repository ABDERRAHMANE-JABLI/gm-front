'use server'
import { sanitizeSearch } from '@/lib/utils/sanitize'

import { fetchRestaurants, FetchRestaurantsOptions, FetchRestaurantsResult } from '@/lib/api/restaurants'
import { getApiBaseUrl, getApiHeaders } from '@/lib/api/_config'

export async function loadMoreRestaurants(opts: FetchRestaurantsOptions): Promise<FetchRestaurantsResult> {
  return fetchRestaurants(opts)
}

export interface RestaurantSearchResult {
  title:   string;
  slug:    string;
  thumbId: string | null;
  address?: string;
}

// GET /api/restaurants/search?q=... → tableau de { name, slug, thumbId, lieu } (max 6)
export async function searchRestaurants(q: string): Promise<RestaurantSearchResult[]> {
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';
  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/restaurants/search?q=${encodeURIComponent(sanitizeSearch(q))}`,
      { headers: getApiHeaders(), cache: 'no-store' }
    );
    if (!res.ok) return [];

    const body: unknown = await res.json();
    if (!Array.isArray(body)) return [];

    return (body as Array<{ name: string; slug: string; thumbId: string | null; lieu?: string }>).map((r) => ({
      title:   r.name,
      slug:    r.slug,
      thumbId: r.thumbId ? `${s3}/${r.thumbId}` : null,
      address: r.lieu,
    }));
  } catch {
    return [];
  }
}

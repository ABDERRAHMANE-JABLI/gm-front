'use server'
import { sanitizeSearch } from '@/lib/utils/sanitize'

import { fetchHotels, FetchHotelsOptions, FetchHotelsResult } from '@/lib/api/hotels'
import { getApiBaseUrl, getApiHeaders } from '@/lib/api/_config'

export async function loadMoreHotels(opts: FetchHotelsOptions): Promise<FetchHotelsResult> {
  return fetchHotels(opts)
}

export interface HotelSearchResult {
  title:       string;
  slug:        string;
  thumbId:     string | null;
  address?:    string;
  entityType?: 'hotel' | 'riad';
}

// GET /api/hotels/search?q=...&type=hotel|riad → tableau de { name, slug, thumbId, lieu, type } (max 6)
export async function searchHotels(q: string, type?: string): Promise<HotelSearchResult[]> {
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';
  try {
    const params = new URLSearchParams({ q: sanitizeSearch(q) });
    if (type) params.set('type', type);
    const res = await fetch(
      `${getApiBaseUrl()}/api/hotels/search?${params.toString()}`,
      { headers: getApiHeaders(), cache: 'no-store' }
    );
    if (!res.ok) return [];

    const body: unknown = await res.json();
    if (!Array.isArray(body)) return [];

    return (body as Array<{ name: string; slug: string; thumbId: string | null; lieu?: string; type?: 'hotel' | 'riad' }>).map((h) => ({
      title:      h.name,
      slug:       h.slug,
      thumbId:    h.thumbId ? `${s3}/${h.thumbId}` : null,
      address:    h.lieu,
      entityType: h.type,
    }));
  } catch {
    return [];
  }
}

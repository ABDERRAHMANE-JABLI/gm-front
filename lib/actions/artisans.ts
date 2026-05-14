'use server'

import { fetchArtisans, FetchArtisansOptions, FetchArtisansResult } from '@/lib/api/artisans'
import { getApiBaseUrl, getApiHeaders } from '@/lib/api/_config'

export async function loadMoreArtisans(opts: FetchArtisansOptions): Promise<FetchArtisansResult> {
  return fetchArtisans(opts)
}

export interface ArtisanSearchResult {
  name:     string;
  slug:     string;
  thumbId:  string | null;
  activity: string;
  lieu:     string;
}

export async function searchArtisans(q: string): Promise<ArtisanSearchResult[]> {
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';
  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/artisans/search?q=${encodeURIComponent(q)}`,
      { headers: getApiHeaders(), cache: 'no-store' }
    );
    if (!res.ok) return [];
    const body: unknown = await res.json();
    const items: ArtisanSearchResult[] = Array.isArray(body)
      ? body
      : Array.isArray((body as { data?: ArtisanSearchResult[] }).data)
        ? (body as { data: ArtisanSearchResult[] }).data
        : [];

    return items.map((a) => ({
      ...a,
      thumbId: a.thumbId ? `${s3}/${a.thumbId}` : null,
    }));
  } catch {
    return [];
  }
}

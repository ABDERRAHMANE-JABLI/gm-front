'use server'

import { fetchTalents, FetchTalentsOptions, FetchTalentsResult } from '@/lib/api/talents'
import { getApiBaseUrl, getApiHeaders } from '@/lib/api/_config'

export async function loadMoreTalents(opts: FetchTalentsOptions): Promise<FetchTalentsResult> {
  return fetchTalents(opts)
}

export interface TalentSearchResult {
  fullName:  string;
  slug:      string;
  thumbId?:  string;
  roles:     string[];
  chefAt:    { name: string } | null;
  workplace: { type: string; name: string } | null;
}

export async function searchTalents(q: string): Promise<TalentSearchResult[]> {
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';
  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/talents/search?q=${encodeURIComponent(q)}`,
      { headers: getApiHeaders(), cache: 'no-store' }
    );
    if (!res.ok) return [];
    const body: unknown = await res.json();
    const items: TalentSearchResult[] = Array.isArray(body)
      ? body
      : Array.isArray((body as { data?: TalentSearchResult[] }).data)
        ? (body as { data: TalentSearchResult[] }).data
        : [];

    return items.map((t) => ({
      ...t,
      thumbId: t.thumbId ? `${s3}/${t.thumbId}` : undefined,
    }));
  } catch {
    return [];
  }
}


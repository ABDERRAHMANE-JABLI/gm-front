'use server'

import { fetchRecipes, FetchRecipesOptions, FetchRecipesResult } from '@/lib/api/recipes'
import { getApiBaseUrl, getApiHeaders } from '@/lib/api/_config'

export async function loadMoreRecipes(opts: FetchRecipesOptions): Promise<FetchRecipesResult> {
  return fetchRecipes(opts)
}

export interface RecipeSearchResult {
  title:   string;
  slug:    string;
  thumbId: string | null;
  chef:    string;
}

export async function searchRecipes(q: string): Promise<RecipeSearchResult[]> {
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';
  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/recipes/search?q=${encodeURIComponent(q)}`,
      { headers: getApiHeaders(), cache: 'no-store' }
    );
    if (!res.ok) return [];
    const body: unknown = await res.json();
    const items: RecipeSearchResult[] = Array.isArray(body)
      ? body
      : Array.isArray((body as { data?: RecipeSearchResult[] }).data)
        ? (body as { data: RecipeSearchResult[] }).data
        : [];

    return items.map((r) => ({
      ...r,
      thumbId: r.thumbId ? `${s3}/${r.thumbId}` : null,
    }));
  } catch {
    return [];
  }
}

'use server'

import { fetchArticles, FetchArticlesOptions, FetchArticlesResult } from '@/lib/api/articles'
import { getApiBaseUrl, getApiHeaders } from '@/lib/api/_config'
import { NewsCardProps } from '@/types/News'
import { ApiArticle } from '@/types/api/Article'

export async function loadMoreArticles(opts: FetchArticlesOptions): Promise<FetchArticlesResult> {
  return fetchArticles(opts)
}

export async function searchArticles(q: string): Promise<NewsCardProps[]> {
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? ''
  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/articles/search?q=${encodeURIComponent(q)}`,
      { headers: getApiHeaders(), cache: 'no-store' }
    )
    if (!res.ok) return []
    const body: unknown = await res.json()
    const items: ApiArticle[] = Array.isArray(body)
      ? body
      : Array.isArray((body as { data?: ApiArticle[] }).data)
        ? (body as { data: ApiArticle[] }).data
        : []

    return items.map((a) => ({
      id:      a.slug,
      title:   a.title,
      slug:    a.slug,
      resume:  a.resume,
      thumbId: a.thumbId ? `${s3}/${a.thumbId}` : '',
      theme:   a.theme ?? undefined,
      buttons: [],
    }))
  } catch {
    return []
  }
}

'use server'

import { fetchArticles, FetchArticlesOptions, FetchArticlesResult } from '@/lib/api/articles'

export async function loadMoreArticles(opts: FetchArticlesOptions): Promise<FetchArticlesResult> {
  return fetchArticles(opts)
}

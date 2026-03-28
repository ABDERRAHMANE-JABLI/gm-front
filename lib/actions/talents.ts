'use server'

import { fetchTalents, FetchTalentsOptions, FetchTalentsResult } from '@/lib/api/talents'

export async function loadMoreTalents(opts: FetchTalentsOptions): Promise<FetchTalentsResult> {
  return fetchTalents(opts)
}

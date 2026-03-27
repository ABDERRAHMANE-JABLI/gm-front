'use server'

import { fetchRiyads, FetchRiyadsOptions, FetchRiyadsResult } from '@/lib/api/riyads'

export async function loadMoreRiyads(opts: FetchRiyadsOptions): Promise<FetchRiyadsResult> {
  return fetchRiyads(opts)
}

'use server'

import { fetchHotels, FetchHotelsOptions, FetchHotelsResult } from '@/lib/api/hotels'

export async function loadMoreHotels(opts: FetchHotelsOptions): Promise<FetchHotelsResult> {
  return fetchHotels(opts)
}

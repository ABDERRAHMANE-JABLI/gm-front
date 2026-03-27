'use server'

import { fetchArtisans, FetchArtisansOptions, FetchArtisansResult } from '@/lib/api/artisans'

export async function loadMoreArtisans(opts: FetchArtisansOptions): Promise<FetchArtisansResult> {
  return fetchArtisans(opts)
}

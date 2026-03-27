'use server'

import { fetchRestaurants, FetchRestaurantsOptions, FetchRestaurantsResult } from '@/lib/api/restaurants'

export async function loadMoreRestaurants(opts: FetchRestaurantsOptions): Promise<FetchRestaurantsResult> {
  return fetchRestaurants(opts)
}

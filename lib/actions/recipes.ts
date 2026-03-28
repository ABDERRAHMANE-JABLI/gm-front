'use server'

import { fetchRecipes, FetchRecipesOptions, FetchRecipesResult } from '@/lib/api/recipes'

export async function loadMoreRecipes(opts: FetchRecipesOptions): Promise<FetchRecipesResult> {
  return fetchRecipes(opts)
}

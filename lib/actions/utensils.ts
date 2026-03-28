'use server'

import {
  fetchUtensils, FetchUtenstilsOptions, FetchUtenssilsResult,
  fetchUtensilItems, FetchUtensilItemsOptions, FetchUtensilItemsResult,
} from '@/lib/api/utensils';

export async function loadMoreUtensils(opts: FetchUtenstilsOptions): Promise<FetchUtenssilsResult> {
  return fetchUtensils(opts);
}

export async function loadMoreUtensilItems(
  slug: string,
  opts: FetchUtensilItemsOptions
): Promise<FetchUtensilItemsResult> {
  return fetchUtensilItems(slug, opts);
}

import 'server-only';
import { cache } from 'react';
import { getApiBaseUrl, getApiHeaders } from './_config';
import { ApiPartner, ApiPartnersResponse } from '@/types/api/Partner';

export type { ApiPartner };

async function fetchPartnersPage(page: number): Promise<ApiPartnersResponse | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/partners?page=${page}`,
      {
        signal: controller.signal,
        headers: getApiHeaders(),
        next: { tags: ['partners'], revalidate: 86400 },
      }
    );
    if (!res.ok) return null;
    return await res.json() as ApiPartnersResponse;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export const fetchPartners = cache(async (): Promise<ApiPartner[]> => {
  const first = await fetchPartnersPage(1);
  if (!first || !Array.isArray(first.data)) return [];

  // Une seule page → terminé
  if ((first.totalPages ?? 1) <= 1) return first.data;

  // Pages 2..totalPages récupérées en parallèle (piloté par totalPages de l'API)
  const rest = await Promise.all(
    Array.from({ length: first.totalPages - 1 }, (_, i) => fetchPartnersPage(i + 2))
  );

  return [first.data, ...rest.map((r) => r?.data ?? [])].flat();
});

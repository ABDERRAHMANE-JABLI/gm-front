import 'server-only';
import { cache } from 'react';
import { getApiBaseUrl, getApiHeaders } from './_config';
import { ApiPartner, ApiPartnersResponse } from '@/types/api/Partner';

export type { ApiPartner };

export const fetchPartners = cache(async (): Promise<ApiPartner[]> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/partners`,
      {
        signal: controller.signal,
        headers: getApiHeaders(),
        next: { tags: ['partners'], revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const body = await res.json() as ApiPartnersResponse;
    return Array.isArray(body.data) ? body.data : [];
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
});

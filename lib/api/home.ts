import 'server-only';
import { getApiBaseUrl, getApiHeaders } from './_config';
import { HomeApiResponse, HomeSectionItem } from '@/types/api/Home';

function prefixThumb(s3: string, item: HomeSectionItem | null): HomeSectionItem | null {
  if (!item) return null;
  return { ...item, thumbId: item.thumbId ? `${s3}/${item.thumbId}` : null };
}

export async function fetchHomeSections(): Promise<HomeApiResponse | null> {
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';
  try {
    const res = await fetch(`${getApiBaseUrl()}/api/home/sections`, {
      headers: getApiHeaders(),
      next: { tags: ['home'], revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data: HomeApiResponse = await res.json();

    return {
      ...data,
      sections: data.sections.map((s) => ({
        ...s,
        pubThumbId: s.pubThumbId ? `${s3}/${s.pubThumbId}` : null,
        main:       prefixThumb(s3, s.main),
        secondary:  prefixThumb(s3, s.secondary),
        tertiary:   prefixThumb(s3, s.tertiary),
      })),
    };
  } catch {
    return null;
  }
}

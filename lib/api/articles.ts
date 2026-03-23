import { ApiArticle, ApiArticleListResponse, ApiArticleFilters, ApiTheme, ApiPagination } from '@/types/api/Article';
import { NewsCardProps, NewsCardButtonProps, NewsCardButtonKind } from '@/types/News';

const FETCH_TIMEOUT_MS = 8000;
const MAX_LIMIT = 50;

// ─── Validation ────────────────────────────────────────────────────────────────

function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) throw new Error('NEXT_PUBLIC_API_URL is not defined');
  return url;
}

function sanitizePage(page: unknown): number {
  const n = parseInt(String(page), 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

function sanitizeLimit(limit: unknown): number {
  const n = parseInt(String(limit), 10);
  return Number.isFinite(n) && n >= 1 ? Math.min(n, MAX_LIMIT) : 9;
}

function isValidApiResponse(body: unknown): body is ApiArticleListResponse {
  return (
    typeof body === 'object' &&
    body !== null &&
    'data' in body &&
    Array.isArray((body as ApiArticleListResponse).data) &&
    'pagination' in body &&
    typeof (body as ApiArticleListResponse).pagination === 'object'
  );
}

// ─── Mapping ───────────────────────────────────────────────────────────────────

function buildButtons(article: ApiArticle): NewsCardProps['buttons'] {
  const candidates: NewsCardButtonProps[] = [];

  if (article.restaurant?.slug) {
    candidates.push({
      buttonKind: NewsCardButtonKind.RESTAURANT,
      text_line1: article.restaurant.name ?? article.restaurant.slug,
      slug: article.restaurant.slug,
    });
  }
  if (article.talent?.slug) {
    candidates.push({
      buttonKind: NewsCardButtonKind.PEOPLE,
      text_line1: article.talent.fullName ?? article.talent.slug,
      slug: article.talent.slug,
    });
  }
  if (article.hotel?.slug) {
    candidates.push({
      buttonKind: NewsCardButtonKind.HOTEL,
      text_line1: article.hotel.name ?? article.hotel.slug,
      slug: article.hotel.slug,
    });
  }
  if (article.riyad?.slug) {
    candidates.push({
      buttonKind: NewsCardButtonKind.RIYAD,
      text_line1: article.riyad.name ?? article.riyad.slug,
      slug: article.riyad.slug,
    });
  }
  if (article.artisan?.slug) {
    candidates.push({
      buttonKind: NewsCardButtonKind.ARTISAN,
      text_line1: article.artisan.title ?? article.artisan.slug,
      slug: article.artisan.slug,
    });
  }

  return candidates.slice(0, 2) as NewsCardProps['buttons'];
}

function mapArticleToCard(article: ApiArticle): NewsCardProps {
  const s3BaseUrl = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';

  return {
    id: article.slug,
    title: article.title,
    slug: article.slug,
    resume: article.resume,
    thumbId: `${s3BaseUrl}/${article.thumbId}`,
    theme: article.theme ? [article.theme.libelle] : [],
    buttons: buildButtons(article),
  };
}

// ─── Fetch ─────────────────────────────────────────────────────────────────────

export interface FetchArticlesOptions {
  page?: number;
  limit?: number;
  theme?: string;
}

export interface FetchArticlesResult {
  articles: NewsCardProps[];
  pagination: ApiPagination;
}

const EMPTY_RESULT: FetchArticlesResult = {
  articles: [],
  pagination: { page: 1, limit: 9, total: 0, total_pages: 0 },
};

export async function fetchArticleFilters(): Promise<ApiTheme[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/articles/filters`,
      {
        signal: controller.signal,
        next:   { revalidate: 3600 },
        headers: { Accept: 'application/json' },
      }
    );

    if (!res.ok) {
      console.error(`[articles/filters] API responded with ${res.status}`);
      return [];
    }

    const body: unknown = await res.json();

    if (
      typeof body !== 'object' || body === null ||
      !Array.isArray((body as ApiArticleFilters).themes)
    ) {
      console.error('[articles/filters] Unexpected response shape');
      return [];
    }

    return (body as ApiArticleFilters).themes;

  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('[articles/filters] Request timed out');
    } else {
      console.error('[articles/filters] Fetch error:', err);
    }
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchArticles(options: FetchArticlesOptions = {}): Promise<FetchArticlesResult> {
  const page  = sanitizePage(options.page);
  const limit = sanitizeLimit(options.limit);

  const params = new URLSearchParams({
    page:  String(page),
    limit: String(limit),
  });
  if (options.theme) params.set('theme[]', options.theme);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(
      `${getApiBaseUrl()}/api/articles?${params.toString()}`,
      {
        signal: controller.signal,
        next:   { revalidate: 3600 },
        headers: { Accept: 'application/json' },
      }
    );

    if (!res.ok) {
      console.error(`[articles] API responded with ${res.status}`);
      return EMPTY_RESULT;
    }

    const body: unknown = await res.json();

    if (!isValidApiResponse(body)) {
      console.error('[articles] Unexpected API response shape');
      return EMPTY_RESULT;
    }

    return {
      articles:   body.data.map(mapArticleToCard),
      pagination: body.pagination,
    };

  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('[articles] Request timed out');
    } else {
      console.error('[articles] Fetch error:', err);
    }
    return EMPTY_RESULT;
  } finally {
    clearTimeout(timeout);
  }
}

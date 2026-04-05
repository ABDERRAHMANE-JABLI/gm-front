import 'server-only';

export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) throw new Error('NEXT_PUBLIC_API_URL is not defined');
  return url;
}

export function getApiHeaders(): HeadersInit {
  const key = process.env.API_KEY;
  if (!key) throw new Error('API_KEY is not defined');
  return {
    'Accept':    'application/json',
    'x-api-key': key,
  };
}

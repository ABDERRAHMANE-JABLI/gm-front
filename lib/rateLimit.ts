import type { NextRequest } from 'next/server';

interface Bucket {
  count: number;
  resetAt: number;
}

const store = new Map<string, Bucket>();

/**
 * Limiteur de débit en mémoire (par instance). Suffisant comme défense en
 * profondeur contre le brute-force / abus. Pour un vrai rate-limit distribué,
 * brancher Redis.
 *
 * @returns true si la requête est autorisée, false si la limite est dépassée.
 */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = store.get(key);

  if (!bucket || now > bucket.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= max) return false;
  bucket.count++;
  return true;
}

/**
 * Extrait l'IP cliente d'une requête derrière un reverse proxy.
 * On prend la dernière valeur de X-Forwarded-For (ajoutée par notre proxy de
 * confiance), moins falsifiable que la première (fournie par le client).
 */
export function getClientIp(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) {
    const parts = xff.split(',').map((s) => s.trim()).filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

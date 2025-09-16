import { NextRequest, NextResponse } from 'next/server';

// Language conversion matrix: simple language code to full locale
const LANGUAGE_LOCALE_MAP: Record<string, string> = {
  "fr": "fr-FR",
  "en": "en-US"
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  
  // Get hostname and extract country from subdomain
  const hostname = request.headers.get('host') || '';
  let country = 'FR'; // default country
  
  // Extract country from subdomain for different domain patterns
  // Supports: fr.gm.wip (FR), us.gm.wip (US), de.gm.wip (DE), etc.
  const hostParts = hostname.split('.');
  const subdomain = hostParts[0];
  
  // Check if it's a supported domain pattern
  const isGmWipDomain = hostname.includes('.gm.wip');
  const isGaultMillauDomain = hostname.includes('.gaultmillau.com');
  const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1');
  
  if (isGmWipDomain || isGaultMillauDomain || isLocalhost) {
    if (subdomain && subdomain.length === 2) {
      country = subdomain.toUpperCase(); // e.g., 'fr' -> 'FR', 'us' -> 'US'
    }
  } else {
    // For other domains, still extract country from subdomain if valid
    if (subdomain && subdomain.length === 2) {
      country = subdomain.toUpperCase();
    }
  }
  
  // Check if path already starts with language code
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  const normalizedFirstSegment = firstSegment?.toLowerCase();
  
  // Handle root path - redirect to default language based on country
  if (pathname === '/') {
    // Default language mapping based on country
    const defaultLanguage = country === 'FR' ? 'fr' : 'en';
    url.pathname = `/${defaultLanguage}`;
    return NextResponse.redirect(url);
  }
  
  // If no language in path, add default language based on country
  if (!['fr', 'en'].includes(normalizedFirstSegment)) {
    const defaultLanguage = country === 'FR' ? 'fr' : 'en';
    url.pathname = `/${defaultLanguage}${pathname}`;
    return NextResponse.redirect(url);
  }
  
  // If language segment is not normalized (e.g., /FR/ instead of /fr/), redirect to lowercase
  if (firstSegment && normalizedFirstSegment !== firstSegment && ['fr', 'en'].includes(normalizedFirstSegment)) {
    const restOfPath = pathSegments.slice(1).join('/');
    url.pathname = `/${normalizedFirstSegment}${restOfPath ? '/' + restOfPath : ''}`;
    return NextResponse.redirect(url);
  }
  
  // Add country and language headers for server components
  const response = NextResponse.next();
  const currentLanguage = normalizedFirstSegment || 'en';
  const fullLocale = LANGUAGE_LOCALE_MAP[currentLanguage] || 'en-US';
  
  response.headers.set('x-country', country.toUpperCase()); // Ensure country is always uppercase
  response.headers.set('x-language', currentLanguage); // Ensure language is always lowercase (fr, en)
  response.headers.set('x-locale', fullLocale); // Full locale identifier (fr-FR, en-US)
  response.headers.set('x-hostname', hostname);
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

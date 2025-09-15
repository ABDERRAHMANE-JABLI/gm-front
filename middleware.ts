import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  
  // Get hostname and extract country from subdomain
  const hostname = request.headers.get('host') || '';
  let country = 'fr'; // default country
  
  // Extract country from subdomain (e.g., fr.gaultmillau.com -> fr)
  const subdomain = hostname.split('.')[0];
  if (subdomain && subdomain.length === 2) {
    country = subdomain;
  }
  
  // Handle root path - redirect to language-specific path
  if (pathname === '/') {
    url.pathname = `/${country}`;
    return NextResponse.redirect(url);
  }
  
  // Check if path already starts with language code
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  
  // If no language in path, add country as language
  if (!['fr', 'en'].includes(firstSegment)) {
    url.pathname = `/${country}${pathname}`;
    return NextResponse.redirect(url);
  }
  
  // Add country and language headers for server components
  const response = NextResponse.next();
  response.headers.set('x-country', country);
  response.headers.set('x-language', firstSegment);
  
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

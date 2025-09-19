import { NextRequest } from 'next/server';

/**
 * API token for authentication
 * @description Environment variable containing the API authentication token
 */
const API_TOKEN = process.env.API_TOKEN;

if (!API_TOKEN) {
  console.warn('⚠️ API_TOKEN environment variable is not set');
}

/**
 * Result of an authentication attempt
 * @description Contains success status and optional error message for authentication operations
 * @example
 * ```typescript
 * const result: AuthenticationResult = {
 *   success: true
 * };
 * 
 * // Or with error
 * const failedResult: AuthenticationResult = {
 *   success: false,
 *   error: 'Invalid token'
 * };
 * ```
 */
export interface AuthenticationResult {
  /** @description Whether authentication was successful */
  success: boolean;
  /** @description Error message if authentication failed */
  error?: string;
}

/**
 * Validates an API token against the configured token
 * @param token - Token to validate (can be null)
 * @returns Authentication result with success status and optional error
 * @example
 * ```typescript
 * const result = validateApiToken('my-secret-token');
 * if (result.success) {
 *   console.log('Token is valid');
 * } else {
 *   console.error('Authentication failed:', result.error);
 * }
 * ```
 */
export function validateApiToken(token: string | null): AuthenticationResult {
  if (!API_TOKEN) {
    return {
      success: false,
      error: 'API authentication is not configured'
    };
  }

  if (!token) {
    return {
      success: false,
      error: 'API token is required'
    };
  }

  if (token !== API_TOKEN) {
    return {
      success: false,
      error: 'Invalid API token'
    };
  }

  return { success: true };
}

/**
 * Extracts authentication token from various request sources
 * @param request - Next.js request object
 * @returns Extracted token or null if not found
 * @description Checks for token in Authorization header (Bearer), x-api-token header, and query parameters
 * @example
 * ```typescript
 * const token = extractTokenFromRequest(request);
 * if (token) {
 *   console.log('Found token:', token);
 * }
 * 
 * // Token sources (in order of priority):
 * // 1. Authorization: Bearer <token>
 * // 2. x-api-token: <token>
 * // 3. ?token=<token> query parameter
 * ```
 */
export function extractTokenFromRequest(request: NextRequest): string | null {
  // Try Authorization header first (Bearer token)
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Try x-api-token header
  const apiTokenHeader = request.headers.get('x-api-token');
  if (apiTokenHeader) {
    return apiTokenHeader;
  }

  // Try query parameter
  const url = new URL(request.url);
  const tokenParam = url.searchParams.get('token');
  if (tokenParam) {
    return tokenParam;
  }

  return null;
}

/**
 * Authenticates a Next.js request using token extraction and validation
 * @param request - Next.js request object to authenticate
 * @returns Authentication result with success status and optional error
 * @example
 * ```typescript
 * import { authenticateRequest } from '@/lib/auth';
 * 
 * export async function GET(request: NextRequest) {
 *   const auth = authenticateRequest(request);
 *   if (!auth.success) {
 *     return Response.json(
 *       { error: auth.error }, 
 *       { status: 401 }
 *     );
 *   }
 *   
 *   // Proceed with authenticated request
 *   return Response.json({ data: 'Protected data' });
 * }
 * ```
 */
export function authenticateRequest(request: NextRequest): AuthenticationResult {
  const token = extractTokenFromRequest(request);
  return validateApiToken(token);
}

/**
 * Creates HTTP headers for authenticated client-side requests
 * @returns Object containing Authorization and Content-Type headers
 * @throws Error if API_TOKEN is not configured
 * @example
 * ```typescript
 * import { createAuthHeaders } from '@/lib/auth';
 * 
 * const response = await fetch('/api/protected', {
 *   method: 'POST',
 *   headers: createAuthHeaders(),
 *   body: JSON.stringify({ data: 'protected' })
 * });
 * 
 * // Headers will include:
 * // Authorization: Bearer <token>
 * // Content-Type: application/json
 * ```
 */
export function createAuthHeaders(): Record<string, string> {
  if (!API_TOKEN) {
    throw new Error('API_TOKEN is not configured');
  }

  return {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  };
}

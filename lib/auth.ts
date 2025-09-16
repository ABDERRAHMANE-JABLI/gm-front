import { NextRequest } from 'next/server';

const API_TOKEN = process.env.API_TOKEN;

if (!API_TOKEN) {
  console.warn('⚠️ API_TOKEN environment variable is not set');
}

export interface AuthenticationResult {
  success: boolean;
  error?: string;
}

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

export function authenticateRequest(request: NextRequest): AuthenticationResult {
  const token = extractTokenFromRequest(request);
  return validateApiToken(token);
}

// Utility function to create authenticated headers for client-side requests
export function createAuthHeaders(): Record<string, string> {
  if (!API_TOKEN) {
    throw new Error('API_TOKEN is not configured');
  }

  return {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  };
}

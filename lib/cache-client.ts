/**
 * Configuration for cache API client
 * @description Configuration object required to initialize the cache API client
 * @example
 * ```typescript
 * const config: CacheClientConfig = {
 *   baseUrl: 'https://api.example.com',
 *   token: 'your-api-token-here'
 * };
 * ```
 */
export interface CacheClientConfig {
  /** @description Base URL for the API server */
  baseUrl: string;
  /** @description Authentication token for API access */
  token: string;
}

/**
 * Cache performance statistics
 * @description Statistics about cache performance and usage
 * @see {@link CacheStats} in cache.ts for detailed field descriptions
 */
export interface CacheStats {
  /** @description Number of cache hits */
  hits: number;
  /** @description Number of cache misses */
  misses: number;
  /** @description Number of successful cache sets */
  sets: number;
  /** @description Number of cache deletions */
  deletes: number;
  /** @description Memory usage in bytes */
  memory: number;
  /** @description Total number of keys in cache */
  keys: number;
}

/**
 * Standardized API response format
 * @description Generic response wrapper for all cache API endpoints
 * @template T - Type of the response data
 * @example
 * ```typescript
 * const response: ApiResponse<CacheStats> = {
 *   success: true,
 *   stats: { hits: 100, misses: 20, ... },
 *   timestamp: '2024-01-01T00:00:00Z'
 * };
 * ```
 */
export interface ApiResponse<T = unknown> {
  /** @description Whether the operation was successful */
  success?: boolean;
  /** @description Error message if operation failed */
  error?: string;
  /** @description Success or informational message */
  message?: string;
  /** @description Response payload data */
  data?: T;
  /** @description Cache statistics (for stats endpoints) */
  stats?: CacheStats;
  /** @description Health status (for health endpoints) */
  healthy?: boolean;
  /** @description Response timestamp */
  timestamp?: string;
  /** @description Count of affected items (for bulk operations) */
  count?: number;
  /** @description Tags involved in the operation */
  tags?: string[];
}

/**
 * HTTP client for cache management API
 * @description Provides typed methods for interacting with the cache management API
 * @example
 * ```typescript
 * const client = new CacheApiClient({
 *   baseUrl: 'https://api.example.com',
 *   token: 'your-api-token'
 * });
 * 
 * // Get cache statistics
 * const stats = await client.getStats();
 * 
 * // Clear specific cache entry
 * await client.clearCache('page:/restaurants');
 * 
 * // Clear by tags
 * await client.clearCacheByTags(['restaurants', 'menus']);
 * ```
 */
export class CacheApiClient {
  private baseUrl: string;
  private token: string;

  /**
   * Creates a new cache API client instance
   * @param config - Client configuration with base URL and authentication token
   * @example
   * ```typescript
   * const client = new CacheApiClient({
   *   baseUrl: 'https://api.example.com',
   *   token: process.env.API_TOKEN
   * });
   * ```
   */
  constructor(config: CacheClientConfig) {
    this.baseUrl = config.baseUrl;
    this.token = config.token;
  }

  /**
   * Makes an authenticated HTTP request to the cache API
   * @private
   * @template T - Expected response type
   * @param endpoint - API endpoint path
   * @param options - Additional fetch options
   * @returns Promise resolving to typed response
   * @throws Error if request fails or authentication is invalid
   */
  private async request<T = unknown>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  /**
   * Retrieves cache performance statistics
   * @returns Promise resolving to cache statistics and health status
   * @throws Error if request fails or authentication is invalid
   * @example
   * ```typescript
   * const response = await client.getStats();
   * console.log(`Hit rate: ${response.stats.hits / (response.stats.hits + response.stats.misses) * 100}%`);
   * ```
   */
  async getStats(): Promise<ApiResponse<CacheStats>> {
    return this.request('/api/cache?action=stats');
  }

  /**
   * Checks cache system health status
   * @returns Promise resolving to health check result
   * @throws Error if request fails or authentication is invalid
   * @example
   * ```typescript
   * const response = await client.getHealth();
   * if (response.healthy) {
   *   console.log('Cache system is operational');
   * }
   * ```
   */
  async getHealth(): Promise<ApiResponse> {
    return this.request('/api/cache?action=health');
  }

  /**
   * Clears a specific cache entry
   * @param key - Cache key to clear
   * @param namespace - Optional namespace (uses default if not provided)
   * @returns Promise resolving to operation result
   * @throws Error if request fails or authentication is invalid
   * @example
   * ```typescript
   * await client.clearCache('page:/restaurants');
   * await client.clearCache('user:123', 'auth');
   * ```
   */
  async clearCache(key: string, namespace?: string): Promise<ApiResponse> {
    return this.request('/api/cache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'clear', key, namespace }),
    });
  }

  /**
   * Clears all cache entries in a namespace or entire cache
   * @param namespace - Optional namespace to clear (clears all if not specified)
   * @returns Promise resolving to operation result with count of cleared entries
   * @throws Error if request fails or authentication is invalid
   * @example
   * ```typescript
   * // Clear all cache
   * await client.clearAllCache();
   * 
   * // Clear specific namespace
   * await client.clearAllCache('api');
   * ```
   */
  async clearAllCache(namespace?: string): Promise<ApiResponse> {
    return this.request('/api/cache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'clear-all', namespace }),
    });
  }

  /**
   * Clears cache entries associated with specific tags
   * @param tags - Array of tags to clear
   * @returns Promise resolving to operation result with count of cleared entries
   * @throws Error if request fails or authentication is invalid
   * @example
   * ```typescript
   * // Clear restaurant and menu cache
   * await client.clearCacheByTags(['restaurants', 'menus']);
   * ```
   */
  async clearCacheByTags(tags: string[]): Promise<ApiResponse> {
    return this.request('/api/cache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'clear-tags', tags }),
    });
  }
}

/**
 * Creates a cache API client for server-side use
 * @description Factory function that creates a cache client using environment variables
 * @returns Configured CacheApiClient instance
 * @throws Error if API_TOKEN environment variable is not set
 * @example
 * ```typescript
 * // In API routes or server components
 * const client = createServerCacheClient();
 * const stats = await client.getStats();
 * ```
 */
export function createServerCacheClient(): CacheApiClient {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const token = process.env.API_TOKEN;

  if (!token) {
    throw new Error('API_TOKEN environment variable is required');
  }

  return new CacheApiClient({ baseUrl, token });
}

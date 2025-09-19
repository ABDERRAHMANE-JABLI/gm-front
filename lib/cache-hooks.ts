import { cache, CacheKeys, CacheTags, CacheOptions } from './cache';
import { createAuthHeaders } from './auth';

/**
 * Content-specific cache management functions
 * @description High-level cache operations for different content types with appropriate TTL and tagging
 * @example
 * ```typescript
 * import { CacheFunctions } from '@/lib/cache-hooks';
 * 
 * // Cache a page
 * await CacheFunctions.cachePage('/restaurants', pageData);
 * 
 * // Get cached page
 * const page = await CacheFunctions.getCachedPage('/restaurants');
 * 
 * // Cache restaurant data
 * await CacheFunctions.cacheContent('restaurant', '123', restaurantData);
 * ```
 */
export const CacheFunctions = {
  /**
   * Caches page content with standard TTL and page tags
   * @param path - Page path to cache
   * @param content - Page content to cache
   * @param ttl - Time to live in seconds (default: 3600 - 1 hour)
   * @returns Promise that resolves when content is cached
   * @example
   * ```typescript
   * await CacheFunctions.cachePage('/restaurants', {
   *   title: 'Restaurants',
   *   restaurants: [...data]
   * });
   * ```
   */
  async cachePage(path: string, content: unknown, ttl = 3600): Promise<void> {
    await cache.set(
      CacheKeys.page(path),
      content,
      { ttl, tags: [CacheTags.pages] }
    );
  },

  /**
   * Retrieves cached page content
   * @template T - Expected type of cached page content
   * @param path - Page path to retrieve
   * @returns Promise resolving to cached content or null if not found
   * @example
   * ```typescript
   * const pageData = await CacheFunctions.getCachedPage<{
   *   title: string;
   *   restaurants: Restaurant[];
   * }>('/restaurants');
   * ```
   */
  async getCachedPage<T = unknown>(path: string): Promise<T | null> {
    return await cache.get<T>(CacheKeys.page(path));
  },

  /**
   * Invalidates all cached pages
   * @returns Promise resolving to number of invalidated entries
   * @example
   * ```typescript
   * const cleared = await CacheFunctions.invalidatePages();
   * console.log(`Cleared ${cleared} page cache entries`);
   * ```
   */
  async invalidatePages(): Promise<number> {
    return await cache.invalidateTag(CacheTags.pages);
  },

  /**
   * Caches API response with shorter TTL for dynamic data
   * @param endpoint - API endpoint name
   * @param params - Query parameters or identifier
   * @param data - Response data to cache
   * @param ttl - Time to live in seconds (default: 300 - 5 minutes)
   * @returns Promise that resolves when response is cached
   * @example
   * ```typescript
   * await CacheFunctions.cacheApiResponse('restaurants', 'city=paris', {
   *   restaurants: [...data],
   *   count: 25
   * });
   * ```
   */
  async cacheApiResponse(endpoint: string, params: string, data: unknown, ttl = 300): Promise<void> {
    await cache.set(
      CacheKeys.api(endpoint, params),
      data,
      { ttl, tags: [CacheTags.api] }
    );
  },

  /**
   * Retrieves cached API response
   * @template T - Expected type of cached API response
   * @param endpoint - API endpoint name
   * @param params - Query parameters or identifier
   * @returns Promise resolving to cached response or null if not found
   * @example
   * ```typescript
   * const apiData = await CacheFunctions.getCachedApiResponse<{
   *   restaurants: Restaurant[];
   *   count: number;
   * }>('restaurants', 'city=paris');
   * ```
   */
  async getCachedApiResponse<T = unknown>(endpoint: string, params: string): Promise<T | null> {
    return await cache.get<T>(CacheKeys.api(endpoint, params));
  },

  /**
   * Caches content with type-specific tags
   * @param type - Content type (e.g., 'champagne', 'restaurant', 'artisan')
   * @param id - Content identifier
   * @param content - Content data to cache
   * @param ttl - Time to live in seconds (default: 1800 - 30 minutes)
   * @returns Promise that resolves when content is cached
   * @example
   * ```typescript
   * await CacheFunctions.cacheContent('restaurant', '123', {
   *   id: '123',
   *   name: 'Chez Pierre',
   *   cuisine: 'French'
   * });
   * ```
   */
  async cacheContent(type: string, id: string, content: unknown, ttl = 1800): Promise<void> {
    const tags = [CacheTags.content];
    
    // Add specific tags based on content type
    if (type === 'champagne') tags.push(CacheTags.champagnes);
    if (type === 'restaurant') tags.push(CacheTags.restaurants);
    if (type === 'artisan') tags.push(CacheTags.artisans);

    await cache.set(
      CacheKeys.content(type, id),
      content,
      { ttl, tags }
    );
  },

  /**
   * Retrieves cached content by type and ID
   * @template T - Expected type of cached content
   * @param type - Content type
   * @param id - Content identifier
   * @returns Promise resolving to cached content or null if not found
   * @example
   * ```typescript
   * const restaurant = await CacheFunctions.getCachedContent<Restaurant>(
   *   'restaurant', 
   *   '123'
   * );
   * ```
   */
  async getCachedContent<T = unknown>(type: string, id: string): Promise<T | null> {
    return await cache.get<T>(CacheKeys.content(type, id));
  },

  /**
   * Invalidates all content of a specific type
   * @param type - Content type to invalidate
   * @returns Promise resolving to number of invalidated entries
   * @example
   * ```typescript
   * // Clear all restaurant cache when menu changes
   * const cleared = await CacheFunctions.invalidateContentByType('restaurant');
   * ```
   */
  async invalidateContentByType(type: string): Promise<number> {
    if (type === 'champagne') return await cache.invalidateTag(CacheTags.champagnes);
    if (type === 'restaurant') return await cache.invalidateTag(CacheTags.restaurants);
    if (type === 'artisan') return await cache.invalidateTag(CacheTags.artisans);
    return await cache.invalidateTag(CacheTags.content);
  },

  /**
   * Caches user session data with long TTL
   * @param sessionId - Session identifier
   * @param userData - User session data to cache
   * @param ttl - Time to live in seconds (default: 86400 - 24 hours)
   * @returns Promise that resolves when session is cached
   * @example
   * ```typescript
   * await CacheFunctions.cacheUserSession('sess_abc123', {
   *   userId: '456',
   *   preferences: { lang: 'fr' }
   * });
   * ```
   */
  async cacheUserSession(sessionId: string, userData: unknown, ttl = 86400): Promise<void> {
    await cache.set(
      CacheKeys.session(sessionId),
      userData,
      { ttl, tags: [CacheTags.auth] }
    );
  },

  /**
   * Retrieves cached user session data
   * @template T - Expected type of cached session data
   * @param sessionId - Session identifier
   * @returns Promise resolving to cached session or null if not found
   * @example
   * ```typescript
   * const session = await CacheFunctions.getCachedUserSession<{
   *   userId: string;
   *   preferences: { lang: Language };
   * }>('sess_abc123');
   * ```
   */
  async getCachedUserSession<T = unknown>(sessionId: string): Promise<T | null> {
    return await cache.get<T>(CacheKeys.session(sessionId));
  },

  /**
   * Invalidates all user sessions (useful for security updates)
   * @returns Promise resolving to number of invalidated sessions
   * @example
   * ```typescript
   * // Clear all sessions after security update
   * const cleared = await CacheFunctions.invalidateUserSessions();
   * ```
   */
  async invalidateUserSessions(): Promise<number> {
    return await cache.invalidateTag(CacheTags.auth);
  },

  /**
   * Caches database query results
   * @param queryHash - Unique hash of the query (use for consistent caching)
   * @param result - Query result data to cache
   * @param ttl - Time to live in seconds (default: 1800 - 30 minutes)
   * @returns Promise that resolves when query result is cached
   * @example
   * ```typescript
   * const queryHash = createHash('md5')
   *   .update('SELECT * FROM restaurants WHERE city = "Paris"')
   *   .digest('hex');
   * 
   * await CacheFunctions.cacheQuery(queryHash, queryResults);
   * ```
   */
  async cacheQuery(queryHash: string, result: unknown, ttl = 1800): Promise<void> {
    await cache.set(
      CacheKeys.query(queryHash),
      result,
      { ttl, tags: [CacheTags.content] }
    );
  },

  /**
   * Retrieves cached query results
   * @template T - Expected type of cached query result
   * @param queryHash - Unique hash of the query
   * @returns Promise resolving to cached result or null if not found
   * @example
   * ```typescript
   * const cached = await CacheFunctions.getCachedQuery<Restaurant[]>(queryHash);
   * if (cached) {
   *   return cached; // Use cached results
   * }
   * 
   * // Execute query and cache results
   * const results = await executeQuery(sql);
   * await CacheFunctions.cacheQuery(queryHash, results);
   * ```
   */
  async getCachedQuery<T = unknown>(queryHash: string): Promise<T | null> {
    return await cache.get<T>(CacheKeys.query(queryHash));
  },
};

/**
 * Cache warming utilities for pre-populating cache
 * @description Functions to proactively cache content for better performance
 * @example
 * ```typescript
 * import { CacheWarming } from '@/lib/cache-hooks';
 * 
 * // Warm critical pages on deployment
 * await CacheWarming.warmPageCache([
 *   '/restaurants',
 *   '/artisans',
 *   '/champagnes'
 * ]);
 * 
 * // Pre-cache popular content
 * await CacheWarming.warmContentCache('restaurant', ['rest-1', 'rest-2']);
 * ```
 */
export const CacheWarming = {
  /**
   * Pre-warms page cache for specified paths
   * @param paths - Array of page paths to warm
   * @returns Promise that resolves when all warming attempts complete
   * @example
   * ```typescript
   * // Warm cache during deployment
   * await CacheWarming.warmPageCache([
   *   '/',
   *   '/restaurants',
   *   '/champagnes',
   *   '/artisans'
   * ]);
   * ```
   */
  async warmPageCache(paths: string[]): Promise<void> {
    const promises = paths.map(async (path) => {
      try {
        // Fetch page data - this would be replaced with actual page fetching logic
        const response = await fetch(`/api/pages${path}`);
        if (response.ok) {
          const data = await response.json();
          await CacheFunctions.cachePage(path, data);
          console.log(`✅ Warmed cache for page: ${path}`);
        }
      } catch (error) {
        console.error(`❌ Failed to warm cache for page: ${path}`, error);
      }
    });

    await Promise.allSettled(promises);
  },

  /**
   * Pre-warms content cache for specific content type and IDs
   * @param contentType - Type of content to warm (e.g., 'restaurant', 'champagne')
   * @param ids - Array of content IDs to warm
   * @returns Promise that resolves when all warming attempts complete
   * @example
   * ```typescript
   * // Warm popular restaurants
   * await CacheWarming.warmContentCache('restaurant', [
   *   'chez-pierre',
   *   'le-bistrot',
   *   'restaurant-martin'
   * ]);
   * ```
   */
  async warmContentCache(contentType: string, ids: string[]): Promise<void> {
    const promises = ids.map(async (id) => {
      try {
        // Fetch content data - this would be replaced with actual content fetching logic
        const response = await fetch(`/api/${contentType}/${id}`);
        if (response.ok) {
          const data = await response.json();
          await CacheFunctions.cacheContent(contentType, id, data);
          console.log(`✅ Warmed cache for ${contentType}: ${id}`);
        }
      } catch (error) {
        console.error(`❌ Failed to warm cache for ${contentType}: ${id}`, error);
      }
    });

    await Promise.allSettled(promises);
  },
};

/**
 * Cache debugging and monitoring utilities
 * @description Tools for inspecting and monitoring cache performance and content
 * @example
 * ```typescript
 * import { CacheDebug } from '@/lib/cache-hooks';
 * 
 * // Check if specific key exists and inspect content
 * const info = await CacheDebug.getCacheInfo('page:/restaurants');
 * console.log(`Exists: ${info.exists}, TTL: ${info.ttl}s`);
 * 
 * // Monitor cache performance
 * const stats = await CacheDebug.getCacheStats();
 * console.log(`Hit rate: ${(stats.hits / (stats.hits + stats.misses) * 100).toFixed(2)}%`);
 * ```
 */
export const CacheDebug = {
  /**
   * Gets detailed information about a specific cache key
   * @param key - Cache key to inspect
   * @returns Promise resolving to cache entry information
   * @example
   * ```typescript
   * const info = await CacheDebug.getCacheInfo('page:/restaurants');
   * if (info.exists) {
   *   console.log(`Cache entry expires in ${info.ttl} seconds`);
   *   console.log('Cached data:', info.value);
   * }
   * ```
   */
  async getCacheInfo(key: string): Promise<{
    exists: boolean;
    ttl: number;
    value?: unknown;
  }> {
    const exists = await cache.exists(key);
    const ttl = await cache.getTTL(key);
    const value = exists ? await cache.get(key) : undefined;

    return { exists, ttl, value };
  },

  /**
   * Lists all cache keys (use with caution in production)
   * @returns Promise resolving to array of cache keys
   * @deprecated Not implemented for production use - use Redis CLI instead
   * @example
   * ```typescript
   * // For development only
   * const keys = await CacheDebug.listCacheKeys();
   * console.log(`Found ${keys.length} cache entries`);
   * ```
   */
  async listCacheKeys(): Promise<string[]> {
    // This would need to be implemented with Redis SCAN for production
    // For now, we'll return an empty array
    console.warn('listCacheKeys not implemented - use Redis CLI for key inspection');
    return [];
  },

  /**
   * Gets comprehensive cache performance statistics
   * @returns Promise resolving to cache statistics
   * @example
   * ```typescript
   * const stats = await CacheDebug.getCacheStats();
   * const hitRate = (stats.hits / (stats.hits + stats.misses) * 100).toFixed(2);
   * console.log(`Cache performance:`);
   * console.log(`- Hit rate: ${hitRate}%`);
   * console.log(`- Total operations: ${stats.hits + stats.misses + stats.sets + stats.deletes}`);
   * console.log(`- Memory usage: ${(stats.memory / 1024 / 1024).toFixed(2)} MB`);
   * console.log(`- Active keys: ${stats.keys}`);
   * ```
   */
  async getCacheStats() {
    return await cache.getStats();
  },
};

/**
 * Authenticated cache API client utilities
 * @description Client-side utilities for interacting with the cache management API
 * @example
 * ```typescript
 * import { CacheApiClient } from '@/lib/cache-hooks';
 * 
 * // Monitor cache health
 * const health = await CacheApiClient.getHealth();
 * 
 * // Clear specific content type
 * await CacheApiClient.invalidateByTag('restaurants');
 * 
 * // Set cache entry via API
 * await CacheApiClient.setCacheEntry('custom-key', data, { ttl: 3600 });
 * ```
 */
export const CacheApiClient = {
  /**
   * Retrieves cache performance statistics via API
   * @returns Promise resolving to cache statistics
   * @throws Error if API request fails or authentication is invalid
   * @example
   * ```typescript
   * try {
   *   const stats = await CacheApiClient.getStats();
   *   console.log('Cache stats:', stats);
   * } catch (error) {
   *   console.error('Failed to get cache stats:', error);
   * }
   * ```
   */
  async getStats(): Promise<unknown> {
    const response = await fetch('/api/cache?action=stats', {
      headers: createAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`Cache API error: ${response.statusText}`);
    }
    
    return await response.json();
  },

  /**
   * Checks cache system health via API
   * @returns Promise resolving to health status
   * @throws Error if API request fails or authentication is invalid
   * @example
   * ```typescript
   * const health = await CacheApiClient.getHealth();
   * if (health.status === 'healthy') {
   *   console.log('Cache system is operational');
   * }
   * ```
   */
  async getHealth(): Promise<unknown> {
    const response = await fetch('/api/cache?action=health', {
      headers: createAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`Cache API error: ${response.statusText}`);
    }
    
    return await response.json();
  },

  /**
   * Invalidates all cache entries with a specific tag
   * @param tag - Cache tag to invalidate
   * @returns Promise resolving to invalidation result
   * @throws Error if API request fails or authentication is invalid
   * @example
   * ```typescript
   * // Clear all restaurant cache when menu updates
   * const result = await CacheApiClient.invalidateByTag('restaurants');
   * console.log(`Cleared ${result.cleared} entries`);
   * ```
   */
  async invalidateByTag(tag: string): Promise<unknown> {
    const response = await fetch('/api/cache', {
      method: 'POST',
      headers: createAuthHeaders(),
      body: JSON.stringify({
        action: 'clear-tags',
        tags: [tag],
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Cache API error: ${response.statusText}`);
    }
    
    return await response.json();
  },

  /**
   * Invalidates cache entries with multiple tags
   * @param tags - Array of cache tags to invalidate
   * @returns Promise resolving to invalidation result
   * @throws Error if API request fails or authentication is invalid
   * @example
   * ```typescript
   * // Clear both restaurants and menus when major update occurs
   * const result = await CacheApiClient.invalidateByTags([
   *   'restaurants', 
   *   'menus'
   * ]);
   * ```
   */
  async invalidateByTags(tags: string[]): Promise<unknown> {
    const response = await fetch('/api/cache', {
      method: 'POST',
      headers: createAuthHeaders(),
      body: JSON.stringify({
        action: 'clear-tags',
        tags,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Cache API error: ${response.statusText}`);
    }
    
    return await response.json();
  },

  /**
   * Clears all cache in a namespace or entire cache
   * @param namespace - Optional namespace to clear (clears all if not specified)
   * @returns Promise resolving to clear operation result
   * @throws Error if API request fails or authentication is invalid
   * @example
   * ```typescript
   * // Clear all cache
   * await CacheApiClient.clearCache();
   * 
   * // Clear specific namespace
   * await CacheApiClient.clearCache('api');
   * ```
   */
  async clearCache(namespace?: string): Promise<unknown> {
    const response = await fetch('/api/cache', {
      method: 'POST',
      headers: createAuthHeaders(),
      body: JSON.stringify({
        action: 'clear',
        namespace,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Cache API error: ${response.statusText}`);
    }
    
    return await response.json();
  },

  /**
   * Sets a cache entry via API
   * @param key - Cache key to set
   * @param value - Value to cache
   * @param options - Optional cache configuration (TTL, tags, namespace)
   * @returns Promise resolving to set operation result
   * @throws Error if API request fails or authentication is invalid
   * @example
   * ```typescript
   * // Set cache entry with custom options
   * await CacheApiClient.setCacheEntry('custom-data', {
   *   id: 1,
   *   name: 'Custom'
   * }, {
   *   ttl: 7200,
   *   tags: ['custom'],
   *   namespace: 'admin'
   * });
   * ```
   */
  async setCacheEntry(
    key: string, 
    value: unknown, 
    options?: CacheOptions & { namespace?: string }
  ): Promise<unknown> {
    const response = await fetch('/api/cache', {
      method: 'POST',
      headers: createAuthHeaders(),
      body: JSON.stringify({
        action: 'set',
        key,
        value,
        ...options,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Cache API error: ${response.statusText}`);
    }
    
    return await response.json();
  },

  /**
   * Deletes a specific cache entry via API
   * @param key - Cache key to delete
   * @param namespace - Optional namespace (uses default if not specified)
   * @returns Promise resolving to delete operation result
   * @throws Error if API request fails or authentication is invalid
   * @example
   * ```typescript
   * // Delete specific cache entry
   * await CacheApiClient.deleteCacheEntry('user:123');
   * 
   * // Delete from specific namespace
   * await CacheApiClient.deleteCacheEntry('session:abc', 'auth');
   * ```
   */
  async deleteCacheEntry(key: string, namespace?: string): Promise<unknown> {
    const response = await fetch('/api/cache', {
      method: 'POST',
      headers: createAuthHeaders(),
      body: JSON.stringify({
        action: 'delete',
        key,
        namespace,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Cache API error: ${response.statusText}`);
    }
    
    return await response.json();
  },
};

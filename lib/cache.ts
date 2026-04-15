import { getRedisClient } from './redis';

/**
 * Configuration options for cache operations
 * @description Defines optional parameters for caching operations including TTL, tags, and namespacing
 * @example
 * ```typescript
 * const options: CacheOptions = {
 *   ttl: 3600, // 1 hour
 *   tags: ['restaurants', 'menu'],
 *   namespace: 'api'
 * };
 * ```
 */
export interface CacheOptions {
  /** @description Time to live in seconds (defaults to 3600) */
  ttl?: number;
  /** @description Tags for cache invalidation (allows batch clearing) */
  tags?: string[];
  /** @description Cache namespace for organization (defaults to 'cache') */
  namespace?: string;
}

/**
 * Cache performance and usage statistics
 * @description Tracks cache performance metrics for monitoring and optimization
 * @example
 * ```typescript
 * const stats = await cache.getStats();
 * console.log(`Hit rate: ${stats.hits / (stats.hits + stats.misses) * 100}%`);
 * ```
 */
export interface CacheStats {
  /** @description Number of cache hits (successful retrievals) */
  hits: number;
  /** @description Number of cache misses (failed retrievals) */
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
 * Internal cache entry structure
 * @description Wrapper for cached data with metadata for TTL and tagging
 * @template T - Type of the cached data
 * @example
 * ```typescript
 * const entry: CacheEntry<User> = {
 *   data: { id: 1, name: 'John' },
 *   timestamp: Date.now(),
 *   ttl: 3600,
 *   tags: ['users', 'profile']
 * };
 * ```
 */
export interface CacheEntry<T = unknown> {
  /** @description The actual cached data */
  data: T;
  /** @description Unix timestamp when the entry was created */
  timestamp: number;
  /** @description Time to live in seconds */
  ttl: number;
  /** @description Associated tags for invalidation */
  tags: string[];
}

/**
 * Redis-based cache manager with tagging and statistics
 * @description High-performance caching system with support for TTL, tags-based invalidation, and performance monitoring
 * @example
 * ```typescript
 * const cache = new CacheManager({ defaultTTL: 1800 });
 * 
 * // Basic caching
 * await cache.set('user:123', userData, { ttl: 3600, tags: ['users'] });
 * const user = await cache.get<User>('user:123');
 * 
 * // Tag-based invalidation
 * await cache.invalidateTag('users'); // Clears all user-related cache
 * 
 * // Remember pattern
 * const data = await cache.remember('expensive-query', async () => {
 *   return await expensiveApiCall();
 * }, { ttl: 7200, tags: ['api'] });
 * ```
 */
export class CacheManager {
  private get redis() { return getRedisClient(); }
  private statsKey = 'cache:stats';
  private tagsPrefix = 'cache:tags:';
  private defaultTTL = 3600; // 1 hour
  private defaultNamespace = 'cache';

  /**
   * Creates a new CacheManager instance
   * @param options - Configuration options for the cache manager
   * @param options.defaultTTL - Default time to live in seconds (default: 3600)
   * @param options.defaultNamespace - Default namespace for cache keys (default: 'cache')
   * @example
   * ```typescript
   * const cache = new CacheManager({ 
   *   defaultTTL: 1800,  // 30 minutes
   *   defaultNamespace: 'myapp'
   * });
   * ```
   */
  constructor(options?: { defaultTTL?: number; defaultNamespace?: string }) {
    if (options?.defaultTTL) this.defaultTTL = options.defaultTTL;
    if (options?.defaultNamespace) this.defaultNamespace = options.defaultNamespace;
  }

  /**
   * Generates a namespaced cache key
   * @private
   * @param key - The base cache key
   * @param namespace - Optional namespace override
   * @returns Fully qualified cache key
   * @example
   * ```typescript
   * // Returns "cache:user:123"
   * this.getKey('user:123');
   * 
   * // Returns "api:user:123"
   * this.getKey('user:123', 'api');
   * ```
   */
  private getKey(key: string, namespace?: string): string {
    const ns = namespace || this.defaultNamespace;
    return `${ns}:${key}`;
  }

  /**
   * Updates cache operation statistics
   * @private
   * @param operation - Type of cache operation performed
   * @returns Promise that resolves when stats are updated
   */
  private async updateStats(operation: 'hit' | 'miss' | 'set' | 'delete'): Promise<void> {
    try {
      await this.redis.hincrby(this.statsKey, operation + 's', 1);
    } catch (error) {
      console.error('Failed to update cache stats:', error);
    }
  }

  /**
   * Retrieves a value from the cache
   * @template T - Type of the cached data
   * @param key - Cache key to retrieve
   * @param options - Optional namespace configuration
   * @returns Promise resolving to cached data or null if not found/expired
   * @example
   * ```typescript
   * const user = await cache.get<User>('user:123');
   * if (user) {
   *   console.log(`Found user: ${user.name}`);
   * }
   * 
   * // With custom namespace
   * const apiData = await cache.get('endpoint', { namespace: 'api' });
   * ```
   */
  async get<T = unknown>(key: string, options?: { namespace?: string }): Promise<T | null> {
    try {
      const fullKey = this.getKey(key, options?.namespace);
      const cached = await this.redis.get(fullKey);
      
      if (!cached) {
        await this.updateStats('miss');
        return null;
      }

      const entry: CacheEntry<T> = JSON.parse(cached);
      
      // Check if entry has expired (additional check)
      if (entry.timestamp + entry.ttl * 1000 < Date.now()) {
        await this.delete(key, options);
        await this.updateStats('miss');
        return null;
      }

      await this.updateStats('hit');
      return entry.data;
    } catch (error) {
      console.error('Cache get error:', error);
      await this.updateStats('miss');
      return null;
    }
  }

  /**
   * Stores a value in the cache with optional TTL and tags
   * @template T - Type of the data to cache
   * @param key - Cache key to store under
   * @param value - Data to cache
   * @param options - Cache options including TTL, tags, and namespace
   * @returns Promise that resolves when the value is cached
   * @example
   * ```typescript
   * // Basic caching
   * await cache.set('user:123', userData);
   * 
   * // With TTL and tags
   * await cache.set('menu:restaurant:456', menuData, {
   *   ttl: 1800, // 30 minutes
   *   tags: ['restaurants', 'menus'],
   *   namespace: 'content'
   * });
   * ```
   */
  async set<T = unknown>(
    key: string, 
    value: T, 
    options?: CacheOptions & { namespace?: string }
  ): Promise<void> {
    try {
      const ttl = options?.ttl || this.defaultTTL;
      const tags = options?.tags || [];
      const fullKey = this.getKey(key, options?.namespace);

      const entry: CacheEntry<T> = {
        data: value,
        timestamp: Date.now(),
        ttl,
        tags,
      };

      // Set the cache entry with TTL
      await this.redis.setex(fullKey, ttl, JSON.stringify(entry));

      // Add to tag indexes
      for (const tag of tags) {
        const tagKey = `${this.tagsPrefix}${tag}`;
        await this.redis.sadd(tagKey, fullKey);
        await this.redis.expire(tagKey, ttl + 86400); // Tag expires 1 day after cache
      }

      await this.updateStats('set');
    } catch (error) {
      console.error('Cache set error:', error);
      throw error;
    }
  }

  /**
   * Deletes a specific cache entry and removes it from tag indexes
   * @param key - Cache key to delete
   * @param options - Optional namespace configuration
   * @returns Promise that resolves when the entry is deleted
   * @example
   * ```typescript
   * await cache.delete('user:123');
   * 
   * // With custom namespace
   * await cache.delete('session:abc', { namespace: 'auth' });
   * ```
   */
  async delete(key: string, options?: { namespace?: string }): Promise<void> {
    try {
      const fullKey = this.getKey(key, options?.namespace);
      
      // Get entry to remove from tag indexes
      const cached = await this.redis.get(fullKey);
      if (cached) {
        const entry: CacheEntry = JSON.parse(cached);
        
        // Remove from tag indexes
        for (const tag of entry.tags) {
          const tagKey = `${this.tagsPrefix}${tag}`;
          await this.redis.srem(tagKey, fullKey);
        }
      }

      await this.redis.del(fullKey);
      await this.updateStats('delete');
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  /**
   * Invalidates all cache entries associated with a specific tag
   * @param tag - Tag to invalidate
   * @returns Promise resolving to the number of entries invalidated
   * @example
   * ```typescript
   * // Clear all restaurant-related cache
   * const cleared = await cache.invalidateTag('restaurants');
   * console.log(`Cleared ${cleared} restaurant cache entries`);
   * ```
   */
  async invalidateTag(tag: string): Promise<number> {
    try {
      const tagKey = `${this.tagsPrefix}${tag}`;
      const keys = await this.redis.smembers(tagKey);
      
      if (keys.length === 0) {
        return 0;
      }

      // Delete all keys associated with the tag
      await this.redis.del(...keys);
      // Remove the tag key itself
      await this.redis.del(tagKey);

      // Update stats
      for (let i = 0; i < keys.length; i++) {
        await this.updateStats('delete');
      }

      return keys.length;
    } catch (error) {
      console.error('Cache tag invalidation error:', error);
      return 0;
    }
  }

  /**
   * Invalidates all cache entries associated with multiple tags
   * @param tags - Array of tags to invalidate
   * @returns Promise resolving to the total number of entries invalidated
   * @example
   * ```typescript
   * // Clear both restaurants and menus cache
   * const cleared = await cache.invalidateTags(['restaurants', 'menus']);
   * console.log(`Cleared ${cleared} cache entries`);
   * ```
   */
  async invalidateTags(tags: string[]): Promise<number> {
    try {
      const allKeys = new Set<string>();
      const tagKeysToDelete: string[] = [];

      // Collect all keys from all tags
      for (const tag of tags) {
        const tagKey = `${this.tagsPrefix}${tag}`;
        const keys = await this.redis.smembers(tagKey);
        keys.forEach(key => allKeys.add(key));
        if (keys.length > 0) {
          tagKeysToDelete.push(tagKey);
        }
      }

      const keysArray = Array.from(allKeys);
      
      if (keysArray.length === 0) {
        return 0;
      }

      // Delete all keys and tag keys
      await this.redis.del(...keysArray, ...tagKeysToDelete);

      // Update stats
      for (let i = 0; i < keysArray.length; i++) {
        await this.updateStats('delete');
      }

      return keysArray.length;
    } catch (error) {
      console.error('Cache tags invalidation error:', error);
      return 0;
    }
  }

  /**
   * Clears all cache entries in a specific namespace
   * @param namespace - Optional namespace to clear (defaults to default namespace)
   * @returns Promise resolving to the number of entries cleared
   * @example
   * ```typescript
   * // Clear all cache in default namespace
   * const cleared = await cache.clear();
   * 
   * // Clear specific namespace
   * const apiCleared = await cache.clear('api');
   * console.log(`Cleared ${apiCleared} API cache entries`);
   * ```
   */
  async clear(namespace?: string): Promise<number> {
    try {
      const pattern = namespace ? `${namespace}:*` : `${this.defaultNamespace}:*`;
      const keys = await this.redis.keys(pattern);
      
      if (keys.length === 0) {
        return 0;
      }

      await this.redis.del(...keys);

      // Update stats
      for (let i = 0; i < keys.length; i++) {
        await this.updateStats('delete');
      }

      return keys.length;
    } catch (error) {
      console.error('Cache clear error:', error);
      return 0;
    }
  }

  /**
   * Retrieves cache performance statistics
   * @returns Promise resolving to cache statistics including hits, misses, memory usage
   * @example
   * ```typescript
   * const stats = await cache.getStats();
   * const hitRate = stats.hits / (stats.hits + stats.misses) * 100;
   * console.log(`Cache hit rate: ${hitRate.toFixed(2)}%`);
   * console.log(`Memory usage: ${(stats.memory / 1024 / 1024).toFixed(2)} MB`);
   * console.log(`Total keys: ${stats.keys}`);
   * ```
   */
  async getStats(): Promise<CacheStats> {
    try {
      const stats = await this.redis.hgetall(this.statsKey);
      const info = await this.redis.info('memory');
      const memoryMatch = info.match(/used_memory:(\d+)/);
      const memory = memoryMatch ? parseInt(memoryMatch[1], 10) : 0;

      const keyCount = await this.redis.dbsize();

      return {
        hits: parseInt(stats.hits || '0', 10),
        misses: parseInt(stats.misses || '0', 10),
        sets: parseInt(stats.sets || '0', 10),
        deletes: parseInt(stats.deletes || '0', 10),
        memory,
        keys: keyCount,
      };
    } catch (error) {
      console.error('Cache stats error:', error);
      return { hits: 0, misses: 0, sets: 0, deletes: 0, memory: 0, keys: 0 };
    }
  }

  /**
   * Cache-aside pattern: get from cache or fetch and store
   * @template T - Type of the data to cache/return
   * @param key - Cache key to check/store under
   * @param fetcher - Function to call if cache miss occurs
   * @param options - Cache options including TTL, tags, and namespace
   * @returns Promise resolving to cached or fetched data
   * @example
   * ```typescript
   * const userData = await cache.remember('user:123', async () => {
   *   return await database.getUser(123);
   * }, { 
   *   ttl: 3600, 
   *   tags: ['users'] 
   * });
   * 
   * // Expensive computation
   * const report = await cache.remember('monthly-report', async () => {
   *   return await generateMonthlyReport();
   * }, { ttl: 86400 }); // Cache for 24 hours
   * ```
   */
  async remember<T = unknown>(
    key: string,
    fetcher: () => Promise<T>,
    options?: CacheOptions & { namespace?: string }
  ): Promise<T> {
    const cached = await this.get<T>(key, options);
    if (cached !== null) {
      return cached;
    }

    const value = await fetcher();
    await this.set(key, value, options);
    return value;
  }

  /**
   * Checks if a cache key exists
   * @param key - Cache key to check
   * @param options - Optional namespace configuration
   * @returns Promise resolving to true if key exists, false otherwise
   * @example
   * ```typescript
   * if (await cache.exists('user:123')) {
   *   console.log('User data is cached');
   * }
   * ```
   */
  async exists(key: string, options?: { namespace?: string }): Promise<boolean> {
    try {
      const fullKey = this.getKey(key, options?.namespace);
      const exists = await this.redis.exists(fullKey);
      return exists === 1;
    } catch (error) {
      console.error('Cache exists error:', error);
      return false;
    }
  }

  /**
   * Gets the remaining time-to-live for a cache key
   * @param key - Cache key to check TTL for
   * @param options - Optional namespace configuration
   * @returns Promise resolving to TTL in seconds (-1 if key doesn't exist, -2 if no TTL)
   * @example
   * ```typescript
   * const ttl = await cache.getTTL('user:123');
   * if (ttl > 0) {
   *   console.log(`Cache expires in ${ttl} seconds`);
   * }
   * ```
   */
  async getTTL(key: string, options?: { namespace?: string }): Promise<number> {
    try {
      const fullKey = this.getKey(key, options?.namespace);
      return await this.redis.ttl(fullKey);
    } catch (error) {
      console.error('Cache TTL error:', error);
      return -1;
    }
  }
}

/**
 * Singleton cache manager instance
 * @description Pre-configured cache manager ready for use throughout the application
 * @example
 * ```typescript
 * import { cache } from '@/lib/cache';
 * 
 * // Use the singleton instance
 * await cache.set('key', 'value');
 * const value = await cache.get('key');
 * ```
 */
export const cache = new CacheManager();

/**
 * Standardized cache key builders for consistent naming
 * @description Helper functions to generate consistent cache keys across the application
 * @example
 * ```typescript
 * import { CacheKeys } from '@/lib/cache';
 * 
 * // Generate standardized keys
 * const pageKey = CacheKeys.page('/restaurants'); // "page:/restaurants"
 * const userKey = CacheKeys.user('123'); // "user:123"
 * const apiKey = CacheKeys.api('restaurants', 'city=paris'); // "api:restaurants:city=paris"
 * 
 * await cache.set(pageKey, pageData);
 * ```
 */
export const CacheKeys = {
  /** 
   * Generates cache key for page content
   * @param path - Page path
   * @returns Cache key for page
   */
  page: (path: string) => `page:${path}`,
  
  /** 
   * Generates cache key for API responses
   * @param endpoint - API endpoint name
   * @param params - Optional query parameters
   * @returns Cache key for API response
   */
  api: (endpoint: string, params?: string) => `api:${endpoint}${params ? `:${params}` : ''}`,
  
  /** 
   * Generates cache key for user data
   * @param userId - User identifier
   * @returns Cache key for user
   */
  user: (userId: string) => `user:${userId}`,
  
  /** 
   * Generates cache key for content items
   * @param type - Content type (e.g., 'restaurant', 'article')
   * @param id - Content identifier
   * @returns Cache key for content
   */
  content: (type: string, id: string) => `content:${type}:${id}`,
  
  /** 
   * Generates cache key for query results
   * @param hash - Query hash or identifier
   * @returns Cache key for query
   */
  query: (hash: string) => `query:${hash}`,
  
  /** 
   * Generates cache key for session data
   * @param sessionId - Session identifier
   * @returns Cache key for session
   */
  session: (sessionId: string) => `session:${sessionId}`,
};

/**
 * Standardized cache tags for batch invalidation
 * @description Predefined tags for organizing and invalidating related cache entries
 * @example
 * ```typescript
 * import { CacheTags, cache } from '@/lib/cache';
 * 
 * // Cache with tags
 * await cache.set('restaurant:123', data, { 
 *   tags: [CacheTags.restaurants, CacheTags.content] 
 * });
 * 
 * // Invalidate all restaurant cache
 * await cache.invalidateTag(CacheTags.restaurants);
 * ```
 */
export const CacheTags = {
  /** @description Tag for all page-related cache entries */
  pages: 'pages',
  /** @description Tag for all API response cache entries */
  api: 'api',
  /** @description Tag for all user-related cache entries */
  users: 'users',
  /** @description Tag for all content cache entries */
  content: 'content',
  /** @description Tag for all authentication-related cache entries */
  auth: 'auth',
  /** @description Tag for all champagne-related cache entries */
  champagnes: 'champagnes',
  /** @description Tag for all restaurant-related cache entries */
  restaurants: 'restaurants',
  /** @description Tag for all artisan-related cache entries */
  artisans: 'artisans',
};

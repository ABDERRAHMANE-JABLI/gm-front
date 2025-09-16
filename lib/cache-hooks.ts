import { cache, CacheKeys, CacheTags, CacheOptions } from './cache';
import { createAuthHeaders } from './auth';

// Content-specific cache functions
export const CacheFunctions = {
  // Page caching
  async cachePage(path: string, content: unknown, ttl = 3600): Promise<void> {
    await cache.set(
      CacheKeys.page(path),
      content,
      { ttl, tags: [CacheTags.pages] }
    );
  },

  async getCachedPage<T = unknown>(path: string): Promise<T | null> {
    return await cache.get<T>(CacheKeys.page(path));
  },

  async invalidatePages(): Promise<number> {
    return await cache.invalidateTag(CacheTags.pages);
  },

  // API response caching
  async cacheApiResponse(endpoint: string, params: string, data: unknown, ttl = 300): Promise<void> {
    await cache.set(
      CacheKeys.api(endpoint, params),
      data,
      { ttl, tags: [CacheTags.api] }
    );
  },

  async getCachedApiResponse<T = unknown>(endpoint: string, params: string): Promise<T | null> {
    return await cache.get<T>(CacheKeys.api(endpoint, params));
  },

  // Content caching (champagnes, restaurants, etc.)
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

  async getCachedContent<T = unknown>(type: string, id: string): Promise<T | null> {
    return await cache.get<T>(CacheKeys.content(type, id));
  },

  async invalidateContentByType(type: string): Promise<number> {
    if (type === 'champagne') return await cache.invalidateTag(CacheTags.champagnes);
    if (type === 'restaurant') return await cache.invalidateTag(CacheTags.restaurants);
    if (type === 'artisan') return await cache.invalidateTag(CacheTags.artisans);
    return await cache.invalidateTag(CacheTags.content);
  },

  // User session caching
  async cacheUserSession(sessionId: string, userData: unknown, ttl = 86400): Promise<void> {
    await cache.set(
      CacheKeys.session(sessionId),
      userData,
      { ttl, tags: [CacheTags.auth] }
    );
  },

  async getCachedUserSession<T = unknown>(sessionId: string): Promise<T | null> {
    return await cache.get<T>(CacheKeys.session(sessionId));
  },

  async invalidateUserSessions(): Promise<number> {
    return await cache.invalidateTag(CacheTags.auth);
  },

  // Database query caching
  async cacheQuery(queryHash: string, result: unknown, ttl = 1800): Promise<void> {
    await cache.set(
      CacheKeys.query(queryHash),
      result,
      { ttl, tags: [CacheTags.content] }
    );
  },

  async getCachedQuery<T = unknown>(queryHash: string): Promise<T | null> {
    return await cache.get<T>(CacheKeys.query(queryHash));
  },
};

// Cache warming utilities
export const CacheWarming = {
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

// Cache debugging and monitoring utilities
export const CacheDebug = {
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

  async listCacheKeys(): Promise<string[]> {
    // This would need to be implemented with Redis SCAN for production
    // For now, we'll return an empty array
    console.warn('listCacheKeys not implemented - use Redis CLI for key inspection');
    return [];
  },

  async getCacheStats() {
    return await cache.getStats();
  },
};

// Authenticated cache API client utilities
export const CacheApiClient = {
  async getStats(): Promise<unknown> {
    const response = await fetch('/api/cache?action=stats', {
      headers: createAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`Cache API error: ${response.statusText}`);
    }
    
    return await response.json();
  },

  async getHealth(): Promise<unknown> {
    const response = await fetch('/api/cache?action=health', {
      headers: createAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`Cache API error: ${response.statusText}`);
    }
    
    return await response.json();
  },

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

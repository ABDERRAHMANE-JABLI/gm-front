import { getRedisClient } from './redis';

export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  tags?: string[]; // Tags for invalidation
  namespace?: string; // Cache namespace
}

export interface CacheStats {
  hits: number;
  misses: number;
  sets: number;
  deletes: number;
  memory: number;
  keys: number;
}

export interface CacheEntry<T = unknown> {
  data: T;
  timestamp: number;
  ttl: number;
  tags: string[];
}

export class CacheManager {
  private redis = getRedisClient();
  private statsKey = 'cache:stats';
  private tagsPrefix = 'cache:tags:';
  private defaultTTL = 3600; // 1 hour
  private defaultNamespace = 'cache';

  constructor(options?: { defaultTTL?: number; defaultNamespace?: string }) {
    if (options?.defaultTTL) this.defaultTTL = options.defaultTTL;
    if (options?.defaultNamespace) this.defaultNamespace = options.defaultNamespace;
  }

  private getKey(key: string, namespace?: string): string {
    const ns = namespace || this.defaultNamespace;
    return `${ns}:${key}`;
  }

  private async updateStats(operation: 'hit' | 'miss' | 'set' | 'delete'): Promise<void> {
    try {
      await this.redis.hincrby(this.statsKey, operation + 's', 1);
    } catch (error) {
      console.error('Failed to update cache stats:', error);
    }
  }

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

// Singleton instance
export const cache = new CacheManager();

// Cache key builders
export const CacheKeys = {
  page: (path: string) => `page:${path}`,
  api: (endpoint: string, params?: string) => `api:${endpoint}${params ? `:${params}` : ''}`,
  user: (userId: string) => `user:${userId}`,
  content: (type: string, id: string) => `content:${type}:${id}`,
  query: (hash: string) => `query:${hash}`,
  session: (sessionId: string) => `session:${sessionId}`,
};

// Cache tags for invalidation
export const CacheTags = {
  pages: 'pages',
  api: 'api',
  users: 'users',
  content: 'content',
  auth: 'auth',
  champagnes: 'champagnes',
  restaurants: 'restaurants',
  artisans: 'artisans',
};

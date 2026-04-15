import Redis from 'ioredis';

/**
 * Redis client configuration options
 * @description Configuration interface for Redis client setup with connection and retry settings
 * @example
 * ```typescript
 * const config: RedisConfig = {
 *   host: 'localhost',
 *   port: 6379,
 *   password: 'secret',
 *   db: 0,
 *   retryDelayOnFailover: 100,
 *   maxRetriesPerRequest: 3
 * };
 * ```
 */
interface RedisConfig {
  /** @description Redis server URL (alternative to host/port) */
  url?: string;
  /** @description Redis server hostname */
  host?: string;
  /** @description Redis server port (default: 6379) */
  port?: number;
  /** @description Redis authentication password */
  password?: string;
  /** @description Redis database number (default: 0) */
  db?: number;
  /** @description Delay in ms before retrying after failover (default: 100) */
  retryDelayOnFailover?: number;
  /** @description Whether to enable ready check (default: false for performance) */
  enableReadyCheck?: boolean;
  /** @description Maximum retries per request (default: 3) */
  maxRetriesPerRequest?: number;
  /** @description Whether to connect lazily (default: true) */
  lazyConnect?: boolean;
}

/**
 * Singleton Redis client instance
 * @description Holds the global Redis connection to ensure single instance across application
 */
let redis: Redis | null = null;

/**
 * Creates and configures a new Redis client
 * @private
 * @returns Configured Redis client with event handlers
 * @throws Error if REDIS_URL environment variable is not set
 * @example
 * ```typescript
 * // This is called internally by getRedisClient()
 * const client = createRedisClient();
 * ```
 */
function createRedisClient(): Redis {
  const redisUrl = process.env.REDIS_URL;
  
  if (!redisUrl) {
    throw new Error('REDIS_URL environment variable is not set');
  }

  console.log('Creating Redis client with URL:', redisUrl.replace(/\/\/.*@/, '//***:***@'));

  const config: RedisConfig = {
    retryDelayOnFailover: 100,
    enableReadyCheck: false,
    maxRetriesPerRequest: 0,
    lazyConnect: true,
  };

  // Create Redis client with URL
  const client = new Redis(redisUrl, config);

  // Handle connection events
  client.on('connect', () => {
    console.log('🔄 Redis connecting...');
  });

  client.on('ready', () => {
    console.log('✅ Redis connected successfully');
  });

  client.on('error', (error) => {
    console.error('❌ Redis connection error:', error.message);
  });

  client.on('close', () => {
    console.log('🔌 Redis connection closed');
  });

  client.on('reconnecting', (time: number) => {
    console.log(`🔄 Redis reconnecting in ${time}ms...`);
  });

  return client;
}

/**
 * Gets the singleton Redis client instance
 * @description Returns the global Redis client, creating it if it doesn't exist
 * @returns Redis client instance ready for use
 * @example
 * ```typescript
 * import { getRedisClient } from '@/lib/redis';
 * 
 * const redis = getRedisClient();
 * await redis.set('key', 'value');
 * const value = await redis.get('key');
 * ```
 */
export function getRedisClient(): Redis {
  if (!redis) {
    try {
      redis = createRedisClient();
    } catch (e) {
      console.warn('[Redis] Disabled — REDIS_URL unreachable:', (e as Error).message);
      // Retourne un proxy silencieux pour ne pas planter l'app
      return new Proxy({} as Redis, {
        get: () => () => Promise.resolve(null),
      });
    }
  }
  return redis;
}

/**
 * Gracefully disconnects the Redis client
 * @description Properly closes the Redis connection and cleans up the singleton instance
 * @returns Promise that resolves when disconnection is complete
 * @example
 * ```typescript
 * import { disconnectRedis } from '@/lib/redis';
 * 
 * // On application shutdown
 * process.on('SIGTERM', async () => {
 *   await disconnectRedis();
 *   process.exit(0);
 * });
 * ```
 */
export async function disconnectRedis(): Promise<void> {
  if (redis) {
    await redis.quit();
    redis = null;
    console.log('🔌 Redis client disconnected');
  }
}

/**
 * Checks if Redis connection is healthy
 * @description Performs a ping test to verify Redis connectivity
 * @returns Promise resolving to true if Redis is responsive, false otherwise
 * @example
 * ```typescript
 * import { isRedisHealthy } from '@/lib/redis';
 * 
 * const healthy = await isRedisHealthy();
 * if (!healthy) {
 *   console.error('Redis is not available');
 *   // Handle Redis unavailability
 * }
 * ```
 */
export async function isRedisHealthy(): Promise<boolean> {
  try {
    const client = getRedisClient();
    const result = await client.ping();
    return result === 'PONG';
  } catch (error) {
    console.error('Redis health check failed:', error);
    return false;
  }
}

/**
 * Direct access to Redis client instance
 * @description Export the raw Redis client for advanced use cases (use getRedisClient() instead for most cases)
 * @deprecated Use getRedisClient() function instead for proper singleton pattern
 * @example
 * ```typescript
 * // Preferred approach
 * import { getRedisClient } from '@/lib/redis';
 * const redis = getRedisClient();
 * 
 * // Direct access (not recommended)
 * import { redis } from '@/lib/redis';
 * ```
 */
export { redis };

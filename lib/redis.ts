import Redis from 'ioredis';

interface RedisConfig {
  url?: string;
  host?: string;
  port?: number;
  password?: string;
  db?: number;
  retryDelayOnFailover?: number;
  enableReadyCheck?: boolean;
  maxRetriesPerRequest?: number;
  lazyConnect?: boolean;
}

let redis: Redis | null = null;

function createRedisClient(): Redis {
  const redisUrl = process.env.REDIS_URL;
  
  if (!redisUrl) {
    throw new Error('REDIS_URL environment variable is not set');
  }

  console.log('Creating Redis client with URL:', redisUrl.replace(/\/\/.*@/, '//***:***@'));

  const config: RedisConfig = {
    // Parse Redis URL or use connection details
    retryDelayOnFailover: 100,
    enableReadyCheck: false,
    maxRetriesPerRequest: 3,
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

export function getRedisClient(): Redis {
  if (!redis) {
    redis = createRedisClient();
  }
  return redis;
}

export async function disconnectRedis(): Promise<void> {
  if (redis) {
    await redis.quit();
    redis = null;
    console.log('🔌 Redis client disconnected');
  }
}

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

// Export the client for direct access when needed
export { redis };

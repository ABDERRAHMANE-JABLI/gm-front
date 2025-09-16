import { cache, CacheKeys, CacheTags } from '../lib/cache';
// import { createServerCacheClient } from '../lib/cache-client';

// Example: Using cache in a React component (server-side)
export async function getServerSideProps() {
  // Direct cache usage (server-side only)
  const cachedData = await cache.remember(
    CacheKeys.content('champagne', 'bordeaux-2020'),
    async () => {
      // Fetch from API or database
      const response = await fetch('https://api.example.com/champagnes/bordeaux-2020');
      return response.json();
    },
    {
      ttl: 3600, // 1 hour
      tags: [CacheTags.champagnes, CacheTags.content],
    }
  );

  return {
    props: {
      champagneData: cachedData,
    },
  };
}

// Example: Using authenticated cache API client
export async function manageCacheExample() {
  try {
    // Note: Replace with actual client creation when needed
    console.log('Cache management example - client creation would go here');

    // Example of what you would do:
    // const client = createServerCacheClient();
    // const stats = await client.getStats();
    // console.log('Cache Stats:', stats);

  } catch (error) {
    console.error('Cache operation failed:', error);
  }
}

// Example: Cache warming for common content
export async function warmCommonCache() {
  // const client = createServerCacheClient();

  const commonContent = [
    { key: 'homepage:data', url: '/api/homepage' },
    { key: 'champagnes:featured', url: '/api/champagnes/featured' },
    { key: 'restaurants:top', url: '/api/restaurants/top' },
  ];

  for (const item of commonContent) {
    try {
      // Example of cache warming
      console.log(`Would warm cache for: ${item.key} from ${item.url}`);
    } catch (error) {
      console.error(`❌ Failed to warm cache for: ${item.key}`, error);
    }
  }
}

// Example: Cache invalidation strategies
export async function invalidateCacheStrategies() {
  // const client = createServerCacheClient();

  // Strategy 1: Invalidate by content type
  console.log('Would invalidate:', CacheTags.champagnes);
  
  // Strategy 2: Clear entire API cache
  console.log('Would clear API cache');
  
  // Strategy 3: Targeted invalidation
  console.log('Would delete specific cache key');
}

// Example: Monitoring cache performance
export async function monitorCachePerformance() {
  // const client = createServerCacheClient();
  
  // Example stats structure
  const exampleStats = {
    hits: 1000,
    misses: 200,
    sets: 150,
    deletes: 50,
  };
  
  const hitRate = exampleStats.hits / (exampleStats.hits + exampleStats.misses) * 100;
  
  console.log(`Cache Hit Rate: ${hitRate.toFixed(2)}%`);
  console.log(`Total Operations: ${exampleStats.hits + exampleStats.misses + exampleStats.sets + exampleStats.deletes}`);
  
  // Alert if hit rate is too low
  if (hitRate < 50) {
    console.warn('⚠️ Cache hit rate is below 50% - consider adjusting TTL values');
  }
}

// Example: Error handling and fallbacks
export async function robustCacheExample() {
  try {
    // Try to get from cache first
    const cached = await cache.get(CacheKeys.content('restaurant', 'michelin-star'));
    
    if (cached) {
      return cached;
    }

    // Fallback to API if cache miss
    const response = await fetch('/api/restaurants/michelin-star');
    const data = await response.json();

    // Cache the result for future requests
    await cache.set(
      CacheKeys.content('restaurant', 'michelin-star'),
      data,
      {
        ttl: 1800,
        tags: [CacheTags.restaurants, CacheTags.content],
      }
    );

    return data;
  } catch (error) {
    console.error('Cache operation failed, using direct API call:', error);
    
    // Final fallback - direct API call without caching
    const response = await fetch('/api/restaurants/michelin-star');
    return response.json();
  }
}

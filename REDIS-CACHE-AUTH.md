# Redis Caching System with Authentication

This document provides a comprehensive guide to the Redis caching system with API token authentication implemented in the GMI website.

## Overview

The caching system provides:
- **Secure API endpoints** for cache management with token authentication
- **Tag-based invalidation** for smart content updates
- **TTL management** with configurable expiration times
- **Statistics and monitoring** for performance tracking
- **Multiple access methods** (direct cache, API endpoints, utility functions)

## Table of Contents

1. [Environment Setup](#environment-setup)
2. [Authentication](#authentication)
3. [Core Components](#core-components)
4. [API Endpoints](#api-endpoints)
5. [Usage Examples](#usage-examples)
6. [Security Considerations](#security-considerations)
7. [Monitoring and Debugging](#monitoring-and-debugging)
8. [Best Practices](#best-practices)

## Environment Setup

### Required Environment Variables

Add these to your `.env.local` file:

```bash
# API Authentication
API_TOKEN=sk_gmi_prod_a8f3d9c2e4b6h8j1k3m5n7p9q2w4e6r8t0y2u4i6o8a1s3d5f7g9h2j4k6l8n0p2

# Redis Configuration
REDIS_URL=redis://svc.gaultmillau.com:6379
```

### Dependencies

Ensure these packages are installed:

```bash
npm install ioredis
npm install --save-dev @types/node
```

## Authentication

### API Token

All cache API endpoints require authentication using a Bearer token or API key.

#### Supported Authentication Methods

1. **Authorization Header (Recommended)**:
   ```bash
   Authorization: Bearer sk_gmi_prod_a8f3d9c2e4b6h8j1k3m5n7p9q2w4e6r8t0y2u4i6o8a1s3d5f7g9h2j4k6l8n0p2
   ```

2. **Custom Header**:
   ```bash
   x-api-token: sk_gmi_prod_a8f3d9c2e4b6h8j1k3m5n7p9q2w4e6r8t0y2u4i6o8a1s3d5f7g9h2j4k6l8n0p2
   ```

3. **Query Parameter**:
   ```
   /api/cache?token=sk_gmi_prod_a8f3d9c2e4b6h8j1k3m5n7p9q2w4e6r8t0y2u4i6o8a1s3d5f7g9h2j4k6l8n0p2&action=stats
   ```

## Core Components

### 1. Redis Client (`/lib/redis.ts`)

Manages Redis connection with health monitoring and automatic reconnection.

```typescript
import { getRedisClient, isRedisHealthy } from './lib/redis';

// Get Redis client instance
const redis = getRedisClient();

// Check Redis health
const healthy = await isRedisHealthy();
```

### 2. Cache Manager (`/lib/cache.ts`)

Provides high-level caching operations with TTL and tag support.

```typescript
import { cache, CacheKeys, CacheTags } from './lib/cache';

// Set cache with tags and TTL
await cache.set('user:123', userData, {
  ttl: 3600,
  tags: ['users', 'profile']
});

// Get from cache
const user = await cache.get('user:123');

// Invalidate by tag
await cache.invalidateByTag('users');
```

### 3. Authentication (`/lib/auth.ts`)

Handles API token validation and request authentication.

```typescript
import { authenticateRequest, validateApiToken } from './lib/auth';

// Authenticate a Next.js request
const authResult = authenticateRequest(request);
if (!authResult.success) {
  return NextResponse.json({ error: authResult.error }, { status: 401 });
}
```

### 4. Cache Client (`/lib/cache-client.ts`)

Provides a client for making authenticated API calls to cache endpoints.

```typescript
import { createServerCacheClient } from './lib/cache-client';

const client = createServerCacheClient();
await client.setCache('key', value, { ttl: 300 });
await client.invalidateByTag('pages');
```

## API Endpoints

### Base URL: `/api/cache`

**Important**: This API is for internal administrative use only. All endpoints require authentication via Bearer token.

### GET Endpoints

#### Get Cache Statistics
```bash
GET /api/cache?action=stats
Authorization: Bearer {token}
```

Response:
```json
{
  "stats": {
    "hits": 1200,
    "misses": 300,
    "sets": 150,
    "deletes": 50,
    "memory": 1048576,
    "keys": 42
  },
  "healthy": true,
  "timestamp": "2025-09-16T10:30:00.000Z"
}
```

#### Health Check
```bash
GET /api/cache?action=health
Authorization: Bearer {token}
```

Response:
```json
{
  "healthy": true,
  "timestamp": "2025-09-16T10:30:00.000Z"
}
```

### POST Endpoints

#### Clear Specific Cache Entry
```bash
POST /api/cache
Authorization: Bearer {token}
Content-Type: application/json

{
  "action": "clear",
  "key": "cache:specific-key",
  "namespace": "app"
}
```

Response:
```json
{
  "success": true,
  "message": "Cache entry cleared for key: cache:specific-key",
  "timestamp": "2025-09-16T10:30:00.000Z"
}
```

#### Clear All Cache Entries
```bash
POST /api/cache
Authorization: Bearer {token}
Content-Type: application/json

{
  "action": "clear-all",
  "namespace": "api"
}
```

Response:
```json
{
  "success": true,
  "message": "Cleared 25 cache entries in namespace: api",
  "count": 25,
  "timestamp": "2025-09-16T10:30:00.000Z"
}
```

#### Clear Cache Entries by Tags
```bash
POST /api/cache
Authorization: Bearer {token}
Content-Type: application/json

{
  "action": "clear-tags",
  "tags": ["users", "products", "api"]
}
```

Response:
```json
{
  "success": true,
  "message": "Cleared 42 cache entries with tags: users, products, api",
  "count": 42,
  "tags": ["users", "products", "api"],
  "timestamp": "2025-09-16T10:30:00.000Z"
}
```

**Note**: If no namespace is provided for `clear-all`, it will clear all entries in the default namespace.

## Usage Examples

### Administrative Operations Only

```typescript
import { CacheApiClient } from './lib/cache-client';

const client = new CacheApiClient({
  baseUrl: 'http://localhost:3000',
  token: process.env.API_TOKEN
});

// Get cache statistics
const stats = await client.getStats();
console.log('Cache stats:', stats);

// Check cache health
const health = await client.getHealth();
console.log('Cache is healthy:', health.healthy);

// Clear specific cache entry
await client.clearCache('cache:user:123');

// Clear all cache entries in a namespace
await client.clearAllCache('api');

// Clear cache entries by multiple tags
await client.clearCacheByTags(['users', 'products', 'api']);
```

### Server-Side Caching (Direct)

```typescript
import { cache, CacheKeys, CacheTags } from '@/lib/cache';

export async function getServerSideProps() {
  const champagneData = await cache.remember(
    CacheKeys.content('champagne', 'bordeaux-2020'),
    async () => {
      const response = await fetch('https://api.example.com/champagnes/bordeaux-2020');
      return response.json();
    },
    {
      ttl: 3600, // 1 hour
      tags: [CacheTags.champagnes, CacheTags.content],
    }
  );

  return { props: { champagneData } };
}

// Direct cache operations with tags
export async function cacheUserData(userId: string, userData: any) {
  await cache.set(`user:${userId}`, userData, {
    ttl: 3600,
    tags: ['users', 'profiles'],
  });
}

// Clear cache entries by tags (server-side)
export async function clearUserCaches() {
  const clearedCount = await cache.invalidateTags(['users', 'profiles']);
  console.log(`Cleared ${clearedCount} user-related cache entries`);
}
```
```

### API Route with Caching

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { cache, CacheKeys } from '@/lib/cache';

export async function GET(request: NextRequest) {
  const cached = await cache.get(CacheKeys.api('restaurants', 'featured'));
  
  if (cached) {
    return NextResponse.json(cached);
  }

  // Fetch fresh data
  const data = await fetchRestaurants();
  
  // Cache for 30 minutes
  await cache.set(CacheKeys.api('restaurants', 'featured'), data, {
    ttl: 1800,
    tags: ['restaurants', 'api']
  });

  return NextResponse.json(data);
}
```

### Cache Management with API Client

```typescript
import { createServerCacheClient } from '@/lib/cache-client';

async function manageCacheExample() {
  const client = createServerCacheClient();

  // Get cache statistics
  const stats = await client.getStats();
  
  // Set cache entry
  await client.setCache('featured:champagnes', data, {
    ttl: 3600,
    tags: ['champagnes', 'featured']
  });

  // Invalidate when content changes
  await client.invalidateByTag('champagnes');
}
```

### Error Handling and Fallbacks

```typescript
async function robustCacheExample() {
  try {
    // Try cache first
    const cached = await cache.get(CacheKeys.content('restaurant', 'michelin-star'));
    if (cached) return cached;

    // Fallback to API
    const response = await fetch('/api/restaurants/michelin-star');
    const data = await response.json();

    // Cache for future requests
    await cache.set(
      CacheKeys.content('restaurant', 'michelin-star'),
      data,
      { ttl: 1800, tags: [CacheTags.restaurants] }
    );

    return data;
  } catch (error) {
    console.error('Cache failed, using direct API:', error);
    
    // Final fallback
    const response = await fetch('/api/restaurants/michelin-star');
    return response.json();
  }
}
```

## Security Considerations

### 1. API Token Security

- **Environment Variables**: Store tokens in environment variables, never in code
- **Token Rotation**: Regularly rotate API tokens
- **Access Control**: Limit token access to authorized systems only

### 2. Request Validation

- All API endpoints validate tokens before processing
- Invalid tokens return 401 Unauthorized
- Request logging for security monitoring

### 3. Cache Content Security

- Don't cache sensitive user data (passwords, tokens)
- Use appropriate TTLs for different data types
- Consider data privacy regulations

## Monitoring and Debugging

### Cache Statistics

Monitor cache performance with built-in statistics:

```typescript
const stats = await cache.getStats();
console.log(`Hit Rate: ${stats.hits / (stats.hits + stats.misses) * 100}%`);
```

### Health Monitoring

```typescript
const healthy = await isRedisHealthy();
if (!healthy) {
  console.error('Redis connection issues detected');
}
```

### Debug Information

```typescript
// Check if key exists
const exists = await cache.exists('user:123');

// Get TTL
const ttl = await cache.getTTL('user:123');

// Get key info via API
const keyInfo = await client.getKeyInfo('user:123');
```

## Best Practices

### 1. Cache Key Naming

Use consistent, hierarchical naming:

```typescript
// Good
CacheKeys.content('champagne', 'bordeaux-2020')  // → "content:champagne:bordeaux-2020"
CacheKeys.api('restaurants', 'featured')         // → "api:restaurants:featured"

// Avoid
'champagne_bordeaux_2020'
'rest-featured'
```

### 2. TTL Strategy

- **Static content**: 24 hours (86400s)
- **Dynamic content**: 30 minutes (1800s)
- **API responses**: 5 minutes (300s)
- **User sessions**: 24 hours (86400s)

### 3. Tag Strategy

Use tags for logical grouping:

```typescript
// Content-based tags
tags: [CacheTags.champagnes, CacheTags.content]

// Feature-based tags
tags: ['featured', 'homepage', 'api']

// Time-based tags
tags: ['daily', 'weekly']
```

### 4. Error Handling

Always provide fallbacks:

```typescript
try {
  return await cache.get(key) ?? await fetchFromAPI();
} catch (error) {
  console.error('Cache error:', error);
  return await fetchFromAPI();
}
```

### 5. Cache Warming

Proactively warm frequently accessed data:

```typescript
// During deployment or scheduled tasks
await client.warmCache('homepage:data', '/api/homepage');
await client.warmCache('featured:content', '/api/featured');
```

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify API_TOKEN in environment
   - Check token format in requests
   - Ensure proper headers

2. **Redis Connection Issues**
   - Verify REDIS_URL configuration
   - Check Redis server status
   - Monitor connection logs

3. **Cache Misses**
   - Check TTL values
   - Verify key naming consistency
   - Monitor invalidation patterns

### Debug Commands

```bash
# Test authentication
curl -H "Authorization: Bearer {token}" http://localhost:3000/api/cache?action=health

# Check Redis connection
redis-cli -u redis://svc.gaultmillau.com:6379 ping

# Monitor Redis operations
redis-cli -u redis://svc.gaultmillau.com:6379 monitor
```

## Production Deployment

### Environment Configuration

Ensure production environment has:
- Secure API token (different from development)
- Proper Redis URL with authentication if needed
- Monitoring and alerting for cache performance

### Performance Tuning

- Monitor hit rates and adjust TTL values
- Use Redis pipelining for bulk operations
- Consider Redis clustering for high load

### Backup and Recovery

- Regular Redis backups
- Monitor Redis memory usage
- Plan for cache warm-up after restarts

---

## API Summary

The Redis cache API now supports 5 administrative operations:

| Action | Method | Purpose | Required Parameters |
|--------|--------|---------|-------------------|
| `stats` | GET | Get cache statistics and health status | None |
| `health` | GET | Check cache health | None |
| `clear` | POST | Clear specific cache entry | `key`, optional `namespace` |
| `clear-all` | POST | Clear all cache entries | Optional `namespace` |
| `clear-tags` | POST | Clear cache entries by tag list | `tags` (array) |

All endpoints require Bearer token authentication for security.

## Testing the Clear-Tags Feature

```bash
# Clear cache entries with multiple tags
curl -X POST http://localhost:3000/api/cache \
  -H "Authorization: Bearer your-api-token" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "clear-tags",
    "tags": ["users", "products", "api"]
  }'

# Response:
# {
#   "success": true,
#   "message": "Cleared 15 cache entries with tags: users, products, api",
#   "count": 15,
#   "tags": ["users", "products", "api"],
#   "timestamp": "2025-09-16T09:30:00.000Z"
# }
```

---

For more information or support, please refer to the Redis documentation or contact the development team.

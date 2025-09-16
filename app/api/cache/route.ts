import { NextRequest, NextResponse } from 'next/server';
import { cache } from '@/lib/cache';
import { authenticateRequest } from '@/lib/auth';
import { isRedisHealthy } from '@/lib/redis';

export async function GET(request: NextRequest) {
  // Authenticate the request
  const authResult = authenticateRequest(request);
  if (!authResult.success) {
    return NextResponse.json(
      { error: authResult.error },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    switch (action) {
      case 'stats':
        const stats = await cache.getStats();
        const healthy = await isRedisHealthy();
        return NextResponse.json({
          stats,
          healthy,
          timestamp: new Date().toISOString(),
        });

      case 'health':
        const health = await isRedisHealthy();
        return NextResponse.json({
          healthy: health,
          timestamp: new Date().toISOString(),
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported actions: stats, health' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Cache API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Authenticate the request
  const authResult = authenticateRequest(request);
  if (!authResult.success) {
    return NextResponse.json(
      { error: authResult.error },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { action, key, namespace, tags } = body;

    switch (action) {
      case 'clear':
        if (!key) {
          return NextResponse.json(
            { error: 'Key is required for clear action' },
            { status: 400 }
          );
        }
        
        await cache.delete(key, { namespace });
        return NextResponse.json({
          success: true,
          message: `Cache entry cleared for key: ${key}`,
          timestamp: new Date().toISOString(),
        });

      case 'clear-all':
        const clearedCount = await cache.clear(namespace);
        return NextResponse.json({
          success: true,
          message: `Cleared ${clearedCount} cache entries${namespace ? ` in namespace: ${namespace}` : ''}`,
          count: clearedCount,
          timestamp: new Date().toISOString(),
        });

      case 'clear-tags':
        if (!tags || !Array.isArray(tags) || tags.length === 0) {
          return NextResponse.json(
            { error: 'Tags array is required for clear-tags action' },
            { status: 400 }
          );
        }
        
        const tagsClearedCount = await cache.invalidateTags(tags);
        return NextResponse.json({
          success: true,
          message: `Cleared ${tagsClearedCount} cache entries with tags: ${tags.join(', ')}`,
          count: tagsClearedCount,
          tags: tags,
          timestamp: new Date().toISOString(),
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported actions: clear, clear-all, clear-tags' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Cache API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

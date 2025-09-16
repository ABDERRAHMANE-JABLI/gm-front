export interface CacheClientConfig {
  baseUrl: string;
  token: string;
}

export interface CacheStats {
  hits: number;
  misses: number;
  sets: number;
  deletes: number;
  memory: number;
  keys: number;
}

export interface ApiResponse<T = unknown> {
  success?: boolean;
  error?: string;
  message?: string;
  data?: T;
  stats?: CacheStats;
  healthy?: boolean;
  timestamp?: string;
  count?: number;
  tags?: string[];
}

export class CacheApiClient {
  private baseUrl: string;
  private token: string;

  constructor(config: CacheClientConfig) {
    this.baseUrl = config.baseUrl;
    this.token = config.token;
  }

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

  async getStats(): Promise<ApiResponse<CacheStats>> {
    return this.request('/api/cache?action=stats');
  }

  async getHealth(): Promise<ApiResponse> {
    return this.request('/api/cache?action=health');
  }

  async clearCache(key: string, namespace?: string): Promise<ApiResponse> {
    return this.request('/api/cache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'clear', key, namespace }),
    });
  }

  async clearAllCache(namespace?: string): Promise<ApiResponse> {
    return this.request('/api/cache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'clear-all', namespace }),
    });
  }

  async clearCacheByTags(tags: string[]): Promise<ApiResponse> {
    return this.request('/api/cache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'clear-tags', tags }),
    });
  }
}

// Create a server-side client using environment variables
export function createServerCacheClient(): CacheApiClient {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const token = process.env.API_TOKEN;

  if (!token) {
    throw new Error('API_TOKEN environment variable is required');
  }

  return new CacheApiClient({ baseUrl, token });
}

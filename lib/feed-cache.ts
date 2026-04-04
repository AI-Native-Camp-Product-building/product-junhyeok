// === Feed Cache: 날짜 기반 in-memory 캐시 (TTL: 1시간) ===

import type { DailyFeedResponse } from "./daily-feed-types";

interface CacheEntry {
  data: DailyFeedResponse;
  timestamp: number;
}

const TTL_MS = 60 * 60 * 1000; // 1시간
const cache = new Map<string, CacheEntry>();

export function getCachedFeed(date: string): DailyFeedResponse | null {
  const entry = cache.get(date);
  if (!entry) return null;

  if (Date.now() - entry.timestamp > TTL_MS) {
    cache.delete(date);
    return null;
  }

  return entry.data;
}

export function setCachedFeed(date: string, data: DailyFeedResponse): void {
  cache.set(date, { data, timestamp: Date.now() });
}

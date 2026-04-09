// === Feed Service: shared L1 → L2 → L3 fetcher ===
//
// Both /api/daily-feed and /api/insights consume today's feed via the same
// 3-tier cache hierarchy. This helper centralizes the lookup so the two
// routes never drift.

import { buildFeed } from "./feed-builder";
import { readStoredFeed, writeStoredFeed } from "./feed-store";
import {
  getCachedFeed,
  getKstDateKey,
  loadFeedSingleFlight,
  setCachedFeed,
} from "./feed-cache";
import type { DailyFeedResponse } from "./daily-feed-types";

/**
 * Returns today's feed using the L1 (memory) → L2 (Blob/fs) → L3 (pipeline)
 * cache hierarchy. Mirrors the path inside app/api/daily-feed/route.ts so any
 * caller gets the same cached payload.
 */
export async function getTodayFeed(): Promise<DailyFeedResponse> {
  const today = getKstDateKey();

  const l1 = getCachedFeed(today);
  if (l1) return l1;

  const l2 = await readStoredFeed(today);
  if (l2) {
    setCachedFeed(today, l2);
    return l2;
  }

  return loadFeedSingleFlight(today, async () => {
    const built = await buildFeed(today);
    if (!built.degraded) {
      setCachedFeed(today, built.response);
      await writeStoredFeed(today, built.response);
    }
    return built.response;
  });
}

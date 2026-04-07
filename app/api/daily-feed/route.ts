// === Daily Feed API Route: 완전한 파이프라인 ===

import { NextResponse } from "next/server";
import { getTodayDigest } from "@/lib/nudget-client";
import { filterContent } from "@/lib/content-filter";
import { transformItems } from "@/lib/nudget-transformer";
import { generateQuizzes } from "@/lib/quiz-generator";
import {
  getCachedFeed,
  getKstDateKey,
  loadFeedSingleFlight,
  setCachedFeed,
} from "@/lib/feed-cache";
import type { DailyFeedResponse } from "@/lib/daily-feed-types";

// 캐시는 lib/feed-cache.ts에서 직접 관리한다 (단일 인스턴스 in-memory + KST 키).
export const dynamic = "force-dynamic";

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
} as const;

interface PipelineResult {
  response: DailyFeedResponse;
  degraded: boolean;
}

async function buildFeed(today: string): Promise<PipelineResult> {
  // 1. Nudget API 호출
  const digest = await getTodayDigest();
  if (!digest || !digest.items || digest.items.length === 0) {
    return {
      response: {
        items: [],
        date: today,
        totalFiltered: 0,
        totalRaw: 0,
      },
      degraded: false,
    };
  }

  const totalRaw = digest.items.length;

  // 2. 콘텐츠 필터링 (Claude Code 관련성 판별)
  const { filtered, categories, degraded } = await filterContent(digest.items);

  // 3. DailyFeedItem[] 변환
  const feedItems = await transformItems(filtered, categories, today);

  // 4. 퀴즈 생성
  const itemsWithQuiz = await generateQuizzes(feedItems);

  return {
    response: {
      items: itemsWithQuiz,
      date: today,
      totalFiltered: itemsWithQuiz.length,
      totalRaw,
    },
    degraded,
  };
}

export async function GET() {
  try {
    const today = getKstDateKey();

    // 1. 캐시 확인 (hit이면 즉시 반환)
    const cached = getCachedFeed(today);
    if (cached) {
      return NextResponse.json(cached, { headers: CACHE_HEADERS });
    }

    // 2. Single-flight: 동시 요청은 첫 호출의 Promise를 공유
    const result = await loadFeedSingleFlight(today, async () => {
      const built = await buildFeed(today);
      // degraded 응답은 캐시하지 않아 다음 요청에서 재시도되도록 한다.
      if (!built.degraded) {
        setCachedFeed(today, built.response);
      }
      return built.response;
    });

    return NextResponse.json(result, { headers: CACHE_HEADERS });
  } catch (error) {
    console.error("Daily feed API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

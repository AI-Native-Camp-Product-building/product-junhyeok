// === Daily Feed API Route: 완전한 파이프라인 ===

import { NextResponse } from "next/server";
import { getTodayDigest } from "@/lib/nudget-client";
import { filterContent } from "@/lib/content-filter";
import { transformItems } from "@/lib/nudget-transformer";
import { generateQuizzes } from "@/lib/quiz-generator";
import { getCachedFeed, setCachedFeed } from "@/lib/feed-cache";
import type { DailyFeedResponse } from "@/lib/daily-feed-types";

export async function GET() {
  try {
    const today = new Date().toISOString().slice(0, 10);

    // 1. 캐시 확인
    const cached = getCachedFeed(today);
    if (cached) {
      return NextResponse.json(cached);
    }

    // 2. Nudget API 호출
    const digest = await getTodayDigest();
    if (!digest || !digest.items || digest.items.length === 0) {
      const emptyResponse: DailyFeedResponse = {
        items: [],
        date: today,
        totalFiltered: 0,
        totalRaw: 0,
      };
      return NextResponse.json(emptyResponse);
    }

    const totalRaw = digest.items.length;

    // 3. 콘텐츠 필터링 (Claude Code 관련성 판별)
    const { filtered, categories } = await filterContent(digest.items);

    // 4. DailyFeedItem[] 변환
    const feedItems = await transformItems(filtered, categories, today);

    // 5. 퀴즈 생성
    const itemsWithQuiz = await generateQuizzes(feedItems);

    // 6. 응답 구성 + 캐시 저장
    const response: DailyFeedResponse = {
      items: itemsWithQuiz,
      date: today,
      totalFiltered: itemsWithQuiz.length,
      totalRaw,
    };

    setCachedFeed(today, response);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Daily feed API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

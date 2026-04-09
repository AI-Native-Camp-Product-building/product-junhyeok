// === GET /api/insights ===
//
// Core API: returns the channels currently being monitored (Nudget
// subscriptions) plus today's curated insights filtered + summarized
// from those channels. Designed for AI agent consumption: schema-typed,
// stable field names, no HTML.
//
// Auth: X-API-Key header. Get a key at https://rush-theta.vercel.app/#api
// or POST /api/keys.

import { NextResponse } from "next/server";
import { getTodayFeed } from "@/lib/feed-service";
import { getSubscriptions } from "@/lib/nudget-client";
import { validateApiKey } from "@/lib/api-keys";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const CACHE_HEADERS = {
  "Cache-Control": "private, max-age=300",
} as const;

export async function GET(request: Request) {
  const apiKey = request.headers.get("x-api-key");

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Missing X-API-Key header.",
        hint: "Get a key at https://rush-theta.vercel.app/#api or POST /api/keys.",
      },
      { status: 401 }
    );
  }

  const ok = await validateApiKey(apiKey);
  if (!ok) {
    return NextResponse.json({ error: "Invalid API key." }, { status: 401 });
  }

  try {
    const [feed, subscriptions] = await Promise.all([
      getTodayFeed(),
      getSubscriptions(),
    ]);

    const channels = (subscriptions ?? []).map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      active: s.active,
    }));

    const insights = feed.items.map((item) => ({
      id: item.id,
      title: item.title,
      summary: item.summary,
      keyPoints: item.keyPoints,
      category: item.category,
      source: {
        name: item.sourceName,
        type: item.sourceType,
        url: item.sourceUrl,
      },
    }));

    return NextResponse.json(
      {
        date: feed.date,
        channels: {
          total: channels.length,
          items: channels,
        },
        insights: {
          total: insights.length,
          items: insights,
        },
        meta: {
          totalRawItems: feed.totalRaw,
          totalFilteredItems: feed.totalFiltered,
          generatedAt: new Date().toISOString(),
        },
      },
      { headers: CACHE_HEADERS }
    );
  } catch (error) {
    console.error("[/api/insights] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

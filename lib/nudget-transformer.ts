// === Nudget Transformer: NudgetContentItem[] → DailyFeedItem[] ===

import OpenAI from "openai";
import type { DailyFeedItem, FeedCategory, SourceType } from "./daily-feed-types";
import type { NudgetContentItem } from "./nudget-client";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface TransformResult {
  items: {
    contentId: string;
    summary: string;
    keyPoints: string[];
  }[];
}

const TRANSFORM_SYSTEM_PROMPT = `You are a content summarizer for a Claude Code learning platform targeting Korean-speaking developers.

For each content item, produce:
1. summary: 2-3 sentence Korean summary focused on what Claude Code users can learn or apply
2. keyPoints: 2-4 bullet points in Korean, each under 80 characters, highlighting actionable insights

Write in a concise, technical tone. Use Korean for explanations but keep technical terms in English (e.g., MCP, hooks, CLI).

Respond with JSON only.`;

function detectSourceType(url: string): SourceType {
  if (!url) return "other";
  const lower = url.toLowerCase();
  if (lower.includes("x.com") || lower.includes("twitter.com")) return "x";
  if (lower.includes("linkedin.com")) return "linkedin";
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "youtube";
  return "rss";
}

function extractSourceName(item: NudgetContentItem): string {
  if (item.source) return item.source;
  try {
    const url = new URL(item.url);
    return url.hostname.replace("www.", "");
  } catch {
    return "unknown";
  }
}

export async function transformItems(
  items: NudgetContentItem[],
  categories: Map<string, FeedCategory>,
  date: string
): Promise<DailyFeedItem[]> {
  if (items.length === 0) return [];

  const itemInputs = items.map((item) => ({
    contentId: item.id,
    title: item.title,
    summary: item.summary,
    url: item.url,
    tags: item.tags,
  }));

  let transformResult: TransformResult | null = null;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: TRANSFORM_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Transform these ${items.length} items for the Claude Code learning feed:\n\n${JSON.stringify(itemInputs, null, 2)}`,
        },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (content) {
      transformResult = JSON.parse(content);
    }
  } catch (error) {
    console.error("Transform API failed, using original content:", error);
  }

  const transformMap = new Map<string, { summary: string; keyPoints: string[] }>();
  if (transformResult?.items) {
    for (const item of transformResult.items) {
      transformMap.set(item.contentId, {
        summary: item.summary,
        keyPoints: item.keyPoints,
      });
    }
  }

  return items.map((item) => {
    const transformed = transformMap.get(item.id);
    return {
      id: `feed-${item.id}`,
      date,
      title: item.title,
      summary: transformed?.summary ?? item.summary,
      keyPoints: transformed?.keyPoints ?? [item.summary],
      sourceUrl: item.url,
      sourceType: detectSourceType(item.url),
      sourceName: extractSourceName(item),
      category: categories.get(item.id) ?? "other",
      nudgetContentId: item.id,
    };
  });
}

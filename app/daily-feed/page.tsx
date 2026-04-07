"use client";

import { useState, useEffect } from "react";
import type { DailyFeedItem, DailyFeedResponse } from "@/lib/daily-feed-types";
import { mockFeedItems } from "@/lib/mock-feed-data";
import { FeedHeader, FeedCardList, CategoryFilter } from "@/components/daily-feed";
import type { FilterOption } from "@/components/daily-feed";

export default function DailyFeedPage() {
  const [items, setItems] = useState<DailyFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");

  useEffect(() => {
    async function loadFeed() {
      const isDev = process.env.NODE_ENV === "development";
      try {
        const res = await fetch("/api/daily-feed");
        if (res.ok) {
          const data: DailyFeedResponse = await res.json();
          setItems(data.items);
        } else if (isDev) {
          // Dev-only fallback to mock data
          setItems(mockFeedItems);
        } else {
          setError("피드를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
        }
      } catch {
        if (isDev) {
          setItems(mockFeedItems);
        } else {
          setError("피드를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
        }
      } finally {
        setLoading(false);
      }
    }
    loadFeed();
  }, []);

  const filteredItems =
    activeFilter === "all"
      ? items
      : items.filter((item) => item.category === activeFilter);

  const today = new Date().toISOString().split("T")[0];

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Skeleton header */}
        <div className="space-y-2">
          <div className="h-8 w-48 bg-surface-800 rounded-lg animate-pulse" />
          <div className="h-4 w-64 bg-surface-800/60 rounded animate-pulse" />
        </div>
        {/* Skeleton filter */}
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-20 bg-surface-800 rounded-full animate-pulse" />
          ))}
        </div>
        {/* Skeleton cards */}
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 bg-surface-800 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 space-y-3">
        <div className="text-4xl">⚠️</div>
        <p className="text-error-400 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-accent-400 hover:text-accent-300 transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FeedHeader date={today} itemCount={items.length} />
      <CategoryFilter active={activeFilter} onChange={setActiveFilter} />
      <FeedCardList items={filteredItems} />
    </div>
  );
}

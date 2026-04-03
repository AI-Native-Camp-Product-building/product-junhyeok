"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useAppState } from "@/lib/state-context";
import { getDay } from "@/lib/curriculum-loader";

export default function DayPage({
  params,
}: {
  params: Promise<{ dayId: string }>;
}) {
  const { dayId } = use(params);
  const router = useRouter();
  const { state } = useAppState();

  const day = getDay(dayId);

  if (!day) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-surface-400 text-lg">존재하지 않는 Day입니다.</p>
        <button
          onClick={() => router.push("/onboarding")}
          className="text-dopamine-400 hover:text-dopamine-300 text-sm transition-colors"
        >
          온보딩으로 돌아가기
        </button>
      </div>
    );
  }

  const dayProgress = state.onboarding.days[dayId];

  // Determine first incomplete block index
  let firstIncompleteIdx = -1;
  for (let i = 0; i < day.blocks.length; i++) {
    const blockStatus = dayProgress?.blocks[day.blocks[i].id]?.status;
    if (blockStatus !== "completed") {
      firstIncompleteIdx = i;
      break;
    }
  }

  // If all blocks completed
  const allCompleted = firstIncompleteIdx === -1 && day.blocks.length > 0;

  // A block is clickable if it's completed or it's the next incomplete one
  function isBlockClickable(index: number): boolean {
    const blockStatus = dayProgress?.blocks[day!.blocks[index].id]?.status;
    if (blockStatus === "completed") return true;
    if (index === firstIncompleteIdx) return true;
    return false;
  }

  function getBlockStatusIcon(blockId: string): string {
    const status = dayProgress?.blocks[blockId]?.status;
    if (status === "completed") return "\u2705";
    if (status === "in_progress") return "\uD83D\uDD04";
    return "\u2B1C";
  }

  return (
    <div className="space-y-8">
      {/* Day header */}
      <div className="space-y-3">
        <span className="text-xs font-semibold text-dopamine-400 uppercase tracking-wider">
          {dayId.replace("-", " ").toUpperCase()}
        </span>
        <h1 className="text-3xl font-bold text-surface-50">{day.title}</h1>
        <p className="text-surface-300 leading-relaxed">{day.description}</p>
        <p className="text-sm text-surface-400">
          약 {day.estimatedMinutes}분
        </p>
      </div>

      {/* Block list */}
      <div className="space-y-3">
        {day.blocks.map((block, i) => {
          const clickable = isBlockClickable(i);
          const statusIcon = getBlockStatusIcon(block.id);

          return (
            <button
              key={block.id}
              onClick={() => {
                if (clickable) {
                  router.push(`/onboarding/${dayId}/${block.id}`);
                }
              }}
              disabled={!clickable}
              className={`w-full text-left rounded-xl border p-4 flex items-center gap-4 transition-all ${
                clickable
                  ? "border-surface-700 bg-surface-900/60 hover:border-dopamine-500/50 hover:bg-surface-900 cursor-pointer"
                  : "border-surface-800 bg-surface-900/30 opacity-40 cursor-not-allowed"
              }`}
            >
              <span className="text-xl shrink-0">{statusIcon}</span>
              <div className="min-w-0">
                <p className="text-xs text-surface-500 mb-0.5">
                  Block {i + 1}
                </p>
                <p className="text-surface-100 font-medium truncate">
                  {block.title}
                </p>
              </div>
              {clickable && (
                <svg
                  className="w-4 h-4 text-surface-500 ml-auto shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {/* Start button */}
      {!allCompleted && firstIncompleteIdx >= 0 && (
        <div className="pt-2">
          <button
            onClick={() =>
              router.push(
                `/onboarding/${dayId}/${day.blocks[firstIncompleteIdx].id}`
              )
            }
            className="w-full py-3 rounded-xl bg-dopamine-500 hover:bg-dopamine-600 text-white font-semibold text-lg transition-colors"
          >
            {firstIncompleteIdx === 0 ? "Day 시작하기" : "이어서 학습하기"}
          </button>
        </div>
      )}

      {allCompleted && (
        <div className="text-center py-4 space-y-2">
          <p className="text-streak-400 font-semibold text-lg">
            모든 블록을 완료했습니다!
          </p>
          <button
            onClick={() => router.push("/onboarding")}
            className="text-sm text-surface-400 hover:text-dopamine-400 transition-colors"
          >
            코스 목록으로 돌아가기
          </button>
        </div>
      )}

      {/* Back link */}
      <div className="text-center pt-2">
        <button
          onClick={() => router.push("/onboarding")}
          className="text-sm text-surface-400 hover:text-surface-200 transition-colors"
        >
          코스 목록으로
        </button>
      </div>
    </div>
  );
}

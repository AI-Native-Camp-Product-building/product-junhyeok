"use client";

import { useRouter } from "next/navigation";
import { useAppState } from "@/lib/state-context";
import { getDays } from "@/lib/curriculum-loader";
import { calculateStreak } from "@/lib/streak";

export default function OnboardingPage() {
  const router = useRouter();
  const { state } = useAppState();
  const days = getDays();

  // Compute completed blocks count
  let completedBlocks = 0;
  for (const day of days) {
    const dayProgress = state.onboarding.days[day.id];
    if (dayProgress) {
      for (const block of day.blocks) {
        if (dayProgress.blocks[block.id]?.status === "completed") {
          completedBlocks++;
        }
      }
    }
  }

  // Helper: compute day progress percentage
  function dayProgressPercent(dayId: string): number {
    const day = days.find((d) => d.id === dayId);
    if (!day || day.blocks.length === 0) return 0;
    const dayState = state.onboarding.days[dayId];
    if (!dayState) return 0;
    let done = 0;
    for (const block of day.blocks) {
      if (dayState.blocks[block.id]?.status === "completed") done++;
    }
    return Math.round((done / day.blocks.length) * 100);
  }

  // Determine current streak
  const streak = state.streak;

  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="text-center space-y-4 pt-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-dopamine-300 via-dopamine-400 to-spark-400 bg-clip-text text-transparent">
          Claude Code 마스터하기
        </h1>
        <p className="text-surface-300 text-lg max-w-xl mx-auto">
          7일 온보딩 코스로 Claude Code의 모든 것을 배워보세요
        </p>
      </div>

      {/* Day cards grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {days.map((day) => {
          const isAvailable = day.status === "available";
          const isCompleted =
            state.onboarding.days[day.id]?.status === "completed";
          const progress = dayProgressPercent(day.id);

          return (
            <button
              key={day.id}
              onClick={() => {
                if (isAvailable) router.push(`/onboarding/${day.id}`);
              }}
              disabled={!isAvailable}
              className={`text-left rounded-xl border p-5 transition-all ${
                isAvailable
                  ? "border-surface-700 bg-surface-900/60 hover:border-dopamine-500/50 hover:bg-surface-900 cursor-pointer"
                  : "border-surface-800 bg-surface-900/30 opacity-50 cursor-not-allowed"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-dopamine-400 uppercase tracking-wider">
                      {day.id.replace("-", " ").toUpperCase()}
                    </span>
                    {isCompleted && (
                      <span className="text-streak-400 text-sm">✅</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-surface-100 truncate">
                    {day.title}
                  </h3>
                  <p className="text-sm text-surface-400 line-clamp-2">
                    {day.description}
                  </p>
                </div>

                {!isAvailable && (
                  <div className="shrink-0 mt-1">
                    <svg
                      className="w-5 h-5 text-surface-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Progress or locked label */}
              <div className="mt-4">
                {isAvailable ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-surface-400">
                      <span>진행률</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-surface-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-dopamine-400 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <span className="text-xs text-surface-500">준비 중</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-surface-800 bg-surface-900/40 p-4 text-center">
          <p className="text-2xl font-bold text-dopamine-400 tabular-nums">
            {state.totalStudyMinutes}
          </p>
          <p className="text-xs text-surface-400 mt-1">총 학습시간(분)</p>
        </div>
        <div className="rounded-xl border border-surface-800 bg-surface-900/40 p-4 text-center">
          <p className="text-2xl font-bold text-spark-400 tabular-nums">
            {completedBlocks}
          </p>
          <p className="text-xs text-surface-400 mt-1">완료한 블록</p>
        </div>
        <div className="rounded-xl border border-surface-800 bg-surface-900/40 p-4 text-center">
          <p className="text-2xl font-bold text-streak-400 tabular-nums">
            {streak.current}
          </p>
          <p className="text-xs text-surface-400 mt-1">현재 스트릭</p>
        </div>
      </div>

      {/* Skip quiz link */}
      <div className="text-center pb-4">
        <button
          onClick={() => router.push("/onboarding/skip-quiz")}
          className="text-sm text-surface-400 hover:text-dopamine-400 transition-colors underline underline-offset-4"
        >
          이미 Claude Code를 알고 있나요?
        </button>
      </div>
    </div>
  );
}

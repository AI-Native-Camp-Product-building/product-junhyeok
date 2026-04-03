"use client";

import { use, useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppState } from "@/lib/state-context";
import { getDay, getBlock } from "@/lib/curriculum-loader";
import { calculateStreak } from "@/lib/streak";
import { checkBadges } from "@/lib/badges";

import BlockProgress from "@/components/onboarding/BlockProgress";
import ExplainCard from "@/components/onboarding/ExplainCard";
import ExecuteTask from "@/components/onboarding/ExecuteTask";
import QuizQuestion from "@/components/onboarding/QuizQuestion";
import CelebrationAnimation from "@/components/gamification/CelebrationAnimation";

type Phase = "explain" | "execute" | "quiz" | "complete";

export default function BlockPage({
  params,
}: {
  params: Promise<{ dayId: string; blockId: string }>;
}) {
  const { dayId, blockId } = use(params);
  const router = useRouter();
  const { state, updateState } = useAppState();

  const [phase, setPhase] = useState<Phase>("explain");
  const [executeScore, setExecuteScore] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const startTimeRef = useRef<number>(Date.now());

  const day = getDay(dayId);
  const block = getBlock(dayId, blockId);

  // Mark block as in_progress on mount
  useEffect(() => {
    if (!day || !block) return;
    updateState((prev) => {
      const dayProgress = prev.onboarding.days[dayId] ?? {
        status: "in_progress" as const,
        blocks: {},
        completedAt: null,
      };
      const blockProgress = dayProgress.blocks[blockId] ?? {
        status: "not_started" as const,
        explainSkipped: false,
        executeScore: null,
        quizScore: null,
        timeSpentSeconds: 0,
      };
      if (blockProgress.status === "completed") return prev;
      return {
        ...prev,
        onboarding: {
          ...prev.onboarding,
          days: {
            ...prev.onboarding.days,
            [dayId]: {
              ...dayProgress,
              status: "in_progress" as const,
              blocks: {
                ...dayProgress.blocks,
                [blockId]: {
                  ...blockProgress,
                  status: "in_progress" as const,
                },
              },
            },
          },
        },
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayId, blockId]);

  const handleExplainComplete = useCallback(() => {
    setPhase("execute");
  }, []);

  const handleExplainSkip = useCallback(() => {
    setPhase("execute");
  }, []);

  const handleExecuteComplete = useCallback((score: number) => {
    setExecuteScore(score);
    setPhase("quiz");
  }, []);

  const handleQuizComplete = useCallback(
    (score: number, total: number) => {
      setQuizScore(score);
      setQuizTotal(total);

      const timeSpentSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      const timeSpentMinutes = Math.round(timeSpentSeconds / 60);

      // Perform all state updates atomically
      updateState((prev) => {
        // Build updated block progress
        const dayProgress = prev.onboarding.days[dayId] ?? {
          status: "in_progress" as const,
          blocks: {},
          completedAt: null,
        };
        const blockProgress = dayProgress.blocks[blockId] ?? {
          status: "not_started" as const,
          explainSkipped: false,
          executeScore: null,
          quizScore: null,
          timeSpentSeconds: 0,
        };

        const updatedBlock = {
          ...blockProgress,
          status: "completed" as const,
          executeScore: score,
          quizScore: score,
          timeSpentSeconds,
        };

        const updatedBlocks = {
          ...dayProgress.blocks,
          [blockId]: updatedBlock,
        };

        // Check if all blocks in this day are completed
        const allBlocksDone =
          day!.blocks.length > 0 &&
          day!.blocks.every(
            (b) => updatedBlocks[b.id]?.status === "completed"
          );

        const updatedDayProgress = {
          ...dayProgress,
          blocks: updatedBlocks,
          status: allBlocksDone
            ? ("completed" as const)
            : ("in_progress" as const),
          completedAt: allBlocksDone
            ? new Date().toISOString()
            : dayProgress.completedAt,
        };

        // Calculate streak
        const updatedStreak = calculateStreak(prev.streak);

        // Build new history entry
        const historyEntry = {
          date: new Date().toISOString(),
          dayId,
          duration: timeSpentMinutes,
          quizScore: score,
          quizTotal: total,
        };

        const nextState = {
          ...prev,
          onboarding: {
            ...prev.onboarding,
            days: {
              ...prev.onboarding.days,
              [dayId]: updatedDayProgress,
            },
          },
          streak: updatedStreak,
          totalStudyMinutes: prev.totalStudyMinutes + timeSpentMinutes,
          totalSessions: prev.totalSessions + 1,
          history: [...prev.history, historyEntry],
        };

        // Check for new badges
        const earned = checkBadges(nextState);
        if (earned.length > 0) {
          nextState.badges = [...nextState.badges, ...earned];
          // We need to signal new badges via a side channel since setState is sync
          // Using a timeout to set celebration state after this update
          setTimeout(() => {
            setNewBadges(earned);
            setShowCelebration(true);
          }, 0);
        }

        return nextState;
      });

      setPhase("complete");
    },
    [dayId, blockId, day, updateState]
  );

  // Navigation helpers
  const getNextBlockId = (): string | null => {
    if (!day) return null;
    const currentIdx = day.blocks.findIndex((b) => b.id === blockId);
    if (currentIdx < 0 || currentIdx >= day.blocks.length - 1) return null;
    return day.blocks[currentIdx + 1].id;
  };

  const isLastBlock = (): boolean => {
    if (!day) return true;
    const currentIdx = day.blocks.findIndex((b) => b.id === blockId);
    return currentIdx === day.blocks.length - 1;
  };

  // Error states
  if (!day || !block) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-surface-400 text-lg">
          존재하지 않는 블록입니다.
        </p>
        <button
          onClick={() => router.push("/onboarding")}
          className="text-dopamine-400 hover:text-dopamine-300 text-sm transition-colors"
        >
          온보딩으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header: block progress + timer */}
      <div className="flex items-center justify-between">
        <BlockProgress
          currentPhase={phase === "complete" ? "quiz" : phase}
        />
        <div className="text-sm text-surface-400 tabular-nums">
          {Math.round((Date.now() - startTimeRef.current) / 60000) || 0}분
          경과
        </div>
      </div>

      {/* Block title */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-surface-50">{block.title}</h2>
      </div>

      {/* Phase content */}
      <div className="rounded-xl border border-surface-800 bg-surface-900/40 p-6">
        {phase === "explain" && (
          <ExplainCard
            content={block.explain}
            onComplete={handleExplainComplete}
            onSkip={handleExplainSkip}
            blockId={blockId}
          />
        )}

        {phase === "execute" && (
          <div className="space-y-4">
            <ExecuteTask
              content={block.execute}
              onComplete={handleExecuteComplete}
            />
            <button
              onClick={() => handleExecuteComplete(0)}
              className="block mx-auto text-xs text-surface-500 hover:text-surface-300 transition-colors"
            >
              건너뛰기 →
            </button>
          </div>
        )}

        {phase === "quiz" && (
          <div className="space-y-4">
            <QuizQuestion
              questions={block.quiz.questions}
              onComplete={handleQuizComplete}
              topicId={block.topicId}
              dayId={dayId}
              blockId={blockId}
            />
            <button
              onClick={() => handleQuizComplete(0, block.quiz.questions.length)}
              className="block mx-auto text-xs text-surface-500 hover:text-surface-300 transition-colors"
            >
              건너뛰기 →
            </button>
          </div>
        )}

        {phase === "complete" && (
          <div className="space-y-8">
            {/* Results */}
            <div className="text-center space-y-4 py-4">
              <div className="text-5xl font-bold text-dopamine-400">
                블록 완료!
              </div>
              <p className="text-surface-300">학습 결과를 확인하세요</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-surface-700 bg-surface-800/50 p-4 text-center">
                <p className="text-xs text-surface-400 mb-1">실습 점수</p>
                <p className="text-2xl font-bold text-spark-400">
                  {executeScore}
                </p>
              </div>
              <div className="rounded-xl border border-surface-700 bg-surface-800/50 p-4 text-center">
                <p className="text-xs text-surface-400 mb-1">퀴즈 점수</p>
                <p className="text-2xl font-bold text-dopamine-400">
                  {quizScore}/{quizTotal}
                </p>
              </div>
            </div>

            {/* New badges */}
            {newBadges.length > 0 && (
              <div className="text-center space-y-2">
                <p className="text-sm text-streak-400 font-semibold">
                  새로운 뱃지를 획득했습니다!
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-center pt-2">
              {isLastBlock() ? (
                <button
                  onClick={() => router.push("/onboarding")}
                  className="px-8 py-3 rounded-xl bg-dopamine-500 hover:bg-dopamine-600 text-white font-semibold transition-colors"
                >
                  Day 완료!
                </button>
              ) : (
                <button
                  onClick={() => {
                    const nextId = getNextBlockId();
                    if (nextId) {
                      router.push(`/onboarding/${dayId}/${nextId}`);
                    }
                  }}
                  className="px-8 py-3 rounded-xl bg-dopamine-500 hover:bg-dopamine-600 text-white font-semibold transition-colors"
                >
                  다음 블록으로
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Celebration animation */}
      <CelebrationAnimation
        show={showCelebration}
        type={newBadges.length > 0 ? "badge" : "confetti"}
        onComplete={() => setShowCelebration(false)}
      />
    </div>
  );
}

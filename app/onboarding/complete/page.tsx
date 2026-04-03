"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useAppState } from "@/lib/state-context";
import { BADGES } from "@/lib/badges";
import {
  CelebrationAnimation,
  BadgeGrid,
  HeatmapCalendar,
} from "@/components/gamification";

interface TopicAnalysis {
  topicId: string;
  correct: number;
  total: number;
  percentage: number;
}

export default function OnboardingCompletePage() {
  const { state } = useAppState();

  const stats = useMemo(() => {
    const totalMinutes = state.totalStudyMinutes;

    const completedBlocks = Object.values(state.onboarding.days).reduce(
      (acc, day) => {
        return (
          acc +
          Object.values(day.blocks).filter((b) => b.status === "completed")
            .length
        );
      },
      0
    );

    const quizResponses = state.feedback.quizResponses;
    const correctCount = quizResponses.filter((r) => r.correct).length;
    const quizAccuracy =
      quizResponses.length > 0
        ? Math.round((correctCount / quizResponses.length) * 100)
        : 0;

    const currentStreak = state.streak.current;

    return { totalMinutes, completedBlocks, quizAccuracy, currentStreak };
  }, [state]);

  const topicAnalysis = useMemo(() => {
    const byTopic: Record<string, { correct: number; total: number }> = {};

    for (const resp of state.feedback.quizResponses) {
      if (!byTopic[resp.topicId]) {
        byTopic[resp.topicId] = { correct: 0, total: 0 };
      }
      byTopic[resp.topicId].total++;
      if (resp.correct) {
        byTopic[resp.topicId].correct++;
      }
    }

    const topics: TopicAnalysis[] = Object.entries(byTopic).map(
      ([topicId, data]) => ({
        topicId,
        correct: data.correct,
        total: data.total,
        percentage:
          data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
      })
    );

    return topics;
  }, [state.feedback.quizResponses]);

  const strongTopics = topicAnalysis.filter((t) => t.percentage >= 80);
  const weakTopics = topicAnalysis.filter((t) => t.percentage < 80);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 sm:py-20">
      <CelebrationAnimation show={true} type="confetti" />

      {/* Celebration Header */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold gradient-text leading-tight">
          온보딩 완료!
        </h1>
        <p className="text-lg text-surface-200/70">
          축하합니다! 온보딩 과정을 모두 마쳤습니다.
        </p>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl mb-12">
        <div className="rounded-2xl bg-surface-800/60 border border-surface-800 p-5 text-center space-y-1">
          <div className="text-3xl font-bold text-dopamine-400">
            {stats.totalMinutes}
            <span className="text-base text-dopamine-400/60">분</span>
          </div>
          <div className="text-xs text-surface-200/60">총 학습 시간</div>
        </div>
        <div className="rounded-2xl bg-surface-800/60 border border-surface-800 p-5 text-center space-y-1">
          <div className="text-3xl font-bold text-spark-400">
            {stats.completedBlocks}
            <span className="text-base text-spark-400/60">개</span>
          </div>
          <div className="text-xs text-surface-200/60">완료한 블록</div>
        </div>
        <div className="rounded-2xl bg-surface-800/60 border border-surface-800 p-5 text-center space-y-1">
          <div className="text-3xl font-bold text-streak-400">
            {stats.quizAccuracy}
            <span className="text-base text-streak-400/60">%</span>
          </div>
          <div className="text-xs text-surface-200/60">퀴즈 정답률</div>
        </div>
        <div className="rounded-2xl bg-surface-800/60 border border-surface-800 p-5 text-center space-y-1">
          <div className="text-3xl font-bold text-dopamine-300">
            {stats.currentStreak}
            <span className="text-base text-dopamine-300/60">일</span>
          </div>
          <div className="text-xs text-surface-200/60">현재 스트릭</div>
        </div>
      </div>

      {/* Strengths / Weaknesses Analysis */}
      {topicAnalysis.length > 0 && (
        <div className="w-full max-w-3xl mb-12 space-y-6">
          <h2 className="text-xl font-bold text-surface-50">
            강점 / 약점 분석
          </h2>

          {strongTopics.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-streak-400">
                강점 토픽
              </h3>
              <div className="flex flex-wrap gap-2">
                {strongTopics.map((t) => (
                  <span
                    key={t.topicId}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-streak-500/15 border border-streak-400/25 text-streak-400 text-xs font-medium"
                  >
                    {t.topicId}
                    <span className="text-streak-400/60">{t.percentage}%</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {weakTopics.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-amber-400">
                약점 토픽
              </h3>
              <div className="flex flex-wrap gap-2">
                {weakTopics.map((t) => (
                  <span
                    key={t.topicId}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/25 text-amber-400 text-xs font-medium"
                  >
                    {t.topicId}
                    <span className="text-amber-400/60">{t.percentage}%</span>
                    <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded-full">
                      복습 추천
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Badge Grid */}
      <div className="w-full max-w-3xl mb-12 space-y-4">
        <h2 className="text-xl font-bold text-surface-50">뱃지 획득 현황</h2>
        <BadgeGrid unlockedBadges={state.badges} />
      </div>

      {/* Heatmap Calendar */}
      <div className="w-full max-w-3xl mb-12 space-y-4">
        <h2 className="text-xl font-bold text-surface-50">학습 히트맵</h2>
        <HeatmapCalendar history={state.history} />
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
        {weakTopics.length > 0 && (
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-spark-500 text-white font-semibold text-sm shadow-lg shadow-amber-600/20 hover:shadow-amber-600/35 hover:scale-[1.02] transition-all duration-300"
          >
            약점 토픽 복습하기
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        )}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-surface-200/15 text-surface-200/70 text-sm font-medium hover:border-surface-200/30 hover:text-surface-200 transition-all"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

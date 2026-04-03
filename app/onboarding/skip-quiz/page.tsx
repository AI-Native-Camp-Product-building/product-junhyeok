"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getSkipQuizQuestions } from "@/lib/curriculum-loader";
import { useAppState } from "@/lib/state-context";
import type { QuizQuestion } from "@/lib/types";
import { ProgressBar } from "@/components/ui";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Fisher-Yates shuffle (returns new array) */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Phase = "intro" | "quiz" | "result";

interface QuizItem {
  question: QuizQuestion;
  options: string[];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SkipQuizPage() {
  const router = useRouter();
  const { updateState } = useAppState();

  // -- data -----------------------------------------------------------------
  const [items, setItems] = useState<QuizItem[]>([]);

  useEffect(() => {
    const questions = getSkipQuizQuestions(["day-1"]);
    setItems(
      questions.map((q) => ({
        question: q,
        options: shuffle([q.answer, ...q.distractors]),
      })),
    );
  }, []);

  // -- state ----------------------------------------------------------------
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongTopics, setWrongTopics] = useState<string[]>([]);
  const questionStartRef = useRef<number>(Date.now());

  const total = items.length;
  const current = items[currentIdx] as QuizItem | undefined;
  const isCorrect = selected !== null && current ? selected === current.question.answer : false;
  const passThreshold = 0.8;
  const passed = total > 0 && correctCount / total >= passThreshold;

  // -- handlers -------------------------------------------------------------
  const handleSelect = useCallback(
    (option: string) => {
      if (selected !== null || !current) return;

      const timeMs = Date.now() - questionStartRef.current;
      const correct = option === current.question.answer;

      setSelected(option);

      if (correct) {
        setCorrectCount((c) => c + 1);
      } else {
        setWrongTopics((prev) => {
          const topic = current.question.question;
          return prev.includes(topic) ? prev : [...prev, topic];
        });
      }

      updateState((prev) => ({
        ...prev,
        feedback: {
          ...prev.feedback,
          quizResponses: [
            ...prev.feedback.quizResponses,
            {
              date: new Date().toISOString(),
              dayId: "day-1",
              blockId: "skip-quiz",
              topicId: "skip-quiz",
              correct,
              timeMs,
            },
          ],
        },
      }));
    },
    [selected, current, updateState],
  );

  const handleNext = useCallback(() => {
    if (currentIdx + 1 < total) {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      questionStartRef.current = Date.now();
    } else {
      setPhase("result");
    }
  }, [currentIdx, total]);

  const handlePass = useCallback(() => {
    updateState((prev) => ({
      ...prev,
      onboarding: {
        ...prev.onboarding,
        days: {
          ...prev.onboarding.days,
          "day-1": {
            status: "completed" as const,
            blocks: {},
            completedAt: new Date().toISOString(),
          },
        },
        completedAt: new Date().toISOString(),
      },
    }));
    router.push("/onboarding/complete");
  }, [updateState, router]);

  // -- score display --------------------------------------------------------
  const scoreText = useMemo(() => {
    if (total === 0) return "";
    const pct = Math.round((correctCount / total) * 100);
    return `${correctCount}/${total} 정답 (${pct}%)`;
  }, [correctCount, total]);

  // =========================================================================
  // RENDER
  // =========================================================================

  // -- INTRO ----------------------------------------------------------------
  if (phase === "intro") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-2xl bg-surface-800 p-8 text-center shadow-xl">
          <h1 className="mb-4 text-3xl font-bold gradient-text">
            이미 Claude Code를 알고 계신가요?
          </h1>
          <p className="mb-2 text-surface-200">
            간단한 퀴즈로 실력을 확인해 보세요.
          </p>
          <p className="mb-8 text-sm text-surface-200/70">
            {total > 0 ? `${total}문제` : "..."} &middot; 5분 이내 &middot;
            80% 이상 맞추면 Day 1을 건너뜁니다
          </p>
          <button
            onClick={() => setPhase("quiz")}
            disabled={total === 0}
            className="rounded-xl bg-dopamine-600 px-8 py-3 font-semibold text-white transition hover:bg-dopamine-500 disabled:opacity-40"
          >
            시작하기
          </button>
          <button
            onClick={handlePass}
            className="mt-4 block mx-auto text-xs text-surface-500 hover:text-surface-300 transition-colors"
          >
            퀴즈 없이 건너뛰기 →
          </button>
        </div>
      </div>
    );
  }

  // -- QUIZ -----------------------------------------------------------------
  if (phase === "quiz" && current) {
    return (
      <div className="flex min-h-screen flex-col items-center px-4 pt-12">
        {/* Progress bar */}
        <div className="mb-8 w-full max-w-lg">
          <div className="mb-2 flex items-center justify-between text-sm text-surface-200/70">
            <span>
              {currentIdx + 1}/{total} 문제
            </span>
            <span>{Math.round(((currentIdx + 1) / total) * 100)}%</span>
          </div>
          <ProgressBar value={((currentIdx + 1) / total) * 100} color="dopamine" trackColor="surface-900" />
        </div>

        {/* Question card */}
        <div className="w-full max-w-lg rounded-2xl bg-surface-800 p-8 shadow-xl">
          <p className="mb-6 text-lg font-medium text-surface-50">
            {current.question.question}
          </p>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {current.options.map((option) => {
              const isThisCorrect = option === current.question.answer;
              const isSelected = option === selected;

              let borderColor = "border-surface-800 hover:border-dopamine-500/50";
              let bgColor = "bg-surface-900";

              if (selected !== null) {
                if (isThisCorrect) {
                  borderColor = "border-streak-500";
                  bgColor = "bg-streak-500/10";
                } else if (isSelected && !isThisCorrect) {
                  borderColor = "border-error-500";
                  bgColor = "bg-error-500/10";
                } else {
                  borderColor = "border-surface-800";
                  bgColor = "bg-surface-900 opacity-50";
                }
              }

              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  disabled={selected !== null}
                  className={`rounded-xl border-2 ${borderColor} ${bgColor} px-5 py-4 text-left text-sm transition-all ${
                    selected === null ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Feedback + Next */}
          {selected !== null && (
            <div className="mt-6 flex items-center justify-between">
              <span
                className={`text-sm font-medium ${
                  isCorrect ? "text-streak-400" : "text-error-400"
                }`}
              >
                {isCorrect ? "정답입니다!" : "오답입니다"}
              </span>
              <button
                onClick={handleNext}
                className="rounded-lg bg-dopamine-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-dopamine-500"
              >
                {currentIdx + 1 < total ? "다음" : "결과 보기"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // -- RESULT: PASS ---------------------------------------------------------
  if (phase === "result" && passed) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-2xl bg-surface-800 p-8 text-center shadow-xl">
          <p className="mb-2 text-5xl">&#127881;</p>
          <h2 className="mb-4 text-3xl font-bold gradient-text">축하합니다!</h2>
          <p className="mb-2 text-xl font-semibold text-surface-50">
            {scoreText}
          </p>
          <p className="mb-8 text-surface-200">
            Day 1 학습을 건너뛰었습니다
          </p>
          <button
            onClick={handlePass}
            className="rounded-xl bg-dopamine-600 px-8 py-3 font-semibold text-white transition hover:bg-dopamine-500"
          >
            다음 단계로
          </button>
        </div>
      </div>
    );
  }

  // -- RESULT: FAIL ---------------------------------------------------------
  if (phase === "result" && !passed) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-2xl bg-surface-800 p-8 text-center shadow-xl">
          <h2 className="mb-4 text-3xl font-bold text-surface-50">
            아쉬워요
          </h2>
          <p className="mb-2 text-xl font-semibold text-surface-50">
            {scoreText}
          </p>
          <p className="mb-6 text-surface-200">
            80% 이상이면 Day 1을 건너뛸 수 있어요.
            <br />
            아래 토픽을 복습하면 도움이 됩니다.
          </p>

          {wrongTopics.length > 0 && (
            <div className="mb-8 rounded-xl bg-surface-900 p-5 text-left">
              <p className="mb-3 text-sm font-medium text-surface-200/70">
                틀린 문제 토픽
              </p>
              <ul className="flex flex-col gap-2">
                {wrongTopics.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-start gap-2 text-sm text-error-400"
                  >
                    <span className="mt-0.5 shrink-0">&#10005;</span>
                    <span className="text-surface-200">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push("/onboarding")}
              className="rounded-xl bg-dopamine-600 px-8 py-3 font-semibold text-white transition hover:bg-dopamine-500"
            >
              해당 토픽부터 학습하기
            </button>
            <button
              onClick={() => router.push("/onboarding")}
              className="rounded-xl border border-surface-200/20 px-8 py-3 text-sm font-medium text-surface-200 transition hover:bg-surface-900"
            >
              처음부터 시작하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -- Loading fallback -----------------------------------------------------
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-surface-200/50">로딩 중...</p>
    </div>
  );
}

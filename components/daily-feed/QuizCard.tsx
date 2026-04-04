"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/daily-feed-types";

interface QuizCardProps {
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
  className?: string;
}

export default function QuizCard({ questions, onComplete, className = "" }: QuizCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentIndex];
  if (!question) return null;

  // Shuffle answer + distractors into options (stable per question)
  const options = [question.answer, ...question.distractors];
  // Use a deterministic sort based on the option text for consistency
  const sortedOptions = [...options].sort((a, b) => {
    const hashA = a.split("").reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0);
    const hashB = b.split("").reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0);
    return hashA - hashB;
  });

  const handleSelect = (option: string) => {
    if (isRevealed) return;
    setSelectedAnswer(option);
    setIsRevealed(true);
    if (option === question.answer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsRevealed(false);
    } else {
      const finalScore = selectedAnswer === question.answer ? score : score;
      setFinished(true);
      onComplete?.(finalScore, questions.length);
    }
  };

  if (finished) {
    return (
      <div className={`rounded-xl border border-surface-700 bg-surface-800 p-6 text-center space-y-4 ${className}`}>
        <div className="text-4xl font-bold text-accent-400">
          {score}/{questions.length}
        </div>
        <p className="text-surface-300 text-sm">
          {score === questions.length
            ? "완벽합니다!"
            : score >= questions.length / 2
              ? "잘했습니다!"
              : "다시 도전해보세요!"}
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-surface-700 bg-surface-800 p-6 space-y-5 ${className}`}>
      {/* Progress */}
      <div className="flex items-center justify-between text-xs text-surface-500">
        <span className="font-mono">
          Q{currentIndex + 1}/{questions.length}
        </span>
        <span className="tabular-nums">{score}점</span>
      </div>

      {/* Question */}
      <p className="text-base font-semibold text-surface-100 leading-relaxed">
        {question.question}
      </p>

      {/* Options */}
      <div className="space-y-2">
        {sortedOptions.map((option, i) => {
          let optionStyle = "border-surface-600 hover:border-surface-500 text-surface-200";
          if (isRevealed) {
            if (option === question.answer) {
              optionStyle = "border-streak-500 bg-streak-500/10 text-streak-400";
            } else if (option === selectedAnswer) {
              optionStyle = "border-error-500 bg-error-500/10 text-error-400";
            } else {
              optionStyle = "border-surface-700 text-surface-500 opacity-60";
            }
          } else if (option === selectedAnswer) {
            optionStyle = "border-accent-500 bg-accent-500/10 text-accent-300";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              disabled={isRevealed}
              className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${optionStyle}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {isRevealed && question.explanation && (
        <div className="rounded-lg bg-surface-900/60 border border-surface-700 p-4 text-sm text-surface-300 leading-relaxed">
          <span className="font-semibold text-accent-400">설명: </span>
          {question.explanation}
        </div>
      )}

      {/* Next button */}
      {isRevealed && (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm transition-colors"
        >
          {currentIndex < questions.length - 1 ? "다음 문제" : "결과 보기"}
        </button>
      )}
    </div>
  );
}

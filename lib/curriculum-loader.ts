import type { Day, Block, QuizQuestion } from "@/lib/types";
import { days } from "@/data/onboarding";

/**
 * 전체 Day 배열을 반환합니다.
 */
export function getDays(): Day[] {
  return days;
}

/**
 * dayId로 특정 Day를 찾아 반환합니다.
 */
export function getDay(dayId: string): Day | undefined {
  return days.find((d) => d.id === dayId);
}

/**
 * dayId와 blockId로 특정 Block을 찾아 반환합니다.
 */
export function getBlock(dayId: string, blockId: string): Block | undefined {
  const day = getDay(dayId);
  if (!day) return undefined;
  return day.blocks.find((b) => b.id === blockId);
}

/**
 * 스킵 평가용 퀴즈 질문을 수집합니다.
 * 지정된 Day들(기본: 전체)에서 각 토픽당 1-2개 질문을 추출합니다.
 */
export function getSkipQuizQuestions(
  availableDays?: string[],
): QuizQuestion[] {
  const targetDays = availableDays
    ? days.filter((d) => availableDays.includes(d.id))
    : days;

  const questions: QuizQuestion[] = [];

  for (const day of targetDays) {
    for (const block of day.blocks) {
      const blockQuestions = block.quiz.questions;
      // 각 블록에서 최대 2개 질문 추출
      const count = Math.min(2, blockQuestions.length);
      for (let i = 0; i < count; i++) {
        questions.push(blockQuestions[i]);
      }
    }
  }

  return questions;
}

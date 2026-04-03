import type { StreakState } from "./types";

/** Get today's date as YYYY-MM-DD string in user's local timezone */
export function getToday(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Get yesterday's date as YYYY-MM-DD string in user's local timezone */
export function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Calculate updated streak based on last study date.
 *
 * Rules:
 * - lastStudyDate === today -> maintain current (no change)
 * - lastStudyDate === yesterday -> current + 1, update longest if needed
 * - lastStudyDate is anything else (or null) -> reset current to 1
 * Always update lastStudyDate to today.
 */
export function calculateStreak(streak: StreakState): StreakState {
  const today = getToday();
  const yesterday = getYesterday();

  if (streak.lastStudyDate === today) {
    return { ...streak };
  }

  if (streak.lastStudyDate === yesterday) {
    const newCurrent = streak.current + 1;
    return {
      current: newCurrent,
      longest: Math.max(streak.longest, newCurrent),
      lastStudyDate: today,
    };
  }

  // First study ever, or gap > 1 day: reset to 1
  return {
    current: 1,
    longest: Math.max(streak.longest, 1),
    lastStudyDate: today,
  };
}

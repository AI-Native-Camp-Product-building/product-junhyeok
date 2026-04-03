import type { AppState } from "./types";

const STORAGE_KEY = "claude-dopamine-sprint-web";
const STATE_VERSION = 1;

export function getInitialState(): AppState {
  return {
    stateVersion: STATE_VERSION as 1,
    onboarding: {
      currentDay: 0,
      currentBlock: 0,
      days: {},
      completedAt: null,
    },
    streak: {
      current: 0,
      longest: 0,
      lastStudyDate: null,
    },
    badges: [],
    totalStudyMinutes: 0,
    totalSessions: 0,
    feedback: {
      quizResponses: [],
      skippedBlocks: [],
      blockTimeSpent: {},
      contentReactions: [],
    },
    history: [],
  };
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getInitialState();
    }
    const parsed = JSON.parse(raw) as AppState;
    if (parsed.stateVersion !== STATE_VERSION) {
      return getInitialState();
    }
    return parsed;
  } catch {
    return getInitialState();
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetState(): void {
  localStorage.removeItem(STORAGE_KEY);
}

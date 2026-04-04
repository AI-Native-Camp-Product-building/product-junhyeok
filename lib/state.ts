import type { AppState, FeedItemProgress, BlockProgress } from "./types";

const STORAGE_KEY = "claude-dopamine-sprint-web";
const STATE_VERSION = 2;

// V1 types for migration
interface V1DayProgress {
  status: "locked" | "in_progress" | "completed";
  blocks: Record<string, { status: string; explainSkipped: boolean; executeScore: number | null; quizScore: number | null; timeSpentSeconds: number }>;
  completedAt: string | null;
}

interface V1State {
  stateVersion: 1;
  onboarding: {
    currentDay: number;
    currentBlock: number;
    days: Record<string, V1DayProgress>;
    completedAt: string | null;
  };
  streak: AppState["streak"];
  badges: string[];
  totalStudyMinutes: number;
  totalSessions: number;
  feedback: AppState["feedback"];
  history: AppState["history"];
}

function migrateV1toV2(oldState: V1State): AppState {
  const items: Record<string, FeedItemProgress> = {};

  for (const [dayId, dayProgress] of Object.entries(oldState.onboarding.days)) {
    if (dayProgress.status === "locked") continue;

    const migratedBlocks: Record<string, BlockProgress> = {};
    for (const [blockId, block] of Object.entries(dayProgress.blocks)) {
      migratedBlocks[blockId] = {
        ...block,
        status: (block.status === "completed" ? "completed" : block.status === "in_progress" ? "in_progress" : "not_started") as BlockProgress["status"],
      };
    }

    items[dayId] = {
      status: dayProgress.status === "completed" ? "completed" : "in_progress",
      blocks: migratedBlocks,
      completedAt: dayProgress.completedAt,
    };
  }

  return {
    stateVersion: 2,
    feed: {
      items,
      completedAt: oldState.onboarding.completedAt,
    },
    streak: oldState.streak,
    badges: oldState.badges,
    totalStudyMinutes: oldState.totalStudyMinutes,
    totalSessions: oldState.totalSessions,
    feedback: oldState.feedback,
    history: oldState.history,
  };
}

export function getInitialState(): AppState {
  return {
    stateVersion: STATE_VERSION as 2,
    feed: {
      items: {},
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
    const parsed = JSON.parse(raw);
    if (parsed.stateVersion === 1) {
      const migrated = migrateV1toV2(parsed as V1State);
      saveState(migrated);
      return migrated;
    }
    if (parsed.stateVersion !== STATE_VERSION) {
      return getInitialState();
    }
    return parsed as AppState;
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

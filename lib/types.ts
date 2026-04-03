// === State Types ===

export interface AppState {
  stateVersion: 1;
  onboarding: OnboardingState;
  streak: StreakState;
  badges: string[];
  totalStudyMinutes: number;
  totalSessions: number;
  feedback: FeedbackState;
  history: HistoryEntry[];
}

export interface OnboardingState {
  currentDay: number;
  currentBlock: number;
  days: Record<string, DayProgress>;
  completedAt: string | null;
}

export interface DayProgress {
  status: "locked" | "in_progress" | "completed";
  blocks: Record<string, BlockProgress>;
  completedAt: string | null;
}

export interface BlockProgress {
  status: "not_started" | "in_progress" | "completed";
  explainSkipped: boolean;
  executeScore: number | null;
  quizScore: number | null;
  timeSpentSeconds: number;
}

export interface StreakState {
  current: number;
  longest: number;
  lastStudyDate: string | null;
}

export interface FeedbackState {
  quizResponses: QuizResponse[];
  skippedBlocks: string[];
  blockTimeSpent: Record<string, number>;
  contentReactions: ContentReaction[];
}

export interface QuizResponse {
  date: string;
  dayId: string;
  blockId: string;
  topicId: string;
  correct: boolean;
  timeMs: number;
}

export interface ContentReaction {
  contentId: string;
  reaction: "up" | "down";
  date: string;
}

export interface HistoryEntry {
  date: string;
  dayId: string;
  duration: number;
  quizScore: number;
  quizTotal: number;
}

// === Content Types ===

export interface Day {
  id: string;
  title: string;
  description: string;
  status: "locked" | "available" | "completed";
  blocks: Block[];
  estimatedMinutes: number;
}

export interface Block {
  id: string;
  topicId: string;
  title: string;
  explain: ExplainContent;
  execute: ExecuteContent;
  quiz: QuizContent;
}

export interface ExplainContent {
  markdown: string;
  keyPoints: string[];
}

// === 5 ExecuteTask sub-interfaces ===

export interface CodeReadingTask {
  taskType: "code-reading";
  code: string;
  question: string;
  answer: string;
  distractors: string[];
}

export interface DebuggingTask {
  taskType: "debugging";
  buggyCode: string;
  correctCode: string;
  bugDescription: string;
  hints: string[];
}

export interface ConceptMatchingTask {
  taskType: "concept-matching";
  pairs: Array<{ left: string; right: string }>;
  instructions: string;
}

export interface FillInBlankTask {
  taskType: "fill-in-blank";
  codeTemplate: string;
  blanks: Array<{ position: number; correct: string; options: string[] }>;
}

export interface SequenceOrderingTask {
  taskType: "sequence-ordering";
  items: string[];
  instructions: string;
}

export type ExecuteContent =
  | CodeReadingTask
  | DebuggingTask
  | ConceptMatchingTask
  | FillInBlankTask
  | SequenceOrderingTask;

// === Quiz Types ===

export interface QuizContent {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  answer: string;
  distractors: string[];
  hints: string[];
}

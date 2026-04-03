import type { AppState } from "./types";

/**
 * Calculate priority score for each topic based on:
 *   priority = daysSinceLastStudy * (1 - correctRate)
 * Higher priority = more urgent to review.
 */
export function getTopicPriorities(
  state: AppState
): Array<{ topicId: string; priority: number }> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Gather per-topic quiz stats from feedback.quizResponses
  const topicStats = new Map<
    string,
    { lastDate: Date; correct: number; total: number }
  >();

  for (const response of state.feedback.quizResponses) {
    const existing = topicStats.get(response.topicId);
    const responseDate = new Date(response.date);
    responseDate.setHours(0, 0, 0, 0);

    if (existing) {
      if (responseDate > existing.lastDate) {
        existing.lastDate = responseDate;
      }
      existing.total += 1;
      if (response.correct) {
        existing.correct += 1;
      }
    } else {
      topicStats.set(response.topicId, {
        lastDate: responseDate,
        correct: response.correct ? 1 : 0,
        total: 1,
      });
    }
  }

  const priorities: Array<{ topicId: string; priority: number }> = [];

  for (const [topicId, stats] of topicStats) {
    const daysSinceLastStudy = Math.max(
      1,
      Math.floor(
        (today.getTime() - stats.lastDate.getTime()) / (1000 * 60 * 60 * 24)
      )
    );
    const correctRate = stats.total > 0 ? stats.correct / stats.total : 0;
    const priority = daysSinceLastStudy * (1 - correctRate);
    priorities.push({ topicId, priority });
  }

  priorities.sort((a, b) => b.priority - a.priority);
  return priorities;
}

/** Get the recommended next topic ID (highest priority) */
export function getRecommendedTopic(state: AppState): string | null {
  const priorities = getTopicPriorities(state);
  if (priorities.length === 0) {
    return null;
  }
  return priorities[0].topicId;
}

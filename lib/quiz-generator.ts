// === Quiz Generator: DailyFeedItem → QuizQuestion[] (GPT-5.4) ===

import OpenAI from "openai";
import type { DailyFeedItem, QuizQuestion } from "./daily-feed-types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface QuizResponse {
  quizzes: {
    feedItemId: string;
    questions: {
      question: string;
      answer: string;
      distractors: string[];
      explanation: string;
    }[];
  }[];
}

const QUIZ_SYSTEM_PROMPT = `You are a quiz generator for a Claude Code learning platform targeting Korean-speaking developers with ADHD.

For each content item, generate 1-2 multiple choice questions that:
1. Test understanding of the key concept (not trivia)
2. Have exactly 1 correct answer and 3 plausible distractors
3. Include a brief explanation (1-2 sentences) for the correct answer
4. Are written in Korean (keep technical terms in English)
5. Are concise — questions under 100 chars, options under 60 chars each

Focus on practical, applicable knowledge that Claude Code users would benefit from remembering.

Respond with JSON only.`;

let quizCounter = 0;

export async function generateQuizzes(
  items: DailyFeedItem[]
): Promise<DailyFeedItem[]> {
  if (items.length === 0) return items;

  const quizInputs = items.map((item) => ({
    feedItemId: item.id,
    title: item.title,
    summary: item.summary,
    keyPoints: item.keyPoints,
    category: item.category,
  }));

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.5,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: QUIZ_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Generate quizzes for these ${items.length} Claude Code learning items:\n\n${JSON.stringify(quizInputs, null, 2)}`,
        },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      console.error("Quiz generator: empty response from OpenAI");
      return items;
    }

    const parsed: QuizResponse = JSON.parse(content);
    const quizMap = new Map<string, QuizQuestion[]>();

    for (const quiz of parsed.quizzes) {
      const questions: QuizQuestion[] = quiz.questions.map((q) => ({
        id: `quiz-${++quizCounter}-${Date.now()}`,
        question: q.question,
        answer: q.answer,
        distractors: q.distractors,
        explanation: q.explanation,
      }));
      quizMap.set(quiz.feedItemId, questions);
    }

    return items.map((item) => ({
      ...item,
      quiz: quizMap.get(item.id) ?? [],
    }));
  } catch (error) {
    console.error("Quiz generation failed:", error);
    return items;
  }
}

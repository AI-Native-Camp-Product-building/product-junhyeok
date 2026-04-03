---
name: lesson-design
description: "ADHD 친화적 학습 블록 설계 프레임워크. EXPLAIN→EXECUTE→QUIZ 3-Phase 구조, 5가지 ExecuteContent 타입 선택 가이드, 도파민 설계 원칙을 적용하여 학습 콘텐츠를 작성한다. 학습 모듈 설계, 교육 콘텐츠 작성, 블록 구조화, '레슨 만들어줘', '학습 콘텐츠 설계' 같은 요청 시 반드시 이 스킬을 참조할 것."
---

# Lesson Design — ADHD 친화 학습 블록 설계 프레임워크

리서치 결과를 ADHD 개발자에게 최적화된 3-Phase 학습 블록으로 변환하는 프레임워크.

## Block 구조 (lib/types.ts 기준)

```typescript
interface Block {
  id: string;        // kebab-case, 고유값 (예: "mcp-server-setup")
  topicId: string;   // 스페이스드 리피티션용 토픽 식별자 (보통 id와 동일)
  title: string;     // 한국어 제목 (예: "MCP 서버 설정")
  explain: ExplainContent;
  execute: ExecuteContent;  // 5가지 타입 중 택1
  quiz: QuizContent;
}
```

## Phase 1: EXPLAIN 작성

사용자에게 개념을 소개하는 단계. ADHD 사용자의 집중력을 고려하여 짧고 임팩트 있게 작성한다.

```typescript
interface ExplainContent {
  markdown: string;    // 한국어 마크다운 (## 제목으로 시작)
  keyPoints: string[]; // 3-5개 핵심 포인트
}
```

**작성 원칙:**
- 마크다운은 300-500자 이내로 작성한다. 길면 읽지 않는다
- 첫 문장에서 "이것을 알면 무엇이 가능한지"를 전달한다 (동기 부여)
- `### 핵심 포인트` 섹션으로 요약을 제공한다
- 코드 예시는 10줄 이내로 핵심만 보여준다
- keyPoints는 각각 한 문장으로 작성한다

**나쁜 예:** "MCP는 Model Context Protocol의 약자입니다. 이 프로토콜은..."
**좋은 예:** "MCP를 설정하면 Claude Code가 GitHub, Slack, DB 등 외부 도구를 직접 사용할 수 있습니다."

## Phase 2: EXECUTE 작성

5가지 타입 중 학습 목표에 맞는 것을 선택한다. 상세 타입 정의는 `references/content-types.md`를 참조한다.

### 타입 선택 매트릭스

| 학습 목표 | 추천 타입 | 이유 |
|----------|----------|------|
| 코드 구조/패턴 이해 | `code-reading` | 코드를 읽고 동작을 추론 |
| 에러 해결 능력 | `debugging` | 버그를 찾고 수정 |
| 용어/개념 매핑 | `concept-matching` | 좌우 쌍 매칭 (학습 중심) |
| API/구문 숙달 | `fill-in-blank` | 코드 빈칸 채우기 |
| 프로세스 이해 | `sequence-ordering` | 단계 순서 정렬 (학습 중심) |

### 개발:학습 비중 조절

모든 모듈이 코딩 실습일 필요는 없다. 전체 모듈의 비중을 의식적으로 조절한다:

- **기능학습** (새 기능 배우기): code-reading + fill-in-blank 위주 → 개발 7:3
- **워크플로우** (작업 패턴): sequence-ordering + code-reading 조합 → 균형 5:5
- **개념이해** (원리 파악): concept-matching + sequence-ordering 위주 → 학습 3:7

## Phase 3: QUIZ 작성

```typescript
interface QuizContent {
  questions: QuizQuestion[];  // 3-4개
}
interface QuizQuestion {
  question: string;      // 한국어 질문
  answer: string;        // 정답 (문장형)
  distractors: string[]; // 오답 2-3개
  hints: string[];       // 힌트 2개
}
```

**작성 원칙:**
- 질문은 EXPLAIN과 EXECUTE에서 다룬 내용을 기반으로 한다
- 정답은 명확하고, 오답은 그럴듯하지만 구별 가능해야 한다
- 힌트는 답을 직접 알려주지 않되, 사고 방향을 유도한다
- 단순 암기가 아닌 이해도를 측정하는 질문을 만든다

**좋은 오답 기준:** 관련 주제의 사실이지만 질문에 대한 답은 아닌 것. "MCP의 장점은?"에 대해 "빠른 빌드 속도"는 너무 무관하고, "외부 API 직접 호출"은 관련성이 있어 좋은 오답이 된다.

## Day 구조 설계

```typescript
interface Day {
  id: string;              // "day-N" 형식
  title: string;           // 한국어 제목
  description: string;     // 1-2문장 설명
  status: "locked" | "available" | "completed";
  blocks: Block[];         // 5-7개 블록
  estimatedMinutes: number; // 전체 예상 시간
}
```

- 하나의 Day는 5-7개 블록으로 구성한다 (Day 1은 7개)
- 블록 순서: 쉬운 것 → 어려운 것 (점진적 난이도)
- 같은 Execute 타입이 연속 2개 이상 나오지 않도록 배치한다
- estimatedMinutes는 블록당 15-25분으로 산정한다

## 콘텐츠 JSON 출력 형식

`_workspace/02_content/{blockId}.json` 파일은 Block 타입에 정확히 맞는 JSON으로 작성한다. module-builder가 이 JSON을 TypeScript 파일로 변환한다.

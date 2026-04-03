---
name: module-build
description: "ADHD Sprint Next.js 앱에 학습 모듈을 통합하는 개발 가이드. TypeScript 데이터 구조, 파일 컨벤션, 커리큘럼 로더, 디자인 토큰 규칙을 정의한다. 앱에 새 콘텐츠를 추가하거나 수정할 때, 데이터 파일을 생성할 때, 커리큘럼을 확장할 때 반드시 이 스킬을 참조할 것."
---

# Module Build — Next.js 앱 통합 가이드

학습 모듈을 ADHD Sprint Next.js 앱에 통합하기 위한 개발 가이드.

## 앱 구조 요약

```
data/
  onboarding/
    day1.ts          ← Day 객체 + Block 배열 정의
    days2-4-stubs.ts ← locked Day 스텁
    index.ts         ← days 배열 export (로더가 사용)
lib/
  types.ts           ← 모든 타입 정의 (Block, Day, ExecuteContent 등)
  curriculum-loader.ts ← getDays(), getDay(), getBlock() 함수
  state.ts           ← localStorage CRUD
  state-context.tsx   ← React Context (useAppState 훅)
components/
  onboarding/        ← 블록 관련 컴포넌트
  onboarding/execute/ ← 5개 Execute 타입별 컴포넌트
  ui/                ← 공용 UI (Card, ProgressBar, CodeBlock, Badge)
  gamification/      ← 스트릭, 뱃지, 축하 애니메이션
app/
  onboarding/        ← 온보딩 라우트
    [dayId]/
      [blockId]/page.tsx ← 블록 상세 (3-Phase 상태머신)
```

## 새 Day 추가 워크플로우

### Step 1: 데이터 파일 생성

`data/onboarding/{dayId}.ts` 파일을 생성한다. day1.ts의 패턴을 따른다:

```typescript
import type { Day, Block } from "@/lib/types";

const block1Example: Block = {
  id: "topic-name",
  topicId: "topic-name",
  title: "토픽 제목",
  explain: {
    markdown: `## 제목\n\n설명 텍스트...`,
    keyPoints: ["포인트 1", "포인트 2", "포인트 3"],
  },
  execute: {
    taskType: "code-reading",
    code: `// 코드 예시`,
    question: "질문",
    answer: "정답",
    distractors: ["오답1", "오답2"],
  },
  quiz: {
    questions: [
      {
        question: "퀴즈 질문",
        answer: "정답",
        distractors: ["오답1", "오답2"],
        hints: ["힌트1", "힌트2"],
      },
    ],
  },
};

export const dayN: Day = {
  id: "day-N",
  title: "Day 제목",
  description: "1-2문장 설명",
  status: "available",  // "locked" | "available" | "completed"
  blocks: [block1Example],
  estimatedMinutes: 150,
};
```

### Step 2: 인덱스 파일 업데이트

`data/onboarding/index.ts`에서 새 Day를 import하고 days 배열에 추가한다:

```typescript
import { dayN } from "./dayN";
export const days: Day[] = [day1, day2Stub, day3Stub, day4Stub, dayN];
```

기존 스텁(day2Stub 등)을 실제 콘텐츠로 교체하는 경우, 스텁 대신 실제 Day 객체를 import한다.

### Step 3: 빌드 검증

`npm run build`로 타입 에러가 없는지 확인한다. 이 프로젝트는 테스트 러너가 없으므로 빌드 성공이 타입 검증 수단이다.

## 스텁을 실제 콘텐츠로 교체

Day 2-4는 현재 스텁 상태다. 실제 콘텐츠로 교체할 때:

1. `data/onboarding/day2.ts` (또는 day3, day4) 생성
2. blocks 배열에 5-7개 Block 객체 추가
3. status를 "available"로 변경
4. `days2-4-stubs.ts`에서 해당 스텁 제거 (또는 유지하되 index에서 교체)
5. `index.ts` 업데이트

## 디자인 규칙 (MUST)

이 규칙은 CLAUDE.md에서 가져온 것이며 절대적으로 준수한다:

- **NEVER** raw Tailwind 컬러 (red-*, blue-*, green-* 등) → 디자인 토큰 사용
- **NEVER** HEX 리터럴 → CSS 변수 또는 토큰 클래스
- **NEVER** `<style>` 블록 → globals.css에 정의
- **NEVER** ProgressBar 재구현 → `components/ui/ProgressBar` 사용
- **NEVER** Card 스타일 재구현 → `components/ui/Card` 사용
- `bg-surface-950`이 canonical dark background

### 디자인 토큰 매핑
| 용도 | 토큰 | 예시 |
|------|------|------|
| 주요 브랜드 | dopamine (purple) | `bg-dopamine-500`, `text-dopamine-300` |
| 보조 액센트 | spark (orange) | `bg-spark-500` |
| 성공/스트릭 | streak (green) | `text-streak-400` |
| 배경/카드 | surface (dark) | `bg-surface-900` |
| 부분 성공/경고 | reward (amber) | `text-reward-400` |
| 에러/오답 | error (red) | `text-error-400` |
| 코드/기술 | code (blue) | `text-code-400` |

## 스테이징 모드 (자동 파이프라인 전용)

daily-digest에 의해 자동 생성되는 콘텐츠는 `data/staging/`에 저장한다. 메인 커리큘럼에 직접 넣지 않는다.

### 스테이징 구조
```
data/staging/
  {dayId}/
    content.ts     ← Day 객체 + Block 배열 (메인과 동일 구조)
    metadata.md    ← 생성일, 소스, 트리아지 근거
```

### content.ts 작성
메인 커리큘럼과 동일한 구조를 사용하되, 아직 index.ts에 등록하지 않는다:
```typescript
import type { Day, Block } from "@/lib/types";
// ... Block 정의 ...
export const dayStaged: Day = {
  id: "{dayId}",
  title: "{title}",
  status: "locked",  // 스테이징은 항상 locked
  // ...
};
```

### metadata.md 작성
```markdown
# 모듈 메타데이터
- 생성일: {날짜}
- 생성 모드: auto (daily-digest)
- 리서치 소스: {주요 출처}
- 트리아지 근거: {왜 이 토픽이 선정되었는지}
- QA 결과: PASS
- 퍼블리시 상태: pending_review
```

### 퍼블리시 (스테이징 → 메인)
사용자 승인 후:
1. `data/staging/{dayId}/content.ts` → `data/onboarding/{dayId}.ts`로 이동
2. status를 `"available"`로 변경
3. `data/onboarding/index.ts`에 등록
4. `data/staging/{dayId}/` 디렉토리 삭제
5. `npm run build`로 최종 검증

## 새 콘텐츠 카테고리 확장 시

온보딩 이외의 새 카테고리(예: "weekly-updates", "workflows")를 추가할 때:

1. `data/{category}/` 디렉토리 생성
2. Day/Block 타입을 재사용하거나 확장 타입을 `lib/types.ts`에 추가
3. `lib/{category}-loader.ts` 로더 함수 생성 (curriculum-loader.ts 패턴)
4. `app/{category}/` 라우트 생성
5. 기존 온보딩 라우트의 [dayId]/[blockId] 패턴을 재사용

## JSON → TypeScript 변환

lesson-designer가 생성한 `_workspace/02_content/{blockId}.json`을 TypeScript로 변환할 때:
- JSON의 키/값을 그대로 TypeScript 객체 리터럴로 변환
- `import type { Day, Block } from "@/lib/types";` 추가
- 각 Block을 `const`로 선언 후 Day.blocks에 배열로 모음
- 파일 마지막에 `export const dayN: Day = { ... };` 형식으로 export

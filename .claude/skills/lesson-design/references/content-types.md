# ExecuteContent 타입 상세 정의

lesson-designer가 참조하는 5가지 ExecuteContent 타입의 상세 필드와 작성 예시.

## 1. CodeReadingTask

```typescript
interface CodeReadingTask {
  taskType: "code-reading";
  code: string;          // 읽을 코드 (10-30줄)
  question: string;      // 코드에 대한 질문
  answer: string;        // 정답
  distractors: string[]; // 오답 2-3개
}
```

**작성 팁:**
- 코드는 실제로 동작하는 유효한 코드를 사용한다
- 질문은 "이 코드가 무엇을 하는가?" 또는 "특정 상황에서 어떻게 동작하는가?"
- Claude Code 관련 의사코드나 설정 파일도 활용 가능

## 2. DebuggingTask

```typescript
interface DebuggingTask {
  taskType: "debugging";
  buggyCode: string;     // 버그가 있는 코드
  correctCode: string;   // 수정된 코드
  bugDescription: string; // 버그 설명
  hints: string[];       // 디버깅 힌트 2-3개
}
```

**작성 팁:**
- 버그는 하나만 포함한다 (복수 버그는 혼란을 줌)
- 버그는 논리 에러, 오타, 잘못된 API 사용 등 다양하게
- hints는 점진적으로 구체적이 되도록 (일반적 → 구체적)

## 3. ConceptMatchingTask

```typescript
interface ConceptMatchingTask {
  taskType: "concept-matching";
  pairs: Array<{ left: string; right: string }>;  // 4-6쌍
  instructions: string;  // 매칭 지시문
}
```

**작성 팁:**
- left와 right를 섞어서 표시한다 (UI가 자동 셔플)
- 각 쌍은 명확하게 1:1 대응이어야 한다
- 학습 중심 콘텐츠에 적합 (용어 ↔ 정의, 기능 ↔ 설명)

## 4. FillInBlankTask

```typescript
interface FillInBlankTask {
  taskType: "fill-in-blank";
  codeTemplate: string;  // ___로 빈칸 표시된 코드
  blanks: Array<{
    position: number;    // 빈칸 순서 (0부터)
    correct: string;     // 정답
    options: string[];   // 선택지 3-4개 (정답 포함)
  }>;
}
```

**작성 팁:**
- 빈칸은 1-3개로 제한한다
- codeTemplate에서 빈칸은 `___`로 표시
- options에는 반드시 correct 값을 포함한다
- 핵심 키워드나 API 이름을 빈칸으로 만든다

## 5. SequenceOrderingTask

```typescript
interface SequenceOrderingTask {
  taskType: "sequence-ordering";
  items: string[];       // 정렬할 항목들 (올바른 순서로 저장)
  instructions: string;  // 정렬 지시문
}
```

**작성 팁:**
- items는 **올바른 순서**로 저장한다 (UI가 자동 셔플)
- 4-6개 항목이 적절
- 프로세스 단계, 실행 순서, 우선순위 등에 적합
- 각 항목은 짧고 명확하게 (10단어 이내)

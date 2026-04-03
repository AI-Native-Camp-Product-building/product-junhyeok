---
name: module-qa
description: "학습 모듈 품질 검증 프로토콜. TypeScript 타입 정합성, 빌드 검증, 콘텐츠 정확성, 디자인 규칙 준수를 체계적으로 확인한다. 모듈 구현이 완료된 후, 콘텐츠 품질을 확인할 때, 빌드 전 검증이 필요할 때 반드시 이 스킬로 검증할 것."
---

# Module QA — 학습 모듈 품질 검증 프로토콜

학습 모듈의 기술적 무결성과 콘텐츠 정확성을 체계적으로 검증하는 프로토콜.

## 검증 순서

반드시 이 순서로 검증한다. 앞 단계가 실패하면 수정 후 재검증한다.

### 1단계: 타입 정합성 (자동 수정 가능)

`_workspace/03_build_manifest.md`에 나열된 파일을 하나씩 Read하고 `lib/types.ts`와 교차 비교한다.

**Block 필수 필드 체크리스트:**
```
□ id: string (비어있지 않음, kebab-case)
□ topicId: string (비어있지 않음)
□ title: string (한국어)
□ explain.markdown: string (## 헤딩으로 시작)
□ explain.keyPoints: string[] (3-5개)
□ execute.taskType: 5가지 중 하나
□ quiz.questions: QuizQuestion[] (2개 이상)
```

**ExecuteContent 타입별 필수 필드:**

| taskType | 필수 필드 |
|----------|----------|
| code-reading | code, question, answer, distractors |
| debugging | buggyCode, correctCode, bugDescription, hints |
| concept-matching | pairs (4-6쌍), instructions |
| fill-in-blank | codeTemplate, blanks (각각 position, correct, options) |
| sequence-ordering | items (4-6개), instructions |

**QuizQuestion 필수 필드:**
```
□ question: string (한국어)
□ answer: string
□ distractors: string[] (2개 이상)
□ hints: string[] (2개)
```

타입 불일치 발견 시: 자동 수정이 가능한 경우(필드 누락 보충, 타입 변환) 직접 수정한다.

### 2단계: 빌드 검증 (필수 통과)

```bash
npm run build
```

- 성공: 다음 단계로 진행
- 실패: 에러 로그를 분석하고 수정한다. 수정 후 재빌드
- 빌드 에러 패턴:
  - `TS2322: Type '...' is not assignable` → 타입 불일치, 1단계 재검증
  - `Module not found` → import 경로 오류, 파일 위치 확인
  - `Cannot find name` → export 누락 또는 오타

### 3단계: 콘텐츠 품질 (수동 판단)

**코드 예시 검증:**
- code-reading/debugging의 코드가 구문적으로 올바른가?
- 의사코드인 경우 논리적으로 일관성이 있는가?
- 변수명/함수명이 설명하는 개념과 일치하는가?

**퀴즈 검증:**
- 정답이 실제로 정답인가? (가능하면 공식 문서로 교차 검증)
- 오답이 그럴듯하지만 명확히 틀린가?
- 오답이 너무 쉽게 구별되지 않는가? (너무 무관한 오답은 교육 효과 없음)
- 힌트가 답을 직접 알려주지 않으면서 사고 방향을 유도하는가?

**개념 일관성:**
- explain에서 설명한 내용과 execute/quiz가 연결되는가?
- 선행 블록에서 다루지 않은 개념을 갑자기 사용하지 않는가?

### 4단계: 디자인 규칙 (자동 검증 가능)

새로 추가된 컴포넌트 파일(.tsx)에 대해 Grep으로 검증:

```
# raw Tailwind 컬러 검사 (있으면 안 됨)
패턴: (red|blue|green|amber|teal|pink|purple|yellow)-\d{2,3}
제외: dopamine|spark|streak|surface|reward|error|code|accent

# HEX 리터럴 검사 (있으면 안 됨)
패턴: #[0-9a-fA-F]{3,8}
위치: className 또는 style 속성 내

# <style> 블록 검사 (있으면 안 됨)
패턴: <style
```

발견 시: 디자인 토큰으로 자동 교체한다.

## 판정 기준

| 판정 | 조건 |
|------|------|
| **PASS** | 4단계 모두 통과 |
| **FIX_REQUIRED** | 빌드는 성공하나 콘텐츠/디자인 이슈 존재 |
| **REDO** | 빌드 실패 또는 콘텐츠가 학습 목표와 불일치 |

FIX_REQUIRED 시: 구체적 수정 사항을 나열하여 오케스트레이터에 반환한다.
REDO 시: 어떤 단계(research/design/build)부터 재시작해야 하는지 명시한다.

## 자동 수정 범위

직접 수정해도 되는 것:
- 타입 필드 누락 보충 (빈 hints 배열 추가 등)
- import 경로 수정
- 디자인 토큰 교체
- 오타 수정

직접 수정하면 안 되는 것 (FIX_REQUIRED로 보고):
- 퀴즈 정답 변경 (도메인 판단 필요)
- 코드 예시의 로직 변경
- 학습 목표와 콘텐츠의 불일치
- 새 블록 추가/삭제

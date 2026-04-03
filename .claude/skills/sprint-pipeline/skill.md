---
name: sprint-pipeline
description: "ADHD Sprint 학습 모듈 생성 파이프라인. 주제 또는 '최신 동향' 요청을 받아 리서치→설계→구현→검증 4단계를 자동으로 수행하여 앱에 바로 사용 가능한 학습 모듈을 생성한다. '새 모듈 만들어줘', '이번 주 업데이트 정리', 'Claude Code 기능 학습 모듈', '콘텐츠 추가', '커리큘럼 확장' 같은 요청 시 반드시 이 스킬을 사용할 것. 단순 코드 수정이나 UI 변경은 트리거하지 않는다."
---

# Sprint Pipeline — 학습 모듈 생성 오케스트레이터

ADHD Sprint 앱에 새 학습 모듈을 추가하는 전체 파이프라인을 조율한다. 4명의 전문 에이전트가 순차적으로 작업하여 리서치 → 설계 → 구현 → 검증을 완료한다.

## 실행 모드: 서브 에이전트 (파이프라인)

Phase별 순차 의존이 강하므로 서브 에이전트 모드를 사용한다. 각 에이전트의 출력이 다음 에이전트의 입력이 된다.

## 수동 vs 자동 모드

| 모드 | 트리거 | 출력 위치 | 리뷰 |
|------|--------|----------|------|
| **수동** (기본) | 사용자 요청 | `data/onboarding/` (직접 배포) | 즉시 사용 가능 |
| **자동** (daily-digest) | cron/daily-digest | `data/staging/` (스테이징) | 사람 리뷰 후 퍼블리시 |

자동 모드에서는 Phase 3의 module-builder에게 출력 위치를 `data/staging/{dayId}/`로 지시한다. 자동 생성 콘텐츠가 검증 없이 메인 커리큘럼에 들어가는 것을 방지한다.

## 에이전트 구성

| 에이전트 | subagent_type | 역할 | 스킬 | 출력 |
|---------|--------------|------|------|------|
| ecosystem-scout | ecosystem-scout | 생태계 리서치 | ecosystem-scan | `_workspace/01_research.md` |
| lesson-designer | lesson-designer | 레슨 설계 + 콘텐츠 작성 | lesson-design | `_workspace/02_lesson_design.md` + `_workspace/02_content/` |
| module-builder | module-builder | 앱 통합 구현 | module-build | `data/` 파일 + `_workspace/03_build_manifest.md` |
| module-qa | module-qa | 품질 검증 | module-qa | `_workspace/04_qa_report.md` |

## 워크플로우

### Phase 0: 준비

1. 사용자 입력을 분석한다:
   - **구체적 주제** ("MCP 서버 설정 모듈 만들어줘") → 해당 주제로 리서치
   - **일반 요청** ("이번 주 업데이트 정리해줘") → 전체 스캔 모드 리서치
   - **스텁 완성** ("Day 2 콘텐츠 만들어줘") → 해당 Day 스텁 정보를 리서치에 전달
2. `_workspace/` 디렉토리를 생성한다
3. `_workspace/00_input.md`에 분석 결과를 저장한다:

```markdown
# 파이프라인 입력
- 요청 유형: {specific_topic | full_scan | stub_completion}
- 주제: {주제 또는 "최신 동향"}
- 대상 Day: {dayId 또는 "new"}
- 추가 지시: {사용자의 추가 요구사항}
```

### Phase 1: 리서치

```
Agent(
  subagent_type: "ecosystem-scout",
  model: "opus",
  prompt: "다음 요청에 따라 Claude Code 생태계를 조사하라.
    [_workspace/00_input.md 내용 전달]
    .claude/skills/ecosystem-scan/skill.md를 읽고 조사 프로토콜을 따르라.
    결과를 _workspace/01_research.md에 저장하라."
)
```

**완료 확인**: `_workspace/01_research.md` 존재 + 학습 모듈 후보 최소 2개 포함

### Phase 2: 레슨 설계

```
Agent(
  subagent_type: "lesson-designer",
  model: "opus",
  prompt: "_workspace/01_research.md를 읽고 학습 모듈을 설계하라.
    [_workspace/00_input.md에서 대상 Day 정보 전달]
    .claude/skills/lesson-design/skill.md를 읽고 설계 프레임워크를 따르라.
    설계서를 _workspace/02_lesson_design.md에, 블록별 콘텐츠를 _workspace/02_content/에 저장하라."
)
```

**완료 확인**: 설계서 존재 + 블록별 JSON이 Block 타입 구조를 갖추고 있음

**분기**: 설계서에 "추가 조사 필요" 항목(`_workspace/02_needs_more_research.md`)이 있으면 Phase 1로 돌아가되 최대 1회만 재시도

### Phase 3: 앱 통합

```
Agent(
  subagent_type: "module-builder",
  model: "opus",
  prompt: "_workspace/02_lesson_design.md와 _workspace/02_content/를 읽고 앱에 통합하라.
    .claude/skills/module-build/skill.md를 읽고 개발 가이드를 따르라.
    CLAUDE.md의 디자인 규칙을 절대적으로 준수하라.
    변경 내역을 _workspace/03_build_manifest.md에 기록하라."
)
```

**완료 확인**: 빌드 매니페스트 존재 + 나열된 파일들이 실제로 존재

### Phase 4: 품질 검증

```
Agent(
  subagent_type: "module-qa",
  model: "opus",
  prompt: "_workspace/03_build_manifest.md를 읽고 학습 모듈 품질을 검증하라.
    .claude/skills/module-qa/skill.md를 읽고 검증 프로토콜을 따르라.
    npm run build를 실행하여 빌드 성공을 확인하라.
    QA 리포트를 _workspace/04_qa_report.md에 저장하라."
)
```

**판정 처리**:
- **PASS**: Phase 5로 진행
- **FIX_REQUIRED**: QA 리포트의 수정 사항을 module-builder에게 전달하여 수정 → 재검증 (최대 2회)
- **REDO**: 실패 원인에 따라 Phase 1, 2, 또는 3부터 재시작 (최대 1회)

### Phase 5: 완료 보고

1. `_workspace/` 디렉토리를 보존한다 (삭제하지 않음 — 사후 검증·감사 추적용)
2. `data/content-registry.md`를 업데이트한다:
   - "다룬 토픽" 테이블에 새 토픽 추가
   - 상태: 수동 모드 → `published`, 자동 모드 → `staging`
   - "스테이징 큐" 테이블 갱신 (자동 모드)
   - "스캔 이력" 테이블에 실행 기록 추가
3. 사용자에게 결과를 요약 보고한다:

```markdown
## 모듈 생성 완료

### 추가된 콘텐츠
- Day: {dayId} — {title}
- 블록 수: {N}개
- 개발:학습 비중: {비중}

### 블록 구성
| # | 블록 | Execute 타입 | 난이도 |

### 파일 변경
- 생성: {목록}
- 수정: {목록}

### QA 결과: PASS
```

## 데이터 흐름

```
사용자 요청
    ↓
[Phase 0: 준비] → _workspace/00_input.md
    ↓
[Phase 1: ecosystem-scout] → _workspace/01_research.md
    ↓
[Phase 2: lesson-designer] → _workspace/02_lesson_design.md
                            + _workspace/02_content/*.json
    ↓
[Phase 3: module-builder] → data/ 파일들
                           + _workspace/03_build_manifest.md
    ↓
[Phase 4: module-qa] → _workspace/04_qa_report.md
    ↓
[Phase 5: 완료 보고] → 사용자에게 요약
```

## 에러 핸들링

| 상황 | 전략 |
|------|------|
| Phase 1 리서치 부족 | 검색 쿼리를 변형하여 1회 재시도. 재실패 시 수집된 내용으로 진행하되 사용자에게 알림 |
| Phase 2 추가 조사 필요 | Phase 1을 1회 재실행 (추가 조사 항목 포함) |
| Phase 3 빌드 실패 | module-builder가 자체 수정 시도. 실패 시 에러 로그와 함께 사용자에게 보고 |
| Phase 4 FIX_REQUIRED | 수정 사항을 module-builder에게 전달 → 수정 → 재검증 (최대 2회) |
| Phase 4 REDO | 실패 원인 분석 후 적절한 Phase부터 재시작 (최대 1회) |
| 에이전트 자체 실패 | 1회 재시도. 재실패 시 현재까지 산출물 보존하고 사용자에게 부분 완료 보고 |

## 테스트 시나리오

### 정상 흐름: 특정 주제 모듈 생성
1. 사용자: "Claude Code hooks 기능에 대한 학습 모듈 만들어줘"
2. Phase 0: 입력 분석 → specific_topic, 주제: "hooks"
3. Phase 1: ecosystem-scout가 hooks 관련 공식 문서 + 커뮤니티 사례 수집
4. Phase 2: lesson-designer가 5-7개 블록 설계 (code-reading, debugging, concept-matching 조합)
5. Phase 3: module-builder가 data/onboarding/day-hooks.ts 생성 + index.ts 업데이트
6. Phase 4: module-qa가 빌드 성공 + 콘텐츠 정확성 확인 → PASS
7. Phase 5: 사용자에게 완료 보고

### 에러 흐름: QA FIX_REQUIRED
1. Phase 4에서 QA가 "quiz 3번 정답이 부정확" 발견 → FIX_REQUIRED
2. 오케스트레이터가 수정 사항을 module-builder에게 전달
3. module-builder가 해당 퀴즈 수정 + 재빌드
4. module-qa 재실행 → PASS
5. Phase 5 완료 보고

### 에러 흐름: 리서치 부족
1. Phase 1에서 특정 소스 접근 불가 → 부분 결과만 수집
2. Phase 2에서 추가 조사 필요 항목 발생
3. Phase 1 재실행 (추가 항목 포함) → 보충 완료
4. Phase 2-5 정상 진행

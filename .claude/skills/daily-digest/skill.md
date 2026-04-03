---
name: daily-digest
description: "Claude Code 생태계 일일 자동 스캔 + 학습 모듈 생성 파이프라인. 매일 자동으로 실행되어 새 기능, 커뮤니티 워크플로우, 주목할 유즈케이스를 탐지하고, 교육적 가치가 있으면 학습 모듈을 자동 생성하여 스테이징한다. 'daily digest', '일일 스캔', '자동 콘텐츠 생성', '오늘 뭐 새로운 거 있어?', '스캔 돌려줘' 요청 시, 또는 cron에 의해 자동 트리거될 때 이 스킬을 사용할 것."
---

# Daily Digest — 일일 자동 콘텐츠 엔진

매일 Claude Code 생태계를 스캔하고, 교육적 가치가 있는 발견이 있으면 학습 모듈을 자동 생성하여 스테이징하는 자동화 파이프라인.

## 핵심 철학

이 스킬이 매일 돌아야 비로소 ADHD Sprint가 "한번 쓰고 마는 온보딩 도구"가 아닌 **"지속적으로 팔로우업할 수 있는 서비스"**가 된다. Claude Code를 쓰는 Builder/Coder들이 생태계 변화를 놓치지 않도록 돕는 것이 목적이다.

## 실행 모드

### 자동 모드 (Cron 트리거)
매일 아침 cron에 의해 자동 실행된다. 사람의 개입 없이 스캔→트리아지→생성→스테이징까지 완료한다.

### 수동 모드 (사용자 트리거)
"오늘 뭐 새로운 거 있어?", "스캔 돌려줘" 같은 요청으로 즉시 실행한다.

## 워크플로우

### Step 1: 컨텍스트 로드

1. `data/content-registry.md`를 읽어 이미 다룬 토픽과 마지막 스캔 일시를 확인한다
2. 마지막 스캔 이후 경과 시간을 계산한다
3. 기존 온보딩 Day 1-4 토픽 목록을 확인한다 (중복 방지)

### Step 2: 증분 스캔 (Incremental Scan)

ecosystem-scout를 **증분 모드**로 실행한다:

```
Agent(
  subagent_type: "ecosystem-scout",
  model: "opus",
  prompt: "Claude Code 생태계 증분 스캔을 수행하라.
    .claude/skills/ecosystem-scan/skill.md를 읽고 '증분 스캔 모드' 섹션을 따르라.
    data/content-registry.md를 읽고 이미 다룬 토픽을 확인하라.
    마지막 스캔 이후 새로운 발견만 수집하라.
    결과를 _workspace/daily_{YYYY-MM-DD}/01_scan.md에 저장하라."
)
```

### Step 3: 트리아지 (Triage)

스캔 결과를 분석하여 파이프라인 실행 여부를 결정한다:

**파이프라인 실행 조건** (하나 이상 충족):
- 교육적 가치 "상"인 새 기능이 1개 이상
- 커뮤니티에서 주목받는 워크플로우가 2개 이상
- 기존 토픽의 중대한 변경/업데이트

**스킵 조건**:
- 새 발견이 없거나 모두 교육적 가치 "하"
- 이미 다룬 토픽의 사소한 변경

트리아지 결과를 `_workspace/daily_{YYYY-MM-DD}/02_triage.md`에 기록한다:

```markdown
# 트리아지 결과: {날짜}
- 스캔 발견 수: {N}
- 신규 토픽: {목록}
- 판정: PROCEED | SKIP
- 이유: {판정 근거}
- 선정 토픽: {파이프라인에 넘길 토픽 목록}
```

### Step 4: 파이프라인 실행 (PROCEED인 경우)

sprint-pipeline을 **자동 모드**로 실행한다:

```
Agent(
  subagent_type: "general-purpose",
  model: "opus",
  prompt: "sprint-pipeline 스킬을 자동 모드로 실행하라.
    Skill 도구로 'sprint-pipeline'을 호출하라.
    입력: _workspace/daily_{YYYY-MM-DD}/02_triage.md의 선정 토픽
    출력 위치: data/staging/ (메인 커리큘럼이 아닌 스테이징)
    모든 생성 콘텐츠는 스테이징 디렉토리에 저장하라."
)
```

### Step 5: 레지스트리 업데이트

파이프라인 완료 후 `data/content-registry.md`를 업데이트한다:
- 스캔 이력에 오늘 날짜와 결과 추가
- 새로 생성된 모듈의 토픽 추가
- 스테이징 중인 콘텐츠 목록 갱신

### Step 6: 리포트 생성

`_workspace/daily_{YYYY-MM-DD}/digest_report.md`에 일일 리포트를 생성한다:

```markdown
# Daily Digest: {날짜}

## 스캔 요약
- 새 발견: {N}개
- 교육적 가치 상: {N}개 | 중: {N}개 | 하: {N}개

## 생성된 콘텐츠 (스테이징)
| 모듈 | 블록 수 | 개발:학습 | 상태 |
|------|--------|----------|------|

## 스테이징 큐 현황
- 리뷰 대기: {N}개
- 총 스테이징: {N}개

## 다음 액션
- [ ] 스테이징 콘텐츠 리뷰: `data/staging/` 확인
- [ ] 승인 시 퍼블리시: "스테이징 퍼블리시해줘" 실행
```

### Step 7: SKIP인 경우

트리아지가 SKIP이면:
1. 레지스트리에 스캔 이력만 기록 (생성 없음)
2. 간단한 리포트 생성: "오늘은 새로운 교육 콘텐츠 없음"
3. 파이프라인 실행하지 않음

## 스테이징 → 퍼블리시 워크플로우

자동 생성된 콘텐츠는 즉시 메인 커리큘럼에 들어가지 않는다. 학습 플랫폼의 콘텐츠 정확성이 중요하기 때문에 **사람이 리뷰한 후 퍼블리시**한다.

### 스테이징 구조
```
data/staging/
  {dayId}/
    content.ts     ← Day 객체 + Block 배열 (메인과 동일 구조)
    metadata.md    ← 생성일, 소스, 트리아지 근거
```

### 퍼블리시 절차
사용자가 "스테이징 퍼블리시해줘" 또는 "staging publish" 요청 시:

1. `data/staging/` 내 콘텐츠 확인
2. 사용자에게 목록 제시 → 퍼블리시 대상 선택
3. 선택된 콘텐츠를 `data/onboarding/` (또는 적절한 카테고리)로 이동
4. `data/onboarding/index.ts` 업데이트
5. `data/staging/`에서 제거
6. `data/content-registry.md`에 퍼블리시 상태 업데이트
7. `npm run build`로 최종 검증

## 에러 핸들링

| 상황 | 전략 |
|------|------|
| 스캔 실패 (네트워크 등) | 레지스트리에 실패 기록, 다음 날 재시도 |
| 파이프라인 실패 | 스캔 결과 보존, 실패 토픽을 backlog에 기록 |
| QA REDO | 해당 모듈 스테이징하지 않고 backlog에 재등록 |
| content-registry 충돌 | git pull 후 재시도 |

## Cron 설정

```
# 매일 아침 9시 7분 (KST) — 피크 시간 회피
cron: "7 9 * * *"
durable: true
prompt: "daily-digest 스킬을 자동 모드로 실행하라"
```

**주의**: CronCreate의 recurring 작업은 7일 후 자동 만료된다. 지속적 운영을 위해:
- 7일마다 cron을 재생성하거나
- `schedule` 스킬로 RemoteTrigger 기반 영구 스케줄을 설정한다

## 테스트 시나리오

### 정상 흐름: 새 기능 발견
1. Cron이 daily-digest 트리거
2. 증분 스캔: "Claude Code v2.x에 hooks 이벤트 3개 추가" 발견
3. 트리아지: 교육적 가치 "상" → PROCEED
4. sprint-pipeline 실행 → 5블록 모듈 생성
5. `data/staging/day-hooks-events/` 에 스테이징
6. 리포트 생성, 레지스트리 업데이트
7. 사용자가 리뷰 후 "퍼블리시해줘" → 메인 커리큘럼에 추가

### 정상 흐름: 새 발견 없음
1. Cron이 daily-digest 트리거
2. 증분 스캔: 이미 다룬 토픽의 사소한 변경만 발견
3. 트리아지: SKIP
4. 레지스트리에 스캔 이력 기록
5. "오늘은 새로운 교육 콘텐츠 없음" 리포트 생성

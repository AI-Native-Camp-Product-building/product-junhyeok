---
name: ecosystem-scan
description: "Claude Code 생태계 조사 프로토콜. 공식 채널(Anthropic 블로그, 릴리즈 노트, 문서)과 커뮤니티(GitHub, X, Reddit, YouTube)에서 새 기능, 워크플로우, 유즈케이스를 수집하고 교육적 가치를 평가한다. Claude Code 업데이트 조사, 트렌드 분석, 생태계 현황 파악, '무슨 새 기능 나왔어?', '커뮤니티에서 뭐가 핫해?' 같은 요청 시 반드시 이 스킬을 사용할 것."
---

# Ecosystem Scan — Claude Code 생태계 조사 프로토콜

Claude Code 생태계에서 교육적 가치가 있는 콘텐츠를 체계적으로 발굴하는 조사 프로토콜.

## 조사 모드

### 모드 A: 특정 주제 조사
사용자가 구체적 주제를 지정한 경우 (예: "MCP 최신 동향", "hooks 기능").

1. 해당 주제의 공식 문서를 먼저 확인한다
2. 커뮤니티에서 실사용 사례와 팁을 수집한다
3. 교육 모듈로 변환할 가치가 있는지 평가한다

### 모드 B: 전체 스캔
"최신 동향" 또는 주제 미지정 시.

1. 공식 채널에서 최근 업데이트/변경사항을 수집한다
2. 커뮤니티에서 화제가 되는 워크플로우/유즈케이스를 수집한다
3. 교육적 가치 기준으로 상위 3-5개를 선별한다

### 모드 C: 증분 스캔 (daily-digest 전용)
daily-digest의 cron에 의해 자동 실행되는 모드.

1. `data/content-registry.md`를 읽어 이미 다룬 토픽과 마지막 스캔 날짜를 확인한다
2. 마지막 스캔 이후의 변경사항만 수집한다 (검색 시 날짜 필터 활용)
3. 이미 다룬 토픽은 **중대한 변경이 있는 경우에만** 포함한다 (사소한 업데이트 제외)
4. 결과에 "신규 vs 업데이트" 태그를 명시한다
5. 검색 쿼리에 시간 범위를 추가한다:
   - GitHub: `created:>{last_scan_date}` 또는 `updated:>{last_scan_date}`
   - Google: 기간 필터 (최근 24시간 또는 최근 1주)
   - Reddit: Top (지난 24시간)

## 검색 쿼리 템플릿

### 공식 채널
```
"claude code" site:anthropic.com
"claude code" site:docs.anthropic.com
"claude code" site:github.com/anthropics
anthropic "claude code" release OR changelog OR update
```

### 커뮤니티
```
"claude code" workflow OR "use case" OR tip
"claude code" (MCP OR hooks OR CLAUDE.md OR "sub-agent")
site:reddit.com "claude code" best OR effective OR workflow
site:youtube.com "claude code" tutorial OR walkthrough
```

### 생태계
```
"mcp server" claude new OR trending
"claude code" plugin OR extension
```

## 교육적 가치 평가 기준

| 기준 | 가중치 | 설명 |
|------|--------|------|
| 실용성 | 높음 | 사용자가 바로 적용 가능한가? |
| 시의성 | 높음 | 최근 출시/주목받는 내용인가? |
| 깊이 | 중간 | 단순 팁이 아닌 학습 가치가 있는가? |
| 독창성 | 중간 | 기존 온보딩 콘텐츠와 겹치지 않는가? |
| 접근성 | 낮음 | 선행 지식 없이도 이해 가능한가? |

**최소 기준**: 실용성 + 시의성이 모두 "중" 이상이어야 학습 모듈 후보로 선정.

## 콘텐츠 유형 분류

수집된 콘텐츠를 3가지 유형으로 분류한다:

| 유형 | 설명 | 개발:학습 비중 경향 |
|------|------|-------------------|
| **기능학습** | 새 기능/API의 사용법 | 7:3 (개발 중심) |
| **워크플로우** | 효과적인 작업 패턴 | 5:5 (균형) |
| **개념이해** | 아키텍처/원리 이해 | 3:7 (학습 중심) |

개발 비중과 학습 비중이 편향되지 않도록, 3가지 유형을 균형 있게 수집한다.

## 기존 콘텐츠 중복 확인

**증분 모드에서는 반드시 `data/content-registry.md`를 참조**하여 이미 다룬 토픽을 확인한다. 레지스트리가 가장 정확한 최신 정보이다.

현재 온보딩 Day 1-4 토픽 (초기 기준):
- Day 1: Agentic Loop, 허가 모드, 컨텍스트 관리, CLAUDE.md, CLI 명령어, MCP 기초, 프롬프트 엔지니어링
- Day 2 (스텁): MCP 딥다이브
- Day 3 (스텁): Clarify + PRD 워크플로우
- Day 4 (스텁): 세션 분석 & 최적화

이미 다룬 주제는 "심화" 또는 "최신 변경사항" 관점으로만 추천한다.

## 출력 품질 기준
- 각 발견에 반드시 출처 URL을 포함한다
- "~라고 한다" 같은 간접 인용 대신 구체적 사실을 기술한다
- 학습 모듈 후보는 최소 2개, 최대 5개를 선정한다
- 각 후보에 구체적인 추천 이유를 명시한다

# ADHD Sprint — Claude Code 지속 학습 플랫폼

ADHD 개발자를 위한 도파민 설계 기반 학습 시스템. Claude Code 생태계의 새 기능, 커뮤니티 워크플로우, 효과적인 유즈케이스를 놓치지 않고 따라갈 수 있도록 돕습니다.

## 주요 기능

- **3-Phase 블록 학습**: EXPLAIN → EXECUTE → QUIZ 순서로 집중력 유지
- **5가지 실습 타입**: 코드 리딩, 디버깅, 개념 매칭, 빈칸 채우기, 순서 정렬
- **게이미피케이션**: 스트릭, 9종 뱃지, 히트맵 캘린더, 축하 애니메이션
- **간격 반복**: 오래되고 틀린 토픽을 우선 복습
- **Skip Quiz**: 이미 아는 내용은 배치 테스트로 건너뛰기
- **일일 콘텐츠 엔진**: 매일 자동으로 Claude Code 생태계를 스캔하고 학습 모듈 생성
- **오프라인 동작**: localStorage 기반, 백엔드 불필요

## 시작하기

```bash
git clone https://github.com/AI-Native-Camp-Product-building/product-junhyeok.git
cd product-junhyeok
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 명령어

```bash
npm run dev      # 개발 서버 (Turbopack)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint
```

## 기술 스택

- **Next.js 16** (App Router, Turbopack)
- **React 19**, TypeScript strict
- **Tailwind CSS v4**
- **Vercel** 배포

## 커리큘럼

**Day 1** — Claude Code 기초 (7개 블록):
Agentic Loop, CLAUDE.md, Tool Use, Context Window, Slash Commands, Permissions & Safety, Hooks

**Day 2–4** — 준비 중 (MCP 딥다이브, Clarify + PRD, 세션 최적화)

**Day 5+** — daily-digest 파이프라인이 자동 생성하는 신규 모듈

## 콘텐츠 파이프라인

매일 자동으로 Claude Code 생태계를 스캔하고, 교육적 가치가 있는 발견이 있으면 학습 모듈을 생성합니다.

```
⏰ Cron (매일 9:07)
   ↓
🔍 ecosystem-scout → 증분 스캔 (공식 채널 + 커뮤니티)
   ↓
📋 트리아지 → PROCEED / SKIP 판정
   ↓ (PROCEED)
✏️  lesson-designer → ADHD 친화 3-Phase 블록 설계
   ↓
🔨 module-builder → Next.js 앱 통합 (data/staging/)
   ↓
✅ module-qa → 타입/빌드/콘텐츠/디자인 검증
   ↓
👀 사람 리뷰 → 퍼블리시
```

### 사용법

```bash
# 수동: 특정 주제 모듈 생성
"Claude Code hooks 학습 모듈 만들어줘"

# 수동: 즉시 스캔
"오늘 Claude Code에 뭐 새로운 거 있어?"

# 자동: cron이 매일 실행 → staging → 리뷰 후 퍼블리시
"스테이징 퍼블리시해줘"
```

### 개발:학습 비중

모든 모듈이 코딩만은 아닙니다. 콘텐츠 유형별로 비중을 자동 조절합니다:

| 유형 | 예시 | 개발:학습 |
|------|------|----------|
| 기능학습 | 새 API, 설정 | 7:3 |
| 워크플로우 | 작업 패턴, 자동화 | 5:5 |
| 개념이해 | 아키텍처, 원리 | 3:7 |

## 프로젝트 구조

```
app/                                   # Next.js App Router
├── page.tsx                           # 랜딩 페이지
├── onboarding/                        # 온보딩 라우트
│   ├── [dayId]/[blockId]/page.tsx     # 학습 (3-Phase 상태머신)
│   ├── skip-quiz/page.tsx             # 배치 테스트
│   └── complete/page.tsx              # 완료 화면
components/
├── ui/                                # 공통 UI (Card, ProgressBar, CodeBlock)
├── onboarding/execute/                # 5가지 실습 타입 컴포넌트
├── gamification/                      # 스트릭, 뱃지, 히트맵
└── landing/                           # 랜딩 페이지 섹션 (11개)
lib/                                   # 비즈니스 로직
├── types.ts                           # 중앙 타입 정의
├── state.ts / state-context.tsx       # 상태 관리 (localStorage + Context)
├── curriculum-loader.ts               # 콘텐츠 로더
└── streak.ts / badges.ts / spaced-repetition.ts
data/
├── onboarding/                        # Day별 학습 콘텐츠
├── staging/                           # 자동 생성 콘텐츠 리뷰 대기
└── content-registry.md                # 토픽 추적 + 중복 방지
.claude/
├── agents/                            # 에이전트 정의 (4개)
│   ├── ecosystem-scout.md             # 생태계 리서처
│   ├── lesson-designer.md             # 교육 설계자
│   ├── module-builder.md              # 앱 통합 개발자
│   └── module-qa.md                   # 품질 검증 전문가
└── skills/                            # 스킬 정의 (6개)
    ├── daily-digest/                  # 일일 자동 콘텐츠 엔진
    ├── sprint-pipeline/               # 모듈 생성 파이프라인
    ├── ecosystem-scan/                # 생태계 조사 프로토콜
    ├── lesson-design/                 # 블록 설계 프레임워크
    ├── module-build/                  # 앱 통합 가이드
    └── module-qa/                     # 검증 프로토콜
```

## ADHD 설계 원칙

- **3분 규칙**: 보상 없이 3분 이상 지속되는 구간 없음
- **시각적 진행률**: 블록/Phase 단위 프로그레스 바
- **중도 이탈 OK**: 부분 완료도 인정
- **즉각 피드백**: 실습/퀴즈 결과 즉시 표시
- **간격 반복**: `daysSince × (1 - correctRate)` 우선순위 계산

## Legacy Plugin

`skills/`, `hooks/`, `data/curriculum.json`, `.claude-plugin/` — 기존 Claude Code CLI 플러그인 파일로, 웹앱과 공존합니다.

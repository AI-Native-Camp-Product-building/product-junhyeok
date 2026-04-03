# ADHD Sprint — Claude Code 학습 웹 플랫폼

ADHD 개발자를 위한 도파민 설계 기반 학습 시스템. 짧은 블록 단위로 Claude Code를 체계적으로 마스터하세요.

## 주요 기능

- **3-Phase 블록 학습**: EXPLAIN → EXECUTE → QUIZ 순서로 집중력 유지
- **5가지 실습 타입**: 코드 리딩, 디버깅, 개념 매칭, 빈칸 채우기, 순서 정렬
- **게이미피케이션**: 스트릭, 9종 뱃지, 히트맵 캘린더, 축하 애니메이션
- **간격 반복**: 오래되고 틀린 토픽을 우선 복습
- **Skip Quiz**: 이미 아는 내용은 배치 테스트로 건너뛰기
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

Day 1 — 7개 블록:

1. Agentic Loop
2. CLAUDE.md
3. Tool Use
4. Context Window
5. Slash Commands
6. Permissions & Safety
7. Hooks

Days 2–4는 준비 중입니다.

## 프로젝트 구조

```
app/
├── page.tsx                          # 홈 (대시보드)
├── onboarding/
│   ├── page.tsx                      # Day 목록
│   ├── [dayId]/page.tsx              # 블록 목록
│   ├── [dayId]/[blockId]/page.tsx    # 학습 (3-Phase)
│   ├── skip-quiz/page.tsx            # 배치 테스트
│   └── complete/page.tsx             # 완료 화면
components/
├── ui/                               # 공통 UI (Card, Badge, Timer 등)
├── onboarding/                       # 학습 컴포넌트
│   └── execute/                      # 5가지 실습 타입
├── gamification/                     # 스트릭, 뱃지, 히트맵
└── feedback/                         # 피드백 (ThumbsReaction)
lib/
├── types.ts                          # 중앙 타입 정의
├── state.ts / state-context.tsx      # 상태 관리 (localStorage + Context)
├── curriculum-loader.ts              # 콘텐츠 로더
├── streak.ts / badges.ts            # 게이미피케이션 로직
└── spaced-repetition.ts             # 간격 반복 알고리즘
data/onboarding/                      # Day별 콘텐츠
```

## ADHD 설계 원칙

- **3분 규칙**: 보상 없이 3분 이상 지속되는 구간 없음
- **시각적 진행률**: 블록/Phase 단위 프로그레스 바
- **중도 이탈 OK**: 부분 완료도 인정
- **즉각 피드백**: 실습/퀴즈 결과 즉시 표시
- **간격 반복**: `daysSince × (1 - correctRate)` 우선순위 계산

## Legacy Plugin

`skills/`, `hooks/`, `data/curriculum.json`, `.claude-plugin/` — 기존 Claude Code CLI 플러그인 파일로, 웹앱과 공존합니다.

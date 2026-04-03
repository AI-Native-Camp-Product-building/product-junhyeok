# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

ADHD Sprint — Claude Code 학습 웹 플랫폼. ADHD 개발자를 위한 도파민 설계 기반 학습 시스템. Next.js 웹앱과 기존 Claude Code 플러그인 코드가 공존하는 레포.

## Commands

```bash
npm run dev      # 개발 서버 (Turbopack, localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint
```

테스트 러너 미설정. 빌드 성공 여부로 타입 검증.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**, TypeScript strict
- **Tailwind CSS v4** (`@theme inline` in globals.css + tailwind.config.ts 병행)
- **localStorage** 전용 상태 관리 (백엔드 없음)
- **Vercel** 배포
- Path alias: `@/*` = 프로젝트 루트

## Architecture

### 상태 관리 패턴
`lib/state.ts` (localStorage CRUD) → `lib/state-context.tsx` (React Context + `useAppState()` hook). 모든 `"use client"` 컴포넌트에서 `useAppState()`로 접근. `stateVersion: 1` — 버전 불일치 시 초기화.

### 콘텐츠 구조
`data/onboarding/day1.ts`에 Day 1 전체 콘텐츠 (7블록). Days 2-4는 `days2-4-stubs.ts`에 locked 스텁. `lib/curriculum-loader.ts`의 `getDays()`, `getDay()`, `getBlock()`으로 접근.

### 온보딩 블록 3-Phase 플로우
각 블록은 EXPLAIN → EXECUTE → QUIZ 순서로 진행. `app/onboarding/[dayId]/[blockId]/page.tsx`에서 `Phase` 상태머신으로 제어.

### ExecuteContent 타입
5개 서브타입의 discriminated union (`taskType` 필드로 구분):
- `code-reading`, `debugging`, `concept-matching`, `fill-in-blank`, `sequence-ordering`
- `components/onboarding/execute/` 아래 각각 별도 컴포넌트

### 게이미피케이션
- `lib/streak.ts` — 스트릭 계산 (어제=+1, 오늘=유지, 그외=리셋)
- `lib/badges.ts` — 9개 뱃지, `checkBadges(state)` → 새로 획득한 ID 반환
- `lib/spaced-repetition.ts` — 토픽 우선순위 = daysSince * (1 - correctRate)
- 블록 완료 시 스트릭 업데이트. Skip-quiz(배치 테스트)는 스트릭 미갱신.

## Design Tokens

Tailwind 커스텀 컬러 (`globals.css` `@theme inline` + `tailwind.config.ts` 병행):

### 브랜드 컬러
- `dopamine` (purple 스케일) — 주요 브랜드
- `spark` (orange) — 보조 액센트
- `streak` (green) — 스트릭/성공
- `surface` (dark slate) — 배경/카드

### 시맨틱 컬러
- `reward` (amber) — 부분 성공, 경고 상태, 약점 토픽 하이라이트
- `error` (red) — 오답, 에러 상태
- `code` (blue) — 코드 구문 키워드, 기술 지표

### 장식 컬러 (랜딩 페이지)
- `accent-teal` (teal) — 페이즈/토픽 액센트
- `accent-pink` (pink) — 페이즈 액센트
- `accent-purple` (purple) — 기능/대시보드 액센트
- `terminal-red/yellow/green` — macOS 터미널 트래픽 라이트

폰트: `font-sans` = Noto Sans KR, `font-mono` = JetBrains Mono. 다크 테마 기본 (`bg-surface-950`).

### 디자인 규칙 (MUST follow)
- NEVER use raw Tailwind colors (red-*, blue-*, amber-*, green-*, teal-*, pink-*, purple-*, yellow-*). 반드시 디자인 토큰 사용.
- NEVER use HEX literals in className or style attributes. CSS 변수 또는 토큰 클래스 사용.
- NEVER use `<style>` blocks in components. 모든 keyframe과 유틸리티 클래스는 `globals.css`에 정의.
- NEVER reimplement ProgressBar inline. `components/ui/ProgressBar`의 `<ProgressBar>` 사용. (`size="sm"` = h-1.5, `trackColor="surface-900"` 지원)
- NEVER reimplement Card styles inline. `components/ui/Card`의 `<Card>` 사용.
- `bg-surface-950`이 canonical dark background. `bg-[#020617]` 사용 금지.
- `white/XX` 투명도 유틸리티 (text-white/50, bg-white/5 등)는 토큰 요구에서 면제.

## Legacy Plugin Files

`skills/`, `hooks/`, `data/curriculum.json`, `data/commands.json`, `.claude-plugin/`, `scripts/` — 기존 Claude Code 플러그인 파일. 웹앱과 공존하며 직접 수정하지 않음. `data/curriculum.json`은 Day 1 콘텐츠 원본으로 `data/onboarding/day1.ts`에서 참조.

## Conventions

- 한국어 UI (모든 사용자 대면 문자열)
- 모든 페이지/인터랙티브 컴포넌트는 `"use client"`
- 컴포넌트 props에 TypeScript 인터페이스 사용 (`lib/types.ts` 중앙 정의)
- `lang="ko"` HTML 속성

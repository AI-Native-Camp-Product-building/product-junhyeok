"use client";

import { useEffect } from "react";
import Link from "next/link";

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

export default function HomePage() {
  useScrollReveal();

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-surface-950/70 border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-dopamine-500 to-spark-500 flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <span className="font-semibold text-white/90 tracking-tight">
              ADHD Sprint
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
            <a
              href="#how-it-works"
              className="hover:text-white/90 transition-colors"
            >
              작동 방식
            </a>
            <a
              href="#features"
              className="hover:text-white/90 transition-colors"
            >
              기능
            </a>
            <a
              href="#curriculum"
              className="hover:text-white/90 transition-colors"
            >
              커리큘럼
            </a>
            <a
              href="#start"
              className="hover:text-white/90 transition-colors"
            >
              설치
            </a>
          </div>
          <Link
            href="/onboarding"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-dopamine-600/20 border border-dopamine-500/30 text-dopamine-300 text-sm font-medium hover:bg-dopamine-600/30 transition-all"
          >
            시작하기
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-mesh relative min-h-screen flex items-center pt-16">
        {/* Decorative orbs */}
        <div className="absolute top-32 left-[10%] w-72 h-72 bg-dopamine-600/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-32 right-[15%] w-56 h-56 bg-spark-500/8 rounded-full blur-[80px] animate-float-mid" />

        <div className="max-w-6xl mx-auto px-6 py-20 md:py-0">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: Text */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-dopamine-600/10 border border-dopamine-500/20 text-dopamine-300 text-xs font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-dopamine-400 animate-pulse" />
                Claude Code Plugin
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight">
                <span className="text-white">ADHD 개발자의</span>
                <br />
                <span className="gradient-text">도파민 학습법</span>
              </h1>

              <p className="text-lg text-white/50 leading-relaxed max-w-lg">
                30분 스프린트로 Claude Code를 체계적으로 마스터하세요.
                <br />
                <span className="text-white/70">3분마다 보상</span>,{" "}
                <span className="text-white/70">7단계 도파민 설계</span>,{" "}
                <span className="text-white/70">스트릭 시스템</span>으로
                <br />
                집중이 어려운 날에도 학습이 계속됩니다.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/onboarding"
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-dopamine-600 to-dopamine-500 text-white font-semibold text-sm shadow-lg shadow-dopamine-600/25 hover:shadow-dopamine-600/40 hover:scale-[1.02] transition-all duration-300"
                >
                  학습 시작하기
                  <svg
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <Link
                  href="/onboarding/skip-quiz"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/10 text-white/60 text-sm font-medium hover:border-white/20 hover:text-white/80 transition-all"
                >
                  이미 알고 있나요?
                </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-2xl font-bold text-white">
                    30<span className="text-dopamine-400 text-lg">min</span>
                  </div>
                  <div className="text-xs text-white/40 mt-0.5">스프린트</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <div className="text-2xl font-bold text-white">
                    7<span className="text-spark-400 text-lg">단계</span>
                  </div>
                  <div className="text-xs text-white/40 mt-0.5">
                    도파민 설계
                  </div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <div className="text-2xl font-bold text-white">
                    10<span className="text-streak-400 text-lg">토픽</span>
                  </div>
                  <div className="text-xs text-white/40 mt-0.5">
                    핵심 커리큘럼
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Terminal mockup */}
            <div className="relative animate-float">
              <div className="terminal-window glow-purple">
                <div className="terminal-header">
                  <div className="terminal-dot bg-terminal-red" />
                  <div className="terminal-dot bg-terminal-yellow" />
                  <div className="terminal-dot bg-terminal-green" />
                  <span className="ml-2 text-xs text-white/30 font-mono">
                    claude — sprint
                  </span>
                </div>
                <div className="p-5 code-block space-y-3">
                  <div className="text-dopamine-400">
                    &gt; /sprint agentic-loop
                  </div>
                  <div className="text-white/60 mt-3">
                    <span className="text-spark-400 font-semibold">
                      ADHD Sprint
                    </span>{" "}
                    <span className="text-white/30">v1.0</span>
                  </div>
                  <div className="text-white/40 text-xs mt-2">
                    토픽: Agentic Loop
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-streak-400">Phase 1/7</span>
                      <span className="text-white/30">HOOK</span>
                      <span className="text-white/20">2분</span>
                    </div>
                    <div className="mt-1.5 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-dopamine-500 to-spark-500 rounded-full animate-progress-fill w-[43%]"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-white/20 mt-1">
                      <span>{"\u25A0\u25A0\u25A0\u25A1\u25A1\u25A1\u25A1"}</span>
                      <span>3/7</span>
                    </div>
                  </div>
                  <div className="mt-3 p-3 rounded-lg bg-dopamine-600/10 border border-dopamine-500/10">
                    <div className="text-[11px] text-dopamine-300/80">
                      안 써본 명령어를 하나 실행해보세요:
                    </div>
                    <div className="text-dopamine-300 mt-1.5">
                      $ claude --resume
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-white/20">
                    <span className="text-streak-400">{"\uD83D\uDD25"}</span>{" "}
                    스트릭: 5일 연속
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full bg-streak-500/20 border border-streak-400/30 text-streak-400 text-xs font-semibold animate-float-fast">
                +50 XP
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative py-28 md:py-36">
        <div className="section-divider" />
        <div className="max-w-4xl mx-auto px-6 pt-20 md:pt-28">
          <div className="reveal text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-[2.5em]">
              &ldquo;공부해야 하는 건 아는데,
              <br />
              <span className="text-white/40">시작이 안 돼요.&rdquo;</span>
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
              긴 튜토리얼은 3분 만에 집중이 흐트러집니다.
              <br />
              문서를 읽다 탭을 20개 열고, 결국 아무것도 완료하지 못하죠.
            </p>
          </div>

          <div className="reveal mt-16 grid sm:grid-cols-3 gap-6">
            {/* Pain 1 */}
            <div className="bezel-card p-6 text-center space-y-3">
              <div className="text-3xl">{"\uD83D\uDE35"}</div>
              <div className="text-sm font-medium text-white/70">
                긴 문서, 짧은 집중
              </div>
              <div className="text-xs text-white/35 leading-relaxed">
                30분짜리 튜토리얼을
                <br />
                끝까지 본 적이 없다
              </div>
            </div>
            {/* Pain 2 */}
            <div className="bezel-card p-6 text-center space-y-3">
              <div className="text-3xl">{"\uD83D\uDC68\u200D\uD83D\uDCBB"}</div>
              <div className="text-sm font-medium text-white/70">
                배운 건 많은데
              </div>
              <div className="text-xs text-white/35 leading-relaxed">
                다음 날이면
                <br />
                기억이 안 난다
              </div>
            </div>
            {/* Pain 3 */}
            <div className="bezel-card p-6 text-center space-y-3">
              <div className="text-3xl">{"\uD83D\uDC94"}</div>
              <div className="text-sm font-medium text-white/70">
                동기 부여 실패
              </div>
              <div className="text-xs text-white/35 leading-relaxed">
                시작은 의욕적이지만
                <br />
                3일 만에 포기
              </div>
            </div>
          </div>

          {/* Science callout */}
          <div className="reveal mt-16 max-w-2xl mx-auto">
            <div className="bezel-card p-6 border-dopamine-500/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-dopamine-500/10 border border-dopamine-500/20 flex items-center justify-center text-lg">{"\uD83E\uDDE0"}</div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-dopamine-400">왜 ADHD 뇌에는 다른 접근이 필요한가?</div>
                  <p className="text-xs text-white/50 leading-relaxed">
                    ADHD 뇌는 도파민 수용체 밀도가 낮아 일반적인 보상에 덜 반응합니다
                    <span className="text-white/30">(Volkow et al., 2009, JAMA)</span>.
                    이로 인해 지연된 보상보다 즉각적 보상을 강하게 선호하며, 흥미가 없는 과제에서 주의력이 급격히 저하됩니다
                    <span className="text-white/30">(Sonuga-Barke, 2003)</span>.
                    해결책은 <span className="text-white/80 font-medium">짧은 주기의 즉각적 보상 루프</span>를 설계하는 것입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-dopamine-400 text-sm font-medium">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
              그래서 도파민 설계가 필요합니다
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-28 md:py-36">
        <div className="section-divider" />
        <div className="max-w-6xl mx-auto px-6 pt-20 md:pt-28">
          <div className="reveal text-center space-y-4 mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-spark-500/10 border border-spark-500/20 text-spark-400 text-xs font-medium">
              30분 스프린트
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              7단계 도파민 흐름
            </h2>
            <p className="text-white/40 max-w-lg mx-auto">
              3분마다 작은 보상이 쌓이고, 30분 후엔 하나의 토픽을 완전히
              마스터합니다.
            </p>
          </div>

          {/* Sprint Phases */}
          <div className="reveal space-y-4 max-w-3xl mx-auto">
            {/* Phase 1 */}
            <div className="bezel-card p-5 flex items-start gap-5 card-hover group">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-dopamine-600/30 to-dopamine-500/10 border border-dopamine-500/20 flex items-center justify-center">
                <span className="text-dopamine-400 font-mono font-bold text-sm">
                  01
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-white text-sm">HOOK</h3>
                  <span className="text-[10px] font-mono text-white/25 bg-white/5 px-2 py-0.5 rounded">
                    2분
                  </span>
                </div>
                <p className="text-xs text-white/40 mt-1.5 leading-relaxed">
                  안 써본 명령어 하나를 즉시 실행. 호기심이 스프린트의 시동을
                  겁니다.
                </p>
              </div>
              <div className="flex-shrink-0 text-lg opacity-60 group-hover:opacity-100 transition-opacity">
                {"\u26A1"}
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bezel-card p-5 flex items-start gap-5 card-hover group">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-code-600/30 to-code-500/10 border border-code-500/20 flex items-center justify-center">
                <span className="text-code-400 font-mono font-bold text-sm">
                  02
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-white text-sm">
                    MICRO-READ
                  </h3>
                  <span className="text-[10px] font-mono text-white/25 bg-white/5 px-2 py-0.5 rounded">
                    3분
                  </span>
                </div>
                <p className="text-xs text-white/40 mt-1.5 leading-relaxed">
                  핵심 개념 3줄 요약. 길게 읽지 않고 핵심만 빠르게 파악합니다.
                </p>
              </div>
              <div className="flex-shrink-0 text-lg opacity-60 group-hover:opacity-100 transition-opacity">
                {"\uD83D\uDCD6"}
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bezel-card p-5 flex items-start gap-5 card-hover group">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-spark-600/30 to-spark-500/10 border border-spark-500/20 flex items-center justify-center">
                <span className="text-spark-400 font-mono font-bold text-sm">
                  03
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-white text-sm">TRY-IT</h3>
                  <span className="text-[10px] font-mono text-white/25 bg-white/5 px-2 py-0.5 rounded">
                    8분
                  </span>
                </div>
                <p className="text-xs text-white/40 mt-1.5 leading-relaxed">
                  터미널에서 직접 실습. 읽기만으로는 못 만드는 근육 기억을
                  만듭니다.
                </p>
              </div>
              <div className="flex-shrink-0 text-lg opacity-60 group-hover:opacity-100 transition-opacity">
                {"\uD83D\uDCBB"}
              </div>
            </div>

            {/* Phase 4 */}
            <div className="bezel-card p-5 flex items-start gap-5 card-hover group">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-error-600/30 to-error-500/10 border border-error-500/20 flex items-center justify-center">
                <span className="text-error-400 font-mono font-bold text-sm">
                  04
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-white text-sm">
                    CHALLENGE
                  </h3>
                  <span className="text-[10px] font-mono text-white/25 bg-white/5 px-2 py-0.5 rounded">
                    7분
                  </span>
                </div>
                <p className="text-xs text-white/40 mt-1.5 leading-relaxed">
                  심화 도전 과제. 살짝 어려운 난이도가 몰입(Flow)을 유발합니다.
                </p>
              </div>
              <div className="flex-shrink-0 text-lg opacity-60 group-hover:opacity-100 transition-opacity">
                {"\uD83C\uDFC6"}
              </div>
            </div>

            {/* Phase 5 */}
            <div className="bezel-card p-5 flex items-start gap-5 card-hover group">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent-teal-600/30 to-accent-teal-500/10 border border-accent-teal-500/20 flex items-center justify-center">
                <span className="text-accent-teal-400 font-mono font-bold text-sm">
                  05
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-white text-sm">CAPTURE</h3>
                  <span className="text-[10px] font-mono text-white/25 bg-white/5 px-2 py-0.5 rounded">
                    3분
                  </span>
                </div>
                <p className="text-xs text-white/40 mt-1.5 leading-relaxed">
                  TIL(Today I Learned) 한 줄 메모. 배운 것을 내 언어로
                  정착시킵니다.
                </p>
              </div>
              <div className="flex-shrink-0 text-lg opacity-60 group-hover:opacity-100 transition-opacity">
                {"\uD83D\uDCDD"}
              </div>
            </div>

            {/* Phase 6 */}
            <div className="bezel-card p-5 flex items-start gap-5 card-hover group">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent-pink-600/30 to-accent-pink-500/10 border border-accent-pink-500/20 flex items-center justify-center">
                <span className="text-accent-pink-400 font-mono font-bold text-sm">
                  06
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-white text-sm">SHARE</h3>
                  <span className="text-[10px] font-mono text-white/25 bg-white/5 px-2 py-0.5 rounded">
                    2분
                  </span>
                </div>
                <p className="text-xs text-white/40 mt-1.5 leading-relaxed">
                  공유 텍스트 자동 생성. 누군가에게 설명하면 이해가 배로
                  깊어집니다.
                </p>
              </div>
              <div className="flex-shrink-0 text-lg opacity-60 group-hover:opacity-100 transition-opacity">
                {"\uD83D\uDCAC"}
              </div>
            </div>

            {/* Phase 7 */}
            <div className="bezel-card p-5 flex items-start gap-5 card-hover group">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-streak-600/30 to-streak-500/10 border border-streak-400/20 flex items-center justify-center">
                <span className="text-streak-400 font-mono font-bold text-sm">
                  07
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-white text-sm">STREAK</h3>
                  <span className="text-[10px] font-mono text-white/25 bg-white/5 px-2 py-0.5 rounded">
                    5분
                  </span>
                </div>
                <p className="text-xs text-white/40 mt-1.5 leading-relaxed">
                  퀴즈 + 스트릭 기록. 연속 학습일이 쌓이며 내일도 돌아오게
                  됩니다.
                </p>
              </div>
              <div className="flex-shrink-0 text-lg opacity-60 group-hover:opacity-100 transition-opacity fire-flicker">
                {"\uD83D\uDD25"}
              </div>
            </div>
          </div>

          {/* 3-minute rule callout */}
          <div className="reveal mt-12 max-w-3xl mx-auto">
            <div className="bezel-card p-6 flex items-start gap-4 border-dopamine-500/20">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-dopamine-600/20 flex items-center justify-center text-dopamine-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-dopamine-300">
                  3분 규칙
                </div>
                <div className="text-xs text-white/40 mt-1 leading-relaxed">
                  보상 없이 3분 이상 지속되는 구간이 없습니다. 매 Phase마다
                  시각적 진행률 바와 즉각적인 피드백이 도파민 루프를 유지합니다.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-28 md:py-36">
        <div className="section-divider" />
        <div className="max-w-6xl mx-auto px-6 pt-20 md:pt-28">
          <div className="reveal text-center space-y-4 mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-streak-500/10 border border-streak-400/20 text-streak-400 text-xs font-medium">
              기능 모음
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              학습을 지속하게 만드는 장치들
            </h2>
          </div>

          <div className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Feature 1: Sprint */}
            <div className="bezel-card p-6 space-y-4 card-hover">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-dopamine-600/20 to-dopamine-500/10 border border-dopamine-500/15 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-dopamine-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">/sprint</h3>
                <p className="text-xs text-white/40 mt-1.5 leading-relaxed">
                  30분 학습 스프린트. 7단계 도파민 설계로 한 토픽을 완벽히
                  마스터.
                </p>
              </div>
              <div className="font-mono text-[11px] text-dopamine-400/60 bg-dopamine-600/5 px-3 py-2 rounded-lg">
                /sprint agentic-loop
              </div>
            </div>

            {/* Feature 2: Mini Sprint */}
            <div className="bezel-card p-6 space-y-4 card-hover">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-spark-600/20 to-spark-500/10 border border-spark-500/15 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-spark-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">
                  /sprint mini
                </h3>
                <p className="text-xs text-white/40 mt-1.5 leading-relaxed">
                  15분 미니 스프린트. 에너지가 낮은 날에도 스트릭을 유지하세요.
                </p>
              </div>
              <div className="font-mono text-[11px] text-spark-400/60 bg-spark-600/5 px-3 py-2 rounded-lg">
                /sprint mini
              </div>
            </div>

            {/* Feature 3: Quiz */}
            <div className="bezel-card p-6 space-y-4 card-hover">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-code-600/20 to-code-500/10 border border-code-500/15 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-code-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">/quiz</h3>
                <p className="text-xs text-white/40 mt-1.5 leading-relaxed">
                  5분 퀵 퀴즈. 스페이스드 리피티션으로 오래된 약점부터 집중
                  복습.
                </p>
              </div>
              <div className="font-mono text-[11px] text-code-400/60 bg-code-600/5 px-3 py-2 rounded-lg">
                /quiz all
              </div>
            </div>

            {/* Feature 4: Streak */}
            <div className="bezel-card p-6 space-y-4 card-hover">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-streak-600/20 to-streak-500/10 border border-streak-400/15 flex items-center justify-center text-streak-400 text-lg fire-flicker">
                {"\uD83D\uDD25"}
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">/streak</h3>
                <p className="text-xs text-white/40 mt-1.5 leading-relaxed">
                  연속 학습일 + 업적 + 14일 캘린더. 쌓이는 숫자가 내일도
                  돌아오게 합니다.
                </p>
              </div>
              <div className="font-mono text-[11px] text-streak-400/60 bg-streak-600/5 px-3 py-2 rounded-lg">
                /streak
              </div>
            </div>

            {/* Feature 5: Dashboard */}
            <div className="bezel-card p-6 space-y-4 card-hover">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-purple-600/20 to-accent-purple-500/10 border border-accent-purple-500/15 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-accent-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">
                  /dashboard
                </h3>
                <p className="text-xs text-white/40 mt-1.5 leading-relaxed">
                  전체 진행률 + 히트맵 + 퀴즈 분석. 나의 학습 여정을 한눈에.
                </p>
              </div>
              <div className="font-mono text-[11px] text-accent-purple-400/60 bg-accent-purple-600/5 px-3 py-2 rounded-lg">
                /dashboard
              </div>
            </div>

            {/* Feature 6: Living Curriculum */}
            <div className="bezel-card p-6 space-y-4 card-hover">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-teal-600/20 to-accent-teal-500/10 border border-accent-teal-500/15 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-accent-teal-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">
                  /sprint update
                </h3>
                <p className="text-xs text-white/40 mt-1.5 leading-relaxed">
                  살아있는 커리큘럼. 공식 문서를 스캔해 새 기능을 자동으로
                  토픽에 추가.
                </p>
              </div>
              <div className="font-mono text-[11px] text-accent-teal-400/60 bg-accent-teal-600/5 px-3 py-2 rounded-lg">
                /sprint update
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="relative py-28 md:py-36">
        <div className="section-divider" />
        <div className="max-w-6xl mx-auto px-6 pt-20 md:pt-28">
          <div className="reveal text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-dopamine-600/10 border border-dopamine-500/20 text-dopamine-300 text-xs font-medium">
              Core Curriculum
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              10개 핵심 토픽
            </h2>
            <p className="text-white/40 max-w-lg mx-auto">
              Claude Code의 핵심을 순서대로 마스터합니다. 각 토픽은 하나의
              스프린트로 완성됩니다.
            </p>
          </div>

          <div className="reveal grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {/* Topic 1 */}
            <div className="bezel-card p-4 flex items-center gap-4 card-hover group">
              <div className="topic-num flex-shrink-0 w-9 h-9 rounded-lg bg-dopamine-600/15 border border-dopamine-500/15 flex items-center justify-center text-dopamine-400 text-xs font-bold">
                01
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  Agentic Loop
                </div>
                <div className="text-[11px] text-white/30 mt-0.5 truncate">
                  Read &rarr; Plan &rarr; Act &rarr; Verify 자율 사이클
                </div>
              </div>
            </div>
            {/* Topic 2 */}
            <div className="bezel-card p-4 flex items-center gap-4 card-hover group">
              <div className="topic-num flex-shrink-0 w-9 h-9 rounded-lg bg-dopamine-600/15 border border-dopamine-500/15 flex items-center justify-center text-dopamine-400 text-xs font-bold">
                02
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  CLAUDE.md
                </div>
                <div className="text-[11px] text-white/30 mt-0.5 truncate">
                  3계층 프로젝트 지시 시스템
                </div>
              </div>
            </div>
            {/* Topic 3 */}
            <div className="bezel-card p-4 flex items-center gap-4 card-hover group">
              <div className="topic-num flex-shrink-0 w-9 h-9 rounded-lg bg-spark-600/15 border border-spark-500/15 flex items-center justify-center text-spark-400 text-xs font-bold">
                03
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  Tool Use
                </div>
                <div className="text-[11px] text-white/30 mt-0.5 truncate">
                  Read, Write, Edit, Bash, Glob, Grep
                </div>
              </div>
            </div>
            {/* Topic 4 */}
            <div className="bezel-card p-4 flex items-center gap-4 card-hover group">
              <div className="topic-num flex-shrink-0 w-9 h-9 rounded-lg bg-spark-600/15 border border-spark-500/15 flex items-center justify-center text-spark-400 text-xs font-bold">
                04
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  Context Window
                </div>
                <div className="text-[11px] text-white/30 mt-0.5 truncate">
                  /compact, /clear로 토큰 관리
                </div>
              </div>
            </div>
            {/* Topic 5 */}
            <div className="bezel-card p-4 flex items-center gap-4 card-hover group">
              <div className="topic-num flex-shrink-0 w-9 h-9 rounded-lg bg-code-600/15 border border-code-500/15 flex items-center justify-center text-code-400 text-xs font-bold">
                05
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  Slash Commands
                </div>
                <div className="text-[11px] text-white/30 mt-0.5 truncate">
                  /init, /review, /pr 워크플로우
                </div>
              </div>
            </div>
            {/* Topic 6 */}
            <div className="bezel-card p-4 flex items-center gap-4 card-hover group">
              <div className="topic-num flex-shrink-0 w-9 h-9 rounded-lg bg-code-600/15 border border-code-500/15 flex items-center justify-center text-code-400 text-xs font-bold">
                06
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  Permissions &amp; Safety
                </div>
                <div className="text-[11px] text-white/30 mt-0.5 truncate">
                  3단계 권한 시스템, Shift+Tab
                </div>
              </div>
            </div>
            {/* Topic 7 */}
            <div className="bezel-card p-4 flex items-center gap-4 card-hover group">
              <div className="topic-num flex-shrink-0 w-9 h-9 rounded-lg bg-accent-teal-600/15 border border-accent-teal-500/15 flex items-center justify-center text-accent-teal-400 text-xs font-bold">
                07
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  Hooks
                </div>
                <div className="text-[11px] text-white/30 mt-0.5 truncate">
                  PreToolUse, PostToolUse 자동화
                </div>
              </div>
            </div>
            {/* Topic 8 */}
            <div className="bezel-card p-4 flex items-center gap-4 card-hover group">
              <div className="topic-num flex-shrink-0 w-9 h-9 rounded-lg bg-accent-teal-600/15 border border-accent-teal-500/15 flex items-center justify-center text-accent-teal-400 text-xs font-bold">
                08
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  Skills &amp; Plugins
                </div>
                <div className="text-[11px] text-white/30 mt-0.5 truncate">
                  커스텀 명령어와 확장 패키지
                </div>
              </div>
            </div>
            {/* Topic 9 */}
            <div className="bezel-card p-4 flex items-center gap-4 card-hover group">
              <div className="topic-num flex-shrink-0 w-9 h-9 rounded-lg bg-streak-600/15 border border-streak-400/15 flex items-center justify-center text-streak-400 text-xs font-bold">
                09
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  MCP Servers
                </div>
                <div className="text-[11px] text-white/30 mt-0.5 truncate">
                  외부 도구 연결 프로토콜
                </div>
              </div>
            </div>
            {/* Topic 10 */}
            <div className="bezel-card p-4 flex items-center gap-4 card-hover group">
              <div className="topic-num flex-shrink-0 w-9 h-9 rounded-lg bg-streak-600/15 border border-streak-400/15 flex items-center justify-center text-streak-400 text-xs font-bold">
                10
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  Multi-Agent
                </div>
                <div className="text-[11px] text-white/30 mt-0.5 truncate">
                  서브에이전트 병렬 처리
                </div>
              </div>
            </div>
          </div>

          {/* Extension note */}
          <div className="reveal mt-8 text-center">
            <p className="text-xs text-white/30">
              <code className="text-dopamine-400/60">/sprint update</code>로 새
              토픽이 자동 추가됩니다
            </p>
          </div>
        </div>
      </section>

      {/* Science-Backed Learning Section */}
      <section className="relative py-28 md:py-36">
        <div className="section-divider" />
        <div className="max-w-6xl mx-auto px-6 pt-20 md:pt-28">
          <div className="reveal text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-code-500/10 border border-code-500/20 text-code-400 text-xs font-medium">
              Research-Backed
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              과학이 증명한 학습 원리
            </h2>
            <p className="text-white/40 max-w-lg mx-auto">
              모든 설계 결정 뒤에는 인지과학과 교육심리학 연구가 있습니다.
            </p>
          </div>

          <div className="reveal grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {/* Active Recall */}
            <div className="bezel-card p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-spark-600/20 to-spark-500/5 border border-spark-500/15 flex items-center justify-center text-lg">{"\uD83C\uDFAF"}</div>
                <div className="text-sm font-semibold text-white/90">능동적 회상 (Active Recall)</div>
              </div>
              <p className="text-xs text-white/45 leading-relaxed">
                단순히 읽는 것보다 <span className="text-white/70">직접 떠올리는 연습</span>이 장기 기억 형성에 3배 더 효과적입니다.
                퀴즈와 실습 과제가 이 원리를 적용합니다.
              </p>
              <div className="text-[10px] text-white/25 font-mono">Karpicke & Roediger, Science, 2008</div>
            </div>

            {/* Spaced Repetition */}
            <div className="bezel-card p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-dopamine-600/20 to-dopamine-500/5 border border-dopamine-500/15 flex items-center justify-center text-lg">{"\uD83D\uDCC9"}</div>
                <div className="text-sm font-semibold text-white/90">간격 반복 (Spaced Repetition)</div>
              </div>
              <p className="text-xs text-white/45 leading-relaxed">
                에빙하우스의 <span className="text-white/70">망각 곡선</span>에 따르면, 학습 후 24시간 내에 67%를 잊습니다.
                최적 간격으로 복습하면 기억 유지율이 90%까지 올라갑니다.
              </p>
              <div className="text-[10px] text-white/25 font-mono">Ebbinghaus, 1885 &middot; Cepeda et al., Psychological Bulletin, 2006</div>
            </div>

            {/* Dopamine & Variable Reward */}
            <div className="bezel-card p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-streak-600/20 to-streak-500/5 border border-streak-400/15 flex items-center justify-center text-lg">{"\u26A1"}</div>
                <div className="text-sm font-semibold text-white/90">도파민 보상 루프</div>
              </div>
              <p className="text-xs text-white/45 leading-relaxed">
                예측 가능한 보상보다 <span className="text-white/70">간헐적 보상</span>이 도파민 분비를 40% 더 촉진합니다.
                스트릭, 뱃지, 서프라이즈 팩트가 이 메커니즘을 활용합니다.
              </p>
              <div className="text-[10px] text-white/25 font-mono">Schultz, Neuron, 2016 &middot; Niv, Annual Review of Neuroscience, 2009</div>
            </div>

            {/* Flow State */}
            <div className="bezel-card p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-code-600/20 to-code-500/5 border border-code-500/15 flex items-center justify-center text-lg">{"\uD83C\uDF0A"}</div>
                <div className="text-sm font-semibold text-white/90">몰입 상태 (Flow State)</div>
              </div>
              <p className="text-xs text-white/45 leading-relaxed">
                <span className="text-white/70">난이도가 실력과 일치</span>할 때 몰입 상태에 진입합니다.
                적응형 퀴즈가 사용자의 수준에 맞춰 난이도를 자동 조절합니다.
              </p>
              <div className="text-[10px] text-white/25 font-mono">Csikszentmihalyi, Flow, 1990 &middot; Nakamura & Csikszentmihalyi, 2002</div>
            </div>
          </div>
        </div>
      </section>

      {/* ADHD Design Principles Section */}
      <section className="relative py-28 md:py-36">
        <div className="section-divider" />
        <div className="max-w-6xl mx-auto px-6 pt-20 md:pt-28">
          <div className="reveal text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              ADHD를 위한 설계 원칙
            </h2>
            <p className="text-white/40 max-w-lg mx-auto">
              모든 기능은 ADHD 뇌의 작동 방식에 맞춰 설계되었습니다.
            </p>
          </div>

          <div className="reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-dopamine-600/20 to-dopamine-500/5 border border-dopamine-500/15 mx-auto flex items-center justify-center text-2xl">
                {"\u23F1"}
              </div>
              <div className="text-sm font-semibold text-white/80">
                3분 규칙
              </div>
              <div className="text-[11px] text-white/35 leading-relaxed">
                보상 없이 3분 이상
                <br />
                지속되는 구간 없음
              </div>
              <div className="text-[9px] text-white/20 leading-relaxed mt-1">
                ADHD 주의 지속 시간 연구
                <br />
                Rapport et al., 2009
              </div>
            </div>
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-spark-600/20 to-spark-500/5 border border-spark-500/15 mx-auto flex items-center justify-center text-2xl">
                {"\uD83D\uDCC8"}
              </div>
              <div className="text-sm font-semibold text-white/80">
                시각적 진행률
              </div>
              <div className="text-[11px] text-white/35 leading-relaxed">
                매 Phase마다
                <br />
                {"\u25A0\u25A0\u25A0\u25A1\u25A1"} 진행률 바
              </div>
              <div className="text-[9px] text-white/20 leading-relaxed mt-1">
                목표 기울기 효과
                <br />
                Kivetz et al., 2006
              </div>
            </div>
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-streak-600/20 to-streak-500/5 border border-streak-400/15 mx-auto flex items-center justify-center text-2xl">
                {"\uD83D\uDC4D"}
              </div>
              <div className="text-sm font-semibold text-white/80">
                중도 이탈 OK
              </div>
              <div className="text-[11px] text-white/35 leading-relaxed">
                Phase 4+ 완료 시<br />
                부분 크레딧 인정
              </div>
              <div className="text-[9px] text-white/20 leading-relaxed mt-1">
                자기결정성 이론
                <br />
                Deci & Ryan, 2000
              </div>
            </div>
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-code-600/20 to-code-500/5 border border-code-500/15 mx-auto flex items-center justify-center text-2xl">
                {"\uD83D\uDD04"}
              </div>
              <div className="text-sm font-semibold text-white/80">
                스페이스드 리피티션
              </div>
              <div className="text-[11px] text-white/35 leading-relaxed">
                오래되고 틀린 퀴즈를
                <br />
                우선 출제
              </div>
              <div className="text-[9px] text-white/20 leading-relaxed mt-1">
                망각 곡선 연구
                <br />
                Ebbinghaus, 1885
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Start Section */}
      <section id="start" className="relative py-28 md:py-36">
        <div className="section-divider" />
        <div className="max-w-3xl mx-auto px-6 pt-20 md:pt-28">
          <div className="reveal text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-streak-500/10 border border-streak-400/20 text-streak-400 text-xs font-medium">
              3 Steps
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              지금 바로 시작하세요
            </h2>
          </div>

          <div className="reveal space-y-5 max-w-lg mx-auto">
            <div className="bezel-card p-5 flex items-start gap-4 card-hover">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-dopamine-600/30 to-dopamine-500/10 border border-dopamine-500/20 flex items-center justify-center">
                <span className="text-dopamine-400 font-mono font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">온보딩 시작</h3>
                <p className="text-xs text-white/40 mt-1">회원가입 없이 바로 학습을 시작합니다. 브라우저만 있으면 됩니다.</p>
              </div>
            </div>
            <div className="bezel-card p-5 flex items-start gap-4 card-hover">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-spark-600/30 to-spark-500/10 border border-spark-500/20 flex items-center justify-center">
                <span className="text-spark-400 font-mono font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">7개 핵심 개념 마스터</h3>
                <p className="text-xs text-white/40 mt-1">읽기 → 실습 → 퀴즈 3단계로 각 개념을 확실하게 익힙니다.</p>
              </div>
            </div>
            <div className="bezel-card p-5 flex items-start gap-4 card-hover">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-streak-600/30 to-streak-500/10 border border-streak-400/20 flex items-center justify-center">
                <span className="text-streak-400 font-mono font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">스트릭으로 습관 만들기</h3>
                <p className="text-xs text-white/40 mt-1">매일 학습하면 스트릭이 쌓이고, 뱃지를 획득하며 실력이 늘어갑니다.</p>
              </div>
            </div>
          </div>

          <div className="reveal mt-10 text-center">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-dopamine-600 to-spark-600 text-white font-semibold transition hover:opacity-90"
            >
              무료로 시작하기
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <p className="mt-3 text-xs text-white/30">회원가입 불필요 &middot; 완전 무료 &middot; 브라우저에서 바로 시작</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-28 md:py-36">
        <div className="section-divider" />
        <div className="max-w-3xl mx-auto px-6 pt-20 md:pt-28 text-center">
          <div className="reveal space-y-8">
            {/* Streak mockup */}
            <div className="inline-flex items-center gap-1.5 mb-2">
              <span className="text-4xl fire-flicker">
                {"\uD83D\uDD25"}
              </span>
              <span className="text-5xl font-extrabold text-white">1</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              첫 번째 스트릭을 시작하세요
            </h2>
            <p className="text-white/40 text-lg max-w-md mx-auto">
              완벽한 계획보다 30분의 실행이 낫습니다.
              <br />
              오늘 첫 스프린트를 돌려보세요.
            </p>

            <div className="flex justify-center gap-4 pt-2">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-dopamine-600 to-spark-500 text-white font-semibold shadow-lg shadow-dopamine-600/20 hover:shadow-dopamine-600/35 hover:scale-[1.02] transition-all duration-300"
              >
                시작하기
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>

            {/* Mini social proof */}
            <div className="pt-8 flex items-center justify-center gap-6 text-xs text-white/25">
              <span>Claude Code Plugin</span>
              <span className="w-1 h-1 rounded-full bg-white/15" />
              <span>100% 무료</span>
              <span className="w-1 h-1 rounded-full bg-white/15" />
              <span>한국어 네이티브</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-dopamine-500 to-spark-500 flex items-center justify-center text-white font-bold text-xs">
                S
              </div>
              <span className="text-sm text-white/40">ADHD Sprint</span>
            </div>
            <div className="text-xs text-white/20">
              ADHD 개발자를 위한 도파민 설계 학습 플러그인
            </div>
          </div>
        </div>
      </footer>

    </>
  );
}

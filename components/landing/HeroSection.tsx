import Link from "next/link";

export function HeroSection() {
  return (
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
  );
}

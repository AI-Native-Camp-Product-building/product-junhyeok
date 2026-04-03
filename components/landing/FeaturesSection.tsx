export function FeaturesSection() {
  return (
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
  );
}

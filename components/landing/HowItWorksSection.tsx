export function HowItWorksSection() {
  return (
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
  );
}

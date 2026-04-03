import Link from "next/link";

export function HowToStartSection() {
  return (
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
  );
}

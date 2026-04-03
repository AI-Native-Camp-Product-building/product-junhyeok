import Link from "next/link";

export function CtaSection() {
  return (
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
  );
}

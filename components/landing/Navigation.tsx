import Link from "next/link";

export function Navigation() {
  return (
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
  );
}

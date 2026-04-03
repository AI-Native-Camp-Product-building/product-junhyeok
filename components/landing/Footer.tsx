export function Footer() {
  return (
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
  );
}

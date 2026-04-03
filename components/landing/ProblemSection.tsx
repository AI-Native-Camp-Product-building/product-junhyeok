export function ProblemSection() {
  return (
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
  );
}

export function AdhdPrinciplesSection() {
  return (
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
  );
}

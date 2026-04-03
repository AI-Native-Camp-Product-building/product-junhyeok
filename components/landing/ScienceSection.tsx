export function ScienceSection() {
  return (
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
  );
}

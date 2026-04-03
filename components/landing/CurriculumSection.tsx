export function CurriculumSection() {
  return (
    <section id="curriculum" className="relative py-28 md:py-36">
      <div className="section-divider" />
      <div className="max-w-6xl mx-auto px-6 pt-20 md:pt-28">
        <div className="reveal text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-dopamine-600/10 border border-dopamine-500/20 text-dopamine-300 text-xs font-medium">
            Core Curriculum
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            10개 핵심 토픽
          </h2>
          <p className="text-white/40 max-w-lg mx-auto">
            Claude Code의 핵심을 순서대로 마스터합니다. 각 토픽은 하나의
            스프린트로 완성됩니다.
          </p>
        </div>

        <div className="reveal grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
          {/* Topic 1 */}
          <div className="bezel-card p-4 flex items-center gap-4 card-hover group">
            <div className="topic-num flex-shrink-0 w-9 h-9 rounded-lg bg-dopamine-600/15 border border-dopamine-500/15 flex items-center justify-center text-dopamine-400 text-xs font-bold">
              01
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                Agentic Loop
              </div>
              <div className="text-[11px] text-white/30 mt-0.5 truncate">
                Read &rarr; Plan &rarr; Act &rarr; Verify 자율 사이클
              </div>
            </div>
          </div>
          {/* Topic 2 */}
          <div className="bezel-card p-4 flex items-center gap-4 card-hover group">
            <div className="topic-num flex-shrink-0 w-9 h-9 rounded-lg bg-dopamine-600/15 border border-dopamine-500/15 flex items-center justify-center text-dopamine-400 text-xs font-bold">
              02
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                CLAUDE.md
              </div>
              <div className="text-[11px] text-white/30 mt-0.5 truncate">
                3계층 프로젝트 지시 시스템
              </div>
            </div>
          </div>
          {/* Topic 3 */}
          <div className="bezel-card p-4 flex items-center gap-4 card-hover group">
            <div className="topic-num flex-shrink-0 w-9 h-9 rounded-lg bg-spark-600/15 border border-spark-500/15 flex items-center justify-center text-spark-400 text-xs font-bold">
              03
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                Tool Use
              </div>
              <div className="text-[11px] text-white/30 mt-0.5 truncate">
                Read, Write, Edit, Bash, Glob, Grep
              </div>
            </div>
          </div>
          {/* Topic 4 */}
          <div className="bezel-card p-4 flex items-center gap-4 card-hover group">
            <div className="topic-num flex-shrink-0 w-9 h-9 rounded-lg bg-spark-600/15 border border-spark-500/15 flex items-center justify-center text-spark-400 text-xs font-bold">
              04
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                Context Window
              </div>
              <div className="text-[11px] text-white/30 mt-0.5 truncate">
                /compact, /clear로 토큰 관리
              </div>
            </div>
          </div>
          {/* Topic 5 */}
          <div className="bezel-card p-4 flex items-center gap-4 card-hover group">
            <div className="topic-num flex-shrink-0 w-9 h-9 rounded-lg bg-code-600/15 border border-code-500/15 flex items-center justify-center text-code-400 text-xs font-bold">
              05
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                Slash Commands
              </div>
              <div className="text-[11px] text-white/30 mt-0.5 truncate">
                /init, /review, /pr 워크플로우
              </div>
            </div>
          </div>
          {/* Topic 6 */}
          <div className="bezel-card p-4 flex items-center gap-4 card-hover group">
            <div className="topic-num flex-shrink-0 w-9 h-9 rounded-lg bg-code-600/15 border border-code-500/15 flex items-center justify-center text-code-400 text-xs font-bold">
              06
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                Permissions &amp; Safety
              </div>
              <div className="text-[11px] text-white/30 mt-0.5 truncate">
                3단계 권한 시스템, Shift+Tab
              </div>
            </div>
          </div>
          {/* Topic 7 */}
          <div className="bezel-card p-4 flex items-center gap-4 card-hover group">
            <div className="topic-num flex-shrink-0 w-9 h-9 rounded-lg bg-accent-teal-600/15 border border-accent-teal-500/15 flex items-center justify-center text-accent-teal-400 text-xs font-bold">
              07
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                Hooks
              </div>
              <div className="text-[11px] text-white/30 mt-0.5 truncate">
                PreToolUse, PostToolUse 자동화
              </div>
            </div>
          </div>
          {/* Topic 8 */}
          <div className="bezel-card p-4 flex items-center gap-4 card-hover group">
            <div className="topic-num flex-shrink-0 w-9 h-9 rounded-lg bg-accent-teal-600/15 border border-accent-teal-500/15 flex items-center justify-center text-accent-teal-400 text-xs font-bold">
              08
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                Skills &amp; Plugins
              </div>
              <div className="text-[11px] text-white/30 mt-0.5 truncate">
                커스텀 명령어와 확장 패키지
              </div>
            </div>
          </div>
          {/* Topic 9 */}
          <div className="bezel-card p-4 flex items-center gap-4 card-hover group">
            <div className="topic-num flex-shrink-0 w-9 h-9 rounded-lg bg-streak-600/15 border border-streak-400/15 flex items-center justify-center text-streak-400 text-xs font-bold">
              09
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                MCP Servers
              </div>
              <div className="text-[11px] text-white/30 mt-0.5 truncate">
                외부 도구 연결 프로토콜
              </div>
            </div>
          </div>
          {/* Topic 10 */}
          <div className="bezel-card p-4 flex items-center gap-4 card-hover group">
            <div className="topic-num flex-shrink-0 w-9 h-9 rounded-lg bg-streak-600/15 border border-streak-400/15 flex items-center justify-center text-streak-400 text-xs font-bold">
              10
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                Multi-Agent
              </div>
              <div className="text-[11px] text-white/30 mt-0.5 truncate">
                서브에이전트 병렬 처리
              </div>
            </div>
          </div>
        </div>

        {/* Extension note */}
        <div className="reveal mt-8 text-center">
          <p className="text-xs text-white/30">
            <code className="text-dopamine-400/60">/sprint update</code>로 새
            토픽이 자동 추가됩니다
          </p>
        </div>
      </div>
    </section>
  );
}

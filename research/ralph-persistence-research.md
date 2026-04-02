# Ralph 시간 기반 지속 실행 리서치

> 연구일: 2026-03-05
> 목적: "특정 시간까지 Ralph가 멈추지 않고 진행하도록 하는 방법론"

---

## 1. 배경: 왜 Ralph가 멈추는가

OMC Ralph의 `persistent-mode/index.ts` 분석 결과:

1. **컨텍스트 고갈** → compaction 발생 → `isContextLimitStop()` = true → enforcement 바이패스
2. **Soft enforcement**: `createHookOutput()`이 항상 `continue: true` 반환 — hard block이 아님
3. **Compaction 후**: Ralph 컨텍스트가 AI 메모리에서 희석될 수 있음
4. Max iteration은 자동 +10 확장되므로 원인 아님 (line 540)

핵심 문제: **세션 내부 루프는 컨텍스트 윈도우에 구조적으로 의존**

---

## 2. 3가지 시스템 비교

| | OMC Ralph | snarktank/ralph | Ouroboros |
|---|---|---|---|
| **루프 위치** | 세션 내부 (Stop hook) | 외부 Bash loop | 외부 Bash + MCP |
| **메모리** | AI 컨텍스트 윈도우 | git + prd.json + progress.txt | Event Sourcing (SQLite) + git tags |
| **상태 복구** | state.json (단순) | prd.json (boolean) | SHA-256 검증 체크포인트 + 3단계 롤백 |
| **수렴 감지** | 없음 (수동 cancel) | PRD stories 전부 pass | 수학적 유사도 ≥0.95 × 3세대 |
| **정체 대응** | iteration +10 확장 | 없음 | Lateral thinking + Contrarian agent |
| **비용 제어** | 없음 | 없음 | PAL Router (3-tier 자동 에스컬레이션) |
| **롤백** | 없음 | git reset | git tag + checkpoint rotation |

---

## 3. 원조 Ralph (snarktank/ralph)

- GitHub: https://github.com/snarktank/ralph
- 블로그: https://blog.sivaramp.com/blog/claude-code-the-ralph-wiggum-approach/

### 핵심 메커니즘

외부 bash loop이 매번 새 `claude -p` 또는 `amp` 세션을 스폰:

```
1. Branch 생성 → 2. 미완료 Story 선택 → 3. AI 실행 →
4. Typecheck/Test → 5. 조건부 Commit → 6. prd.json 업데이트 →
7. progress.txt 학습 기록 → 8. 반복
```

### Persistence 3요소

- **git history**: 이전 커밋이 완료된 작업을 문서화
- **prd.json**: 각 story의 `passes: true/false` 추적
- **progress.txt**: Append-only 학습 파일 (실패한 접근법 기록)

### 실적

- YC 해커톤: 하룻밤에 6개 레포 생성
- $50,000 계약을 $297 API 비용으로 완료
- 3개월 루프로 프로그래밍 언어(CURSED) 완성

---

## 4. Ouroboros (Q00/ouroboros)

- GitHub: https://github.com/Q00/ouroboros
- 119 stars, 17 forks, v0.18.1

### 철학: "AI can build anything. The hard part is knowing what to build."

Specification-first: 코드 작성 전에 소크라테스적 질문으로 요구사항을 명확화

### Evolutionary Loop

```
Interview → Seed → Execute → Evaluate
    ↑                           ↓
    └──── Evolutionary Loop ────┘
```

### 핵심 패턴 1: 외부 Bash Loop + MCP

`ralph.sh` — 세션 외부에서 `ralph.py`를 MCP 프로토콜로 호출:

```bash
while (( cycle < MAX_CYCLES )); do
    output=$(python3 "$RALPH_PY" "${py_args[@]}")
    action=$(parse JSON → continue/converged/stagnated/failed)

    case "$action" in
        converged)  exit 0 ;;
        stagnated)  count++; if count >= MAX_RETRIES then exit 10 ;;
        failed)     rollback_to_previous "$generation"; exit 12 ;;
        continue)   stagnation_count=0 ;;
    esac

    git tag -f "ooo/${LINEAGE_ID}/gen_${gen}"
done
```

### 핵심 패턴 2: Event Sourcing

```python
EventStore(SQLite + aiosqlite)
→ 불변 이벤트 로그 (Single Source of Truth)
→ LineageProjector가 이벤트에서 현재 상태 재구성
→ 세션 죽어도 100% 복원 가능
```

### 핵심 패턴 3: SHA-256 Checkpoint + 3단계 Rollback

```python
class CheckpointStore:
    MAX_ROLLBACK_DEPTH = 3

    def save(checkpoint):
        rotate(current → .1 → .2 → .3)  # 이전 체크포인트 보존
        write(checkpoint + SHA-256 hash)

    def load(seed_id):
        for level in [0, 1, 2, 3]:  # 손상 시 자동 롤백
            if valid(level): return checkpoint
        return error("No valid checkpoint")
```

### 핵심 패턴 4: 수렴 감지 (자동 종료)

```
Similarity = 0.5 × name_overlap + 0.3 × type_match + 0.2 × exact_match
종료: Similarity ≥ 0.95 × 연속 3세대
안전장치: 30세대 hard cap + 정체 감지(period-2 oscillation) + 반복 감지(70% 질문 중복)
```

### 핵심 패턴 5: Git Tag Rollback

```bash
tag_generation() {
    git add -A && git commit -m "ooo: gen ${gen} [${lineage}]"
    git tag -f "ooo/${lineage}/gen_${gen}"
}

rollback_to_previous() {
    git checkout "ooo/${lineage}/gen_${prev}" -- .
    git reset HEAD && git clean -fd
}
```

### 9 Specialized Agents

| Agent | 역할 |
|-------|------|
| Socratic Interviewer | 가정을 질문으로 노출 |
| Ontologist | 본질 식별 |
| Seed Architect | 명세 결정화 |
| Evaluator | 3단계 검증 (기계적→의미적→합의) |
| Contrarian | 가정 도전 |
| Hacker | 제약 조건 심문 |
| Simplifier | 복잡도 축소 |
| Researcher | 증거 수집 |
| Architect | 구조 분석 |

### PAL Router (비용 최적화)

| Tier | 비용 | 용도 |
|------|------|------|
| Frugal | 1x | 초기 탐색 |
| Standard | 10x | 정제 |
| Frontier | 30x | 수렴 검증 |

실패 시 자동 에스컬레이션, 성공 시 자동 다운그레이드

---

## 5. Ralph Orchestrator

- GitHub: https://github.com/mikeyobrien/ralph-orchestrator
- 문서: https://mikeyobrien.github.io/ralph-orchestrator/guide/overview/

### 5가지 안전 메커니즘

1. **Iteration Limits**: 기본 100회
2. **Runtime Limits**: 기본 4시간 — **시간 기반 데드라인 지원**
3. **Cost Limits**: 기본 $10
4. **Consecutive Failure**: 기본 5회 연속 실패 시 중단
5. **Loop Detection**: 90% 출력 유사도 시 중단

### 비용 경고

> "50-iteration cycle on large codebases can cost $50-100+ in API credits"

---

## 6. Anthropic 공식 Ralph Wiggum Plugin

- GitHub: https://github.com/anthropics/claude-code/blob/main/plugins/ralph-wiggum/README.md

### 핵심: Stop Hook

```bash
/ralph-loop "<prompt>" --max-iterations 50 --completion-promise "DONE"
```

Stop hook(`stop-hook.sh`)이 Claude의 exit 시도를 가로채서 같은 프롬프트를 재주입.
OMC Ralph와 달리 **hard block** (`decision: "block"`).

단, 여전히 **세션 내부** — 컨텍스트 고갈 문제는 동일.

---

## 7. 적용 방안

### Option A: 경량 외부 루프 (즉시 적용)

```bash
#!/bin/bash
# ralph-until.sh
DEADLINE="06:00"
MAX_CYCLES=50
PROMPT_FILE="ralph-prompt.md"

for ((i=1; i<=MAX_CYCLES; i++)); do
  [[ "$(date +%H:%M)" > "$DEADLINE" ]] && break

  claude -p "$(cat $PROMPT_FILE)" --allowedTools "Edit,Write,Bash,Read,Glob,Grep"

  [[ -f ".ralph-complete" ]] && break

  git add -A && git commit -m "ralph: iteration $i" --allow-empty
  sleep 5
done
```

**장점**: 5분 안에 구현 가능
**단점**: 롤백/체크포인트 없음

### Option B: Ouroboros 스타일 (견고)

- SQLite Event Store
- SHA-256 체크포인트 + 3단계 롤백
- Git tag per iteration
- 수렴 감지 자동 종료
- 실패 시 자동 롤백

**장점**: 데이터 손실 불가, 자동 종료
**단점**: 구현 비용 높음

### Option C: 하이브리드 (권장)

외부 bash loop + OMC 에이전트 활용:

```bash
#!/bin/bash
DEADLINE="2026-03-05T06:00:00"

while [[ $(date -u +%s) -lt $(date -j -f "%Y-%m-%dT%H:%M:%S" "$DEADLINE" +%s) ]]; do
  claude -p "$(cat .omc/ralph-prompt.md)" \
    --allowedTools "Edit,Write,Bash,Read,Glob,Grep,Agent"

  [[ -f ".omc/state/ralph-complete" ]] && break

  git add -A && git commit -m "ralph: $(date +%H:%M)" --allow-empty
  sleep 5
done
```

**장점**: OMC 에이전트 + 외부 persistence 모두 활용
**단점**: OMC 내부 상태와 외부 루프의 조율 필요

---

## 8. 결론

**"시간까지 멈추지 마"의 정답은 외부 루프다.**

세션 내부에서 아무리 hook을 강화해도 컨텍스트 고갈은 피할 수 없다.
원조 Ralph와 Ouroboros가 모두 외부 루프를 사용하는 이유가 바로 이것이다.

가장 견고한 패턴은 Ouroboros의 Event Sourcing + Git Tags + Checkpoint이지만,
실용적으로는 Option A(경량 bash loop)만으로도 "06:00까지 멈추지 마"를 달성할 수 있다.

---

## References

- [snarktank/ralph](https://github.com/snarktank/ralph)
- [Q00/ouroboros](https://github.com/Q00/ouroboros)
- [Ralph Orchestrator](https://mikeyobrien.github.io/ralph-orchestrator/guide/overview/)
- [Anthropic Ralph Wiggum Plugin](https://github.com/anthropics/claude-code/blob/main/plugins/ralph-wiggum/README.md)
- [Vercel Labs ralph-loop-agent](https://github.com/vercel-labs/ralph-loop-agent)
- [The Ralph Wiggum Approach 블로그](https://blog.sivaramp.com/blog/claude-code-the-ralph-wiggum-approach/)
- [Everything Claude Code (해커톤 우승)](https://github.com/affaan-m/everything-claude-code)

<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-03-05 | Updated: 2026-03-05 -->

# hooks

## Purpose
Claude Code 세션 시작 시 자동 실행되는 hook. 사용자의 학습 스트릭 상태에 따라 리마인더를 주입하고, 커리큘럼 업데이트가 필요한 경우 알림을 표시한다.

## Key Files

| File | Description |
|------|-------------|
| `hooks.json` | Hook configuration — SessionStart 이벤트에 `session-start-reminder.mjs` 등록 |
| `session-start-reminder.mjs` | Node.js ESM script — state.json 읽어서 스트릭 리마인더 + 업데이트 알림 생성 |

## For AI Agents

### Working In This Directory
- `hooks.json`은 Claude Code plugin hook 시스템의 설정 파일이다. `command` 필드에서 스크립트 경로를 찾는 로직이 fallback 체인을 포함한다 (CLAUDE_PLUGIN_ROOT → cache glob).
- `session-start-reminder.mjs`는 **stdin으로 hook input JSON을 받고, stdout으로 hook result JSON을 출력**하는 구조이다.
- Hook result format: `{ "decision": "approve", "additionalContext": "메시지" }`
- Timeout: 5000ms — 이 시간 안에 실행 완료해야 한다.

### Key Logic in session-start-reminder.mjs
1. `state.json` 읽기 (없으면 첫 사용자 안내)
2. `breadcrumb.txt` 읽기 (있으면 어제의 breadcrumb 표시)
3. 마지막 학습일 기준 분기:
   - 오늘 이미 학습 → mini progress summary
   - 1일 차이 → 스트릭 유지 격려
   - 2-3일 → 경고
   - 4일+ → 복귀 환영
4. `doc-index.json`의 `lastScanned`가 7일+ → `/sprint update` 알림 추가

### Testing Requirements
- Test with: no state file, empty state, various `diffDays` values (0, 1, 2, 4+)
- Verify breadcrumb display when `breadcrumb.txt` exists
- Verify 5-second timeout compliance

## Dependencies

### Internal
- Reads: `~/.claude/claude-dopamine-sprint/state.json` (user state)
- Reads: `~/.claude/claude-dopamine-sprint/breadcrumb.txt` (breadcrumb from study-claude.sh)
- Reads: `../data/curriculum.json` (topic names, next topic)
- Reads: `../data/doc-index.json` (lastScanned for update hint)

### External
- Node.js (ESM, `import` syntax)

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->

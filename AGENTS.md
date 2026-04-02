<!-- Generated: 2026-03-05 | Updated: 2026-03-05 -->

# claude-dopamine-sprint

## Purpose
ADHD 개발자를 위한 Claude Code 학습 플러그인. 30분 도파민 설계 스프린트, 5분 퀵 퀴즈, 스트릭 시스템, 살아있는 커리큘럼으로 Claude Code 10대 핵심 토픽을 체계적으로 마스터할 수 있게 돕는다.

## Key Files

| File | Description |
|------|-------------|
| `.claude-plugin/plugin.json` | Plugin manifest — name, version, skills path |
| `.gitignore` | Git ignore rules (`.blueprint/`, `.omc/`) |
| `README.md` | Project overview, install instructions, curriculum list |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `data/` | Curriculum JSON, command reference, doc index, extension topics (see `data/AGENTS.md`) |
| `hooks/` | Session-start hook for streak reminders (see `hooks/AGENTS.md`) |
| `scripts/` | Shell scripts for one-command study launcher (see `scripts/AGENTS.md`) |
| `skills/` | All 7 plugin skills (sprint, quiz, streak, dashboard, update, reset, help) (see `skills/AGENTS.md`) |
| `research/` | Research notes (ralph-persistence-research.md) |

## For AI Agents

### Working In This Directory
- This is a **Claude Code plugin**. The entry point is `.claude-plugin/plugin.json` which points to `skills/` for skill definitions.
- User state lives at `~/.claude/claude-dopamine-sprint/state.json` (NOT in this repo).
- All user-facing text must be in **Korean** (한국어).
- Do not modify `data/curriculum.json` core topics manually — use `/sprint update` for extensions only.

### Architecture Overview
```
Plugin Manifest (.claude-plugin/plugin.json)
    └─► Skills (skills/*/SKILL.md)
         ├─► Read curriculum & commands from data/
         ├─► Read/Write user state (~/.claude/claude-dopamine-sprint/state.json)
         └─► Session hook (hooks/) injects reminders at startup

Data Flow:
  curriculum.json + extensions/*.json → Sprint/Quiz content
  commands.json → Phase 1 HOOK command discovery
  doc-index.json → Living Curriculum change detection
  state.json (user home) → Progress, streak, quiz scores, TILs
```

### State File Contract
`state.json` schema (stateVersion: 2):
```json
{
  "stateVersion": 2,
  "streak": { "current", "longest", "lastStudyDate", "history[]" },
  "progress": { "[topic-id]": { "status", "quizScore", "completedAt" } },
  "tils": [{ "date", "topic", "content" }],
  "totalStudyMinutes": number,
  "totalSessions": number,
  "usedCommands": string[]
}
```
- Always backup to `state.json.bak` before writing, remove after success.
- Sprint and mini-sprint update streaks; quick quiz does NOT.

### Testing Requirements
- Verify state.json read/write round-trip preserves all fields.
- Test hook output for various streak states (0, 1, 2-3, 4+ days gap).
- Validate quiz answer randomization (correct answer position varies).

### ADHD Design Principles
- **3-minute rule**: No phase runs longer than 3 minutes without user interaction or reward.
- **Visual progress**: Every phase shows `[■■■□□□□] n/7` progress bar.
- **Mid-check-ins**: TRY-IT and CHALLENGE phases have 3-minute check-in prompts.
- **Partial credit**: Phase 4+ completion counts for streak (early dropout OK).
- **Mini mode**: 15-minute sprint for low-energy days.

## Dependencies

### Internal
- Skills reference `data/` for curriculum, commands, doc-index
- Hook (`hooks/session-start-reminder.mjs`) reads `data/curriculum.json` and user state

### External
- Node.js (for session-start hook ESM script)
- Claude Code plugin system (`~/.claude/plugins/`)

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->

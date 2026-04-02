<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-03-05 | Updated: 2026-03-05 -->

# scripts

## Purpose
Shell 기반 학습 환경 설정 스크립트. `study-claude` 명령으로 Focus 모드 활성화, 타이머 시작, ADHD 프로토콜 규칙 표시, breadcrumb 관리까지 원커맨드로 학습 세션을 시작할 수 있게 한다.

## Key Files

| File | Description |
|------|-------------|
| `install.sh` | `study-claude.sh`를 `.zshrc`/`.bashrc`에 source 등록하는 설치 스크립트 |
| `study-claude.sh` | `study-claude` shell function — DND, timer, breadcrumb, claude 실행 통합 |

## For AI Agents

### Working In This Directory
- `study-claude.sh`는 **source로 로드**되어 shell function을 등록한다 (직접 실행 X).
- 주요 함수: `study-claude()` (메인), `leave-breadcrumb()` (세션 종료 시)
- 환경변수로 커스터마이즈: `STUDY_DIR`, `STUDY_TIMER_MIN`, `BREADCRUMB_FILE`, `FOCUS_MODE_NAME`
- macOS 전용 기능: DND (Focus mode via Shortcuts/System Preferences), 알림 (osascript)

### study-claude() Flow
```
[1/5] Focus mode (DND) → [2/5] cd STUDY_DIR → [3/5] Show breadcrumb
→ [4/5] Start timer → [5/5] Show ADHD rules → Launch `claude`
→ (Post-session) Cleanup timer, DND off → leave-breadcrumb prompt
```

### Breadcrumb System
- `breadcrumb.txt` 경로: `~/.claude/claude-dopamine-sprint/breadcrumb.txt`
- 세션 종료 시 사용자에게 "내일 바로 칠 명령어 1줄" 입력 요청
- 다음 세션 시작 시 hook (`session-start-reminder.mjs`)과 study-claude가 모두 표시

### Testing Requirements
- Test `install.sh` idempotency (already-installed detection)
- Verify timer cleanup on session end (`_study_cleanup`)
- Test DND fallback chain (Shortcuts → System Preferences)

## Dependencies

### Internal
- Writes: `~/.claude/claude-dopamine-sprint/breadcrumb.txt`
- Read by: `hooks/session-start-reminder.mjs` (breadcrumb display)

### External
- Bash/Zsh shell
- macOS (optional: osascript, Shortcuts app for Focus mode)
- `claude` CLI (launched at the end of `study-claude()`)

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->

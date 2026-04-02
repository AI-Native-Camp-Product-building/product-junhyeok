<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-03-05 | Updated: 2026-03-05 -->

# skills

## Purpose
Plugin의 7개 사용자 호출 가능한 스킬(슬래시 명령어) 정의. 각 하위 디렉토리에 SKILL.md 파일이 있으며, Claude Code plugin system이 이를 자동 인식한다.

## Subdirectories

| Directory | Skill Command | Description |
|-----------|---------------|-------------|
| `sprint/` | `/sprint [토픽ID\|mini]` | 30분 학습 스프린트 (7단계 도파민 설계) / 15분 미니 스프린트 |
| `quiz/` | `/quiz [토픽ID\|all]` | 5분 퀵 퀴즈 (스페이스드 리피티션 + 약점 집중) |
| `streak/` | `/streak` | 연속 학습일 + 업적/마일스톤 + 14일 캘린더 |
| `dashboard/` | `/dashboard` | 전체 진행률 히트맵 + 퀴즈 분석 + 업적 배지 |
| `update/` | `/sprint update` | 공식 문서 스캔 → 새 기능 감지 → 확장 토픽 자동 생성 |
| `reset/` | `/reset [topic\|streak\|all]` | 진행률 리셋 (토픽별/스트릭/전체) |
| `help/` | `/help-sprint` | 사용 가이드 |

## For AI Agents

### Working In This Directory
- 각 SKILL.md는 **자기 완결적** — 해당 스킬의 전체 실행 절차, prerequisites, state 관리 방법이 모두 명시되어 있다.
- 새 스킬 추가 시 `{skill-name}/SKILL.md` 디렉토리를 만들면 plugin system이 자동 인식한다.
- 모든 스킬의 공통 패턴:
  1. `state.json` 로드 (없으면 생성 또는 안내)
  2. `curriculum.json` + extensions 로드
  3. 사용자 인터랙션 (AskUserQuestion 필수)
  4. `state.json` 업데이트 (백업 → 쓰기 → 백업 삭제)

### State Write Protocol
모든 state.json 쓰기는 다음 순서를 따른다:
1. `cp state.json state.json.bak`
2. Write new state.json
3. `rm state.json.bak`

### Streak Rules
| Action | Streak Updated? |
|--------|----------------|
| `/sprint` (full 30min) | Yes |
| `/sprint mini` (15min) | Yes |
| `/sprint` review mode | Yes |
| `/sprint` partial (Phase 4+) | Yes |
| `/quiz` | **No** |

### Common Patterns
- PLUGIN_ROOT reference: `../../data/` from any SKILL.md location
- All user-facing output in Korean (한국어)
- Quiz answer position must be randomized
- AskUserQuestion is mandatory for all user interaction points
- "그만할래요" option in every sprint phase for graceful dropout

## Dependencies

### Internal
- All skills read: `../data/curriculum.json`, `../data/commands.json`, `../data/extensions/*.json`
- All skills read/write: `~/.claude/claude-dopamine-sprint/state.json`
- `update/` writes to: `../data/extensions/`, `../data/doc-index.json`

### External
- `update/` skill uses: WebFetch, WebSearch (for doc scanning)

<!-- MANUAL: -->

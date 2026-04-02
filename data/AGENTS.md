<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-03-05 | Updated: 2026-03-05 -->

# data

## Purpose
Plugin의 정적 데이터 저장소. 학습 커리큘럼(10개 Core 토픽), Claude Code 명령어 레퍼런스, 공식 문서 인덱스, 동적 확장 토픽을 JSON 파일로 관리한다.

## Key Files

| File | Description |
|------|-------------|
| `curriculum.json` | Core 10개 토픽 정의 — id, name, summary, key_points, try_it, challenge, quiz[] |
| `commands.json` | Claude Code 명령어 22개 — command, category, description, surprise_fact, example |
| `doc-index.json` | 공식 문서 페이지 목록 + lastScanned timestamp (Living Curriculum 변경 감지용) |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `extensions/` | `/sprint update`로 자동 생성되는 확장 토픽 JSON 파일들 (see `extensions/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- `curriculum.json`은 **수동 큐레이션** 대상이다. 직접 수정 시 신중하게 — 10개 Core 토픽의 구조와 순서가 여러 스킬에서 참조된다.
- `commands.json`의 명령어는 Sprint Phase 1(HOOK)에서 사용한다.
- `doc-index.json`의 `lastScanned`가 7일 이상 지나면 세션 시작 시 `/sprint update` 알림이 표시된다.
- 확장 토픽은 `extensions/` 디렉토리에만 추가한다 — `curriculum.json`은 건드리지 않는다.

### Topic JSON Schema
```json
{
  "id": "kebab-case-id",
  "name": "Display Name (한국어)",
  "order": 1,
  "summary": "2-3문장 한국어 요약",
  "doc_url": "https://code.claude.com/docs/en/...",
  "key_points": ["포인트1", "포인트2", "포인트3"],
  "try_it": "실습 지시 (한국어)",
  "challenge": "심화 도전 (한국어)",
  "quiz": [{
    "q": "질문",
    "a": "정답",
    "distractors": ["오답1", "오답2"],
    "hints": ["힌트1", "힌트2"]
  }]
}
```

### Common Patterns
- Core topics: order 1-10, extensions: order 100+
- All skills load curriculum via relative path `../../data/curriculum.json` from their SKILL.md location.

## Dependencies

### Internal
- Referenced by: `skills/sprint/`, `skills/quiz/`, `skills/streak/`, `skills/dashboard/`, `skills/update/`
- Referenced by: `hooks/session-start-reminder.mjs`

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->

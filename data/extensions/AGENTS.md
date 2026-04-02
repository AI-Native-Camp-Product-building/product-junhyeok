<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-03-05 | Updated: 2026-03-05 -->

# extensions

## Purpose
`/sprint update`로 자동 생성되는 확장 토픽 JSON 파일들의 저장소. Core 10개 토픽 이후 동적으로 추가되는 학습 콘텐츠.

## Key Files

| File | Description |
|------|-------------|
| `_example.json` | 확장 토픽 템플릿 예시 (실제 학습에는 사용되지 않음) |
| `.gitkeep` | 빈 디렉토리 유지용 |

## For AI Agents

### Working In This Directory
- 이 디렉토리의 JSON 파일들은 `/sprint update` 스킬이 **자동 생성**한다. 수동 생성/수정도 가능하지만 권장하지 않는다.
- 파일명 = `{topic-id}.json` (kebab-case)
- `_example.json`은 `_` prefix로 실제 로딩에서 제외되어야 한다 — 스킬에서 `_`로 시작하는 파일을 필터링하는지 확인 필요.
- 확장 토픽의 `order`는 100부터 시작하여 Core 토픽(1-10) 이후에 표시된다.
- `source: "auto-generated"`, `addedAt` 필드가 자동 생성 토픽의 표식이다.

## Dependencies

### Internal
- Written by: `../skills/update/SKILL.md`
- Read by: `../skills/sprint/`, `../skills/quiz/`, `../skills/dashboard/` (Glob `*.json`)

<!-- MANUAL: -->

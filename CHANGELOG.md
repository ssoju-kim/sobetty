# CHANGELOG — 포트폴리오 개편 (2026-08)

작업 지시(리서치·기획·인허가 자료 작성·이해관계자 소통 직무에 맞춰 리서치·문서화 경험을 표면으로,
모델 성능·코드 구현 깊이는 뒤로)에 따라 `index.html` / `assets/js/app.js` / `assets/css/site.css`를 수정했습니다.
지원 대상 회사·직무명은 사이트 본문 어디에도 넣지 않았습니다.

모든 항목은 파일 → 위치 → 변경 전 → 변경 후 순으로 정리했습니다.

---

## 1. 텍스트 수정

### 1-1. 히어로 3줄
**파일**: `index.html` (`.hero-points`)

- 변경 전: "금융 데이터 정합성 검증 규칙 설계" / "3D 생성 AI 평가 조건 표준화" / "FastAPI · Supabase 기반 서비스 구현"
- 변경 후: "은행 · 카드 · 증권 데이터를 통합하고 정합성 검증 규칙을 설계" / "근거 수준을 구분해 조사하고, 재현 가능한 문서로 정리" / "기획부터 배포까지 신규 서비스를 만들어 본 경험"

### 1-2. 메타 description / og:description
**파일**: `index.html` (`<head>`)

- `<meta name="description">`: "통계학과 소프트웨어 AI를 기반으로 데이터 품질을 검증하고…"로 시작하던 것을 "데이터를 검증하고 구조화해 실제 서비스로 연결합니다."로 시작하도록 앞당기고, 뒤 문장을 새 히어로 방향에 맞춰 다시 씀.
- `<meta property="og:description">`: 이미 올바른 문장으로 시작하고 있어 유지하되, "3D 생성 AI 평가" 부분을 "평가 조건 근거 조사와 문서화"로 바꿔 리서치·문서화 역량이 드러나게 함.

### 1-3. 실무 경험 카드 지표 순서
**파일**: `index.html` (`#spec` `.stats`)

- 변경 전 순서: 1,451건 → 1,268/143 → 4단계
- 변경 후 순서: 4단계(평가 조건 근거 분류) → 1,451건 → 1,268/143
- 숫자 값과 설명 문구는 그대로 두고 순서만 바꿈.

### 1-4. MAPLESSUNDAY 3번째 지표 교체
**파일**: `index.html` (`#sunday` `.stats`)

- 변경 전: "7.6만 회 · 인벤 홍보 게시글 조회수 (서비스 방문자 수와 별도 · 팀 결과)"
- 변경 후: "4개 · 서비스 기능 (예측 · 캘린더 · 캐릭터 조회 · 공지 조회)"
- 7.6만 회 조회수 문구는 삭제하지 않고 `sunday-detail` 팝업 "결과와 한계"에 원문 그대로 남겨둠(이동만 함).

### 1-5. GitHub 링크 라벨
**파일**: `index.html` (카드 하단 `project-links`, 팝업 `links`)

- 금융: "GitHub 저장소" → "저장소 — 정합성 검증 규칙 4종 구현 코드와 대사 결과" (카드 + 팝업 2곳)
- MAPLESSUNDAY: "GitHub 저장소" → "저장소 — 백엔드 라우터와 Supabase 스키마" (카드 + 팝업 2곳, 기존 "공동 저장소이며 백엔드가 본인 구현 범위입니다." 보조문구는 그대로 유지)
- 달빛장어: "GitHub 저장소" → "저장소 — React · Supabase 대시보드" (팝업 1곳 — 카드 단계에는 원래 저장소 링크가 없었음)
- 배포 URL이 있는 프로젝트는 배포 링크를 저장소 링크보다 앞에 두라는 지시가 있었으나, 세 프로젝트(MAPLESSUNDAY · Withmarry · 달빛장어) 모두 현재 배포가 꺼져 있어 실제 URL을 알 수 없음. 링크를 새로 만들지 않고 세 곳 모두 `<!-- TODO: 배포된 서비스 URL 확보 시 저장소 링크보다 앞에 배치 -->` 주석만 남김. → QUESTIONS.md 참고.

### 1-6. 팝업 첫 화면 — 요약 블록 추가
**파일**: `index.html` (`spec-detail`, `finance-detail`, `sunday-detail` 각 `.dialog-body` 최상단)

- 세 팝업(실무 경험 · 금융 · MAPLESSUNDAY) 최상단에 "요약" 섹션을 새로 추가. 내용은 각 팝업의 기존 "개요" 문단 1개 + "결과와 한계"의 문장 3개를 **그대로 복사**해 배치했고, 새로 쓴 문장은 없음.
- Withmarry · 달빛장어 팝업은 이미 짧고(결과 항목이 1개뿐) 요약을 추가하면 오히려 중복으로 보여 이 두 곳은 손대지 않음. → QUESTIONS.md에 확인 요청.

---

## 2. SVG 도식 4장 (인라인, 코드로 직접 작성 — 이미지 생성 모델 미사용)

| ID | 위치 | 파일 |
|----|------|------|
| 01 | `#spec` 카드, `project-head` 아래(카드 썸네일 위치) | `index.html` |
| 02 | `spec-detail` 팝업, "수행 과정" 목록 아래 | `index.html` |
| 05 | `finance-detail` 팝업, "문제와 목표" 아래 | `index.html` |
| 08 | `sunday-detail` 팝업, "수행 과정" 목록 아래 | `index.html` |

- 05(3계층 통합)를 지시대로 가장 먼저, 가장 공들여 작성.
- 색은 `stroke="currentColor"`/`fill="currentColor"`만 사용, 그림자·그라데이션·아이콘 없음. 강조 박스만 `#E6F1FB` 채우기 + `#0C447C` 텍스트.
- 다크모드 대응(`color: var(--text-primary)`)은 지시된 변수명이 이 코드베이스에는 없어 실제 변수인 `--ink`로 대체. 사이트가 `<meta name="color-scheme" content="light">`로 라이트 테마 고정이라 실질적인 차이는 없음. → QUESTIONS.md 참고.
- "수행 과정 N번 아래"는 `<ol>` 안 특정 `<li>` 뒤에 도식을 끼워 넣으면 목록 구조가 깨지므로, 해당 항목의 내용을 포함한 전체 `<ol>` 바로 아래에 배치.
- 각 SVG에 `role="img"` + `<title>` + `<desc>` 포함. 모바일에서 13px 텍스트가 읽히는지는 이 세션에서 실기기로 확인할 수 없어, 지시된 "안 읽히면 가로 스크롤 허용"을 사전 적용 — `.diagram-scroll{overflow-x:auto}` + `.diagram-svg{min-width:50rem}`을 4개 도식 모두에 기본으로 넣음(조건부 적용이 아니라 항상 적용). → QUESTIONS.md 참고.

---

## 3. 이미지 슬롯 9개

**파일**: `index.html`(마크업) / `assets/js/app.js`(MEDIA 데이터) / `assets/css/site.css`(스타일)

### 3-1. 구조를 3종류로 재설계
- 01·02·05·08 — 위 SVG 4장 (파일 불필요)
- 04(금융 카드 썸네일) · 07(MAPLESSUNDAY 카드 썸네일) — 기존 `data-cover` 메커니즘을 유지하되 `<picture>`(WebP+PNG 폴백)로 교체, `loading="eager"`로 변경(기존은 `lazy`였음)
- 03(체크포인트 비교, spec 팝업) · 06(규칙별 검출, finance 팝업) · 09(Withmarry 카드) — **신규 슬롯**. `data-media-slot="프로젝트.슬롯이름"` 속성을 붙인 `<figure>`를 각 위치에 직접 삽입하고, `assets/js/app.js`의 통합 렌더러가 채움. 03·06은 `loading="lazy"`(팝업 안), 09는 `loading="eager"`(카드에 바로 보임).

### 3-2. app.js — MEDIA 객체 전면 교체
- 기존 `cover`/`items` 갤러리 구조(항목당 최대 5개, 실제로는 9슬롯 계획과 안 맞음)를 삭제하고, 9슬롯 표에 정확히 대응하는 `checkpointShot` / `cover` / `ruleResultShot` / `cardShot` 4개 필드로 교체.
- `[data-cover]` 전용 렌더 함수와 `[data-media-gallery]` 갤러리 렌더 함수(구 `buildMediaItem`)를 삭제하고, `[data-media-slot]` 하나로 모든 슬롯(카드 커버·팝업 인라인·카드 내 작은 이미지)을 처리하는 `resolveMedia()` + 단일 렌더 루프로 통합. 파일이 없으면(빈 `srcWebp`) 또는 있어도 404면 자동으로 숨겨지는 기존 동작은 그대로 유지.
- 각 프로젝트의 "이미지 · 영상" 하단 갤러리 섹션(`data-media-section`, `data-media-gallery`)은 더 이상 쓰이지 않아 `index.html`에서 5곳 모두 삭제(spec · finance · sunday · withmarry · moonlight). 달빛장어는 애초에 이미지 슬롯을 두지 않기로 했으므로(지시 4장) 삭제 후 대체 슬롯도 추가하지 않음.
- 파일 경로는 지시대로 `assets/img/img-01.webp` ~ `img-09.webp`(+동일 이름 `.png` 폴백)로 가정. 단, **03(체크포인트 비교)만 예외** — 정부지원 R&D 산출물 공개 승인 여부가 확인되지 않아 `srcWebp`/`srcFallback`을 의도적으로 빈 문자열로 남기고, 승인 전에는 파일을 추가해도 노출되지 않도록 주석으로 막아둠. → QUESTIONS.md 참고.

### 3-3. CSS 추가/변경
- `.diagram`, `.diagram-scroll`, `.diagram-svg`, `.diagram-card` — SVG 도식용.
- `.dialog-shot`(+`.is-4x3`) — 팝업 안 캡처 이미지, 모달 좌우 여백 없이 폭 100%.
- `.card-shot-portrait` — Withmarry 카드 안 9:16 이미지, 폭 40% 이하(`max-width: 8rem`으로 상한도 둠).
- `.shot.is-portrait img` — 9:16 비율 지원 추가(기존엔 16:9만 있었음).
- `.shot figcaption`을 12px/`margin-top: 8px`로 통일(기존 14px/9.6px) — 새로 추가한 캡션 스타일과 사이트 전체에서 일관되게.
- 카드 썸네일 `border-radius`는 지시된 8px 대신 **기존 10px을 유지**. 사이트 전체 이미지(히어로 사진 등)가 이미 10px로 통일돼 있어, 새 슬롯만 8px로 바꾸면 오히려 비일관해 보인다고 판단. → QUESTIONS.md 참고.
- 더 이상 쓰이지 않는 `.media-gallery` / `.media-item` 관련 규칙 삭제(구 갤러리 구조용).

---

## 4. 기술 요건 점검 결과

- **포커스 트랩 · Esc 닫기 · 닫은 뒤 트리거 포커스 복귀**: 이미 구현되어 있어 추가 작업 없음. 네이티브 `<dialog>`의 기본 동작(포커스 가두기·Esc)과 기존 `assets/js/app.js`의 `close` 이벤트 핸들러(포커스 복귀)가 이미 이 요건을 충족.
- **figure+figcaption, alt≠caption, eager/lazy, picture+WebP/PNG, aspect-ratio**: 모두 반영. alt는 "화면을 그대로 서술", caption은 "해석/결과"로 문장을 다르게 씀 (예: 04 — alt "정합성 검증 대사 결과에서 오류 항목이 표시된 화면" / caption "대사 대상 84건 중 오류 15건 검출").
- HTML 태그 균형(파이썬 `html.parser`로 열림/닫힘 검증)과 JS/CSS 중괄호 균형을 이 세션에서 스크립트로 확인함. 실제 브라우저 렌더링 확인은 하지 못함(로컬에 브라우저 자동화 도구 없음). → QUESTIONS.md 참고.

---

## 5. 그대로 유지한 것 (변경하지 않음)

- 카드=핵심 / 팝업=상세 구조, 프로젝트 순서(금융 → MAPLESSUNDAY), 색상 팔레트, 새 섹션 없음, 애니메이션·패럴랙스 없음, 증명사진·기술 로고 아이콘 없음.
- "과제 목표 성능에는 도달하지 못했습니다", "정성평가는 계획 단계까지만 진행, 실제 평가는 미실시", "예측 모델 구현은 팀원 담당", "공동 저장소이며 백엔드가 본인 구현 범위입니다", "실제 금융회사 데이터가 아닌 모의 데이터", "문의 5건 · 첫 유료 결제는 팀 결과", "사용 범위와 개선 방향은 계속 확인 중" — 모두 원문 그대로 보존.
- 카카오뱅크·마이데이터 관련 서술은 사이트 어디에도 추가하지 않음.

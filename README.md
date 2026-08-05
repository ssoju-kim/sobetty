# sobetty — 김소영 포트폴리오

<https://ssoju-kim.github.io/sobetty/>

HTML · CSS · 바닐라 JavaScript 정적 사이트입니다. 빌드 도구도 프레임워크도 없습니다.
`index.html` 을 브라우저에서 그대로 열어도 동작합니다.

---

## 구조

```
index.html               본문 전체 (내용이 HTML 안에 직접 들어 있습니다)
assets/
  css/site.css           화면용
  css/print.css          인쇄·PDF용  (media="print")
  js/app.js              보조 기능만 — 꺼져 있어도 사이트는 정상 동작 (1.7KB)
  img/                   화면 캡처 14장 (지금은 자리표시자)
  docs/                  경력기술서·포트폴리오 PDF, 경력기술서 DOCX
tools/
  make_placeholders.py   assets/img 자리표시자 생성
.nojekyll                GitHub Pages 가 Jekyll 처리를 건너뛰게 함
BEFORE.md                개편 전 사이트 상태와 문제 기록
```

본문을 JavaScript로 그리지 않습니다. 내용이 HTML 안에 있어서 자바스크립트가 꺼져 있을 때,
검색엔진이 읽을 때, PDF로 뽑을 때 모두 같은 내용이 나옵니다.
첫 화면에 필요한 것은 HTML 27KB + CSS 21KB + 이미지뿐입니다.

---

## 디자인 규칙

내용을 고칠 때 아래 세 가지만 지키면 위계가 무너지지 않습니다.

**1. 명도 3단계.** 이 순서가 정보의 중요도입니다.

| 변수 | 쓰는 곳 |
| --- | --- |
| `--ink` | 프로젝트명, 핵심 결과, 한 줄 정의 |
| `--body` | 설명 본문 |
| `--faint` | 기간 · 팀 구성 · 기술 · 캡션 등 보조정보 |

**2. 포인트 색은 `--accent` 하나뿐.** 색을 더 늘리지 말고 굵기 · 크기 · 여백으로 구분하세요.

**3. 여백은 균일하지 않습니다.** 프로젝트 사이는 넓게(3.5rem), 프로젝트 내부는 좁게(1.5–2.5rem).
소개 · 학력 · 기술 영역은 압축합니다.

모든 색은 흰 배경과 연한 배경 양쪽에서 WCAG AA(4.5:1)를 통과합니다.
색을 바꾸면 대비비를 다시 확인하세요.

### 프로젝트 한 덩어리의 순서

```html
<article class="project" id="…">
  <header class="project-head">
    <p class="kicker">…</p>          프로젝트 번호·팀 구성  (가장 옅게)
    <h2>…</h2>                       프로젝트명            (가장 크게)
    <p class="statement">…</p>       한 줄 문제 정의
    <ul class="results">…</ul>       핵심 결과             (포인트 색, 큰 숫자)
  </header>
  <figure class="shot shot-lead">…</figure>   대표 이미지 (크게)
  <div class="project-grid">
    <section class="pblock">본인 역할</section>
    <section class="pblock">수행 내용</section>
  </div>
  …보조 이미지·표·흐름도…
  <footer class="project-foot">
    <dl class="facts">…</dl>         기간·구성·기술        (가장 작고 옅게)
    <p class="plinks">…</p>
  </footer>
</article>
```

---

## 자주 하는 작업

### 1. 화면 캡처 넣기

`assets/img/` 의 자리표시자를 **같은 파일명으로 덮어쓰면** 사이트와 PDF에 바로 반영됩니다.

| 파일명 | 무엇을 | 비율 |
| --- | --- | --- |
| `finance-dashboard.png` | 대사 결과 대시보드 (대표) | 가로 16:10 |
| `finance-reconcile-output.png` | `reconcile.py` 실행 결과 | 가로 |
| `maple-predict.png` | 이벤트 예측 화면 (대표) | 세로 9:19.5 |
| `maple-calendar.png` · `maple-character.png` · `maple-notice.png` | 캘린더 · 캐릭터 조회 · 공지 | 세로 |
| `maple-inven-post.png` | 인벤 홍보 게시글 (조회수 보이게) | 가로 |
| `sfac-eval-table.png` | 평가 조건 정리표 (대표) | 가로 |
| `sfac-relic-landing.png` · `sfac-3d-result.png` | Relic 랜딩 · 3D 결과 | 가로 |
| `withmarry-landing.png` | 랜딩페이지 | 가로 |
| `withmarry-invite.png` · `withmarry-voice.png` | 청첩장 · AI 음성 | 세로 |
| `moonlight-sales.png` | 매출 · 월별 집계 | 가로 |

- 권장 **가로 1400px 이상**. 세로형은 실제 휴대폰 캡처를 그대로 쓰면 됩니다.
- **인쇄본에서는 이미지 높이가 고정되어 위쪽부터 보입니다.** 중요한 내용을 화면 상단에 두고 캡처하세요.
- 넣기 전에 개인정보 · API 키 · 서버 경로 · 내부 주소를 지우거나 가려 주세요.

자리표시자를 다시 만들려면: `python3 tools/make_placeholders.py`

### 2. 시연 영상 넣기

영상 파일이 아직 없어 **빈 영상 영역을 만들어 두지 않았습니다.**
녹화가 끝나면 원하는 프로젝트의 대표 이미지(`figure.shot-lead`) 자리에 아래를 붙여 넣으세요.

```html
<figure class="shot shot-lead">
  <div class="frame frame-plain">
    <video controls preload="none"
           poster="./assets/img/maple-predict.png"
           width="1600" height="900">
      <source src="./assets/video/maple-demo.mp4" type="video/mp4">
      <p>영상을 재생할 수 없습니다.
         <a href="https://youtu.be/…" target="_blank" rel="noopener noreferrer">여기에서 보기</a></p>
    </video>
  </div>
  <figcaption>예측 확인 → 캘린더 → 캐릭터 검색 (25초)</figcaption>
</figure>
```

인쇄본에서는 `<video>` 가 나오지 않으므로, 같은 자리에 아래를 함께 두면
화면에서는 영상이, PDF에서는 썸네일과 주소가 보입니다.

```html
<p class="print-only">시연 영상 — https://youtu.be/…</p>
```

촬영할 장면 목록은 `이미지_영상_추가자료_목록.md` 에 정리해 두었습니다.

### 3. PDF 다시 만들기

**브라우저** — `Ctrl/Cmd + P` → 대상 "PDF로 저장" → A4 → **배경 그래픽 켜기**

**명령줄** (같은 결과)

```bash
pip install weasyprint
python3 -m weasyprint index.html assets/docs/김소영_포트폴리오.pdf
```

인쇄본에서 달라지는 것 — 내비게이션·버튼 제거, 애니메이션 제거,
카드·표·이미지가 페이지 중간에서 잘리지 않게 고정, 페이지 번호 추가, GitHub 링크는 클릭 유지.
현재 A4 7페이지입니다.

### 4. 지원처에 따라 순서 바꾸기

`index.html` 의 `<article class="project">` 블록을 통째로 옮기고,
상단 내비게이션(`.topbar-nav`)의 링크 순서도 같이 바꾸면 됩니다.
`.kicker` 의 "프로젝트 01 / 02" 번호도 함께 고쳐 주세요.

---

## 배포

`main` 에 병합되면 GitHub Pages 가 자동 반영합니다.

```bash
git push -u origin portfolio/readability-rebuild
# GitHub 에서 Pull Request 생성 → 확인 후 main 병합
```

**Settings → Pages** 에서 Source 가 `Deploy from a branch`, 브랜치가 `main` / `/ (root)` 인지 확인하세요.

---

## 브라우저 지원

최신 Chrome · Safari · Firefox · Edge.
`prefers-reduced-motion` 을 켠 환경에서는 부드러운 스크롤이 꺼집니다.
웹폰트(Pretendard)는 CDN에서 필요한 글자만 받아오며, 실패하면 시스템 글꼴로 대체됩니다.

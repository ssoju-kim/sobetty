# sobetty — 김소영 포트폴리오

<https://ssoju-kim.github.io/sobetty/>

데이터를 검증하고 구조화해 실제 서비스로 연결한 작업을 정리한 개인 포트폴리오 사이트입니다.
금융 IT · 데이터 기반 디지털 서비스 · AI 서비스 기획/개발 · 데이터 검증 및 운영 직무 지원에 사용합니다.
특정 기업이나 특정 공고에 종속된 문구는 넣지 않습니다.

## 담고 있는 내용

| 순서 | 내용 |
| --- | --- |
| 대표 프로젝트 1 | 금융 데이터 통합과 정합성 검증 — 모의 데이터 84건 대사, 검증 규칙 4종 |
| 대표 프로젝트 2 | 3D 생성 AI 학습 데이터 검증과 모델 평가 (스팩스페이스 실무) |
| 대표 프로젝트 3 | MAPLESSUNDAY 이벤트 예측 서비스 — 백엔드 · DB · 배포 담당 |
| 기타 프로젝트 | Withmarry 모바일 청첩장 MVP · 달빛장어 운영 대시보드 |
| 그 외 | 기술 스택, 학력(2027년 8월 졸업 예정), 연락처 |

## 실행 방법

빌드 도구도 프레임워크도 없는 정적 사이트입니다. `index.html` 을 브라우저에서 그대로 열면 됩니다.

로컬 서버로 확인하려면:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## 파일 구조

```
index.html              본문 전체
assets/css/site.css     화면용 스타일
assets/css/print.css    인쇄용 스타일 (media="print")
assets/js/app.js        연락처 설정 · 현재 섹션 표시 · 연도
```

`app.js` 가 없어도 사이트 본문과 인쇄 결과는 동일하게 나옵니다.

## 연락처 설정

`assets/js/app.js` 상단의 `PROFILE` 값만 채우면 됩니다.
**비워 두면 해당 버튼과 링크가 화면에 나타나지 않습니다.** 자리표시 문구는 노출되지 않습니다.

```js
var PROFILE = {
  email: "",       // 예: "example@gmail.com"
  resumeUrl: ""    // 예: "./assets/docs/경력기술서.pdf"
};
```

- 전화번호는 공개 사이트에 넣지 않습니다.
- `resumeUrl` 에는 **특정 기업명·지원 직무명이 적힌 파일**이나
  연락처가 비어 있는 파일을 연결하지 않습니다.

## 이미지 추가

이미지는 아직 없습니다. 방문자 화면에는 자리표시자가 전혀 보이지 않고,
`index.html` 안에 `<figure>` 마크업이 **주석 상태**로 들어 있습니다.
파일을 넣고 주석만 풀면 됩니다.

```html
<!-- 대표 이미지 자리 (16:9). 준비되면 아래 주석을 풀어 사용합니다.
<figure class="shot">
  <img class="img-16x9" src="./assets/img/finance-dashboard.png" alt="..." width="1600" height="900">
  <figcaption>...</figcaption>
</figure>
-->
```

| 비율 | 클래스 | 쓰는 곳 |
| --- | --- | --- |
| 4:5 | (클래스 불필요) `.hero-photo img` | 프로필 사진 |
| 16:9 | `img-16x9` | 프로젝트 대표 이미지 |
| 4:3 | `img-4x3` | 프로젝트 추가 이미지 |

- 권장 가로 1400px 이상, `alt` 는 반드시 채웁니다.
- 첫 화면 이미지에는 `loading="lazy"` 를 넣지 않습니다.
- 넣기 전에 회사 내부 경로 · 서버 정보 · API 키 · 고객 정보가 보이지 않는지 확인합니다.

## PDF로 저장

브라우저에서 `Ctrl/Cmd + P` → 대상 "PDF로 저장" → A4 → **배경 그래픽 켜기**.

## 배포

`main` 에 병합되면 GitHub Pages 가 자동 반영합니다.
**Settings → Pages** 의 Source 가 `Deploy from a branch`, 브랜치가 `main` / `/ (root)` 인지 확인하세요.
`.nojekyll` 파일은 지우지 마세요.

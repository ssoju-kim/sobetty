# SETUP — 저장소 만들기부터 배포까지

GitHub를 처음 써도 순서대로 따라 하면 됩니다.
전체 과정은 10~15분 정도 걸립니다.

---

## 1. GitHub 사용자명과 같은 이름으로 저장소 만들기

GitHub 프로필 첫 화면에 README를 띄우려면, **저장소 이름이 GitHub 사용자명과 똑같아야** 합니다.
사용자명이 `soyoungkim`이면 저장소 이름도 `soyoungkim`입니다.

1. GitHub에 로그인합니다.
2. 오른쪽 위 `+` → **New repository**를 누릅니다.
3. **Repository name**에 본인의 GitHub 사용자명을 그대로 입력합니다.
4. 이름을 정확히 입력하면 "✨ You found a secret!" 같은 안내 문구가 나타납니다. 제대로 입력한 것입니다.

> 사용자명은 GitHub 프로필 주소에서 확인할 수 있습니다. `https://github.com/여기가_사용자명`

---

## 2. 저장소를 Public으로 설정하기

GitHub Pages 무료 배포와 프로필 README 표시는 **Public** 저장소에서만 동작합니다.

- 저장소를 만들 때 **Public**을 선택합니다.
- 이미 Private으로 만들었다면 `Settings` → 맨 아래 `Danger Zone` → `Change repository visibility` → `Make public`을 누릅니다.
- `Add a README file` 체크는 **해제**해 두세요. 이미 README.md 파일이 있으니 충돌을 피할 수 있습니다.
- 마지막으로 **Create repository**를 누릅니다.

---

## 3. 파일 올리기

### 방법 A. 웹에서 끌어다 놓기 (가장 쉬움)

1. 만든 저장소 첫 화면에서 **uploading an existing file**을 누릅니다.
2. 아래 파일과 폴더를 한꺼번에 끌어다 놓습니다.
   - `README.md`, `index.html`, `style.css`, `projects.js`, `SETUP.md`, `.gitignore`, `assets/` 폴더
3. 아래쪽 입력칸에 `첫 배포`라고 적고 **Commit changes**를 누릅니다.

> `.gitignore`처럼 점으로 시작하는 파일은 일부 운영체제에서 숨겨져 있습니다.
> Windows는 탐색기 `보기 → 숨긴 항목` 체크, macOS는 `Command + Shift + .` 로 표시할 수 있습니다.

### 방법 B. 명령어로 올리기

폴더에서 터미널(또는 Git Bash)을 열고 아래를 순서대로 입력합니다.

```bash
git init
git add .
git commit -m "첫 배포"
git branch -M main
git remote add origin https://github.com/TODO_GITHUB_USERNAME/TODO_REPOSITORY_NAME.git
git push -u origin main
```

`TODO_GITHUB_USERNAME`과 `TODO_REPOSITORY_NAME` 자리에 본인 값을 넣으세요. 둘 다 같은 값입니다.

---

## 4. Settings → Pages 에서 배포하기

1. 저장소 위쪽 메뉴에서 **Settings**를 누릅니다.
2. 왼쪽 목록에서 **Pages**를 누릅니다.
3. **Build and deployment** → **Source**에서 **Deploy from a branch**를 선택합니다.

---

## 5. main 브랜치의 /(root) 선택하기

같은 Pages 화면의 **Branch** 항목에서:

1. 왼쪽 선택 상자에서 **main**을 고릅니다.
2. 오른쪽 선택 상자에서 **/(root)** 를 고릅니다. (`/docs` 아님)
3. **Save**를 누릅니다.

저장하고 1~3분 정도 기다리면 배포가 끝납니다. 화면을 새로고침하면 주소가 나타납니다.

---

## 6. 만들어지는 사이트 주소

```
https://[GitHub 사용자명].github.io/[저장소명]/
```

사용자명과 저장소명이 같으므로 실제로는 이런 형태가 됩니다.

```
https://soyoungkim.github.io/soyoungkim/
```

> 주소 끝의 `/`를 빼면 하위 파일을 못 찾는 경우가 있습니다. 끝에 `/`를 붙여 두세요.

---

## 7. README에 실제 사이트 주소 넣기

`README.md`를 열어 아래 세 군데의 `TODO_GITHUB_USERNAME`, `TODO_REPOSITORY_NAME`을 실제 값으로 바꿉니다.

- 위쪽 **[→ 포트폴리오 사이트 보기]** 링크
- 표 아래 "자세한 내용은 …" 문장의 링크
- 맨 아래 **연락** 항목의 포트폴리오 주소

같은 파일 맨 아래에서 `TODO_EMAIL`, `TODO_GITHUB_URL`도 함께 채우면 됩니다.

---

## 8. 프로젝트와 연락처를 수정하는 파일

**`projects.js` 하나만 고치면 됩니다.** 파일을 열면 위에서부터 순서대로 나옵니다.

| 위치 | 내용 |
|---|---|
| `SITE` | GitHub 주소, 이메일, CV 파일 경로 |
| `PROJECTS` | 프로젝트 목록 |
| `SKILLS` | 기술 목록 |

프로젝트를 추가하려면 `PROJECTS` 안에 기존 항목 하나를 통째로 복사해 붙여 넣고 내용만 바꾸면 됩니다.
`index.html`은 건드리지 않아도 카드가 자동으로 늘어납니다.

- `areas`에는 `"데이터"`, `"검증"`, `"서비스"` 중 해당하는 것만 적습니다.
- `links`의 주소를 `TODO_`로 시작하는 값으로 두면 빈 링크 대신 **확인 필요** 표시가 나옵니다.

`projects.js` 아래쪽 `[4] 화면을 그리는 코드` 부분은 수정할 필요가 없습니다.

---

## 9. CV 파일 교체하기

1. PDF 파일 이름을 `CV.pdf`로 바꿉니다.
2. `assets/` 폴더에 넣습니다. (`assets/CV.pdf`)
3. `projects.js`의 `SITE`에서 아래처럼 수정합니다.

```js
cv: "./assets/CV.pdf"
```

4. 저장소에 올리면 Hero의 **CV** 버튼과 Contact의 CV 링크가 활성화됩니다.

> CV를 아직 공개하고 싶지 않다면 `TODO_CV_FILE` 그대로 두면 됩니다. 빈 링크가 아니라 안내 표시로 나옵니다.
> PDF에 주소, 주민등록번호, 상세 연락처가 들어 있지 않은지 올리기 전에 확인하세요.

---

## 10. 배포 오류 확인하기

**사이트가 안 열릴 때**

1. 저장소 → `Settings` → `Pages`에서 초록색 체크와 주소가 보이는지 확인합니다.
2. 저장소 첫 화면 → **Actions** 탭에서 가장 최근 실행에 빨간 X가 있는지 확인합니다. 항목을 누르면 원인이 나옵니다.
3. 방금 올렸다면 1~3분 더 기다린 뒤 새로고침합니다. (`Ctrl + Shift + R` / `Command + Shift + R`)

**글자만 나오고 디자인이 깨질 때**

- `style.css`와 `projects.js`가 `index.html`과 **같은 위치(저장소 최상단)** 에 있는지 확인합니다.
- 브라우저에서 `F12` → **Console** 탭을 열고 빨간 오류 메시지의 파일 이름을 확인합니다.

**프로필 README가 안 보일 때**

- 저장소 이름이 사용자명과 정확히 같은지, 대소문자까지 확인합니다.
- 저장소가 Public인지 확인합니다.
- `README.md` 파일이 저장소 최상단에 있는지 확인합니다.

---

## 로컬에서 미리 보기

`index.html` 파일을 더블클릭하면 브라우저에서 바로 열립니다. 별도 설치가 필요 없습니다.

주소창에 `file:///...` 로 열리는 것이 마음에 걸린다면, 폴더에서 터미널을 열고 아래를 실행한 뒤
`http://localhost:8000` 에 접속해도 됩니다.

```bash
python -m http.server 8000
```

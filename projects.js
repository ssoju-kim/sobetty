/* =========================================================================
   projects.js
   -------------------------------------------------------------------------
   이 파일 하나만 고치면 사이트 내용이 바뀝니다.

     [1] SITE      연락처와 링크 (한곳에서 관리)
     [2] PROJECTS  프로젝트 목록 (여기에 항목을 추가하면 카드가 자동으로 늘어남)
     [3] SKILLS    기술 목록
     [4] 렌더링     아래쪽 코드는 건드리지 않아도 됩니다.

   "TODO_" 로 시작하는 값은 아직 확인되지 않은 정보입니다.
   실제 값으로 바꾸면 화면에 링크로 표시되고,
   그대로 두면 "확인 필요" 표시로 보입니다. (빈 링크로 연결되지 않습니다)
   ========================================================================= */


/* ── [1] 연락처와 링크 ──────────────────────────────────────────────── */

const SITE = {
  githubUser: "TODO_GITHUB_USERNAME",              // 예: "soyoungkim"
  repoName:   "TODO_REPOSITORY_NAME",              // 사용자명과 같은 이름의 저장소

  github: "TODO_GITHUB_URL",                       // 예: "https://github.com/soyoungkim"
  email:  "TODO_EMAIL",                            // 예: "soyoung@example.com"
  cv:     "TODO_CV_FILE"                           // 예: "./assets/CV.pdf"
};


/* ── [2] 프로젝트 ───────────────────────────────────────────────────────
   areas : "데이터" | "검증" | "서비스"  중에서 해당하는 것만 적기
   links : url 에 TODO_ 로 시작하는 값을 두면 "확인 필요" 표시로 나옵니다.
   note  : 링크를 공개할 수 없을 때 이유를 적는 자리 (없으면 지워도 됩니다)

   ※ 기술 태그(stack)는 기억나는 대로 정리한 값입니다.
     실제 사용한 도구와 다르면 직접 수정해 주세요.
   ------------------------------------------------------------------- */

const PROJECTS = [
  {
    title: "Relic AI 3D",
    period: "2025.12 — 2026.07",
    kind: "인턴 · 사내 R&D 과제",
    areas: ["데이터", "검증"],
    summary:
      "텍스트에서 이미지, 이미지에서 3D 에셋으로 이어지는 생성 파이프라인을 연구개발한 프로젝트입니다. " +
      "한국 문화유산을 대상으로 했습니다.",
    role: [
      "학습·평가 데이터 전처리와 holdout 구성, 데이터 누출 점검",
      "image-to-3D 모델의 LoRA 파인튜닝과 체크포인트별 결과 비교",
      "정량 평가 수행, 평가 코드와 실행 조건이 의도대로 동작하는지 검증",
      "실행 절차와 조건을 정리한 재현용 문서 작성"
    ],
    outcome:
      "지표 값만 비교하지 않고, 값이 계산되는 조건과 구현 방식의 차이까지 확인해 " +
      "체크포인트 사이의 비교 기준을 맞췄습니다.",
    metrics: "검토한 지표: CLIP · FD · Chamfer Distance · F-score · PSNR · LPIPS",
    stack: ["Python", "PyTorch", "Hugging Face Diffusers", "LoRA", "Linux", "Blender"],
    links: [],
    note: "사내 과제로 진행되어 코드, 데이터, 세부 수치는 공개하지 않습니다."
  },

  {
    title: "Moonlight Dashboard",
    period: "TODO: 진행 기간",
    kind: "실제 매장 운영 대시보드",
    areas: ["데이터", "서비스"],
    summary:
      "실제 매장에서 매일 쓰는 운영 대시보드를 만들었습니다. " +
      "숫자를 보여주는 화면이 아니라 매장의 운영 흐름에 맞춰 설계했습니다.",
    role: [
      "매출·지출 관리, 월별 보고서, 마케팅 분석, 메뉴 및 설정 관리 기능 개발",
      "매장에서 주로 휴대폰으로 확인한다는 점을 반영해 모바일 화면 개선",
      "사용 중 나온 요청을 받아 기능과 화면을 수정",
      "기획부터 구현, 수정, 배포까지 진행"
    ],
    outcome: "배포 후 실제 매장 운영에 사용되고 있습니다.",
    stack: ["JavaScript", "Supabase", "SQL"],
    links: [
      { label: "GitHub", url: "TODO_MOONLIGHT_REPO" },
      { label: "사이트", url: "TODO_MOONLIGHT_URL" }
    ]
  },

  {
    title: "Withmarry",
    period: "약 1개월",
    kind: "모바일 청첩장 서비스 · 팀 3명 (개발 2, 마케팅 1)",
    areas: ["서비스"],
    summary:
      "제한된 예산과 한 달이라는 기간 안에서 모바일 청첩장 서비스를 MVP로 만들어 출시했습니다.",
    role: [
      "모바일 청첩장 템플릿 개발",
      "AI 음성 기능 적용",
      "Vite 기반 웹서비스 구성과 배포",
      "기간과 예산에 맞춰 넣을 기능과 미룰 기능을 정리"
    ],
    outcome: "출시 후 사용자 문의 5건을 받았고, 첫 유료 결제가 발생했습니다.",
    stack: ["JavaScript", "Vite", "Cloudflare Pages"],
    links: [
      { label: "GitHub", url: "TODO_WITHMARRY_REPO" },
      { label: "사이트", url: "TODO_WITHMARRY_URL" }
    ]
  },

  {
    title: "데이터 정합성 검증",
    period: "TODO: 진행 기간",
    kind: "데이터 품질 검증 규칙 설계",
    areas: ["데이터", "검증"],
    summary:
      "여러 유형의 모의 데이터를 대상으로 오류를 찾아내는 규칙을 설계하고 검증했습니다. " +
      "판정은 규칙이 하고, AI는 왜 오류인지 설명하는 역할만 맡도록 나눴습니다.",
    role: [
      "누락, 중복, 금액 불일치, 건수 불일치를 판별하는 규칙 설계",
      "판정 기준을 명확히 정의해 같은 입력에 같은 결과가 나오도록 구성",
      "AI의 역할을 판단이 아닌 오류 설명으로 한정",
      "SQL과 Python으로 데이터 처리 및 검증 수행"
    ],
    outcome: "검증 데이터 84건에 주입한 오류 15건을 모두 탐지했습니다.",
    stack: ["Python", "SQL"],
    links: [
      { label: "GitHub", url: "TODO_DATACHECK_REPO" }
    ]
  }
];


/* ── [3] 기술 ─────────────────────────────────────────────────────── */

const SKILLS = [
  { group: "Data",          items: ["Python", "SQL", "R", "SAS", "Pandas"] },
  { group: "AI / ML",       items: ["PyTorch", "LoRA", "Hugging Face Diffusers", "생성형 AI 모델 실행·평가", "컴퓨터 비전 / 3D 생성 파이프라인"] },
  { group: "Web / Product", items: ["JavaScript", "Vite", "Supabase", "Cloudflare Pages", "Streamlit"] },
  { group: "Tools",         items: ["Git", "GitHub", "Linux", "AWS", "Blender", "Notion"] }
];


/* =========================================================================
   [4] 아래부터는 화면을 그리는 코드입니다. 내용 수정에는 필요하지 않습니다.
   ========================================================================= */

(function () {
  "use strict";

  var isTodo = function (value) {
    return !value || String(value).indexOf("TODO") === 0 || String(value).indexOf("TODO") > -1;
  };

  var el = function (tag, className, text) {
    var node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text !== undefined && text !== null) { node.textContent = text; }
    return node;
  };

  /* 외부 링크 또는 "확인 필요" 표시를 만듭니다. 빈 주소로는 절대 연결하지 않습니다. */
  var linkOrTodo = function (label, url, className) {
    if (isTodo(url)) {
      var todo = el("span", "todo", "TODO: " + label + " 주소 입력");
      todo.setAttribute("title", "projects.js 에서 값을 채워 주세요");
      return todo;
    }
    var isMail = url.indexOf("mailto:") === 0;
    var isLocal = url.indexOf("./") === 0 || url.indexOf("/") === 0;
    var a = el("a", className || "link", label);
    a.href = url;
    if (!isMail && !isLocal) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", label + " (새 탭에서 열림)");
    }
    return a;
  };

  var mailUrl = function (address) {
    return isTodo(address) ? address : "mailto:" + address;
  };

  /* ── Hero 버튼 + 좌측 레일 링크 ── */
  var heroActions = document.getElementById("hero-actions");
  if (heroActions) {
    heroActions.appendChild(linkOrTodo("GitHub", SITE.github, "btn btn-primary"));
    heroActions.appendChild(linkOrTodo("이메일", mailUrl(SITE.email), "btn"));
    heroActions.appendChild(linkOrTodo("CV", SITE.cv, "btn"));
  }

  var railLinks = document.getElementById("rail-links");
  if (railLinks) {
    railLinks.appendChild(linkOrTodo("GitHub", SITE.github, "rail-link"));
    railLinks.appendChild(linkOrTodo("Email", mailUrl(SITE.email), "rail-link"));
  }

  /* ── 프로젝트 카드 ── */
  var list = document.getElementById("project-list");
  if (list) {
    list.innerHTML = "";

    PROJECTS.forEach(function (p) {
      var card = el("article", "card");

      /* 왼쪽: 기간, 분류, 영역 태그 */
      var meta = el("div", "card-meta");
      meta.appendChild(el("p", "mono", p.period));
      if (p.kind) { meta.appendChild(el("p", "mono muted", p.kind)); }

      if (p.areas && p.areas.length) {
        var areaWrap = el("ul", "areas");
        areaWrap.setAttribute("aria-label", "다룬 영역");
        p.areas.forEach(function (area) {
          var li = el("li", "area", area);
          areaWrap.appendChild(li);
        });
        meta.appendChild(areaWrap);
      }
      card.appendChild(meta);

      /* 오른쪽: 내용 */
      var body = el("div", "card-body");
      body.appendChild(el("h3", null, p.title));
      body.appendChild(el("p", "card-summary", p.summary));

      if (p.role && p.role.length) {
        body.appendChild(el("h4", null, "맡은 일"));
        var ul = el("ul", "bullets");
        p.role.forEach(function (r) { ul.appendChild(el("li", null, r)); });
        body.appendChild(ul);
      }

      if (p.outcome) {
        body.appendChild(el("h4", null, "결과"));
        body.appendChild(el("p", "card-outcome", p.outcome));
      }

      if (p.metrics) {
        body.appendChild(el("p", "mono muted card-metrics", p.metrics));
      }

      if (p.stack && p.stack.length) {
        var tags = el("ul", "tags");
        tags.setAttribute("aria-label", "사용 기술");
        p.stack.forEach(function (t) { tags.appendChild(el("li", "tag", t)); });
        body.appendChild(tags);
      }

      if (p.note) {
        body.appendChild(el("p", "note", p.note));
      }

      if (p.links && p.links.length) {
        var linkRow = el("div", "card-links");
        p.links.forEach(function (l) {
          linkRow.appendChild(linkOrTodo(l.label, l.url, "link"));
        });
        body.appendChild(linkRow);
      }

      card.appendChild(body);
      list.appendChild(card);
    });
  }

  /* ── 기술 ── */
  var skillWrap = document.getElementById("skill-groups");
  if (skillWrap) {
    SKILLS.forEach(function (s) {
      var box = el("article", "mini");
      box.appendChild(el("h3", null, s.group));
      var ul = el("ul", "tags");
      s.items.forEach(function (i) { ul.appendChild(el("li", "tag", i)); });
      box.appendChild(ul);
      skillWrap.appendChild(box);
    });
  }

  /* ── 연락처 ── */
  var contact = document.getElementById("contact-list");
  if (contact) {
    var rows = [
      { label: "GitHub", value: SITE.github },
      { label: "이메일", value: mailUrl(SITE.email) },
      { label: "CV", value: SITE.cv }
    ];
    rows.forEach(function (row) {
      var line = el("div", "contact-row");
      line.appendChild(el("span", "mono contact-label", row.label));
      line.appendChild(linkOrTodo(row.label, row.value, "link"));
      contact.appendChild(line);
    });
  }

  /* ── 연도 ── */
  var year = document.getElementById("year");
  if (year) { year.textContent = String(new Date().getFullYear()); }

  /* ── 현재 보고 있는 섹션을 내비게이션에 표시 ── */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".rail-nav a")
  );
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var setActive = function (id) {
      navLinks.forEach(function (a) {
        var on = a.getAttribute("href") === "#" + id;
        a.classList.toggle("is-active", on);
        if (on) { a.setAttribute("aria-current", "true"); }
        else { a.removeAttribute("aria-current"); }
      });
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { setActive(entry.target.id); }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }
})();

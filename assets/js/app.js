/* 화면 보조 기능만 담당합니다. 본문은 index.html 에 그대로 들어 있어
   자바스크립트가 없어도 사이트와 인쇄 결과는 동일합니다.
   (상세 팝업의 내용은 인쇄 시 자동으로 펼쳐집니다. print.css 참고) */

/* ─────────────────────────────────────────────────────────────────────────
   1) 개인 정보 설정

   값을 채우면 해당 버튼과 링크가 화면에 나타납니다.
   비워 두면 버튼 자체가 나타나지 않습니다. (자리표시 문구는 노출되지 않습니다.)

     email     연락용 이메일 주소.            예: "example@gmail.com"
     resumeUrl 공개해도 되는 포트폴리오 PDF.  예: "./assets/docs/포트폴리오.pdf"

   ※ resumeUrl 에는 특정 기업명·지원 직무명이 적힌 파일이나
      연락처가 비어 있는 파일을 연결하지 마세요.
   ───────────────────────────────────────────────────────────────────────── */
var PROFILE = {
  email: "withkyu4045@naver.com",
  resumeUrl: ""
};

/* ─────────────────────────────────────────────────────────────────────────
   2) 이미지 설정 — 슬롯 9개 (작업 지시 4장)

   슬롯마다 정해진 위치(카드 썸네일 · 팝업 특정 문단 아래)가 index.html 에
   data-media-slot="프로젝트.슬롯이름" 으로 이미 표시되어 있습니다.
   여기서는 그 슬롯에 채울 파일 경로 · 대체 텍스트 · 캡션만 관리합니다.

     srcWebp     WebP 원본 경로.       예: "./assets/img/img-04.webp"
     srcFallback PNG 폴백 경로.        예: "./assets/img/img-04.png"
     alt         화면을 그대로 서술하는 대체 텍스트 (캡션과 다른 문장)
     caption     화면 아래 짧은 설명 (해석 · 맥락)
     portrait    세로 촬영본이면 true (9:16 비율)

   srcWebp 가 비어 있으면 해당 슬롯은 화면에 나타나지 않습니다.
   파일 경로를 채워도 실제 파일이 없으면(404) 자동으로 다시 숨겨집니다.
   (빈 박스나 "이미지 준비 중" 같은 안내 문구는 쓰지 않습니다)

   01 · 02 · 05 · 08 은 캡처가 아니라 index.html 에 직접 그린 인라인 SVG
   도식이라 이 객체에서 관리하지 않습니다.
   ───────────────────────────────────────────────────────────────────────── */
var MEDIA = {
  finance: {
    // 04 — 카드 썸네일
    cover: {
      srcWebp: "./assets/img/img-04.webp",
      srcFallback: "./assets/img/img-04.png",
      alt: "정합성 검증 대사 결과에서 오류 항목이 표시된 화면",
      caption: "대사 대상 84건 중 오류 15건 검출"
    },
    // 06 — 결과와 한계 아래
    ruleResultShot: {
      srcWebp: "./assets/img/img-06.webp",
      srcFallback: "./assets/img/img-06.png",
      alt: "검증 규칙별 검출 내역을 표로 정리한 화면",
      caption: "규칙별 검출 내역 — 판정은 규칙 기반, 생성형 AI는 결과 설명 보조로만 사용"
    }
  },
  sunday: {
    // 07 — 카드 썸네일
    cover: {
      srcWebp: "./assets/img/img-07.webp",
      srcFallback: "./assets/img/img-07.png",
      alt: "다음 이벤트 후보를 예측한 화면",
      caption: "다음 이벤트 후보 예측 화면 — 예측 모델 구현은 팀원 담당"
    }
  },
  withmarry: {
    // 09 — 카드 안 작은 세로 이미지 (카드 폭 40% 이하)
    cardShot: {
      srcWebp: "./assets/img/img-09.webp",
      srcFallback: "./assets/img/img-09.png",
      alt: "모바일 청첩장 MVP 화면",
      caption: "모바일 청첩장 MVP — 문의 5건, 첫 유료 결제 발생 (팀 결과)",
      portrait: true
    }
  },
  moonlight: {
    // 10 — 카드 썸네일 (달빛장어는 팝업 없이 카드만 사용)
    cover: {
      srcWebp: "./assets/img/img-10.webp",
      srcFallback: "./assets/img/img-10.png",
      alt: "달빛장어 운영 대시보드 화면",
      caption: "매출 · 지출, 월별 보고서, 마케팅 분석, 메뉴 관리 화면"
    }
  }
};

(function () {
  "use strict";

  var doc = document;

  /* ── 연도 ── */
  var year = doc.getElementById("year");
  if (year) { year.textContent = String(new Date().getFullYear()); }

  /* ── 설정된 연락처만 화면에 노출 ── */
  function reveal(key, href) {
    if (!href) { return; }
    var nodes = doc.querySelectorAll('[data-profile^="' + key + '"]');
    Array.prototype.forEach.call(nodes, function (el) {
      if (el.tagName === "A") { el.setAttribute("href", href); }
      el.removeAttribute("hidden");
    });
  }

  reveal("email", PROFILE.email ? "mailto:" + PROFILE.email : "");
  reveal("resume", PROFILE.resumeUrl);

  if (PROFILE.email) {
    Array.prototype.forEach.call(doc.querySelectorAll('a[data-profile="email"]'), function (a) {
      if (a.classList.contains("btn")) { return; }
      a.textContent = PROFILE.email;
    });
  }

  Array.prototype.forEach.call(doc.querySelectorAll('a[data-profile="resume"]'), function (a) {
    if (/^https?:/.test(PROFILE.resumeUrl)) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    }
  });

  /* ═══════════════════════════════════════════════════════════════════════
     이미지 슬롯 — data-media-slot="프로젝트.슬롯이름" 이 붙은 요소마다
     MEDIA 에서 같은 경로를 찾아 채웁니다. srcWebp 가 없거나 파일이
     404 면 그 슬롯은 화면에 나타나지 않습니다. (빈 박스 없음)

     마크업은 두 가지 형태를 모두 지원합니다.
       1) <div data-media-slot="…" hidden><figure data-shot hidden>…</figure></div>
          — 대표 이미지(cover)처럼 바깥 영역과 안쪽 figure 를 나눠 둔 경우
       2) <figure data-media-slot="…" hidden>…</figure>
          — 팝업 안 인라인 이미지 · 카드 안 작은 이미지처럼 figure 자체가
            곧 슬롯인 경우
     ═══════════════════════════════════════════════════════════════════ */

  function resolveMedia(path) {
    var parts = path.split(".");
    var node = MEDIA;
    for (var i = 0; i < parts.length; i += 1) {
      if (!node) { return null; }
      node = node[parts[i]];
    }
    return node || null;
  }

  Array.prototype.forEach.call(doc.querySelectorAll("[data-media-slot]"), function (block) {
    var entry = resolveMedia(block.getAttribute("data-media-slot"));
    if (!entry || !entry.srcWebp) { return; }

    var fig = block.querySelector("[data-shot]") || block;
    var source = fig.querySelector("source");
    var img = fig.querySelector("img");
    var cap = fig.querySelector("[data-caption]");
    if (!img) { return; }

    img.addEventListener("error", function () { block.setAttribute("hidden", ""); });
    if (source) { source.setAttribute("srcset", entry.srcWebp); }
    img.setAttribute("src", entry.srcFallback || entry.srcWebp);
    img.setAttribute("alt", entry.alt || "");
    if (entry.portrait) { fig.classList.add("is-portrait"); }

    if (cap) {
      if (entry.caption) { cap.textContent = entry.caption; }
      else { cap.setAttribute("hidden", ""); }
    }

    fig.removeAttribute("hidden");
    block.removeAttribute("hidden");
  });

  /* ═══════════════════════════════════════════════════════════════════════
     상세 팝업 — native <dialog> + 바닐라 JS

     · ESC 로 닫기            : <dialog> 기본 동작 (별도 구현 불필요)
     · 배경 클릭으로 닫기      : 클릭 좌표가 팝업 박스 밖이면 닫습니다
     · 닫은 뒤 포커스 복귀     : 열 때 눌렀던 버튼을 기억해 뒀다가 돌려줍니다
     · 배경 스크롤 차단        : 열려 있는 동안 body.is-locked 를 붙입니다
     · 포커스 가두기           : <dialog> 의 기본 동작을 그대로 사용합니다
     ═══════════════════════════════════════════════════════════════════ */

  var openDialogs = [];

  Array.prototype.forEach.call(doc.querySelectorAll("dialog.detail-dialog"), function (dialog) {
    var opener = null;

    function closeDialog() {
      if (dialog.open) { dialog.close(); }
    }

    dialog.addEventListener("click", function (e) {
      var r = dialog.getBoundingClientRect();
      var inside = e.clientX >= r.left && e.clientX <= r.right &&
                   e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) { closeDialog(); }
    });

    dialog.addEventListener("close", function () {
      doc.body.classList.remove("is-locked");
      if (opener && typeof opener.focus === "function") { opener.focus(); }
      opener = null;
    });

    var closeBtn = dialog.querySelector("[data-dialog-close]");
    if (closeBtn) { closeBtn.addEventListener("click", closeDialog); }

    var openers = doc.querySelectorAll('[data-open-dialog="' + dialog.id + '"]');
    Array.prototype.forEach.call(openers, function (btn) {
      btn.addEventListener("click", function () {
        opener = btn;
        doc.body.classList.add("is-locked");
        dialog.showModal();
      });

      /* 버튼 · 링크가 아닌 요소(카드 전체 클릭용)는 Enter · Space 로도
         열 수 있도록 클릭을 대신 발생시킵니다. */
      if (btn.tagName !== "BUTTON" && btn.tagName !== "A") {
        btn.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            btn.click();
          }
        });
      }
    });

    openDialogs.push(dialog);
  });

  /* 인쇄할 때는 팝업을 닫아 둡니다. 열려 있는 상세 내용은
     print.css 가 본문에 그대로 펼쳐서 출력합니다. */
  function closeAllDialogs() {
    openDialogs.forEach(function (d) { if (d.open) { d.close(); } });
  }
  window.addEventListener("beforeprint", closeAllDialogs);
  if (window.matchMedia) {
    var printQuery = window.matchMedia("print");
    if (printQuery.addEventListener) { printQuery.addEventListener("change", closeAllDialogs); }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     가로 카드 슬라이더 (실무 경험)

     · 데스크톱 · 마우스 환경에서만 천천히 자동으로 흐릅니다.
     · 마우스를 올리거나 카드 안에 포커스가 있으면 멈춥니다.
     · 드래그로 직접 옮길 수 있고, 드래그 후에는 클릭이 카드를 열지 않도록
       막습니다 (드래그 릴리즈가 클릭으로 오인되는 것을 방지).
     · 좌우 버튼은 카드 한 장 너비만큼 부드럽게 이동합니다.
     · 모바일 · 터치 환경에서는 자동 이동 없이 네이티브 스와이프만 씁니다.
     · prefers-reduced-motion 에서는 자동 이동을 아예 켜지 않습니다.
     ═══════════════════════════════════════════════════════════════════ */

  Array.prototype.forEach.call(doc.querySelectorAll("[data-carousel]"), function (root) {
    var track = root.querySelector("[data-carousel-track]");
    if (!track) { return; }

    var reduceMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    var isCoarsePointer = !!(window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
    var autoEnabled = !reduceMotion && !isCoarsePointer;

    var SPEED = 16; /* 초당 px — 천천히, 존재감이 강하지 않게 흐르는 정도 */
    var direction = 1;
    var hovering = false;
    var focused = false;
    var dragging = false;
    var paused = false;
    var lastTime = null;
    var resumeTimer = null;

    function isHeld() { return hovering || focused || dragging; }

    /* 일정 시간 뒤 재개하되, 그사이 다시 hover · 포커스 · 드래그가
       시작됐으면(isHeld()) 재개하지 않습니다 — 이전에는 이 확인이 없어서
       hover 로 멈춘 직후 남아 있던 타이머가 도로 풀어버리는 문제가 있었습니다. */
    function pauseFor(ms) {
      paused = true;
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(function () {
        if (!isHeld()) { paused = false; }
      }, ms);
    }

    function step(now) {
      if (autoEnabled && !paused) {
        if (lastTime !== null) {
          var dt = (now - lastTime) / 1000;
          var max = track.scrollWidth - track.clientWidth;
          if (max > 0 && dt < 0.25) {
            track.scrollLeft += direction * SPEED * dt;
            if (track.scrollLeft >= max) { track.scrollLeft = max; direction = -1; }
            else if (track.scrollLeft <= 0) { track.scrollLeft = 0; direction = 1; }
          }
        }
        lastTime = now;
      } else {
        lastTime = null;
      }
      window.requestAnimationFrame(step);
    }
    if (autoEnabled) { window.requestAnimationFrame(step); }

    /* hover · 포커스는 즉시, 무조건 멈춥니다 (대기 중인 재개 타이머가 있어도
       취소). 벗어날 때는 다른 방식으로 여전히 붙잡혀 있지 않을 때만 풉니다. */
    root.addEventListener("mouseenter", function () {
      hovering = true;
      paused = true;
      window.clearTimeout(resumeTimer);
    });
    root.addEventListener("mouseleave", function () {
      hovering = false;
      if (!isHeld()) { paused = false; }
    });
    root.addEventListener("focusin", function () {
      focused = true;
      paused = true;
      window.clearTimeout(resumeTimer);
    });
    root.addEventListener("focusout", function () {
      focused = false;
      if (!isHeld()) { paused = false; }
    });

    /* 드래그로 이동 (마우스 · 트랙패드 환경만. 터치는 네이티브 스와이프를 씁니다).
       pointerdown 시점에는 아직 "누른 것"인지 "끌기 시작"인지 알 수 없으므로
       바로 캡처하지 않고, 실제로 임계값 이상 움직였을 때만 드래그로
       전환합니다. 그렇지 않으면 단순 클릭까지 setPointerCapture 의
       영향을 받아 카드의 클릭 리스너가 아예 못 받는 문제가 생깁니다. */
    var pointerActive = false;
    var startX = 0;
    var startScroll = 0;
    var moved = 0;
    var activePointerId = null;
    var DRAG_THRESHOLD = 6;

    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch") { return; }
      pointerActive = true;
      dragging = false;
      moved = 0;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      activePointerId = e.pointerId;
    });

    track.addEventListener("pointermove", function (e) {
      if (!pointerActive) { return; }
      var dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));

      if (!dragging && moved > DRAG_THRESHOLD) {
        dragging = true;
        paused = true;
        track.classList.add("is-dragging");
        if (track.setPointerCapture) { track.setPointerCapture(activePointerId); }
      }
      if (dragging) { track.scrollLeft = startScroll - dx; }
    });

    function endDrag() {
      if (!pointerActive) { return; }
      pointerActive = false;
      if (dragging) {
        dragging = false;
        track.classList.remove("is-dragging");
        track.dataset.dragged = "1"; /* 뒤따라오는 클릭을 무시하기 위한 표시 */
        pauseFor(1800);
      }
    }
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);

    /* 드래그 직후 발생하는 클릭은 카드를 여는 대신 무시합니다.
       캡처 단계에서 가로채 카드 자체의 클릭 리스너까지 도달하지 못하게 합니다. */
    track.addEventListener("click", function (e) {
      if (track.dataset.dragged === "1") {
        e.stopPropagation();
        delete track.dataset.dragged;
      }
    }, true);

    /* 좌우 버튼 · 위치 점 */
    var slides = Array.prototype.slice.call(track.querySelectorAll(".carousel-slide"));

    function slideStep() {
      var slide = track.querySelector(".carousel-slide");
      return slide ? slide.getBoundingClientRect().width + 24 : track.clientWidth * 0.8;
    }
    function slideBy(dir) {
      track.scrollBy({ left: dir * slideStep(), behavior: "smooth" });
      pauseFor(1800);
    }
    var prevBtn = root.querySelector("[data-carousel-prev]");
    var nextBtn = root.querySelector("[data-carousel-next]");
    if (prevBtn) { prevBtn.addEventListener("click", function () { slideBy(-1); }); }
    if (nextBtn) { nextBtn.addEventListener("click", function () { slideBy(1); }); }

    var dots = Array.prototype.slice.call(root.querySelectorAll("[data-carousel-dot]"));
    if (dots.length) {
      dots.forEach(function (dot, i) {
        dot.addEventListener("click", function () {
          track.scrollTo({ left: i * slideStep(), behavior: "smooth" });
          pauseFor(1800);
        });
      });
      var dotTimer = null;
      track.addEventListener("scroll", function () {
        window.clearTimeout(dotTimer);
        dotTimer = window.setTimeout(function () {
          var step2 = slideStep();
          var index = step2 ? Math.round(track.scrollLeft / step2) : 0;
          index = Math.max(0, Math.min(slides.length - 1, index));
          dots.forEach(function (dot, i) { dot.classList.toggle("is-active", i === index); });
        }, 80);
      }, { passive: true });
    }

    /* 대표 이미지가 있는 카드가 화면(트랙) 중앙 가까이 왔을 때 is-centered 를
       붙여, 호버하지 않아도 GIF 가 또렷하게 보이도록 합니다. */
    if ("IntersectionObserver" in window) {
      var centerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-centered", entry.intersectionRatio >= 0.6);
        });
      }, { root: track, threshold: [0, 0.6, 1] });
      Array.prototype.forEach.call(track.querySelectorAll(".rd-card-featured"), function (card) {
        centerObserver.observe(card);
      });
    }
  });

  /* ═══════════════════════════════════════════════════════════════════════
     현재 섹션 표시
     ═══════════════════════════════════════════════════════════════════ */

  var links = Array.prototype.slice.call(doc.querySelectorAll(".nav-list a"));
  var sections = links
    .map(function (a) { return doc.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || !sections.length) { return; }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) { return; }
      links.forEach(function (a) {
        var on = a.getAttribute("href") === "#" + entry.target.id;
        a.classList.toggle("is-active", on);
        if (on) { a.setAttribute("aria-current", "true"); }
        else { a.removeAttribute("aria-current"); }
      });
    });
  }, { rootMargin: "-25% 0px -60% 0px", threshold: 0 });

  sections.forEach(function (s) { observer.observe(s); });
})();

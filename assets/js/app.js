/* 화면 보조 기능만 담당합니다. 본문은 index.html 에 그대로 들어 있어
   자바스크립트가 없어도 사이트와 인쇄 결과는 동일합니다.
   (상세 보기 내용은 인쇄 시 자동으로 펼쳐집니다. print.css 참고) */

/* ─────────────────────────────────────────────────────────────────────────
   1) 개인 정보 설정

   값을 채우면 해당 버튼과 링크가 화면에 나타납니다.
   비워 두면 버튼 자체가 나타나지 않습니다. (자리표시 문구는 노출되지 않습니다.)

     email     연락용 이메일 주소.            예: "example@gmail.com"
     resumeUrl 공개해도 되는 경력기술서 PDF.  예: "./assets/docs/경력기술서.pdf"

   ※ resumeUrl 에는 특정 기업명·지원 직무명이 적힌 파일이나
      연락처가 비어 있는 파일을 연결하지 마세요.
   ───────────────────────────────────────────────────────────────────────── */
var PROFILE = {
  email: "",
  resumeUrl: ""
};

/* ─────────────────────────────────────────────────────────────────────────
   2) 프로젝트 이미지 설정

   프로젝트마다 이미지를 순서대로 적습니다.

     · 첫 번째 이미지가 본문의 "대표 이미지" 1장으로 나옵니다.
     · 2장 이상이면 "상세 이미지 보기" 버튼이 나타나고,
       모달에서 좌우 이동 · 캡션 · 썸네일로 나머지를 볼 수 있습니다.
     · 목록이 비어 있으면(지금 상태) 이미지 영역 전체가 화면에 나타나지 않습니다.
     · 파일을 assets/img/ 에 넣고 아래 목록만 채우면 바로 동작합니다.

   예시:
     finance: [
       { src: "./assets/img/finance-dashboard.png",
         alt: "금융 데이터 검증 대시보드. 오류 유형별 건수와 오류 목록이 보인다.",
         caption: "검증 결과와 오류 목록을 함께 보여주는 화면입니다." }
     ]

   ※ 회사 내부 경로 · 서버 정보 · API 키가 보이는 자료는 넣지 마세요.
   ───────────────────────────────────────────────────────────────────────── */
var GALLERY = {
  spec:    [],
  finance: [],
  sunday:  []
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
     대표 이미지 — GALLERY 목록의 첫 장만 본문에 표시
     ═══════════════════════════════════════════════════════════════════ */

  function listFor(key) {
    var raw = GALLERY[key];
    if (!raw || !raw.length) { return []; }
    return raw.filter(function (item) { return item && item.src; });
  }

  Array.prototype.forEach.call(doc.querySelectorAll("[data-media]"), function (block) {
    var key = block.getAttribute("data-media");
    var list = listFor(key);
    var fig = block.querySelector("[data-shot]");
    var btn = block.querySelector("[data-gallery]");

    /* 이미지가 없으면 영역은 숨겨진 채로 둡니다 (index.html 에서 기본 hidden) */
    if (!list.length || !fig) { return; }

    var first = list[0];
    var img = fig.querySelector("img");
    var cap = fig.querySelector("[data-caption]");

    img.addEventListener("error", function () { block.setAttribute("hidden", ""); });
    img.setAttribute("src", first.src);
    img.setAttribute("alt", first.alt || first.caption || "");

    if (cap) {
      if (first.caption) { cap.textContent = first.caption; }
      else { cap.setAttribute("hidden", ""); }
    }

    fig.removeAttribute("hidden");
    block.removeAttribute("hidden");

    if (btn && list.length > 1) {
      btn.textContent = "상세 이미지 보기 (" + list.length + "장)";
      btn.removeAttribute("hidden");
    }
  });

  /* ═══════════════════════════════════════════════════════════════════════
     모달 — '상세 보기'(글) 와 '상세 이미지 보기'(이미지) 를 함께 씁니다.
     닫기: 닫기 버튼 · ESC · 배경 클릭
     이미지 이동: 좌우 버튼 · ← → 키 · 썸네일 · 모바일 스와이프
     ═══════════════════════════════════════════════════════════════════ */

  var modal = doc.getElementById("modal");
  if (!modal) { return; }

  var panel = modal.querySelector(".modal-panel");
  var titleEl = doc.getElementById("modal-title");
  var bodyEl = doc.getElementById("modal-body");

  var lastFocus = null;
  var gallery = null;   /* { list: [], index: 0 } — 이미지 모드일 때만 값이 있습니다 */

  var FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function isOpen() { return !modal.hasAttribute("hidden"); }

  function openModal(title, mode) {
    lastFocus = doc.activeElement;
    titleEl.textContent = title || "";
    modal.classList.toggle("is-gallery", mode === "gallery");
    modal.removeAttribute("hidden");
    doc.body.classList.add("is-locked");
    /* 패널 안 첫 번째 조작 가능한 요소로 포커스를 옮깁니다 */
    var first = panel.querySelector(FOCUSABLE);
    (first || panel).focus();
  }

  function closeModal() {
    if (!isOpen()) { return; }
    modal.setAttribute("hidden", "");
    modal.classList.remove("is-gallery");
    bodyEl.innerHTML = "";
    doc.body.classList.remove("is-locked");
    gallery = null;
    if (lastFocus && typeof lastFocus.focus === "function") { lastFocus.focus(); }
    lastFocus = null;
  }

  /* ── 글 모달 ── */
  function openDetail(id) {
    var source = doc.getElementById(id);
    if (!source) { return; }
    bodyEl.innerHTML = source.innerHTML;
    openModal(source.getAttribute("data-detail-title") || "상세 보기", "detail");
  }

  /* ── 이미지 모달 ── */
  function renderGallery() {
    if (!gallery) { return; }
    var item = gallery.list[gallery.index];
    var img = bodyEl.querySelector("[data-gimg]");
    var cap = bodyEl.querySelector("[data-gcap]");
    var cnt = bodyEl.querySelector("[data-gcount]");

    img.setAttribute("src", item.src);
    img.setAttribute("alt", item.alt || item.caption || "");
    cap.textContent = item.caption || "";
    cnt.textContent = (gallery.index + 1) + " / " + gallery.list.length;

    Array.prototype.forEach.call(bodyEl.querySelectorAll("[data-gthumb]"), function (b, i) {
      if (i === gallery.index) { b.setAttribute("aria-current", "true"); }
      else { b.removeAttribute("aria-current"); }
    });
  }

  function moveGallery(step) {
    if (!gallery) { return; }
    var n = gallery.list.length;
    gallery.index = (gallery.index + step + n) % n;
    renderGallery();
  }

  function openGallery(key, title) {
    var list = listFor(key);
    if (!list.length) { return; }
    gallery = { list: list, index: 0 };

    var thumbs = list.map(function (item, i) {
      return '<button type="button" data-gthumb data-index="' + i + '" aria-label="' + (i + 1) + '번째 이미지">' +
             '<img src="' + item.src + '" alt="" loading="lazy"></button>';
    }).join("");

    bodyEl.innerHTML =
      '<div class="gallery">' +
        '<div class="gallery-stage">' +
          '<img data-gimg src="" alt="">' +
          (list.length > 1 ?
            '<button class="gallery-nav gallery-prev" type="button" data-gprev aria-label="이전 이미지">‹</button>' +
            '<button class="gallery-nav gallery-next" type="button" data-gnext aria-label="다음 이미지">›</button>' : "") +
        '</div>' +
        '<p class="gallery-meta"><span class="gallery-count" data-gcount></span>' +
        '<span class="gallery-caption" data-gcap></span></p>' +
        (list.length > 1 ? '<div class="gallery-thumbs">' + thumbs + '</div>' : "") +
      '</div>';

    renderGallery();
    openModal(title || "상세 이미지 보기", "gallery");
  }

  /* ── 버튼 연결 ── */
  Array.prototype.forEach.call(doc.querySelectorAll("[data-detail]"), function (btn) {
    btn.addEventListener("click", function () { openDetail(btn.getAttribute("data-detail")); });
  });

  Array.prototype.forEach.call(doc.querySelectorAll("[data-gallery]"), function (btn) {
    btn.addEventListener("click", function () {
      var project = btn.closest(".project");
      var heading = project ? project.querySelector(".project-title") : null;
      var name = heading ? heading.textContent.trim() : "";
      openGallery(btn.getAttribute("data-gallery"), name ? name + " — 상세 이미지" : "상세 이미지");
    });
  });

  /* ── 닫기 · 이동 ── */
  modal.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) { closeModal(); return; }
    if (e.target.closest("[data-gprev]")) { moveGallery(-1); return; }
    if (e.target.closest("[data-gnext]")) { moveGallery(1); return; }
    var thumb = e.target.closest("[data-gthumb]");
    if (thumb && gallery) {
      gallery.index = Number(thumb.getAttribute("data-index"));
      renderGallery();
    }
  });

  doc.addEventListener("keydown", function (e) {
    if (!isOpen()) { return; }

    if (e.key === "Escape") { e.preventDefault(); closeModal(); return; }
    if (gallery && e.key === "ArrowLeft") { e.preventDefault(); moveGallery(-1); return; }
    if (gallery && e.key === "ArrowRight") { e.preventDefault(); moveGallery(1); return; }

    /* 포커스가 모달 밖으로 나가지 않도록 Tab 을 가둡니다 */
    if (e.key !== "Tab") { return; }
    var items = Array.prototype.filter.call(panel.querySelectorAll(FOCUSABLE), function (el) {
      return el.offsetParent !== null;
    });
    if (!items.length) { e.preventDefault(); panel.focus(); return; }
    var firstItem = items[0];
    var lastItem = items[items.length - 1];
    if (e.shiftKey && (doc.activeElement === firstItem || doc.activeElement === panel)) {
      e.preventDefault(); lastItem.focus();
    } else if (!e.shiftKey && doc.activeElement === lastItem) {
      e.preventDefault(); firstItem.focus();
    }
  });

  /* ── 모바일 스와이프 ── */
  var touchX = null;
  var touchY = null;
  modal.addEventListener("touchstart", function (e) {
    if (!gallery || e.touches.length !== 1) { return; }
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
  }, { passive: true });

  modal.addEventListener("touchend", function (e) {
    if (!gallery || touchX === null) { return; }
    var dx = e.changedTouches[0].clientX - touchX;
    var dy = e.changedTouches[0].clientY - touchY;
    touchX = null; touchY = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { moveGallery(dx < 0 ? 1 : -1); }
  }, { passive: true });

  /* 인쇄할 때는 모달을 닫아 둡니다 (상세 내용은 본문에 펼쳐집니다) */
  if (window.matchMedia) {
    var printQuery = window.matchMedia("print");
    if (printQuery.addEventListener) { printQuery.addEventListener("change", closeModal); }
  }
  window.addEventListener("beforeprint", closeModal);

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

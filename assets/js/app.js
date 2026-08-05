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
  email: "",
  resumeUrl: ""
};

/* ─────────────────────────────────────────────────────────────────────────
   2) 이미지 · 영상 설정

   프로젝트별로 두 종류를 관리합니다.

     cover  메인 화면 카드에 나오는 대표 이미지 1장 (16:9). 없으면 null.
            실무 경험 · 기타 프로젝트 카드에는 대표 이미지 영역이 없습니다.
     items  상세 팝업의 "이미지 · 영상" 영역에 순서대로 나오는 목록.
            항목별로 미리 정해 둔 자리(label)가 있고, src 를 채운 항목만
            화면에 나타납니다. 전부 비어 있으면 "이미지 · 영상" 제목과
            영역 전체가 화면에서 사라집니다. (빈 박스나 안내 문구 없음)

   이미지 항목:
     { type: "image", label: "화면 이름", src: "./assets/img/파일명.png",
       alt: "화면을 설명하는 대체 텍스트", caption: "화면 아래 짧은 설명",
       portrait: false }   // 세로 촬영본이면 true (4:5 비율로 표시)

   영상 항목 (자동재생 없음 · 컨트롤 · 포스터 이미지 지원):
     { type: "video", label: "영상 이름", src: "./assets/video/파일명.mp4",
       poster: "./assets/img/파일명-poster.png", caption: "영상 아래 짧은 설명" }

   권장 파일명 · 비율:
     대표 이미지(cover)      16:9, 가로 1600px 이상   예) finance-cover.png
     상세 팝업 이미지        16:9 기본, 세로 촬영본은 portrait:true 로 4:5
     영상                    mp4, 포스터 이미지 별도 준비

   넣기 전에 회사 내부 경로 · 서버 정보 · API 키 · 고객 정보가 보이지 않는지
   확인하고, alt 는 반드시 채웁니다.
   ───────────────────────────────────────────────────────────────────────── */
var MEDIA = {
  spec: {
    cover: null,
    items: [
      { type: "image", label: "데이터 · 평가 흐름도", src: "", alt: "", caption: "" },
      { type: "image", label: "평가 조건 정리표", src: "", alt: "", caption: "" },
      { type: "image", label: "3D 생성 결과", src: "", alt: "", caption: "" },
      { type: "video", label: "Relic 랜딩페이지 영상", src: "", poster: "", caption: "" }
    ]
  },
  finance: {
    cover: { src: "", alt: "", caption: "" },
    items: [
      { type: "image", label: "전체 대시보드", src: "", alt: "", caption: "" },
      { type: "image", label: "오류 상세 화면", src: "", alt: "", caption: "" },
      { type: "image", label: "데이터 처리 흐름도", src: "", alt: "", caption: "" },
      { type: "image", label: "감사 로그 · 역추적 화면", src: "", alt: "", caption: "" }
    ]
  },
  sunday: {
    cover: { src: "", alt: "", caption: "" },
    items: [
      { type: "image", label: "예측 화면", src: "", alt: "", caption: "" },
      { type: "image", label: "이벤트 캘린더", src: "", alt: "", caption: "" },
      { type: "image", label: "캐릭터 조회", src: "", alt: "", caption: "" },
      { type: "image", label: "공지 화면", src: "", alt: "", caption: "" },
      { type: "image", label: "백엔드 구조도", src: "", alt: "", caption: "" }
    ]
  },
  withmarry: {
    cover: null,
    items: [
      { type: "image", label: "랜딩페이지", src: "", alt: "", caption: "" },
      { type: "image", label: "청첩장 화면", src: "", alt: "", caption: "" },
      { type: "image", label: "AI 음성 화면", src: "", alt: "", caption: "" }
    ]
  },
  moonlight: {
    cover: null,
    items: [
      { type: "image", label: "운영 대시보드 화면", src: "", alt: "", caption: "" }
    ]
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
     대표 이미지 — MEDIA[key].cover 가 있을 때만 카드에 표시
     ═══════════════════════════════════════════════════════════════════ */

  Array.prototype.forEach.call(doc.querySelectorAll("[data-cover]"), function (block) {
    var key = block.getAttribute("data-cover");
    var entry = MEDIA[key];
    var cover = entry && entry.cover;
    if (!cover || !cover.src) { return; }

    var fig = block.querySelector("[data-shot]");
    if (!fig) { return; }
    var img = fig.querySelector("img");
    var cap = fig.querySelector("[data-caption]");

    img.addEventListener("error", function () { block.setAttribute("hidden", ""); });
    img.setAttribute("src", cover.src);
    img.setAttribute("alt", cover.alt || cover.caption || "");

    if (cap) {
      if (cover.caption) { cap.textContent = cover.caption; }
      else { cap.setAttribute("hidden", ""); }
    }

    fig.removeAttribute("hidden");
    block.removeAttribute("hidden");
  });

  /* ═══════════════════════════════════════════════════════════════════════
     상세 팝업의 이미지 · 영상 — MEDIA[key].items 중 src 가 있는 항목만 표시
     하나도 없으면 "이미지 · 영상" 영역 전체를 숨깁니다.
     ═══════════════════════════════════════════════════════════════════ */

  function buildMediaItem(item) {
    var fig = doc.createElement("figure");
    fig.className = "media-item" + (item.portrait ? " is-portrait" : "");

    if (item.type === "video") {
      fig.classList.add("media-item-video");
      var video = doc.createElement("video");
      video.setAttribute("controls", "");
      video.setAttribute("preload", "metadata");
      if (item.poster) { video.setAttribute("poster", item.poster); }
      var source = doc.createElement("source");
      source.setAttribute("src", item.src);
      video.appendChild(source);
      fig.appendChild(video);
    } else {
      var img = doc.createElement("img");
      img.setAttribute("loading", "lazy");
      img.setAttribute("decoding", "async");
      img.setAttribute("src", item.src);
      img.setAttribute("alt", item.alt || item.label || "");
      fig.appendChild(img);
    }

    var caption = item.caption || item.label || "";
    if (caption) {
      var cap = doc.createElement("figcaption");
      cap.textContent = caption;
      fig.appendChild(cap);
    }

    return fig;
  }

  Array.prototype.forEach.call(doc.querySelectorAll("[data-media-gallery]"), function (gallery) {
    var key = gallery.getAttribute("data-media-gallery");
    var entry = MEDIA[key];
    var items = (entry && entry.items) || [];
    var section = doc.querySelector('[data-media-section="' + key + '"]');
    var rendered = 0;

    items.forEach(function (item) {
      if (!item.src) { return; }
      gallery.appendChild(buildMediaItem(item));
      rendered += 1;
    });

    if (rendered > 0 && section) { section.removeAttribute("hidden"); }
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

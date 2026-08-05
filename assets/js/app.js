/* =========================================================================
   app.js — 화면 보조 기능만 담당합니다.
   본문 내용은 index.html 에 그대로 들어 있어, 자바스크립트가 꺼져 있어도
   사이트와 인쇄 결과는 정상적으로 나옵니다.

   ▸ 영상 링크는 아래 VIDEOS 값만 바꾸면 됩니다.
     주소를 채우면 썸네일이 클릭 가능한 링크가 되고, 그 아래에 주소가 표시됩니다.
     비워 두면 "영상 링크 준비 중"으로 남습니다.

     주소를 채운 뒤에는 QR 코드도 다시 만들어 주세요.
       1) tools/links.json 의 같은 항목에 주소를 넣고
       2) python3 tools/make_qr.py 실행
   ========================================================================= */

var VIDEOS = {
  "finance-demo":   "",   // 예: "https://youtu.be/xxxxxxxx"
  "maple-demo":     "",
  "withmarry-demo": ""
};

(function () {
  "use strict";

  /* ── 올해 연도 ── */
  var year = document.getElementById("year");
  if (year) { year.textContent = String(new Date().getFullYear()); }

  /* ── 영상 링크 연결 ──
     .media-video 안의 QR 이미지 파일명으로 어떤 영상인지 판별합니다.
     (assets/qr/maple-demo.svg → "maple-demo")                              */
  var blocks = document.querySelectorAll("[data-video]");
  Array.prototype.forEach.call(blocks, function (block) {
    var qr = block.querySelector(".qr-block img");
    if (!qr) { return; }

    var src = qr.getAttribute("src") || "";
    var key = src.split("/").pop().replace(/\.svg$/, "");
    var url = VIDEOS[key];

    var link = block.querySelector("[data-video-url]");
    var text = block.querySelector("[data-video-url-text]");

    if (!url) {
      /* 주소가 없으면 링크로 동작하지 않게 합니다 (빈 곳으로 이동 방지) */
      if (link) {
        link.removeAttribute("href");
        link.setAttribute("aria-disabled", "true");
        link.style.cursor = "default";
      }
      return;
    }

    if (link) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", "시연 영상 보기 (새 탭에서 열림)");
    }
    if (text) { text.textContent = url.replace(/^https?:\/\//, ""); }
  });

  /* ── 이미지가 아직 없을 때 안내 표시 ──
     assets/img/ 에 실제 캡처를 넣기 전이라도 레이아웃이 무너지지 않게 합니다. */
  var images = document.querySelectorAll(".media img");
  Array.prototype.forEach.call(images, function (img) {
    img.addEventListener("error", function () {
      var fig = img.closest(".media");
      if (!fig) { return; }
      fig.classList.add("media-missing");
      var cap = fig.querySelector("figcaption");
      img.style.display = "none";
      var box = document.createElement("div");
      box.className = "media-fallback";
      box.setAttribute("role", "img");
      box.setAttribute("aria-label", (cap ? cap.textContent : "이미지") + " — 준비 중");
      box.textContent = cap ? cap.textContent : "이미지 준비 중";
      fig.insertBefore(box, cap || null);
    });
  });

  /* ── 현재 보고 있는 섹션을 내비게이션에 표시 ── */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".rail-nav a"));
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
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }
})();
